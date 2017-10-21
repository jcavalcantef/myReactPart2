# Tutorial do meu primeiro contato com a biblioteca react , webpack(empacotador)  e babel (compilador).
## Como configurar um ambiente de desenvolvimento com react, webpack, babel, usando npm.
### O projeto está vazio pois o objetivo é somente  aprender o passo a passo de como configurar um ambiente de desenvolvimento WEB utilizando as tecnologias citadas acima.
## Necessário instalar o npm (gerenciador de pacotes) via nodeJS.
## Para iniciar o tutorial do zero será necessário apagar a pasta node_modules e realizar a instalação manual de cada pacote
## A pasta node_modules surgirá conforme forem feitas as intalações via npm install
### A pasta raiz possui a seguinte árvore de diretório
```
  -app
  --App.js            (Criado manualmente)
  --Components
  ---Layout
  ---Contents
  -public
  --index.html        (Criado manualmente)
  --bundle.js         (gerado via webpack)
  -webpack.config.js  (Criado manualmente)
  -package.json       (gerado via npm init)
```
# 1. Create a new node package
```npm 
npm init 
```
  Irá gerar o arquivo package.json contendo informações do projeto.

# 2. Installing and Configuring Webpack
```
  npm i webpack --save-dev
```
  O argumento --save-dev salva o nome dos pacotes baixados dentro do arquivo package.json gerado via npm init

  No arquivo webpack.config.js imponha:
```javascript
  var webpack = require('webpack');
  var path = require('path');

  var APP_DIR = path.resolve(__dirname, 'app/');       // origem
  var BUILD_DIR = path.resolve(__dirname, 'public/');  // destino

  var config = {
    entry: APP_DIR + '/App.js',
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
    }
  };

  module.exports = config;
 ```
  Crie o arquivo index.html na pasta public e no body imponha:
 ```javascript
  <script src="bundle.js"></script> 

 ```
  Verifique se funciona iniciando o webpack via terminal

  ./node_modules/.bin/webpack -d

  A saída deverá ser algo como:
 ```shell
  Hash: d3dfb1b94b96c5b1e878
  Version: webpack 3.8.1
  Time: 70ms
    Asset     Size  Chunks             Chunk Names
    bundle.js  3.12 kB       0  [emitted]  main
   [0] ./app/App.js 29 bytes {0} [built]
 ```
  Caso tenha dado certo, o arquivo bundle.js deverá aparecer na pasta public e o projeto já estará devidamente empacotado.

## 2.1 webpack with Server Up and Hot Reload

  Instale o webpack-dev-server para criar um servidor com Hot Reload
 ```
  npm install webpack-dev-server --save-dev
 ```
  Antes de iniciar será preciso configurar o servidor no arquivo webpack.config.js assim:
 ```javascript
    devServer: {
      contentBase: __dirname + '/public/',
      inline: true,
      host: '127.0.0.1',
      port: 3333
    }
 ```
  Verificar se funciona com o comando:
  ./node_modules/.bin/webpack-dev-server --hot --inline --progress --colors

  deverá aparecer algo como:
  
 ```
[1] Hash: bf45c4e7f1ef5a4ade41
[1] Version: webpack 3.8.1
[1] Time: 1969ms
[1]     Asset     Size  Chunks                    Chunk Names
[1] bundle.js  1.19 MB       0  [emitted]  [big]  main
[1]    [6] (webpack)/hot/log.js 1 kB {0} [built]
[1]    [7] ./node_modules/react/index.js 190 bytes {0} [built]
[1]   [13] (webpack)/hot/emitter.js 75 bytes {0} [built]
[1]   [19] multi (webpack)-dev-server/client?http://127.0.0.1:3333 webpack/hot/dev-server ./app/App.js 52 bytes {0} [built]
[1]   [20] (webpack)-dev-server/client?http://127.0.0.1:3333 7.95 kB {0} [built]
[1]   [21] ./node_modules/url/url.js 23.3 kB {0} [built]
[1]   [28] ./node_modules/strip-ansi/index.js 161 bytes {0} [built]
[1]   [30] ./node_modules/loglevel/lib/loglevel.js 7.74 kB {0} [built]
[1]   [31] (webpack)-dev-server/client/socket.js 1.05 kB {0} [built]
[1]   [33] (webpack)-dev-server/client/overlay.js 3.73 kB {0} [built]
[1]   [38] (webpack)/hot nonrecursive ^\.\/log$ 170 bytes {0} [built]
[1]   [40] (webpack)/hot/dev-server.js 1.56 kB {0} [built]
[1]   [41] (webpack)/hot/log-apply-result.js 1.27 kB {0} [built]
[1]   [42] ./app/App.js 2.32 kB {0} [built]
[1]   [45] ./node_modules/react-dom/index.js 1.36 kB {0} [built]
[1]     + 44 hidden modules
[1] webpack: Compiled successfully.
 ```
# 3. Setting Up Babel-Loader
  npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react

  após a instalação dos loader (carregadores) principais do babel , o arquivo webpack deve ser atualizado

 ```javascript
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  }
 ```
  Verificar se funciona com o comando:
   ```
  ./node_modules/.bin/webpack -d --watch
   ```

  # 4. Setting Up react

    npm install react react-dom --save

    Faça o teste para ver se funciona, manipulando o arquivo App.js

 ```javascript
    import React from 'react';
    import {render} from 'react-dom';

    class App extends React.Component {
      render () {
        return (<p> Heeellooooo React, Great for me! </p>);
      }
    }

    render(<App />, document.getElementById('app'));
 ```

    Um novo arquivo bundle.js deverá ser gerado após o comando
    
     ./node_modules/.bin/webpack -d --watch   

    Em outro terminal levante o servidor com o comando:
     
      ./node_modules/.bin/webpack-dev-server --hot --inline --progress --colors   
      
    Algo deveria ser renderizado na url   http://localhost:3333/

  # 5. Create Script Start With NPM

 ``` npm i concurrently --save-dev ```

    No arquivo package.json imponha:

 ```javascript
    "scripts": {
      "start": "concurrently --kill-others \"webpack -d --watch\" \"webpack-dev-server --hot --inline --progress --colors\""
    }
 ```
 
 Dessa forma o empacotador(webpack) e o servidor (webpack-dev-server) serão iniciados simultaneamente com o comando:
 
 ``` 
 npm start 
 ```
 
fontes:
https://willianjusten.com.br/configurando-o-webpack-para-rodar-react-e-es6/
http://tszekely.github.io/react-learning-module/
