export interface ServiceArea {
  city: string
  slug: string
  state: string
  description: string
  suburbs: string[]
}

export const serviceAreas: ServiceArea[] = [
  {
    city: 'Adelaide',
    slug: 'adelaide',
    state: 'SA',
    description:
      'Bright Clean offers professional house cleaning services across Adelaide and surrounding suburbs. From the CBD to the northern suburbs, our trusted cleaners deliver spotless results every time.',
    suburbs: [
      'Adelaide CBD',
      'North Adelaide',
      'Prospect',
      'Norwood',
      'Unley',
      'Glenelg',
      'Burnside',
      'Mitcham',
      'Marion',
      'Tea Tree Gully',
      'Salisbury',
      'Elizabeth',
      'Modbury',
      'Campbelltown',
      'Port Adelaide',
    ],
  },
  {
    city: 'Perth',
    slug: 'perth',
    state: 'WA',
    description:
      'Looking for reliable cleaners in Perth? Bright Clean serves Perth metro and beyond — from Joondalup to Rockingham, Fremantle to Cannington. Book your trusted local cleaner today.',
    suburbs: [
      'Perth CBD',
      'Fremantle',
      'Subiaco',
      'Joondalup',
      'Rockingham',
      'Mandurah',
      'Cannington',
      'Morley',
      'Scarborough',
      'Victoria Park',
      'Canning Vale',
      'Armadale',
    ],
  },
  {
    city: 'Sydney',
    slug: 'sydney',
    state: 'NSW',
    description:
      'Bright Clean provides top-rated cleaning services throughout Sydney. Whether you\'re in the Inner West, Eastern Suburbs, or Western Sydney, our professional cleaners are ready to help.',
    suburbs: [
      'Sydney CBD',
      'Bondi',
      'Parramatta',
      'Chatswood',
      'Manly',
      'Bankstown',
      'Liverpool',
      'Penrith',
      'Hurstville',
      'Blacktown',
      'Ryde',
      'Strathfield',
    ],
  },
  {
    city: 'Melbourne',
    slug: 'melbourne',
    state: 'VIC',
    description:
      'Melbourne\'s trusted cleaning service. From South Yarra to Brunswick, St Kilda to Box Hill — Bright Clean covers all of Melbourne with professional, reliable cleaning you can count on.',
    suburbs: [
      'Melbourne CBD',
      'South Yarra',
      'St Kilda',
      'Richmond',
      'Fitzroy',
      'Carlton',
      'Brunswick',
      'Footscray',
      'Box Hill',
      'Dandenong',
      'Frankston',
      'Glen Waverley',
    ],
  },
]
