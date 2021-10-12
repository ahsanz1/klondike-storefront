import React, { useEffect, useState } from 'react'
import { Router } from '@reach/router'

import Splash from 'components/molecules/splash'
import AppShell from 'components/organisms/app-shell'
import PreviewPage from 'components/pages/xm-preview'
import XPM from 'components/xpm-manager'
import { AppProvider } from 'libs/context/index'

// import lazyLoad from 'libs/utils/lazy-loading'
// import loadable from '@loadable/component'
import { fetchGc } from 'libs/xpm'
import { saveItem } from 'libs/services/localStorage'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'antd/dist/antd.css'

// const PreviewPage = lazyLoad(() => import('components/pages/cmsPreview'));
// const XPM = lazyLoad(() => import('components/xpm-manager'))
// const XPM = loadable(() => import('components/xpm-manager'))

const App = () => {
  const [loading, setLoading] = useState({
    splash: false,
  })
  useEffect(() => {
    // setTimeout(() => {
    fetchGc()
      .then(gcData => {
        handleGlobalLayout(gcData)
      })
      .catch(e => {
        console.log({
          e,
        })
      })
      .finally(() => {
        setLoading({
          ...loading,
          gc: false,
          splash: false,
        })
      })
    // }, 2000)
    setLoading({
      ...loading,
      gc: true,
    })
  }, [])
  const handleGlobalLayout = gcData => {
    saveItem('gc', JSON.stringify(gcData))
  }

  if (loading.splash) {
    return <Splash />
  }

  return (
    <AppProvider>
      <AppShell>
        <Router>
          <XPM path="/*" />
          <PreviewPage exact path="/cms/preview" />
        </Router>
      </AppShell>
    </AppProvider>
  )
}

export default App
