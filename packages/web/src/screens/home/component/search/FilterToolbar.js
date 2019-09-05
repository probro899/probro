import React from 'react';
import { Control } from '../../../../common';
import filterSchema from './structure';

class FilterToolbar extends React.Component {
  state = {};

  apply = (data) => {
    console.log(data);
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
        <div className="right set" />
      </div>
    );
  }
}

export default FilterToolbar;
