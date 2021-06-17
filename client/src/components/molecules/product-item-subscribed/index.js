import React, { useContext } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import './styles.scss'

const ProductItemSubscribed = ({ linkable, horizontal, separate }) => {
  const {
    subscribedItemData: {
      price,
      image,
      title,
      quantity,
      frequency,
      frequencyType,
      itemId,
    },
  } = useContext(AppContext)

  const renderLink = text => (
    <Link to={`/account/subscription/swap/detail?itemId=${itemId}`}>
      {text}
    </Link>
  )

  const renderImage = () =>
    linkable ? (
      <Link to={`/account/subscription/swap/detail?itemId=${itemId}`}>
        <Image src={image} alt={title} className="button-image" />
      </Link>
    ) : (
      <Image src={image} alt={'image.alt'} className="button-image" />
    )

  return (
    <div
      className={cx('subs-product-item', {
        horizontal: horizontal,
        separate: separate,
      })}
    >
      <figure className="subs-product-image">{renderImage(image)}</figure>
      <div className="subs-product-detail">
        <h3 className="subs-product-title">
          {linkable ? renderLink(title) : title}
        </h3>
        <Label className="subs-product-p">(Subscription)</Label>
        <Label className="subs-product-p">
          {quantity}/{frequency}/{frequencyType}/36 bars
        </Label>
        <Label className="subs-product-p">{renderLink(price)}</Label>
      </div>
    </div>
  )
}

ProductItemSubscribed.defaultProps = {
  item: null,
  linkable: false,
  horizontal: false,
  separate: false,
}

ProductItemSubscribed.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
  subscriptionData: PropTypes.object,
  linkable: PropTypes.bool,
  horizontal: PropTypes.bool,
  separate: PropTypes.bool,
}

export default ProductItemSubscribed
