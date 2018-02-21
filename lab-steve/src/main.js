import './styles/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const REDDIT_API_PREFIX = 'http://www.reddit.com/r';

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
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => {
        this.setState({
          // sgc - Map the children results and filter out stickied posts
          topics: res.body.data.children
            .filter(e => e.data.stickied === false)
            .map(e => {
              return {
                title: e.data.title,
                url: e.data.url,
                downvotes: e.data.downs,
                upvotes: e.data.ups,
                thumbnail: e.data.thumbnail ? e.data.thumbnail : null,
                thumbnail_height: e.data.thumbnail ? e.data.thumbnail_height : null,
                thumbnail_width: e.data.thumbnail ? e.data.thumbnail_width : null,
              };
            }),
          searchError: null,
        });
      })
      .catch(err => this.setState({ topics: null, searchError: err }));
  }

  searchApi(searchStr, limit) {
    console.log(`searchApi: ${searchStr}, ${limit}`);
    const url = `${REDDIT_API_PREFIX}/${searchStr}.json?limit=${limit}`;
    console.log(`url: ${url}`);
    return superagent.get(
      `${REDDIT_API_PREFIX}/${searchStr}.json?limit=${limit}`
    );
  }

  render() {
    return (
      <div className="application">
        <h1>Reddit Searcher</h1>
        <SearchForm update_state={this.updateState} />
        <SearchResultList
          topics={this.state.topics}
          error={this.state.searchError}
        />
      </div>
    );
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: '',
      limit: 0,
    };
    // sgc - Bindings
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchChange(e) {
    // sgc - Capture input as it comes for the search string
    this.setState({ searchStr: e.target.value });
  }

  handleLimitChange(e) {
    // sgc - Capture input as it comes for the search limit
    this.setState({ limit: e.target.value });
  }

  handleSubmit(e) {
    // sgc - Prevent form submission
    e.preventDefault();
    // sgc - Call App updateState method through props
    this.props.update_state(this.state.searchStr, this.state.limit);
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

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="results">
        {this.props.topics
          ?
          <section className="search-results">
            {console.log(this.props.topics)}
            Results
          </section>
          :
          undefined
        }

        {this.props.error
          ?
          <section className="search-error">
            {console.log('Error')}
            Error
          </section>
          :
          undefined
        }
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
