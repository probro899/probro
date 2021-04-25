import React from 'react';
import Overview from './Overview';
import CardSkeleton from './CardSkeleton';
import Subscription from './Subscription';

class Home extends React.Component {
    
    componentDidMount() {
        this.props.setActiveHeader('home');
    }

    render() {
        return (
            <>
                <Overview {...this.props} />
                <div className="pc-sub-pay">
                    <CardSkeleton title="Subscription plan">
                        <Subscription />
                    </CardSkeleton>
                </div>

            </>
        )
    }
}

export default Home;
