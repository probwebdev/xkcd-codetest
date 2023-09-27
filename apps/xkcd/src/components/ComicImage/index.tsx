import { useState } from 'react';

import classNames from 'classnames';
import { type ImageProps } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';

import styles from './comic-image.module.css';
import pngSrc from './imgs/placeholder.png';

export interface ComicImageProps extends Omit<ImageProps, 'src'> {
  url?: string | null;
  width?: number;
  height?: number;
}

export const ComicImage = ({
  url,
  alt,
  width = 0,
  height = 0,
  sizes = '100vw',
  ...props
}: ComicImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <picture className={styles.comicImage}>
      <Image
        src={url ?? pngSrc}
        width={width}
        height={height}
        sizes={sizes}
        alt={alt}
        title={alt}
        placeholder="empty"
        unoptimized
        {...props}
        onLoadingComplete={() => {
          setIsImageLoaded(true);
        }}
      />
      {isImageLoaded && typeof url === 'string' && url.length > 0 && (
        <span
          className={classNames(
            'button-links',
            'rounded-full bg-violet-200/50 p-2 transition-colors hover:bg-violet-300/50',
            'absolute -top-14 right-0 md:-right-14 md:top-0'
          )}
        >
          <Link
            href={url.replace('.png', '_2x.png')}
            rel="noreferer noopener"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
              />
            </svg>
          </Link>
        </span>
      )}
    </picture>
  );
};
