'use client';

import { useState } from 'react';
// import { storyblokEditable } from '@storyblok/react';
import { storyblokEditable } from "@storyblok/react/rsc";
import Link from 'next/link';
import Image from 'next/image';

export default function Banner({ blok }) {

  return (
      <div {...storyblokEditable(blok)} className='banner' style={{height: '400px',backgroundImage: `url(${blok.bgImage})`}}>
          <div className='container pt-5'>
              <div className='row'>
                  <div className='col text-center pt-5'>
                      <h1 className='pt-5'>{blok.title}</h1>
                  </div>
              </div>
          </div>
      </div>
  );
}
