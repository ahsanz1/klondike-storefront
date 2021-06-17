import { account, stage, site } from 'libs/general-config'

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
  tempJuicy: {
    'Content-Type': 'application/json',
    'x-site-context': JSON.stringify({
      date: new Date().toISOString(),
      channel: 12,
      account: '5f493c9f30ec2a0007a94fc8',
      stage: 'dev01',
    }),
  },
}

export default HEADERS
