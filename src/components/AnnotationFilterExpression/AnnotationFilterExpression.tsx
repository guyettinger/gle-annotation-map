import { useCallback, useState, MouseEvent } from 'react';
import { Button, Group, Paper, Text } from '@mantine/core';
import { AnnotationFilterExpressionProps } from './AnnotationFilterExpression.types.ts';
import { GetAnnotationsQueryVariables } from '../../../graphql/client/graphql.ts';
import { AnnotationSymbolPicker } from '../AnnotationSymbolPicker';

export const AnnotationFilterExpression = ({
  queryVariables,
  onQueryVariablesChange,
}: AnnotationFilterExpressionProps) => {
  const [getAnnotationsQueryVariables, setGetAnnotationsQueryVariables] =
    useState<GetAnnotationsQueryVariables>({ ...queryVariables });

  const handleSymbolChange = useCallback(
    (symbol: string) => {
      const nextGetAnnotationsQueryVariables = {
        ...getAnnotationsQueryVariables,
        input: {
          ...getAnnotationsQueryVariables.input,
          filter: symbol,
        },
      };
      onQueryVariablesChange?.(nextGetAnnotationsQueryVariables);
      setGetAnnotationsQueryVariables(nextGetAnnotationsQueryVariables);
    },
    [onQueryVariablesChange, getAnnotationsQueryVariables],
  );

  const handleClearClick = (event: MouseEvent) => {
    const nextGetAnnotationsQueryVariables = {
      ...getAnnotationsQueryVariables,
      input: {
        ...getAnnotationsQueryVariables.input,
        filter: undefined,
      },
    };
    onQueryVariablesChange?.(nextGetAnnotationsQueryVariables);
    setGetAnnotationsQueryVariables(nextGetAnnotationsQueryVariables);
    event.stopPropagation();
  };

  return (
    <Group justify={'space-between'}>
      <Group>
        <Text>Filter by</Text>
        <Paper withBorder={true} w={56}>
          <AnnotationSymbolPicker
            size={'xs'}
            w={54}
            symbol={getAnnotationsQueryVariables?.input?.filter ?? ''}
            onSymbolChange={handleSymbolChange}
          />
        </Paper>
        {!!getAnnotationsQueryVariables?.input?.filter && (
          <Button variant={'subtle'} size={'compact-xs'} onClick={handleClearClick}>clear</Button>
        )}
      </Group>
    </Group>
  );
};
