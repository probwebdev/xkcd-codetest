import { ComicImage } from 'src/components/ComicImage';

import { PaginatedContainer } from '~/containers/Pagination';
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
    <div className="flex flex-col items-center justify-center gap-8 text-center w-screen max-w-sm md:max-w-content">
      <PaginatedContainer page={comic?.num ?? 0}>
        <h2>{comic?.title}</h2>
        {!isLoading && <ComicImage alt={comic?.alt ?? ''} url={comic?.img} />}
      </PaginatedContainer>
    </div>
  );
};

export default IndexPage;
