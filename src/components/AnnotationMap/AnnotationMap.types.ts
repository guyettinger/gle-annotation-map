import { ReactNode } from 'react';
import { MapLayerMouseEvent } from 'react-map-gl';

export interface AnnotationMapProps {
  mapId: string;
  mapboxAccessToken: string;
  children: ReactNode;
  onMapClick?: (e: MapLayerMouseEvent) => void;
}