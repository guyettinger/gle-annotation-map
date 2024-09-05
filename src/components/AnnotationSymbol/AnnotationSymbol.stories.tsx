import type { Meta, StoryObj } from '@storybook/react';
import { AnnotationSymbol } from './AnnotationSymbol';
import { AnnotationSymbolProps } from './AnnotationSymbol.types.ts';

const meta = {
  title: 'AnnotationSymbol',
  component: AnnotationSymbol,
} satisfies Meta<typeof AnnotationSymbol>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicAnnotationSymbol: Story = ({ ...props }: AnnotationSymbolProps) => {
  return <AnnotationSymbol {...props} />;
};

BasicAnnotationSymbol.args = {
  symbol: '👍',
};
