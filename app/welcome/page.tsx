// app/welcome/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {jwtDecode }from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface DecodedToken {
  email: string;
  id: string;
  name: string; // Add name to the decoded token interface
  iat: number;
  exp: number;
}

export default function WelcomePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null); // New state for name
  const router = useRouter();

  useEffect(() => {
    const getUserFromToken = () => {
      console.log('Cookies:', document.cookie);

      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      console.log('Extracted Token:', token);

      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          setUsername(decoded.email);
          setName(decoded.name); // Set the name from the decoded token
        } catch (error) {
          console.error('Token decoding error:', error);
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };

    getUserFromToken();
  }, [router]);

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Welcome!</h2>
      {name ? <p>Hi, {name}!</p> : <p>Loading...</p>}
    </div>
  );
}
