import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_COURSE } from '../../../queries';
import * as actions from '../../../actions';
import { Navbar } from '../../home/component';
import Footer from '../../../common/footer';
import Banner from './Banner';
import CourseCard from '../../dashboard/course/CourseCard';
import SectionHeader from '../../dashboard/course/SectionHeader';
import { Button } from '../../../common/utility-functions/Button/Button';

const CourseListView = (props) => {
    useEffect(() => {
        const { updateNav } = props;
        updateNav({ schema: 'mainNav', data: { name: 'courses' } });
    }, [])

    const { data, loading } = useQuery(GET_COURSE, { type: "all" });
    return (
        <>
            <Navbar />
            <div className="course-list-view pc-container">
                <Banner />
                <SectionHeader title="Top Courses" />
                <div className="courses-container">
                    {!loading && data.getCourse.map((course) => <CourseCard publicListing key={course.id} course={course} />)}
                </div>
                <div className="load-more-btn">
                    <Button
                        type="button"
                        buttonStyle="btn--primary--outline"
                        buttonSize="btn--small"
                        title="Load More"
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(CourseListView);
