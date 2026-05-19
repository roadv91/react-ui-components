import { useState, type FC } from "react"
import { useGetDevice } from '@/hooks/use-get-device'
import styles from './styles/alert.module.scss'
import { Icon } from '@/components/icon/icon'
import { Link, type LinkProps } from '@/components/link/link'
import type { IconName } from '@/components/icon/icon'

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
   * Optional body text providing more detail about the alert.
   */
  description?: string
  /**
   * When true, renders a dismiss button to close the alert (i.e., remove from the DOM).
   * @default false
   */
  showDismiss?: boolean
  /**
   * Optional call-to-action link rendered inside the alert.
   */
  link?: Pick<LinkProps, 'children' | 'href'>
}

const typeIconMap: Record<AlertProps['type'], IconName> = {
  error: 'Error',
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
}

const typeColorMap: Record<AlertProps['type'], string> = {
  error: 'var(--semantic-alert-error-line)',
  info: 'var(--semantic-alert-info-line)',
  success: 'var(--semantic-alert-success-line)',
  warning: 'var(--semantic-alert-warning-line)',
}

/**
 * Displays a contextual message with an optional dismiss button and call-to-action link.
 *
 * @param props - {@link AlertProps}
 */
export const Alert: FC<AlertProps> = ({ type, title, description, showDismiss, link }) => {
  const [visible, setVisible] = useState(true)
  const iconColor = typeColorMap[type]
  const device = useGetDevice()
  const inlineLinkSize = device === 'mobile' ? 'sm' : 'md'
  const rightLinkSize = device === 'mobile' ? 'md' : 'lg'

  if (!visible) return null

  return (
    <div className={`${styles['alert']} ${styles[type]}`}>
      <Icon name={typeIconMap[type]} color={iconColor} />
      <div className={styles['content']}>
        <span className={styles['title']}>{title}</span>
        {description && <span className={styles['description']}>{description}</span>}
        {link && showDismiss && <Link {...link} size={inlineLinkSize} className={styles['link-inline']} />}
      </div>
      {link && !showDismiss && <Link {...link} showRightIcon size={rightLinkSize} className={styles['link-right']} />}
      {showDismiss && (
        <button
          className={styles['dismiss']}
          onClick={() => setVisible(false)}
          aria-label="Dismiss alert"
        >
          <Icon name="Dismiss" size={20} color="currentColor" />
        </button>
      )}
    </div>
  )
}
