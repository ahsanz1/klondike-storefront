import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from 'libs/context'
import Link from 'components/atoms/link'
import './style.scss'
import { string } from 'yup/lib/locale'

const DistributionProduct = ({ LubricantContent, distributionheading }) => {
  const { setPlpRedirect } = useContext(AppContext)
  return (
    <>
      <div className="distribute-wraper">
        {distributionheading && (
          <h1 className="distribute-heading">{distributionheading}</h1>
        )}
      </div>
      {LubricantContent &&
        LubricantContent.length > 0 &&
        LubricantContent.map((content, i) => (
          <div className="distribution-wraper" key={i}>
            <div
              className={
                content.outerboreder ? 'outer-border' : 'deleteouter-border'
              }
            >
              <div className="imag-wrapper">
                <img src={content.image.url} alt="" />
              </div>
            </div>

            <div className="text-wrapper">
              <h1>{content.headingtext}</h1>

              <p>{content.text}</p>

              <Link to={content.redirecturl}>
                <button
                  onClick={() =>
                    setPlpRedirect(
                      content && content.redirecturl && content.redirecturl,
                    )
                  }
                >
                  {content.btntext}
                </button>
              </Link>
            </div>
          </div>
        ))}
    </>
  )
}

const { object } = PropTypes
DistributionProduct.propTypes = {
  LubricantContent: object,
  distributionheading: string,
}

export default DistributionProduct
