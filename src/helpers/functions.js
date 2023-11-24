import React from 'react';
export const addLineBreak = (str) => {
    str.split('\n').map((subStr, index) => (
            <React.Fragment key={index}>
            {subStr}
            <br />
            </React.Fragment>
    ))};
