'use client';

import { useState } from 'react';
// import { storyblokEditable } from '@storyblok/react';
import { storyblokEditable } from "@storyblok/react/rsc";

export default function Text({ blok }) {

  return (
      <div {...storyblokEditable(blok)} className={`${blok.class}`}>
          {blok.content}
      </div>
  );
}
