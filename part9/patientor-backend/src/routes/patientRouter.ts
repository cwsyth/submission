import express from 'express';
import patientService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveData());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });

    res.send(newPatient);
});


export default router;