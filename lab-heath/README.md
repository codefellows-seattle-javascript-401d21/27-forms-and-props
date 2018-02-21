
# LAB 26: Cowsay


### Installing and How to use.

To install this program, place fork and 'git clone' this repo to your computer. From the terminal, navigate to  `lab-heath`. once there, install NPM but typing in , `nmp install` and after that, you will neex to install all the dependencies. do this by typing in `npm i`. 

next you need to have these scripts adjusted in your package.json file.

```javascript
"scripts": {
    "build": "webpack",
    "watch": "webpack-dev-server --inline --hot"
  },
  ```

from there, you can go to your terminal and type, 

```javascript
node run build
```
this will build out a it builds the app by packaging it all up into a simple file for us to use later on.

to get a preview of your app. you need to run this command also.

```javascript
node run watch
```
once you have done that. you can go to your localhost:8080 and see your project in the browser.

## YOU NEED TO SELECT SOMETHING FIRST.

### some helpful tips

first you need to pick a animal with the drop down menu. once you have done that, click on the button and it will then run the cowsay function to show you what it says.

