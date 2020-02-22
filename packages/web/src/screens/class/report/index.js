import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button } from '@blueprintjs/core';
import captureCanvas from './captureCanvas';
import DrawChart from './drawChart';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reportData: null, error: null };
  }

  async componentWillMount() {
    console.log('APIS IN REPORT', this.props);
    const { boardId, apis } = this.props;
    const reportData = await apis.getBoardActivity({ boardId });
    console.log('RESPONSE', reportData);
    if (reportData) {
      this.setState({ reportData });
    } else {
      this.setState({ error: 'Faild to fetch report data.'});
    }
  }

  generatePdfHandler = () => {
    const cvs = document.getElementById('report-chart');
    captureCanvas({ ...this.props, canvas: cvs });
  }

  render() {
    const { isOpen, onClose, boardId, boards, boardMembers } = this.props;
    const { reportData } = this.state;
    const boardName = boards.byId[boardId].name;
    const userList = Object.values(boardMembers.byId).filter(bm => bm.boardId === boardId);
    return (
      <Dialog isOpen={isOpen} title={boardName} onClose={onClose} style={{ width: 800, height: 'auto' }}>
        <div style={{ width: 800, height: 'auto' }}>
          {reportData && <DrawChart {...this.props} data={reportData} userList={userList} /> }
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: 10 }}>
            <Button text="Generate PDF" intent="success" onClick={this.generatePdfHandler} />
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
