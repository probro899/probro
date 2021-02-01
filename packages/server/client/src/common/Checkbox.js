import React from 'react';

export default (props) => {
    const { onChange, data } = props;
    
    const changeAction = (e) => {
        data.onChange(e.target.checked);
        onChange(data.id, e.target.checked);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0px" }}>
            <p>{data.name}</p>
            <input type="checkbox" onChange={changeAction} checked={data.checked} id={data.id} name={data.name} value={data.name}></input>
        </div>
    );
};
