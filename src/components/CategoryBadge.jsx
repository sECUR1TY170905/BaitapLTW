import { Link } from 'react-router-dom'
import { getCategory } from '../data/categories'

/** Nhãn danh mục, bấm vào sẽ lọc danh sách bài viết theo danh mục đó. */
export default function CategoryBadge({ slug, className = '' }) {
  const category = getCategory(slug)
  if (!category) return null

  return (
    <Link
      to={`/bai-viet?danh-muc=${category.slug}`}
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold text-white transition hover:opacity-85 ${category.color} ${className}`}
    >
      {category.name}
    </Link>
  )
}
