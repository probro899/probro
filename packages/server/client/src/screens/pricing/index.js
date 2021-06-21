import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import { Navbar } from '../home/component';
import PriceCard from './PriceCard';
import { Spinner } from '../../common';
import Footer from '../../common/footer';
import { GET_PACKAGE } from '../../queries';
import clientQuery from '../../clientConfig';
import HeaderBanner from '../../common/HeaderBanner';
import ReactHelmet from '../../common/react-helmet';

class Pricing extends React.Component {
  state = {};

  async componentDidMount() {
    const { account, match, updateNav } = this.props;
    try {
      const res = await clientQuery.query({ query: GET_PACKAGE, variables: { orgId: parseInt(match.params.orgId, 10), sessionId: account.sessionId }, fetchPolicy: 'network-only' });
      if (res) {
        this.setState({ data: res.data.getPackage });
      }
    } catch (e) {
      console.log('Error', e);
    }
  }

  changeData = (updatedData) => {
    const { packageId, isSubscribe } = updatedData;
    const { data } = this.state;
    const dataTobeUpdate = data.map((p) => (p.id === packageId ? { ...p, isSubscribe } : p));
    this.setState({ data: dataTobeUpdate });
  }

  render() {
    // console.log('props in pricing', this.props, this.state);
    const { data } = this.state;
    if (!data) {
      return <Spinner wClass="spinner-wrapper" />;
    }
    return (
      <>
        <ReactHelmet {...this.props} />
        <Navbar />
        <HeaderBanner title="Choose a plan" subTitle="Pick a plan for your team" />
        <div className="pc-pricing-plan pc-container">
          <div className="pc-cardlist-wrapper">
            {data.map(p => (
              <PriceCard
                planPrice={p.price}
                priceDescription={p.descrition}
                packageType={p.type}
                buttonText="Start Free Trial"
                data={{ ...p.packageDescription, noOfClass: p.noOfClass }}
                isSubscribe={p.isSubscribe}
                packageId={p.id}
                changeData={this.changeData}
                packageDetail={p}
                {...this.props}
              />
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Pricing);
Pricing.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

