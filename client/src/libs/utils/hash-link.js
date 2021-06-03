/* eslint-disable */
// reference: https://github.com/rafgraph/react-router-hash-link
import React from 'react'

let hashFragment = ''
let observer = null
let asyncTimerId = null
let scrollFunction = null

function reset() {
  hashFragment = ''
  if (observer !== null) observer.disconnect()
  if (asyncTimerId !== null) {
    window.clearTimeout(asyncTimerId)
    asyncTimerId = null
  }
}

function isInteractiveElement(element) {
  const formTags = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']
  const linkTags = ['A', 'AREA']
  return (
    (formTags.includes(element.tagName) && !element.hasAttribute('disabled')) ||
    (linkTags.includes(element.tagName) && element.hasAttribute('href'))
  )
}

function getElAndScroll() {
  let element = null
  if (hashFragment === '#') {
    element = document.body
  } else {
    const id = hashFragment.replace('#', '')
    element = document.getElementById(id)
    if (element === null && hashFragment === '#top') {
      element = document.body
    }
  }

  if (element !== null) {
    scrollFunction(element)
    let originalTabIndex = element.getAttribute('tabindex')
    if (originalTabIndex === null && !isInteractiveElement(element)) {
      element.setAttribute('tabindex', -1)
    }
    element.focus({ preventScroll: true })
    if (originalTabIndex === null && !isInteractiveElement(element)) {
      element.blur()
      element.removeAttribute('tabindex')
    }

    reset()
    return true
  }
  return false
}

function hashLinkScroll(timeout) {
  window.setTimeout(() => {
    if (getElAndScroll() === false) {
      if (observer === null) {
        observer = new MutationObserver(getElAndScroll)
      }
      observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
      })
      asyncTimerId = window.setTimeout(() => {
        reset()
      }, timeout || 10000)
    }
  }, 0)
}

export function genericHashLink(As) {
  return React.forwardRef((props, ref) => {
    let linkHash = ''
    if (typeof props.to === 'string' && props.to.includes('#')) {
      linkHash = `#${props.to
        .split('#')
        .slice(1)
        .join('#')}`
    } else if (
      typeof props.to === 'object' &&
      typeof props.to.hash === 'string'
    ) {
      linkHash = props.to.hash
    }

    const passDownProps = {}

    function handleClick(e) {
      reset()
      hashFragment = props.elementId ? `#${props.elementId}` : linkHash
      if (props.onClick) props.onClick(e)
      if (hashFragment !== '') {
        scrollFunction =
          props.scroll ||
          (el =>
            props.smooth
              ? el.scrollIntoView({
                  block: 'center',
                  inline: 'nearest',
                  behavior: 'smooth',
                })
              : el.scrollIntoView({
                  block: 'center',
                  inline: 'nearest',
                  behavior: 'smooth',
                }))
        hashLinkScroll(props.timeout)
      }
    }
    const { scroll, smooth, timeout, elementId, ...filteredProps } = props
    return (
      <As {...passDownProps} {...filteredProps} onClick={handleClick} ref={ref}>
        {props.children}
      </As>
    )
  })
}
