import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiStar } from 'react-icons/fi';

const Template = ({ user, obj }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div className="template-icon"><FiStar size={30} /></div>
      <Link to={`/class-template/${user.slug}/${obj.id}`} className="content-link">
        <div className="class-repr">
          <span>
            {obj.name}
          </span>
        </div>
        <div className="class-detail">
          <span className="name">
            Proper Class
          </span>
          <span className="date">{new Date().toDateString()}</span>
        </div>
      </Link>
    </div>
  );
};

Template.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  obj: PropTypes.objectOf(PropTypes.any).isRequired,
};


class ClassTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTemplates = () => {
    const { data } = this.props;
    const templates = data.classes.map((obj) => {
      const user = data.users[obj.userId];
      return <Template key={`template-${obj.id}`} user={user} obj={obj} />;
    });
    return templates;
  }

  render() {
    return (
      <div className="pc-class-template-container">
        <div className="header">
          <span className="title">Templates </span>
          <small>Start with a template</small>
        </div>
        <div className="content-list">
          {this.getTemplates()}
        </div>
      </div>
    );
  }
}

ClassTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ClassTemplate;
