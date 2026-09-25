/** Các hàm tiện ích dùng chung cho việc hiển thị dữ liệu. */

/** Định dạng ngày theo kiểu Việt Nam: 18 tháng 9, 2026 */
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

/** Dạng rút gọn dùng trong thẻ bài viết: 18/09/2026 */
export const formatDateShort = (iso) => new Date(iso).toLocaleDateString('vi-VN')

/** Lấy chữ cái đầu của tên tác giả để hiển thị avatar chữ. */
export const initials = (name) =>
  name
    .split(' ')
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

/**
 * Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu.
 * Ví dụ: "lập trình" và "lap trinh" đều khớp nhau.
 */
export const removeAccents = (str) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
