import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient } from "../types";

import patientService from '../services/patients';

import { Typography } from '@mui/material';

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
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

    return (
        <div>
            {
                patient && (
                    <div>
                        <Typography variant="h3">
                            {patient.name} - {patient.gender}
                        </Typography>
                        <div>ssn: {patient.ssn}</div>
                        <div>occupation: {patient.occupation}</div>
                    </div>
                )
            }
        </div>
    );
};

export default PatientPage;