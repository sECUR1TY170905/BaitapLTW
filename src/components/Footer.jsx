import { Link } from 'react-router-dom'
import { categories } from '../data/categories'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-3 flex items-center gap-2 text-lg font-extrabold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              T
            </span>
            <span className="text-slate-900 dark:text-white">
              Tin<span className="text-brand-600">Tech</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Trang tin công nghệ và lập trình. Bài thực hành môn Lập trình Web, xây dựng bằng React, Vite và
            Tailwind CSS.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">Danh mục</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/bai-viet?danh-muc=${c.slug}`}
                  className="text-slate-600 transition hover:text-brand-600 dark:text-slate-400"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">Liên kết</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/bai-viet" className="text-slate-600 hover:text-brand-600 dark:text-slate-400">
                Tất cả bài viết
              </Link>
            </li>
            <li>
              <Link to="/da-luu" className="text-slate-600 hover:text-brand-600 dark:text-slate-400">
                Bài đã lưu
              </Link>
            </li>
            <li>
              <Link to="/gioi-thieu" className="text-slate-600 hover:text-brand-600 dark:text-slate-400">
                Giới thiệu
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">Đăng ký nhận tin</h4>
          <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
            Nhận bài viết mới mỗi tuần.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.currentTarget.reset()
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              placeholder="Email của bạn"
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} TinTech — Bài tập môn Lập trình Web.
      </div>
    </footer>
  )
}
