import type { FC } from "react"
import styles from './styles/link.module.scss'
import { Icon } from '@/components/icon/icon'

const iconSizeMap: Record<NonNullable<LinkProps['size']>, number> = {
  sm: 10,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
}

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /**
   * The visible link text.
   */
  children: string
  /**
   * The URL to navigate to.
   */
  href: string
  /**
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Renders a chevron icon to the left of the text.
   */
  showLeftIcon?: boolean
  /**
   * Renders a chevron icon to the right of the text.
   */
  showRightIcon?: boolean
}

/**
 * Navigational link that renders an `<a>` element.
 * Use {@link LinkButton} instead when the action triggers behavior rather than navigating to a URL.
 *
 * @param props - {@link LinkProps}
 */
export const Link: FC<LinkProps> = ({
  children,
  size = 'md',
  showLeftIcon = false,
  showRightIcon = false,
  className,
  ...rest
}) => {
  const classNames = `${styles['link']} ${styles[size]}${className ? ` ${className}` : ''}`
  return (
    <a {...rest} className={classNames}>
      {showLeftIcon && <Icon name="ChevronLeft" size={iconSizeMap[size]} color="currentColor" />}
      {children}
      {showRightIcon && <Icon name="ChevronRight" size={iconSizeMap[size]} color="currentColor" />}
    </a>
  )
}
