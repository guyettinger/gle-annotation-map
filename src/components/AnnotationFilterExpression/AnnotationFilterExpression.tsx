import { Stack } from '@mantine/core';
import { AnnotationFilterExpressionProps } from './AnnotationFilterExpression.types.ts';
import { GetAnnotationsQueryVariables } from '../../../graphql/client/graphql.ts';
import { useCallback, useState } from 'react';
import { AnnotationSymbolPicker } from '../AnnotationSymbolPicker';

export const AnnotationFilterExpression = ({queryVariables, onQueryVariablesChange}: AnnotationFilterExpressionProps) => {
  const [getAnnotationsQueryVariables, setGetAnnotationsQueryVariables] = useState<GetAnnotationsQueryVariables>({...queryVariables});

  const handleSymbolChange = useCallback(
    (symbol: string) => {
      const nextGetAnnotationsQueryVariables = {
        ...getAnnotationsQueryVariables,
        input: {
          ...getAnnotationsQueryVariables.input,
          filter: symbol,
        }
      }
      console.log("onQueryVariablesChange", nextGetAnnotationsQueryVariables);
      onQueryVariablesChange?.(nextGetAnnotationsQueryVariables);
      setGetAnnotationsQueryVariables(nextGetAnnotationsQueryVariables)
    },
    [onQueryVariablesChange, getAnnotationsQueryVariables],
  );

  return <Stack>
    <AnnotationSymbolPicker symbol={getAnnotationsQueryVariables.input?.filter ?? ""} onSymbolChange={handleSymbolChange} /></Stack>;
};
