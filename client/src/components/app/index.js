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
import ErrorComponent from 'components/organisms/error-component'
import { ErrorBoundary } from 'react-error-boundary'
import Cookies from 'js-cookie'

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
    const script = document.createElement('script')
    script.src = '//code.tidio.co/kwotmb3primfdn61l1s7yacamtcileuq.js'
    script.async = true
    document.body.appendChild(script)

    const currentLang = Cookies.get('googtrans') || null
    if (!currentLang) {
      Cookies.set('googtrans', '/auto/en')
    }
  }, [])

  const handleGlobalLayout = gcData => {
    saveItem('gc', JSON.stringify(gcData))
  }

  if (loading.splash) {
    return <Splash />
  }

  const logError = error => {
    console.log('Error!', error)
  }

  return (
    <AppProvider>
      <ErrorBoundary FallbackComponent={ErrorComponent} onError={logError}>
        <AppShell>
          <Router>
            <XPM path="/*" />
            <PreviewPage exact path="/cms/preview" />
          </Router>
        </AppShell>
      </ErrorBoundary>
    </AppProvider>
  )
}

export default App
