import { account, stage, site } from 'libs/general-config'

const HEADERS = {
  common: {
    'Content-Type': 'application/json',
    'x-site-context': JSON.stringify({
      date: new Date().toISOString(), // '2021-04-05T21:18:35.927Z',
      channel: 12,
      account: account,
      stage: stage,
    }),
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
  canada: {
    'Content-Type': 'application/json',
    'x-site-context': JSON.stringify({
      date: new Date().toISOString(), // '2021-04-05T21:18:35.927Z',
      channel: 13,
      account: account,
      stage: stage,
    }),
  },
}

export default HEADERS
