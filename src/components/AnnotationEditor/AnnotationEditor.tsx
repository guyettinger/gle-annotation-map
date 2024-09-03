import { MouseEvent, useCallback, useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import { AnnotationEditorProps } from './AnnotationEditor.types.ts';
import { AnnotationSymbolPicker } from '../AnnotationSymbolPicker';
import { Annotation } from '../../../graphql/client/graphql.ts';

export const AnnotationEditor = ({
  annotation,
  onEditAnnotation,
  onEditAnnotationPreview,
  onCancelEditAnnotation,
}: AnnotationEditorProps) => {
  const [editAnnotation, setEditAnnotation] = useState<Annotation>({
    ...annotation,
  });

  const handleEditClick = useCallback(
    (event: MouseEvent) => {
      onEditAnnotation?.(editAnnotation);
      event.stopPropagation();
    },
    [onEditAnnotation, editAnnotation],
  );

  const handleCancelClick = useCallback(
    (event: MouseEvent) => {
      onCancelEditAnnotation?.(editAnnotation);
      event.stopPropagation();
    },
    [onCancelEditAnnotation, editAnnotation],
  );

  const handleSymbolChange = useCallback(
    (symbol: string) => {
      const nextEditAnnotation = {
        ...editAnnotation,
        symbol: symbol,
      };
      onEditAnnotationPreview?.(nextEditAnnotation);
      setEditAnnotation(nextEditAnnotation);
    },
    [editAnnotation],
  );

  return (
    <Stack>
      <AnnotationSymbolPicker symbol={editAnnotation.symbol} onSymbolChange={handleSymbolChange} />
      <Group>
        <Button variant={'subtle'} size={'compact-xs'} onClick={handleEditClick}>
          Save
        </Button>
        <Button variant={'subtle'} size={'compact-xs'} onClick={handleCancelClick}>
          Cancel
        </Button>
      </Group>
    </Stack>
  );
};
