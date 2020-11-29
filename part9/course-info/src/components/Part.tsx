import React from 'react';
import { CoursePart} from '../types';

const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

interface PartProps {
    coursepart: CoursePart;
}


const Part: React.FC<PartProps> = ({ coursepart }) => {
    switch (coursepart.name) {
        case 'Fundamentals':
            return (
                <div>
                    <h3>{coursepart.name}</h3>
                    <p>Took {coursepart.exerciseCount} hours of work</p>
                    <p>Description: {coursepart.description}</p>
                </div>
            )
        case 'Using props to pass data':
            return (
                <div>
                    <h3>{coursepart.name}</h3>
                    <p>Took {coursepart.exerciseCount} hours of work</p>
                    <p>Group project count: {coursepart.groupProjectCount}</p>
                </div>
            )
        case 'Deeper type usage':
            return (
                <div>
                    <h3>{coursepart.name}</h3>
                    <p>Took {coursepart.exerciseCount} hours of work</p>
                    <p>Description: {coursepart.description}</p>
                    <p>Submit here: {coursepart.exerciseSubmissionLink}</p>
                </div>
            )
        case 'Typing some more':
            return (
                <div>
                    <h3>{coursepart.name}</h3>
                    <p>Took {coursepart.exerciseCount} hours of work</p>
                    <p>Description: {coursepart.description}</p>
                </div>
            )
        default:
            return assertNever(coursepart)
    }
};

export default Part;