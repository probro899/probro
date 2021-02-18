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
import ErrorBoundry from '../../common/ErrorBoundary';
import { osFinder } from './helper-functions';


class Index extends React.Component {
  state = { loading: true, apis: null, draggingContent: null };

  async componentDidMount() {
    const { match, updateWebRtc, webRtc } = this.props;
    try {
      const hasToInitialFetch = webRtc.fetchedApisRes.find(r => r.api === 'getBoard' && r.status === 200 && parseInt(r.boardId, 10) === parseInt(match.params.classId, 10));
      const apis = await client.scope('Mentee');
      if (!hasToInitialFetch) {
        const getBoardRes = await apis.getBoard(match.params.classId);
        updateWebRtc('fetchedApisRes', [...webRtc.fetchedApisRes, getBoardRes]);
      }
      this.setState({ apis, loading: false });
    } catch (e) {
      console.error('get Class error', e);
    }
  }

  setDraggingContent = (event, item) => {
    if (osFinder(window) === 'Mobile') { return; } // prevent for mobile platforms
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
    if (loading || !apis) return <Spinner />;
    return (
      <ErrorBoundry>
        <DndProvider backend={HTML5Backend}>
          <div style={{ position: 'relative' }}>
            <Navbar className="pcm-nav" />
            <ToolBar boardId={Number(match.params.classId, 10)} apis={apis} />
            <CustomDragLayer draggingContent={draggingContent} />
            <ClassManager setDraggingContent={this.setDraggingContent} apis={apis} userSlug={match.params.userSlug} classId={Number(match.params.classId, 10)} />
          </div>
        </DndProvider>
      </ErrorBoundry>
    );
  }
}

Index.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { account, webRtc } = state;
  return { account, webRtc };
};

export default connect(mapStateToProps, { ...actions })(Index);
