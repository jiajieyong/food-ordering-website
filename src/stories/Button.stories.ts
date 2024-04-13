import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../components/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'default' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children:  "Button"
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children:  "Button"
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children:  "Button"
  },
};
