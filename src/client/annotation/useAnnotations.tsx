import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../graphql';
import { execute } from '../execute.ts';

const annotationsQuery = graphql(/* GraphQL */ `
  query Annotations {
    annotations {
      id
      title
    }
  }
`);

export const useAnnotations = () => {
  return useQuery({
    queryKey: ['annotations'],
    queryFn: () => execute(annotationsQuery),
  });
};
