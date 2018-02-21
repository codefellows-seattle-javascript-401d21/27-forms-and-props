import './styles/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'http://www.reddit.com/r'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: '',
      limit: '',
    }
    this.handleChangeTopic = this.handleChangeTopic.bind(this)
    this.handleChangeLimit = this.handleChangeLimit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeTopic(e) {
    this.setState({topic: e.target.value})
  }
  handleChangeLimit(e) {
    this.setState({limit: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.update_state(this.state.topic, this.state.limit)
  }

  render() {
    return (
     <div>
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>
        <h3>Search topic</h3>
        <input
          type="text"
          name="topic"
          value={this.state.topic}
          onChange={this.handleChangeTopic}
          placeholder="topic"/>
        <h3>Search limit</h3>
        <input
          type="number"
          name="limit"
          step="1"
          min="1"
          max="99"
          value={this.state.limit}
          onChange={this.handleChangeLimit}
          placeholder="0"/>
          <p></p>
        <button type="submit">Search</button>
      </form>
      </div>
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
        {this.props.topic ?
          <section className="topic-data">
            <h2>TITLE</h2>
            <ul>
            {(this.props.topic.data.children.map(ele => <li><a href={ele.data.url}>{ele.data.title}</a><p></p>{ele.data.ups}</li>))}
            </ul>
          </section>
          :
          undefined
        }

        {this.props.error ?
          <section className="topic-error">
            <h2>Invalid search.</h2>
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
      topic: null,
      limit: null,
      searchError: null,
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
    return superagent.get(`${API_URL}/${name}.json?limit=${limit}`)
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
