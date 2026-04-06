export interface ChecklistCategory {
  category: string
  items: string[]
}

export interface CleaningChecklist {
  title: string
  description: string
  categories: ChecklistCategory[]
}

export const cleaningChecklists: CleaningChecklist[] = [
  {
    title: 'Regular House Cleaning',
    description: 'What we cover in every regular house clean',
    categories: [
      {
        category: 'Kitchen',
        items: [
          'Clean all accessible surfaces',
          'Clean exterior of all cupboards and drawers',
          'Clean all benches and splashback',
          'Clean stove, hotplates and oven exterior',
          'Sink and taps cleaned and polished',
          'Clean exterior of microwave, dishwasher & fridge/appliances',
          'Vacuum and mop all floors',
          'Empty bins',
        ],
      },
      {
        category: 'Bathrooms & Laundry',
        items: [
          'Clean all accessible surfaces',
          'Clean shower glass & tiles',
          'Clean toilet, bath, sink & tap',
          'Clean all mould and soap residue',
          'Wipe exterior of all cupboards and drawers',
          'Empty bins',
        ],
      },
      {
        category: 'Bedrooms & Living Areas',
        items: [
          'Clean all accessible surfaces',
          'Clean door handles & all switch lights',
          'Clean & polish all mirrors',
          'Clean exterior of all wardrobes, bedside tables, & cupboards',
          'Empty bins',
        ],
      },
    ],
  },
  {
    title: 'End of Lease Cleaning',
    description: 'Comprehensive bond-back cleaning guarantee',
    categories: [
      {
        category: 'All Areas',
        items: [
          'Dusting',
          'Empty Rubbish Bins',
          'Vacuum Carpet',
          'Vacuum and mop all floors',
          'Clean mirrors',
          'Spider Web Removal',
          'Skirting Boards',
          'Detail door panel and frames',
          'Light Fitting',
          'Ceiling fan',
          'Air vents',
          'Clean windows inside',
        ],
      },
      {
        category: 'Bathrooms',
        items: [
          'Window ledges and Furniture in Bathrooms',
          'Clean Benchtops',
          'Wipe Bathroom Cabinets (outside)',
          'Scrub and Clean sinks',
          'Clean mirrors',
          'Scrub and Clean Toilets',
          'Scrub and Clean Bath Tubs',
          'Scrub and Clean Showers',
          'Vacuum and mop Bathroom Floors',
          'Clean Inside Cabinets and Drawers',
        ],
      },
      {
        category: 'Kitchen Areas',
        items: [
          'Clean stove top',
          'Rangehood and extractor fan',
          'Clean Countertops',
          'Kitchen Cabinets (outside and inside)',
          'Scrub and Clean Sinks',
          'Polish all stainless steel surfaces',
          'Dust and Wipe Laundry area',
          'Mop Kitchen and Laundry Floors',
          'Inside oven clean',
        ],
      },
      {
        category: 'Bedrooms & Living Areas',
        items: [
          'Vacuum all Carpets, Rugs and stairs',
          'Vacuum Closet shelves and Drawers',
          'Dust/Wipe doors',
        ],
      },
      {
        category: 'Add-ons',
        items: [
          'Spots on the walls',
          'Clean inside microwave',
          'Inside Fridge Cleaning',
          'Garage',
          'Clean exterior windows',
          'Clean blinds',
        ],
      },
    ],
  },
  {
    title: 'Office Cleaning',
    description: 'Professional commercial cleaning services',
    categories: [
      {
        category: 'Reception Area/Foyer',
        items: [
          'Wood floors dusted/mopped, carpets vacuumed',
          'Clean front entrance glass',
          'Cobwebs removed from baseboards if applicable',
          'Ledges',
        ],
      },
      {
        category: 'Inner Office Areas',
        items: [
          'Empty all trash baskets and replace liners – place trash in designated areas',
          'Spot clean walls and carpets',
          'Vacuum and mop all floors',
          'Clean all office equipment (copiers, fax machines, etc.)',
          'Dust all desks, lamps and lamp shades, chair rungs, well bases, low moldings, sills, and paintwork',
        ],
      },
      {
        category: 'Lunch/Kitchen Areas',
        items: [
          'Countertops cleaned',
          'Sinks cleaned and disinfected, chrome shined',
          'Refrigerator front/visible sides cleaned and shined',
          'Dishwasher wiped out, front cleaned and shined',
          'Microwave wiped inside and out, front cleaned and shined',
          'Floors vacuumed and mopped',
          'Cobwebs removed from baseboards, ceiling',
          'Cabinets (outside) cleaned, polished',
          'Kitchen furniture (tables, chairs, desk) wiped',
          'Doors and frames spot cleaned from fingerprints',
        ],
      },
      {
        category: 'Conference Room',
        items: [
          'Clean & refill (if supplies provided) refreshment station',
          'Dust and polish all tables',
          'Empty all trash baskets and replace liners – place trash in designated areas',
          'Sweep/wet mop all floors',
          'Dust and clean all lamps and shades (if applicable)',
          'Dust all chairs, chair rungs, well bases, low moldings, sills, picture frames',
        ],
      },
      {
        category: 'Warehouse/Production Areas',
        items: [
          'Clean all countertops',
          'Clean lunch/break areas',
          'Clean all restrooms',
          'Vacuum and mop floors (if applicable)',
          'Vacuum all carpeted areas',
          'Empty all trash baskets and replace liners',
        ],
      },
    ],
  },
]
