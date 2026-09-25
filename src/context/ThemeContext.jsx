import { createContext, useContext, useEffect, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ThemeContext = createContext(null)

/**
 * Cung cấp chế độ sáng/tối cho toàn bộ ứng dụng.
 * Lựa chọn của người dùng được ghi vào localStorage; nếu chưa chọn lần nào
 * thì lấy theo thiết lập của hệ điều hành.
 */
export function ThemeProvider({ children }) {
  const systemDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

  const [dark, setDark] = useLocalStorage('blog.theme.dark', systemDark)

  // Tailwind v4 bật dark mode qua lớp .dark trên thẻ <html>.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const value = useMemo(() => ({ dark, toggle: () => setDark((d) => !d) }), [dark, setDark])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme phải được dùng bên trong ThemeProvider')
  return ctx
}
