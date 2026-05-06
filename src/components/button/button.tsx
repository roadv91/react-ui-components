import type { FC } from "react"
import styles from './styles/button.module.scss'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button can only take text as children. This is what will be shown on the button.
   */
  children: string
  /**
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary'
  /**
   * @default 'md'
   */
  size?: 'md' | 'sm'
  /**
   * @default false
   */
  disabled?: boolean
}

/**
 * 
 * @param props - {@link ButtonProps}
 */
export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  ...rest
}) => {
  const classNames = [className, styles[variant], styles[size], styles['button']].filter(Boolean).join(' ')
  return (
    <button
      {...rest}
      className={classNames}
      disabled={disabled}
    >
      {children}
    </button>
  )
}