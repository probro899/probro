import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getName from '../../../../common/utility-functions/getName';

const ProjectOutput = ({ lecture, account, project }) => {
  const cls = project.projectDetails;
  return (
    <div className="lecture-viewer-content">
      <h2 className="header-title">Time to practice!</h2>
      <div className="project-details">
        <div className="link-to-class">
          <Link to={`/classroom/${account.user.slug}/${cls.id}`}>
            <div className="project-class-card">
              <div className="card-header">
                <span>
                  <img src="/assets/graphics/classroom.svg" alt="classroom logo" />
                  <h3 className="pc-class-subhead">ClassRoom</h3>
                </span>
                <h4 className="pc-class-title">{cls.name}</h4>
              </div>
              <div className="pc-card-summary">
                <div className="summary-container">
                  <span className="pc-author">{getName(cls.user.user)}</span>
                  <span className="pc-date">{new Date(cls.timeStamp).toDateString()}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="project-description">
          <h3 className="project-title">Description</h3>
          <div className="contents">
            <div dangerouslySetInnerHTML={{ __html: lecture.description }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapsStateToProps = ({ account, database }) => ({ account, Board: database.Board });
export default connect(mapsStateToProps)(ProjectOutput);
