import type { FC } from "react"
import type { IconName } from '../icon'
import { ChevronLeft } from '../assets/chevron-left'
import { ChevronRight } from '../assets/chevron-right'
import { Dismiss } from '../assets/dismiss'
import { Error } from '../assets/error'
import { Info } from '../assets/info'
import { Success } from '../assets/success'
import { Warning } from '../assets/warning'

export const iconComponentsMap: Record<IconName, FC> = {
  ChevronLeft,
  ChevronRight,
  Dismiss,
  Error,
  Info,
  Success,
  Warning,
}
