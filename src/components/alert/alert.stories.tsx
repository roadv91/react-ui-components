import type { StoryDefault, Story } from '@ladle/react'
import { Alert, type AlertProps } from './alert'

export default {
  title: 'Alert'
} satisfies StoryDefault

type Args = Omit<AlertProps, 'link'> & {
  linkText?: string
  linkHref?: string
}

export const Adaptive: Story<Args> = ({ linkText, linkHref, ...rest }) => (
  <div style={{ width: '400px' }}>
    <Alert
      {...rest}
      link={linkText && linkHref ? { children: linkText, href: linkHref } : undefined}
    />
  </div>
)

Adaptive.args = {
  type: 'info',
  title: 'Title',
  description: 'The description text goes here',
  showDismiss: false,
  linkText: 'Link',
  linkHref: '#',
}

Adaptive.argTypes = {
  type: { control: { type: 'select' }, options: ['info', 'warning', 'error', 'success'] },
  title: { control: { type: 'text' } },
  description: { control: { type: 'text' } },
  showDismiss: { control: { type: 'boolean' } },
  linkText: { control: { type: 'text' } },
  linkHref: { control: { type: 'text' } },
}

const types = ['info', 'warning', 'error', 'success'] as const
const link = { children: 'Link', href: '#' }

export const AllVariations: Story = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '16px' }}>
    {types.map(type => <Alert key={type} type={type} title="Title" description="Description" link={link} showDismiss />)}
    {types.map(type => <Alert key={type} type={type} title="Title" description="Description" link={link} />)}
    {types.map(type => <Alert key={type} type={type} title="Title" description="Description" showDismiss />)}
    {types.map(type => <Alert key={type} type={type} title="Title" description="Description" />)}
  </div>
)
