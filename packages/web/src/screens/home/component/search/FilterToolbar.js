import React from 'react';
import axios from 'axios';
import { Button } from '@blueprintjs/core';
import { Control } from '../../../../common';
import filterSchema from './structure';
import { ENDPOINT } from '../../../../config';

class FilterToolbar extends React.Component {
  state = {};

  apply = (data) => {
    console.log(data);
  }

  advanceSearchHandler = async () => {
    const res = await axios.get(`${ENDPOINT}/web/advance-search?country=nepal&interest=computer&keyword=bhagya sah`);
    console.log('advance search result', res);
  }

  render() {
    return (
      <div className="filter-toolbar">
        <div className="left set">
          <span className="filter-label">
            Filters
          </span>
        </div>
        <div className="center set">
          <Control data={filterSchema} callback={this.apply} />
        </div>
        <Button text="search" onClick={this.advanceSearchHandler} />
        <div className="right set" />
      </div>
    );
  }
}

export default FilterToolbar;
