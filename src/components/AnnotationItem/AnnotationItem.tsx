import { Card, Group, Stack, Text } from '@mantine/core';
import { AnnotationItemProps } from './AnnotationItem.types.ts';

export const AnnotationItem = ({ annotation, actionArea }: AnnotationItemProps) => {
  return (
    <Card key={annotation.id}  shadow="sm" padding="lg" radius="md" withBorder >
      <Stack>
        <Group justify="space-between" align="center">
          <Text>{annotation.symbol}</Text>
          {!!actionArea && (
            actionArea
          )}
        </Group>
        <Text size="xs">
          {annotation.latitude}, {annotation.longitude}
        </Text>
      </Stack>
    </Card>
  );
};
