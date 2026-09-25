import { articles, allAuthors } from '../data/articles'
import { categories } from '../data/categories'

const techStack = [
  { name: 'React 19', desc: 'Thư viện xây dựng giao diện theo thành phần.' },
  { name: 'Vite', desc: 'Công cụ build và máy chủ phát triển siêu nhanh.' },
  { name: 'React Router 7', desc: 'Định tuyến phía trình duyệt cho ứng dụng một trang.' },
  { name: 'Tailwind CSS 4', desc: 'Framework CSS theo tiện ích, cấu hình ngay trong CSS.' },
]

const features = [
  'Định tuyến nhiều trang với React Router, tải trang theo nhu cầu (lazy loading).',
  'Tìm kiếm không phân biệt dấu tiếng Việt, có trì hoãn để giảm số lần lọc.',
  'Lọc theo danh mục, sắp xếp và phân trang — trạng thái lưu trên thanh địa chỉ.',
  'Lưu bài viết yêu thích và bình luận, dữ liệu giữ lại trong localStorage.',
  'Chế độ sáng/tối tự nhớ lựa chọn của người dùng.',
  'Giao diện đáp ứng từ điện thoại tới màn hình rộng.',
]

export default function About() {
  const stats = [
    { label: 'Bài viết', value: articles.length },
    { label: 'Danh mục', value: categories.length },
    { label: 'Tác giả', value: allAuthors.length },
    { label: 'Trang giao diện', value: 7 },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10">
      <h1 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white">Giới thiệu</h1>
      <p className="mb-10 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        TinTech là trang tin công nghệ được xây dựng làm bài thực hành môn Lập trình Web. Mục tiêu của dự án
        là thực hành đầy đủ các kỹ thuật lập trình giao diện với React: chia nhỏ thành phần, quản lý
        trạng thái, định tuyến và tối ưu trải nghiệm người dùng.
      </p>

      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-3xl font-extrabold text-brand-600">{s.value}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Công nghệ sử dụng</h2>
      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        {techStack.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="mb-1 font-bold text-slate-900 dark:text-white">{t.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{t.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Chức năng chính</h2>
      <ul className="mb-12 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex gap-3 text-slate-700 dark:text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
            <span className="text-sm leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Liên hệ</h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
          Mọi góp ý về nội dung hoặc giao diện, bạn có thể gửi qua biểu mẫu bên dưới.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.currentTarget.reset()
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <input
            required
            placeholder="Họ và tên"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
          />
          <textarea
            required
            rows={4}
            placeholder="Nội dung góp ý"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 sm:col-span-2 dark:border-slate-700 dark:bg-slate-800"
          />
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 sm:col-span-2 sm:justify-self-start"
          >
            Gửi góp ý
          </button>
        </form>
      </div>
    </div>
  )
}
