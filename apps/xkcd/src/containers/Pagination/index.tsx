import { type ReactNode } from 'react';

import Link from 'next/link';

import { trpc } from '~/utils/trpc';

interface PaginationProps {
  page: number;
}

export const Pagination = ({ page }: PaginationProps) => {
  const { data } = trpc.xkcd.current.useQuery();
  const { num = 0 } = data ?? {};
  const prevPage = page - 1 < 1 ? 1 : page - 1;
  const prevLink = `/${prevPage}`;
  const nextPage = num !== 0 && page + 1 <= num ? page + 1 : num;
  const nextLink = nextPage === 0 ? '/' : `/${nextPage}`;
  const randomLink = `/${Math.floor(Math.random() * num)}`;

  return (
    <div className="pagination flex w-full flex-row flex-nowrap justify-between gap-4 text-black">
      <div className="flex flex-row flex-nowrap gap-2">
        <Link href="/1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </Link>
        <Link href={prevLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
      </div>
      <Link href={randomLink}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
          />
        </svg>
      </Link>
      <div className="flex flex-row flex-nowrap gap-2">
        <Link href={nextLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

interface PaginatedContainerProps extends PaginationProps {
  children: ReactNode;
}

export const PaginatedContainer = ({
  page,
  children,
}: PaginatedContainerProps) => (
  <>
    <Pagination page={page} />
    {children}
    <Pagination page={page} />
  </>
);