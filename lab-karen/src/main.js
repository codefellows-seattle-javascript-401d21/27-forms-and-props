import './styles/main.scss';

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      topic: '',
      num: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) { //reusable change handler from docs
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.update_state(this.state.topic, this.state.num);
  }

  render() {
    return (
      <form
        className='search_form'
        onSubmit={this.handleSubmit}>
        <h1>Reddit Search</h1>
        <div className='container'>

          <input className={this.props.error ? 'error' : 'input'}
            type="text"
            name="topic"
            value={this.state.topic}
            onChange={this.handleChange}
            placeholder="Enter topic" />

          <input className={this.props.error ? 'error' : 'input'}
            type="number"
            name="num"
            value={this.state.num}
            onChange={this.handleChange}
            placeholder="Enter number of items to display" />
        </div>

        <button type="submit">Search</button>

      </form>
    );
  }
}

class SearchResultsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="results">
        {this.props.topic ?
          <section className="topic-data">
            <h2>Reddit Search Results {this.props.topic.data.children[0].data.subreddit}</h2>
            <ul>
              {this.props.topic.data.children.map((a,b) => {
                return <li key={b}>
                  <a href={a.data.url}><h3>{a.data.title}.</h3></a>
                  <p> Ups: {a.data.ups}</p>
                </li>;
              })
              }
            </ul>
          </section>
          :
          undefined
        }

        {this.props.error ?
          <section className="topic-error">
            <h2>You made an error</h2>
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
      topic: null,
      searchError: null,
    };
    this.searchApi = this.searchApi.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  searchApi(topic, num) {
    return superagent.get(`${API_URL}/${topic}.json?limit=${num}`);
  }

  updateState(topic, num) {
    this.searchApi(topic, num)
      .then(res => this.setState({topic: res.body, searchError: null}))
      .catch(err => this.setState({topic: null, searchError: err}));
  }



  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState} error={this.state.searchError}/>
        <SearchResultsList topic={this.state.topic} error={this.state.searchError}/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
