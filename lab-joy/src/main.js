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
      limit: 10,
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
        <h1>Search Reddit</h1>
        <input type="text" name="search" value={this.state.search} onChange={this.handleChange} placeholder="Search" />
        <input type="number" name="limit" min="1" max="99" value={this.state.limit} onChange={this.handleLimitChange} placeholder="#" />
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
        {this.props.search ?
          <section className="search-data">
            <ul>{this.props.search.data.children.map((el, i) => {
              return (
                <li>
                  <a href={el.data.url}>
                    <h2 key={i}>{el.data.title}</h2>
                    <p>[ Ups: {el.data.ups} ]</p>
                  </a>
                </li>
              );
            })}</ul>
          </section>
          :
          undefined
        }

        {this.props.error ?
          <section className="search-error">
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
      search: null,
      limit: null,
      searchError: null,
    };
    this.searchApi = this.searchApi.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(search, limit) {
    this.searchApi(search, limit)
      .then(res => {
        return this.setState({ search: res.body, searchError: null });
      })
      .catch(err => this.setState({ search: null, searchError: err }));
  }

  searchApi(search, limit) {
    return superagent.get(`${API_URL}/${search}.json?limit=${limit - 1}`)
      .then(res => {
        return res;
      });
  }

  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState} error={this.state.searchError} />
        <Results search={this.state.search} error={this.state.searchError} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));