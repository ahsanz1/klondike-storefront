import React from 'react'

import WebpagesHeroImages from 'components/molecules/webpages-hero-images'

const WebpageGlobalHeroBanner = props => {
  console.log('hero banner content:', props)
  return <WebpagesHeroImages {...props} />
}

export default WebpageGlobalHeroBanner
