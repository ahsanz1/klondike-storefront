import { useRef } from 'react'

const useFullscreen = callback => {
  const element = useRef()
  const runCb = isFull => {
    if (callback && typeof callback === 'function') {
      callback(isFull)
    }
  }
  const triggerFull = () => {
    if (element.current) {
      if (element.current.requestFullscreen) {
        element.current.requestFullscreen()
      } else if (element.current.mozRequestFullscreen) {
        element.current.mozRequestFullscreen()
      } else if (element.current.webkitRequestFullscreen) {
        element.current.webkitRequestFullscreen()
      } else if (element.current.msRequestFullscreen) {
        element.current.msRequestFullscreen()
      }
      runCb(true)
    }
  }
  const exitFull = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    runCb(false)
  }
  return { element, triggerFull, exitFull }
}

export default useFullscreen

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const onFullS = (isFull) => {
        console.log(isFull ? "We are full" : "We are small");
    };
    const { element, triggerFull, exitFull } = useFullscreen(onFullS);
    return (
        <div className="App">
            <h1>Hello</h1>
            <div ref={element}>
                <img
                    src="https://mblogthumb-phinf.pstatic.net/MjAxODAyMDZfMTk0/MDAxNTE3OTA5NDQ3MjYy._A5goNQD2IUU1ZVepodSGGYRkzsj6Qzvo-7N40S-OzMg.ITZqPfqEABCTd4tuLxQrMXY-nRU40sD2tMpDZRkA_34g.JPEG.xbeebee/%EC%9B%B0%EC%8B%9C%EC%BD%94%EA%B8%B0.jpg?type=w800"
                    alt="img"
                />
                <button onClick={exitFull}>Exit Fullscreen</button>
            </div>
            <button onClick={triggerFull}>Make Fullscreen</button>
        </div>
    );
}
 */
