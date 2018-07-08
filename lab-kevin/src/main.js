'use strict';

import './styles/reset.scss';
import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

const redditApi = 'https://www.reddit.com/r';
const root = document.getElementById('root');

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      topics: null ,
      search_error: null,
    }
    this.getAppState = this.getAppState.bind(this);
    this.setAppState = this.setAppState.bind(this);
    this.search = this.search.bind(this);
  }

  getAppState(){
    return this.state;
  }

  setAppState(formState){
    this.search(formState)
    .then(res => this.setState({topics: res.body, search_error: null}))
    .catch(err => this.setState({topics: null, search_error: err}));
  }

  search(stateData){
    let topic = stateData.search_topic.trim().replace(/\s/g, '+');
    return superagent.get(`${redditApi}/${topic}.json?limit=${(stateData.search_limit)}`)
  }

    render() {
      return (
        <div>
        <Header />
        <main>
          <section className="search">
            <SearchForm set_app_state={this.setAppState} get_app_state={this.getAppState}/>
          </section>
          <section className="results">
            <SearchResults get_app_state={this.getAppState}/>
          </section>
        </main>
        </div>
      );
    }
  }

  class SearchForm extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        search_limit: 1,
        search_topic: '',
      }
      this.changeHandler = this.changeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(e){
       this.setState({[e.target.name]: e.target.value});
    }

    submitHandler(e){
      e.preventDefault()
      if (!this.state.search_topic) return;
      this.props.set_app_state(this.state)
    }

    render(){
      return(
        <form className={`search-form${this.props.get_app_state().search_error ? ' error' : ''}`} onSubmit={this.submitHandler}>
          <input type="text" 
            name="search_topic"
            placeholder="Search Topic" 
            value={this.state.search_topic}
            onChange={this.changeHandler}/>

          <input type="number" name="search_limit" 
            placeholder="1-100" 
            min="1" max="100" 
            value={this.state.search_limit}
            onChange={this.changeHandler}/>
            
            <button type="submit">Geddit</button>
        </form>
      );
    }
  }

  class SearchResults extends React.Component{
    constructor(props){
      super(props);
      this.displayResults = this.displayResults.bind(this); 
    }

    displayResults(){
      let {topics, search_error} = this.props.get_app_state();
      let errorClass = '';
      if (search_error) {
      if (search_error.status !== 403) {
         return `Error: ${search_error.message}`;
        }
      }
      if (!topics) return 'No Results';
      return(
        <ul className="results-list">
        {topics.data.children.map((topic, i ) => 
        <li key={i} className="results-item">
        <a href={topic.data.url}>
          <h2 className='results-item-title' >{topic.data.title}</h2>
          <p className='results-item-ups'>{topic.data.ups}</p>
        </a>
      </li>
      )}
      </ul>
      );
    }

    render(){
      return(
       this.displayResults()
      );
    }
  }

  class Header extends React.Component{
    constructor(props){
      super(props)
    }
    render(){
      return (
        <header>         
          <h1>Reddit Geddit</h1>
        </header>
      );
    }
  }

  ReactDOM.render(<App />, root);

