import { useRouter } from 'next/router';

import { ComicImage } from 'src/components/ComicImage';

import { Skeleton } from '~/components/Skeleton';
import { PaginatedContainer } from '~/containers/Pagination';
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
    <div className="flex w-screen max-w-sm flex-col items-center justify-between h-full gap-8 text-center md:max-w-content">
      <PaginatedContainer page={comic?.num ?? 0}>
        <h2>{comic?.title}</h2>
        {isLoading && <Skeleton width={512} height={512} />}
        {!isLoading && <ComicImage alt={comic?.alt ?? ''} url={comic?.img} />}
      </PaginatedContainer>
    </div>
  );
};

export default ComicPage;
