import patientData from '../../data/patients';

import { NewPatient, Patient, Entry, NewEntry } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
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

const getPatientById = (id: string): Patient | undefined => {
    let patient = patients.find(p => p.id === id);

    if (patient && !patient.entries) {
        patient = {
            ...patient,
            entries: []
        };
    }
    
    return patient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
    const entryToAdd: Entry = {
        ...newEntry,
        id: String(Math.floor(Math.random() * 1000000))
    };
    patient.entries.push(entryToAdd);
    return patient;
};

export default {
    getPatients,
    addPatient,
    getPatientById,
    addEntry
};