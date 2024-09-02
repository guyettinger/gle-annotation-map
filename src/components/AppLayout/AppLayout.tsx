import { useEffect, useState, MouseEvent as ReactMouseEvent } from 'react';
import { MapLayerMouseEvent, Popup } from 'react-map-gl';
import { ActionIcon, AppShell, Box, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';
import { IconX } from '@tabler/icons-react';
import { Annotation, AnnotationInput } from '../../../graphql/client/graphql.ts';
import { useCreateAnnotation } from '../../client/annotation/useCreateAnnotation.tsx';
import { useAnnotations } from '../../client/annotation/useAnnotations.tsx';
import { AnnotationList } from '../AnnotationList';
import { AnnotationMarker } from '../AnnotationMarker';
import { Map } from '../Map';
import { AnnotationItem } from '../AnnotationItem';
import { useDeleteAnnotation } from '../../client/annotation/useDeleteAnnotation.tsx';
import { AnnotationEditor } from '../AnnotationEditor';
import { AnnotationCreator } from '../AnnotationCreator';
import { AnnotationPreviewMarker } from '../AnnotationPreviewMarker';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const headerHeight = 60;
const footerHeight = 40;
const navbarWidth = 300;
const asideWidth = 375;

export const AppLayout = () => {
  // app layout open
  const [opened, { toggle }] = useDisclosure();

  // selected emoji
  const [emoji, setEmoji] = useState<string>('👍');

  // all annotations
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const { data: annotationsData } = useAnnotations();
  useEffect(() => {
    const annotations = annotationsData?.annotations?.filter((x) => !!x);
    if (!annotations) return;
    setAnnotations(annotations);
  }, [annotationsData]);

  // create an annotation
  const [createAnnotation, setCreateAnnotation] = useState<AnnotationInput | null>(null);
  const createAnnotationMutation = useCreateAnnotation();

  // edit an annotation
  const [editAnnotation, setEditAnnotation] = useState<Annotation | null>(null);

  // delete an annotation
  const deleteAnnotationMutation = useDeleteAnnotation();

  const handleMapClick = (e: MapLayerMouseEvent) => {
    console.log('handleMapClick', e);
    const createAnnotationInput = {
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
      symbol: emoji,
      note: '',
    };
    setCreateAnnotation(createAnnotationInput);
  };

  const handleMarkerClick = (annotation: Annotation) => {
    console.log('handleMarkerClick', annotation);
    setEditAnnotation(annotation);
  };

  const handleAnnotationItemDeleteClick = (annotation: Annotation, event: ReactMouseEvent) => {
    deleteAnnotationMutation.mutate({
      id: annotation.id,
    });
    event.stopPropagation();
  };

  const handleRenderAnnotationItem = (annotation: Annotation) => {
    return (
      <AnnotationItem
        key={annotation.id}
        annotation={annotation}
        actionArea={
          <ActionIcon
            variant="transparent"
            size="sm"
            onClick={(e) => handleAnnotationItemDeleteClick(annotation, e)}
          >
            <IconX />
          </ActionIcon>
        }
      />
    );
  };

  const handleCreateAnnotation = (annotationInput: AnnotationInput) => {
    // remember the last emoji used
    const emoji = annotationInput.symbol ?? '👍';
    setEmoji(emoji);

    // create annotation
    createAnnotationMutation.mutate({
      input: annotationInput,
    });

    // reset
    setCreateAnnotation(null);
  };

  const handleCancelCreateAnnotation = (annotationInput: AnnotationInput) => {
    console.log('handleCancelCreateAnnotation', annotationInput);
    setCreateAnnotation(null);
  };

  const handleEditAnnotation = (annotation: Annotation) => {
    console.log('handleEditAnnotation', annotation);
    setEditAnnotation(null);
  };

  const handleCancelEditAnnotation = (annotation: Annotation) => {
    console.log('handleCancelEditAnnotation', annotation);
    setEditAnnotation(null);
  };

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
          <Text size={'xl'}>{emoji} Moji Map</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AnnotationList
          annotations={annotations}
          renderAnnotationItem={handleRenderAnnotationItem}
        />
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
            <>
              {annotations.map((annotation) => (
                <AnnotationMarker
                  key={annotation.id}
                  annotation={annotation}
                  onAnnotationMarkerClick={handleMarkerClick}
                />
              ))}
              {!!editAnnotation && (
                <>
                  <Popup
                    key={editAnnotation.id}
                    latitude={editAnnotation.latitude!}
                    longitude={editAnnotation.longitude!}
                    anchor="bottom"
                    offset={10}
                    onClose={() => setEditAnnotation(null)}
                  >
                    <AnnotationEditor
                      annotation={editAnnotation}
                      onEditAnnotation={handleEditAnnotation}
                      onCancelEditAnnotation={handleCancelEditAnnotation}
                    />
                  </Popup>
                </>
              )}
              {!!createAnnotation && (
                <>
                  <Popup
                    key={createAnnotation.latitude! + createAnnotation.longitude!}
                    latitude={createAnnotation.latitude!}
                    longitude={createAnnotation.longitude!}
                    anchor="bottom"
                    offset={10}
                    onClose={() => setCreateAnnotation(null)}
                  >
                    <AnnotationCreator
                      annotationInput={createAnnotation}
                      onCreateAnnotation={handleCreateAnnotation}
                      onCancelCreateAnnotation={handleCancelCreateAnnotation}
                    />
                    <AnnotationPreviewMarker annotationInput={createAnnotation} />
                  </Popup>
                </>
              )}
            </>
          </Map>
        </Box>
      </AppShell.Main>
      <AppShell.Footer p={'xs'}>
        <Group justify={'flex-end'}>Guy Ettinger</Group>
      </AppShell.Footer>
    </AppShell>
  );
};
