import type { Response } from 'express';
import type { AuthenticateRequest } from '../middleware/auth.ts';
import db from '../db/connection.ts';
import { habits, entries, habitTags, tags } from '../db/schema.ts';
import { eq, and, desc, inArray } from 'drizzle-orm';
import {
    createHabitSchema,
    type CreateHabitSchema
} from '../routes/habit-routes.ts';

export const createHabit = async (req: AuthenticateRequest, res: Response) => {
    try {
        const {
            name,
            description,
            frequency,
            targetCount,
            tagIds
        }: CreateHabitSchema = createHabitSchema.parse(req.body);

        const habit = await db.transaction(async (tx) => {
            const [newHabit] = await tx
                .insert(habits)
                .values({
                    userId: req.user!.id,
                    name,
                    description,
                    frequency,
                    targetCount
                })
                .returning();

            if (tagIds && tagIds.length) {
                const habitTagValues = tagIds.map((tagId) => ({
                    habitId: newHabit.id,
                    tagId
                }));

                tx.insert(habitTags).values(habitTagValues);
            }

            return newHabit;
        });

        res.status(201).json({
            message: 'Habits created!',
            habit
        });
    } catch (e) {
        console.error('Create habit error', e);
        res.status(500).json({
            error: 'Failed to create habit'
        });
    }
};

export const getUserHabits = async (
    req: AuthenticateRequest,
    res: Response
) => {
    try {
        const userHabitsWithTags = await db.query.habits.findMany({
            where: eq(habits.userId, req.user!.id),
            with: {
                habitTags: {
                    with: {
                        tag: true
                    }
                }
            }
        });

        const habitsWithTags = userHabitsWithTags.map((habit) => ({
            ...habit,
            tags: habit.habitTags.map((habitTag) => habitTag.tag),
            habitTags: undefined
        }));

        res.status(200).json({
            habits: habitsWithTags,
            bla: userHabitsWithTags
        });
    } catch (e) {
        console.error('Error getting habits', e);
        res.status(500).json({
            error: 'Failed to get habit'
        });
    }
};
