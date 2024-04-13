import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CardDisplay } from "../components/composite/cardDisplay";

const meta = {
    title: 'Composite/Card',
    component: CardDisplay,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<typeof CardDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardDisplayStory: Story = {};