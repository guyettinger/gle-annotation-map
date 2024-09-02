import { MouseEvent, useCallback, useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import { AnnotationEditorProps } from './AnnotationEditor.types.ts';
import { AnnotationSymbolPicker } from '../AnnotationSymbolPicker';

export const AnnotationEditor = ({
  annotation,
  onEditAnnotation,
  onCancelEditAnnotation,
}: AnnotationEditorProps) => {
  const [symbol, setSymbol] = useState(annotation.symbol ?? '');

  const handleEditClick = useCallback(
    (event: MouseEvent) => {
      onEditAnnotation?.(annotation);
      event.stopPropagation();
    },
    [onEditAnnotation, annotation],
  );

  const handleCancelClick = useCallback(
    (event: MouseEvent) => {
      onCancelEditAnnotation?.(annotation);
      event.stopPropagation();
    },
    [onCancelEditAnnotation, annotation],
  );

  const handleSymbolChange = useCallback(
    (symbol: string) => {
      annotation.symbol = symbol;
      setSymbol(symbol);
    },
    [annotation],
  );

  return (
    <Stack>
      <AnnotationSymbolPicker symbol={symbol} onSymbolChange={handleSymbolChange} />
      <Group>
        <Button size={'compact-xs'} onClick={handleEditClick}>
          Save
        </Button>
        <Button size={'compact-xs'} onClick={handleCancelClick}>
          Cancel
        </Button>
      </Group>
    </Stack>
  );
};
