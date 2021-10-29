import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'

const TechBlogItem = ({ date, catagory, title, text, image }) => {
  const [textVal, setTextVal] = useState('')
  const [textState, setTextState] = useState(false)
  const [btnText, setBtnText] = useState('')

  useEffect(() => {
    setTextState(!(text.length > 20))
    setBtnText(text.length > 20 ? 'Read More' : '')
    setTextVal(text.length > 20 ? text.substring(0, 20) + '... ' : text)
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
      setTextVal(text.substring(0, 20) + '... ')
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
          <Link className="links">{catagory}</Link>
        </div>
        <div className="item-desc-box">
          <Label className="item-title">{title}</Label>
        </div>
        <div>
          <Label className="paragragh-text">
            {textVal.slice(3, textVal.length - 5)}
            <button className="read-more" onClick={e => changeState(text)}>
              {btnText}
            </button>
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
}

TechBlogItem.propTypes = {
  date: PropTypes.string,
  catagory: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
}

export default TechBlogItem
