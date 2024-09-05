import type { Meta, StoryObj } from '@storybook/react';
import { AnnotationList } from './AnnotationList';
import { AnnotationListProps } from './AnnotationList.types.ts';

const meta = {
  title: 'AnnotationList',
  component: AnnotationList,
} satisfies Meta<typeof AnnotationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicAnnotationList: Story = ({ annotations }: AnnotationListProps) => {
  return <AnnotationList annotations={annotations} />;
};
BasicAnnotationList.args = {
  annotations: [
    { id: 1, latitude: 1.0, longitude: 1.0, symbol: '👍', note: 'testing 1' },
    { id: 2, latitude: 2.0, longitude: 2.0, symbol: '👍', note: 'testing 2' },
    { id: 3, latitude: 3.0, longitude: 3.0, symbol: '👍', note: 'testing 3' },
  ],
};
