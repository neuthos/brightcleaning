export interface Service {
  id: string
  title: string
  description: string
  icon: string // emoji for now, replace with SVG later
  features: string[]
}

export const services: Service[] = [
  {
    id: 'house-cleaning',
    title: 'House Cleaning',
    description:
      'Regular house cleaning tailored to your needs. Our trusted cleaners leave your home spotless every time.',
    icon: '🏠',
    features: [
      'Kitchen & bathroom deep clean',
      'Vacuuming & mopping all floors',
      'Dusting all surfaces & furniture',
      'Bed making & linen change',
    ],
  },
  {
    id: 'end-of-lease',
    title: 'End of Lease Cleaning',
    description:
      'Get your full bond back with our comprehensive end-of-lease cleaning. We guarantee satisfaction or we come back for free.',
    icon: '🔑',
    features: [
      'Bond-back guarantee',
      'Full property deep clean',
      'Oven & rangehood cleaning',
      'Window tracks & blinds',
    ],
  },
  {
    id: 'office-cleaning',
    title: 'Office & Commercial Cleaning',
    description:
      'Professional office cleaning services to keep your workspace hygienic, productive and welcoming for staff and clients.',
    icon: '🏢',
    features: [
      'Daily or weekly schedules',
      'Desk & workstation sanitisation',
      'Kitchen & breakroom cleaning',
      'Restroom deep cleaning',
    ],
  },
  {
    id: 'ndis-cleaning',
    title: 'NDIS Cleaning',
    description:
      'Registered NDIS cleaning provider. We support participants with professional, compassionate home cleaning services.',
    icon: '♿',
    features: [
      'NDIS registered provider',
      'Flexible scheduling',
      'Personalised cleaning plans',
      'Trained & background-checked staff',
    ],
  },
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    description:
      'Intensive deep cleaning for homes that need extra attention. Perfect for spring cleaning or move-in preparation.',
    icon: '✨',
    features: [
      'Behind & under furniture',
      'Inside cabinets & wardrobes',
      'Grout & tile scrubbing',
      'Appliance deep clean',
    ],
  },
  {
    id: 'carpet-cleaning',
    title: 'Carpet & Upholstery Cleaning',
    description:
      'Professional carpet steam cleaning and upholstery care. Remove stains, allergens, and odours for a fresh home.',
    icon: '🧹',
    features: [
      'Hot water extraction',
      'Stain & odour removal',
      'Upholstery cleaning',
      'Quick drying times',
    ],
  },
]
