import React from 'react';
// import { TextArea } from '@blueprintjs/core';
import { matchUrl } from '../../../../common/utility-functions';
import { FormTextArea } from '../../../../common/Form/FormTextArea';

const Description = ({ editDesc, value, description, onChange }) => {

  let desc = '';

  const changed = (e) => {
    if (e.keyCode === 13) {
      onChange(e.target.value + "\n");
    } else {
      onChange(e.target.value);
    }
  };

  const createMarkedUpText = (txt) => {
    return matchUrl(txt);
  };

  const newlinesSplit = (txt) => {
    const splitArr = txt.split('\n');
    for (let i = 0; i < splitArr.length; i++) {
      desc += `${createMarkedUpText(splitArr[i])}<br />`;
    }
  };

  const getDescription = () => {
    desc = '';
    if (description) {
      const re = new RegExp('\n\\s*-\\s|^\\s*-\\s'); // matching the rejex for list
      const listArr = description.title.split(re);
      if (listArr.length > 1) {
        // split if there is a list
        if (listArr[0] !== '') { newlinesSplit(listArr[0]); }
        for (let i = 1; i < listArr.length; i++) {
          if (listArr[i].indexOf('\n') >= 0) {
            desc += `<li>${createMarkedUpText(listArr[i].substr(0, listArr[i].indexOf('\n')))}</li>`;
            newlinesSplit(listArr[i].substr(listArr[i].indexOf('\n')));
          } else {
            desc += `<li>${createMarkedUpText(listArr[i])}</li>`;
          }
        }
      } else {
        newlinesSplit(listArr[0]);
      }
    }
    return <div dangerouslySetInnerHTML={{ __html: desc }} />;
  };

  return (
    <div className="desc">
      {editDesc
        ? <FormTextArea spellCheck value={value} onChange={changed} />
        : getDescription()
      }
    </div>
  );
};

export default Description;
