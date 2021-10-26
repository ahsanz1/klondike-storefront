import React from 'react'
import { render } from 'react-dom'

import { initAxiosInterceptors } from 'libs/utils/axios-interceptors'
import configureStore from 'libs/store'

import Root from 'components/root'

import 'normalize.css'
import 'styles/index.scss'

console.log(`Version: ${APP_VERSION} - ${GIT_COMMIT_HASH}`)
// BuildTest
initAxiosInterceptors()

const store = configureStore()

render(<Root store={store} />, document.getElementById('root'))
