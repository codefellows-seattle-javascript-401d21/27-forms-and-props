'use strict';

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
  }

  getAppState(name){
    return getState(name);
  }

  setAppState(formState){
    search(formState)
    .then(res => this.setState({topics: res.body, search_error: null}))
    .catch(err => this.setState({topics: res.body, search_error: null}));
  }

  search(state){
    return superagent.get(`${redditApi}/${state.search_topic}.json?limit=${state.search_limit}`)
  }

    render() {
      return (
        <main>
          <h1>Reddit Geddit</h1>
          <section>
          <SearchForm set_app_state={this.setAppState}/>
          </section>
          <section>
          </section>
        </main>
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
      this.props.set_app_state(this.state)
    }

    render(){
      return(
        <form id="SearchForm" onSubmit={this.submitHandler}>
          <input type="text" 
            name="search_topic" 
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

  ReactDOM.render(<App />, root);

