import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      results: 25,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchResults = this.handleSearchResults.bind(this);
  }
  
  handleChange(e) {
    this.setState({val: e.target.value});
  }

  handleSearchResults(e) {
    this.setState({results: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update_state(this.state.val, this.state.results);
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>
        <input
          name="reddit"
          type="text"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="search"
        />

        <input
          name="search-results"
          type="number"
          min="1"
          max="25"
          value={this.state.results}
          onChange={this.handleSearchResults}
        />

        <button type="submit">Search</button>
      </form>
    );
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="results">
        {this.props.reddit ?
          <section className="reddit-data">
            <ul>
              {this.props.reddit.data.children.map((post, i) => {
                return <li key={i}>
                  <a href={post.data.url}>
                    <h2>${post.data.title}</h2>
                    <p>{`upvotes: ${post.data.ups}`}</p>
                  </a>
                </li>;
              })}
            </ul>
          </section>
          :
          undefined
        }

        {this.props.error ?
          <section className="reddit-error">
            <h2>0 Results Found</h2>
          </section>
          :
          undefined
        }
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reddit: null,
      searchError: null,
    };
    this.searchApi = this.searchApi.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(name, results) {
    this.searchApi(name, results)
      .then(res => this.setState({reddit: res.body, searchError: null}))
      .catch(err => this.setState({reddit: null, searchError: err}));
  }

  searchApi(name, results) {
    return superagent.get(`${API_URL}/r/${name}.json?limit=${results}`);
  }

  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState} error={this.state.searchError}/>
        <Results reddit={this.state.reddit} error={this.state.searchError}/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
