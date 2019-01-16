import React from 'react';

const IssueLabel = ({text, color, backgroundColor}) => (
    <span
        className="list-item__label"
        key={text}
        style={{
            backgroundColor,
            color
        }} >
        {text}
    </span>);

export default IssueLabel;