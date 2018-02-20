import './style/main.scss'

import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'https://www.reddit.com/r'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      val: '',
      number: 10,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    if (e.target.name === 'search-topic') this.setState({val: e.target.value})
    if (e.target.name === 'search-number') this.setState({number: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.update_state(this.state)
  }

  render() {
    console.log(this.props)
    return (
      <form
        className={this.props.search_error ? "form-error search-form" : "search-form"}
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="search-topic"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="example"/>
        
        <input
          type="number"
          name="search-number"
          value={this.state.number}
          onChange={this.handleChange}
          placeholder="10"
          min="0"
          max="100"/>
          
        <button type="submit">Search</button>

      </form>
    )
  }
}


class SearchResultList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('this.props',this.props);
    return (
      <div className="results">
        {this.props.topics ?
          <section className="topics-data">
            <ul>
              {this.props.topics.map((info, i) => {
                return <li key={i}><a href={info[0]}><h2>{info[1]}</h2><p>{info[2]}</p></a></li>
              })}
            </ul>


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
    )
  }
}




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: '',
      limit: 0,
      searchError: null,
    }
    this.searchApi = this.searchApi.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  updateState(state) {
    this.searchApi(state)
    .then(res => this.setState({topics: res.body.data.children.map(i => [i.data.url, i.data.title, i.data.ups]), searchError: null}))
    .catch(err => {
      this.setState({topics: [], searchError: err})

    })
  }

  searchApi(state) {
    console.log('this.state',state)
    return superagent.get(`${API_URL}/${state.val}.json?limit=${state.number}`)
  }

  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState} search_error={this.state.searchError}/>
        <SearchResultList topics={this.state.topics} limit= {this.state.limit} error={this.state.searchError}/>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))