import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';


class ClassTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="pc-class-template-container">
        <div className="header">
          <span className="title">Templates </span>
          <small>Start with a template</small>
        </div>
        <div className="content-list">
          <div style={{ position: 'relative' }}>
            <div className="template-icon"><FiStar size={30} /></div>
            <Link to="/" className="content-link">
              <div className="class-repr">
                <span>
                  Software Development
                </span>
              </div>
              <div className="class-detail">
                <span className="name">
                  Properclass
                </span>
                <span className="date">{new Date().toDateString()}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassTemplate;
