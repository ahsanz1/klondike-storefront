import './style.scss'
import React, { useEffect, useState } from 'react'
// import PCPBottom from 'components/organisms/pcpBottom'
import // PcpBottom,
//  technicalBanner
'libs/data/data'
// import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import Techtabllist from '../Technical-tablist'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'
// import { techBlogData } from 'components/organisms/tech-news-page/data'
import TechBlogItem from 'components/organisms/tech-news-page/tech-blog-item'
import { Pagination } from 'antd'

const TechNews = ({
  categories,
  techBlogData,
  mainHeading,
  categoryHeading,
}) => {
  const perPageItems = 10
  // let [activeItems, setActiveItems] = useState([])

  useEffect(() => {
    setPaginationData(1)
  }, [])

  const setPaginationData = page => {
    let startIndex = page * perPageItems - perPageItems
    let endIndex = startIndex + perPageItems

    let data = techBlogData
    data = data.slice(startIndex, endIndex)
    setActiveCatagoryData(data)
  }
  const catagory = techBlogData.map(item => {
    return item.catagory.toUpperCase()
  })
  const toFindDuplicates = arry =>
    arry.filter((item, index) => arry.indexOf(item) === index)
  const duplicateElement = toFindDuplicates(catagory)
  const [activeCatagoryData, setActiveCatagoryData] = useState(techBlogData)
  const handleCatagory = catagory => {
    let data = techBlogData.filter(item => {
      return item.catagory.toUpperCase() === catagory
    })
    setActiveCatagoryData(data)
    data = data.filter(item => item.catagory.toUpperCase() === catagory)
  }
  return (
    <>
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
              <Label className="tech-news-title">{mainHeading}</Label>
              <Label className="pages-title">{categoryHeading}</Label>
              <div className="catagory-links">
                {duplicateElement &&
                  duplicateElement.length > 0 &&
                  duplicateElement.map((item, i) => (
                    <Button
                      key={i}
                      className="links"
                      to={`/tech-resources/tech-news-blog`}
                      onClick={() => handleCatagory(item)}
                    >
                      {item}
                    </Button>
                  ))}
              </div>
              <div className="blog-item">
                <div className="page-no">
                  <Pagination
                    defaultCurrent={1}
                    pageSize={perPageItems}
                    total={techBlogData.length}
                    onChange={e => setPaginationData(e)}
                  />
                </div>

                {activeCatagoryData &&
                  activeCatagoryData.length > 0 &&
                  activeCatagoryData.map((item, i) => (
                    <TechBlogItem
                      key={i}
                      {...item}
                      handleCatagory={handleCatagory}
                    />
                  ))}
                {/* {activeItems.map((item, i) => (
                  <TechBlogItem key={i} {...item} />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="technical-bottom">
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
      </div> */}
    </>
  )
}

TechNews.DefaultProps = {
  categories: [],
}

TechNews.propTypes = {
  categories: PropTypes.array,
  techBlogData: PropTypes.array,
  mainHeading: PropTypes.string,
  categoryHeading: PropTypes.string,
}

export default TechNews
