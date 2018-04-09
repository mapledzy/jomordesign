资料收集
等完善以后会做整理

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
***
有了babel loader就不需要jsx-loader了，那是去年的事情了
***
resolve.extensions
一个包含模块扩展名的数组。例如，为了发现CoffeeScript 文件，你的数组应该包含字符串".coffee"。

Default: ["", ".webpack.js", ".web.js", ".js"] 
注意：设置了这个选项，会取代默认的模块扩展名。重要的事情说三遍：意味着webpack不再用默认扩展名查找模块，意味着webpack不再用默认扩展名查找模块，意味着webpack不再用默认扩展名查找模块。如果你想正确加载一个带有扩展名的模块，你必须把一个空字符串放在你的数组里。如果你想不要扩展名来加载一个js文件，你需要将“.js”加入你的数组。
***
https://eslint.org/docs/rules/comma-dangle
***
## React中static defaultProps报错问题详解
在react中可以定义默认props，使用es5时，可以使用getDefaultProps：
```JS
var MyDemo = React.createClass({
  getDefaultProps: function() {
    return {
      name: 'demo'
    };
  },
  render: function() {
    return <h1>This is my {this.props.name}</h1>;
  }
});

ReactDOM.render(
  <MyDemo />,
  document.getElementById('demo')
);
```
es6中使用static defaultProps（报错，需要使用static的解决方案见下面）：
```JS
class MyDemo extends React.Component{
  constructor(props){
    super(props);
  }
//如果babel设置为es6的转码方式，会报错，因为定义静态属性不属于es6，而在es7的草案中。ES6的class中只有静态方法，没有静态属性。
  static defaultProps = {
    name: 'demo'
  }

  render(){
    return <h1>This is my {this.props.name}</h1>
  }
}
```
es6定义默认props的正确方式：
```JS
class MyDemo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>This is my {this.props.name}</h1>
  }
}
//由于是用ES6 class语法创建组件，其内部只允许定义方法，而不能定义属性，class的属性只能定义在class之外。所以defaultProps要写在组件外部。
MyDemo.defaultProps = {
  name: 'demo'
};
```
### 解决方案：
 将babel设置为es7的转码方式
 ```javascript
 // Install babel
npm install babel-core babel-loader --save-dev

// For ES6/ES2015 support
npm install babel-preset-es2015 --save-dev

// If you want to use JSX
npm install babel-preset-react --save-dev

// If you want to use experimental ES7 features
npm install babel-preset-stage-0 --save-dev
```
在项目根目录配置.babelrc文件
```JS
{
  "presets": ["es2015", "stage-0"],
  "plugins": ["transform-runtime"]
}
```
如果使用webpack的话，如下配置
```JS
loaders:[
          {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader' ,
            query:{
              presets:['es2015','stage-0','react'],
              plugins:['transform-runtime']
            },
           }
          ]
```
加入stage-0后就能尝试es7语法了，static也能在class内部定义属性了~
