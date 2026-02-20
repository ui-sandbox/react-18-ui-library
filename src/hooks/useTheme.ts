import { useCallback } from 'react'

export function useTheme() {
  const getToken = useCallback((token: string): string => {
    if (typeof window === 'undefined') return ''
    return getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  }, [])

  const setToken = useCallback((token: string, value: string) => {
    if (typeof window === 'undefined') return
    document.documentElement.style.setProperty(token, value)
  }, [])

  return { getToken, setToken }
}
