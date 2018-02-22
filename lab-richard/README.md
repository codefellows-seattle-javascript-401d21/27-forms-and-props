<h1>27-Forms-And-Props</h1>

author: Richard Montgomery

version: 1.0.0





<h2>Lab Assignment</h2>
cf 27: Forms and Props
Daily Plan
Notes:

anything top of mind?
Code Review

SCSS Syntax Introduction

Forms and Props!!

Lifecycle Hooks

Lab Preview

Learning Objectives
Students will learn to test react components using jest and enzyme
Students will learn to manage controlled inputs
Students will learn to pass data from parent to child through props
Readings
Read Components and Props
Read State and Lifecycle
Read Handling Events
Read Forms
Forms and Inputs
React form elements maintain internal state. Think of React inputs as stateful child components. This means that we must manage the state of inputs through our own stateful component and one way data binding. We create a parent component I'll refer to as a form-container that manages the state for all child components of the form, passing any necessary state down into inputs through props. Each input has an onChange event that we can handle and use to update our form-container's state each time the user interacts with an input.

Props
Components accept arbitrary inputs called "props". In jsx props are passed into a component with a syntax that looks like html attributes. props is the name of the object passed into a component constructor, any prop added to a component in the jsx will be accessible as a property on props. After props is passed into the constructor's super they are available on the context by using this.props. props are READ ONLY

// props is the argument passed to the constructor
// props can be accessed on `this` after being passed into super
class Foo extends React.Component {
  constructor(props){
    super(props)
    console.log('title', props.title)
    console.log('content', props.content)
  }
  render(){
    return (
      <div>
        <h1> {this.props.title} </h1>
        <p> {this.props.content} </p>
      </div>
    )
  }
}

// adding props to a component
<Foo title='some literal value value' content={this.state.article.content}>
One Way Data flow
State can only be passed from parent to child through props. This enforces the idea of one way data flow. One way data flow is the way to describe that state can only be passed down the component tree (not up). If a child wants to pass some data to its parent, the parent can pass a function to the child through props and the child may invoke that function and pass it data for the parent to manage.