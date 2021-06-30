import axios from 'axios'
import delve from 'dlv'
import {
  xpmApiDomain,
  account,
  stage,
  channel,
  site,
} from 'libs/general-config'

// const account = '5fc78dfc6135050007191290'
// const stage = 'sandbox'

export const fetchLayout = async ({ url }) => {
  let data = []
  const response = await axios.get(
    `${xpmApiDomain}/api-xpm/page/livrl=${url}`,
    {
      headers: {
        'x-site-context': `{"account":"${account}","stage":"${stage}","site": "${site}", "channel": ${channel},"date":"${new Date()}"}`,
      },
    },
  )

  if (
    response &&
    response.status === 200 &&
    delve(response, 'data.status_code', '') === 200
  ) {
    data = delve(response, 'data.data.version.0.components', [])
  }
  return data
}

export const fetchGc = async () => {
  let data = []
  const response = await axios.get(
    `${xpmApiDomain}/api-xpm/glol-component/live`,
    {
      headers: {
        'x-site-context': `{"account":"${account}","stage":"${stage}","site": "${site}", "channel": ${channel},"date":"${new Date()}"}`,
      },
    },
  )
  if (response && response.status === 200) {
    data = response.data || []
  }
  return data
}
