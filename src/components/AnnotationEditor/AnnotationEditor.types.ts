import { Annotation } from '../../../graphql/client/graphql.ts';

export interface AnnotationEditorProps {
  annotation: Annotation;
  onEditAnnotation: (annotation: Annotation) => void;
  onCancelEditAnnotation: (annotation: Annotation) => void;
}
