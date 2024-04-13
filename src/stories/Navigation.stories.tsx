import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Navigation from "../components/composite/navigation";

const meta = {
    title: 'Composite/Navigation',
    component: Navigation,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationStory: Story = {};