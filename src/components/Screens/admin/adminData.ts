export type AdminProduct = {
  id: string
  name: string
  sku: string
  category: string
  price: number
  promotionalPrice?: number
  stock: number
  lowStockThreshold?: number
  sold: number
  description?: string
  rating?: number
  ingredients?: string
  usageInstructions?: string
  updatedAt?: string
  images?: string[]
}

export type AdminCategory = {
  id: string
  name: string
  productCount: number
  description?: string
}

export type AdminOrder = {
  id: string
  customer: string
  date: string
  dateISO: string
  amount: number
  status: 'Nouvelle' | 'En préparation' | 'En livraison' | 'Livrée' | 'Annulée'
  items: { productId: string; quantity: number }[]
  phone?: string
  address?: string
  paymentMethod?: string
  trackingNumber?: string
}

export const demoProducts: AdminProduct[] = [
  {
    id: 'P-001',
    name: 'Sérum éclat à la vitamine C',
    sku: 'HOZ-SER-001',
    category: 'Soins du visage',
    price: 12500,
    stock: 24,
    sold: 86,
    description:
      'Un sérum léger à la vitamine C pour compléter votre routine et apporter une touche d’éclat à votre peau.',
    rating: 4.8,
    ingredients: 'Vitamine C, aloe vera, glycérine végétale',
    usageInstructions:
      'Appliquer quelques gouttes sur peau propre avant votre soin hydratant.',
    updatedAt: '2026-10-12',
  },
  {
    id: 'P-002',
    name: 'Crème hydratante karité',
    sku: 'HOZ-CRE-002',
    category: 'Soins du visage',
    price: 9800,
    stock: 7,
    sold: 64,
    description:
      'Une crème confortable au beurre de karité pour nourrir et hydrater la peau au quotidien.',
    rating: 4.7,
    ingredients: 'Beurre de karité, huile d’amande douce, vitamine E',
    usageInstructions:
      'Appliquer matin et soir sur le visage et le cou propres.',
    updatedAt: '2026-10-10',
  },
  {
    id: 'P-003',
    name: 'Huile douce corps & cheveux',
    sku: 'HOZ-HUI-003',
    category: 'Soins du corps',
    price: 8500,
    stock: 31,
    sold: 52,
    description:
      'Une huile polyvalente pour nourrir la peau et les longueurs avec une texture douce.',
    rating: 4.6,
    ingredients: 'Huile de baobab, huile de coco, vitamine E',
    usageInstructions:
      'Masser une petite quantité sur la peau ou les pointes des cheveux.',
    updatedAt: '2026-10-08',
  },
  {
    id: 'P-004',
    name: 'Masque purifiant à l’argile',
    sku: 'HOZ-MAS-004',
    category: 'Soins du visage',
    price: 7200,
    stock: 4,
    sold: 41,
    description:
      'Un masque à l’argile pour une routine purifiante hebdomadaire.',
    rating: 4.5,
    ingredients: 'Argile, aloe vera, eau florale',
    usageInstructions:
      'Appliquer en couche fine, laisser poser 10 minutes puis rincer.',
    updatedAt: '2026-10-04',
  },
  {
    id: 'P-005',
    name: 'Baume lèvres nourrissant',
    sku: 'HOZ-BAU-005',
    category: 'Maquillage',
    price: 3500,
    stock: 48,
    sold: 37,
    description:
      'Un baume nourrissant pour prendre soin des lèvres au quotidien.',
    rating: 4.4,
    ingredients: 'Beurre de karité, cire végétale, huile de ricin',
    usageInstructions: 'Appliquer sur les lèvres aussi souvent que nécessaire.',
    updatedAt: '2026-10-01',
  },
]

export const demoCategories: AdminCategory[] = [
  { id: 'CAT-01', name: 'Soins du visage', productCount: 12 },
  { id: 'CAT-02', name: 'Soins du corps', productCount: 8 },
  { id: 'CAT-03', name: 'Maquillage', productCount: 9 },
  { id: 'CAT-04', name: 'Cheveux', productCount: 6 },
  { id: 'CAT-05', name: 'Coffrets beauté', productCount: 4 },
]

export const demoOrders: AdminOrder[] = [
  {
    id: '#HZ-1087',
    customer: 'Ndeye Mbaye',
    date: '27 oct. 2026',
    dateISO: '2026-10-27',
    amount: 22000,
    status: 'Nouvelle',
    items: [
      { productId: 'P-001', quantity: 1 },
      { productId: 'P-002', quantity: 1 },
    ],
    phone: '+221 77 234 56 70',
    address: 'Liberté 6, Dakar',
    paymentMethod: 'Wave',
  },
  {
    id: '#HZ-1086',
    customer: 'Aminata Diop',
    date: '27 oct. 2026',
    dateISO: '2026-10-27',
    amount: 26500,
    status: 'En préparation',
    phone: '+221 77 123 45 67',
    address: 'Plateau, Dakar',
    paymentMethod: 'Wave',
    items: [
      { productId: 'P-001', quantity: 1 },
      { productId: 'P-003', quantity: 1 },
      { productId: 'P-005', quantity: 1 },
    ],
  },
  {
    id: '#HZ-1085',
    customer: 'Fatou Ndiaye',
    date: '27 oct. 2026',
    dateISO: '2026-10-27',
    amount: 18300,
    status: 'En livraison',
    phone: '+221 76 234 56 78',
    address: 'Almadies, Dakar',
    paymentMethod: 'Orange Money',
    trackingNumber: 'HZ-TR-1085',
    items: [
      { productId: 'P-002', quantity: 1 },
      { productId: 'P-005', quantity: 2 },
    ],
  },
  {
    id: '#HZ-1084',
    customer: 'Mariam Fall',
    date: '26 oct. 2026',
    dateISO: '2026-10-26',
    amount: 35000,
    status: 'Livrée',
    phone: '+221 70 345 67 89',
    address: 'Mermoz, Dakar',
    paymentMethod: 'Paiement à la livraison',
    items: [
      { productId: 'P-001', quantity: 2 },
      { productId: 'P-004', quantity: 1 },
    ],
  },
  {
    id: '#HZ-1083',
    customer: 'Adama Ba',
    date: '26 oct. 2026',
    dateISO: '2026-10-26',
    amount: 12500,
    status: 'Livrée',
    phone: '+221 77 456 78 90',
    address: 'Thiès, Sénégal',
    paymentMethod: 'Wave',
    items: [{ productId: 'P-001', quantity: 1 }],
  },
  {
    id: '#HZ-1082',
    customer: 'Aïssatou Sow',
    date: '25 oct. 2026',
    dateISO: '2026-10-25',
    amount: 22700,
    status: 'En préparation',
    phone: '+221 76 567 89 01',
    address: 'Ouakam, Dakar',
    paymentMethod: 'Orange Money',
    items: [
      { productId: 'P-002', quantity: 1 },
      { productId: 'P-003', quantity: 1 },
      { productId: 'P-005', quantity: 1 },
    ],
  },
  {
    id: '#HZ-1081',
    customer: 'Khady Gueye',
    date: '20 oct. 2026',
    dateISO: '2026-10-20',
    amount: 19700,
    status: 'Livrée',
    phone: '+221 70 678 90 12',
    address: 'Rufisque, Sénégal',
    paymentMethod: 'Wave',
    items: [
      { productId: 'P-002', quantity: 1 },
      { productId: 'P-004', quantity: 1 },
      { productId: 'P-005', quantity: 1 },
    ],
  },
  {
    id: '#HZ-1080',
    customer: 'Sokhna Sarr',
    date: '15 oct. 2026',
    dateISO: '2026-10-15',
    amount: 21000,
    status: 'Livrée',
    phone: '+221 77 789 01 23',
    address: 'Saint-Louis, Sénégal',
    paymentMethod: 'Paiement à la livraison',
    items: [
      { productId: 'P-003', quantity: 1 },
      { productId: 'P-004', quantity: 1 },
      { productId: 'P-005', quantity: 1 },
    ],
  },
  {
    id: '#HZ-1079',
    customer: 'Ndeye Diallo',
    date: '08 oct. 2026',
    dateISO: '2026-10-08',
    amount: 25000,
    status: 'Livrée',
    phone: '+221 76 890 12 34',
    address: 'Saly, Sénégal',
    paymentMethod: 'Orange Money',
    items: [
      { productId: 'P-001', quantity: 1 },
      { productId: 'P-002', quantity: 1 },
      { productId: 'P-003', quantity: 1 },
    ],
  },
  {
    id: '#HZ-1078',
    customer: 'Mame Diarra Kane',
    date: '30 sept. 2026',
    dateISO: '2026-09-30',
    amount: 17000,
    status: 'Livrée',
    phone: '+221 70 901 23 45',
    address: 'Yoff, Dakar',
    paymentMethod: 'Wave',
    items: [
      { productId: 'P-001', quantity: 1 },
      { productId: 'P-005', quantity: 1 },
    ],
  },
  {
    id: '#HZ-1077',
    customer: 'Rokhaya Faye',
    date: '18 sept. 2026',
    dateISO: '2026-09-18',
    amount: 18300,
    status: 'Livrée',
    phone: '+221 77 012 34 56',
    address: 'Kaolack, Sénégal',
    paymentMethod: 'Wave',
    items: [
      { productId: 'P-002', quantity: 1 },
      { productId: 'P-005', quantity: 2 },
    ],
  },
  {
    id: '#HZ-1076',
    customer: 'Aminata Diop',
    date: '12 août 2026',
    dateISO: '2026-08-12',
    amount: 21000,
    status: 'Livrée',
    phone: '+221 76 123 45 67',
    address: 'Grand-Yoff, Dakar',
    paymentMethod: 'Paiement à la livraison',
    items: [
      { productId: 'P-001', quantity: 1 },
      { productId: 'P-003', quantity: 1 },
    ],
  },
  {
    id: '#HZ-1075',
    customer: 'Fatou Ndiaye',
    date: '21 juillet 2026',
    dateISO: '2026-07-21',
    amount: 17000,
    status: 'Livrée',
    items: [
      { productId: 'P-002', quantity: 1 },
      { productId: 'P-003', quantity: 1 },
    ],
  },
]

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat('fr-FR').format(price)} FCFA`
}
