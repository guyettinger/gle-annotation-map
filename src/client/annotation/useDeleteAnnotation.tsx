import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphql } from '../../../graphql/client';
import { executeGraphql } from '../executeGraphql.ts';
import { MutationDeleteAnnotationArgs } from '../../../graphql/client/graphql.ts';

const deleteAnnotationMutation = graphql(/* GraphQL */ `
  mutation deleteAnnotation($id: Int!) {
    deleteAnnotation(id: $id) {
      id
    }
  }
`);

export const useDeleteAnnotation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: MutationDeleteAnnotationArgs) => executeGraphql(deleteAnnotationMutation, variables),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['annotations', variables.id] });
    },
  });
};
