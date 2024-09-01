import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: CreateAnnotationMutationVariables) => executeGraphql(createAnnotationMutation, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['annotations'] })
    },
  });
};
