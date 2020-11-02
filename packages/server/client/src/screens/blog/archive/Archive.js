import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import * as actions from '../../../actions';
import Navbar from '../../home/component/navbar';
import Footer from '../../../common/footer';
import { Spinner } from '../../../common';
import SingleArchive from './SingleArchive';
import PopularOnPc from './PopularOnPc';
import { GET_ARCHIVES } from '../../../queries';
import clientConfig from '../../../clientConfig';

class Archive extends React.Component {
  state = { loading: true, data: null }

  async componentWillMount() {
    const { data, loading } = await clientConfig.query({ query: GET_ARCHIVES, fetchPolicy: 'network-only' });
    this.setState({ loading: false, data });
  }

  render() {
    const { data, loading } = this.state;
    if (loading) return <Spinner />;
    return (
      <div>
        <Navbar />
        <div className="archive">
          <div className="ar-top">
            <span>BASED ON YOUR READING HISTORY</span>
          </div>
          <div className="ar-content">
            <div className="ar-left">
              {
              data && data.getArchive.basedOnHistory.blogs.map((obj, index) => <SingleArchive key={index} obj={obj} />)
              }
            </div>
            <div className="ar-right">
              <p className="ar-right-top">
                Popular on PC
              </p>
              <PopularOnPc data={data.getArchive.popularOnPc} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Archive);
