import React from 'react';
import { Redirect } from 'react-router-dom';
// import Typical from '../../../../components/textAnimation/react-typical';


const steps = [
  'mentors.', 1500,
  'mentees.', 1000,
];

class SearchElement extends React.Component {
  state = {
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
    this.setState({
      gotKey: true,
    });
  }

  render() {
    const { search, gotKey } = this.state;

    return (
      <div className="search-box-container">
        {gotKey && <Redirect push to={`/search?searchKey=${search}`} />}

        <div className="pc-jumbo">
          <h1 className="pc-jumbo-text">
            Join our growing community and connect to
             {/* <Typical wrapper="span" steps={steps} loop={Infinity} className="typicalWrapper" /> */}
          </h1>
          <p className="pc-jumbo-text-second">
            Do you want to acquire professional skills? Get started with proper class and learn from courses, blogs and project mentorship all from single platform.
          </p>
          <div className="search-form">
            <form>
              <input
                value={search}
                onChange={this.searchChange}
                placeholder="Eg, python developer"
              />
              <button type="submit" onClick={this.submitSearch}>
                Search
            </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default SearchElement;
