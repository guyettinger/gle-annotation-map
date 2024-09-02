import { MouseEvent as ReactMouseEvent, useCallback, useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import { AnnotationCreatorProps } from './AnnotationCreator.types.ts';
import { AnnotationSymbolPicker } from '../AnnotationSymbolPicker';
import { AnnotationInput } from '../../../graphql/client/graphql.ts';

export const AnnotationCreator = ({
  annotationInput,
  onCreateAnnotation,
  onCreateAnnotationPreview,
  onCancelCreateAnnotation,
}: AnnotationCreatorProps) => {
  const [createAnnotationInput, setCreateAnnotationInput] = useState<AnnotationInput>({
    ...annotationInput,
  });

  const handleCreateClick = useCallback(
    (event: ReactMouseEvent) => {
      onCreateAnnotation?.(createAnnotationInput);
      event.stopPropagation();
    },
    [onCreateAnnotation, createAnnotationInput],
  );

  const handleCancelClick = useCallback(
    (event: ReactMouseEvent) => {
      onCancelCreateAnnotation?.(createAnnotationInput);
      event.stopPropagation();
    },
    [onCancelCreateAnnotation, createAnnotationInput],
  );

  const handleSymbolChange = useCallback(
    (symbol: string) => {
      const nextCreateAnnotationInput = {
        ...createAnnotationInput,
        symbol: symbol,
      };
      onCreateAnnotationPreview?.(nextCreateAnnotationInput);
      setCreateAnnotationInput(nextCreateAnnotationInput);
    },
    [createAnnotationInput],
  );

  return (
    <Stack>
      <AnnotationSymbolPicker
        symbol={createAnnotationInput.symbol}
        onSymbolChange={handleSymbolChange}
      />
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
