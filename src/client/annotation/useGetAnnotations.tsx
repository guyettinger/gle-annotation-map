import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../graphql/client';
import { executeGraphql } from '../executeGraphql.ts';
import { GetAnnotationsQueryVariables } from '../../../graphql/client/graphql.ts';

const annotationsQuery = graphql(/* GraphQL */ `
  query getAnnotations($input: GetAnnotationsInput!) {
    getAnnotations(input: $input) {
      annotations {
        id
        latitude
        longitude
        symbol
        note
      }
      count
    }
  }
`);

export const useGetAnnotations = (getAnnotationsQueryVariables: GetAnnotationsQueryVariables) => {
  return useQuery({
    queryKey: ['annotations', getAnnotationsQueryVariables.input?.filter],
    queryFn: () => executeGraphql(annotationsQuery, getAnnotationsQueryVariables),
  });
};
