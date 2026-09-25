import { Link } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import { categories } from '../data/categories'
import { articles, countByCategory } from '../data/articles'

/** Trang tổng quan các danh mục, mỗi danh mục kèm bài viết mới nhất. */
export default function Categories() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <header className="mb-10">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-white">Danh mục</h1>
        <p className="text-slate-600 dark:text-slate-400">
          {categories.length} chủ đề, tổng cộng {articles.length} bài viết.
        </p>
      </header>

      <div className="space-y-14">
        {categories.map((c) => {
          const items = articles.filter((a) => a.category === c.slug).slice(0, 3)

          return (
            <section key={c.slug}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className={`h-8 w-1.5 rounded-full ${c.color}`} />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{c.name}</h2>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {countByCategory(c.slug)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{c.desc}</p>
                </div>
                <Link
                  to={`/bai-viet?danh-muc=${c.slug}`}
                  className="text-sm font-semibold text-brand-600 hover:underline"
                >
                  Xem tất cả →
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((a, i) => (
                  <ArticleCard key={a.id} article={a} index={i} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
