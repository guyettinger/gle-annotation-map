import { ScrollArea, Stack } from '@mantine/core';
import { AnnotationListProps } from './AnnotationList.types.ts';
import { AnnotationItem } from '../AnnotationItem';

export const AnnotationList = ({ annotations }: AnnotationListProps) => {
  return (
    <ScrollArea.Autosize offsetScrollbars={true} scrollbarSize={4}>
      <Stack>
        {annotations.map((annotation) => {
          return <AnnotationItem key={annotation.id} annotation={annotation} />;
        })}
      </Stack>
    </ScrollArea.Autosize>
  );
};
