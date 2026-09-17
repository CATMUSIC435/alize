export type FloorZone = 'podium' | 'wellness' | 'condotel_typical' | 'penthouse' | 'sky_oasis';

export type LocalizedFloorLevel = {
  name?: string;
  description?: string;
  zoneLabel?: string;
  range?: string;
  highlights?: string[];
  viewOrientations?: string[];
};

export type FloorLevel = {
  id: string;
  levelNumber: string;
  range: string;
  zone: FloorZone;
  zoneLabel: string;
  name: string;
  description: string;
  unitsCount: number;
  ceilingHeight: string;
  floorPlateImage: string;
  elevationMeters: number;
  viewOrientations: string[];
  highlights: string[];
  unitIds: string[];
  translations?: Record<string, LocalizedFloorLevel>;
};

export type LocalizedUnitTypology = {
  name?: string;
  description?: string;
  facing?: string;
  features?: string[];
};

export type UnitTypology = {
  id: string;
  code: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  grossArea: number;
  netArea: number;
  balconyArea: number;
  ceilingHeight: string;
  facing: string;
  viewType: 'direct_ocean' | 'ocean_and_city' | 'son_tra_peninsula' | 'han_river_skyline';
  description: string;
  plan2DImage: string;
  plan3DImage: string;
  features: string[];
  translations?: Record<string, LocalizedUnitTypology>;
};

export const UNIT_TYPOLOGIES: UnitTypology[] = [
  {
    id: 'unit-2br-breeze',
    code: 'Type A (2PN)',
    name: 'The Breeze Suite - 2 Phòng Ngủ View Biển',
    bedrooms: 2,
    bathrooms: 2,
    grossArea: 98,
    netArea: 89,
    balconyArea: 16.5,
    ceilingHeight: '3.4m',
    facing: 'Đông — Trực diện Biển Mỹ Khê',
    viewType: 'direct_ocean',
    description: 'Thiết kế ban công lượn sóng mở rộng góc nhìn 180 độ ra biển, phòng khách và 2 phòng ngủ đều có mặt thoáng đón gió mát lành.',
    plan2DImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    plan3DImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Ban công uốn lượn phong cách condotel biển',
      'Kính Low-E cản tia UV và cách âm 2 lớp',
      'Thiết bị vệ sinh cao cấp Villeroy & Boch (Đức)',
      'Điều hòa âm trần Daikin VRV lọc không khí',
      'Khóa thông minh nhận diện khuôn mặt & thẻ từ',
    ],
    translations: {
      en: {
        name: 'The Breeze Suite — 2-Bedroom Oceanfront',
        facing: 'East — Direct My Khe Oceanfront',
        description: 'Aerodynamic undulating balcony framing a 180-degree ocean panorama. Living room and both bedrooms feature direct sea breeze exposure.',
        features: [
          'Organic wave-sculpted coastal balcony',
          'Acoustic double-glazed Low-E solar glass',
          'Villeroy & Boch luxury German sanitary ware',
          'Daikin VRV hidden central air purification',
          'Smart biometric facial recognition entry',
        ],
      },
      zh: {
        name: 'The Breeze Suite — 两居室一线瞰海尊享套房',
        facing: '东向 — 正对美溪海滩壮阔海景',
        description: '流线型波浪阳台设计，拥抱 180 度壮丽海景。客厅与两间卧室全明采光，信风穿堂而过。',
        features: [
          '滨海度假风波浪造型弧形景观阳台',
          '双层中空 Low-E 防紫外线高隔音玻璃',
          '德国原装进口唯宝（Villeroy & Boch）卫浴',
          '大金 VRV 隐藏式净化中央空调',
          '智能人脸识别与专属磁卡入户门锁',
        ],
      },
    },
  },
  {
    id: 'unit-3br-alize',
    code: 'Type B (3PN)',
    name: 'The Alizé Horizon — 3 Phòng Ngủ Panorama',
    bedrooms: 3,
    bathrooms: 3,
    grossArea: 142,
    netArea: 130,
    balconyArea: 24.8,
    ceilingHeight: '3.5m',
    facing: 'Đông & Bắc — Ôm trọn Mỹ Khê & Bán đảo Sơn Trà',
    viewType: 'son_tra_peninsula',
    description: 'Căn hộ góc thượng hạng với 2 mặt thoáng ôm trọn bờ biển Mỹ Khê và bán đảo Sơn Trà, sở hữu phòng tắm Master kính ngắm biển.',
    plan2DImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000',
    plan3DImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Ban công góc bo cong vô cực dài 18 mét',
      'Bồn tắm độc lập Master view biển Mỹ Khê',
      'Đảo bếp ốp đá cẩm thạch Calacatta tự nhiên',
      'Hệ thống chiếu sáng thông minh kịch bản hoàng hôn',
      'Sàn gỗ sồi cao cấp xử lý chống ẩm biển',
    ],
    translations: {
      en: {
        name: 'The Alizé Horizon — 3-Bedroom Dual-Aspect Suite',
        facing: 'East & North — Full My Khe & Son Tra Peninsula Views',
        description: 'Prime dual-aspect corner residence gazing across My Khe shoreline and green Son Tra Peninsula, with ocean-facing freestanding master tub.',
        features: [
          '18-meter panoramic wrap-around wave terrace',
          'Master freestanding soaking tub with sea views',
          'Bookmatched natural Calacatta marble island',
          'Smart architectural sunset lighting scenes',
          'Marine-treated European white oak hardwood floors',
        ],
      },
      zh: {
        name: 'The Alizé Horizon — 三居室转角双全景旗舰大平层',
        facing: '东北双向 — 尽揽美溪海滩与山茶半岛自然胜景',
        description: '尊贵边套大平层，坐拥双面采光，近揽美溪金沙碧浪，远眺山茶半岛葱郁山峦，主卧独享观海浴缸。',
        features: [
          '18 米环幕波浪弧形流线观景露台',
          '主卧全景落地窗独立景观海景浴缸',
          '天然意大利雪花白大理石奢华中岛吧台',
          '智能全屋调光系统与日出日落氛围模式',
          '欧洲原装进口耐候防潮纯实木地板',
        ],
      },
    },
  },
  {
    id: 'unit-penthouse',
    code: 'Penthouse (4PN)',
    name: 'The Royal Wind Penthouse — Dinh Thự Chân Mây',
    bedrooms: 4,
    bathrooms: 5,
    grossArea: 285,
    netArea: 260,
    balconyArea: 68.0,
    ceilingHeight: '3.8m',
    facing: 'Panorama 270° — Biển Mỹ Khê & Thành phố Đà Nẵng',
    viewType: 'ocean_and_city',
    description: 'Đỉnh cao của không gian sống condotel siêu sang với hồ bơi sục Jacuzzi riêng trên ban công, thang máy riêng vào thẳng căn hộ.',
    plan2DImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
    plan3DImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Hồ bơi sục khoáng Jacuzzi trên ban công riêng',
      'Thang máy riêng biệt trực tiếp lên sảnh penthouse',
      'Hầm rượu vang nhiệt độ chuẩn và Cigar Lounge',
      'Phòng chiếu phim gia đình tiêu chuẩn Dolby Atmos',
      'Đặc quyền quản gia Concierge VIP 24/7',
    ],
    translations: {
      en: {
        name: 'The Royal Wind Penthouse — Sky Mansion',
        facing: '270° Panoramic Ocean & City Skyline',
        description: 'The pinnacle of beachfront luxury living featuring a private sky jacuzzi on the wave terrace and direct keycard elevator access.',
        features: [
          'Private heated mineral Jacuzzi on the sky terrace',
          'Private elevator opening directly into your salon',
          'Climate-controlled private wine cellar & cigar lounge',
          'Dolby Atmos private residential screening room',
          'Dedicated 24/7 VIP Concierge & Butler service',
        ],
      },
      zh: {
        name: 'The Royal Wind 顶层天际云端大宅',
        facing: '270° 环幕天际线 — 美溪浩瀚海景与岘港繁华夜色',
        description: '傲立云端的奢华度假住宅典范，私人露台恒温按摩泡池，专属刷卡电梯直达私密门厅。',
        features: [
          '私人空中波浪露台配备独立恒温矿物水疗泡池',
          '专属刷卡高速电梯直入私人入户入室玄关',
          '恒温恒湿私人藏酒窖与雪茄尊享品鉴沙龙',
          '杜比全景声（Dolby Atmos）私人高端影音室',
          '全天候 24/7 专属一对一贵宾管家私享服务',
        ],
      },
    },
  },
];

export const FLOOR_LEVELS: FloorLevel[] = [
  {
    id: 'floor-podium',
    levelNumber: '01 - 03',
    range: 'Tầng 01 — 03',
    zone: 'podium',
    zoneLabel: 'Khối Đế Khách Sạn',
    name: 'Sảnh Đón Grand Lobby & Nhà Hàng Địa Trung Hải',
    description: 'Không gian đón tiếp chuẩn 5 sao quốc tế với trần cao thông tầng 8m, sảnh Concierge sang trọng và hệ thống nhà hàng tinh hoa ẩm thực biển.',
    unitsCount: 0,
    ceilingHeight: '8.0m',
    floorPlateImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200',
    elevationMeters: 4,
    viewOrientations: ['Đường Võ Nguyên Giáp', 'Quảng trường cảnh quan mặt biển'],
    highlights: [
      'Sảnh đón thông tầng 8m phong cách resort Địa Trung Hải',
      'Nhà hàng The Coastal Bistro & Lounge',
      'Phòng tiệc & Trung tâm hội nghị cao cấp',
      'Hệ thống valet parking ngầm 3 tầng',
    ],
    unitIds: [],
    translations: {
      en: {
        range: 'Levels 01 — 03',
        zoneLabel: 'Hotel Podium',
        name: 'Grand Welcome Lobby & Mediterranean Bistro',
        description: 'International 5-star hospitality arrival featuring soaring 8m ceilings, bespoke concierge lounge, and sea-view culinary bistros.',
        viewOrientations: ['Vo Nguyen Giap Boulevard', 'Beachfront landscaped esplanade'],
        highlights: [
          'Double-height 8m soaring welcome salon',
          'The Coastal Bistro & Artisanal Wine Lounge',
          'Bespoke executive boardroom and events suite',
          '3-level subterranean automated valet parking',
        ],
      },
      zh: {
        range: '01 — 03 层',
        zoneLabel: '星级酒店裙楼',
        name: '尊贵挑高迎宾大堂与地中海风味餐厅',
        description: '对标国际五星级奢华酒店标准的迎宾空间，8 米双层挑高，专属礼宾接待厅与一线海景高端特色餐厅。',
        viewOrientations: ['武元甲大道', '海滨景观广场'],
        highlights: [
          '8 米挑高地中海度假风奢华迎宾大堂',
          'The Coastal Bistro 海鲜餐厅与精品酒廊',
          '多功能行政宴会与私密高端商务会议中心',
          '地下 3 层智能化代客泊车地下车库',
        ],
      },
    },
  },
  {
    id: 'floor-wellness',
    levelNumber: '04',
    range: 'Tầng 04',
    zone: 'wellness',
    zoneLabel: 'Ốc Đảo Tiện Ích',
    name: 'Resort Wellness Club & Hồ Bơi Oasis',
    description: 'Tầng tiện ích chuyên biệt với hồ bơi nhiệt đới ngoài trời, trung tâm phục hồi sức khỏe Spa, phòng Gym chuẩn TechnoGym và vườn thiền Zen.',
    unitsCount: 0,
    ceilingHeight: '4.5m',
    floorPlateImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200',
    elevationMeters: 18,
    viewOrientations: ['Biển Mỹ Khê', 'Công viên dừa nhiệt đới'],
    highlights: [
      'Hồ bơi Oasis nhiệt đới phong cách ốc đảo',
      'Phòng xông đá muối Himalaya & bể ngâm Jacuzzi',
      'Phòng tập TechnoGym nhìn thẳng ra biển',
      'Khu vui chơi sáng tạo trẻ em Kid’s Cove',
    ],
    unitIds: [],
    translations: {
      en: {
        range: 'Level 04',
        zoneLabel: 'Wellness Oasis',
        name: 'Resort Wellness Club & Oasis Pool',
        description: 'A dedicated lifestyle plateau offering an outdoor tropical oasis pool, world-class TechnoGym center, and Himalayan salt stone spa.',
        viewOrientations: ['My Khe Beach', 'Tropical coconut palm grove'],
        highlights: [
          'Tropical oasis pool fringed with palms',
          'Himalayan salt rock sauna & thermal vitality jacuzzi',
          'TechnoGym fitness suite overlooking the surf',
          'Kid’s Cove creative play laboratory',
        ],
      },
      zh: {
        range: '04 层',
        zoneLabel: '养生水疗绿洲',
        name: '度假康养水疗俱乐部与绿洲泳池',
        description: '专属康养配套楼层，配备室外热带棕榈园林泳池、顶级泰诺健（TechnoGym）海景健身中心及喜马拉雅盐疗中心。',
        viewOrientations: ['美溪海滩', '热带椰林公园'],
        highlights: [
          '热带棕榈环绕的度假风绿洲泳池',
          '喜马拉雅矿盐桑拿房与恒温活水按摩池',
          '直面碧海景致的意大利泰诺健健身会馆',
          '童乐天地（Kid’s Cove）儿童创意探索中心',
        ],
      },
    },
  },
  {
    id: 'floor-typical-low',
    levelNumber: '05 - 18',
    range: 'Tầng 05 — 18',
    zone: 'condotel_typical',
    zoneLabel: 'Căn Hộ Điển Hình',
    name: 'Bộ Sưu Tập Căn Hộ Condotel Nghỉ Dưỡng Làn Gió (Low-Rise)',
    description: 'Tầng căn hộ với góc nhìn khoáng đạt ra bãi cát trắng Mỹ Khê. Thiết kế ban công gợn sóng nhấp nhô tối ưu hóa luồng gió tươi mát.',
    unitsCount: 8,
    ceilingHeight: '3.4m',
    floorPlateImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    elevationMeters: 35,
    viewOrientations: ['Biển Mỹ Khê', 'Bán đảo Sơn Trà', 'Sông Hàn'],
    highlights: [
      '8 căn hộ/tầng với 4 thang máy tốc độ cao 3.5m/s',
      '100% căn hộ sở hữu ban công lượn sóng đón gió',
      'Hành lang thông gió tự nhiên, tràn ngập ánh sáng',
      'Hoàn thiện nội thất 5 sao chuẩn vận hành condotel',
    ],
    unitIds: ['unit-2br-breeze', 'unit-3br-alize'],
    translations: {
      en: {
        range: 'Levels 05 — 18',
        zoneLabel: 'Typical Suites',
        name: 'The Wave Condotel Collection (Levels 05 — 18)',
        description: 'Residences with close intimacy to My Khe powdery shorelines. Wave-sculpted architectural balconies maximize cross-ventilation.',
        viewOrientations: ['My Khe Beach', 'Son Tra Peninsula', 'Han River'],
        highlights: [
          'Only 8 exclusive residences per floor with 4 high-speed elevators',
          '100% units feature organic wave sea-breeze balconies',
          'Naturally ventilated day-lit central gallery corridors',
          '5-star hospitality full turnkey interior specifications',
        ],
      },
      zh: {
        range: '05 — 18 层',
        zoneLabel: '经典度假套房',
        name: '波浪主题海景度假套房系列（低区）',
        description: '尽览美溪沙滩轻柔海浪的舒适高度。流线型起伏波浪阳台设计，最大化自然风循环，体感温润惬意。',
        viewOrientations: ['美溪海滩', '山茶半岛', '汉江景致'],
        highlights: [
          '每层仅设 8 户私享居所，配备 4 部 3.5m/s 高速客梯',
          '户户均设弧形流动波浪海景阳台，尽纳清爽海风',
          '自然采光通风的艺术连廊公区设计',
          '五星级国际酒店标准精装全配拎包入住',
        ],
      },
    },
  },
  {
    id: 'floor-typical-high',
    levelNumber: '19 - 34',
    range: 'Tầng 19 — 34',
    zone: 'condotel_typical',
    zoneLabel: 'Căn Hộ Điển Hình Cao Cấp',
    name: 'Bộ Sưu Tập Căn Hộ Cao Tầng Tầm Nhìn Chân Mây (High-Rise)',
    description: 'Độ cao lý tưởng ôm trọn toàn bộ vịnh biển Đà Nẵng, bán đảo Sơn Trà và trung tâm thành phố rực rỡ ánh đèn về đêm.',
    unitsCount: 6,
    ceilingHeight: '3.5m',
    floorPlateImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    elevationMeters: 85,
    viewOrientations: ['Biển Mỹ Khê vô cực', 'Cầu Rồng & Sông Hàn', 'Bán đảo Sơn Trà'],
    highlights: [
      'Mật độ giảm còn 6 căn hộ/tầng cho sự riêng tư tuyệt đối',
      'Tầm nhìn không giới hạn ra đường chân trời biển Đông',
      'Ban công rộng tới 25m² chuẩn bị cho các bữa tiệc hoàng hôn',
      'Hệ kính hộp Low-E chống ồn và cách nhiệt công nghệ Đức',
    ],
    unitIds: ['unit-2br-breeze', 'unit-3br-alize'],
    translations: {
      en: {
        range: 'Levels 19 — 34',
        zoneLabel: 'Premium High-Rise',
        name: 'The Cloud Horizon Collection (Levels 19 — 34)',
        description: 'Soaring high-altitude panoramic residences overlooking Da Nang Bay, Son Tra Peninsula, and twinkling city lights.',
        viewOrientations: ['Endless My Khe Ocean', 'Dragon Bridge & Han River', 'Son Tra Peninsula'],
        highlights: [
          'Reduced density to 6 spacious suites per floor for maximum privacy',
          'Unobstructed endless horizons across the East Vietnam Sea',
          'Terraces expanded up to 25m² ideal for sunset cocktail soirees',
          'German acoustic dual-pane Low-E insulated glazing',
        ],
      },
      zh: {
        range: '19 — 34 层',
        zoneLabel: '高区尊荣海景',
        name: '天际云澜高区海景度假大宅（高区）',
        description: '凌空揽胜的黄金高度，浩瀚蔚蓝的岘港海湾、苍翠山茶半岛与璀璨都市天际线夜色尽收眼底。',
        viewOrientations: ['美溪无垠浩瀚海景', '龙桥与汉江夜景', '苍翠山茶半岛'],
        highlights: [
          '降密至每层仅 6 套尊享户型，尊享静谧私属时光',
          '一线无遮挡直面东海浩瀚辽阔海平线',
          '拓展至 25 平方米的超大波浪景观露台，私享日落酒会',
          '德国高标中空 Low-E 隔音隔热节能玻璃幕墙',
        ],
      },
    },
  },
  {
    id: 'floor-penthouse',
    levelNumber: '35 - 38',
    range: 'Tầng 35 — 38',
    zone: 'penthouse',
    zoneLabel: 'Dinh Thự Sky Penthouse',
    name: 'Dinh Thự Trên Không The Royal Wind',
    description: 'Chỉ 8 căn dinh thự Penthouse và Duplex phiên bản giới hạn, trần cao 3.8m với hồ bơi khoáng nóng Jacuzzi riêng ngoài trời.',
    unitsCount: 2,
    ceilingHeight: '3.8m',
    floorPlateImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    elevationMeters: 130,
    viewOrientations: ['Panorama 360° Biển Mỹ Khê & Thành phố'],
    highlights: [
      'Chỉ 2 căn Penthouse độc bản trên mỗi tầng',
      'Thang máy thẻ từ bảo mật lên trực tiếp sảnh riêng',
      'Hồ bơi sục Jacuzzi nước ấm trên ban công chân mây',
      'Bàn giao hoàn thiện theo đơn đặt hàng cá nhân hóa Bespoke',
    ],
    unitIds: ['unit-penthouse'],
    translations: {
      en: {
        range: 'Levels 35 — 38',
        zoneLabel: 'Sky Penthouses',
        name: 'The Royal Wind Sky Mansions',
        description: 'A limited edition of only 8 bespoke sky villas featuring 3.8m lofty ceilings and private outdoor mineral jacuzzi terraces.',
        viewOrientations: ['360° Panorama of My Khe Beach & Cityscape'],
        highlights: [
          'Exclusive 2 palatial penthouses per entire floor',
          'Biometric elevator with direct private foyer entry',
          'Heated open-air panoramic sky jacuzzi on your terrace',
          'Bespoke interior customization tailored by Italian master artisans',
        ],
      },
      zh: {
        range: '35 — 38 层',
        zoneLabel: '天际顶层豪宅',
        name: 'The Royal Wind 天际顶层大平层与空中复式',
        description: '限量发售仅 8 套传世天际别墅，3.8 米奢适层高，配备私人露台恒温矿物水疗温泉池。',
        viewOrientations: ['360° 全景环幕美溪海景与繁华市区'],
        highlights: [
          '每层仅设 2 席独角兽级天际大平层豪宅',
          '专属生物识别门禁电梯独立直入私人门厅',
          '露台私享全景恒温无边际矿物水疗按摩泡池',
          '携手意大利顶级设计工坊提供私享高级定制精装',
        ],
      },
    },
  },
  {
    id: 'floor-rooftop',
    levelNumber: '39',
    range: 'Tầng 39 & Rooftop',
    zone: 'sky_oasis',
    zoneLabel: 'Tầng Thượng Biểu Tượng',
    name: 'The Alizé Sky Oasis — Hồ Bơi Vô Cực & Rooftop Bar',
    description: 'Nóc nhà kiến trúc Alizé ở cao độ 145m với hồ bơi vô cực chân mây 360°, quầy Bar ngắm hoàng hôn và đài quan sát kính viễn vọng.',
    unitsCount: 0,
    ceilingHeight: '4.2m',
    floorPlateImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
    elevationMeters: 145,
    viewOrientations: ['Toàn cảnh 360° Đà Nẵng & Biển Đông'],
    highlights: [
      'Hồ bơi vô cực cao nhất mặt biển Mỹ Khê',
      'Alizé Sky Lounge & Sunset Cocktail Bar',
      'Đài thiên văn và kính viễn vọng ngắm trăng sao',
      'Sân đỗ trực thăng cứu hộ khẩn cấp',
    ],
    unitIds: [],
    translations: {
      en: {
        range: 'Level 39 & Rooftop',
        zoneLabel: 'Sky Oasis',
        name: 'The Alizé Sky Oasis — Infinity Pool & Observatory',
        description: 'The crowning jewel of the Alizé tower at 145 meters above sea level with a 360° infinity pool, sunset lounge, and stargazing deck.',
        viewOrientations: ['360° Panoramic View of Da Nang & East Sea'],
        highlights: [
          'The highest ocean-facing infinity pool along My Khe Beach',
          'Alizé Sunset Cocktail Lounge & Cigar Veranda',
          'Astronomical observation platform with high-powered telescope',
          'Emergency rooftop aeromedical helipad',
        ],
      },
      zh: {
        range: '39 层及云顶天台',
        zoneLabel: '云顶地标绿洲',
        name: 'The Alizé Sky Oasis — 天际泳池与星空酒廊',
        description: '海拔 145 米之上的标志性皇冠顶层，360 度环形无边际天际泳池、落日鸡尾酒吧与星空观象台。',
        viewOrientations: ['360° 岘港与东海全景环幕俯瞰'],
        highlights: [
          '美溪海滩一线天际高度最高的无边际海景泳池',
          'Alizé 日落云端酒廊与高空雪茄雅座',
          '配备高倍天文望远镜的高空观星台',
          '云顶应急直升机救援停机坪',
        ],
      },
    },
  },
];

/**
 * Returns localized floor level based on active locale.
 * @param level The floor level.
 * @param locale The active locale.
 * @returns Localized floor level.
 */
export const getLocalizedFloorLevel = (level: FloorLevel, locale: string): FloorLevel => {
  const trans = level.translations?.[locale];
  if (!trans) return level;

  return {
    ...level,
    name: trans.name ?? level.name,
    description: trans.description ?? level.description,
    zoneLabel: trans.zoneLabel ?? level.zoneLabel,
    range: trans.range ?? level.range,
    highlights: trans.highlights ?? level.highlights,
    viewOrientations: trans.viewOrientations ?? level.viewOrientations,
  };
};

/**
 * Returns localized unit typology based on active locale.
 * @param unit The unit typology.
 * @param locale The active locale.
 * @returns Localized unit typology.
 */
export const getLocalizedUnitTypology = (unit: UnitTypology, locale: string): UnitTypology => {
  const trans = unit.translations?.[locale];
  if (!trans) return unit;

  return {
    ...unit,
    name: trans.name ?? unit.name,
    description: trans.description ?? unit.description,
    facing: trans.facing ?? unit.facing,
    features: trans.features ?? unit.features,
  };
};

/**
 * Returns all floor levels localized for the target locale.
 * @param locale The active locale.
 * @returns Array of localized floor levels.
 */
export const getLocalizedFloorLevels = (locale: string): FloorLevel[] => {
  return FLOOR_LEVELS.map((level) => getLocalizedFloorLevel(level, locale));
};

/**
 * Returns all unit typologies localized for the target locale.
 * @param locale The active locale.
 * @returns Array of localized unit typologies.
 */
export const getLocalizedUnitTypologies = (locale: string): UnitTypology[] => {
  return UNIT_TYPOLOGIES.map((unit) => getLocalizedUnitTypology(unit, locale));
};
