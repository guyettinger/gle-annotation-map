import { Card, Stack, Text } from '@mantine/core';
import { AnnotationItemProps } from './AnnotationItem.types.ts';

export const AnnotationItem = ({ annotation }: AnnotationItemProps) => {
  return (
    <Card key={annotation.id}  shadow="sm" padding="lg" radius="md" withBorder >
      <Stack>
        <Text>{annotation.title}</Text>
        <Text size="xs">
          {annotation.latitude}, {annotation.longitude}
        </Text>
      </Stack>
    </Card>
  );
};
