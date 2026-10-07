export type AboutUsLanguage = 'en' | 'ar';
export type AboutUsText = Record<string, string>;

export interface AboutUsContent {
  en: AboutUsText;
  ar: AboutUsText;
}

export interface AboutUsField {
  key: string;
  labelEn: string;
  labelAr: string;
  multiline?: boolean;
}

export interface AboutUsSection {
  titleEn: string;
  titleAr: string;
  fields: AboutUsField[];
}

const field = (key: string, labelEn: string, labelAr: string, multiline = false): AboutUsField =>
  ({ key, labelEn, labelAr, multiline });

const listFields = (prefix: string, count: number): AboutUsField[] =>
  Array.from({ length: count }, (_, index) => field(`${prefix}.${index}`, `Item ${index + 1}`, `العنصر ${index + 1}`, true));

/** The keys are also paths in the existing EN/AR translation files, which provide initial values. */
export const ABOUT_US_SECTIONS: readonly AboutUsSection[] = [
  { titleEn: 'Page banner', titleAr: 'لافتة الصفحة', fields: [
    field('aboutseaworld.eyebrow', 'Small heading', 'العنوان الصغير'),
    field('aboutseaworld.pageTitle', 'Page title', 'عنوان الصفحة'),
    field('aboutseaworld.tagline', 'Tagline', 'الوصف المختصر', true),

  ] },
  { titleEn: 'Introduction', titleAr: 'المقدمة', fields: [
    field('aboutseaworld.introduction.eyebrow', 'Small heading', 'العنوان الصغير'),
    field('aboutseaworld.introduction.title', 'Title', 'العنوان'),
    field('aboutseaworld.introduction.paragraphOne', 'First paragraph', 'الفقرة الأولى', true),
    field('aboutseaworld.introduction.paragraphTwo', 'Second paragraph', 'الفقرة الثانية', true),
  ] },
  { titleEn: 'Mission and vision', titleAr: 'الرسالة والرؤية', fields: [
    field('aboutseaworld.mission.title', 'Mission title', 'عنوان الرسالة'),
    field('aboutseaworld.mission.description', 'Mission description', 'وصف الرسالة', true),
    field('aboutseaworld.vision.title', 'Vision title', 'عنوان الرؤية'),
    field('aboutseaworld.vision.description', 'Vision description', 'وصف الرؤية', true),
  ] },
  { titleEn: 'What we offer', titleAr: 'ما نقدمه', fields: [
    field('aboutseaworld.offer.title', 'Title', 'العنوان'),
    ...listFields('aboutseaworld.offer.items', 10),
  ] },
  { titleEn: 'Why choose us', titleAr: 'لماذا تختارنا', fields: [
    field('aboutseaworld.whyChooseUs.title', 'Title', 'العنوان'),
    ...listFields('aboutseaworld.whyChooseUs.items', 6),
  ] },
  { titleEn: 'Commitment and closing', titleAr: 'الالتزام والخاتمة', fields: [
    field('aboutseaworld.commitment.title', 'Commitment title', 'عنوان الالتزام'),
    field('aboutseaworld.commitment.description', 'Commitment description', 'وصف الالتزام', true),
    field('aboutseaworld.closing', 'Closing paragraph', 'الفقرة الختامية', true),
  ] },
  { titleEn: 'Travel agency section', titleAr: 'قسم الشركة', fields: [
    field('aboutseaworldHolidays', 'Small heading', 'العنوان الصغير'),
    field('trustedTravelPartnerTitle', 'Title', 'العنوان'),
    field('trustedTravelPartnerDescription', 'Description', 'الوصف', true),
    field('learnMoreAboutUs', 'Link label', 'اسم الرابط'),
    field('visitors', 'Visitors label', 'تسمية الزوار'),
    field('travelPackages', 'Packages label', 'تسمية الباقات'),
  ] },
  { titleEn: 'Travel promise section', titleAr: 'قسم وعد السفر', fields: [
    field('ourTravelPromise', 'Small heading', 'العنوان الصغير'),
    field('whyTravelersChooseUs', 'Title', 'العنوان'),
    field('whyTravelersChooseUsDescription', 'Description', 'الوصف', true),
    field('personalizedTravelPlanning', 'First card title', 'عنوان البطاقة الأولى'),
    field('personalizedTravelPlanningDescription', 'First card description', 'وصف البطاقة الأولى', true),
    field('supportThroughoutJourney', 'Second card title', 'عنوان البطاقة الثانية'),
    field('supportThroughoutJourneyDescription', 'Second card description', 'وصف البطاقة الثانية', true),
    field('trustedTravelArrangements', 'Third card title', 'عنوان البطاقة الثالثة'),
    field('trustedTravelArrangementsDescription', 'Third card description', 'وصف البطاقة الثالثة', true),
  ] },
  { titleEn: 'Team section', titleAr: 'قسم الفريق', fields: [
    field('aboutseaworld.team.title', 'Title', 'العنوان'),
    field('aboutseaworld.team.agentPosition', 'Agent position', 'المسمى الوظيفي'),
    field('aboutseaworld.team.empty', 'Empty message', 'رسالة عدم وجود أعضاء', true),
  ] },
];

export const ABOUT_US_FIELDS = ABOUT_US_SECTIONS.flatMap(section => section.fields);

export function readAboutUsDefault(translation: object, key: string): string {
  const value = key.split('.').reduce<unknown>((current, part) =>
    current && typeof current === 'object' ? (current as Record<string, unknown>)[part] : undefined,
  translation);
  return typeof value === 'string' ? value : '';
}

export function selectAboutUsText(value: unknown): AboutUsText {
  if (!value || typeof value !== 'object') return {};
  const source = value as Record<string, unknown>;
  return Object.fromEntries(ABOUT_US_FIELDS.flatMap(({ key }) =>
    typeof source[key] === 'string' && String(source[key]).trim() ? [[key, String(source[key])]] : [],
  ));
}
