import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'antd'
import RequestForm from 'components/molecules/request-forms/request-form'
import RequestFormTabs from 'components/molecules/request-forms/form-tabs'
import './styles.scss'
const { Panel } = Collapse

const RequestForms = ({ requestForms = [], formBgColor = '' }) => {
  const [formIndex, setFormIndex] = useState(0)

  const onTabChange = index => {
    const newFormIndex = formIndex === index + 1 ? 0 : index + 1
    setFormIndex(newFormIndex)
  }
  const onFormSubmit = (data, index) => {
    console.log(data, index)
    const klaviyoObj = {
      $event_id: Date.now(),
      ...data,
    }

    if (window && window._learnq) {
      window._learnq.push(['track', 'Request Forms', klaviyoObj])
    }
  }
  return (
    <div className="request-forms">
      <RequestFormTabs data={requestForms} onTabChange={onTabChange} />
      <Collapse
        style={{
          backgroundColor: formBgColor,
        }}
        ghost
        expandIcon={() => null}
        bordered={false}
        activeKey={formIndex}
        className="request-forms__accordion"
      >
        {requestForms.map((form, formsIndex) => (
          <Panel header={null} key={formsIndex + 1}>
            <RequestForm
              key={formsIndex}
              form={form}
              onFormSubmit={onFormSubmit}
              formsIndex={formsIndex}
              formBgColor={formBgColor}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}

RequestForms.propTypes = {
  requestForms: PropTypes.arrayOf(PropTypes.object),
  formBgColor: PropTypes.string,
}

export default RequestForms
