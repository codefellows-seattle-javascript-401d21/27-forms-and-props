'use strict';

import './styles/main.scss';

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com/r/';
const API_URL_LIMIT = '.json?limit=';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      number: 25,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    
    this.setState(state => {
      state[target.name] = target.value;
      return state;
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update_state(this.state);
  }

  

  render() {
    return (
      this.props.search_error?

        <form
          className="search-form"
          onSubmit={this.handleSubmit}>

          <input
            className="error"
            type="text"
            name="search"
            value={this.state.val}
            onChange={this.handleChange}
            placeholder="Search Reddit Here" />

          <input
            className="error"
            type="number"
            name="number"
            min="1"
            max="100"
            value={this.state.val}
            onChange={this.handleChange}
            placeholder="25" />

          <button type="submit">Search</button>
        </form>

        :<form 
          className="search-form"
          onSubmit={this.handleSubmit}>
          
          <input
            id="text"
            type="text"
            name="search"
            value={this.state.val}
            onChange={this.handleChange}
            placeholder="Search Reddit Here"/>
          
          <input
            id="number"
            type="number"
            name="number"
            min="1"
            max="100"
            value={this.state.val}
            onChange={this.handleChange}
            placeholder="25" />

          <button type="submit">Search</button>
        </form>
    );
  }
}


class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: '',
    };
  }

  render() {
    return (
      <div className="results">
        {this.props.topics?
          <ul className="topics">
            {this.props.topics}
          </ul>
          : undefined
        }
        {this.props.search_error?
          <section>
            <h2>{this.props.search_error.response.body.error}: {this.props.search_error.response.body.message}</h2>
          </section>
          : undefined

        }
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: null,
      searchError: null,
    };
    this.updateState = this.updateState.bind(this);
    this.searchApi = this.searchApi.bind(this);
    this.buildTopics = this.buildTopics.bind(this);
  }

  updateState(topic) {
    this.searchApi(topic)
      .then(this.buildTopics)
      .then(res => this.setState({ topics: res, searchError: null }))
      .catch(err => this.setState({ searchError: err, topics: null}));
  }

  searchApi(topic) {
    return superagent.get(`${API_URL}${topic.search}${API_URL_LIMIT}${parseInt(topic.number)}`);
  }

  buildTopics(data) {
    let topics = data.body.data.children.map((v, i) => <li key={i}><a href={v.data.url}><h2>{v.data.title}</h2><p>{v.data.ups}</p></a></li>);
    return topics;
  }

  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState} search_error={this.state.searchError}/>
        <Results topics={this.state.topics} search_error={this.state.searchError}/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));