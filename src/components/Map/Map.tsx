import { useEffect, useState } from 'react';
import { Text } from '@mantine/core';
import { Map as MapboxMap, Marker as MapboxMarker } from 'react-map-gl';
import { MapProps } from './Map.types.ts';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAnnotations } from '../../client/annotation/useAnnotations.tsx';
import { Annotation } from '../../../graphql/client/graphql.ts';

export const Map = ({ mapboxAccessToken }: MapProps) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const { data: annotationsData } = useAnnotations();

  useEffect(() => {
    const updatedAnnotations = annotationsData?.annotations?.filter((x) => !!x);
    if (!updatedAnnotations) return;
    setAnnotations(updatedAnnotations);
  }, [annotationsData]);

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
    >
      {annotations.map((annotation) => (
        <MapboxMarker
          key={annotation.id}
          latitude={annotation.latitude ?? 0}
          longitude={annotation.longitude ?? 0}
        >
          <Text>{annotation.title}</Text>
        </MapboxMarker>
      ))}
    </MapboxMap>
  );
};
