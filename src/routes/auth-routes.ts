import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/register', (req, res) => {
    res.status(201).json({ message: 'user signed up' });
});

authRoutes.post('/login', (req, res) => {
    res.status(201).json({ message: 'user logged in' });
});

export { authRoutes };
