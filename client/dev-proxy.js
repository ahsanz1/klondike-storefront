// const proxyConfig = {}

// An example
const proxyConfig = {
  // a request to `/api`(or `/api/**/*`) will proxy to `http://localhost:3000/api`
  //   '/api': 'http://localhost:3000',

  // a request to `/graphql`(or `/graphql/**/*`) will proxy to `http://localhost:3000/my-graphql`
  //   '/graphql': {
  //     target: 'http://localhost:3000',
  //     pathRewrite: {
  //       '^/graphql': '/my-graphql',
  //     },
  //   },

  // proxy and change origin
  '/ext-stripe/payment-method': {
    target: 'https://dev01-apigw.iqbarsandbox.fabric.zone',
  },
}

module.exports = proxyConfig
