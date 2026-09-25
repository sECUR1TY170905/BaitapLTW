import { useState } from 'react'
import { IconChat } from './Icons'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatDate, initials } from '../utils/format'

/**
 * Khu vực bình luận của một bài viết.
 * Vì bài thực hành chưa có máy chủ, bình luận được lưu trong localStorage theo slug
 * bài viết. Biểu mẫu có kiểm tra dữ liệu ngay tại giao diện.
 */
export default function CommentSection({ slug }) {
  const [comments, setComments] = useLocalStorage(`blog.comments.${slug}`, [])
  const [form, setForm] = useState({ name: '', text: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Tên phải có ít nhất 2 ký tự.'
    if (form.text.trim().length < 10) next.text = 'Bình luận phải có ít nhất 10 ký tự.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setComments((prev) => [
      {
        id: Date.now(),
        name: form.name.trim(),
        text: form.text.trim(),
        date: new Date().toISOString(),
      },
      ...prev,
    ])
    setForm({ name: '', text: '' })
    setErrors({})
  }

  const field = (key) =>
    `w-full rounded-lg border bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-brand-500 dark:bg-slate-800 ${
      errors[key] ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'
    }`

  return (
    <section className="mt-14 border-t border-slate-200 pt-10 dark:border-slate-800">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
        <IconChat className="h-5 w-5 text-brand-600" />
        Bình luận ({comments.length})
      </h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="mb-4">
          <label htmlFor="cmt-name" className="mb-1.5 block text-sm font-medium">
            Tên của bạn
          </label>
          <input
            id="cmt-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nguyễn Văn A"
            className={field('name')}
          />
          {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="cmt-text" className="mb-1.5 block text-sm font-medium">
            Nội dung
          </label>
          <textarea
            id="cmt-text"
            rows={4}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Chia sẻ suy nghĩ của bạn về bài viết..."
            className={`${field('text')} resize-y`}
          />
          {errors.text && <p className="mt-1 text-xs text-rose-500">{errors.text}</p>}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Gửi bình luận
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ ý kiến.
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li
              key={c.id}
              className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-slate-800 dark:text-brand-300">
                  {initials(c.name)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{c.name}</p>
                  <time dateTime={c.date} className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(c.date)}
                  </time>
                </div>
                <button
                  type="button"
                  onClick={() => setComments((prev) => prev.filter((x) => x.id !== c.id))}
                  className="ml-auto text-xs text-slate-400 transition hover:text-rose-500"
                >
                  Xoá
                </button>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
                {c.text}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
