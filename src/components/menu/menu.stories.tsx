import { useState } from 'react'
import type { StoryDefault, Story } from '@ladle/react'
import { Menu, type MenuOptions } from './menu'

export default {
  title: 'Menu'
} satisfies StoryDefault

export const FewItems: Story = () => (
  <Menu
    options={[
      { label: 'Home', value: 'home' },
      { label: 'About', value: 'about' },
    ]}
  />
)

export const ManyItems: Story = () => (
  <Menu
    options={[
      { label: 'Dashboard', value: 'dashboard' },
      { label: 'Profile', value: 'profile' },
      { label: 'Settings', value: 'settings' },
      { label: 'Notifications', value: 'notifications' },
      { label: 'Help', value: 'help' },
      { label: 'Sign Out', value: 'sign-out' },
    ]}
  />
)

const onClickMenuOptions: MenuOptions[] = [
  { label: 'Option One', value: 'option-one' },
  { label: 'Option Two', value: 'option-two' },
  { label: 'Option Three', value: 'option-three' },
]

export const WithClickHandlers: Story = () => {
  const [lastSelected, setLastSelected] = useState<string | null>(null)

  return (
    <div>
      <Menu
        options={onClickMenuOptions.map(option => ({
          ...option,
          onClick: () => setLastSelected(option.label),
        }))}
      />
      <div style={{ marginTop: '12px', fontSize: '14px', fontFamily: 'sans-serif' }}>
        {lastSelected ? `Selected: ${lastSelected}` : 'Nothing selected yet'}
      </div>
    </div>
  )
}
