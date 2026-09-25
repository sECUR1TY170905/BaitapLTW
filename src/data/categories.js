// Danh mục bài viết. Mỗi danh mục có slug dùng cho URL và màu hiển thị.
export const categories = [
  { slug: 'cong-nghe',  name: 'Công nghệ',   color: 'bg-blue-500',    desc: 'Xu hướng phần mềm, phần cứng và chuyển đổi số.' },
  { slug: 'lap-trinh',  name: 'Lập trình',   color: 'bg-emerald-500', desc: 'Ngôn ngữ, framework và kinh nghiệm viết code.' },
  { slug: 'ai',         name: 'Trí tuệ NT',  color: 'bg-purple-500',  desc: 'Machine learning, LLM và ứng dụng thực tế.' },
  { slug: 'doi-song',   name: 'Đời sống',    color: 'bg-amber-500',   desc: 'Kỹ năng mềm, sức khoẻ và cân bằng công việc.' },
  { slug: 'giao-duc',   name: 'Giáo dục',    color: 'bg-rose-500',    desc: 'Học tập, nghiên cứu và định hướng nghề nghiệp.' },
]

export const getCategory = (slug) => categories.find((c) => c.slug === slug)
