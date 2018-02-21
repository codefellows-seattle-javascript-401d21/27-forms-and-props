
// import './styles/main.scss'

import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'https://pokeapi.co/api/v2'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redditSearch: '',
      redditLimit: 10
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.getAttribute("name")]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.redditSearch === ''){
     this.setState({
      inputClass: "invalid"
     })}else{
     this.setState({
      inputClass: ""
     })
     }
    this.props.update_state(this.state.redditSearch, this.state.redditLimit)
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>

        <input
          className={this.state.inputClass}
          type="text"
          name="redditSearch"
          value={this.state.redditSearch}
          onChange={this.handleChange}
          placeholder="Search Reddit!"/>
          <input name="redditLimit" type="number" value={this.state.redditLimit} min="1" max="100" onChange={this.handleChange} />
        <button type="submit">Search</button>

        {/* <Navbar get_set_app={this.props.get_set_app}/> */}
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
        {this.props.results ?
          <ul className="pokemon-data">
          {this.props.results.data.children.map((item,i) => {
            return <li key={i}><a href={item.data.url} target="_blank"><h3>{item.data.title}</h3></a><p>{item.data.ups}</p></li>
          })}
          </ul>
          :
          undefined
        }

        {this.props.error ?
          <section className="result-error">
            <h2>Enter something or something that makes sense</h2>
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
      results: null,
      searchError: null,
    }
    this.searchApi = this.searchApi.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  updateState(name, limit) {
    this.searchApi(name, limit)
    .then(res => this.setState({results: res.body, searchError: null}))
    .catch(err => this.setState({results: null, searchError: err}))

  }

  searchApi(name, limit) {
    return superagent.get(`https://www.reddit.com/r/${name}.json?limit=${limit}`)
  }


  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState}/>
        <Results results={this.state.results} error={this.state.searchError}/>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))