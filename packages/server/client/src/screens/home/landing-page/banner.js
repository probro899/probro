import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import BannerContent from './BannerContent';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { account } = this.props;
    return (
      <div className="banner-container pc-container">
        <div className="banner-head">
          <p className="page-sub-heading">Our working process</p>
          <h2 className="page-heading">How it works</h2>
        </div>
        <BannerContent account={account} />
      </div>
    );
  }
}

Banner.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ account }) => { return { account }; };
export default connect(mapStateToProps, { ...actions })(Banner);
