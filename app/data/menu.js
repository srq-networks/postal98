/*
 * The menu, grouped as category → section (one card each) → items. Prices in USD.
 * An item has either `price` or `sizes` (keyed by ounces); `description`, `note`
 * and `choices` are optional.
 */

const wrap = 'Your choice of Spinach, Wheat, White, or Jalapeño Cheddar wrap.'

export const menu = [
  {
    title: 'Breakfast',
    sections: [
      {
        title: 'Breakfast',
        note: 'Served till 12 PM',
        items: [
          {
            name: "Dave's Special",
            description:
              'Ham, eggs, sharp American cheese, tomato, and mayo on an Everything Bagel.',
            price: 9.59,
          },
          {
            name: 'Avocado Mash',
            description: 'Multi-grain bread topped with two over-light eggs.',
            price: 9.29,
            note: 'Half order, topped with one over-light egg: $6.09',
          },
          { name: 'Sausage, Egg & Sharp American Cheese Wrap', description: wrap, price: 9.09 },
          { name: 'Ham, Egg & Sharp American Cheese Wrap', description: wrap, price: 9.09 },
          { name: 'Bacon, Egg & Sharp American Cheese Wrap', description: wrap, price: 9.09 },
          {
            name: 'Yogurt Parfait',
            description:
              'Vanilla yogurt topped with granola, fresh fruit, and drizzled with honey. Made fresh to order.',
            price: 6.19,
          },
          {
            name: 'Plain or Everything Bagel',
            description: 'Served with strawberry or plain cream cheese.',
            price: 3.59,
          },
        ],
      },
    ],
  },
  {
    title: 'Paninis & Sandwiches',
    sections: [
      {
        title: 'Paninis',
        note: 'Served all day with a dill pickle',
        items: [
          {
            name: "Gram's Caribbean Chicken",
            description:
              'Chicken, bacon, Muenster cheese, and tomato with sweet & spicy sauce, served on a folded tortilla.',
            price: 10.79,
          },
          {
            name: 'Oven Roasted Turkey Basil Pesto Panini',
            description: 'Muenster cheese and tomato on sourdough bread.',
            price: 10.09,
          },
          {
            name: 'Country Ham and Swiss Cheese Panini',
            description: 'Our own honey dijonnaise sauce on sourdough bread.',
            price: 9.39,
          },
          {
            name: 'Roast Beef and Swiss Cheese Panini',
            description: 'Our own horseradish sauce on sourdough bread.',
            price: 9.49,
          },
          {
            name: 'Toasted BLT Club',
            description:
              'Bacon, lettuce, tomato, fresh mozzarella, and pesto mayo on sourdough bread.',
            price: 9.39,
          },
        ],
      },
      {
        title: 'Deli Sandwiches',
        note: 'Served all day with a dill pickle',
        items: [
          {
            name: 'Grilled Corned Beef Special',
            description:
              'Thinly shaved corned beef with Swiss cheese on sourdough bread with coleslaw and our own homemade Russian dressing.',
            price: 9.49,
          },
          {
            name: 'Turkey Special',
            description:
              'Thinly shaved turkey on sourdough bread with coleslaw and our own homemade Russian dressing.',
            price: 9.29,
            note: 'Served cold',
          },
          {
            name: 'Roast Beef Special',
            description:
              'Thinly shaved roast beef on sourdough bread with coleslaw and our own homemade Russian dressing.',
            price: 9.59,
            note: 'Served cold',
          },
          {
            name: 'Sweet Lebanon Bologna',
            description: 'Smoked cheddar cheese on sourdough bread with mayo.',
            price: 8.29,
            note: 'Served cold',
          },
        ],
      },
    ],
  },
  {
    title: 'Signature Drinks',
    sections: [
      {
        title: 'Family Favorites',
        note: 'Our signature coffee drinks',
        items: [
          {
            name: "Bella's Caramel Macchiato",
            description: 'Espresso and steamed milk finished with caramel. The family favorite.',
            sizes: { 16: 5.69, 20: 6.49 },
          },
          {
            name: "Bub's Vanilla Chai Latte",
            description: 'Spiced chai and vanilla, steamed with milk.',
            sizes: { 16: 5.79, 20: 6.59 },
          },
          {
            name: "Tanisha's Toffee Frappe",
            description: 'Blended toffee frappe topped with whipped cream.',
            sizes: { 16: 5.79, 20: 6.59 },
          },
          {
            name: "Cobe's Sweet Cream Cold Brew",
            description: 'Slow-steeped cold brew poured over sweet cream.',
            sizes: { 16: 5.19, 20: 5.59 },
          },
        ],
      },
      {
        title: 'First Class Drinks',
        note: 'Specialty lattes & frappes',
        items: [
          {
            name: 'Specialty Latte or Frappe',
            description: 'Pick a flavor, served hot as a latte or blended as a frappe.',
            sizes: { 16: 5.79, 20: 6.59 },
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
          },
        ],
      },
    ],
  },
  {
    title: 'Traditional Coffee & Tea',
    sections: [
      {
        title: 'Traditional Drinks',
        note: 'Freshly ground Guatemalan coffee',
        items: [
          { name: 'House Coffee', sizes: { 12: 2.29, 16: 2.79, 20: 3.29 } },
          { name: 'Latte', sizes: { 12: 4.49, 16: 4.89, 20: 5.19 } },
          { name: 'Americano', sizes: { 12: 3.59, 16: 3.99, 20: 4.59 } },
          { name: 'Breve', sizes: { 12: 5.09, 16: 5.59, 20: 5.99 } },
          { name: 'Hot Chocolate', sizes: { 12: 3.99, 16: 4.29, 20: 4.69 } },
          { name: 'Cold Brew', sizes: { 16: 4.29, 20: 4.69 } },
          { name: 'Maple Spice Cold Brew', sizes: { 16: 5.99, 20: 6.29 } },
          { name: 'Coconut Cream Cold Brew', sizes: { 16: 5.99, 20: 6.29 } },
        ],
      },
      {
        title: 'Cold & Hot Teas',
        items: [
          { name: 'Iced Green Tea', sizes: { 16: 3.09, 20: 3.59 } },
          { name: 'Sweet Tea', sizes: { 16: 3.09, 20: 3.59 } },
          { name: 'London Fog', sizes: { 12: 4.19, 16: 4.49, 20: 4.79 } },
          { name: 'Matcha', sizes: { 16: 5.39, 20: 6.19 } },
          {
            name: 'Hot Tea',
            description: 'Earl Grey or Green Tea.',
            sizes: { 12: 2.59, 16: 3.09, 20: 3.29 },
          },
          { name: 'Decaf Citrus Lime', sizes: { 12: 2.59, 16: 3.09, 20: 3.29 } },
        ],
      },
    ],
  },
  {
    title: 'Smoothies',
    sections: [
      {
        title: 'Smoothies',
        note: '20 oz, blended fresh',
        items: [
          { name: '98 Classic', description: 'Strawberry & pineapple.', price: 6.49 },
          { name: 'Special Delivery', description: 'Banana & strawberry.', price: 6.49 },
          { name: 'Island Express', description: 'Coconut & pineapple.', price: 6.49 },
        ],
      },
    ],
  },
  {
    title: 'Pastries & Extras',
    sections: [
      {
        title: 'Add-Ons & Other Beverages',
        items: [
          {
            name: 'Milk Alternatives',
            description: 'Oat, almond, sweet foam, or half & half.',
            price: 1.25,
          },
          { name: 'Bottled Water', price: 1.75 },
          { name: 'Orange Juice', price: 2.79 },
          { name: 'Chocolate Milk', price: 2.79 },
          {
            name: 'Fresh Daily Pastries',
            description:
              'Muffins, cookies, scones, cinnamon rolls, and seasonal bakery favorites. Ask what came out of the oven today.',
          },
        ],
      },
    ],
  },
]
