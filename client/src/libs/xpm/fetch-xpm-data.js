import { fetchLayout, fetchGc } from '@teamfabric/xpm'
import { xpmApiDomain, account, stage } from 'libs/general-config'
const fetchXPMData = async () => {
  try {
    const layoutData = await fetchLayout({
      url: '/home',
      xpmApiDomain,
      account,
      stage,
    })
    console.log('gccc', xpmApiDomain)
    const gcData = await fetchGc({ xpmApiDomain, account, stage })
    const footerProps = gcData.find(item => item.id === 'Footer') || {}
    const promoRailsProps = gcData.find(item => item.id === 'PromoRail') || {}
    return {
      layoutData,
      promoRailsProps,
      footerProps,
    }
  } catch (error) {
    console.log('Error occured while fetch xpm data: ', error.message)
    console.log(error.stack)
    return { layoutData: [], footerProps: {}, promoRailsProps: {} }
  }
}

export default fetchXPMData
