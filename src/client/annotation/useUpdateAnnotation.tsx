import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphql } from '../../../graphql/client';
import { executeGraphql } from '../executeGraphql.ts';
import { MutationUpdateAnnotationArgs } from '../../../graphql/client/graphql.ts';

const updateAnnotationMutation = graphql(/* GraphQL */ `
  mutation updateAnnotation($input: AnnotationInput) {
    updateAnnotation(input: $input) {
      id
    }
  }
`);

export const useUpdateAnnotation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: MutationUpdateAnnotationArgs) =>
      executeGraphql(updateAnnotationMutation, variables),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['annotations', variables?.input?.id] });
    },
  });
};
