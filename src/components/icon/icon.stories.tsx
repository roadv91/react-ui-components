import type { StoryDefault, Story } from '@ladle/react'
import { Icon, type IconProps, type IconName } from './icon'

export default {
  title: 'Icon'
} satisfies StoryDefault

export const Adaptive: Story<IconProps> = (props) => <Icon {...props} />

Adaptive.args = {
  name: 'Info',
  size: 24,
  color: 'black',
  decorative: true,
}

Adaptive.argTypes = {
  name: {
    control: { type: 'select' },
    options: [
      'ChevronDown', 'ChevronLeft', 'ChevronRight',
      'Dismiss', 'Error', 'EyeClosed', 'EyeOpen',
      'Info', 'Success', 'Warning',
    ] satisfies IconName[],
  },
  size: { control: { type: 'number' } },
  color: { control: { type: 'color' } },
  decorative: { control: { type: 'boolean' } },
}

const allIcons: IconName[] = [
  'ChevronDown', 'ChevronLeft', 'ChevronRight',
  'Dismiss', 'Error', 'EyeClosed', 'EyeOpen',
  'Info', 'Success', 'Warning',
]

export const AllIcons: Story = () => (
  <div style={{ padding: '32px', fontFamily: 'Open Sans, sans-serif' }}>
    <h2 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: 600, color: '#262626' }}>
      All Icons
    </h2>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '16px',
    }}>
      {allIcons.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '20px 12px',
            borderRadius: '8px',
            border: '1px solid #e4e2dd',
            backgroundColor: '#f7f6f2',
          }}
        >
          <Icon name={name} size={24} />
          <span style={{ fontSize: '14px', color: '#262626', textAlign: 'center', lineHeight: 1.4 }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  </div>
)
