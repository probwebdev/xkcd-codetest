import { xkcdRouter } from './routers/xkcd';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  xkcd: xkcdRouter,
});

export type AppRouter = typeof appRouter;
export type * from './routers/xkcd.types';
