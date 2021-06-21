import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MoreButton } from '../../../components';
import { sortAppointmentAsc } from '../../../common/utility-functions/sortAppointments';
import { getName } from '../../../common/utility-functions';
import AppointmentDetail from '../appointment/AppointmentDetail';
import { Button } from '../../../common/utility-functions/Button/Button';

export default ({ account, obj, type, onMore }) => {
  const { appointments = [] } = obj;
  const recent = type && type === 'recent';
  const appointment = appointments.filter((o) => o.startDate > Date.now()).sort(sortAppointmentAsc)[0];

  return (
    <li className="pc-class-card">
      {onMore && <MoreButton onMore={onMore} id={obj.id} />}
      <Link to={`/classroom/${account.user.slug}/${obj.id}`} className="content-link">
        <div className={`pc-card-content ${recent && 'pc-latest-activity'}`}>
          <div className="pc-latest-left">
            <div className="pc-card-header">
              <span>
                <img src="/assets/graphics/classroom.svg" alt="classroom logo" />
                <h3 className="pc-class-subhead">ClassRoom</h3>
              </span>
              <h4 className="pc-class-title">{obj.name}</h4>
            </div>
            <div className="pc-card-summary">
              <div className="summary-container">
                <span className="pc-author">{getName(obj.user.user)}</span>
                <span className="pc-date">{new Date(obj.timeStamp).toDateString()}</span>
              </div>
              {appointment && <AppointmentDetail appointment={appointment} />}
            </div>
          </div>
          <div className="pc-latest-right">
            <div className="pc-card-action">
              <Button
                type="button"
                buttonStyle={`btn--primary--${recent ? 'solid' : 'outline'}`}
                buttonSize="btn--medium"
                title="Continue"
                iconPosition="right"
                icon={<AiOutlineArrowRight />}
              />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
