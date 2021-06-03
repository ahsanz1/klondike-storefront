import getSymbolFromCurrency from 'currency-symbol-map'
const shouldDescriptionIncluded = true
const descriptionAttributes = ['Ingredients', 'Net Carbs', 'Size Chart']
const sizeAttrName = 'size'
const colorAttrName = 'themeColor'

export const extractDataFromItems = items => {
  let sizes = {}

  if (items.length) {
    items.forEach(item => {
      if (item.variants.length) {
        item.variants.forEach(variant => {
          if (variant.name.toLowerCase().includes(sizeAttrName)) {
            sizes[variant.value] = item.sku
          }
        })
      }
    })
  }
  // getSizesInCorrectOrder(getListOfFixedSizes(), sizes)

  // Get sizes in correct order i.e smallest to largest
  if (!(Object.keys(sizes).length === 0 && sizes.constructor === Object)) {
    sizes = getSizesInCorrectOrder(getListOfFixedSizes(), sizes)
  } else {
    sizes = false
  }

  return {
    sizes,
  }
}
export const getListOfFixedSizes = () => {
  return ['XS', 'S', 'M', 'L', 'XL']
}

export const getSizesInCorrectOrder = (correctSizes, providedSizes) => {
  // If provided list of sizes is of numeric form in inches i.e 21, 29 etc then return that as it is.
  // Else if list is of alphabetic form i.e XS, S, M etc then sort it in correct order.
  const sizeKeys = Object.keys(providedSizes)

  let isNumericSizeList = sizeKeys.some(size => /[^a-zA-Z]/.test(size))

  if (isNumericSizeList) {
    return providedSizes
  }

  let sizes = {}
  correctSizes.forEach(size => {
    if (providedSizes.hasOwnProperty(size.toUpperCase())) {
      sizes[size.toUpperCase()] = providedSizes[size.toUpperCase()]
    }
  })
  return sizes
}

export const extractDataFromAttributesByName = (attributes, name) => {
  if (attributes.length) {
    // Condition Check
    const condition = attribute =>
      attribute.name.toLowerCase().includes(name.toLowerCase()) &&
      attribute.display &&
      !attribute.isDefault

    let data = attributes.filter(condition)
    data = data.length > 0 ? data[0].value : false
    return data
  }
  return false
}
export const extractDataFromAttributesByKey = (attributes, name) => {
  if (attributes.length) {
    // Condition Check
    const condition = attribute =>
      attribute.key.toLowerCase().includes(name.toLowerCase())

    let data = attributes.filter(condition)
    data = data.length > 0 ? data[0].value : false
    return data
  }
  return false
}

export const extractImageUrls = images => {
  if (!images.length) return false
  let urls = []
  images.forEach(image => {
    image.source.forEach(src => urls.push(src.url))
  })

  return urls
}
export const extractPrice = price => {
  return {
    basePrice: price && price.base ? price.base.toFixed(2) : 0,
    salePrice: price && price.sale ? price.sale.toFixed(2) : false,
    currency:
      price && price.currency ? getSymbolFromCurrency(price.currency) : '$',
  }
}

export const extractData = (product, items) => {
  // Extracting from product
  const { images, itemId, title, sku, description, category } = product
  const imageUrls = extractImageUrls(images)
  // const { basePrice, salePrice, currency } = extractPrice(price)
  let descriptions = []
  if (shouldDescriptionIncluded) {
    descriptions.push({
      title: 'description',
      description: description,
    })
  }

  descriptionAttributes.forEach(attrName => {
    const result = extractDataFromAttributesByName(product.attributes, attrName)

    if (result) {
      descriptions.push({
        title: attrName,
        description: result,
      })
    }
  })

  const { sizes } = extractDataFromItems(items)
  const totalBars = extractDataFromAttributesByName(
    product.attributes,
    'TotalBars',
  )
  const themeColor = extractDataFromAttributesByName(
    product.attributes,
    colorAttrName,
  )

  const isCustom = extractDataFromAttributesByName(
    product.attributes,
    'isCustom',
  )
  let customCaseS = false

  if (isCustom) {
    try {
      const totalLimit = extractDataFromAttributesByName(
        product.attributes,
        'CS_TotalLimit',
      )
      const title = extractDataFromAttributesByName(
        product.attributes,
        'CS_TitleText',
      )
      const flavorsString = extractDataFromAttributesByName(
        product.attributes,
        'CS_Flavors',
      )

      const flavors = flavorsString.split('|')
      const flavorsQty = []
      flavors.forEach((flavor, i) => {
        const t = flavor.split(',')
        flavorsQty.push({
          flavor: t[0],
          quantity: parseInt(t[1]),
        })
      })

      customCaseS = {
        total: parseInt(totalLimit),
        title,
        flavors: flavorsQty,
      }
    } catch (e) {
      console.log(e)
    }
  }
  const ingredientsSvg = extractDataFromAttributesByName(
    product.attributes,
    'ingredientsSvg',
  )
  const colors = themeColor && themeColor.split('|')

  return {
    title: title || '',
    imageUrls,
    itemId,
    sku: sku || '',
    description,
    descriptions,
    sizes,
    totalBars,
    colors,
    isCustom,
    ingredientsSvg,
    customCaseS,
    category: category || '',
  }
}

export const extractAddresses = apiAddresses => {
  let tempAddresses = []
  apiAddresses.map(
    ({
      name,
      address1,
      address2,
      city,
      country,
      state,
      zipCode,
      phone,
      id,
      isDefault,
    }) => {
      tempAddresses.push({
        firstname: name.first,
        lastname: name.last,
        address1,
        address2,
        city,
        country,
        state,
        zipCode,
        phone: phone.number,
        id,
        isDefault,
      })
    },
  )
  return tempAddresses
}
