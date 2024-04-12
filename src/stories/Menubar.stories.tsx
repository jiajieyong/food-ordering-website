import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import MenuPage from "../app/menu/page";

const meta = {
    title: 'Example/MenuPage',
    component: MenuPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },

    args: { onClick: fn() },
} satisfies Meta<typeof MenuPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Menu: Story = {};