//JSX!!!!
import './styles/main.scss'
//const React = require('react') new method below
import React from 'react'
import ReactDom from 'react-dom'
import { say } from 'cowsay'
import faker from 'faker'

class App extends React.Component { //standard scaffold for any app. makes it reusable throughout the app through the use of Apps
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      //count: 0,
    }
    this.handleClick = this.handleClick.bind(this) //rendering to the next function
    }

  handleClick() { //take set state and overide it with this new counterr amd return as new state. This generates the click
    this.setState(() => ({ content: say({text: faker.random.words(7)})})) //renders the say above and makes cowsay
    //this.setState({current, content: cosway.say({text, f: current})}) this is how you would re-write the code above when not knowing what the text content would be. COMMON COMPONENT HERE
  }

  render() {
    return(
      <div className="app">
        <body background="https://images.unsplash.com/photo-1413813447360-290ffe8d33d0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cc0a8e291ba8818a609cb1bbb3c73e5a&w=1000&q=80">
        <h1>Generate Cowsay Lorem</h1>
        <button onClick={this.handleClick}>Cow Speak: {this.state.count}</button>
        {console.log('all/any javascript needs to be written in curly brackets')}
        <pre>{`${this.state.content}`}</pre>
        </body>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))