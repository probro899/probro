import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Button } from '../../../../common/utility-functions/Button/Button';

const BasicSettingContainer = ({ title, form, subtitle }) => {
  const [showContent, setShowContent] = useState(false);
  const toggleshowContent = () => setShowContent(!showContent);
  return (
    <div className="basic-setting-container">
      <div className="settings-wrapper">
        <div className={`setting-header ${showContent ? 'content-show' : ''}`}>
          <div className="left-section">
            <p className="setting-title">{title}</p>
            <p className="setting-description">{subtitle}</p>
          </div>
          <div className="right-section">
            <Button
              onClick={toggleshowContent}
              type="button"
              buttonStyle="btn--primary--outline"
              buttonSize="btn--small"
              icon={showContent ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            />
          </div>
        </div>
        {showContent && <div className="setting-edit-container">{form}</div>}
      </div>
    </div>
  );
};

export default BasicSettingContainer;
