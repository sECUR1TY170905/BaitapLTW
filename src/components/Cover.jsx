import { useState } from 'react'
import { getCategory } from '../data/categories'

// Bảng màu dự phòng khi không tải được ảnh minh hoạ.
const gradients = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-fuchsia-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-blue-600',
]

/**
 * Ảnh bìa của bài viết.
 * Nếu ảnh không tải được (mất mạng, sai đường dẫn) thì hiển thị nền chuyển màu
 * kèm tên danh mục — nhờ vậy bố cục không bị vỡ.
 */
export default function Cover({ article, className = '', ratio = 'aspect-[16/9]' }) {
  const [failed, setFailed] = useState(false)
  const gradient = gradients[article.id % gradients.length]
  const category = getCategory(article.category)

  if (failed) {
    return (
      <div
        className={`${ratio} ${className} flex items-center justify-center bg-gradient-to-br ${gradient}`}
      >
        <span className="px-4 text-center text-sm font-semibold uppercase tracking-widest text-white/90">
          {category?.name ?? 'Bài viết'}
        </span>
      </div>
    )
  }

  return (
    <img
      src={`https://picsum.photos/seed/blog-${article.id}/960/540`}
      alt={article.title}
      loading="lazy"
      width={960}
      height={540}
      onError={() => setFailed(true)}
      className={`${ratio} ${className} w-full object-cover`}
    />
  )
}
