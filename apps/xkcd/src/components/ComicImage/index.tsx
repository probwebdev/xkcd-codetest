import { type ImageProps } from 'next/image';
import Image from 'next/image';

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
        {...props}
      />
    </picture>
  );
};
