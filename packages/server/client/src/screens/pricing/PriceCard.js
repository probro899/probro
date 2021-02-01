import React from 'react'
import { Button } from '../../common/utility-functions/Button/Button';

export default ({ priceName, priceDescription, planPrice, buttonText, data }) => {
    return (
        <div className="pc-price-card-wrapper">
            <div className="pc-price-containers">
                <div className="pc-price-name-and-desc">
                    <h4>{priceName}</h4>
                    <p>{priceDescription}</p>
                </div>
                <div className="pc-plan-feature-list">
                    <ul>
                        {
                            data.map(list =>

                                <li>
                                    <img src="/assets/graphics/check.svg" />
                                    <p>{list}</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="pc-price-and-submit">
                    <div className="pc-plan-price">
                        <span className="pc-price">
                            ${planPrice}
                        </span>
                        <span className="pc-plan-month-user">
                            per user/month
                    </span>
                    </div>
                    <div className="pc-cta-btn">
                        <Button
                            onClick={() => { }}
                            type="button"
                            buttonStyle="btn--primary--solid"
                            buttonSize="btn--medium"
                            title={buttonText}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

