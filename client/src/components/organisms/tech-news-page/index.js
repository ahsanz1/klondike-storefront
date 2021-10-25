import './style.scss'
import React from 'react'
import PCPBottom from 'components/organisms/pcpBottom'
import { PcpBottom, technicalBanner } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import Techtabllist from '../Technical-tablist'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'

import { techBlogData } from 'components/organisms/tech-news-page/data'
import TechBlogItem from 'components/organisms/tech-news-page/tech-blog-item'
const TechNews = ({ categories }) => {
  return (
    <>
      <WebpagesHeroImages {...technicalBanner} />

      <div className="technacil-wriper">
        <div className="custom-tech">
          <Techtabllist
            className="warranty-tablist"
            itemName="Tech/News Blog"
            categories={categories}
          />
        </div>
        <div className="technical-data">
          <div className="tech-news-page-wrap">
            <div className="tech-news-titles">
              <Label className="tech-news-title">TECH/NEWS BLOG</Label>
              <Label className="pages-title">TOPICS</Label>
              <div className="catagory-links">
                <Link className="links">Uncategorized</Link>
                <Link className="links">Industry News</Link>
                <Link className="links">Hydraulic Fluids</Link>
                <Link className="links">Engine Oils</Link>
                <Link className="links">Greases</Link>
                <Link className="links">Biodegradable Lubricants</Link>
              </div>
              <div className="blog-item">
                <div className="page-no">
                  <div className="page-no-box">
                    <Label>1</Label>
                  </div>
                  <div className="page-no-box">
                    <Label>2</Label>
                  </div>
                  <div className="page-no-box">
                    <Label>3</Label>
                  </div>
                  <div className="page-no-box">
                    <Label>4</Label>
                  </div>
                </div>
                {techBlogData.map((item, i) => (
                  <TechBlogItem key={i} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="technical-bottom">
        <div className="technical-bottom-section">
          {PcpBottom &&
            PcpBottom.map((item, i) => (
              <>
                <PCPBottom
                  image={item.image}
                  button={item.button}
                  mobileButton={item.mobileButton}
                  url={item.url}
                />
              </>
            ))}
        </div>
      </div>
    </>
  )
}

TechNews.DefaultProps = {
  categories: [],
}

TechNews.propTypes = {
  categories: PropTypes.array,
}

export default TechNews
