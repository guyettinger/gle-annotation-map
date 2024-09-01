import { Text } from '@mantine/core';
import { AnnotationMarkerProps } from './AnnotationMarker.types.ts';
import { Marker as MapboxMarker } from 'react-map-gl';

export const AnnotationMarker = ({ annotation }: AnnotationMarkerProps) => {
  return (
    <MapboxMarker
      key={annotation.id}
      latitude={annotation.latitude ?? 0}
      longitude={annotation.longitude ?? 0}
    >
      <Text>{annotation.symbol}</Text>
    </MapboxMarker>
  );
};
