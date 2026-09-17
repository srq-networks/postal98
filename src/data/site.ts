export const site = {
  name: 'Postal 98 Cafe',
  phone: '941-260-8862',
  address: ['1240 Yoder Ave.', 'Sarasota, Florida 34239'],
  directions:
    'We are located right off of Bahia Vista Street, between Graber Avenue and Yoder Avenue.',
  hours: [
    { season: 'April -Oct .', lines: ['Mon-Thu: 7am-3pm', 'Fri & Sat: 7am-9pm'] },
    { season: 'Nov - Dec 20 .', lines: ['Mon-Sat: 7am-9pm'] },
    { season: 'Dec 21 - March .', lines: ['Mon-Sat: 7am-10pm'] },
  ],
  sundays: 'All Sundays Closed',
  map: { lat: 27.3225998, lng: -82.5021878, zoom: 15 },
  links: {
    orderOnline: 'https://www.clover.com/online-ordering/postal-98-cafe-llc-sarasota',
    facebook: 'https://www.facebook.com/postalcafe/',
    instagram: 'https://www.instagram.com/postal98cafe/',
    developer: 'PicturesqueDesigns.net',
  },
} as const

/** Upload paths of the non-gallery assets (see src/lib/assets.ts). */
export const uploads = {
  logo: '2020/03/Postal-98-Cafe-logo_lores.jpg',
  heroVideo: '2020/05/Postal-Cafe-Clips-5MB-Cinema.mp4',
  heroPoster: '2020/04/Postal98-e1587764101970.png',
  somethingUnique:
    '2020/04/00100lrPORTRAIT_00100_BURST20200416154627567_COVER-scaled-e1589408692162.jpg',
  ourStoryPhoto: '2020/06/127A3250-ZF-10726-15082-1-010.jpg',
  menuHero: '2020/05/Serving.jpg',
  ourStoryHero: '2020/05/IMG_1313-scaled.jpg',
  contactHero: '2020/05/IMG_1777.jpg',
  contactVisitBg: '2020/04/IMG_1557.jpg',
  stripeLight: '2020/04/butcher-image-11-2.png',
  stripeDark: '2020/04/butcher-image-11.png',
  cornerPattern: '2020/04/butcher-image-07.png',
  chalkboard: '2020/04/butcher-09.jpg',
  testimonialsBg: '2020/04/butcher-11.jpg',
  menuPdf: '2026/04/Postal98Cafe_BG_edited.pdf',
  fullMenuPdf: '2023/11/290277-DeliMenu_1_LR_Proof-1.pdf',
  employmentPdf: '2020/08/Postal-Employment-Application.pdf',
  font: 'et-fonts/outside.ttf',
  icon32: '2020/06/cropped-coffee-mug-cup-drink-png-icon-free-download-70552-32x32.png',
  icon180: '2020/06/cropped-coffee-mug-cup-drink-png-icon-free-download-70552-180x180.png',
  icon192: '2020/06/cropped-coffee-mug-cup-drink-png-icon-free-download-70552-192x192.png',
} as const
