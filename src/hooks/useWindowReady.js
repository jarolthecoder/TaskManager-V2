'use client'

import { useEffect, useState } from "react"

export const useWindowReady = () => {
  const [windowReady, setWindowReady] = useState(false);

  useEffect(() => {
    setWindowReady(true);
  }, []);

  return {
    windowReady
  }
}
