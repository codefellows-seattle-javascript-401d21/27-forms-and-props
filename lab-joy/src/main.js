import './styles/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      limit: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  handleLimitChange(e) {
    this.setState({ limit: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update_state(this.state.search, this.state.limit);
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input type="text" name="reddit-name" value={this.state.search} onChange={this.handleChange} placeholder="Search" />
        <input type="number" name="limit" min="1" max="100" value={this.state.limit} onChange={this.handleLimitChange} placeholder="1" />
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
            {console.log('hello: ', this.props.reddit)}
            <h2>{this.props.reddit.data.children.map((el, i) => <h2 key={i}>{el.data.title}</h2>)}</h2>
          </section>
          :
          undefined
        }

        {this.props.error ?
          <section className="reddit-error">
            {console.log('error: ', this.props.error)};
            <h2>You broke it.</h2>
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
      limit: null,
      searchError: null,
    };
    this.searchApi = this.searchApi.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(name, limit) {
    this.searchApi(name, limit)
      .then(res => this.setState({ reddit: res.body, searchError: null }))
      .catch(err => this.setState({ reddit: null, searchError: err }));
  }

  searchApi(name, limit) {
    return superagent.get(`${API_URL}/${name}.json?limit=${limit}`);
  }

  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState} />
        <Results reddit={this.state.search} error={this.state.searchError} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));