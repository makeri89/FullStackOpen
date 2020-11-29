import React from 'react';

const Content = (props) => {
    return (
        <div>
            {props.name} {props.exercises}
        </div>
    );
};

export default Content;