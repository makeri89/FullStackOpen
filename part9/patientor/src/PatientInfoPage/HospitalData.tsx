import React from 'react';
import { Icon, Container } from 'semantic-ui-react';

import { HospitalEntry } from '../types';

const HospitalData: React.FC<{ entry: HospitalEntry, diagnoses: any }> = ({ entry, diagnoses }) => {

    const getDiagnosisInfo = (code: string): string => {
        return diagnoses[code].name;
    };

    const style = {
        border: 'solid lightgray 2px',
        borderRadius: '10px',
        padding: '10px 5px 5px 20px',
    }

    return (
        <Container style={style}>
            <div>
                <h4><Icon name='hospital outline' size='big' /> {entry.date}</h4>
                
                <p>{entry.description}</p>
                {entry.diagnosisCodes && 
                entry.diagnosisCodes.map(code =>
                    <li key={code}>
                        {code} {getDiagnosisInfo(code)}
                    </li>
                )}
                <br/>
            </div>
        </Container>
    );
};

export default HospitalData;