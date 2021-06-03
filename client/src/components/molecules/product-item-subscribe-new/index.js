import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton, Input } from 'antd'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { updateSubscription } from 'libs/services/api/subscriptions.api'
import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import Button from 'components/atoms/button'
import { useNavigate } from '@reach/router'

import './styles.scss'

const validationSchema = Yup.object().shape({
  // itemCount: Yup.number(),
  itemQuanity: Yup.number()
    .min(1, 'minimum quantity required is 1')
    .required('Enter a product quantity'),
  itemschedule: Yup.string().required('Select schedule'),
})

const ProductItemSubscribeNew = ({ PSusbcribeNewItem, plans }) => {
  console.log({ PSusbcribeNewItem })
  const { title, price, image, itemId, sku, subId } = PSusbcribeNewItem
  plans && console.log({ plans })
  const initialValues = {
    // itemCount: 0,
    itemQuanity: 1,
    itemschedule: plans && plans.length && plans[0].value,
  }

  const navigate = useNavigate()

  const handleSave = async values => {
    console.log(values)
    const updatePayload = {
      itemID: itemId.toString(),
      quantity: values.itemQuanity,
      frequency: Number(values.itemschedule.slice(0, 1)),
      frequencyType: values.itemschedule.slice(2),
    }
    const updateCall = await updateSubscription(updatePayload, subId)
    updateCall &&
      !updateCall.error &&
      navigate('/account/subscriptionOrderDetails')
  }

  const renderError = (error, touched) =>
    error && touched && <Label className="subs-error-p">{error}</Label>
  return (
    <div className="product-item-swap">
      <figure className="product-item-image">
        {image ? (
          <Image src={image} alt={title} className="button-image" />
        ) : (
          <Skeleton.Image />
        )}
      </figure>
      <div className="product-item-detail">
        <h3 className="product-item-title">{title}</h3>
        <Label className="product-item-p">{price}</Label>
        <Link to={`/products?sku=${sku}`} className="view-store">
          View on store
        </Link>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSave}
          enableReinitialize
          validationSchema={validationSchema}
        >
          {({
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* <div className="form-group">
              <Label className="product-label-p">Bar Count</Label>
              <Input
                placeholder="Bar Count"
                name="itemCount"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
              />
              {renderError(errors.itemCount, touched.itemCount)}
            </div> */}
              <div className="form-group">
                <Label className="product-label-p">Bar Quantity</Label>
                <Input
                  placeholder="Bar Quantity"
                  name="itemQuanity"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  value={values.itemQuanity}
                />
                {renderError(errors.itemQuanity, touched.itemQuanity)}
              </div>
              <div className="form-group">
                <Label className="product-label-p">Delivery Schedule</Label>
                <div className="select-box">
                  <select
                    name="itemschedule"
                    className="form-control-select"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    {plans &&
                      plans.length &&
                      plans.map((plan, i) => (
                        <option value={plan.label} key={`item-schedule-${i}`}>
                          {plan.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <Button
                className="btn-swap"
                type="submit"
                onClick={() => handleSave(values)}
              >
                Swap product
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

ProductItemSubscribeNew.defaultProps = {
  PSusbcribeNewItem: null,
  horizontal: false,
}

ProductItemSubscribeNew.propTypes = {
  PSusbcribeNewItem: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    itemId: PropTypes.string,
    sku: PropTypes.string,
    subId: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
    itemScheduleList: PropTypes.array,
  }),
  plans: PropTypes.array,
}

export default ProductItemSubscribeNew
