import { Link } from 'react-router-dom'
import Cover from './Cover'
import CategoryBadge from './CategoryBadge'
import { IconBookmark, IconClock } from './Icons'
import { useBookmarks } from '../context/BookmarkContext'
import { formatDateShort, initials } from '../utils/format'

/**
 * Thẻ hiển thị một bài viết trong danh sách.
 *
 * @param {object} article  Dữ liệu bài viết
 * @param {number} index    Vị trí trong danh sách, dùng để tạo độ trễ hiệu ứng
 * @param {boolean} horizontal  Bố cục ngang (ảnh bên trái) cho màn hình lớn
 */
export default function ArticleCard({ article, index = 0, horizontal = false }) {
  const bookmarks = useBookmarks()
  const saved = bookmarks.has(article.id)

  return (
    <article
      className={`group animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 ${
        horizontal ? 'sm:flex' : ''
      }`}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <Link
        to={`/bai-viet/${article.slug}`}
        className={`block overflow-hidden ${horizontal ? 'sm:w-64 sm:shrink-0' : ''}`}
      >
        <Cover
          article={article}
          ratio={horizontal ? 'aspect-[16/10] sm:h-full' : 'aspect-[16/9]'}
          className="transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <CategoryBadge slug={article.category} />
          <button
            type="button"
            onClick={() => bookmarks.toggle(article.id)}
            aria-label={saved ? 'Bỏ lưu bài viết' : 'Lưu bài viết'}
            aria-pressed={saved}
            className={`rounded-lg p-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
              saved ? 'text-brand-600' : 'text-slate-400'
            }`}
          >
            <IconBookmark filled={saved} className="h-5 w-5" />
          </button>
        </div>

        <h3 className="mb-2 text-lg leading-snug font-bold text-slate-900 dark:text-white">
          <Link to={`/bai-viet/${article.slug}`} className="hover:text-brand-600">
            {article.title}
          </Link>
        </h3>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700 dark:bg-slate-800 dark:text-brand-300">
            {initials(article.author)}
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{article.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.date}>{formatDateShort(article.date)}</time>
          <span className="ml-auto flex items-center gap-1">
            <IconClock className="h-3.5 w-3.5" />
            {article.readTime} phút
          </span>
        </div>
      </div>
    </article>
  )
}
