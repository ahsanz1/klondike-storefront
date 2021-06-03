import ticket from 'images/discount-order-ticket.png'
import brands from 'images/discount-order-brands.png'
import PinMarker from 'images/pin-marker.svg'

const discountOrderData = {
  desktopPrefix: 'WANT',
  desktopSuffix: 'YOUR NEXT ORDER?',
  mobilePrefix: 'GET',
  mobileSuffix: 'BARS!',
  discount: '50% OFF',
  headingColor: '#fff',
  discountColor: '#ffd17b',
  imageList: [
    {
      image: {
        url: ticket,
        altText: 'Discount order ticket',
        style: {},
      },
    },
    {
      image: {
        url: brands,
        altText: 'Discount order brands',
        style: { margin: '24px auto 0px' },
      },
    },
  ],
  text: 'Find nearest location',
  src: PinMarker,
  alt: 'Discount order button',
  buttonLink: '/find-us',
}

export default discountOrderData
