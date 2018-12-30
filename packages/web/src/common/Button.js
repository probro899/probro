import React from 'react';
import { Button,Intent } from '@blueprintjs/core';

export default ({text}) => {
    return (
        <Button text={text} intent={Intent.PRIMARY} fill/>
    );
}