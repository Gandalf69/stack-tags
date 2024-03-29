import type { Meta, StoryObj } from '@storybook/react';
import TagsMain from '../components/TagsMain';
import TagsSkeleton from '../components/TagsSkeleton';
import TagsError from '../components/TagsError';

const meta: Meta<typeof TagsMain> = {
    title: 'Tag/Tags Main',
    component: TagsMain,
    tags: ['autodocs'],
    subcomponents: {
      TagsSkeleton,
      TagsError
    }
};

export default meta;
type Story = StoryObj<typeof TagsMain>;

export const Success: Story = {
    render: () => <TagsMain />
};

export const Loading: Story = {
  render: () => <TagsSkeleton />
};

export const Error: Story = {
  render: () => <TagsError />
};