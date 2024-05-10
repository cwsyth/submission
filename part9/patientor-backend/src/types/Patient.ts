enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

type NonSensitivePatient = Omit<Patient, 'ssn'>;

type NewPatient = Omit<Patient, 'id'>;

export {
    Gender,
    Patient,
    NonSensitivePatient,
    NewPatient
};