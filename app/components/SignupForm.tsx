// components/SignupForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import axios from 'axios';

interface SignupFormData {
  email: string;
  password: string;
  name: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    name: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Endpoint:", process.env.NEXT_PUBLIC_HASURA_ENDPOINT);
    console.log("Admin Secret:", process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET);

    const query = `
      mutation($email: String!, $password: String!, $name: String!) {
        insert_users_one(object: {email: $email, password: $password, name: $name}) {
          id
          email
        }
      }
    `;

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_HASURA_ENDPOINT as string,
        {
          query,
          variables: formData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
          },
        }
      );

      if (response.data.errors) {
        setMessage('Error: ' + response.data.errors[0].message);
      } else {
        setMessage('User created successfully!');
      }
    } catch (error: any) {
      setMessage('Error occurred: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
}
