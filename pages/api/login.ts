// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET as string;
const HASURA_ENDPOINT = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  try {
    const query = `
      query ($email: String!, $password: String!) {
        users(where: { email: { _eq: $email }, password: { _eq: $password } }) {
          id
          email
          name
        }
      }
    `;

    const response = await axios.post(
      HASURA_ENDPOINT as string,
      {
        query,
        variables: { email, password },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET as string,
        }
      }
    );

    const users = response.data.data.users;

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    const token = jwt.sign({ email: user.email, id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });

    res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600,
        path: '/',
      })
    );

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
