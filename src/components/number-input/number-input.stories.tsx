import type { StoryDefault, Story } from '@ladle/react'
import { NumberInput, type NumberInputProps } from './number-input'

export default {
  title: 'NumberInput'
} satisfies StoryDefault

type Args = Omit<NumberInputProps, 'id'>

export const Adaptive: Story<Args> = (props) => (
  <div style={{ width: '240px' }}>
    <NumberInput id="adaptive-input" {...props} />
  </div>
)

Adaptive.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  description: 'Helper description',
  errorMessage: '',
  required: false,
  showRequiredIndicator: true,
  disabled: false,
  size: 'md',
  allowNegative: true,
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
  allowNegative: { control: { type: 'boolean' } },
  maxDecimals: { control: { type: 'number' } },
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
        <NumberInput id="md-default" size="md" label="Label" placeholder="0" description="Helper description" />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>MD</span>
        <NumberInput id="md-required" size="md" label="Label" placeholder="0" description="Helper description" required />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>MD</span>
        <NumberInput id="md-error" size="md" label="Label" placeholder="0" errorMessage="This field is required" />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>MD</span>
        <NumberInput id="md-disabled" size="md" label="Label" initialValue="42" description="Helper description" disabled />
      </div>

      <div style={cellStyle}>
        <span style={labelStyle}>SM</span>
        <NumberInput id="sm-default" size="sm" label="Label" placeholder="0" description="Helper description" />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>SM</span>
        <NumberInput id="sm-required" size="sm" label="Label" placeholder="0" description="Helper description" required />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>SM</span>
        <NumberInput id="sm-error" size="sm" label="Label" placeholder="0" errorMessage="This field is required" />
      </div>
      <div style={cellStyle}>
        <span style={labelStyle}>SM</span>
        <NumberInput id="sm-disabled" size="sm" label="Label" initialValue="42" description="Helper description" disabled />
      </div>
    </div>
  </div>
)
