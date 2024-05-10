import express from 'express';
import patientService from '../services/patientsService';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveData());
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.send(addedPatient);
});


export default router;