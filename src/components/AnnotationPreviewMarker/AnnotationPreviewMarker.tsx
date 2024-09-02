import { Marker } from 'react-map-gl';
import { AnnotationPreviewMarkerProps } from './AnnotationPreviewMarker.types.ts';
import { AnnotationSymbol } from '../AnnotationSymbol';

export const AnnotationPreviewMarker = ({ annotationInput }: AnnotationPreviewMarkerProps) => {
  return (
    <Marker
      key={annotationInput.latitude + annotationInput.longitude}
      latitude={annotationInput.latitude}
      longitude={annotationInput.longitude}
    >
      <AnnotationSymbol symbol={annotationInput.symbol} />
    </Marker>
  );
};
