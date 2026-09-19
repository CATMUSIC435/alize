import { routing } from '@/libs/I18nRouting';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

const LOCALE_TO_OG: Record<string, string> = {
  vi: 'vi_VN',
  en: 'en_US',
  zh: 'zh_CN',
};

export type I18nAlternates = {
  canonical: string;
  languages: Record<string, string>;
};

/**
 * Builds canonical and hreflang alternate URLs for Next.js metadata.
 * @param path The route path, e.g. '' or '/apartments'.
 * @param currentLocale The current active locale.
 * @returns Metadata alternates object with canonical and multilingual hreflang targets.
 */
export const getI18nAlternates = (path: string, currentLocale: string): I18nAlternates => {
  const baseUrl = getBaseUrl().replace(/\/+$/, '');
  const cleanPath = path === '/' ? '' : path;
  const normalizedPath = cleanPath.startsWith('/') || cleanPath === '' ? cleanPath : `/${cleanPath}`;

  const formatUrl = (loc: string) => {
    const locPath = getI18nPath(normalizedPath, loc);
    return locPath === '' ? `${baseUrl}/` : `${baseUrl}${locPath}`;
  };

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((loc) => [loc, formatUrl(loc)]),
  );

  return {
    canonical: formatUrl(currentLocale),
    languages: {
      ...languages,
      'x-default': formatUrl(routing.defaultLocale),
    },
  };
};

/**
 * Resolves OpenGraph locale and alternate locales for social sharing tags.
 * @param locale The current active locale.
 * @returns An object containing the primary og:locale and alternate og:locale values.
 */
export const getOpenGraphLocales = (locale: string) => {
  const currentOg = LOCALE_TO_OG[locale] ?? `${locale}_${locale.toUpperCase()}`;
  const alternateLocales = routing.locales
    .filter((loc) => loc !== locale)
    .map((loc) => LOCALE_TO_OG[loc] ?? `${loc}_${loc.toUpperCase()}`);

  return {
    locale: currentOg,
    alternateLocale: alternateLocales,
  };
};

const KEYWORDS_BY_PAGE: Record<
  string,
  Record<string, string[]>
> = {
  home: {
    vi: [
      'Alizé Residence',
      'Căn hộ Alizé Đà Nẵng',
      'Bất động sản Mỹ Khê',
      'Căn hộ biển cao cấp Đà Nẵng',
      'Branded Residences Da Nang',
      'Alizé Residence Danang',
      'Luxury beachfront residences Vietnam',
      'A&T Group Đà Nẵng',
      'Căn hộ view biển Mỹ Khê',
    ],
    en: [
      'Alizé Residence',
      'Alizé Residence Da Nang',
      'Luxury beachfront apartments Da Nang',
      'My Khe beach luxury residences',
      'Branded Residences Vietnam',
      'Da Nang oceanfront condos',
      'Vietnam coastal property investment',
      'AEDAS architecture Da Nang',
    ],
    zh: [
      'Alizé Residence',
      '岘港 Alizé 公寓',
      '岘港海景豪宅',
      '美溪海滩一线公寓',
      '越南品牌住宅',
      '岘港高端房地产投资',
      'AEDAS 建筑设计岘港',
      '越南海滨度假公寓',
    ],
  },
  apartments: {
    vi: [
      'Bộ sưu tập căn hộ Alizé',
      'Căn hộ 2 phòng ngủ Mỹ Khê',
      'Căn hộ 3 phòng ngủ view biển Đà Nẵng',
      'Penthouse Alizé Residence Đà Nẵng',
      'Duplex mặt biển Đà Nẵng',
      'Mặt bằng căn hộ Alizé Residence',
    ],
    en: [
      'Alizé Residence apartments',
      '2 bedroom apartment Da Nang',
      '3 bedroom oceanfront condo Da Nang',
      'Penthouse Alizé Residence',
      'Luxury beachfront apartments Vietnam',
      'Floor plans Alizé Residence',
    ],
    zh: [
      'Alizé Residence 公寓户型',
      '岘港两居室海景房',
      '岘港三居室一线海景公寓',
      'Alizé 奢华天际大平层顶层公寓',
      '岘港美溪海滩高端住宅户型',
    ],
  },
  news: {
    vi: [
      'Alizé Residence',
      'Tin tức Alizé',
      'Tiến độ Alizé Residence',
      'Căn hộ biển Mỹ Khê',
      'Bất động sản Đà Nẵng',
      'Branded Residences Da Nang',
      'A&T Group Alizé',
      'Kiến trúc Địa Trung Hải Đà Nẵng',
    ],
    en: [
      'Alizé Residence news',
      'Alizé construction update',
      'Da Nang real estate journal',
      'My Khe beachfront development',
      'Mediterranean architecture Vietnam',
      'Luxury branded residences news',
    ],
    zh: [
      'Alizé Residence 新闻与工程进度',
      '岘港房地产市场资讯',
      '美溪海滩建筑动态',
      '地中海风格建筑越南',
      '岘港品牌豪宅项目资讯',
    ],
  },
  contact: {
    vi: [
      'Liên hệ Alizé Residence',
      'Đặt lịch xem nhà mẫu Alizé',
      'Hotline Alizé Đà Nẵng',
      'Sales gallery Alizé Residence',
      'Căn hộ biển Mỹ Khê Đà Nẵng',
      'Tư vấn dự án Alizé',
    ],
    en: [
      'Contact Alizé Residence',
      'Book a private tour Alizé Da Nang',
      'Alizé sales gallery',
      'Luxury beachfront condo inquiries',
      'Concierge Alizé Residence',
    ],
    zh: [
      '联系 Alizé Residence',
      '预约参观样板房 岘港',
      'Alizé 销售中心',
      '岘港一线海景公寓咨询',
      'Alizé 贵宾接待服务',
    ],
  },
  gallery: {
    vi: [
      'Thư viện ảnh Alizé Residence',
      'Hình ảnh thực tế Alizé Đà Nẵng',
      'Phối cảnh 3D Alizé Mỹ Khê',
      'Video kiến trúc Alizé Đà Nẵng',
      'Nội thất penthouse Alizé',
      'Hồ bơi vô cực Alizé Residence',
    ],
    en: [
      'Alizé Residence visual gallery',
      'Alizé Da Nang 4K architecture photos',
      'My Khe beachfront luxury renders',
      'Alizé penthouse interior photos',
      'Alizé infinity pool views',
    ],
    zh: [
      'Alizé Residence 视觉画廊',
      '岘港 Alizé 实景与效果图',
      '美溪海滩一线海景高清图集',
      'Alizé 顶层大平层室内图集',
      'Alizé 天际无边际泳池实景',
    ],
  },
  floorplans: {
    vi: [
      'Mặt bằng Alizé Residence',
      'Sơ đồ phân tầng Alizé Đà Nẵng',
      'Layout căn hộ Alizé Mỹ Khê',
      'Mặt bằng condotel Alizé',
      'Mặt bằng penthouse Alizé Residence',
      'Bản vẽ thiết kế Alizé Đà Nẵng',
    ],
    en: [
      'Alizé Residence floor plans',
      'Master plan Alizé Da Nang',
      'Apartment layouts My Khe beach',
      'Condotel floor plates Alizé',
      'Penthouse 3D cutaway Da Nang',
    ],
    zh: [
      'Alizé Residence 户型图',
      '岘港 Alizé 楼层平面图',
      '美溪海滩海景套房户型图',
      'Alizé 空间垂直规划图',
      '天际顶层大平层剖面图',
    ],
  },
  legal: {
    vi: [
      'Pháp lý Alizé Residence',
      'Hồ sơ pháp lý Alizé Đà Nẵng',
      'Giấy phép xây dựng Alizé',
      'Quy hoạch 1/500 Alizé Residence',
      'Sổ hồng căn hộ Alizé Mỹ Khê',
      'Pháp lý dự án A&T Group',
    ],
    en: [
      'Alizé Residence legal documents',
      'Alizé construction permit',
      'Alizé zoning approval',
      'Condotel legal status Da Nang',
      'Alizé ownership certificate',
    ],
    zh: [
      'Alizé Residence 法律文件',
      '岘港 Alizé 施工许可证',
      'Alizé 1/500 规划批文',
      '越南酒店式公寓产权红本',
      'A&T Group 资质证书',
    ],
  },
  sales: {
    vi: [
      'Tài liệu bán hàng Alizé Residence',
      'Sales Kit Alizé Đà Nẵng',
      'Bảng giá căn hộ Alizé',
      'Chính sách bán hàng Alizé Residence',
      'Brochure Alizé Mỹ Khê 4K',
      'Bảng tính dòng tiền cho thuê condotel',
    ],
    en: [
      'Alizé Residence sales kit',
      'Alizé price list and policies',
      'Alizé project brochure 4K',
      'Condotel cash flow model',
      'Luxury apartment sales materials Da Nang',
    ],
    zh: [
      'Alizé Residence 销售资料包',
      '岘港 Alizé 最新价格表与认购政策',
      'Alizé 4K 官方楼书画册',
      '酒店式公寓租金回报率测算',
    ],
  },
  faq: {
    vi: [
      'Câu hỏi thường gặp Alizé Residence',
      'Hỏi đáp pháp lý condotel Alizé',
      'Chính sách chia sẻ doanh thu 85/15',
      'Tiến độ bàn giao Alizé Đà Nẵng',
      'Người nước ngoài mua căn hộ Alizé',
    ],
    en: [
      'Alizé Residence FAQ',
      'Frequently asked questions Alizé',
      '85/15 rental revenue sharing condotel',
      'Alizé handover date Da Nang',
      'Foreign ownership Alizé Residence',
    ],
    zh: [
      'Alizé Residence 常见问题解答',
      '岘港 Alizé 购房 FAQ',
      '85/15 酒店托管收益政策',
      '外籍人士在越购房流程',
      'Alizé 项目交房时间',
    ],
  },
  privacy: {
    vi: [
      'Chính sách bảo mật Alizé Residence',
      'Bảo vệ dữ liệu cá nhân Alizé',
      'Bảo mật thông tin khách hàng Đà Nẵng',
      'Nghị định 13/2023 bảo vệ dữ liệu',
    ],
    en: [
      'Alizé Residence privacy policy',
      'Personal data protection Vietnam',
      'Customer privacy Alizé Da Nang',
    ],
    zh: [
      'Alizé Residence 隐私政策',
      '岘港 Alizé 个人信息安全保护声明',
      '越南数据安全合规',
    ],
  },
  terms: {
    vi: [
      'Điều khoản sử dụng Alizé Residence',
      'Quy định sử dụng website Alizé',
      'Bản quyền kiến trúc AEDAS Alizé',
    ],
    en: [
      'Alizé Residence terms of use',
      'Terms and conditions Alizé',
      'AEDAS architecture copyright',
    ],
    zh: [
      'Alizé Residence 网站使用条款',
      'AEDAS 建筑知识产权声明',
      '岘港 Alizé 免责声明',
    ],
  },
  regulations: {
    vi: [
      'Quy chế hoạt động Alizé Residence',
      'Quy chế quản lý vận hành tòa nhà',
      'Tiêu chuẩn an ninh condotel Alizé',
      'Quy định tiện ích hồ bơi Alizé',
    ],
    en: [
      'Alizé Residence operating regulations',
      'Building management rules Da Nang',
      'Condotel amenities charter Alizé',
    ],
    zh: [
      'Alizé Residence 大厦管理规约',
      '岘港高端公寓运营规范',
      '天际无边泳池使用公约',
    ],
  },
};

/**
 * Retrieves localized keywords for SEO metadata by page key.
 * @param pageKey The page identifier ('home' | 'apartments' | 'news' | 'contact' | 'gallery' | 'floorplans' | 'legal' | 'sales' | 'faq' | 'privacy' | 'terms' | 'regulations').
 * @param locale The active locale.
 * @returns Array of localized keywords.
 */
export const getLocalizedKeywords = (
  pageKey:
    | 'home'
    | 'apartments'
    | 'news'
    | 'contact'
    | 'gallery'
    | 'floorplans'
    | 'legal'
    | 'sales'
    | 'faq'
    | 'privacy'
    | 'terms'
    | 'regulations',
  locale: string,
): string[] => {
  return KEYWORDS_BY_PAGE[pageKey]?.[locale] ?? KEYWORDS_BY_PAGE[pageKey]?.vi ?? [];
};

/**
 * Standardized NAP (Name, Address, Phone) and Local SEO configuration.
 * Single source of truth for Google Maps, Google Business Profile, and Schema.org structured data.
 */
export const LOCAL_BUSINESS_CONFIG = {
  name: 'Alizé Residence Đà Nẵng',
  alternateName: 'Alizé Residence Da Nang',
  legalName: 'Alizé Residence',
  telephone: '+84965355355',
  displayPhone: '+84 (965) 355-355',
  email: 'contact@alize-residence.com',
  priceRange: '$$$$',
  currenciesAccepted: 'VND, USD',
  paymentAccepted: 'Cash, Credit Card, Wire Transfer',
  areaServed: ['Đà Nẵng', 'Hà Nội', 'Hồ Chí Minh', 'International'],
  hasMap: 'https://maps.google.com/?q=16.0617,108.2435',
  address: {
    '@type': 'PostalAddress' as const,
    streetAddress: 'Đường Võ Nguyên Giáp, Phường Phước Mỹ',
    addressLocality: 'Sơn Trà',
    addressRegion: 'Đà Nẵng',
    postalCode: '550000',
    addressCountry: 'VN',
  },
  geo: {
    '@type': 'GeoCoordinates' as const,
    latitude: 16.0617,
    longitude: 108.2435,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '08:30',
      closes: '18:30',
    },
  ],
};

/**
 * Generates Schema.org LocalBusiness / ApartmentComplex structured data.
 * @param locale The active locale.
 * @returns Standardized ApartmentComplex JSON-LD entity.
 */
export const getLocalBusinessJsonLd = (locale: string) => {
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    '@id': `${baseUrl}/#apartment-complex`,
    inLanguage: locale,
    name: LOCAL_BUSINESS_CONFIG.name,
    alternateName: LOCAL_BUSINESS_CONFIG.alternateName,
    url: `${baseUrl}${getI18nPath('', locale)}`,
    telephone: LOCAL_BUSINESS_CONFIG.telephone,
    email: LOCAL_BUSINESS_CONFIG.email,
    priceRange: LOCAL_BUSINESS_CONFIG.priceRange,
    currenciesAccepted: LOCAL_BUSINESS_CONFIG.currenciesAccepted,
    paymentAccepted: LOCAL_BUSINESS_CONFIG.paymentAccepted,
    areaServed: LOCAL_BUSINESS_CONFIG.areaServed,
    hasMap: LOCAL_BUSINESS_CONFIG.hasMap,
    address: LOCAL_BUSINESS_CONFIG.address,
    geo: LOCAL_BUSINESS_CONFIG.geo,
    openingHoursSpecification: LOCAL_BUSINESS_CONFIG.openingHoursSpecification,
  };
};

