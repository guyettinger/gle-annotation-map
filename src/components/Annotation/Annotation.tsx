import { Stack, Text } from '@mantine/core';
import { AnnotationProps } from './Annotation.types.ts';

export const Annotation = ({ annotation }: AnnotationProps) => {
  return (
    <Stack>
      <Text>{annotation.title}</Text>
    </Stack>
  );
};
