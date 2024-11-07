// pages/api/logout.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // Expire immediately
      path: '/',
    })
  );

  res.status(200).json({ message: 'Logged out' });
}
