import { MutationUpdateAnnotationArgs } from '../../../graphql/server/resolvers-types.ts';
import type { GraphQLContext } from '../context.ts';

export const updateAnnotation = (
  _parent: unknown,
  args: Partial<MutationUpdateAnnotationArgs>,
  context: GraphQLContext,
) => {
  return context.prisma.annotation.update({
    where: {
      id: args.id,
    },
    data: {
      latitude: args.input?.latitude ?? 0.0,
      longitude: args.input?.longitude ?? 0.0,
      symbol: args.input?.symbol ?? '',
      note: args.input?.note ?? '',
    },
  });
}