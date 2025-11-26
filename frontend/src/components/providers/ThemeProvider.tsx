import { createContext, useContext, useEffect } from 'react'
import { useStore } from '@/store/useStore'

type ThemeProviderProps = {
  children: React.ReactNode
}

const ThemeProviderContext = createContext<{
  theme: string
  setTheme: (theme: 'light' | 'dark' | 'system') => void
} | null>(null)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setTheme } = useStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  const value = {
    theme,
    setTheme,
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}