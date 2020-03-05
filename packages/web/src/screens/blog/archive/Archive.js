import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as actions from '../../../actions';
import Navbar from '../../home/component/navbar';
import Footer from '../../../common/footer';
import { ENDPOINT } from '../../../config';
import { Spinner } from '../../../common';
import SingleArchive from './SingleArchive';

class Archive extends React.Component {
  state = {
    loading: true,
    data: {},
  };

  async componentDidMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'archive' },
    });
    try {
      const res = await axios.get(`${ENDPOINT}/web/get-archive?userId=bhagya-sah-1582995650174`);
      console.log('archive value', res);
      this.setState({
        data: res.data,
        loading: false,
      });
    } catch (e) {
      console.log('Eror: ', e);
    }
  }

  render() {
    const { loading, data } = this.state;
    return loading ? <Spinner /> : (
      <div>
        <Navbar />
        <div className="archive">
          <div className="ar-top">
            <span>BASED ON YOUR READING HISTORY</span>
          </div>
          <div className="ar-content">
            <div className="ar-left">
              {
               data.archive ?  data.archive.map((obj, index) => <SingleArchive key={index} obj={obj} />) : null
              }
            </div>
            <div className="ar-right">
              <p className="ar-right-top">
                Popular on PC
              </p>
              <hr />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Archive.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Archive);
