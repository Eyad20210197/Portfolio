import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../database';
import { AdminUser } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

class AuthService {
  async register(email: string, password: string): Promise<AdminUser> {
    const password_hash = await bcrypt.hash(password, 10);
    return prisma.adminUser.create({
      data: {
        email,
        password_hash,
      },
    });
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await prisma.adminUser.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return null;
    }

    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}

export default new AuthService();