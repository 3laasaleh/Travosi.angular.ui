/**
 * Single source of truth for the public company details rendered in the footer.
 * Reused by the SEO service so the structured data always matches what visitors see.
 */
export interface CompanyProfile {
  legalName: string;
  name: string;
  email: string;
  phone: string;
  whatsApp: string;
  address: { en: string; ar: string; locality: string; region: string; country: string };
  offices: CompanyOffice[];
  description: { en: string; ar: string };
  socialProfiles: string[];
  paymentAccepted: string[];
  currenciesAccepted: string[];
  logoPath: string;
}

export interface CompanyOffice {
  name: { en: string; ar: string };
  address: { en: string; ar: string };
  phone: { display: string; href: string };
}

export const COMPANY_PROFILE: CompanyProfile = {
  legalName: 'Sea World Holidays',
  name: 'Sea World Holidays',
  email: 'Info@seaworldholidays.com',
  phone: '+971505065924 - +201070044338',
  whatsApp: 'https://wa.me/201155011300',
  address: {
    en: '6 Mohamed Meqlaad, Nasr City - Cairo',
    ar: `مصر: مبنى 7 الرحاب - المريوطية، الهرم - الجيزة
        6 شارع محمد مقلاد - مدينة نصر، القاهرة
الإمارات: مكتب 1208، برج "دونا" (Donna Tower) - واحة دبي للسيليكون، دبي، الإمارات العربية المتحدة`,
    locality: 'Giza',
    region: 'Giza Governorate',
    country: 'EG',
  },
  offices: [
    {
      name: { en: 'Cairo office', ar: 'مكتب القاهرة' },
      address: { en: '6 Mohamed Meqlaad, Nasr City - Cairo', ar: '6 شارع محمد مقلاد، مدينة نصر - القاهرة' },
      phone: { display: '+201 07 004 4338', href: '+201070044338' },
    },
    {
      name: { en: 'Giza office', ar: 'مكتب الجيزة' },
      address: { en: '7 Elrehab Building - Mariotia Haram - Giza', ar: '7 مبنى الرحاب - المريوطية، الهرم - الجيزة' },
      phone: { display: '+201 07 004 4338', href: '+201070044338' },
    },
    {
      name: { en: 'Dubai office', ar: 'مكتب دبي' },
      address: { en: 'Office 1208, Donna Tower / Donna Towers, Dubai Silicon Oasis, Dubai, UAE', ar: 'مكتب 1208، برج دونا / أبراج دونا، واحة دبي للسيليكون، دبي، الإمارات العربية المتحدة' },
      phone: { display: '+971 50 506 5924', href: '+971505065924' },
    },
  ],
  description: {
    en: 'From tailored holiday packages to flights, hotels, tours, transfers, and visa assistance, we take care of the details so you can travel with confidence.',
    ar: 'من باقات العطلات المخصصة إلى الرحلات الجوية والفنادق والجولات والتنقلات ومساعدة التأشيرات، نهتم بالتفاصيل لتسافر بثقة.',
  },
  socialProfiles: [
    'https://www.facebook.com/seaworldholidayseg',
    'https://www.instagram.com/seaworldholidays9/',
    'https://www.tiktok.com/@seaworldholidays1',
    'https://www.linkedin.com/company/sea-world-holidays/',
    'https://x.com/seaworldholidays1',
    'https://wa.me/201155011300',
  ],
  paymentAccepted: ['Mastercard', 'Visa', 'PayPal', 'InstaPay', 'Tabby', 'Tamara', 'valU installments', 'Cash'],
  currenciesAccepted: ['EGP', 'USD', 'EUR'],
  logoPath: '/assets/images/main-logo.png',
};
