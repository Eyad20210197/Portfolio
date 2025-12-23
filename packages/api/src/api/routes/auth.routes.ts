import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import validate from '../../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../../schemas/auth.schema';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);

export default router;