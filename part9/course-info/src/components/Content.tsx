import React from 'react';

import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
    courseparts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseparts }) => {
    return (
        <div>
            {courseparts.map(part => (
                <Part key={part.name} coursepart={part} />
            ))}
        </div>
    )
}

export default Content;