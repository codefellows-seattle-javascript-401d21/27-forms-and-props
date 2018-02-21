import './styles/main.scss'

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
    this.handleChange = this.handleChange.bind(this)
    this.handleCount = this.handleCount.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({val: e.target.value})
  }

  handleCount(e) {
    this.setState({val: e.target.value})
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

        <input
          type="text"
          name="topics-name"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="text"
        />

        <input
          type="number"
          name="limit"
          min="0"
          max="100"
          value={this.state.count}
          onChange={this.handleCount}
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
