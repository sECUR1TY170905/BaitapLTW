# TinTech — Trang tin công nghệ (Bài thực hành Lập trình Web)

Ứng dụng web một trang (SPA) mô phỏng một trang tin công nghệ, xây dựng bằng **React 19**,
**Vite**, **React Router 7** và **Tailwind CSS 4**.

Đây là bài tập môn Lập trình Web, tập trung vào phần **lập trình giao diện frontend**:
chia nhỏ thành phần, quản lý trạng thái, định tuyến và tối ưu trải nghiệm người dùng.

## Chức năng

| Nhóm | Mô tả |
| --- | --- |
| Duyệt nội dung | Trang chủ với bài nổi bật, danh sách bài viết, trang danh mục, trang chi tiết |
| Tìm kiếm | Không phân biệt dấu tiếng Việt (`lap trinh` khớp `lập trình`), có debounce 300ms |
| Lọc & sắp xếp | Theo danh mục, theo ngày / thời gian đọc / tiêu đề, kèm phân trang |
| Lưu bài viết | Đánh dấu bài yêu thích, lưu trong `localStorage`, có trang riêng |
| Bình luận | Thêm / xoá bình luận cho từng bài, có kiểm tra dữ liệu nhập |
| Giao diện | Chế độ sáng/tối tự nhớ lựa chọn, bố cục đáp ứng từ điện thoại tới desktop |
| Trải nghiệm | Thanh tiến độ đọc, tự cuộn lên đầu khi đổi trang, nút về đầu trang, trang 404 |

## Yêu cầu môi trường

- Node.js >= 20
- npm >= 10

## Cài đặt và chạy

```bash
# 1. Cài đặt thư viện
npm install

# 2. Chạy máy chủ phát triển (http://localhost:5173)
npm run dev

# 3. Build bản phát hành vào thư mục dist/
npm run build

# 4. Xem thử bản build
npm run preview

# 5. Kiểm tra mã nguồn
npm run lint
```

## Cấu trúc thư mục

```
src/
├── components/          # Thành phần giao diện dùng lại nhiều nơi
│   ├── ArticleCard.jsx      # Thẻ bài viết trong danh sách
│   ├── CategoryBadge.jsx    # Nhãn danh mục
│   ├── CommentSection.jsx   # Khu vực bình luận
│   ├── Cover.jsx            # Ảnh bìa, có nền dự phòng khi lỗi ảnh
│   ├── EmptyState.jsx       # Khối thông báo danh sách rỗng
│   ├── Footer.jsx
│   ├── Header.jsx           # Điều hướng, tìm kiếm, đổi giao diện
│   ├── Icons.jsx            # Bộ biểu tượng SVG nội tuyến
│   ├── Pagination.jsx       # Phân trang
│   └── ScrollToTop.jsx
├── context/             # Trạng thái dùng chung toàn ứng dụng
│   ├── BookmarkContext.jsx  # Danh sách bài đã lưu
│   └── ThemeContext.jsx     # Chế độ sáng / tối
├── data/                # Dữ liệu mẫu (thay cho API)
│   ├── articles.js
│   └── categories.js
├── hooks/               # Hook tự viết
│   ├── useDebounce.js
│   └── useLocalStorage.js
├── pages/               # Mỗi file là một tuyến đường
│   ├── About.jsx
│   ├── ArticleDetail.jsx
│   ├── Articles.jsx
│   ├── Bookmarks.jsx
│   ├── Categories.jsx
│   ├── Home.jsx
│   └── NotFound.jsx
├── utils/
│   └── format.js        # Định dạng ngày, bỏ dấu tiếng Việt
├── App.jsx              # Khai báo tuyến đường + lazy loading
├── index.css            # Cấu hình Tailwind v4 và style toàn cục
└── main.jsx             # Điểm khởi động, bọc các Provider
```

## Bảng tuyến đường

| Đường dẫn | Trang | Ghi chú |
| --- | --- | --- |
| `/` | Home | Bài nổi bật, danh mục, bài mới nhất |
| `/bai-viet` | Articles | Hỗ trợ query: `tim`, `danh-muc`, `sap-xep`, `trang` |
| `/bai-viet/:slug` | ArticleDetail | Nội dung, bài liên quan, bình luận |
| `/danh-muc` | Categories | Tổng quan 5 chủ đề |
| `/da-luu` | Bookmarks | Bài viết đã đánh dấu |
| `/gioi-thieu` | About | Giới thiệu dự án, biểu mẫu liên hệ |
| `*` | NotFound | Trang 404 |

## Ghi chú kỹ thuật

- **Tailwind CSS 4** không dùng file `tailwind.config.js`; toàn bộ biến thiết kế khai báo
  trong `src/index.css` bằng chỉ thị `@theme`. Chế độ tối bật qua `@custom-variant dark`.
- **Lazy loading**: các trang ngoài trang chủ được nạp bằng `React.lazy` + `Suspense`,
  nhờ vậy gói JavaScript ban đầu chỉ chứa những gì cần cho màn hình đầu tiên.
- **Trạng thái trên URL**: bộ lọc của trang danh sách lưu trên query string nên có thể
  chia sẻ đường dẫn và dùng được nút Quay lại của trình duyệt.
- **Không có backend**: dữ liệu bài viết nằm trong `src/data/`, dữ liệu người dùng
  (bài đã lưu, bình luận, giao diện) lưu trong `localStorage` của trình duyệt.

## Tài liệu

Báo cáo bài thực hành được nộp riêng dưới dạng file Word, không kèm trong kho mã nguồn này.
