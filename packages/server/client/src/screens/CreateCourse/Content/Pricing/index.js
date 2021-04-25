import React, { useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import ContentWrapper from '../../components/ContentWrapper';
import PricingForm from './PricingForm';
import Alert from '../../../../common/Alert';
import { SwitchButton } from '../../../../common/Form/SwitchButton';

const Pricing = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isFree, setIsFree] = useState(false);

    const toggleOpen = () => {
        setIsOpen(false);
    }
    const toggleFreeStatus = () => {
        setIsFree(!isFree);
    }

    return (
        <>
            <ContentHeader title="Pricing" />
            <ContentWrapper>
                <Alert isOpen={isOpen} onClose={toggleOpen} status="danger" title="Due to increased volume of new courses being submitted for review, the Quality Review Process may take up to 6 days. In order to avoid any additional delays." />
                <div className="course-price-container">

                    <div className="free-course-switch">
                        <span className="free-title"> If you intend to offer your course for free, click on toggle button:</span>
                        <SwitchButton
                            onChange={toggleFreeStatus}
                            checked={isFree}
                        />
                    </div>
                    {
                        !isFree &&
                        <div>
                            <p className="price-description">Please add the price for your course below and click 'Save'. </p>
                            <PricingForm />
                        </div>
                    }
                </div>
            </ContentWrapper>
        </>
    )
}

export default Pricing;
