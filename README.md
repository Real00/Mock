# Mock.js
<!-- 模拟请求 & 模拟数据 -->
[![Build Status](https://travis-ci.org/nuysoft/Mock.svg?branch=refactoring)](https://travis-ci.org/nuysoft/Mock)

<!-- [![Coverage Status](https://coveralls.io/repos/nuysoft/Mock/badge.png?branch=refactoring)](https://coveralls.io/r/nuysoft/Mock?branch=refactoring)
[![NPM version](https://badge.fury.io/js/mockjs.svg)](http://badge.fury.io/js/mockjs)
[![Bower version](https://badge.fury.io/bo/mockjs.svg)](http://badge.fury.io/bo/mockjs)
[![Dependency Status](https://gemnasium.com/nuysoft/Mock.svg)](https://gemnasium.com/nuysoft/Mock)
[![spm package](http://spmjs.io/badge/mockjs)](http://spmjs.io/package/mockjs) -->

Mock.js is a simulation data generator to help the front-end to develop and prototype separate from the back-end progress and reduce some monotony particularly while writing automated tests.

The official site: <http://mockjs.com>

## Demo

mock.js
```javascript
import Mock from 'mock2js'

const rules = {
  // Support type as Object and Array
  'GET /api/users': {users: [1, 2]},

  '/api/users/1': {id: 1},
  '/api/users/2': (req, res) => {
    setTimeout(() => {
      res.send({id: 2, name: 'jack'})
    }, 3000)
  },

  'POST /api/users/create': () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('ok 123')
      }, 1000)
    })
  },
};

Mock.mockWithRules(rules);

```
main.js
```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../mock'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});

```
ajax:
```javascript
axios.get('/api/users/2').then(res=>{
  console.log(res.data);
})
```

## Features

* Generate simulated data according to the data template
* Provide request/response mocking for ajax requests
* ~~Generate simulated data according to HTML-based templates~~

This library is loosely inspired by Elijah Manor's post [Mocking
Introduction](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-green-bird.html), [mennovanslooten/mockJSON](https://github.com/mennovanslooten/mockJSON), [appendto/jquery-mockjax](https://github.com/appendto/jquery-mockjax) and [victorquinn/chancejs](https://github.com/victorquinn/chancejs/).

## Questions?
If you have any questions, please feel free to ask through [New Issue](https://github.com/nuysoft/Mock/issues/new).

## Reporting an Issue
Make sure the problem you're addressing is reproducible. Use <http://jsbin.com/> or <http://jsfiddle.net/> to provide a test page. Indicate what browsers the issue can be reproduced in. What version of Mock.js is the issue reproducible in. Is it reproducible after updating to the latest version?

## License
Mock.js is available under the terms of the [MIT License](./LICENSE).
