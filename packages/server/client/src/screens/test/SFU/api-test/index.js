/* eslint-disable react/button-has-type */
import React from 'react';
import Organization from './Organization';
import Course from './Course';

export default class ApiTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('Apis in api test', this.state);
    return (
      <div>
        <Course {...this.props} />
        <Organization {...this.props} />
      </div>
    );
  }
}
