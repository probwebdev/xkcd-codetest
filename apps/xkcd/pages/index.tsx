import { ComicImage } from 'src/components/ComicImage';

import { Skeleton } from '~/components/Skeleton';
import { trpc } from '~/utils/trpc';

const IndexPage = () => {
  const { data: comic, error, isLoading } = trpc.xkcd.current.useQuery();

  if (error?.message) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {isLoading && <Skeleton width={512} height={512} />}
      {!isLoading && <ComicImage alt={comic?.alt ?? ''} url={comic?.img} />}
    </div>
  );
};

export default IndexPage;
