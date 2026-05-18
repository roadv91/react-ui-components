import type { FC } from "react"
import type { IconName } from '../icon'
import { ChevronLeft } from '../assets/chevron-left'
import { ChevronRight } from '../assets/chevron-right'

export const iconComponentsMap: Record<IconName, FC> = {
  ChevronLeft,
  ChevronRight,
}
