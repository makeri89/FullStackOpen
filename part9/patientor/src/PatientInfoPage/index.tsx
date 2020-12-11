import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { Diagnosis, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatient, setDiagnosesList } from '../state';
import EntryDetails from './EntryDetails';

const PatientInfoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient, diagnoses }, dispatch] = useStateValue();

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

    const getDiagnosisInfo = (code: string): string => {
        return diagnoses[code].name;
    };

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
                    {/* <p>{entry.date}</p>
                    <ul>
                        {entry.diagnosisCodes && 
                        entry.diagnosisCodes.map(code =>
                            <li key={code}>
                                {code} {getDiagnosisInfo(code)}
                            </li>
                        )}
                    </ul> */}
                    <EntryDetails entry={entry} diagnoses={diagnoses}/>
                </div>
            )}
        </div>
    )

}

export default PatientInfoPage;