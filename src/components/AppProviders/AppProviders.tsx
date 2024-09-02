import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { MapProvider } from 'react-map-gl';
import { AppProvidersProps } from './AppProviders.types.ts';

const queryClient = new QueryClient();
export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <MapProvider>{children}</MapProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
