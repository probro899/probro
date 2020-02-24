import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button, Spinner } from '@blueprintjs/core';
import captureCanvas from './captureCanvas';
import DrawChart from './drawChart';
import Table from '../../../common/Table';
import findTableData from './helper-functions/findTableData';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boardActivities: null, boardCommunicationActivities: null, error: null };
  }

  fetchReport = async () => {
    const { boardId, apis } = this.props;
    const reportData = await apis.getBoardActivity({ boardId });
    // console.log('RESPONSE', reportData);
    if (reportData) {
      this.setState({ boardActivities: reportData.boardActivities, boardCommunicationActivities: reportData.boardCommunicationActivities });
    } else {
      this.setState({ error: 'Faild to fetch report data.'});
    }
  }

  generatePdfHandler = (boardDetail, tableData) => {
    const cvs = document.getElementById('report-chart');
    captureCanvas({ ...this.props, canvas: cvs, boardDetail, tableData });
  }

  render() {
    const { isOpen, onClose, boardId, boards, users, boardMembers, database } = this.props;
    console.log('props in Report', this.props, this.state);
    const { boardActivities, boardCommunicationActivities } = this.state;
    const boardName = boards.byId[boardId].name;
    const boardMemberList = Object.values(boardMembers.byId).filter(bm => bm.boardId === boardId);
    const userList = boardMemberList.map(bm => Object.values(users.byId).find(u => u.id === bm.tuserId));
    console.log('useList', userList);
    const tableData = boardActivities ? userList.map(u => findTableData(u, boardActivities, boardCommunicationActivities)) : [];
    return (
      <Dialog onOpened={this.fetchReport} isOpen={isOpen} title={boardName} onClose={onClose} style={{ width: 850, height: 'auto' }}>
        <div style={{ width: 850, height: 'auto' }}>
          {boardActivities ? <DrawChart boardId={boardId} {...this.props} boardActivities={boardActivities} boardCommunicationActivities={boardCommunicationActivities} userList={boardMemberList} /> : <Spinner intent="success" /> }
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Table
              headers={{
                userName: 'Name',
                noOfCreateCard: 'No Of Create Cards',
                noOfMoveCard: 'No Of Move Cards',
                noOfComment: 'No Of Comments',
                noOfHours: 'Calling Hours',
                noOfMessage: 'No Of Messages',
              }}
              data={tableData}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: 10 }}>
            <Button text="Generate PDF" intent="success" onClick={() => this.generatePdfHandler(boards.byId[boardId], tableData)} />
          </div>
        </div>
      </Dialog>
    );
  }
}
export default Report;
Report.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
  boards: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
};
