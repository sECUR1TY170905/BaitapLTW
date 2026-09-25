import { useEffect, useState } from 'react'

/**
 * Trì hoãn việc cập nhật giá trị cho tới khi người dùng ngừng gõ.
 * Dùng cho ô tìm kiếm để tránh lọc lại danh sách sau từng ký tự.
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer) // dọn dẹp khi value đổi hoặc component bị gỡ
  }, [value, delay])

  return debounced
}
