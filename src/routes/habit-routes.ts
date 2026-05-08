import { Router } from 'express';
import z from 'zod';
import { validateBody, validateParams } from '../middleware/validation.ts';
import { authenticateToken } from '../middleware/auth.ts';
import {
    createHabit,
    getUserHabits,
    updateHabit
} from '../controllers/habit-controller.ts';

export const createHabitSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    frequency: z.string(),
    targetCount: z.number(),
    tagIds: z.array(z.string()).optional()
});

export type CreateHabitSchema = z.infer<typeof createHabitSchema>;

const completeParamsSchema = z.object({
    id: z.string().max(3)
});

const habitRoutes = Router();

habitRoutes.use(authenticateToken);

habitRoutes.get('/', getUserHabits);

habitRoutes.patch('/:id', updateHabit);

habitRoutes.get('/:id', (req, res) => {
    res.json({ message: 'got one habbit' });
});

habitRoutes.post('/', validateBody(createHabitSchema), createHabit);

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
    }
);

export { habitRoutes };
