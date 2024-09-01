import { Stack } from '@mantine/core';
import { AnnotationListProps } from './AnnotationList.types.ts';
import { Annotation } from '../Annotation';

export const AnnotationList = ({ annotations }: AnnotationListProps) => {
  return (
    <Stack>
      {annotations.map((annotation) => {
        return <Annotation key={annotation.id} annotation={annotation} />;
      })}
    </Stack>
  );
};
