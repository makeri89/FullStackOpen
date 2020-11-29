import React from 'react';

import { CoursePart } from '../types';

interface TotalProps {
    exercises: CoursePart[];
}

const Total: React.FC<TotalProps> = ({ exercises }) => {
    const sum = exercises.reduce((carry, part) => carry + part.exerciseCount, 0);
    return (
        <h2>Number of exercises in total {sum}</h2>
    )
}

export default Total;