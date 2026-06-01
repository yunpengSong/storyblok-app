'use client';

import { useState } from 'react';
// import { storyblokEditable } from '@storyblok/react';
import { storyblokEditable } from "@storyblok/react/rsc";
import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ blok }) {

  return (
      <footer {...storyblokEditable(blok)} className="footer bg-grey pb-4 pt-5">
          <div className="container pt-3">
              <div className="row align-items-center">
              <div className="col-12 pt-2">
                  <div className="footer-link">
                      <Link href='#'>Terms and Conditions</Link> &nbsp;&nbsp;&nbsp;&nbsp; <Link href='#'>Privacy Policy</Link>
                  </div>
                  <div className="footer-bottom-text pt-3">This is placeholder content used to represent how text will appear in the final layout. It helps visualize spacing, hierarchy, and overall design before real content is added. Replace this text with meaningful copy when the content is ready.</div>
              </div>
              </div>
          </div>
      </footer>
  );
}
