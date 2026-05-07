import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.ts';

const userRoutes = Router();

userRoutes.use(authenticateToken);

userRoutes.get('/', (req, res) => {
    res.json({ message: 'users' });
});

userRoutes.get('/:id', (req, res) => {
    res.json({ message: 'get user' });
});

userRoutes.put('/:id', (req, res) => {
    res.json({ message: 'user updated' });
});

userRoutes.delete('/:id', (req, res) => {
    res.json({ message: 'user deleted' });
});

export { userRoutes };
