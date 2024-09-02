import { Annotation } from '../../../graphql/client/graphql.ts';

export interface AnnotationMarkerProps {
  annotation: Annotation;
  onAnnotationMarkerClick?: (annotation:Annotation) => void;
}