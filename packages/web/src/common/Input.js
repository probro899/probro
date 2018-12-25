import React from 'react';
import { InputGroup,Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { SEARCH } from '@blueprintjs/icons/lib/esm/generated/iconContents';

export default ({placeholder,class_,iconName}) => {
    if (iconName == 'Search'){
        const icon = <Icon icon={IconNames.SEARCH} iconSize={Icon.SIZE_LARGE} />;
        return (
            <InputGroup placeholder={placeholder} className={class_} leftIcon={icon}/>);
    } else {
        return (
        <InputGroup placeholder={placeholder} className={class_} />);
    }
}