import type { StoryDefault, Story } from '@ladle/react'
import { Button, type ButtonProps } from './button'

export default {
  title: 'Button'
} satisfies StoryDefault

type Args = Omit<ButtonProps, 'children'> & {
  label: string,
}

export const Default: Story<Args> = ({ label, ...restOfProps }) => (
  <Button {...restOfProps}>{label}</Button>
)

Default.args = {
  label: 'Click me',
  variant: 'primary',
  size: 'md',
  disabled: false,
}

Default.argTypes = {
  label: {
    control: { type: 'text' },
    description: 'Maps to the `children` prop of Button — the text displayed inside the button.',
  },
  variant: { control: { type: 'select' }, options: ['primary', 'secondary']},
  size: { control: { type: 'select' }, options: ['md', 'sm'] },
  disabled: { control: { type: 'boolean' }}
}