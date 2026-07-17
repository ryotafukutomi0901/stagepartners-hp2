/**
 * サイト共通データ。
 *
 * 会社情報・許認可番号は仕様書 6.7「会社情報（初期登録値）」の値をそのまま使う。
 * 将来 CMS(site_settings / pages)へ移す前提のため、ここを単一の情報源にしておく。
 */

export const SITE = {
  name: "STAGE PARTNERS",
  legalName: "株式会社STAGE PARTNERS",
  tagline: "挑戦する人が、輝ける場所を。",
} as const;

/** グローバルナビゲーション(仕様書 3.2)。お問い合わせのみ強調ボタンとして別扱いにする。 */
export const NAV_ITEMS = [
  { label: "事業内容", href: "/business" },
  { label: "施工実績", href: "/works" },
  { label: "会社概要", href: "/company" },
  { label: "News", href: "/news" },
] as const;

export const CONTACT_HREF = "/contact";

/** 会社情報サマリー(TOP掲載分)。詳細は /company に置く。 */
export const COMPANY_PROFILE = [
  { label: "会社名", value: "株式会社STAGE PARTNERS" },
  { label: "代表者", value: "代表取締役　依田 雄一" },
  { label: "設立", value: "2026年6月" },
  { label: "資本金", value: "3,500万円" },
  {
    label: "所在地",
    value: "〒410-0055　静岡県沼津市高島本町16-16 高島本町ビル2F",
  },
  {
    label: "事業内容",
    value: "不動産仲介・不動産管理事業／建築事業（リノベーション、ビル改修）",
  },
  {
    label: "許認可",
    value: [
      "宅地建物取引業免許　静岡県知事（1）第14684号",
      "一般建設業登録　静岡県知事許可（般-6）第39891号",
      "一級建築士事務所　静岡県知事登録（2）第7830号",
    ],
  },
] as const;
