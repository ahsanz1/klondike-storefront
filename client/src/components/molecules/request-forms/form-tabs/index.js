import React from 'react'
import PropTypes from 'prop-types'
import Container from 'components/molecules/container'
import RequestFormTab from 'components/molecules/request-forms/form-tab'
import './styles.scss'

const RequestFormTabs = ({ data = {}, onTabChange }) => {
  return (
    <Container color="#fff" className="form-tabs">
      <div className="form-tabs__wrapper">
        {data.map(({ title, buttonLabel }, index) => (
          <RequestFormTab
            key={index}
            title={title}
            buttonLabel={buttonLabel}
            index={index}
            onTabChange={onTabChange}
          />
        ))}
      </div>
    </Container>
  )
}

RequestFormTabs.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onTabChange: PropTypes.func,
}

export default RequestFormTabs
