import { MouseEvent, useCallback } from 'react';
import { Card, Group, Stack, Text } from '@mantine/core';
import { AnnotationItemProps } from './AnnotationItem.types.ts';
import { AnnotationSymbol } from '../AnnotationSymbol';

export const AnnotationItem = ({
  annotation,
  onAnnotationItemClick,
  actionArea,
}: AnnotationItemProps) => {
  const handleCardClick = useCallback(
    (event: MouseEvent): void => {
      onAnnotationItemClick?.(annotation);
      event.stopPropagation();
    },
    [annotation, onAnnotationItemClick],
  );

  return (
    <Card key={annotation.id} padding="sm" radius="sm" withBorder onClick={handleCardClick}>
      <Stack>
        <Group justify="space-between">
          <AnnotationSymbol symbol={annotation.symbol} />
          {!!actionArea && actionArea}
        </Group>
        {annotation.note && <Text size="xs">{annotation.note}</Text>}
        <Text size="xs" opacity={0.5}>
          {annotation.latitude}, {annotation.longitude}
        </Text>
      </Stack>
    </Card>
  );
};
