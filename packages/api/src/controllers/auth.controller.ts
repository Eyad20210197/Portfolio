import { RequestHandler } from 'express';
import authService from '../services/auth.service';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { ExtractedBody } from '../types/express-zod-helpers'; // Import from shared types

class AuthController {
  register: RequestHandler<{}, {}, ExtractedBody<typeof registerSchema>> = async (req, res) => {
    const { email, password } = req.body; // email, password now correctly typed

    // Validation is now handled by middleware, so no manual check needed here.
    // However, keeping the `if (!email || !password)` for clarity if middleware is skipped or for a different error response.
    // The Zod middleware will prevent this from being reached with invalid input.
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await authService.register(email, password);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error: any) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };

  login: RequestHandler<{}, {}, ExtractedBody<typeof loginSchema>> = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const token = await authService.login(email, password);

      if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600000, // 1 hour
      });

      res.status(200).json({ message: 'Logged in successfully' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };
  logout: RequestHandler = async (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };
}

export default new AuthController();