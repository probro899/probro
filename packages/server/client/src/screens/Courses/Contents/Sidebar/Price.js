import React from 'react';

const Price = (props) => {
  const priceDetails = props.priceDetails || {};
  const discounted = priceDetails.price - priceDetails.discount;
  const percent = (priceDetails.discount / priceDetails.price * 100).toFixed(0);
  return (
    <div className="pcc-price-section">
      <div className="pcc-discount-price">
        {discounted < 1 ? <span>Free Course</span> : <span>{priceDetails.currency} {discounted}</span>}
      </div>
      {
        priceDetails.discount > 0 && (
          <>
            <div className="pcc-original-price">
              <span>
                <s>{priceDetails.currency} {priceDetails.price}</s>
              </span>
            </div>
            <div className="pcc-discount-percentage">
              <span>{percent}% off</span>
            </div>
          </>
        )
      }
    </div>
  );
};
export default Price;
