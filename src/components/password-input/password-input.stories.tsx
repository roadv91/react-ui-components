import type { StoryDefault, Story } from '@ladle/react'
import { PasswordInput, type PasswordInputProps } from './password-input'

export default {
  title: 'Password Input'
} satisfies StoryDefault

type Args = Omit<PasswordInputProps, 'id'>

export const Adaptive: Story<Args> = (props) => (
  <div style={{ width: '240px' }}>
    <PasswordInput id="adaptive-input" {...props} />
  </div>
)

Adaptive.args = {
  label: 'Password',
  placeholder: 'Enter password',
  description: 'Helper description',
  errorMessage: '',
  required: false,
  showRequiredIndicator: true,
  disabled: false,
  size: 'md',
  allowToggle: true,
}

Adaptive.argTypes = {
  size: { control: { type: 'select' }, options: ['md', 'sm'] },
  label: { control: { type: 'text' } },
  placeholder: { control: { type: 'text' } },
  description: { control: { type: 'text' } },
  errorMessage: { control: { type: 'text' } },
  required: { control: { type: 'boolean' } },
  showRequiredIndicator: { control: { type: 'boolean' } },
  disabled: { control: { type: 'boolean' } },
  allowToggle: { control: { type: 'boolean' } },
}

const cellStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '4px' }
const labelStyle: React.CSSProperties = { fontSize: '11px', fontFamily: 'Open Sans, sans-serif', color: '#8f8f8f', textTransform: 'uppercase', letterSpacing: '0.05em' }

export const AllStates: Story = () => (
  <div style={{ padding: '32px', fontFamily: 'Open Sans, sans-serif' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 240px)', gap: '32px', alignItems: 'start' }}>
      <span style={labelStyle}>Default</span>
      <span style={labelStyle}>Required</span>
      <span style={labelStyle}>Error</span>
      <span style={labelStyle}>Disabled</span>

      <div style={cellStyle}>
        <span style={labelStyle}>MD</span>
        <PasswordInput id="md-default" size="md" label="Password" placeholder="Enter password" description="Helper description" />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>MD</span>
        <PasswordInput id="md-required" size="md" label="Password" placeholder="Enter password" description="Helper description" required />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>MD</span>
        <PasswordInput id="md-error" size="md" label="Password" placeholder="Enter password" errorMessage="Password is required" />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>MD</span>
        <PasswordInput id="md-disabled" size="md" label="Password" initialValue="hunter2" description="Helper description" disabled />
      </div>

      <div style={cellStyle}>
        <span style={labelStyle}>SM</span>
        <PasswordInput id="sm-default" size="sm" label="Password" placeholder="Enter password" description="Helper description" />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>SM</span>
        <PasswordInput id="sm-required" size="sm" label="Password" placeholder="Enter password" description="Helper description" required />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>SM</span>
        <PasswordInput id="sm-error" size="sm" label="Password" placeholder="Enter password" errorMessage="Password is required" />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>SM</span>
        <PasswordInput id="sm-disabled" size="sm" label="Password" initialValue="hunter2" description="Helper description" disabled />
      </div>
    </div>
  </div>
)
