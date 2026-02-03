'use client';

import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { parseStyle } from '@/utils/styleParser';

export default function Button({ blok }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 处理按钮点击事件
  const handleClick = async () => {
    if (!blok.action || blok.action === 'none') return;

    if (blok.action === 'fetch-dog') {
      try {
        setLoading(true);
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
        setImage(data.message);
      } catch (err) {
        console.error('Error fetching dog image:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <button
        {...storyblokEditable(blok)}
        type="button"
        className={blok.class}
        style={parseStyle(blok.style)}
        onClick={handleClick}
        disabled={loading}
      >
        {blok.text}
      </button>

      {/* 如果是 fetch-dog 并且加载完成，显示图片 */}
      {/* {loading && <p>Loading...</p>} */}
      {image && (
        <div style={{ marginTop: '16px' }}>
          <img
            src={image}
            alt="Random Dog"
            style={{ maxWidth: '300px' }}
          />
        </div>
      )}
    </>
  );
}
