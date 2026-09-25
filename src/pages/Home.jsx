import { Link } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import Cover from '../components/Cover'
import CategoryBadge from '../components/CategoryBadge'
import { IconClock } from '../components/Icons'
import { articles, countByCategory, getFeatured } from '../data/articles'
import { categories } from '../data/categories'
import { formatDate } from '../utils/format'

export default function Home() {
  const featured = getFeatured()
  const [hero, ...secondary] = featured
  const latest = articles.filter((a) => !a.featured).slice(0, 6)

  return (
    <>
      {/* Khối nổi bật đầu trang */}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="grid gap-6 lg:grid-cols-5">
          <article className="animate-fade-up group relative overflow-hidden rounded-3xl lg:col-span-3">
            <Link to={`/bai-viet/${hero.slug}`}>
              <Cover
                article={hero}
                ratio="aspect-[16/10]"
                className="transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8">
                <CategoryBadge slug={hero.category} className="mb-3" />
                <h1 className="mb-3 text-2xl leading-tight font-extrabold text-white sm:text-3xl">
                  {hero.title}
                </h1>
                <p className="mb-4 line-clamp-2 max-w-xl text-sm text-slate-200">{hero.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span>{hero.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={hero.date}>{formatDate(hero.date)}</time>
                  <span className="flex items-center gap-1">
                    <IconClock className="h-3.5 w-3.5" />
                    {hero.readTime} phút đọc
                  </span>
                </div>
              </div>
            </Link>
          </article>

          <div className="grid gap-6 lg:col-span-2">
            {secondary.map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Dải danh mục */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">Chủ đề</h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/bai-viet?danh-muc=${c.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className={`mb-3 block h-1.5 w-10 rounded-full ${c.color}`} />
              <p className="font-semibold text-slate-900 group-hover:text-brand-600 dark:text-white">
                {c.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {countByCategory(c.slug)} bài viết
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bài viết mới nhất */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Bài viết mới nhất</h2>
          <Link to="/bai-viet" className="text-sm font-semibold text-brand-600 hover:underline">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} />
          ))}
        </div>
      </section>

      {/* Kêu gọi hành động */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 px-6 py-12 text-center sm:px-12">
          <h2 className="mb-3 text-2xl font-extrabold text-white">Không bỏ lỡ bài viết nào</h2>
          <p className="mx-auto mb-6 max-w-lg text-sm text-brand-100">
            Lưu lại những bài viết bạn quan tâm và đọc lại bất cứ lúc nào, ngay trên trình duyệt
            này.
          </p>
          <Link
            to="/da-luu"
            className="inline-block rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
          >
            Xem bài đã lưu
          </Link>
        </div>
      </section>
    </>
  )
}
