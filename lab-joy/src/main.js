// import './styles/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r/etc';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: '',
            limit: 10,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLimitChange = this.handleLimitChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ val: e.target.value });
    }

    handleLimitChange(e) {
        this.setState({ limit: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.update_state(this.state.val, this.state.limit);
    }

    render() {
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="text" name="reddit-name" value={this.state.val} onChange={this.handleChange} placeholder="Search" />
                <input type="number" name="limit" min="1" max="100" value={this.state.limit} onChange={this.handleLimitChange} placeholder="10" />
                <button type="submit">Search</button>
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
                {this.props.reddit ?
                    <section className="reddit-data">
                        {console.log(this.props.reddit)}
                        <h2>{this.props.reddit.data.children}</h2>
                    </section>
                    :
                    undefined}

                {this.props.error ?
                    <section className="reddit-error">
                        {console.log(this.props.error)};
                        <h2>You broke it.</h2>
                    </section>
                    :
                    undefined}
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

    updateState(val, limit) {
        this.searchApi(val, limit)
            .then(res => this.setState({ reddit: res.body, searchError: null }))
            .catch(err => this.setState({ reddit: null, searchError: err }));
    }

    searchApi(val, limit) {
        return superagent.get(`${API_URL}/${val}.json?limit=${limit}`);
    }

    render() {
        return (
            <div className="application">
                <SearchForm update_state={this.updateState} />
                <Results reddit={this.state.reddit} error={this.state.searchError} />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'))