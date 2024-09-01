import { ReactNode } from 'react';
import { MapLayerMouseEvent } from 'react-map-gl';

export interface MapProps {
  mapboxAccessToken: string;
  children: ReactNode;
  onMapClick?: (e: MapLayerMouseEvent) => void;
}