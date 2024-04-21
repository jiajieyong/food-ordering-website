import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from "@/components/layouts/menu/menuItem";

const meta = {
    title: 'Composite/Card',
    component: MenuItem,
    parameters: {
        layout: 'centered',
    },
    args: { detail: {id: "123", name: "Dish Name", pricing: 99.99, description: "Food Description", category: "noodle", imagePath: "beehoon"} },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MenuItemStory: Story = {};