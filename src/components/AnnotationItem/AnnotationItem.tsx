import { Card, Group, Stack, Text } from '@mantine/core';
import { AnnotationItemProps } from './AnnotationItem.types.ts';
import { AnnotationSymbol } from '../AnnotationSymbol';

export const AnnotationItem = ({ annotation, actionArea }: AnnotationItemProps) => {
  return (
    <Card key={annotation.id} padding="sm" radius="sm" withBorder>
      <Stack>
        <Group justify="space-between" align="center">
          <AnnotationSymbol symbol={annotation.symbol!} />
          {!!actionArea && actionArea}
        </Group>
        <Text size="xs">
          {annotation.latitude}, {annotation.longitude}
        </Text>
      </Stack>
    </Card>
  );
};
