import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

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
    const { search } = this.state;
    if (search.replace(/\s/g, '').length !== 0) {
      this.setState({
        gotKey: true,
      });
    }
  }

  findMentor = () => {
    this.setState({
      search: 'no-key',
      gotKey: true,
    });
  }

  render() {
    const { search, gotKey } = this.state;
    const { account } = this.props;
    return (
      <div className="search-box-container">
        {gotKey && <Redirect push to={`/search/key=${search}`} />}
        <div className="search-form">
          <input
            value={search}
            onChange={this.searchChange}
            placeholder="Keyword ..."
          />
          <button type="submit" onClick={this.submitSearch}>
            Search
          </button>
        </div>
        <div className="pc-jumbo">
          <span className="pc-jumbo-text">
            Start Connecting
          </span>
          {
            account.user ? (
              <button type="button" onClick={this.findMentor}>
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
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(SearchElement);
