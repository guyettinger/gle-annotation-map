import { useCallback, useEffect, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { MapLayerMouseEvent } from 'react-map-gl';
import { AppShell, Box, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';
import { Annotation } from '../../../graphql/client/graphql.ts';
import { useCreateAnnotation } from '../../client/annotation/useCreateAnnotation.tsx';
import { useAnnotations } from '../../client/annotation/useAnnotations.tsx';
import { AnnotationList } from '../AnnotationList';
import { AnnotationMarker } from '../AnnotationMarker';
import { Map } from '../Map';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const headerHeight = 60;
const footerHeight = 60;
const navbarWidth = 300;
const asideWidth = 375;

export const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure();

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

  const handleEmojiClick = useCallback((emojiData: EmojiClickData, event: MouseEvent) => {
    console.log(emojiData);
    event.preventDefault();
  }, []);

  return (
    <AppShell
      header={{ height: headerHeight }}
      footer={{ height: footerHeight }}
      navbar={{ width: navbarWidth, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{
        width: asideWidth,
        breakpoint: 'md',
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>Logo</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        <AnnotationList annotations={annotations} />
      </AppShell.Navbar>
      <AppShell.Main
        h="calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
        p={0}
        pt={headerHeight}
        pb={footerHeight}
        style={{ display: 'flex' }}
      >
        <Box style={{ flex: 1 }}>
          <Map mapboxAccessToken={MAPBOX_ACCESS_TOKEN} onMapClick={handleMapClick}>
            {annotations.map((annotation) => (
              <AnnotationMarker key={annotation.id} annotation={annotation} />
            ))}
          </Map>
        </Box>
      </AppShell.Main>
      <AppShell.Aside p="md">
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
};
