export type ApartmentData = {
  id: string;
  typology: string;
  completion: string;
  image: string;
  number: string;
  block: string;
  floor: string;
  bedrooms: number;
  area: number;
  terrace?: number;
  garden?: number;
  description?: string;
  benefits?: string[];
  gallery?: string[];
};

export const APARTMENTS_DATA: ApartmentData[] = [
  {
    id: '011',
    typology: 'GROUND_FLOOR_BASEMENT',
    completion: '4Q 2026',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600',
    number: '011',
    block: 'B1',
    floor: '0',
    bedrooms: 3,
    area: 132,
    terrace: 29,
    garden: 41,
    description:
      'Three bedrooms, open-plan living, and a large terrace that connects directly to the communal garden and pool area.',
    benefits: [
      'Pool & gym',
      'Storage',
      'Energy B',
      'Parking',
      'Aerothermal',
      'Stone floors',
      'Villeroy & Boch',
      'Underfloor heating',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: '012',
    typology: 'GROUND_FLOOR_BASEMENT',
    completion: '4Q 2026',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    number: '012',
    block: 'B1',
    floor: '0',
    bedrooms: 3,
    area: 132,
    terrace: 35,
    garden: 20,
    description: 'A beautiful ground floor apartment with a generous private garden.',
    benefits: [
      'Pool & gym',
      'Storage',
      'Energy B',
      'Parking',
      'Aerothermal',
      'Stone floors',
      'Villeroy & Boch',
      'Underfloor heating',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: '031',
    typology: 'FIRST_FLOOR',
    completion: '4Q 2026',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    number: '031',
    block: 'B3',
    floor: '1',
    bedrooms: 2,
    area: 98,
    description: 'Elevated living with beautiful views from the first floor balcony.',
    benefits: [
      'Pool & gym',
      'Storage',
      'Energy B',
      'Parking',
      'Aerothermal',
      'Stone floors',
      'Villeroy & Boch',
      'Underfloor heating',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: '032',
    typology: 'PENTHOUSE',
    completion: '4Q 2026',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600',
    number: '032',
    block: 'B3',
    floor: 'PH',
    bedrooms: 4,
    area: 210,
    terrace: 85,
    description:
      'The ultimate luxury living experience with an expansive wrap-around terrace and panoramic views.',
    benefits: [
      'Pool & gym',
      'Storage',
      'Energy B',
      'Parking',
      'Aerothermal',
      'Stone floors',
      'Villeroy & Boch',
      'Underfloor heating',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: '033',
    typology: 'GROUND_FLOOR_BASEMENT',
    completion: '4Q 2026',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    number: '033',
    block: 'B3',
    floor: '1',
    bedrooms: 3,
    area: 134,
    terrace: 44,
    garden: 21,
    description:
      'Three bedrooms, open-plan living, and a large terrace that connects directly to the communal garden and pool area.',
    benefits: [
      'Pool & gym',
      'Storage',
      'Energy B',
      'Parking',
      'Aerothermal',
      'Stone floors',
      'Villeroy & Boch',
      'Underfloor heating',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    ],
  },
];
