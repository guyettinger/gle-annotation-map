import { useCallback, useState, MouseEvent } from 'react';
import { ActionIcon, Group, Paper } from '@mantine/core';
import { IconFilterCancel, IconFilterSearch } from '@tabler/icons-react';
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
    <Paper shadow="xs" radius="xl" withBorder p="sm">
      <Group justify={'space-between'}>
        <Group>
          <IconFilterSearch size={20} />
          <AnnotationSymbolPicker
            size={'xs'}
            symbol={getAnnotationsQueryVariables.input?.filter ?? ''}
            onSymbolChange={handleSymbolChange}
          />
        </Group>
        <Group>
          <ActionIcon variant="transparent" size="sm" onClick={handleClearClick}>
            <IconFilterCancel size={20} />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
};
