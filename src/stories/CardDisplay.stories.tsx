import type { Meta, StoryObj } from '@storybook/react';
import { CardDisplay } from "../components/layouts/menu/menuItem";

const meta = {
    title: 'Composite/Card',
    component: CardDisplay,
    parameters: {
        layout: 'centered',
    },
    args: { dishName: "Dish Name", pricing: 99.99, description: "Food Description", category: "noodle" , image: "beehoon"  },
} satisfies Meta<typeof CardDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardDisplayStory: Story = {};