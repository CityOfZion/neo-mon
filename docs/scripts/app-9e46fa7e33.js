!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.neo=t.neo||{})}(this,function(t){"use strict";function e(t){Mt=t}function n(){return Mt}function o(t,e,o){function r(){t.serviceLatencyStartTime=Date.now()}function i(e){e?t.serviceLatency=0:(t.serviceLastConnectedTime=Date.now(),t.serviceLatency=t.serviceLastConnectedTime-t.serviceLatencyStartTime)}function s(t){return t?(this.serviceBaseUrl=t,this):this.serviceBaseUrl}function a(t){return t?(this.serviceProtocolClient=t,this):this.serviceProtocolClient||n()}function c(t){return t?(this.servicePollInterval=t,this):this.servicePollInterval}function u(t){return t?(this.serviceMonitorLatency=t,this):this.serviceMonitorLatency}function l(t){return t?this:this.serviceLatency}function f(t){return t?this:this.serviceLastConnectedTime}"string"==typeof o?o={baseUrl:o}:"object"!=typeof o&&(o={}),t.stopPolling=!1,t.serviceLatency=0,t.serviceLatencyStartTime=0,t.serviceLastConnectedTime=Date.now(),t.serviceName=e,t.serviceBaseUrl=o.baseUrl||"",t.servicePollInterval=o.poll,t.serviceMonitorLatency=o.monitorLatency,t.baseUrl=s,t.protocolClient=a,t.poll=c,t.monitorLatency=u,t.startLatencyTimer=r,t.stopLatencyTimer=i,t.latency=l,t.lastConnectedTime=f}function r(t){function e(t){c&&n(),s=t,c=!0,r(i.interval)}function n(){c=!1,clearTimeout(a)}function o(){return c}function r(t){a=setTimeout(function(){s()},t)}var i,s,a,c,u={interval:25e3,errorInterval:3e5};"number"==typeof t&&(t=Math.max(1e3,t),t={interval:t}),i=Object.assign({},u,t||{}),this.stop=n,this.start=e,this.isRunning=o}function i(){function t(t,n){return e(this,"POST",t,n)}function e(t,e,n,o){if(!n)throw new Error("You must configure the rpc method");var r={jsonrpc:"2.0",id:1};r.method=n,r.params=o||[];var i={};return i.url=t.baseUrl(),i.data=r,i.method=e,i.transformResponse=function(t){return t.data.result},i.transformResponseError=function(t){return t.data.error},c(t,i)}this.$post=t}function s(){function t(t,n){return e(this,t,n)}function e(t,e,n){if(!e)throw new Error("You must configure the ipc method");var o={method:e,params:n||[]},r={};return r.data=o,c(t,r)}this.$send=t}function a(t){function e(){return u||a.isRunning()}function n(e){return t._requests.push(e),this}function o(){c=!0,a.stop()}function i(){c&&(c=!1,a.start(s))}function s(){function e(){0===--n&&(t._interval(),u=!1,c||a.start(s))}var n=t._requests.length;u=!0,t._requests.forEach(function(t){t().then(e).catch(e)})}var a=new r(t.options),c=!1,u=!1;this.isPolling=e,this.addRequest=n,this.pause=o,this.play=i,t.stopAll=o,t.startAll=i,setTimeout(s,0)}function c(t,e){return l(function(n,o,r,i){var s=f();s.successFunction=n,s.errorFunction=o,s.notifyFunction=r,s.notifyCatchFunction=i,s.transformResponse=e.transformResponse||u,s.transformResponseError=e.transformResponseError||u;var a=t.protocolClient(),c=a.buildRequestOptions(e),l=t.poll();if(t.monitorLatency()&&(s.startLatencyTimer=t.startLatencyTimer,s.stopLatencyTimer=t.stopLatencyTimer),l){var p=Vt.getPollRunner(l).addRequest(function(){return t.stopPolling?Promise.reject("Service has been requested to stop polling"):d(a,c,s)});s.stopPolling=p.pause,s.isPolling=p.isPolling}else d(a,c,s)})}function u(){}function l(t){function e(t){if(i._notify===u)i._notify=t;else{var e=i._notify;i._notify=function(n){return t(e(n))}}return this}function n(t){if(i._notifyCatch===u)i._notifyCatch=t;else{var e=i._notifyCatch;i._notifyCatch=function(n){return t(e(n))}}return this}function o(t){i._notify(t)}function r(t){i._notifyCatch(t)}var i=new Promise(function(e,n){t(e,n,o,r)});return i._notify=u,i._notifyCatch=u,i.notify=e,i.notifyCatch=n,i}function f(){var t={};return t.stopPolling=u,t.isPolling=u,t.startLatencyTimer=u,t.stopLatencyTimer=u,t}function d(t,e,n){n.startLatencyTimer();var o=t.invoke(e);return o.catch(function(t){n.isPolling()?n.notifyCatchFunction(t):n.errorFunction(t),n.stopLatencyTimer(!0)}),o=o.then(function(t){n.stopLatencyTimer();var e=n.transformResponse(t);if(!e){var o=n.transformResponseError(t);if(o)return n.errorFunction(o,t),void(n.isPolling()&&n.stopPolling())}n.isPolling()?n.notifyFunction(e,t):n.successFunction(e,t)})}function p(t){var e=new h;return o(e,"rest",t),e}function h(){function t(t,e,n,o){return r(this,t,"POST",e,n,o)}function e(t,e,n){return r(this,t,"GET",null,n,e)}function n(t,e,n,o){return r(this,t,"PUT",e,n,o)}function o(t,e,n){return r(this,t,"DELETE",null,n,e)}function r(t,e,n,o,r,i){if(!n||!e)throw new Error("You must configure at least the http method and url");return r=r||{},void 0!==t.baseUrl()&&(e=t.baseUrl()+e),r.url=e,r.body=o,r.method=n,r.queryParams=i,r.hasOwnProperty("transformResponse")||(r.transformResponse=function(t){return t.data}),r.hasOwnProperty("transformResponseError")||(r.transformResponseError=function(t){return t.data}),c(t,r)}this.$post=t,this.$get=e,this.$put=n,this.$delete=o}function g(t){var e=new h;return o(e,"antChain",t),e.getBlockByHash=y,e.getBlockByHeight=w,e.getCurrentBlock=b,e.getCurrentBlockHeight=k,e.getAddressBalance=m,e.getUnspentCoinsByAddress=v,e.getTransactionByTxid=C,e}function m(t){return this.$get("address/get_value/"+t)}function v(t){return this.$get("address/get_unspent/"+t)}function y(t){return this.$get("block/get_block/"+t)}function w(t){return this.$get("block/get_block/"+t)}function b(){return this.$get("block/get_current_block")}function k(){return this.$get("block/get_current_height")}function C(t){return this.$get("tx/get_tx/"+t)}function B(t){var e=new h;return o(e,"antChainXyz",t),e.getAddressBalance=P,e.getAssetTransactionsByAddress=T,e}function P(t){return this.$get("address/info/"+t)}function T(t){return this.$get("address/utxo/"+t)}function S(t){var e=new h;return o(e,"neoNotification",t),e.serviceBaseUrl=e.serviceBaseUrl.replace("http://","https://cors-proxy.f27.ventures/"),e.getCurrentBlockHeight=_,e}function _(){function t(t){return{height:t.data&&t.data.current_height}}return this.$get("1",null,{transformResponse:t})}function R(t){var e=new h;return o(e,"neoScan",t),e.getCurrentBlockHeight=E,e}function E(){return this.$get("get_height")}function L(t){var e=new h;return o(e,"neon",t),e.getCurrentBlockHeight=U,e.getAddressBalance=x,e.getAssetTransactionsByAddress=$,e.getTransactionByTxid=I,e}function U(){function t(t){return{height:t.data&&t.data.block_height}}return this.$get("block/height",null,{transformResponse:t})}function x(t){return this.$get("address/balance/"+t)}function $(t){return this.$get("address/history/"+t)}function I(t){return this.$get("transaction/"+t)}function A(t){var e=new h;return o(e,"pyrest",t),e.getCurrentBlockHeight=N,e}function N(){function t(t){return{height:t.data&&t.data.current_height,version:t.data&&t.data.version}}return this.$get("status",null,{transformResponse:t})}function j(t){var e=new i;return o(e,"node",t),e.dumpPrivKey=O,e.getAccountState=q,e.getApplicationLog=D,e.getAssetState=F,e.getBalance=M,e.getBestBlockHash=H,e.getBlock=z,e.getBlockCount=V,e.getBlockHash=J,e.getBlockSysFee=X,e.getConnectionCount=K,e.getContractState=G,e.getNewAddress=W,e.getRawMemPool=Y,e.getRawTransaction=Q,e.getStorage=Z,e.getTxOut=tt,e.getPeers=et,e.getVersion=nt,e.invoke=ot,e.invokeFunction=rt,e.invokeScript=it,e.listAddress=st,e.sendRawTransaction=at,e.sendToAddress=ct,e.sendMany=ut,e.validateAddress=lt,e}function O(t){return this.$post("dumpprivkey",[t])}function q(t){return this.$post("getaccountstate",[t])}function D(t,e){return this.$post("getapplicationlog",[t,e?1:0])}function F(t){return this.$post("getassetstate",[t])}function M(t){return this.$post("getbalance",[t])}function H(){return this.$post("getbestblockhash",[])}function z(t,e){return this.$post("getblock",[t,e?1:0])}function V(){return this.$post("getblockcount",[])}function J(t){return this.$post("getblockhash",[t])}function X(t){return this.$post("getblocksysfee",[t])}function K(){return this.$post("getconnectioncount",[])}function G(t){return this.$post("getcontractstate",[t])}function W(){return this.$post("getnewaddress",[])}function Y(){return this.$post("getrawmempool",[])}function Q(t,e){return this.$post("getrawtransaction",[t,e?1:0])}function Z(t,e){return this.$post("getstorage",[t,e])}function tt(t,e){return this.$post("gettxout",[t,e])}function et(){return this.$post("getpeers",[])}function nt(){return this.$post("getversion",[])}function ot(t,e){return this.$post("invoke",[t,e])}function rt(t,e,n){return this.$post("invokefunction",[t,e,n])}function it(t){return this.$post("invokescript",[t])}function st(){return this.$post("listaddress",[])}function at(t){return this.$post("sendrawtransaction",[t])}function ct(t,e,n,o){return this.$post("sendtoaddress",[t,e,n,o?1:0])}function ut(t,e,n){var o=[t,e?1:0];return void 0!==n&&o.push(n),this.$post("sendmany",o)}function lt(t){return this.$post("validateaddress",[t])}function ft(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function dt(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&ft(t.slice(0,0))}function pt(t){return"[object Array]"===Kt.call(t)}function ht(t){return"[object ArrayBuffer]"===Kt.call(t)}function gt(t){return"undefined"!=typeof FormData&&t instanceof FormData}function mt(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer}function vt(t){return"string"==typeof t}function yt(t){return"number"==typeof t}function wt(t){return void 0===t}function bt(t){return null!==t&&"object"==typeof t}function kt(t){return"[object Date]"===Kt.call(t)}function Ct(t){return"[object File]"===Kt.call(t)}function Bt(t){return"[object Blob]"===Kt.call(t)}function Pt(t){return"[object Function]"===Kt.call(t)}function Tt(t){return bt(t)&&Pt(t.pipe)}function St(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams}function _t(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}function Rt(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function Et(t,e){if(null!==t&&void 0!==t)if("object"==typeof t||pt(t)||(t=[t]),pt(t))for(var n=0,o=t.length;n<o;n++)e.call(null,t[n],n,t);else for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.call(null,t[r],r,t)}function Lt(){function t(t,n){"object"==typeof e[n]&&"object"==typeof t?e[n]=Lt(e[n],t):e[n]=t}for(var e={},n=0,o=arguments.length;n<o;n++)Et(arguments[n],t);return e}function Ut(t,e,n){return Et(e,function(e,o){t[o]=n&&"function"==typeof e?Jt(e,n):e}),t}function xt(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function $t(){this.message="String contains an invalid character"}function It(t){for(var e,n,o=String(t),r="",i=0,s=oe;o.charAt(0|i)||(s="=",i%1);r+=s.charAt(63&e>>8-i%1*8)){if((n=o.charCodeAt(i+=.75))>255)throw new $t;e=e<<8|n}return r}function At(t,e){!Gt.isUndefined(t)&&Gt.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}function Nt(){this.handlers=[]}function jt(t){t.cancelToken&&t.cancelToken.throwIfRequested()}function Ot(t){this.defaults=t,this.interceptors={request:new fe,response:new fe}}function qt(t){this.message=t}function Dt(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(t){e=t});var n=this;t(function(t){n.reason||(n.reason=new ye(t),e(n.reason))})}function Ft(t){var e=new ve(t),n=Jt(ve.prototype.request,e);return Gt.extend(n,ve.prototype,e),Gt.extend(n,e),n}var Mt,Ht={registerProtocolClient:e},zt=function(){function t(t){var e=new i;return o(e,"node",t),e}function e(t){var e=new s;return o(e,"node",t),e}function n(t){var e=new h;return o(e,"node",t),e}return{createRcpService:t,createIpcService:e,createRestService:n}}(),Vt=function(){function t(t){this.options=t,this.stopAll=function(){},this.startAll=function(){},this._interval=function(){},this._requests=[]}function e(t){if("function"!=typeof t)throw new Error('onInterval(fn) - "fn" must be of type "function"');this._interval=t}function n(t){this._requests.push(t)}function o(e){return new t(e)}function r(e){return e instanceof t}function i(e){return e instanceof t?(e._pollRunner||(e._pollRunner=new a(e)),e._pollRunner):new a(new t(e))}return t.prototype.onInterval=e,t.prototype.run=n,{createPollingPolicy:o,isPollingPolicy:r,getPollRunner:i}}();Vt.factory=zt;var Jt=function(t,e){return function(){for(var n=new Array(arguments.length),o=0;o<n.length;o++)n[o]=arguments[o];return t.apply(e,n)}},Xt=function(t){return null!=t&&(ft(t)||dt(t)||!!t._isBuffer)},Kt=Object.prototype.toString,Gt={isArray:pt,isArrayBuffer:ht,isBuffer:Xt,isFormData:gt,isArrayBufferView:mt,isString:vt,isNumber:yt,isObject:bt,isUndefined:wt,isDate:kt,isFile:Ct,isBlob:Bt,isFunction:Pt,isStream:Tt,isURLSearchParams:St,isStandardBrowserEnv:Rt,forEach:Et,merge:Lt,extend:Ut,trim:_t},Wt=function(t,e){Gt.forEach(t,function(n,o){o!==e&&o.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[o])})},Yt=function(t,e,n,o,r){return t.config=e,n&&(t.code=n),t.request=o,t.response=r,t},Qt=function(t,e,n,o,r){var i=new Error(t);return Yt(i,e,n,o,r)},Zt=function(t,e,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?e(Qt("Request failed with status code "+n.status,n.config,null,n.request,n)):t(n)},te=function(t,e,n){if(!e)return t;var o;if(n)o=n(e);else if(Gt.isURLSearchParams(e))o=e.toString();else{var r=[];Gt.forEach(e,function(t,e){null!==t&&void 0!==t&&(Gt.isArray(t)&&(e+="[]"),Gt.isArray(t)||(t=[t]),Gt.forEach(t,function(t){Gt.isDate(t)?t=t.toISOString():Gt.isObject(t)&&(t=JSON.stringify(t)),r.push(xt(e)+"="+xt(t))}))}),o=r.join("&")}return o&&(t+=(-1===t.indexOf("?")?"?":"&")+o),t},ee=function(t){var e,n,o,r={};return t?(Gt.forEach(t.split("\n"),function(t){o=t.indexOf(":"),e=Gt.trim(t.substr(0,o)).toLowerCase(),n=Gt.trim(t.substr(o+1)),e&&(r[e]=r[e]?r[e]+", "+n:n)}),r):r},ne=Gt.isStandardBrowserEnv()?function(){function t(t){var e=t;return n&&(o.setAttribute("href",e),e=o.href),o.setAttribute("href",e),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var e,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return e=t(window.location.href),function(n){var o=Gt.isString(n)?t(n):n;return o.protocol===e.protocol&&o.host===e.host}}():function(){return function(){return!0}}(),oe="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";$t.prototype=new Error,$t.prototype.code=5,$t.prototype.name="InvalidCharacterError";var re=It,ie=Gt.isStandardBrowserEnv()?function(){return{write:function(t,e,n,o,r,i){var s=[];s.push(t+"="+encodeURIComponent(e)),Gt.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),Gt.isString(o)&&s.push("path="+o),Gt.isString(r)&&s.push("domain="+r),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),se="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||re,ae=function(t){return new Promise(function(e,n){var o=t.data,r=t.headers;Gt.isFormData(o)&&delete r["Content-Type"];var i=new XMLHttpRequest,s="onreadystatechange",a=!1;if("test"===process.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in i||ne(t.url)||(i=new window.XDomainRequest,s="onload",a=!0,i.onprogress=function(){},i.ontimeout=function(){}),t.auth){var c=t.auth.username||"",u=t.auth.password||"";r.Authorization="Basic "+se(c+":"+u)}if(i.open(t.method.toUpperCase(),te(t.url,t.params,t.paramsSerializer),!0),i.timeout=t.timeout,i[s]=function(){if(i&&(4===i.readyState||a)&&(0!==i.status||i.responseURL&&0===i.responseURL.indexOf("file:"))){var o="getAllResponseHeaders"in i?ee(i.getAllResponseHeaders()):null,r=t.responseType&&"text"!==t.responseType?i.response:i.responseText,s={data:r,status:1223===i.status?204:i.status,statusText:1223===i.status?"No Content":i.statusText,headers:o,config:t,request:i};Zt(e,n,s),i=null}},i.onerror=function(){n(Qt("Network Error",t,null,i)),i=null},i.ontimeout=function(){n(Qt("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",i)),i=null},Gt.isStandardBrowserEnv()){var l=ie,f=(t.withCredentials||ne(t.url))&&t.xsrfCookieName?l.read(t.xsrfCookieName):void 0;f&&(r[t.xsrfHeaderName]=f)}if("setRequestHeader"in i&&Gt.forEach(r,function(t,e){void 0===o&&"content-type"===e.toLowerCase()?delete r[e]:i.setRequestHeader(e,t)}),t.withCredentials&&(i.withCredentials=!0),t.responseType)try{i.responseType=t.responseType}catch(e){if("json"!==t.responseType)throw e}"function"==typeof t.onDownloadProgress&&i.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&i.upload&&i.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){i&&(i.abort(),n(t),i=null)}),void 0===o&&(o=null),i.send(o)})},ce={"Content-Type":"application/x-www-form-urlencoded"},ue={adapter:function(){var t;return"undefined"!=typeof XMLHttpRequest?t=ae:"undefined"!=typeof process&&(t=ae),t}(),transformRequest:[function(t,e){return Wt(e,"Content-Type"),Gt.isFormData(t)||Gt.isArrayBuffer(t)||Gt.isBuffer(t)||Gt.isStream(t)||Gt.isFile(t)||Gt.isBlob(t)?t:Gt.isArrayBufferView(t)?t.buffer:Gt.isURLSearchParams(t)?(At(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):Gt.isObject(t)?(At(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}};ue.headers={common:{Accept:"application/json, text/plain, */*"}},Gt.forEach(["delete","get","head"],function(t){ue.headers[t]={}}),Gt.forEach(["post","put","patch"],function(t){ue.headers[t]=Gt.merge(ce)});var le=ue;Nt.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},Nt.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},Nt.prototype.forEach=function(t){Gt.forEach(this.handlers,function(e){null!==e&&t(e)})};var fe=Nt,de=function(t,e,n){return Gt.forEach(n,function(n){t=n(t,e)}),t},pe=function(t){return!(!t||!t.__CANCEL__)},he=function(t){return jt(t),t.headers=t.headers||{},t.data=de(t.data,t.headers,t.transformRequest),t.headers=Gt.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),Gt.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]}),(t.adapter||le.adapter)(t).then(function(e){return jt(t),e.data=de(e.data,e.headers,t.transformResponse),e},function(e){return pe(e)||(jt(t),e&&e.response&&(e.response.data=de(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})},ge=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)},me=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t};Ot.prototype.request=function(t){"string"==typeof t&&(t=Gt.merge({url:arguments[0]},arguments[1])),t=Gt.merge(le,this.defaults,{method:"get"},t),t.method=t.method.toLowerCase(),t.baseURL&&!ge(t.url)&&(t.url=me(t.baseURL,t.url));var e=[he,void 0],n=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n},Gt.forEach(["delete","get","head","options"],function(t){Ot.prototype[t]=function(e,n){return this.request(Gt.merge(n||{},{method:t,url:e}))}}),Gt.forEach(["post","put","patch"],function(t){Ot.prototype[t]=function(e,n,o){return this.request(Gt.merge(o||{},{method:t,url:e,data:n}))}});var ve=Ot;qt.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},qt.prototype.__CANCEL__=!0;var ye=qt;Dt.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},Dt.source=function(){var t;return{token:new Dt(function(e){t=e}),cancel:t}};var we=Dt,be=function(t){return function(e){return t.apply(null,e)}},ke=Ft(le);ke.Axios=ve,ke.create=function(t){return Ft(Gt.merge(le,t))},ke.Cancel=ye,ke.CancelToken=we,ke.isCancel=pe,ke.all=function(t){return Promise.all(t)},ke.spread=be;var Ce=ke,Be=ke;Ce.default=Be;var Pe=Ce;"undefined"!=typeof process||window.process||(window.process={env:{}}),e(function(){function t(t){return Pe(t)}function e(t){return t&&Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&")}function n(t,e){return e.reduce(function(e,n){return t[n]&&(e[n]=t[n]),e},{})}function o(t){var o=t.queryParams&&e(t.queryParams);return o&&(t.url=t.url+"?"+o),t=n(t,["method","url","params","body","data","cache","headers"]),t.headers={},t.headers.Accept="application/json",t.headers["Content-Type"]="application/json",t.body&&(t.body=JSON.stringify(t.body)),t.data&&(t.data=JSON.stringify(t.data)),t}return{invoke:t,buildRequestOptions:o}}()),t.antChain=g,t.antChainXyz=B,t.neoScan=R,t.neon=L,t.pyrest=A,t.node=j,t.rest=p,t.registry=Ht,t.neoNotification=S,t.service=Vt,Object.defineProperty(t,"__esModule",{value:!0})}),function(){"use strict";function t(t){function e(e){return t(e).then(function(t){return t})}function n(t){return t&&Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&")}function o(t,e){return e.reduce(function(e,n){return t[n]&&(e[n]=t[n]),e},{})}function r(t){var e=t.queryParams&&n(t.queryParams);return e&&(t.url=t.url+"?"+e),t=o(t,["method","url","params","body","data","cache","headers"]),t.timeout=5e3,t.headers={},t.headers.Accept="application/json",t.headers["Content-Type"]="text/plain",t.body&&(t.body=JSON.stringify(t.body)),t.data&&(t.data=JSON.stringify(t.data)),t}return{invoke:e,buildRequestOptions:r}}t.$inject=["$http"],angular.module("neo.angularClient",[]).factory("angularClient",t)}(),function(){"use strict";function t(t,e){function n(n){r(),a[n]?(s.netStats=a[n],i()):t({method:"GET",url:"assets/"+n+".json"}).then(function(t){a[n]=e.createFromJson(t.data),s.netStats=a[n],i()})}function o(t){s.currentNetwork=s.networkList[t].label,n(t)}function r(){s.netStats&&s.netStats.stopMonitoring()}function i(){s.netStats.startMonitoring()}var s=this,a={};s.networkList={mainnet:{label:"MainNet"},testnet:{label:"TestNet"}},s.changeNetwork=o,s.currentNetwork="MainNet",o("mainnet")}t.$inject=["$http","NetStatsFactory"],angular.module("neomon.view.controller",[]).controller("ViewController",t)}(),function(){"use strict";function t(t){function e(){this.pollingPolicy=void 0,this.endPoints=void 0,this.lastBlockIntervalId=void 0,this.avgBlockTime="15.0 s",this.bestBlock=0,this.lastBlockTime=0,this.lastBlockLabel="",this.update=0,this.blockDurations=[]}function n(e){angular.isDefined(e.lastBlockIntervalId)&&(t.cancel(e.lastBlockIntervalId),e.lastBlockIntervalId=void 0)}function o(e){e.lastBlockTime=moment(),e.lastBlockIntervalId=t(function(){var t=moment().diff(e.lastBlockTime,"seconds");e.lastBlockLabel=t<60?t+" s ago":moment.duration(t,"s").humanize()+" ago"},500)}function r(t){t.pollingPolicy&&t.pollingPolicy.stopAll()}function i(t){if(t.pollingPolicy)t.pollingPolicy.startAll();else{var e=parseInt(t.pollTime,10)||5e3;t.pollingPolicy=neo.service.createPollingPolicy(e)}t.firstInterval=!0;var n=0;t.pollingPolicy.onInterval(function(){n++,s(t),t.firstInterval&&(t.firstInterval=!1,t.lastBlockTime=moment(),u(t),c(t)),n>10&&(n=0,c(t))}),a(t)}function s(t){t.endPoints.sort(function(t,e){var n=t.peerCount,o=e.peerCount;return t=t.lastBlock||(t.isItUp?1:0),e=e.lastBlock||(e.isItUp?1:0),t!==e?e-t:o-n})}function a(t){t.endPoints.forEach(function(e){if("RPC"===e.type)e.httpService.poll(t.pollingPolicy).getBlockCount().notify(function(n){e.lastBlock=n,e.isItUp=!0;var o=t.bestBlock;if(o=Math.max(o,n),e.latency=e.httpService.latency(),e.hasConnectedBefore=!0,o>t.bestBlock&&(t.bestBlock=o,window.document.title="NEO #"+o.toLocaleString(),!t.firstInterval)){var r=moment();t.blockDurations.push(r.diff(t.lastBlockTime)),t.blockDurations.length>10&&t.blockDurations.shift(),t.lastBlockTime=r,t.blockDurations.length>1&&(t.avgBlockTime=t.blockDurations.reduce(function(t,e){return t+e},0)/t.blockDurations.length/1e3,t.avgBlockTime=t.avgBlockTime.toFixed(1)+" s")}return s(t),e}).notifyCatch(function(){e.isItUp&&(e.isItUp=!1,s(t)),l(e)});else if("REST"===e.type)e.httpService.poll(t.pollingPolicy).getCurrentBlockHeight().notify(function(n){e.lastBlock=n.height,e.latency=e.httpService.latency(),e.hasConnectedBefore=!0,n.hasOwnProperty("version")&&(e.version.useragent=n.version),e.isItUp||(e.isItUp=!0,s(t))}).notifyCatch(function(){e.isItUp&&(e.isItUp=!1,s(t)),l(e)});else if("WEBSOCKETS"===e.type)try{var n=new Date,o=new WebSocket(e.url);o.onopen=function(r){e.latency=new Date-n,e.hasConnectedBefore=!0,e.isItUp||(e.isItUp=!0,s(t)),o.close()},o.onerror=function(n){e.isItUp&&(e.isItUp=!1,s(t)),l(e)}}catch(n){e.isItUp&&(e.isItUp=!1,s(t)),l(e)}else console.log(e.type)})}function c(t){t.endPoints.forEach(function(t){if("RPC"===t.type&&t.isItUp){neo.node(t.url).getConnectionCount().then(function(e){t.peerCount=e,t.isItUp=!0}).catch(function(){t.isItUp=!1})}})}function u(t){t.endPoints.forEach(function(t){if("RPC"===t.type){neo.node(t.url).getVersion().then(function(e){t.version=e}).catch(function(){t.isItUp&&(t.version.useragent="/ < 2.4.1 /")})}})}function l(t){if(t.latency=void 0,t.hasConnectedBefore){var e=Date.now()-t.httpService.lastConnectedTime();t.lastTimeConnected=e<60?e+" s ago":moment.duration(e,"ms").humanize()+" ago"}}function f(t){var n=new e;return n.name=t.name,n.pollTime=t.pollTime,n.endPoints=t.sites.map(function(t){var e,o,r=t.type.toUpperCase();if("RPC"===r)e=t.protocol+"://"+t.url,t.url.indexOf(":")<0&&(t.port?e+=":"+t.port:"http"===t.protocol?e+="MainNet"===n.name?":10332":":20332":e+="MainNet"===n.name?":10331":":20331"),o=neo.node({baseUrl:e,monitorLatency:!0});else if("REST"===r){e=t.url;var i=neo[t.service];if(!i)throw new Error("Unknown REST Service: "+t.service);o=i({baseUrl:e,monitorLatency:!0})}else{if("WEBSOCKETS"!==r)throw new Error("Unknown endpoint type: "+t.type);e=t.url}return{name:e,type:r,isItUp:!1,peerCount:" - ",version:{useragent:" - "},location:t.location,url:e,locale:t.locale,httpService:o}}),n}return e.prototype.stopMonitoring=function(){n(this),r(this)},e.prototype.startMonitoring=function(){o(this),i(this)},{createFromJson:f}}t.$inject=["$interval"],angular.module("neomon.netstats.factory",[]).factory("NetStatsFactory",t)}(),function(){"use strict";function t(){function t(t,e,n){var o=t.name||e[0].textContent;if(!o)return void(e[0].textContent="SVG");var r={prefix:"#tsvg-",class:"tsvg",role:"img"};n.class&&(r.class+=" "+n.class);var i=document.createElement("svg"),s=document.createElement("use");i.setAttribute("role",r.role),i.setAttribute("class",r.class),s.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),s.setAttribute("xlink:href",r.prefix+o.toLowerCase()),i.appendChild(s),e[0].outerHTML=i.outerHTML}return{restrict:"E",scope:{name:"@"},link:t}}angular.module("neomon.directives.icon",[]).directive("neoIcon",t)}(),function(){"use strict";angular.module("neomon.filters",[]).filter("blockTime",function(){return function(t){if(0===t)return"∞";var e=(new Date).getTime(),n=Math.floor((e-t)/1e3);return n<60?Math.round(n)+" s ago":moment.duration(Math.round(n),"s").humanize()+" ago"}}).filter("avgTime",function(){return function(t){return t<60?parseFloat(t).toFixed(2)+" s":moment.duration(Math.round(t),"s").humanize()}}).filter("statusClass",function(){return function(t,e){return t.isItUp?e-t.lastBlock<3||"WEBSOCKETS"===t.type?"color-success":e-t.lastBlock<=1e3?"color-warning":"color-orange":"color-gray"}})}(),function(){"use strict";angular.module("neomon",["angularMoment","neo.angularClient","neomon.filters","neomon.directives.icon","neomon.netstats.factory","neomon.view.controller"])}(),function(){"use strict";function t(t,e,n){"https"===e.protocol()&&(t.location="http://monitor.cityofzion.io/"),neo.registry.registerProtocolClient(n)}t.$inject=["$window","$location","angularClient"],angular.module("neomon").run(t)}(),angular.module("neomon").run(["$templateCache",function(t){
t.put("app/view.html",'<div class="neo-header"></div> <div class="page-header"> <span class="neo-name">NEO</span> <span class="page-title">Network Status Monitor</span> <span class="page-config"> <span class="dropdown"> <a tabindex="0"aria-haspopup="true"aria-label="Change network"class="network-switch"ng-click="vm.dropdownNode = !vm.dropdownNode"> Monitoring Network: {{ vm.currentNetwork }} <i class="caret"></i> </a> <ul class="dropdown-menu"ng-show="vm.dropdownNode"> <li ng-repeat="(id, network) in vm.networkList"ng-class="{true:\'active\'}[curNode == key]"ng-click="vm.changeNetwork(id); vm.dropdownNode = false;"> <a>{{ network.label }}</a> </li> </ul> </span> </span> </div> <section> <div class="page-body"> <div class="stats-network-row"> <div class="flex-grow"></div> <div class="stats-network-card"> <div><i class="fa fa-cube fa-5x"></i></div> <div class="stats-network-card-details"> <div class="small-title">Best Block</div> <div class="big-details"ng-show="vm.netStats.bestBlock">#{{ vm.netStats.bestBlock.toLocaleString() }}</div> </div> </div> <div class="stats-network-card"> <div class="fa-stack fa-3x hourglass-spin"> <i class="fa fa-stack-1x fa-hourglass-start"></i> <i class="fa fa-stack-1x fa-hourglass-half"></i> <i class="fa fa-stack-1x fa-hourglass-end"></i> <i class="fa fa-stack-1x fa-hourglass-end spin"></i> </div> <div class="stats-network-card-details"> <div class="small-title">Last Block</div> <div class="big-details"> {{ vm.netStats.lastBlockLabel }} </div> <div class="big-details"style="height: 1px; visibility: hidden">999 s ago</div> </div> </div> <div class="stats-network-card"> <div><i class="fa fa-leaf fa-5x"></i></div> <div class="stats-network-card-details"> <div class="small-title">Avg Block Time</div> <div class="big-details">{{ vm.netStats.avgBlockTime }}</div> </div> </div> <div class="flex-grow"></div> </div> <table class="stats-table"> <thead class="stats-table-header"> <tr> <th class="stats-table__header"style="width: 20px"> </th> <th class="stats-table__header"style="width: 10%"> Endpoint </th> <th class="stats-table__header"style="width: 10%"> Type </th> <th title="Latency in milliseconds"class="stats-table__header"style="width: 10%"> Latency (ms) </th> <th class="stats-table__header"style="width: 10%"> Version </th> <th class="stats-table__header"style="width: 220px"> Is It Up? <i class="fa fa-toggle-on stats-table__icon"></i> </th> <th class="stats-table__header"style="width: 10%"> Block Height <i class="fa fa-th-large stats-table__icon"></i> </th> <th class="stats-table__header"style="width: 10%"> Peers <i class="fa fa-users stats-table__icon"></i> </th> </tr> </thead> <tbody class="stats-table-body"> <tr ng-repeat="endPoint in vm.netStats.endPoints"class="{{ endPoint | statusClass : vm.netStats.bestBlock }}"> <td class="stats-table__cell"title="{{ endPoint.location }}"><neo-icon class="icon-button__tsvg"name="{{ \'flag-\' + endPoint.locale }}"></neo-icon></td> <td class="stats-table__cell">{{ endPoint.name }}</td> <td class="stats-table__cell">{{ endPoint.type }}</td> <td class="stats-table__cell">{{ endPoint.latency }}</td> <td class="stats-table__cell">{{ (endPoint.version && endPoint.version.useragent) || \'?\' }}</td> <td class="stats-table__cell"> <div ng-if="endPoint.isItUp">yes</div> <div class="color-offline"ng-if="!endPoint.isItUp"> <span>unreachable</span> <span ng-if="endPoint.lastTimeConnected"> - Last connected {{ endPoint.lastTimeConnected }} </span> </div> </td> <td class="stats-table__cell"> <span>#{{ endPoint.lastBlock.toLocaleString() }}</span> <span ng-if="vm.netStats.bestBlock > endPoint.lastBlock"> ({{(endPoint.lastBlock - vm.netStats.bestBlock).toLocaleString() }})</span> </td> <td class="stats-table__cell">{{ endPoint.peerCount }}</td> </tr> </tbody> </table> </div> </section>')}]);