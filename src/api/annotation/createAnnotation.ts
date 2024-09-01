import { MutationCreateAnnotationArgs } from '../../../graphql/server/resolvers-types.ts';
import type { GraphQLContext } from '../context.ts';

export const createAnnotation = (
  _parent: unknown,
  args: Partial<MutationCreateAnnotationArgs>,
  context: GraphQLContext,
) => {
  return context.prisma.annotation.create({
    data: {
      latitude: args.input?.latitude ?? 0.0,
      longitude: args.input?.longitude ?? 0.0,
      symbol: args.input?.symbol ?? '',
      note: args.input?.note ?? '',
    },
  });
}