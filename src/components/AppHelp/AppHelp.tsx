import { ActionIcon, Divider, HoverCard, Kbd, Stack, Text } from '@mantine/core';
import { AppHelpProps } from './AppHelp.types.ts';
import { IconHelp } from '@tabler/icons-react';

export const AppHelp = ({}: AppHelpProps) => {
  return (
    <Stack>
      <HoverCard width={400} shadow="md">
        <HoverCard.Target>
          <ActionIcon variant={'subtle'}>
            <IconHelp />
          </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack>
            <Text size="xl">Moji Map Help</Text>
            <Divider />
            <Text>Map</Text>
            <Text size={'sm'}>
              <Kbd>left click</Kbd> on the map to create symbol
            </Text>
            <Text size={'sm'}>
              <Kbd>⌘</Kbd> + <Kbd>left click</Kbd> to quick create the last symbol
            </Text>
            <Divider />
            <Text>List</Text>
            <Text size={'sm'}>click the "filter by" button to apply a filter symbol</Text>
            <Text size={'sm'}>click the "clear" button to remove the filter symbol</Text>
            <Text size={'sm'}>click on the card "x" button to delete the annotation</Text>
            <Text size={'sm'}>click on a card to fly to the annotation location</Text>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </Stack>
  );
};
