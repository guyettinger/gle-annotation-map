# 👍 Moji Map Presentation

## Stack

### Frontend

- React: https://react.dev/
    - a well-supported library for building user interfaces
    - build on bedrock with an active support community and large library of compatible tools
- Mantine: https://mantine.dev/
    - a proven component system for scaffolding single pages applications
    - provides a pattern and a set of legos to effectively build the app structure
- Mapbox: https://www.mapbox.com/
    - a map provider with a variety of supported integrations
    - free for developers (yay!)
- React Map GL: https://github.com/visgl/react-map-gl
    - a highly-rated React map component library
    - works with Mapbox and supports a dynamic marker system
- TanStack Query: https://tanstack.com/query/latest
    - a powerful asynchronous state management library
    - helps connect our backend api with our frontend component system through react hooks
- GraphQL: https://graphql.org/
    - a standardized query language for apis
    - graphql tends to work well with geospatial data
        - when there is a lot of map data to displayed, it is essential to limit the amount of information transferred in order to optimize the user experience
    - graphql can generate typescript types that can from a schema
        - this provides fullstack type-safety

#### Backend

- Express https://expressjs.com/
    - a minimalist api framework for creating backends on node
    - a flexible api base that can be easily extended
- GraphQL: https://graphql.org/
    - a standardized query language for apis
        - graphql can generate typescript types that can from a schema
        - this provides fullstack type-safety
- GraphQL Yoga https://github.com/dotansimha/graphql-yoga
    - a full-featured graphql server
    - works with express and a graphql scheme to easily create an api
- Prisma: https://www.prisma.io/
    - an open source node and typescript ORM library
    - a data layer that easy to extend to work with graphql apis
    - supports a similar schema to graphql to fully-type data
- Sqlite: https://www.sqlite.org/
    - a small, self-contained sql database engine
    - supports a simple file based datasource
    - no touch install

## Feature Structure

### Annotation Symbols

Annotation symbols are represented in data via a symbol identifier stored as a string. The symbol identifier is used by the UI to look up the correct visual asset to display.

For the purposes of this project, the symbol identifiers represent the standard set of emojis.

Components
- AnnotationSymbol: responsible for the display a given symbol identifier
- AnnotationSymbolPicker: responsible for the selection of a symbol identifier

User Interface and Interaction Design
- Recognizable Symbols: the symbol set should be identifiable by most users where the symbols convey meaning
- High-Visibility Symbols: the symbols should be easy to distinguish from other parts of the UI (i.e. map)
- Ease of Selection:  it should be easy for a user to select/change a symbol

Backend
- Efficient to Retrieve/Store: symbol identifiers stored as strings are easy to maintain in a database

### Annotation Persistence (CRUD)

Annotation entities are saved/retrieved via a graphql api to a sqlite file database (/prisma/dev.db).  This allows annotations to persist between browser sessions and users.

Components
- AnnotationCreator: responsible for creating a new annotation entity
- AnnotationEditor: responsible for editing an existing annotation entity

Hooks
- useCreateAnnotation Hook: responsible for interfacing a component with the graphql create annotation mutation
- useUpdateAnnotation Hook: responsible for interfacing a component with the graphql update annotation mutation
- useDeleteAnnotation: responsible for interfacing a component with the graphql delete annotation mutation

User Interface and Interaction Design
- Easy to Create/Edit: it should be relatively easy (few steps) to create/edit annotations
- Shortcut: if the user wants to repeat an annotation, they should have a simple shortcut to avoid going through the same creation steps every time.
- Reliable: annotations should be saved at the appropriate time and appear in the list immediately

Backend
- Simple Persistence: using file based persistence is easy to setup and configure

### Filter Annotations

Annotation filtering takes place on the backend using prisma and sqlite.  Filter parameters are passed via the getAnnotations api and applied via the selection statement.

Hooks
- useGetAnnotations Hook: responsible for interfacing a component with a paged list of annotations filtered by provided parameters

Components
- AnnotationList: responsible for displaying a list of annotation entities in card format
- AnnotationItem: responsible for display an instance of an annotation entity
- AnnotationFilterExpression: responsible for creating/editing getAnnotations filter parameters

User Interface and Interaction Design
- Filter Symbols: filters should use the same symbols to represent annotations
- Filter List: the filter should be close the list so the user can see the results of the filter immediately

Backend
- Use Database-Level Filtering: let the database do what it does well and use sql to filter