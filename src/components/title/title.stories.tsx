import type { StoryDefault, Story } from '@ladle/react'
import { Title, type TitleProps } from './title'

export default {
  title: 'Title'
} satisfies StoryDefault

export const Adaptive: Story<TitleProps> = (props) => <Title {...props} />

Adaptive.args = {
  title: 'Page Title',
  description: 'This is a supporting description for the title.',
  level: 'h1',
  align: 'center',
}

Adaptive.argTypes = {
  level: { 
    control: { type: 'select' }, options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    description: 'This prop will not change the size of the title. It is meant for semantic purposes.'
  },
  align: { control: { type: 'select' }, options: ['left', 'center'] },
  descriptionAlign: { control: { type: 'select' }, options: ['left', 'center'] },
}

const sampleProps = {
  title: 'Page Title',
  description: 'This is a supporting description for the title.',
}

export const BothCenter: Story = () => <Title {...sampleProps} align="center" />
export const BothLeft: Story = () => <Title {...sampleProps} align="left" />
export const TitleCenterDescriptionLeft: Story = () => <Title {...sampleProps} align="center" descriptionAlign="left" />
export const TitleLeftDescriptionCenter: Story = () => <Title {...sampleProps} align="left" descriptionAlign="center" />
