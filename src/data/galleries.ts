// Image order is exactly the live site's. The first image of each home
// gallery is the category title card baked into the photo.

export type Gallery = { title?: string; images: string[] }

/** Home → "Specialties": four columns, two stacked galleries per column. */
export const homeSpecialtyColumns: Gallery[][] = [
  [
    {
      images: [
        '2020/05/ColdHotTeas1000x1333-1.jpg',
        '2020/05/IMG_1586.jpg',
        '2020/05/IMG_1572.jpg',
        '2020/04/IMG_1550.jpg',
        '2020/05/IMG_1405.jpg',
        '2020/05/IMG_1410.jpg',
      ],
    },
    {
      images: [
        '2020/05/Smoothies.jpg',
        '2020/06/IMG_20200430_145427-scaled.jpg',
        '2020/06/00100lrPORTRAIT_00100_BURST20200516152355089_COVER-scaled.jpg',
        '2020/05/IMG_1906-scaled.jpg',
        '2020/04/IMG_1535-e1588155585876.jpg',
      ],
    },
  ],
  [
    {
      images: [
        '2020/07/FamFavoIMG_1762-1000x1333-1.jpg',
        '2020/05/IMG_1799-scaled.jpg',
        '2020/05/IMG_1758-scaled.jpg',
        '2020/05/IMG_1751-scaled.jpg',
        '2020/05/IMG_1743-scaled.jpg',
        '2020/06/00100lrPORTRAIT_00100_BURST20200430152042624_COVER-scaled.jpg',
      ],
    },
    {
      images: [
        '2020/05/Pastries1000x1333.jpg',
        '2020/06/00100lrPORTRAIT_00100_BURST20200430165835415_COVER-scaled.jpg',
        '2020/05/IMG_1105.jpg',
        '2020/05/IMG_1059.jpg',
        '2020/06/00100lrPORTRAIT_00100_BURST20200507172258667_COVER-scaled.jpg',
        '2020/05/IMG_1053.jpg',
      ],
    },
  ],
  [
    {
      images: [
        '2020/07/FirstClsDrinksIMG_1812-1000x1333-1.jpg',
        '2020/05/IMG_1832-1-scaled.jpg',
        '2020/05/IMG_1824-1-scaled.jpg',
        '2020/05/IMG_1799-scaled.jpg',
        '2020/05/IMG_1831.jpg',
        '2020/04/IMG_1476.jpg',
        '2020/05/IMG_1806-1-scaled.jpg',
      ],
    },
    {
      images: [
        '2020/05/SandwichesHome.jpg',
        '2020/05/IMG_1721.jpg',
        '2020/05/IMG_1716.jpg',
        '2020/05/IMG_1703.jpg',
        '2020/05/IMG_1685-1-scaled.jpg',
        '2020/05/IMG_1651.jpg',
        '2020/05/IMG_1661-scaled.jpg',
      ],
    },
  ],
  [
    {
      images: [
        '2020/05/TraditionalDinks1000x1333.jpg',
        '2020/05/IMG_1873-scaled.jpg',
        '2020/05/IMG_1865-1-scaled.jpg',
        '2020/05/IMG_1885-1-scaled.jpg',
        '2020/05/IMG_1735-scaled.jpg',
        '2020/05/IMG_1310-scaled.jpg',
      ],
    },
    {
      images: [
        '2020/05/Breakfast-2.jpg',
        '2020/05/IMG_1198.jpg',
        '2020/05/IMG_1086-scaled.jpg',
        '2020/05/IMG_1033-scaled.jpg',
        '2020/04/1000x1333.jpg',
        '2020/05/IMG_1321.jpg',
        '2020/05/IMG_1330.jpg',
        '2020/05/IMG_1182-scaled.jpg',
        '2020/05/IMG_1019-scaled.jpg',
      ],
    },
  ],
]

/** Home → "Other Items": one 4-per-row grid. */
export const homeOtherItems: Gallery = {
  images: [
    '2020/05/IMG_1281-scaled.jpg',
    '2020/04/IMG_1347.jpg',
    '2020/04/IMG_1288.jpg',
    '2020/05/IMG_1116-scaled.jpg',
    '2020/05/IMG_1120-scaled.jpg',
    '2020/06/DSC00050-e1593615340858.jpg',
    '2020/05/IMG_4090-scaled.jpg',
    '2023/04/WhatsApp-Image-2023-04-17-at-20.40.22-e1681760748289.jpeg',
    '2020/05/IMG_4054-scaled.jpg',
    '2023/04/image001.png',
  ],
}

/** Menu → "Our Menu": three columns, two titled galleries per column.
 *  The live site pairs "Family Favorites" with the first-class-drinks title
 *  card and vice versa; reproduced as-is. */
export const menuColumns: Gallery[][] = [
  [
    {
      title: 'Breakfast',
      images: [
        '2020/05/Breakfast-1.jpg',
        '2020/05/IMG_1330.jpg',
        '2020/05/IMG_1321.jpg',
        '2020/05/IMG_1198.jpg',
        '2020/05/IMG_1094.jpg',
        '2020/05/IMG_1033-scaled.jpg',
        '2020/04/IMG_1024-scaled.jpg',
      ],
    },
    {
      title: 'Family Favorites',
      images: [
        '2020/05/FirstClassDrinks.jpg',
        '2020/06/00100lrPORTRAIT_00100_BURST20200430152042624_COVER-scaled.jpg',
        '2020/06/00100lrPORTRAIT_00100_BURST20200516153539196_COVER-scaled.jpg',
        '2020/05/IMG_1762.jpg',
        '2020/05/IMG_1751-scaled.jpg',
        '2020/05/IMG_1743-scaled.jpg',
        '2020/05/IMG_1773-scaled.jpg',
      ],
    },
  ],
  [
    {
      title: 'Sandwiches',
      images: [
        '2020/06/Sandwiches600x874.jpg',
        '2020/05/IMG_1716.jpg',
        '2020/05/IMG_1661-scaled.jpg',
        '2020/05/IMG_1703.jpg',
        '2020/05/IMG_1651.jpg',
        '2020/05/IMG_1681.jpg',
        '2020/05/IMG_1627-scaled.jpg',
      ],
    },
    {
      title: 'First Class Drinks',
      images: [
        '2020/05/Family-favorites-1.jpg',
        '2020/05/IMG_1840-1-scaled.jpg',
        '2020/05/IMG_1832-1-scaled.jpg',
        '2020/05/IMG_1824-1-scaled.jpg',
        '2020/05/IMG_1799-scaled.jpg',
        '2020/05/IMG_1477-2.jpg',
        '2020/05/IMG_1803-1-scaled.jpg',
      ],
    },
  ],
  [
    {
      title: 'Pastries',
      images: [
        '2020/05/IMG_1050-e1589460587579.jpg',
        '2020/06/00100lrPORTRAIT_00100_BURST20200507172258667_COVER-scaled.jpg',
        '2020/05/IMG_1059.jpg',
        '2020/05/IMG_1073.jpg',
        '2020/05/IMG_1105.jpg',
        '2020/05/IMG_1053.jpg',
      ],
    },
    {
      title: 'Traditional Drinks',
      images: [
        '2020/05/TraditionalDrinks600x874.jpg',
        '2020/05/IMG_1885-1-scaled.jpg',
        '2020/05/IMG_1873-1-scaled.jpg',
        '2020/05/IMG_1856-scaled.jpg',
        '2020/05/IMG_1734-scaled.jpg',
        '2020/05/IMG_1310-1-scaled.jpg',
      ],
    },
  ],
]

export const allGalleryImages = (): string[] => [
  ...homeSpecialtyColumns.flat().flatMap((g) => g.images),
  ...homeOtherItems.images,
  ...menuColumns.flat().flatMap((g) => g.images),
]
