import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'

const TechBlogItem = ({ date, catagory, title, text, image }) => {
  // const [textState, setTextState] = useState('')

  // useEffect(() => {
  //   setTextState({
  //     text: 'Read More',
  //     showText: text.length > 20,
  //     paragraph: text.length > 20 ? text.substring(0, 20) + '...' : text,
  //   })
  // }, [])

  // const changeState = (e) => {
  //   let activeState = textState

  //   if (activeState === 'Read More') {
  //     setTextState({
  //       text: 'View Less',
  //       showText: true,
  //       paragraph: e,
  //     })
  //   } else {
  //     setTextState({
  //       text: 'Read More',
  //       showText: false,
  //       paragraph: e.substring(0, 20) + '...',
  //     })
  //   }
  // }

  return (
    <div className="tech-blog-item">
      <div>
        <img className="item-image" src={image} alt="" />
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
            {text} <Link className="read-more">Read More</Link>
          </Label>
          {/* <span className="read-more" onClick={e => changeState(e)}>
            {textState.showText ? textState.text : ''}
          </span> */}
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
