import { NewPatient } from "../types/Patient";

const isString = (obj: unknown): obj is string => {
    return typeof obj === 'string';
};

const parseString = (obj: unknown): string => {
    if(!obj || !isString(obj)) {
        throw new Error('Incorrect or missing datafield: ' + obj);
    }

    return obj;
};

const toNewPatient = (object: unknown): NewPatient => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if(!('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)) {
        throw new Error('Some datafields are missing');
    }

    const newPatient: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseString(object.gender),
        occupation: parseString(object.occupation)
    };

    return newPatient;
};

export default toNewPatient;