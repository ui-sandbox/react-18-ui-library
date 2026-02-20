import React, { createContext, useContext, useEffect, type ReactNode } from 'react'
import './defaultTokens.css'

export interface ThemeTokens {
  colorPrimary?: string
  colorPrimaryHover?: string
  colorPrimaryForeground?: string
  colorSecondary?: string
  colorSecondaryHover?: string
  colorSecondaryForeground?: string
  colorBackground?: string
  colorSurface?: string
  colorSurfaceHover?: string
  colorBorder?: string
  colorBorderFocus?: string
  colorText?: string
  colorTextMuted?: string
  colorTextDisabled?: string
  colorError?: string
  colorErrorBg?: string
  colorSuccess?: string
  colorSuccessBg?: string
  colorWarning?: string
  colorWarningBg?: string
  colorInfo?: string
  colorInfoBg?: string
  colorOverlay?: string
  colorNavbar?: string
  colorSidebar?: string
  colorSidebarText?: string
  colorSidebarActive?: string
  colorSidebarActiveBg?: string
  radiusSm?: string
  radiusMd?: string
  radiusLg?: string
  radiusXl?: string
  fontFamilyBase?: string
  fontFamilyMono?: string
  shadowSm?: string
  shadowMd?: string
  shadowLg?: string
  shadowXl?: string
  transitionFast?: string
  transitionSpeed?: string
  transitionSlow?: string
  navbarHeight?: string
  sidebarWidth?: string
  sidebarCollapsedWidth?: string
}

const TOKEN_MAP: Record<keyof ThemeTokens, string> = {
  colorPrimary: '--color-primary',
  colorPrimaryHover: '--color-primary-hover',
  colorPrimaryForeground: '--color-primary-foreground',
  colorSecondary: '--color-secondary',
  colorSecondaryHover: '--color-secondary-hover',
  colorSecondaryForeground: '--color-secondary-foreground',
  colorBackground: '--color-background',
  colorSurface: '--color-surface',
  colorSurfaceHover: '--color-surface-hover',
  colorBorder: '--color-border',
  colorBorderFocus: '--color-border-focus',
  colorText: '--color-text',
  colorTextMuted: '--color-text-muted',
  colorTextDisabled: '--color-text-disabled',
  colorError: '--color-error',
  colorErrorBg: '--color-error-bg',
  colorSuccess: '--color-success',
  colorSuccessBg: '--color-success-bg',
  colorWarning: '--color-warning',
  colorWarningBg: '--color-warning-bg',
  colorInfo: '--color-info',
  colorInfoBg: '--color-info-bg',
  colorOverlay: '--color-overlay',
  colorNavbar: '--color-navbar',
  colorSidebar: '--color-sidebar',
  colorSidebarText: '--color-sidebar-text',
  colorSidebarActive: '--color-sidebar-active',
  colorSidebarActiveBg: '--color-sidebar-active-bg',
  radiusSm: '--radius-sm',
  radiusMd: '--radius-md',
  radiusLg: '--radius-lg',
  radiusXl: '--radius-xl',
  fontFamilyBase: '--font-family-base',
  fontFamilyMono: '--font-family-mono',
  shadowSm: '--shadow-sm',
  shadowMd: '--shadow-md',
  shadowLg: '--shadow-lg',
  shadowXl: '--shadow-xl',
  transitionFast: '--transition-fast',
  transitionSpeed: '--transition-speed',
  transitionSlow: '--transition-slow',
  navbarHeight: '--navbar-height',
  sidebarWidth: '--sidebar-width',
  sidebarCollapsedWidth: '--sidebar-collapsed-width',
}

interface ThemeContextValue {
  tokens: ThemeTokens
  setToken: (key: keyof ThemeTokens, value: string) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  tokens: {},
  setToken: () => undefined,
})

export interface ThemeProviderProps {
  tokens?: ThemeTokens
  children: ReactNode
}

export function ThemeProvider({ tokens = {}, children }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement
    Object.entries(tokens).forEach(([key, value]) => {
      if (value !== undefined) {
        const cssVar = TOKEN_MAP[key as keyof ThemeTokens]
        if (cssVar) root.style.setProperty(cssVar, value)
      }
    })
  }, [tokens])

  const setToken = (key: keyof ThemeTokens, value: string) => {
    const cssVar = TOKEN_MAP[key]
    if (cssVar) document.documentElement.style.setProperty(cssVar, value)
  }

  return (
    <ThemeContext.Provider value={{ tokens, setToken }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  return useContext(ThemeContext)
}
