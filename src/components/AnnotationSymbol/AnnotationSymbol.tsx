import { Text } from '@mantine/core';
import { AnnotationSymbolProps } from './AnnotationSymbol.types.ts';

export const AnnotationSymbol = ({ annotation }: AnnotationSymbolProps) => {
  return <Text size={"24px"}>{annotation.symbol}</Text>;
};
