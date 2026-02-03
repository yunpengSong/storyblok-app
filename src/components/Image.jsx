'use client';

import { useState } from 'react';
// import { storyblokEditable } from '@storyblok/react';
import { storyblokEditable } from "@storyblok/react/rsc";
import { parseStyle } from '@/utils/styleParser';

export default function Image({ blok }) {
  const getImageUrl = () => {
    if (blok.image && blok.image.filename) {
      return blok.image.filename;
    }
    if (typeof blok.image === 'string' && blok.image.trim() !== '') {
      return blok.image;
    }
    if (blok.imagelink && blok.imagelink.trim() !== '') {
      return blok.imagelink;
    }
    return '';
  };

  const getAltText = () => {
    if (blok.alt && blok.alt.trim() !== '') {
      return blok.alt;
    }
    return '图片';
  };

  const imageUrl = getImageUrl();
  const altText = getAltText();

  if (!imageUrl) {
    return (
      <div 
        {...storyblokEditable(blok)} 
        className={`${blok.class || ''}`}
        style={parseStyle(blok.style)}
      >

      </div>
    );
  }

  // 图片元素
  const imageElement = (
    <img
      src={imageUrl}
      alt={altText}
      className={`${blok.class || ''}`}
      style={parseStyle(blok.style)}
    />
  );

  // 如果有URL链接，则用a标签包裹图片
  if (blok.url && blok.url.trim() !== '') {
    return (
      <a
        {...storyblokEditable(blok)}
        href={blok.url}
        target={blok.target || '_self'}
        rel={blok.target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {imageElement}
      </a>
    );
  }

  // 没有URL链接，直接返回图片
  return (
    <div {...storyblokEditable(blok)}>
      {imageElement}
    </div>
  );
}
