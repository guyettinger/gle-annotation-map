import { Text } from '@mantine/core';
import { AnnotationSymbolProps } from './AnnotationSymbol.types.ts';

export const AnnotationSymbol = ({ symbol, size = '24px' }: AnnotationSymbolProps) => {
  return <Text size={size}>{symbol}</Text>;
};
