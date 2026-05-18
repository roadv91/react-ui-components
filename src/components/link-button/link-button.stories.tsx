import type { StoryDefault, Story } from '@ladle/react'
import { LinkButton, type LinkButtonProps } from './link-button'

export default {
  title: 'Link Button'
} satisfies StoryDefault

type Args = Omit<LinkButtonProps, 'children'> & {
  label: string
}

export const Adaptive: Story<Args> = ({ label, ...rest }) => (
  <LinkButton {...rest}>{label}</LinkButton>
)

Adaptive.args = {
  label: 'Learn more',
  size: 'md',
  showLeftIcon: false,
  showRightIcon: false,
  onClick: () => {},
}

Adaptive.argTypes = {
  label: { control: { type: 'text' } },
  size: { control: { type: 'select' }, options: ['sm', 'md', 'lg', 'xl', 'xxl'] },
  showLeftIcon: { control: { type: 'boolean' } },
  showRightIcon: { control: { type: 'boolean' } },
}

export const Small: Story = () => <LinkButton size="sm" showLeftIcon showRightIcon onClick={() => {}}>Learn more</LinkButton>
export const Medium: Story = () => <LinkButton size="md" showLeftIcon showRightIcon onClick={() => {}}>Learn more</LinkButton>
export const Large: Story = () => <LinkButton size="lg" showLeftIcon showRightIcon onClick={() => {}}>Learn more</LinkButton>
export const ExtraLarge: Story = () => <LinkButton size="xl" showLeftIcon showRightIcon onClick={() => {}}>Learn more</LinkButton>
export const ExtraExtraLarge: Story = () => <LinkButton size="xxl" showLeftIcon showRightIcon onClick={() => {}}>Learn more</LinkButton>
