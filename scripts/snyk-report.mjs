#!/usr/bin/env node
/**
 * Snyk Vulnerability Report Generator
 * Reads snyk JSON output (from stdin or reports/snyk-results.json)
 * and writes a human-readable HTML report to reports/snyk-report.html
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const reportsDir = path.resolve(__dirname, '..', 'reports')

// ── Read input ────────────────────────────────────────────────────────────────
let raw = ''

const jsonFile = path.join(reportsDir, 'snyk-results.json')

if (process.stdin.isTTY) {
  if (!fs.existsSync(jsonFile)) {
    console.error('No snyk-results.json found. Run: npm run snyk:report:html')
    process.exit(1)
  }
  raw = fs.readFileSync(jsonFile, 'utf8')
} else {
  for await (const chunk of process.stdin) raw += chunk
}

let data
try {
  data = JSON.parse(raw)
} catch {
  console.error('Failed to parse Snyk JSON output.')
  process.exit(1)
}

// Snyk can return a single result object or an array (for multi-project)
const results = Array.isArray(data) ? data : [data]

// ── Build report data ─────────────────────────────────────────────────────────
const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low']
const SEVERITY_COLOR = {
  critical: '#b91c1c',
  high:     '#dc2626',
  medium:   '#d97706',
  low:      '#2563eb',
}
const SEVERITY_BG = {
  critical: '#fef2f2',
  high:     '#fff7ed',
  medium:   '#fffbeb',
  low:      '#eff6ff',
}

function countBySeverity(vulns) {
  return SEVERITY_ORDER.reduce((acc, s) => {
    acc[s] = vulns.filter((v) => (v.severity || '').toLowerCase() === s).length
    return acc
  }, {})
}

function severityBadge(severity) {
  const s = (severity || 'unknown').toLowerCase()
  const color = SEVERITY_COLOR[s] || '#6b7280'
  const bg = SEVERITY_BG[s] || '#f3f4f6'
  return `<span style="background:${bg};color:${color};padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:700;text-transform:uppercase;">${s}</span>`
}

function vulnRows(vulns) {
  if (!vulns.length) return '<tr><td colspan="5" style="text-align:center;color:#6b7280;padding:1rem;">No vulnerabilities found</td></tr>'
  return vulns
    .sort((a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity))
    .map((v) => `
      <tr style="border-bottom:1px solid #e5e7eb;">
        <td style="padding:10px 12px;font-weight:600;font-size:13px;">${escHtml(v.title || v.id || 'Unknown')}</td>
        <td style="padding:10px 12px;">${severityBadge(v.severity)}</td>
        <td style="padding:10px 12px;font-size:13px;color:#374151;">${escHtml(v.packageName || '')}<br><span style="color:#9ca3af;font-size:11px;">${escHtml(v.version || '')}</span></td>
        <td style="padding:10px 12px;font-size:12px;color:#6b7280;">${escHtml(v.fixedIn?.join(', ') || 'No fix available')}</td>
        <td style="padding:10px 12px;font-size:12px;">${v.id ? `<a href="https://snyk.io/vuln/${escHtml(v.id)}" target="_blank" style="color:#2563eb;">View</a>` : '—'}</td>
      </tr>`)
    .join('')
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// ── Build HTML ────────────────────────────────────────────────────────────────
const generatedAt = new Date().toLocaleString()

const projectSections = results.map((result) => {
  const vulns = result.vulnerabilities || []
  const counts = countBySeverity(vulns)
  const projectName = escHtml(result.projectName || result.displayTargetFile || 'Project')
  const ok = result.ok === true

  const summaryCards = SEVERITY_ORDER.map((s) => `
    <div style="background:${SEVERITY_BG[s]};border:1px solid ${SEVERITY_COLOR[s]}33;border-radius:8px;padding:12px 20px;text-align:center;min-width:90px;">
      <div style="font-size:24px;font-weight:700;color:${SEVERITY_COLOR[s]};">${counts[s]}</div>
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;color:${SEVERITY_COLOR[s]};">${s}</div>
    </div>`).join('')

  return `
    <section style="margin-bottom:2.5rem;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
        <h2 style="margin:0;font-size:18px;color:#111827;">${projectName}</h2>
        ${ok
          ? '<span style="background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:9999px;font-size:12px;font-weight:700;">✓ No issues</span>'
          : `<span style="background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:9999px;font-size:12px;font-weight:700;">${vulns.length} issue${vulns.length !== 1 ? 's' : ''}</span>`}
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:1.5rem;">${summaryCards}</div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-family:inherit;font-size:14px;">
          <thead>
            <tr style="background:#f9fafb;border-bottom:2px solid #e5e7eb;">
              <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;">Vulnerability</th>
              <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;">Severity</th>
              <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;">Package</th>
              <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;">Fixed In</th>
              <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;">Details</th>
            </tr>
          </thead>
          <tbody>${vulnRows(vulns)}</tbody>
        </table>
      </div>
    </section>`
}).join('')

const totalVulns = results.reduce((n, r) => n + (r.vulnerabilities?.length || 0), 0)
const allOk = results.every((r) => r.ok === true)

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Snyk Vulnerability Report</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f3f4f6; color: #111827; }
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div style="max-width:960px;margin:2rem auto;padding:0 1rem;">
    <header style="background:#fff;border-radius:12px;padding:1.5rem 2rem;margin-bottom:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,.08);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
      <div>
        <h1 style="margin:0 0 4px;font-size:22px;">🔒 Snyk Vulnerability Report</h1>
        <p style="margin:0;color:#6b7280;font-size:13px;">Generated: ${generatedAt}</p>
      </div>
      <div style="text-align:right;">
        <div style="font-size:28px;font-weight:700;color:${allOk ? '#059669' : '#dc2626'};">${totalVulns}</div>
        <div style="font-size:12px;color:#6b7280;">Total vulnerabilities</div>
      </div>
    </header>
    <div style="background:#fff;border-radius:12px;padding:2rem;box-shadow:0 1px 3px rgba(0,0,0,.08);">
      ${projectSections}
    </div>
    <footer style="text-align:center;padding:1.5rem;color:#9ca3af;font-size:12px;">
      Powered by <a href="https://snyk.io" style="color:#6366f1;">Snyk</a> · react-18-ui-library
    </footer>
  </div>
</body>
</html>`

// ── Write output ──────────────────────────────────────────────────────────────
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true })

const outFile = path.join(reportsDir, 'snyk-report.html')
fs.writeFileSync(outFile, html, 'utf8')

console.log(`\n✅ Snyk report written to: reports/snyk-report.html`)
console.log(`   Total vulnerabilities: ${totalVulns}`)
SEVERITY_ORDER.forEach((s) => {
  const n = results.reduce((acc, r) => acc + (r.vulnerabilities || []).filter((v) => v.severity === s).length, 0)
  if (n > 0) console.log(`   ${s.padEnd(8)}: ${n}`)
})
