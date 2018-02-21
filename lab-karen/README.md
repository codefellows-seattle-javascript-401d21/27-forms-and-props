## Lab 27-forms-and-props

This project creates an app with three React components according to the following structure
```
App
    SearchForm
    SearchResultsList
```

**App Component**
- contains all of the application state
- contain methods for modifying the application state
- the state should have a topics array for holding the results of the search

**SearchForm Component**
- contains a text input for the user to supply a reddit board to look up
- contains a number input for the user to limit the number of results to return (1-99)
- onSubmit the form should make a request to http://www.reddit.com/r/${topic}.json?limit=${limit}
- on success it should pass the results to the application state
- on failure it should add a class to the form called error and turn the form's inputs borders red


**SearchResultList Component**
- should inherit all search results through props
- stateless
- if there are topics in the application state it should display an unordered list
- Each list item in the unordered list should contain
  - an anchor tag with a href to the topic.url
  - inside the anchor a heading tag with the topic.title
  - inside the anchor a p tag with the number of topic.ups



**Installation & Set-Up**
Fork this repository and install on your machine using git clone. Switch to the lab-karen folder.

This project requires Node JS and npm( Node package manager).

The following excerpt from the existing package.json file shows the required package dependencies. Install devDependencies with *npm i -D (package name)*.

"devDependencies": {
  "babel-core": "^6.26.0",
  "babel-loader": "^7.1.2",
  "babel-preset-env": "^1.6.1",
  "babel-preset-react": "^6.24.1",
  "cowsay-browser": "^1.1.8",
  "css-loader": "^0.28.9",
  "eslint": "^4.18.1",
  "eslint-plugin-react": "^7.7.0",
  "extract-text-webpack-plugin": "^3.0.2",
  "html-webpack-plugin": "^2.30.1",
  "node-sass": "^4.7.2",
  "react": "^16.2.0",
  "react-dom": "^16.2.0",
  "sass-loader": "^6.0.6",
  "superagent": "^3.8.2",
  "webpack": "^3.11.0",
  "webpack-dev-server": "^2.11.1"
}

Additionally, add the following scripts to your package.json file to run from the command line.
```
"scripts": {
  "build": "webpack",
  "watch": "webpack-dev-server --inline --hot"
},
```
**Running the app**
From the command line, type *npm run watch* to start the Webpack server.  Open a tab in the browser at localhost:8080 to see the app running.
