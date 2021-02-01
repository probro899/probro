import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Navbar from '../../home/component/navbar';
import Footer from '../../../common/footer';
import { Spinner } from '../../../common';
import SingleArchive from './SingleArchive';
import PopularOnPc from './PopularOnPc';
import { GET_ARCHIVES } from '../../../queries';
import clientConfig from '../../../clientConfig';
import cookies from '../../../redux/account/cookies';

class Archive extends React.Component {
  state = { loading: true, data: null }

  async componentDidMount() {
    const { updateNav } = this.props;
    const sessionId = cookies.get('pc-session');
    const { data, loading } = await clientConfig.query({ query: GET_ARCHIVES, variables: { sessionId }, fetchPolicy: 'network-only' });
    updateNav({ schema: 'mainNav', data: { name: 'archive' } });
    this.setState({ loading: false, data });
  }

  render() {
    const { data, loading } = this.state;
    const { database, account } = this.props;
    if (loading) return <Spinner />;
    return (
      <>
        <Navbar />
        <div className="archive pc-container">
          <div className="archive-wrapper">
            <div className="ar-top">
              <h2>BASED ON YOUR READING HISTORY</h2>
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
                <PopularOnPc database={database} account={account} data={data.getArchive.popularOnPc} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Archive);
