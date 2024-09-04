import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from '@/components/Breadcrumbs/index';
import { Button } from '@/components/Button/Button';

const meta = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneItem: Story = {
  args: {
    items: [
      {
        content: <Button color="tertiary-text">Program files</Button>,
      },
    ],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      {
        content: <Button color="tertiary-text">Program files</Button>,
      },
      {
        content: <Button color="tertiary-text">Documents</Button>,
      },
    ],
  },
};

export const MultipleItems: Story = {
  args: {
    items: [
      {
        content: <Button color="tertiary-text">Program files</Button>,
      },
      {
        content: <Button color="tertiary-text">Documents</Button>,
      },
      {
        content: <Button color="tertiary-text">Year 2024</Button>,
      },
      {
        content: <Button color="tertiary-text">Hiring</Button>,
      },
      {
        content: <Button color="tertiary-text">Candidates</Button>,
      },
      {
        content: <Button color="tertiary-text">Lorem</Button>,
      },
      {
        content: <Button color="tertiary-text">Ipsum</Button>,
      },
      {
        content: <Button color="tertiary-text">John Doe</Button>,
      },
      {
        content: <Button color="tertiary-text">Approval</Button>,
      },
    ],
  },
};

export const Scrollable = {
  render: () => {
    return (
      <div
        style={{
          border: '1px blue solid',
          width: '600px',
        }}
      >
        <Breadcrumbs
          items={[
            {
              content: <Button color="tertiary-text">Program files</Button>,
            },
            {
              content: <Button color="tertiary-text">Documents</Button>,
            },
            {
              content: <Button color="tertiary-text">Year 2024</Button>,
            },
            {
              content: <Button color="tertiary-text">Hiring</Button>,
            },
            {
              content: <Button color="tertiary-text">Candidates</Button>,
            },
            {
              content: <Button color="tertiary-text">Lorem</Button>,
            },
            {
              content: <Button color="tertiary-text">Ipsum</Button>,
            },
            {
              content: <Button color="tertiary-text">John Doe</Button>,
            },
            {
              content: <Button color="tertiary-text">Approval</Button>,
            },
          ]}
        />
      </div>
    );
  },
};
