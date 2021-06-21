import React, { useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import ContentWrapper from '../../components/ContentWrapper';
import AboutForm from './AboutForm';
import Alert from '../../../../common/Alert';

const AboutCourse = (props) => {
  const [alert, setAlert] = useState({ showAlert: false, message: '', status: 'danger' });
  return (
    <>
      <ContentHeader title="About Course" />
      <ContentWrapper>
        <Alert isOpen={alert.showAlert} onClose={() => setAlert({ showAlert: false, message: '' })} status={alert.status} title={alert.message} />
        <AboutForm {...props} setAlert={setAlert} />
      </ContentWrapper>
    </>
  );
};

export default AboutCourse;
