'use client';

import { useState } from 'react';
import { storyblokEditable, renderRichText } from '@storyblok/react/rsc';
import { parseStyle } from '@/utils/styleParser';

export default function List({ blok }) {
  const getRichTextHtml = (content) => {
  const renderedContent = renderRichText(content);
    return renderedContent;
  };
  return (
    <>
      {blok.content && 
      <div
        {...storyblokEditable(blok.blok)}
        className={blok.class}
        style={parseStyle(blok.style)}
          dangerouslySetInnerHTML={{ __html: getRichTextHtml(blok.content) }}
        />}
    </>
  );
}
