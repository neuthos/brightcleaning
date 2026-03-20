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
          'Wipe down all benchtops & splashbacks',
          'Clean stovetop & rangehood exterior',
          'Clean microwave inside & out',
          'Wipe cabinet fronts & handles',
          'Clean sink & polish taps',
          'Empty bins & replace liners',
          'Sweep & mop floors',
        ],
      },
      {
        category: 'Bathroom',
        items: [
          'Scrub & disinfect toilet',
          'Clean shower/bath & glass screens',
          'Wipe vanity, mirror & sink',
          'Clean taps & fixtures',
          'Mop floors',
          'Replenish towels (if provided)',
        ],
      },
      {
        category: 'Living Areas & Bedrooms',
        items: [
          'Dust all surfaces & furniture',
          'Vacuum carpets & rugs',
          'Mop hard floors',
          'Make beds & arrange pillows',
          'Dust skirting boards & light switches',
          'Empty bins',
        ],
      },
    ],
  },
  {
    title: 'Office Cleaning',
    description: 'Our standard office cleaning checklist',
    categories: [
      {
        category: 'Workstations',
        items: [
          'Wipe desks & monitors',
          'Sanitise keyboards & mice',
          'Empty desk bins',
          'Organise common areas',
        ],
      },
      {
        category: 'Common Areas',
        items: [
          'Vacuum all carpeted areas',
          'Mop hard floors',
          'Clean kitchen/breakroom',
          'Restock paper towels & soap',
          'Disinfect door handles & switches',
        ],
      },
      {
        category: 'Restrooms',
        items: [
          'Deep clean all toilets & urinals',
          'Clean sinks & mirrors',
          'Restock consumables',
          'Mop & disinfect floors',
          'Empty sanitary bins',
        ],
      },
    ],
  },
]
