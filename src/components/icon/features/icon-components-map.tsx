import type { FC } from "react"
import type { IconName } from '../icon'
import { ChevronDown } from '../assets/chevron-down'
import { ChevronLeft } from '../assets/chevron-left'
import { ChevronRight } from '../assets/chevron-right'
import { Dismiss } from '../assets/dismiss'
import { Error } from '../assets/error'
import { EyeClosed } from '../assets/eye-closed'
import { EyeOpen } from '../assets/eye-open'
import { Info } from '../assets/info'
import { Success } from '../assets/success'
import { Warning } from '../assets/warning'

export const iconComponentsMap: Record<IconName, FC> = {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dismiss,
  Error,
  EyeClosed,
  EyeOpen,
  Info,
  Success,
  Warning,
}
