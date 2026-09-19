export type FaqCategory = 'legal' | 'operations' | 'construction' | 'amenities' | 'finance';

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  keyPoints?: string[];
  translations?: Record<
    string,
    {
      question?: string;
      answer?: string;
      keyPoints?: string[];
    }
  >;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'legal',
    question: 'Condotel Alizé Residence sở hữu trong thời hạn bao lâu? Hình thức sở hữu ra sao?',
    answer:
      'Căn hộ khách sạn (Condotel) tại Alizé Residence được cấp Giấy chứng nhận quyền sở hữu công trình theo quy định của Nghị định 10/2023/NĐ-CP và Luật Kinh doanh BĐS mới nhất. Thời hạn sở hữu theo thời hạn giao đất của dự án là 50 năm và được gia hạn theo quy định pháp luật khi hết hạn. Khách hàng có toàn quyền chuyển nhượng, tặng cho, thừa kế, thế chấp ngân hàng hoặc ủy thác khai thác kinh doanh.',
    keyPoints: [
      'Cấp Giấy chứng nhận quyền sở hữu công trình xây dựng gắn liền với đất theo đúng Nghị định 10/2023/NĐ-CP.',
      'Thời hạn sử dụng đất 50 năm, có cơ chế gia hạn tự động theo quy định của Luật Đất đai.',
      'Đầy đủ quyền sở hữu tài sản: Mua bán, chuyển nhượng, cho thuê hoặc thế chấp ngân hàng.',
    ],
    translations: {
      en: {
        question: 'What is the ownership tenure and legal title for Alizé Residence condotels?',
        answer:
          'Condotels at Alizé Residence are granted official Ownership Certificates under Decree No. 10/2023/ND-CP and the amended Real Estate Business Law. The statutory land-use term is 50 years, with statutory extension upon expiration. Owners possess full commercial rights to transfer, bequeath, mortgage, or enroll into the rental operations program.',
        keyPoints: [
          'Official Property Ownership Certificate issued pursuant to Decree 10/2023/ND-CP.',
          '50-year commercial land tenure, extendable in accordance with Vietnamese Land Law.',
          'Comprehensive property rights: transfer, lease out, bequeath, or utilize as bank collateral.',
        ],
      },
      zh: {
        question: 'Alizé Residence 酒店式公寓的产权年限是多久？权属形式如何？',
        answer:
          '根据越南政府关于房地产产权登记的第 10/2023/NĐ-CP 号法令及最新《房地产经营法》，Alizé Residence 酒店式公寓由政府主管部门颁发正式房屋所有权证书（粉红皮书）。土地法定使用年限为 50 年，期满后根据国家法律程序办理续期。业主依法享有完整财产处分权，包括自由转让、继承、抵押贷款或委托运营。',
        keyPoints: [
          '依照第 10/2023/NĐ-CP 号法令享有国家法定不动产所有权登记。',
          '商业土地使用权年限 50 年，期满后按越南土地法规定可申请延续。',
          '享有完整资产处分权利：转售、长期租赁、作为银行贷款抵押品等。',
        ],
      },
    },
  },
  {
    id: 'faq-2',
    category: 'legal',
    question: 'Khách hàng nước ngoài và Việt kiều có được mua và sở hữu căn hộ tại Alizé không?',
    answer:
      'Có. Theo quy định của Luật Nhà ở và Luật Kinh doanh BĐS sửa đổi, khách hàng quốc tế được phép mua và sở hữu căn hộ condotel thông qua Hợp đồng mua bán hoặc Hợp đồng thuê dài hạn với đầy đủ quyền sử dụng, khai thác cho thuê và hưởng lợi nhuận tương đương công dân Việt Nam. Đội ngũ Concierge và Pháp lý của Alizé hỗ trợ thủ tục pháp lý song ngữ trọn gói.',
    keyPoints: [
      'Người nước ngoài được nhập cảnh hợp pháp vào Việt Nam đều đủ điều kiện ký hợp đồng.',
      'Hạn mức sở hữu căn hộ dành cho người nước ngoài tuân thủ chỉ tiêu tối đa của cơ quan quản lý.',
      'Hỗ trợ hợp đồng song ngữ Anh - Việt và kênh thanh toán ngoại hối quốc tế an toàn.',
    ],
    translations: {
      en: {
        question: 'Can foreign nationals and overseas Vietnamese purchase units at Alizé Residence?',
        answer:
          'Yes. Under the amended Vietnamese Housing and Real Estate Laws, foreign nationals and overseas Vietnamese with valid entry visas are fully entitled to purchase and own condotel units via official sales contracts or long-term lease covenants, enjoying full rental dividends and capital appreciation equal to domestic investors.',
        keyPoints: [
          'Foreign passport holders with valid visa entry stamp are legally eligible.',
          'Foreign ownership quota strictly adheres to governmental statutory caps.',
          'Full bilingual English - Vietnamese legal processing and authorized foreign exchange channels.',
        ],
      },
      zh: {
        question: '外籍人士及海外越侨是否可以合法认购并持有 Alizé 项目的房产？',
        answer:
          '完全可以。依据越南新版《住宅法》及《房地产经营法》，凡合法持有效签证入境越南的外国公民及越侨，均具备合法认购 Alizé Residence 酒店式公寓的资格。外籍买家可依法签署具有法律效力的双语认购合同，并享有同等丰厚的酒店租金收益分配及资产增值权益。',
        keyPoints: [
          '持有效入境签证的外国护照持有者均可合法办理签约登记。',
          '外籍认购配额严格执行越南政府规定的上限安全保障。',
          '提供越英双语合同及合规跨境外汇资金清算协助。',
        ],
      },
    },
  },
  {
    id: 'faq-3',
    category: 'construction',
    question: 'Tiến độ thi công hiện tại đến giai đoạn nào và dự kiến bàn giao khi nào?',
    answer:
      'Tính đến Quý 3/2026, dự án đã hoàn thành 100% công tác móng cọc khoan nhồi sâu D1200 - D1500 và 3 tầng hầm kỹ thuật kiên cố. Nhà thầu xây dựng đang thi công phần thân tháp và hoàn thiện cơ điện MEP. Dự án dự kiến cất nóc vào giữa năm 2026 và bàn giao chính thức cho khách hàng đi vào vận hành trong Quý 4/2026.',
    keyPoints: [
      'Đã hoàn thành móng cọc khoan nhồi, tường vây ngầm và nghiệm thu sàn hầm.',
      'Thi công 3 ca liên tục dưới sự giám sát độc lập của đơn vị tư vấn quốc tế.',
      'Cam kết bàn giao nhà chuẩn 5 sao quốc tế đúng hạn vào Quý 4/2026.',
    ],
    translations: {
      en: {
        question: 'What is the current construction milestone and expected handover schedule?',
        answer:
          'As of Q3 2026, 100% of deep bored pile engineering (D1200 - D1500) and 3 subterranean basements have passed rigorous inspections. Superstructure casting and MEP works are advancing rapidly. The tower is slated for topping-out in mid-2026 with final keys delivered in Q4 2026.',
        keyPoints: [
          'Substructure, diaphragm walls, and subterranean floor plates fully completed and certified.',
          'Continuous 3-shift engineering under premier independent international site audits.',
          'Guaranteed turnkey 5-star international delivery scheduled for Q4 2026.',
        ],
      },
      zh: {
        question: '目前工程进度进行到哪一阶段？预计何时竣工交房？',
        answer:
          '截至 2026 年第三季度，项目已圆满完成 D1200-D1500 超深钻孔灌注桩群及地下 3 层连续墙工程验收。地上主体塔楼及 MEP 机电管线安装正如期稳步推进。项目计划于 2026 年中实现主体结构封顶，并于 2026 年第四季度正式向业主精装交付并开业运营。',
        keyPoints: [
          '地下基础、止水防渗连续墙及三层地下室已全部通过官方验收。',
          '三班倒高效精工组织，国际独立第三方工程监理全天候驻场严控。',
          '严格恪守交付节点，确保 2026 年第四季度达到五星级高品质交付标准。',
        ],
      },
    },
  },
  {
    id: 'faq-4',
    category: 'construction',
    question: 'Tiêu chuẩn trang thiết bị bàn giao căn hộ bao gồm những gì?',
    answer:
      'Căn hộ được bàn giao theo tiêu chuẩn “Full Furniture & Smart Home 5 sao” chìa khóa trao tay. Toàn bộ thiết bị vệ sinh nhập khẩu Villeroy & Boch (Đức), phụ kiện Hafele/Hansgrohe, hệ kính hộp Low-E 3 lớp cản tia UV và cách âm, điều hòa trung tâm âm trần Daikin VRV, nội thất gỗ tự nhiên cao cấp và hệ thống chiếu sáng thông minh điều khiển qua smartphone.',
    keyPoints: [
      'Gói bàn giao chìa khóa trao tay (Fully Furnished) sẵn sàng đưa vào vận hành cho thuê ngay.',
      '100% thiết bị vệ sinh cao cấp từ thương hiệu Đức danh tiếng Villeroy & Boch.',
      'Kính Low-E 3 lớp phủ mềm cao cấp ngăn nhiệt biển và cách âm tuyệt đối.',
    ],
    translations: {
      en: {
        question: 'What is included in the interior handover specifications?',
        answer:
          'Apartments are delivered turnkey under "Full 5-Star Hotel Furniture & Smart Home" standards. Specifications include imported Villeroy & Boch sanitary fixtures, Hafele/Hansgrohe hardware, triple-pane Low-E acoustic glazing, Daikin VRV ducted air conditioning, luxury natural millwork, and mobile-enabled smart lighting.',
        keyPoints: [
          'Turnkey fully furnished standard immediately ready for hotel leasing on day one.',
          '100% premium sanitary porcelain by prestigious German manufacturer Villeroy & Boch.',
          'Triple-glazed soft-coat Low-E glass shielding radiant coastal heat and acoustics.',
        ],
      },
      zh: {
        question: '交付标准包含哪些软硬装与品牌配置？',
        answer:
          '所有公寓均达到“五星级全装全配拎包入住（Turnkey）及全屋智能”标准。卫浴采用德国唯宝（Villeroy & Boch）及汉斯格雅顶级五金，外立面配装三玻两腔 Low-E 隔音防紫外线中空夹胶玻璃，大金 VRV 中央隐藏式空调，定制高级原木家具及手机 App 智慧物联照明温控。',
        keyPoints: [
          '拎包入住五星级全装标准，交付当日即可直接进入酒店托管运营。',
          '全套德国原装进口唯宝（Villeroy & Boch）奢华智能卫浴洁具。',
          '三层 Low-E 镀膜高抗风压玻璃幕墙，有效隔绝海风潮热与外界喧嚣。',
        ],
      },
    },
  },
  {
    id: 'faq-5',
    category: 'operations',
    question: 'Đơn vị nào sẽ trực tiếp quản lý và vận hành tòa tháp Alizé Residence?',
    answer:
      'Dự án được quản lý và vận hành bởi đơn vị quản lý khách sạn quốc tế 5 sao danh tiếng (thuộc mạng lưới đối tác chiến lược của A&T Group). Đơn vị vận hành áp dụng quy chuẩn quản trị khắt khe của ngành khách sạn thượng lưu toàn cầu, kết nối hệ thống phân phối phòng (GDS) toàn cầu để bảo đảm tỷ lệ lấp đầy phòng luôn đạt mức tối ưu.',
    keyPoints: [
      'Thương hiệu quản lý vận hành khách sạn 5 sao quốc tế uy tín.',
      'Hệ thống bán phòng kết nối trên 100 nền tảng lữ hành và đại lý du lịch quốc tế.',
      'Bảo trì định kỳ và chăm chút chất lượng căn hộ theo tiêu chuẩn 5 sao trường tồn.',
    ],
    translations: {
      en: {
        question: 'Which hospitality brand will manage and operate Alizé Residence?',
        answer:
          'The property will be managed and operated by a world-class 5-star international hotel management brand (part of A&T Group’s strategic hospitality alliance). The operator executes stringent global ultra-luxury benchmarks and connects directly into international Global Distribution Systems (GDS) to maintain superior year-round occupancy rates.',
        keyPoints: [
          'Internationally renowned 5-star hospitality operator.',
          'Seamless booking connectivity across 100+ global OTAs and luxury tour networks.',
          'Continuous scheduled maintenance preserving asset longevity to 5-star standards.',
        ],
      },
      zh: {
        question: '将由哪家机构直接负责 Alizé Residence 的物业运营与酒店管理？',
        answer:
          '项目委托国际知名五星级酒店管理集团团队统一运营管理（A&T Group 核心战略合作伙伴）。管理团队严格执行全球奢华酒店 SOP 服务标准，全面接入全球分销系统（GDS）及主流在线旅行平台，确保全年客房入住率及客单均价保持行业领先。',
        keyPoints: [
          '具备国际一流声誉的高端酒店与品牌公寓运管团队。',
          '直连全球 100 多家国际在线旅行社（OTA）与跨国商旅网络。',
          '定期专项维保翻新，确保不动产硬件历久弥新，保值升值。',
        ],
      },
    },
  },
  {
    id: 'faq-6',
    category: 'operations',
    question: 'Chương trình chia sẻ doanh thu 85/15 hoạt động cụ thể như thế nào?',
    answer:
      'Chủ sở hữu căn hộ nhận 85% doanh thu thuần từ hoạt động khai thác phòng sau khi trừ các chi phí trực tiếp hợp lý, 15% còn lại dành cho đơn vị quản lý vận hành. Báo cáo doanh thu được kiểm toán độc lập định kỳ 6 tháng/lần và tiền chia sẻ được chuyển khoản trực tiếp vào tài khoản ngân hàng của chủ sở hữu vào tháng 6 và tháng 12 hàng năm.',
    keyPoints: [
      'Chủ sở hữu hưởng 85% — Đơn vị vận hành hưởng 15% trên doanh thu phòng thuần túy.',
      'Minh bạch tài chính tuyệt đối với kiểm toán độc lập từ hãng kiểm toán Big 4.',
      'Kỳ thanh toán cổ tức định kỳ 2 lần/năm trực tiếp vào tài khoản của khách hàng.',
    ],
    translations: {
      en: {
        question: 'How does the 85/15 rental revenue sharing program operate?',
        answer:
          'Owners receive 85% of net room rental revenues after allowable direct operational costs, while the remaining 15% covers the management fee. Financial records undergo bi-annual independent audits by a tier-1 firm, with net dividend proceeds disbursed directly to owners every June and December.',
        keyPoints: [
          'Owners receive 85% — Hotel operator retains 15% from net accommodation revenues.',
          'Absolute accounting transparency audited by an independent international accounting firm.',
          'Semi-annual dividend disbursements wired directly to your designated bank account.',
        ],
      },
      zh: {
        question: '85/15 酒店租金营业收益分成计划具体如何运作与分配？',
        answer:
          '业主享受客房净营业收入的 85%，运营方计提 15% 作为管理运营费。所有运营账目每半年由国际知名会计师事务所进行独立第三方财务审计，净收益分成于每年 6 月及 12 月按期汇入业主在银行开立的指定账户。',
        keyPoints: [
          '业主净分润比例高达 85%，运营管理方提取 15%。',
          '引入国际四大会计师事务所级别独立审计，账目透明可查。',
          '每年两次定期稳健分红，资金直达业主指定银行账户。',
        ],
      },
    },
  },
  {
    id: 'faq-7',
    category: 'operations',
    question: 'Chủ sở hữu được bao nhiêu đêm nghỉ miễn phí mỗi năm và có quy đổi được không?',
    answer:
      'Mỗi năm, chủ sở hữu căn hộ được tặng 15 đêm nghỉ dưỡng miễn phí tiêu chuẩn 5 sao tại chính căn hộ của mình hoặc các căn hộ tương đương trong tòa tháp. Ngoài ra, các đêm nghỉ này có thể tặng cho người thân, đối tác hoặc quy đổi linh hoạt trong hệ thống khách sạn và resort liên kết của A&T Group.',
    keyPoints: [
      '15 đêm nghỉ dưỡng 5 sao miễn phí mỗi năm trọn đời dự án.',
      'Được quyền ủy quyền hoặc tặng cho bạn bè, người thân, đối tác kinh doanh.',
      'Cơ chế hoán đổi kỳ nghỉ tại các khu nghỉ dưỡng sinh thái cùng hệ thống.',
    ],
    translations: {
      en: {
        question: 'How many complimentary nights do owners receive, and are they exchangeable?',
        answer:
          'Every year, each owner is entitled to 15 complimentary 5-star vacation nights in their suite or comparable units across the tower. These nights can be freely gifted to relatives and VIP associates or exchanged across A&T Group’s allied luxury hotel collection.',
        keyPoints: [
          '15 complimentary 5-star resort room nights every single year.',
          'Full liberty to assign or gift to family, friends, and business partners.',
          'Vacation exchange options across A&T Group’s premier hospitality portfolio.',
        ],
      },
      zh: {
        question: '业主每年可享受多少晚免费度假？是否支持转让或互换？',
        answer:
          '每位业主每年享有 15 晚本公寓或同等级房型的免费五星级度假特权。此 15 晚房券支持全权赠予亲友、商务伙伴，亦可用于 A&T Group 旗下全国高端度假酒店及合作度假村的客房互换体验。',
        keyPoints: [
          '每年无条件获赠 15 晚高品质免费海景度假权益。',
          '完全支持自由转赠给家人、挚友或尊贵商业合作伙伴。',
          '尊享战略合作奢华度假酒店联盟积分与客房置换权益。',
        ],
      },
    },
  },
  {
    id: 'faq-8',
    category: 'amenities',
    question: 'Hệ thống tiện ích đặc quyền tại tòa tháp Alizé Residence gồm những gì?',
    answer:
      'Alizé Residence sở hữu chuỗi tiện ích chuẩn khách sạn quốc tế: Hồ bơi vô cực chân mây tầng 39 ngắm trọn biển Mỹ Khê và bán đảo Sơn Trà, Sky Lounge & Cigar Bar đẳng cấp, Trung tâm chăm sóc sức khỏe & Spa thải độc, Phòng gym công nghệ Technogym, Vườn thiền Địa Trung Hải và Nhà hàng ẩm thực Fusion hướng biển.',
    keyPoints: [
      'Hồ bơi vô cực trên tầng 39 có tầm nhìn panorama 360 độ ngắm hoàng hôn và bình minh biển.',
      'Sky Club, Cigar Bar và phòng tiệc riêng phục vụ giới thượng lưu.',
      'Khu Spa, xông hơi khô/ướt và phòng gym chuẩn thi đấu quốc tế.',
    ],
    translations: {
      en: {
        question: 'What exclusive lifestyle amenities are featured at Alizé Residence?',
        answer:
          'Alizé Residence features world-class resort amenities: the 39th-floor celestial infinity pool with panoramic ocean and Son Tra views, high-end Sky Lounge & Cigar Bar, luxury detox Wellness & Spa sanctuary, Technogym-fitted fitness suite, tranquil Mediterranean Zen garden, and beachfront Fusion dining.',
        keyPoints: [
          '39th-floor sky infinity pool with panoramic 360-degree ocean and sunrise vistas.',
          'Private Sky Club, Cigar Bar, and VIP dining suites for bespoke entertaining.',
          'Holistic wellness spa, sauna, and state-of-the-art Technogym fitness center.',
        ],
      },
      zh: {
        question: 'Alizé Residence 汇聚了哪些顶级私人专属配套设施？',
        answer:
          '大厦配备世界级全系奢华配套：位于 39 层的天际无边际泳池，瞰览美溪海滩全景与茶山半岛；顶层天际酒廊（Sky Lounge）与雪茄吧；高端水疗 SPA 与身心疗愈中心；意大利 Technogym 泰诺健全景健身房；地中海风情空中静谧花园及一线海景无国界料理餐厅。',
        keyPoints: [
          '39 层云端全景无边际泳池，尽揽日出朝霞与无垠海天一色。',
          '私人天际俱乐部、尊崇雪茄室与私董会专属宴会厅。',
          '恒温水疗、干湿蒸桑拿室及国际标准全景海景健身中心。',
        ],
      },
    },
  },
  {
    id: 'faq-9',
    category: 'finance',
    question: 'Dự án có chính sách hỗ trợ vay vốn ngân hàng và ân hạn nợ gốc như thế nào?',
    answer:
      'Ngân hàng Vietcombank cung cấp gói tài trợ độc quyền: Cho vay lên tới 70% giá trị căn hộ, hỗ trợ lãi suất 0% trong 24 tháng hoặc đến thời điểm nhận bàn giao nhà. Đồng thời, khách hàng được ân hạn nợ gốc và miễn phí trả nợ trước hạn trong suốt thời gian hỗ trợ lãi suất.',
    keyPoints: [
      'Cho vay tối đa 70% giá trị căn hộ với thời hạn vay linh hoạt lên đến 20 năm.',
      'Hỗ trợ lãi suất 0% và ân hạn nợ gốc trong 24 tháng đầu tiên.',
      'Miễn hoàn toàn phí phạt trả nợ trước hạn trong thời gian ưu đãi lãi suất.',
    ],
    translations: {
      en: {
        question: 'What bank financing packages and interest subsidies are available?',
        answer:
          'Vietcombank provides an exclusive mortgage package: Loans up to 70% of apartment value, 0% interest support for 24 months or until handover, paired with a complete principal moratorium and zero prepayment penalties during the incentive term.',
        keyPoints: [
          'Financing up to 70% of purchase value with extended repayment tenures up to 20 years.',
          '0% interest rate and full principal grace period for the initial 24 months.',
          '100% waiver of early prepayment penalties throughout the incentive duration.',
        ],
      },
      zh: {
        question: '项目提供哪些银行按揭贷款支持及免息还本宽限政策？',
        answer:
          '由越南外贸银行（Vietcombank）提供专属贷款方案：贷款额度最高可达房屋总价的 70%，享受长达 24 个月（或至交房之日）的 0% 贴息支持。在此期间，客户享受本金还款宽限期，并免收任何提前还款违约金。',
        keyPoints: [
          '按揭贷款最高达房款 70%，贷款期限最长可达 20 年。',
          '前 24 个月享受 0% 优惠利率且无需偿还本金。',
          '贴息优惠期内提前结清贷款免除全部罚息违约金。',
        ],
      },
    },
  },
  {
    id: 'faq-10',
    category: 'operations',
    question: 'Nếu chủ sở hữu không muốn cho thuê mà muốn tự ở hoặc nghỉ dưỡng dài hạn được không?',
    answer:
      'Hoàn toàn được. Hợp đồng quy định chủ sở hữu có quyền chủ động lựa chọn: Tham gia chương trình vận hành cho thuê 85/15 để tối đa hóa dòng tiền thụ động, hoặc đăng ký nhận nhà tự ở / nghỉ dưỡng dài hạn để tận hưởng trọn vẹn không gian sống biển Mỹ Khê riêng tư với đầy đủ dịch vụ quản gia Concierge 5 sao.',
    keyPoints: [
      'Quyền tự do lựa chọn giữa tự ở lâu dài hoặc ủy thác khai thác chia sẻ doanh thu.',
      'Có thể chuyển đổi linh hoạt hình thức sử dụng mỗi năm bằng thông báo trước 30 ngày.',
      'Vẫn được hưởng trọn vẹn mọi dịch vụ quản gia, bảo vệ an ninh và tiện ích 5 sao.',
    ],
    translations: {
      en: {
        question: 'Can owners choose self-occupancy rather than joining the rental program?',
        answer:
          'Absolutely. The contract explicitly grants owners full autonomy: either participate in the 85/15 rental pool to maximize recurring yields, or elect permanent residential self-occupancy to savor beachfront living alongside 5-star concierge privileges.',
        keyPoints: [
          'Total autonomy to select residential living or commercial revenue participation.',
          'Flexible annual status adjustments upon simple 30-day advance notice.',
          'Unrestricted access to 24/7 concierge, private security, and luxury resort facilities.',
        ],
      },
      zh: {
        question: '若业主不想委托出租，是否可以选择自主常住或长期度假？',
        answer:
          '完全可以。认购合同赋予业主充分的自主权：既可选择加入 85/15 酒店托管收益计划实现被动收益最大化，亦可登记为私人常住住宅，享受美溪海滩顶级一线海景生活与五星级管家私人定制服务。',
        keyPoints: [
          '自主选择纯自住或委托酒店托管分成，不受强制约束。',
          '每年可通过提前 30 天书面通知灵活切换使用模式。',
          '即便纯自住，依然尊享 24 小时礼宾管家、安保及全部奢华度假配套。',
        ],
      },
    },
  },
];

/**
 * Retrieves localized FAQ items.
 * @param locale The target locale string.
 * @returns Localized array of FAQ items.
 */
export function getLocalizedFaqItems(locale: string): FaqItem[] {
  if (locale === 'vi') {
    return FAQ_ITEMS;
  }

  return FAQ_ITEMS.map((item) => {
    const loc = item.translations?.[locale];
    if (!loc) {
      return item;
    }

    return {
      ...item,
      question: loc.question ?? item.question,
      answer: loc.answer ?? item.answer,
      keyPoints: loc.keyPoints ?? item.keyPoints,
    };
  });
}
