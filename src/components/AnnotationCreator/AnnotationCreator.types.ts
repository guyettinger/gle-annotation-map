import { AnnotationInput } from '../../../graphql/client/graphql.ts';

export interface AnnotationCreatorProps {
  annotationInput: AnnotationInput;
  onCreateAnnotation?: (annotationInput: AnnotationInput) => void;
  onCreateAnnotationPreview?: (annotationInput: AnnotationInput) => void;
  onCancelCreateAnnotation?: (annotationInput: AnnotationInput) => void;
}