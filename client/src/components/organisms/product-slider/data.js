import product1 from 'images/chocolate-sea-salt.webp'
import product2 from 'images/peanut-butter-chip.png'
import product3 from 'images/almond-butter-chip.png'
import product4 from 'images/lemon-blueberry.png'
import product5 from 'images/wild-blueberry.png'
import product6 from 'images/banana-nut.png'
import product7 from 'images/matcha-chai.png'
import productIcon1 from 'images/icon-chocolate-sea-salt.png'
import productIcon2 from 'images/icon-peanut-butter-chip.png'
import productIcon3 from 'images/icon-almond-butter-chip.png'
import productIcon4 from 'images/icon-lemon-blueberry.png'
import productIcon5 from 'images/icon-wild-blueberry.png'
import productIcon6 from 'images/icon-banana-nut.png'
import productIcon7 from 'images/icon-matcha-chai.png'
import variety1 from 'images/chocolate-lovers.png'
import varietyIcon1 from 'images/icon-chocolate-lovers.png'
import varietyIcon2 from 'images/icon-fruit-lovers.png'

const productSliderData = {
  productsData: [
    {
      btnText: 'Our Flavors',
      btnId: '0',
      id: '0',
      products: [
        {
          imgUrl: product1,
          imgAlt: 'product1',
          productName: 'CHOCOLATE SEA SALT',
          productDesc: 'Salty-sweet, dark chocolate deliciousness.',
          productIcon: productIcon1,
          productIconAlt: 'productIcon1',
          borderColor: '#36150f',
          bgColor: '#cc956c',
        },
        {
          imgUrl: product2,
          imgAlt: 'product2',
          productName: 'Peanut Butter Chip',
          productDesc: 'Just like a PB + dark chocolate chip cookie.',
          productIcon: productIcon2,
          productIconAlt: 'productIcon2',
          borderColor: '#7a3e2d',
          bgColor: '#f8cb6f',
        },
        {
          imgUrl: product3,
          imgAlt: 'product3',
          productName: 'Almond Butter Chip',
          productDesc: 'A creamy, chocolatey almond butter treat.',
          productIcon: productIcon3,
          productIconAlt: 'productIcon3',
          borderColor: '#7a3e2d',
          bgColor: '#c5afcf',
        },
        {
          imgUrl: product4,
          imgAlt: 'product4',
          productName: 'Lemon Blueberry',
          productDesc: 'Refreshing, puckery, full-bodied lemon taste.',
          productIcon: productIcon4,
          productIconAlt: 'productIcon4',
          borderColor: '#214898',
          bgColor: '#86c7da',
        },
        {
          imgUrl: product5,
          imgAlt: 'product5',
          productName: 'Wild Blueberry',
          productDesc: 'Packed with real, fresh, wild blueberries.',
          productIcon: productIcon5,
          productIconAlt: 'productIcon5',
          borderColor: '#214898',
          bgColor: '#a1cc7d',
        },
        {
          imgUrl: product6,
          imgAlt: 'product6',
          productName: 'Banana Nut',
          productDesc: 'Just like authentic, fresh banana nut bread.',
          productIcon: productIcon6,
          productIconAlt: 'productIcon6',
          borderColor: '#914d34',
          bgColor: '#eba85e',
        },
        {
          imgUrl: product7,
          imgAlt: 'product7',
          productName: 'Matcha Chai',
          productDesc: 'A smooth, exotic, multi-dimensional flavor.',
          productIcon: productIcon7,
          productIconAlt: 'productIcon7',
          borderColor: '#587f38',
          bgColor: '#b8d26a',
        },
      ],
    },
    {
      btnText: 'Variety Packs',
      btnId: '1',
      id: '1',
      products: [
        {
          imgUrl: variety1,
          imgAlt: 'variety1',
          productName: 'Chocolate Lovers',
          productDesc:
            '4 Chocolate Sea Salt, 4 Peanut Butter Chip, 4 Almond Butter Chip.',
          productIcon: varietyIcon1,
          productIconAlt: 'varietyIcon1',
          borderColor: '#36150f',
          bgColor: '#cc956c',
        },
        {
          imgUrl: product4,
          imgAlt: 'variety2',
          productName: 'Fruit Lovers',
          productDesc: '4 Lemon Blueberry, 4 Wild Blueberry, 4 Banana Nut.',
          productIcon: varietyIcon2,
          productIconAlt: 'varietyIcon2',
          borderColor: '#214898',
          bgColor: '#86c7da',
        },
      ],
    },
  ],
}

export default productSliderData
