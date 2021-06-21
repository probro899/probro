import React from 'react';
import Price from './Price';
import { Button } from '../../../../common/utility-functions/Button/Button';

export default ({ enrolled, course, onEnroll }) => {
  return (
    <>
      <Price priceDetails={course.priceDetails} />
      <div className="pcc-enroll-btn">
        <Button
          onClick={onEnroll}
          type="button"
          buttonStyle={enrolled ? 'btn--success--solid' : 'btn--primary--solid'}
          buttonSize="btn--medium"
          title={enrolled ? 'Goto Course' : 'Enroll Now'}
        />
      </div>
    </>
  );
};
