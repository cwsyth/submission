import { Gender, NewPatient } from "../types/Patient";
import DataError from "../types/DataError";

const isString = (obj: unknown): obj is string => {
    return typeof obj === 'string';
};

const parseString = (obj: unknown): string => {
    if(!obj || !isString(obj)) {
        throw new DataError('Incorrect or missing datafield: ' + obj);
    }

    return obj;
};


const isGender = (obj: string): obj is Gender => {
    const genders = Object.values(Gender).map(gender => {
        return gender.toString();
    });

    return genders.includes(obj);
};

const parseGender = (obj: unknown): Gender => {
    if(!obj || !isString(obj) || !isGender(obj)){
        throw new DataError('Incorrect or missing gender: ' + obj);
    }

    return obj;
};

const toNewPatient = (object: unknown): NewPatient => {
    if(!object || typeof object !== 'object') {
        throw new DataError('Incorrect or missing data');
    }

    if(!('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)) {
        throw new DataError('Some datafields are missing');
    }

    const newPatient: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
    };

    return newPatient;
};

export default toNewPatient;