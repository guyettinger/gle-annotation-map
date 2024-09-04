import { createInfiniteQuery } from 'react-query-kit';
import { graphql } from '../../../graphql/client';
import { executeGraphql } from '../executeGraphql.ts';
import {
  GetAnnotationsQuery,
  GetAnnotationsQueryVariables,
} from '../../../graphql/client/graphql.ts';

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

const getAnnotationsQuery = (
  getAnnotationsQueryVariables: GetAnnotationsQueryVariables,
  { pageParam }: { pageParam: number },
) => {
  const queryVariables = {
    ...getAnnotationsQueryVariables,
    input: {
      ...getAnnotationsQueryVariables.input,
      skip: pageParam,
    }
  }
  return executeGraphql(annotationsQuery, queryVariables);
};

export const useGetAnnotations = createInfiniteQuery<
  GetAnnotationsQuery,
  GetAnnotationsQueryVariables
>({
  queryKey: ['annotations'],
  fetcher: getAnnotationsQuery,
  getNextPageParam: (lastPage, allPages) => {
    const annotations = allPages
      ?.flatMap((page) => page.getAnnotations?.annotations ?? [])

    const annotationCurrentCount = annotations.length;
    const annotationTotalCount = lastPage.getAnnotations?.count ?? 0

    if(annotationCurrentCount < annotationTotalCount) {
      return annotationCurrentCount
    } else {
      return undefined;
    }
  },
  initialPageParam: 0,
});
