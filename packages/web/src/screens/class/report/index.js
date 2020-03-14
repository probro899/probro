import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Dialog, Button, Spinner } from '@blueprintjs/core';
import captureCanvas from './captureCanvas';
import DrawChart from './drawChart';
import Table from '../../../common/Table';
import findTableData from './helper-functions/findTableData';
import { ENDPOINT } from '../../../config';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boardActivities: null, pdfUrl: null, loading: false, boardCommunicationActivities: null, error: null };
  }

  fetchReport = async () => {
    const { boardId, apis } = this.props;
    const reportData = await apis.getBoardActivity({ boardId });
    if (reportData) {
      this.setState({ boardActivities: reportData.boardActivities, boardCommunicationActivities: reportData.boardCommunicationActivities });
    } else {
      this.setState({ error: 'Faild to fetch report data.'});
    }
  }

  generatePdfHandler = async (boardDetail, tableData) => {
    const { account } = this.props;
    this.setState({ loading: true });
    const cvs = document.getElementById('report-chart');
    const response = await captureCanvas({ ...this.props, canvas: cvs, boardDetail, tableData });
    response.images.map(async (obj) => {
      try {
        await axios.post(`${ENDPOINT}/web/delete-file`, { token: account.sessionId, content: 'report', fileName: obj });
      } catch (e) {
        console.log('Internal Error', e);
      }
    });
    this.setState({
      loading: false,
      pdfUrl: `${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/report/${response.pdf}`,
    });
  }

  render() {
    const { isOpen, onClose, boardId, boards, users, boardMembers } = this.props;
    const { boardActivities, error, boardCommunicationActivities, loading, pdfUrl } = this.state;
    const boardName = boards.byId[boardId].name;
    const boardMemberList = Object.values(boardMembers.byId).filter(bm => bm.boardId === boardId);
    const userList = boardMemberList.map(bm => Object.values(users.byId).find(u => u.id === bm.tuserId));
    const tableData = boardActivities ? userList.map(u => findTableData(u, boardActivities, boardCommunicationActivities)) : [];
    return (
      <Dialog
        onOpening={this.fetchReport}
        isOpen={isOpen}
        title={boardName}
        icon="chart"
        onClose={onClose}
        className="pc-report-overlay"
      >
        {
          boardActivities && !error ? (
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
                {pdfUrl && (
                  <div className="pdf-link">
                    <a href={pdfUrl} rel="noopener noreferrer" target="_blank">Download Pdf</a>
                  </div>
                )}
                <Button
                  loading={loading}
                  text="Generate PDF"
                  intent="success"
                  onClick={() => this.generatePdfHandler(boards.byId[boardId], tableData)}
                />
              </div>
            </div>
          ) : <Spinner intent="success" />
        }
      </Dialog>
    );
  }
}
export default Report;

Report.defaultProps = {
  isOpen: null,
};

Report.propTypes = {
  isOpen: PropTypes.string,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func.isRequired,
  boards: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  boardMembers: PropTypes.objectOf(PropTypes.any).isRequired,
};
