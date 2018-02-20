import './styles/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'http://www.reddit.com/r'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      val: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({val: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.update_state(this.state.val)
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="topic"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="topic"/>

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
        {this.props.topic ?
          <section className="topic-data">
            {console.log('XXXXXX PROPS XXXXXX')}
            {console.log(this.props)}
            <h2>AUTHOR</h2>
            <h2>{this.props.topic.data.children[1].data.author}</h2>
            <h2>TEXT</h2>
            <h2>{this.props.topic.data.children[1].data.selftext}</h2>
            {/* <img
              src={this.props.topic.sprites.front_default}
              alt={this.props.topic.name}/> */}
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
      searchError: null,
    }
    this.searchApi = this.searchApi.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  updateState(name) {
    this.searchApi(name)
    .then(res => this.setState({topic: res.body, searchError: null}))
    .catch(err => this.setState({topic: null, searchError: err}))
  }

  searchApi(name) {
    return superagent.get(`${API_URL}/${name}.json?limit=2`)
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
