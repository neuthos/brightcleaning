export const siteConfig = {
  name: 'Bright Clean',
  tagline: 'Excellent Cleaning Service at Your Home',
  domain: 'bright-clean.au',
  phone: '0428 948 776',
  phoneRaw: '0428948776',
  email: 'brightclean.2020@gmail.com',
  whatsappNumber: '61428948776',
  messengerUsername: 'BrightCleanOZ',
  abn: '', // To be filled
  hours: {
    weekdays: '7:00 AM – 6:00 PM',
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
} as const

export type SiteConfig = typeof siteConfig
