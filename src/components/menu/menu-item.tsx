import type { FC } from "react"

import styles from './styles/menu-item-styles.module.scss'

/**
 * Used to type the props for the `MenuItem` component
 */
export interface MenuItemProps {
  /**
   * Label of the item - what's displayed
   */
  label: string
  /**
   * Value of the item. If used in a form, this is what will be submitted
   */
  value: string
  /**
   * Marks the item as selected, applying active styles
   */
  selected: boolean
  /**
   * Optional click handler which runs when item is selected
   */
  onClick?: () => void
}

/**
 * Represents a single item in a `Menu`
 * @param props - {@link MenuItemProps}
 */
export const MenuItem: FC<MenuItemProps> = ({ label, selected, onClick }) => {
  return (
    <button
      type="button"
      className={`${styles['menu-item']}${selected ? ` ${styles['selected']}` : ''}`}
      onClick={onClick}
      role="menuitem"
      aria-current={selected ? true : undefined}
    >
      <span className={styles['label']}>{label}</span>
    </button>
  )
}
