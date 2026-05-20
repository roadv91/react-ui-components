import { useState, useEffect } from 'react'

type Device = 'mobile' | 'tablet' | 'desktop'

// if typeof window === undefined, then we're not on a browser

const mobileQuery = typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)') : null
const tabletQuery = typeof window !== 'undefined' ? window.matchMedia('(max-width: 1199px)') : null

const getDevice = (): Device => {
  if (mobileQuery?.matches) return 'mobile'
  if (tabletQuery?.matches) return 'tablet'
  return 'desktop'
}

/**
 * Returns the current device type based on viewport width.
 * Updates reactively when the viewport crosses a breakpoint.
 *
 * - `'mobile'` — up to 767px
 * - `'tablet'` — 768px to 1199px
 * - `'desktop'` — 1200px and above
 */
export const useGetDevice = (): Device => {
  const [device, setDevice] = useState<Device>(getDevice)

  useEffect(() => {
    const handleChange = () => setDevice(getDevice())

    handleChange() // sync state on mount in case of resize before listeners attached

    mobileQuery?.addEventListener('change', handleChange)
    tabletQuery?.addEventListener('change', handleChange)

    return () => {
      mobileQuery?.removeEventListener('change', handleChange)
      tabletQuery?.removeEventListener('change', handleChange)
    }
  }, [])

  return device
}
