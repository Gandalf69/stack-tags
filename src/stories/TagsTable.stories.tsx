import type { Meta, StoryObj } from '@storybook/react';
import TagsTable, {TagsTableProps} from '../components/TagsTable';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof TagsTable> = {
    title: 'Tag/Tags Table',
    component: TagsTable,
    tags: ['autodocs'],
    argTypes: {
        page: {defaultValue: 0},
        rowsPerPage: {defaultValue: 10},
        // handleChangePage: {defaultValue: (event: unknown, page: number) => console.log(`Changed to page ${page}`)}
        handleChangePage: action('Change page')
    }
};

export default meta;
type Story = StoryObj<typeof TagsTable>;

export const Table: Story = {
    args: {
        page: 0,
        rowsPerPage: 10,
        handleChangePage: action('Change page')
    }
};

