import { Link } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import EmptyState from '../components/EmptyState'
import { articles } from '../data/articles'
import { useBookmarks } from '../context/BookmarkContext'

/** Danh sách bài viết người dùng đã lưu, đọc từ localStorage qua Context. */
export default function Bookmarks() {
  const bookmarks = useBookmarks()
  const saved = articles.filter((a) => bookmarks.has(a.id))

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-white">Bài đã lưu</h1>
          <p className="text-slate-600 dark:text-slate-400">
            {saved.length > 0
              ? `${saved.length} bài viết được lưu trên trình duyệt này.`
              : 'Chưa có bài viết nào được lưu.'}
          </p>
        </div>
        {saved.length > 0 && (
          <button
            type="button"
            onClick={bookmarks.clear}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:text-slate-300"
          >
            Xoá tất cả
          </button>
        )}
      </header>

      {saved.length === 0 ? (
        <EmptyState
          title="Danh sách trống"
          description="Bấm biểu tượng dấu trang trên mỗi bài viết để lưu lại và đọc sau."
          action={
            <Link
              to="/bai-viet"
              className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Khám phá bài viết
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
