export type NewsContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'pullQuote'; quote: string; author?: string }
  | { type: 'image'; src: string; caption?: string; alt?: string }
  | { type: 'takeaway'; title: string; items: string[] };

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'project' | 'architecture' | 'market' | 'lifestyle';
  categoryLabel: string;
  date: string;
  isoDate: string;
  modifiedDate: string;
  readTime: string;
  featured: boolean;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  content: NewsContentBlock[];
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    slug: 'le-khoi-cong-va-tien-do-thi-cong-alize-da-nang-2026',
    title: 'Tiến độ thi công Alizé Residence: Biểu tượng mới bên bờ biển Mỹ Khê',
    excerpt:
      'Cập nhật tiến độ xây dựng mới nhất của tổ hợp căn hộ khách sạn và dinh thự biển Alizé Residence tại mặt tiền đường Võ Nguyên Giáp, thành phố Đà Nẵng.',
    category: 'project',
    categoryLabel: 'Dự án',
    date: '15 Tháng 09, 2026',
    isoDate: '2026-09-15T08:00:00+07:00',
    modifiedDate: '2026-09-16T10:00:00+07:00',
    readTime: '4 phút đọc',
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1920',
    author: {
      name: 'Ban Quản Lý Dự Án',
      role: 'Alizé Residence & DXMD Vietnam',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    tags: ['Tiến độ', 'Hạ tầng', 'Mỹ Khê', 'Đà Nẵng'],
    content: [
      {
        type: 'paragraph',
        text: 'Nằm tại vị trí kim cương ngay mặt tiền đường Võ Nguyên Giáp, hướng trọn tầm nhìn không giới hạn ra bãi biển Mỹ Khê – một trong những bờ biển đẹp nhất hành tinh, Alizé Residence đang từng ngày định hình diện mạo của một kiệt tác nghỉ dưỡng thượng lưu.',
      },
      {
        type: 'pullQuote',
        quote:
          'Chúng tôi không chỉ kiến tạo một tòa tháp căn hộ, mà đang dựng xây một biểu tượng vượt thời gian, nơi đại dương và nghệ thuật kiến trúc Địa Trung Hải giao hòa.',
        author: 'Đại diện Đơn vị Phát triển Dự án DXMD Vietnam',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Hoàn thành các hạng mục móng cọc và kết cấu ngầm',
      },
      {
        type: 'paragraph',
        text: 'Tính đến quý 3 năm 2026, toàn bộ hệ thống cọc khoan nhồi sâu và tường vây tiêu chuẩn quốc tế đã được nghiệm thu với độ chính xác tuyệt đối. Đơn vị tổng thầu đang đẩy mạnh thi công các tầng hầm kỹ thuật hiện đại, bảo đảm tiến độ bàn giao đúng cam kết vào quý 4/2026.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&q=85&w=1600',
        caption: 'Công trường Alizé Residence vận hành liên tục với tiêu chuẩn an toàn nghiêm ngặt',
        alt: 'Tiến độ thi công Alizé Residence',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Hệ thống vật liệu và công nghệ hoàn thiện chuẩn khách sạn 5 sao',
      },
      {
        type: 'paragraph',
        text: 'Song song với tiến độ thô, các gói thầu cung ứng vật liệu nội thất cao cấp từ Villeroy & Boch, hệ kính Low-E 3 lớp cách nhiệt cản tia UV từ châu Âu, cùng hệ thống điều hòa khí tươi Aerothermal tiết kiệm năng lượng đã được ký kết chuyển giao đến dự án.',
      },
      {
        type: 'takeaway',
        title: 'Điểm nhấn quan trọng của dự án',
        items: [
          'Vị trí độc tôn trực diện mặt biển Mỹ Khê, Đà Nẵng.',
          'Quy mô 1 tòa tháp 39 tầng nổi cùng 3 tầng hầm thông minh.',
          'Hệ sinh thái tiện ích đặc quyền: Hồ bơi vô cực chân mây, Sky Bar, Spa thượng lưu.',
          'Dự kiến bàn giao vào cuối năm 2026 với chất lượng hoàn thiện 5 sao quốc tế.',
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'triet-ly-kien-truc-dia-trung-hai-tai-alize',
    title: 'Triết lý kiến trúc Địa Trung Hải đương đại tại Alizé Residence',
    excerpt:
      'Khám phá ngôn ngữ thiết kế cổng vòm mềm mại, đường cong duyên dáng và cách đưa ánh sáng tự nhiên vào từng không gian sống tại Alizé.',
    category: 'architecture',
    categoryLabel: 'Kiến trúc',
    date: '10 Tháng 09, 2026',
    isoDate: '2026-09-10T09:30:00+07:00',
    modifiedDate: '2026-09-12T14:00:00+07:00',
    readTime: '6 phút đọc',
    featured: false,
    coverImage:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=85&w=1920',
    author: {
      name: 'Elena Rostova',
      role: 'Giám đốc Thiết kế Kiến trúc',
      avatar:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    },
    tags: ['Kiến trúc', 'Thiết kế', 'Nội thất', 'Địa Trung Hải'],
    content: [
      {
        type: 'paragraph',
        text: 'Kiến trúc Địa Trung Hải không chỉ là một phong cách thẩm mỹ – đó là một triết lý sống tôn vinh sự thư thái, kết nối sâu sắc với biển cả và nguồn ánh sáng nguyên bản của thiên nhiên.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Cổng vòm Archway – Dấu ấn thị giác vượt thời gian',
      },
      {
        type: 'paragraph',
        text: 'Tại Alizé, hệ thống vòm cong không đơn thuần là chi tiết trang trí mà đóng vai trò như chiếc khung tranh mở ra đại dương bao la. Mỗi ô cửa, ban công kính uốn lượn đều hướng tầm nhìn trực diện vào màu xanh ngọc bích của vịnh biển Đà Nẵng.',
      },
      {
        type: 'pullQuote',
        quote:
          'Chúng tôi mong muốn mỗi khi bước chân qua cánh cửa, chủ nhân sẽ cảm nhận được sự dịu dàng của gió biển và sự bình yên vô giá của một chốn về hoàn mỹ.',
        author: 'Elena Rostova',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1600',
        caption: 'Không gian mở kết nối trực tiếp phòng khách với ban công đón nắng biển',
        alt: 'Nội thất phòng khách Alizé Residence',
      },
      {
        type: 'paragraph',
        text: 'Bảng màu của Alizé được chắt lọc từ thiên nhiên miền biển: sắc cát mịn màng (#F4F3ED), tông gỗ óc chó ấm áp, điểm xuyết màu xanh lam thăm thẳm của đại dương (#0D2D40).',
      },
    ],
  },
  {
    id: '3',
    slug: 'bat-dong-san-hang-hieu-ven-bien-da-nang-suc-hut-2026',
    title: 'Thị trường bất động sản hàng hiệu ven biển Đà Nẵng: Sức hút năm 2026',
    excerpt:
      'Phân tích tiềm năng sinh lời và giá trị tích sản bền vững của phân khúc Branded Residences bên dải bờ biển du lịch đắt giá nhất miền Trung.',
    category: 'market',
    categoryLabel: 'Thị trường',
    date: '02 Tháng 09, 2026',
    isoDate: '2026-09-02T14:15:00+07:00',
    modifiedDate: '2026-09-05T11:00:00+07:00',
    readTime: '5 phút đọc',
    featured: false,
    coverImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=85&w=1920',
    author: {
      name: 'Trần Minh Đức',
      role: 'Chuyên gia Nghiên cứu Thị trường',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    tags: ['Đầu tư', 'Thị trường', 'Bất động sản', 'Branded Residences'],
    content: [
      {
        type: 'paragraph',
        text: 'Trong làn sóng chuyển dịch dòng tiền vào các tài sản có giá trị thực và khả năng khai thác du lịch cao, các bất động sản sở hữu vị trí mặt biển khan hiếm tại Đà Nẵng đang chứng kiến mức tăng trưởng ấn tượng.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Khan hiếm quỹ đất trực diện biển Mỹ Khê',
      },
      {
        type: 'paragraph',
        text: 'Đường Võ Nguyên Giáp từ lâu đã được mệnh danh là dải đất tỷ đô của Đà Nẵng. Với quy hoạch hạn chế chiều cao và bảo tồn cảnh quan bờ biển mới, Alizé Residence là một trong những dự án cao tầng cuối cùng được cấp phép phát triển căn hộ cao cấp sở hữu tầm nhìn vĩnh cửu.',
      },
      {
        type: 'takeaway',
        title: 'Ba động lực tăng trưởng chính',
        items: [
          'Sự bùng nổ của khách du lịch quốc tế cao cấp và chuyên gia toàn cầu đến Đà Nẵng.',
          'Tỷ suất sinh lời kép từ cho thuê lưu trú và gia tăng giá trị tài sản dài hạn.',
          'Chuẩn mực dịch vụ quản lý vận hành theo tiêu chuẩn khách sạn thượng hạng.',
        ],
      },
    ],
  },
  {
    id: '4',
    slug: 'nghe-thuat-song-cham-ben-bo-bien-my-khe',
    title: 'Nghệ thuật sống chậm và tận hưởng khoảnh khắc bên bờ biển Mỹ Khê',
    excerpt:
      'Khám phá phong cách sống của những chủ nhân Alizé: thức giấc cùng bình minh trên biển, thưởng trà chiều và đắm mình trong hoàng hôn nhiệt đới.',
    category: 'lifestyle',
    categoryLabel: 'Phong cách sống',
    date: '25 Tháng 08, 2026',
    isoDate: '2026-08-25T16:45:00+07:00',
    modifiedDate: '2026-08-28T09:00:00+07:00',
    readTime: '3 phút đọc',
    featured: false,
    coverImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1920',
    author: {
      name: 'Lê Thảo Nguyên',
      role: 'Biên tập viên Phong cách sống',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    },
    tags: ['Lifestyle', 'Biển Mỹ Khê', 'Sống chậm', 'Nghỉ dưỡng'],
    content: [
      {
        type: 'paragraph',
        text: 'Giữa nhịp sống vội vã của kỷ nguyên số, một chốn trở về đúng nghĩa là nơi bạn có thể thở sâu, lắng nghe tiếng sóng vỗ rì rào và cảm nhận từng làn gió mát lành thổi vào từ khơi xa.',
      },
      {
        type: 'pullQuote',
        quote:
          'Sống chậm không phải là làm ít đi, mà là sống trọn vẹn hơn trong từng khoảnh khắc hiện tại.',
        author: 'Alizé Living Journal',
      },
      {
        type: 'paragraph',
        text: 'Mỗi ngày tại Alizé Residence là một bản hòa ca giữa sự tĩnh lặng của thiên nhiên và những tiện ích xa xỉ được chăm chút đến từng giác quan.',
      },
    ],
  },
];
