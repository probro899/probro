import React from 'react';

export default (text) => {
    const splitted = text.trim().split("\n");
    for(let i=0; i < splitted.length; i++) {
        console.log(splitted[i]);
    }
    return (
        <React.Fragment>{text}</React.Fragment>
    )
}
