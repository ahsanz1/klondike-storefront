import { account, stage, site, xApiKey } from 'libs/general-config'

const HEADERS = {
  common: {
    'Content-Type': 'application/json',
    'x-site-context': JSON.stringify({
      date: new Date().toISOString(),
      channel: 12,
      account: account,
      stage: stage,
    }),
  },
  klayvio: {
    'Content-Type': 'application/json',
    'x-site-context': JSON.stringify({
      date: new Date().toISOString(),
      channel: 12,
      account: account,
      stage: stage,
    }),
    'x-api-key': xApiKey,
  },
  special: {
    'Content-Type': 'application/json',
    'x-site-context': JSON.stringify({
      date: new Date().toISOString(),
      channel: 12,
      account: account,
      stage: stage,
      site: site,
    }),
  },
}

export default HEADERS
