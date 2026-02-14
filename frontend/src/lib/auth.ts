import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key-change-this';

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  return token;
}
