# General information
_Author_: Jeremy Pearson

_Version_: 1.0.0

_Libraries_: babel-core, babel-loader, babel-preset-env, babel-preset-react, cowsay, css-loader, extract-text-webpack-plugin, faker, html-webpack-plugin, node-sass, react, react-dom, sass-loader, webpack, webpack-dev-server

_Last modified_: 2/19/2018

# App use

Install all needed dependencies

use 'npm run watch' to launch a hot server

Click the button to generate cowsay lorem ipsum (4 random words) like the cow tells you!

# Lab Readme (SPECS)

26: Cowsay
Submission Instructions
Work in a fork of this repository
Work in a branch on your fork
Write all of your code in a directory named lab- + <your name> e.g. lab-duncan
Submit a pull request to this repository
Submit a link to your pull request on canvas
Submit a question, observation, and how long you spent on canvas
Learning Objectives
Students will be able to configure webpack to compile JS into a bundle
Students will be able to configure webpack to compile sass into a bundle
Students will be able to configure babel to transpile JSX and ES6 to ES5 javascript
Students will be able to create and render react components to the DOM
Students will be able to add event listeners to react components
Students will be able to update react component state
Requirements
Configuration
Your lab directory must include

README.md -- with documention about your lab
.gitignore -- with a robust gitignore
.eslintrc.json -- with the class .eslintrc.json file
.eslintignore -- with the class .eslintignore
.babelrc -- with all dependencies and dev-dependencies
package.json -- with all dependencies and dev-dependencies
yarn.lock -- with the yarn lockfile
webpack.config.js -- with webpack config
src/ -- containing the frontend code
src/main.js -- containing the entire app
src/style -- containing your sass
src/style/main.scss -- containing the frontend code
Feature Tasks
Create the following component

App
Should contain the entire application's view and state
Should have a property on the state called content
Should create a view with the following display
A heading with the title "Generate Cowsay Lorem"
A Button that displays "click me"
onClick the button should generate new content on the app state using cowsay and faker
A pre tag that displays the App state (content)
Documentation
Write a description of the project in your README.md

Stretch Goal
add a select menu that enables you to change the type of cowfile currently being used