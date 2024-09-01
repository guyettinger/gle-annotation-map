import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell, Box, Burger, Group, MantineProvider, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';
import { Map } from './components';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useCallback } from 'react';

const queryClient = new QueryClient();

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const headerHeight = 60;
const footerHeight = 60;
const navbarWidth = 300;
const asideWidth = 375;

const App = () => {
  const [opened, { toggle }] = useDisclosure();

  const handleEmojiClick = useCallback((emojiData: EmojiClickData, event: MouseEvent)=>{
    console.log(emojiData);
    event.preventDefault();
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AppShell
          header={{ height: headerHeight }}
          footer={{ height: footerHeight }}
          navbar={{ width: navbarWidth, breakpoint: 'sm', collapsed: { mobile: !opened } }}
          aside={{
            width: asideWidth,
            breakpoint: 'md',
            collapsed: { desktop: false, mobile: true },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Text>Logo</Text>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            Navbar
            {Array(15)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} h={28} mt="sm" animate={false} />
              ))}
          </AppShell.Navbar>
          <AppShell.Main
            h="calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
            p={0}
            pt={headerHeight}
            pb={footerHeight}
            style={{ display: 'flex' }}
          >
            <Box style={{ flex: 1 }}>
              <Map mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
            </Box>
          </AppShell.Main>
          <AppShell.Aside p="md">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </AppShell.Aside>
          <AppShell.Footer p="md">Footer</AppShell.Footer>
        </AppShell>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
