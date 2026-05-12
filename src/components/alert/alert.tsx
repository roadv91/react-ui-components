import type { FC } from "react"
import styles from './styles/alert.module.scss'

export interface AlertProps {
  /**
   * Controls the visual style and semantic meaning of the alert.
   */
  type: 'error' | 'warning' | 'info' | 'success'
  /**
   * Short heading displayed at the top of the alert.
   */
  title: string
  /**
   * Body text providing more detail about the alert.
   */
  description: string
  /**
   * When true, renders a dismiss button to close the alert.
   * @default false
   */
  showDismiss?: boolean
  /**
   * Optional call-to-action link rendered inside the alert.
   */
  link?: {
    text: string
    onClick: () => void
  }
}

/**
 * @param props - {@link AlertProps}
 */
export const Alert: FC<AlertProps> = () => {
  return (
    <div className={styles['alert']}></div>
  )
}
