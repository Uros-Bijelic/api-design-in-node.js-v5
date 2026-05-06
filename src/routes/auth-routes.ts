import { Router } from 'express';
import { register } from '../controllers/auth-controller.ts';
import { validateBody } from '../middleware/validation.ts';
import { insertUserSchema } from '../db/schema.ts';

const authRoutes = Router();

authRoutes.post('/register', validateBody(insertUserSchema), register);

authRoutes.post('/login', (req, res) => {
    res.status(201).json({ message: 'user logged in' });
});

export { authRoutes };
