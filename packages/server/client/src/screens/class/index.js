import React from 'react';
import { DndProvider } from 'react-dnd';
import { Redirect } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import client from '../../socket';
import * as actions from '../../actions';
import ClassManager from './ClassManager';
import { Navbar } from '../home/component';
import { ToolBar } from './ClassComponents';
import { Spinner } from '../../common';
import Itemtype from './ClassComponents/dndComponents/types';
import CustomDragLayer from './ClassComponents/dndComponents/CustomDragLayer';

class Index extends React.Component {
  state = { loading: true, apis: {}, draggingContent: null };

  componentDidMount() {
    client.scope('Mentee').then((result) => {
      this.setState({ apis: result, loading: false });
    });
  }

  setDraggingContent = (event, item) => {
    if (event === 'end') { this.setState({ draggingContent: null }); return; }
    this.setState({
      draggingContent: document.getElementById(item.type === Itemtype.TASK ? `id_task_${item.id}` : `id_column_${item.id}`),
    });
  }

  render() {
    const { match, account } = this.props;
    const { apis, draggingContent, loading } = this.state;
    if (!account.sessionId) return <Redirect to="/" />;
    if (!account.user) return <Spinner />;
    if (account.user.slug !== match.params.userSlug) return <Redirect to="/" />;
    if (loading) return <Spinner />;
    return (
      <div style={{ position: 'relative' }}>
        <Navbar className="pcm-nav" />
        <ToolBar boardId={Number(match.params.classId, 10)} apis={apis} />
        <DndProvider backend={HTML5Backend}>
          <CustomDragLayer draggingContent={draggingContent} />
          <ClassManager setDraggingContent={this.setDraggingContent} apis={apis} userSlug={match.params.userSlug} classId={Number(match.params.classId, 10)} />
        </DndProvider>
      </div>
    );
  }
}

Index.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { account } = state;
  return { account };
};
export default connect(mapStateToProps, { ...actions })(Index);
