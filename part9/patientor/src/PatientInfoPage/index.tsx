import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import { Diagnosis, Entry, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatient, setDiagnosesList, addEntry } from '../state';
import EntryDetails from './EntryDetails';
import { EntryFormValues } from './AddEntryForm';
import AddEntry from './AddEntry';

const PatientInfoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient, diagnoses }, dispatch] = useStateValue();
    
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    }

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(addEntry(newEntry, id));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    }

    const genders = {
        male: 'mars' as 'mars',
        female: 'venus' as 'venus',
        other: 'genderless' as 'genderless'
    }

    useEffect(() => {
        const getPatientInfo = async () => {
            try {
                const { data: patientInfo } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

                dispatch(setPatient(patientInfo));
            } catch (e) {
                console.log(e);
            }
        }

        const fetchDiagnosesList = async () => {
            try {
              const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
                `${apiBaseUrl}/diagnoses`
              );
              dispatch(setDiagnosesList(diagnosesListFromApi));
            } catch (e) {
              console.log(e)
            }
          };
        
        fetchDiagnosesList();

        if (!patient || patient.id !== id) {
            getPatientInfo();
        }
    }, [patient, id, dispatch]);

    if (!patient) {
        return (
            <div>Invalid patient id!</div>
        )
    }

    return (
        <div>
            <h1>{patient.name}<Icon name={genders[patient.gender]} /></h1>
            
            <div>
                <p>
                    ssn: {patient.ssn}
                <br/>
                    occupation: {patient.occupation}
                </p>
            </div>

            <h4>entries</h4>
            {patient.entries.map(entry => 
                <div key={entry.id}>
                    <EntryDetails entry={entry} diagnoses={diagnoses}/>
                </div>
            )}
            <AddEntry
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button size='massive' onClick={() => openModal()}>Add new entry</Button>
        </div>
    )

}

export default PatientInfoPage;