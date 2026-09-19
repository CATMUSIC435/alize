export type LegalCategory = 'planning' | 'land' | 'safety' | 'contract';

export type LegalDocument = {
  id: string;
  code: string;
  title: string;
  category: LegalCategory;
  authority: string;
  issueDate: string;
  effectiveDate: string;
  status: 'approved' | 'active' | 'certified';
  summary: string;
  keyPoints: string[];
  documentUrl?: string;
  fileSize?: string;
  translations?: Record<
    string,
    {
      title?: string;
      authority?: string;
      summary?: string;
      keyPoints?: string[];
    }
  >;
};

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'legal-1',
    code: 'Số 28/GPXD-SXD',
    title: 'Giấy phép xây dựng công trình Alizé Residence',
    category: 'planning',
    authority: 'Sở Xây dựng TP. Đà Nẵng',
    issueDate: '18/04/2025',
    effectiveDate: '18/04/2025',
    status: 'approved',
    summary: 'Cấp phép xây dựng công trình tổ hợp căn hộ khách sạn condotel và dịch vụ thương mại Alizé Residence quy mô 39 tầng nổi và 3 tầng hầm.',
    keyPoints: [
      'Quy mô công trình: 39 tầng nổi, 3 tầng hầm, chiều cao công trình 145m.',
      'Mật độ xây dựng khối đế 55%, khối tháp 40% tuân thủ quy chuẩn kỹ thuật quốc gia.',
      'Hệ thống móng cọc khoan nhồi sâu đường kính lớn và tường vây tiêu chuẩn quốc tế.',
    ],
    fileSize: '3.4 MB',
    translations: {
      en: {
        title: 'Construction Permit for Alizé Residence Project',
        authority: 'Da Nang Department of Construction',
        summary: 'Official construction permit for the 39-story luxury condotel and commercial complex with 3 subterranean levels.',
        keyPoints: [
          'Scale: 39 above-ground floors, 3 basements, 145m building elevation.',
          'Building coverage ratio strictly complies with national technical regulations.',
          'Deep bored piles and diaphragm wall engineering audited to international criteria.',
        ],
      },
      zh: {
        title: 'Alizé Residence 建筑工程施工许可证',
        authority: '岘港市建设厅',
        summary: '正式批准建设 39 层豪华海景酒店式公寓及商业综合体工程，含 3 层地下室。',
        keyPoints: [
          '建筑规模：地上 39 层，地下 3 层，建筑高度 145 米。',
          '裙楼及塔楼建筑密度均符合越南国家工程技术规范标准。',
          '大直径超深钻孔灌注桩及国际标准地下连续墙结构。',
        ],
      },
    },
  },
  {
    id: 'legal-2',
    code: 'QĐ-UBND số 3120/QĐ-UBND',
    title: 'Quyết định phê duyệt đồ án quy hoạch chi tiết tỷ lệ 1/500',
    category: 'planning',
    authority: 'Ủy ban Nhân dân TP. Đà Nẵng',
    issueDate: '12/11/2024',
    effectiveDate: '12/11/2024',
    status: 'approved',
    summary: 'Phê duyệt quy hoạch tổng mặt bằng chi tiết 1/500 cho tổ hợp căn hộ condotel mặt biển đường Võ Nguyên Giáp, phường Phước Mỹ.',
    keyPoints: [
      'Chỉ tiêu sử dụng đất, hệ số sử dụng đất và khoảng lùi công trình theo đúng quy hoạch ven biển.',
      'Kết nối đồng bộ hệ thống hạ tầng kỹ thuật đô thị và cảnh quan công viên ven biển Mỹ Khê.',
      'Thiết kế kiến trúc khí động học hạn chế tác động của áp lực gió bão đại dương.',
    ],
    fileSize: '5.8 MB',
    translations: {
      en: {
        title: 'Detailed Master Plan 1/500 Approval Decision',
        authority: 'People’s Committee of Da Nang City',
        summary: 'Approval of 1/500 master plan for the oceanfront condotel project along Vo Nguyen Giap beachfront corridor.',
        keyPoints: [
          'Land use metrics and setback distances fully aligned with beachfront zoning decrees.',
          'Seamless connection with regional technical infrastructure and My Khe beach landscape.',
          'Aerodynamic facade reducing maritime wind pressure and weather impact.',
        ],
      },
      zh: {
        title: '1/500 详细规划方案审批决定书',
        authority: '岘港市人民委员会',
        summary: '批准美溪海滩武元甲路一线海景高端酒店式公寓综合体 1/500 详细规划方案。',
        keyPoints: [
          '土地利用指标、容积率和建筑后退红线完全符合滨海城市规划要求。',
          '与岘港市市政基础设施及美溪海滨公园景观管网无缝接驳。',
          'AEDAS 空气动力学波浪立面设计，有效降低强风与海风荷载。',
        ],
      },
    },
  },
  {
    id: 'legal-3',
    code: 'GCNQSDĐ số CO 894520',
    title: 'Giấy chứng nhận quyền sử dụng đất & quyền sở hữu công trình',
    category: 'land',
    authority: 'Sở Tài nguyên và Môi trường TP. Đà Nẵng',
    issueDate: '24/02/2024',
    effectiveDate: '24/02/2024',
    status: 'certified',
    summary: 'Chứng nhận quyền sử dụng đất cho diện tích 2.867 m² tại ngã ba Võ Nguyên Giáp và Võ Văn Kiệt; đã hoàn thành 100% nghĩa vụ thuế.',
    keyPoints: [
      'Diện tích đất sạch 100%, không tranh chấp, không thế chấp bảo lãnh ngoài dự án.',
      'Đã nộp toàn bộ tiền sử dụng đất và các khoản nghĩa vụ tài chính nhà nước theo thông báo của cơ quan thuế.',
      'Mục đích sử dụng: Đất thương mại dịch vụ xây dựng căn hộ khách sạn và tiện ích nghỉ dưỡng.',
    ],
    fileSize: '2.1 MB',
    translations: {
      en: {
        title: 'Land Use Rights & Property Ownership Certificate',
        authority: 'Da Nang Department of Natural Resources & Environment',
        summary: 'Official land title for the 2,867 sq.m parcel at Vo Nguyen Giap - Vo Van Kiet junction with 100% tax fulfillment.',
        keyPoints: [
          'Clean land parcel, completely unencumbered and without dispute.',
          '100% of land use levies and state financial obligations fully cleared.',
          'Permitted land use: Commercial hospitality, condotels, and wellness amenities.',
        ],
      },
      zh: {
        title: '土地使用权及建筑物产权证书（红皮书）',
        authority: '岘港市自然资源与环境厅',
        summary: '确认位于武元甲路与武文杰路交汇处的 2,867 平方米宗地合法使用权，已足额缴纳 100% 土地出让金。',
        keyPoints: [
          '100% 净地开发，产权清晰，无争议且无任何外部质押。',
          '已按税务机关核准缴清全部土地出让金及相关国家税费。',
          '土地规划用途：商业服务业用地，用于开发豪华酒店式公寓及度假配套。',
        ],
      },
    },
  },
  {
    id: 'legal-4',
    code: 'Số 142/TD-PCCC',
    title: 'Giấy chứng nhận thẩm duyệt thiết kế Phòng cháy và Chữa cháy',
    category: 'safety',
    authority: 'Cục Cảnh sát PCCC và CNCH - Bộ Công an',
    issueDate: '05/01/2025',
    effectiveDate: '05/01/2025',
    status: 'approved',
    summary: 'Thẩm duyệt toàn diện hệ thống phòng cháy chữa cháy chủ động và thụ động theo quy chuẩn QCVN 06:2022/BXD mới nhất.',
    keyPoints: [
      'Hệ thống sprinkler tự động bao phủ 100% diện tích từng căn hộ và khu vực hành lang chung.',
      'Gian lánh nạn an toàn tiêu chuẩn quốc tế bố trí tại tầng kỹ thuật trung gian.',
      'Hệ thống tăng áp buồng thang và hút khói sự cố sử dụng nguồn điện ưu tiên độc lập 2 tầng dự phòng.',
    ],
    fileSize: '4.2 MB',
    translations: {
      en: {
        title: 'Fire Safety & Firefighting Design Approval Certificate',
        authority: 'Department of Fire Safety & Rescue - Ministry of Public Security',
        summary: 'Rigorous inspection and approval of active and passive firefighting systems under national standard QCVN 06:2022/BXD.',
        keyPoints: [
          'Automated quick-response sprinkler coverage throughout every unit and common foyer.',
          'Dedicated international standard refuge floors located at intermediate levels.',
          'Stairwell pressurization and emergency smoke evacuation with dual redundant back-up generators.',
        ],
      },
      zh: {
        title: '消防设计审核批准合格证书',
        authority: '越南公安部消防与救援警察局',
        summary: '依照最新 QCVN 06:2022/BXD 规范严格审查并全票通过的主动与被动式全楼消防体系。',
        keyPoints: [
          '全自动快响喷淋灭火系统覆盖每间公寓内部及各层公共走廊。',
          '在中高层设备转换层设有符合国际标准的封闭式避难层。',
          '楼梯间正压送风及事故排烟系统配备双路独立重载应急柴油发电机。',
        ],
      },
    },
  },
  {
    id: 'legal-5',
    code: 'Số 89/QĐ-STNMT',
    title: 'Quyết định phê duyệt Báo cáo Đánh giá Tác động Môi trường (ĐTM)',
    category: 'safety',
    authority: 'Sở Tài nguyên và Môi trường TP. Đà Nẵng',
    issueDate: '19/08/2024',
    effectiveDate: '19/08/2024',
    status: 'approved',
    summary: 'Chứng nhận phương án xử lý nước thải khép kín chuẩn A, quản lý tiếng ồn và bảo tồn đa dạng sinh thái bờ biển Mỹ Khê.',
    keyPoints: [
      'Hệ thống xử lý nước thải công nghệ MBR vi sinh ngầm đạt quy chuẩn cột A trước khi xả thải.',
      'Kính Low-E 3 lớp hạn chế phản xạ nhiệt vào môi trường và giảm thiểu ô nhiễm ánh sáng.',
      'Cam kết sử dụng vật liệu xanh, năng lượng gió và công nghệ tái tạo nguồn nước tưới cảnh quan.',
    ],
    fileSize: '6.5 MB',
    translations: {
      en: {
        title: 'Environmental Impact Assessment (EIA) Approval',
        authority: 'Da Nang Department of Natural Resources & Environment',
        summary: 'Endorsement of closed-loop Class-A wastewater treatment, acoustic management, and preservation of My Khe coastal ecology.',
        keyPoints: [
          'Subterranean MBR biological wastewater filtration delivering Column-A discharge standard.',
          'Triple-pane Low-E glazing eliminating outward thermal reflection and light pollution.',
          'Integration of sustainable building materials, aerothermal breezes, and recycled irrigation.',
        ],
      },
      zh: {
        title: '环境影响评价报告书（环评）批准批文',
        authority: '岘港市自然资源与环境厅',
        summary: '批准采用 A 级最高排放标准封闭式污水处理工艺，有效保护美溪滨海生态与声环境。',
        keyPoints: [
          '地下生物 MBR 膜处理系统，出水水质达到最高 Column-A 环保标准。',
          '三玻两腔 Low-E 镀膜节能隔热玻璃，杜绝光污染并隔绝室外高温。',
          '全面采用低碳环保建材，融合自然海风对流与雨水回收绿化喷灌。',
        ],
      },
    },
  },
  {
    id: 'legal-6',
    code: 'Mẫu số 01/HĐMB-ALZ',
    title: 'Hợp đồng mua bán / Hợp đồng sở hữu căn hộ khách sạn mẫu',
    category: 'contract',
    authority: 'Cục Cạnh tranh & Bảo vệ Người tiêu dùng - Bộ Công Thương',
    issueDate: '10/06/2025',
    effectiveDate: '10/06/2025',
    status: 'active',
    summary: 'Bộ hợp đồng chuẩn chỉnh minh bạch quyền sở hữu, thời hạn bàn giao, điều kiện vận hành chia sẻ lợi nhuận và nghĩa vụ bảo hành.',
    keyPoints: [
      'Điều khoản rõ ràng về quyền khai thác tự do hoặc tham gia chương trình chia sẻ doanh thu 85/15.',
      'Cam kết bảo hành kết cấu 60 tháng và bảo hành trang thiết bị nội thất 24 tháng chính hãng.',
      'Điều khoản bảo vệ người mua theo đúng quy định Luật Nhà ở và Luật Kinh doanh BĐS mới nhất.',
    ],
    fileSize: '1.8 MB',
    translations: {
      en: {
        title: 'Standard Condotel Purchase & Ownership Agreement Template',
        authority: 'Vietnam Competition & Consumer Protection Authority (Ministry of Industry & Trade)',
        summary: 'Standard contract specifying ownership parameters, delivery timeline, revenue sharing programs, and warranty terms.',
        keyPoints: [
          'Explicit clauses for self-occupancy or participation in 85/15 revenue sharing program.',
          '60-month structural warranty and 24-month manufacturer interior fit-out warranty.',
          'Full consumer protections under the prevailing Law on Real Estate Business and Housing Law.',
        ],
      },
      zh: {
        title: '标准酒店式公寓认购买卖与所有权合同示范文本',
        authority: '越南工贸部竞争与消费者权益保护总局',
        summary: '经政府主管机关备案的标准合同文本，清晰界定产权权属、交付期限、经营收益分配及售后质保。',
        keyPoints: [
          '明文赋予业主自主居住或委托托管参加 85/15 经营收益分成计划的选择权。',
          '主体建筑结构 60 个月超长质保，国际一线精装设备 24 个月原厂质保。',
          '严格契合越南最新《住宅法》及《房地产经营法》对买受人合法权益的全方位保障。',
        ],
      },
    },
  },
  {
    id: 'legal-7',
    code: 'Số 104/SXD-QLCL',
    title: 'Biên bản nghiệm thu hoàn thành thi công phần móng và tường vây',
    category: 'planning',
    authority: 'Sở Xây dựng & Đơn vị Tư vấn Giám sát Quốc tế',
    issueDate: '15/09/2026',
    effectiveDate: '15/09/2026',
    status: 'approved',
    summary: 'Nghiệm thu toàn diện hệ cọc móng khoan nhồi sâu D1200 - D1500 và hệ tường vây bê tông cốt thép ngầm, đủ điều kiện kinh doanh theo luật.',
    keyPoints: [
      'Đạt 100% chỉ số kiểm tra siêu âm cọc khoan nhồi và thí nghiệm nén tĩnh cọc.',
      'Tường vây ngăn nước ngầm tuyệt đối bảo vệ các tầng hầm kỹ thuật.',
      'Cơ sở pháp lý xác nhận dự án đủ điều kiện huy động vốn và ký hợp đồng mua bán.',
    ],
    fileSize: '3.1 MB',
    translations: {
      en: {
        title: 'Foundation & Diaphragm Wall Quality Acceptance Record',
        authority: 'Department of Construction & International Supervision Consultant',
        summary: 'Comprehensive audit of deep bored piles (D1200 - D1500) and subterranean diaphragm walls qualifying for legal sales operations.',
        keyPoints: [
          '100% ultrasonic cross-hole integrity testing and static load load-bearing pass rate.',
          'Hydrostatic water-retaining diaphragm walls protecting underground utilities.',
          'Definitive statutory milestone authorizing official purchase agreements under Vietnamese real estate law.',
        ],
      },
      zh: {
        title: '桩基础与地下连续墙隐蔽工程竣工质量验收合格记录',
        authority: '建设厅工程质量监督站及国际监理团队',
        summary: '对 D1200-D1500 超大口径灌注桩基础及地下三层连续墙完成联合验收，正式具备法定预售签约资格。',
        keyPoints: [
          '钻孔灌注桩超声波透射法无损检测及大吨位静载试验合格率 100%。',
          '止水地下连续墙工程施工精准，杜绝地下海水承压水渗透。',
          '越南国家法律认可的满足预售资金监管并合法签署房屋买卖合同的决定性里程碑。',
        ],
      },
    },
  },
  {
    id: 'legal-8',
    code: 'Số 56/TB-NHBL',
    title: 'Thỏa thuận bảo lãnh tài chính nghĩa vụ bàn giao nhà ở',
    category: 'contract',
    authority: 'Ngân hàng Thương mại Cổ phần Ngoại thương Việt Nam (Vietcombank)',
    issueDate: '28/05/2025',
    effectiveDate: '28/05/2025',
    status: 'certified',
    summary: 'Văn bản bảo lãnh của ngân hàng cấp 1 về nghĩa vụ bàn giao nhà ở hình thành trong tương lai của Chủ đầu tư cho từng khách hàng.',
    keyPoints: [
      'Ngân hàng chịu trách nhiệm hoàn tiền gốc và lãi phạt cho khách hàng nếu Chủ đầu tư chậm bàn giao.',
      'Chương trình hỗ trợ vay vốn lãi suất 0% và ân hạn gốc lên đến 24 tháng cho người mua.',
      'Định giá bảo đảm độc lập minh chứng cho giá trị thương mại vững chắc của Alizé Residence.',
    ],
    fileSize: '2.5 MB',
    translations: {
      en: {
        title: 'Financial Guarantee for Handover Obligations',
        authority: 'Joint Stock Commercial Bank for Foreign Trade of Vietnam (Vietcombank)',
        summary: 'Official tier-1 bank guarantee securing customer purchase investments and construction handover milestones.',
        keyPoints: [
          'Bank guarantee covers refund of principal capital and penal interest if project handover is delayed.',
          'Special loan package offering 0% interest and 24-month principal grace period for purchasers.',
          'Independent asset appraisal confirming the supreme market stability of Alizé Residence.',
        ],
      },
      zh: {
        title: '银行交房履约资金保证保函协议',
        authority: '越南外贸股份商业银行（Vietcombank）',
        summary: '越南顶级国有商业银行为 Alizé 项目出具的未来期房交房履约不可撤销连带责任保证函。',
        keyPoints: [
          '若开发商发生延期交付，担保银行承诺向购房客户全额退还已付本金及法定违约金。',
          '为业主提供前 24 个月 0% 优惠利率及宽限本金还款的专项房贷按揭支持。',
          '专业独立资产评估背书，充分证明 Alizé Residence 资产的高安全性与流动性。',
        ],
      },
    },
  },
];

/**
 * Retrieves localized legal documents.
 * @param locale The target locale string.
 * @returns Localized array of legal documents.
 */
export function getLocalizedLegalDocs(locale: string): LegalDocument[] {
  if (locale === 'vi') {
    return LEGAL_DOCUMENTS;
  }

  return LEGAL_DOCUMENTS.map((doc) => {
    const loc = doc.translations?.[locale];
    if (!loc) {
      return doc;
    }

    return {
      ...doc,
      title: loc.title ?? doc.title,
      authority: loc.authority ?? doc.authority,
      summary: loc.summary ?? doc.summary,
      keyPoints: loc.keyPoints ?? doc.keyPoints,
    };
  });
}
