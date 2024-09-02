import { MouseEvent } from 'react';
import { Button, Group, Stack, Text } from '@mantine/core';
import { AnnotationCreatorProps } from './AnnotationCreator.types.ts';

export const AnnotationCreator = ({
  annotationInput,
  onCreateAnnotation,
  onCancelCreateAnnotation,
}: AnnotationCreatorProps) => {
  const handleCreateClick = (event: MouseEvent) => {
    onCreateAnnotation?.(annotationInput);
    event.stopPropagation();
  };

  const handleCancelClick = (event: MouseEvent) => {
    onCancelCreateAnnotation?.(annotationInput);
    event.stopPropagation();
  };

  return (
    <Stack>
      <Text ta={'center'} size={'48px'}>
        {annotationInput.symbol}
      </Text>
      <Group>
        <Button onClick={handleCreateClick}>Create</Button>
        <Button onClick={handleCancelClick}>Cancel</Button>
      </Group>
    </Stack>
  );
};
