import { useRouter } from 'next/router';

import { ComicImage } from 'src/components/ComicImage';

import { trpc } from '~/utils/trpc';

export const ComicPage = () => {
  const router = useRouter();
  const query = router.query.id as string;

  const { data: comic, error, isLoading } = trpc.xkcd.comicById.useQuery({
    id: parseInt(query),
  });

  if (error?.message) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-nowrap gap-8">
      {!isLoading && (
        <ComicImage
          alt={comic?.alt ?? ''}
          url={comic?.img}
        />
      )}
    </div>
  );
};

export default ComicPage;
