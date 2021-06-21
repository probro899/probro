/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GoOrganization } from 'react-icons/go';
import { BiGlobe } from 'react-icons/bi';
import { Button } from '../../common/utility-functions/Button/Button';
import Popup from '../../common/Form/Popup';
import { FormSelectField } from '../../common/Form/FormSelectField';
import connectButtonRendererHelper from './connectButtonRenderer';
import joinRequest from './helper-functions/joinRequest';

const ConnectButton = (props) => {
  // console.log('props in connect button', props);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, changeLoding] = useState(false);
  const [roleType, changeRole] = useState('student');
  const { data, account } = props;
  const isLogin = account.user;
  const { webSiteUrl, joinStatus, id } = data;
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const options = [
    {
      label: 'Student',
      value: 'student',
    },
    {
      label: 'Mentor',
      value: 'mentor',
    },
  ];

  const acceptHandler = async () => {
    const { apis, updateNav, changeFetchedData } = props;
    try {
      changeLoding(true);
      const res = await apis.updateOrganizationMember([{ status: 'active' }, { id: joinStatus.id }]);
      changeLoding(false);
      if (res.status === 200) {
        changeFetchedData({ ...data, joinStatus: { status: 'active' } });
      }
      if (res.status === 201) {
        updateNav({ schema: 'popNotification', data: { active: true, message: res.data, intent: 'error' } });
      }
    } catch (e) {
      changeLoding(false);
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Invitation accept faild', intent: 'error' } });
      console.error('Error in Change Role handler', e);
    }
  };

  const actionHandler = (type) => {
    if (type === 'join') {
      togglePopup();
    }

    if (type === 'accept') {
      acceptHandler();
    }
  };

  const onRoleChange = (e) => {
    changeRole(e.target.value);
  };

  const joinHandler = async () => {
    const { updateNav, changeFetchedData } = props;
    changeLoding(true);
    const res = await joinRequest({ status: 'request', oId: id, type: roleType, action: 'request', uId: account.user.id, email: account.user.email }, props);
    changeLoding(false);
    togglePopup();
    if (res.response === 200) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Request successfull', intent: 'success' } });
      changeFetchedData({ ...data, joinStatus: { status: 'request' } });
    }
    if (res.response === 400) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Request faild', intent: 'error' } });
    }
  };

  return (
    <div className="pc-connect-btns">
      <div className="pc-con">
        {connectButtonRendererHelper(joinStatus, actionHandler, isLogin)}
        <a href={webSiteUrl} target="_blank">
          <Button
            onClick={() => { }}
            type="button"
            buttonStyle="btn--primary--outline"
            buttonSize="btn--small"
            title="Website"
            icon={<BiGlobe size={20} />}
          />
        </a>
      </div>
      <Popup isOpen={isOpen} onClose={togglePopup} title="Join Organization as:" icon={<GoOrganization size={20} />}>
          <>
            <FormSelectField
              options={options}
              onChange={(e) => onRoleChange(e)}
              value={roleType}
            />
            <Button
              onClick={joinHandler}
              type="button"
              buttonStyle="btn--primary--solid"
              buttonSize="btn--medium"
              title="Join"
              loading={loading}
            />
          </>
      </Popup>
    </div>
  );
};
export default ConnectButton;
ConnectButton.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  apis: PropTypes.func.isRequired,
  changeFetchedData: PropTypes.func.isRequired,
};
