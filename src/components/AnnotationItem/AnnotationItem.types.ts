import { ReactNode } from 'react';
import { Annotation } from '../../../graphql/client/graphql.ts';

export interface AnnotationItemProps {
  annotation: Annotation;
  actionArea?: ReactNode;
}