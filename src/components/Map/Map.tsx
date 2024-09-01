import { useEffect, useState } from 'react';
import { Map as MapboxMap, MapLayerMouseEvent, Marker as MapboxMarker } from 'react-map-gl';
import { MapProps } from './Map.types.ts';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAnnotations } from '../../client/annotation/useAnnotations.tsx';
import { Annotation } from '../../../graphql/client/graphql.ts';
import { Text } from '@mantine/core';
import { useCreateAnnotation } from '../../client/annotation/useCreateAnnotation.tsx';

export const Map = ({ mapboxAccessToken }: MapProps) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const createAnnotationMutation = useCreateAnnotation();
  const { data: annotationsData } = useAnnotations();
  useEffect(() => {
    const annotations = annotationsData?.annotations?.filter((x) => !!x);
    if (!annotations) return;
    setAnnotations(annotations);
  }, [annotationsData]);

  const handleMapClick = (e: MapLayerMouseEvent) => {
    const newAnnotation = {
      title: '👍',
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
      symbol: '👍',
    };
    console.log(newAnnotation);
    createAnnotationMutation.mutate({
      input: newAnnotation,
    });
    e.preventDefault();
  };
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
