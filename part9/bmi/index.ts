import express from 'express';
const app = express();

app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    const bmi = calculateBmi(Number(height), Number(weight));

    const checkInput: boolean = isNaN(Number(height)) && isNaN(Number(weight));

    if (checkInput || !height || !weight) {
        res.send({ error: 'malformatted parameters' });
    }

    res.send({ height, weight, bmi});
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises }: any = req.body;

    if (!target || !daily_exercises) {
        res.json({
            error: 'parameters missing'
        });
    }

    if (isNaN(target) || !Array.isArray(daily_exercises)) {
        res.json({
            error: 'malformatted parameters'
        });
    }

    const response = calculateExercises(daily_exercises, target);

    return res.json(response);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});