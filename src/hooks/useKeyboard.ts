import { useEffect, useCallback } from 'react'

export type KeyboardModifier = 'ctrl' | 'meta' | 'shift' | 'alt'

export interface KeyboardShortcut {
  key: string
  modifiers?: KeyboardModifier[]
  handler: (event: KeyboardEvent) => void
  enabled?: boolean
  preventDefault?: boolean
}

export function useKeyboard(shortcuts: KeyboardShortcut | KeyboardShortcut[]) {
  const shortcutList = Array.isArray(shortcuts) ? shortcuts : [shortcuts]

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    for (const shortcut of shortcutList) {
      if (shortcut.enabled === false) continue

      const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase()
      const modifiers = shortcut.modifiers ?? []

      const ctrlMatch = modifiers.includes('ctrl') ? e.ctrlKey : !e.ctrlKey || modifiers.length === 0
      const metaMatch = modifiers.includes('meta') ? e.metaKey : !e.metaKey || modifiers.length === 0
      const shiftMatch = modifiers.includes('shift') ? e.shiftKey : !e.shiftKey
      const altMatch = modifiers.includes('alt') ? e.altKey : !e.altKey

      const modMatch = modifiers.every((mod) => {
        if (mod === 'ctrl') return e.ctrlKey
        if (mod === 'meta') return e.metaKey
        if (mod === 'shift') return e.shiftKey
        if (mod === 'alt') return e.altKey
        return false
      })

      const noExtraModifiers =
        (e.ctrlKey === modifiers.includes('ctrl')) &&
        (e.metaKey === modifiers.includes('meta')) &&
        (e.shiftKey === modifiers.includes('shift')) &&
        (e.altKey === modifiers.includes('alt'))

      if (keyMatch && modMatch && noExtraModifiers) {
        if (shortcut.preventDefault !== false) e.preventDefault()
        shortcut.handler(e)
      }
    }
  }, [shortcutList])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
