export type SalesCategory = 'brochure' | 'pricing' | 'investment' | 'specifications' | 'floorplans';

export type SalesKitItem = {
  id: string;
  title: string;
  category: SalesCategory;
  description: string;
  fileFormat: 'PDF' | 'ZIP' | 'XLSX';
  fileSize: string;
  releaseDate: string;
  badge?: string;
  downloadUrl?: string;
  previewImage: string;
  highlights: string[];
  translations?: Record<
    string,
    {
      title?: string;
      description?: string;
      badge?: string;
      highlights?: string[];
    }
  >;
};

export const SALES_KIT_ITEMS: SalesKitItem[] = [
  {
    id: 'sales-1',
    title: 'E-Brochure Kiến Trúc Độc Bản Alizé Residence 4K',
    category: 'brochure',
    description: 'Ấn phẩm nghệ thuật tổng quan dự án, triết lý kiến trúc đón gió Tín Phong từ AEDAS, tiện ích 5 sao và 25 tuyệt phẩm căn hộ biển.',
    fileFormat: 'PDF',
    fileSize: '48.5 MB',
    releaseDate: 'Tháng 09/2026',
    badge: 'ẤN PHẨM CHÍNH THỨC',
    previewImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1200',
    highlights: [
      'Ấn phẩm thiết kế chuẩn đồ họa quốc tế với độ phân giải siêu nét 4K.',
      'Toàn bộ câu chuyện cảm hứng Địa Trung Hải và kiến trúc mặt đứng lượn sóng.',
      'Hình ảnh phối cảnh chân thực từng tầng căn hộ, hồ bơi vô cực và Sky Lounge.',
    ],
    translations: {
      en: {
        title: 'Alizé Residence Exclusive 4K Architectural Monograph',
        description: 'Comprehensive artistic project monograph, AEDAS trade-wind architectural philosophy, 5-star amenities, and 25 beachfront master residences.',
        badge: 'OFFICIAL MONOGRAPH',
        highlights: [
          'International graphic design publication rendered in ultra-sharp 4K print resolution.',
          'The complete narrative of Mediterranean romance merged with undulating wave facades.',
          'True-to-life architectural renders of residences, infinite rooftop pool, and Sky Lounge.',
        ],
      },
      zh: {
        title: 'Alizé Residence 4K 超高清官方建筑画册',
        description: '全景展示项目概况、AEDAS 信风仿生建筑哲学、五星级奢华度假配套及 25 套传世海景豪宅。',
        badge: '官方珍藏版画册',
        highlights: [
          '国际顶尖排版与印刷标准，4K 超高精度全彩视觉呈现。',
          '深度解析当代地中海美学与 AEDAS 仿生波浪流动立面。',
          '全套实景渲染效果图，含 39 层天际无边际泳池及海景顶奢套房。',
        ],
      },
    },
  },
  {
    id: 'sales-2',
    title: 'Bảng Giá & Chính Sách Bán Hàng Mới Nhất Quý 3-4/2026',
    category: 'pricing',
    description: 'Bảng tổng hợp giá bán chi tiết từng tầng căn hộ condotel, lộ trình thanh toán linh hoạt, ưu đãi chiết khấu thanh toán sớm đến 12%.',
    fileFormat: 'PDF',
    fileSize: '6.2 MB',
    releaseDate: 'Tháng 09/2026',
    badge: 'CẬP NHẬT 2026',
    previewImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=85&w=1200',
    highlights: [
      'Chính sách thanh toán giãn tiến độ chia làm 10 đợt linh hoạt.',
      'Chiết khấu trực tiếp lên tới 12% khi thanh toán sớm 95% giá trị căn hộ.',
      'Hỗ trợ lãi suất 0% và ân hạn nợ gốc từ ngân hàng Vietcombank trong 24 tháng.',
    ],
    translations: {
      en: {
        title: 'Official Price List & Sales Policies Q3-Q4 2026',
        description: 'Detailed price breakdowns across all residential tiers, dynamic payment milestones, and early-settlement discounts up to 12%.',
        badge: 'UPDATED 2026',
        highlights: [
          'Extended flexible payment schedule structured into 10 manageable disbursements.',
          'Direct discount of up to 12% for upfront 95% early capital settlement.',
          'Vietcombank 0% interest support and 24-month principal moratorium package.',
        ],
      },
      zh: {
        title: '2026 年第三至第四季度最新官方价格表与优惠认购政策',
        description: '逐套详细列明 39 层各户型认购总价、梯度付款进度节点及最高 12% 的全款提前付款现金折让。',
        badge: '2026 最新版',
        highlights: [
          '人性化分阶段工程进度付款，共分为 10 期轻量化出资方案。',
          '一次性支付 95% 房款尊享直接现金减免最高 12% 购房特惠。',
          '越南外贸银行（Vietcombank）提供长达 24 个月 0% 息按揭及宽限期政策。',
        ],
      },
    },
  },
  {
    id: 'sales-3',
    title: 'Bài Toán Phân Tích Dòng Tiền & Khai Thác Cho Thuê 85/15',
    category: 'investment',
    description: 'Báo cáo nghiên cứu tài chính, tỷ suất hoàn vốn ROI, mô hình chia sẻ doanh thu 85/15 và tặng 15 đêm nghỉ dưỡng 5 sao mỗi năm.',
    fileFormat: 'XLSX',
    fileSize: '3.8 MB',
    releaseDate: 'Tháng 08/2026',
    badge: 'BẢNG TÍNH DÒNG TIỀN',
    previewImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=1200',
    highlights: [
      'Tỷ lệ chia sẻ doanh thu thực tế 85% cho chủ sở hữu — 15% cho đơn vị vận hành quốc tế.',
      'Dự phóng công suất phòng 75% - 85% dựa trên dữ liệu du lịch ven biển Mỹ Khê thực tế.',
      'Tặng 15 đêm nghỉ dưỡng miễn phí hàng năm có thể trao đổi trong hệ thống khách sạn quốc tế.',
    ],
    translations: {
      en: {
        title: 'Investment Cash-Flow Model & 85/15 Rental Program Analysis',
        description: 'Comprehensive financial forecasting, ROI yields, 85/15 revenue sharing model, and 15 annual complimentary 5-star resort nights.',
        badge: 'CASH FLOW MODEL',
        highlights: [
          'Transparent 85% net revenue allocated to owner — 15% to international hotel operator.',
          'Conservative occupancy forecasts (75% - 85%) benchmarked against actual My Khe tourism statistics.',
          '15 complimentary room nights each year eligible for global luxury resort exchanges.',
        ],
      },
      zh: {
        title: '85/15 酒店托管收益与现金流投资回报测算模型',
        description: '专业投资测算报表，含预期年化投资回报率（ROI）、85/15 营业收入分成机制及每年 15 晚免费五星度假特权。',
        badge: '财务测算表',
        highlights: [
          '扣除基本营运税费后，营业净收入的 85% 归业主所有，15% 为国际品牌托管管理费。',
          '依托美溪海滩真实旅游旺季与商务数据，预计全年平均入住率达 75%-85%。',
          '每年获赠 15 晚奢华免费度假房券，支持全球高端度假联盟积分置换。',
        ],
      },
    },
  },
  {
    id: 'sales-4',
    title: 'Danh Mục Vật Liệu & Trang Thiết Bị Bàn Giao Tiêu Chuẩn 5 Sao',
    category: 'specifications',
    description: 'Đặc tả chi tiết thương hiệu trang thiết bị cao cấp: Villeroy & Boch, Hansgrohe, kính hộp Low-E 3 lớp, điều hòa âm trần Daikin VRV.',
    fileFormat: 'PDF',
    fileSize: '12.4 MB',
    releaseDate: 'Tháng 09/2026',
    badge: 'TIÊU CHUẨN 5 SAO',
    previewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1200',
    highlights: [
      'Thiết bị vệ sinh sứ cao cấp nhập khẩu thương hiệu Villeroy & Boch (Đức).',
      'Hệ kính Low-E 3 lớp phủ mềm cản 99% tia UV và cách âm vượt trội bên bờ biển.',
      'Hệ thống điều hòa lọc khí tươi Aerothermal cấp ẩm cân bằng theo tiêu chuẩn khách sạn siêu sang.',
    ],
    translations: {
      en: {
        title: '5-Star Handover Material & Interior Specification Dossier',
        description: 'Granular specifications of ultra-luxury brands: Villeroy & Boch, Hansgrohe, triple-glazed Low-E acoustic glass, and Daikin VRV systems.',
        badge: '5-STAR FINISH',
        highlights: [
          'Flagship sanitary ceramics directly imported from Villeroy & Boch (Germany).',
          'Acoustic triple-pane soft-coat Low-E glazing blocking 99% UV radiation.',
          'Aerothermal fresh air ventilation and ambient humidity control meeting elite hospitality standards.',
        ],
      },
      zh: {
        title: '国际五星级精装交付物料清单与设备规格全书',
        description: '逐项列明德国进口唯宝（Villeroy & Boch）、汉斯格雅卫浴、三玻两腔 Low-E 隔音隔热玻璃及大金中央空调系统。',
        badge: '五星精装标准',
        highlights: [
          '德国原装进口唯宝（Villeroy & Boch）智能卫浴及汉斯格雅高端五金配件。',
          '三层中空超白 Low-E 镀膜夹胶玻璃，隔绝 99% 紫外线与强热海风噪音。',
          '配备新风加湿空气调节系统，打造恒温、恒湿、富氧的健康微气候环境。',
        ],
      },
    },
  },
  {
    id: 'sales-5',
    title: 'Trọn Bộ Mặt Bằng Kỹ Thuật 2D & 3D Bóc Mái 39 Tầng',
    category: 'floorplans',
    description: 'Tập hợp bản vẽ quy hoạch phân tầng, phối cảnh 3D bóc mái từng loại căn hộ condotel và penthouse ban công lượn sóng tỉ lệ 1:100.',
    fileFormat: 'PDF',
    fileSize: '35.0 MB',
    releaseDate: 'Tháng 09/2026',
    badge: 'BẢN VẼ CHI TIẾT',
    previewImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=85&w=1200',
    highlights: [
      'Mặt bằng tổng thể từ tầng 1 đến tầng 39 và 3 tầng hầm thông minh.',
      'Bản vẽ 3D bóc mái trực quan giúp dễ dàng hình dung không gian nội thất sống động.',
      'Kích thước tim tường và thông thủy chi tiết cho từng loại hình 2 phòng ngủ, 3 phòng ngủ và Sky Villa.',
    ],
    translations: {
      en: {
        title: 'Complete 39-Story 2D & 3D Cutaway Architectural Floor Plans',
        description: 'Complete set of architectural floor plates, 3D cutaway perspectives, and undulating balcony condotel & penthouse layouts scaled 1:100.',
        badge: 'ARCHITECTURAL PLANS',
        highlights: [
          'Full building plates from ground lobby to 39th sky deck and 3 subterranean parking levels.',
          'Intuitive 3D cutaways providing crystal-clear spatial comprehension of each layout.',
          'Exact gross and net floor area dimensions for 2-bed, 3-bed suites, and duplex Sky Villas.',
        ],
      },
      zh: {
        title: '39 层全栋 2D 工程平面图及 3D 户型立体剖面图集',
        description: '汇总 1 至 39 层标准层平面分布图、地下车库及波浪形观海阳台户型 1:100 高清三维剖面图。',
        badge: '完整图纸包',
        highlights: [
          '涵盖从首层尊崇挑高大堂到 39 层天际俱乐部以及 3 层智能地下停车场的全部图纸。',
          '直观逼真的 3D 鸟瞰剖面图，生动呈现每间公寓采光动线与功能分区。',
          '标注入户动线、建筑轴线尺寸及净套内面积，适合专业投资人细致比对。',
        ],
      },
    },
  },
  {
    id: 'sales-6',
    title: 'Gói Truyền Thông Kỹ Thuật Số & Phim Kiến Trúc 4K VR 360',
    category: 'brochure',
    description: 'Kho tư liệu hình ảnh render độ phân giải cao 8K, video thước phim kiến trúc 4K, video Flycam bãi biển Mỹ Khê và tư liệu mạng xã hội.',
    fileFormat: 'ZIP',
    fileSize: '128.0 MB',
    releaseDate: 'Tháng 09/2026',
    badge: 'MEDIA KIT',
    previewImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1200',
    highlights: [
      'Hơn 60 bức ảnh render ngoại thất và nội thất chất lượng gốc không nén.',
      'Video giới thiệu kiến trúc 4K có phụ đề song ngữ Việt - Anh chuẩn quốc tế.',
      'Bộ banner thiết kế sẵn theo kích thước chuẩn Facebook, Instagram, LinkedIn.',
    ],
    translations: {
      en: {
        title: 'Digital Media Kit & 4K Architectural VR 360 Video Assets',
        description: 'Official digital repository with ultra-res 8K renders, 4K cinematic film tours, My Khe beach aerial drone footage, and social templates.',
        badge: 'MEDIA KIT',
        highlights: [
          'Over 60 original uncompressed high-resolution exterior and interior renders.',
          '4K cinematic architectural walkthrough video with bilingual English - Vietnamese subtitles.',
          'Pre-sized promotional digital creatives tailored for social channels.',
        ],
      },
      zh: {
        title: '官方数字化多媒体物料包与 4K 全景航拍漫游视频',
        description: '包含 8K 超高清效果图、4K 建筑概念短片、美溪海滩无人机航拍实景以及社交媒体宣发物料。',
        badge: '全媒体素材包',
        highlights: [
          '收录逾 60 张未经压缩的建筑外立面、景观庭院及样板房高清大图。',
          '4K 院线级建筑设计纪录片，配备越英双语标准字幕。',
          '配备适配主流社交平台的标准比例宣发海报，方便随时分享。',
        ],
      },
    },
  },
];

/**
 * Retrieves localized sales kit items.
 * @param locale The target locale string.
 * @returns Localized array of sales kit items.
 */
export function getLocalizedSalesKit(locale: string): SalesKitItem[] {
  if (locale === 'vi') {
    return SALES_KIT_ITEMS;
  }

  return SALES_KIT_ITEMS.map((item) => {
    const loc = item.translations?.[locale];
    if (!loc) {
      return item;
    }

    return {
      ...item,
      title: loc.title ?? item.title,
      description: loc.description ?? item.description,
      badge: loc.badge ?? item.badge,
      highlights: loc.highlights ?? item.highlights,
    };
  });
}
