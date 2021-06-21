import React from 'react';
import { connect } from 'react-redux';
import NotFound from '../../../../common/NotFound';
import updateCourse from '../../../../actions/courseAction';
import * as actions from '../../../../actions';
import { PopoverForm } from '../../../../components';
import ClassroomListItem from '../../../class/ClassComponents/ClassroomListItem';
import ContentHeader from '../../components/ContentHeader';
import ContentWrapper from '../../components/ContentWrapper';
import CreateSchema from './structure';
import { DeletePopOver, Spinner } from '../../../../common';
import { timeStampSorting } from '../../../../common/utility-functions';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, editId: null, deleteProject: null, loading: true };
  }

  async componentDidMount() {
    const { apis, updateCourse, courseId } = this.props;
    const res = await apis.getCourseDetails({ courseId: parseInt(courseId, 10) });
    this.setState({ loading: false });
    const { status, id } = res.course;
    updateCourse({ courseId: id, status });
  }

  togglePopover = () => this.setState({ isOpen: !this.state.isOpen, editId: null });

  saveProject = async (data) => {
    const { apis, course, account, addDatabaseSchema, updateDatabaseSchema } = this.props;
    const { editId } = this.state;
    try {
      if (editId) {
        await apis.updateBoard([{ ...data }, { id: editId }]);
        updateDatabaseSchema('Board', { id: editId, ...data });
      } else {
        const obj = { ...data, cId: course.courseId, userId: account.user.id, timeStamp: Date.now() };
        const res = await apis.addBoard(obj);
        if (res) {
          addDatabaseSchema('Board', { ...obj, id: res.boardId, appointments: [], user: { user: account.user } });
          addDatabaseSchema('BoardMember', { id: res.boardMemberId, boardId: res.boardId, tuserId: account.user.id, fuserId: account.user.id, joinStatus: 1, timeStamp: Date.now(), userType: 'creator' });
        }
      }
      this.togglePopover();
    } catch (e) {
      alert('Something went wrong here');
    }
  }

  onMore = (type, id) => {
    const { Board } = this.props;
    if (type === 'edit') {
      this.setState({ isOpen: true, editId: id });
    }
    if (type === 'delete') {
      this.setState({ deleteProject: Board.byId[id] });
    }
  }

  deleteCourseProject = async (type) => {
    if (type === 'confirm') {
      const { deleteProject } = this.state;
      const { deleteDatabaseSchema, apis } = this.props;
      try {
        await apis.deleteBoard({ id: deleteProject.id });
        deleteDatabaseSchema('Board', { id: deleteProject.id });
      } catch (e) {
        alert('Unknown Error');
      }
    }
    this.setState({ deleteProject: null });
  }

  render() {
    const { isOpen, loading, editId, deleteProject } = this.state;
    if (loading) return <Spinner />;
    const { Board, course, account } = this.props;
    const editProject = editId && Board.byId[editId];
    const schema = CreateSchema(editProject);
    const courseBoards = Object.values(Board.byId).filter((o) => o.cId === course.courseId && !o.ceId).sort(timeStampSorting);
    return (
      <>
        <ContentHeader buttonClickAction={this.togglePopover} title="Projects" buttonTitle="Add New" showButton />
        <ContentWrapper>
          <div className="syllabus-editor"><p>Manage project for the course</p></div>
          <div className="project-list">
            {courseBoards.length < 1 && <NotFound message="There aren't any projects" />}
            <ol>
              {
                courseBoards.map((o) => {
                  return <ClassroomListItem key={`pro-${o.id}`} onMore={this.onMore} obj={o} account={account} />
                })
              }
            </ol>
          </div>
        </ContentWrapper>
        <PopoverForm
          isOpen={isOpen}
          callback={this.saveProject}
          structure={schema}
          onClose={this.togglePopover}
        />
        <DeletePopOver
          isOpen={!!deleteProject}
          action={this.deleteCourseProject}
          name={deleteProject && deleteProject.name}
        />
      </>
    );
  }
}

const mapStateToProps = ({ course, database, account }) => ({ course, account, Board: database.Board });
export default connect(mapStateToProps, { updateCourse, ...actions })(Project);
