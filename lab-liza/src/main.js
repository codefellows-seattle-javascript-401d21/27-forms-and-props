import './styles/main.scss'

import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'


class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      val: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCount = this.handleCount.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({val: e.target.value})
  }

  handleCount(e) {
    this.setState({count: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.update_state(this.state.val, this.state.count)
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>
        <h3> Lab 27</h3>
        <input
          type="text"
          name="name"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="topic"/>

        <input
          type="number"
          name="limit"

          value={this.state.count}
          onChange={this.handleCount}
          placeholder="number"/>

        <button type="submit">Search</button>
      </form>
    )
  }
}


class Result extends React.Component {
  constructor(props){
    super(props);

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
          <section>
            <h4>Error</h4>
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
        <Result topics={this.state.topics} error={this.state.searchError}/>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
