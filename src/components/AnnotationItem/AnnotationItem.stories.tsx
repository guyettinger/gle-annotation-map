import type { Meta, StoryObj } from '@storybook/react';
import { AnnotationItem } from './AnnotationItem';
import { AnnotationItemProps } from './AnnotationItem.types.ts';

const meta = {
  title: 'AnnotationItem',
  component: AnnotationItem,
} satisfies Meta<typeof AnnotationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicAnnotationItem: Story = ({ annotation }: AnnotationItemProps) => {
  return <AnnotationItem annotation={annotation} />;
};
BasicAnnotationItem.args = {
  annotation: { id: 1, latitude: 0.0, longitude: 0.0, symbol: '👍', note: 'hello world' },
};
