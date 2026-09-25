import { Link } from 'react-router-dom'

/** Trang hiển thị khi đường dẫn không khớp tuyến nào hoặc bài viết không tồn tại. */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="mb-2 text-7xl font-black text-brand-600">404</p>
      <h1 className="mb-3 text-2xl font-extrabold text-slate-900 dark:text-white">
        Không tìm thấy trang
      </h1>
      <p className="mb-8 text-slate-600 dark:text-slate-400">
        Đường dẫn bạn truy cập không tồn tại hoặc bài viết đã bị gỡ bỏ.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Về trang chủ
        </Link>
        <Link
          to="/bai-viet"
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Xem bài viết
        </Link>
      </div>
    </div>
  )
}
