// import './styles/main.scss'

import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'https://www.reddit.com/r/'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      val: '',
    }
    this.handleNumber = this.handleNumber.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleText(e) {
    this.setState({val: e.target.value})
  }

  handleNumber(e) {
    this.setState({val: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    superagent.get(`${API_URL}${this.state.topic}.json?limit=${this.state.count}`)
    .then(res => {
      this.setState({
        topics: res.body.data.children
      })
    })
    .catch(err => {
      this.setState({
        hasError: true
      })
    })
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="text"
          onChange={this.handleText}
          placeholder="text"
        />

        <input
          type="number"
          name="number"
          min='0'
          max='100'
          onChange={this.handleNumber}
          placeholder="number"
        />

        <button>Search</button>
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
      <ul>
        {this.props.topics.map((item, i) => {
          return (
            <li>
              <a href={item.data.url}>
              <h3>{item.data.title}</h3>
              <p>{item.data.ups}</p>
              </a>
             </li>
          )
        })}
      </ul>
    )
  }
}




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: null,
    }
    this.searchApi = this.searchApi.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  updateState(name) {
    this.searchApi(name)
  }


  render() {
    return (
      <div>
        <h2>Lab 27</h2>
        <SearchForm />
        <Result topics={this.state.topics}/>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
