import React, { useState } from 'react';
import { connect } from 'react-redux';
import updateCourse from '../../../actions/courseAction';
import SidebarMenus from './SidebarMenus';
import { Button } from '../../../common/utility-functions/Button/Button';

const Sidebar = (props) => {
  const [loading, setLoading] = useState(false);
  const { course, userId, updateCourse, apis } = props;

  const submitAction = async () => {
    const data = {
      status: !course.status || course.status === 'publish' ? 'review' : null,
    };
    setLoading(true);
    const res = await apis.apis.updateCourse([data, { id: course.courseId }]);
    // const res = await apis.apis.updateCourse([{ status: 'publish' }, { id: course.courseId }]);
    if (res) {
      updateCourse(data);
      setLoading(false);
    }
  };

  return (
    <div className="pcc-nav">
      <div className="pcc-sidebar">
        <div className="nav-collapse">
          <SidebarMenus course={course} userId={userId} />
        </div>
        <div className="course-publish-btn">
          <Button
            disabled={!course.courseId || !apis}
            loading={loading}
            onClick={submitAction}
            type="button"
            buttonStyle={course.status === "review" ? "btn--danger--solid" : "btn--primary--solid"}
            buttonSize="btn--medium"
            title={course.status === "review" ? "Cancel Review" : "Submit for Review"}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ course }) => ({ course });
export default connect(mapStateToProps, { updateCourse })(Sidebar);
