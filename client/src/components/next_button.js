import React from 'react';

export default (props) => (
    <div className="container">
        <button className={`waves-effect waves-light btn-large green darken-2 oxygenFont z-depth-2 ${props.style}`}>{props.name || 'Next'}</button>
    </div>
);