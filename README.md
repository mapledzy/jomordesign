loading.....

***
原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头，比如 HelloMessage 不能写成 helloMessage。除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错。
***
当我写这样的webpack.config.js
```JS
module.exports = {
  entry: './index.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};
```
并在index.jsx我导入一个react模块App
```JS
import React from 'react';
import { render } from 'react-dom';

import App from './containers/App';

let rootElement = document.getElementById('box')
render(
  <App />,
  rootElement
)
```
我发现如果我命名模块的应用程序App.jsx，然后webpack会说在index.jsx找不到模块App，但如果我命名模块的应用程序中App.js，它会发现这个模块，并很好地工作。

所以，我对此感到困惑。在我的webpack.config.js，我已经写test: /\.jsx?$/了检查文件，但为什么命名*.jsx无法找到？

Webpack doesn't know to resolve .jsx files implicitly. You can specify a file extension in your app (import App from './containers/App.jsx';). Your current loader test says to use the babel loader when you explicitly import a file with the jsx extension.

or, you can include .jsx in the extensions that webpack should resolve without explicit declaration:
```JS
module.exports = {
  entry: './index.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};
```
For Webpack 2, leave off the empty extension.
```javascript
resolve: {
  extensions: ['.js', '.jsx']
}
```
***
把jsx编译到js需要调用一个函数, 这个函数在React叫React.createElement. 你可以比较一下jsx和编译出的js.