// components/LogoutButton.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

export default function LogoutButton() {
  const [message, setMessage] = useState<string>('');

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout');
      if (response.status === 200) {
        setMessage('Logged out successfully!');
      }
    } catch (error: any) {
      setMessage('Error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {message && <p>{message}</p>}
    </div>
  );
}
