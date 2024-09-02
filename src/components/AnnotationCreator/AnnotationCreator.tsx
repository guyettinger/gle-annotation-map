import { MouseEvent as ReactMouseEvent, useCallback } from 'react';
import { Button, Group, Stack, Text } from '@mantine/core';
import { AnnotationCreatorProps } from './AnnotationCreator.types.ts';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

export const AnnotationCreator = ({
  annotationInput,
  onCreateAnnotation,
  onCancelCreateAnnotation,
}: AnnotationCreatorProps) => {
  const handleCreateClick = (event: ReactMouseEvent) => {
    onCreateAnnotation?.(annotationInput);
    event.stopPropagation();
  };

  const handleCancelClick = (event: ReactMouseEvent) => {
    onCancelCreateAnnotation?.(annotationInput);
    event.stopPropagation();
  };

  const handleEmojiClick = useCallback((emojiData: EmojiClickData, event: MouseEvent) => {
    annotationInput.symbol = emojiData.emoji
    event.stopPropagation();
  }, []);


  return (
    <Stack>
      <Text ta={'center'} size={'48px'}>
        {annotationInput.symbol}
      </Text>
      <EmojiPicker onEmojiClick={handleEmojiClick}/>
      <Group>
        <Button size={'compact-xs'} onClick={handleCreateClick}>Create</Button>
        <Button size={'compact-xs'} onClick={handleCancelClick}>Cancel</Button>
      </Group>
    </Stack>
  );
};
