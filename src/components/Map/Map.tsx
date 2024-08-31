import { Map as MapboxMap } from 'react-map-gl';
import { MapProps } from './Map.types.ts';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAnnotations } from '../../client/annotation/useAnnotations.tsx';
import { useEffect } from 'react';

export const Map = ({ mapboxAccessToken }: MapProps) => {

  const { data } = useAnnotations();
  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <MapboxMap
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      attributionControl={false}
      style={{ flex: 1 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
};
