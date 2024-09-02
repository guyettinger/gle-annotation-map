import { Text } from '@mantine/core';
import { Marker } from 'react-map-gl';
import { AnnotationPreviewMarkerProps } from './AnnotationPreviewMarker.types.ts';

export const AnnotationPreviewMarker = ({ annotationInput }: AnnotationPreviewMarkerProps) => {
  return (
    <Marker
      key={annotationInput.latitude! + annotationInput.longitude!}
      latitude={annotationInput.latitude!}
      longitude={annotationInput.longitude!}
    >
      <Text>{annotationInput.symbol}</Text>
    </Marker>
  );
};
