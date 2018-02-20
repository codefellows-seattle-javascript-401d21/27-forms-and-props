// import './styles/main.scss'

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
          name="search-topic"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="Bulbasaur"/>
        
        <input
          type="text"
          name="search-number"
          value={this.state.number}
          onChange={this.handleChange}
          placeholder="10"/>

        <button type="submit">Search</button>

      </form>
    )
  }
}


// class SearchResultList extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     return (
//       <div className="results">
//         {this.props.pokemon ?
//           <section className="pokemon-data">
//             {console.log(this.props.pokemon)}
//             <h2>{this.props.pokemon.name}</h2>
//             <img
//               src={this.props.pokemon.sprites.front_default}
//               alt={this.props.pokemon.name}/>
//           </section>
//           :
//           undefined
//         }

//         {this.props.error ?
//           <section className="pokemon-error">
//             <h2>You broke it.</h2>
//           </section>
//           :
//           undefined
//         }
//       </div>
//     )
//   }
// }




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: [],
      searchError: null,
    }
    this.searchApi = this.searchApi.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  updateState(name) {
    this.searchApi(name)
    .then(res => this.setState({topics: res.body, searchError: null}))
    .catch(err => this.setState({topics: [], searchError: err}))
  }

  searchApi(name) {
    return superagent.get(`${API_URL}/${searchFormBoard}.json?limit=${searchFormLimit}`)
  }

  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState}/>
        <SearchResultList topics={this.state.topics} error={this.state.searchError}/>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))