import type { FC } from "react"
import styles from './styles/link-button.module.scss'
import { Icon } from '@/components/icon/icon'

const iconSizeMap: Record<NonNullable<LinkButtonProps['size']>, number> = {
  sm: 10,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
}

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visible link text.
   */
  children: string
  /**
   * Handler called when the button is clicked.
   */
  onClick: React.MouseEventHandler<HTMLButtonElement>
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
 * Looks like a link but triggers an action instead of navigating.
 * Renders a `<button>` — use {@link Link} for navigation.
 *
 * @param props - {@link LinkButtonProps}
 */
export const LinkButton: FC<LinkButtonProps> = ({
  children,
  size = 'md',
  showLeftIcon = false,
  showRightIcon = false,
  className,
  ...rest
}) => {
  const classNames = `${styles['link-button']} ${styles[size]}${className ? ` ${className}` : ''}`
  return (
    <button type="button" {...rest} className={classNames}>
      {showLeftIcon && <Icon name="ChevronLeft" size={iconSizeMap[size]} color="currentColor" />}
      {children}
      {showRightIcon && <Icon name="ChevronRight" size={iconSizeMap[size]} color="currentColor" />}
    </button>
  )
}
