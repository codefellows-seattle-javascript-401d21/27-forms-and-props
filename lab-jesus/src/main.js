// import './styles/main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      limit:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLimit = this.handleLimit.bind(this);
  }

  handleChange(e) {
    this.setState({val: e.target.value});
  }

  handleLimit(e) {
    this.setState({limit: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.props.get_set_app)
    this.props.update_state(this.state.val, this.state.limit);
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="reddit-name"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="search"/>
         
        <input
          type="number"
          name="reddit-limit"
          min="1"
          max="100"
          value={this.state.limit}
          onChange={this.handleLimit}
          placeholder="number"/>

        <button type="submit">Search</button>

        {/* <Navbar get_set_app={this.props.get_set_app}/> */}
      </form>
    );
  }
}


class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      
      <div className="results">
        {console.log('before map',this.props.reddit)}
        {this.props.reddit ?
          <section className="reddit-data">
          <h1>{this.props.reddit[0].subreddit_name_prefixed}</h1>
            {this.props.reddit.map(data =>
              <li key={data.title.toString()} >
                <img src={data.thumbnail} 
                  alt=""
                  width="64" />
                <a href={data.url}>{data.title}</a>
                <a href={data.url}>/Upvotes:{data.score}</a>
              </li>)}            3
          </section>
          :
          undefined
        }

        {this.props.error ?
          <section className="reddit-error">
          </section>
          :
          undefined
        }
      </div>
    );
  }
}




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reddit: null,
      searchError: null,
    };
    this.searchApi = this.searchApi.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(name,limit) {
    this.searchApi(name,limit)
      .then(res => res.body.data.children.map(child => child.data))
      .then(res => this.setState({reddit: res, searchError: null}))
      .catch(err => this.setState({reddit: null, searchError: err}));
  }

  searchApi(name, limit) {
    // return superagent.get(`${API_URL}/reddit/${name}`);
    return superagent.get(`${API_URL}/${name}.json?limit=${limit}`);
  }

  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState}/>
        <Results reddit={this.state.reddit} error={this.state.searchError}/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));