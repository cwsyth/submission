import patients from '../data/patients';
import { Patient, NonSensitivePatient } from '../types/Patient';

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

export default {
    getNonSensitiveData
};