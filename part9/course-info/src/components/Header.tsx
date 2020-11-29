import React from 'react';

const Header: React.FC<{ coursename: string}> = ({ coursename }) => (
    <h1>{coursename}</h1>
)

export default Header;