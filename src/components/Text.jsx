'use client';

import { useState } from 'react';
// import { storyblokEditable } from '@storyblok/react';
import { storyblokEditable } from "@storyblok/react/rsc";
import { parseStyle } from '@/utils/styleParser';
import { renderRichText } from '@storyblok/react';

export default function Text({ blok }) {
  return (
      <div 
      {...storyblokEditable(blok)} 
      className={`${blok.class}`} 
      style={parseStyle(blok.style)}
      dangerouslySetInnerHTML={{
        __html: blok.content || '',
      }}
       />
  );
}