import { type PropsWithChildren } from 'react';

import { PaginatedContainer } from '~/containers/Pagination';

export interface LayoutContainerProps extends PropsWithChildren {
  page: number;
}

export const LayoutContainer = ({ children, page }: LayoutContainerProps) => {
  return (
    <div className="flex w-screen max-w-sm flex-col items-center justify-center gap-8 text-center md:max-w-content">
      <PaginatedContainer page={page}>{children}</PaginatedContainer>
    </div>
  );
};
