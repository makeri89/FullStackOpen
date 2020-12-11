import React from 'react';
import { Icon, Container, SemanticCOLORS } from 'semantic-ui-react';

import { HealthCheckEntry, HealthCheckRating } from '../types';

const HealthCheckData: React.FC<{ entry: HealthCheckEntry, diagnoses: any }> = ({ entry, diagnoses }) => {

    const getDiagnosisInfo = (code: string): string => {
        return diagnoses[code].name;
    };

    const colors = (rating: HealthCheckRating): SemanticCOLORS => {
        switch (rating) {
            case HealthCheckRating.Healthy:
                return 'green';
            case HealthCheckRating.LowRisk:
                return 'yellow';
            case HealthCheckRating.HighRisk:
                return 'orange';
            case HealthCheckRating.CriticalRisk:
                return 'red';
            default: 
                return 'green';
        }
    };

    const style = {
        border: 'solid lightgray 2px',
        borderRadius: '10px',
        padding: '10px 5px 5px 20px',
        margin: '10px'
    };

    return (
        <div>
            <Container style={style}>
                <h4>{entry.date} <Icon name='user md' size='big' /></h4>
                <p>{entry.description}</p>
                {entry.diagnosisCodes && 
                entry.diagnosisCodes.map(code =>
                    <li key={code}>
                        {code} {getDiagnosisInfo(code)}
                    </li>
                )}
                <Icon name='heart' color={colors(entry.healthCheckRating)} />
                <br/>
            </Container>
        </div>
    );
};

export default HealthCheckData;