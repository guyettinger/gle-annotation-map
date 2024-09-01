import { ReactNode } from 'react';
import { Annotation } from '../../../graphql/client/graphql.ts';

export interface AnnotationListProps {
  annotations: Annotation[];
  renderAnnotationItem?: (annotation: Annotation) => ReactNode;
}
