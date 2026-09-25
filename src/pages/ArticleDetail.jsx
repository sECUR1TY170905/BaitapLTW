import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cover from '../components/Cover'
import CategoryBadge from '../components/CategoryBadge'
import ArticleCard from '../components/ArticleCard'
import CommentSection from '../components/CommentSection'
import { IconArrowLeft, IconBookmark, IconClock } from '../components/Icons'
import { getArticleBySlug, getRelated } from '../data/articles'
import { useBookmarks } from '../context/BookmarkContext'
import { formatDate, initials } from '../utils/format'
import NotFound from './NotFound'

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)
  const bookmarks = useBookmarks()
  const [progress, setProgress] = useState(0)

  // Thanh tiến độ đọc chạy theo vị trí cuộn của trang.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  // Cập nhật tiêu đề tab trình duyệt theo bài viết đang đọc.
  useEffect(() => {
    if (!article) return
    const previous = document.title
    document.title = `${article.title} — TinTech`
    return () => {
      document.title = previous
    }
  }, [article])

  if (!article) return <NotFound />

  const saved = bookmarks.has(article.id)
  const related = getRelated(article)

  return (
    <>
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-brand-600 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <article className="mx-auto max-w-3xl px-4 pt-10">
        <Link
          to="/bai-viet"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400"
        >
          <IconArrowLeft className="h-4 w-4" />
          Tất cả bài viết
        </Link>

        <CategoryBadge slug={article.category} className="mb-4" />

        <h1 className="mb-4 text-3xl leading-tight font-extrabold text-slate-900 sm:text-4xl dark:text-white">
          {article.title}
        </h1>

        <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {article.excerpt}
        </p>

        <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-slate-200 py-4 dark:border-slate-800">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-slate-800 dark:text-brand-300">
            {initials(article.author)}
          </span>
          <div className="text-sm">
            <p className="font-semibold text-slate-900 dark:text-white">{article.author}</p>
            <time dateTime={article.date} className="text-slate-500 dark:text-slate-400">
              {formatDate(article.date)}
            </time>
          </div>
          <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <IconClock className="h-4 w-4" />
            {article.readTime} phút đọc
          </span>

          <button
            type="button"
            onClick={() => bookmarks.toggle(article.id)}
            className={`ml-auto inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              saved
                ? 'border-brand-600 bg-brand-600 text-white hover:bg-brand-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <IconBookmark filled={saved} className="h-4 w-4" />
            {saved ? 'Đã lưu' : 'Lưu bài'}
          </button>
        </div>

        <Cover article={article} ratio="aspect-[16/9]" className="mb-10 rounded-2xl" />

        <div className="article-body">
          <p className="text-lg">{article.content.intro}</p>

          {article.content.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {section.quote && <blockquote>{section.quote}</blockquote>}
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <CommentSection slug={article.slug} />
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">Bài viết liên quan</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
