/*
 * This page is used by the CMS to show a preview of a layout.
 */
import React from 'react'
import { Preview } from '@teamfabric/xpm'

import Components from 'components/organisms/storefront-library'

const PreviewPage = () => {
  console.log({
    Components,
  })
  return (
    <>
      <Preview componentsById={Components} />
    </>
  )
}

export default PreviewPage
