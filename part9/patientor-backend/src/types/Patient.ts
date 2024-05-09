interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

type NonSensitivePatient = Omit<Patient, 'ssn'>;

export { 
    Patient,
    NonSensitivePatient
};