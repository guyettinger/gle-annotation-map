import { ScrollArea, Stack } from '@mantine/core';
import { AnnotationListProps } from './AnnotationList.types.ts';
import { Annotation } from '../../../graphql/client/graphql.ts';
import { AnnotationItem } from '../AnnotationItem';

export const AnnotationList = ({
  annotations,
  renderAnnotationItem = (annotation: Annotation) => {
    return <AnnotationItem key={annotation.id} annotation={annotation} />;
  },
}: AnnotationListProps) => {
  return (
    <ScrollArea.Autosize offsetScrollbars={true} scrollbarSize={4} m={0}>
      <Stack m={5} gap={10}>
        {annotations.map((annotation) => {
          return renderAnnotationItem(annotation);
        })}
      </Stack>
    </ScrollArea.Autosize>
  );
};
