import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'habbits' });
});

router.get('/:id', (req, res) => {
    res.json({ message: 'got one habbit' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Created habit' });
});

router.delete('/:id', (req, res) => {
    res.json({ message: 'deleted habit' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Created habit' });
});

router.post('/:id/complete', (req, res) => {
    res.json({ message: 'Created habit' });
});

export { router };
