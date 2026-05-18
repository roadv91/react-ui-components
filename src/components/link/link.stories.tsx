import type { StoryDefault, Story } from '@ladle/react'
import { Link, type LinkProps } from './link'

export default {
  title: 'Link'
} satisfies StoryDefault

type Args = Omit<LinkProps, 'children'> & {
  label: string
}

export const Adaptive: Story<Args> = ({ label, ...rest }) => (
  <Link {...rest}>{label}</Link>
)

Adaptive.args = {
  label: 'Learn more',
  href: '#',
  size: 'md',
  showLeftIcon: false,
  showRightIcon: false,
}

Adaptive.argTypes = {
  label: { control: { type: 'text' } },
  size: { control: { type: 'select' }, options: ['sm', 'md', 'lg', 'xl', 'xxl'] },
  showLeftIcon: { control: { type: 'boolean' } },
  showRightIcon: { control: { type: 'boolean' } },
}

export const Small: Story = () => <Link href="#" size="sm" showLeftIcon showRightIcon>Learn more</Link>
export const Medium: Story = () => <Link href="#" size="md" showLeftIcon showRightIcon>Learn more</Link>
export const Large: Story = () => <Link href="#" size="lg" showLeftIcon showRightIcon>Learn more</Link>
export const ExtraLarge: Story = () => <Link href="#" size="xl" showLeftIcon showRightIcon>Learn more</Link>
export const ExtraExtraLarge: Story = () => <Link href="#" size="xxl" showLeftIcon showRightIcon>Learn more</Link>
