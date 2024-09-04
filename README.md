# 👍 Moji Map

a simple world map with emoji-based annotations.

## Getting Started

To run app locally:

- Run `npm i && npm start`

The app will start on http://localhost:3000

## Presentation

### Tool Selection

#### Frontend

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

##### Backend

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

### Feature Structure

- Annotation Icons
- Annotation Persistence
- Filter Annotations
- Add Annotations
- Delete Annotations

### User Interface and Interaction Design



### Backend