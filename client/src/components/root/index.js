import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router } from '@reach/router'
import { hot } from 'react-hot-loader/root'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import App from 'components/app'
import Inspect from 'inspx'

// import loadable from '@loadable/component'

// const App = loadable(() => import('components/app'))

Sentry.init({
  dsn:
    'https://8fc5cd7259e64e65a7cc111e4536b62c@o554954.ingest.sentry.io/5725627',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

const Root = ({ store }) => (
  <Inspect disabled={process.env.INSPX_ENV !== 'yes'}>
    <Provider store={store}>
      <Router>
        <App path="/*" />
      </Router>
    </Provider>
  </Inspect>
)
Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default hot(Root)
