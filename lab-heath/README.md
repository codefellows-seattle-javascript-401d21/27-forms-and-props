
# LAB 27: Reddit Search Engine


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

## How to use

you have 2 input boxes that will take in a string in the first box and an number in the 2nd box. this will let you search for an item in box 1 and limit the results in box 2.

you will get a list of links with amount of thumbs up also.

if you fail to enter the correct info, the boxes will turn read and be greated with a lovly saying.


