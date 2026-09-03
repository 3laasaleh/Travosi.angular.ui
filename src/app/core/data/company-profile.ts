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
  description: { en: string; ar: string };
  socialProfiles: string[];
  paymentAccepted: string[];
  currenciesAccepted: string[];
  logoPath: string;
}

export const COMPANY_PROFILE: CompanyProfile = {
  legalName: 'Sea World Holidays',
  name: 'Sea World Holidays',
  email: 'Info@seaworldholidays.com',
  phone: '+201155011300',
  whatsApp: 'https://wa.me/201155011300',
  address: {
    en: 'Haram, Al Rehab Tower, 7 Mariouteya Road, Al Saad Towers, above Banque Misr, first floor.',
    ar: 'الهرم، برج الرحاب، 7 شارع المريوطية، أبراج السعد، أعلى بنك مصر، الدور الأول.',
    locality: 'Giza',
    region: 'Giza Governorate',
    country: 'EG',
  },
  description: {
    en: 'From tailored holiday packages to flights, hotels, tours, transfers, and visa assistance, we take care of the details so you can travel with confidence.',
    ar: 'من باقات العطلات المخصصة إلى الرحلات الجوية والفنادق والجولات والتنقلات ومساعدة التأشيرات، نهتم بالتفاصيل لتسافر بثقة.',
  },
  socialProfiles: [
    'https://www.facebook.com/seaworldholidays1/',
    'https://www.instagram.com/seaworldholidays1/',
    'https://wa.me/201155011300',
  ],
  paymentAccepted: ['Mastercard', 'Visa', 'PayPal', 'InstaPay', 'Cash'],
  currenciesAccepted: ['EGP', 'USD', 'EUR'],
  logoPath: '/assets/images/main-logo.png',
};
