#Lab-27 February 20, 2018

We are going to set up a form interacting with Reddit API

#line 63 src={this.props.pokemon.sprites.front_default}
this is what we will have to change  based on the provided data through the API (pkemon image, type, powers, etc.) to get the designated results from the forms array in the browser console,for our reddit api.

We would use superagent requests to grab additional data from the api rather than just the image

More vaguely the render() return ({this.props.pokemon}) and all the curly brackets that go with it is what renders to the DOM

#Lab
We will replace line {this.props.pokemon ? // ...
this.props.results.map and return attributes/
for each result, do a thing

#Lab-26 February 19, 2018
#React
In react we write html in javascript

#Angular
Writes Javascript in HTML

Views: singin, landing, home, about us, etc.
Components: consistency like the headers, nav bar, etc. That you can re-use for myltiople views that will never change
Styles can be a componenent that stays consistent across platforms and views

#React State
Get State: allows us to add data/functionality and alter/modify the state. These files are immutable

The SET STATE can be modified with these GET states that vary in how they affect the SET STATE

#CAUTION
The entire application will break when using libraries so everything muyst be perfect

#Webpacks

Entry: file path to a bundle
Output: holds the file and bundle
Loaders: transpiles all files into javascript. all the packages even in different languages coming together. They typically come in the form of an array of objects
Plugins:
Minifications: shortens variables like var userName = to, var uN =

All 4 of these components gets fueled into web pack and out into a bundle.js/ bundle

webpack.js.org

.cjs is just like modularizing and exporting files and requiring them in like we’ve been doing

nom installation list as DEVELOP dependency (npm i -D …)
webpack
babel-core
babel-loader
babel-preset-env
babel-preset-react
css-loader
extract-text-webpack-plugin
html-webpack-plugin
node-sass
react
rect-dom
sass-loader
webpack-dev-server

NPM i -D consensus runs the liver server/nodemon where it reacts to any edits in our code, hence the D ion developer launch

add build to our .gitignore

