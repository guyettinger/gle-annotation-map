import { useEffect, useState, MouseEvent as ReactMouseEvent } from 'react';
import { MapLayerMouseEvent, Popup, useMap } from 'react-map-gl';
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Divider,
  Group,
  Image,
  Text,
  Stack,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';
import { IconX } from '@tabler/icons-react';
import {
  Annotation,
  AnnotationInput,
  GetAnnotationsQueryVariables,
} from '../../../graphql/client/graphql.ts';
import { useGetAnnotations } from '../../client/annotation/useGetAnnotations.tsx';
import { useCreateAnnotation } from '../../client/annotation/useCreateAnnotation.tsx';
import { useUpdateAnnotation } from '../../client/annotation/useUpdateAnnotation.tsx';
import { useDeleteAnnotation } from '../../client/annotation/useDeleteAnnotation.tsx';
import { AnnotationList } from '../AnnotationList';
import { AnnotationMarker } from '../AnnotationMarker';
import { AnnotationMap } from '../AnnotationMap';
import { AnnotationItem } from '../AnnotationItem';
import { AnnotationEditor } from '../AnnotationEditor';
import { AnnotationCreator } from '../AnnotationCreator';
import { AnnotationPreviewMarker } from '../AnnotationPreviewMarker';
import { AnnotationFilterExpression } from '../AnnotationFilterExpression';
import { AppHelp } from '../AppHelp';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const headerHeight = 60;
const footerHeight = 40;
const navbarWidth = 300;
const asideWidth = 375;
const defaultSymbol = '👍';
const mapId = 'annotationMap';
const annotationBatchSize = 100;

export const AppLayout = () => {
  // app layout open
  const [opened, { toggle }] = useDisclosure();

  // map
  const { annotationMap } = useMap();

  // symbol
  const [symbol, setSymbol] = useState<string>(defaultSymbol);

  // get annotations query params
  const [getAnnotationsVariables, setGetAnnotationsVariables] =
    useState<GetAnnotationsQueryVariables>({
      input: {
        filter: undefined,
        take: annotationBatchSize,
        skip: 0,
      },
    });

  // get annotations query
  const {
    data: annotationsData,
    isFetching,
    fetchNextPage,
  } = useGetAnnotations({ variables: getAnnotationsVariables });

  // annotation data
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    // if not fetching
    if (isFetching) return;

    // if there are pages
    const pages = annotationsData?.pages;
    if (!pages || pages.length === 0) return;

    // get annotations
    const nextAnnotations = pages
      ? pages.flatMap((page) => page.getAnnotations?.annotations ?? [])?.filter((x) => !!x)
      : [];

    // update new annotations
    setAnnotations(nextAnnotations);

    // fetch next page
    const lastPage = pages[pages.length - 1];
    const count = lastPage.getAnnotations?.count ?? 0;
    if (count <= nextAnnotations.length) return;
    fetchNextPage();
  }, [annotationsData, isFetching, fetchNextPage, annotations]);

  // create an annotation
  const [createAnnotation, setCreateAnnotation] = useState<AnnotationInput | null>(null);
  const createAnnotationMutation = useCreateAnnotation();

  // update an annotation
  const [updateAnnotation, setUpdateAnnotation] = useState<Annotation | null>(null);
  const updateAnnotationMutation = useUpdateAnnotation();

  // delete an annotation
  const deleteAnnotationMutation = useDeleteAnnotation();

  const handleOnQueryVariablesChange = (queryVariables: GetAnnotationsQueryVariables) => {
    setGetAnnotationsVariables(queryVariables);
  };

  // annotation item handlers
  const handleAnnotationItemClick = (annotation: Annotation) => {
    if (!annotation) return;
    annotationMap?.flyTo({ center: [annotation.longitude, annotation.latitude] });
  };

  const handleAnnotationItemDeleteClick = (annotation: Annotation, event: ReactMouseEvent) => {
    deleteAnnotationMutation.mutate({
      id: annotation.id,
    });
    event.stopPropagation();
  };

  // annotation map handlers
  const handleAnnotationMapClick = (e: MapLayerMouseEvent) => {
    const createAnnotationInput = {
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
      symbol: symbol,
      note: '',
    };

    const isControlKeyPressed = !!e.originalEvent?.metaKey || !!e.originalEvent?.ctrlKey;
    if (isControlKeyPressed) {
      // shortcut for quick create
      handleCreateAnnotation(createAnnotationInput);
    } else {
      // show create dialog
      setCreateAnnotation(createAnnotationInput);
    }
  };

  const handleAnnotationMarkerClick = (annotation: Annotation) => {
    setUpdateAnnotation(annotation);
  };

  const handleCreateAnnotation = (annotationInput: AnnotationInput) => {
    // remember the last symbol used
    const symbol = annotationInput.symbol ?? defaultSymbol;
    setSymbol(symbol);

    // create annotation
    createAnnotationMutation.mutate({
      input: annotationInput,
    });

    // reset
    setCreateAnnotation(null);
  };

  const handleCancelCreateAnnotation = (_annotationInput: AnnotationInput) => {
    setCreateAnnotation(null);
  };

  const handleEditAnnotation = (annotation: Annotation) => {
    // remember the last symbol used
    const symbol = annotation.symbol ?? defaultSymbol;
    setSymbol(symbol);

    // update annotation
    updateAnnotationMutation.mutate({
      input: annotation,
    });

    // reset
    setUpdateAnnotation(null);
  };

  const handleCancelEditAnnotation = (_annotation: Annotation) => {
    setUpdateAnnotation(null);
  };

  const renderAnnotationItem = (annotation: Annotation) => {
    return (
      <AnnotationItem
        key={annotation.id}
        annotation={annotation}
        onAnnotationItemClick={handleAnnotationItemClick}
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
        <Group h="100%" px="sm" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text size={'32px'}>{symbol}</Text>
            <Text size={'xl'}>Moji Map</Text>
          </Group>
          <Group>
            <AppHelp />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Stack p={'sm'}>
          <AnnotationFilterExpression
            queryVariables={getAnnotationsVariables}
            onQueryVariablesChange={handleOnQueryVariablesChange}
          />
        </Stack>
        <Divider />
        <AnnotationList annotations={annotations} renderAnnotationItem={renderAnnotationItem} />
      </AppShell.Navbar>
      <AppShell.Main
        h="calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
        p={0}
        pt={headerHeight}
        pb={footerHeight}
        style={{ display: 'flex' }}
      >
        <Box style={{ flex: 1 }}>
          <AnnotationMap
            mapId={mapId}
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            onMapClick={handleAnnotationMapClick}
          >
            <>
              {annotations.map((annotation) => (
                <AnnotationMarker
                  key={annotation.id}
                  annotation={annotation}
                  onAnnotationMarkerClick={handleAnnotationMarkerClick}
                />
              ))}
              {!!updateAnnotation && (
                <>
                  <Popup
                    key={updateAnnotation.id}
                    latitude={updateAnnotation.latitude}
                    longitude={updateAnnotation.longitude}
                    anchor="bottom"
                    offset={10}
                    onClose={() => setUpdateAnnotation(null)}
                  >
                    <AnnotationEditor
                      annotation={updateAnnotation}
                      onEditAnnotation={handleEditAnnotation}
                      onEditAnnotationPreview={(nextAnnotation) => {
                        setUpdateAnnotation(nextAnnotation);
                      }}
                      onCancelEditAnnotation={handleCancelEditAnnotation}
                    />
                  </Popup>
                  <AnnotationPreviewMarker annotationInput={updateAnnotation} />
                </>
              )}
              {!!createAnnotation && (
                <>
                  <Popup
                    key={createAnnotation.latitude + createAnnotation.longitude}
                    latitude={createAnnotation.latitude}
                    longitude={createAnnotation.longitude}
                    anchor="bottom"
                    offset={10}
                    onClose={() => setCreateAnnotation(null)}
                  >
                    <AnnotationCreator
                      annotationInput={createAnnotation}
                      onCreateAnnotation={handleCreateAnnotation}
                      onCancelCreateAnnotation={handleCancelCreateAnnotation}
                      onCreateAnnotationPreview={(nextAnnotationInput) => {
                        setCreateAnnotation(nextAnnotationInput);
                      }}
                    />
                  </Popup>
                  <AnnotationPreviewMarker annotationInput={createAnnotation} />
                </>
              )}
            </>
          </AnnotationMap>
        </Box>
      </AppShell.Main>
      <AppShell.Footer p={0}>
        <Stack justify={'center'} p={5}>
          <Anchor href='https://guyettinger.vercel.app/' target='_blank'>
            <Group justify={'flex-end'} align={'center'} gap={0}>
              <Text size={'xs'} style={{color: 'black'}}>created by</Text>
              <Image w={'30px'} h={'30px'} src={'logo.png'} />
            </Group>
          </Anchor>
        </Stack>
      </AppShell.Footer>
    </AppShell>
  );
};
