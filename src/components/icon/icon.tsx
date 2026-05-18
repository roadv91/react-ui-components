import type { FC } from "react"
import { iconComponentsMap } from './features/icon-components-map'

export type IconName = 'ChevronLeft' | 'ChevronRight' | 'Dismiss' | 'Error' | 'Info' | 'Success' | 'Warning'

export interface IconProps {
  name: IconName
  /**
   * Size in pixels applied to both width and height of the SVG.
   * @default 24
   */
  size?: number
  /**
   * Fill color of the SVG. Accepts any valid CSS color value.
   * Pass `"currentColor"` to inherit color from CSS.
   * @default 'black'
   */
  color?: string
  /**
   * Marks the icon as decorative, hiding it from screen readers.
   * Set to `false` when the icon is used standalone without accompanying text,
   * and provide an accessible label via `aria-label` on a parent element.
   * @default true
   */
  decorative?: boolean
}

/**
 * @param props - {@link IconProps}
 */
export const Icon: FC<IconProps> = ({ name, size = 24, color = 'black', decorative = true }) => {
  const PathComponent = iconComponentsMap[name]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden={decorative || undefined}>
      <PathComponent />
    </svg>
  )
}
