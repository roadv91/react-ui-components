import type { StoryDefault, Story } from '@ladle/react'
import { Button, type ButtonProps } from './button'

export default {
  title: 'Button'
} satisfies StoryDefault

type Args = Omit<ButtonProps, 'children'> & {
  label: string,
}

export const Adaptive: Story<Args> = ({ label, ...restOfProps }) => (
  <Button {...restOfProps}>{label}</Button>
)

Adaptive.args = {
  label: 'Click me',
  variant: 'primary',
  size: 'md',
  disabled: false,
}

// TODO - The `description` doesn't actually show up. Either need a `.mdx` file or need to move to Storybook.

Adaptive.argTypes = {
  label: {
    control: { type: 'text' },
    description: 'Maps to the `children` prop of Button — the text displayed inside the button.',
  },
  variant: { control: { type: 'select' }, options: ['primary', 'secondary']},
  size: { control: { type: 'select' }, options: ['md', 'sm'] },
  disabled: { control: { type: 'boolean' }}
}

export const PrimaryMd: Story = () => <Button variant="primary" size="md">Click me</Button>
export const PrimaryMdDisabled: Story = () => <Button variant="primary" size="md" disabled>Click me</Button>
export const PrimarySm: Story = () => <Button variant="primary" size="sm">Click me</Button>
export const PrimarySmDisabled: Story = () => <Button variant="primary" size="sm" disabled>Click me</Button>
export const SecondaryMd: Story = () => <Button variant="secondary" size="md">Click me</Button>
export const SecondaryMdDisabled: Story = () => <Button variant="secondary" size="md" disabled>Click me</Button>
export const SecondarySm: Story = () => <Button variant="secondary" size="sm">Click me</Button>
export const SecondarySmDisabled: Story = () => <Button variant="secondary" size="sm" disabled>Click me</Button>
