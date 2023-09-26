import { z } from 'zod';

import { publicProcedure, createTRPCRouter } from '../trpc';

import type { ComicData } from './xkcd.types';

export const XKCD_API_URLS = {
  current: () => 'https://xkcd.com/info.0.json',
  comicById: (id: number) => `https://xkcd.com/${id}/info.0.json`,
} as const;

export const xkcdRouter = createTRPCRouter({
  current: publicProcedure.query(async () => {
    const response = await fetch(XKCD_API_URLS.current());
    const data: ComicData = await response.json();

    return data;
  }),
  comicById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const response = await fetch(XKCD_API_URLS.comicById(id));
      const data: ComicData = await response.json();

      return data;
    }),
});
