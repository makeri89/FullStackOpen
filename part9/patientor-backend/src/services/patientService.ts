import patientData from '../../data/patients.json';

import { NewPatient, Patient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: String(Math.floor(Math.random() * 1000000)),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    addPatient
};