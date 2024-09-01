import { useEffect } from 'react';
import { Map as MapboxMap } from 'react-map-gl';
import { MapProps } from './Map.types.ts';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAnnotations } from '../../client/annotation/useAnnotations.tsx';
import { useGetAnnotation } from '../../client/annotation/useGetAnnotation.tsx';

export const Map = ({ mapboxAccessToken }: MapProps) => {

  const { data:annotationsData } = useAnnotations();
  useEffect(() => {
    console.log('annotationsData', annotationsData);
  }, [annotationsData]);

  const {data:annotationData} = useGetAnnotation(1);

  useEffect(() => {
    console.log('annotationData', annotationData);
  }, [annotationData]);

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
