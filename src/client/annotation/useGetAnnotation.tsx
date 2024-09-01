import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../graphql/client';
import { executeGraphql } from '../executeGraphql.ts';

const getAnnotationQuery = graphql(/* GraphQL */ `
  query getAnnotation($id: Int!) {
    getAnnotation(id: $id) {
      id
      title
      latitude
      longitude
      symbol
    }
  }
`);

export const useGetAnnotation = (id: number) => {
  return useQuery({
    queryKey: [`annotation-${id}`],
    queryFn: () => executeGraphql(getAnnotationQuery, { id }),
  });
};
