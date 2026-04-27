import { Router } from 'express';
import z from 'zod';
import { validateBody, validateParams } from '../middleware/validation.ts';

const createHabitSchema = z.object({
    name: z.string(),
});

const completeParamsSchema = z.object({
    id: z.string().max(3),
});

const habitRoutes = Router();

habitRoutes.get('/', (req, res) => {
    res.json({ message: 'habbits' });
});

habitRoutes.get('/:id', (req, res) => {
    res.json({ message: 'got one habbit' });
});

habitRoutes.post('/', validateBody(createHabitSchema), (req, res) => {
    res.json({ message: 'Created habit' });
});

habitRoutes.delete('/:id', (req, res) => {
    res.json({ message: 'deleted habit' });
});

habitRoutes.post('/', (req, res) => {
    res.json({ message: 'Created habit' });
});

habitRoutes.post(
    '/:id/complete',
    validateParams(completeParamsSchema),
    validateBody(createHabitSchema),
    (req, res) => {
        res.json({ message: 'Created habit' });
    },
);

export { habitRoutes };
