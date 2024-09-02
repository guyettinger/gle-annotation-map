import { Map as MapboxMap, MapLayerMouseEvent } from 'react-map-gl';
import { MapProps } from './Map.types.ts';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback } from 'react';

export const Map = ({ mapboxAccessToken, children, onMapClick }: MapProps) => {
  const handleMapClick = useCallback(
    (e: MapLayerMouseEvent) => {
      onMapClick?.(e);
    },
    [onMapClick],
  );
  return (
    <MapboxMap
      reuseMaps
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      attributionControl={false}
      style={{ flex: 1 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onClick={handleMapClick}
    >
      {children}
    </MapboxMap>
  );
};
