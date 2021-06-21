import React, { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Button } from '../../../../common/utility-functions/Button/Button';
import Popup from '../../../../common/Form/Popup';

const Header = ({ totalUser, popupContent, header, buttonText, popupTitle, addButton, badge, badgeCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pc-role-header-wrapper">
      <div className="pc-role-title-wrapper">
        <h3 className="pc-role-header-title">{header}</h3>
        <span className="pc-role-count">
          {totalUser}
        </span>
      </div>
      <div className="pc-head-right">
        {
          badge && (
          <div className="pc-badge">
            <span className="pc-badge-count">{badgeCount}</span>
          </div>
          )
        }
        {
            addButton && (
            <div className="pc-role-add-user">
              <Button
                onClick={togglePopup}
                type="button"
                buttonStyle="btn--primary--solid"
                buttonSize="btn--small"
                title={buttonText}
                icon={<AiOutlineUserAdd size={20} />}
              />
            </div>
            )
        }
      </div>
      <Popup isOpen={isOpen} onClose={togglePopup} title={popupTitle} icon={<AiOutlineUserAdd size={20} />} width='650px'>
        {popupContent}
      </Popup>
    </div>
  );
};

Header.defaultProps = {
  addButton: false,
  badge: false,
};

export default Header;
