/* eslint-disable react/prop-types */
import React from 'react';
import Popup from '../common/Form/Popup';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }


  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  closeDailogue = () => {
    this.setState({ hasError: false });
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error by eror bounday', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Popup
          isOpen={hasError}
          onClose={this.closeDailogue}
          title="Error"
          hasBackdrop={false}
        >
          <h1>{`${error}`}</h1>
        </Popup>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
