import type { FC } from "react"
import styles from './styles/title-styles.module.scss'

export interface TitleProps {
  /**
   * The main heading text.
   */
  title: string
  /**
   * Optional supporting text rendered below the title.
   */
  description?: string
  /**
   * Controls the heading level rendered in the DOM.
   * @default 'h1'
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /**
   * Alignment applied to both title and description.
   * @default 'center'
   */
  align?: 'left' | 'center'
  /**
   * Overrides alignment for the description only.
   */
  descriptionAlign?: 'left' | 'center'
  /**
   * Optional additional class names.
   */
  className?: string
}

/**
 * @param props - {@link TitleProps}
 */
export const Title: FC<TitleProps> = ({
  title,
  description,
  level: Tag = 'h1',
  align = 'center',
  descriptionAlign,
  className,
}) => {
  const classNames = `${styles['title-container']}${className ? ` ${className}` : ''}`
  return (
    <div className={classNames}>
      <Tag className={`${styles['title']} ${styles[align]}`}>{title}</Tag>
      {description && <p className={`${styles['description']} ${styles[descriptionAlign ?? align]}`}>{description}</p>}
    </div>
  )
}
