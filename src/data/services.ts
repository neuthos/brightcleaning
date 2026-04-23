import type { ReactNode } from 'react'

export interface Service {
  id: string
  title: string
  description: string
  icon: ReactNode
  features: string[]
}

// Icons are applied in the Services component to keep data serializable-friendly
// This file just stores the icon key, actual Lucide icon is mapped in the component
export type ServiceIconKey = 'home' | 'key' | 'building' | 'accessibility' | 'sparkles' | 'flame'

export interface ServiceData {
  id: string
  title: string
  description: string
  iconKey: ServiceIconKey
  features: string[]
}

export const services: ServiceData[] = [
  {
    id: 'house-cleaning',
    title: 'House Cleaning',
    description:
      'Regular house cleaning tailored to your needs. Our trusted cleaners leave your home spotless every time.',
    iconKey: 'home',
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
    iconKey: 'key',
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
    iconKey: 'building',
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
      'We are offering professional cleaning support for NDIS participants with compassionate and reliable service.',
    iconKey: 'accessibility',
    features: [
      'NDIS specialist support',
      'Flexible scheduling',
      'Personalised cleaning plans',
      'Trained & background-checked staff',
    ],
  },
  {
    id: 'deep-cleaning',
    title: 'Spring Cleaning',
    description:
      'Intensive deep cleaning for homes that need extra attention. Perfect for spring cleaning or move-in preparation.',
    iconKey: 'sparkles',
    features: [
      'Behind & under furniture',
      'Inside cabinets & wardrobes',
      'Grout & tile scrubbing',
      'Appliance deep clean',
    ],
  },
  {
    id: 'oven-cleaning',
    title: 'Oven Cleaning',
    description:
      'Professional deep cleaning for ovens and kitchen appliances, removing grease and buildup for a sparkling finish.',
    iconKey: 'flame',
    features: [
      'Deep grease removal',
      'Rack and tray cleaning',
      'Door glass polishing',
      'Professional products used',
    ],
  },
]
