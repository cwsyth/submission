import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types/Patient';
import { v4 as uuid } from 'uuid';

const getNonSensitiveData = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }: Patient) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        };
    });
};

const getById = (id: string): Patient | undefined => {
    const patient = patients.find(patient => {
        return patient.id === id;
    });

    return patient;
};

const addPatient = (patient: NewPatient) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id: string = uuid();

    const newPatient: Patient = {
        id,
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getNonSensitiveData,
    getById,
    addPatient
};