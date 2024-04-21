import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Filter } from "@/components/layouts/menu/filter";


const meta = {
    title: 'Components/UI',
    component: Filter,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        list: ['All', 'Noodles', 'Rice', 'Side Dish'],
        filterList: ['All'],
        handleChange: fn() },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterDemo: Story = {};