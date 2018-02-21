import './styles/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const REDDIT_API_PREFIX = 'http://www.reddit.com/r/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: null,
      searchError: null
    };
    // sgc - Bindings
    this.searchApi = this.searchApi.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(searchStr, limit) {
    this.searchApi(searchStr, limit)
      .then(console.log)
      .catch(console.error);
    //.then(res => this.setState({pokemon: res.body, searchError: null}))
    //.catch(err => this.setState({pokemon: null, searchError: err}));
  }

  searchApi(searchStr, limit) {
    return superagent.get(
      `${REDDIT_API_PREFIX}/${searchStr}.json?limit=${limit}`
    );
  }

  /* <SearchResultList topics={this.state.topics} error={this.state.searchError}/> */
  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState} />
      </div>
    );
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: '',
      target: ''
    };
    // sgc - Bindings
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchChange(e) {
    // sgc - Capture input as it comes for the search string
    this.setState({ searchStr: e.target.searchstr });
  }

  handleLimitChange(e) {
    // sgc - Capture input as it comes for the search limit
    this.setState({ limit: e.target.target });
  }

  handleSubmit(e) {
    // sgc - Prevent form submission
    e.preventDefault();
    // sgc - Call App updateState method through props
    this.props.update_state(this.state.searchStr, this.state.target);
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        {/* search string to query Reddit */}
        <input
          type="text"
          name="search-str"
          value={this.state.searchStr}
          onChange={this.handleSearchChange}
          placeholder="search"
        />

        {/* limit number of search results */}
        <input
          type="number"
          name="limit-str"
          value={this.state.limit}
          onChange={this.handleLimitChange}
          placeholder="limit"
          min="0"
          max="100"
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
