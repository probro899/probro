import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../../actions';

class SearchElement extends React.Component {
  state={
    search: '',
    gotKey: false,
  };

  searchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  submitSearch = (e) => {
    e.preventDefault();
    const { updateNav } = this.props;
    const { search } = this.state;
    updateNav({ schema: 'search', data: { key: search } });
    this.setState({
      gotKey: true,
    });
  }

  render() {
    const { search, gotKey } = this.state;
    const { account } = this.props;
    return (
      <div className="search-box-container">
        {gotKey && <Redirect push to="/search" />}
        <div className="search-form">
          <form>
            <input
              value={search}
              onChange={this.searchChange}
              placeholder="Keyword ..."
            />
            <button type="submit" onClick={this.submitSearch}>
              Search
            </button>
          </form>
        </div>
        <div className="pc-jumbo">
          <span className="pc-jumbo-text">
            Start Connecting
          </span>
          {
            account.user ? (
              <button type="button" onClick={this.submitSearch}>
                Find Mentor
              </button>
            ) : (
              <Link to="/login">
                <button type="button">
                  Login
                </button>
              </Link>
            )
          }
        </div>
      </div>
    );
  }
}

SearchElement.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(SearchElement);
