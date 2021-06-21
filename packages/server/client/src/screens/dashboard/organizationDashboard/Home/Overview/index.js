import React from 'react';
import PropTypes from 'prop-types';
import OverViewCard from './OverViewCard';
import { AiOutlineProject } from "react-icons/ai";
import { VscVmActive } from 'react-icons/vsc';
import { CgCalendarDue } from 'react-icons/cg';

const OverView = (props) => {
  const { orgObj } = props;
  const { subscribedPackage, classes } = orgObj;
  let totalActiveClass = 0;
  let totalClass = 0;
  let remaningClass = 0;
  if (subscribedPackage) {
    const { packageDetail } = subscribedPackage;
    totalActiveClass = classes.filter(c => c.refCode).length;
    totalClass = packageDetail.noOfClass;
    remaningClass = totalClass - totalActiveClass;
  }

  return (
    <div className="pc-org-overview">
      <h3 className="pc-overview-title">Overview</h3>
      <div className="pc-overview-cards">
        <OverViewCard title="Total classes" number={totalClass} icon={<AiOutlineProject size={24} />} className="dark-blue" />
        <OverViewCard title="Active classes" number={totalActiveClass} icon={<VscVmActive size={24} />} className="green" />
        <OverViewCard title="Remaining classes" number={remaningClass} icon={<CgCalendarDue size={24} />} className="red" />
      </div>
    </div>
  );
};

export default OverView;
OverView.propTypes = {
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
};
