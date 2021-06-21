import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button } from '../../../../../common/utility-functions/Button/Button';

const ProjectList = ({ projects, deleteProject, account }) => {
  if (projects.length < 1) return null;
  const project = projects[0];
  return (
    <div className="link-to-class">
      <div className="project-class-card syllabus-project-list">
        <div className="left-part">
          <div className="card-header">
            <span>
              <img src="/assets/graphics/classroom.svg" alt="classroom logo" />
              <h3 className="pc-class-subhead">ClassRoom</h3>
            </span>
            <Link to={`/classroom/${account.user.slug}/${project.id}`}>
              <h4 className="pc-class-title">{project.name}</h4>
            </Link>
          </div>
        </div>
        <div className="right-part">
          <div className="button-group">
            <div className="delete-btn">
              <Button type="button" onClick={() => deleteProject(project.id)} buttonStyle="btn--danger--outline" buttonSize="btn--small" icon={<AiOutlineDelete size={20} />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapsStateToProps = ({ account }) => ({ account });
export default connect(mapsStateToProps)(ProjectList);
