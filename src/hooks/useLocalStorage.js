import { useCallback, useEffect, useState } from 'react'

/**
 * Hook tuỳ chỉnh: đồng bộ một giá trị state với localStorage.
 * Nhờ vậy dữ liệu người dùng (chế độ tối, bài đã lưu, bình luận)
 * không bị mất khi tải lại trang.
 *
 * @param {string} key   Khoá lưu trong localStorage
 * @param {*} initial    Giá trị mặc định khi chưa có dữ liệu
 */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initial
    } catch {
      // localStorage có thể bị chặn (chế độ riêng tư) — dùng giá trị mặc định.
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* bỏ qua lỗi ghi */
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initial), [initial])

  return [value, setValue, reset]
}
