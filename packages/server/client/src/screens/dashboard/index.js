import React, { Suspense } from 'react';
import Home from './Home';
import ErrorBoundary from './ErrorBoundary';

// const LazyHomeComponent = React.lazy(() => import('./Home'));

class DashBoard extends React.Component {
  state = {};

  render() {
    return (
      <ErrorBoundary>
        <Home {...this.props} />
        {/* <Suspense fallback={<div>Loading ....</div>}>
          <LazyHomeComponent {...this.props} />
        </Suspense> */}
      </ErrorBoundary>
    );
  }
}

export default DashBoard;
