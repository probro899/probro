import React from 'react';
import Home from './Home';
import ErrorBoundary from './ErrorBoundary';

class DashBoard extends React.Component {
  state = {};

  render() {
    return (
      <ErrorBoundary>
        <Home {...this.props} />
      </ErrorBoundary>
    );
  }
}

export default DashBoard;
