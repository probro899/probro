import React from 'react';
import PropTypes from 'prop-types';
import ResultUser from './components/ResultUser';


class ResultList extends React.Component {
  state = {};

  render() {
    const { data, apis, addDatabaseSchema, account, database } = this.props;
    return (
      <div className="result-list">
        <p className="label result-list-label">
          Showing {' '} {data.length}{' '}results
        </p>
        {
          data.map((obj, index) => {
            return <ResultUser apis={apis} addDatabaseSchema={addDatabaseSchema} account={account} key={index} item={obj} databasae={database} {...this.props}/>;
          })
        }
      </div>
    );
  }
}

ResultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ResultList;
