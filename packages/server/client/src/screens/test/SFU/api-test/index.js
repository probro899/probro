/* eslint-disable react/button-has-type */
import React from 'react';
import Organization from './Organization';
import Course from './Course';
import Package from './Package';
import Class from './board';

export default class ApiTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Course {...this.props} />
        <Organization {...this.props} />
        <Package {...this.props} />
        <Class {...this.props} />
      </div>
    );
  }
}
