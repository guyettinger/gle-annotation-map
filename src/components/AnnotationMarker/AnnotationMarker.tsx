import { Marker } from 'react-map-gl';
import { AnnotationMarkerProps } from './AnnotationMarker.types.ts';
import { AnnotationSymbol } from '../AnnotationSymbol';

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
      latitude={annotation.latitude}
      longitude={annotation.longitude}
      onClick={handleClick}
    >
      <AnnotationSymbol symbol={annotation.symbol} />
    </Marker>
  );
};
