//JSX!!!!
//import './styles/main.scss'

//const React = require('react') new method below
import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'http://www.reddit.com/r/'
//const API_URL = 'https://pokeapi.co/api/v2'

class SearchForm extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    val: '',
    limit: '',
  }
  this.handleChange = this.handleChange.bind(this)
  this.limitChange = this.limitChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({val: e.target.value})
  }

  limitChange(e) {
    this.setState({ limit: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault() //invoke
    this.props.update_state(this.state.val, this.state.limit)
  }

  render() {
    return(
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>

        <input
          className={this.props.error ?'error' : 'input'} //if theres an error, return 'error' otherwise...
          type="text"
          name="topic-name"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="Search"/>

        <input
          className={this.props.error ? 'error' : 'input'} //if theres an error, return 'error' otherwise...
          type="number"
          name="topic-name"
          value={this.state.limit}
          onChange={this.limitChange}
          placeholder="limit" />

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
      {this.props.topic ? //if there is a topic ...
        <section className="topic-data">
          {console.log(this.props.topic.data.children[0].data.title)}
          <body background={this.props.topic.data.children[0].data.thumbnail}>
          {this.props.topic.data.children.map(ele =>
          <li>
            <a href={ele.data.url}>{ele.data.title}</a>
            <p>{ele.data.ups}</p>
          </li>)}
          </body>
        </section>
        : //else, if there aren't any topic ...
        undefined
      }

      {this.props.error ?
        <section className="topic-error">
          <h2>You broke it.</h2>
        </section>
        :
        undefined
      }
    </div>
  )
}
}


class App extends React.Component { //standard scaffold for any app. makes it reusable throughout the app through the use of Apps
  constructor(props) {
    super(props)
    this.state = {
    topic: null,
    searchError: null,
    limit: null,
    }

    this.searchApi = this.searchApi.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  updateState(name, limit) {
    this.searchApi(name, limit)
    .then(res => this.setState({topic: res.body, searchError: null}))
    .catch(err => this.setState({topic: null, searchError: err}))
  }

  searchApi(name, limit) {
    return superagent.get(`${API_URL}${name}/.json?limit=${limit}`) //directly connected to topic API_URL above. ${searchFormLimit} to dynamically add a limt
  }

  render() {
    return (
      <div className="application">
      <SearchForm update_state={this.updateState}/>
      <Results topic={this.state.topic} error={this.state.searchError}/>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))