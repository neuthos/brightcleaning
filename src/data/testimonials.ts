export interface Testimonial {
  name: string
  location: string
  rating: number // 1-5
  text: string
  service: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    location: 'Adelaide, SA',
    rating: 5,
    text: "Bright Clean has been amazing! They've been cleaning our home fortnightly and it's always spotless. The team is friendly, reliable, and so thorough. Highly recommend!",
    service: 'House Cleaning',
  },
  {
    name: 'James T.',
    location: 'Perth, WA',
    rating: 5,
    text: 'Used Bright Clean for our end of lease clean. Got our full bond back without any issues. They cleaned areas I didn\'t even know existed! Worth every cent.',
    service: 'End of Lease Cleaning',
  },
  {
    name: 'Lisa K.',
    location: 'Sydney, NSW',
    rating: 5,
    text: 'As a working mum of three, having Bright Clean come weekly has been life-changing. I come home to a clean house and can actually enjoy time with my kids.',
    service: 'House Cleaning',
  },
  {
    name: 'David R.',
    location: 'Melbourne, VIC',
    rating: 5,
    text: 'Our office has never looked better. The team is professional, punctual, and does an incredible job. Our staff constantly comment on how clean everything is.',
    service: 'Office Cleaning',
  },
  {
    name: 'Emma W.',
    location: 'Adelaide, SA',
    rating: 5,
    text: "Being an NDIS participant, finding a good cleaning service was stressful. Bright Clean made it so easy — they're patient, understanding, and do a fantastic job.",
    service: 'NDIS Cleaning',
  },
  {
    name: 'Michael P.',
    location: 'Perth, WA',
    rating: 5,
    text: 'Booked a deep clean before a family gathering and WOW. The house looked brand new. Every corner, every surface — absolutely impeccable work.',
    service: 'Deep Cleaning',
  },
]
