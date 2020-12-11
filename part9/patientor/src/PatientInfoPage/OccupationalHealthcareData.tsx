import React from 'react';
import { Icon, Container } from 'semantic-ui-react';

import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareData: React.FC<{ entry: OccupationalHealthcareEntry, diagnoses: any }> = ({ entry, diagnoses }) => {

    const getDiagnosisInfo = (code: string): string => {
        return diagnoses[code].name;
    };

    const style = {
        border: 'solid lightgray 2px',
        borderRadius: '10px',
        padding: '10px 5px 5px 20px',
        margin: '10px',
    };

    return (
        <div>
            <Container style={style}>
                <h4>{entry.date} <Icon name='stethoscope' size='big' /></h4>
                <p>{entry.description}</p>
                {entry.diagnosisCodes && 
                entry.diagnosisCodes.map(code =>
                    <li key={code}>
                        {code} {getDiagnosisInfo(code)}
                    </li>
                )}
                <br/>
            </Container>
        </div>
    );
};

export default OccupationalHealthcareData;