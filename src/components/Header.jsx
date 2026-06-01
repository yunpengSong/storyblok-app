'use client';

import Link from 'next/link';
import Image from 'next/image';
import { storyblokEditable } from "@storyblok/react/rsc";
import { useAuth } from '@/context/AuthContext';

export default function Header({ blok }) {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav {...storyblokEditable(blok)} className="navbar navbar-expand-lg bg-body-tertiary pt-3 pb-3">
      <div className="container">
        <Link href='/' >
          <Image
            src="/assets/images/logo.svg"
            alt="Me"
            height={0}
            width="150"
          />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-lg-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>

          <div className="d-flex align-items-center ms-3">
            {loading ? (
              <span className="text-muted">Loading...</span>
            ) : user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.email}
                </span>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link href="/login" className="btn btn-outline-primary btn-sm">
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
