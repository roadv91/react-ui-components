import type { FC } from "react";

import styles from './styles/menu-item-styles.module.scss'

/**
 * Represents a single item in a `Menu`
 */
export const MenuItem: FC = () => {
  return (
    <div className={`menu-item ${styles['menu-item']}`}>
    </div>
  )
}