enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

type NewPatient = Omit<Patient, 'id'>;

export {
    Gender,
    Patient,
    NonSensitivePatient,
    NewPatient
};