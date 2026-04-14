import express from 'express';

const app = express();

app.get('/health', (req, res) => {
    res.json({
        message: 'hello',
    }).status(200);
});

app.post('/cake', (req, res) => {
    res.send('ok');
});

app.post('/cake', (req, res) => {
    res.send('next');
});

export { app };
export default app;
