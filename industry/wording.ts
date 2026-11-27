// 读者看得到的文字里本站不用的词，每项是要找的写法和改法。
// 写作那一步写完中文标题、摘要和推荐理由后逐个查，用了就让模型只改这些地方一次（packages/backend/src/editorial/
// analyze.ts 的 mendWording）。只列一眼就能判断的写法：拿不准的不列，否则会误改正常的词。空着就不查。

export const READER_WORDING: ReadonlyArray<readonly [RegExp, string]> = [
  [/重磅|炸裂|史诗级|颠覆性|弯道超车/u, "不用夸张营销词，直接客观写清楚发生了什么变化"],
  [/闭眼冲|赶紧上车|错过拍大腿|财富密码/u, "不用煽动性或卖课式口吻，改为客观商业陈述"],
];
