import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'
import EmptyState from '../components/EmptyState'
import { IconSearch } from '../components/Icons'
import { articles } from '../data/articles'
import { categories } from '../data/categories'
import { useDebounce } from '../hooks/useDebounce'
import { removeAccents } from '../utils/format'

const PER_PAGE = 6

const sortOptions = [
  { value: 'moi-nhat', label: 'Mới nhất' },
  { value: 'cu-nhat', label: 'Cũ nhất' },
  { value: 'doc-nhanh', label: 'Đọc nhanh nhất' },
  { value: 'tieu-de', label: 'Theo tiêu đề (A-Z)' },
]

/**
 * Trang danh sách bài viết: tìm kiếm, lọc theo danh mục, sắp xếp và phân trang.
 * Điều kiện lọc được giữ trên thanh địa chỉ (query string) nên người dùng có
 * thể chia sẻ đường dẫn hoặc dùng nút Quay lại của trình duyệt.
 */
export default function Articles() {
  const [params, setParams] = useSearchParams()

  const category = params.get('danh-muc') ?? 'tat-ca'
  const sort = params.get('sap-xep') ?? 'moi-nhat'
  const page = Math.max(1, Number(params.get('trang') ?? 1))

  const [keyword, setKeyword] = useState(params.get('tim') ?? '')
  const debounced = useDebounce(keyword, 300)

  // Khi người dùng gõ từ khoá mới, ghi vào URL và quay về trang 1.
  useEffect(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (debounced.trim()) next.set('tim', debounced.trim())
        else next.delete('tim')
        next.delete('trang')
        return next
      },
      { replace: true },
    )
  }, [debounced, setParams])

  // Đồng bộ ngược: khi URL đổi từ nơi khác (ví dụ ô tìm kiếm trên header).
  useEffect(() => {
    const fromUrl = params.get('tim') ?? ''
    setKeyword((current) => (current === fromUrl ? current : fromUrl))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get('tim')])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'tat-ca') next.set(key, value)
    else next.delete(key)
    if (key !== 'trang') next.delete('trang')
    setParams(next)
  }

  // Lọc và sắp xếp. useMemo tránh tính lại khi các state khác thay đổi.
  const filtered = useMemo(() => {
    const q = removeAccents(debounced.trim())

    let result = articles.filter((a) => {
      const matchCategory = category === 'tat-ca' || a.category === category
      if (!matchCategory) return false
      if (!q) return true
      const haystack = removeAccents(`${a.title} ${a.excerpt} ${a.tags.join(' ')} ${a.author}`)
      return haystack.includes(q)
    })

    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'cu-nhat':
          return new Date(a.date) - new Date(b.date)
        case 'doc-nhanh':
          return a.readTime - b.readTime
        case 'tieu-de':
          return a.title.localeCompare(b.title, 'vi')
        default:
          return new Date(b.date) - new Date(a.date)
      }
    })

    return result
  }, [debounced, category, sort])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const safePage = Math.min(page, Math.max(1, totalPages))
  const visible = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  const chip = (active) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active
        ? 'bg-brand-600 text-white'
        : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800'
    }`

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-white">Bài viết</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Tìm kiếm và lọc trong {articles.length} bài viết.
        </p>
      </header>

      {/* Thanh công cụ lọc */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
        <label className="relative flex-1">
          <span className="sr-only">Tìm kiếm</span>
          <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Nhập từ khoá, tên tác giả hoặc thẻ..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pr-3 pl-9 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="whitespace-nowrap text-slate-500 dark:text-slate-400">Sắp xếp:</span>
          <select
            value={sort}
            onChange={(e) => updateParam('sap-xep', e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Lọc theo danh mục */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateParam('danh-muc', 'tat-ca')}
          className={chip(category === 'tat-ca')}
        >
          Tất cả
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => updateParam('danh-muc', c.slug)}
            className={chip(category === c.slug)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
        Tìm thấy <strong className="text-slate-900 dark:text-white">{filtered.length}</strong> bài
        viết
        {debounced.trim() && (
          <>
            {' '}
            cho từ khoá “<strong>{debounced.trim()}</strong>”
          </>
        )}
        .
      </p>

      {visible.length === 0 ? (
        <EmptyState
          title="Không tìm thấy bài viết phù hợp"
          description="Thử dùng từ khoá ngắn hơn hoặc bỏ bớt bộ lọc danh mục."
          action={
            <Link
              to="/bai-viet"
              onClick={() => setKeyword('')}
              className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Xoá bộ lọc
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} />
          ))}
        </div>
      )}

      <Pagination
        page={safePage}
        totalPages={totalPages}
        onChange={(p) => updateParam('trang', String(p))}
      />
    </div>
  )
}
