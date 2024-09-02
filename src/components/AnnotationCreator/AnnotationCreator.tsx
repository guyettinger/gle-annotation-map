import { MouseEvent as ReactMouseEvent, useCallback, useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import { AnnotationCreatorProps } from './AnnotationCreator.types.ts';
import { AnnotationSymbolPicker } from '../AnnotationSymbolPicker';

export const AnnotationCreator = ({
  annotationInput,
  onCreateAnnotation,
  onCancelCreateAnnotation,
}: AnnotationCreatorProps) => {
  const [symbol, setSymbol] = useState(annotationInput.symbol ?? '');

  const handleCreateClick = useCallback(
    (event: ReactMouseEvent) => {
      onCreateAnnotation?.(annotationInput);
      event.stopPropagation();
    },
    [onCreateAnnotation, annotationInput],
  );

  const handleCancelClick = useCallback(
    (event: ReactMouseEvent) => {
      onCancelCreateAnnotation?.(annotationInput);
      event.stopPropagation();
    },
    [onCancelCreateAnnotation, annotationInput],
  );

  const handleSymbolChange = useCallback(
    (symbol: string) => {
      annotationInput.symbol = symbol;
      setSymbol(symbol);
    },
    [annotationInput],
  );

  return (
    <Stack>
      <AnnotationSymbolPicker symbol={symbol} onSymbolChange={handleSymbolChange} />
      <Group>
        <Button size={'compact-xs'} onClick={handleCreateClick}>
          Create
        </Button>
        <Button size={'compact-xs'} onClick={handleCancelClick}>
          Cancel
        </Button>
      </Group>
    </Stack>
  );
};
