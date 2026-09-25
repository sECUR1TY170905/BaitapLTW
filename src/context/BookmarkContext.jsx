import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BookmarkContext = createContext(null)

/**
 * Quản lý danh sách bài viết người dùng đã lưu.
 * Chỉ lưu id của bài viết để dữ liệu trong localStorage gọn nhẹ.
 */
export function BookmarkProvider({ children }) {
  const [ids, setIds] = useLocalStorage('blog.bookmarks', [])

  const value = useMemo(
    () => ({
      ids,
      has: (id) => ids.includes(id),
      toggle: (id) =>
        setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      clear: () => setIds([]),
      count: ids.length,
    }),
    [ids, setIds],
  )

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext)
  if (!ctx) throw new Error('useBookmarks phải được dùng bên trong BookmarkProvider')
  return ctx
}
