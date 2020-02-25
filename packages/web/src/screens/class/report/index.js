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
      this.setState({ error: "Faild to fetch report data."});
    }
  }

  generatePdfHandler = (boardDetail, tableData) => {
    const cvs = document.getElementById('report-chart');
    captureCanvas({ ...this.props, canvas: cvs, boardDetail, tableData });
  }

  render() {
    const { isOpen, onClose, boardId, boards, users, boardMembers } = this.props;
    const { boardActivities, boardCommunicationActivities } = this.state;
    const boardName = boards.byId[boardId].name;
    const boardMemberList = Object.values(boardMembers.byId).filter(bm => bm.boardId === boardId);
    const userList = boardMemberList.map(bm => Object.values(users.byId).find(u => u.id === bm.tuserId));
    const tableData = boardActivities ? userList.map(u => findTableData(u, boardActivities, boardCommunicationActivities)) : [];
    return (
      <Dialog
        onOpened={this.fetchReport}
        isOpen={isOpen}
        title={boardName}
        icon="chart"
        onClose={onClose}
        className="pc-report-overlay"
      >
        {
          boardActivities ? (
            <div className="pc-report-content">
              <DrawChart boardId={boardId} {...this.props} boardActivities={boardActivities} boardCommunicationActivities={boardCommunicationActivities} userList={boardMemberList} />
              <div className="pc-report-table-con">
                <div className="table-title">
                  <h3>Tabulated Data</h3>
                </div>
                <Table
                  headers={{
                    userName: 'Users',
                    noOfCreateCard: 'No of cards created',
                    noOfMoveCard: 'No of card moves',
                    noOfComment: 'No of comments',
                    noOfHours: 'Call time(hr)',
                    noOfMessage: 'Total messages sent',
                  }}
                  data={tableData}
                />
              </div>
              <div className="pc-pdf-gen-btn-con">
                <Button text="Generate PDF" intent="success" onClick={() => this.generatePdfHandler(boards.byId[boardId], tableData)} />
              </div>
            </div>
          ) : <Spinner intent="success" />
        }
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
