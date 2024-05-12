import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Diagnosis, Entry, Patient } from "../types";

import patientService from '../services/patients';
import diagnosesService from '../services/diagnoses';

import { Typography } from '@mui/material';

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            const fetchSinglePatient = async () => {
                const patient = await patientService.getById(id);
                setPatient(patient);
            };
            fetchSinglePatient();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const diagnoses = await diagnosesService.getAll();
            setDiagnoses(diagnoses);
        };
        fetchDiagnoses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patient]);

    return (
        <div>
            {
                patient && (
                    <div style={{marginTop: "50px"}}>
                        <Typography variant="h4">
                            {patient.name} - {patient.gender}
                        </Typography>
                        <div>
                            ssn: {patient.ssn}
                        </div>
                        <div>
                            occupation: {patient.occupation}
                        </div>
                        <div style={{marginTop: "15px"}}>
                            <Typography variant="h5">
                                entries:
                            </Typography>
                            <div>
                                {
                                    patient.entries.map((entry: Entry) => (
                                        <div key={entry.id}>
                                            <div>{entry.date} - {entry.description}</div>
                                            <div>
                                                {
                                                    entry.diagnosisCodes?.map((code) => (
                                                        <li key={code}>
                                                            {code} {(
                                                                 diagnoses.find(diagnosis => {
                                                                    return diagnosis.code === code;
                                                                })?.name
                                                            )}
                                                        </li>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default PatientPage;