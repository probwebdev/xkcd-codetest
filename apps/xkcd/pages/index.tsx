import { ComicImage } from 'src/components/ComicImage';

import { LayoutContainer } from '~/containers/LayoutContainer';
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
    <LayoutContainer page={comic?.num ?? 0}>
      <div className="flex flex-col gap-4">
        <h2>{comic?.title}</h2>
        {!isLoading && <ComicImage alt={comic?.alt ?? ''} url={comic?.img} />}
      </div>
    </LayoutContainer>
  );
};

export default IndexPage;
