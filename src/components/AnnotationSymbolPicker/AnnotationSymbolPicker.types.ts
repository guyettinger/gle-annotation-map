import { ButtonProps } from '@mantine/core';

export interface AnnotationSymbolPickerProps extends ButtonProps {
  symbol: string;
  symbolSize?: string;
  onSymbolChange: (symbol: string) => void;
}