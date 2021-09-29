import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'

const TechBlogItem = ({ date, catagory, title, text, image }) => {
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
