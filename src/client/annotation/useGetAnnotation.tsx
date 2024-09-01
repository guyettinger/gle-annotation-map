import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../graphql';
import { execute } from '../execute.ts';

const getAnnotationQuery = graphql(/* GraphQL */ `
  query getAnnotation($id: Int!) {
    getAnnotation(id: $id) {
      id
      title
    }
  }
`);

export const useGetAnnotation = (id: number) => {
  return useQuery({
    queryKey: [`annotation-${id}`],
    queryFn: () => execute(getAnnotationQuery, { id }),
  });
};
