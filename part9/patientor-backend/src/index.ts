import express from 'express';
import patientRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());

import cors from 'cors';
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('ping pong');
    res.send('pong');
});

app.use('/api/patients', patientRouter);

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});