export const storyParagraphs = [
  'Postal 98’ Café originated from the Pinecraft Post Office. As a young girl, owner, Ann Michelle Stoltzfus remembers mailing post cards and letters home to her friends back north in Pennsylvania when she would visit with her parents Dave and Barbie Esh. No stranger to the food business, Ann Michelle along with her husband Jason are co-owners of Esh Foods, located in Lancaster County, PA. Her main highlight of coming to Pinecraft was to visit her grandparents, inspiring her love for Florida. When the word spread that the post office was closing, her dreams of owning a café finally became a reality. Partnering with Sarasota-based Lattitude 23.5˚ Coffee & Tea, they created a specialty blend of Guatemala based coffee, as a way of honoring their adopted children from Guatemala. This blend is commonly known as their Signature Postal 98’ Café Blend. Along with the uniqueness of the coffee blend, you’ll find the various menu items reflecting their four children’s favorite drinks. ',
  'Their mission is to create an atmosphere for the community to connect with others and above all, reflecting God’s love.',
]

export type TestimonialData = { quote: string[]; author: string; justify?: boolean }

/** Two columns of three, in the live site's order. */
export const testimonialColumns: TestimonialData[][] = [
  [
    {
      quote: [
        'Postal 98 Cafe is the perfect addition to Pinecraft. Service is friendly. Food is quality. Atmosphere is pleasant and location is great. Welcome to the neighborhood.',
      ],
      author: '- SGS',
      justify: true,
    },
    {
      quote: [
        'Love love love this place!!! Best iced coffee · Cheap eats ·Delicious sandwiches · Best coffee · Free Wi-Fi.',
      ],
      author: '- TP',
    },
    {
      quote: [
        'Just spent 10 days in Sarasota and visited Postal 98 Cafe (8) times! Great coffee and food, great service, and friendly staff! A definite must stop if in the area! Highly recommend.',
      ],
      author: '- SG',
    },
  ],
  [
    {
      quote: ['Very clean, good service, great food. I’ll be back for breakfast!'],
      author: '- ES',
    },
    { quote: ['Great little place to hang out! ', 'Best coffee'], author: '- LY' },
    {
      quote: [
        'Delicious, high quality sandwiches and coffee served to you by friendly staff. If you are an all day coffee drinker you’ll love the fact that they are open well into the evening. My personal favorites – vanilla latte, caramel latte, sweet bologna sandwich and recently they added Dave’s Special – a warm melted cheesy ham, egg, tomato and mayo concoction on an everything bagel!',
      ],
      author: '- NEG',
      justify: true,
    },
  ],
]
