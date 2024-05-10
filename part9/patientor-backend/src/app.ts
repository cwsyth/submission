import express from 'express';
import middleware from './utils/middleware';
import diagnosesRouter from './routes/diagnosesRouter';
import patientsRouter from './routes/patientRouter';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.use(middleware.errorHandler);

export default app;