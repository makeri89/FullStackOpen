/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, NewEntry, HealthCheckRating, BaseEntry, Disharge, SickLeave } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (name: any): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }

    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatient = (object: any): NewPatient => {
    const newEntry: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entries: parseEntries(object.entries) || [],
    };

    return newEntry;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const isEntryType = (entry: any): entry is Entry => {
    const healthCheck: boolean = entry.type === 'HealthCheck';
    const occupationalHealthcate: boolean = entry.type === 'OccupationalHealthcare';
    const hospital: boolean = entry.type === 'Hospital';

    return healthCheck || occupationalHealthcate || hospital;
};

const parseEntry = (entry: any): NewEntry => {
    if (!entry || !isEntryType(entry)) {
        throw new Error('Incorrect entry type' + entry);
    }
    return entry;
};

const parseEntries = (entries: any): Entry[] => {
    if (!entries) return entries;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (entries.map((entry: any) => !isEntryType(entry))) {
        throw new Error('Incorrect or missing entries:' + entries);
    }
    return entries;
};

const parseDischarge = (discharge: any): Disharge => {
    if (!discharge.date || !isDate(discharge.date)) {
        throw new Error('Invalid date of discharge');
    }
    if (!discharge.criteria || !isString(discharge.criteria)) {
        throw new Error('Invalid criteria of discharge');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return discharge;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect health check rating');
    }
    return healthCheckRating;
};

const parseSickleaves = (sickleave: any): SickLeave => {
    if (!sickleave) return sickleave;

    if (!sickleave.startDate) {
        throw new Error('Sickleave starting date missing');
    }

    if (!sickleave.endDate) {
        throw new Error('Sickleave ending date missing');
    }

    const startDate = parseDate(sickleave.startDate);
    const endDate = parseDate(sickleave.endDate);

    return {
        startDate,
        endDate
    };
};

const parseEmployer = (employerName: any): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Invalid employer name');
    }

    return employerName;
};

export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const toNewEntry = (newEntry: any): NewEntry => {
    const correctTypeEntry = parseEntry(newEntry);

    const newDiagnosisEntry: Omit<BaseEntry, 'id'> = {
        date: parseDate(correctTypeEntry.date),
        description: parseString(correctTypeEntry.description),
        specialist: parseString(correctTypeEntry.specialist),
    };

    switch (correctTypeEntry.type) {
        case 'Hospital':
            return {
                ...newDiagnosisEntry,
                type: correctTypeEntry.type,
                discharge: parseDischarge(correctTypeEntry.discharge)
            };
        case 'HealthCheck':
            return {
                ...newDiagnosisEntry,
                type: correctTypeEntry.type,
                healthCheckRating: parseHealthCheckRating(correctTypeEntry.healthCheckRating)
            };
        case 'OccupationalHealthcare':
            return {
                ...newDiagnosisEntry,
                type: correctTypeEntry.type,
                sickLeave: parseSickleaves(correctTypeEntry.sickLeave),
                employerName: parseEmployer(correctTypeEntry.employerName)
            };
        default:
            return assertNever(correctTypeEntry);

    }
};

export default toNewPatient;