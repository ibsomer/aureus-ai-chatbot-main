'use client';
import { chakra, useColorMode } from '@chakra-ui/system';
import { ComponentProps } from 'react';
import { Image } from './Image';
import type { ResponsiveValue } from '@chakra-ui/styled-system';

type AvatarImageProps = Partial<
  ComponentProps<typeof Image> & {
    showBorder?: boolean;
    objectFit?: ResponsiveValue<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>;
  }
>;

export function NextAvatar({
  src,
  showBorder,
  alt = '',
  style,
  objectFit = 'fill',
  ...props
}: AvatarImageProps) {
  const { colorMode } = useColorMode();

  return (
    <Image
      {...props}
      {...(showBorder
        ? {
            border: '2px',
            borderColor: colorMode === 'dark' ? 'navy.700' : 'white',
          }
        : {})}
      alt={alt}
      objectFit={objectFit}
      src={src}
      style={{ ...style, borderRadius: '50%' }}
    />
  );
}

export const ChakraNextAvatar = chakra(NextAvatar, {
  shouldForwardProp: (prop) =>
    ['width', 'height', 'src', 'alt', 'layout', 'objectFit'].includes(prop),
});
