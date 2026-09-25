import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IconArrowUp } from './Icons'

/**
 * Hai nhiệm vụ:
 * 1. Tự cuộn lên đầu trang mỗi khi đổi tuyến đường (mặc định React Router
 *    giữ nguyên vị trí cuộn, gây khó chịu khi mở bài viết mới).
 * 2. Hiện nút "lên đầu trang" khi người dùng đã cuộn đủ xa.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, search])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Lên đầu trang"
      className="fixed right-5 bottom-5 z-40 rounded-full bg-brand-600 p-3 text-white shadow-lg transition hover:bg-brand-700"
    >
      <IconArrowUp className="h-5 w-5" />
    </button>
  )
}
