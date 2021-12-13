import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

const TechBlogItem = ({
  date,
  catagory,
  text,
  image,
  descHeading,
  handleCatagory,
}) => {
  console.log('readmoretext', text)
  const [textVal, setTextVal] = useState('')
  const [textState, setTextState] = useState(false)
  const [btnText, setBtnText] = useState('')

  let textLength = 220

  useEffect(() => {
    setTextState(!(text.length > textLength))
    setBtnText(text.length > textLength ? 'Read More' : '')
    setTextVal(text.length > textLength ? text.substring(0, textLength) : text)
  }, [])

  const changeState = text => {
    let activeState = textState

    if (activeState === false) {
      setTextVal(text)
      setTextState(true)
      setBtnText('View Less')
    } else {
      setTextState(false)
      setBtnText('Read More')
      setTextVal(text.substring(0, textLength))
    }
  }

  return (
    <div className="tech-blog-item">
      <div>
        <img className="item-image" src={image.url} alt="" />
      </div>
      <div className="item-descriptions">
        <div className="item-top-bar">
          <Label className="item-date">{date}</Label>
          <button
            onClick={() => handleCatagory(catagory.toUpperCase())}
            className="links"
          >
            {catagory}
          </button>
        </div>
        <div className="item-desc-box">
          <Label className="item-title">{descHeading}</Label>
        </div>
        <div>
          <Label className="paragragh-text">
            <span>{textVal.slice(0, textVal.length)}</span>
            <span>{!textState ? ' ...' : '.'}</span>
            <Button className="read-more" onClick={e => changeState(text)}>
              {btnText}
            </Button>
          </Label>
        </div>
      </div>
    </div>
  )
}

TechBlogItem.DefaultProps = {
  date: '',
  catagory: '',
  title: '',
  text: '',
  image: '',
  descHeading: '',
  handleCatagory: () => {},
}

TechBlogItem.propTypes = {
  date: PropTypes.string,
  catagory: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  descHeading: PropTypes.string,
  handleCatagory: PropTypes.func,
}

export default TechBlogItem
