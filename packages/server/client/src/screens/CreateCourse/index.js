import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Navbar } from '../home/component';
import Footer from '../../common/footer';
import Sidebar from './Sidebar';
import Content from './Content';

const CreateCourse = ({ match, history }) => {
    const [pathObj, setPathObj] = useState({ path: '', courseId: null, userId: null });

    useEffect(() => {
        setPathObj({ path: match.path, userId: match.params.userId, courseId: match.params.courseId });
    }, []);

    const changePath = (args) => {
        const editUrl = `${args.path}/about`;
        history.replace(editUrl, { isActive: true });
        setPathObj({ ...pathObj, path: args.path, courseId: args.courseId });
    }

    return (
        <>
            <Navbar />
            <div className="pc-course-create">
                <div className="pc-course-manager">
                    <Sidebar userId={pathObj.userId} courseId={pathObj.courseId} />
                    <div className="pcc-content">
                        <Content changePath={changePath} pathObj={{ path: match.path, userId: match.params.userId, courseId: match.params.courseId }} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CreateCourse;
