// 国内电商行业的分类体系：类别、标签词表、平台与生态主体名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉结构抽取模型这一类收什么、
 * 和相邻类别的边界在哪（总的归类原则写在 prompts/structure.md 里）。
 * commentary 标出评论类（实操、观点）：日报写过的事又有评论类的后续报道，只占一行快讯（报道它的信源够多时除外）。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 * tagColor 是飞书推送卡片里跟在标题后面的这一类小标签的颜色（飞书 text_tag 的颜色名）。
 * feedLabel 是分类 RSS 标题里的名字（不写就用 label）。公开接口、RSS 和 MCP 里要把一类并进另一类发布，写在站点设置里（site/site.ts 的 PUBLIC_CATEGORIES）。
 */
export const CATEGORIES = [
  { key: "platform-rules", tagColor: "indigo", label: "新规", feedLabel: "平台新规", section: "平台新规与政策", guide: "电商平台商家规则、佣金/保证金/费率调整、推荐算法与流量机制变动、平台招商/托管政策，以及国家监管、税务、消保合规新政。仅大促常规报名预告不归此类。" },
  { key: "platform-product", tagColor: "turquoise", label: "产品", feedLabel: "电商产品与工具", section: "产品与工具更新", guide: "电商平台商家端/达人端功能更新、广告投放与营销工具迭代，以及电商 SaaS、ERP、CRM、AI 生图/数字人/智能客服/选品工具的正式发布与重大升级。" },
  { key: "industry", tagColor: "orange", label: "行业", feedLabel: "行业与大盘", section: "行业与大盘", guide: "电商平台及头部品牌、服务商、MCN 的财报业绩、大促战报、投融资并购、高层人事、战略合作、供应链与物流布局，以及真实合规处罚或生态事件。" },
  { key: "trend-report", tagColor: "violet", label: "趋势", feedLabel: "品类与趋势", section: "品类与趋势", guide: "基于真实数据或调研的消费品与品类趋势、大盘洞察报告、新消费品牌与产业带白牌突围案例、渠道格局演变分析。" },
  { key: "playbook", tagColor: "green", label: "实操", feedLabel: "运营实操", section: "实操与观点", guide: "品牌方、卖家操盘手或服务商可复用的运营打法、投流策略、直播间排品与承接、内容种草转化、AI 电商提效工作流复盘。重点是可迁移做法；纯工具发布归产品，纯态度预测归观点。", commentary: true },
  { key: "opinion", tagColor: "purple", label: "观点", feedLabel: "行业观点", section: "实操与观点", guide: "电商平台高管、头部卖家、服务商创始人或一线行业研究者的深度判断、趋势预判、战略解读与访谈观点。讨论市场不自动归行业，人物知名不自动归观点。", commentary: true },
] as const satisfies ReadonlyArray<{ key: string; tagColor: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

/**
 * 这个行业最受关注的一类发布（国内电商是平台新规）：日报报头的“N 条平台新规”、改分类后修订已出的报告都按它数。
 * category 是类别，tag 是标签，两者都对上才算；unit 接在数字后面。
 * 没有这样一类的行业设成 null，报头就不显示这个数。
 */
export const RELEASE: { category: string; tag: string; unit: string } | null = { category: "platform-rules", tag: "平台新规", unit: "条平台新规" };

/** 周报月报的总述可以直接写、不必在报道里找到出处的行业通用词（小写）。站名会自动算进去。 */
export const PLAIN_TERMS: readonly string[] = [
  "gmv", "roi", "roas", "ctr", "cvr", "uv", "pv", "sku", "spu",
  "erp", "crm", "saas", "mcn", "kol", "koc", "ugc", "pgc",
  "o2o", "b2b", "b2c", "c2m", "ai", "kpi", "ipo", "ceo", "app", "api",
];

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = [
  "policy_rule",
  "product_tool",
  "industry_event",
  "data_report",
  "playbook_method",
  "opinion_analysis",
  "case_study",
] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "平台新规", "产品/工具", "行业动态", "大促/战报", "品类/消费", "运营/实操",
  "流量/算法", "直播/内容", "AI电商", "政策/合规", "供应链/物流", "行业观点", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "全站推广", "店播/达播", "短视频种草", "私域/复购", "货架电商", "即时零售",
  "白牌/产业带", "品牌出海", "费率/保证金", "售后/仅退款", "电商SaaS", "AI提效",
  "财报/投融资", "MCN/达人", "618/双11",
] as const;

/** 可选的实体标签（重点电商平台与营销系统）。 */
export const ENTITY_TAGS = [
  "淘宝/天猫", "抖音电商", "拼多多", "京东", "小红书电商",
  "微信小店", "快手电商", "美团闪购", "阿里妈妈", "巨量引擎",
] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  平台规则: "平台新规", 规则调整: "平台新规", 规则变更: "平台新规", 新规: "平台新规",
  平台工具: "产品/工具", 工具发布: "产品/工具", 产品更新: "产品/工具", 功能更新: "产品/工具", 工具: "产品/工具",
  商业动态: "行业动态", 公司动态: "行业动态", 合作: "行业动态", 生态: "行业动态",
  大促: "大促/战报", 战报: "大促/战报", 数据报告: "品类/消费", 品类趋势: "品类/消费", 消费趋势: "品类/消费",
  实操: "运营/实操", 玩法: "运营/实操", 运营打法: "运营/实操", 投放技巧: "运营/实操", 指南: "运营/实操",
  流量: "流量/算法", 算法: "流量/算法", 推荐机制: "流量/算法", 搜索权重: "流量/算法",
  直播电商: "直播/内容", 内容电商: "直播/内容", 短视频: "直播/内容", 直播: "直播/内容",
  "AI+电商": "AI电商", "ai电商": "AI电商", 人工智能电商: "AI电商",
  监管: "政策/合规", 政策: "政策/合规", 法规: "政策/合规", 税务合规: "政策/合规", 消保: "政策/合规",
  供应链: "供应链/物流", 物流: "供应链/物流", 快递: "供应链/物流", 仓配: "供应链/物流",
  观点: "行业观点", 访谈: "行业观点", 评论: "行业观点",
  淘宝: "淘宝/天猫", 天猫: "淘宝/天猫", 淘天: "淘宝/天猫", 淘天集团: "淘宝/天猫",
  抖音: "抖音电商", 抖店: "抖音电商",
  小红书: "小红书电商", 薯店: "小红书电商",
  微信: "微信小店", 视频号小店: "微信小店", 视频号: "微信小店",
  快手: "快手电商", 美团: "美团闪购",
  saas: "电商SaaS", SaaS: "电商SaaS", ERP: "电商SaaS",
  仅退款: "售后/仅退款", 售后: "售后/仅退款", 费率: "费率/保证金", 保证金: "费率/保证金", 佣金: "费率/保证金",
  融资: "财报/投融资", 投融资: "财报/投融资", 财报: "财报/投融资", 并购: "财报/投融资",
  MCN: "MCN/达人", 达人: "MCN/达人", 主播: "MCN/达人",
  双11: "618/双11", "618": "618/双11", 双十一: "618/双11",
};

/** 网页前端展示的标签名：把内部斜杠写法换成自然短词，null 表示不对读者展示（存储、接口与后台仍保留原标签）。 */
export const TAG_DISPLAY: Readonly<Record<string, string | null>> = {
  "产品/工具": "产品工具",
  "大促/战报": "大促战报",
  "品类/消费": "品类消费",
  "运营/实操": "运营实操",
  "流量/算法": "流量算法",
  "直播/内容": "直播内容",
  "政策/合规": "政策合规",
  "供应链/物流": "供应链物流",
  "店播/达播": "店播达播",
  "私域/复购": "私域复购",
  "白牌/产业带": "白牌产业带",
  "费率/保证金": "费率保证金",
  "售后/仅退款": "售后规则",
  "财报/投融资": "财报投融资",
  "MCN/达人": "MCN达人",
};

// ── 平台与生态主体 ──────────────────────────────────────────────────────────────────────────

/**
 * 平台与生态主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。
 * aliases 给结构抽取模型看；orgNames 是这家平台/公司发消息时开头用的组织名，
 * 在它自己的主题页上读者知道说的是谁，可以省去；otherNames 是官方账号名、子业务/营销系统名。
 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; orgNames?: string[]; otherNames?: string[] }> = {
  taotian: { name: "淘天（淘宝/天猫）", displayTag: "淘宝/天猫", aliases: ["淘天", "淘宝", "天猫", "Taobao", "Tmall"], orgNames: ["淘天集团", "淘宝", "天猫", "阿里巴巴"], otherNames: ["千牛", "阿里妈妈", "淘宝逛逛", "淘工厂"] },
  douyin: { name: "抖音电商", displayTag: "抖音电商", aliases: ["抖音电商", "抖店", "字节电商"], orgNames: ["抖音电商", "抖音", "字节跳动"], otherNames: ["巨量引擎", "巨量千川", "精选联盟", "抖音生活服务"] },
  pinduoduo: { name: "拼多多", displayTag: "拼多多", aliases: ["拼多多", "PDD", "多多买菜"], orgNames: ["拼多多", "拼多多集团"], otherNames: ["百亿补贴", "多多推广"] },
  jd: { name: "京东", displayTag: "京东", aliases: ["京东", "JD", "京东零售"], orgNames: ["京东", "京东集团", "京东零售"], otherNames: ["京东物流", "京东京准通", "京麦", "京东秒送"] },
  xiaohongshu: { name: "小红书电商", displayTag: "小红书电商", aliases: ["小红书电商", "小红书", "薯店"], orgNames: ["小红书", "小红书电商"], otherNames: ["小红书买手", "蒲公英", "聚光平台"] },
  "wechat-shop": { name: "微信小店 / 视频号", displayTag: "微信小店", aliases: ["微信小店", "视频号小店", "视频号电商", "微信电商"], orgNames: ["微信", "腾讯", "微信小店团队"], otherNames: ["视频号", "微信小店", "腾讯广告"] },
  kuaishou: { name: "快手电商", displayTag: "快手电商", aliases: ["快手电商", "快手小店", "快手"], orgNames: ["快手", "快手电商"], otherNames: ["磁力金牛", "快分销"] },
  meituan: { name: "美团闪购 / 即时零售", displayTag: "美团闪购", aliases: ["美团闪购", "美团", "歪马送酒", "小象超市"], orgNames: ["美团", "美团闪购"], otherNames: ["美团优选", "美团外卖"] },
  "1688": { name: "1688", displayTag: null, aliases: ["1688", "阿里巴巴1688"], orgNames: ["1688"] },
  temu: { name: "Temu", displayTag: null, aliases: ["Temu"], orgNames: ["Temu", "拼多多跨境"] },
  shein: { name: "SHEIN", displayTag: null, aliases: ["SHEIN", "希音"], orgNames: ["SHEIN", "希音"] },
  youzan: { name: "有赞", displayTag: null, aliases: ["有赞", "Youzan"], orgNames: ["有赞"] },
  weimob: { name: "微盟", displayTag: null, aliases: ["微盟", "Weimob"], orgNames: ["微盟"] },
  jushuitan: { name: "聚水潭", displayTag: null, aliases: ["聚水潭", "Jushuitan"], orgNames: ["聚水潭"] },
  cainiao: { name: "菜鸟", displayTag: null, aliases: ["菜鸟", "菜鸟网络", "菜鸟速递"], orgNames: ["菜鸟", "菜鸟集团"] },
  shunfeng: { name: "顺丰", displayTag: null, aliases: ["顺丰", "顺丰速运", "SF"], orgNames: ["顺丰", "顺丰控股"] },
};

/**
 * 身份词典：摘要和标题里出现的平台/公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 行业没有这个问题时可以留空数组。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "taotian", name: "淘天（淘宝/天猫）", patterns: [/淘宝|天猫|淘天|千牛|阿里妈妈|淘工厂|\btaobao\b|\btmall\b/i] },
  { id: "douyin", name: "抖音电商", patterns: [/抖音电商|抖店|巨量千川|巨量引擎|精选联盟|抖音/i] },
  { id: "pinduoduo", name: "拼多多", patterns: [/拼多多|\bpdd\b|多多买菜|多多推广/i] },
  { id: "jd", name: "京东", patterns: [/京东|京麦|京准通|京东秒送|\bjd\.com\b/i] },
  { id: "xiaohongshu", name: "小红书电商", patterns: [/小红书|薯店|蒲公英|聚光平台/i] },
  { id: "wechat-shop", name: "微信小店 / 视频号", patterns: [/微信小店|视频号小店|视频号电商|微信生态|视频号/i] },
  { id: "kuaishou", name: "快手电商", patterns: [/快手电商|快手小店|磁力金牛|快分销|快手/i] },
  { id: "meituan", name: "美团闪购", patterns: [/美团闪购|小象超市|美团优选|美团/i] },
  { id: "1688", name: "1688", patterns: [/\b1688\b/] },
  { id: "temu", name: "Temu", patterns: [/\btemu\b/i] },
  { id: "shein", name: "SHEIN", patterns: [/\bshein\b|希音/i] },
  { id: "youzan", name: "有赞", patterns: [/有赞|\byouzan\b/i] },
  { id: "weimob", name: "微盟", patterns: [/微盟|\bweimob\b/i] },
  { id: "jushuitan", name: "聚水潭", patterns: [/聚水潭/i] },
  { id: "cainiao", name: "菜鸟", patterns: [/菜鸟/i] },
  { id: "shunfeng", name: "顺丰", patterns: [/顺丰|\bsf\s?express\b/i] },
  { id: "tiktok-shop", name: "TikTok Shop", patterns: [/tiktok\s?shop|\btiktok\b/i] },
  { id: "amazon", name: "亚马逊", patterns: [/亚马逊|\bamazon\b/i] },
  { id: "dewu", name: "得物", patterns: [/得物/i] },
  { id: "vipshop", name: "唯品会", patterns: [/唯品会/i] },
  { id: "xianyu", name: "闲鱼", patterns: [/闲鱼/i] },
];

/** 这些域名上的文章，发布方就是对应的公司或平台。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "taotian", domains: ["taobao.com", "tmall.com", "alimama.com", "rule.taobao.com"] },
  { entityId: "douyin", domains: ["jinritemai.com", "oceanengine.com"] },
  { entityId: "pinduoduo", domains: ["pinduoduo.com"] },
  { entityId: "jd", domains: ["jd.com", "jdcloud.com"] },
  { entityId: "xiaohongshu", domains: ["xiaohongshu.com"] },
  { entityId: "kuaishou", domains: ["kuaishou.com"] },
  { entityId: "meituan", domains: ["meituan.com"] },
  { entityId: "youzan", domains: ["youzan.com"] },
  { entityId: "weimob", domains: ["weimob.com"] },
  { entityId: "cainiao", domains: ["cainiao.com"] },
];

/** 原文里的这些写法也算提到了对应平台/公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "taotian", pattern: /淘天集团|阿里电商/i },
  { entityId: "wechat-shop", pattern: /微信小店|腾讯视频号/i },
  { entityId: "douyin", pattern: /抖店服务市场|抖音商城/i },
];
