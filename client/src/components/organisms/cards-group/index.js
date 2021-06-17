import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import GeneralCard from 'components/molecules/general-card'
import './style.scss'

const CardsGroup = ({
  bgColor = '#fff',
  heading = '',
  subHeading = '',
  cardsData = [],
  imageMaxWidth = '100%',
  cardItemsInRow = 3,
}) => {
  return (
    <>
      <div
        className="cg-wrap"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <div className="cg-section">
          <div className="card-contanier">
            <h3 className="card-heading">{heading}</h3>
            <p className="bigP">{subHeading}</p>
            <Row>
              {cardsData &&
                cardsData.map((card, index) => (
                  <Col key={index} xs={24} sm={12} md={24 / cardItemsInRow}>
                    <GeneralCard
                      image={card.image}
                      primaryText={card.primaryText}
                      secondaryText={card.secondaryText}
                      styles={{ maxWidth: imageMaxWidth }}
                      index={index}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

CardsGroup.propTypes = {
  bgColor: PropTypes.string,
  heading: PropTypes.string,
  cardsData: PropTypes.arrayOf(PropTypes.object),
  imageMaxWidth: PropTypes.string,
  cardItemsInRow: PropTypes.number,
  subHeading: PropTypes.string,
}

export default CardsGroup
