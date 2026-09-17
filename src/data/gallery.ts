export type GalleryCategory = 'all' | 'architecture' | 'interior' | 'amenities' | 'lifestyle' | 'video';

export type LocalizedGalleryItem = {
  title?: string;
  description?: string;
  categoryLabel?: string;
  location?: string;
};

export type GalleryItem = {
  id: string;
  category: 'architecture' | 'interior' | 'amenities' | 'lifestyle' | 'video';
  image: string;
  title: string;
  description: string;
  categoryLabel: string;
  aspectRatio: 'wide' | 'tall' | 'square';
  location: string;
  photographer?: string;
  videoUrl?: string;
  featured?: boolean;
  translations?: Record<string, LocalizedGalleryItem>;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    category: 'architecture',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1920',
    title: 'Mặt đứng lượn sóng đón gió Tín Phong',
    description: 'Thiết kế kiến trúc khí động học bởi AEDAS với đường nét ban công uốn lượn mềm mại như những đợt sóng Mỹ Khê.',
    categoryLabel: 'Kiến trúc',
    aspectRatio: 'wide',
    location: 'Mặt tiền Võ Nguyên Giáp, Mỹ Khê, Đà Nẵng',
    photographer: 'AEDAS Studio & DXMD',
    featured: true,
    translations: {
      en: {
        title: 'Undulating Wind-Sculpted Façade',
        description: 'Aerodynamic architectural design by AEDAS featuring organic wave-like balconies echoing the coastal tides of My Khe.',
        categoryLabel: 'Architecture',
        location: 'Vo Nguyen Giap Boulevard, My Khe Beach, Da Nang',
      },
      zh: {
        title: '信风雕塑的流线型外立面',
        description: 'AEDAS 操刀的空气动力学建筑设计，流线型波浪阳台与美溪海滩的海浪律动相互呼应。',
        categoryLabel: '建筑外观',
        location: '岘港美溪海滩武元甲大道第一排',
      },
    },
  },
  {
    id: 'gal-02',
    category: 'amenities',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=85&w=1400',
    title: 'Hồ bơi vô cực chân mây tầng 39',
    description: 'Tầm nhìn 360 độ ôm trọn bãi biển Mỹ Khê và bán đảo Sơn Trà từ độ cao 140m trên mực nước biển.',
    categoryLabel: 'Tiện ích',
    aspectRatio: 'tall',
    location: 'Tầng 39 Rooftop, Alizé Residence',
    photographer: 'Luxury Lifestyle Photography',
    featured: true,
    translations: {
      en: {
        title: 'Cloud-Level Horizon Infinity Pool',
        description: 'A 360-degree panoramic view spanning My Khe Beach and Son Tra Peninsula from 140 meters above sea level.',
        categoryLabel: 'Amenities',
        location: '39th Floor Rooftop, Alizé Residence',
      },
      zh: {
        title: '39 层天际无边际泳池',
        description: '傲居海拔 140 米高空，360 度俯瞰美溪海滩广袤海景与山茶半岛壮丽山海。',
        categoryLabel: '尊享配套',
        location: 'Alizé Residence 39 层云顶天台',
      },
    },
  },
  {
    id: 'gal-03',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=1600',
    title: 'Phòng khách Sky Penthouse view biển Panorama',
    description: 'Hệ kính Low-E cong kịch trần 3.6m nối liền không gian phòng khách với ban công sân vườn ngắm bình minh.',
    categoryLabel: 'Nội thất',
    aspectRatio: 'wide',
    location: 'Tầng 36, Sky Penthouse No. 032',
    photographer: 'Studio Milano Interior',
    featured: true,
    translations: {
      en: {
        title: 'Panoramic Living Room at Sky Penthouse',
        description: 'Floor-to-ceiling 3.6m curved Low-E acoustic glass seamlessly joining the living suite with a sunrise terrace.',
        categoryLabel: 'Interiors',
        location: 'Level 36, Sky Penthouse No. 032',
      },
      zh: {
        title: '天际顶层豪宅全景海景客厅',
        description: '3.6 米通高弧形 Low-E 隔音玻璃，将奢华客厅与专属日出观景露台无缝连接。',
        categoryLabel: '室内空间',
        location: '36 层天际顶层大平层 No. 032',
      },
    },
  },
  {
    id: 'gal-04',
    category: 'architecture',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=85&w=1400',
    title: 'Phối cảnh hoàng hôn bên bờ biển Mỹ Khê',
    description: 'Ánh hoàng hôn dát vàng phủ lên mặt ngoài đá tự nhiên và lan can kính gợn sóng của tòa tháp.',
    categoryLabel: 'Kiến trúc',
    aspectRatio: 'square',
    location: 'Bờ biển Mỹ Khê, Đà Nẵng',
    photographer: 'Da Nang Twilight Aerials',
    translations: {
      en: {
        title: 'Sunset Perspectives over My Khe Beach',
        description: 'Golden sunset casting radiant tones across the natural travertine stone and fluid glass railings of the tower.',
        categoryLabel: 'Architecture',
        location: 'My Khe Beach Shoreline, Da Nang',
      },
      zh: {
        title: '美溪海滩落日余晖建筑透视',
        description: '金色落日余晖洒在建筑天然石材与波浪形流线玻璃幕墙之上，流光溢彩。',
        categoryLabel: '建筑外观',
        location: '岘港美溪海岸线',
      },
    },
  },
  {
    id: 'gal-05',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=85&w=1400',
    title: 'Phòng tắm Master phong cách Spa Địa Trung Hải',
    description: 'Trang thiết bị vệ sinh Villeroy & Boch nhập khẩu Đức, ốp đá tự nhiên nguyên khối và bồn tắm ngắm trọn đại dương.',
    categoryLabel: 'Nội thất',
    aspectRatio: 'tall',
    location: 'Căn hộ 3PN Typology B',
    photographer: 'Interiors by Alizé',
    translations: {
      en: {
        title: 'Mediterranean Spa Master Bathroom',
        description: 'Imported German Villeroy & Boch sanitaries, natural bookmatched marble, and ocean-view freestanding bathtub.',
        categoryLabel: 'Interiors',
        location: '3-Bedroom Suite Typology B',
      },
      zh: {
        title: '地中海水疗风格主卧卫浴',
        description: '德国原装进口唯宝（Villeroy & Boch）卫浴，天然整石大理石铺装与尽览浩瀚海景的独立浴缸。',
        categoryLabel: '室内空间',
        location: '三居室海景套房户型 B',
      },
    },
  },
  {
    id: 'gal-06',
    category: 'amenities',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=85&w=1400',
    title: 'Sảnh đón Grand Lobby 5 sao chuẩn quốc tế',
    description: 'Trần cao thông tầng 8m với tác phẩm điêu khắc ánh sáng lấy cảm hứng từ sóng biển và sảnh chờ Concierge riêng tư.',
    categoryLabel: 'Tiện ích',
    aspectRatio: 'wide',
    location: 'Tầng 1 Grand Lobby, Alizé Residence',
    photographer: 'Hospitality Architecture Lab',
    translations: {
      en: {
        title: 'Grand 5-Star Hotel Welcome Lobby',
        description: 'Double-height 8m soaring ceilings adorned with wind-inspired kinetic light sculptures and private concierge salons.',
        categoryLabel: 'Amenities',
        location: 'Level 1 Grand Lobby, Alizé Residence',
      },
      zh: {
        title: '五星级尊贵挑高迎宾大堂',
        description: '8 米挑高阔绰空间，配以信风流动主题的艺术动态灯光雕塑与私享贵宾礼宾接待区。',
        categoryLabel: '尊享配套',
        location: 'Alizé Residence 1 层迎宾大堂',
      },
    },
  },
  {
    id: 'gal-07',
    category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1400',
    title: 'Bình minh rạng rỡ ngay trước thềm nhà',
    description: 'Chỉ vài bước chân chạm vào bãi cát trắng mịn của Mỹ Khê — một trong sáu bãi biển quyến rũ nhất hành tinh.',
    categoryLabel: 'Phong cách sống',
    aspectRatio: 'wide',
    location: 'Bãi cát bờ biển Mỹ Khê',
    photographer: 'Vietnam Travel Journal',
    translations: {
      en: {
        title: 'Radiant Sunrise at Your Doorstep',
        description: 'A few private strides to the pristine powdery white sand of My Khe — ranked among the world’s most charming beaches.',
        categoryLabel: 'Lifestyle',
        location: 'My Khe Beach Shoreline',
      },
      zh: {
        title: '推开家门即是绚烂海上日出',
        description: '仅需漫步数步即可踏上美溪细白柔软的沙滩——被评为全球最迷人的六大海岸之一。',
        categoryLabel: '滨海生活',
        location: '美溪细白沙滩',
      },
    },
  },
  {
    id: 'gal-08',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=85&w=1400',
    title: 'Phòng ngủ Master view biển Mỹ Khê',
    description: 'Tận hưởng âm thanh êm dịu của sóng biển mỗi sớm mai từ ban công bo cong riêng tư.',
    categoryLabel: 'Nội thất',
    aspectRatio: 'square',
    location: 'Căn hộ 2PN Typology A',
    photographer: 'Studio Milano Interior',
    translations: {
      en: {
        title: 'Ocean-View Master Bedroom Sanctuary',
        description: 'Wake up to the gentle acoustic murmur of the surf from your private curved architectural balcony.',
        categoryLabel: 'Interiors',
        location: '2-Bedroom Residence Typology A',
      },
      zh: {
        title: '一线瞰海主卧私密谧境',
        description: '清晨在私人弧形波浪阳台上，伴随海浪轻柔舒缓的潮声醒来，身心怡然。',
        categoryLabel: '室内空间',
        location: '两居室海景尊享公寓户型 A',
      },
    },
  },
  {
    id: 'gal-09',
    category: 'amenities',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=85&w=1400',
    title: 'Trung tâm Spa & Xông hơi thảo mộc biển',
    description: 'Khu trị liệu sức khỏe chuẩn wellness resort với phòng xông đá muối Himalaya và hồ tắm sục Jacuzzi nước ấm.',
    categoryLabel: 'Tiện ích',
    aspectRatio: 'tall',
    location: 'Tầng 4 Wellness Center',
    photographer: 'Alizé Wellness Club',
    translations: {
      en: {
        title: 'Ocean Herbology Spa & Wellness Sanctuary',
        description: 'Resort wellness therapy club equipped with Himalayan salt rock sauna and heated oceanic jacuzzi hydrotherapy.',
        categoryLabel: 'Amenities',
        location: 'Level 4 Wellness Center',
      },
      zh: {
        title: '海洋草本理疗水疗中心',
        description: '对标顶级度假村的养生康养空间，配备喜马拉雅盐疗桑拿房与恒温海韵按摩水疗池。',
        categoryLabel: '尊享配套',
        location: '4 层康养活力中心',
      },
    },
  },
  {
    id: 'gal-10',
    category: 'video',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1920',
    title: 'Phim trải nghiệm kiến trúc Alizé Residence 4K',
    description: 'Thước phim điện ảnh ghi lại từng vũ điệu của gió và ánh sáng xuyên qua các tầng ban công lượn sóng.',
    categoryLabel: 'Thước phim',
    aspectRatio: 'wide',
    location: 'Tổ hợp Alizé Residence Đà Nẵng',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    featured: true,
    translations: {
      en: {
        title: 'Architectural Cinematic Film 4K',
        description: 'A cinematic sensory journey capturing the rhythm of wind and sea light passing through the undulating terraces.',
        categoryLabel: 'Video',
        location: 'Alizé Residence Da Nang Complex',
      },
      zh: {
        title: 'Alizé Residence 4K 建筑艺术漫游电影',
        description: '光影交织的电影级视听画卷，记录掠过波浪阳台层叠光影的信风曼妙韵律。',
        categoryLabel: '影视漫游',
        location: '岘港 Alizé 建筑地标',
      },
    },
  },
  {
    id: 'gal-11',
    category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=85&w=1400',
    title: 'Nhà hàng Ẩm thực Địa Trung Hải bên bờ biển',
    description: 'Thưởng thức phong vị hải sản tươi ngon của biển miền Trung hòa quyện tinh hoa ẩm thực vùng Địa Trung Hải.',
    categoryLabel: 'Phong cách sống',
    aspectRatio: 'square',
    location: 'Tầng 2 The Coastal Bistro',
    photographer: 'Culinary Da Nang',
    translations: {
      en: {
        title: 'Beachside Mediterranean Dining & Lounge',
        description: 'Savor prime freshly caught Central Vietnam seafood infused with timeless Mediterranean gastronomic artistry.',
        categoryLabel: 'Lifestyle',
        location: 'Level 2 The Coastal Bistro',
      },
      zh: {
        title: '一线海景地中海特色餐厅',
        description: '品尝中越本地新鲜海洋珍馐与地中海经典烹饪艺术交相辉映的舌尖盛宴。',
        categoryLabel: '滨海生活',
        location: '2 层 The Coastal Bistro 餐厅',
      },
    },
  },
  {
    id: 'gal-12',
    category: 'architecture',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=85&w=1400',
    title: 'Chi tiết đá tự nhiên ốp mặt dựng',
    description: 'Đá cẩm thạch Travertine được gia công tỉ mỉ bằng máy CNC đa trục tạo nên các đường gân sóng đồng nhất.',
    categoryLabel: 'Kiến trúc',
    aspectRatio: 'tall',
    location: 'Chi tiết hoàn thiện mặt ngoài',
    photographer: 'AEDAS Materials Lab',
    translations: {
      en: {
        title: 'Natural Travertine Architectural Detailing',
        description: 'Hand-selected travertine marble precision-carved via multi-axis CNC to create consistent ocean-wave grooves.',
        categoryLabel: 'Architecture',
        location: 'Façade Craftsmanship Detail',
      },
      zh: {
        title: '外立面天然洞石精工建筑细节',
        description: '甄选米黄色天然洞石，采用多轴高精度数控雕琢出如微澜海浪般的均匀流线纹理。',
        categoryLabel: '建筑外观',
        location: '外立面精工工艺特写',
      },
    },
  },
];

/**
 * Retrieves localized gallery item based on active locale.
 * @param item The gallery item.
 * @param locale The active locale.
 * @returns The localized gallery item.
 */
export const getLocalizedGalleryItem = (item: GalleryItem, locale: string): GalleryItem => {
  const trans = item.translations?.[locale];
  if (!trans) return item;

  return {
    ...item,
    title: trans.title ?? item.title,
    description: trans.description ?? item.description,
    categoryLabel: trans.categoryLabel ?? item.categoryLabel,
    location: trans.location ?? item.location,
  };
};

/**
 * Returns all gallery items localized for the target locale.
 * @param locale The active locale string.
 * @returns Array of localized gallery items.
 */
export const getLocalizedGalleryItems = (locale: string): GalleryItem[] => {
  return GALLERY_ITEMS.map((item) => getLocalizedGalleryItem(item, locale));
};
