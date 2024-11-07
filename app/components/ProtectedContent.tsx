// components/ProtectedContent.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ProtectedContent() {
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<any>(null);

  const fetchProtectedContent = async () => {
    try {
      const response = await axios.get('/api/protected', { withCredentials: true });
      setMessage(response.data.message);
      setUser(response.data.user);
    } catch (error: any) {
      setMessage(error.response ? error.response.data.message : 'Error fetching data');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h3>Protected Content Test</h3>
      <button onClick={fetchProtectedContent}>Fetch Protected Content</button>
      {message && <p>{message}</p>}
      {user && (
        <div>
          <p>User Data:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
