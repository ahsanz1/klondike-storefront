import { getCartByUserId } from 'libs/services/api/cart'
import { getItemsBySkus } from 'libs/services/api/item'
import { getItem } from 'libs/services/localStorage/localStorage'

export const setUserCart = async () => {
  let user = JSON.parse(getItem('x-sd-user'))
  if (user !== null && user !== undefined) {
    let skus = []
    let res = await getCartByUserId(user.accessToken)

    if (res.error === true) {
      return {
        items: [],
        attributes: [],
      }
    }

    let data = res.data
    let itemsArr = []

    data['hasPackaged'] = false

    await data.items.map((item, i) => {
      skus.push(item.sku)
    })

    let itemsRes = await getItemsBySkus(skus)

    await data.items.map(async (item, i) => {
      let obj = {
        isPackaged: false,
      }

      let attributes = null
      itemsRes.data.map(async (itemRes, j) => {
        if (itemRes.sku === item.sku) {
          attributes = itemRes.attributes
          await attributes.map(attr => {
            console.log('atttttrr', attr)
            switch (attr.name) {
              case 'Package Size':
                obj['size'] = attr.value
                break

              case 'QTY PER CASE':
                obj['percase'] = attr.value
                break

              case 'Image URL':
                obj['image'] = attr.value
                break

              case 'Part Number':
                obj['partnumber'] = attr.value
                break

              case 'Packaged Order':
                obj['isPackaged'] = attr.value
                data['hasPackaged'] = attr.value
                break
            }
          })
        }
      })

      let itemObj = {
        ...item,
        ...obj,
        cartIdString: data?._id,
        attributes,
      }

      itemsArr.push(itemObj)
    })

    let payload = {
      ...data,
      items: itemsArr,
    }

    console.log('itemsArr', payload)

    return payload
  }
}
