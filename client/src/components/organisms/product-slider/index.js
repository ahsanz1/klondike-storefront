import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import Container from 'components/molecules/container'
import ProductNavigation from 'components/molecules/product-navigation'
import ProductInnerSlider from 'components/molecules/product-inner-slider'

const ProductSlider = props => {
  const [backgroundColor, setBackgroundColor] = useState('')
  const [borderColor, setBorderColor] = useState('')
  const [buttonData, setButtonData] = useState([])
  const [productData, setProductData] = useState([])
  const [newId, setNewId] = useState(null)

  useEffect(() => {
    const { productsData = [] } = props
    const { id = null } = props.productsData[0]
    const data = props.productsData[0].products
    setBackgroundColor(data[0].bgColor)
    setBorderColor(data[0].borderColor)
    setNewId(id)
    setButtonData(
      productsData.map(item => {
        return { btnText: item.btnText, btnId: item.btnId }
      }),
    )
    setProductData(data)
  }, [props])

  const buttonHandler = id => {
    const newData = props.productsData.find(item => item.id === id)
    console.log('p-slider', newData)
    setNewId(id)
    setProductData(newData.products)
  }

  return (
    <Container color={backgroundColor} maxWidth="2560px">
      {productData && (
        <Fragment>
          <ProductNavigation
            newId={newId}
            buttonData={buttonData}
            hoverColor={borderColor}
            onClick={buttonHandler}
          />

          <ProductInnerSlider
            data={productData}
            setBackgroundColor={setBackgroundColor}
            setBorderColor={setBorderColor}
          />
        </Fragment>
      )}
    </Container>
  )
}

ProductSlider.propTypes = {
  productsData: PropTypes.array,
}

export default ProductSlider
