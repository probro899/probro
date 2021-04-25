import React from 'react';

export default class Course extends React.Component {
  addCourse = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.addCourse({
      createdBy: uId,
      title: 'Course Title',
      subTitle: 'Course SunTitle',
      description: 'Course Description',
      skill: 'Course Skill',
      duration: 1000,
      status: 'REVIEW',
      level: 'Course level',
      domain: 'Course Domain',
      subDomain: 'Course Domain',
      logo: 'Logo Url',
      remarks: 'This some remarks about courses',
    });
    console.log('addCourses apis res', res);
  }

  updateCourse = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const res = await apis.updateCourse([{
      title: 'Courses title updated',
    }, { id: 1 }]);
    console.log('course update res', res);
  }

  deleteCourse = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const res = await apis.deleteCourse({
      id: 1,
    });
    console.log('course update res', res);
  }

  addCourseSection = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.addCourseSection({
      courseId: 8,
      title: 'Section title',
      objective: 'Section objective',
      duration: 1000,
      remarks: 'this is section remarks',
    });
    console.log('add course section res', res);
  }

  updateCourseSection = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const res = await apis.updateCourseSection([
      { title: 'Section title updated' }, { id: 1 },
    ]);
    console.log('section updated done', res);
  }

  deleteCourseSection = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.deleteCourseSection({
      id: 1,
    });
    console.log('add course section res', res);
  }

  addSectionLecture = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.addSectionLecture({
      sectionId: 1,
      title: 'Lecture title',
      description: 'Lecture description',
      duration: 10000,
      remarks: 'remarks in lecture',
    });
    console.log('Add section lecture', res);
  }

  updateSectionLecture =  async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const res = await apis.updateSectionLecture([
      { title: 'Lecture title udated' },
      { id: 1 }
    ]);
    console.log('updateSectionLecture res', res);
  }

  deleteSectionLecture = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.deleteSectionLecture({
      id: 1,
    });
    console.log('Add section lecture', res);
  }

  addResource = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const res = await apis.addResource({
      lecId: 1,
      type: 'Image',
      name: 'image-14149812789.jpg',
      url: '/user/somthing',
    });
    console.log('addResource remarks', res);
  }

  updateResource = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const res = await apis.updateResource([{
      type: 'Image',
      name: 'image-14149812789.jpg updated',
      url: '/user/somthing',
    }, { id: 1 }]);
    console.log('addResource remarks', res);
  }

  deleteResource = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const res = await apis.deleteResource({
      id: 1,
    });
    console.log('addResource remarks', res);
  }

  addCourseEnroll = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.addCourseEnroll({
      userId: uId,
      courseId: 1,
      status: 'status1',
    });
    console.log('add course enroll', res);
  }

  updateCourseEnroll = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.updateCourseEnroll([{
      userId: uId,
      courseId: 1,
      status: 'status1 upated',
    }, { id: 1 }]);
    console.log('add course enroll', res);
  }

  deleteCourseEnroll = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.deleteCourseEnroll({
      id: 1,
    });
    console.log('add course enroll', res);
  }

  addCoursePrice = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.addCoursePrice({
      courseId: 1,
      price: 1200,
      discount: 100,
      currency: 'NRS',
    });
    console.log('addCoursePrice res', res);
  }

  updateCoursePrice = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.updateCoursePrice([{
      courseId: 1,
      price: 1200,
      discount: 100,
      currency: 'NRS updated',
    }, { id: 1 }]);
    console.log('addCoursePrice res', res);
  }

  deleteCoursePrice = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.deleteCoursePrice({
      id: 1,
    });
    console.log('addCoursePrice res', res);
  }

  addStarRating = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.addStarRating({
      courseId: 1,
      mentorId: 2,
      noOfStar: 4,
      review: 'this star review text',
      userId: 1,
      type: 'star type',
      remarks: 'this is star remarks',
    });
    console.log('Add star rating res', res);
  }

  updateStarRating = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.updateStarRating([{
      courseId: 1,
      mentorId: 2,
      noOfStar: 4,
      review: 'this star review text updated',
      userId: 1,
      type: 'star type',
      remarks: 'this is star remarks',
    }, { id: 1 }]);
    console.log('Add star rating res', res);
  }

  deleteStarRating = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.deleteStarRating({
      id: 1,
    });
    console.log('Add star rating res', res);
  }

  render() {
    console.log('Props in Courese api test', this.props);
    return (
      <div>
        <h4>Course Api test</h4>
        <button onClick={this.addCourse}>addCourse</button>
        <button onClick={this.updateCourse}>updateCourse</button>
        <button onClick={this.deleteCourse}>deleteCourse</button>
        <div>
          <h4>Section Api test</h4>
          <button onClick={this.addCourseSection}>addCourseSection</button>
          <button onClick={this.updateCourseSection}> updateCourseSection</button>
          <button onClick={this.deleteCourseSection}> deleteCourseSection</button>
        </div>
        <div>
          <h4>Lecture Api test</h4>
          <button onClick={this.addSectionLecture}>addSectionLecture</button>
          <button onClick={this.updateSectionLecture}>updateSectionLecture</button>
          <button onClick={this.deleteSectionLecture}> deleteSectionLecture</button>
        </div>
        <div>
          <h4>Resource Api test</h4>
          <button onClick={this.addResource}>addResource</button>
          <button onClick={this.updateResource}>updateResource</button>
          <button onClick={this.deleteResource}> deleteResource</button>
        </div>
        <div>
          <h4>CourseEnroll Api test</h4>
          <button onClick={this.addCourseEnroll}>addCourseEnroll</button>
          <button onClick={this.updateCourseEnroll}>updateCourseEnroll</button>
          <button onClick={this.deleteCourseEnroll}> deleteCourseEnroll</button>
        </div>
        <div>
          <h4>CoursePrice Api test</h4>
          <button onClick={this.addCoursePrice}>addCoursePrice</button>
          <button onClick={this.updateCoursePrice}>updateCoursePrice</button>
          <button onClick={this.deleteCoursePrice}> deleteCoursePrice</button>
        </div>
        <div>
          <h4>Star Rating Api test</h4>
          <button onClick={this.addStarRating}>addStarRating</button>
          <button onClick={this.updateStarRating}>updateStarRating</button>
          <button onClick={this.deleteStarRating}> deleteStarRating</button>
        </div>
      </div>
    );
  }
}
