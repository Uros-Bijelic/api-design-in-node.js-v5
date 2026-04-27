import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { isTest } from '../env.ts';
import { authRoutes } from './routes/auth-routes.ts';
import { habitRoutes } from './routes/habit-routes.ts';
import { userRoutes } from './routes/user-routes.ts';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
    morgan('dev', {
        skip: () => isTest(),
    }),
);
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.json({
        message: 'hello',
    }).status(200);
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

export { app };
export default app;
