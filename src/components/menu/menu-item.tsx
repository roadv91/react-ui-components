import { useState, type FC } from "react"

import styles from './styles/menu-item-styles.module.scss'

interface MenuItemProps {
  label: string
  onClick?: () => void
};


/**
 * Represents a single item in a `Menu`
 * @param props - {@link MenuItemProps}
 */
export const MenuItem: FC<MenuItemProps> = ({ label, onClick }) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    setIsSelected(true)
    onClick?.()
  }

  return (
    <button
      type="button"
      className={`${styles['menu-item']}${isSelected ? ` ${styles['selected']}` : ''}`}
      onClick={handleClick}
      role="menuitem"
      aria-current={isSelected ? true : undefined}
    >
      <span className={styles['label']}>{label}</span>
    </button>
  )
}
