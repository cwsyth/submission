import express from 'express';
import patientService from '../services/patientsService';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveData());
});

router.post('/', (req, res, next) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.send(addedPatient);
    }
    catch(err) {
        next(err);
    }
});

router.get('/:id', (req, res) => {
    const patient = patientService.getById(String(req.params.id));

    if(patient) {
        res.send(patient);
    }
    else {
        res.status(404).end();
    }
});

export default router;