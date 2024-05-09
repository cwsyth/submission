interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

type NonSensitivePatient = Omit<Patient, 'ssn'>;

type NewPatient = Omit<Patient, 'id'>;

export { 
    Patient,
    NonSensitivePatient,
    NewPatient
};