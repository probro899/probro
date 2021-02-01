import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Navbar } from '../home/component';
import PriceCard from './PriceCard';
import Footer from '../../common/footer';

const freePlanData = [
    "Free Plan 1",
    "Free Plan 2",
    "Free Plan 3",
    "Free Plan 4",
    "Free Plan 5",
]
const individualPlan = [
    "Individual Plan 1",
    "Individual Plan 2",
    "Individual Plan 3",
    "Individual Plan 4",
    "Individual Plan 5",
]
const organizationPlan = [
    "Organization Plan 1",
    "Organization Plan 2",
    "Organization Plan 3",
    "Organization Plan 4",
    "Organization Plan 5",

]

class Pricing extends React.Component {
    state = {};

    componentDidMount() {
        const { updateNav } = this.props;
        updateNav({ schema: 'mainNav', data: { name: 'pricing' } });
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="pc-pricing-plan pc-container">
                    <div className="pc-price-header-wrapper">
                        <h3 className="pc-price-subheader">Choose a plan</h3>
                        <h1 className="pc-price-header">Pick a plan for your team</h1>
                    </div>
                    <div className="pc-cardlist-wrapper">
                        <PriceCard
                            planPrice="0"
                            priceDescription="add some description about the plan"
                            priceName="Single" buttonText="Join for free"
                            data={freePlanData}
                        />
                        <PriceCard
                            planPrice="4"
                            priceDescription="add some description about the plan"
                            priceName="Individual"
                            buttonText="Join with Individual"
                            data={individualPlan}
                        />
                        <PriceCard
                            planPrice="10"
                            priceDescription="add some description about the plan"
                            priceName="Organization"
                            buttonText="Join with Organization"
                            data={organizationPlan}
                        />
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Pricing);
