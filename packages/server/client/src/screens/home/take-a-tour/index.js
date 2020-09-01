import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Navbar from '../component/navbar';

class TakeTour extends React.Component {
  state = {};

  componentDidMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'tour' },
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="take-tour">
        <iframe
          width="600"
          height="600"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
        >
        </iframe>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(TakeTour);
