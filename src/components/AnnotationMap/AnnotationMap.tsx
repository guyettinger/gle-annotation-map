import { useCallback } from 'react';
import { GeolocateControl, Layer, Map as MapboxMap, MapLayerMouseEvent, SkyLayer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AnnotationMapProps } from './AnnotationMap.types.ts';

const skyLayer: SkyLayer = {
  id: 'sky',
  type: 'sky',
  paint: {
    'sky-type': 'atmosphere',
    'sky-atmosphere-sun': [0.0, 0.0],
    'sky-atmosphere-sun-intensity': 7
  }
};

export const AnnotationMap = ({
  children,
  mapId,
  mapboxAccessToken,
  onMapClick,
}: AnnotationMapProps) => {
  const handleMapClick = useCallback(
    (e: MapLayerMouseEvent) => {
      onMapClick?.(e);
    },
    [onMapClick],
  );
  return (
    <MapboxMap
      reuseMaps
      id={mapId}
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
      <GeolocateControl />
      {children}
      <Layer {...skyLayer} />
    </MapboxMap>
  );
};
