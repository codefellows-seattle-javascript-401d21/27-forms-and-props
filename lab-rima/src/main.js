'use strict';

import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com';

class SearchForm extends React.Component{ // eslint-disable-line no-unused-vars
  constructor(props){
    super(props);
    this.state = {
      keyword: '',
      resultLimit: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.update_state(this.state.keyword, this.state.resultLimit);
  }

  render(){
    return(
      <form
        className="search-form"
        onSubmit={this.handleSubmit}
        id="reddit-search-form">

        <input
          className="keyword"
          type="text"
          name="keyword"
          value={this.state.keyword}
          onChange={this.handleChange}
          placeholder="Enter a keyword"/>

        <input
          type="number"
          name="resultLimit"
          min="1"
          max="99"
          value={this.state.resultLimit}
          onChange={this.handleChange}
          placeholder="Enter a number"/>

        <button type="submit">Search</button>

      </form>
    );
  }
}

class Results extends React.Component { // eslint-disable-line no-unused-vars
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.results_arr){
      let form = document.getElementById('reddit-search-form');
      form.className = 'search-form';
      var mapping =
        this.props.results_arr.data.children.map(obj => {
          return (
            <li key={obj.data.title}>
              <a href={API_URL + obj.data.permalink}>
                <h3 className="title">{obj.data.title}</h3>
                <p className="ups">ups: {obj.data.ups}</p>
              </a>
            </li>
          );
        });
    }
    else if(this.props.searchError){
      let form = document.getElementById('reddit-search-form');
      form.className = 'search-form reddit-error';
    }
    return (
      <div className="results">
        {this.props.results_arr ?
          <ul className="resultsList">
            {mapping}
          </ul>
          :
          undefined
        }

        {this.props.searchError ?
          <ul className="reddit-error">
            <li><h3>Error occured!</h3></li>
          </ul>
          :
          undefined
        }
      </div>
    );
  }
}

class App extends React.Component{ // eslint-disable-line no-unused-vars

  constructor(props){
    super(props);
    this.state = {
      results_arr: null,
      searchError: null,
    };

    this.updateState = this.updateState.bind(this);
    this.searchApi = this.searchApi.bind(this);
  }

  updateState(keyword, resultLimit){
    this.searchApi(keyword, resultLimit)
      .then(res => {
        this.setState({results_arr: res.body, searchError: null});
      })
      .catch(err => {
        this.setState({results_arr: null, searchError: err});
      });
  }

  searchApi(keyword, resultLimit){
    return superagent.get(`${API_URL}/r/${keyword}.json?limit=${resultLimit}`);
  }

  render(){
    return (
      <div className="app">
        <SearchForm update_state={this.updateState}/>
        <Results results_arr={this.state.results_arr} searchError={this.state.searchError}/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
