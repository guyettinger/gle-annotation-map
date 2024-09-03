import { GetAnnotationsQueryVariables } from '../../../graphql/client/graphql.ts';

export interface AnnotationFilterExpressionProps {
  queryVariables: GetAnnotationsQueryVariables;
  onQueryVariablesChange?: (queryVariables: GetAnnotationsQueryVariables) => void;
}
