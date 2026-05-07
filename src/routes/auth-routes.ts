import { Router } from 'express';
import { login, register } from '../controllers/auth-controller.ts';
import { validateBody } from '../middleware/validation.ts';
import { insertUserSchema } from '../db/schema.ts';
import z, { email } from 'zod';

const loginSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(1, 'Password is required')
});

const authRoutes = Router();

authRoutes.post('/register', validateBody(insertUserSchema), register);

authRoutes.post('/login', validateBody(loginSchema), login);

export { authRoutes };
