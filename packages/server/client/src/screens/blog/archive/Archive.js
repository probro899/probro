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

function Archive() {
  const { data, loading } = useQuery(GET_ARCHIVES);
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
              data.getArchive.basedOnHistory.blogs.map((obj, index) => <SingleArchive key={index} obj={obj} />)
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

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Archive);
