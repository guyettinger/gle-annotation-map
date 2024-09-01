import { useMutation } from '@tanstack/react-query';
import { graphql } from '../../../graphql/client';
import { executeGraphql } from '../executeGraphql.ts';
import { CreateAnnotationMutationVariables } from '../../../graphql/client/graphql.ts';

const createAnnotationMutation = graphql(/* GraphQL */ `
  mutation createAnnotation($input: AnnotationInput) {
    createAnnotation(input: $input) {
      id
    }
  }
`);

export const useCreateAnnotation = () => {
  return useMutation({
    mutationFn: (variables: CreateAnnotationMutationVariables) => executeGraphql(createAnnotationMutation, variables),
  });
};
