import { AnnotationProps } from './Annotation.types.ts';

export const Annotation = ({annotation}:AnnotationProps) => {
  return (<>{annotation.id}</>)
}