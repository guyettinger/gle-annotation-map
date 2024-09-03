import { useCallback, useState } from 'react';
import { Button, Popover } from '@mantine/core';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { AnnotationSymbolPickerProps } from './AnnotationSymbolPicker.types.ts';
import { AnnotationSymbol } from '../AnnotationSymbol';

export const AnnotationSymbolPicker = ({
  symbol,
  onSymbolChange,
  size = 'xl',
  ...buttonProps
}: AnnotationSymbolPickerProps) => {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const handleEmojiClick = useCallback((emojiData: EmojiClickData, event: MouseEvent) => {
    onSymbolChange?.(emojiData.emoji);
    event.stopPropagation();
    setPopoverOpened(false);
  }, []);

  return (
    <Popover
      width={'auto'}
      position="bottom"
      withArrow
      shadow="md"
      opened={popoverOpened}
      onChange={setPopoverOpened}
    >
      <Popover.Target>
        <Button
          variant={'subtle'}
          size={size}
          w={'auto'}
          onClick={() => setPopoverOpened((o) => !o)}
          {...buttonProps}
        >
          <AnnotationSymbol symbol={symbol} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </Popover.Dropdown>
    </Popover>
  );
};
