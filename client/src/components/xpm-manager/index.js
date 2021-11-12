import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from '@reach/router'
import { AppContext } from 'libs/context'
import LinerProgress from 'components/atoms/linear-progress'
import ORGANISMS from 'components/organisms/storefront-library'
import mockData from 'libs/mock-data/data'
import { fetchLayout } from 'libs/xpm'

import './styles.scss'

const XPM = props => {
  const { closeModal } = useContext(AppContext)

  const [loading, setLoading] = useState({
    xpm: false,
  })
  const [layout, setLayout] = useState([])
  const location = useLocation()
  const { scrollToTop } = useContext(AppContext)
  useEffect(() => {
    setLoading({
      ...loading,
      xpm: true,
    })
    const layoutUrl = location.pathname || '/not-found'

    fetchLayout({
      url: `${layoutUrl === '/' ? '/home' : layoutUrl}`,
    })
      .then(data => {
        console.log(data)
        setLayout(data)
        scrollToTop()
        closeModal()
      })
      .catch(e => {
        console.log({
          e,
        })
        const mockUrlData = mockData[location.pathname] || []
        scrollToTop()
        setLayout(mockUrlData)
        closeModal()
      })
      .finally(() => {
        setLoading({
          ...loading,
          xpm: false,
        })
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  return (
    <>
      {loading.xpm && <LinerProgress />}
      <div
        className={`xpm-manager ${location.pathname === '/Checkoutsection' &&
          'checkout-xpm'}`}
      >
        {layout.map(xmComponent => {
          const XPM_ID = xmComponent.id
          const ORGANISM = ORGANISMS[XPM_ID]
          const params = {
            ...xmComponent.params,
            id: XPM_ID,
            key: xmComponent._id,
          }

          if (ORGANISM) {
            return <ORGANISM {...params} />
          }
          return (
            <div style={NO_ITEM_FOUND_STYLE} key={xmComponent.id}>
              <h1>{`Component with id: "${xmComponent.id}" not found`}</h1>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default XPM

// DELETE ME
const NO_ITEM_FOUND_STYLE = {
  padding: '50px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderTop: '1px solid #ddd',
}
