"use client"
import { useEffect, useState } from "react"

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window?.innerWidth,
    height: window?.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      })
    }

    window?.addEventListener("resize", handleResize)
    return () => window?.removeEventListener("resize", handleResize)
  }, [])
  

  return {
    winWidth: windowSize.width,
    winHeight: windowSize.height,
  }
}
