import { useRouter } from 'next/router';

import { ComicImage } from 'src/components/ComicImage';

import { Skeleton } from '~/components/Skeleton';
import { LayoutContainer } from '~/containers/LayoutContainer';
import { trpc } from '~/utils/trpc';

export const ComicPage = () => {
  const router = useRouter();
  const query = router.query.id as string;

  const {
    data: comic,
    error,
    isLoading,
  } = trpc.xkcd.comicById.useQuery({
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
    <LayoutContainer page={comic?.num ?? 0}>
      <div className="flex flex-col gap-4">
        <h2>{comic?.title}</h2>
        {isLoading && <Skeleton width={512} height={512} />}
        {!isLoading && <ComicImage alt={comic?.alt ?? ''} url={comic?.img} />}
      </div>
    </LayoutContainer>
  );
};

export default ComicPage;
