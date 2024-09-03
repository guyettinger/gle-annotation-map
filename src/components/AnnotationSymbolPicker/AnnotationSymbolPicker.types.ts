import { ButtonProps } from '@mantine/core';

export interface AnnotationSymbolPickerProps extends ButtonProps {
  symbol: string;
  onSymbolChange: (symbol: string) => void;
}