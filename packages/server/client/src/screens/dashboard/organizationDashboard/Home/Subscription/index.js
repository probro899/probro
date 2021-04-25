import React from 'react';
import { Button } from '../../../../../common/utility-functions/Button/Button';

const Subscription = () => {
    return (
        <>
            <div className="pc-sub-header">
                <div className="pc-header-detail">
                    <h3 className="pc-sub-name">Advance Plan</h3>
                    <p className="pc-subscribe">Subscribed on: <strong>02-03-2021</strong></p>
                    <p className="pc-expire">Expires on: <strong>02-08-2021</strong></p>
                </div>
                <div className="pc-sub-price">
                    <p>
                        <strong>$59.00</strong> / month
                            </p>
                </div>
            </div>
            <div className="pc-plan-action">
                <div className="pc-plan-up">
                    <Button
                        onClick={() => { }}
                        type="button"
                        buttonStyle="btn--primary--solid"
                        buttonSize="btn--medium"
                        title="Upgrade plan"
                    />
                </div>
                <a href="#" className="pc-sub-cancel">
                    Cancel subscription
                        </a>
            </div>
        </>
    )
}

export default Subscription;
