/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from 'react'

const useFadeIn = (duration = 1, delay = 0) => {
  if (typeof duration !== 'number' || typeof delay !== 'number') {
    return
  }
  const element = useRef()
  useEffect(() => {
    if (element.current) {
      const { current } = element
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`
      current.style.opacity = 1
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { ref: element, style: { opacity: 0 } }
}

export default useFadeIn

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const fadeInH1 = useFadeIn(1, 2);
    const fadeInP = useFadeIn(2, 3);
    return (
        <div className="App">
            <h1 {...fadeInH1}>Hello</h1>
            <p {...fadeInP}>
                Lorem ipsum carrots enhanced rebates. snacks
                a pleasure due denouncing the truth! Currently, the less the consequences thereof,
                that nothing in this man of sorrows in the explication thereof, consectetur of them deal corruptly fall of mind, so that,
                the right to take pleasure in with your pleasures.
        </p>
        </div>
    );
}
 */
