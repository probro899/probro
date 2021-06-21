import React, { useState } from 'react';
import axios from 'axios';
import emailValidator from '../../../common/Form/utility-functions/emailValidator';
import store from '../../../store';
import updateNav from '../../../actions/navigate';
import { ENDPOINT } from '../../../config';

const showMessage = (intent, message) => {
  store.dispatch(updateNav({ schema: 'popNotification', data: { active: true, message, intent } }));
}

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const submitAction = async (e) => {
    e.preventDefault();
    if (!emailValidator(email)) {
      showMessage('error', 'Please, enter a valid email address');
      return;
    }
    try {
      const res = await axios.post(`${ENDPOINT}/web/add-call-for-action`, { email });
      if (res) {
        showMessage('success', 'We received your email, we will get back to you soon. Thank you.')
      } else {
        showMessage('error', 'Some error occured. Please try again.');
      }
    } catch (e) {
      showMessage('error', 'Some error occured. Please try again.');
    }
    setEmail('');
  }

  return (
    <div className="pc-cta">
      <div className="cta-wrapper pc-container">
        <h2 className="cta-title">
          Are you a College Leader? Do you wish your students gain more industry level knowledge while they're in college?
        </h2>
        <div className="search-form">
          <form>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button type="button" onClick={submitAction}>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CallToAction;
