'use client';

import { useState } from 'react';
// import { storyblokEditable } from '@storyblok/react';
import { storyblokEditable } from "@storyblok/react/rsc";

export default function Login({ blok }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);
    setShowSuccess(false);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
    } catch (err) {
      setShowError(true);
      console.error(err);
    }
  };

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: blok.backgroundColor || '#f3f4f6', // 使用 Storyblok 内容
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          {blok.title || 'Login'}
        </h1>

        {/* 错误提示 */}
        {showError && (
          <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
            {blok.errorText || 'Email or Password error.'}
          </p>
        )}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            background: '#2563eb',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          {blok.buttonText || 'Login'}
        </button>

        {/* 成功提示 */}
        {showSuccess && (
          <p style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>
            {blok.successText || 'Login success.'}
          </p>
        )}
      </form>
    </div>
  );
}
