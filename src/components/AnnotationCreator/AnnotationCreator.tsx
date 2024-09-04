import { ChangeEvent, MouseEvent as ReactMouseEvent, useCallback, useState } from 'react';
import { Button, Group, Stack, Textarea } from '@mantine/core';
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

  const handleTextChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>)=>{
    const nextCreateAnnotationInput = {
      ...createAnnotationInput,
      note: event.target.value,
    };
    onCreateAnnotationPreview?.(nextCreateAnnotationInput);
    setCreateAnnotationInput(nextCreateAnnotationInput);
  }, [createAnnotationInput]);

  return (
    <Stack gap="xs">
      <AnnotationSymbolPicker
        symbolSize={'40px'}
        variant={'light'}
        symbol={createAnnotationInput.symbol}
        onSymbolChange={handleSymbolChange}
      />
      <Textarea
        placeholder="notes"
        autosize
        minRows={2}
        value={createAnnotationInput.note ?? ""}
        onChange={handleTextChange}
      />
      <Group justify={"space-between"}>
        <Button variant={'subtle'} size={'compact-xs'} onClick={handleCreateClick}>
          Create
        </Button>
        <Button variant={'subtle'} size={'compact-xs'} onClick={handleCancelClick}>
          Cancel
        </Button>
      </Group>
    </Stack>
  );
};
