import { AppShell, Box, Burger, Group, MantineProvider, Skeleton } from '@mantine/core';
import '@mantine/core/styles.css';
import { Map } from './components';
import { useDisclosure } from '@mantine/hooks';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const headerHeight = 60;
const footerHeight = 60;
const mainHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;

const App = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <MantineProvider>
      <AppShell
        header={{ height: headerHeight }}
        footer={{ height: footerHeight }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
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
        <AppShell.Main m={0} p={0}>
          <Box h={mainHeight} style={{ flex: 1, marginTop: headerHeight }}>
            <Map mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
          </Box>
        </AppShell.Main>
        <AppShell.Aside p="md">Aside</AppShell.Aside>
        <AppShell.Footer p="md">Footer</AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
