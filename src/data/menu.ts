// Structured menu, parsed from the official printed menu
// (uploads.menuPdf → "Postal98Cafe_BG_edited.pdf"). Prices in USD.
// Photos are WordPress upload paths, the same ids used in galleries.ts
// (see src/lib/assets.ts for the thumb/full URL helpers).

export type Size = '12 oz' | '16 oz' | '20 oz'

export type MenuItem = {
  id: string
  name: string
  description?: string
  /** Single price. Omitted for items priced per size, or with no set price. */
  price?: number
  /** Per-size prices for drinks; sizes not offered are simply absent. */
  sizes?: Partial<Record<Size, number>>
  /** Small print under the description (half orders, wrap choices, ...). */
  note?: string
  /** Choices listed as chips (e.g. First Class flavors). */
  choices?: string[]
  photo?: string
}

export type MenuSection = {
  id: string
  title: string
  /** Serving note shown under the title ("Served till 12 PM"). */
  note?: string
  /** Column headers for a size-priced section. */
  sizes?: Size[]
  items: MenuItem[]
}

export type MenuCategory = {
  id: string
  /** Filter pill label. */
  title: string
  sections: MenuSection[]
}

const SIZES_ALL: Size[] = ['12 oz', '16 oz', '20 oz']
const SIZES_LARGE: Size[] = ['16 oz', '20 oz']

const breakfastWrap = 'Your choice of Spinach, Wheat, White, or Jalapeño Cheddar wrap.'

export const menu: MenuCategory[] = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    sections: [
      {
        id: 'breakfast',
        title: 'Breakfast',
        note: 'Served till 12 PM',
        items: [
          {
            id: 'daves-special',
            name: "Dave's Special",
            description:
              'Ham, eggs, sharp American cheese, tomato, and mayo on an Everything Bagel.',
            price: 9.59,
            photo: '2020/05/IMG_1198.jpg',
          },
          {
            id: 'avocado-mash',
            name: 'Avocado Mash',
            description: 'Multi-grain bread topped with two over-light eggs.',
            price: 9.29,
            note: 'Half order, topped with one over-light egg: $6.09',
            photo: '2020/05/IMG_1182-scaled.jpg',
          },
          {
            id: 'sausage-egg-cheese-wrap',
            name: 'Sausage, Egg & Sharp American Cheese Wrap',
            description: breakfastWrap,
            price: 9.09,
            photo: '2020/04/1000x1333.jpg',
          },
          {
            id: 'ham-egg-cheese-wrap',
            name: 'Ham, Egg & Sharp American Cheese Wrap',
            description: breakfastWrap,
            price: 9.09,
            photo: '2020/05/IMG_1086-scaled.jpg',
          },
          {
            id: 'bacon-egg-cheese-wrap',
            name: 'Bacon, Egg & Sharp American Cheese Wrap',
            description: breakfastWrap,
            price: 9.09,
            photo: '2020/05/IMG_1033-scaled.jpg',
          },
          {
            id: 'yogurt-parfait',
            name: 'Yogurt Parfait',
            description:
              'Vanilla yogurt topped with granola, fresh fruit, and drizzled with honey. Made fresh to order.',
            price: 6.19,
            photo: '2020/05/IMG_1019-scaled.jpg',
          },
          {
            id: 'bagel',
            name: 'Plain or Everything Bagel',
            description: 'Served with strawberry or plain cream cheese.',
            price: 3.59,
            photo: '2020/05/IMG_1330.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'sandwiches',
    title: 'Paninis & Sandwiches',
    sections: [
      {
        id: 'paninis',
        title: 'Paninis',
        note: 'Served all day with a dill pickle',
        items: [
          {
            id: 'grams-caribbean-chicken',
            name: "Gram's Caribbean Chicken",
            description:
              'Chicken, bacon, Muenster cheese, and tomato with sweet & spicy sauce, served on a folded tortilla.',
            price: 10.79,
          },
          {
            id: 'turkey-basil-pesto-panini',
            name: 'Oven Roasted Turkey Basil Pesto Panini',
            description: 'Muenster cheese and tomato on sourdough bread.',
            price: 10.09,
            photo: '2020/05/IMG_1716.jpg',
          },
          {
            id: 'ham-swiss-panini',
            name: 'Country Ham and Swiss Cheese Panini',
            description: 'Our own honey dijonnaise sauce on sourdough bread.',
            price: 9.39,
            photo: '2020/05/IMG_1703.jpg',
          },
          {
            id: 'roast-beef-swiss-panini',
            name: 'Roast Beef and Swiss Cheese Panini',
            description: 'Our own horseradish sauce on sourdough bread.',
            price: 9.49,
            photo: '2020/05/IMG_1721.jpg',
          },
          {
            id: 'toasted-blt-club',
            name: 'Toasted BLT Club',
            description:
              'Bacon, lettuce, tomato, fresh mozzarella, and pesto mayo on sourdough bread.',
            price: 9.39,
          },
        ],
      },
      {
        id: 'deli',
        title: 'Deli Sandwiches',
        note: 'Served all day with a dill pickle',
        items: [
          {
            id: 'grilled-corned-beef-special',
            name: 'Grilled Corned Beef Special',
            description:
              'Thinly shaved corned beef with Swiss cheese on sourdough bread with coleslaw and our own homemade Russian dressing.',
            price: 9.49,
            photo: '2020/05/IMG_1681.jpg',
          },
          {
            id: 'turkey-special',
            name: 'Turkey Special',
            description:
              'Thinly shaved turkey on sourdough bread with coleslaw and our own homemade Russian dressing.',
            price: 9.29,
            note: 'Served cold',
            photo: '2020/05/IMG_1661-scaled.jpg',
          },
          {
            id: 'roast-beef-special',
            name: 'Roast Beef Special',
            description:
              'Thinly shaved roast beef on sourdough bread with coleslaw and our own homemade Russian dressing.',
            price: 9.59,
            note: 'Served cold',
            photo: '2020/05/IMG_1627-scaled.jpg',
          },
          {
            id: 'sweet-lebanon-bologna',
            name: 'Sweet Lebanon Bologna',
            description: 'Smoked cheddar cheese on sourdough bread with mayo.',
            price: 8.29,
            note: 'Served cold',
            photo: '2020/05/IMG_1651.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'signature',
    title: 'Signature Drinks',
    sections: [
      {
        id: 'family-favorites',
        title: 'Family Favorites',
        note: 'Our signature coffee drinks',
        sizes: SIZES_LARGE,
        items: [
          {
            id: 'bellas-caramel-macchiato',
            name: "Bella's Caramel Macchiato",
            description: 'Espresso and steamed milk finished with caramel. The family favorite.',
            sizes: { '16 oz': 5.69, '20 oz': 6.49 },
            photo: '2020/06/00100lrPORTRAIT_00100_BURST20200516153539196_COVER-scaled.jpg',
          },
          {
            id: 'bubs-vanilla-chai-latte',
            name: "Bub's Vanilla Chai Latte",
            description: 'Spiced chai and vanilla, steamed with milk.',
            sizes: { '16 oz': 5.79, '20 oz': 6.59 },
            photo: '2020/05/IMG_1762.jpg',
          },
          {
            id: 'tanishas-toffee-frappe',
            name: "Tanisha's Toffee Frappe",
            description: 'Blended toffee frappe topped with whipped cream.',
            sizes: { '16 oz': 5.79, '20 oz': 6.59 },
            photo: '2020/05/IMG_1799-scaled.jpg',
          },
          {
            id: 'cobes-sweet-cream-cold-brew',
            name: "Cobe's Sweet Cream Cold Brew",
            description: 'Slow-steeped cold brew poured over sweet cream.',
            sizes: { '16 oz': 5.19, '20 oz': 5.59 },
            photo: '2020/05/IMG_1751-scaled.jpg',
          },
        ],
      },
      {
        id: 'first-class',
        title: 'First Class Drinks',
        note: 'Specialty lattes & frappes',
        sizes: SIZES_LARGE,
        items: [
          {
            id: 'specialty-latte-or-frappe',
            name: 'Specialty Latte or Frappe',
            description: 'Pick a flavor, served hot as a latte or blended as a frappe.',
            sizes: { '16 oz': 5.79, '20 oz': 6.59 },
            choices: [
              'Turtle',
              'Chocolate Truffle',
              'Honey Lavender',
              'Salted Caramel',
              'Maple White Mocha',
              'Vanilla Bean',
              'Snickers',
              'Mocha',
              'Caramel',
              'Lavender White Mocha',
            ],
            photo: '2020/05/IMG_1803-1-scaled.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'traditional',
    title: 'Traditional Coffee & Tea',
    sections: [
      {
        id: 'traditional-drinks',
        title: 'Traditional Drinks',
        note: 'Freshly ground Guatemalan coffee',
        sizes: SIZES_ALL,
        items: [
          {
            id: 'house-coffee',
            name: 'House Coffee',
            sizes: { '12 oz': 2.29, '16 oz': 2.79, '20 oz': 3.29 },
            photo: '2020/05/IMG_1310-scaled.jpg',
          },
          {
            id: 'latte',
            name: 'Latte',
            sizes: { '12 oz': 4.49, '16 oz': 4.89, '20 oz': 5.19 },
            photo: '2020/05/IMG_1885-1-scaled.jpg',
          },
          {
            id: 'americano',
            name: 'Americano',
            sizes: { '12 oz': 3.59, '16 oz': 3.99, '20 oz': 4.59 },
            photo: '2020/05/IMG_1856-scaled.jpg',
          },
          {
            id: 'breve',
            name: 'Breve',
            sizes: { '12 oz': 5.09, '16 oz': 5.59, '20 oz': 5.99 },
            photo: '2020/05/IMG_1865-1-scaled.jpg',
          },
          {
            id: 'hot-chocolate',
            name: 'Hot Chocolate',
            sizes: { '12 oz': 3.99, '16 oz': 4.29, '20 oz': 4.69 },
            photo: '2020/05/IMG_1734-scaled.jpg',
          },
          {
            id: 'cold-brew',
            name: 'Cold Brew',
            sizes: { '16 oz': 4.29, '20 oz': 4.69 },
            photo: '2020/05/IMG_1831.jpg',
          },
          {
            id: 'maple-spice-cold-brew',
            name: 'Maple Spice Cold Brew',
            sizes: { '16 oz': 5.99, '20 oz': 6.29 },
          },
          {
            id: 'coconut-cream-cold-brew',
            name: 'Coconut Cream Cold Brew',
            sizes: { '16 oz': 5.99, '20 oz': 6.29 },
          },
        ],
      },
      {
        id: 'teas',
        title: 'Cold & Hot Teas',
        sizes: SIZES_ALL,
        items: [
          {
            id: 'iced-green-tea',
            name: 'Iced Green Tea',
            sizes: { '16 oz': 3.09, '20 oz': 3.59 },
            photo: '2020/04/IMG_1550.jpg',
          },
          {
            id: 'sweet-tea',
            name: 'Sweet Tea',
            sizes: { '16 oz': 3.09, '20 oz': 3.59 },
            photo: '2020/05/IMG_1572.jpg',
          },
          {
            id: 'london-fog',
            name: 'London Fog',
            sizes: { '12 oz': 4.19, '16 oz': 4.49, '20 oz': 4.79 },
            photo: '2020/04/IMG_1476.jpg',
          },
          {
            id: 'matcha',
            name: 'Matcha',
            sizes: { '16 oz': 5.39, '20 oz': 6.19 },
          },
          {
            id: 'hot-tea',
            name: 'Hot Tea',
            description: 'Earl Grey or Green Tea.',
            sizes: { '12 oz': 2.59, '16 oz': 3.09, '20 oz': 3.29 },
            photo: '2020/05/IMG_1405.jpg',
          },
          {
            id: 'decaf-citrus-lime',
            name: 'Decaf Citrus Lime',
            sizes: { '12 oz': 2.59, '16 oz': 3.09, '20 oz': 3.29 },
            photo: '2020/05/IMG_1586.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'smoothies',
    title: 'Smoothies',
    sections: [
      {
        id: 'smoothies',
        title: 'Smoothies',
        note: '20 oz, blended fresh',
        items: [
          {
            id: '98-classic',
            name: '98 Classic',
            description: 'Strawberry & pineapple.',
            price: 6.49,
            photo: '2020/04/IMG_1535-e1588155585876.jpg',
          },
          {
            id: 'special-delivery',
            name: 'Special Delivery',
            description: 'Banana & strawberry.',
            price: 6.49,
            photo: '2020/06/00100lrPORTRAIT_00100_BURST20200516152355089_COVER-scaled.jpg',
          },
          {
            id: 'island-express',
            name: 'Island Express',
            description: 'Coconut & pineapple.',
            price: 6.49,
            photo: '2020/05/IMG_1906-scaled.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'extras',
    title: 'Pastries & Extras',
    sections: [
      {
        id: 'extras',
        title: 'Add-Ons & Other Beverages',
        items: [
          {
            id: 'milk-alternatives',
            name: 'Milk Alternatives',
            description: 'Oat, almond, sweet foam, or half & half.',
            price: 1.25,
          },
          { id: 'bottled-water', name: 'Bottled Water', price: 1.75 },
          { id: 'orange-juice', name: 'Orange Juice', price: 2.79 },
          { id: 'chocolate-milk', name: 'Chocolate Milk', price: 2.79 },
          {
            id: 'fresh-pastries',
            name: 'Fresh Daily Pastries',
            description:
              'Muffins, cookies, scones, cinnamon rolls, and seasonal bakery favorites. Ask what came out of the oven today.',
            photo: '2020/05/IMG_1059.jpg',
          },
        ],
      },
    ],
  },
]

/** Home page "House Specialties", in display order. */
export const featuredIds = [
  'turkey-basil-pesto-panini',
  'daves-special',
  'bellas-caramel-macchiato',
  'avocado-mash',
  'special-delivery',
  'tanishas-toffee-frappe',
] as const

export type FeaturedItem = MenuItem & { section: MenuSection; category: MenuCategory }

export const allItems = (): FeaturedItem[] =>
  menu.flatMap((category) =>
    category.sections.flatMap((section) =>
      section.items.map((item) => ({ ...item, section, category })),
    ),
  )

export const featuredItems = (): FeaturedItem[] => {
  const byId = new Map(allItems().map((item) => [item.id, item]))
  return featuredIds.flatMap((id) => {
    const item = byId.get(id)
    return item ? [item] : []
  })
}

export const formatPrice = (price: number) => `$${price.toFixed(2)}`

/** Lowest price of a size-priced item, or the single price. */
export const startingPrice = (item: MenuItem): number | undefined => {
  if (item.price !== undefined) return item.price
  const prices = Object.values(item.sizes ?? {})
  return prices.length ? Math.min(...prices) : undefined
}

export const allMenuPhotos = (): string[] =>
  allItems().flatMap((item) => (item.photo ? [item.photo] : []))
