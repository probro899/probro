import React from 'react';
import SectionHeader from './SectionHeader';

const PartnerSection = () => {
    return (
        <div className="partner-section">
            <div className="pc-container">
                <SectionHeader heading="Our Partners" />
                <div className="partner-content">
                    <ul className="content-list">
                        <li className="content-item">
                            <figure className="partner-logo-wrapper">
                                <img src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/slider-logo1.png" alt="logo" />
                            </figure>
                        </li>
                        <li className="content-item">
                            <figure className="partner-logo-wrapper">
                                <img src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/slider-logo2.png" alt="logo" />
                            </figure>
                        </li>
                        <li className="content-item">
                            <figure className="partner-logo-wrapper">
                                <img src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/slider-logo3.png" alt="logo" />
                            </figure>
                        </li>
                        <li className="content-item">
                            <figure className="partner-logo-wrapper">
                                <img src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/slider-logo1.png" alt="logo" />
                            </figure>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default PartnerSection;
