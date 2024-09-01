import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql/schema.graphql',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    './graphql/client/': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    }
  }
}

export default config;