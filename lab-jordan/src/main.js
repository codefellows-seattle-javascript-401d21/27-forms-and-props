import './styles/main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      limit: 0,
    };
    this.handleSubredditChange = this.handleSubredditChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubredditChange(e) {
    this.setState({val: e.target.value})
  }
  handleLimitChange(e) {
    this.setState({limit: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.update_state(this.state.val, this.state.limit)
    console.log(this.state.limit);
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="topics-name"
          value={this.state.val}
          onChange={this.handleSubredditChange}
          placeholder="subreddit name"/>

        <input
          type="number"
          min="0"
          max="100"
          name="page-limit"
          value={this.state.limit}
          onChange={this.handleLimitChange}
          placeholder="topics"/>

        <button type="submit">Search</button>
      </form>
    )
  }
}


class Results extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="results">
        {this.props.topics ?
          <ul>
            {this.props.topics.map((item, i) => {
              return (
                <li key={i}>
                  <a href={item.data.url}>
                    <p>&#9650; {item.data.ups}</p>
                    <h2>{item.data.title}</h2>
                  </a>
                </li>
              )
            })}
          </ul>
          :
          undefined
        }

        {this.props.error ?
          <section className="topics-error">
            <h2>You broke it.</h2>
          </section>
          :
          undefined
        }
      </div>
    )
  }
}




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: null,
      searchError: null,
    }
    this.searchApi = this.searchApi.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  updateState(subreddit, limit) {
    this.searchApi(subreddit, limit)
    .then(res => this.setState({topics: res.body.data.children, searchError: null}))
    .catch(err => this.setState({topics: null, searchError: err}))
  }

  searchApi(subreddit, limit) {
    return superagent.get(`https://www.reddit.com/r/${subreddit}.json?limit=${limit}`)
  }

  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState}/>
        <Results topics={this.state.topics} error={this.state.searchError}/>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));
