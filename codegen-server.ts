import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema/schema.graphql',
  generates: {
    './src/graphql/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};
export default config;