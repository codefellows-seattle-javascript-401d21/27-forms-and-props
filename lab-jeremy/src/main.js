import './styles/main.scss';

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      maxtopics: 5,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMaxtopicChange = this.handleMaxtopicChange.bind(this);
  }

  handleChange(e) {
    this.setState({val: e.target.value});
  }

  handleMaxtopicChange(e) {
    this.setState({maxtopics: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update_state(this.state.val, this.state.maxtopics);
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>
        <input
          type="text"
          className={this.props.error ? 'error' : 'search'}
          name="reddit-name"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="Search reddit..."/>

        <input
          type="number"
          className={this.props.error ? 'error' : 'search'}
          min="0"
          max="100"
          name="reddit-maxtopics"
          value={this.state.maxtopics}
          onChange={this.handleMaxtopicChange}
          // placeholder="5" //Default is set to 5 in the value
        />

        <button type="submit">Search</button>
      </form>
    );
  }
}

//TopicURL: this.props.reddit.data.children[i].data.url
//TopicTitle: this.props.reddit.data.children[i].data.title
//TopicUps: this.props.reddit.data.children[i].data.ups

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
              {this.props.reddit.data.children.map((topicObj, i) => {
                return <li key={i}>
                  <a href={topicObj.data.url}>
                    <h2>{`Topic title: ${topicObj.data.title}`}</h2>
                    <p>{`Topic ups: ${topicObj.data.ups}`}</p>
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
      searchError: null,
    };
    this.searchApi = this.searchApi.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(name, maxtopics) {
    this.searchApi(name, maxtopics)
      .then(res => this.setState({reddit: res.body, searchError: null}))
      .catch(err => this.setState({reddit: null, searchError: err}));
  }

  searchApi(name, maxtopics) {
    return superagent.get(`${API_URL}/${name}.json?limit=${maxtopics}`);
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