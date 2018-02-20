># Lab 26: Cowsay

Using webpack and react, create a simple html page that displays the value of cowsay generated with a random phrase.  The user has the option of choosing the variant of cowsay fro a drop down.

>## Install

```BASH
    npm i
```


```BASH
    npm run build
```

```BASH
    npm run watch
```

### Dependencies 

- This project has the following dependencies:

```JSON
   "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.9",
    "extract-text-webpack-plugin": "^3.0.2",
    "html-webpack-plugin": "^2.30.1",
    "node-sass": "^4.7.2",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "sass-loader": "^6.0.6",
    "webpack": "^3.11.0",
    "webpack-dev-server": "^2.11.1"
  },
  "dependencies": {
    "cowsay": "^1.2.1",
    "faker": "^4.1.0"
  }
```

### npm scripts

- The following npm scripts are available:

```JSON
   "scripts": {
    "build": "webpack",
    "watch": "webpack-dev-server --inline --hot"
  },
```

>### HTML

```HTML
<html>
   <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Moo Speak</title>
      <link href="/bundle-9ee025ce7e6d26ebcdff.css" rel="stylesheet">
   </head>
   <body>
      <div id="root">
         <main>
            <h1>Generate Cowsay Lorem</h1>
            <section>
               <div>
                  <select id="cows-select">
                     <option value="DEFAULT">DEFAULT</option>
                     <option value="BEAVIS_ZEN">BEAVIS_ZEN</option>
                     <option value="BONG">BONG</option>
                     <option value="BUD_FROGS">BUD_FROGS</option>
                     <option value="BUNNY">BUNNY</option>
                     <option value="CHEESE">CHEESE</option>
                     <option value="COWER">COWER</option>
                     <option value="DAEMON">DAEMON</option>
                     <option value="DEFAULT">DEFAULT</option>
                     <option value="DOGE">DOGE</option>
                     <option value="DRAGON_AND_COW">DRAGON_AND_COW</option>
                     <option value="DRAGON">DRAGON</option>
                     <option value="ELEPHANT_IN_SNAKE">ELEPHANT_IN_SNAKE</option>
                     <option value="ELEPHANT">ELEPHANT</option>
                     <option value="EYES">EYES</option>
                     <option value="FLAMING_SHEEP">FLAMING_SHEEP</option>
                     <option value="GHOSTBUSTERS">GHOSTBUSTERS</option>
                     <option value="GOAT">GOAT</option>
                     <option value="HEAD_IN">HEAD_IN</option>
                     <option value="HEDGEHOG">HEDGEHOG</option>
                     <option value="HELLOKITTY">HELLOKITTY</option>
                     <option value="KISS">KISS</option>
                     <option value="KITTY">KITTY</option>
                     <option value="KOALA">KOALA</option>
                     <option value="KOSH">KOSH</option>
                     <option value="LUKE_KOALA">LUKE_KOALA</option>
                     <option value="MECH_AND_COW">MECH_AND_COW</option>
                     <option value="MEOW">MEOW</option>
                     <option value="MILK">MILK</option>
                     <option value="MOOFASA">MOOFASA</option>
                     <option value="MOOSE">MOOSE</option>
                     <option value="MUTILATED">MUTILATED</option>
                     <option value="REN">REN</option>
                     <option value="SATANIC">SATANIC</option>
                     <option value="SHEEP">SHEEP</option>
                     <option value="SKELETON">SKELETON</option>
                     <option value="SMALL">SMALL</option>
                     <option value="SODOMIZED">SODOMIZED</option>
                     <option value="SQUIRREL">SQUIRREL</option>
                     <option value="STEGOSAURUS">STEGOSAURUS</option>
                     <option value="STIMPY">STIMPY</option>
                     <option value="SUPERMILKER">SUPERMILKER</option>
                     <option value="SURGERY">SURGERY</option>
                     <option value="TELEBEARS">TELEBEARS</option>
                     <option value="TURKEY">TURKEY</option>
                     <option value="TURTLE">TURTLE</option>
                     <option value="TUX">TUX</option>
                     <option value="VADER_KOALA">VADER_KOALA</option>
                     <option value="VADER">VADER</option>
                     <option value="WHALE">WHALE</option>
                     <option value="WWW">WWW</option>
                  </select>
                  <button>Click Me</button>
               </div>
               <span>
                  <pre class="say-what">
                   _______________________________________
				&lt; Progressive system-worthy parallelism &gt;
				 ---------------------------------------
						\   ^__^
						 \  (oo)\_______
							(__)\       )\/\
								||----w |
								||     ||
                </pre>
               </span>
            </section>
         </main>
      </div>
      <script type="text/javascript" src="/bungle-9ee025ce7e6d26ebcdff.js"></script>
   </body>
</html>
```