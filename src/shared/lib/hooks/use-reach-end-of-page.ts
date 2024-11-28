"use client"

import { useEffect } from "react";

interface ReachEndOfPageProps {
  onPageEndNear: () => void
  nearPx?: number
}

export function useReachEndOfPage(props: ReachEndOfPageProps) {
  const { onPageEndNear, nearPx = 200 } = props

  useEffect(() => {
    function onEndReached() {
      const isPageEndNear = window.scrollY + window.innerHeight >= document.body.offsetHeight - nearPx
      if (isPageEndNear) {
        onPageEndNear()
      }
    }

    window.addEventListener('scroll', onEndReached)

    return () => {
      window.removeEventListener('scroll', onEndReached)
    }
  }, [onPageEndNear, nearPx])
}
