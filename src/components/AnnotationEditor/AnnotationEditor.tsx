import { MouseEvent } from 'react';
import { Button, Group, Stack, Text } from '@mantine/core';
import { AnnotationEditorProps } from './AnnotationEditor.types.ts';

export const AnnotationEditor = ({
  annotation,
  onEditAnnotation,
  onCancelEditAnnotation,
}: AnnotationEditorProps) => {
  const handleEditClick = (event: MouseEvent) => {
    onEditAnnotation?.(annotation);
    event.stopPropagation();
  };

  const handleCancelClick = (event: MouseEvent) => {
    onCancelEditAnnotation?.(annotation);
    event.stopPropagation();
  };

  return (
    <Stack>
      <Text ta={'center'} size={'48px'}>
        {annotation.symbol}
      </Text>
      <Group>
        <Button size={'compact-xs'} onClick={handleEditClick}>Save</Button>
        <Button size={'compact-xs'} onClick={handleCancelClick}>Cancel</Button>
      </Group>
    </Stack>
  );
};
