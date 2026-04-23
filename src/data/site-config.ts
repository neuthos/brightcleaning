export const siteConfig = {
  name: 'Bright Clean',
  tagline: 'Excellent Cleaning Service at Your Home',
  domain: 'bright-clean.au',
  phone: '0426 946 776',
  phoneRaw: '0426946776',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'brightclean.2021@gmail.com',
  whatsappNumber: '61426946776',
  messengerUsername: '',
  abn: '', // To be filled
  hours: {
    weekdays: '8:00 AM – 6:00 PM',
    saturday: '8:00 AM – 4:00 PM',
    sunday: 'Closed',
  },
  social: {
    facebook: 'https://www.facebook.com/BrightCleanOZ',
    instagram: '',
    google: '',
  },
  address: {
    street: '',
    city: 'Adelaide',
    state: 'SA',
    postcode: '',
    country: 'Australia',
  },
} satisfies Record<string, unknown>

export type SiteConfig = typeof siteConfig
