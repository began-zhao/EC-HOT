// 英文版用的行业词：类别、标签、主题和公司的英文名。键是 taxonomy.ts、topics.json 里的中文写法或 key；
// 换行业时和它们一起改。即使当前站点只开中文版，contracts/taxonomy.ts 与测试也会校验这里的完整映射。
import type { CATEGORIES } from "./taxonomy.ts";

type CategoryKey = (typeof CATEGORIES)[number]["key"];

/** 类别：筛选标签、分类 RSS 标题、日报栏目。 */
export const CATEGORY_EN: Record<CategoryKey, { label: string; feedLabel: string; section: string }> = {
  "platform-rules": { label: "Rules", feedLabel: "Platform Rules", section: "Platform rules & policy" },
  "platform-product": { label: "Products", feedLabel: "E-Commerce Tools", section: "Product & tool updates" },
  industry: { label: "Industry", feedLabel: "Industry & Market", section: "Industry & market" },
  "trend-report": { label: "Trends", feedLabel: "Category & Trends", section: "Categories & trends" },
  playbook: { label: "Playbooks", feedLabel: "Operations Playbooks", section: "Playbooks & opinion" },
  opinion: { label: "Opinion", feedLabel: "Industry Opinion", section: "Playbooks & opinion" },
};

/** 标签（含 TAG_DISPLAY 里给读者看的短词）。 */
export const TAG_EN: Record<string, string> = {
  平台新规: "Platform rules",
  "产品/工具": "Products & tools",
  产品工具: "Products & tools",
  行业动态: "Industry news",
  "大促/战报": "Promotions & results",
  大促战报: "Promotions & results",
  "品类/消费": "Categories & consumption",
  品类消费: "Categories & consumption",
  "运营/实操": "Operations playbooks",
  运营实操: "Operations playbooks",
  "流量/算法": "Traffic & algorithms",
  流量算法: "Traffic & algorithms",
  "直播/内容": "Livestream & content",
  直播内容: "Livestream & content",
  "AI电商": "AI in e-commerce",
  "政策/合规": "Policy & compliance",
  政策合规: "Policy & compliance",
  "供应链/物流": "Supply chain & logistics",
  供应链物流: "Supply chain & logistics",
  行业观点: "Opinion",
  其他: "Other",
  全站推广: "Site-wide promotion",
  "店播/达播": "Brand & creator livestreams",
  店播达播: "Brand & creator livestreams",
  短视频种草: "Short-video seeding",
  "私域/复购": "Private domain & retention",
  私域复购: "Private domain & retention",
  货架电商: "Shelf e-commerce",
  即时零售: "Instant retail",
  "白牌/产业带": "White-label & industrial belts",
  白牌产业带: "White-label & industrial belts",
  品牌出海: "Global expansion",
  "费率/保证金": "Fees & deposits",
  费率保证金: "Fees & deposits",
  "售后/仅退款": "After-sales & refunds",
  售后规则: "After-sales & refunds",
  "电商SaaS": "E-commerce SaaS",
  "AI提效": "AI efficiency",
  "财报/投融资": "Earnings & funding",
  财报投融资: "Earnings & funding",
  "MCN/达人": "MCN & creators",
  "MCN达人": "MCN & creators",
  "618/双11": "618 & Double 11",
};

/** 主题（topics.json 的 slug）：名字和一句话介绍。 */
export const TOPIC_EN: Record<string, { name: string; definition: string }> = {
  taotian: { name: "Taobao & Tmall", definition: "Platform rules, traffic allocation, AI tools and merchant policies on Taobao, Tmall and Alimama." },
  douyin: { name: "Douyin E-Commerce", definition: "Douyin shelf and content commerce rules, Ocean Engine ads, creator distribution and merchant policies." },
  pinduoduo: { name: "Pinduoduo", definition: "Pinduoduo merchant policies, subsidies, fee and refund adjustments, and financial updates." },
  jd: { name: "JD.com", definition: "JD retail and third-party marketplace ecosystem, ad tools, subsidies and instant retail moves." },
  xiaohongshu: { name: "Xiaohongshu E-Commerce", definition: "Xiaohongshu buyer livestreams, note commerce, store policies and seeding ad updates." },
  "wechat-shop": { name: "WeChat Shop / Channels", definition: "WeChat Shop ecosystem rules, social gifting, Channels commerce and private-domain conversion." },
  kuaishou: { name: "Kuaishou E-Commerce", definition: "Kuaishou shelf commerce, creator distribution, ad bidding and industrial belt policies." },
  meituan: { name: "Meituan Instashopping", definition: "Meituan Instashopping, dark stores and local instant-retail fulfillment updates." },
  "1688": { name: "1688", definition: "1688 industrial-belt sourcing, dropshipping and supply-matching rule changes." },
  youzan: { name: "Youzan", definition: "Youzan private-domain SaaS, store digitization and AI shopping tools." },
  weimob: { name: "Weimob", definition: "Weimob retail SaaS, WeChat ecosystem marketing services and AI tools." },
  jushuitan: { name: "Jushuitan", definition: "Jushuitan e-commerce ERP, multi-platform order fulfillment and supply chain tools." },
  cainiao: { name: "Cainiao", definition: "Cainiao warehousing, peak-season delivery guarantees and merchant logistics updates." },
  shunfeng: { name: "SF Express", definition: "SF Express e-commerce shipping, cold chain, intra-city delivery and supply chain solutions." },
  temu: { name: "Temu", definition: "Temu semi-managed and full-managed rules impacting domestic factory suppliers." },
  shein: { name: "SHEIN", definition: "SHEIN marketplace onboarding and flexible domestic supply-chain cooperation." },
  "sitewide-ads": { name: "Site-wide Ads", definition: "Site-wide promotion, organic-paid synergy, ROI bidding and ad rule changes." },
  livestream: { name: "Livestream Commerce", definition: "Brand self-broadcasts, influencer livestreams, compliance and MCN partnership models." },
  seeding: { name: "Content Seeding", definition: "Short-video and note seeding conversion and cross-platform attribution." },
  "private-domain": { name: "Private Domain", definition: "WeCom, loyalty programs, mini-programs and repeat-purchase operations." },
  "instant-retail": { name: "Instant Retail", definition: "Dark stores, hourly delivery and local store fulfillment opportunities." },
  "factory-brands": { name: "Industrial Belts", definition: "Source factories, white-label brands and flexible supply-chain shifts." },
  "fees-deposits": { name: "Fees & Deposits", definition: "Platform service fees, take rates, deposits and merchant fee rebates." },
  "after-sales": { name: "After-sales & Refunds", definition: "Refund-only policy shifts, shipping insurance, store ratings and merchant appeals." },
  "ecommerce-saas": { name: "E-Commerce SaaS", definition: "Updates across ERP, CRM, customer service, analytics and agency partners." },
  "ai-ecommerce": { name: "AI in E-Commerce", definition: "AI product photography, digital-human livestreams, smart support and ad optimization." },
  "mcn-creators": { name: "MCN & Creators", definition: "Top creators, MCN shifts, commission structures and KOC collaboration trends." },
  festivals: { name: "618 & Double 11", definition: "Major shopping festival schedules, rule shifts and post-event data recaps." },
  "platform-rules": { name: "Platform Rules", definition: "Official merchant rules, algorithms and transaction policy updates." },
  "product-tools": { name: "Products & Tools", definition: "Platform merchant tools, ad systems and third-party SaaS/AI releases." },
  "policy-compliance": { name: "Policy & Compliance", definition: "E-commerce taxation, market regulation, consumer protection and ad compliance." },
  "category-trends": { name: "Category Trends", definition: "High-growth consumer categories, channel shifts and industry research reports." },
  playbooks: { name: "Playbooks", definition: "Reusable merchandising, paid traffic, livestream and AI workflow lessons." },
  opinions: { name: "Opinion", definition: "Insights from platform executives, top operators, SaaS founders and researchers." },
  "industry-news": { name: "Industry & Earnings", definition: "Quarterly earnings, GMV results, M&A and competitive landscape shifts." },
  "supply-chain": { name: "Supply Chain & Logistics", definition: "Parcel rates, cloud warehousing, returns handling and supply-chain efficiency." },
};

/** 主题分组（topics.json 的 groups）。 */
export const TOPIC_GROUP_EN: Record<string, { name: string; blurb: string }> = {
  company: { name: "Platforms & Ecosystem", blurb: "Track major e-commerce platforms, SaaS providers and logistics networks" },
  field: { name: "Key Topics", blurb: "Go deep by operating lever: site-wide ads, livestreams, SaaS & AI…" },
  genre: { name: "Content Types", blurb: "Browse by format: platform rules, tools, festival results, playbooks…" },
};

/** 日报报头“N 条平台新规”。 */
export const RELEASE_UNIT_EN = { one: "platform rule", many: "platform rules" };
