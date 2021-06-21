import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../common/utility-functions/Button/Button';

const SectionHeader = ({ heading, subheading, buttonTitle, showButton, link }) => {
  return (
    <div className="section-header">
      <div className="heading-section">
        <h2 className="section-heading">{heading}</h2>
        <p className="section-subheader">{subheading}</p>
      </div>
      {
        showButton && <div className="button-section">
          <Link to={link}>
            <Button
              type="button"
              buttonStyle="btn--primary--solid"
              buttonSize="btn--small"
              title={buttonTitle}
            />
          </Link>
        </div>
      }
    </div>
  )
}

SectionHeader.defaultProps = {
  showButton: false
}

export default SectionHeader
