'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storyblokEditable } from "@storyblok/react/rsc";
import { useAuth } from '@/context/AuthContext';

export default function Register({ blok }) {
  const [title, setTitle] = useState('Prof');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage('');
    setShowSuccess(false);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowSuccess(true);
        // 注册成功后自动登录
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (loginRes.ok) {
          await checkAuth();
          setTimeout(() => router.push('/'), 1000);
        }
      } else {
        setErrorMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setErrorMessage('Something went wrong.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        {...storyblokEditable(blok)}
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: blok?.backgroundColor || '#f3f4f6',
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return null; // 已登录会在 useEffect 中重定向，这里不渲染内容
  }

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: blok?.backgroundColor || '#f3f4f6',
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
          {blok?.title || 'Register'}
        </h1>

        <label>Title</label>
        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        >
          <option value="Prof">Prof</option>
          <option value="A/Prof">A/Prof</option>
          <option value="Dr">Dr</option>
        </select>

        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          disabled={isSubmitting}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />

        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          disabled={isSubmitting}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isSubmitting}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            background: isSubmitting ? '#93c5fd' : '#2563eb',
            color: '#fff',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            border: 'none',
          }}
        >
          {isSubmitting ? 'Loading...' : (blok?.buttonText || 'Register')}
        </button>

        {/* 错误提示 */}
        {errorMessage && (
          <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
            {errorMessage}
          </p>
        )}

        {/* 成功提示 */}
        {showSuccess && (
          <p style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>
            {blok?.successText || 'Registration successful!'}
          </p>
        )}
      </form>
    </div>
  );
}
