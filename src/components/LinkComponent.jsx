'use client';

import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import { parseStyle } from '@/utils/styleParser';

export default function LinkComponent({ blok }) {
  const getHref = () => {
    if (blok.href.url !== '') {
      return blok.href.url;
    }
    return '';
  };

  const getText = () => {
    if (blok.text && blok.text.trim() !== '') {
      return blok.text;
    }
    return '';
  };

  const href = getHref();
  const text = getText();

  if (!href || !text) {
    return (
      <span
        {...storyblokEditable(blok)}
        className={`${blok.class || ''}`}
        style={parseStyle(blok.style)}
      />
    );
  }

  return (
    <Link
      {...storyblokEditable(blok)}
      href={href}
      target={blok.target || '_self'}
      className={`${blok.class || ''}`}
      style={parseStyle(blok.style)}
    >
      {text}
    </Link>
  );
}

