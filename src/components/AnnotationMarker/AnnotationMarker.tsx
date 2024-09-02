import { Text } from '@mantine/core';
import { Marker } from 'react-map-gl';
import { AnnotationMarkerProps } from './AnnotationMarker.types.ts';

export const AnnotationMarker = ({
  annotation,
  onAnnotationMarkerClick,
}: AnnotationMarkerProps) => {
  const handleClick = (event: any) => {
    onAnnotationMarkerClick?.(annotation);
    event?.originalEvent?.stopPropagation();
  };

  return (
    <Marker
      key={annotation.id}
      latitude={annotation.latitude ?? 0}
      longitude={annotation.longitude ?? 0}
      onClick={handleClick}
    >
      <Text>{annotation.symbol}</Text>
    </Marker>
  );
};
