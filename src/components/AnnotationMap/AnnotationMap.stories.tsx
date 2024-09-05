import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mantine/core';
import { AnnotationMap } from './AnnotationMap';
import { AnnotationMapProps } from './AnnotationMap.types.ts';
import { AnnotationMarker } from '../AnnotationMarker';

const meta = {
  title: 'AnnotationMap',
  component: AnnotationMap,
} satisfies Meta<typeof AnnotationMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicAnnotationMap: Story = ({ children, ...props }: AnnotationMapProps) => {
  return (
    <Box style={{ flex: 1, width: 500, height: 500 }}>
      <AnnotationMap {...props}>{children}</AnnotationMap>
    </Box>
  );
};

const annotation = { id: 1, latitude: 1.0, longitude: 1.0, symbol: '👍', note: 'testing 1' };

BasicAnnotationMap.args = {
  mapId: 'testMap',
  mapboxAccessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
  children: <AnnotationMarker annotation={annotation} />,
};
