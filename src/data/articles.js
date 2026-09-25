// Dữ liệu mẫu cho blog. Trong thực tế phần này sẽ được thay bằng lời gọi API.
// Mỗi bài viết gồm: định danh, tiêu đề, mô tả ngắn, nội dung và siêu dữ liệu.

const body = (intro, sections) => ({ intro, sections })

export const articles = [
  {
    id: 1,
    slug: 'react-19-co-gi-moi',
    title: 'React 19 có gì mới và vì sao bạn nên quan tâm',
    excerpt:
      'Actions, hook useOptimistic, Server Components ổn định — React 19 thay đổi cách chúng ta xử lý trạng thái bất đồng bộ trong giao diện.',
    category: 'lap-trinh',
    author: 'Nguyễn Minh Anh',
    date: '2026-09-18',
    readTime: 7,
    featured: true,
    tags: ['React', 'Frontend', 'JavaScript'],
    content: body(
      'React 19 là bản phát hành lớn nhất kể từ khi Hooks ra đời. Thay vì thêm hàng loạt API mới, đội ngũ React tập trung giải quyết một vấn đề cũ: quản lý trạng thái của các thao tác bất đồng bộ như gửi biểu mẫu, tải dữ liệu hay cập nhật lạc quan.',
      [
        {
          heading: 'Actions — chuẩn hoá thao tác bất đồng bộ',
          paragraphs: [
            'Trước đây, mỗi lần gửi biểu mẫu lập trình viên phải tự quản lý ba trạng thái: đang gửi, thành công và lỗi. React 19 đưa khái niệm Action vào thẳng thẻ form, kèm hook useActionState để lấy về trạng thái đó mà không cần viết thêm useState.',
            'Kết quả là mã nguồn ngắn hơn đáng kể và ít lỗi quên đặt lại cờ loading hơn. Đây là thay đổi có ảnh hưởng trực tiếp tới mọi ứng dụng có biểu mẫu, tức là gần như mọi ứng dụng.',
          ],
          list: [
            'useActionState: gộp trạng thái gửi, kết quả và lỗi vào một hook duy nhất.',
            'useFormStatus: cho phép nút bấm con tự biết biểu mẫu cha đang gửi hay chưa.',
            'useOptimistic: hiển thị kết quả dự kiến ngay lập tức rồi tự hoàn tác nếu máy chủ trả lỗi.',
          ],
        },
        {
          heading: 'Trình biên dịch React Compiler',
          paragraphs: [
            'React Compiler tự động chèn ghi nhớ (memoization) vào mã nguồn tại bước build. Nói cách khác, phần lớn các lời gọi useMemo và useCallback viết tay trở nên không cần thiết.',
            'Với dự án vừa và nhỏ, lợi ích rõ nhất không phải là tốc độ mà là mã nguồn sạch hơn: lập trình viên tập trung mô tả giao diện thay vì tối ưu thủ công.',
          ],
        },
        {
          heading: 'Nên nâng cấp ngay hay chờ?',
          paragraphs: [
            'Nếu dự án đang dùng React 18 và không phụ thuộc thư viện bên thứ ba đã ngừng bảo trì, việc nâng cấp khá nhẹ nhàng. Ngược lại, hãy chờ hệ sinh thái ổn định thêm một vài tháng.',
          ],
          quote:
            'Bản nâng cấp tốt là bản nâng cấp mà người dùng cuối không nhận ra điều gì đã thay đổi, ngoài việc mọi thứ nhanh hơn.',
        },
      ],
    ),
  },
  {
    id: 2,
    slug: 'tailwind-css-v4-thay-doi',
    title: 'Tailwind CSS v4: cấu hình bằng CSS thay vì JavaScript',
    excerpt:
      'Phiên bản 4 bỏ file tailwind.config.js, chuyển toàn bộ cấu hình vào CSS với chỉ thị @theme và tăng tốc build nhiều lần.',
    category: 'lap-trinh',
    author: 'Trần Quốc Bảo',
    date: '2026-09-15',
    readTime: 6,
    featured: true,
    tags: ['CSS', 'Tailwind', 'Frontend'],
    content: body(
      'Tailwind CSS v4 viết lại phần lõi bằng Rust và thay đổi cách khai báo cấu hình. Thay vì một file JavaScript riêng, toàn bộ biến thiết kế nằm ngay trong CSS.',
      [
        {
          heading: 'Chỉ thị @theme',
          paragraphs: [
            'Mọi màu sắc, phông chữ, khoảng cách đều khai báo dưới dạng biến CSS trong khối @theme. Điều này có hai lợi ích: trình duyệt hiểu được các biến đó lúc chạy, và các công cụ khác cũng đọc được mà không cần hiểu cấu hình Tailwind.',
          ],
          list: [
            'Không còn bước quét nội dung thủ công — Tailwind tự phát hiện file nguồn.',
            'Import chỉ bằng một dòng: @import "tailwindcss".',
            'Plugin cho Vite giúp bỏ luôn PostCSS khỏi chuỗi công cụ.',
          ],
        },
        {
          heading: 'Dark mode theo lớp',
          paragraphs: [
            'Ở v4, chế độ tối mặc định dựa theo thiết lập hệ điều hành. Nếu muốn người dùng tự bật tắt, cần khai báo biến thể tuỳ chỉnh bằng @custom-variant. Đây là điểm nhiều người mới nâng cấp hay vấp phải.',
          ],
        },
        {
          heading: 'Hiệu năng',
          paragraphs: [
            'Build lần đầu nhanh hơn khoảng năm lần, build tăng dần gần như tức thì. Với dự án bài tập thì khác biệt không lớn, nhưng với ứng dụng hàng nghìn thành phần thì rất đáng kể.',
          ],
        },
      ],
    ),
  },
  {
    id: 3,
    slug: 'llm-trong-san-pham-thuc-te',
    title: 'Đưa mô hình ngôn ngữ lớn vào sản phẩm thực tế',
    excerpt:
      'Từ bản demo chạy được tới sản phẩm ổn định là một quãng đường dài: kiểm thử, chi phí, độ trễ và xử lý trường hợp mô hình trả lời sai.',
    category: 'ai',
    author: 'Lê Thu Hà',
    date: '2026-09-12',
    readTime: 9,
    featured: true,
    tags: ['AI', 'LLM', 'Sản phẩm'],
    content: body(
      'Dựng một bản demo dùng mô hình ngôn ngữ lớn chỉ mất vài giờ. Nhưng đưa nó ra cho hàng nghìn người dùng thật lại đặt ra những câu hỏi hoàn toàn khác.',
      [
        {
          heading: 'Ba bài toán kỹ thuật',
          paragraphs: [
            'Thứ nhất là độ trễ: người dùng không chờ quá vài giây. Giải pháp phổ biến là phát trực tiếp từng phần câu trả lời thay vì chờ toàn bộ.',
            'Thứ hai là chi phí: mỗi lời gọi đều tốn tiền, nên cần bộ nhớ đệm cho các câu hỏi lặp lại và chọn mô hình nhỏ hơn cho tác vụ đơn giản.',
            'Thứ ba là độ tin cậy: mô hình có thể trả lời sai một cách rất thuyết phục. Sản phẩm tốt luôn có cơ chế cho người dùng kiểm chứng nguồn.',
          ],
          list: [
            'Phát trực tiếp (streaming) để giảm cảm giác chờ đợi.',
            'Đệm kết quả cho câu hỏi thường gặp.',
            'Ghi lại nhật ký để đánh giá chất lượng theo thời gian.',
          ],
        },
        {
          heading: 'Thiết kế giao diện cho sự không chắc chắn',
          paragraphs: [
            'Giao diện nên thể hiện rõ đây là kết quả do máy sinh ra, kèm nút sao chép, nút tạo lại và đường dẫn tới nguồn tham khảo. Sự minh bạch giúp người dùng tin tưởng hơn là việc giấu đi giới hạn của mô hình.',
          ],
          quote:
            'Người dùng tha thứ cho một câu trả lời sai được đánh dấu rõ ràng, nhưng không tha thứ cho một câu trả lời sai được trình bày như sự thật.',
        },
      ],
    ),
  },
  {
    id: 4,
    slug: 'toi-uu-hieu-nang-web',
    title: 'Bảy kỹ thuật tối ưu hiệu năng web bạn nên áp dụng ngay',
    excerpt:
      'Ảnh chiếm phần lớn dung lượng trang. Trước khi nghĩ tới những kỹ thuật phức tạp, hãy xử lý ảnh, phông chữ và mã JavaScript không dùng tới.',
    category: 'cong-nghe',
    author: 'Phạm Đức Long',
    date: '2026-09-08',
    readTime: 8,
    featured: false,
    tags: ['Hiệu năng', 'Web', 'Tối ưu'],
    content: body(
      'Hiệu năng không phải là công việc làm một lần rồi thôi. Nhưng có một vài kỹ thuật cho hiệu quả cao ngay lập tức mà chi phí triển khai rất thấp.',
      [
        {
          heading: 'Bắt đầu từ ảnh',
          paragraphs: [
            'Trên phần lớn trang web, ảnh chiếm hơn một nửa dung lượng tải về. Chuyển sang định dạng WebP hoặc AVIF thường giảm được 30 đến 50 phần trăm dung lượng mà mắt thường không phân biệt được.',
            'Thêm thuộc tính width và height cho mọi thẻ img để trình duyệt giữ chỗ sẵn, tránh hiện tượng nội dung nhảy khi ảnh tải xong.',
          ],
          list: [
            'Dùng loading="lazy" cho ảnh nằm ngoài màn hình đầu tiên.',
            'Nén phông chữ và chỉ tải các nét thực sự dùng.',
            'Tách gói JavaScript theo tuyến đường (route-based code splitting).',
            'Bật nén Brotli ở phía máy chủ.',
          ],
        },
        {
          heading: 'Đo trước, tối ưu sau',
          paragraphs: [
            'Công cụ Lighthouse trong trình duyệt cho biết ba chỉ số quan trọng nhất. Hãy đo trên thiết bị di động tầm trung thay vì máy tính của lập trình viên — đó mới là trải nghiệm của đa số người dùng.',
          ],
        },
      ],
    ),
  },
  {
    id: 5,
    slug: 'hoc-lap-trinh-tu-con-so-khong',
    title: 'Học lập trình từ con số không: lộ trình sáu tháng',
    excerpt:
      'Không cần học hết mọi thứ. Chọn một hướng, làm dự án thật và kiên trì đều đặn quan trọng hơn là sưu tầm khoá học.',
    category: 'giao-duc',
    author: 'Vũ Ngọc Mai',
    date: '2026-09-05',
    readTime: 10,
    featured: false,
    tags: ['Học tập', 'Nghề nghiệp', 'Lộ trình'],
    content: body(
      'Câu hỏi thường gặp nhất của người mới là nên học ngôn ngữ nào trước. Câu trả lời ít người thích nghe: ngôn ngữ nào cũng được, miễn là bạn gắn bó đủ lâu để làm xong một sản phẩm hoàn chỉnh.',
      [
        {
          heading: 'Hai tháng đầu — nền tảng',
          paragraphs: [
            'Tập trung vào biến, vòng lặp, hàm, cấu trúc dữ liệu cơ bản và cách đọc thông báo lỗi. Giai đoạn này nên viết nhiều bài tập nhỏ hơn là xem video dài.',
          ],
        },
        {
          heading: 'Hai tháng tiếp — dự án đầu tiên',
          paragraphs: [
            'Chọn một ý tưởng đủ nhỏ để hoàn thành trong hai tuần: danh sách việc cần làm, sổ chi tiêu, trang blog cá nhân. Điều quan trọng là làm xong, không phải làm đẹp.',
          ],
          list: [
            'Đưa mã nguồn lên GitHub ngay từ ngày đầu.',
            'Viết README mô tả cách chạy dự án.',
            'Ghi lại những lỗi đã gặp và cách khắc phục.',
          ],
        },
        {
          heading: 'Hai tháng cuối — chiều sâu',
          paragraphs: [
            'Học cách làm việc nhóm với Git, viết kiểm thử và đọc mã nguồn của người khác. Kỹ năng đọc mã người khác thường bị xem nhẹ nhưng lại chiếm phần lớn thời gian của lập trình viên đi làm.',
          ],
          quote: 'Kiên trì ba mươi phút mỗi ngày hiệu quả hơn tám tiếng mỗi cuối tuần.',
        },
      ],
    ),
  },
  {
    id: 6,
    slug: 'lam-viec-tu-xa-ben-vung',
    title: 'Làm việc từ xa bền vững: ranh giới quan trọng hơn kỷ luật',
    excerpt:
      'Vấn đề của làm việc từ xa hiếm khi là lười biếng. Vấn đề thường là không biết khi nào nên dừng lại.',
    category: 'doi-song',
    author: 'Đỗ Hải Yến',
    date: '2026-09-01',
    readTime: 5,
    featured: false,
    tags: ['Làm việc', 'Sức khoẻ', 'Thói quen'],
    content: body(
      'Sau vài năm làm việc từ xa, phần lớn mọi người nhận ra rằng khó khăn lớn nhất không phải là tập trung mà là tách bạch công việc với cuộc sống.',
      [
        {
          heading: 'Ranh giới vật lý',
          paragraphs: [
            'Một góc bàn cố định, chỉ dùng cho công việc, tạo tín hiệu rõ ràng cho não bộ. Khi rời khỏi góc đó, công việc kết thúc.',
          ],
          list: [
            'Bắt đầu và kết thúc ngày làm việc bằng một nghi thức nhỏ.',
            'Tắt thông báo ngoài giờ, không chỉ tắt tiếng.',
            'Ra khỏi nhà ít nhất một lần mỗi ngày.',
          ],
        },
        {
          heading: 'Giao tiếp bất đồng bộ',
          paragraphs: [
            'Viết rõ ràng để đồng nghiệp không cần hỏi lại là kỹ năng quan trọng nhất của đội làm việc từ xa. Một tin nhắn đầy đủ ngữ cảnh tiết kiệm được nhiều giờ chờ đợi.',
          ],
        },
      ],
    ),
  },
  {
    id: 7,
    slug: 'git-cho-nguoi-moi',
    title: 'Git cho người mới: mười lệnh giải quyết chín mươi phần trăm công việc',
    excerpt:
      'Git có hàng trăm lệnh nhưng công việc hằng ngày chỉ xoay quanh một nhóm nhỏ. Hiểu mô hình dữ liệu quan trọng hơn học thuộc lệnh.',
    category: 'lap-trinh',
    author: 'Trần Quốc Bảo',
    date: '2026-08-28',
    readTime: 7,
    featured: false,
    tags: ['Git', 'Công cụ', 'Cộng tác'],
    content: body(
      'Nhiều người học Git bằng cách ghi nhớ lệnh, rồi hoảng loạn khi gặp tình huống lạ. Cách tốt hơn là hiểu Git lưu trữ cái gì: một chuỗi ảnh chụp toàn bộ dự án, nối với nhau bằng con trỏ.',
      [
        {
          heading: 'Nhóm lệnh hằng ngày',
          paragraphs: [
            'Ba khu vực cần phân biệt: thư mục làm việc, vùng chờ và kho lưu trữ. Gần như mọi lệnh đều là chuyển dữ liệu giữa ba khu vực này.',
          ],
          list: [
            'git status — luôn chạy trước khi làm bất cứ điều gì.',
            'git add và git commit — đưa thay đổi vào lịch sử.',
            'git switch và git merge — làm việc với nhánh.',
            'git log --oneline --graph — nhìn lịch sử dưới dạng cây.',
          ],
        },
        {
          heading: 'Khi gặp xung đột',
          paragraphs: [
            'Xung đột không phải lỗi mà là tình huống Git không thể tự quyết định. Mở file, chọn phần đúng, xoá các dấu phân cách rồi commit lại là xong.',
          ],
        },
      ],
    ),
  },
  {
    id: 8,
    slug: 'thiet-ke-giao-dien-cho-nguoi-dung-that',
    title: 'Thiết kế giao diện cho người dùng thật, không phải cho nhà thiết kế',
    excerpt:
      'Một giao diện đẹp trên ảnh chụp chưa chắc dễ dùng trên điện thoại giữa trời nắng với một tay đang cầm túi.',
    category: 'cong-nghe',
    author: 'Nguyễn Minh Anh',
    date: '2026-08-24',
    readTime: 6,
    featured: false,
    tags: ['UI', 'UX', 'Thiết kế'],
    content: body(
      'Ảnh chụp thiết kế luôn được đặt trong điều kiện lý tưởng: nội dung vừa vặn, tên người dùng ngắn, mạng nhanh. Người dùng thật thì không như vậy.',
      [
        {
          heading: 'Kiểm tra với dữ liệu xấu',
          paragraphs: [
            'Hãy thử giao diện với tiêu đề dài gấp ba, danh sách rỗng, ảnh lỗi và mạng chậm. Đa số lỗi giao diện đều lộ ra ở những tình huống này.',
          ],
          list: [
            'Trạng thái rỗng phải hướng dẫn người dùng làm gì tiếp theo.',
            'Trạng thái lỗi phải nói rõ cách khắc phục.',
            'Vùng bấm tối thiểu 44 điểm ảnh cho thiết bị cảm ứng.',
          ],
        },
        {
          heading: 'Khả năng tiếp cận không phải phần thêm',
          paragraphs: [
            'Độ tương phản đủ, nhãn cho trình đọc màn hình và điều hướng bằng bàn phím nên nằm trong yêu cầu ngay từ đầu, thay vì sửa chữa ở cuối dự án.',
          ],
        },
      ],
    ),
  },
  {
    id: 9,
    slug: 'kiem-thu-tu-dong-dang-gia',
    title: 'Kiểm thử tự động: viết bao nhiêu là đủ?',
    excerpt:
      'Độ phủ một trăm phần trăm không phải mục tiêu. Mục tiêu là tự tin sửa mã nguồn mà không sợ làm hỏng thứ khác.',
    category: 'lap-trinh',
    author: 'Phạm Đức Long',
    date: '2026-08-20',
    readTime: 6,
    featured: false,
    tags: ['Kiểm thử', 'Chất lượng'],
    content: body(
      'Tranh luận về độ phủ kiểm thử thường đi lạc hướng. Con số phần trăm không nói lên chất lượng — một bộ kiểm thử phủ toàn bộ mã nguồn vẫn có thể bỏ sót lỗi nghiêm trọng.',
      [
        {
          heading: 'Ưu tiên theo rủi ro',
          paragraphs: [
            'Hãy viết kiểm thử dày cho phần logic nghiệp vụ phức tạp và phần hay thay đổi. Phần giao diện thuần trình bày thì kiểm thử thủ công nhanh hơn và rẻ hơn.',
          ],
          list: [
            'Kiểm thử đơn vị cho hàm tính toán, xử lý dữ liệu.',
            'Kiểm thử tích hợp cho luồng người dùng quan trọng nhất.',
            'Kiểm thử đầu cuối chỉ cho vài kịch bản sống còn.',
          ],
        },
      ],
    ),
  },
  {
    id: 10,
    slug: 'bao-mat-ung-dung-web-co-ban',
    title: 'Bảo mật ứng dụng web: những lỗi cơ bản vẫn còn phổ biến',
    excerpt:
      'XSS, lộ khoá API trong mã nguồn phía trình duyệt và tin tưởng dữ liệu từ người dùng vẫn là ba nguyên nhân hàng đầu.',
    category: 'cong-nghe',
    author: 'Lê Thu Hà',
    date: '2026-08-16',
    readTime: 8,
    featured: false,
    tags: ['Bảo mật', 'Web'],
    content: body(
      'Phần lớn sự cố bảo mật không đến từ kỹ thuật tấn công tinh vi, mà từ những thiếu sót cơ bản lặp đi lặp lại qua nhiều dự án.',
      [
        {
          heading: 'Không bao giờ tin dữ liệu đầu vào',
          paragraphs: [
            'Mọi dữ liệu từ trình duyệt đều có thể bị chỉnh sửa. Kiểm tra ở phía giao diện là để trải nghiệm tốt hơn, còn kiểm tra ở phía máy chủ mới là để bảo mật.',
          ],
          list: [
            'Không đặt khoá API trong mã nguồn phía trình duyệt.',
            'Mã hoá đầu ra để tránh XSS thay vì lọc đầu vào.',
            'Đặt thời hạn ngắn cho phiên đăng nhập.',
          ],
        },
        {
          heading: 'Phụ thuộc bên thứ ba',
          paragraphs: [
            'Một dự án React trung bình kéo theo hàng trăm gói phụ thuộc. Chạy kiểm tra lỗ hổng định kỳ và hạn chế thêm thư viện chỉ để dùng một hàm nhỏ.',
          ],
        },
      ],
    ),
  },
  {
    id: 11,
    slug: 'quan-ly-trang-thai-react',
    title: 'Quản lý trạng thái trong React: khi nào cần thư viện ngoài?',
    excerpt:
      'useState, Context, Redux, Zustand — mỗi công cụ giải quyết một loại vấn đề khác nhau. Chọn sai gây phức tạp không cần thiết.',
    category: 'lap-trinh',
    author: 'Vũ Ngọc Mai',
    date: '2026-08-11',
    readTime: 7,
    featured: false,
    tags: ['React', 'Kiến trúc'],
    content: body(
      'Câu hỏi nên dùng thư viện quản lý trạng thái nào thường xuất hiện quá sớm trong dự án, trước khi vấn đề thật sự tồn tại.',
      [
        {
          heading: 'Bậc thang lựa chọn',
          paragraphs: [
            'Bắt đầu bằng useState trong chính thành phần cần dữ liệu. Chỉ nâng trạng thái lên cấp cao hơn khi có thành phần anh em cần dùng chung.',
            'Context phù hợp cho dữ liệu ít thay đổi như giao diện sáng tối, ngôn ngữ hay người dùng đăng nhập. Dùng Context cho dữ liệu thay đổi liên tục sẽ gây vẽ lại nhiều.',
          ],
          list: [
            'useState — trạng thái cục bộ.',
            'Context — dữ liệu toàn cục ít thay đổi.',
            'Thư viện ngoài — trạng thái phức tạp, nhiều nơi ghi.',
          ],
        },
        {
          heading: 'Trạng thái máy chủ là loại riêng',
          paragraphs: [
            'Dữ liệu lấy từ API không nên coi như trạng thái thường. Nó cần đệm, làm mới và xử lý lỗi — đó là lý do các thư viện chuyên về truy vấn dữ liệu tồn tại.',
          ],
        },
      ],
    ),
  },
  {
    id: 12,
    slug: 'ky-nang-mem-cho-lap-trinh-vien',
    title: 'Kỹ năng mềm quyết định sự nghiệp lập trình viên như thế nào',
    excerpt:
      'Viết code giỏi đưa bạn qua vòng phỏng vấn. Giao tiếp tốt quyết định bạn đi được bao xa sau đó.',
    category: 'doi-song',
    author: 'Đỗ Hải Yến',
    date: '2026-08-06',
    readTime: 5,
    featured: false,
    tags: ['Nghề nghiệp', 'Giao tiếp'],
    content: body(
      'Ở giai đoạn đầu sự nghiệp, giá trị của một lập trình viên gần như tỉ lệ thuận với năng lực kỹ thuật. Nhưng đường cong đó phẳng dần rất nhanh.',
      [
        {
          heading: 'Viết để người khác hiểu',
          paragraphs: [
            'Mô tả pull request, tài liệu thiết kế và tin nhắn hỏi đồng nghiệp đều là hình thức viết kỹ thuật. Viết rõ ràng giúp cả đội đi nhanh hơn.',
          ],
          list: [
            'Nêu vấn đề trước, giải pháp sau.',
            'Ghi lại lý do chọn phương án, không chỉ ghi phương án.',
            'Hỏi kèm ngữ cảnh đầy đủ và những gì đã thử.',
          ],
        },
        {
          heading: 'Nhận và cho phản hồi',
          paragraphs: [
            'Đánh giá mã nguồn là nơi kỹ năng mềm thể hiện rõ nhất. Bình luận vào mã nguồn chứ không vào con người, và luôn giải thích lý do đằng sau đề nghị thay đổi.',
          ],
          quote: 'Một đội ngũ trung bình giao tiếp tốt thường vượt qua một đội ngũ giỏi nhưng rời rạc.',
        },
      ],
    ),
  },
]

// ---- Các hàm truy vấn dữ liệu ----

export const getArticleBySlug = (slug) => articles.find((a) => a.slug === slug)

export const getFeatured = () => articles.filter((a) => a.featured)

export const getRelated = (article, limit = 3) =>
  articles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, limit)

export const countByCategory = (slug) => articles.filter((a) => a.category === slug).length

export const allAuthors = [...new Set(articles.map((a) => a.author))]
