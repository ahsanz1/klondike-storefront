import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Link from 'components/atoms/link'
import { AppContext } from 'libs/context'
import Product from 'components/organisms/ourProduct'
import AboutHeader from 'components/organisms/about-header'
import TechResources from 'components/organisms/tech-resources'
import './styles.scss'

const Links = ({
  links = [],
  direction = 'row',
  mobile = true,
  linkStyle = {},
  linkClassName = '',
  style = {},
  className,
}) => {
  console.log('check naaa:', links)
  const { user } = useContext(AppContext)
  return (
    <div
      style={{
        ...style,

        flexDirection: direction,
      }}
      className={`links ${className}`}
    >
      {links.map((link, i) => {
        if (!link.loggedInOnly || (link.loggedInOnly && user.accessToken)) {
          return (
            (!link.mobileOnly || mobile) && (
              <>
                <Link
                  key={i}
                  style={linkStyle}
                  className={linkClassName}
                  to={link.url}
                >
                  {link.label}
                  {(link.label === 'Our Products' && (
                    <div className="showMe">
                      <Product ourProduct={link.productDropDown} />
                    </div>
                  )) ||
                    (link.label === 'About Klondike' && (
                      <div className="showMe">
                        <AboutHeader aboutHeader={link.aboutDropDown} />
                      </div>
                    )) ||
                    (link.label === 'Tech Resources' && (
                      <div className="showMe">
                        <TechResources techResources={link.resourcesDropDown} />
                      </div>
                    ))}
                </Link>
              </>
            )
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

Links.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  direction: PropTypes.string,
  mobile: PropTypes.bool,
  linkStyle: PropTypes.object,
  linkClassName: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default Links
