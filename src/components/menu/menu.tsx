import { useState, type FC } from "react"
import { MenuItem, type MenuItemProps } from "./menu-item"
import styles from "./styles/menu-styles.module.scss"

export type MenuOptions = Omit<MenuItemProps, 'selected'>

/**
 * Used to type the props for the `Menu` component
 */
interface MenuProps {
  /**
   * List of options used to populate this `Menu`. Each `value` must be unique
   */
  options: MenuOptions[]
}

/**
 * Consists of a list of items from which the user can select one
 */
export const Menu: FC<MenuProps> = ({ options }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null)

  return (
    <ul role="menu" className={styles['menu']}>
      {options.map(item => (
        <li key={item.value} role="presentation">
          <MenuItem
            {...item}
            selected={selectedValue === item.value}
            onClick={() => {
              setSelectedValue(item.value)
              item.onClick?.()
            }}
          />
        </li>
      ))}
    </ul>
  )
}