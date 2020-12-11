import React from 'react';

import { Entry, Diagnosis } from '../types';

import HospitalData from './HospitalData';
import HealthCheckData from './HealthCheckData';
import OccupationalHealthcareData from './OccupationalHealthcareData';



const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
}

const EntryDetails: React.FC<{ entry: Entry, diagnoses: any }> = ({ entry, diagnoses }) => {

    switch (entry.type) {
        case 'Hospital':
            return <HospitalData entry={entry} diagnoses={diagnoses} />;
        case 'HealthCheck':
            return <HealthCheckData entry={entry} diagnoses={diagnoses} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareData entry={entry} diagnoses={diagnoses} />;
        default:
            return assertNever(entry);
    }
}

export default EntryDetails;