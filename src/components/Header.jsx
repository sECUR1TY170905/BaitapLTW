import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IconBookmark, IconClose, IconMenu, IconMoon, IconSearch, IconSun } from './Icons'
import { useTheme } from '../context/ThemeContext'
import { useBookmarks } from '../context/BookmarkContext'

const navItems = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/bai-viet', label: 'Bài viết' },
  { to: '/danh-muc', label: 'Danh mục' },
  { to: '/gioi-thieu', label: 'Giới thiệu' },
]

/**
 * Thanh điều hướng cố định phía trên.
 * Có menu thu gọn cho màn hình nhỏ, ô tìm kiếm nhanh, nút đổi giao diện
 * và lối tắt tới danh sách bài đã lưu.
 */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { dark, toggle } = useTheme()
  const bookmarks = useBookmarks()
  const navigate = useNavigate()

  // Đổ bóng cho thanh điều hướng khi người dùng cuộn xuống.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    const q = keyword.trim()
    navigate(q ? `/bai-viet?tim=${encodeURIComponent(q)}` : '/bai-viet')
    setKeyword('')
    setOpen(false)
  }

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-brand-300'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur transition-shadow dark:border-slate-800 dark:bg-slate-950/90 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            T
          </span>
          <span className="text-slate-900 dark:text-white">
            Tin<span className="text-brand-600">Tech</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden lg:block">
          <label className="relative block">
            <span className="sr-only">Tìm kiếm bài viết</span>
            <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm bài viết..."
              className="w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-sm outline-none transition focus:w-64 focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:focus:bg-slate-800"
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <Link
            to="/da-luu"
            aria-label="Bài viết đã lưu"
            className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <IconBookmark className="h-5 w-5" />
            {bookmarks.count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                {bookmarks.count}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {dark ? <IconSun className="h-5 w-5" /> : <IconMoon className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            aria-expanded={open}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu cho màn hình nhỏ */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <form onSubmit={submitSearch} className="mb-3">
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm bài viết..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </form>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
