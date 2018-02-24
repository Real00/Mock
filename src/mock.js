/* global require, module, window */
var Handler = require('./mock/handler')
var Util = require('./mock/util')
var Random = require('./mock/random')
var RE = require('./mock/regexp')
var toJSONSchema = require('./mock/schema')
var valid = require('./mock/valid')

var XHR
if (typeof window !== 'undefined') XHR = require('./mock/xhr')

/*!
    Mock - 模拟请求 & 模拟数据
    https://github.com/nuysoft/Mock
    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
*/
var Mock = {
    Handler: Handler,
    Random: Random,
    Util: Util,
    XHR: XHR,
    RE: RE,
    toJSONSchema: toJSONSchema,
    valid: valid,
    heredoc: Util.heredoc,
    setup: function(settings) {
        return XHR.setup(settings)
    },
    _mocked: {}
}

Mock.version = '1.0.1-beta3'

// 避免循环依赖
if (XHR) XHR.Mock = Mock

/*
    * Mock.mock( template )
    * Mock.mock( function() )
    * Mock.mock( rurl, template )
    * Mock.mock( rurl, function(options) )
    * Mock.mock( rurl, rtype, template )
    * Mock.mock( rurl, rtype, function(options) )

    根据数据模板生成模拟数据。
*/
Mock.mock = function(rurl, rtype, template) {
    // Mock.mock(template)
    if (arguments.length === 1) {
        return Handler.gen(rurl)
    }
    // Mock.mock(rurl, template)
    if (arguments.length === 2) {
        template = rtype
        rtype = undefined
    }
    // 拦截 XHR
    if (XHR) window.XMLHttpRequest = XHR
    Mock._mocked[rurl + (rtype || '')] = {
        rurl: rurl,
        rtype: rtype,
        template: template
    }
    return Mock
}

Mock.mockWithRules = function(rules, options){
    if(!rules || typeof rules !== 'object')return;
    var baseUrl = '';
    if(options){
        baseUrl = options.baseUrl || '';
    }

    Object.keys(rules).forEach(key=>{
        let method = 'GET';
        let url = key;
        if (key.indexOf(' ') !== -1) {
            let k = key.split(' ');
            method = k[0];
            url = k[1];
        }
        Mock.mock(baseUrl + url, method.toLowerCase(), req => {
            let handler = rules[key];
            if(typeof handler === 'function'){
                let _callFn = null
                let res = {
                    send: function (data) {
                        setTimeout(()=>{
                            if(_callFn)_callFn(Mock.mock(data))
                        }, 1)
                    },
                    onDone: function(fn){
                        _callFn = fn
                    }
                };
                let result = handler(req, res);
                if(result){
                    return Mock.mock(result)
                }
                return new Promise(resolve => {
                    res.onDone(resolve)
                })
            }else {
                return Mock.mock(handler);
            }
        })
    });
}

module.exports = Mock
