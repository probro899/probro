import React from 'react';
import { matchUrl } from '../../../../../common/utility-functions';

const createMarkedUpText = (txt) => {
  return matchUrl(txt);
};

const newlinesSplit = (txt, desc) => {
  const splitArr = txt.split('\n');
  for (let i = 0; i < splitArr.length; i++) {
    desc += `${createMarkedUpText(splitArr[i])}<br />`;
  }
  return desc;
};

export default (description) => {
  let desc = '';
  const re = new RegExp('\n\\s*-\\s|^\\s*-\\s'); // matching the rejex for list
  const listArr = description.split(re);
  if (listArr.length > 1) {
    // split if there is a list
    if (listArr[0] !== '') { desc = newlinesSplit(listArr[0], desc); }
    for (let i = 1; i < listArr.length; i++) {
      if (listArr[i].indexOf('\n') >= 0) {
        desc += `<li>${createMarkedUpText(listArr[i].substr(0, listArr[i].indexOf('\n')))}</li>`;
        desc = newlinesSplit(listArr[i].substr(listArr[i].indexOf('\n')), desc);
      } else {
        desc += `<li>${createMarkedUpText(listArr[i])}</li>`;
      }
    }
  } else {
    desc = newlinesSplit(listArr[0], desc);
  }
  return <div dangerouslySetInnerHTML={{ __html: desc }} />;
};
