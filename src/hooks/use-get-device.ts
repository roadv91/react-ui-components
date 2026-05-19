import { useState, useEffect } from 'react'

type Device = 'mobile' | 'tablet' | 'desktop'

const getDevice = (): Device => {
  if (window.matchMedia('(max-width: 767px)').matches) return 'mobile'
  if (window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches) return 'tablet'
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
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1199px)')

    const handleChange = () => setDevice(getDevice())

    mobileQuery.addEventListener('change', handleChange)
    tabletQuery.addEventListener('change', handleChange)

    return () => {
      mobileQuery.removeEventListener('change', handleChange)
      tabletQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return device
}
