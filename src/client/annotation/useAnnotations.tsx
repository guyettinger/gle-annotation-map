import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../graphql/client/';
import { executeGraphql } from '../executeGraphql.ts';

const annotationsQuery = graphql(/* GraphQL */ `
  query Annotations {
    annotations {
      id
      title
      latitude
      longitude
      symbol
    }
  }
`);

export const useAnnotations = () => {
  return useQuery({
    queryKey: ['annotations'],
    queryFn: () => executeGraphql(annotationsQuery),
  });
};
