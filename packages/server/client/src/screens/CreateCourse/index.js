import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import client from '../../socket';
import { resetCourse } from '../../actions/courseAction';
import { Spinner } from '../../common';
import { Navbar } from '../home/component';
import Footer from '../../common/footer';
import Sidebar from './Sidebar';
import Content from './Content';

const CreateCourse = ({ match, history, resetCourse, account }) => {
  const [pathObj, setPathObj] = useState({ path: '', courseId: null, userId: null });
  const [apis, setApis] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await client.scope('Mentor');
      setApis({ apis: res });
    })();
    setPathObj({ path: match.path, userId: match.params.userId, courseId: match.params.courseId });
    return () => resetCourse({});
  }, []);

  const changePath = (args) => {
    const editUrl = `${args.path}/about`;
    history.replace(editUrl, { isActive: true });
    setPathObj({ ...pathObj, path: args.path, courseId: args.courseId });
  };

  if (!account.sessionId) return <Redirect to="/login" />;
  if (!account.user) return <Spinner />;
  return (
    <>
      <Navbar />
      <div className="pc-course-create">
        <div className="pc-course-manager">
          <Sidebar apis={apis} userId={pathObj.userId} courseId={pathObj.courseId} />
          <div className="pcc-content">
            <Content apis={apis} changePath={changePath} pathObj={{ path: match.path, userId: match.params.userId, courseId: match.params.courseId }} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = ({ account }) => ({ account });
export default connect(mapStateToProps, { resetCourse })(CreateCourse);
