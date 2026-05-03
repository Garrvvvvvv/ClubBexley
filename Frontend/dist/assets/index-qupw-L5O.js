(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))c(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const p of f.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&c(p)}).observe(document,{childList:!0,subtree:!0});function s(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function c(d){if(d.ep)return;d.ep=!0;const f=s(d);fetch(d.href,f)}})();function Gx(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var Sc={exports:{}},or={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x0;function Yx(){if(x0)return or;x0=1;var l=Symbol.for("react.transitional.element"),i=Symbol.for("react.fragment");function s(c,d,f){var p=null;if(f!==void 0&&(p=""+f),d.key!==void 0&&(p=""+d.key),"key"in d){f={};for(var h in d)h!=="key"&&(f[h]=d[h])}else f=d;return d=f.ref,{$$typeof:l,type:c,key:p,ref:d!==void 0?d:null,props:f}}return or.Fragment=i,or.jsx=s,or.jsxs=s,or}var b0;function Xx(){return b0||(b0=1,Sc.exports=Yx()),Sc.exports}var r=Xx(),Ec={exports:{}},ge={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v0;function Vx(){if(v0)return ge;v0=1;var l=Symbol.for("react.transitional.element"),i=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),p=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),b=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),N=Symbol.iterator;function _(k){return k===null||typeof k!="object"?null:(k=N&&k[N]||k["@@iterator"],typeof k=="function"?k:null)}var H={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S=Object.assign,A={};function y(k,Q,j){this.props=k,this.context=Q,this.refs=A,this.updater=j||H}y.prototype.isReactComponent={},y.prototype.setState=function(k,Q){if(typeof k!="object"&&typeof k!="function"&&k!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,k,Q,"setState")},y.prototype.forceUpdate=function(k){this.updater.enqueueForceUpdate(this,k,"forceUpdate")};function M(){}M.prototype=y.prototype;function q(k,Q,j){this.props=k,this.context=Q,this.refs=A,this.updater=j||H}var C=q.prototype=new M;C.constructor=q,S(C,y.prototype),C.isPureReactComponent=!0;var F=Array.isArray,P={H:null,A:null,T:null,S:null,V:null},ne=Object.prototype.hasOwnProperty;function Y(k,Q,j,D,$,le){return j=le.ref,{$$typeof:l,type:k,key:Q,ref:j!==void 0?j:null,props:le}}function I(k,Q){return Y(k.type,Q,void 0,void 0,void 0,k.props)}function W(k){return typeof k=="object"&&k!==null&&k.$$typeof===l}function ie(k){var Q={"=":"=0",":":"=2"};return"$"+k.replace(/[=:]/g,function(j){return Q[j]})}var de=/\/+/g;function oe(k,Q){return typeof k=="object"&&k!==null&&k.key!=null?ie(""+k.key):Q.toString(36)}function Te(){}function J(k){switch(k.status){case"fulfilled":return k.value;case"rejected":throw k.reason;default:switch(typeof k.status=="string"?k.then(Te,Te):(k.status="pending",k.then(function(Q){k.status==="pending"&&(k.status="fulfilled",k.value=Q)},function(Q){k.status==="pending"&&(k.status="rejected",k.reason=Q)})),k.status){case"fulfilled":return k.value;case"rejected":throw k.reason}}throw k}function ee(k,Q,j,D,$){var le=typeof k;(le==="undefined"||le==="boolean")&&(k=null);var me=!1;if(k===null)me=!0;else switch(le){case"bigint":case"string":case"number":me=!0;break;case"object":switch(k.$$typeof){case l:case i:me=!0;break;case v:return me=k._init,ee(me(k._payload),Q,j,D,$)}}if(me)return $=$(k),me=D===""?"."+oe(k,0):D,F($)?(j="",me!=null&&(j=me.replace(de,"$&/")+"/"),ee($,Q,j,"",function(ut){return ut})):$!=null&&(W($)&&($=I($,j+($.key==null||k&&k.key===$.key?"":(""+$.key).replace(de,"$&/")+"/")+me)),Q.push($)),1;me=0;var et=D===""?".":D+":";if(F(k))for(var Ee=0;Ee<k.length;Ee++)D=k[Ee],le=et+oe(D,Ee),me+=ee(D,Q,j,le,$);else if(Ee=_(k),typeof Ee=="function")for(k=Ee.call(k),Ee=0;!(D=k.next()).done;)D=D.value,le=et+oe(D,Ee++),me+=ee(D,Q,j,le,$);else if(le==="object"){if(typeof k.then=="function")return ee(J(k),Q,j,D,$);throw Q=String(k),Error("Objects are not valid as a React child (found: "+(Q==="[object Object]"?"object with keys {"+Object.keys(k).join(", ")+"}":Q)+"). If you meant to render a collection of children, use an array instead.")}return me}function R(k,Q,j){if(k==null)return k;var D=[],$=0;return ee(k,D,"","",function(le){return Q.call(j,le,$++)}),D}function K(k){if(k._status===-1){var Q=k._result;Q=Q(),Q.then(function(j){(k._status===0||k._status===-1)&&(k._status=1,k._result=j)},function(j){(k._status===0||k._status===-1)&&(k._status=2,k._result=j)}),k._status===-1&&(k._status=0,k._result=Q)}if(k._status===1)return k._result.default;throw k._result}var te=typeof reportError=="function"?reportError:function(k){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof k=="object"&&k!==null&&typeof k.message=="string"?String(k.message):String(k),error:k});if(!window.dispatchEvent(Q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",k);return}console.error(k)};function he(){}return ge.Children={map:R,forEach:function(k,Q,j){R(k,function(){Q.apply(this,arguments)},j)},count:function(k){var Q=0;return R(k,function(){Q++}),Q},toArray:function(k){return R(k,function(Q){return Q})||[]},only:function(k){if(!W(k))throw Error("React.Children.only expected to receive a single React element child.");return k}},ge.Component=y,ge.Fragment=s,ge.Profiler=d,ge.PureComponent=q,ge.StrictMode=c,ge.Suspense=b,ge.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,ge.__COMPILER_RUNTIME={__proto__:null,c:function(k){return P.H.useMemoCache(k)}},ge.cache=function(k){return function(){return k.apply(null,arguments)}},ge.cloneElement=function(k,Q,j){if(k==null)throw Error("The argument must be a React element, but you passed "+k+".");var D=S({},k.props),$=k.key,le=void 0;if(Q!=null)for(me in Q.ref!==void 0&&(le=void 0),Q.key!==void 0&&($=""+Q.key),Q)!ne.call(Q,me)||me==="key"||me==="__self"||me==="__source"||me==="ref"&&Q.ref===void 0||(D[me]=Q[me]);var me=arguments.length-2;if(me===1)D.children=j;else if(1<me){for(var et=Array(me),Ee=0;Ee<me;Ee++)et[Ee]=arguments[Ee+2];D.children=et}return Y(k.type,$,void 0,void 0,le,D)},ge.createContext=function(k){return k={$$typeof:p,_currentValue:k,_currentValue2:k,_threadCount:0,Provider:null,Consumer:null},k.Provider=k,k.Consumer={$$typeof:f,_context:k},k},ge.createElement=function(k,Q,j){var D,$={},le=null;if(Q!=null)for(D in Q.key!==void 0&&(le=""+Q.key),Q)ne.call(Q,D)&&D!=="key"&&D!=="__self"&&D!=="__source"&&($[D]=Q[D]);var me=arguments.length-2;if(me===1)$.children=j;else if(1<me){for(var et=Array(me),Ee=0;Ee<me;Ee++)et[Ee]=arguments[Ee+2];$.children=et}if(k&&k.defaultProps)for(D in me=k.defaultProps,me)$[D]===void 0&&($[D]=me[D]);return Y(k,le,void 0,void 0,null,$)},ge.createRef=function(){return{current:null}},ge.forwardRef=function(k){return{$$typeof:h,render:k}},ge.isValidElement=W,ge.lazy=function(k){return{$$typeof:v,_payload:{_status:-1,_result:k},_init:K}},ge.memo=function(k,Q){return{$$typeof:g,type:k,compare:Q===void 0?null:Q}},ge.startTransition=function(k){var Q=P.T,j={};P.T=j;try{var D=k(),$=P.S;$!==null&&$(j,D),typeof D=="object"&&D!==null&&typeof D.then=="function"&&D.then(he,te)}catch(le){te(le)}finally{P.T=Q}},ge.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},ge.use=function(k){return P.H.use(k)},ge.useActionState=function(k,Q,j){return P.H.useActionState(k,Q,j)},ge.useCallback=function(k,Q){return P.H.useCallback(k,Q)},ge.useContext=function(k){return P.H.useContext(k)},ge.useDebugValue=function(){},ge.useDeferredValue=function(k,Q){return P.H.useDeferredValue(k,Q)},ge.useEffect=function(k,Q,j){var D=P.H;if(typeof j=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return D.useEffect(k,Q)},ge.useId=function(){return P.H.useId()},ge.useImperativeHandle=function(k,Q,j){return P.H.useImperativeHandle(k,Q,j)},ge.useInsertionEffect=function(k,Q){return P.H.useInsertionEffect(k,Q)},ge.useLayoutEffect=function(k,Q){return P.H.useLayoutEffect(k,Q)},ge.useMemo=function(k,Q){return P.H.useMemo(k,Q)},ge.useOptimistic=function(k,Q){return P.H.useOptimistic(k,Q)},ge.useReducer=function(k,Q,j){return P.H.useReducer(k,Q,j)},ge.useRef=function(k){return P.H.useRef(k)},ge.useState=function(k){return P.H.useState(k)},ge.useSyncExternalStore=function(k,Q,j){return P.H.useSyncExternalStore(k,Q,j)},ge.useTransition=function(){return P.H.useTransition()},ge.version="19.1.0",ge}var y0;function cu(){return y0||(y0=1,Ec.exports=Vx()),Ec.exports}var w=cu();const ve=Gx(w);var kc={exports:{}},sr={},Tc={exports:{}},_c={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var w0;function Qx(){return w0||(w0=1,function(l){function i(R,K){var te=R.length;R.push(K);e:for(;0<te;){var he=te-1>>>1,k=R[he];if(0<d(k,K))R[he]=K,R[te]=k,te=he;else break e}}function s(R){return R.length===0?null:R[0]}function c(R){if(R.length===0)return null;var K=R[0],te=R.pop();if(te!==K){R[0]=te;e:for(var he=0,k=R.length,Q=k>>>1;he<Q;){var j=2*(he+1)-1,D=R[j],$=j+1,le=R[$];if(0>d(D,te))$<k&&0>d(le,D)?(R[he]=le,R[$]=te,he=$):(R[he]=D,R[j]=te,he=j);else if($<k&&0>d(le,te))R[he]=le,R[$]=te,he=$;else break e}}return K}function d(R,K){var te=R.sortIndex-K.sortIndex;return te!==0?te:R.id-K.id}if(l.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;l.unstable_now=function(){return f.now()}}else{var p=Date,h=p.now();l.unstable_now=function(){return p.now()-h}}var b=[],g=[],v=1,N=null,_=3,H=!1,S=!1,A=!1,y=!1,M=typeof setTimeout=="function"?setTimeout:null,q=typeof clearTimeout=="function"?clearTimeout:null,C=typeof setImmediate<"u"?setImmediate:null;function F(R){for(var K=s(g);K!==null;){if(K.callback===null)c(g);else if(K.startTime<=R)c(g),K.sortIndex=K.expirationTime,i(b,K);else break;K=s(g)}}function P(R){if(A=!1,F(R),!S)if(s(b)!==null)S=!0,ne||(ne=!0,oe());else{var K=s(g);K!==null&&ee(P,K.startTime-R)}}var ne=!1,Y=-1,I=5,W=-1;function ie(){return y?!0:!(l.unstable_now()-W<I)}function de(){if(y=!1,ne){var R=l.unstable_now();W=R;var K=!0;try{e:{S=!1,A&&(A=!1,q(Y),Y=-1),H=!0;var te=_;try{t:{for(F(R),N=s(b);N!==null&&!(N.expirationTime>R&&ie());){var he=N.callback;if(typeof he=="function"){N.callback=null,_=N.priorityLevel;var k=he(N.expirationTime<=R);if(R=l.unstable_now(),typeof k=="function"){N.callback=k,F(R),K=!0;break t}N===s(b)&&c(b),F(R)}else c(b);N=s(b)}if(N!==null)K=!0;else{var Q=s(g);Q!==null&&ee(P,Q.startTime-R),K=!1}}break e}finally{N=null,_=te,H=!1}K=void 0}}finally{K?oe():ne=!1}}}var oe;if(typeof C=="function")oe=function(){C(de)};else if(typeof MessageChannel<"u"){var Te=new MessageChannel,J=Te.port2;Te.port1.onmessage=de,oe=function(){J.postMessage(null)}}else oe=function(){M(de,0)};function ee(R,K){Y=M(function(){R(l.unstable_now())},K)}l.unstable_IdlePriority=5,l.unstable_ImmediatePriority=1,l.unstable_LowPriority=4,l.unstable_NormalPriority=3,l.unstable_Profiling=null,l.unstable_UserBlockingPriority=2,l.unstable_cancelCallback=function(R){R.callback=null},l.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<R?Math.floor(1e3/R):5},l.unstable_getCurrentPriorityLevel=function(){return _},l.unstable_next=function(R){switch(_){case 1:case 2:case 3:var K=3;break;default:K=_}var te=_;_=K;try{return R()}finally{_=te}},l.unstable_requestPaint=function(){y=!0},l.unstable_runWithPriority=function(R,K){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var te=_;_=R;try{return K()}finally{_=te}},l.unstable_scheduleCallback=function(R,K,te){var he=l.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?he+te:he):te=he,R){case 1:var k=-1;break;case 2:k=250;break;case 5:k=1073741823;break;case 4:k=1e4;break;default:k=5e3}return k=te+k,R={id:v++,callback:K,priorityLevel:R,startTime:te,expirationTime:k,sortIndex:-1},te>he?(R.sortIndex=te,i(g,R),s(b)===null&&R===s(g)&&(A?(q(Y),Y=-1):A=!0,ee(P,te-he))):(R.sortIndex=k,i(b,R),S||H||(S=!0,ne||(ne=!0,oe()))),R},l.unstable_shouldYield=ie,l.unstable_wrapCallback=function(R){var K=_;return function(){var te=_;_=K;try{return R.apply(this,arguments)}finally{_=te}}}}(_c)),_c}var j0;function Zx(){return j0||(j0=1,Tc.exports=Qx()),Tc.exports}var Cc={exports:{}},it={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var N0;function $x(){if(N0)return it;N0=1;var l=cu();function i(b){var g="https://react.dev/errors/"+b;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)g+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+b+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var c={d:{f:s,r:function(){throw Error(i(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},d=Symbol.for("react.portal");function f(b,g,v){var N=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:d,key:N==null?null:""+N,children:b,containerInfo:g,implementation:v}}var p=l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(b,g){if(b==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return it.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,it.createPortal=function(b,g){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(i(299));return f(b,g,null,v)},it.flushSync=function(b){var g=p.T,v=c.p;try{if(p.T=null,c.p=2,b)return b()}finally{p.T=g,c.p=v,c.d.f()}},it.preconnect=function(b,g){typeof b=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,c.d.C(b,g))},it.prefetchDNS=function(b){typeof b=="string"&&c.d.D(b)},it.preinit=function(b,g){if(typeof b=="string"&&g&&typeof g.as=="string"){var v=g.as,N=h(v,g.crossOrigin),_=typeof g.integrity=="string"?g.integrity:void 0,H=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;v==="style"?c.d.S(b,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:N,integrity:_,fetchPriority:H}):v==="script"&&c.d.X(b,{crossOrigin:N,integrity:_,fetchPriority:H,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},it.preinitModule=function(b,g){if(typeof b=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var v=h(g.as,g.crossOrigin);c.d.M(b,{crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0})}}else g==null&&c.d.M(b)},it.preload=function(b,g){if(typeof b=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var v=g.as,N=h(v,g.crossOrigin);c.d.L(b,v,{crossOrigin:N,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},it.preloadModule=function(b,g){if(typeof b=="string")if(g){var v=h(g.as,g.crossOrigin);c.d.m(b,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0})}else c.d.m(b)},it.requestFormReset=function(b){c.d.r(b)},it.unstable_batchedUpdates=function(b,g){return b(g)},it.useFormState=function(b,g,v){return p.H.useFormState(b,g,v)},it.useFormStatus=function(){return p.H.useHostTransitionStatus()},it.version="19.1.0",it}var S0;function Px(){if(S0)return Cc.exports;S0=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(i){console.error(i)}}return l(),Cc.exports=$x(),Cc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E0;function Kx(){if(E0)return sr;E0=1;var l=Zx(),i=cu(),s=Px();function c(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function f(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function p(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function h(e){if(f(e)!==e)throw Error(c(188))}function b(e){var t=e.alternate;if(!t){if(t=f(e),t===null)throw Error(c(188));return t!==e?null:e}for(var a=e,n=t;;){var o=a.return;if(o===null)break;var u=o.alternate;if(u===null){if(n=o.return,n!==null){a=n;continue}break}if(o.child===u.child){for(u=o.child;u;){if(u===a)return h(o),e;if(u===n)return h(o),t;u=u.sibling}throw Error(c(188))}if(a.return!==n.return)a=o,n=u;else{for(var m=!1,x=o.child;x;){if(x===a){m=!0,a=o,n=u;break}if(x===n){m=!0,n=o,a=u;break}x=x.sibling}if(!m){for(x=u.child;x;){if(x===a){m=!0,a=u,n=o;break}if(x===n){m=!0,n=u,a=o;break}x=x.sibling}if(!m)throw Error(c(189))}}if(a.alternate!==n)throw Error(c(190))}if(a.tag!==3)throw Error(c(188));return a.stateNode.current===a?e:t}function g(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=g(e),t!==null)return t;e=e.sibling}return null}var v=Object.assign,N=Symbol.for("react.element"),_=Symbol.for("react.transitional.element"),H=Symbol.for("react.portal"),S=Symbol.for("react.fragment"),A=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),M=Symbol.for("react.provider"),q=Symbol.for("react.consumer"),C=Symbol.for("react.context"),F=Symbol.for("react.forward_ref"),P=Symbol.for("react.suspense"),ne=Symbol.for("react.suspense_list"),Y=Symbol.for("react.memo"),I=Symbol.for("react.lazy"),W=Symbol.for("react.activity"),ie=Symbol.for("react.memo_cache_sentinel"),de=Symbol.iterator;function oe(e){return e===null||typeof e!="object"?null:(e=de&&e[de]||e["@@iterator"],typeof e=="function"?e:null)}var Te=Symbol.for("react.client.reference");function J(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Te?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case S:return"Fragment";case y:return"Profiler";case A:return"StrictMode";case P:return"Suspense";case ne:return"SuspenseList";case W:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case H:return"Portal";case C:return(e.displayName||"Context")+".Provider";case q:return(e._context.displayName||"Context")+".Consumer";case F:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Y:return t=e.displayName||null,t!==null?t:J(e.type)||"Memo";case I:t=e._payload,e=e._init;try{return J(e(t))}catch{}}return null}var ee=Array.isArray,R=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,te={pending:!1,data:null,method:null,action:null},he=[],k=-1;function Q(e){return{current:e}}function j(e){0>k||(e.current=he[k],he[k]=null,k--)}function D(e,t){k++,he[k]=e.current,e.current=t}var $=Q(null),le=Q(null),me=Q(null),et=Q(null);function Ee(e,t){switch(D(me,t),D(le,e),D($,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Qp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Qp(t),e=Zp(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}j($),D($,e)}function ut(){j($),j(le),j(me)}function dt(e){e.memoizedState!==null&&D(et,e);var t=$.current,a=Zp(t,e.type);t!==a&&(D(le,e),D($,a))}function zt(e){le.current===e&&(j($),j(le)),et.current===e&&(j(et),ar._currentValue=te)}var vn=Object.prototype.hasOwnProperty,uo=l.unstable_scheduleCallback,fo=l.unstable_cancelCallback,vh=l.unstable_shouldYield,yh=l.unstable_requestPaint,Kt=l.unstable_now,wh=l.unstable_getCurrentPriorityLevel,Su=l.unstable_ImmediatePriority,Eu=l.unstable_UserBlockingPriority,Tr=l.unstable_NormalPriority,jh=l.unstable_LowPriority,ku=l.unstable_IdlePriority,Nh=l.log,Sh=l.unstable_setDisableYieldValue,ul=null,yt=null;function ja(e){if(typeof Nh=="function"&&Sh(e),yt&&typeof yt.setStrictMode=="function")try{yt.setStrictMode(ul,e)}catch{}}var wt=Math.clz32?Math.clz32:Th,Eh=Math.log,kh=Math.LN2;function Th(e){return e>>>=0,e===0?32:31-(Eh(e)/kh|0)|0}var _r=256,Cr=4194304;function Pa(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function zr(e,t,a){var n=e.pendingLanes;if(n===0)return 0;var o=0,u=e.suspendedLanes,m=e.pingedLanes;e=e.warmLanes;var x=n&134217727;return x!==0?(n=x&~u,n!==0?o=Pa(n):(m&=x,m!==0?o=Pa(m):a||(a=x&~e,a!==0&&(o=Pa(a))))):(x=n&~u,x!==0?o=Pa(x):m!==0?o=Pa(m):a||(a=n&~e,a!==0&&(o=Pa(a)))),o===0?0:t!==0&&t!==o&&(t&u)===0&&(u=o&-o,a=t&-t,u>=a||u===32&&(a&4194048)!==0)?t:o}function dl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function _h(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Tu(){var e=_r;return _r<<=1,(_r&4194048)===0&&(_r=256),e}function _u(){var e=Cr;return Cr<<=1,(Cr&62914560)===0&&(Cr=4194304),e}function po(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function fl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ch(e,t,a,n,o,u){var m=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var x=e.entanglements,E=e.expirationTimes,O=e.hiddenUpdates;for(a=m&~a;0<a;){var X=31-wt(a),Z=1<<X;x[X]=0,E[X]=-1;var U=O[X];if(U!==null)for(O[X]=null,X=0;X<U.length;X++){var B=U[X];B!==null&&(B.lane&=-536870913)}a&=~Z}n!==0&&Cu(e,n,0),u!==0&&o===0&&e.tag!==0&&(e.suspendedLanes|=u&~(m&~t))}function Cu(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-wt(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|a&4194090}function zu(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var n=31-wt(a),o=1<<n;o&t|e[n]&t&&(e[n]|=t),a&=~o}}function mo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ho(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Au(){var e=K.p;return e!==0?e:(e=window.event,e===void 0?32:d0(e.type))}function zh(e,t){var a=K.p;try{return K.p=e,t()}finally{K.p=a}}var Na=Math.random().toString(36).slice(2),lt="__reactFiber$"+Na,ft="__reactProps$"+Na,yn="__reactContainer$"+Na,go="__reactEvents$"+Na,Ah="__reactListeners$"+Na,Rh="__reactHandles$"+Na,Ru="__reactResources$"+Na,pl="__reactMarker$"+Na;function xo(e){delete e[lt],delete e[ft],delete e[go],delete e[Ah],delete e[Rh]}function wn(e){var t=e[lt];if(t)return t;for(var a=e.parentNode;a;){if(t=a[yn]||a[lt]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Jp(e);e!==null;){if(a=e[lt])return a;e=Jp(e)}return t}e=a,a=e.parentNode}return null}function jn(e){if(e=e[lt]||e[yn]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function ml(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(c(33))}function Nn(e){var t=e[Ru];return t||(t=e[Ru]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Je(e){e[pl]=!0}var Lu=new Set,Ou={};function Ka(e,t){Sn(e,t),Sn(e+"Capture",t)}function Sn(e,t){for(Ou[e]=t,e=0;e<t.length;e++)Lu.add(t[e])}var Lh=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Du={},Mu={};function Oh(e){return vn.call(Mu,e)?!0:vn.call(Du,e)?!1:Lh.test(e)?Mu[e]=!0:(Du[e]=!0,!1)}function Ar(e,t,a){if(Oh(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Rr(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function aa(e,t,a,n){if(n===null)e.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+n)}}var bo,Uu;function En(e){if(bo===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);bo=t&&t[1]||"",Uu=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+bo+e+Uu}var vo=!1;function yo(e,t){if(!e||vo)return"";vo=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var Z=function(){throw Error()};if(Object.defineProperty(Z.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Z,[])}catch(B){var U=B}Reflect.construct(e,[],Z)}else{try{Z.call()}catch(B){U=B}e.call(Z.prototype)}}else{try{throw Error()}catch(B){U=B}(Z=e())&&typeof Z.catch=="function"&&Z.catch(function(){})}}catch(B){if(B&&U&&typeof B.stack=="string")return[B.stack,U.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=n.DetermineComponentFrameRoot(),m=u[0],x=u[1];if(m&&x){var E=m.split(`
`),O=x.split(`
`);for(o=n=0;n<E.length&&!E[n].includes("DetermineComponentFrameRoot");)n++;for(;o<O.length&&!O[o].includes("DetermineComponentFrameRoot");)o++;if(n===E.length||o===O.length)for(n=E.length-1,o=O.length-1;1<=n&&0<=o&&E[n]!==O[o];)o--;for(;1<=n&&0<=o;n--,o--)if(E[n]!==O[o]){if(n!==1||o!==1)do if(n--,o--,0>o||E[n]!==O[o]){var X=`
`+E[n].replace(" at new "," at ");return e.displayName&&X.includes("<anonymous>")&&(X=X.replace("<anonymous>",e.displayName)),X}while(1<=n&&0<=o);break}}}finally{vo=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?En(a):""}function Dh(e){switch(e.tag){case 26:case 27:case 5:return En(e.type);case 16:return En("Lazy");case 13:return En("Suspense");case 19:return En("SuspenseList");case 0:case 15:return yo(e.type,!1);case 11:return yo(e.type.render,!1);case 1:return yo(e.type,!0);case 31:return En("Activity");default:return""}}function Bu(e){try{var t="";do t+=Dh(e),e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function At(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Hu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Mh(e){var t=Hu(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var o=a.get,u=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(m){n=""+m,u.call(this,m)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(m){n=""+m},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Lr(e){e._valueTracker||(e._valueTracker=Mh(e))}function qu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),n="";return e&&(n=Hu(e)?e.checked?"true":"false":e.value),e=n,e!==a?(t.setValue(e),!0):!1}function Or(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Uh=/[\n"\\]/g;function Rt(e){return e.replace(Uh,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function wo(e,t,a,n,o,u,m,x){e.name="",m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"?e.type=m:e.removeAttribute("type"),t!=null?m==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+At(t)):e.value!==""+At(t)&&(e.value=""+At(t)):m!=="submit"&&m!=="reset"||e.removeAttribute("value"),t!=null?jo(e,m,At(t)):a!=null?jo(e,m,At(a)):n!=null&&e.removeAttribute("value"),o==null&&u!=null&&(e.defaultChecked=!!u),o!=null&&(e.checked=o&&typeof o!="function"&&typeof o!="symbol"),x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"?e.name=""+At(x):e.removeAttribute("name")}function Gu(e,t,a,n,o,u,m,x){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.type=u),t!=null||a!=null){if(!(u!=="submit"&&u!=="reset"||t!=null))return;a=a!=null?""+At(a):"",t=t!=null?""+At(t):a,x||t===e.value||(e.value=t),e.defaultValue=t}n=n??o,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=x?e.checked:!!n,e.defaultChecked=!!n,m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(e.name=m)}function jo(e,t,a){t==="number"&&Or(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function kn(e,t,a,n){if(e=e.options,t){t={};for(var o=0;o<a.length;o++)t["$"+a[o]]=!0;for(a=0;a<e.length;a++)o=t.hasOwnProperty("$"+e[a].value),e[a].selected!==o&&(e[a].selected=o),o&&n&&(e[a].defaultSelected=!0)}else{for(a=""+At(a),t=null,o=0;o<e.length;o++){if(e[o].value===a){e[o].selected=!0,n&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Yu(e,t,a){if(t!=null&&(t=""+At(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+At(a):""}function Xu(e,t,a,n){if(t==null){if(n!=null){if(a!=null)throw Error(c(92));if(ee(n)){if(1<n.length)throw Error(c(93));n=n[0]}a=n}a==null&&(a=""),t=a}a=At(t),e.defaultValue=a,n=e.textContent,n===a&&n!==""&&n!==null&&(e.value=n)}function Tn(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var Bh=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Vu(e,t,a){var n=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,a):typeof a!="number"||a===0||Bh.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Qu(e,t,a){if(t!=null&&typeof t!="object")throw Error(c(62));if(e=e.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="");for(var o in t)n=t[o],t.hasOwnProperty(o)&&a[o]!==n&&Vu(e,o,n)}else for(var u in t)t.hasOwnProperty(u)&&Vu(e,u,t[u])}function No(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Hh=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),qh=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Dr(e){return qh.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var So=null;function Eo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var _n=null,Cn=null;function Zu(e){var t=jn(e);if(t&&(e=t.stateNode)){var a=e[ft]||null;e:switch(e=t.stateNode,t.type){case"input":if(wo(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Rt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var n=a[t];if(n!==e&&n.form===e.form){var o=n[ft]||null;if(!o)throw Error(c(90));wo(n,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(t=0;t<a.length;t++)n=a[t],n.form===e.form&&qu(n)}break e;case"textarea":Yu(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&kn(e,!!a.multiple,t,!1)}}}var ko=!1;function $u(e,t,a){if(ko)return e(t,a);ko=!0;try{var n=e(t);return n}finally{if(ko=!1,(_n!==null||Cn!==null)&&(yi(),_n&&(t=_n,e=Cn,Cn=_n=null,Zu(t),e)))for(t=0;t<e.length;t++)Zu(e[t])}}function hl(e,t){var a=e.stateNode;if(a===null)return null;var n=a[ft]||null;if(n===null)return null;a=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(c(231,t,typeof a));return a}var na=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),To=!1;if(na)try{var gl={};Object.defineProperty(gl,"passive",{get:function(){To=!0}}),window.addEventListener("test",gl,gl),window.removeEventListener("test",gl,gl)}catch{To=!1}var Sa=null,_o=null,Mr=null;function Pu(){if(Mr)return Mr;var e,t=_o,a=t.length,n,o="value"in Sa?Sa.value:Sa.textContent,u=o.length;for(e=0;e<a&&t[e]===o[e];e++);var m=a-e;for(n=1;n<=m&&t[a-n]===o[u-n];n++);return Mr=o.slice(e,1<n?1-n:void 0)}function Ur(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Br(){return!0}function Ku(){return!1}function pt(e){function t(a,n,o,u,m){this._reactName=a,this._targetInst=o,this.type=n,this.nativeEvent=u,this.target=m,this.currentTarget=null;for(var x in e)e.hasOwnProperty(x)&&(a=e[x],this[x]=a?a(u):u[x]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Br:Ku,this.isPropagationStopped=Ku,this}return v(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Br)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Br)},persist:function(){},isPersistent:Br}),t}var Ja={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hr=pt(Ja),xl=v({},Ja,{view:0,detail:0}),Gh=pt(xl),Co,zo,bl,qr=v({},xl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ro,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==bl&&(bl&&e.type==="mousemove"?(Co=e.screenX-bl.screenX,zo=e.screenY-bl.screenY):zo=Co=0,bl=e),Co)},movementY:function(e){return"movementY"in e?e.movementY:zo}}),Ju=pt(qr),Yh=v({},qr,{dataTransfer:0}),Xh=pt(Yh),Vh=v({},xl,{relatedTarget:0}),Ao=pt(Vh),Qh=v({},Ja,{animationName:0,elapsedTime:0,pseudoElement:0}),Zh=pt(Qh),$h=v({},Ja,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ph=pt($h),Kh=v({},Ja,{data:0}),Fu=pt(Kh),Jh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ih={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ih[e])?!!t[e]:!1}function Ro(){return Wh}var eg=v({},xl,{key:function(e){if(e.key){var t=Jh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ur(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Fh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ro,charCode:function(e){return e.type==="keypress"?Ur(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ur(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),tg=pt(eg),ag=v({},qr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Iu=pt(ag),ng=v({},xl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ro}),lg=pt(ng),rg=v({},Ja,{propertyName:0,elapsedTime:0,pseudoElement:0}),ig=pt(rg),og=v({},qr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),sg=pt(og),cg=v({},Ja,{newState:0,oldState:0}),ug=pt(cg),dg=[9,13,27,32],Lo=na&&"CompositionEvent"in window,vl=null;na&&"documentMode"in document&&(vl=document.documentMode);var fg=na&&"TextEvent"in window&&!vl,Wu=na&&(!Lo||vl&&8<vl&&11>=vl),ed=" ",td=!1;function ad(e,t){switch(e){case"keyup":return dg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function nd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var zn=!1;function pg(e,t){switch(e){case"compositionend":return nd(t);case"keypress":return t.which!==32?null:(td=!0,ed);case"textInput":return e=t.data,e===ed&&td?null:e;default:return null}}function mg(e,t){if(zn)return e==="compositionend"||!Lo&&ad(e,t)?(e=Pu(),Mr=_o=Sa=null,zn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Wu&&t.locale!=="ko"?null:t.data;default:return null}}var hg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ld(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!hg[e.type]:t==="textarea"}function rd(e,t,a,n){_n?Cn?Cn.push(n):Cn=[n]:_n=n,t=ki(t,"onChange"),0<t.length&&(a=new Hr("onChange","change",null,a,n),e.push({event:a,listeners:t}))}var yl=null,wl=null;function gg(e){qp(e,0)}function Gr(e){var t=ml(e);if(qu(t))return e}function id(e,t){if(e==="change")return t}var od=!1;if(na){var Oo;if(na){var Do="oninput"in document;if(!Do){var sd=document.createElement("div");sd.setAttribute("oninput","return;"),Do=typeof sd.oninput=="function"}Oo=Do}else Oo=!1;od=Oo&&(!document.documentMode||9<document.documentMode)}function cd(){yl&&(yl.detachEvent("onpropertychange",ud),wl=yl=null)}function ud(e){if(e.propertyName==="value"&&Gr(wl)){var t=[];rd(t,wl,e,Eo(e)),$u(gg,t)}}function xg(e,t,a){e==="focusin"?(cd(),yl=t,wl=a,yl.attachEvent("onpropertychange",ud)):e==="focusout"&&cd()}function bg(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Gr(wl)}function vg(e,t){if(e==="click")return Gr(t)}function yg(e,t){if(e==="input"||e==="change")return Gr(t)}function wg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var jt=typeof Object.is=="function"?Object.is:wg;function jl(e,t){if(jt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),n=Object.keys(t);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var o=a[n];if(!vn.call(t,o)||!jt(e[o],t[o]))return!1}return!0}function dd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function fd(e,t){var a=dd(e);e=0;for(var n;a;){if(a.nodeType===3){if(n=e+a.textContent.length,e<=t&&n>=t)return{node:a,offset:t-e};e=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=dd(a)}}function pd(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?pd(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function md(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Or(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Or(e.document)}return t}function Mo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var jg=na&&"documentMode"in document&&11>=document.documentMode,An=null,Uo=null,Nl=null,Bo=!1;function hd(e,t,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Bo||An==null||An!==Or(n)||(n=An,"selectionStart"in n&&Mo(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Nl&&jl(Nl,n)||(Nl=n,n=ki(Uo,"onSelect"),0<n.length&&(t=new Hr("onSelect","select",null,t,a),e.push({event:t,listeners:n}),t.target=An)))}function Fa(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var Rn={animationend:Fa("Animation","AnimationEnd"),animationiteration:Fa("Animation","AnimationIteration"),animationstart:Fa("Animation","AnimationStart"),transitionrun:Fa("Transition","TransitionRun"),transitionstart:Fa("Transition","TransitionStart"),transitioncancel:Fa("Transition","TransitionCancel"),transitionend:Fa("Transition","TransitionEnd")},Ho={},gd={};na&&(gd=document.createElement("div").style,"AnimationEvent"in window||(delete Rn.animationend.animation,delete Rn.animationiteration.animation,delete Rn.animationstart.animation),"TransitionEvent"in window||delete Rn.transitionend.transition);function Ia(e){if(Ho[e])return Ho[e];if(!Rn[e])return e;var t=Rn[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in gd)return Ho[e]=t[a];return e}var xd=Ia("animationend"),bd=Ia("animationiteration"),vd=Ia("animationstart"),Ng=Ia("transitionrun"),Sg=Ia("transitionstart"),Eg=Ia("transitioncancel"),yd=Ia("transitionend"),wd=new Map,qo="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");qo.push("scrollEnd");function Xt(e,t){wd.set(e,t),Ka(t,[e])}var jd=new WeakMap;function Lt(e,t){if(typeof e=="object"&&e!==null){var a=jd.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Bu(t)},jd.set(e,t),t)}return{value:e,source:t,stack:Bu(t)}}var Ot=[],Ln=0,Go=0;function Yr(){for(var e=Ln,t=Go=Ln=0;t<e;){var a=Ot[t];Ot[t++]=null;var n=Ot[t];Ot[t++]=null;var o=Ot[t];Ot[t++]=null;var u=Ot[t];if(Ot[t++]=null,n!==null&&o!==null){var m=n.pending;m===null?o.next=o:(o.next=m.next,m.next=o),n.pending=o}u!==0&&Nd(a,o,u)}}function Xr(e,t,a,n){Ot[Ln++]=e,Ot[Ln++]=t,Ot[Ln++]=a,Ot[Ln++]=n,Go|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function Yo(e,t,a,n){return Xr(e,t,a,n),Vr(e)}function On(e,t){return Xr(e,null,null,t),Vr(e)}function Nd(e,t,a){e.lanes|=a;var n=e.alternate;n!==null&&(n.lanes|=a);for(var o=!1,u=e.return;u!==null;)u.childLanes|=a,n=u.alternate,n!==null&&(n.childLanes|=a),u.tag===22&&(e=u.stateNode,e===null||e._visibility&1||(o=!0)),e=u,u=u.return;return e.tag===3?(u=e.stateNode,o&&t!==null&&(o=31-wt(a),e=u.hiddenUpdates,n=e[o],n===null?e[o]=[t]:n.push(t),t.lane=a|536870912),u):null}function Vr(e){if(50<Pl)throw Pl=0,Ps=null,Error(c(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Dn={};function kg(e,t,a,n){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nt(e,t,a,n){return new kg(e,t,a,n)}function Xo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function la(e,t){var a=e.alternate;return a===null?(a=Nt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Sd(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Qr(e,t,a,n,o,u){var m=0;if(n=e,typeof e=="function")Xo(e)&&(m=1);else if(typeof e=="string")m=_x(e,a,$.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case W:return e=Nt(31,a,t,o),e.elementType=W,e.lanes=u,e;case S:return Wa(a.children,o,u,t);case A:m=8,o|=24;break;case y:return e=Nt(12,a,t,o|2),e.elementType=y,e.lanes=u,e;case P:return e=Nt(13,a,t,o),e.elementType=P,e.lanes=u,e;case ne:return e=Nt(19,a,t,o),e.elementType=ne,e.lanes=u,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case M:case C:m=10;break e;case q:m=9;break e;case F:m=11;break e;case Y:m=14;break e;case I:m=16,n=null;break e}m=29,a=Error(c(130,e===null?"null":typeof e,"")),n=null}return t=Nt(m,a,t,o),t.elementType=e,t.type=n,t.lanes=u,t}function Wa(e,t,a,n){return e=Nt(7,e,n,t),e.lanes=a,e}function Vo(e,t,a){return e=Nt(6,e,null,t),e.lanes=a,e}function Qo(e,t,a){return t=Nt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Mn=[],Un=0,Zr=null,$r=0,Dt=[],Mt=0,en=null,ra=1,ia="";function tn(e,t){Mn[Un++]=$r,Mn[Un++]=Zr,Zr=e,$r=t}function Ed(e,t,a){Dt[Mt++]=ra,Dt[Mt++]=ia,Dt[Mt++]=en,en=e;var n=ra;e=ia;var o=32-wt(n)-1;n&=~(1<<o),a+=1;var u=32-wt(t)+o;if(30<u){var m=o-o%5;u=(n&(1<<m)-1).toString(32),n>>=m,o-=m,ra=1<<32-wt(t)+o|a<<o|n,ia=u+e}else ra=1<<u|a<<o|n,ia=e}function Zo(e){e.return!==null&&(tn(e,1),Ed(e,1,0))}function $o(e){for(;e===Zr;)Zr=Mn[--Un],Mn[Un]=null,$r=Mn[--Un],Mn[Un]=null;for(;e===en;)en=Dt[--Mt],Dt[Mt]=null,ia=Dt[--Mt],Dt[Mt]=null,ra=Dt[--Mt],Dt[Mt]=null}var st=null,qe=null,ke=!1,an=null,Jt=!1,Po=Error(c(519));function nn(e){var t=Error(c(418,""));throw kl(Lt(t,e)),Po}function kd(e){var t=e.stateNode,a=e.type,n=e.memoizedProps;switch(t[lt]=e,t[ft]=n,a){case"dialog":we("cancel",t),we("close",t);break;case"iframe":case"object":case"embed":we("load",t);break;case"video":case"audio":for(a=0;a<Jl.length;a++)we(Jl[a],t);break;case"source":we("error",t);break;case"img":case"image":case"link":we("error",t),we("load",t);break;case"details":we("toggle",t);break;case"input":we("invalid",t),Gu(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0),Lr(t);break;case"select":we("invalid",t);break;case"textarea":we("invalid",t),Xu(t,n.value,n.defaultValue,n.children),Lr(t)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||n.suppressHydrationWarning===!0||Vp(t.textContent,a)?(n.popover!=null&&(we("beforetoggle",t),we("toggle",t)),n.onScroll!=null&&we("scroll",t),n.onScrollEnd!=null&&we("scrollend",t),n.onClick!=null&&(t.onclick=Ti),t=!0):t=!1,t||nn(e)}function Td(e){for(st=e.return;st;)switch(st.tag){case 5:case 13:Jt=!1;return;case 27:case 3:Jt=!0;return;default:st=st.return}}function Sl(e){if(e!==st)return!1;if(!ke)return Td(e),ke=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||uc(e.type,e.memoizedProps)),a=!a),a&&qe&&nn(e),Td(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(t===0){qe=Qt(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++;e=e.nextSibling}qe=null}}else t===27?(t=qe,qa(e.type)?(e=mc,mc=null,qe=e):qe=t):qe=st?Qt(e.stateNode.nextSibling):null;return!0}function El(){qe=st=null,ke=!1}function _d(){var e=an;return e!==null&&(gt===null?gt=e:gt.push.apply(gt,e),an=null),e}function kl(e){an===null?an=[e]:an.push(e)}var Ko=Q(null),ln=null,oa=null;function Ea(e,t,a){D(Ko,t._currentValue),t._currentValue=a}function sa(e){e._currentValue=Ko.current,j(Ko)}function Jo(e,t,a){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===a)break;e=e.return}}function Fo(e,t,a,n){var o=e.child;for(o!==null&&(o.return=e);o!==null;){var u=o.dependencies;if(u!==null){var m=o.child;u=u.firstContext;e:for(;u!==null;){var x=u;u=o;for(var E=0;E<t.length;E++)if(x.context===t[E]){u.lanes|=a,x=u.alternate,x!==null&&(x.lanes|=a),Jo(u.return,a,e),n||(m=null);break e}u=x.next}}else if(o.tag===18){if(m=o.return,m===null)throw Error(c(341));m.lanes|=a,u=m.alternate,u!==null&&(u.lanes|=a),Jo(m,a,e),m=null}else m=o.child;if(m!==null)m.return=o;else for(m=o;m!==null;){if(m===e){m=null;break}if(o=m.sibling,o!==null){o.return=m.return,m=o;break}m=m.return}o=m}}function Tl(e,t,a,n){e=null;for(var o=t,u=!1;o!==null;){if(!u){if((o.flags&524288)!==0)u=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var m=o.alternate;if(m===null)throw Error(c(387));if(m=m.memoizedProps,m!==null){var x=o.type;jt(o.pendingProps.value,m.value)||(e!==null?e.push(x):e=[x])}}else if(o===et.current){if(m=o.alternate,m===null)throw Error(c(387));m.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(e!==null?e.push(ar):e=[ar])}o=o.return}e!==null&&Fo(t,e,a,n),t.flags|=262144}function Pr(e){for(e=e.firstContext;e!==null;){if(!jt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function rn(e){ln=e,oa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function rt(e){return Cd(ln,e)}function Kr(e,t){return ln===null&&rn(e),Cd(e,t)}function Cd(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},oa===null){if(e===null)throw Error(c(308));oa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else oa=oa.next=t;return a}var Tg=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},_g=l.unstable_scheduleCallback,Cg=l.unstable_NormalPriority,Pe={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Io(){return{controller:new Tg,data:new Map,refCount:0}}function _l(e){e.refCount--,e.refCount===0&&_g(Cg,function(){e.controller.abort()})}var Cl=null,Wo=0,Bn=0,Hn=null;function zg(e,t){if(Cl===null){var a=Cl=[];Wo=0,Bn=tc(),Hn={status:"pending",value:void 0,then:function(n){a.push(n)}}}return Wo++,t.then(zd,zd),t}function zd(){if(--Wo===0&&Cl!==null){Hn!==null&&(Hn.status="fulfilled");var e=Cl;Cl=null,Bn=0,Hn=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ag(e,t){var a=[],n={status:"pending",value:null,reason:null,then:function(o){a.push(o)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var o=0;o<a.length;o++)(0,a[o])(t)},function(o){for(n.status="rejected",n.reason=o,o=0;o<a.length;o++)(0,a[o])(void 0)}),n}var Ad=R.S;R.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&zg(e,t),Ad!==null&&Ad(e,t)};var on=Q(null);function es(){var e=on.current;return e!==null?e:Oe.pooledCache}function Jr(e,t){t===null?D(on,on.current):D(on,t.pool)}function Rd(){var e=es();return e===null?null:{parent:Pe._currentValue,pool:e}}var zl=Error(c(460)),Ld=Error(c(474)),Fr=Error(c(542)),ts={then:function(){}};function Od(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Ir(){}function Dd(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(Ir,Ir),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Ud(e),e;default:if(typeof t.status=="string")t.then(Ir,Ir);else{if(e=Oe,e!==null&&100<e.shellSuspendCounter)throw Error(c(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var o=t;o.status="fulfilled",o.value=n}},function(n){if(t.status==="pending"){var o=t;o.status="rejected",o.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Ud(e),e}throw Al=t,zl}}var Al=null;function Md(){if(Al===null)throw Error(c(459));var e=Al;return Al=null,e}function Ud(e){if(e===zl||e===Fr)throw Error(c(483))}var ka=!1;function as(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ns(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ta(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function _a(e,t,a){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,(_e&2)!==0){var o=n.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),n.pending=t,t=Vr(e),Nd(e,null,a),t}return Xr(e,n,t,a),Vr(e)}function Rl(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,zu(e,a)}}function ls(e,t){var a=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var o=null,u=null;if(a=a.firstBaseUpdate,a!==null){do{var m={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};u===null?o=u=m:u=u.next=m,a=a.next}while(a!==null);u===null?o=u=t:u=u.next=t}else o=u=t;a={baseState:n.baseState,firstBaseUpdate:o,lastBaseUpdate:u,shared:n.shared,callbacks:n.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var rs=!1;function Ll(){if(rs){var e=Hn;if(e!==null)throw e}}function Ol(e,t,a,n){rs=!1;var o=e.updateQueue;ka=!1;var u=o.firstBaseUpdate,m=o.lastBaseUpdate,x=o.shared.pending;if(x!==null){o.shared.pending=null;var E=x,O=E.next;E.next=null,m===null?u=O:m.next=O,m=E;var X=e.alternate;X!==null&&(X=X.updateQueue,x=X.lastBaseUpdate,x!==m&&(x===null?X.firstBaseUpdate=O:x.next=O,X.lastBaseUpdate=E))}if(u!==null){var Z=o.baseState;m=0,X=O=E=null,x=u;do{var U=x.lane&-536870913,B=U!==x.lane;if(B?(je&U)===U:(n&U)===U){U!==0&&U===Bn&&(rs=!0),X!==null&&(X=X.next={lane:0,tag:x.tag,payload:x.payload,callback:null,next:null});e:{var fe=e,se=x;U=t;var Re=a;switch(se.tag){case 1:if(fe=se.payload,typeof fe=="function"){Z=fe.call(Re,Z,U);break e}Z=fe;break e;case 3:fe.flags=fe.flags&-65537|128;case 0:if(fe=se.payload,U=typeof fe=="function"?fe.call(Re,Z,U):fe,U==null)break e;Z=v({},Z,U);break e;case 2:ka=!0}}U=x.callback,U!==null&&(e.flags|=64,B&&(e.flags|=8192),B=o.callbacks,B===null?o.callbacks=[U]:B.push(U))}else B={lane:U,tag:x.tag,payload:x.payload,callback:x.callback,next:null},X===null?(O=X=B,E=Z):X=X.next=B,m|=U;if(x=x.next,x===null){if(x=o.shared.pending,x===null)break;B=x,x=B.next,B.next=null,o.lastBaseUpdate=B,o.shared.pending=null}}while(!0);X===null&&(E=Z),o.baseState=E,o.firstBaseUpdate=O,o.lastBaseUpdate=X,u===null&&(o.shared.lanes=0),Ma|=m,e.lanes=m,e.memoizedState=Z}}function Bd(e,t){if(typeof e!="function")throw Error(c(191,e));e.call(t)}function Hd(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Bd(a[e],t)}var qn=Q(null),Wr=Q(0);function qd(e,t){e=ha,D(Wr,e),D(qn,t),ha=e|t.baseLanes}function is(){D(Wr,ha),D(qn,qn.current)}function os(){ha=Wr.current,j(qn),j(Wr)}var Ca=0,xe=null,ze=null,Qe=null,ei=!1,Gn=!1,sn=!1,ti=0,Dl=0,Yn=null,Rg=0;function Ye(){throw Error(c(321))}function ss(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!jt(e[a],t[a]))return!1;return!0}function cs(e,t,a,n,o,u){return Ca=u,xe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,R.H=e===null||e.memoizedState===null?Sf:Ef,sn=!1,u=a(n,o),sn=!1,Gn&&(u=Yd(t,a,n,o)),Gd(e),u}function Gd(e){R.H=oi;var t=ze!==null&&ze.next!==null;if(Ca=0,Qe=ze=xe=null,ei=!1,Dl=0,Yn=null,t)throw Error(c(300));e===null||Fe||(e=e.dependencies,e!==null&&Pr(e)&&(Fe=!0))}function Yd(e,t,a,n){xe=e;var o=0;do{if(Gn&&(Yn=null),Dl=0,Gn=!1,25<=o)throw Error(c(301));if(o+=1,Qe=ze=null,e.updateQueue!=null){var u=e.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}R.H=Hg,u=t(a,n)}while(Gn);return u}function Lg(){var e=R.H,t=e.useState()[0];return t=typeof t.then=="function"?Ml(t):t,e=e.useState()[0],(ze!==null?ze.memoizedState:null)!==e&&(xe.flags|=1024),t}function us(){var e=ti!==0;return ti=0,e}function ds(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function fs(e){if(ei){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ei=!1}Ca=0,Qe=ze=xe=null,Gn=!1,Dl=ti=0,Yn=null}function mt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qe===null?xe.memoizedState=Qe=e:Qe=Qe.next=e,Qe}function Ze(){if(ze===null){var e=xe.alternate;e=e!==null?e.memoizedState:null}else e=ze.next;var t=Qe===null?xe.memoizedState:Qe.next;if(t!==null)Qe=t,ze=e;else{if(e===null)throw xe.alternate===null?Error(c(467)):Error(c(310));ze=e,e={memoizedState:ze.memoizedState,baseState:ze.baseState,baseQueue:ze.baseQueue,queue:ze.queue,next:null},Qe===null?xe.memoizedState=Qe=e:Qe=Qe.next=e}return Qe}function ps(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ml(e){var t=Dl;return Dl+=1,Yn===null&&(Yn=[]),e=Dd(Yn,e,t),t=xe,(Qe===null?t.memoizedState:Qe.next)===null&&(t=t.alternate,R.H=t===null||t.memoizedState===null?Sf:Ef),e}function ai(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Ml(e);if(e.$$typeof===C)return rt(e)}throw Error(c(438,String(e)))}function ms(e){var t=null,a=xe.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var n=xe.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(o){return o.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=ps(),xe.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),n=0;n<e;n++)a[n]=ie;return t.index++,a}function ca(e,t){return typeof t=="function"?t(e):t}function ni(e){var t=Ze();return hs(t,ze,e)}function hs(e,t,a){var n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=a;var o=e.baseQueue,u=n.pending;if(u!==null){if(o!==null){var m=o.next;o.next=u.next,u.next=m}t.baseQueue=o=u,n.pending=null}if(u=e.baseState,o===null)e.memoizedState=u;else{t=o.next;var x=m=null,E=null,O=t,X=!1;do{var Z=O.lane&-536870913;if(Z!==O.lane?(je&Z)===Z:(Ca&Z)===Z){var U=O.revertLane;if(U===0)E!==null&&(E=E.next={lane:0,revertLane:0,action:O.action,hasEagerState:O.hasEagerState,eagerState:O.eagerState,next:null}),Z===Bn&&(X=!0);else if((Ca&U)===U){O=O.next,U===Bn&&(X=!0);continue}else Z={lane:0,revertLane:O.revertLane,action:O.action,hasEagerState:O.hasEagerState,eagerState:O.eagerState,next:null},E===null?(x=E=Z,m=u):E=E.next=Z,xe.lanes|=U,Ma|=U;Z=O.action,sn&&a(u,Z),u=O.hasEagerState?O.eagerState:a(u,Z)}else U={lane:Z,revertLane:O.revertLane,action:O.action,hasEagerState:O.hasEagerState,eagerState:O.eagerState,next:null},E===null?(x=E=U,m=u):E=E.next=U,xe.lanes|=Z,Ma|=Z;O=O.next}while(O!==null&&O!==t);if(E===null?m=u:E.next=x,!jt(u,e.memoizedState)&&(Fe=!0,X&&(a=Hn,a!==null)))throw a;e.memoizedState=u,e.baseState=m,e.baseQueue=E,n.lastRenderedState=u}return o===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function gs(e){var t=Ze(),a=t.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=e;var n=a.dispatch,o=a.pending,u=t.memoizedState;if(o!==null){a.pending=null;var m=o=o.next;do u=e(u,m.action),m=m.next;while(m!==o);jt(u,t.memoizedState)||(Fe=!0),t.memoizedState=u,t.baseQueue===null&&(t.baseState=u),a.lastRenderedState=u}return[u,n]}function Xd(e,t,a){var n=xe,o=Ze(),u=ke;if(u){if(a===void 0)throw Error(c(407));a=a()}else a=t();var m=!jt((ze||o).memoizedState,a);m&&(o.memoizedState=a,Fe=!0),o=o.queue;var x=Zd.bind(null,n,o,e);if(Ul(2048,8,x,[e]),o.getSnapshot!==t||m||Qe!==null&&Qe.memoizedState.tag&1){if(n.flags|=2048,Xn(9,li(),Qd.bind(null,n,o,a,t),null),Oe===null)throw Error(c(349));u||(Ca&124)!==0||Vd(n,t,a)}return a}function Vd(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=xe.updateQueue,t===null?(t=ps(),xe.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Qd(e,t,a,n){t.value=a,t.getSnapshot=n,$d(t)&&Pd(e)}function Zd(e,t,a){return a(function(){$d(t)&&Pd(e)})}function $d(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!jt(e,a)}catch{return!0}}function Pd(e){var t=On(e,2);t!==null&&_t(t,e,2)}function xs(e){var t=mt();if(typeof e=="function"){var a=e;if(e=a(),sn){ja(!0);try{a()}finally{ja(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:e},t}function Kd(e,t,a,n){return e.baseState=a,hs(e,ze,typeof n=="function"?n:ca)}function Og(e,t,a,n,o){if(ii(e))throw Error(c(485));if(e=t.action,e!==null){var u={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(m){u.listeners.push(m)}};R.T!==null?a(!0):u.isTransition=!1,n(u),a=t.pending,a===null?(u.next=t.pending=u,Jd(t,u)):(u.next=a.next,t.pending=a.next=u)}}function Jd(e,t){var a=t.action,n=t.payload,o=e.state;if(t.isTransition){var u=R.T,m={};R.T=m;try{var x=a(o,n),E=R.S;E!==null&&E(m,x),Fd(e,t,x)}catch(O){bs(e,t,O)}finally{R.T=u}}else try{u=a(o,n),Fd(e,t,u)}catch(O){bs(e,t,O)}}function Fd(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){Id(e,t,n)},function(n){return bs(e,t,n)}):Id(e,t,a)}function Id(e,t,a){t.status="fulfilled",t.value=a,Wd(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Jd(e,a)))}function bs(e,t,a){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=a,Wd(t),t=t.next;while(t!==n)}e.action=null}function Wd(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ef(e,t){return t}function tf(e,t){if(ke){var a=Oe.formState;if(a!==null){e:{var n=xe;if(ke){if(qe){t:{for(var o=qe,u=Jt;o.nodeType!==8;){if(!u){o=null;break t}if(o=Qt(o.nextSibling),o===null){o=null;break t}}u=o.data,o=u==="F!"||u==="F"?o:null}if(o){qe=Qt(o.nextSibling),n=o.data==="F!";break e}}nn(n)}n=!1}n&&(t=a[0])}}return a=mt(),a.memoizedState=a.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ef,lastRenderedState:t},a.queue=n,a=wf.bind(null,xe,n),n.dispatch=a,n=xs(!1),u=Ns.bind(null,xe,!1,n.queue),n=mt(),o={state:t,dispatch:null,action:e,pending:null},n.queue=o,a=Og.bind(null,xe,o,u,a),o.dispatch=a,n.memoizedState=e,[t,a,!1]}function af(e){var t=Ze();return nf(t,ze,e)}function nf(e,t,a){if(t=hs(e,t,ef)[0],e=ni(ca)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=Ml(t)}catch(m){throw m===zl?Fr:m}else n=t;t=Ze();var o=t.queue,u=o.dispatch;return a!==t.memoizedState&&(xe.flags|=2048,Xn(9,li(),Dg.bind(null,o,a),null)),[n,u,e]}function Dg(e,t){e.action=t}function lf(e){var t=Ze(),a=ze;if(a!==null)return nf(t,a,e);Ze(),t=t.memoizedState,a=Ze();var n=a.queue.dispatch;return a.memoizedState=e,[t,n,!1]}function Xn(e,t,a,n){return e={tag:e,create:a,deps:n,inst:t,next:null},t=xe.updateQueue,t===null&&(t=ps(),xe.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(n=a.next,a.next=e,e.next=n,t.lastEffect=e),e}function li(){return{destroy:void 0,resource:void 0}}function rf(){return Ze().memoizedState}function ri(e,t,a,n){var o=mt();n=n===void 0?null:n,xe.flags|=e,o.memoizedState=Xn(1|t,li(),a,n)}function Ul(e,t,a,n){var o=Ze();n=n===void 0?null:n;var u=o.memoizedState.inst;ze!==null&&n!==null&&ss(n,ze.memoizedState.deps)?o.memoizedState=Xn(t,u,a,n):(xe.flags|=e,o.memoizedState=Xn(1|t,u,a,n))}function of(e,t){ri(8390656,8,e,t)}function sf(e,t){Ul(2048,8,e,t)}function cf(e,t){return Ul(4,2,e,t)}function uf(e,t){return Ul(4,4,e,t)}function df(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ff(e,t,a){a=a!=null?a.concat([e]):null,Ul(4,4,df.bind(null,t,e),a)}function vs(){}function pf(e,t){var a=Ze();t=t===void 0?null:t;var n=a.memoizedState;return t!==null&&ss(t,n[1])?n[0]:(a.memoizedState=[e,t],e)}function mf(e,t){var a=Ze();t=t===void 0?null:t;var n=a.memoizedState;if(t!==null&&ss(t,n[1]))return n[0];if(n=e(),sn){ja(!0);try{e()}finally{ja(!1)}}return a.memoizedState=[n,t],n}function ys(e,t,a){return a===void 0||(Ca&1073741824)!==0?e.memoizedState=t:(e.memoizedState=a,e=xp(),xe.lanes|=e,Ma|=e,a)}function hf(e,t,a,n){return jt(a,t)?a:qn.current!==null?(e=ys(e,a,n),jt(e,t)||(Fe=!0),e):(Ca&42)===0?(Fe=!0,e.memoizedState=a):(e=xp(),xe.lanes|=e,Ma|=e,t)}function gf(e,t,a,n,o){var u=K.p;K.p=u!==0&&8>u?u:8;var m=R.T,x={};R.T=x,Ns(e,!1,t,a);try{var E=o(),O=R.S;if(O!==null&&O(x,E),E!==null&&typeof E=="object"&&typeof E.then=="function"){var X=Ag(E,n);Bl(e,t,X,Tt(e))}else Bl(e,t,n,Tt(e))}catch(Z){Bl(e,t,{then:function(){},status:"rejected",reason:Z},Tt())}finally{K.p=u,R.T=m}}function Mg(){}function ws(e,t,a,n){if(e.tag!==5)throw Error(c(476));var o=xf(e).queue;gf(e,o,t,te,a===null?Mg:function(){return bf(e),a(n)})}function xf(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:te,baseState:te,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:te},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function bf(e){var t=xf(e).next.queue;Bl(e,t,{},Tt())}function js(){return rt(ar)}function vf(){return Ze().memoizedState}function yf(){return Ze().memoizedState}function Ug(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=Tt();e=Ta(a);var n=_a(t,e,a);n!==null&&(_t(n,t,a),Rl(n,t,a)),t={cache:Io()},e.payload=t;return}t=t.return}}function Bg(e,t,a){var n=Tt();a={lane:n,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},ii(e)?jf(t,a):(a=Yo(e,t,a,n),a!==null&&(_t(a,e,n),Nf(a,t,n)))}function wf(e,t,a){var n=Tt();Bl(e,t,a,n)}function Bl(e,t,a,n){var o={lane:n,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(ii(e))jf(t,o);else{var u=e.alternate;if(e.lanes===0&&(u===null||u.lanes===0)&&(u=t.lastRenderedReducer,u!==null))try{var m=t.lastRenderedState,x=u(m,a);if(o.hasEagerState=!0,o.eagerState=x,jt(x,m))return Xr(e,t,o,0),Oe===null&&Yr(),!1}catch{}finally{}if(a=Yo(e,t,o,n),a!==null)return _t(a,e,n),Nf(a,t,n),!0}return!1}function Ns(e,t,a,n){if(n={lane:2,revertLane:tc(),action:n,hasEagerState:!1,eagerState:null,next:null},ii(e)){if(t)throw Error(c(479))}else t=Yo(e,a,n,2),t!==null&&_t(t,e,2)}function ii(e){var t=e.alternate;return e===xe||t!==null&&t===xe}function jf(e,t){Gn=ei=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Nf(e,t,a){if((a&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,zu(e,a)}}var oi={readContext:rt,use:ai,useCallback:Ye,useContext:Ye,useEffect:Ye,useImperativeHandle:Ye,useLayoutEffect:Ye,useInsertionEffect:Ye,useMemo:Ye,useReducer:Ye,useRef:Ye,useState:Ye,useDebugValue:Ye,useDeferredValue:Ye,useTransition:Ye,useSyncExternalStore:Ye,useId:Ye,useHostTransitionStatus:Ye,useFormState:Ye,useActionState:Ye,useOptimistic:Ye,useMemoCache:Ye,useCacheRefresh:Ye},Sf={readContext:rt,use:ai,useCallback:function(e,t){return mt().memoizedState=[e,t===void 0?null:t],e},useContext:rt,useEffect:of,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,ri(4194308,4,df.bind(null,t,e),a)},useLayoutEffect:function(e,t){return ri(4194308,4,e,t)},useInsertionEffect:function(e,t){ri(4,2,e,t)},useMemo:function(e,t){var a=mt();t=t===void 0?null:t;var n=e();if(sn){ja(!0);try{e()}finally{ja(!1)}}return a.memoizedState=[n,t],n},useReducer:function(e,t,a){var n=mt();if(a!==void 0){var o=a(t);if(sn){ja(!0);try{a(t)}finally{ja(!1)}}}else o=t;return n.memoizedState=n.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},n.queue=e,e=e.dispatch=Bg.bind(null,xe,e),[n.memoizedState,e]},useRef:function(e){var t=mt();return e={current:e},t.memoizedState=e},useState:function(e){e=xs(e);var t=e.queue,a=wf.bind(null,xe,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:vs,useDeferredValue:function(e,t){var a=mt();return ys(a,e,t)},useTransition:function(){var e=xs(!1);return e=gf.bind(null,xe,e.queue,!0,!1),mt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var n=xe,o=mt();if(ke){if(a===void 0)throw Error(c(407));a=a()}else{if(a=t(),Oe===null)throw Error(c(349));(je&124)!==0||Vd(n,t,a)}o.memoizedState=a;var u={value:a,getSnapshot:t};return o.queue=u,of(Zd.bind(null,n,u,e),[e]),n.flags|=2048,Xn(9,li(),Qd.bind(null,n,u,a,t),null),a},useId:function(){var e=mt(),t=Oe.identifierPrefix;if(ke){var a=ia,n=ra;a=(n&~(1<<32-wt(n)-1)).toString(32)+a,t="«"+t+"R"+a,a=ti++,0<a&&(t+="H"+a.toString(32)),t+="»"}else a=Rg++,t="«"+t+"r"+a.toString(32)+"»";return e.memoizedState=t},useHostTransitionStatus:js,useFormState:tf,useActionState:tf,useOptimistic:function(e){var t=mt();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=Ns.bind(null,xe,!0,a),a.dispatch=t,[e,t]},useMemoCache:ms,useCacheRefresh:function(){return mt().memoizedState=Ug.bind(null,xe)}},Ef={readContext:rt,use:ai,useCallback:pf,useContext:rt,useEffect:sf,useImperativeHandle:ff,useInsertionEffect:cf,useLayoutEffect:uf,useMemo:mf,useReducer:ni,useRef:rf,useState:function(){return ni(ca)},useDebugValue:vs,useDeferredValue:function(e,t){var a=Ze();return hf(a,ze.memoizedState,e,t)},useTransition:function(){var e=ni(ca)[0],t=Ze().memoizedState;return[typeof e=="boolean"?e:Ml(e),t]},useSyncExternalStore:Xd,useId:vf,useHostTransitionStatus:js,useFormState:af,useActionState:af,useOptimistic:function(e,t){var a=Ze();return Kd(a,ze,e,t)},useMemoCache:ms,useCacheRefresh:yf},Hg={readContext:rt,use:ai,useCallback:pf,useContext:rt,useEffect:sf,useImperativeHandle:ff,useInsertionEffect:cf,useLayoutEffect:uf,useMemo:mf,useReducer:gs,useRef:rf,useState:function(){return gs(ca)},useDebugValue:vs,useDeferredValue:function(e,t){var a=Ze();return ze===null?ys(a,e,t):hf(a,ze.memoizedState,e,t)},useTransition:function(){var e=gs(ca)[0],t=Ze().memoizedState;return[typeof e=="boolean"?e:Ml(e),t]},useSyncExternalStore:Xd,useId:vf,useHostTransitionStatus:js,useFormState:lf,useActionState:lf,useOptimistic:function(e,t){var a=Ze();return ze!==null?Kd(a,ze,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:ms,useCacheRefresh:yf},Vn=null,Hl=0;function si(e){var t=Hl;return Hl+=1,Vn===null&&(Vn=[]),Dd(Vn,e,t)}function ql(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function ci(e,t){throw t.$$typeof===N?Error(c(525)):(e=Object.prototype.toString.call(t),Error(c(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function kf(e){var t=e._init;return t(e._payload)}function Tf(e){function t(z,T){if(e){var L=z.deletions;L===null?(z.deletions=[T],z.flags|=16):L.push(T)}}function a(z,T){if(!e)return null;for(;T!==null;)t(z,T),T=T.sibling;return null}function n(z){for(var T=new Map;z!==null;)z.key!==null?T.set(z.key,z):T.set(z.index,z),z=z.sibling;return T}function o(z,T){return z=la(z,T),z.index=0,z.sibling=null,z}function u(z,T,L){return z.index=L,e?(L=z.alternate,L!==null?(L=L.index,L<T?(z.flags|=67108866,T):L):(z.flags|=67108866,T)):(z.flags|=1048576,T)}function m(z){return e&&z.alternate===null&&(z.flags|=67108866),z}function x(z,T,L,V){return T===null||T.tag!==6?(T=Vo(L,z.mode,V),T.return=z,T):(T=o(T,L),T.return=z,T)}function E(z,T,L,V){var ae=L.type;return ae===S?X(z,T,L.props.children,V,L.key):T!==null&&(T.elementType===ae||typeof ae=="object"&&ae!==null&&ae.$$typeof===I&&kf(ae)===T.type)?(T=o(T,L.props),ql(T,L),T.return=z,T):(T=Qr(L.type,L.key,L.props,null,z.mode,V),ql(T,L),T.return=z,T)}function O(z,T,L,V){return T===null||T.tag!==4||T.stateNode.containerInfo!==L.containerInfo||T.stateNode.implementation!==L.implementation?(T=Qo(L,z.mode,V),T.return=z,T):(T=o(T,L.children||[]),T.return=z,T)}function X(z,T,L,V,ae){return T===null||T.tag!==7?(T=Wa(L,z.mode,V,ae),T.return=z,T):(T=o(T,L),T.return=z,T)}function Z(z,T,L){if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return T=Vo(""+T,z.mode,L),T.return=z,T;if(typeof T=="object"&&T!==null){switch(T.$$typeof){case _:return L=Qr(T.type,T.key,T.props,null,z.mode,L),ql(L,T),L.return=z,L;case H:return T=Qo(T,z.mode,L),T.return=z,T;case I:var V=T._init;return T=V(T._payload),Z(z,T,L)}if(ee(T)||oe(T))return T=Wa(T,z.mode,L,null),T.return=z,T;if(typeof T.then=="function")return Z(z,si(T),L);if(T.$$typeof===C)return Z(z,Kr(z,T),L);ci(z,T)}return null}function U(z,T,L,V){var ae=T!==null?T.key:null;if(typeof L=="string"&&L!==""||typeof L=="number"||typeof L=="bigint")return ae!==null?null:x(z,T,""+L,V);if(typeof L=="object"&&L!==null){switch(L.$$typeof){case _:return L.key===ae?E(z,T,L,V):null;case H:return L.key===ae?O(z,T,L,V):null;case I:return ae=L._init,L=ae(L._payload),U(z,T,L,V)}if(ee(L)||oe(L))return ae!==null?null:X(z,T,L,V,null);if(typeof L.then=="function")return U(z,T,si(L),V);if(L.$$typeof===C)return U(z,T,Kr(z,L),V);ci(z,L)}return null}function B(z,T,L,V,ae){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return z=z.get(L)||null,x(T,z,""+V,ae);if(typeof V=="object"&&V!==null){switch(V.$$typeof){case _:return z=z.get(V.key===null?L:V.key)||null,E(T,z,V,ae);case H:return z=z.get(V.key===null?L:V.key)||null,O(T,z,V,ae);case I:var be=V._init;return V=be(V._payload),B(z,T,L,V,ae)}if(ee(V)||oe(V))return z=z.get(L)||null,X(T,z,V,ae,null);if(typeof V.then=="function")return B(z,T,L,si(V),ae);if(V.$$typeof===C)return B(z,T,L,Kr(T,V),ae);ci(T,V)}return null}function fe(z,T,L,V){for(var ae=null,be=null,re=T,ce=T=0,We=null;re!==null&&ce<L.length;ce++){re.index>ce?(We=re,re=null):We=re.sibling;var Se=U(z,re,L[ce],V);if(Se===null){re===null&&(re=We);break}e&&re&&Se.alternate===null&&t(z,re),T=u(Se,T,ce),be===null?ae=Se:be.sibling=Se,be=Se,re=We}if(ce===L.length)return a(z,re),ke&&tn(z,ce),ae;if(re===null){for(;ce<L.length;ce++)re=Z(z,L[ce],V),re!==null&&(T=u(re,T,ce),be===null?ae=re:be.sibling=re,be=re);return ke&&tn(z,ce),ae}for(re=n(re);ce<L.length;ce++)We=B(re,z,ce,L[ce],V),We!==null&&(e&&We.alternate!==null&&re.delete(We.key===null?ce:We.key),T=u(We,T,ce),be===null?ae=We:be.sibling=We,be=We);return e&&re.forEach(function(Qa){return t(z,Qa)}),ke&&tn(z,ce),ae}function se(z,T,L,V){if(L==null)throw Error(c(151));for(var ae=null,be=null,re=T,ce=T=0,We=null,Se=L.next();re!==null&&!Se.done;ce++,Se=L.next()){re.index>ce?(We=re,re=null):We=re.sibling;var Qa=U(z,re,Se.value,V);if(Qa===null){re===null&&(re=We);break}e&&re&&Qa.alternate===null&&t(z,re),T=u(Qa,T,ce),be===null?ae=Qa:be.sibling=Qa,be=Qa,re=We}if(Se.done)return a(z,re),ke&&tn(z,ce),ae;if(re===null){for(;!Se.done;ce++,Se=L.next())Se=Z(z,Se.value,V),Se!==null&&(T=u(Se,T,ce),be===null?ae=Se:be.sibling=Se,be=Se);return ke&&tn(z,ce),ae}for(re=n(re);!Se.done;ce++,Se=L.next())Se=B(re,z,ce,Se.value,V),Se!==null&&(e&&Se.alternate!==null&&re.delete(Se.key===null?ce:Se.key),T=u(Se,T,ce),be===null?ae=Se:be.sibling=Se,be=Se);return e&&re.forEach(function(qx){return t(z,qx)}),ke&&tn(z,ce),ae}function Re(z,T,L,V){if(typeof L=="object"&&L!==null&&L.type===S&&L.key===null&&(L=L.props.children),typeof L=="object"&&L!==null){switch(L.$$typeof){case _:e:{for(var ae=L.key;T!==null;){if(T.key===ae){if(ae=L.type,ae===S){if(T.tag===7){a(z,T.sibling),V=o(T,L.props.children),V.return=z,z=V;break e}}else if(T.elementType===ae||typeof ae=="object"&&ae!==null&&ae.$$typeof===I&&kf(ae)===T.type){a(z,T.sibling),V=o(T,L.props),ql(V,L),V.return=z,z=V;break e}a(z,T);break}else t(z,T);T=T.sibling}L.type===S?(V=Wa(L.props.children,z.mode,V,L.key),V.return=z,z=V):(V=Qr(L.type,L.key,L.props,null,z.mode,V),ql(V,L),V.return=z,z=V)}return m(z);case H:e:{for(ae=L.key;T!==null;){if(T.key===ae)if(T.tag===4&&T.stateNode.containerInfo===L.containerInfo&&T.stateNode.implementation===L.implementation){a(z,T.sibling),V=o(T,L.children||[]),V.return=z,z=V;break e}else{a(z,T);break}else t(z,T);T=T.sibling}V=Qo(L,z.mode,V),V.return=z,z=V}return m(z);case I:return ae=L._init,L=ae(L._payload),Re(z,T,L,V)}if(ee(L))return fe(z,T,L,V);if(oe(L)){if(ae=oe(L),typeof ae!="function")throw Error(c(150));return L=ae.call(L),se(z,T,L,V)}if(typeof L.then=="function")return Re(z,T,si(L),V);if(L.$$typeof===C)return Re(z,T,Kr(z,L),V);ci(z,L)}return typeof L=="string"&&L!==""||typeof L=="number"||typeof L=="bigint"?(L=""+L,T!==null&&T.tag===6?(a(z,T.sibling),V=o(T,L),V.return=z,z=V):(a(z,T),V=Vo(L,z.mode,V),V.return=z,z=V),m(z)):a(z,T)}return function(z,T,L,V){try{Hl=0;var ae=Re(z,T,L,V);return Vn=null,ae}catch(re){if(re===zl||re===Fr)throw re;var be=Nt(29,re,null,z.mode);return be.lanes=V,be.return=z,be}finally{}}}var Qn=Tf(!0),_f=Tf(!1),Ut=Q(null),Ft=null;function za(e){var t=e.alternate;D(Ke,Ke.current&1),D(Ut,e),Ft===null&&(t===null||qn.current!==null||t.memoizedState!==null)&&(Ft=e)}function Cf(e){if(e.tag===22){if(D(Ke,Ke.current),D(Ut,e),Ft===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Ft=e)}}else Aa()}function Aa(){D(Ke,Ke.current),D(Ut,Ut.current)}function ua(e){j(Ut),Ft===e&&(Ft=null),j(Ke)}var Ke=Q(0);function ui(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||pc(a)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function Ss(e,t,a,n){t=e.memoizedState,a=a(n,t),a=a==null?t:v({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Es={enqueueSetState:function(e,t,a){e=e._reactInternals;var n=Tt(),o=Ta(n);o.payload=t,a!=null&&(o.callback=a),t=_a(e,o,n),t!==null&&(_t(t,e,n),Rl(t,e,n))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var n=Tt(),o=Ta(n);o.tag=1,o.payload=t,a!=null&&(o.callback=a),t=_a(e,o,n),t!==null&&(_t(t,e,n),Rl(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=Tt(),n=Ta(a);n.tag=2,t!=null&&(n.callback=t),t=_a(e,n,a),t!==null&&(_t(t,e,a),Rl(t,e,a))}};function zf(e,t,a,n,o,u,m){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,u,m):t.prototype&&t.prototype.isPureReactComponent?!jl(a,n)||!jl(o,u):!0}function Af(e,t,a,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,n),t.state!==e&&Es.enqueueReplaceState(t,t.state,null)}function cn(e,t){var a=t;if("ref"in t){a={};for(var n in t)n!=="ref"&&(a[n]=t[n])}if(e=e.defaultProps){a===t&&(a=v({},a));for(var o in e)a[o]===void 0&&(a[o]=e[o])}return a}var di=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Rf(e){di(e)}function Lf(e){console.error(e)}function Of(e){di(e)}function fi(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function Df(e,t,a){try{var n=e.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function ks(e,t,a){return a=Ta(a),a.tag=3,a.payload={element:null},a.callback=function(){fi(e,t)},a}function Mf(e){return e=Ta(e),e.tag=3,e}function Uf(e,t,a,n){var o=a.type.getDerivedStateFromError;if(typeof o=="function"){var u=n.value;e.payload=function(){return o(u)},e.callback=function(){Df(t,a,n)}}var m=a.stateNode;m!==null&&typeof m.componentDidCatch=="function"&&(e.callback=function(){Df(t,a,n),typeof o!="function"&&(Ua===null?Ua=new Set([this]):Ua.add(this));var x=n.stack;this.componentDidCatch(n.value,{componentStack:x!==null?x:""})})}function qg(e,t,a,n,o){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=a.alternate,t!==null&&Tl(t,a,o,!0),a=Ut.current,a!==null){switch(a.tag){case 13:return Ft===null?Js():a.alternate===null&&Ge===0&&(Ge=3),a.flags&=-257,a.flags|=65536,a.lanes=o,n===ts?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([n]):t.add(n),Is(e,n,o)),!1;case 22:return a.flags|=65536,n===ts?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([n]):a.add(n)),Is(e,n,o)),!1}throw Error(c(435,a.tag))}return Is(e,n,o),Js(),!1}if(ke)return t=Ut.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=o,n!==Po&&(e=Error(c(422),{cause:n}),kl(Lt(e,a)))):(n!==Po&&(t=Error(c(423),{cause:n}),kl(Lt(t,a))),e=e.current.alternate,e.flags|=65536,o&=-o,e.lanes|=o,n=Lt(n,a),o=ks(e.stateNode,n,o),ls(e,o),Ge!==4&&(Ge=2)),!1;var u=Error(c(520),{cause:n});if(u=Lt(u,a),$l===null?$l=[u]:$l.push(u),Ge!==4&&(Ge=2),t===null)return!0;n=Lt(n,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=o&-o,a.lanes|=e,e=ks(a.stateNode,n,e),ls(a,e),!1;case 1:if(t=a.type,u=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(Ua===null||!Ua.has(u))))return a.flags|=65536,o&=-o,a.lanes|=o,o=Mf(o),Uf(o,e,a,n),ls(a,o),!1}a=a.return}while(a!==null);return!1}var Bf=Error(c(461)),Fe=!1;function tt(e,t,a,n){t.child=e===null?_f(t,null,a,n):Qn(t,e.child,a,n)}function Hf(e,t,a,n,o){a=a.render;var u=t.ref;if("ref"in n){var m={};for(var x in n)x!=="ref"&&(m[x]=n[x])}else m=n;return rn(t),n=cs(e,t,a,m,u,o),x=us(),e!==null&&!Fe?(ds(e,t,o),da(e,t,o)):(ke&&x&&Zo(t),t.flags|=1,tt(e,t,n,o),t.child)}function qf(e,t,a,n,o){if(e===null){var u=a.type;return typeof u=="function"&&!Xo(u)&&u.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=u,Gf(e,t,u,n,o)):(e=Qr(a.type,null,n,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(u=e.child,!Os(e,o)){var m=u.memoizedProps;if(a=a.compare,a=a!==null?a:jl,a(m,n)&&e.ref===t.ref)return da(e,t,o)}return t.flags|=1,e=la(u,n),e.ref=t.ref,e.return=t,t.child=e}function Gf(e,t,a,n,o){if(e!==null){var u=e.memoizedProps;if(jl(u,n)&&e.ref===t.ref)if(Fe=!1,t.pendingProps=n=u,Os(e,o))(e.flags&131072)!==0&&(Fe=!0);else return t.lanes=e.lanes,da(e,t,o)}return Ts(e,t,a,n,o)}function Yf(e,t,a){var n=t.pendingProps,o=n.children,u=e!==null?e.memoizedState:null;if(n.mode==="hidden"){if((t.flags&128)!==0){if(n=u!==null?u.baseLanes|a:a,e!==null){for(o=t.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;t.childLanes=u&~n}else t.childLanes=0,t.child=null;return Xf(e,t,n,a)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Jr(t,u!==null?u.cachePool:null),u!==null?qd(t,u):is(),Cf(t);else return t.lanes=t.childLanes=536870912,Xf(e,t,u!==null?u.baseLanes|a:a,a)}else u!==null?(Jr(t,u.cachePool),qd(t,u),Aa(),t.memoizedState=null):(e!==null&&Jr(t,null),is(),Aa());return tt(e,t,o,a),t.child}function Xf(e,t,a,n){var o=es();return o=o===null?null:{parent:Pe._currentValue,pool:o},t.memoizedState={baseLanes:a,cachePool:o},e!==null&&Jr(t,null),is(),Cf(t),e!==null&&Tl(e,t,n,!0),null}function pi(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(c(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Ts(e,t,a,n,o){return rn(t),a=cs(e,t,a,n,void 0,o),n=us(),e!==null&&!Fe?(ds(e,t,o),da(e,t,o)):(ke&&n&&Zo(t),t.flags|=1,tt(e,t,a,o),t.child)}function Vf(e,t,a,n,o,u){return rn(t),t.updateQueue=null,a=Yd(t,n,a,o),Gd(e),n=us(),e!==null&&!Fe?(ds(e,t,u),da(e,t,u)):(ke&&n&&Zo(t),t.flags|=1,tt(e,t,a,u),t.child)}function Qf(e,t,a,n,o){if(rn(t),t.stateNode===null){var u=Dn,m=a.contextType;typeof m=="object"&&m!==null&&(u=rt(m)),u=new a(n,u),t.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=Es,t.stateNode=u,u._reactInternals=t,u=t.stateNode,u.props=n,u.state=t.memoizedState,u.refs={},as(t),m=a.contextType,u.context=typeof m=="object"&&m!==null?rt(m):Dn,u.state=t.memoizedState,m=a.getDerivedStateFromProps,typeof m=="function"&&(Ss(t,a,m,n),u.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(m=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),m!==u.state&&Es.enqueueReplaceState(u,u.state,null),Ol(t,n,u,o),Ll(),u.state=t.memoizedState),typeof u.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){u=t.stateNode;var x=t.memoizedProps,E=cn(a,x);u.props=E;var O=u.context,X=a.contextType;m=Dn,typeof X=="object"&&X!==null&&(m=rt(X));var Z=a.getDerivedStateFromProps;X=typeof Z=="function"||typeof u.getSnapshotBeforeUpdate=="function",x=t.pendingProps!==x,X||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(x||O!==m)&&Af(t,u,n,m),ka=!1;var U=t.memoizedState;u.state=U,Ol(t,n,u,o),Ll(),O=t.memoizedState,x||U!==O||ka?(typeof Z=="function"&&(Ss(t,a,Z,n),O=t.memoizedState),(E=ka||zf(t,a,E,n,U,O,m))?(X||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=O),u.props=n,u.state=O,u.context=m,n=E):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{u=t.stateNode,ns(e,t),m=t.memoizedProps,X=cn(a,m),u.props=X,Z=t.pendingProps,U=u.context,O=a.contextType,E=Dn,typeof O=="object"&&O!==null&&(E=rt(O)),x=a.getDerivedStateFromProps,(O=typeof x=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(m!==Z||U!==E)&&Af(t,u,n,E),ka=!1,U=t.memoizedState,u.state=U,Ol(t,n,u,o),Ll();var B=t.memoizedState;m!==Z||U!==B||ka||e!==null&&e.dependencies!==null&&Pr(e.dependencies)?(typeof x=="function"&&(Ss(t,a,x,n),B=t.memoizedState),(X=ka||zf(t,a,X,n,U,B,E)||e!==null&&e.dependencies!==null&&Pr(e.dependencies))?(O||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(n,B,E),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(n,B,E)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||m===e.memoizedProps&&U===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&U===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=B),u.props=n,u.state=B,u.context=E,n=X):(typeof u.componentDidUpdate!="function"||m===e.memoizedProps&&U===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&U===e.memoizedState||(t.flags|=1024),n=!1)}return u=n,pi(e,t),n=(t.flags&128)!==0,u||n?(u=t.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:u.render(),t.flags|=1,e!==null&&n?(t.child=Qn(t,e.child,null,o),t.child=Qn(t,null,a,o)):tt(e,t,a,o),t.memoizedState=u.state,e=t.child):e=da(e,t,o),e}function Zf(e,t,a,n){return El(),t.flags|=256,tt(e,t,a,n),t.child}var _s={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Cs(e){return{baseLanes:e,cachePool:Rd()}}function zs(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=Bt),e}function $f(e,t,a){var n=t.pendingProps,o=!1,u=(t.flags&128)!==0,m;if((m=u)||(m=e!==null&&e.memoizedState===null?!1:(Ke.current&2)!==0),m&&(o=!0,t.flags&=-129),m=(t.flags&32)!==0,t.flags&=-33,e===null){if(ke){if(o?za(t):Aa(),ke){var x=qe,E;if(E=x){e:{for(E=x,x=Jt;E.nodeType!==8;){if(!x){x=null;break e}if(E=Qt(E.nextSibling),E===null){x=null;break e}}x=E}x!==null?(t.memoizedState={dehydrated:x,treeContext:en!==null?{id:ra,overflow:ia}:null,retryLane:536870912,hydrationErrors:null},E=Nt(18,null,null,0),E.stateNode=x,E.return=t,t.child=E,st=t,qe=null,E=!0):E=!1}E||nn(t)}if(x=t.memoizedState,x!==null&&(x=x.dehydrated,x!==null))return pc(x)?t.lanes=32:t.lanes=536870912,null;ua(t)}return x=n.children,n=n.fallback,o?(Aa(),o=t.mode,x=mi({mode:"hidden",children:x},o),n=Wa(n,o,a,null),x.return=t,n.return=t,x.sibling=n,t.child=x,o=t.child,o.memoizedState=Cs(a),o.childLanes=zs(e,m,a),t.memoizedState=_s,n):(za(t),As(t,x))}if(E=e.memoizedState,E!==null&&(x=E.dehydrated,x!==null)){if(u)t.flags&256?(za(t),t.flags&=-257,t=Rs(e,t,a)):t.memoizedState!==null?(Aa(),t.child=e.child,t.flags|=128,t=null):(Aa(),o=n.fallback,x=t.mode,n=mi({mode:"visible",children:n.children},x),o=Wa(o,x,a,null),o.flags|=2,n.return=t,o.return=t,n.sibling=o,t.child=n,Qn(t,e.child,null,a),n=t.child,n.memoizedState=Cs(a),n.childLanes=zs(e,m,a),t.memoizedState=_s,t=o);else if(za(t),pc(x)){if(m=x.nextSibling&&x.nextSibling.dataset,m)var O=m.dgst;m=O,n=Error(c(419)),n.stack="",n.digest=m,kl({value:n,source:null,stack:null}),t=Rs(e,t,a)}else if(Fe||Tl(e,t,a,!1),m=(a&e.childLanes)!==0,Fe||m){if(m=Oe,m!==null&&(n=a&-a,n=(n&42)!==0?1:mo(n),n=(n&(m.suspendedLanes|a))!==0?0:n,n!==0&&n!==E.retryLane))throw E.retryLane=n,On(e,n),_t(m,e,n),Bf;x.data==="$?"||Js(),t=Rs(e,t,a)}else x.data==="$?"?(t.flags|=192,t.child=e.child,t=null):(e=E.treeContext,qe=Qt(x.nextSibling),st=t,ke=!0,an=null,Jt=!1,e!==null&&(Dt[Mt++]=ra,Dt[Mt++]=ia,Dt[Mt++]=en,ra=e.id,ia=e.overflow,en=t),t=As(t,n.children),t.flags|=4096);return t}return o?(Aa(),o=n.fallback,x=t.mode,E=e.child,O=E.sibling,n=la(E,{mode:"hidden",children:n.children}),n.subtreeFlags=E.subtreeFlags&65011712,O!==null?o=la(O,o):(o=Wa(o,x,a,null),o.flags|=2),o.return=t,n.return=t,n.sibling=o,t.child=n,n=o,o=t.child,x=e.child.memoizedState,x===null?x=Cs(a):(E=x.cachePool,E!==null?(O=Pe._currentValue,E=E.parent!==O?{parent:O,pool:O}:E):E=Rd(),x={baseLanes:x.baseLanes|a,cachePool:E}),o.memoizedState=x,o.childLanes=zs(e,m,a),t.memoizedState=_s,n):(za(t),a=e.child,e=a.sibling,a=la(a,{mode:"visible",children:n.children}),a.return=t,a.sibling=null,e!==null&&(m=t.deletions,m===null?(t.deletions=[e],t.flags|=16):m.push(e)),t.child=a,t.memoizedState=null,a)}function As(e,t){return t=mi({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function mi(e,t){return e=Nt(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Rs(e,t,a){return Qn(t,e.child,null,a),e=As(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Pf(e,t,a){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Jo(e.return,t,a)}function Ls(e,t,a,n,o){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:o}:(u.isBackwards=t,u.rendering=null,u.renderingStartTime=0,u.last=n,u.tail=a,u.tailMode=o)}function Kf(e,t,a){var n=t.pendingProps,o=n.revealOrder,u=n.tail;if(tt(e,t,n.children,a),n=Ke.current,(n&2)!==0)n=n&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Pf(e,a,t);else if(e.tag===19)Pf(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}switch(D(Ke,n),o){case"forwards":for(a=t.child,o=null;a!==null;)e=a.alternate,e!==null&&ui(e)===null&&(o=a),a=a.sibling;a=o,a===null?(o=t.child,t.child=null):(o=a.sibling,a.sibling=null),Ls(t,!1,o,a,u);break;case"backwards":for(a=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&ui(e)===null){t.child=o;break}e=o.sibling,o.sibling=a,a=o,o=e}Ls(t,!0,a,null,u);break;case"together":Ls(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function da(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Ma|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(Tl(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(c(153));if(t.child!==null){for(e=t.child,a=la(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=la(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Os(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Pr(e)))}function Gg(e,t,a){switch(t.tag){case 3:Ee(t,t.stateNode.containerInfo),Ea(t,Pe,e.memoizedState.cache),El();break;case 27:case 5:dt(t);break;case 4:Ee(t,t.stateNode.containerInfo);break;case 10:Ea(t,t.type,t.memoizedProps.value);break;case 13:var n=t.memoizedState;if(n!==null)return n.dehydrated!==null?(za(t),t.flags|=128,null):(a&t.child.childLanes)!==0?$f(e,t,a):(za(t),e=da(e,t,a),e!==null?e.sibling:null);za(t);break;case 19:var o=(e.flags&128)!==0;if(n=(a&t.childLanes)!==0,n||(Tl(e,t,a,!1),n=(a&t.childLanes)!==0),o){if(n)return Kf(e,t,a);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),D(Ke,Ke.current),n)break;return null;case 22:case 23:return t.lanes=0,Yf(e,t,a);case 24:Ea(t,Pe,e.memoizedState.cache)}return da(e,t,a)}function Jf(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Fe=!0;else{if(!Os(e,a)&&(t.flags&128)===0)return Fe=!1,Gg(e,t,a);Fe=(e.flags&131072)!==0}else Fe=!1,ke&&(t.flags&1048576)!==0&&Ed(t,$r,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var n=t.elementType,o=n._init;if(n=o(n._payload),t.type=n,typeof n=="function")Xo(n)?(e=cn(n,e),t.tag=1,t=Qf(null,t,n,e,a)):(t.tag=0,t=Ts(null,t,n,e,a));else{if(n!=null){if(o=n.$$typeof,o===F){t.tag=11,t=Hf(null,t,n,e,a);break e}else if(o===Y){t.tag=14,t=qf(null,t,n,e,a);break e}}throw t=J(n)||n,Error(c(306,t,""))}}return t;case 0:return Ts(e,t,t.type,t.pendingProps,a);case 1:return n=t.type,o=cn(n,t.pendingProps),Qf(e,t,n,o,a);case 3:e:{if(Ee(t,t.stateNode.containerInfo),e===null)throw Error(c(387));n=t.pendingProps;var u=t.memoizedState;o=u.element,ns(e,t),Ol(t,n,null,a);var m=t.memoizedState;if(n=m.cache,Ea(t,Pe,n),n!==u.cache&&Fo(t,[Pe],a,!0),Ll(),n=m.element,u.isDehydrated)if(u={element:n,isDehydrated:!1,cache:m.cache},t.updateQueue.baseState=u,t.memoizedState=u,t.flags&256){t=Zf(e,t,n,a);break e}else if(n!==o){o=Lt(Error(c(424)),t),kl(o),t=Zf(e,t,n,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(qe=Qt(e.firstChild),st=t,ke=!0,an=null,Jt=!0,a=_f(t,null,n,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(El(),n===o){t=da(e,t,a);break e}tt(e,t,n,a)}t=t.child}return t;case 26:return pi(e,t),e===null?(a=e0(t.type,null,t.pendingProps,null))?t.memoizedState=a:ke||(a=t.type,e=t.pendingProps,n=_i(me.current).createElement(a),n[lt]=t,n[ft]=e,nt(n,a,e),Je(n),t.stateNode=n):t.memoizedState=e0(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return dt(t),e===null&&ke&&(n=t.stateNode=Fp(t.type,t.pendingProps,me.current),st=t,Jt=!0,o=qe,qa(t.type)?(mc=o,qe=Qt(n.firstChild)):qe=o),tt(e,t,t.pendingProps.children,a),pi(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ke&&((o=n=qe)&&(n=hx(n,t.type,t.pendingProps,Jt),n!==null?(t.stateNode=n,st=t,qe=Qt(n.firstChild),Jt=!1,o=!0):o=!1),o||nn(t)),dt(t),o=t.type,u=t.pendingProps,m=e!==null?e.memoizedProps:null,n=u.children,uc(o,u)?n=null:m!==null&&uc(o,m)&&(t.flags|=32),t.memoizedState!==null&&(o=cs(e,t,Lg,null,null,a),ar._currentValue=o),pi(e,t),tt(e,t,n,a),t.child;case 6:return e===null&&ke&&((e=a=qe)&&(a=gx(a,t.pendingProps,Jt),a!==null?(t.stateNode=a,st=t,qe=null,e=!0):e=!1),e||nn(t)),null;case 13:return $f(e,t,a);case 4:return Ee(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Qn(t,null,n,a):tt(e,t,n,a),t.child;case 11:return Hf(e,t,t.type,t.pendingProps,a);case 7:return tt(e,t,t.pendingProps,a),t.child;case 8:return tt(e,t,t.pendingProps.children,a),t.child;case 12:return tt(e,t,t.pendingProps.children,a),t.child;case 10:return n=t.pendingProps,Ea(t,t.type,n.value),tt(e,t,n.children,a),t.child;case 9:return o=t.type._context,n=t.pendingProps.children,rn(t),o=rt(o),n=n(o),t.flags|=1,tt(e,t,n,a),t.child;case 14:return qf(e,t,t.type,t.pendingProps,a);case 15:return Gf(e,t,t.type,t.pendingProps,a);case 19:return Kf(e,t,a);case 31:return n=t.pendingProps,a=t.mode,n={mode:n.mode,children:n.children},e===null?(a=mi(n,a),a.ref=t.ref,t.child=a,a.return=t,t=a):(a=la(e.child,n),a.ref=t.ref,t.child=a,a.return=t,t=a),t;case 22:return Yf(e,t,a);case 24:return rn(t),n=rt(Pe),e===null?(o=es(),o===null&&(o=Oe,u=Io(),o.pooledCache=u,u.refCount++,u!==null&&(o.pooledCacheLanes|=a),o=u),t.memoizedState={parent:n,cache:o},as(t),Ea(t,Pe,o)):((e.lanes&a)!==0&&(ns(e,t),Ol(t,null,null,a),Ll()),o=e.memoizedState,u=t.memoizedState,o.parent!==n?(o={parent:n,cache:n},t.memoizedState=o,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=o),Ea(t,Pe,n)):(n=u.cache,Ea(t,Pe,n),n!==o.cache&&Fo(t,[Pe],a,!0))),tt(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(c(156,t.tag))}function fa(e){e.flags|=4}function Ff(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!r0(t)){if(t=Ut.current,t!==null&&((je&4194048)===je?Ft!==null:(je&62914560)!==je&&(je&536870912)===0||t!==Ft))throw Al=ts,Ld;e.flags|=8192}}function hi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?_u():536870912,e.lanes|=t,Kn|=t)}function Gl(e,t){if(!ke)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function Be(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,n=0;if(t)for(var o=e.child;o!==null;)a|=o.lanes|o.childLanes,n|=o.subtreeFlags&65011712,n|=o.flags&65011712,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)a|=o.lanes|o.childLanes,n|=o.subtreeFlags,n|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=n,e.childLanes=a,t}function Yg(e,t,a){var n=t.pendingProps;switch($o(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Be(t),null;case 1:return Be(t),null;case 3:return a=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),sa(Pe),ut(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Sl(t)?fa(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,_d())),Be(t),null;case 26:return a=t.memoizedState,e===null?(fa(t),a!==null?(Be(t),Ff(t,a)):(Be(t),t.flags&=-16777217)):a?a!==e.memoizedState?(fa(t),Be(t),Ff(t,a)):(Be(t),t.flags&=-16777217):(e.memoizedProps!==n&&fa(t),Be(t),t.flags&=-16777217),null;case 27:zt(t),a=me.current;var o=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==n&&fa(t);else{if(!n){if(t.stateNode===null)throw Error(c(166));return Be(t),null}e=$.current,Sl(t)?kd(t):(e=Fp(o,n,a),t.stateNode=e,fa(t))}return Be(t),null;case 5:if(zt(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&fa(t);else{if(!n){if(t.stateNode===null)throw Error(c(166));return Be(t),null}if(e=$.current,Sl(t))kd(t);else{switch(o=_i(me.current),e){case 1:e=o.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=o.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof n.is=="string"?o.createElement("select",{is:n.is}):o.createElement("select"),n.multiple?e.multiple=!0:n.size&&(e.size=n.size);break;default:e=typeof n.is=="string"?o.createElement(a,{is:n.is}):o.createElement(a)}}e[lt]=t,e[ft]=n;e:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)e.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;o.sibling===null;){if(o.return===null||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=e;e:switch(nt(e,a,n),a){case"button":case"input":case"select":case"textarea":e=!!n.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&fa(t)}}return Be(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&fa(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(c(166));if(e=me.current,Sl(t)){if(e=t.stateNode,a=t.memoizedProps,n=null,o=st,o!==null)switch(o.tag){case 27:case 5:n=o.memoizedProps}e[lt]=t,e=!!(e.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||Vp(e.nodeValue,a)),e||nn(t)}else e=_i(e).createTextNode(n),e[lt]=t,t.stateNode=e}return Be(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(o=Sl(t),n!==null&&n.dehydrated!==null){if(e===null){if(!o)throw Error(c(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(c(317));o[lt]=t}else El(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Be(t),o=!1}else o=_d(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return t.flags&256?(ua(t),t):(ua(t),null)}if(ua(t),(t.flags&128)!==0)return t.lanes=a,t;if(a=n!==null,e=e!==null&&e.memoizedState!==null,a){n=t.child,o=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(o=n.alternate.memoizedState.cachePool.pool);var u=null;n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(u=n.memoizedState.cachePool.pool),u!==o&&(n.flags|=2048)}return a!==e&&a&&(t.child.flags|=8192),hi(t,t.updateQueue),Be(t),null;case 4:return ut(),e===null&&rc(t.stateNode.containerInfo),Be(t),null;case 10:return sa(t.type),Be(t),null;case 19:if(j(Ke),o=t.memoizedState,o===null)return Be(t),null;if(n=(t.flags&128)!==0,u=o.rendering,u===null)if(n)Gl(o,!1);else{if(Ge!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(u=ui(e),u!==null){for(t.flags|=128,Gl(o,!1),e=u.updateQueue,t.updateQueue=e,hi(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Sd(a,e),a=a.sibling;return D(Ke,Ke.current&1|2),t.child}e=e.sibling}o.tail!==null&&Kt()>bi&&(t.flags|=128,n=!0,Gl(o,!1),t.lanes=4194304)}else{if(!n)if(e=ui(u),e!==null){if(t.flags|=128,n=!0,e=e.updateQueue,t.updateQueue=e,hi(t,e),Gl(o,!0),o.tail===null&&o.tailMode==="hidden"&&!u.alternate&&!ke)return Be(t),null}else 2*Kt()-o.renderingStartTime>bi&&a!==536870912&&(t.flags|=128,n=!0,Gl(o,!1),t.lanes=4194304);o.isBackwards?(u.sibling=t.child,t.child=u):(e=o.last,e!==null?e.sibling=u:t.child=u,o.last=u)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Kt(),t.sibling=null,e=Ke.current,D(Ke,n?e&1|2:e&1),t):(Be(t),null);case 22:case 23:return ua(t),os(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(a&536870912)!==0&&(t.flags&128)===0&&(Be(t),t.subtreeFlags&6&&(t.flags|=8192)):Be(t),a=t.updateQueue,a!==null&&hi(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==a&&(t.flags|=2048),e!==null&&j(on),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),sa(Pe),Be(t),null;case 25:return null;case 30:return null}throw Error(c(156,t.tag))}function Xg(e,t){switch($o(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return sa(Pe),ut(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return zt(t),null;case 13:if(ua(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(c(340));El()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return j(Ke),null;case 4:return ut(),null;case 10:return sa(t.type),null;case 22:case 23:return ua(t),os(),e!==null&&j(on),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return sa(Pe),null;case 25:return null;default:return null}}function If(e,t){switch($o(t),t.tag){case 3:sa(Pe),ut();break;case 26:case 27:case 5:zt(t);break;case 4:ut();break;case 13:ua(t);break;case 19:j(Ke);break;case 10:sa(t.type);break;case 22:case 23:ua(t),os(),e!==null&&j(on);break;case 24:sa(Pe)}}function Yl(e,t){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var o=n.next;a=o;do{if((a.tag&e)===e){n=void 0;var u=a.create,m=a.inst;n=u(),m.destroy=n}a=a.next}while(a!==o)}}catch(x){Le(t,t.return,x)}}function Ra(e,t,a){try{var n=t.updateQueue,o=n!==null?n.lastEffect:null;if(o!==null){var u=o.next;n=u;do{if((n.tag&e)===e){var m=n.inst,x=m.destroy;if(x!==void 0){m.destroy=void 0,o=t;var E=a,O=x;try{O()}catch(X){Le(o,E,X)}}}n=n.next}while(n!==u)}}catch(X){Le(t,t.return,X)}}function Wf(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Hd(t,a)}catch(n){Le(e,e.return,n)}}}function ep(e,t,a){a.props=cn(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(n){Le(e,t,n)}}function Xl(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}typeof a=="function"?e.refCleanup=a(n):a.current=n}}catch(o){Le(e,t,o)}}function It(e,t){var a=e.ref,n=e.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(o){Le(e,t,o)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(o){Le(e,t,o)}else a.current=null}function tp(e){var t=e.type,a=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(o){Le(e,e.return,o)}}function Ds(e,t,a){try{var n=e.stateNode;ux(n,e.type,a,t),n[ft]=t}catch(o){Le(e,e.return,o)}}function ap(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&qa(e.type)||e.tag===4}function Ms(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||ap(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&qa(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Us(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Ti));else if(n!==4&&(n===27&&qa(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Us(e,t,a),e=e.sibling;e!==null;)Us(e,t,a),e=e.sibling}function gi(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(n!==4&&(n===27&&qa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(gi(e,t,a),e=e.sibling;e!==null;)gi(e,t,a),e=e.sibling}function np(e){var t=e.stateNode,a=e.memoizedProps;try{for(var n=e.type,o=t.attributes;o.length;)t.removeAttributeNode(o[0]);nt(t,n,a),t[lt]=e,t[ft]=a}catch(u){Le(e,e.return,u)}}var pa=!1,Xe=!1,Bs=!1,lp=typeof WeakSet=="function"?WeakSet:Set,Ie=null;function Vg(e,t){if(e=e.containerInfo,sc=Oi,e=md(e),Mo(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var n=a.getSelection&&a.getSelection();if(n&&n.rangeCount!==0){a=n.anchorNode;var o=n.anchorOffset,u=n.focusNode;n=n.focusOffset;try{a.nodeType,u.nodeType}catch{a=null;break e}var m=0,x=-1,E=-1,O=0,X=0,Z=e,U=null;t:for(;;){for(var B;Z!==a||o!==0&&Z.nodeType!==3||(x=m+o),Z!==u||n!==0&&Z.nodeType!==3||(E=m+n),Z.nodeType===3&&(m+=Z.nodeValue.length),(B=Z.firstChild)!==null;)U=Z,Z=B;for(;;){if(Z===e)break t;if(U===a&&++O===o&&(x=m),U===u&&++X===n&&(E=m),(B=Z.nextSibling)!==null)break;Z=U,U=Z.parentNode}Z=B}a=x===-1||E===-1?null:{start:x,end:E}}else a=null}a=a||{start:0,end:0}}else a=null;for(cc={focusedElem:e,selectionRange:a},Oi=!1,Ie=t;Ie!==null;)if(t=Ie,e=t.child,(t.subtreeFlags&1024)!==0&&e!==null)e.return=t,Ie=e;else for(;Ie!==null;){switch(t=Ie,u=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&u!==null){e=void 0,a=t,o=u.memoizedProps,u=u.memoizedState,n=a.stateNode;try{var fe=cn(a.type,o,a.elementType===a.type);e=n.getSnapshotBeforeUpdate(fe,u),n.__reactInternalSnapshotBeforeUpdate=e}catch(se){Le(a,a.return,se)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)fc(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":fc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(c(163))}if(e=t.sibling,e!==null){e.return=t.return,Ie=e;break}Ie=t.return}}function rp(e,t,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:La(e,a),n&4&&Yl(5,a);break;case 1:if(La(e,a),n&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(m){Le(a,a.return,m)}else{var o=cn(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(o,t,e.__reactInternalSnapshotBeforeUpdate)}catch(m){Le(a,a.return,m)}}n&64&&Wf(a),n&512&&Xl(a,a.return);break;case 3:if(La(e,a),n&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Hd(e,t)}catch(m){Le(a,a.return,m)}}break;case 27:t===null&&n&4&&np(a);case 26:case 5:La(e,a),t===null&&n&4&&tp(a),n&512&&Xl(a,a.return);break;case 12:La(e,a);break;case 13:La(e,a),n&4&&sp(e,a),n&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Wg.bind(null,a),xx(e,a))));break;case 22:if(n=a.memoizedState!==null||pa,!n){t=t!==null&&t.memoizedState!==null||Xe,o=pa;var u=Xe;pa=n,(Xe=t)&&!u?Oa(e,a,(a.subtreeFlags&8772)!==0):La(e,a),pa=o,Xe=u}break;case 30:break;default:La(e,a)}}function ip(e){var t=e.alternate;t!==null&&(e.alternate=null,ip(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&xo(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Me=null,ht=!1;function ma(e,t,a){for(a=a.child;a!==null;)op(e,t,a),a=a.sibling}function op(e,t,a){if(yt&&typeof yt.onCommitFiberUnmount=="function")try{yt.onCommitFiberUnmount(ul,a)}catch{}switch(a.tag){case 26:Xe||It(a,t),ma(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Xe||It(a,t);var n=Me,o=ht;qa(a.type)&&(Me=a.stateNode,ht=!1),ma(e,t,a),Il(a.stateNode),Me=n,ht=o;break;case 5:Xe||It(a,t);case 6:if(n=Me,o=ht,Me=null,ma(e,t,a),Me=n,ht=o,Me!==null)if(ht)try{(Me.nodeType===9?Me.body:Me.nodeName==="HTML"?Me.ownerDocument.body:Me).removeChild(a.stateNode)}catch(u){Le(a,t,u)}else try{Me.removeChild(a.stateNode)}catch(u){Le(a,t,u)}break;case 18:Me!==null&&(ht?(e=Me,Kp(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),ir(e)):Kp(Me,a.stateNode));break;case 4:n=Me,o=ht,Me=a.stateNode.containerInfo,ht=!0,ma(e,t,a),Me=n,ht=o;break;case 0:case 11:case 14:case 15:Xe||Ra(2,a,t),Xe||Ra(4,a,t),ma(e,t,a);break;case 1:Xe||(It(a,t),n=a.stateNode,typeof n.componentWillUnmount=="function"&&ep(a,t,n)),ma(e,t,a);break;case 21:ma(e,t,a);break;case 22:Xe=(n=Xe)||a.memoizedState!==null,ma(e,t,a),Xe=n;break;default:ma(e,t,a)}}function sp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ir(e)}catch(a){Le(t,t.return,a)}}function Qg(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new lp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new lp),t;default:throw Error(c(435,e.tag))}}function Hs(e,t){var a=Qg(e);t.forEach(function(n){var o=ex.bind(null,e,n);a.has(n)||(a.add(n),n.then(o,o))})}function St(e,t){var a=t.deletions;if(a!==null)for(var n=0;n<a.length;n++){var o=a[n],u=e,m=t,x=m;e:for(;x!==null;){switch(x.tag){case 27:if(qa(x.type)){Me=x.stateNode,ht=!1;break e}break;case 5:Me=x.stateNode,ht=!1;break e;case 3:case 4:Me=x.stateNode.containerInfo,ht=!0;break e}x=x.return}if(Me===null)throw Error(c(160));op(u,m,o),Me=null,ht=!1,u=o.alternate,u!==null&&(u.return=null),o.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)cp(t,e),t=t.sibling}var Vt=null;function cp(e,t){var a=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:St(t,e),Et(e),n&4&&(Ra(3,e,e.return),Yl(3,e),Ra(5,e,e.return));break;case 1:St(t,e),Et(e),n&512&&(Xe||a===null||It(a,a.return)),n&64&&pa&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:var o=Vt;if(St(t,e),Et(e),n&512&&(Xe||a===null||It(a,a.return)),n&4){var u=a!==null?a.memoizedState:null;if(n=e.memoizedState,a===null)if(n===null)if(e.stateNode===null){e:{n=e.type,a=e.memoizedProps,o=o.ownerDocument||o;t:switch(n){case"title":u=o.getElementsByTagName("title")[0],(!u||u[pl]||u[lt]||u.namespaceURI==="http://www.w3.org/2000/svg"||u.hasAttribute("itemprop"))&&(u=o.createElement(n),o.head.insertBefore(u,o.querySelector("head > title"))),nt(u,n,a),u[lt]=e,Je(u),n=u;break e;case"link":var m=n0("link","href",o).get(n+(a.href||""));if(m){for(var x=0;x<m.length;x++)if(u=m[x],u.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&u.getAttribute("rel")===(a.rel==null?null:a.rel)&&u.getAttribute("title")===(a.title==null?null:a.title)&&u.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){m.splice(x,1);break t}}u=o.createElement(n),nt(u,n,a),o.head.appendChild(u);break;case"meta":if(m=n0("meta","content",o).get(n+(a.content||""))){for(x=0;x<m.length;x++)if(u=m[x],u.getAttribute("content")===(a.content==null?null:""+a.content)&&u.getAttribute("name")===(a.name==null?null:a.name)&&u.getAttribute("property")===(a.property==null?null:a.property)&&u.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&u.getAttribute("charset")===(a.charSet==null?null:a.charSet)){m.splice(x,1);break t}}u=o.createElement(n),nt(u,n,a),o.head.appendChild(u);break;default:throw Error(c(468,n))}u[lt]=e,Je(u),n=u}e.stateNode=n}else l0(o,e.type,e.stateNode);else e.stateNode=a0(o,n,e.memoizedProps);else u!==n?(u===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):u.count--,n===null?l0(o,e.type,e.stateNode):a0(o,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Ds(e,e.memoizedProps,a.memoizedProps)}break;case 27:St(t,e),Et(e),n&512&&(Xe||a===null||It(a,a.return)),a!==null&&n&4&&Ds(e,e.memoizedProps,a.memoizedProps);break;case 5:if(St(t,e),Et(e),n&512&&(Xe||a===null||It(a,a.return)),e.flags&32){o=e.stateNode;try{Tn(o,"")}catch(B){Le(e,e.return,B)}}n&4&&e.stateNode!=null&&(o=e.memoizedProps,Ds(e,o,a!==null?a.memoizedProps:o)),n&1024&&(Bs=!0);break;case 6:if(St(t,e),Et(e),n&4){if(e.stateNode===null)throw Error(c(162));n=e.memoizedProps,a=e.stateNode;try{a.nodeValue=n}catch(B){Le(e,e.return,B)}}break;case 3:if(Ai=null,o=Vt,Vt=Ci(t.containerInfo),St(t,e),Vt=o,Et(e),n&4&&a!==null&&a.memoizedState.isDehydrated)try{ir(t.containerInfo)}catch(B){Le(e,e.return,B)}Bs&&(Bs=!1,up(e));break;case 4:n=Vt,Vt=Ci(e.stateNode.containerInfo),St(t,e),Et(e),Vt=n;break;case 12:St(t,e),Et(e);break;case 13:St(t,e),Et(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Qs=Kt()),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Hs(e,n)));break;case 22:o=e.memoizedState!==null;var E=a!==null&&a.memoizedState!==null,O=pa,X=Xe;if(pa=O||o,Xe=X||E,St(t,e),Xe=X,pa=O,Et(e),n&8192)e:for(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,o&&(a===null||E||pa||Xe||un(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){E=a=t;try{if(u=E.stateNode,o)m=u.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none";else{x=E.stateNode;var Z=E.memoizedProps.style,U=Z!=null&&Z.hasOwnProperty("display")?Z.display:null;x.style.display=U==null||typeof U=="boolean"?"":(""+U).trim()}}catch(B){Le(E,E.return,B)}}}else if(t.tag===6){if(a===null){E=t;try{E.stateNode.nodeValue=o?"":E.memoizedProps}catch(B){Le(E,E.return,B)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}n&4&&(n=e.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Hs(e,a))));break;case 19:St(t,e),Et(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Hs(e,n)));break;case 30:break;case 21:break;default:St(t,e),Et(e)}}function Et(e){var t=e.flags;if(t&2){try{for(var a,n=e.return;n!==null;){if(ap(n)){a=n;break}n=n.return}if(a==null)throw Error(c(160));switch(a.tag){case 27:var o=a.stateNode,u=Ms(e);gi(e,u,o);break;case 5:var m=a.stateNode;a.flags&32&&(Tn(m,""),a.flags&=-33);var x=Ms(e);gi(e,x,m);break;case 3:case 4:var E=a.stateNode.containerInfo,O=Ms(e);Us(e,O,E);break;default:throw Error(c(161))}}catch(X){Le(e,e.return,X)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function up(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;up(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function La(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)rp(e,t.alternate,t),t=t.sibling}function un(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ra(4,t,t.return),un(t);break;case 1:It(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&ep(t,t.return,a),un(t);break;case 27:Il(t.stateNode);case 26:case 5:It(t,t.return),un(t);break;case 22:t.memoizedState===null&&un(t);break;case 30:un(t);break;default:un(t)}e=e.sibling}}function Oa(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var n=t.alternate,o=e,u=t,m=u.flags;switch(u.tag){case 0:case 11:case 15:Oa(o,u,a),Yl(4,u);break;case 1:if(Oa(o,u,a),n=u,o=n.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(O){Le(n,n.return,O)}if(n=u,o=n.updateQueue,o!==null){var x=n.stateNode;try{var E=o.shared.hiddenCallbacks;if(E!==null)for(o.shared.hiddenCallbacks=null,o=0;o<E.length;o++)Bd(E[o],x)}catch(O){Le(n,n.return,O)}}a&&m&64&&Wf(u),Xl(u,u.return);break;case 27:np(u);case 26:case 5:Oa(o,u,a),a&&n===null&&m&4&&tp(u),Xl(u,u.return);break;case 12:Oa(o,u,a);break;case 13:Oa(o,u,a),a&&m&4&&sp(o,u);break;case 22:u.memoizedState===null&&Oa(o,u,a),Xl(u,u.return);break;case 30:break;default:Oa(o,u,a)}t=t.sibling}}function qs(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&_l(a))}function Gs(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&_l(e))}function Wt(e,t,a,n){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)dp(e,t,a,n),t=t.sibling}function dp(e,t,a,n){var o=t.flags;switch(t.tag){case 0:case 11:case 15:Wt(e,t,a,n),o&2048&&Yl(9,t);break;case 1:Wt(e,t,a,n);break;case 3:Wt(e,t,a,n),o&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&_l(e)));break;case 12:if(o&2048){Wt(e,t,a,n),e=t.stateNode;try{var u=t.memoizedProps,m=u.id,x=u.onPostCommit;typeof x=="function"&&x(m,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(E){Le(t,t.return,E)}}else Wt(e,t,a,n);break;case 13:Wt(e,t,a,n);break;case 23:break;case 22:u=t.stateNode,m=t.alternate,t.memoizedState!==null?u._visibility&2?Wt(e,t,a,n):Vl(e,t):u._visibility&2?Wt(e,t,a,n):(u._visibility|=2,Zn(e,t,a,n,(t.subtreeFlags&10256)!==0)),o&2048&&qs(m,t);break;case 24:Wt(e,t,a,n),o&2048&&Gs(t.alternate,t);break;default:Wt(e,t,a,n)}}function Zn(e,t,a,n,o){for(o=o&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var u=e,m=t,x=a,E=n,O=m.flags;switch(m.tag){case 0:case 11:case 15:Zn(u,m,x,E,o),Yl(8,m);break;case 23:break;case 22:var X=m.stateNode;m.memoizedState!==null?X._visibility&2?Zn(u,m,x,E,o):Vl(u,m):(X._visibility|=2,Zn(u,m,x,E,o)),o&&O&2048&&qs(m.alternate,m);break;case 24:Zn(u,m,x,E,o),o&&O&2048&&Gs(m.alternate,m);break;default:Zn(u,m,x,E,o)}t=t.sibling}}function Vl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,n=t,o=n.flags;switch(n.tag){case 22:Vl(a,n),o&2048&&qs(n.alternate,n);break;case 24:Vl(a,n),o&2048&&Gs(n.alternate,n);break;default:Vl(a,n)}t=t.sibling}}var Ql=8192;function $n(e){if(e.subtreeFlags&Ql)for(e=e.child;e!==null;)fp(e),e=e.sibling}function fp(e){switch(e.tag){case 26:$n(e),e.flags&Ql&&e.memoizedState!==null&&zx(Vt,e.memoizedState,e.memoizedProps);break;case 5:$n(e);break;case 3:case 4:var t=Vt;Vt=Ci(e.stateNode.containerInfo),$n(e),Vt=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=Ql,Ql=16777216,$n(e),Ql=t):$n(e));break;default:$n(e)}}function pp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Zl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];Ie=n,hp(n,e)}pp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)mp(e),e=e.sibling}function mp(e){switch(e.tag){case 0:case 11:case 15:Zl(e),e.flags&2048&&Ra(9,e,e.return);break;case 3:Zl(e);break;case 12:Zl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,xi(e)):Zl(e);break;default:Zl(e)}}function xi(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];Ie=n,hp(n,e)}pp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ra(8,t,t.return),xi(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,xi(t));break;default:xi(t)}e=e.sibling}}function hp(e,t){for(;Ie!==null;){var a=Ie;switch(a.tag){case 0:case 11:case 15:Ra(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:_l(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,Ie=n;else e:for(a=e;Ie!==null;){n=Ie;var o=n.sibling,u=n.return;if(ip(n),n===a){Ie=null;break e}if(o!==null){o.return=u,Ie=o;break e}Ie=u}}}var Zg={getCacheForType:function(e){var t=rt(Pe),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a}},$g=typeof WeakMap=="function"?WeakMap:Map,_e=0,Oe=null,ye=null,je=0,Ce=0,kt=null,Da=!1,Pn=!1,Ys=!1,ha=0,Ge=0,Ma=0,dn=0,Xs=0,Bt=0,Kn=0,$l=null,gt=null,Vs=!1,Qs=0,bi=1/0,vi=null,Ua=null,at=0,Ba=null,Jn=null,Fn=0,Zs=0,$s=null,gp=null,Pl=0,Ps=null;function Tt(){if((_e&2)!==0&&je!==0)return je&-je;if(R.T!==null){var e=Bn;return e!==0?e:tc()}return Au()}function xp(){Bt===0&&(Bt=(je&536870912)===0||ke?Tu():536870912);var e=Ut.current;return e!==null&&(e.flags|=32),Bt}function _t(e,t,a){(e===Oe&&(Ce===2||Ce===9)||e.cancelPendingCommit!==null)&&(In(e,0),Ha(e,je,Bt,!1)),fl(e,a),((_e&2)===0||e!==Oe)&&(e===Oe&&((_e&2)===0&&(dn|=a),Ge===4&&Ha(e,je,Bt,!1)),ea(e))}function bp(e,t,a){if((_e&6)!==0)throw Error(c(327));var n=!a&&(t&124)===0&&(t&e.expiredLanes)===0||dl(e,t),o=n?Jg(e,t):Fs(e,t,!0),u=n;do{if(o===0){Pn&&!n&&Ha(e,t,0,!1);break}else{if(a=e.current.alternate,u&&!Pg(a)){o=Fs(e,t,!1),u=!1;continue}if(o===2){if(u=t,e.errorRecoveryDisabledLanes&u)var m=0;else m=e.pendingLanes&-536870913,m=m!==0?m:m&536870912?536870912:0;if(m!==0){t=m;e:{var x=e;o=$l;var E=x.current.memoizedState.isDehydrated;if(E&&(In(x,m).flags|=256),m=Fs(x,m,!1),m!==2){if(Ys&&!E){x.errorRecoveryDisabledLanes|=u,dn|=u,o=4;break e}u=gt,gt=o,u!==null&&(gt===null?gt=u:gt.push.apply(gt,u))}o=m}if(u=!1,o!==2)continue}}if(o===1){In(e,0),Ha(e,t,0,!0);break}e:{switch(n=e,u=o,u){case 0:case 1:throw Error(c(345));case 4:if((t&4194048)!==t)break;case 6:Ha(n,t,Bt,!Da);break e;case 2:gt=null;break;case 3:case 5:break;default:throw Error(c(329))}if((t&62914560)===t&&(o=Qs+300-Kt(),10<o)){if(Ha(n,t,Bt,!Da),zr(n,0,!0)!==0)break e;n.timeoutHandle=$p(vp.bind(null,n,a,gt,vi,Vs,t,Bt,dn,Kn,Da,u,2,-0,0),o);break e}vp(n,a,gt,vi,Vs,t,Bt,dn,Kn,Da,u,0,-0,0)}}break}while(!0);ea(e)}function vp(e,t,a,n,o,u,m,x,E,O,X,Z,U,B){if(e.timeoutHandle=-1,Z=t.subtreeFlags,(Z&8192||(Z&16785408)===16785408)&&(tr={stylesheets:null,count:0,unsuspend:Cx},fp(t),Z=Ax(),Z!==null)){e.cancelPendingCommit=Z(kp.bind(null,e,t,u,a,n,o,m,x,E,X,1,U,B)),Ha(e,u,m,!O);return}kp(e,t,u,a,n,o,m,x,E)}function Pg(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var o=a[n],u=o.getSnapshot;o=o.value;try{if(!jt(u(),o))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ha(e,t,a,n){t&=~Xs,t&=~dn,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var o=t;0<o;){var u=31-wt(o),m=1<<u;n[u]=-1,o&=~m}a!==0&&Cu(e,a,t)}function yi(){return(_e&6)===0?(Kl(0),!1):!0}function Ks(){if(ye!==null){if(Ce===0)var e=ye.return;else e=ye,oa=ln=null,fs(e),Vn=null,Hl=0,e=ye;for(;e!==null;)If(e.alternate,e),e=e.return;ye=null}}function In(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,fx(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Ks(),Oe=e,ye=a=la(e.current,null),je=t,Ce=0,kt=null,Da=!1,Pn=dl(e,t),Ys=!1,Kn=Bt=Xs=dn=Ma=Ge=0,gt=$l=null,Vs=!1,(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var o=31-wt(n),u=1<<o;t|=e[o],n&=~u}return ha=t,Yr(),a}function yp(e,t){xe=null,R.H=oi,t===zl||t===Fr?(t=Md(),Ce=3):t===Ld?(t=Md(),Ce=4):Ce=t===Bf?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,kt=t,ye===null&&(Ge=1,fi(e,Lt(t,e.current)))}function wp(){var e=R.H;return R.H=oi,e===null?oi:e}function jp(){var e=R.A;return R.A=Zg,e}function Js(){Ge=4,Da||(je&4194048)!==je&&Ut.current!==null||(Pn=!0),(Ma&134217727)===0&&(dn&134217727)===0||Oe===null||Ha(Oe,je,Bt,!1)}function Fs(e,t,a){var n=_e;_e|=2;var o=wp(),u=jp();(Oe!==e||je!==t)&&(vi=null,In(e,t)),t=!1;var m=Ge;e:do try{if(Ce!==0&&ye!==null){var x=ye,E=kt;switch(Ce){case 8:Ks(),m=6;break e;case 3:case 2:case 9:case 6:Ut.current===null&&(t=!0);var O=Ce;if(Ce=0,kt=null,Wn(e,x,E,O),a&&Pn){m=0;break e}break;default:O=Ce,Ce=0,kt=null,Wn(e,x,E,O)}}Kg(),m=Ge;break}catch(X){yp(e,X)}while(!0);return t&&e.shellSuspendCounter++,oa=ln=null,_e=n,R.H=o,R.A=u,ye===null&&(Oe=null,je=0,Yr()),m}function Kg(){for(;ye!==null;)Np(ye)}function Jg(e,t){var a=_e;_e|=2;var n=wp(),o=jp();Oe!==e||je!==t?(vi=null,bi=Kt()+500,In(e,t)):Pn=dl(e,t);e:do try{if(Ce!==0&&ye!==null){t=ye;var u=kt;t:switch(Ce){case 1:Ce=0,kt=null,Wn(e,t,u,1);break;case 2:case 9:if(Od(u)){Ce=0,kt=null,Sp(t);break}t=function(){Ce!==2&&Ce!==9||Oe!==e||(Ce=7),ea(e)},u.then(t,t);break e;case 3:Ce=7;break e;case 4:Ce=5;break e;case 7:Od(u)?(Ce=0,kt=null,Sp(t)):(Ce=0,kt=null,Wn(e,t,u,7));break;case 5:var m=null;switch(ye.tag){case 26:m=ye.memoizedState;case 5:case 27:var x=ye;if(!m||r0(m)){Ce=0,kt=null;var E=x.sibling;if(E!==null)ye=E;else{var O=x.return;O!==null?(ye=O,wi(O)):ye=null}break t}}Ce=0,kt=null,Wn(e,t,u,5);break;case 6:Ce=0,kt=null,Wn(e,t,u,6);break;case 8:Ks(),Ge=6;break e;default:throw Error(c(462))}}Fg();break}catch(X){yp(e,X)}while(!0);return oa=ln=null,R.H=n,R.A=o,_e=a,ye!==null?0:(Oe=null,je=0,Yr(),Ge)}function Fg(){for(;ye!==null&&!vh();)Np(ye)}function Np(e){var t=Jf(e.alternate,e,ha);e.memoizedProps=e.pendingProps,t===null?wi(e):ye=t}function Sp(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Vf(a,t,t.pendingProps,t.type,void 0,je);break;case 11:t=Vf(a,t,t.pendingProps,t.type.render,t.ref,je);break;case 5:fs(t);default:If(a,t),t=ye=Sd(t,ha),t=Jf(a,t,ha)}e.memoizedProps=e.pendingProps,t===null?wi(e):ye=t}function Wn(e,t,a,n){oa=ln=null,fs(t),Vn=null,Hl=0;var o=t.return;try{if(qg(e,o,t,a,je)){Ge=1,fi(e,Lt(a,e.current)),ye=null;return}}catch(u){if(o!==null)throw ye=o,u;Ge=1,fi(e,Lt(a,e.current)),ye=null;return}t.flags&32768?(ke||n===1?e=!0:Pn||(je&536870912)!==0?e=!1:(Da=e=!0,(n===2||n===9||n===3||n===6)&&(n=Ut.current,n!==null&&n.tag===13&&(n.flags|=16384))),Ep(t,e)):wi(t)}function wi(e){var t=e;do{if((t.flags&32768)!==0){Ep(t,Da);return}e=t.return;var a=Yg(t.alternate,t,ha);if(a!==null){ye=a;return}if(t=t.sibling,t!==null){ye=t;return}ye=t=e}while(t!==null);Ge===0&&(Ge=5)}function Ep(e,t){do{var a=Xg(e.alternate,e);if(a!==null){a.flags&=32767,ye=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){ye=e;return}ye=e=a}while(e!==null);Ge=6,ye=null}function kp(e,t,a,n,o,u,m,x,E){e.cancelPendingCommit=null;do ji();while(at!==0);if((_e&6)!==0)throw Error(c(327));if(t!==null){if(t===e.current)throw Error(c(177));if(u=t.lanes|t.childLanes,u|=Go,Ch(e,a,u,m,x,E),e===Oe&&(ye=Oe=null,je=0),Jn=t,Ba=e,Fn=a,Zs=u,$s=o,gp=n,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,tx(Tr,function(){return Ap(),null})):(e.callbackNode=null,e.callbackPriority=0),n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=R.T,R.T=null,o=K.p,K.p=2,m=_e,_e|=4;try{Vg(e,t,a)}finally{_e=m,K.p=o,R.T=n}}at=1,Tp(),_p(),Cp()}}function Tp(){if(at===1){at=0;var e=Ba,t=Jn,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=R.T,R.T=null;var n=K.p;K.p=2;var o=_e;_e|=4;try{cp(t,e);var u=cc,m=md(e.containerInfo),x=u.focusedElem,E=u.selectionRange;if(m!==x&&x&&x.ownerDocument&&pd(x.ownerDocument.documentElement,x)){if(E!==null&&Mo(x)){var O=E.start,X=E.end;if(X===void 0&&(X=O),"selectionStart"in x)x.selectionStart=O,x.selectionEnd=Math.min(X,x.value.length);else{var Z=x.ownerDocument||document,U=Z&&Z.defaultView||window;if(U.getSelection){var B=U.getSelection(),fe=x.textContent.length,se=Math.min(E.start,fe),Re=E.end===void 0?se:Math.min(E.end,fe);!B.extend&&se>Re&&(m=Re,Re=se,se=m);var z=fd(x,se),T=fd(x,Re);if(z&&T&&(B.rangeCount!==1||B.anchorNode!==z.node||B.anchorOffset!==z.offset||B.focusNode!==T.node||B.focusOffset!==T.offset)){var L=Z.createRange();L.setStart(z.node,z.offset),B.removeAllRanges(),se>Re?(B.addRange(L),B.extend(T.node,T.offset)):(L.setEnd(T.node,T.offset),B.addRange(L))}}}}for(Z=[],B=x;B=B.parentNode;)B.nodeType===1&&Z.push({element:B,left:B.scrollLeft,top:B.scrollTop});for(typeof x.focus=="function"&&x.focus(),x=0;x<Z.length;x++){var V=Z[x];V.element.scrollLeft=V.left,V.element.scrollTop=V.top}}Oi=!!sc,cc=sc=null}finally{_e=o,K.p=n,R.T=a}}e.current=t,at=2}}function _p(){if(at===2){at=0;var e=Ba,t=Jn,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=R.T,R.T=null;var n=K.p;K.p=2;var o=_e;_e|=4;try{rp(e,t.alternate,t)}finally{_e=o,K.p=n,R.T=a}}at=3}}function Cp(){if(at===4||at===3){at=0,yh();var e=Ba,t=Jn,a=Fn,n=gp;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?at=5:(at=0,Jn=Ba=null,zp(e,e.pendingLanes));var o=e.pendingLanes;if(o===0&&(Ua=null),ho(a),t=t.stateNode,yt&&typeof yt.onCommitFiberRoot=="function")try{yt.onCommitFiberRoot(ul,t,void 0,(t.current.flags&128)===128)}catch{}if(n!==null){t=R.T,o=K.p,K.p=2,R.T=null;try{for(var u=e.onRecoverableError,m=0;m<n.length;m++){var x=n[m];u(x.value,{componentStack:x.stack})}}finally{R.T=t,K.p=o}}(Fn&3)!==0&&ji(),ea(e),o=e.pendingLanes,(a&4194090)!==0&&(o&42)!==0?e===Ps?Pl++:(Pl=0,Ps=e):Pl=0,Kl(0)}}function zp(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,_l(t)))}function ji(e){return Tp(),_p(),Cp(),Ap()}function Ap(){if(at!==5)return!1;var e=Ba,t=Zs;Zs=0;var a=ho(Fn),n=R.T,o=K.p;try{K.p=32>a?32:a,R.T=null,a=$s,$s=null;var u=Ba,m=Fn;if(at=0,Jn=Ba=null,Fn=0,(_e&6)!==0)throw Error(c(331));var x=_e;if(_e|=4,mp(u.current),dp(u,u.current,m,a),_e=x,Kl(0,!1),yt&&typeof yt.onPostCommitFiberRoot=="function")try{yt.onPostCommitFiberRoot(ul,u)}catch{}return!0}finally{K.p=o,R.T=n,zp(e,t)}}function Rp(e,t,a){t=Lt(a,t),t=ks(e.stateNode,t,2),e=_a(e,t,2),e!==null&&(fl(e,2),ea(e))}function Le(e,t,a){if(e.tag===3)Rp(e,e,a);else for(;t!==null;){if(t.tag===3){Rp(t,e,a);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(Ua===null||!Ua.has(n))){e=Lt(a,e),a=Mf(2),n=_a(t,a,2),n!==null&&(Uf(a,n,t,e),fl(n,2),ea(n));break}}t=t.return}}function Is(e,t,a){var n=e.pingCache;if(n===null){n=e.pingCache=new $g;var o=new Set;n.set(t,o)}else o=n.get(t),o===void 0&&(o=new Set,n.set(t,o));o.has(a)||(Ys=!0,o.add(a),e=Ig.bind(null,e,t,a),t.then(e,e))}function Ig(e,t,a){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Oe===e&&(je&a)===a&&(Ge===4||Ge===3&&(je&62914560)===je&&300>Kt()-Qs?(_e&2)===0&&In(e,0):Xs|=a,Kn===je&&(Kn=0)),ea(e)}function Lp(e,t){t===0&&(t=_u()),e=On(e,t),e!==null&&(fl(e,t),ea(e))}function Wg(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Lp(e,a)}function ex(e,t){var a=0;switch(e.tag){case 13:var n=e.stateNode,o=e.memoizedState;o!==null&&(a=o.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(c(314))}n!==null&&n.delete(t),Lp(e,a)}function tx(e,t){return uo(e,t)}var Ni=null,el=null,Ws=!1,Si=!1,ec=!1,fn=0;function ea(e){e!==el&&e.next===null&&(el===null?Ni=el=e:el=el.next=e),Si=!0,Ws||(Ws=!0,nx())}function Kl(e,t){if(!ec&&Si){ec=!0;do for(var a=!1,n=Ni;n!==null;){if(e!==0){var o=n.pendingLanes;if(o===0)var u=0;else{var m=n.suspendedLanes,x=n.pingedLanes;u=(1<<31-wt(42|e)+1)-1,u&=o&~(m&~x),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(a=!0,Up(n,u))}else u=je,u=zr(n,n===Oe?u:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(u&3)===0||dl(n,u)||(a=!0,Up(n,u));n=n.next}while(a);ec=!1}}function ax(){Op()}function Op(){Si=Ws=!1;var e=0;fn!==0&&(dx()&&(e=fn),fn=0);for(var t=Kt(),a=null,n=Ni;n!==null;){var o=n.next,u=Dp(n,t);u===0?(n.next=null,a===null?Ni=o:a.next=o,o===null&&(el=a)):(a=n,(e!==0||(u&3)!==0)&&(Si=!0)),n=o}Kl(e)}function Dp(e,t){for(var a=e.suspendedLanes,n=e.pingedLanes,o=e.expirationTimes,u=e.pendingLanes&-62914561;0<u;){var m=31-wt(u),x=1<<m,E=o[m];E===-1?((x&a)===0||(x&n)!==0)&&(o[m]=_h(x,t)):E<=t&&(e.expiredLanes|=x),u&=~x}if(t=Oe,a=je,a=zr(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,a===0||e===t&&(Ce===2||Ce===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&fo(n),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||dl(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(n!==null&&fo(n),ho(a)){case 2:case 8:a=Eu;break;case 32:a=Tr;break;case 268435456:a=ku;break;default:a=Tr}return n=Mp.bind(null,e),a=uo(a,n),e.callbackPriority=t,e.callbackNode=a,t}return n!==null&&n!==null&&fo(n),e.callbackPriority=2,e.callbackNode=null,2}function Mp(e,t){if(at!==0&&at!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(ji()&&e.callbackNode!==a)return null;var n=je;return n=zr(e,e===Oe?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(bp(e,n,t),Dp(e,Kt()),e.callbackNode!=null&&e.callbackNode===a?Mp.bind(null,e):null)}function Up(e,t){if(ji())return null;bp(e,t,!0)}function nx(){px(function(){(_e&6)!==0?uo(Su,ax):Op()})}function tc(){return fn===0&&(fn=Tu()),fn}function Bp(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Dr(""+e)}function Hp(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function lx(e,t,a,n,o){if(t==="submit"&&a&&a.stateNode===o){var u=Bp((o[ft]||null).action),m=n.submitter;m&&(t=(t=m[ft]||null)?Bp(t.formAction):m.getAttribute("formAction"),t!==null&&(u=t,m=null));var x=new Hr("action","action",null,n,o);e.push({event:x,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(fn!==0){var E=m?Hp(o,m):new FormData(o);ws(a,{pending:!0,data:E,method:o.method,action:u},null,E)}}else typeof u=="function"&&(x.preventDefault(),E=m?Hp(o,m):new FormData(o),ws(a,{pending:!0,data:E,method:o.method,action:u},u,E))},currentTarget:o}]})}}for(var ac=0;ac<qo.length;ac++){var nc=qo[ac],rx=nc.toLowerCase(),ix=nc[0].toUpperCase()+nc.slice(1);Xt(rx,"on"+ix)}Xt(xd,"onAnimationEnd"),Xt(bd,"onAnimationIteration"),Xt(vd,"onAnimationStart"),Xt("dblclick","onDoubleClick"),Xt("focusin","onFocus"),Xt("focusout","onBlur"),Xt(Ng,"onTransitionRun"),Xt(Sg,"onTransitionStart"),Xt(Eg,"onTransitionCancel"),Xt(yd,"onTransitionEnd"),Sn("onMouseEnter",["mouseout","mouseover"]),Sn("onMouseLeave",["mouseout","mouseover"]),Sn("onPointerEnter",["pointerout","pointerover"]),Sn("onPointerLeave",["pointerout","pointerover"]),Ka("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ka("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ka("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ka("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ka("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ka("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Jl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ox=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jl));function qp(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var n=e[a],o=n.event;n=n.listeners;e:{var u=void 0;if(t)for(var m=n.length-1;0<=m;m--){var x=n[m],E=x.instance,O=x.currentTarget;if(x=x.listener,E!==u&&o.isPropagationStopped())break e;u=x,o.currentTarget=O;try{u(o)}catch(X){di(X)}o.currentTarget=null,u=E}else for(m=0;m<n.length;m++){if(x=n[m],E=x.instance,O=x.currentTarget,x=x.listener,E!==u&&o.isPropagationStopped())break e;u=x,o.currentTarget=O;try{u(o)}catch(X){di(X)}o.currentTarget=null,u=E}}}}function we(e,t){var a=t[go];a===void 0&&(a=t[go]=new Set);var n=e+"__bubble";a.has(n)||(Gp(t,e,2,!1),a.add(n))}function lc(e,t,a){var n=0;t&&(n|=4),Gp(a,e,n,t)}var Ei="_reactListening"+Math.random().toString(36).slice(2);function rc(e){if(!e[Ei]){e[Ei]=!0,Lu.forEach(function(a){a!=="selectionchange"&&(ox.has(a)||lc(a,!1,e),lc(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ei]||(t[Ei]=!0,lc("selectionchange",!1,t))}}function Gp(e,t,a,n){switch(d0(t)){case 2:var o=Ox;break;case 8:o=Dx;break;default:o=vc}a=o.bind(null,t,a,e),o=void 0,!To||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),n?o!==void 0?e.addEventListener(t,a,{capture:!0,passive:o}):e.addEventListener(t,a,!0):o!==void 0?e.addEventListener(t,a,{passive:o}):e.addEventListener(t,a,!1)}function ic(e,t,a,n,o){var u=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var m=n.tag;if(m===3||m===4){var x=n.stateNode.containerInfo;if(x===o)break;if(m===4)for(m=n.return;m!==null;){var E=m.tag;if((E===3||E===4)&&m.stateNode.containerInfo===o)return;m=m.return}for(;x!==null;){if(m=wn(x),m===null)return;if(E=m.tag,E===5||E===6||E===26||E===27){n=u=m;continue e}x=x.parentNode}}n=n.return}$u(function(){var O=u,X=Eo(a),Z=[];e:{var U=wd.get(e);if(U!==void 0){var B=Hr,fe=e;switch(e){case"keypress":if(Ur(a)===0)break e;case"keydown":case"keyup":B=tg;break;case"focusin":fe="focus",B=Ao;break;case"focusout":fe="blur",B=Ao;break;case"beforeblur":case"afterblur":B=Ao;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":B=Ju;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":B=Xh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":B=lg;break;case xd:case bd:case vd:B=Zh;break;case yd:B=ig;break;case"scroll":case"scrollend":B=Gh;break;case"wheel":B=sg;break;case"copy":case"cut":case"paste":B=Ph;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":B=Iu;break;case"toggle":case"beforetoggle":B=ug}var se=(t&4)!==0,Re=!se&&(e==="scroll"||e==="scrollend"),z=se?U!==null?U+"Capture":null:U;se=[];for(var T=O,L;T!==null;){var V=T;if(L=V.stateNode,V=V.tag,V!==5&&V!==26&&V!==27||L===null||z===null||(V=hl(T,z),V!=null&&se.push(Fl(T,V,L))),Re)break;T=T.return}0<se.length&&(U=new B(U,fe,null,a,X),Z.push({event:U,listeners:se}))}}if((t&7)===0){e:{if(U=e==="mouseover"||e==="pointerover",B=e==="mouseout"||e==="pointerout",U&&a!==So&&(fe=a.relatedTarget||a.fromElement)&&(wn(fe)||fe[yn]))break e;if((B||U)&&(U=X.window===X?X:(U=X.ownerDocument)?U.defaultView||U.parentWindow:window,B?(fe=a.relatedTarget||a.toElement,B=O,fe=fe?wn(fe):null,fe!==null&&(Re=f(fe),se=fe.tag,fe!==Re||se!==5&&se!==27&&se!==6)&&(fe=null)):(B=null,fe=O),B!==fe)){if(se=Ju,V="onMouseLeave",z="onMouseEnter",T="mouse",(e==="pointerout"||e==="pointerover")&&(se=Iu,V="onPointerLeave",z="onPointerEnter",T="pointer"),Re=B==null?U:ml(B),L=fe==null?U:ml(fe),U=new se(V,T+"leave",B,a,X),U.target=Re,U.relatedTarget=L,V=null,wn(X)===O&&(se=new se(z,T+"enter",fe,a,X),se.target=L,se.relatedTarget=Re,V=se),Re=V,B&&fe)t:{for(se=B,z=fe,T=0,L=se;L;L=tl(L))T++;for(L=0,V=z;V;V=tl(V))L++;for(;0<T-L;)se=tl(se),T--;for(;0<L-T;)z=tl(z),L--;for(;T--;){if(se===z||z!==null&&se===z.alternate)break t;se=tl(se),z=tl(z)}se=null}else se=null;B!==null&&Yp(Z,U,B,se,!1),fe!==null&&Re!==null&&Yp(Z,Re,fe,se,!0)}}e:{if(U=O?ml(O):window,B=U.nodeName&&U.nodeName.toLowerCase(),B==="select"||B==="input"&&U.type==="file")var ae=id;else if(ld(U))if(od)ae=yg;else{ae=bg;var be=xg}else B=U.nodeName,!B||B.toLowerCase()!=="input"||U.type!=="checkbox"&&U.type!=="radio"?O&&No(O.elementType)&&(ae=id):ae=vg;if(ae&&(ae=ae(e,O))){rd(Z,ae,a,X);break e}be&&be(e,U,O),e==="focusout"&&O&&U.type==="number"&&O.memoizedProps.value!=null&&jo(U,"number",U.value)}switch(be=O?ml(O):window,e){case"focusin":(ld(be)||be.contentEditable==="true")&&(An=be,Uo=O,Nl=null);break;case"focusout":Nl=Uo=An=null;break;case"mousedown":Bo=!0;break;case"contextmenu":case"mouseup":case"dragend":Bo=!1,hd(Z,a,X);break;case"selectionchange":if(jg)break;case"keydown":case"keyup":hd(Z,a,X)}var re;if(Lo)e:{switch(e){case"compositionstart":var ce="onCompositionStart";break e;case"compositionend":ce="onCompositionEnd";break e;case"compositionupdate":ce="onCompositionUpdate";break e}ce=void 0}else zn?ad(e,a)&&(ce="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ce="onCompositionStart");ce&&(Wu&&a.locale!=="ko"&&(zn||ce!=="onCompositionStart"?ce==="onCompositionEnd"&&zn&&(re=Pu()):(Sa=X,_o="value"in Sa?Sa.value:Sa.textContent,zn=!0)),be=ki(O,ce),0<be.length&&(ce=new Fu(ce,e,null,a,X),Z.push({event:ce,listeners:be}),re?ce.data=re:(re=nd(a),re!==null&&(ce.data=re)))),(re=fg?pg(e,a):mg(e,a))&&(ce=ki(O,"onBeforeInput"),0<ce.length&&(be=new Fu("onBeforeInput","beforeinput",null,a,X),Z.push({event:be,listeners:ce}),be.data=re)),lx(Z,e,O,a,X)}qp(Z,t)})}function Fl(e,t,a){return{instance:e,listener:t,currentTarget:a}}function ki(e,t){for(var a=t+"Capture",n=[];e!==null;){var o=e,u=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||u===null||(o=hl(e,a),o!=null&&n.unshift(Fl(e,o,u)),o=hl(e,t),o!=null&&n.push(Fl(e,o,u))),e.tag===3)return n;e=e.return}return[]}function tl(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Yp(e,t,a,n,o){for(var u=t._reactName,m=[];a!==null&&a!==n;){var x=a,E=x.alternate,O=x.stateNode;if(x=x.tag,E!==null&&E===n)break;x!==5&&x!==26&&x!==27||O===null||(E=O,o?(O=hl(a,u),O!=null&&m.unshift(Fl(a,O,E))):o||(O=hl(a,u),O!=null&&m.push(Fl(a,O,E)))),a=a.return}m.length!==0&&e.push({event:t,listeners:m})}var sx=/\r\n?/g,cx=/\u0000|\uFFFD/g;function Xp(e){return(typeof e=="string"?e:""+e).replace(sx,`
`).replace(cx,"")}function Vp(e,t){return t=Xp(t),Xp(e)===t}function Ti(){}function Ae(e,t,a,n,o,u){switch(a){case"children":typeof n=="string"?t==="body"||t==="textarea"&&n===""||Tn(e,n):(typeof n=="number"||typeof n=="bigint")&&t!=="body"&&Tn(e,""+n);break;case"className":Rr(e,"class",n);break;case"tabIndex":Rr(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":Rr(e,a,n);break;case"style":Qu(e,n,u);break;case"data":if(t!=="object"){Rr(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Dr(""+n),e.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(a==="formAction"?(t!=="input"&&Ae(e,t,"name",o.name,o,null),Ae(e,t,"formEncType",o.formEncType,o,null),Ae(e,t,"formMethod",o.formMethod,o,null),Ae(e,t,"formTarget",o.formTarget,o,null)):(Ae(e,t,"encType",o.encType,o,null),Ae(e,t,"method",o.method,o,null),Ae(e,t,"target",o.target,o,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Dr(""+n),e.setAttribute(a,n);break;case"onClick":n!=null&&(e.onclick=Ti);break;case"onScroll":n!=null&&we("scroll",e);break;case"onScrollEnd":n!=null&&we("scrollend",e);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(c(61));if(a=n.__html,a!=null){if(o.children!=null)throw Error(c(60));e.innerHTML=a}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}a=Dr(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""+n):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":n===!0?e.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(a,n):e.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(a):e.setAttribute(a,n);break;case"popover":we("beforetoggle",e),we("toggle",e),Ar(e,"popover",n);break;case"xlinkActuate":aa(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":aa(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":aa(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":aa(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":aa(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":aa(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":aa(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":aa(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":aa(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":Ar(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Hh.get(a)||a,Ar(e,a,n))}}function oc(e,t,a,n,o,u){switch(a){case"style":Qu(e,n,u);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(c(61));if(a=n.__html,a!=null){if(o.children!=null)throw Error(c(60));e.innerHTML=a}}break;case"children":typeof n=="string"?Tn(e,n):(typeof n=="number"||typeof n=="bigint")&&Tn(e,""+n);break;case"onScroll":n!=null&&we("scroll",e);break;case"onScrollEnd":n!=null&&we("scrollend",e);break;case"onClick":n!=null&&(e.onclick=Ti);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ou.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(o=a.endsWith("Capture"),t=a.slice(2,o?a.length-7:void 0),u=e[ft]||null,u=u!=null?u[a]:null,typeof u=="function"&&e.removeEventListener(t,u,o),typeof n=="function")){typeof u!="function"&&u!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,n,o);break e}a in e?e[a]=n:n===!0?e.setAttribute(a,""):Ar(e,a,n)}}}function nt(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":we("error",e),we("load",e);var n=!1,o=!1,u;for(u in a)if(a.hasOwnProperty(u)){var m=a[u];if(m!=null)switch(u){case"src":n=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:Ae(e,t,u,m,a,null)}}o&&Ae(e,t,"srcSet",a.srcSet,a,null),n&&Ae(e,t,"src",a.src,a,null);return;case"input":we("invalid",e);var x=u=m=o=null,E=null,O=null;for(n in a)if(a.hasOwnProperty(n)){var X=a[n];if(X!=null)switch(n){case"name":o=X;break;case"type":m=X;break;case"checked":E=X;break;case"defaultChecked":O=X;break;case"value":u=X;break;case"defaultValue":x=X;break;case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(c(137,t));break;default:Ae(e,t,n,X,a,null)}}Gu(e,u,x,E,O,m,o,!1),Lr(e);return;case"select":we("invalid",e),n=m=u=null;for(o in a)if(a.hasOwnProperty(o)&&(x=a[o],x!=null))switch(o){case"value":u=x;break;case"defaultValue":m=x;break;case"multiple":n=x;default:Ae(e,t,o,x,a,null)}t=u,a=m,e.multiple=!!n,t!=null?kn(e,!!n,t,!1):a!=null&&kn(e,!!n,a,!0);return;case"textarea":we("invalid",e),u=o=n=null;for(m in a)if(a.hasOwnProperty(m)&&(x=a[m],x!=null))switch(m){case"value":n=x;break;case"defaultValue":o=x;break;case"children":u=x;break;case"dangerouslySetInnerHTML":if(x!=null)throw Error(c(91));break;default:Ae(e,t,m,x,a,null)}Xu(e,n,o,u),Lr(e);return;case"option":for(E in a)if(a.hasOwnProperty(E)&&(n=a[E],n!=null))switch(E){case"selected":e.selected=n&&typeof n!="function"&&typeof n!="symbol";break;default:Ae(e,t,E,n,a,null)}return;case"dialog":we("beforetoggle",e),we("toggle",e),we("cancel",e),we("close",e);break;case"iframe":case"object":we("load",e);break;case"video":case"audio":for(n=0;n<Jl.length;n++)we(Jl[n],e);break;case"image":we("error",e),we("load",e);break;case"details":we("toggle",e);break;case"embed":case"source":case"link":we("error",e),we("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(O in a)if(a.hasOwnProperty(O)&&(n=a[O],n!=null))switch(O){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:Ae(e,t,O,n,a,null)}return;default:if(No(t)){for(X in a)a.hasOwnProperty(X)&&(n=a[X],n!==void 0&&oc(e,t,X,n,a,void 0));return}}for(x in a)a.hasOwnProperty(x)&&(n=a[x],n!=null&&Ae(e,t,x,n,a,null))}function ux(e,t,a,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,u=null,m=null,x=null,E=null,O=null,X=null;for(B in a){var Z=a[B];if(a.hasOwnProperty(B)&&Z!=null)switch(B){case"checked":break;case"value":break;case"defaultValue":E=Z;default:n.hasOwnProperty(B)||Ae(e,t,B,null,n,Z)}}for(var U in n){var B=n[U];if(Z=a[U],n.hasOwnProperty(U)&&(B!=null||Z!=null))switch(U){case"type":u=B;break;case"name":o=B;break;case"checked":O=B;break;case"defaultChecked":X=B;break;case"value":m=B;break;case"defaultValue":x=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(c(137,t));break;default:B!==Z&&Ae(e,t,U,B,n,Z)}}wo(e,m,x,E,O,X,u,o);return;case"select":B=m=x=U=null;for(u in a)if(E=a[u],a.hasOwnProperty(u)&&E!=null)switch(u){case"value":break;case"multiple":B=E;default:n.hasOwnProperty(u)||Ae(e,t,u,null,n,E)}for(o in n)if(u=n[o],E=a[o],n.hasOwnProperty(o)&&(u!=null||E!=null))switch(o){case"value":U=u;break;case"defaultValue":x=u;break;case"multiple":m=u;default:u!==E&&Ae(e,t,o,u,n,E)}t=x,a=m,n=B,U!=null?kn(e,!!a,U,!1):!!n!=!!a&&(t!=null?kn(e,!!a,t,!0):kn(e,!!a,a?[]:"",!1));return;case"textarea":B=U=null;for(x in a)if(o=a[x],a.hasOwnProperty(x)&&o!=null&&!n.hasOwnProperty(x))switch(x){case"value":break;case"children":break;default:Ae(e,t,x,null,n,o)}for(m in n)if(o=n[m],u=a[m],n.hasOwnProperty(m)&&(o!=null||u!=null))switch(m){case"value":U=o;break;case"defaultValue":B=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(c(91));break;default:o!==u&&Ae(e,t,m,o,n,u)}Yu(e,U,B);return;case"option":for(var fe in a)if(U=a[fe],a.hasOwnProperty(fe)&&U!=null&&!n.hasOwnProperty(fe))switch(fe){case"selected":e.selected=!1;break;default:Ae(e,t,fe,null,n,U)}for(E in n)if(U=n[E],B=a[E],n.hasOwnProperty(E)&&U!==B&&(U!=null||B!=null))switch(E){case"selected":e.selected=U&&typeof U!="function"&&typeof U!="symbol";break;default:Ae(e,t,E,U,n,B)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var se in a)U=a[se],a.hasOwnProperty(se)&&U!=null&&!n.hasOwnProperty(se)&&Ae(e,t,se,null,n,U);for(O in n)if(U=n[O],B=a[O],n.hasOwnProperty(O)&&U!==B&&(U!=null||B!=null))switch(O){case"children":case"dangerouslySetInnerHTML":if(U!=null)throw Error(c(137,t));break;default:Ae(e,t,O,U,n,B)}return;default:if(No(t)){for(var Re in a)U=a[Re],a.hasOwnProperty(Re)&&U!==void 0&&!n.hasOwnProperty(Re)&&oc(e,t,Re,void 0,n,U);for(X in n)U=n[X],B=a[X],!n.hasOwnProperty(X)||U===B||U===void 0&&B===void 0||oc(e,t,X,U,n,B);return}}for(var z in a)U=a[z],a.hasOwnProperty(z)&&U!=null&&!n.hasOwnProperty(z)&&Ae(e,t,z,null,n,U);for(Z in n)U=n[Z],B=a[Z],!n.hasOwnProperty(Z)||U===B||U==null&&B==null||Ae(e,t,Z,U,n,B)}var sc=null,cc=null;function _i(e){return e.nodeType===9?e:e.ownerDocument}function Qp(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Zp(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function uc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var dc=null;function dx(){var e=window.event;return e&&e.type==="popstate"?e===dc?!1:(dc=e,!0):(dc=null,!1)}var $p=typeof setTimeout=="function"?setTimeout:void 0,fx=typeof clearTimeout=="function"?clearTimeout:void 0,Pp=typeof Promise=="function"?Promise:void 0,px=typeof queueMicrotask=="function"?queueMicrotask:typeof Pp<"u"?function(e){return Pp.resolve(null).then(e).catch(mx)}:$p;function mx(e){setTimeout(function(){throw e})}function qa(e){return e==="head"}function Kp(e,t){var a=t,n=0,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"){if(0<n&&8>n){a=n;var m=e.ownerDocument;if(a&1&&Il(m.documentElement),a&2&&Il(m.body),a&4)for(a=m.head,Il(a),m=a.firstChild;m;){var x=m.nextSibling,E=m.nodeName;m[pl]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&m.rel.toLowerCase()==="stylesheet"||a.removeChild(m),m=x}}if(o===0){e.removeChild(u),ir(t);return}o--}else a==="$"||a==="$?"||a==="$!"?o++:n=a.charCodeAt(0)-48;else n=0;a=u}while(a);ir(t)}function fc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":fc(a),xo(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function hx(e,t,a,n){for(;e.nodeType===1;){var o=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[pl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(u=e.getAttribute("rel"),u==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(u!==o.rel||e.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||e.getAttribute("title")!==(o.title==null?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(u=e.getAttribute("src"),(u!==(o.src==null?null:o.src)||e.getAttribute("type")!==(o.type==null?null:o.type)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&u&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var u=o.name==null?null:""+o.name;if(o.type==="hidden"&&e.getAttribute("name")===u)return e}else return e;if(e=Qt(e.nextSibling),e===null)break}return null}function gx(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Qt(e.nextSibling),e===null))return null;return e}function pc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState==="complete"}function xx(e,t){var a=e.ownerDocument;if(e.data!=="$?"||a.readyState==="complete")t();else{var n=function(){t(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function Qt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}var mc=null;function Jp(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}function Fp(e,t,a){switch(t=_i(a),e){case"html":if(e=t.documentElement,!e)throw Error(c(452));return e;case"head":if(e=t.head,!e)throw Error(c(453));return e;case"body":if(e=t.body,!e)throw Error(c(454));return e;default:throw Error(c(451))}}function Il(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);xo(e)}var Ht=new Map,Ip=new Set;function Ci(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ga=K.d;K.d={f:bx,r:vx,D:yx,C:wx,L:jx,m:Nx,X:Ex,S:Sx,M:kx};function bx(){var e=ga.f(),t=yi();return e||t}function vx(e){var t=jn(e);t!==null&&t.tag===5&&t.type==="form"?bf(t):ga.r(e)}var al=typeof document>"u"?null:document;function Wp(e,t,a){var n=al;if(n&&typeof t=="string"&&t){var o=Rt(t);o='link[rel="'+e+'"][href="'+o+'"]',typeof a=="string"&&(o+='[crossorigin="'+a+'"]'),Ip.has(o)||(Ip.add(o),e={rel:e,crossOrigin:a,href:t},n.querySelector(o)===null&&(t=n.createElement("link"),nt(t,"link",e),Je(t),n.head.appendChild(t)))}}function yx(e){ga.D(e),Wp("dns-prefetch",e,null)}function wx(e,t){ga.C(e,t),Wp("preconnect",e,t)}function jx(e,t,a){ga.L(e,t,a);var n=al;if(n&&e&&t){var o='link[rel="preload"][as="'+Rt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(o+='[imagesrcset="'+Rt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(o+='[imagesizes="'+Rt(a.imageSizes)+'"]')):o+='[href="'+Rt(e)+'"]';var u=o;switch(t){case"style":u=nl(e);break;case"script":u=ll(e)}Ht.has(u)||(e=v({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),Ht.set(u,e),n.querySelector(o)!==null||t==="style"&&n.querySelector(Wl(u))||t==="script"&&n.querySelector(er(u))||(t=n.createElement("link"),nt(t,"link",e),Je(t),n.head.appendChild(t)))}}function Nx(e,t){ga.m(e,t);var a=al;if(a&&e){var n=t&&typeof t.as=="string"?t.as:"script",o='link[rel="modulepreload"][as="'+Rt(n)+'"][href="'+Rt(e)+'"]',u=o;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=ll(e)}if(!Ht.has(u)&&(e=v({rel:"modulepreload",href:e},t),Ht.set(u,e),a.querySelector(o)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(er(u)))return}n=a.createElement("link"),nt(n,"link",e),Je(n),a.head.appendChild(n)}}}function Sx(e,t,a){ga.S(e,t,a);var n=al;if(n&&e){var o=Nn(n).hoistableStyles,u=nl(e);t=t||"default";var m=o.get(u);if(!m){var x={loading:0,preload:null};if(m=n.querySelector(Wl(u)))x.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":t},a),(a=Ht.get(u))&&hc(e,a);var E=m=n.createElement("link");Je(E),nt(E,"link",e),E._p=new Promise(function(O,X){E.onload=O,E.onerror=X}),E.addEventListener("load",function(){x.loading|=1}),E.addEventListener("error",function(){x.loading|=2}),x.loading|=4,zi(m,t,n)}m={type:"stylesheet",instance:m,count:1,state:x},o.set(u,m)}}}function Ex(e,t){ga.X(e,t);var a=al;if(a&&e){var n=Nn(a).hoistableScripts,o=ll(e),u=n.get(o);u||(u=a.querySelector(er(o)),u||(e=v({src:e,async:!0},t),(t=Ht.get(o))&&gc(e,t),u=a.createElement("script"),Je(u),nt(u,"link",e),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},n.set(o,u))}}function kx(e,t){ga.M(e,t);var a=al;if(a&&e){var n=Nn(a).hoistableScripts,o=ll(e),u=n.get(o);u||(u=a.querySelector(er(o)),u||(e=v({src:e,async:!0,type:"module"},t),(t=Ht.get(o))&&gc(e,t),u=a.createElement("script"),Je(u),nt(u,"link",e),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},n.set(o,u))}}function e0(e,t,a,n){var o=(o=me.current)?Ci(o):null;if(!o)throw Error(c(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=nl(a.href),a=Nn(o).hoistableStyles,n=a.get(t),n||(n={type:"style",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=nl(a.href);var u=Nn(o).hoistableStyles,m=u.get(e);if(m||(o=o.ownerDocument||o,m={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(e,m),(u=o.querySelector(Wl(e)))&&!u._p&&(m.instance=u,m.state.loading=5),Ht.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ht.set(e,a),u||Tx(o,e,a,m.state))),t&&n===null)throw Error(c(528,""));return m}if(t&&n!==null)throw Error(c(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=ll(a),a=Nn(o).hoistableScripts,n=a.get(t),n||(n={type:"script",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,e))}}function nl(e){return'href="'+Rt(e)+'"'}function Wl(e){return'link[rel="stylesheet"]['+e+"]"}function t0(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function Tx(e,t,a,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=1:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2}),nt(t,"link",a),Je(t),e.head.appendChild(t))}function ll(e){return'[src="'+Rt(e)+'"]'}function er(e){return"script[async]"+e}function a0(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+Rt(a.href)+'"]');if(n)return t.instance=n,Je(n),n;var o=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),Je(n),nt(n,"style",o),zi(n,a.precedence,e),t.instance=n;case"stylesheet":o=nl(a.href);var u=e.querySelector(Wl(o));if(u)return t.state.loading|=4,t.instance=u,Je(u),u;n=t0(a),(o=Ht.get(o))&&hc(n,o),u=(e.ownerDocument||e).createElement("link"),Je(u);var m=u;return m._p=new Promise(function(x,E){m.onload=x,m.onerror=E}),nt(u,"link",n),t.state.loading|=4,zi(u,a.precedence,e),t.instance=u;case"script":return u=ll(a.src),(o=e.querySelector(er(u)))?(t.instance=o,Je(o),o):(n=a,(o=Ht.get(u))&&(n=v({},a),gc(n,o)),e=e.ownerDocument||e,o=e.createElement("script"),Je(o),nt(o,"link",n),e.head.appendChild(o),t.instance=o);case"void":return null;default:throw Error(c(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(n=t.instance,t.state.loading|=4,zi(n,a.precedence,e));return t.instance}function zi(e,t,a){for(var n=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=n.length?n[n.length-1]:null,u=o,m=0;m<n.length;m++){var x=n[m];if(x.dataset.precedence===t)u=x;else if(u!==o)break}u?u.parentNode.insertBefore(e,u.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function hc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function gc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Ai=null;function n0(e,t,a){if(Ai===null){var n=new Map,o=Ai=new Map;o.set(a,n)}else o=Ai,n=o.get(a),n||(n=new Map,o.set(a,n));if(n.has(e))return n;for(n.set(e,null),a=a.getElementsByTagName(e),o=0;o<a.length;o++){var u=a[o];if(!(u[pl]||u[lt]||e==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var m=u.getAttribute(t)||"";m=e+m;var x=n.get(m);x?x.push(u):n.set(m,[u])}}return n}function l0(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function _x(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function r0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var tr=null;function Cx(){}function zx(e,t,a){if(tr===null)throw Error(c(475));var n=tr;if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var o=nl(a.href),u=e.querySelector(Wl(o));if(u){e=u._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(n.count++,n=Ri.bind(n),e.then(n,n)),t.state.loading|=4,t.instance=u,Je(u);return}u=e.ownerDocument||e,a=t0(a),(o=Ht.get(o))&&hc(a,o),u=u.createElement("link"),Je(u);var m=u;m._p=new Promise(function(x,E){m.onload=x,m.onerror=E}),nt(u,"link",a),t.instance=u}n.stylesheets===null&&(n.stylesheets=new Map),n.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(n.count++,t=Ri.bind(n),e.addEventListener("load",t),e.addEventListener("error",t))}}function Ax(){if(tr===null)throw Error(c(475));var e=tr;return e.stylesheets&&e.count===0&&xc(e,e.stylesheets),0<e.count?function(t){var a=setTimeout(function(){if(e.stylesheets&&xc(e,e.stylesheets),e.unsuspend){var n=e.unsuspend;e.unsuspend=null,n()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(a)}}:null}function Ri(){if(this.count--,this.count===0){if(this.stylesheets)xc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Li=null;function xc(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Li=new Map,t.forEach(Rx,e),Li=null,Ri.call(e))}function Rx(e,t){if(!(t.state.loading&4)){var a=Li.get(e);if(a)var n=a.get(null);else{a=new Map,Li.set(e,a);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<o.length;u++){var m=o[u];(m.nodeName==="LINK"||m.getAttribute("media")!=="not all")&&(a.set(m.dataset.precedence,m),n=m)}n&&a.set(null,n)}o=t.instance,m=o.getAttribute("data-precedence"),u=a.get(m)||n,u===n&&a.set(null,o),a.set(m,o),this.count++,n=Ri.bind(this),o.addEventListener("load",n),o.addEventListener("error",n),u?u.parentNode.insertBefore(o,u.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(o,e.firstChild)),t.state.loading|=4}}var ar={$$typeof:C,Provider:null,Consumer:null,_currentValue:te,_currentValue2:te,_threadCount:0};function Lx(e,t,a,n,o,u,m,x){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=po(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=po(0),this.hiddenUpdates=po(null),this.identifierPrefix=n,this.onUncaughtError=o,this.onCaughtError=u,this.onRecoverableError=m,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=x,this.incompleteTransitions=new Map}function i0(e,t,a,n,o,u,m,x,E,O,X,Z){return e=new Lx(e,t,a,m,x,E,O,Z),t=1,u===!0&&(t|=24),u=Nt(3,null,null,t),e.current=u,u.stateNode=e,t=Io(),t.refCount++,e.pooledCache=t,t.refCount++,u.memoizedState={element:n,isDehydrated:a,cache:t},as(u),e}function o0(e){return e?(e=Dn,e):Dn}function s0(e,t,a,n,o,u){o=o0(o),n.context===null?n.context=o:n.pendingContext=o,n=Ta(t),n.payload={element:a},u=u===void 0?null:u,u!==null&&(n.callback=u),a=_a(e,n,t),a!==null&&(_t(a,e,t),Rl(a,e,t))}function c0(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function bc(e,t){c0(e,t),(e=e.alternate)&&c0(e,t)}function u0(e){if(e.tag===13){var t=On(e,67108864);t!==null&&_t(t,e,67108864),bc(e,67108864)}}var Oi=!0;function Ox(e,t,a,n){var o=R.T;R.T=null;var u=K.p;try{K.p=2,vc(e,t,a,n)}finally{K.p=u,R.T=o}}function Dx(e,t,a,n){var o=R.T;R.T=null;var u=K.p;try{K.p=8,vc(e,t,a,n)}finally{K.p=u,R.T=o}}function vc(e,t,a,n){if(Oi){var o=yc(n);if(o===null)ic(e,t,n,Di,a),f0(e,n);else if(Ux(o,e,t,a,n))n.stopPropagation();else if(f0(e,n),t&4&&-1<Mx.indexOf(e)){for(;o!==null;){var u=jn(o);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var m=Pa(u.pendingLanes);if(m!==0){var x=u;for(x.pendingLanes|=2,x.entangledLanes|=2;m;){var E=1<<31-wt(m);x.entanglements[1]|=E,m&=~E}ea(u),(_e&6)===0&&(bi=Kt()+500,Kl(0))}}break;case 13:x=On(u,2),x!==null&&_t(x,u,2),yi(),bc(u,2)}if(u=yc(n),u===null&&ic(e,t,n,Di,a),u===o)break;o=u}o!==null&&n.stopPropagation()}else ic(e,t,n,null,a)}}function yc(e){return e=Eo(e),wc(e)}var Di=null;function wc(e){if(Di=null,e=wn(e),e!==null){var t=f(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=p(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Di=e,null}function d0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(wh()){case Su:return 2;case Eu:return 8;case Tr:case jh:return 32;case ku:return 268435456;default:return 32}default:return 32}}var jc=!1,Ga=null,Ya=null,Xa=null,nr=new Map,lr=new Map,Va=[],Mx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function f0(e,t){switch(e){case"focusin":case"focusout":Ga=null;break;case"dragenter":case"dragleave":Ya=null;break;case"mouseover":case"mouseout":Xa=null;break;case"pointerover":case"pointerout":nr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":lr.delete(t.pointerId)}}function rr(e,t,a,n,o,u){return e===null||e.nativeEvent!==u?(e={blockedOn:t,domEventName:a,eventSystemFlags:n,nativeEvent:u,targetContainers:[o]},t!==null&&(t=jn(t),t!==null&&u0(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function Ux(e,t,a,n,o){switch(t){case"focusin":return Ga=rr(Ga,e,t,a,n,o),!0;case"dragenter":return Ya=rr(Ya,e,t,a,n,o),!0;case"mouseover":return Xa=rr(Xa,e,t,a,n,o),!0;case"pointerover":var u=o.pointerId;return nr.set(u,rr(nr.get(u)||null,e,t,a,n,o)),!0;case"gotpointercapture":return u=o.pointerId,lr.set(u,rr(lr.get(u)||null,e,t,a,n,o)),!0}return!1}function p0(e){var t=wn(e.target);if(t!==null){var a=f(t);if(a!==null){if(t=a.tag,t===13){if(t=p(a),t!==null){e.blockedOn=t,zh(e.priority,function(){if(a.tag===13){var n=Tt();n=mo(n);var o=On(a,n);o!==null&&_t(o,a,n),bc(a,n)}});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Mi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=yc(e.nativeEvent);if(a===null){a=e.nativeEvent;var n=new a.constructor(a.type,a);So=n,a.target.dispatchEvent(n),So=null}else return t=jn(a),t!==null&&u0(t),e.blockedOn=a,!1;t.shift()}return!0}function m0(e,t,a){Mi(e)&&a.delete(t)}function Bx(){jc=!1,Ga!==null&&Mi(Ga)&&(Ga=null),Ya!==null&&Mi(Ya)&&(Ya=null),Xa!==null&&Mi(Xa)&&(Xa=null),nr.forEach(m0),lr.forEach(m0)}function Ui(e,t){e.blockedOn===t&&(e.blockedOn=null,jc||(jc=!0,l.unstable_scheduleCallback(l.unstable_NormalPriority,Bx)))}var Bi=null;function h0(e){Bi!==e&&(Bi=e,l.unstable_scheduleCallback(l.unstable_NormalPriority,function(){Bi===e&&(Bi=null);for(var t=0;t<e.length;t+=3){var a=e[t],n=e[t+1],o=e[t+2];if(typeof n!="function"){if(wc(n||a)===null)continue;break}var u=jn(a);u!==null&&(e.splice(t,3),t-=3,ws(u,{pending:!0,data:o,method:a.method,action:n},n,o))}}))}function ir(e){function t(E){return Ui(E,e)}Ga!==null&&Ui(Ga,e),Ya!==null&&Ui(Ya,e),Xa!==null&&Ui(Xa,e),nr.forEach(t),lr.forEach(t);for(var a=0;a<Va.length;a++){var n=Va[a];n.blockedOn===e&&(n.blockedOn=null)}for(;0<Va.length&&(a=Va[0],a.blockedOn===null);)p0(a),a.blockedOn===null&&Va.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var o=a[n],u=a[n+1],m=o[ft]||null;if(typeof u=="function")m||h0(a);else if(m){var x=null;if(u&&u.hasAttribute("formAction")){if(o=u,m=u[ft]||null)x=m.formAction;else if(wc(o)!==null)continue}else x=m.action;typeof x=="function"?a[n+1]=x:(a.splice(n,3),n-=3),h0(a)}}}function Nc(e){this._internalRoot=e}Hi.prototype.render=Nc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(c(409));var a=t.current,n=Tt();s0(a,n,e,t,null,null)},Hi.prototype.unmount=Nc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;s0(e.current,2,null,e,null,null),yi(),t[yn]=null}};function Hi(e){this._internalRoot=e}Hi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Au();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Va.length&&t!==0&&t<Va[a].priority;a++);Va.splice(a,0,e),a===0&&p0(e)}};var g0=i.version;if(g0!=="19.1.0")throw Error(c(527,g0,"19.1.0"));K.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(c(188)):(e=Object.keys(e).join(","),Error(c(268,e)));return e=b(t),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var Hx={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:R,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var qi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!qi.isDisabled&&qi.supportsFiber)try{ul=qi.inject(Hx),yt=qi}catch{}}return sr.createRoot=function(e,t){if(!d(e))throw Error(c(299));var a=!1,n="",o=Rf,u=Lf,m=Of,x=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(u=t.onCaughtError),t.onRecoverableError!==void 0&&(m=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(x=t.unstable_transitionCallbacks)),t=i0(e,1,!1,null,null,a,n,o,u,m,x,null),e[yn]=t.current,rc(e),new Nc(t)},sr.hydrateRoot=function(e,t,a){if(!d(e))throw Error(c(299));var n=!1,o="",u=Rf,m=Lf,x=Of,E=null,O=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(o=a.identifierPrefix),a.onUncaughtError!==void 0&&(u=a.onUncaughtError),a.onCaughtError!==void 0&&(m=a.onCaughtError),a.onRecoverableError!==void 0&&(x=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(E=a.unstable_transitionCallbacks),a.formState!==void 0&&(O=a.formState)),t=i0(e,1,!0,t,a??null,n,o,u,m,x,E,O),t.context=o0(null),a=t.current,n=Tt(),n=mo(n),o=Ta(n),o.callback=null,_a(a,o,n),a=n,t.current.lanes=a,fl(t,a),ea(t),e[yn]=t.current,rc(e),new Hi(t)},sr.version="19.1.0",sr}var k0;function Jx(){if(k0)return kc.exports;k0=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(i){console.error(i)}}return l(),kc.exports=Kx(),kc.exports}var Fx=Jx();/**
 * react-router v7.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var T0="popstate";function Ix(l={}){function i(c,d){let{pathname:f,search:p,hash:h}=c.location;return Kc("",{pathname:f,search:p,hash:h},d.state&&d.state.usr||null,d.state&&d.state.key||"default")}function s(c,d){return typeof d=="string"?d:hr(d)}return eb(i,s,null,l)}function Ue(l,i){if(l===!1||l===null||typeof l>"u")throw new Error(i)}function Gt(l,i){if(!l){typeof console<"u"&&console.warn(i);try{throw new Error(i)}catch{}}}function Wx(){return Math.random().toString(36).substring(2,10)}function _0(l,i){return{usr:l.state,key:l.key,idx:i}}function Kc(l,i,s=null,c){return{pathname:typeof l=="string"?l:l.pathname,search:"",hash:"",...typeof i=="string"?il(i):i,state:s,key:i&&i.key||c||Wx()}}function hr({pathname:l="/",search:i="",hash:s=""}){return i&&i!=="?"&&(l+=i.charAt(0)==="?"?i:"?"+i),s&&s!=="#"&&(l+=s.charAt(0)==="#"?s:"#"+s),l}function il(l){let i={};if(l){let s=l.indexOf("#");s>=0&&(i.hash=l.substring(s),l=l.substring(0,s));let c=l.indexOf("?");c>=0&&(i.search=l.substring(c),l=l.substring(0,c)),l&&(i.pathname=l)}return i}function eb(l,i,s,c={}){let{window:d=document.defaultView,v5Compat:f=!1}=c,p=d.history,h="POP",b=null,g=v();g==null&&(g=0,p.replaceState({...p.state,idx:g},""));function v(){return(p.state||{idx:null}).idx}function N(){h="POP";let y=v(),M=y==null?null:y-g;g=y,b&&b({action:h,location:A.location,delta:M})}function _(y,M){h="PUSH";let q=Kc(A.location,y,M);g=v()+1;let C=_0(q,g),F=A.createHref(q);try{p.pushState(C,"",F)}catch(P){if(P instanceof DOMException&&P.name==="DataCloneError")throw P;d.location.assign(F)}f&&b&&b({action:h,location:A.location,delta:1})}function H(y,M){h="REPLACE";let q=Kc(A.location,y,M);g=v();let C=_0(q,g),F=A.createHref(q);p.replaceState(C,"",F),f&&b&&b({action:h,location:A.location,delta:0})}function S(y){return tb(y)}let A={get action(){return h},get location(){return l(d,p)},listen(y){if(b)throw new Error("A history only accepts one active listener");return d.addEventListener(T0,N),b=y,()=>{d.removeEventListener(T0,N),b=null}},createHref(y){return i(d,y)},createURL:S,encodeLocation(y){let M=S(y);return{pathname:M.pathname,search:M.search,hash:M.hash}},push:_,replace:H,go(y){return p.go(y)}};return A}function tb(l,i=!1){let s="http://localhost";typeof window<"u"&&(s=window.location.origin!=="null"?window.location.origin:window.location.href),Ue(s,"No window.location.(origin|href) available to create URL");let c=typeof l=="string"?l:hr(l);return c=c.replace(/ $/,"%20"),!i&&c.startsWith("//")&&(c=s+c),new URL(c,s)}function gm(l,i,s="/"){return ab(l,i,s,!1)}function ab(l,i,s,c){let d=typeof i=="string"?il(i):i,f=ya(d.pathname||"/",s);if(f==null)return null;let p=xm(l);nb(p);let h=null;for(let b=0;h==null&&b<p.length;++b){let g=mb(f);h=fb(p[b],g,c)}return h}function xm(l,i=[],s=[],c="",d=!1){let f=(p,h,b=d,g)=>{let v={relativePath:g===void 0?p.path||"":g,caseSensitive:p.caseSensitive===!0,childrenIndex:h,route:p};if(v.relativePath.startsWith("/")){if(!v.relativePath.startsWith(c)&&b)return;Ue(v.relativePath.startsWith(c),`Absolute route path "${v.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),v.relativePath=v.relativePath.slice(c.length)}let N=va([c,v.relativePath]),_=s.concat(v);p.children&&p.children.length>0&&(Ue(p.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${N}".`),xm(p.children,i,_,N,b)),!(p.path==null&&!p.index)&&i.push({path:N,score:ub(N,p.index),routesMeta:_})};return l.forEach((p,h)=>{var b;if(p.path===""||!((b=p.path)!=null&&b.includes("?")))f(p,h);else for(let g of bm(p.path))f(p,h,!0,g)}),i}function bm(l){let i=l.split("/");if(i.length===0)return[];let[s,...c]=i,d=s.endsWith("?"),f=s.replace(/\?$/,"");if(c.length===0)return d?[f,""]:[f];let p=bm(c.join("/")),h=[];return h.push(...p.map(b=>b===""?f:[f,b].join("/"))),d&&h.push(...p),h.map(b=>l.startsWith("/")&&b===""?"/":b)}function nb(l){l.sort((i,s)=>i.score!==s.score?s.score-i.score:db(i.routesMeta.map(c=>c.childrenIndex),s.routesMeta.map(c=>c.childrenIndex)))}var lb=/^:[\w-]+$/,rb=3,ib=2,ob=1,sb=10,cb=-2,C0=l=>l==="*";function ub(l,i){let s=l.split("/"),c=s.length;return s.some(C0)&&(c+=cb),i&&(c+=ib),s.filter(d=>!C0(d)).reduce((d,f)=>d+(lb.test(f)?rb:f===""?ob:sb),c)}function db(l,i){return l.length===i.length&&l.slice(0,-1).every((c,d)=>c===i[d])?l[l.length-1]-i[i.length-1]:0}function fb(l,i,s=!1){let{routesMeta:c}=l,d={},f="/",p=[];for(let h=0;h<c.length;++h){let b=c[h],g=h===c.length-1,v=f==="/"?i:i.slice(f.length)||"/",N=Ki({path:b.relativePath,caseSensitive:b.caseSensitive,end:g},v),_=b.route;if(!N&&g&&s&&!c[c.length-1].route.index&&(N=Ki({path:b.relativePath,caseSensitive:b.caseSensitive,end:!1},v)),!N)return null;Object.assign(d,N.params),p.push({params:d,pathname:va([f,N.pathname]),pathnameBase:bb(va([f,N.pathnameBase])),route:_}),N.pathnameBase!=="/"&&(f=va([f,N.pathnameBase]))}return p}function Ki(l,i){typeof l=="string"&&(l={path:l,caseSensitive:!1,end:!0});let[s,c]=pb(l.path,l.caseSensitive,l.end),d=i.match(s);if(!d)return null;let f=d[0],p=f.replace(/(.)\/+$/,"$1"),h=d.slice(1);return{params:c.reduce((g,{paramName:v,isOptional:N},_)=>{if(v==="*"){let S=h[_]||"";p=f.slice(0,f.length-S.length).replace(/(.)\/+$/,"$1")}const H=h[_];return N&&!H?g[v]=void 0:g[v]=(H||"").replace(/%2F/g,"/"),g},{}),pathname:f,pathnameBase:p,pattern:l}}function pb(l,i=!1,s=!0){Gt(l==="*"||!l.endsWith("*")||l.endsWith("/*"),`Route path "${l}" will be treated as if it were "${l.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${l.replace(/\*$/,"/*")}".`);let c=[],d="^"+l.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(p,h,b)=>(c.push({paramName:h,isOptional:b!=null}),b?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return l.endsWith("*")?(c.push({paramName:"*"}),d+=l==="*"||l==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):s?d+="\\/*$":l!==""&&l!=="/"&&(d+="(?:(?=\\/|$))"),[new RegExp(d,i?void 0:"i"),c]}function mb(l){try{return l.split("/").map(i=>decodeURIComponent(i).replace(/\//g,"%2F")).join("/")}catch(i){return Gt(!1,`The URL path "${l}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`),l}}function ya(l,i){if(i==="/")return l;if(!l.toLowerCase().startsWith(i.toLowerCase()))return null;let s=i.endsWith("/")?i.length-1:i.length,c=l.charAt(s);return c&&c!=="/"?null:l.slice(s)||"/"}var vm=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,hb=l=>vm.test(l);function gb(l,i="/"){let{pathname:s,search:c="",hash:d=""}=typeof l=="string"?il(l):l,f;if(s)if(hb(s))f=s;else{if(s.includes("//")){let p=s;s=s.replace(/\/\/+/g,"/"),Gt(!1,`Pathnames cannot have embedded double slashes - normalizing ${p} -> ${s}`)}s.startsWith("/")?f=z0(s.substring(1),"/"):f=z0(s,i)}else f=i;return{pathname:f,search:vb(c),hash:yb(d)}}function z0(l,i){let s=i.replace(/\/+$/,"").split("/");return l.split("/").forEach(d=>{d===".."?s.length>1&&s.pop():d!=="."&&s.push(d)}),s.length>1?s.join("/"):"/"}function zc(l,i,s,c){return`Cannot include a '${l}' character in a manually specified \`to.${i}\` field [${JSON.stringify(c)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function xb(l){return l.filter((i,s)=>s===0||i.route.path&&i.route.path.length>0)}function uu(l){let i=xb(l);return i.map((s,c)=>c===i.length-1?s.pathname:s.pathnameBase)}function du(l,i,s,c=!1){let d;typeof l=="string"?d=il(l):(d={...l},Ue(!d.pathname||!d.pathname.includes("?"),zc("?","pathname","search",d)),Ue(!d.pathname||!d.pathname.includes("#"),zc("#","pathname","hash",d)),Ue(!d.search||!d.search.includes("#"),zc("#","search","hash",d)));let f=l===""||d.pathname==="",p=f?"/":d.pathname,h;if(p==null)h=s;else{let N=i.length-1;if(!c&&p.startsWith("..")){let _=p.split("/");for(;_[0]==="..";)_.shift(),N-=1;d.pathname=_.join("/")}h=N>=0?i[N]:"/"}let b=gb(d,h),g=p&&p!=="/"&&p.endsWith("/"),v=(f||p===".")&&s.endsWith("/");return!b.pathname.endsWith("/")&&(g||v)&&(b.pathname+="/"),b}var va=l=>l.join("/").replace(/\/\/+/g,"/"),bb=l=>l.replace(/\/+$/,"").replace(/^\/*/,"/"),vb=l=>!l||l==="?"?"":l.startsWith("?")?l:"?"+l,yb=l=>!l||l==="#"?"":l.startsWith("#")?l:"#"+l,wb=class{constructor(l,i,s,c=!1){this.status=l,this.statusText=i||"",this.internal=c,s instanceof Error?(this.data=s.toString(),this.error=s):this.data=s}};function jb(l){return l!=null&&typeof l.status=="number"&&typeof l.statusText=="string"&&typeof l.internal=="boolean"&&"data"in l}function Nb(l){return l.map(i=>i.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var ym=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function wm(l,i){let s=l;if(typeof s!="string"||!vm.test(s))return{absoluteURL:void 0,isExternal:!1,to:s};let c=s,d=!1;if(ym)try{let f=new URL(window.location.href),p=s.startsWith("//")?new URL(f.protocol+s):new URL(s),h=ya(p.pathname,i);p.origin===f.origin&&h!=null?s=h+p.search+p.hash:d=!0}catch{Gt(!1,`<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:c,isExternal:d,to:s}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var jm=["POST","PUT","PATCH","DELETE"];new Set(jm);var Sb=["GET",...jm];new Set(Sb);var ol=w.createContext(null);ol.displayName="DataRouter";var eo=w.createContext(null);eo.displayName="DataRouterState";var Eb=w.createContext(!1),Nm=w.createContext({isTransitioning:!1});Nm.displayName="ViewTransition";var kb=w.createContext(new Map);kb.displayName="Fetchers";var Tb=w.createContext(null);Tb.displayName="Await";var Ct=w.createContext(null);Ct.displayName="Navigation";var xr=w.createContext(null);xr.displayName="Location";var Yt=w.createContext({outlet:null,matches:[],isDataRoute:!1});Yt.displayName="Route";var fu=w.createContext(null);fu.displayName="RouteError";var Sm="REACT_ROUTER_ERROR",_b="REDIRECT",Cb="ROUTE_ERROR_RESPONSE";function zb(l){if(l.startsWith(`${Sm}:${_b}:{`))try{let i=JSON.parse(l.slice(28));if(typeof i=="object"&&i&&typeof i.status=="number"&&typeof i.statusText=="string"&&typeof i.location=="string"&&typeof i.reloadDocument=="boolean"&&typeof i.replace=="boolean")return i}catch{}}function Ab(l){if(l.startsWith(`${Sm}:${Cb}:{`))try{let i=JSON.parse(l.slice(40));if(typeof i=="object"&&i&&typeof i.status=="number"&&typeof i.statusText=="string")return new wb(i.status,i.statusText,i.data)}catch{}}function Rb(l,{relative:i}={}){Ue(sl(),"useHref() may be used only in the context of a <Router> component.");let{basename:s,navigator:c}=w.useContext(Ct),{hash:d,pathname:f,search:p}=br(l,{relative:i}),h=f;return s!=="/"&&(h=f==="/"?s:va([s,f])),c.createHref({pathname:h,search:p,hash:d})}function sl(){return w.useContext(xr)!=null}function ta(){return Ue(sl(),"useLocation() may be used only in the context of a <Router> component."),w.useContext(xr).location}var Em="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function km(l){w.useContext(Ct).static||w.useLayoutEffect(l)}function bn(){let{isDataRoute:l}=w.useContext(Yt);return l?$b():Lb()}function Lb(){Ue(sl(),"useNavigate() may be used only in the context of a <Router> component.");let l=w.useContext(ol),{basename:i,navigator:s}=w.useContext(Ct),{matches:c}=w.useContext(Yt),{pathname:d}=ta(),f=JSON.stringify(uu(c)),p=w.useRef(!1);return km(()=>{p.current=!0}),w.useCallback((b,g={})=>{if(Gt(p.current,Em),!p.current)return;if(typeof b=="number"){s.go(b);return}let v=du(b,JSON.parse(f),d,g.relative==="path");l==null&&i!=="/"&&(v.pathname=v.pathname==="/"?i:va([i,v.pathname])),(g.replace?s.replace:s.push)(v,g.state,g)},[i,s,f,d,l])}var Ob=w.createContext(null);function Db(l){let i=w.useContext(Yt).outlet;return w.useMemo(()=>i&&w.createElement(Ob.Provider,{value:l},i),[i,l])}function pu(){let{matches:l}=w.useContext(Yt),i=l[l.length-1];return i?i.params:{}}function br(l,{relative:i}={}){let{matches:s}=w.useContext(Yt),{pathname:c}=ta(),d=JSON.stringify(uu(s));return w.useMemo(()=>du(l,JSON.parse(d),c,i==="path"),[l,d,c,i])}function Mb(l,i){return Tm(l,i)}function Tm(l,i,s,c,d){var q;Ue(sl(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:f}=w.useContext(Ct),{matches:p}=w.useContext(Yt),h=p[p.length-1],b=h?h.params:{},g=h?h.pathname:"/",v=h?h.pathnameBase:"/",N=h&&h.route;{let C=N&&N.path||"";Cm(g,!N||C.endsWith("*")||C.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C==="/"?"*":`${C}/*`}">.`)}let _=ta(),H;if(i){let C=typeof i=="string"?il(i):i;Ue(v==="/"||((q=C.pathname)==null?void 0:q.startsWith(v)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${C.pathname}" was given in the \`location\` prop.`),H=C}else H=_;let S=H.pathname||"/",A=S;if(v!=="/"){let C=v.replace(/^\//,"").split("/");A="/"+S.replace(/^\//,"").split("/").slice(C.length).join("/")}let y=gm(l,{pathname:A});Gt(N||y!=null,`No routes matched location "${H.pathname}${H.search}${H.hash}" `),Gt(y==null||y[y.length-1].route.element!==void 0||y[y.length-1].route.Component!==void 0||y[y.length-1].route.lazy!==void 0,`Matched leaf route at location "${H.pathname}${H.search}${H.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let M=Gb(y&&y.map(C=>Object.assign({},C,{params:Object.assign({},b,C.params),pathname:va([v,f.encodeLocation?f.encodeLocation(C.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:C.pathname]),pathnameBase:C.pathnameBase==="/"?v:va([v,f.encodeLocation?f.encodeLocation(C.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:C.pathnameBase])})),p,s,c,d);return i&&M?w.createElement(xr.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...H},navigationType:"POP"}},M):M}function Ub(){let l=Zb(),i=jb(l)?`${l.status} ${l.statusText}`:l instanceof Error?l.message:JSON.stringify(l),s=l instanceof Error?l.stack:null,c="rgba(200,200,200, 0.5)",d={padding:"0.5rem",backgroundColor:c},f={padding:"2px 4px",backgroundColor:c},p=null;return console.error("Error handled by React Router default ErrorBoundary:",l),p=w.createElement(w.Fragment,null,w.createElement("p",null,"💿 Hey developer 👋"),w.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",w.createElement("code",{style:f},"ErrorBoundary")," or"," ",w.createElement("code",{style:f},"errorElement")," prop on your route.")),w.createElement(w.Fragment,null,w.createElement("h2",null,"Unexpected Application Error!"),w.createElement("h3",{style:{fontStyle:"italic"}},i),s?w.createElement("pre",{style:d},s):null,p)}var Bb=w.createElement(Ub,null),_m=class extends w.Component{constructor(l){super(l),this.state={location:l.location,revalidation:l.revalidation,error:l.error}}static getDerivedStateFromError(l){return{error:l}}static getDerivedStateFromProps(l,i){return i.location!==l.location||i.revalidation!=="idle"&&l.revalidation==="idle"?{error:l.error,location:l.location,revalidation:l.revalidation}:{error:l.error!==void 0?l.error:i.error,location:i.location,revalidation:l.revalidation||i.revalidation}}componentDidCatch(l,i){this.props.onError?this.props.onError(l,i):console.error("React Router caught the following error during render",l)}render(){let l=this.state.error;if(this.context&&typeof l=="object"&&l&&"digest"in l&&typeof l.digest=="string"){const s=Ab(l.digest);s&&(l=s)}let i=l!==void 0?w.createElement(Yt.Provider,{value:this.props.routeContext},w.createElement(fu.Provider,{value:l,children:this.props.component})):this.props.children;return this.context?w.createElement(Hb,{error:l},i):i}};_m.contextType=Eb;var Ac=new WeakMap;function Hb({children:l,error:i}){let{basename:s}=w.useContext(Ct);if(typeof i=="object"&&i&&"digest"in i&&typeof i.digest=="string"){let c=zb(i.digest);if(c){let d=Ac.get(i);if(d)throw d;let f=wm(c.location,s);if(ym&&!Ac.get(i))if(f.isExternal||c.reloadDocument)window.location.href=f.absoluteURL||f.to;else{const p=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(f.to,{replace:c.replace}));throw Ac.set(i,p),p}return w.createElement("meta",{httpEquiv:"refresh",content:`0;url=${f.absoluteURL||f.to}`})}}return l}function qb({routeContext:l,match:i,children:s}){let c=w.useContext(ol);return c&&c.static&&c.staticContext&&(i.route.errorElement||i.route.ErrorBoundary)&&(c.staticContext._deepestRenderedBoundaryId=i.route.id),w.createElement(Yt.Provider,{value:l},s)}function Gb(l,i=[],s=null,c=null,d=null){if(l==null){if(!s)return null;if(s.errors)l=s.matches;else if(i.length===0&&!s.initialized&&s.matches.length>0)l=s.matches;else return null}let f=l,p=s==null?void 0:s.errors;if(p!=null){let v=f.findIndex(N=>N.route.id&&(p==null?void 0:p[N.route.id])!==void 0);Ue(v>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(p).join(",")}`),f=f.slice(0,Math.min(f.length,v+1))}let h=!1,b=-1;if(s)for(let v=0;v<f.length;v++){let N=f[v];if((N.route.HydrateFallback||N.route.hydrateFallbackElement)&&(b=v),N.route.id){let{loaderData:_,errors:H}=s,S=N.route.loader&&!_.hasOwnProperty(N.route.id)&&(!H||H[N.route.id]===void 0);if(N.route.lazy||S){h=!0,b>=0?f=f.slice(0,b+1):f=[f[0]];break}}}let g=s&&c?(v,N)=>{var _,H;c(v,{location:s.location,params:((H=(_=s.matches)==null?void 0:_[0])==null?void 0:H.params)??{},unstable_pattern:Nb(s.matches),errorInfo:N})}:void 0;return f.reduceRight((v,N,_)=>{let H,S=!1,A=null,y=null;s&&(H=p&&N.route.id?p[N.route.id]:void 0,A=N.route.errorElement||Bb,h&&(b<0&&_===0?(Cm("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),S=!0,y=null):b===_&&(S=!0,y=N.route.hydrateFallbackElement||null)));let M=i.concat(f.slice(0,_+1)),q=()=>{let C;return H?C=A:S?C=y:N.route.Component?C=w.createElement(N.route.Component,null):N.route.element?C=N.route.element:C=v,w.createElement(qb,{match:N,routeContext:{outlet:v,matches:M,isDataRoute:s!=null},children:C})};return s&&(N.route.ErrorBoundary||N.route.errorElement||_===0)?w.createElement(_m,{location:s.location,revalidation:s.revalidation,component:A,error:H,children:q(),routeContext:{outlet:null,matches:M,isDataRoute:!0},onError:g}):q()},null)}function mu(l){return`${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Yb(l){let i=w.useContext(ol);return Ue(i,mu(l)),i}function Xb(l){let i=w.useContext(eo);return Ue(i,mu(l)),i}function Vb(l){let i=w.useContext(Yt);return Ue(i,mu(l)),i}function hu(l){let i=Vb(l),s=i.matches[i.matches.length-1];return Ue(s.route.id,`${l} can only be used on routes that contain a unique "id"`),s.route.id}function Qb(){return hu("useRouteId")}function Zb(){var c;let l=w.useContext(fu),i=Xb("useRouteError"),s=hu("useRouteError");return l!==void 0?l:(c=i.errors)==null?void 0:c[s]}function $b(){let{router:l}=Yb("useNavigate"),i=hu("useNavigate"),s=w.useRef(!1);return km(()=>{s.current=!0}),w.useCallback(async(d,f={})=>{Gt(s.current,Em),s.current&&(typeof d=="number"?await l.navigate(d):await l.navigate(d,{fromRouteId:i,...f}))},[l,i])}var A0={};function Cm(l,i,s){!i&&!A0[l]&&(A0[l]=!0,Gt(!1,s))}w.memo(Pb);function Pb({routes:l,future:i,state:s,onError:c}){return Tm(l,void 0,s,c,i)}function Jc({to:l,replace:i,state:s,relative:c}){Ue(sl(),"<Navigate> may be used only in the context of a <Router> component.");let{static:d}=w.useContext(Ct);Gt(!d,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:f}=w.useContext(Yt),{pathname:p}=ta(),h=bn(),b=du(l,uu(f),p,c==="path"),g=JSON.stringify(b);return w.useEffect(()=>{h(JSON.parse(g),{replace:i,state:s,relative:c})},[h,g,c,i,s]),null}function Kb(l){return Db(l.context)}function $e(l){Ue(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Jb({basename:l="/",children:i=null,location:s,navigationType:c="POP",navigator:d,static:f=!1,unstable_useTransitions:p}){Ue(!sl(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let h=l.replace(/^\/*/,"/"),b=w.useMemo(()=>({basename:h,navigator:d,static:f,unstable_useTransitions:p,future:{}}),[h,d,f,p]);typeof s=="string"&&(s=il(s));let{pathname:g="/",search:v="",hash:N="",state:_=null,key:H="default"}=s,S=w.useMemo(()=>{let A=ya(g,h);return A==null?null:{location:{pathname:A,search:v,hash:N,state:_,key:H},navigationType:c}},[h,g,v,N,_,H,c]);return Gt(S!=null,`<Router basename="${h}"> is not able to match the URL "${g}${v}${N}" because it does not start with the basename, so the <Router> won't render anything.`),S==null?null:w.createElement(Ct.Provider,{value:b},w.createElement(xr.Provider,{children:i,value:S}))}function R0({children:l,location:i}){return Mb(Fc(l),i)}function Fc(l,i=[]){let s=[];return w.Children.forEach(l,(c,d)=>{if(!w.isValidElement(c))return;let f=[...i,d];if(c.type===w.Fragment){s.push.apply(s,Fc(c.props.children,f));return}Ue(c.type===$e,`[${typeof c.type=="string"?c.type:c.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Ue(!c.props.index||!c.props.children,"An index route cannot have child routes.");let p={id:c.props.id||f.join("-"),caseSensitive:c.props.caseSensitive,element:c.props.element,Component:c.props.Component,index:c.props.index,path:c.props.path,middleware:c.props.middleware,loader:c.props.loader,action:c.props.action,hydrateFallbackElement:c.props.hydrateFallbackElement,HydrateFallback:c.props.HydrateFallback,errorElement:c.props.errorElement,ErrorBoundary:c.props.ErrorBoundary,hasErrorBoundary:c.props.hasErrorBoundary===!0||c.props.ErrorBoundary!=null||c.props.errorElement!=null,shouldRevalidate:c.props.shouldRevalidate,handle:c.props.handle,lazy:c.props.lazy};c.props.children&&(p.children=Fc(c.props.children,f)),s.push(p)}),s}var Vi="get",Qi="application/x-www-form-urlencoded";function to(l){return typeof HTMLElement<"u"&&l instanceof HTMLElement}function Fb(l){return to(l)&&l.tagName.toLowerCase()==="button"}function Ib(l){return to(l)&&l.tagName.toLowerCase()==="form"}function Wb(l){return to(l)&&l.tagName.toLowerCase()==="input"}function e1(l){return!!(l.metaKey||l.altKey||l.ctrlKey||l.shiftKey)}function t1(l,i){return l.button===0&&(!i||i==="_self")&&!e1(l)}var Gi=null;function a1(){if(Gi===null)try{new FormData(document.createElement("form"),0),Gi=!1}catch{Gi=!0}return Gi}var n1=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Rc(l){return l!=null&&!n1.has(l)?(Gt(!1,`"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Qi}"`),null):l}function l1(l,i){let s,c,d,f,p;if(Ib(l)){let h=l.getAttribute("action");c=h?ya(h,i):null,s=l.getAttribute("method")||Vi,d=Rc(l.getAttribute("enctype"))||Qi,f=new FormData(l)}else if(Fb(l)||Wb(l)&&(l.type==="submit"||l.type==="image")){let h=l.form;if(h==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let b=l.getAttribute("formaction")||h.getAttribute("action");if(c=b?ya(b,i):null,s=l.getAttribute("formmethod")||h.getAttribute("method")||Vi,d=Rc(l.getAttribute("formenctype"))||Rc(h.getAttribute("enctype"))||Qi,f=new FormData(h,l),!a1()){let{name:g,type:v,value:N}=l;if(v==="image"){let _=g?`${g}.`:"";f.append(`${_}x`,"0"),f.append(`${_}y`,"0")}else g&&f.append(g,N)}}else{if(to(l))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');s=Vi,c=null,d=Qi,p=l}return f&&d==="text/plain"&&(p=f,f=void 0),{action:c,method:s.toLowerCase(),encType:d,formData:f,body:p}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function gu(l,i){if(l===!1||l===null||typeof l>"u")throw new Error(i)}function r1(l,i,s,c){let d=typeof l=="string"?new URL(l,typeof window>"u"?"server://singlefetch/":window.location.origin):l;return s?d.pathname.endsWith("/")?d.pathname=`${d.pathname}_.${c}`:d.pathname=`${d.pathname}.${c}`:d.pathname==="/"?d.pathname=`_root.${c}`:i&&ya(d.pathname,i)==="/"?d.pathname=`${i.replace(/\/$/,"")}/_root.${c}`:d.pathname=`${d.pathname.replace(/\/$/,"")}.${c}`,d}async function i1(l,i){if(l.id in i)return i[l.id];try{let s=await import(l.module);return i[l.id]=s,s}catch(s){return console.error(`Error loading route module \`${l.module}\`, reloading page...`),console.error(s),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function o1(l){return l==null?!1:l.href==null?l.rel==="preload"&&typeof l.imageSrcSet=="string"&&typeof l.imageSizes=="string":typeof l.rel=="string"&&typeof l.href=="string"}async function s1(l,i,s){let c=await Promise.all(l.map(async d=>{let f=i.routes[d.route.id];if(f){let p=await i1(f,s);return p.links?p.links():[]}return[]}));return f1(c.flat(1).filter(o1).filter(d=>d.rel==="stylesheet"||d.rel==="preload").map(d=>d.rel==="stylesheet"?{...d,rel:"prefetch",as:"style"}:{...d,rel:"prefetch"}))}function L0(l,i,s,c,d,f){let p=(b,g)=>s[g]?b.route.id!==s[g].route.id:!0,h=(b,g)=>{var v;return s[g].pathname!==b.pathname||((v=s[g].route.path)==null?void 0:v.endsWith("*"))&&s[g].params["*"]!==b.params["*"]};return f==="assets"?i.filter((b,g)=>p(b,g)||h(b,g)):f==="data"?i.filter((b,g)=>{var N;let v=c.routes[b.route.id];if(!v||!v.hasLoader)return!1;if(p(b,g)||h(b,g))return!0;if(b.route.shouldRevalidate){let _=b.route.shouldRevalidate({currentUrl:new URL(d.pathname+d.search+d.hash,window.origin),currentParams:((N=s[0])==null?void 0:N.params)||{},nextUrl:new URL(l,window.origin),nextParams:b.params,defaultShouldRevalidate:!0});if(typeof _=="boolean")return _}return!0}):[]}function c1(l,i,{includeHydrateFallback:s}={}){return u1(l.map(c=>{let d=i.routes[c.route.id];if(!d)return[];let f=[d.module];return d.clientActionModule&&(f=f.concat(d.clientActionModule)),d.clientLoaderModule&&(f=f.concat(d.clientLoaderModule)),s&&d.hydrateFallbackModule&&(f=f.concat(d.hydrateFallbackModule)),d.imports&&(f=f.concat(d.imports)),f}).flat(1))}function u1(l){return[...new Set(l)]}function d1(l){let i={},s=Object.keys(l).sort();for(let c of s)i[c]=l[c];return i}function f1(l,i){let s=new Set;return new Set(i),l.reduce((c,d)=>{let f=JSON.stringify(d1(d));return s.has(f)||(s.add(f),c.push({key:f,link:d})),c},[])}function zm(){let l=w.useContext(ol);return gu(l,"You must render this element inside a <DataRouterContext.Provider> element"),l}function p1(){let l=w.useContext(eo);return gu(l,"You must render this element inside a <DataRouterStateContext.Provider> element"),l}var xu=w.createContext(void 0);xu.displayName="FrameworkContext";function Am(){let l=w.useContext(xu);return gu(l,"You must render this element inside a <HydratedRouter> element"),l}function m1(l,i){let s=w.useContext(xu),[c,d]=w.useState(!1),[f,p]=w.useState(!1),{onFocus:h,onBlur:b,onMouseEnter:g,onMouseLeave:v,onTouchStart:N}=i,_=w.useRef(null);w.useEffect(()=>{if(l==="render"&&p(!0),l==="viewport"){let A=M=>{M.forEach(q=>{p(q.isIntersecting)})},y=new IntersectionObserver(A,{threshold:.5});return _.current&&y.observe(_.current),()=>{y.disconnect()}}},[l]),w.useEffect(()=>{if(c){let A=setTimeout(()=>{p(!0)},100);return()=>{clearTimeout(A)}}},[c]);let H=()=>{d(!0)},S=()=>{d(!1),p(!1)};return s?l!=="intent"?[f,_,{}]:[f,_,{onFocus:cr(h,H),onBlur:cr(b,S),onMouseEnter:cr(g,H),onMouseLeave:cr(v,S),onTouchStart:cr(N,H)}]:[!1,_,{}]}function cr(l,i){return s=>{l&&l(s),s.defaultPrevented||i(s)}}function h1({page:l,...i}){let{router:s}=zm(),c=w.useMemo(()=>gm(s.routes,l,s.basename),[s.routes,l,s.basename]);return c?w.createElement(x1,{page:l,matches:c,...i}):null}function g1(l){let{manifest:i,routeModules:s}=Am(),[c,d]=w.useState([]);return w.useEffect(()=>{let f=!1;return s1(l,i,s).then(p=>{f||d(p)}),()=>{f=!0}},[l,i,s]),c}function x1({page:l,matches:i,...s}){let c=ta(),{future:d,manifest:f,routeModules:p}=Am(),{basename:h}=zm(),{loaderData:b,matches:g}=p1(),v=w.useMemo(()=>L0(l,i,g,f,c,"data"),[l,i,g,f,c]),N=w.useMemo(()=>L0(l,i,g,f,c,"assets"),[l,i,g,f,c]),_=w.useMemo(()=>{if(l===c.pathname+c.search+c.hash)return[];let A=new Set,y=!1;if(i.forEach(q=>{var F;let C=f.routes[q.route.id];!C||!C.hasLoader||(!v.some(P=>P.route.id===q.route.id)&&q.route.id in b&&((F=p[q.route.id])!=null&&F.shouldRevalidate)||C.hasClientLoader?y=!0:A.add(q.route.id))}),A.size===0)return[];let M=r1(l,h,d.unstable_trailingSlashAwareDataRequests,"data");return y&&A.size>0&&M.searchParams.set("_routes",i.filter(q=>A.has(q.route.id)).map(q=>q.route.id).join(",")),[M.pathname+M.search]},[h,d.unstable_trailingSlashAwareDataRequests,b,c,f,v,i,l,p]),H=w.useMemo(()=>c1(N,f),[N,f]),S=g1(N);return w.createElement(w.Fragment,null,_.map(A=>w.createElement("link",{key:A,rel:"prefetch",as:"fetch",href:A,...s})),H.map(A=>w.createElement("link",{key:A,rel:"modulepreload",href:A,...s})),S.map(({key:A,link:y})=>w.createElement("link",{key:A,nonce:s.nonce,...y})))}function b1(...l){return i=>{l.forEach(s=>{typeof s=="function"?s(i):s!=null&&(s.current=i)})}}var v1=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{v1&&(window.__reactRouterVersion="7.12.0")}catch{}function y1({basename:l,children:i,unstable_useTransitions:s,window:c}){let d=w.useRef();d.current==null&&(d.current=Ix({window:c,v5Compat:!0}));let f=d.current,[p,h]=w.useState({action:f.action,location:f.location}),b=w.useCallback(g=>{s===!1?h(g):w.startTransition(()=>h(g))},[s]);return w.useLayoutEffect(()=>f.listen(b),[f,b]),w.createElement(Jb,{basename:l,children:i,location:p.location,navigationType:p.action,navigator:f,unstable_useTransitions:s})}var Rm=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,De=w.forwardRef(function({onClick:i,discover:s="render",prefetch:c="none",relative:d,reloadDocument:f,replace:p,state:h,target:b,to:g,preventScrollReset:v,viewTransition:N,unstable_defaultShouldRevalidate:_,...H},S){let{basename:A,unstable_useTransitions:y}=w.useContext(Ct),M=typeof g=="string"&&Rm.test(g),q=wm(g,A);g=q.to;let C=Rb(g,{relative:d}),[F,P,ne]=m1(c,H),Y=N1(g,{replace:p,state:h,target:b,preventScrollReset:v,relative:d,viewTransition:N,unstable_defaultShouldRevalidate:_,unstable_useTransitions:y});function I(ie){i&&i(ie),ie.defaultPrevented||Y(ie)}let W=w.createElement("a",{...H,...ne,href:q.absoluteURL||C,onClick:q.isExternal||f?i:I,ref:b1(S,P),target:b,"data-discover":!M&&s==="render"?"true":void 0});return F&&!M?w.createElement(w.Fragment,null,W,w.createElement(h1,{page:C})):W});De.displayName="Link";var Lm=w.forwardRef(function({"aria-current":i="page",caseSensitive:s=!1,className:c="",end:d=!1,style:f,to:p,viewTransition:h,children:b,...g},v){let N=br(p,{relative:g.relative}),_=ta(),H=w.useContext(eo),{navigator:S,basename:A}=w.useContext(Ct),y=H!=null&&_1(N)&&h===!0,M=S.encodeLocation?S.encodeLocation(N).pathname:N.pathname,q=_.pathname,C=H&&H.navigation&&H.navigation.location?H.navigation.location.pathname:null;s||(q=q.toLowerCase(),C=C?C.toLowerCase():null,M=M.toLowerCase()),C&&A&&(C=ya(C,A)||C);const F=M!=="/"&&M.endsWith("/")?M.length-1:M.length;let P=q===M||!d&&q.startsWith(M)&&q.charAt(F)==="/",ne=C!=null&&(C===M||!d&&C.startsWith(M)&&C.charAt(M.length)==="/"),Y={isActive:P,isPending:ne,isTransitioning:y},I=P?i:void 0,W;typeof c=="function"?W=c(Y):W=[c,P?"active":null,ne?"pending":null,y?"transitioning":null].filter(Boolean).join(" ");let ie=typeof f=="function"?f(Y):f;return w.createElement(De,{...g,"aria-current":I,className:W,ref:v,style:ie,to:p,viewTransition:h},typeof b=="function"?b(Y):b)});Lm.displayName="NavLink";var w1=w.forwardRef(({discover:l="render",fetcherKey:i,navigate:s,reloadDocument:c,replace:d,state:f,method:p=Vi,action:h,onSubmit:b,relative:g,preventScrollReset:v,viewTransition:N,unstable_defaultShouldRevalidate:_,...H},S)=>{let{unstable_useTransitions:A}=w.useContext(Ct),y=k1(),M=T1(h,{relative:g}),q=p.toLowerCase()==="get"?"get":"post",C=typeof h=="string"&&Rm.test(h),F=P=>{if(b&&b(P),P.defaultPrevented)return;P.preventDefault();let ne=P.nativeEvent.submitter,Y=(ne==null?void 0:ne.getAttribute("formmethod"))||p,I=()=>y(ne||P.currentTarget,{fetcherKey:i,method:Y,navigate:s,replace:d,state:f,relative:g,preventScrollReset:v,viewTransition:N,unstable_defaultShouldRevalidate:_});A&&s!==!1?w.startTransition(()=>I()):I()};return w.createElement("form",{ref:S,method:q,action:M,onSubmit:c?b:F,...H,"data-discover":!C&&l==="render"?"true":void 0})});w1.displayName="Form";function j1(l){return`${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Om(l){let i=w.useContext(ol);return Ue(i,j1(l)),i}function N1(l,{target:i,replace:s,state:c,preventScrollReset:d,relative:f,viewTransition:p,unstable_defaultShouldRevalidate:h,unstable_useTransitions:b}={}){let g=bn(),v=ta(),N=br(l,{relative:f});return w.useCallback(_=>{if(t1(_,i)){_.preventDefault();let H=s!==void 0?s:hr(v)===hr(N),S=()=>g(l,{replace:H,state:c,preventScrollReset:d,relative:f,viewTransition:p,unstable_defaultShouldRevalidate:h});b?w.startTransition(()=>S()):S()}},[v,g,N,s,c,i,l,d,f,p,h,b])}var S1=0,E1=()=>`__${String(++S1)}__`;function k1(){let{router:l}=Om("useSubmit"),{basename:i}=w.useContext(Ct),s=Qb(),c=l.fetch,d=l.navigate;return w.useCallback(async(f,p={})=>{let{action:h,method:b,encType:g,formData:v,body:N}=l1(f,i);if(p.navigate===!1){let _=p.fetcherKey||E1();await c(_,s,p.action||h,{unstable_defaultShouldRevalidate:p.unstable_defaultShouldRevalidate,preventScrollReset:p.preventScrollReset,formData:v,body:N,formMethod:p.method||b,formEncType:p.encType||g,flushSync:p.flushSync})}else await d(p.action||h,{unstable_defaultShouldRevalidate:p.unstable_defaultShouldRevalidate,preventScrollReset:p.preventScrollReset,formData:v,body:N,formMethod:p.method||b,formEncType:p.encType||g,replace:p.replace,state:p.state,fromRouteId:s,flushSync:p.flushSync,viewTransition:p.viewTransition})},[c,d,i,s])}function T1(l,{relative:i}={}){let{basename:s}=w.useContext(Ct),c=w.useContext(Yt);Ue(c,"useFormAction must be used inside a RouteContext");let[d]=c.matches.slice(-1),f={...br(l||".",{relative:i})},p=ta();if(l==null){f.search=p.search;let h=new URLSearchParams(f.search),b=h.getAll("index");if(b.some(v=>v==="")){h.delete("index"),b.filter(N=>N).forEach(N=>h.append("index",N));let v=h.toString();f.search=v?`?${v}`:""}}return(!l||l===".")&&d.route.index&&(f.search=f.search?f.search.replace(/^\?/,"?index&"):"?index"),s!=="/"&&(f.pathname=f.pathname==="/"?s:va([s,f.pathname])),hr(f)}function _1(l,{relative:i}={}){let s=w.useContext(Nm);Ue(s!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:c}=Om("useViewTransitionState"),d=br(l,{relative:i});if(!s.isTransitioning)return!1;let f=ya(s.currentLocation.pathname,c)||s.currentLocation.pathname,p=ya(s.nextLocation.pathname,c)||s.nextLocation.pathname;return Ki(d.pathname,p)!=null||Ki(d.pathname,f)!=null}function Dm(l){var i,s,c="";if(typeof l=="string"||typeof l=="number")c+=l;else if(typeof l=="object")if(Array.isArray(l)){var d=l.length;for(i=0;i<d;i++)l[i]&&(s=Dm(l[i]))&&(c&&(c+=" "),c+=s)}else for(s in l)l[s]&&(c&&(c+=" "),c+=s);return c}function mn(){for(var l,i,s=0,c="",d=arguments.length;s<d;s++)(l=arguments[s])&&(i=Dm(l))&&(c&&(c+=" "),c+=i);return c}function C1(l){if(typeof document>"u")return;let i=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css",i.firstChild?i.insertBefore(s,i.firstChild):i.appendChild(s),s.styleSheet?s.styleSheet.cssText=l:s.appendChild(document.createTextNode(l))}C1(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);var vr=l=>typeof l=="number"&&!isNaN(l),gn=l=>typeof l=="string",wa=l=>typeof l=="function",z1=l=>gn(l)||vr(l),Ic=l=>gn(l)||wa(l)?l:null,A1=(l,i)=>l===!1||vr(l)&&l>0?l:i,Wc=l=>w.isValidElement(l)||gn(l)||wa(l)||vr(l);function R1(l,i,s=300){let{scrollHeight:c,style:d}=l;requestAnimationFrame(()=>{d.minHeight="initial",d.height=c+"px",d.transition=`all ${s}ms`,requestAnimationFrame(()=>{d.height="0",d.padding="0",d.margin="0",setTimeout(i,s)})})}function L1({enter:l,exit:i,appendPosition:s=!1,collapse:c=!0,collapseDuration:d=300}){return function({children:f,position:p,preventExitTransition:h,done:b,nodeRef:g,isIn:v,playToast:N}){let _=s?`${l}--${p}`:l,H=s?`${i}--${p}`:i,S=w.useRef(0);return w.useLayoutEffect(()=>{let A=g.current,y=_.split(" "),M=q=>{q.target===g.current&&(N(),A.removeEventListener("animationend",M),A.removeEventListener("animationcancel",M),S.current===0&&q.type!=="animationcancel"&&A.classList.remove(...y))};A.classList.add(...y),A.addEventListener("animationend",M),A.addEventListener("animationcancel",M)},[]),w.useEffect(()=>{let A=g.current,y=()=>{A.removeEventListener("animationend",y),c?R1(A,b,d):b()};v||(h?y():(S.current=1,A.className+=` ${H}`,A.addEventListener("animationend",y)))},[v]),ve.createElement(ve.Fragment,null,f)}}function O0(l,i){return{content:Mm(l.content,l.props),containerId:l.props.containerId,id:l.props.toastId,theme:l.props.theme,type:l.props.type,data:l.props.data||{},isLoading:l.props.isLoading,icon:l.props.icon,reason:l.removalReason,status:i}}function Mm(l,i,s=!1){return w.isValidElement(l)&&!gn(l.type)?w.cloneElement(l,{closeToast:i.closeToast,toastProps:i,data:i.data,isPaused:s}):wa(l)?l({closeToast:i.closeToast,toastProps:i,data:i.data,isPaused:s}):l}function O1({closeToast:l,theme:i,ariaLabel:s="close"}){return ve.createElement("button",{className:`Toastify__close-button Toastify__close-button--${i}`,type:"button",onClick:c=>{c.stopPropagation(),l(!0)},"aria-label":s},ve.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},ve.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function D1({delay:l,isRunning:i,closeToast:s,type:c="default",hide:d,className:f,controlledProgress:p,progress:h,rtl:b,isIn:g,theme:v}){let N=d||p&&h===0,_={animationDuration:`${l}ms`,animationPlayState:i?"running":"paused"};p&&(_.transform=`scaleX(${h})`);let H=mn("Toastify__progress-bar",p?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${v}`,`Toastify__progress-bar--${c}`,{"Toastify__progress-bar--rtl":b}),S=wa(f)?f({rtl:b,type:c,defaultClassName:H}):mn(H,f),A={[p&&h>=1?"onTransitionEnd":"onAnimationEnd"]:p&&h<1?null:()=>{g&&s()}};return ve.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":N},ve.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${v} Toastify__progress-bar--${c}`}),ve.createElement("div",{role:"progressbar","aria-hidden":N?"true":"false","aria-label":"notification timer",className:S,style:_,...A}))}var M1=1,Um=()=>`${M1++}`;function U1(l,i,s){let c=1,d=0,f=[],p=[],h=i,b=new Map,g=new Set,v=q=>(g.add(q),()=>g.delete(q)),N=()=>{p=Array.from(b.values()),g.forEach(q=>q())},_=({containerId:q,toastId:C,updateId:F})=>{let P=q?q!==l:l!==1,ne=b.has(C)&&F==null;return P||ne},H=(q,C)=>{b.forEach(F=>{var P;(C==null||C===F.props.toastId)&&((P=F.toggle)==null||P.call(F,q))})},S=q=>{var C,F;(F=(C=q.props)==null?void 0:C.onClose)==null||F.call(C,q.removalReason),q.isActive=!1},A=q=>{if(q==null)b.forEach(S);else{let C=b.get(q);C&&S(C)}N()},y=()=>{d-=f.length,f=[]},M=q=>{var C,F;let{toastId:P,updateId:ne}=q.props,Y=ne==null;q.staleId&&b.delete(q.staleId),q.isActive=!0,b.set(P,q),N(),s(O0(q,Y?"added":"updated")),Y&&((F=(C=q.props).onOpen)==null||F.call(C))};return{id:l,props:h,observe:v,toggle:H,removeToast:A,toasts:b,clearQueue:y,buildToast:(q,C)=>{if(_(C))return;let{toastId:F,updateId:P,data:ne,staleId:Y,delay:I}=C,W=P==null;W&&d++;let ie={...h,style:h.toastStyle,key:c++,...Object.fromEntries(Object.entries(C).filter(([oe,Te])=>Te!=null)),toastId:F,updateId:P,data:ne,isIn:!1,className:Ic(C.className||h.toastClassName),progressClassName:Ic(C.progressClassName||h.progressClassName),autoClose:C.isLoading?!1:A1(C.autoClose,h.autoClose),closeToast(oe){b.get(F).removalReason=oe,A(F)},deleteToast(){let oe=b.get(F);if(oe!=null){if(s(O0(oe,"removed")),b.delete(F),d--,d<0&&(d=0),f.length>0){M(f.shift());return}N()}}};ie.closeButton=h.closeButton,C.closeButton===!1||Wc(C.closeButton)?ie.closeButton=C.closeButton:C.closeButton===!0&&(ie.closeButton=Wc(h.closeButton)?h.closeButton:!0);let de={content:q,props:ie,staleId:Y};h.limit&&h.limit>0&&d>h.limit&&W?f.push(de):vr(I)?setTimeout(()=>{M(de)},I):M(de)},setProps(q){h=q},setToggle:(q,C)=>{let F=b.get(q);F&&(F.toggle=C)},isToastActive:q=>{var C;return(C=b.get(q))==null?void 0:C.isActive},getSnapshot:()=>p}}var ct=new Map,gr=[],eu=new Set,B1=l=>eu.forEach(i=>i(l)),Bm=()=>ct.size>0;function H1(){gr.forEach(l=>qm(l.content,l.options)),gr=[]}var q1=(l,{containerId:i})=>{var s;return(s=ct.get(i||1))==null?void 0:s.toasts.get(l)};function Hm(l,i){var s;if(i)return!!((s=ct.get(i))!=null&&s.isToastActive(l));let c=!1;return ct.forEach(d=>{d.isToastActive(l)&&(c=!0)}),c}function G1(l){if(!Bm()){gr=gr.filter(i=>l!=null&&i.options.toastId!==l);return}if(l==null||z1(l))ct.forEach(i=>{i.removeToast(l)});else if(l&&("containerId"in l||"id"in l)){let i=ct.get(l.containerId);i?i.removeToast(l.id):ct.forEach(s=>{s.removeToast(l.id)})}}var Y1=(l={})=>{ct.forEach(i=>{i.props.limit&&(!l.containerId||i.id===l.containerId)&&i.clearQueue()})};function qm(l,i){Wc(l)&&(Bm()||gr.push({content:l,options:i}),ct.forEach(s=>{s.buildToast(l,i)}))}function X1(l){var i;(i=ct.get(l.containerId||1))==null||i.setToggle(l.id,l.fn)}function Gm(l,i){ct.forEach(s=>{(i==null||!(i!=null&&i.containerId)||(i==null?void 0:i.containerId)===s.id)&&s.toggle(l,i==null?void 0:i.id)})}function V1(l){let i=l.containerId||1;return{subscribe(s){let c=U1(i,l,B1);ct.set(i,c);let d=c.observe(s);return H1(),()=>{d(),ct.delete(i)}},setProps(s){var c;(c=ct.get(i))==null||c.setProps(s)},getSnapshot(){var s;return(s=ct.get(i))==null?void 0:s.getSnapshot()}}}function Q1(l){return eu.add(l),()=>{eu.delete(l)}}function Z1(l){return l&&(gn(l.toastId)||vr(l.toastId))?l.toastId:Um()}function yr(l,i){return qm(l,i),i.toastId}function ao(l,i){return{...i,type:i&&i.type||l,toastId:Z1(i)}}function no(l){return(i,s)=>yr(i,ao(l,s))}function ue(l,i){return yr(l,ao("default",i))}ue.loading=(l,i)=>yr(l,ao("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...i}));function $1(l,{pending:i,error:s,success:c},d){let f;i&&(f=gn(i)?ue.loading(i,d):ue.loading(i.render,{...d,...i}));let p={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},h=(g,v,N)=>{if(v==null){ue.dismiss(f);return}let _={type:g,...p,...d,data:N},H=gn(v)?{render:v}:v;return f?ue.update(f,{..._,...H}):ue(H.render,{..._,...H}),N},b=wa(l)?l():l;return b.then(g=>h("success",c,g)).catch(g=>h("error",s,g)),b}ue.promise=$1;ue.success=no("success");ue.info=no("info");ue.error=no("error");ue.warning=no("warning");ue.warn=ue.warning;ue.dark=(l,i)=>yr(l,ao("default",{theme:"dark",...i}));function P1(l){G1(l)}ue.dismiss=P1;ue.clearWaitingQueue=Y1;ue.isActive=Hm;ue.update=(l,i={})=>{let s=q1(l,i);if(s){let{props:c,content:d}=s,f={delay:100,...c,...i,toastId:i.toastId||l,updateId:Um()};f.toastId!==l&&(f.staleId=l);let p=f.render||d;delete f.render,yr(p,f)}};ue.done=l=>{ue.update(l,{progress:1})};ue.onChange=Q1;ue.play=l=>Gm(!0,l);ue.pause=l=>Gm(!1,l);function K1(l){var i;let{subscribe:s,getSnapshot:c,setProps:d}=w.useRef(V1(l)).current;d(l);let f=(i=w.useSyncExternalStore(s,c,c))==null?void 0:i.slice();function p(h){if(!f)return[];let b=new Map;return l.newestOnTop&&f.reverse(),f.forEach(g=>{let{position:v}=g.props;b.has(v)||b.set(v,[]),b.get(v).push(g)}),Array.from(b,g=>h(g[0],g[1]))}return{getToastToRender:p,isToastActive:Hm,count:f==null?void 0:f.length}}function J1(l){let[i,s]=w.useState(!1),[c,d]=w.useState(!1),f=w.useRef(null),p=w.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:h,pauseOnHover:b,closeToast:g,onClick:v,closeOnClick:N}=l;X1({id:l.toastId,containerId:l.containerId,fn:s}),w.useEffect(()=>{if(l.pauseOnFocusLoss)return _(),()=>{H()}},[l.pauseOnFocusLoss]);function _(){document.hasFocus()||M(),window.addEventListener("focus",y),window.addEventListener("blur",M)}function H(){window.removeEventListener("focus",y),window.removeEventListener("blur",M)}function S(Y){if(l.draggable===!0||l.draggable===Y.pointerType){q();let I=f.current;p.canCloseOnClick=!0,p.canDrag=!0,I.style.transition="none",l.draggableDirection==="x"?(p.start=Y.clientX,p.removalDistance=I.offsetWidth*(l.draggablePercent/100)):(p.start=Y.clientY,p.removalDistance=I.offsetHeight*(l.draggablePercent===80?l.draggablePercent*1.5:l.draggablePercent)/100)}}function A(Y){let{top:I,bottom:W,left:ie,right:de}=f.current.getBoundingClientRect();Y.nativeEvent.type!=="touchend"&&l.pauseOnHover&&Y.clientX>=ie&&Y.clientX<=de&&Y.clientY>=I&&Y.clientY<=W?M():y()}function y(){s(!0)}function M(){s(!1)}function q(){p.didMove=!1,document.addEventListener("pointermove",F),document.addEventListener("pointerup",P)}function C(){document.removeEventListener("pointermove",F),document.removeEventListener("pointerup",P)}function F(Y){let I=f.current;if(p.canDrag&&I){p.didMove=!0,i&&M(),l.draggableDirection==="x"?p.delta=Y.clientX-p.start:p.delta=Y.clientY-p.start,p.start!==Y.clientX&&(p.canCloseOnClick=!1);let W=l.draggableDirection==="x"?`${p.delta}px, var(--y)`:`0, calc(${p.delta}px + var(--y))`;I.style.transform=`translate3d(${W},0)`,I.style.opacity=`${1-Math.abs(p.delta/p.removalDistance)}`}}function P(){C();let Y=f.current;if(p.canDrag&&p.didMove&&Y){if(p.canDrag=!1,Math.abs(p.delta)>p.removalDistance){d(!0),l.closeToast(!0),l.collapseAll();return}Y.style.transition="transform 0.2s, opacity 0.2s",Y.style.removeProperty("transform"),Y.style.removeProperty("opacity")}}let ne={onPointerDown:S,onPointerUp:A};return h&&b&&(ne.onMouseEnter=M,l.stacked||(ne.onMouseLeave=y)),N&&(ne.onClick=Y=>{v&&v(Y),p.canCloseOnClick&&g(!0)}),{playToast:y,pauseToast:M,isRunning:i,preventExitTransition:c,toastRef:f,eventHandlers:ne}}var F1=typeof window<"u"?w.useLayoutEffect:w.useEffect,lo=({theme:l,type:i,isLoading:s,...c})=>ve.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:l==="colored"?"currentColor":`var(--toastify-icon-color-${i})`,...c});function I1(l){return ve.createElement(lo,{...l},ve.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function W1(l){return ve.createElement(lo,{...l},ve.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function ev(l){return ve.createElement(lo,{...l},ve.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function tv(l){return ve.createElement(lo,{...l},ve.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function av(){return ve.createElement("div",{className:"Toastify__spinner"})}var tu={info:W1,warning:I1,success:ev,error:tv,spinner:av},nv=l=>l in tu;function lv({theme:l,type:i,isLoading:s,icon:c}){let d=null,f={theme:l,type:i};return c===!1||(wa(c)?d=c({...f,isLoading:s}):w.isValidElement(c)?d=w.cloneElement(c,f):s?d=tu.spinner():nv(i)&&(d=tu[i](f))),d}var rv=l=>{let{isRunning:i,preventExitTransition:s,toastRef:c,eventHandlers:d,playToast:f}=J1(l),{closeButton:p,children:h,autoClose:b,onClick:g,type:v,hideProgressBar:N,closeToast:_,transition:H,position:S,className:A,style:y,progressClassName:M,updateId:q,role:C,progress:F,rtl:P,toastId:ne,deleteToast:Y,isIn:I,isLoading:W,closeOnClick:ie,theme:de,ariaLabel:oe}=l,Te=mn("Toastify__toast",`Toastify__toast-theme--${de}`,`Toastify__toast--${v}`,{"Toastify__toast--rtl":P},{"Toastify__toast--close-on-click":ie}),J=wa(A)?A({rtl:P,position:S,type:v,defaultClassName:Te}):mn(Te,A),ee=lv(l),R=!!F||!b,K={closeToast:_,type:v,theme:de},te=null;return p===!1||(wa(p)?te=p(K):w.isValidElement(p)?te=w.cloneElement(p,K):te=O1(K)),ve.createElement(H,{isIn:I,done:Y,position:S,preventExitTransition:s,nodeRef:c,playToast:f},ve.createElement("div",{id:ne,tabIndex:0,onClick:g,"data-in":I,className:J,...d,style:y,ref:c,...I&&{role:C,"aria-label":oe}},ee!=null&&ve.createElement("div",{className:mn("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!W})},ee),Mm(h,l,!i),te,!l.customProgressBar&&ve.createElement(D1,{...q&&!R?{key:`p-${q}`}:{},rtl:P,theme:de,delay:b,isRunning:i,isIn:I,closeToast:_,hide:N,type:v,className:M,controlledProgress:R,progress:F||0})))},iv=(l,i=!1)=>({enter:`Toastify--animate Toastify__${l}-enter`,exit:`Toastify--animate Toastify__${l}-exit`,appendPosition:i}),ov=L1(iv("bounce",!0)),sv={position:"top-right",transition:ov,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:l=>l.altKey&&l.code==="KeyT"};function cv(l){let i={...sv,...l},s=l.stacked,[c,d]=w.useState(!0),f=w.useRef(null),{getToastToRender:p,isToastActive:h,count:b}=K1(i),{className:g,style:v,rtl:N,containerId:_,hotKeys:H}=i;function S(y){let M=mn("Toastify__toast-container",`Toastify__toast-container--${y}`,{"Toastify__toast-container--rtl":N});return wa(g)?g({position:y,rtl:N,defaultClassName:M}):mn(M,Ic(g))}function A(){s&&(d(!0),ue.play())}return F1(()=>{var y;if(s){let M=f.current.querySelectorAll('[data-in="true"]'),q=12,C=(y=i.position)==null?void 0:y.includes("top"),F=0,P=0;Array.from(M).reverse().forEach((ne,Y)=>{let I=ne;I.classList.add("Toastify__toast--stacked"),Y>0&&(I.dataset.collapsed=`${c}`),I.dataset.pos||(I.dataset.pos=C?"top":"bot");let W=F*(c?.2:1)+(c?0:q*Y);I.style.setProperty("--y",`${C?W:W*-1}px`),I.style.setProperty("--g",`${q}`),I.style.setProperty("--s",`${1-(c?P:0)}`),F+=I.offsetHeight,P+=.025})}},[c,b,s]),w.useEffect(()=>{function y(M){var q;let C=f.current;H(M)&&((q=C.querySelector('[tabIndex="0"]'))==null||q.focus(),d(!1),ue.pause()),M.key==="Escape"&&(document.activeElement===C||C!=null&&C.contains(document.activeElement))&&(d(!0),ue.play())}return document.addEventListener("keydown",y),()=>{document.removeEventListener("keydown",y)}},[H]),ve.createElement("section",{ref:f,className:"Toastify",id:_,onMouseEnter:()=>{s&&(d(!1),ue.pause())},onMouseLeave:A,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":i["aria-label"]},p((y,M)=>{let q=M.length?{...v}:{...v,pointerEvents:"none"};return ve.createElement("div",{tabIndex:-1,className:S(y),"data-stacked":s,style:q,key:`c-${y}`},M.map(({content:C,props:F})=>ve.createElement(rv,{...F,stacked:s,collapseAll:A,isIn:h(F.toastId,F.containerId),key:`t-${F.key}`},C)))}))}function Ym(l,i){return function(){return l.apply(i,arguments)}}const{toString:uv}=Object.prototype,{getPrototypeOf:bu}=Object,{iterator:ro,toStringTag:Xm}=Symbol,io=(l=>i=>{const s=uv.call(i);return l[s]||(l[s]=s.slice(8,-1).toLowerCase())})(Object.create(null)),Pt=l=>(l=l.toLowerCase(),i=>io(i)===l),oo=l=>i=>typeof i===l,{isArray:cl}=Array,rl=oo("undefined");function wr(l){return l!==null&&!rl(l)&&l.constructor!==null&&!rl(l.constructor)&&bt(l.constructor.isBuffer)&&l.constructor.isBuffer(l)}const Vm=Pt("ArrayBuffer");function dv(l){let i;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?i=ArrayBuffer.isView(l):i=l&&l.buffer&&Vm(l.buffer),i}const fv=oo("string"),bt=oo("function"),Qm=oo("number"),jr=l=>l!==null&&typeof l=="object",pv=l=>l===!0||l===!1,Zi=l=>{if(io(l)!=="object")return!1;const i=bu(l);return(i===null||i===Object.prototype||Object.getPrototypeOf(i)===null)&&!(Xm in l)&&!(ro in l)},mv=l=>{if(!jr(l)||wr(l))return!1;try{return Object.keys(l).length===0&&Object.getPrototypeOf(l)===Object.prototype}catch{return!1}},hv=Pt("Date"),gv=Pt("File"),xv=l=>!!(l&&typeof l.uri<"u"),bv=l=>l&&typeof l.getParts<"u",vv=Pt("Blob"),yv=Pt("FileList"),wv=l=>jr(l)&&bt(l.pipe);function jv(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const D0=jv(),M0=typeof D0.FormData<"u"?D0.FormData:void 0,Nv=l=>{let i;return l&&(M0&&l instanceof M0||bt(l.append)&&((i=io(l))==="formdata"||i==="object"&&bt(l.toString)&&l.toString()==="[object FormData]"))},Sv=Pt("URLSearchParams"),[Ev,kv,Tv,_v]=["ReadableStream","Request","Response","Headers"].map(Pt),Cv=l=>l.trim?l.trim():l.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Nr(l,i,{allOwnKeys:s=!1}={}){if(l===null||typeof l>"u")return;let c,d;if(typeof l!="object"&&(l=[l]),cl(l))for(c=0,d=l.length;c<d;c++)i.call(null,l[c],c,l);else{if(wr(l))return;const f=s?Object.getOwnPropertyNames(l):Object.keys(l),p=f.length;let h;for(c=0;c<p;c++)h=f[c],i.call(null,l[h],h,l)}}function Zm(l,i){if(wr(l))return null;i=i.toLowerCase();const s=Object.keys(l);let c=s.length,d;for(;c-- >0;)if(d=s[c],i===d.toLowerCase())return d;return null}const pn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,$m=l=>!rl(l)&&l!==pn;function au(){const{caseless:l,skipUndefined:i}=$m(this)&&this||{},s={},c=(d,f)=>{if(f==="__proto__"||f==="constructor"||f==="prototype")return;const p=l&&Zm(s,f)||f;Zi(s[p])&&Zi(d)?s[p]=au(s[p],d):Zi(d)?s[p]=au({},d):cl(d)?s[p]=d.slice():(!i||!rl(d))&&(s[p]=d)};for(let d=0,f=arguments.length;d<f;d++)arguments[d]&&Nr(arguments[d],c);return s}const zv=(l,i,s,{allOwnKeys:c}={})=>(Nr(i,(d,f)=>{s&&bt(d)?Object.defineProperty(l,f,{value:Ym(d,s),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(l,f,{value:d,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:c}),l),Av=l=>(l.charCodeAt(0)===65279&&(l=l.slice(1)),l),Rv=(l,i,s,c)=>{l.prototype=Object.create(i.prototype,c),Object.defineProperty(l.prototype,"constructor",{value:l,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(l,"super",{value:i.prototype}),s&&Object.assign(l.prototype,s)},Lv=(l,i,s,c)=>{let d,f,p;const h={};if(i=i||{},l==null)return i;do{for(d=Object.getOwnPropertyNames(l),f=d.length;f-- >0;)p=d[f],(!c||c(p,l,i))&&!h[p]&&(i[p]=l[p],h[p]=!0);l=s!==!1&&bu(l)}while(l&&(!s||s(l,i))&&l!==Object.prototype);return i},Ov=(l,i,s)=>{l=String(l),(s===void 0||s>l.length)&&(s=l.length),s-=i.length;const c=l.indexOf(i,s);return c!==-1&&c===s},Dv=l=>{if(!l)return null;if(cl(l))return l;let i=l.length;if(!Qm(i))return null;const s=new Array(i);for(;i-- >0;)s[i]=l[i];return s},Mv=(l=>i=>l&&i instanceof l)(typeof Uint8Array<"u"&&bu(Uint8Array)),Uv=(l,i)=>{const c=(l&&l[ro]).call(l);let d;for(;(d=c.next())&&!d.done;){const f=d.value;i.call(l,f[0],f[1])}},Bv=(l,i)=>{let s;const c=[];for(;(s=l.exec(i))!==null;)c.push(s);return c},Hv=Pt("HTMLFormElement"),qv=l=>l.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(s,c,d){return c.toUpperCase()+d}),U0=(({hasOwnProperty:l})=>(i,s)=>l.call(i,s))(Object.prototype),Gv=Pt("RegExp"),Pm=(l,i)=>{const s=Object.getOwnPropertyDescriptors(l),c={};Nr(s,(d,f)=>{let p;(p=i(d,f,l))!==!1&&(c[f]=p||d)}),Object.defineProperties(l,c)},Yv=l=>{Pm(l,(i,s)=>{if(bt(l)&&["arguments","caller","callee"].indexOf(s)!==-1)return!1;const c=l[s];if(bt(c)){if(i.enumerable=!1,"writable"in i){i.writable=!1;return}i.set||(i.set=()=>{throw Error("Can not rewrite read-only method '"+s+"'")})}})},Xv=(l,i)=>{const s={},c=d=>{d.forEach(f=>{s[f]=!0})};return cl(l)?c(l):c(String(l).split(i)),s},Vv=()=>{},Qv=(l,i)=>l!=null&&Number.isFinite(l=+l)?l:i;function Zv(l){return!!(l&&bt(l.append)&&l[Xm]==="FormData"&&l[ro])}const $v=l=>{const i=new Array(10),s=(c,d)=>{if(jr(c)){if(i.indexOf(c)>=0)return;if(wr(c))return c;if(!("toJSON"in c)){i[d]=c;const f=cl(c)?[]:{};return Nr(c,(p,h)=>{const b=s(p,d+1);!rl(b)&&(f[h]=b)}),i[d]=void 0,f}}return c};return s(l,0)},Pv=Pt("AsyncFunction"),Kv=l=>l&&(jr(l)||bt(l))&&bt(l.then)&&bt(l.catch),Km=((l,i)=>l?setImmediate:i?((s,c)=>(pn.addEventListener("message",({source:d,data:f})=>{d===pn&&f===s&&c.length&&c.shift()()},!1),d=>{c.push(d),pn.postMessage(s,"*")}))(`axios@${Math.random()}`,[]):s=>setTimeout(s))(typeof setImmediate=="function",bt(pn.postMessage)),Jv=typeof queueMicrotask<"u"?queueMicrotask.bind(pn):typeof process<"u"&&process.nextTick||Km,Fv=l=>l!=null&&bt(l[ro]),G={isArray:cl,isArrayBuffer:Vm,isBuffer:wr,isFormData:Nv,isArrayBufferView:dv,isString:fv,isNumber:Qm,isBoolean:pv,isObject:jr,isPlainObject:Zi,isEmptyObject:mv,isReadableStream:Ev,isRequest:kv,isResponse:Tv,isHeaders:_v,isUndefined:rl,isDate:hv,isFile:gv,isReactNativeBlob:xv,isReactNative:bv,isBlob:vv,isRegExp:Gv,isFunction:bt,isStream:wv,isURLSearchParams:Sv,isTypedArray:Mv,isFileList:yv,forEach:Nr,merge:au,extend:zv,trim:Cv,stripBOM:Av,inherits:Rv,toFlatObject:Lv,kindOf:io,kindOfTest:Pt,endsWith:Ov,toArray:Dv,forEachEntry:Uv,matchAll:Bv,isHTMLForm:Hv,hasOwnProperty:U0,hasOwnProp:U0,reduceDescriptors:Pm,freezeMethods:Yv,toObjectSet:Xv,toCamelCase:qv,noop:Vv,toFiniteNumber:Qv,findKey:Zm,global:pn,isContextDefined:$m,isSpecCompliantForm:Zv,toJSONObject:$v,isAsyncFn:Pv,isThenable:Kv,setImmediate:Km,asap:Jv,isIterable:Fv};let pe=class Jm extends Error{static from(i,s,c,d,f,p){const h=new Jm(i.message,s||i.code,c,d,f);return h.cause=i,h.name=i.name,i.status!=null&&h.status==null&&(h.status=i.status),p&&Object.assign(h,p),h}constructor(i,s,c,d,f){super(i),Object.defineProperty(this,"message",{value:i,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,s&&(this.code=s),c&&(this.config=c),d&&(this.request=d),f&&(this.response=f,this.status=f.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:G.toJSONObject(this.config),code:this.code,status:this.status}}};pe.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";pe.ERR_BAD_OPTION="ERR_BAD_OPTION";pe.ECONNABORTED="ECONNABORTED";pe.ETIMEDOUT="ETIMEDOUT";pe.ERR_NETWORK="ERR_NETWORK";pe.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";pe.ERR_DEPRECATED="ERR_DEPRECATED";pe.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";pe.ERR_BAD_REQUEST="ERR_BAD_REQUEST";pe.ERR_CANCELED="ERR_CANCELED";pe.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";pe.ERR_INVALID_URL="ERR_INVALID_URL";const Iv=null;function nu(l){return G.isPlainObject(l)||G.isArray(l)}function Fm(l){return G.endsWith(l,"[]")?l.slice(0,-2):l}function Lc(l,i,s){return l?l.concat(i).map(function(d,f){return d=Fm(d),!s&&f?"["+d+"]":d}).join(s?".":""):i}function Wv(l){return G.isArray(l)&&!l.some(nu)}const ey=G.toFlatObject(G,{},null,function(i){return/^is[A-Z]/.test(i)});function so(l,i,s){if(!G.isObject(l))throw new TypeError("target must be an object");i=i||new FormData,s=G.toFlatObject(s,{metaTokens:!0,dots:!1,indexes:!1},!1,function(A,y){return!G.isUndefined(y[A])});const c=s.metaTokens,d=s.visitor||v,f=s.dots,p=s.indexes,b=(s.Blob||typeof Blob<"u"&&Blob)&&G.isSpecCompliantForm(i);if(!G.isFunction(d))throw new TypeError("visitor must be a function");function g(S){if(S===null)return"";if(G.isDate(S))return S.toISOString();if(G.isBoolean(S))return S.toString();if(!b&&G.isBlob(S))throw new pe("Blob is not supported. Use a Buffer instead.");return G.isArrayBuffer(S)||G.isTypedArray(S)?b&&typeof Blob=="function"?new Blob([S]):Buffer.from(S):S}function v(S,A,y){let M=S;if(G.isReactNative(i)&&G.isReactNativeBlob(S))return i.append(Lc(y,A,f),g(S)),!1;if(S&&!y&&typeof S=="object"){if(G.endsWith(A,"{}"))A=c?A:A.slice(0,-2),S=JSON.stringify(S);else if(G.isArray(S)&&Wv(S)||(G.isFileList(S)||G.endsWith(A,"[]"))&&(M=G.toArray(S)))return A=Fm(A),M.forEach(function(C,F){!(G.isUndefined(C)||C===null)&&i.append(p===!0?Lc([A],F,f):p===null?A:A+"[]",g(C))}),!1}return nu(S)?!0:(i.append(Lc(y,A,f),g(S)),!1)}const N=[],_=Object.assign(ey,{defaultVisitor:v,convertValue:g,isVisitable:nu});function H(S,A){if(!G.isUndefined(S)){if(N.indexOf(S)!==-1)throw Error("Circular reference detected in "+A.join("."));N.push(S),G.forEach(S,function(M,q){(!(G.isUndefined(M)||M===null)&&d.call(i,M,G.isString(q)?q.trim():q,A,_))===!0&&H(M,A?A.concat(q):[q])}),N.pop()}}if(!G.isObject(l))throw new TypeError("data must be an object");return H(l),i}function B0(l){const i={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(l).replace(/[!'()~]|%20|%00/g,function(c){return i[c]})}function vu(l,i){this._pairs=[],l&&so(l,this,i)}const Im=vu.prototype;Im.append=function(i,s){this._pairs.push([i,s])};Im.toString=function(i){const s=i?function(c){return i.call(this,c,B0)}:B0;return this._pairs.map(function(d){return s(d[0])+"="+s(d[1])},"").join("&")};function ty(l){return encodeURIComponent(l).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Wm(l,i,s){if(!i)return l;const c=s&&s.encode||ty,d=G.isFunction(s)?{serialize:s}:s,f=d&&d.serialize;let p;if(f?p=f(i,d):p=G.isURLSearchParams(i)?i.toString():new vu(i,d).toString(c),p){const h=l.indexOf("#");h!==-1&&(l=l.slice(0,h)),l+=(l.indexOf("?")===-1?"?":"&")+p}return l}class H0{constructor(){this.handlers=[]}use(i,s,c){return this.handlers.push({fulfilled:i,rejected:s,synchronous:c?c.synchronous:!1,runWhen:c?c.runWhen:null}),this.handlers.length-1}eject(i){this.handlers[i]&&(this.handlers[i]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(i){G.forEach(this.handlers,function(c){c!==null&&i(c)})}}const yu={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},ay=typeof URLSearchParams<"u"?URLSearchParams:vu,ny=typeof FormData<"u"?FormData:null,ly=typeof Blob<"u"?Blob:null,ry={isBrowser:!0,classes:{URLSearchParams:ay,FormData:ny,Blob:ly},protocols:["http","https","file","blob","url","data"]},wu=typeof window<"u"&&typeof document<"u",lu=typeof navigator=="object"&&navigator||void 0,iy=wu&&(!lu||["ReactNative","NativeScript","NS"].indexOf(lu.product)<0),oy=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",sy=wu&&window.location.href||"http://localhost",cy=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:wu,hasStandardBrowserEnv:iy,hasStandardBrowserWebWorkerEnv:oy,navigator:lu,origin:sy},Symbol.toStringTag,{value:"Module"})),ot={...cy,...ry};function uy(l,i){return so(l,new ot.classes.URLSearchParams,{visitor:function(s,c,d,f){return ot.isNode&&G.isBuffer(s)?(this.append(c,s.toString("base64")),!1):f.defaultVisitor.apply(this,arguments)},...i})}function dy(l){return G.matchAll(/\w+|\[(\w*)]/g,l).map(i=>i[0]==="[]"?"":i[1]||i[0])}function fy(l){const i={},s=Object.keys(l);let c;const d=s.length;let f;for(c=0;c<d;c++)f=s[c],i[f]=l[f];return i}function eh(l){function i(s,c,d,f){let p=s[f++];if(p==="__proto__")return!0;const h=Number.isFinite(+p),b=f>=s.length;return p=!p&&G.isArray(d)?d.length:p,b?(G.hasOwnProp(d,p)?d[p]=[d[p],c]:d[p]=c,!h):((!d[p]||!G.isObject(d[p]))&&(d[p]=[]),i(s,c,d[p],f)&&G.isArray(d[p])&&(d[p]=fy(d[p])),!h)}if(G.isFormData(l)&&G.isFunction(l.entries)){const s={};return G.forEachEntry(l,(c,d)=>{i(dy(c),d,s,0)}),s}return null}function py(l,i,s){if(G.isString(l))try{return(i||JSON.parse)(l),G.trim(l)}catch(c){if(c.name!=="SyntaxError")throw c}return(s||JSON.stringify)(l)}const Sr={transitional:yu,adapter:["xhr","http","fetch"],transformRequest:[function(i,s){const c=s.getContentType()||"",d=c.indexOf("application/json")>-1,f=G.isObject(i);if(f&&G.isHTMLForm(i)&&(i=new FormData(i)),G.isFormData(i))return d?JSON.stringify(eh(i)):i;if(G.isArrayBuffer(i)||G.isBuffer(i)||G.isStream(i)||G.isFile(i)||G.isBlob(i)||G.isReadableStream(i))return i;if(G.isArrayBufferView(i))return i.buffer;if(G.isURLSearchParams(i))return s.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),i.toString();let h;if(f){if(c.indexOf("application/x-www-form-urlencoded")>-1)return uy(i,this.formSerializer).toString();if((h=G.isFileList(i))||c.indexOf("multipart/form-data")>-1){const b=this.env&&this.env.FormData;return so(h?{"files[]":i}:i,b&&new b,this.formSerializer)}}return f||d?(s.setContentType("application/json",!1),py(i)):i}],transformResponse:[function(i){const s=this.transitional||Sr.transitional,c=s&&s.forcedJSONParsing,d=this.responseType==="json";if(G.isResponse(i)||G.isReadableStream(i))return i;if(i&&G.isString(i)&&(c&&!this.responseType||d)){const p=!(s&&s.silentJSONParsing)&&d;try{return JSON.parse(i,this.parseReviver)}catch(h){if(p)throw h.name==="SyntaxError"?pe.from(h,pe.ERR_BAD_RESPONSE,this,null,this.response):h}}return i}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ot.classes.FormData,Blob:ot.classes.Blob},validateStatus:function(i){return i>=200&&i<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};G.forEach(["delete","get","head","post","put","patch"],l=>{Sr.headers[l]={}});const my=G.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),hy=l=>{const i={};let s,c,d;return l&&l.split(`
`).forEach(function(p){d=p.indexOf(":"),s=p.substring(0,d).trim().toLowerCase(),c=p.substring(d+1).trim(),!(!s||i[s]&&my[s])&&(s==="set-cookie"?i[s]?i[s].push(c):i[s]=[c]:i[s]=i[s]?i[s]+", "+c:c)}),i},q0=Symbol("internals");function ur(l){return l&&String(l).trim().toLowerCase()}function $i(l){return l===!1||l==null?l:G.isArray(l)?l.map($i):String(l)}function gy(l){const i=Object.create(null),s=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let c;for(;c=s.exec(l);)i[c[1]]=c[2];return i}const xy=l=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(l.trim());function Oc(l,i,s,c,d){if(G.isFunction(c))return c.call(this,i,s);if(d&&(i=s),!!G.isString(i)){if(G.isString(c))return i.indexOf(c)!==-1;if(G.isRegExp(c))return c.test(i)}}function by(l){return l.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(i,s,c)=>s.toUpperCase()+c)}function vy(l,i){const s=G.toCamelCase(" "+i);["get","set","has"].forEach(c=>{Object.defineProperty(l,c+s,{value:function(d,f,p){return this[c].call(this,i,d,f,p)},configurable:!0})})}let vt=class{constructor(i){i&&this.set(i)}set(i,s,c){const d=this;function f(h,b,g){const v=ur(b);if(!v)throw new Error("header name must be a non-empty string");const N=G.findKey(d,v);(!N||d[N]===void 0||g===!0||g===void 0&&d[N]!==!1)&&(d[N||b]=$i(h))}const p=(h,b)=>G.forEach(h,(g,v)=>f(g,v,b));if(G.isPlainObject(i)||i instanceof this.constructor)p(i,s);else if(G.isString(i)&&(i=i.trim())&&!xy(i))p(hy(i),s);else if(G.isObject(i)&&G.isIterable(i)){let h={},b,g;for(const v of i){if(!G.isArray(v))throw TypeError("Object iterator must return a key-value pair");h[g=v[0]]=(b=h[g])?G.isArray(b)?[...b,v[1]]:[b,v[1]]:v[1]}p(h,s)}else i!=null&&f(s,i,c);return this}get(i,s){if(i=ur(i),i){const c=G.findKey(this,i);if(c){const d=this[c];if(!s)return d;if(s===!0)return gy(d);if(G.isFunction(s))return s.call(this,d,c);if(G.isRegExp(s))return s.exec(d);throw new TypeError("parser must be boolean|regexp|function")}}}has(i,s){if(i=ur(i),i){const c=G.findKey(this,i);return!!(c&&this[c]!==void 0&&(!s||Oc(this,this[c],c,s)))}return!1}delete(i,s){const c=this;let d=!1;function f(p){if(p=ur(p),p){const h=G.findKey(c,p);h&&(!s||Oc(c,c[h],h,s))&&(delete c[h],d=!0)}}return G.isArray(i)?i.forEach(f):f(i),d}clear(i){const s=Object.keys(this);let c=s.length,d=!1;for(;c--;){const f=s[c];(!i||Oc(this,this[f],f,i,!0))&&(delete this[f],d=!0)}return d}normalize(i){const s=this,c={};return G.forEach(this,(d,f)=>{const p=G.findKey(c,f);if(p){s[p]=$i(d),delete s[f];return}const h=i?by(f):String(f).trim();h!==f&&delete s[f],s[h]=$i(d),c[h]=!0}),this}concat(...i){return this.constructor.concat(this,...i)}toJSON(i){const s=Object.create(null);return G.forEach(this,(c,d)=>{c!=null&&c!==!1&&(s[d]=i&&G.isArray(c)?c.join(", "):c)}),s}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([i,s])=>i+": "+s).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(i){return i instanceof this?i:new this(i)}static concat(i,...s){const c=new this(i);return s.forEach(d=>c.set(d)),c}static accessor(i){const c=(this[q0]=this[q0]={accessors:{}}).accessors,d=this.prototype;function f(p){const h=ur(p);c[h]||(vy(d,p),c[h]=!0)}return G.isArray(i)?i.forEach(f):f(i),this}};vt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);G.reduceDescriptors(vt.prototype,({value:l},i)=>{let s=i[0].toUpperCase()+i.slice(1);return{get:()=>l,set(c){this[s]=c}}});G.freezeMethods(vt);function Dc(l,i){const s=this||Sr,c=i||s,d=vt.from(c.headers);let f=c.data;return G.forEach(l,function(h){f=h.call(s,f,d.normalize(),i?i.status:void 0)}),d.normalize(),f}function th(l){return!!(l&&l.__CANCEL__)}let Er=class extends pe{constructor(i,s,c){super(i??"canceled",pe.ERR_CANCELED,s,c),this.name="CanceledError",this.__CANCEL__=!0}};function ah(l,i,s){const c=s.config.validateStatus;!s.status||!c||c(s.status)?l(s):i(new pe("Request failed with status code "+s.status,[pe.ERR_BAD_REQUEST,pe.ERR_BAD_RESPONSE][Math.floor(s.status/100)-4],s.config,s.request,s))}function yy(l){const i=/^([-+\w]{1,25})(:?\/\/|:)/.exec(l);return i&&i[1]||""}function wy(l,i){l=l||10;const s=new Array(l),c=new Array(l);let d=0,f=0,p;return i=i!==void 0?i:1e3,function(b){const g=Date.now(),v=c[f];p||(p=g),s[d]=b,c[d]=g;let N=f,_=0;for(;N!==d;)_+=s[N++],N=N%l;if(d=(d+1)%l,d===f&&(f=(f+1)%l),g-p<i)return;const H=v&&g-v;return H?Math.round(_*1e3/H):void 0}}function jy(l,i){let s=0,c=1e3/i,d,f;const p=(g,v=Date.now())=>{s=v,d=null,f&&(clearTimeout(f),f=null),l(...g)};return[(...g)=>{const v=Date.now(),N=v-s;N>=c?p(g,v):(d=g,f||(f=setTimeout(()=>{f=null,p(d)},c-N)))},()=>d&&p(d)]}const Ji=(l,i,s=3)=>{let c=0;const d=wy(50,250);return jy(f=>{const p=f.loaded,h=f.lengthComputable?f.total:void 0,b=p-c,g=d(b),v=p<=h;c=p;const N={loaded:p,total:h,progress:h?p/h:void 0,bytes:b,rate:g||void 0,estimated:g&&h&&v?(h-p)/g:void 0,event:f,lengthComputable:h!=null,[i?"download":"upload"]:!0};l(N)},s)},G0=(l,i)=>{const s=l!=null;return[c=>i[0]({lengthComputable:s,total:l,loaded:c}),i[1]]},Y0=l=>(...i)=>G.asap(()=>l(...i)),Ny=ot.hasStandardBrowserEnv?((l,i)=>s=>(s=new URL(s,ot.origin),l.protocol===s.protocol&&l.host===s.host&&(i||l.port===s.port)))(new URL(ot.origin),ot.navigator&&/(msie|trident)/i.test(ot.navigator.userAgent)):()=>!0,Sy=ot.hasStandardBrowserEnv?{write(l,i,s,c,d,f,p){if(typeof document>"u")return;const h=[`${l}=${encodeURIComponent(i)}`];G.isNumber(s)&&h.push(`expires=${new Date(s).toUTCString()}`),G.isString(c)&&h.push(`path=${c}`),G.isString(d)&&h.push(`domain=${d}`),f===!0&&h.push("secure"),G.isString(p)&&h.push(`SameSite=${p}`),document.cookie=h.join("; ")},read(l){if(typeof document>"u")return null;const i=document.cookie.match(new RegExp("(?:^|; )"+l+"=([^;]*)"));return i?decodeURIComponent(i[1]):null},remove(l){this.write(l,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Ey(l){return typeof l!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(l)}function ky(l,i){return i?l.replace(/\/?\/$/,"")+"/"+i.replace(/^\/+/,""):l}function nh(l,i,s){let c=!Ey(i);return l&&(c||s==!1)?ky(l,i):i}const X0=l=>l instanceof vt?{...l}:l;function xn(l,i){i=i||{};const s={};function c(g,v,N,_){return G.isPlainObject(g)&&G.isPlainObject(v)?G.merge.call({caseless:_},g,v):G.isPlainObject(v)?G.merge({},v):G.isArray(v)?v.slice():v}function d(g,v,N,_){if(G.isUndefined(v)){if(!G.isUndefined(g))return c(void 0,g,N,_)}else return c(g,v,N,_)}function f(g,v){if(!G.isUndefined(v))return c(void 0,v)}function p(g,v){if(G.isUndefined(v)){if(!G.isUndefined(g))return c(void 0,g)}else return c(void 0,v)}function h(g,v,N){if(N in i)return c(g,v);if(N in l)return c(void 0,g)}const b={url:f,method:f,data:f,baseURL:p,transformRequest:p,transformResponse:p,paramsSerializer:p,timeout:p,timeoutMessage:p,withCredentials:p,withXSRFToken:p,adapter:p,responseType:p,xsrfCookieName:p,xsrfHeaderName:p,onUploadProgress:p,onDownloadProgress:p,decompress:p,maxContentLength:p,maxBodyLength:p,beforeRedirect:p,transport:p,httpAgent:p,httpsAgent:p,cancelToken:p,socketPath:p,responseEncoding:p,validateStatus:h,headers:(g,v,N)=>d(X0(g),X0(v),N,!0)};return G.forEach(Object.keys({...l,...i}),function(v){if(v==="__proto__"||v==="constructor"||v==="prototype")return;const N=G.hasOwnProp(b,v)?b[v]:d,_=N(l[v],i[v],v);G.isUndefined(_)&&N!==h||(s[v]=_)}),s}const lh=l=>{const i=xn({},l);let{data:s,withXSRFToken:c,xsrfHeaderName:d,xsrfCookieName:f,headers:p,auth:h}=i;if(i.headers=p=vt.from(p),i.url=Wm(nh(i.baseURL,i.url,i.allowAbsoluteUrls),l.params,l.paramsSerializer),h&&p.set("Authorization","Basic "+btoa((h.username||"")+":"+(h.password?unescape(encodeURIComponent(h.password)):""))),G.isFormData(s)){if(ot.hasStandardBrowserEnv||ot.hasStandardBrowserWebWorkerEnv)p.setContentType(void 0);else if(G.isFunction(s.getHeaders)){const b=s.getHeaders(),g=["content-type","content-length"];Object.entries(b).forEach(([v,N])=>{g.includes(v.toLowerCase())&&p.set(v,N)})}}if(ot.hasStandardBrowserEnv&&(c&&G.isFunction(c)&&(c=c(i)),c||c!==!1&&Ny(i.url))){const b=d&&f&&Sy.read(f);b&&p.set(d,b)}return i},Ty=typeof XMLHttpRequest<"u",_y=Ty&&function(l){return new Promise(function(s,c){const d=lh(l);let f=d.data;const p=vt.from(d.headers).normalize();let{responseType:h,onUploadProgress:b,onDownloadProgress:g}=d,v,N,_,H,S;function A(){H&&H(),S&&S(),d.cancelToken&&d.cancelToken.unsubscribe(v),d.signal&&d.signal.removeEventListener("abort",v)}let y=new XMLHttpRequest;y.open(d.method.toUpperCase(),d.url,!0),y.timeout=d.timeout;function M(){if(!y)return;const C=vt.from("getAllResponseHeaders"in y&&y.getAllResponseHeaders()),P={data:!h||h==="text"||h==="json"?y.responseText:y.response,status:y.status,statusText:y.statusText,headers:C,config:l,request:y};ah(function(Y){s(Y),A()},function(Y){c(Y),A()},P),y=null}"onloadend"in y?y.onloadend=M:y.onreadystatechange=function(){!y||y.readyState!==4||y.status===0&&!(y.responseURL&&y.responseURL.indexOf("file:")===0)||setTimeout(M)},y.onabort=function(){y&&(c(new pe("Request aborted",pe.ECONNABORTED,l,y)),y=null)},y.onerror=function(F){const P=F&&F.message?F.message:"Network Error",ne=new pe(P,pe.ERR_NETWORK,l,y);ne.event=F||null,c(ne),y=null},y.ontimeout=function(){let F=d.timeout?"timeout of "+d.timeout+"ms exceeded":"timeout exceeded";const P=d.transitional||yu;d.timeoutErrorMessage&&(F=d.timeoutErrorMessage),c(new pe(F,P.clarifyTimeoutError?pe.ETIMEDOUT:pe.ECONNABORTED,l,y)),y=null},f===void 0&&p.setContentType(null),"setRequestHeader"in y&&G.forEach(p.toJSON(),function(F,P){y.setRequestHeader(P,F)}),G.isUndefined(d.withCredentials)||(y.withCredentials=!!d.withCredentials),h&&h!=="json"&&(y.responseType=d.responseType),g&&([_,S]=Ji(g,!0),y.addEventListener("progress",_)),b&&y.upload&&([N,H]=Ji(b),y.upload.addEventListener("progress",N),y.upload.addEventListener("loadend",H)),(d.cancelToken||d.signal)&&(v=C=>{y&&(c(!C||C.type?new Er(null,l,y):C),y.abort(),y=null)},d.cancelToken&&d.cancelToken.subscribe(v),d.signal&&(d.signal.aborted?v():d.signal.addEventListener("abort",v)));const q=yy(d.url);if(q&&ot.protocols.indexOf(q)===-1){c(new pe("Unsupported protocol "+q+":",pe.ERR_BAD_REQUEST,l));return}y.send(f||null)})},Cy=(l,i)=>{const{length:s}=l=l?l.filter(Boolean):[];if(i||s){let c=new AbortController,d;const f=function(g){if(!d){d=!0,h();const v=g instanceof Error?g:this.reason;c.abort(v instanceof pe?v:new Er(v instanceof Error?v.message:v))}};let p=i&&setTimeout(()=>{p=null,f(new pe(`timeout of ${i}ms exceeded`,pe.ETIMEDOUT))},i);const h=()=>{l&&(p&&clearTimeout(p),p=null,l.forEach(g=>{g.unsubscribe?g.unsubscribe(f):g.removeEventListener("abort",f)}),l=null)};l.forEach(g=>g.addEventListener("abort",f));const{signal:b}=c;return b.unsubscribe=()=>G.asap(h),b}},zy=function*(l,i){let s=l.byteLength;if(s<i){yield l;return}let c=0,d;for(;c<s;)d=c+i,yield l.slice(c,d),c=d},Ay=async function*(l,i){for await(const s of Ry(l))yield*zy(s,i)},Ry=async function*(l){if(l[Symbol.asyncIterator]){yield*l;return}const i=l.getReader();try{for(;;){const{done:s,value:c}=await i.read();if(s)break;yield c}}finally{await i.cancel()}},V0=(l,i,s,c)=>{const d=Ay(l,i);let f=0,p,h=b=>{p||(p=!0,c&&c(b))};return new ReadableStream({async pull(b){try{const{done:g,value:v}=await d.next();if(g){h(),b.close();return}let N=v.byteLength;if(s){let _=f+=N;s(_)}b.enqueue(new Uint8Array(v))}catch(g){throw h(g),g}},cancel(b){return h(b),d.return()}},{highWaterMark:2})},Q0=64*1024,{isFunction:Yi}=G,Ly=(({Request:l,Response:i})=>({Request:l,Response:i}))(G.global),{ReadableStream:Z0,TextEncoder:$0}=G.global,P0=(l,...i)=>{try{return!!l(...i)}catch{return!1}},Oy=l=>{l=G.merge.call({skipUndefined:!0},Ly,l);const{fetch:i,Request:s,Response:c}=l,d=i?Yi(i):typeof fetch=="function",f=Yi(s),p=Yi(c);if(!d)return!1;const h=d&&Yi(Z0),b=d&&(typeof $0=="function"?(S=>A=>S.encode(A))(new $0):async S=>new Uint8Array(await new s(S).arrayBuffer())),g=f&&h&&P0(()=>{let S=!1;const A=new s(ot.origin,{body:new Z0,method:"POST",get duplex(){return S=!0,"half"}}).headers.has("Content-Type");return S&&!A}),v=p&&h&&P0(()=>G.isReadableStream(new c("").body)),N={stream:v&&(S=>S.body)};d&&["text","arrayBuffer","blob","formData","stream"].forEach(S=>{!N[S]&&(N[S]=(A,y)=>{let M=A&&A[S];if(M)return M.call(A);throw new pe(`Response type '${S}' is not supported`,pe.ERR_NOT_SUPPORT,y)})});const _=async S=>{if(S==null)return 0;if(G.isBlob(S))return S.size;if(G.isSpecCompliantForm(S))return(await new s(ot.origin,{method:"POST",body:S}).arrayBuffer()).byteLength;if(G.isArrayBufferView(S)||G.isArrayBuffer(S))return S.byteLength;if(G.isURLSearchParams(S)&&(S=S+""),G.isString(S))return(await b(S)).byteLength},H=async(S,A)=>{const y=G.toFiniteNumber(S.getContentLength());return y??_(A)};return async S=>{let{url:A,method:y,data:M,signal:q,cancelToken:C,timeout:F,onDownloadProgress:P,onUploadProgress:ne,responseType:Y,headers:I,withCredentials:W="same-origin",fetchOptions:ie}=lh(S),de=i||fetch;Y=Y?(Y+"").toLowerCase():"text";let oe=Cy([q,C&&C.toAbortSignal()],F),Te=null;const J=oe&&oe.unsubscribe&&(()=>{oe.unsubscribe()});let ee;try{if(ne&&g&&y!=="get"&&y!=="head"&&(ee=await H(I,M))!==0){let Q=new s(A,{method:"POST",body:M,duplex:"half"}),j;if(G.isFormData(M)&&(j=Q.headers.get("content-type"))&&I.setContentType(j),Q.body){const[D,$]=G0(ee,Ji(Y0(ne)));M=V0(Q.body,Q0,D,$)}}G.isString(W)||(W=W?"include":"omit");const R=f&&"credentials"in s.prototype,K={...ie,signal:oe,method:y.toUpperCase(),headers:I.normalize().toJSON(),body:M,duplex:"half",credentials:R?W:void 0};Te=f&&new s(A,K);let te=await(f?de(Te,ie):de(A,K));const he=v&&(Y==="stream"||Y==="response");if(v&&(P||he&&J)){const Q={};["status","statusText","headers"].forEach(le=>{Q[le]=te[le]});const j=G.toFiniteNumber(te.headers.get("content-length")),[D,$]=P&&G0(j,Ji(Y0(P),!0))||[];te=new c(V0(te.body,Q0,D,()=>{$&&$(),J&&J()}),Q)}Y=Y||"text";let k=await N[G.findKey(N,Y)||"text"](te,S);return!he&&J&&J(),await new Promise((Q,j)=>{ah(Q,j,{data:k,headers:vt.from(te.headers),status:te.status,statusText:te.statusText,config:S,request:Te})})}catch(R){throw J&&J(),R&&R.name==="TypeError"&&/Load failed|fetch/i.test(R.message)?Object.assign(new pe("Network Error",pe.ERR_NETWORK,S,Te,R&&R.response),{cause:R.cause||R}):pe.from(R,R&&R.code,S,Te,R&&R.response)}}},Dy=new Map,rh=l=>{let i=l&&l.env||{};const{fetch:s,Request:c,Response:d}=i,f=[c,d,s];let p=f.length,h=p,b,g,v=Dy;for(;h--;)b=f[h],g=v.get(b),g===void 0&&v.set(b,g=h?new Map:Oy(i)),v=g;return g};rh();const ju={http:Iv,xhr:_y,fetch:{get:rh}};G.forEach(ju,(l,i)=>{if(l){try{Object.defineProperty(l,"name",{value:i})}catch{}Object.defineProperty(l,"adapterName",{value:i})}});const K0=l=>`- ${l}`,My=l=>G.isFunction(l)||l===null||l===!1;function Uy(l,i){l=G.isArray(l)?l:[l];const{length:s}=l;let c,d;const f={};for(let p=0;p<s;p++){c=l[p];let h;if(d=c,!My(c)&&(d=ju[(h=String(c)).toLowerCase()],d===void 0))throw new pe(`Unknown adapter '${h}'`);if(d&&(G.isFunction(d)||(d=d.get(i))))break;f[h||"#"+p]=d}if(!d){const p=Object.entries(f).map(([b,g])=>`adapter ${b} `+(g===!1?"is not supported by the environment":"is not available in the build"));let h=s?p.length>1?`since :
`+p.map(K0).join(`
`):" "+K0(p[0]):"as no adapter specified";throw new pe("There is no suitable adapter to dispatch the request "+h,"ERR_NOT_SUPPORT")}return d}const ih={getAdapter:Uy,adapters:ju};function Mc(l){if(l.cancelToken&&l.cancelToken.throwIfRequested(),l.signal&&l.signal.aborted)throw new Er(null,l)}function J0(l){return Mc(l),l.headers=vt.from(l.headers),l.data=Dc.call(l,l.transformRequest),["post","put","patch"].indexOf(l.method)!==-1&&l.headers.setContentType("application/x-www-form-urlencoded",!1),ih.getAdapter(l.adapter||Sr.adapter,l)(l).then(function(c){return Mc(l),c.data=Dc.call(l,l.transformResponse,c),c.headers=vt.from(c.headers),c},function(c){return th(c)||(Mc(l),c&&c.response&&(c.response.data=Dc.call(l,l.transformResponse,c.response),c.response.headers=vt.from(c.response.headers))),Promise.reject(c)})}const oh="1.13.6",co={};["object","boolean","number","function","string","symbol"].forEach((l,i)=>{co[l]=function(c){return typeof c===l||"a"+(i<1?"n ":" ")+l}});const F0={};co.transitional=function(i,s,c){function d(f,p){return"[Axios v"+oh+"] Transitional option '"+f+"'"+p+(c?". "+c:"")}return(f,p,h)=>{if(i===!1)throw new pe(d(p," has been removed"+(s?" in "+s:"")),pe.ERR_DEPRECATED);return s&&!F0[p]&&(F0[p]=!0,console.warn(d(p," has been deprecated since v"+s+" and will be removed in the near future"))),i?i(f,p,h):!0}};co.spelling=function(i){return(s,c)=>(console.warn(`${c} is likely a misspelling of ${i}`),!0)};function By(l,i,s){if(typeof l!="object")throw new pe("options must be an object",pe.ERR_BAD_OPTION_VALUE);const c=Object.keys(l);let d=c.length;for(;d-- >0;){const f=c[d],p=i[f];if(p){const h=l[f],b=h===void 0||p(h,f,l);if(b!==!0)throw new pe("option "+f+" must be "+b,pe.ERR_BAD_OPTION_VALUE);continue}if(s!==!0)throw new pe("Unknown option "+f,pe.ERR_BAD_OPTION)}}const Pi={assertOptions:By,validators:co},qt=Pi.validators;let hn=class{constructor(i){this.defaults=i||{},this.interceptors={request:new H0,response:new H0}}async request(i,s){try{return await this._request(i,s)}catch(c){if(c instanceof Error){let d={};Error.captureStackTrace?Error.captureStackTrace(d):d=new Error;const f=d.stack?d.stack.replace(/^.+\n/,""):"";try{c.stack?f&&!String(c.stack).endsWith(f.replace(/^.+\n.+\n/,""))&&(c.stack+=`
`+f):c.stack=f}catch{}}throw c}}_request(i,s){typeof i=="string"?(s=s||{},s.url=i):s=i||{},s=xn(this.defaults,s);const{transitional:c,paramsSerializer:d,headers:f}=s;c!==void 0&&Pi.assertOptions(c,{silentJSONParsing:qt.transitional(qt.boolean),forcedJSONParsing:qt.transitional(qt.boolean),clarifyTimeoutError:qt.transitional(qt.boolean),legacyInterceptorReqResOrdering:qt.transitional(qt.boolean)},!1),d!=null&&(G.isFunction(d)?s.paramsSerializer={serialize:d}:Pi.assertOptions(d,{encode:qt.function,serialize:qt.function},!0)),s.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?s.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:s.allowAbsoluteUrls=!0),Pi.assertOptions(s,{baseUrl:qt.spelling("baseURL"),withXsrfToken:qt.spelling("withXSRFToken")},!0),s.method=(s.method||this.defaults.method||"get").toLowerCase();let p=f&&G.merge(f.common,f[s.method]);f&&G.forEach(["delete","get","head","post","put","patch","common"],S=>{delete f[S]}),s.headers=vt.concat(p,f);const h=[];let b=!0;this.interceptors.request.forEach(function(A){if(typeof A.runWhen=="function"&&A.runWhen(s)===!1)return;b=b&&A.synchronous;const y=s.transitional||yu;y&&y.legacyInterceptorReqResOrdering?h.unshift(A.fulfilled,A.rejected):h.push(A.fulfilled,A.rejected)});const g=[];this.interceptors.response.forEach(function(A){g.push(A.fulfilled,A.rejected)});let v,N=0,_;if(!b){const S=[J0.bind(this),void 0];for(S.unshift(...h),S.push(...g),_=S.length,v=Promise.resolve(s);N<_;)v=v.then(S[N++],S[N++]);return v}_=h.length;let H=s;for(;N<_;){const S=h[N++],A=h[N++];try{H=S(H)}catch(y){A.call(this,y);break}}try{v=J0.call(this,H)}catch(S){return Promise.reject(S)}for(N=0,_=g.length;N<_;)v=v.then(g[N++],g[N++]);return v}getUri(i){i=xn(this.defaults,i);const s=nh(i.baseURL,i.url,i.allowAbsoluteUrls);return Wm(s,i.params,i.paramsSerializer)}};G.forEach(["delete","get","head","options"],function(i){hn.prototype[i]=function(s,c){return this.request(xn(c||{},{method:i,url:s,data:(c||{}).data}))}});G.forEach(["post","put","patch"],function(i){function s(c){return function(f,p,h){return this.request(xn(h||{},{method:i,headers:c?{"Content-Type":"multipart/form-data"}:{},url:f,data:p}))}}hn.prototype[i]=s(),hn.prototype[i+"Form"]=s(!0)});let Hy=class sh{constructor(i){if(typeof i!="function")throw new TypeError("executor must be a function.");let s;this.promise=new Promise(function(f){s=f});const c=this;this.promise.then(d=>{if(!c._listeners)return;let f=c._listeners.length;for(;f-- >0;)c._listeners[f](d);c._listeners=null}),this.promise.then=d=>{let f;const p=new Promise(h=>{c.subscribe(h),f=h}).then(d);return p.cancel=function(){c.unsubscribe(f)},p},i(function(f,p,h){c.reason||(c.reason=new Er(f,p,h),s(c.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(i){if(this.reason){i(this.reason);return}this._listeners?this._listeners.push(i):this._listeners=[i]}unsubscribe(i){if(!this._listeners)return;const s=this._listeners.indexOf(i);s!==-1&&this._listeners.splice(s,1)}toAbortSignal(){const i=new AbortController,s=c=>{i.abort(c)};return this.subscribe(s),i.signal.unsubscribe=()=>this.unsubscribe(s),i.signal}static source(){let i;return{token:new sh(function(d){i=d}),cancel:i}}};function qy(l){return function(s){return l.apply(null,s)}}function Gy(l){return G.isObject(l)&&l.isAxiosError===!0}const ru={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(ru).forEach(([l,i])=>{ru[i]=l});function ch(l){const i=new hn(l),s=Ym(hn.prototype.request,i);return G.extend(s,hn.prototype,i,{allOwnKeys:!0}),G.extend(s,i,null,{allOwnKeys:!0}),s.create=function(d){return ch(xn(l,d))},s}const He=ch(Sr);He.Axios=hn;He.CanceledError=Er;He.CancelToken=Hy;He.isCancel=th;He.VERSION=oh;He.toFormData=so;He.AxiosError=pe;He.Cancel=He.CanceledError;He.all=function(i){return Promise.all(i)};He.spread=qy;He.isAxiosError=Gy;He.mergeConfig=xn;He.AxiosHeaders=vt;He.formToJSON=l=>eh(G.isHTMLForm(l)?new FormData(l):l);He.getAdapter=ih.getAdapter;He.HttpStatusCode=ru;He.default=He;const{Axios:r4,AxiosError:i4,CanceledError:o4,isCancel:s4,CancelToken:c4,VERSION:u4,all:d4,Cancel:f4,isAxiosError:p4,spread:m4,toFormData:h4,AxiosHeaders:g4,HttpStatusCode:x4,formToJSON:b4,getAdapter:v4,mergeConfig:y4}=He,Yy="http://localhost:5001",Xy=Yy.replace(/\/+$/,""),mr=He.create({baseURL:Xy||"http://localhost:5000",withCredentials:!0,headers:{"Content-Type":"application/json",Accept:"application/json"}});mr.interceptors.request.use(l=>{const i=localStorage.getItem("adminToken");return i&&(l.headers.Authorization=`Bearer ${i}`),l});function dr(l,i=[]){if(!l||!l.includes("/upload/"))return l;const s=i.filter(Boolean).join(",");return l.replace("/upload/",`/upload/${s}/`)}function Vy({children:l,className:i}){return r.jsx("div",{className:i,children:l})}function Uc(l,i=2e3,s=!1){const[c,d]=w.useState(0);return w.useEffect(()=>{if(!s||l===0)return;let f=null;const p=h=>{f||(f=h);const b=Math.min((h-f)/i,1),g=1-Math.pow(1-b,3);d(Math.round(g*l)),b<1&&requestAnimationFrame(p)};requestAnimationFrame(p)},[l,i,s]),c}function I0(){const[l,i]=w.useState([]),[s,c]=w.useState([]),[d,f]=w.useState([]),[p,h]=w.useState(0),[b,g]=w.useState(!1),v=w.useRef(null);w.useEffect(()=>{mr.get("/api/events/ongoing").then(y=>i(Array.isArray(y.data)?y.data:[])).catch(()=>{}),mr.get("/api/images/public/home-images",{params:{category:"home_announcement"}}).then(y=>c(Array.isArray(y.data)?y.data.map(M=>M.url).filter(Boolean):[])).catch(()=>{}),mr.get("/api/images/public/home-images",{params:{category:"home_memories"}}).then(y=>f(Array.isArray(y.data)?y.data.map(M=>M.url).filter(Boolean):[])).catch(()=>{})},[]),w.useEffect(()=>{if(s.length<2)return;const y=setInterval(()=>h(M=>(M+1)%s.length),5500);return()=>clearInterval(y)},[s.length]),w.useEffect(()=>{const y=new IntersectionObserver(([M])=>{M.isIntersecting&&g(!0)},{threshold:.25});return v.current&&y.observe(v.current),()=>y.disconnect()},[]);const N=w.useRef(null),_=Uc(200,2200,b),H=Uc(50,1900,b),S=Uc(5e3,2600,b),A=["MANALI","KASOL","SPITI VALLEY","KEDARNATH","LADAKH","RISHIKESH","CHOPTA","MCLEODGANJ","DHARAMSHALA","BADRINATH"];return r.jsxs("div",{className:"home-v2",children:[r.jsxs("section",{className:"hero-v2",ref:N,children:[r.jsxs("div",{className:"hero-bg",children:[r.jsx("div",{className:"hero-bg-fallback"}),s.map((y,M)=>r.jsx("div",{className:`hero-bg-layer${M===p?" active":""}`,style:{backgroundImage:`url(${dr(y,["f_auto","q_auto","w_1920","c_fill"])})`}},M)),r.jsx("div",{className:"hero-overlay"}),r.jsx("div",{className:"hero-noise"})]}),r.jsx("div",{className:"particles-container","aria-hidden":!0,children:Array.from({length:10},(y,M)=>r.jsx("div",{className:"particle"},M))}),r.jsxs("div",{className:"hero-content",children:[r.jsxs("div",{className:"hero-text-block",children:[r.jsxs("div",{className:"hero-tag",children:[r.jsx("span",{className:"tag-dot"}),r.jsx("span",{children:"Club Bexley · Trips & Travel"})]}),r.jsxs("h1",{className:"hero-headline",children:[r.jsx("span",{className:"headline-line line-1",children:"ESCAPE"}),r.jsx("span",{className:"headline-line line-2",children:"EXPLORE"}),r.jsx("span",{className:"headline-line line-3 accent-text",children:"EXPERIENCE"})]}),r.jsx("p",{className:"hero-sub",children:"Curated Himalayan adventures, heritage circuits & weekend escapes — crafted for explorers who want more than just a holiday."}),r.jsxs("div",{className:"hero-actions",children:[r.jsxs(De,{to:"/events",className:"btn-primary-v2",children:[r.jsx("span",{children:"Browse Trips"}),r.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:r.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]}),r.jsx(De,{to:"/memories",className:"btn-ghost-v2",children:"View Gallery"})]})]}),l.length>0&&r.jsx("div",{className:"hero-card-stack","aria-hidden":!0,children:l.slice(0,3).map((y,M)=>r.jsxs(De,{to:`/event/${y.slug}`,className:`stack-card stack-card-${M}`,tabIndex:-1,children:[r.jsx("div",{className:"stack-card-img",style:{backgroundImage:`url(${dr(y.posterUrl||"",["f_auto","q_auto","w_600","c_fill","g_auto"])})`,backgroundColor:"#0d0d16"}}),r.jsx("div",{className:"stack-card-overlay"}),r.jsxs("div",{className:"stack-card-info",children:[r.jsx("span",{className:"stack-card-tag",children:y.type==="TRIP"?"Adventure Trip":"Club Event"}),r.jsx("h3",{children:y.name}),y.duration&&r.jsxs("p",{className:"stack-card-meta",children:["📍 ",y.duration]})]})]},y._id))})]}),r.jsx("div",{className:"hero-marquee-wrap",children:r.jsx("div",{className:"hero-marquee",children:[...A,...A].map((y,M)=>r.jsxs("span",{className:"marquee-item",children:[r.jsx("span",{className:"marquee-dot",children:"✦"}),y]},M))})}),r.jsxs("div",{className:"scroll-indicator","aria-hidden":!0,children:[r.jsx("div",{className:"scroll-line"}),r.jsx("span",{children:"Scroll"})]})]}),r.jsx("div",{className:"mountain-scene","aria-hidden":"true",children:r.jsxs("svg",{viewBox:"0 0 1440 340",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"skyGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#06060b"}),r.jsx("stop",{offset:"100%",stopColor:"#0d0d1a"})]}),r.jsxs("linearGradient",{id:"snowGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#f0ece4",stopOpacity:"0.92"}),r.jsx("stop",{offset:"100%",stopColor:"#c8c4bc",stopOpacity:"0.4"})]}),r.jsxs("linearGradient",{id:"mtn1Grad",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#1a1a2e"}),r.jsx("stop",{offset:"100%",stopColor:"#06060b"})]}),r.jsxs("linearGradient",{id:"mtn2Grad",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#141428"}),r.jsx("stop",{offset:"100%",stopColor:"#06060b"})]}),r.jsxs("linearGradient",{id:"mtn3Grad",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#0f0f20"}),r.jsx("stop",{offset:"100%",stopColor:"#06060b"})]}),r.jsxs("linearGradient",{id:"lakeGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#0d1a2e",stopOpacity:"0.9"}),r.jsx("stop",{offset:"100%",stopColor:"#06060b",stopOpacity:"1"})]}),r.jsxs("linearGradient",{id:"glowGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#ff4d00",stopOpacity:"0.18"}),r.jsx("stop",{offset:"100%",stopColor:"#ff4d00",stopOpacity:"0"})]}),r.jsxs("radialGradient",{id:"moonGlow",cx:"50%",cy:"50%",r:"50%",children:[r.jsx("stop",{offset:"0%",stopColor:"#ffc447",stopOpacity:"0.22"}),r.jsx("stop",{offset:"100%",stopColor:"#ffc447",stopOpacity:"0"})]}),r.jsx("filter",{id:"blur2",children:r.jsx("feGaussianBlur",{stdDeviation:"2"})}),r.jsx("filter",{id:"blur4",children:r.jsx("feGaussianBlur",{stdDeviation:"4"})}),r.jsx("clipPath",{id:"sceneClip",children:r.jsx("rect",{width:"1440",height:"340"})})]}),r.jsxs("g",{clipPath:"url(#sceneClip)",children:[r.jsx("rect",{width:"1440",height:"340",fill:"url(#skyGrad)"}),[[80,18],[200,8],[340,22],[500,12],[620,28],[720,6],[850,16],[980,24],[1100,10],[1240,20],[1380,14],[140,38],[430,44],[700,36],[950,48],[1200,40],[1350,32],[60,52],[290,56],[560,42],[800,58],[1050,34]].map(([y,M],q)=>r.jsx("circle",{cx:y,cy:M,r:q%3===0?1.2:.7,fill:"#f0ece4",opacity:.3+Math.sin(q)*.25},q)),r.jsx("ellipse",{cx:"1100",cy:"48",rx:"80",ry:"80",fill:"url(#moonGlow)"}),r.jsx("circle",{cx:"1100",cy:"48",r:"18",fill:"#f5f0e8",opacity:"0.88"}),r.jsx("circle",{cx:"1108",cy:"44",r:"15",fill:"#0d0d1a"}),r.jsx("ellipse",{cx:"720",cy:"200",rx:"480",ry:"90",fill:"url(#glowGrad)",filter:"url(#blur4)"}),r.jsx("path",{d:"M0,210 L90,160 L160,185 L240,130 L310,160 L400,110 L470,148 L560,95 L640,135 L720,85 L800,128 L880,98 L960,138 L1040,108 L1120,145 L1200,118 L1280,152 L1360,125 L1440,160 L1440,340 L0,340 Z",fill:"#0d0d1e",opacity:"0.6"}),r.jsx("path",{d:"M0,230 L70,185 L140,210 L220,155 L300,190 L390,135 L460,172 L550,118 L640,158 L720,105 L800,148 L890,112 L970,155 L1060,122 L1150,162 L1240,132 L1330,170 L1440,148 L1440,340 L0,340 Z",fill:"url(#mtn3Grad)"}),r.jsx("path",{d:"M0,260 L60,220 L130,245 L210,188 L290,228 L380,168 L450,210 L540,152 L620,198 L710,138 L790,188 L870,155 L960,195 L1050,162 L1140,202 L1220,172 L1310,215 L1440,195 L1440,340 L0,340 Z",fill:"url(#mtn2Grad)"}),r.jsx("path",{d:"M0,290 L80,248 L160,272 L250,218 L340,258 L420,200 L510,245 L600,188 L690,238 L770,180 L860,228 L940,195 L1020,238 L1110,205 L1200,250 L1290,218 L1380,258 L1440,240 L1440,340 L0,340 Z",fill:"url(#mtn1Grad)"}),r.jsx("path",{d:"M710,138 L730,160 L750,145 L760,155 L780,138 L790,188 Z",fill:"url(#snowGrad)",opacity:"0.7"}),r.jsx("path",{d:"M540,152 L558,175 L572,160 L585,170 L600,152 L620,198 Z",fill:"url(#snowGrad)",opacity:"0.55"}),r.jsx("path",{d:"M380,168 L398,188 L412,176 L425,184 L438,170 L450,210 Z",fill:"url(#snowGrad)",opacity:"0.5"}),r.jsx("path",{d:"M860,155 L876,178 L888,166 L900,173 L912,158 L928,195 Z",fill:"url(#snowGrad)",opacity:"0.52"}),r.jsx("path",{d:"M210,188 L226,208 L240,196 L252,204 L265,190 L290,228 Z",fill:"url(#snowGrad)",opacity:"0.45"}),r.jsx("rect",{x:"0",y:"280",width:"1440",height:"60",fill:"url(#lakeGrad)"}),r.jsx("line",{x1:"400",y1:"282",x2:"1040",y2:"282",stroke:"#1a3a5c",strokeWidth:"1",opacity:"0.6"}),r.jsx("ellipse",{cx:"1100",cy:"300",rx:"28",ry:"6",fill:"#ffc447",opacity:"0.08",filter:"url(#blur2)"}),r.jsx("path",{d:"M1088,290 Q1100,295 1112,290 Q1106,305 1100,308 Q1094,305 1088,290 Z",fill:"#ffc447",opacity:"0.06"}),r.jsx("path",{d:"M0,280 L80,300 L160,288 L250,310 L340,295 L420,318 L510,300 L600,328 L690,306 L770,330 L860,308 L940,322 L1020,305 L1110,320 L1200,300 L1290,315 L1380,298 L1440,308 L1440,340 L0,340 Z",fill:"#0a0a18",opacity:"0.55"}),r.jsx("ellipse",{cx:"580",cy:"312",rx:"120",ry:"3",stroke:"#1e3a5a",strokeWidth:"0.8",fill:"none",opacity:"0.5"}),r.jsx("ellipse",{cx:"580",cy:"318",rx:"85",ry:"2",stroke:"#1e3a5a",strokeWidth:"0.5",fill:"none",opacity:"0.3"}),r.jsx("ellipse",{cx:"900",cy:"308",rx:"100",ry:"2.5",stroke:"#1e3a5a",strokeWidth:"0.8",fill:"none",opacity:"0.45"}),r.jsx("ellipse",{cx:"900",cy:"315",rx:"70",ry:"2",stroke:"#1e3a5a",strokeWidth:"0.5",fill:"none",opacity:"0.25"}),[30,55,78,18,100].map((y,M)=>{const q=[52,62,48,44,56][M],C=275;return r.jsxs("g",{children:[r.jsx("polygon",{points:`${y},${C-q} ${y-10},${C} ${y+10},${C}`,fill:"#080812",opacity:"0.9"}),r.jsx("polygon",{points:`${y},${C-q*.65} ${y-13},${C-q*.2} ${y+13},${C-q*.2}`,fill:"#080812",opacity:"0.9"}),r.jsx("rect",{x:y-3,y:C,width:"6",height:"8",fill:"#080812",opacity:"0.8"})]},M)}),[1360,1385,1410,1340,1430].map((y,M)=>{const q=[50,60,46,54,42][M],C=275;return r.jsxs("g",{children:[r.jsx("polygon",{points:`${y},${C-q} ${y-10},${C} ${y+10},${C}`,fill:"#080812",opacity:"0.9"}),r.jsx("polygon",{points:`${y},${C-q*.65} ${y-13},${C-q*.2} ${y+13},${C-q*.2}`,fill:"#080812",opacity:"0.9"}),r.jsx("rect",{x:y-3,y:C,width:"6",height:"8",fill:"#080812",opacity:"0.8"})]},M)}),r.jsx("rect",{x:"0",y:"300",width:"1440",height:"40",fill:"url(#skyGrad)",opacity:"0.95"})]})]})}),r.jsxs("section",{className:"trips-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-header-left",children:[r.jsx("span",{className:"section-eyebrow",children:"Upcoming Trips"}),r.jsx("h2",{className:"section-title",children:"Next Destinations"})]}),r.jsxs(De,{to:"/events",className:"see-all-link",children:["View All",r.jsx("span",{className:"arrow-icon",children:" →"})]})]}),l.length===0?r.jsxs("div",{className:"trips-empty",children:[r.jsx("span",{className:"trips-empty-icon",children:"🏔️"}),r.jsx("p",{children:"No upcoming trips yet — check back soon."})]}):r.jsx("div",{className:"trips-grid",children:l.map((y,M)=>r.jsx(Vy,{className:`trip-card${M===0?" trip-card-featured":""}`,children:r.jsxs(De,{to:`/event/${y.slug}`,className:"trip-card-inner",children:[r.jsxs("div",{className:"trip-img-wrap",children:[r.jsxs("picture",{children:[y.mobilePosterUrl&&r.jsx("source",{media:"(max-width: 768px)",srcSet:dr(y.mobilePosterUrl,["f_auto","q_auto","w_600"])}),r.jsx("img",{src:dr(y.posterUrl||"",["f_auto","q_auto","w_900","c_fill","g_auto"]),alt:y.name,className:"trip-img",loading:"lazy",onError:q=>{q.target.style.display="none"}})]}),r.jsx("div",{className:"trip-img-grad"}),r.jsxs("div",{className:"trip-badges",children:[r.jsx("span",{className:"badge-type",children:y.type==="TRIP"?"Trip":"Event"}),y.status==="LIVE"&&r.jsx("span",{className:"badge-live",children:"● Live"})]})]}),r.jsxs("div",{className:"trip-info",children:[r.jsx("h3",{className:"trip-name",children:y.name}),r.jsx("p",{className:"trip-desc",children:y.description}),r.jsxs("div",{className:"trip-meta-row",children:[y.duration&&r.jsxs("span",{className:"trip-meta-item",children:["🗓 ",y.duration]}),y.pickupDrop&&r.jsxs("span",{className:"trip-meta-item",children:["📍 ",y.pickupDrop]}),y.startingPrice>0&&r.jsxs("span",{className:"trip-meta-item trip-price",children:["₹",y.startingPrice.toLocaleString("en-IN"),"+"]})]}),r.jsxs("div",{className:"trip-cta-row",children:[r.jsx("span",{className:"trip-cta-text",children:"View Trip Details"}),r.jsx("span",{className:"trip-cta-arrow",children:"↗"})]})]})]})},y._id))})]}),r.jsxs("section",{className:"stats-section",ref:v,children:[r.jsx("div",{className:"stats-word","aria-hidden":!0,children:"ADVENTURES"}),r.jsx("div",{className:"stats-grid",children:[{n:_,suf:"+",label:"Trips Organised"},{n:H,suf:"+",label:"Destinations"},{n:S,suf:"+",label:"Community Members"}].map((y,M)=>r.jsxs("div",{className:"stat-item",children:[r.jsxs("div",{className:"stat-number",children:[y.n.toLocaleString("en-IN"),r.jsx("span",{className:"stat-suffix",children:y.suf})]}),r.jsx("div",{className:"stat-label",children:y.label})]},M))})]}),r.jsxs("section",{className:"why-section",children:[r.jsxs("div",{className:"why-left",children:[r.jsx("span",{className:"why-eyebrow",children:"Why Travel With Us"}),r.jsxs("h2",{className:"why-title",children:["Built for explorers,",r.jsx("br",{}),r.jsx("em",{children:"by explorers"})]}),r.jsx("p",{className:"why-sub",children:"Every route is scouted by our team who've been there. No tourist traps, no compromise — just honest adventures at honest prices."}),r.jsxs(De,{to:"/meetourteam",className:"btn-primary-v2",style:{marginTop:36,display:"inline-flex"},children:[r.jsx("span",{children:"Meet the Team"}),r.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:r.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})]}),r.jsx("div",{className:"why-right",children:r.jsx("div",{className:"why-cards",children:[{icon:"🏔️",title:"Vetted Routes",desc:"Every trail is scouted and safety-checked before we take a single booking."},{icon:"👥",title:"Travel Community",desc:"Travel with like-minded explorers. Connections that outlast the trip."},{icon:"💰",title:"Best Value",desc:"Group pricing means extraordinary experiences at honest, transparent costs."},{icon:"🛡️",title:"Safety First",desc:"24/7 support, insurance coverage, and experienced guides on every trip."}].map((y,M)=>r.jsxs("div",{className:"why-card",children:[r.jsx("span",{className:"why-icon",children:y.icon}),r.jsx("h4",{className:"why-card-title",children:y.title}),r.jsx("p",{className:"why-card-desc",children:y.desc})]},M))})})]}),d.length>=4&&r.jsxs("section",{className:"memories-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-header-left",children:[r.jsx("span",{className:"section-eyebrow",children:"Gallery"}),r.jsx("h2",{className:"section-title",children:"Moments That Matter"})]}),r.jsxs(De,{to:"/memories",className:"see-all-link",children:["View Gallery",r.jsx("span",{className:"arrow-icon",children:" →"})]})]}),r.jsx("div",{className:"memories-mosaic",children:d.slice(0,6).map((y,M)=>r.jsxs(De,{to:"/memories",className:`mem-tile mem-tile-${M}`,children:[r.jsx("img",{src:dr(y,["f_auto","q_auto","w_700","c_fill","g_auto"]),alt:`Memory ${M+1}`,loading:"lazy"}),r.jsx("div",{className:"mem-tile-overlay",children:r.jsx("span",{children:"View Gallery →"})})]},M))})]}),r.jsx("div",{className:"lake-divider","aria-hidden":"true",children:r.jsxs("svg",{viewBox:"0 0 1440 180",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"lk2Sky",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#0d0d1a"}),r.jsx("stop",{offset:"100%",stopColor:"#121220"})]}),r.jsxs("linearGradient",{id:"lk2Water",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#0a1526",stopOpacity:"0.85"}),r.jsx("stop",{offset:"100%",stopColor:"#121220"})]}),r.jsxs("radialGradient",{id:"lk2Glow",cx:"50%",cy:"100%",r:"55%",children:[r.jsx("stop",{offset:"0%",stopColor:"#ff4d00",stopOpacity:"0.12"}),r.jsx("stop",{offset:"100%",stopColor:"#ff4d00",stopOpacity:"0"})]}),r.jsxs("linearGradient",{id:"lk2Snow",x1:"0",y1:"0",x2:"0",y2:"1",children:[r.jsx("stop",{offset:"0%",stopColor:"#f0ece4",stopOpacity:"0.8"}),r.jsx("stop",{offset:"100%",stopColor:"#c8c4bc",stopOpacity:"0.2"})]}),r.jsx("filter",{id:"lk2blur",children:r.jsx("feGaussianBlur",{stdDeviation:"3"})})]}),r.jsx("rect",{width:"1440",height:"180",fill:"url(#lk2Sky)"}),r.jsx("ellipse",{cx:"720",cy:"120",rx:"500",ry:"60",fill:"url(#lk2Glow)",filter:"url(#lk2blur)"}),r.jsx("path",{d:"M0,115 L120,85 L240,100 L360,68 L480,90 L600,58 L720,78 L840,55 L960,75 L1080,60 L1200,82 L1320,70 L1440,88 L1440,180 L0,180 Z",fill:"#0d0d20",opacity:"0.7"}),r.jsx("path",{d:"M0,130 L100,100 L200,118 L320,82 L440,108 L560,72 L680,98 L800,68 L920,92 L1040,76 L1160,100 L1280,84 L1440,105 L1440,180 L0,180 Z",fill:"#0f0f22"}),r.jsx("path",{d:"M0,148 L120,120 L240,138 L360,108 L500,132 L640,100 L760,128 L900,108 L1040,130 L1160,115 L1300,138 L1440,122 L1440,180 L0,180 Z",fill:"#0a0a18"}),r.jsx("path",{d:"M600,58 L618,78 L630,66 L643,74 L656,60 L680,98 Z",fill:"url(#lk2Snow)",opacity:"0.65"}),r.jsx("path",{d:"M800,68 L816,86 L827,76 L839,83 L852,70 L870,92 Z",fill:"url(#lk2Snow)",opacity:"0.58"}),r.jsx("path",{d:"M360,68 L374,86 L384,76 L395,82 L406,70 L420,108 Z",fill:"url(#lk2Snow)",opacity:"0.5"}),r.jsx("rect",{x:"0",y:"148",width:"1440",height:"32",fill:"url(#lk2Water)"}),r.jsx("ellipse",{cx:"500",cy:"158",rx:"140",ry:"3",stroke:"#1a3550",strokeWidth:"0.8",fill:"none",opacity:"0.5"}),r.jsx("ellipse",{cx:"500",cy:"164",rx:"95",ry:"2",stroke:"#1a3550",strokeWidth:"0.5",fill:"none",opacity:"0.3"}),r.jsx("ellipse",{cx:"940",cy:"155",rx:"120",ry:"2.5",stroke:"#1a3550",strokeWidth:"0.8",fill:"none",opacity:"0.45"}),r.jsx("ellipse",{cx:"940",cy:"161",rx:"80",ry:"2",stroke:"#1a3550",strokeWidth:"0.5",fill:"none",opacity:"0.25"}),r.jsx("ellipse",{cx:"720",cy:"162",rx:"180",ry:"4",fill:"#ff4d00",opacity:"0.04",filter:"url(#lk2blur)"}),[620,645,668,692,715,740,762,785].map((y,M)=>{const q=[30,38,28,35,40,26,34,30][M],C=150;return r.jsxs("g",{children:[r.jsx("polygon",{points:`${y},${C-q} ${y-7},${C} ${y+7},${C}`,fill:"#06060b",opacity:"0.95"}),r.jsx("polygon",{points:`${y},${C-q*.6} ${y-9},${C-q*.18} ${y+9},${C-q*.18}`,fill:"#06060b",opacity:"0.95"})]},M)}),r.jsx("rect",{x:"0",y:"155",width:"1440",height:"25",fill:"#121220",opacity:"0.8"})]})}),r.jsxs("section",{className:"cta-band",children:[r.jsxs("h2",{className:"cta-band-title",children:["Your next adventure",r.jsx("br",{}),r.jsx("span",{className:"accent-text",children:"starts here."})]}),r.jsx("p",{className:"cta-band-sub",children:"Join hundreds of travellers exploring incredible destinations together, every year."}),r.jsxs("div",{className:"hero-actions",style:{justifyContent:"center"},children:[r.jsxs(De,{to:"/events",className:"btn-primary-v2",children:[r.jsx("span",{children:"Explore All Trips"}),r.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:r.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]}),r.jsx(De,{to:"/meetourteam",className:"btn-ghost-v2",children:"Our Team"})]})]})]})}const $a=He.create({baseURL:"http://localhost:5001",withCredentials:!0});$a.interceptors.request.use(l=>{var c;const i=localStorage.getItem("app_auth"),s=i?(c=JSON.parse(i))==null?void 0:c.token:null;s&&(l.headers.Authorization=`Bearer ${s}`);try{const d=sessionStorage.getItem("event_lock_data");if(d){const f=JSON.parse(d);f.token&&(l.headers["X-Event-Lock-Token"]=f.token)}}catch(d){console.error("Failed to add lock token:",d)}return l});$a.interceptors.response.use(l=>l,l=>{var i,s;return(((i=l==null?void 0:l.response)==null?void 0:i.status)===401||((s=l==null?void 0:l.response)==null?void 0:s.status)===403)&&(window.__authAlertShown||(window.__authAlertShown=!0,alert("Your session has expired. Please log in again.")),localStorage.removeItem("app_auth"),location.pathname!=="/login"&&location.replace("/login")),Promise.reject(l)});function Qy(l,i=[]){return!l||!l.includes("/upload/")?l:l.replace("/upload/",`/upload/${i.filter(Boolean).join(",")}/`)}function Zy(l,i=.35){const[s,c]=w.useState(0);return w.useEffect(()=>{let d;const f=()=>{d=requestAnimationFrame(()=>{if(!l.current)return;const p=l.current.getBoundingClientRect(),h=p.top+p.height/2,b=window.innerHeight/2;c((h-b)*i)})};return window.addEventListener("scroll",f,{passive:!0}),()=>{window.removeEventListener("scroll",f),cancelAnimationFrame(d)}},[l,i]),s}function uh(l=.12){const i=w.useRef(null),[s,c]=w.useState(!1);return w.useEffect(()=>{const d=i.current;if(!d)return;const f=new IntersectionObserver(([p])=>{p.isIntersecting&&c(!0)},{threshold:l});return f.observe(d),()=>f.disconnect()},[l]),[i,s]}function $y({n:l,delay:i=0}){const[s,c]=uh(.5);return r.jsx("span",{ref:s,style:{display:"inline-block",opacity:c?1:0,transform:c?"translateY(0)":"translateY(24px)",transition:`opacity .6s ${i}s ease, transform .6s ${i}s cubic-bezier(.23,1,.32,1)`},children:l})}function Py({ev:l,index:i}){const s=w.useRef(null),c=Zy(s,.22),[d,f]=uh(.06),p=i%2===0,h=l.posterUrl?Qy(l.posterUrl,["f_auto","q_auto","w_1400","c_fill","g_auto"]):null,b=l.status==="LIVE"?r.jsx("span",{className:"ts-status-live",children:"● Live"}):l.status==="PAUSED"?r.jsx("span",{className:"ts-status-paused",children:"⏸ Paused"}):null;return r.jsxs("section",{ref:s,className:"ts-slide",children:[r.jsxs("div",{className:"ts-bg-wrap",children:[h?r.jsx("div",{className:"ts-bg-img",style:{backgroundImage:`url(${h})`,transform:`translateY(${c}px)`}}):r.jsx("div",{className:"ts-bg-empty"}),r.jsx("div",{className:`ts-scrim ts-scrim-${p?"left":"right"}`})]}),r.jsx("div",{className:`ts-index-ghost ts-index-${p?"right":"left"}`,"aria-hidden":!0,children:String(i+1).padStart(2,"0")}),r.jsxs("div",{ref:d,className:`ts-content ts-content-${p?"left":"right"}${f?" ts-content-on":""}`,children:[r.jsxs("div",{className:"ts-eyebrow",children:[r.jsx("span",{className:"ts-eyebrow-dot"}),r.jsx("span",{children:l.type==="TRIP"?"Adventure Trip":"Club Event"}),b]}),r.jsx("h2",{className:"ts-title",children:l.name}),r.jsx("p",{className:"ts-desc",children:l.description||"An adventure worth taking."}),r.jsxs("div",{className:"ts-meta",children:[l.duration&&r.jsxs("div",{className:"ts-meta-pill",children:[r.jsx("span",{className:"ts-meta-icon",children:"🗓"}),r.jsx("span",{children:l.duration})]}),l.pickupDrop&&r.jsxs("div",{className:"ts-meta-pill",children:[r.jsx("span",{className:"ts-meta-icon",children:"📍"}),r.jsx("span",{children:l.pickupDrop})]}),l.startingPrice>0&&r.jsxs("div",{className:"ts-meta-pill ts-meta-pill-price",children:[r.jsx("span",{children:"from"}),r.jsxs("strong",{children:["₹",l.startingPrice.toLocaleString("en-IN")]})]})]}),r.jsxs("div",{className:"ts-ctas",children:[r.jsxs(De,{to:`/event/${l.slug}/register`,className:"ts-btn-primary",children:["Register Now",r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:r.jsx("path",{d:"M3 8h10M9 4l4 4-4 4",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})]}),r.jsx(De,{to:`/event/${l.slug}`,className:"ts-btn-ghost",children:"Full Details"}),r.jsx(De,{to:`/event/${l.slug}/flow`,className:"ts-btn-icon",title:"Timeline",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[r.jsx("circle",{cx:"4",cy:"4",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4",cy:"12",r:"1.5",fill:"currentColor"}),r.jsx("line",{x1:"6.5",y1:"4",x2:"13",y2:"4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),r.jsx("line",{x1:"6.5",y1:"8",x2:"13",y2:"8",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),r.jsx("line",{x1:"6.5",y1:"12",x2:"13",y2:"12",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}),r.jsx(De,{to:`/event/${l.slug}/memories`,className:"ts-btn-icon",title:"Gallery",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[r.jsx("rect",{x:"1",y:"3",width:"14",height:"10",rx:"2",stroke:"currentColor",strokeWidth:"1.5"}),r.jsx("circle",{cx:"5.5",cy:"7",r:"1.5",stroke:"currentColor",strokeWidth:"1.3"}),r.jsx("path",{d:"M1 11l3.5-3 2.5 2.5 2.5-2.5L15 11",stroke:"currentColor",strokeWidth:"1.3",strokeLinecap:"round",strokeLinejoin:"round"})]})})]})]}),r.jsx("div",{className:"ts-divider"})]})}function Ky(){const[l,i]=w.useState([]),[s,c]=w.useState(!0);return w.useEffect(()=>{$a.get("/api/events/ongoing").then(d=>i(Array.isArray(d.data)?d.data:[])).catch(()=>i([])).finally(()=>c(!1))},[]),s?r.jsxs("div",{style:{minHeight:"100vh",background:"#06060b",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,fontFamily:"'Plus Jakarta Sans',sans-serif"},children:[r.jsx("style",{children:"@keyframes _spin{to{transform:rotate(360deg)}} @keyframes _pulse{0%,100%{opacity:.2}50%{opacity:1}}"}),r.jsx("div",{style:{width:42,height:42,borderRadius:"50%",border:"2px solid rgba(255,77,0,.15)",borderTopColor:"#ff4d00",animation:"_spin .8s linear infinite"}}),r.jsx("p",{style:{fontSize:10,fontWeight:700,letterSpacing:"4px",textTransform:"uppercase",color:"#3a3a50",animation:"_pulse 2s ease-in-out infinite",margin:0},children:"Loading trips…"})]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital@1&display=swap');

        /* ═══ PAGE ═══ */
        .el-page {
          background: #06060b;
          color: #f0ece4;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ═══ INTRO BAND ═══ */
        .el-intro {
          position: relative;
          padding: 100px 72px 80px;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        @media(max-width:768px){ .el-intro{ padding:72px 24px 60px; } }

        .el-intro-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 600px 400px at 15% 80%, rgba(255,77,0,0.07), transparent);
          pointer-events: none;
        }

        .el-intro-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: flex-end;
          gap: 40px;
        }
        @media(max-width:700px){ .el-intro-grid{ grid-template-columns:1fr; } }

        .el-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700; letter-spacing: 3.5px;
          text-transform: uppercase; color: #888898;
          margin-bottom: 16px;
        }
        .el-tag-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #ff4d00; box-shadow: 0 0 10px #ff4d00;
          animation: el-dot 2s infinite;
        }
        @keyframes el-dot {
          0%,100%{ box-shadow:0 0 6px #ff4d00; }
          50%{ box-shadow:0 0 18px #ff4d00, 0 0 32px rgba(255,77,0,.5); }
        }

        .el-h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 12vw, 160px);
          line-height: .88; letter-spacing: 2px;
          margin: 0;
          background: linear-gradient(160deg, #f0ece4 0%, rgba(240,236,228,.45) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .el-h1-accent {
          display: block;
          background: linear-gradient(135deg, #ff4d00, #ffc447);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .el-intro-sub {
          font-size: 14px; color: #888898; line-height: 1.7; max-width: 380px; margin-top: 18px;
          font-style: italic;
        }

        .el-intro-stats {
          display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
        }
        @media(max-width:700px){ .el-intro-stats{ align-items:flex-start; } }

        .el-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 8vw, 100px);
          line-height: 1; letter-spacing: -2px;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.12);
        }
        .el-stat-label {
          font-size: 10px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #3a3a50;
        }

        /* glow line */
        .el-glow {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,77,0,.6) 25%, rgba(255,196,71,.8) 50%, rgba(255,77,0,.6) 75%, transparent);
          box-shadow: 0 0 24px rgba(255,77,0,.2);
        }

        /* scroll hint */
        .el-scroll-hint {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #3a3a50;
          padding: 24px 72px;
          animation: el-hint 2.5s ease-in-out infinite;
        }
        @media(max-width:768px){ .el-scroll-hint{ padding:20px 24px; } }
        @keyframes el-hint {
          0%,100%{ opacity:.4; transform:translateY(0); }
          50%{ opacity:.9; transform:translateY(3px); }
        }
        .el-scroll-arrow { font-size: 18px; }

        /* ═══ TRIP SLIDE ═══ */
        .ts-slide {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* bg */
        .ts-bg-wrap {
          position: absolute; inset: 0; z-index: 0;
        }
        .ts-bg-img {
          position: absolute; inset: -15% 0;
          background-size: cover; background-position: center;
          will-change: transform;
          transition: transform 0s linear;
        }
        .ts-bg-empty {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #0d0d16, #06060b);
        }

        /* scrim */
        .ts-scrim {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 1;
        }
        .ts-scrim-left {
          background:
            linear-gradient(to right, rgba(6,6,11,1) 0%, rgba(6,6,11,0.92) 30%, rgba(6,6,11,0.6) 55%, rgba(6,6,11,0.15) 75%, transparent 100%),
            linear-gradient(to top, rgba(6,6,11,0.8) 0%, transparent 40%),
            linear-gradient(to bottom, rgba(6,6,11,0.5) 0%, transparent 20%);
        }
        .ts-scrim-right {
          background:
            linear-gradient(to left, rgba(6,6,11,1) 0%, rgba(6,6,11,0.92) 30%, rgba(6,6,11,0.6) 55%, rgba(6,6,11,0.15) 75%, transparent 100%),
            linear-gradient(to top, rgba(6,6,11,0.8) 0%, transparent 40%),
            linear-gradient(to bottom, rgba(6,6,11,0.5) 0%, transparent 20%);
        }

        /* ghost index number */
        .ts-index-ghost {
          position: absolute; top: 50%; z-index: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(200px, 30vw, 380px);
          line-height: 1;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          pointer-events: none; user-select: none;
          transform: translateY(-50%);
          letter-spacing: -8px;
        }
        .ts-index-right { right: -24px; }
        .ts-index-left  { left:  -24px; }

        /* content */
        .ts-content {
          position: relative; z-index: 2;
          padding: 100px 80px;
          max-width: 580px;
          opacity: 0;
          transition: opacity .8s cubic-bezier(.23,1,.32,1), transform .8s cubic-bezier(.23,1,.32,1);
        }
        .ts-content-left {
          margin-left: 0;
          transform: translateX(-40px);
        }
        .ts-content-right {
          margin-left: auto;
          transform: translateX(40px);
        }
        .ts-content.ts-content-on {
          opacity: 1;
          transform: translateX(0) !important;
        }
        @media(max-width:900px){
          .ts-content { padding: 80px 32px; max-width: 100%; margin: 0 !important; }
        }
        @media(max-width:600px){
          .ts-content { padding: 60px 24px; }
        }

        /* eyebrow */
        .ts-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #888898; margin-bottom: 20px; flex-wrap: wrap;
        }
        .ts-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #ff4d00; box-shadow: 0 0 8px #ff4d00; flex-shrink: 0;
        }
        .ts-status-live {
          font-size: 9px; padding: 3px 10px; border-radius: 100px;
          background: rgba(255,77,0,.15); color: #ff4d00; border: 1px solid rgba(255,77,0,.35);
        }
        .ts-status-paused {
          font-size: 9px; padding: 3px 10px; border-radius: 100px;
          background: rgba(251,146,60,.15); color: #fb923c; border: 1px solid rgba(251,146,60,.35);
        }

        /* title */
        .ts-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 7vw, 96px);
          line-height: .88; letter-spacing: 1.5px;
          margin: 0 0 20px;
          color: #f0ece4;
        }

        /* desc */
        .ts-desc {
          font-size: 15px; line-height: 1.75; color: rgba(240,236,228,.65);
          margin: 0 0 28px;
          max-width: 440px;
        }

        /* meta pills */
        .ts-meta {
          display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 36px;
        }
        .ts-meta-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 100px;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
          font-size: 12px; font-weight: 600; color: rgba(240,236,228,.8);
          backdrop-filter: blur(4px);
        }
        .ts-meta-pill-price {
          background: rgba(255,196,71,.08); border-color: rgba(255,196,71,.25); color: #ffc447;
          gap: 4px;
        }
        .ts-meta-pill-price strong { font-size: 14px; font-weight: 800; }
        .ts-meta-icon { font-size: 14px; }

        /* CTAs */
        .ts-ctas {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .ts-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #ff5200, #ff7a3a);
          color: #fff; text-decoration: none;
          font-size: 12px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase;
          padding: 13px 24px; border-radius: 12px;
          transition: all .3s cubic-bezier(.23,1,.32,1);
          box-shadow: 0 8px 24px rgba(255,77,0,.3);
        }
        .ts-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(255,77,0,.5);
        }
        .ts-btn-ghost {
          display: inline-flex; align-items: center;
          color: rgba(240,236,228,.7); text-decoration: none;
          font-size: 12px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase;
          padding: 13px 20px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.04);
          transition: all .25s ease;
          backdrop-filter: blur(4px);
        }
        .ts-btn-ghost:hover {
          color: #f0ece4; border-color: rgba(255,255,255,.3);
          background: rgba(255,255,255,.08);
        }
        .ts-btn-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.04);
          color: rgba(240,236,228,.6); text-decoration: none;
          transition: all .25s ease;
          backdrop-filter: blur(4px);
        }
        .ts-btn-icon:hover {
          color: #ff4d00; border-color: rgba(255,77,0,.35);
          background: rgba(255,77,0,.07);
        }

        /* slide divider */
        .ts-divider {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent);
        }

        /* ═══ EMPTY ═══ */
        .el-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 60vh; gap: 16px; text-align: center; padding: 40px;
        }
        .el-empty-icon { font-size: 60px; }
        .el-empty-h {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px; letter-spacing: 1px; color: #3a3a50; margin: 0;
        }
        .el-empty-p { font-size: 14px; color: #3a3a50; margin: 0; }

        /* ═══ CLOSING STRIP ═══ */
        .el-closing {
          position: relative; overflow: hidden;
          padding: 80px 72px;
          background: #06060b;
          border-top: 1px solid rgba(255,255,255,.05);
          text-align: center;
        }
        @media(max-width:768px){ .el-closing{ padding:60px 24px; } }
        .el-closing-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 700px 300px at 50% 100%, rgba(255,77,0,.06), transparent);
          pointer-events: none;
        }
        .el-closing-pre {
          font-size: 10px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
          color: #888898; margin-bottom: 16px;
        }
        .el-closing-word {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 8vw, 100px);
          letter-spacing: 4px; line-height: 1;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.07);
          pointer-events: none; user-select: none; display: block;
          margin-bottom: 8px;
        }
        .el-closing-sub {
          font-size: 14px; color: #888898; font-style: italic;
        }
      `}),r.jsxs("div",{className:"el-page",children:[r.jsxs("div",{className:"el-intro",children:[r.jsx("div",{className:"el-intro-glow"}),r.jsxs("div",{className:"el-intro-grid",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"el-tag",children:[r.jsx("span",{className:"el-tag-dot"}),"Club Bexley"]}),r.jsxs("h1",{className:"el-h1",children:["OPEN",r.jsx("span",{className:"el-h1-accent",children:"TRIPS"})]}),r.jsx("p",{className:"el-intro-sub",children:"Every route hand-picked. Every camp under real stars. Scroll down to find your next escape."})]}),l.length>0&&r.jsxs("div",{className:"el-intro-stats",children:[r.jsx("div",{className:"el-stat-num",children:r.jsx($y,{n:String(l.length).padStart(2,"0"),delay:.2})}),r.jsx("div",{className:"el-stat-label",children:l.length===1?"trip open":"trips open"})]})]})]}),r.jsx("div",{className:"el-glow"}),l.length>0&&r.jsxs("div",{className:"el-scroll-hint",children:[r.jsx("span",{className:"el-scroll-arrow",children:"↓"}),"Scroll to explore"]}),l.length===0?r.jsxs("div",{className:"el-empty",children:[r.jsx("div",{className:"el-empty-icon",children:"🏔️"}),r.jsx("h2",{className:"el-empty-h",children:"No trips yet"}),r.jsx("p",{className:"el-empty-p",children:"We're scouting the next route — check back soon."})]}):l.map((d,f)=>r.jsx(Py,{ev:d,index:f},d._id)),l.length>0&&r.jsxs("div",{className:"el-closing",children:[r.jsx("div",{className:"el-closing-glow"}),r.jsx("p",{className:"el-closing-pre",children:"That's everything for now"}),r.jsx("span",{className:"el-closing-word","aria-hidden":!0,children:"MORE SOON"}),r.jsx("p",{className:"el-closing-sub",children:"New routes drop every season. Follow along."})]})]})]})}/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jy=l=>l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Fy=l=>l.replace(/^([A-Z])|[\s-_]+(\w)/g,(i,s,c)=>c?c.toUpperCase():s.toLowerCase()),W0=l=>{const i=Fy(l);return i.charAt(0).toUpperCase()+i.slice(1)},dh=(...l)=>l.filter((i,s,c)=>!!i&&i.trim()!==""&&c.indexOf(i)===s).join(" ").trim(),Iy=l=>{for(const i in l)if(i.startsWith("aria-")||i==="role"||i==="title")return!0};/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Wy={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e2=w.forwardRef(({color:l="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:c,className:d="",children:f,iconNode:p,...h},b)=>w.createElement("svg",{ref:b,...Wy,width:i,height:i,stroke:l,strokeWidth:c?Number(s)*24/Number(i):s,className:dh("lucide",d),...!f&&!Iy(h)&&{"aria-hidden":"true"},...h},[...p.map(([g,v])=>w.createElement(g,v)),...Array.isArray(f)?f:[f]]));/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=(l,i)=>{const s=w.forwardRef(({className:c,...d},f)=>w.createElement(e2,{ref:f,iconNode:i,className:dh(`lucide-${Jy(W0(l))}`,`lucide-${l}`,c),...d}));return s.displayName=W0(l),s};/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t2=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],a2=Ne("arrow-left",t2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n2=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Bc=Ne("arrow-right",n2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l2=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]],r2=Ne("calendar-days",l2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i2=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],iu=Ne("calendar",i2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o2=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],em=Ne("camera",o2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s2=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],c2=Ne("chevron-down",s2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u2=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],d2=Ne("chevron-left",u2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f2=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],p2=Ne("chevron-right",f2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],h2=Ne("circle-alert",m2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g2=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],ou=Ne("circle-check-big",g2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x2=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],su=Ne("clock",x2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b2=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],Hc=Ne("download",b2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v2=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],y2=Ne("eye-off",v2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w2=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],j2=Ne("eye",w2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N2=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],S2=Ne("github",N2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E2=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],k2=Ne("globe",E2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T2=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],Za=Ne("image",T2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _2=[["path",{d:"m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16",key:"9kzy35"}],["path",{d:"M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2",key:"1t0f0t"}],["circle",{cx:"13",cy:"7",r:"1",fill:"currentColor",key:"1obus6"}],["rect",{x:"8",y:"2",width:"14",height:"14",rx:"2",key:"1gvhby"}]],C2=Ne("images",_2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z2=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]],A2=Ne("instagram",z2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R2=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],L2=Ne("key-round",R2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O2=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]],D2=Ne("linkedin",O2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M2=[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]],pr=Ne("loader",M2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U2=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],tm=Ne("lock",U2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B2=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],H2=Ne("log-out",B2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q2=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],G2=Ne("mail",q2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y2=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],X2=Ne("menu",Y2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V2=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],Q2=Ne("pen",V2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z2=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],am=Ne("plus",Z2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $2=[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1",key:"1tu5fj"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1",key:"1v8r4q"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1",key:"1x03jg"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3",key:"177gqh"}],["path",{d:"M21 21v.01",key:"ents32"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7",key:"8crl2c"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M12 3h.01",key:"n36tog"}],["path",{d:"M12 16v.01",key:"133mhm"}],["path",{d:"M16 12h1",key:"1slzba"}],["path",{d:"M21 12v.01",key:"1lwtk9"}],["path",{d:"M12 21v-1",key:"1880an"}]],P2=Ne("qr-code",$2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K2=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],fh=Ne("trash-2",K2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J2=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],nm=Ne("upload",J2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F2=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ba=Ne("x",F2);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I2=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],W2=Ne("zap",I2),e5=({eventData:l,onBack:i})=>{const s=w.useRef(null),[c,d]=w.useState(0),f=(l==null?void 0:l.flow)||[];return w.useEffect(()=>{const p=s.current;if(!p||f.length===0)return;const h=()=>{const b=p.scrollTop+p.clientHeight/2;let g=0,v=1/0;Array.from(p.children).forEach((N,_)=>{if(N.dataset.spacer)return;const H=N.offsetTop+N.clientHeight/2,S=Math.abs(H-b);S<v&&(v=S,g=_-1)}),d(Math.max(0,g))};return p.addEventListener("scroll",h),setTimeout(h,100),()=>p.removeEventListener("scroll",h)},[f]),r.jsxs("div",{className:"relative h-screen overflow-hidden bg-white",children:[r.jsxs("div",{className:`absolute top-0 left-0 w-full z-20 p-6 pt-5
        bg-gradient-to-b from-white via-white to-transparent
        flex items-center gap-4`,children:[r.jsx("button",{onClick:i,className:`p-3 rounded-full bg-slate-100
          hover:bg-slate-200 transition border border-slate-200 group`,children:r.jsx(a2,{size:20,className:`text-slate-700
            group-hover:-translate-x-1 transition-transform`})}),r.jsxs("div",{children:[r.jsx("h1",{className:"text-2xl md:text-3xl font-bold text-slate-900",children:l.name}),r.jsxs("div",{className:`flex items-center gap-2 text-[#CA0002]
            text-sm font-bold uppercase tracking-widest mt-1`,children:[r.jsx(su,{size:14})," Official Timeline"]})]})]}),r.jsxs("div",{ref:s,className:`relative z-10 h-full overflow-y-auto
        pt-18 pb-32 px-4 space-y-32 scroll-smooth
        no-scrollbar snap-y snap-mandatory`,children:[r.jsx("div",{"data-spacer":!0,className:"h-[50vh] snap-none"}),f.length===0?r.jsxs("div",{className:`h-full flex flex-col items-center
            justify-center text-slate-400`,children:[r.jsx(iu,{size:48,className:"mb-4 opacity-50"}),r.jsx("p",{className:"text-xl",children:"Timeline details coming soon."})]}):f.map((p,h)=>{const b=h===c;return r.jsx("div",{className:`snap-center max-w-2xl mx-auto
                transition-all duration-700 ease-out
                ${b?"opacity-100 scale-100":"opacity-40 scale-95 blur-[1.5px]"}`,children:r.jsx("div",{className:`relative p-8 rounded-2xl border-l-4
                  transition-all duration-500
                  ${b?"bg-white border-[#CA0002] shadow-[0_0_40px_rgba(202,0,2,0.18)]":"bg-slate-50 border-slate-200"}`,children:r.jsxs("div",{className:"flex gap-5",children:[r.jsx("div",{className:`mt-1 p-3 rounded-xl h-fit shrink-0
                      transition-colors duration-500
                      ${b?"bg-[#CA0002]/10 text-[#CA0002]":"bg-slate-100 text-slate-400"}`,children:r.jsx(su,{size:24})}),r.jsxs("div",{className:"flex-1",children:[r.jsxs("div",{className:`flex flex-col sm:flex-row
                        sm:items-center justify-between gap-2 mb-3`,children:[r.jsx("h3",{className:`text-xl font-bold transition-colors
                          ${b?"text-slate-900":"text-slate-600"}`,children:p.title}),r.jsx("span",{className:`text-xs font-mono px-2 py-1
                          rounded w-fit border whitespace-nowrap
                          ${b?"bg-[#CA0002]/10 text-[#CA0002] border-[#CA0002]/30":"bg-white text-slate-400 border-slate-200"}`,children:p.date})]}),r.jsx("p",{className:`leading-relaxed text-base
                        ${b?"text-slate-600":"text-slate-400"}`,children:p.desc||"Details to be announced."})]})]})})},h)}),r.jsx("div",{"data-spacer":!0,className:"h-[50vh] snap-none"})]}),r.jsx("style",{children:`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `})]})};function lm(){const{eventSlug:l}=pu(),i=bn(),[s,c]=w.useState(null),[d,f]=w.useState([]),[p,h]=w.useState(!0),[b,g]=w.useState(null);w.useEffect(()=>{l||(h(!0),g(null),$a.get("/api/events/ongoing").then(_=>f(Array.isArray(_.data)?_.data:[])).catch(()=>{g("Failed to load events directory."),f([])}).finally(()=>h(!1)))},[l]),w.useEffect(()=>{l?(h(!0),g(null),$a.get(`/api/events/${l}/flow`).then(_=>{if(!_.data)throw new Error;c(_.data)}).catch(()=>g("Could not load timeline for this event.")).finally(()=>h(!1))):c(null)},[l]);const v=()=>i("/events"),N=_=>(_==null?void 0:_.slug)&&i(`/event/${_.slug}/flow`);return p?r.jsxs("div",{className:`min-h-screen bg-white
        flex flex-col items-center justify-center`,children:[r.jsx("div",{className:`w-12 h-12 border-4 border-[#CA0002]
          border-t-transparent rounded-full animate-spin mb-4`}),r.jsx("p",{className:"text-slate-500 font-medium",children:"Loading timeline…"})]}):b?r.jsxs("div",{className:`min-h-screen bg-white
        flex flex-col items-center justify-center p-6 text-center`,children:[r.jsx(h2,{className:"w-16 h-16 text-red-500 mb-4"}),r.jsx("h3",{className:"text-2xl font-bold text-slate-900 mb-2",children:"Something went wrong"}),r.jsx("p",{className:"text-slate-500 mb-6",children:b}),r.jsx("button",{onClick:v,className:`px-6 py-2 bg-slate-100
            hover:bg-slate-200 rounded-lg transition`,children:"Back to Events List"})]}):l&&s?r.jsx(e5,{eventData:s,onBack:v}):r.jsx("div",{className:"min-h-screen bg-white p-6 md:p-12 pt-24",children:r.jsxs("div",{className:"max-w-7xl mx-auto",children:[r.jsx("h1",{className:"text-4xl md:text-5xl font-bold text-slate-900 mb-4",children:"Event Schedules"}),r.jsx("p",{className:"text-slate-500 mb-12 max-w-2xl text-lg",children:"Select an event to view its detailed timeline."}),d.length===0?r.jsxs("div",{className:`p-16 text-center border border-dashed
            border-slate-300 rounded-2xl bg-slate-50`,children:[r.jsx(iu,{className:"w-16 h-16 text-slate-400 mx-auto mb-4"}),r.jsx("p",{className:"text-slate-500 text-lg",children:"No upcoming events found."})]}):r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:d.map(_=>r.jsxs("div",{onClick:()=>N(_),className:`group relative bg-white rounded-2xl
                border border-slate-200 overflow-hidden cursor-pointer
                hover:border-[#CA0002]/40
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                transition-all`,children:[r.jsx("div",{className:"bg-slate-100 relative",style:{aspectRatio:"16/9"},children:_.posterUrl?r.jsx("img",{src:_.posterUrl,alt:_.name,className:`w-full h-full object-cover
                      opacity-90 group-hover:opacity-100
                      group-hover:scale-105 transition`}):r.jsx("div",{className:"w-full h-full flex items-center justify-center",children:r.jsx(iu,{className:"text-slate-400 w-12 h-12"})})}),r.jsxs("div",{className:"p-5",children:[r.jsx("h3",{className:`text-xl font-bold text-slate-900
                    group-hover:text-[#CA0002] transition`,children:_.name}),r.jsxs("p",{className:"text-xs text-slate-500 flex items-center gap-1 mt-1",children:[r.jsx(su,{size:12})," View Timeline"]})]})]},_._id))})]})})}function t5(l,i){if(l==null)return{};var s=a5(l,i),c,d;if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(l);for(d=0;d<f.length;d++)c=f[d],!(i.indexOf(c)>=0)&&Object.prototype.propertyIsEnumerable.call(l,c)&&(s[c]=l[c])}return s}function a5(l,i){if(l==null)return{};var s={},c=Object.keys(l),d,f;for(f=0;f<c.length;f++)d=c[f],!(i.indexOf(d)>=0)&&(s[d]=l[d]);return s}function Fi(){return Fi=Object.assign||function(l){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var c in s)Object.prototype.hasOwnProperty.call(s,c)&&(l[c]=s[c])}return l},Fi.apply(this,arguments)}function rm(l,i){var s=Object.keys(l);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(l);i&&(c=c.filter(function(d){return Object.getOwnPropertyDescriptor(l,d).enumerable})),s.push.apply(s,c)}return s}function fr(l){for(var i=1;i<arguments.length;i++){var s=arguments[i]!=null?arguments[i]:{};i%2?rm(Object(s),!0).forEach(function(c){n5(l,c,s[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(s)):rm(Object(s)).forEach(function(c){Object.defineProperty(l,c,Object.getOwnPropertyDescriptor(s,c))})}return l}function n5(l,i,s){return i in l?Object.defineProperty(l,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):l[i]=s,l}const l5={breakpointCols:void 0,className:void 0,columnClassName:void 0,children:void 0,columnAttrs:void 0,column:void 0},qc=2;class ph extends ve.Component{constructor(i){super(i),this.reCalculateColumnCount=this.reCalculateColumnCount.bind(this),this.reCalculateColumnCountDebounce=this.reCalculateColumnCountDebounce.bind(this);let s;this.props.breakpointCols&&this.props.breakpointCols.default?s=this.props.breakpointCols.default:s=parseInt(this.props.breakpointCols)||qc,this.state={columnCount:s}}componentDidMount(){this.reCalculateColumnCount(),window&&window.addEventListener("resize",this.reCalculateColumnCountDebounce)}componentDidUpdate(){this.reCalculateColumnCount()}componentWillUnmount(){window&&window.removeEventListener("resize",this.reCalculateColumnCountDebounce)}reCalculateColumnCountDebounce(){if(!window||!window.requestAnimationFrame){this.reCalculateColumnCount();return}window.cancelAnimationFrame&&window.cancelAnimationFrame(this._lastRecalculateAnimationFrame),this._lastRecalculateAnimationFrame=window.requestAnimationFrame(()=>{this.reCalculateColumnCount()})}reCalculateColumnCount(){const i=window&&window.innerWidth||1/0;let s=this.props.breakpointCols;typeof s!="object"&&(s={default:parseInt(s)||qc});let c=1/0,d=s.default||qc;for(let f in s){const p=parseInt(f);p>0&&i<=p&&p<c&&(c=p,d=s[f])}d=Math.max(1,parseInt(d)||1),this.state.columnCount!==d&&this.setState({columnCount:d})}itemsInColumns(){const i=this.state.columnCount,s=new Array(i),c=ve.Children.toArray(this.props.children);for(let d=0;d<c.length;d++){const f=d%i;s[f]||(s[f]=[]),s[f].push(c[d])}return s}renderColumns(){const{column:i,columnAttrs:s={},columnClassName:c}=this.props,d=this.itemsInColumns(),f=`${100/d.length}%`;let p=c;p&&typeof p!="string"&&(this.logDeprecated('The property "columnClassName" requires a string'),typeof p>"u"&&(p="my-masonry-grid_column"));const h=fr(fr(fr({},i),s),{},{style:fr(fr({},s.style),{},{width:f}),className:p});return d.map((b,g)=>ve.createElement("div",Fi({},h,{key:g}),b))}logDeprecated(i){console.error("[Masonry]",i)}render(){const i=this.props,{children:s,breakpointCols:c,columnClassName:d,columnAttrs:f,column:p,className:h}=i,b=t5(i,["children","breakpointCols","columnClassName","columnAttrs","column","className"]);let g=h;return typeof h!="string"&&(this.logDeprecated('The property "className" requires a string'),typeof h>"u"&&(g="my-masonry-grid")),ve.createElement("div",Fi({},b,{className:g}),this.renderColumns())}}ph.defaultProps=l5;function r5(l={}){const{rootMargin:i="200px",threshold:s=.01}=l,[c,d]=w.useState(!1),f=w.useRef(null);return w.useEffect(()=>{const p=f.current;if(!p||c)return;const h=new IntersectionObserver(b=>{b.forEach(g=>{g.isIntersecting&&(d(!0),h.unobserve(g.target))})},{rootMargin:i,threshold:s});return h.observe(p),()=>{p&&h.unobserve(p)}},[c,i,s]),{ref:f,isVisible:c}}function i5({src:l,placeholder:i,alt:s="",className:c="",onLoad:d,srcSet:f,sizes:p,...h}){const{ref:b,isVisible:g}=r5({rootMargin:"200px"}),[v,N]=w.useState(!1),[_,H]=w.useState(!1),S=y=>{N(!0),d&&d(y)},A=()=>{H(!0)};return r.jsxs("div",{ref:b,className:`relative ${c}`,...h,children:[i&&r.jsx("img",{src:i,alt:"","aria-hidden":"true",className:"absolute inset-0 w-full h-full object-cover blur-xl scale-110",style:{filter:"blur(20px)"}}),g&&!_&&r.jsx("img",{src:l,srcSet:f,sizes:p,alt:s,className:`relative w-full h-full object-cover transition-opacity duration-500 ${v?"opacity-100":"opacity-0"}`,onLoad:S,onError:A,loading:"lazy",decoding:"async"}),_&&r.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500",children:r.jsx("svg",{className:"w-12 h-12",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"})})})]})}const Gc=24;function Yc(){const{eventSlug:l}=pu(),[i,s]=w.useState(null),[c,d]=w.useState([]),[f,p]=w.useState(!0);w.useEffect(()=>{l&&!i&&s({slug:l,name:"Event Memories"})},[l]);const[h,b]=w.useState([]),[g,v]=w.useState(Gc),[N,_]=w.useState(null),[H,S]=w.useState(0),[A,y]=w.useState(!1),[M,q]=w.useState(!1),C=w.useRef(null);w.useEffect(()=>{i||(p(!0),$a.get("/api/events/ongoing").then(J=>{const ee=J.data;d(Array.isArray(ee)?ee:[])}).catch(J=>{console.error("Failed to load events:",J),d([])}).finally(()=>p(!1)))},[i]),w.useEffect(()=>{if(!i){b([]);return}$a.get(`/api/events/${i.slug}/memories`).then(J=>{console.log("Memory API Response:",J.data);const ee=Array.isArray(J.data)?J.data:[];b(F(ee)),v(Gc)}).catch(J=>console.error("Error fetching gallery images:",J))},[i]);const F=J=>{const ee=Array.isArray(J)?[...J]:[];for(let R=ee.length-1;R>0;R--){const K=Math.floor(Math.random()*(R+1));[ee[R],ee[K]]=[ee[K],ee[R]]}return ee},P=(J,ee)=>{if(!J||!J.includes("/upload/"))return J;const R=ee.filter(Boolean).join(",");return J.replace("/upload/",`/upload/${R}/`)},ne=J=>P(J,["f_auto","q_1","e_blur:2000","w_20","dpr_auto"]),Y=J=>{const ee=[320,480,640,960,1280,1600],R=["f_auto","q_auto","dpr_auto"],K=P(J,[...R,"w_960"]),te=ee.map(k=>`${P(J,[...R,`w_${k}`])} ${k}w`).join(", ");return{src:K,srcSet:te,sizes:"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"}};w.useEffect(()=>{if(!C.current||!i)return;const J=C.current,ee=new IntersectionObserver(R=>{R[0].isIntersecting&&!M&&(q(!0),setTimeout(()=>{v(K=>Math.min(K+Gc,h.length)),q(!1)},100))},{rootMargin:"800px 0px"});return ee.observe(J),()=>ee.disconnect()},[h.length,M,i]);const I=(J,ee)=>{_(J),S(ee)},W=()=>{_(null),y(!1)},ie=w.useCallback(()=>{A||h.length===0||(y(!0),S(J=>{const ee=J===0?h.length-1:J-1;return _(h[ee]),ee}),setTimeout(()=>y(!1),150))},[A,h]),de=w.useCallback(()=>{A||h.length===0||(y(!0),S(J=>{const ee=J===h.length-1?0:J+1;return _(h[ee]),ee}),setTimeout(()=>y(!1),150))},[A,h]);w.useEffect(()=>{const J=ee=>{N&&(ee.key==="ArrowLeft"&&ie(),ee.key==="ArrowRight"&&de(),ee.key==="Escape"&&W())};return window.addEventListener("keydown",J),()=>window.removeEventListener("keydown",J)},[N,ie,de]),w.useEffect(()=>{let J=0;const ee=K=>{J=K.touches[0].clientX},R=K=>{!J||!N||(Math.abs(J-K.changedTouches[0].clientX)>50&&(J-K.changedTouches[0].clientX>0?de():ie()),J=0)};return window.addEventListener("touchstart",ee),window.addEventListener("touchend",R),()=>{window.removeEventListener("touchstart",ee),window.removeEventListener("touchend",R)}},[N,de,ie]);const oe=w.useMemo(()=>h.slice(0,g),[h,g]),Te={default:5,1280:4,1024:3,640:2,0:1};return i?r.jsxs("div",{style:{minHeight:"100vh",background:"#06060b",paddingTop:16,paddingBottom:80,fontFamily:"'Plus Jakarta Sans', sans-serif"},children:[r.jsx("style",{children:`
        .mem-tile-wrap {
          margin-bottom: 12px; overflow: hidden; border-radius: 12px;
          cursor: pointer; position: relative;
          border: 1px solid rgba(255,255,255,0.04);
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s, border-color 0.3s;
        }
        .mem-tile-wrap:hover {
          transform: scale(1.025);
          box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,77,0,0.2);
          border-color: rgba(255,77,0,0.2);
        }
        .mem-tile-wrap img { display: block; width: 100%; height: auto; object-fit: cover; border-radius: 12px; }
        .mem-tile-hover {
          position: absolute; inset: 0; border-radius: 12px;
          background: linear-gradient(to top, rgba(255,77,0,0.18) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .mem-tile-wrap:hover .mem-tile-hover { opacity: 1; }

        .mem-empty-dark {
          border: 1px dashed rgba(255,255,255,0.08); border-radius: 20px;
          padding: 80px 20px; text-align: center; color: #3a3a50; font-size: 14px;
          margin: 0 16px;
        }
        .mem-load-more {
          text-align: center; padding: 40px 0;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: #3a3a50; animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* Lightbox */
        .mem-lb-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(4,4,8,0.97); backdrop-filter: blur(20px);
          display: flex; align-items: center; justify-content: center; padding: 16px;
        }
        .mem-lb-close {
          position: absolute; top: 20px; right: 20px; z-index: 10;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: #888898; border-radius: 10px; padding: 8px;
          cursor: pointer; transition: all 0.2s; display: flex; align-items: center;
        }
        .mem-lb-close:hover { background: rgba(255,77,0,0.12); border-color: rgba(255,77,0,0.3); color: #ff4d00; }
        .mem-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: #888898; border-radius: 12px; padding: 10px;
          cursor: pointer; transition: all 0.2s; display: flex; align-items: center;
        }
        .mem-lb-nav:hover { background: rgba(255,77,0,0.12); border-color: rgba(255,77,0,0.3); color: #ff4d00; }
        .mem-lb-nav-l { left: 16px; }
        .mem-lb-nav-r { right: 16px; }
        .mem-lb-img-wrap { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; pointer-events: none; padding: 8px 72px; }
        .mem-lb-img-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 12px; box-shadow: 0 32px 80px rgba(0,0,0,0.8); }
        .mem-lb-counter {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: #888898; font-size: 11px; font-weight: 600; letter-spacing: 2px;
          padding: 6px 18px; border-radius: 100px; backdrop-filter: blur(8px);
        }
      `}),h.length===0?r.jsxs("div",{className:"mem-empty-dark",children:[r.jsx(Za,{size:48,strokeWidth:1,style:{margin:"0 auto 12px",display:"block",color:"#3a3a50"}}),r.jsx("p",{children:"No photos yet — check back after the trip!"})]}):r.jsx(ph,{breakpointCols:Te,className:"flex w-auto",columnClassName:"bg-clip-padding",style:{padding:"0 8px",gap:"12px"},children:oe.map((J,ee)=>{const{src:R,srcSet:K,sizes:te}=Y(J.url),he=ne(J.url);return r.jsxs("div",{className:"mem-tile-wrap",style:{margin:"0 6px 12px"},onClick:()=>I(J,ee),children:[r.jsx(i5,{src:R,srcSet:K,sizes:te,placeholder:he,alt:`memory-${ee}`,className:"w-full h-auto object-cover",style:{borderRadius:12}}),r.jsx("div",{className:"mem-tile-hover"})]},J._id||`${J.url}-${ee}`)})}),g<h.length&&r.jsx("div",{ref:C,className:"mem-load-more",children:M?"Loading...":"↓ Scroll for more"}),N&&r.jsxs("div",{className:"mem-lb-overlay",onClick:W,children:[r.jsx("button",{className:"mem-lb-close",onClick:J=>{J.stopPropagation(),W()},children:r.jsx(ba,{size:22})}),r.jsx("button",{className:"mem-lb-nav mem-lb-nav-l",onClick:J=>{J.stopPropagation(),ie()},children:r.jsx(d2,{size:28})}),r.jsx("button",{className:"mem-lb-nav mem-lb-nav-r",onClick:J=>{J.stopPropagation(),de()},children:r.jsx(p2,{size:28})}),r.jsx("div",{className:"mem-lb-img-wrap",children:r.jsx("img",{src:P(N.url,["f_auto","q_auto","dpr_auto","w_1600"]),srcSet:["640","960","1280","1600"].map(J=>`${P(N.url,["f_auto","q_auto","dpr_auto",`w_${J}`])} ${J}w`).join(", "),sizes:"90vw",alt:"Memory"})}),r.jsxs("div",{className:"mem-lb-counter",children:[H+1," / ",h.length]})]})]}):r.jsxs("div",{style:{minHeight:"100vh",background:"#06060b",padding:"0 0 80px",fontFamily:"'Plus Jakarta Sans', sans-serif"},children:[r.jsx("style",{children:`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          .mem-dir-orb-l {
            position: fixed; left: -200px; top: 30%; width: 500px; height: 500px;
            border-radius: 50%; pointer-events: none; z-index: 0;
            background: radial-gradient(circle, rgba(255,77,0,0.07) 0%, transparent 70%);
          }
          .mem-dir-orb-r {
            position: fixed; right: -160px; top: 10%; width: 420px; height: 420px;
            border-radius: 50%; pointer-events: none; z-index: 0;
            background: radial-gradient(circle, rgba(255,196,71,0.05) 0%, transparent 70%);
          }
          .mem-dir-inner { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; padding: 40px 32px 0; }
          .mem-dir-eyebrow {
            display: inline-flex; align-items: center; gap: 8px;
            font-size: 10px; font-weight: 700; letter-spacing: 3.5px;
            text-transform: uppercase; color: #888898; margin-bottom: 14px;
          }
          .mem-dir-eyebrow-dot {
            width: 6px; height: 6px; border-radius: 50%; background: #ff4d00;
            box-shadow: 0 0 8px #ff4d00; animation: memDotPulse 2.5s infinite;
          }
          @keyframes memDotPulse {
            0%,100% { box-shadow: 0 0 5px #ff4d00; }
            50%      { box-shadow: 0 0 14px #ff4d00, 0 0 24px rgba(255,77,0,0.4); }
          }
          .mem-dir-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(48px, 8vw, 96px);
            line-height: 0.9; letter-spacing: 3px; color: #f0ece4; margin-bottom: 12px;
          }
          .mem-dir-title span {
            background: linear-gradient(135deg, #ff4d00, #ffc447);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          }
          .mem-dir-sub { font-size: 14px; color: #888898; margin-bottom: 52px; }
          .mem-dir-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
          }
          @media (max-width: 1023px) { .mem-dir-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 599px)  { .mem-dir-grid { grid-template-columns: 1fr; } }

          .mem-dir-card {
            background: #0d0d16; border: 1px solid rgba(255,255,255,0.06);
            border-radius: 16px; overflow: hidden; cursor: pointer;
            transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          }
          .mem-dir-card:hover {
            border-color: rgba(255,77,0,0.35);
            transform: translateY(-5px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,77,0,0.08);
          }
          .mem-dir-img-wrap { height: 200px; background: #121220; position: relative; overflow: hidden; }
          .mem-dir-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
          .mem-dir-card:hover .mem-dir-img-wrap img { transform: scale(1.07); }
          .mem-dir-img-grad {
            position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(6,6,11,0.85) 0%, transparent 55%);
          }
          .mem-dir-placeholder {
            width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #3a3a50;
          }
          .mem-dir-info { padding: 18px 20px; }
          .mem-dir-name {
            font-size: 15px; font-weight: 700; color: #f0ece4; margin-bottom: 6px;
            transition: color 0.2s;
          }
          .mem-dir-card:hover .mem-dir-name { color: #ff6a1a; }
          .mem-dir-cta {
            font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
            text-transform: uppercase; color: #3a3a50; transition: color 0.2s;
            display: flex; align-items: center; gap: 6px;
          }
          .mem-dir-card:hover .mem-dir-cta { color: #ff4d00; }
          .mem-empty {
            border: 1px dashed rgba(255,255,255,0.08); border-radius: 20px;
            padding: 80px 20px; text-align: center; color: #3a3a50; font-size: 14px;
          }
          .mem-loading { color: #ff4d00; font-size: 13px; display: flex; align-items: center; gap: 10px; }
          .mem-loading-spinner {
            width: 18px; height: 18px; border: 2px solid rgba(255,77,0,0.2);
            border-top-color: #ff4d00; border-radius: 50%;
            animation: memSpin 0.8s linear infinite;
          }
          @keyframes memSpin { to { transform: rotate(360deg); } }
        `}),r.jsx("div",{className:"mem-dir-orb-l"}),r.jsx("div",{className:"mem-dir-orb-r"}),r.jsxs("div",{className:"mem-dir-inner",children:[r.jsxs("div",{className:"mem-dir-eyebrow",children:[r.jsx("span",{className:"mem-dir-eyebrow-dot"}),"Gallery"]}),r.jsxs("h1",{className:"mem-dir-title",children:["MOMENTS",r.jsx("br",{}),r.jsx("span",{children:"THAT MATTER"})]}),r.jsx("p",{className:"mem-dir-sub",children:"Select a trip to relive the memories."}),f?r.jsxs("div",{className:"mem-loading",children:[r.jsx("div",{className:"mem-loading-spinner"})," Loading trips..."]}):c.length===0?r.jsx("div",{className:"mem-empty",children:"No trips found yet — check back soon."}):r.jsx("div",{className:"mem-dir-grid",children:c.map(J=>r.jsxs("div",{className:"mem-dir-card",onClick:()=>s(J),children:[r.jsxs("div",{className:"mem-dir-img-wrap",children:[J.posterUrl?r.jsx("img",{src:J.posterUrl,alt:J.name}):r.jsx("div",{className:"mem-dir-placeholder",children:r.jsx(Za,{size:40,strokeWidth:1})}),r.jsx("div",{className:"mem-dir-img-grad"})]}),r.jsxs("div",{className:"mem-dir-info",children:[r.jsx("p",{className:"mem-dir-name",children:J.name}),r.jsxs("p",{className:"mem-dir-cta",children:["View Gallery ",r.jsx("span",{children:"→"})]})]})]},J._id))})]})]})}function o5(l={}){const{nonce:i,onScriptLoadSuccess:s,onScriptLoadError:c}=l,[d,f]=w.useState(!1),p=w.useRef(s);p.current=s;const h=w.useRef(c);return h.current=c,w.useEffect(()=>{const b=document.createElement("script");return b.src="https://accounts.google.com/gsi/client",b.async=!0,b.defer=!0,b.nonce=i,b.onload=()=>{var g;f(!0),(g=p.current)===null||g===void 0||g.call(p)},b.onerror=()=>{var g;f(!1),(g=h.current)===null||g===void 0||g.call(h)},document.body.appendChild(b),()=>{document.body.removeChild(b)}},[i]),d}const mh=w.createContext(null);function s5({clientId:l,nonce:i,onScriptLoadSuccess:s,onScriptLoadError:c,children:d}){const f=o5({nonce:i,onScriptLoadSuccess:s,onScriptLoadError:c}),p=w.useMemo(()=>({clientId:l,scriptLoadedSuccessfully:f}),[l,f]);return ve.createElement(mh.Provider,{value:p},d)}function c5(){const l=w.useContext(mh);if(!l)throw new Error("Google OAuth components must be used within GoogleOAuthProvider");return l}function u5(l){var i;return(i=l==null?void 0:l.clientId)!==null&&i!==void 0?i:l==null?void 0:l.client_id}const d5={large:40,medium:32,small:20};function f5({onSuccess:l,onError:i,useOneTap:s,promptMomentNotification:c,type:d="standard",theme:f="outline",size:p="large",text:h,shape:b,logo_alignment:g,width:v,locale:N,click_listener:_,containerProps:H,...S}){const A=w.useRef(null),{clientId:y,scriptLoadedSuccessfully:M}=c5(),q=w.useRef(l);q.current=l;const C=w.useRef(i);C.current=i;const F=w.useRef(c);return F.current=c,w.useEffect(()=>{var P,ne,Y,I,W,ie,de,oe,Te;if(M)return(Y=(ne=(P=window==null?void 0:window.google)===null||P===void 0?void 0:P.accounts)===null||ne===void 0?void 0:ne.id)===null||Y===void 0||Y.initialize({client_id:y,callback:J=>{var ee;if(!(J!=null&&J.credential))return(ee=C.current)===null||ee===void 0?void 0:ee.call(C);const{credential:R,select_by:K}=J;q.current({credential:R,clientId:u5(J),select_by:K})},...S}),(ie=(W=(I=window==null?void 0:window.google)===null||I===void 0?void 0:I.accounts)===null||W===void 0?void 0:W.id)===null||ie===void 0||ie.renderButton(A.current,{type:d,theme:f,size:p,text:h,shape:b,logo_alignment:g,width:v,locale:N,click_listener:_}),s&&((Te=(oe=(de=window==null?void 0:window.google)===null||de===void 0?void 0:de.accounts)===null||oe===void 0?void 0:oe.id)===null||Te===void 0||Te.prompt(F.current)),()=>{var J,ee,R;s&&((R=(ee=(J=window==null?void 0:window.google)===null||J===void 0?void 0:J.accounts)===null||ee===void 0?void 0:ee.id)===null||R===void 0||R.cancel())}},[y,M,s,d,f,p,h,b,g,v,N]),ve.createElement("div",{...H,ref:A,style:{height:d5[p],...H==null?void 0:H.style}})}const im=["MANALI","KASOL","SPITI VALLEY","KEDARNATH","LADAKH","RISHIKESH","CHOPTA","MCLEODGANJ","DHARAMSHALA","BADRINATH"],p5=[{icon:"🏔️",label:"Vetted Routes",desc:"Every trail hand-scouted"},{icon:"👥",label:"Travel Community",desc:"Like-minded explorers"},{icon:"💰",label:"Best Value",desc:"Group pricing, honest costs"},{icon:"🛡️",label:"Safety First",desc:"24/7 support, expert guides"}],m5=`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

  :root {
    --bg: #06060b;
    --bg-card: #0d0d16;
    --bg-elevated: #121220;
    --accent: #ff4d00;
    --accent2: #ffc447;
    --text: #f0ece4;
    --text-muted: #888898;
    --text-dim: #3a3a50;
    --border: rgba(255,255,255,0.07);
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
  }

  .login-page {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }

  @media (max-width: 900px) {
    .login-page { grid-template-columns: 1fr; }
  }

  /* ── NOISE OVERLAY ── */
  .login-noise {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* ══════════════════════
     LEFT PANEL
  ══════════════════════ */
  .login-left {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 56px 48px;
    overflow: hidden;
    background: var(--bg-card);
    border-right: 1px solid var(--border);
    z-index: 1;
  }

  @media (max-width: 900px) { .login-left { display: none; } }

  /* orbs */
  .login-orb-1 {
    position: absolute;
    width: 700px; height: 700px;
    top: -200px; left: -200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.1) 0%, transparent 70%);
    pointer-events: none;
    animation: loginOrb1 14s ease-in-out infinite;
  }

  .login-orb-2 {
    position: absolute;
    width: 500px; height: 500px;
    bottom: -150px; right: -100px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,196,71,0.07) 0%, transparent 70%);
    pointer-events: none;
    animation: loginOrb2 18s ease-in-out infinite;
  }

  @keyframes loginOrb1 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%      { transform: translate(40px, 30px) scale(1.05); }
  }

  @keyframes loginOrb2 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%      { transform: translate(-30px, -40px) scale(1.08); }
  }

  /* wordmark top */
  .login-left-logo {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  .login-left-logo-img {
    height: 38px; width: 38px;
    border-radius: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    padding: 4px;
    object-fit: contain;
  }

  .login-left-logo-name {
    font-family: var(--font-display);
    font-size: 24px;
    letter-spacing: 2px;
    color: var(--text);
    line-height: 1;
  }

  .login-left-logo-name em {
    font-style: normal;
    background: linear-gradient(135deg, #ff4d00, #ffc447);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* center content */
  .login-left-center {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 48px 0;
  }

  .login-left-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .login-left-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
    animation: loginDotPulse 2.5s infinite;
  }

  @keyframes loginDotPulse {
    0%,100% { box-shadow: 0 0 6px var(--accent); }
    50%      { box-shadow: 0 0 18px var(--accent), 0 0 30px rgba(255,77,0,0.4); }
  }

  .login-left-headline {
    font-family: var(--font-display);
    font-size: clamp(64px, 7vw, 96px);
    line-height: 0.88;
    letter-spacing: 1.5px;
    color: var(--text);
    margin: 0 0 24px;
  }

  .login-left-headline em {
    font-style: normal;
    display: block;
    background: linear-gradient(135deg, #ff4d00 0%, #ffc447 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .login-left-sub {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text-muted);
    max-width: 360px;
    margin-bottom: 40px;
  }

  /* perks grid */
  .login-perks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .login-perk {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 14px;
    background: rgba(255,255,255,0.025);
    border: 1px solid var(--border);
    transition: border-color 0.2s, background 0.2s;
  }

  .login-perk:hover {
    border-color: rgba(255,77,0,0.2);
    background: rgba(255,77,0,0.04);
  }

  .login-perk-icon {
    font-size: 22px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .login-perk-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 2px;
  }

  .login-perk-desc {
    font-size: 11px;
    color: var(--text-dim);
    line-height: 1.5;
  }

  /* bottom marquee */
  .login-left-bottom {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-top: 1px solid var(--border);
    padding-top: 20px;
  }

  .login-marquee {
    display: flex;
    width: max-content;
    animation: loginMarquee 30s linear infinite;
    gap: 0;
  }

  .login-marquee-item {
    font-family: var(--font-display);
    font-size: 11px;
    letter-spacing: 3.5px;
    color: var(--text-dim);
    padding: 0 20px;
    white-space: nowrap;
  }

  .login-marquee-dot { color: var(--accent); margin-right: 8px; font-size: 8px; }

  @keyframes loginMarquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ══════════════════════
     RIGHT PANEL
  ══════════════════════ */
  .login-right {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 64px 56px;
    min-height: 100vh;
  }

  @media (max-width: 900px) {
    .login-right { padding: 100px 24px 60px; }
  }

  .login-right-inner {
    width: 100%;
    max-width: 400px;
  }

  /* mobile logo */
  .login-mobile-logo {
    display: none;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    margin-bottom: 40px;
    justify-content: center;
  }

  @media (max-width: 900px) { .login-mobile-logo { display: flex; } }

  .login-mobile-logo-name {
    font-family: var(--font-display);
    font-size: 22px;
    letter-spacing: 2px;
    color: var(--text);
    line-height: 1;
  }

  .login-mobile-logo-name em {
    font-style: normal;
    background: linear-gradient(135deg, #ff4d00, #ffc447);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* welcome block */
  .login-welcome-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 14px;
  }

  .login-welcome-title {
    font-family: var(--font-display);
    font-size: 56px;
    line-height: 0.9;
    letter-spacing: 1.5px;
    color: var(--text);
    margin: 0 0 8px;
  }

  .login-welcome-sub {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.75;
    margin-bottom: 40px;
  }

  /* divider */
  .login-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin-bottom: 32px;
  }

  /* google login wrapper */
  .login-google-wrap {
    position: relative;
    margin-bottom: 28px;
  }

  .login-google-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 16px;
  }

  .login-google-btn-wrap {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px 20px;
    display: flex;
    justify-content: center;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
  }

  .login-google-btn-wrap:hover {
    border-color: rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.05);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }

  /* error */
  .login-error {
    font-size: 12px;
    color: var(--accent);
    background: rgba(255,77,0,0.08);
    border: 1px solid rgba(255,77,0,0.2);
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 20px;
  }

  /* trust line */
  .login-trust {
    font-size: 11px;
    color: var(--text-dim);
    text-align: center;
    line-height: 1.6;
  }

  .login-trust a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .login-trust a:hover { color: var(--accent); }

  /* glow orb behind form */
  .login-right-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.06) 0%, transparent 65%);
    pointer-events: none;
  }

  /* mountain silhouette bottom */
  .login-mountain-strip {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  @media (max-width: 900px) {
    .login-mountain-strip { opacity: 0.25; }
  }
`;function h5(){const l=bn(),i=async s=>{try{const{data:c}=await $a.post("/api/auth/google",{id_token:s});localStorage.setItem("app_auth",JSON.stringify(c)),l("/register",{replace:!0})}catch{alert("Google sign-in failed. Please try again.")}};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:m5}),r.jsxs("div",{className:"login-page",children:[r.jsx("div",{className:"login-noise"}),r.jsxs("svg",{className:"login-mountain-strip",viewBox:"0 0 1440 100",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("path",{d:"M0,100 L0,70 L80,48 L160,65 L250,32 L340,55 L420,20 L510,48 L600,18 L690,50 L770,22 L860,52 L940,28 L1020,55 L1110,32 L1200,58 L1290,38 L1380,60 L1440,45 L1440,100 Z",fill:"#0d0d16"}),r.jsx("path",{d:"M0,100 L0,82 L100,60 L200,75 L300,50 L400,68 L500,42 L600,65 L700,40 L800,62 L900,45 L1000,68 L1100,50 L1200,72 L1300,55 L1440,68 L1440,100 Z",fill:"#06060b"})]}),r.jsxs("div",{className:"login-left",children:[r.jsx("div",{className:"login-orb-1"}),r.jsx("div",{className:"login-orb-2"}),r.jsxs("a",{href:"/",className:"login-left-logo",children:[r.jsx("img",{src:"/assets/bglogo.png",alt:"Club Bexley",className:"login-left-logo-img",onError:s=>{s.target.style.display="none"}}),r.jsxs("span",{className:"login-left-logo-name",children:["CLUB ",r.jsx("em",{children:"BEXLEY"})]})]}),r.jsxs("div",{className:"login-left-center",children:[r.jsxs("div",{className:"login-left-eyebrow",children:[r.jsx("span",{className:"login-left-eyebrow-dot"}),"Trips & Travel Experiences"]}),r.jsxs("h2",{className:"login-left-headline",children:["YOUR NEXT",r.jsx("em",{children:"ADVENTURE"}),"AWAITS"]}),r.jsx("p",{className:"login-left-sub",children:"Curated Himalayan treks, weekend escapes, and heritage circuits — crafted for people who want more than just a holiday."}),r.jsx("div",{className:"login-perks",children:p5.map(s=>r.jsxs("div",{className:"login-perk",children:[r.jsx("span",{className:"login-perk-icon",children:s.icon}),r.jsxs("div",{children:[r.jsx("div",{className:"login-perk-label",children:s.label}),r.jsx("div",{className:"login-perk-desc",children:s.desc})]})]},s.label))})]}),r.jsx("div",{className:"login-left-bottom",children:r.jsx("div",{className:"login-marquee",children:[...im,...im].map((s,c)=>r.jsxs("span",{className:"login-marquee-item",children:[r.jsx("span",{className:"login-marquee-dot",children:"✦"}),s]},c))})})]}),r.jsxs("div",{className:"login-right",children:[r.jsx("div",{className:"login-right-glow"}),r.jsxs("div",{className:"login-right-inner",children:[r.jsxs("a",{href:"/",className:"login-mobile-logo",children:[r.jsx("img",{src:"/assets/bglogo.png",alt:"Club Bexley",style:{height:32,width:32,borderRadius:8,background:"rgba(255,255,255,0.05)",padding:3,objectFit:"contain"},onError:s=>{s.target.style.display="none"}}),r.jsxs("span",{className:"login-mobile-logo-name",children:["CLUB ",r.jsx("em",{children:"BEXLEY"})]})]}),r.jsx("p",{className:"login-welcome-eyebrow",children:"Sign in to continue"}),r.jsxs("h1",{className:"login-welcome-title",children:["WELCOME",r.jsx("br",{}),"BACK"]}),r.jsx("p",{className:"login-welcome-sub",children:"Sign in to access trips, track your bookings, and join the community."}),r.jsx("div",{className:"login-divider"}),r.jsxs("div",{className:"login-google-wrap",children:[r.jsx("p",{className:"login-google-label",children:"Continue with"}),r.jsx("div",{className:"login-google-btn-wrap",children:r.jsx(f5,{onSuccess:s=>i(s.credential),onError:()=>alert("Google sign-in failed"),useOneTap:!0,size:"large",theme:"outline",width:"320",logo_alignment:"left",shape:"rectangular"})})]}),r.jsxs("p",{className:"login-trust",children:["By signing in, you agree to our"," ",r.jsx("a",{href:"#",children:"Terms of Service"})," ","and"," ",r.jsx("a",{href:"#",children:"Privacy Policy"}),".",r.jsx("br",{}),"No spam, ever."]})]})]})]})]})}function g5(){const l=w.useMemo(()=>"60450391716-e0qlc6sej2ei468987oldg51rlvv1mk5.apps.googleusercontent.com",[]);return r.jsx(s5,{clientId:l||"",children:r.jsx(h5,{})})}const Xc=[{id:1,name:"Add Name",role:"Trip Architect",tagline:"Turns blank maps into legends.",funFact:"Has never taken a bad photo. Ever.",image:"/assets/team/IMG_7387.PNG",accent:"#ff4d00",linkedin:"#",github:"#",instagram:"#"},{id:2,name:"Add Name",role:"Adventure Lead",tagline:"If it's steep, she's already been there.",funFact:"Packs for a week in a 10L bag.",image:"/assets/team/IMG_7389.PNG",accent:"#ffc447",linkedin:"#",github:"",instagram:"#"},{id:3,name:"Add Name",role:"Vibe Curator",tagline:"Makes every campfire feel like a concert.",funFact:"Knows the best chai spot in every hill town.",image:"/assets/team/IMG_4414.JPG",accent:"#a78bfa",linkedin:"#",github:"#",instagram:"#"},{id:4,name:"Add Name",role:"Route Scout",tagline:"Finds the path no one else dares to take.",funFact:"Has memorised every mountain pass in Himachal.",image:"/assets/team/IMG_7391.PNG",accent:"#34d399",linkedin:"#",github:"",instagram:"#"},{id:5,name:"Add Name",role:"Logistics Head",tagline:"Chaos is just a plan waiting to happen.",funFact:"Can set up camp in under 8 minutes flat.",image:"/assets/team/IMG_7392.PNG",accent:"#38bdf8",linkedin:"#",github:"#",instagram:"#"},{id:6,name:"Add Name",role:"Media & Storytelling",tagline:"Every peak is a frame worth capturing.",funFact:"Shot 4,000 photos on a single Ladakh trip.",image:"/assets/team/IMG_7394.PNG",accent:"#f472b6",linkedin:"#",github:"",instagram:"#"},{id:7,name:"Add Name",role:"Safety Officer",tagline:"Adventure is only fun when everyone comes back.",funFact:"Certified in wilderness first aid and avalanche rescue.",image:"/assets/team/IMG_7397.JPG",accent:"#fb923c",linkedin:"#",github:"#",instagram:"#"},{id:8,name:"Add Name",role:"Community Manager",tagline:"Strangers become family by day two.",funFact:"Remembers every member's name after one trip.",image:"/assets/team/123.jpeg",accent:"#e879f9",linkedin:"#",github:"",instagram:"#"},{id:9,name:"Add Name",role:"Finance & Deals",tagline:"Epic adventures, surprisingly honest prices.",funFact:"Once haggled a guesthouse down 60% — in Hindi.",image:"/assets/team/IMG_7399.PNG",accent:"#facc15",linkedin:"#",github:"#",instagram:"#"},{id:10,name:"Add Name",role:"Co-Founder",tagline:"Started this whole thing on a midnight dare.",funFact:"Has slept under open sky in 12 different states.",image:"/assets/team/IMG_7400.JPG",accent:"#ff4d00",linkedin:"#",github:"#",instagram:"#"}],Vc=l=>l&&l.startsWith("http");function hh(l){const[i,s]=w.useState(0);return w.useEffect(()=>{const c=l.current;if(!c)return;const d=()=>{const f=c.getBoundingClientRect(),p=window.innerHeight,h=1-f.bottom/(p+f.height);s(Math.min(1,Math.max(0,h)))};return window.addEventListener("scroll",d,{passive:!0}),d(),()=>window.removeEventListener("scroll",d)},[]),i}function x5({member:l,index:i}){const s=w.useRef(null),c=w.useRef(null),[d,f]=w.useState({x:0,y:0}),[p,h]=w.useState(!1),b=w.useRef(null),g=hh(b),v=H=>{c.current&&cancelAnimationFrame(c.current),c.current=requestAnimationFrame(()=>{const S=s.current;if(!S)return;const A=S.getBoundingClientRect(),y=((H.clientX-A.left)/A.width-.5)*2,M=((H.clientY-A.top)/A.height-.5)*2;f({x:y*14,y:-M*14})})},N=()=>{c.current&&cancelAnimationFrame(c.current),f({x:0,y:0})};w.useEffect(()=>{const H=b.current;if(!H)return;const S=new IntersectionObserver(([A])=>{A.isIntersecting&&h(!0)},{threshold:.15});return S.observe(H),()=>S.disconnect()},[]);const _=(g-.5)*-40*(i%2===0?1:-1);return r.jsxs("div",{ref:b,className:"member-scene",style:{transform:`translateY(${_}px)`,transition:"transform 0.08s linear",opacity:p?1:0,translate:p?"none":"0 40px",transitionProperty:"opacity, translate",transitionDuration:"0.7s",transitionDelay:`${i*.12}s`,transitionTimingFunction:"cubic-bezier(0.23,1,0.32,1)"},children:[r.jsxs("div",{ref:s,className:"member-card",style:{"--accent":l.accent,transform:`perspective(900px) rotateY(${d.x}deg) rotateX(${d.y}deg) translateZ(0)`,transition:d.x===0&&d.y===0?"transform 0.6s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease":"transform 0.08s linear"},onMouseMove:v,onMouseLeave:N,children:[r.jsx("div",{className:"card-corona"}),r.jsx("div",{className:"card-shine"}),r.jsxs("div",{className:"card-photo-wrap",children:[r.jsx("img",{src:l.image,alt:l.name,className:"card-photo",onError:H=>{H.target.style.background="#1a1a2e",H.target.style.display="none"}}),r.jsx("div",{className:"card-photo-grad"}),r.jsx("span",{className:"card-num",children:String(i+1).padStart(2,"0")})]}),r.jsxs("div",{className:"card-body",children:[r.jsx("p",{className:"card-role",children:l.role}),r.jsx("h3",{className:"card-name",children:l.name}),r.jsxs("div",{className:"card-tagline-wrap",children:[r.jsx("span",{className:"card-tagline-dot"}),r.jsxs("p",{className:"card-tagline",children:['"',l.tagline,'"']})]}),r.jsxs("div",{className:"card-fun-fact",children:[r.jsx("span",{className:"fun-label",children:"Fun fact"}),r.jsx("span",{className:"fun-text",children:l.funFact})]}),r.jsxs("div",{className:"card-socials",children:[Vc(l.linkedin)&&r.jsx("a",{href:l.linkedin,target:"_blank",rel:"noopener noreferrer",className:"card-social","aria-label":"LinkedIn",children:r.jsx(D2,{size:13})}),Vc(l.github)&&r.jsx("a",{href:l.github,target:"_blank",rel:"noopener noreferrer",className:"card-social","aria-label":"GitHub",children:r.jsx(S2,{size:13})}),Vc(l.instagram)&&r.jsx("a",{href:l.instagram,target:"_blank",rel:"noopener noreferrer",className:"card-social","aria-label":"Instagram",children:r.jsx(A2,{size:13})})]})]})]}),r.jsx("div",{className:"card-blob card-blob-1",style:{background:l.accent}}),r.jsx("div",{className:"card-blob card-blob-2",style:{background:l.accent}})]})}function om({items:l,reverse:i}){const s=[...l,...l];return r.jsx("div",{className:"marquee-track",style:{direction:i?"rtl":"ltr"},children:r.jsx("div",{className:`marquee-inner ${i?"marquee-reverse":""}`,children:s.map((c,d)=>r.jsxs("span",{className:"marquee-word",children:[r.jsx("span",{className:"marquee-sep",children:"✦"}),c]},d))})})}function b5(){const l=w.useRef(null),i=hh(l);return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

        /* ── BASE ── */
        .team-pg {
          background: #06060b;
          color: #f0ece4;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* ── FIXED GRAIN ── */
        .team-pg::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ══════════════════════════════════════
           HERO
        ══════════════════════════════════════ */
        .team-hero {
          position: relative; z-index: 1;
          min-height: 100vh;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }

        /* giant bg text */
        .team-hero-bg-text {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(120px, 22vw, 320px);
          letter-spacing: -4px; white-space: nowrap;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          pointer-events: none; user-select: none; z-index: 0;
          will-change: transform;
        }

        /* orbs */
        .hero-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(80px);
        }
        .hero-orb-1 {
          width: 600px; height: 600px;
          top: -100px; left: -150px;
          background: radial-gradient(circle, rgba(255,77,0,0.12), transparent 70%);
          animation: orbDrift1 12s ease-in-out infinite;
        }
        .hero-orb-2 {
          width: 500px; height: 500px;
          bottom: 0; right: -100px;
          background: radial-gradient(circle, rgba(255,196,71,0.09), transparent 70%);
          animation: orbDrift2 15s ease-in-out infinite;
        }
        .hero-orb-3 {
          width: 350px; height: 350px;
          top: 40%; left: 45%;
          background: radial-gradient(circle, rgba(167,139,250,0.07), transparent 70%);
          animation: orbDrift3 10s ease-in-out infinite;
        }
        @keyframes orbDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(60px,40px)} }
        @keyframes orbDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,-30px)} }
        @keyframes orbDrift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-50px)} }

        /* hero copy */
        .team-hero-content {
          position: relative; z-index: 2;
          padding: 0 64px 72px;
          max-width: 1400px;
        }
        @media(max-width:768px){ .team-hero-content { padding: 0 24px 52px; } }

        .team-eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 10px; font-weight: 700; letter-spacing: 3.5px;
          text-transform: uppercase; color: #888898; margin-bottom: 18px;
        }
        .team-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
          background: #ff4d00; box-shadow: 0 0 8px #ff4d00;
          animation: eyeDot 2.5s infinite;
        }
        @keyframes eyeDot {
          0%,100%{box-shadow:0 0 5px #ff4d00}
          50%{box-shadow:0 0 18px #ff4d00, 0 0 32px rgba(255,77,0,.45)}
        }

        .team-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 14vw, 180px);
          line-height: 0.85; letter-spacing: 2px;
          color: #f0ece4; margin: 0 0 28px;
        }
        .team-headline em {
          font-style: normal;
          background: linear-gradient(135deg, #ff4d00 0%, #ffc447 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .team-hero-sub {
          font-size: 15px; color: #888898; line-height: 1.75;
          max-width: 500px; margin-bottom: 40px;
        }

        .hero-scroll-hint {
          display: flex; align-items: center; gap: 12px;
          font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: #3a3a50;
        }
        .hero-scroll-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, #ff4d00, transparent);
          animation: scrollPulse 2.5s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%,100%{opacity:.3; transform:scaleX(1)}
          50%{opacity:1; transform:scaleX(1.3)}
        }

        /* member count badge */
        .hero-count {
          position: absolute; top: 48px; right: 64px; z-index: 2;
          font-family: 'Bebas Neue', sans-serif;
        }
        .hero-count-num {
          font-size: 96px; line-height: 1; letter-spacing: -2px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
        .hero-count-label {
          font-size: 10px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #3a3a50; text-align: right;
        }
        @media(max-width:768px){ .hero-count { display: none; } }

        /* ══════════════════════════════════════
           MARQUEE STRIP
        ══════════════════════════════════════ */
        .marquee-strip {
          position: relative; z-index: 1;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 0; background: rgba(255,255,255,0.015);
          backdrop-filter: blur(4px);
        }
        .marquee-track { overflow: hidden; }
        .marquee-inner {
          display: flex; width: max-content;
          animation: mRun 28s linear infinite;
          gap: 0;
        }
        .marquee-reverse { animation: mRunR 28s linear infinite; }
        @keyframes mRun  { from{transform:translateX(0)}  to{transform:translateX(-50%)} }
        @keyframes mRunR { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        .marquee-word {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; letter-spacing: 4px;
          color: rgba(255,255,255,0.13); white-space: nowrap;
          padding: 0 24px; transition: color .2s;
        }
        .marquee-word:hover { color: rgba(255,77,0,0.6); }
        .marquee-sep { color: #ff4d00; margin-right: 12px; font-size: 8px; opacity: .6; }

        /* ══════════════════════════════════════
           CARDS SECTION
        ══════════════════════════════════════ */
        .cards-section {
          position: relative; z-index: 1;
          padding: 120px 64px 140px;
          max-width: 1400px; margin: 0 auto;
        }
        @media(max-width:768px){ .cards-section { padding: 80px 24px 100px; } }

        .cards-section-label {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 72px;
        }
        .cards-section-label-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(255,77,0,0.4), transparent);
        }
        .cards-section-label-text {
          font-size: 10px; font-weight: 700; letter-spacing: 4px;
          text-transform: uppercase; color: #3a3a50; white-space: nowrap;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          align-items: start;
        }
        @media(max-width:1023px){ .cards-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; } }
        @media(max-width:599px) { .cards-grid { grid-template-columns: 1fr; gap: 24px; } }

        /* offset alternating cards */
        .member-scene:nth-child(even) { margin-top: 48px; }
        @media(max-width:599px){ .member-scene:nth-child(even){ margin-top: 0; } }

        /* ── MEMBER CARD ── */
        .member-card {
          position: relative;
          background: #0d0d16;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          cursor: default;
        }
        .member-card:hover {
          border-color: color-mix(in srgb, var(--accent) 30%, transparent);
          box-shadow:
            0 32px 80px rgba(0,0,0,0.6),
            0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent),
            0 0 60px color-mix(in srgb, var(--accent) 10%, transparent);
        }

        /* glow corona */
        .card-corona {
          position: absolute; inset: 0; z-index: 0; pointer-events: none; border-radius: 24px;
          background: radial-gradient(ellipse at 50% -10%,
            color-mix(in srgb, var(--accent) 18%, transparent), transparent 60%);
          opacity: 0; transition: opacity 0.45s ease;
        }
        .member-card:hover .card-corona { opacity: 1; }

        /* shine sweep */
        .card-shine {
          position: absolute; inset: 0; z-index: 5; pointer-events: none; border-radius: 24px;
          background: linear-gradient(135deg,
            transparent 30%,
            rgba(255,255,255,0.04) 50%,
            transparent 70%);
          opacity: 0; transition: opacity 0.3s;
          transform: translateX(-100%);
        }
        .member-card:hover .card-shine {
          opacity: 1;
          animation: shineSweep 0.6s ease forwards;
        }
        @keyframes shineSweep {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        /* photo */
        .card-photo-wrap {
          position: relative; width: 100%; padding-top: 120%;
          overflow: hidden; background: #121220;
        }
        .card-photo {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: top center;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
          filter: grayscale(25%) brightness(0.9);
        }
        .member-card:hover .card-photo {
          transform: scale(1.08);
          filter: grayscale(0%) brightness(1);
        }
        .card-photo-grad {
          display: none;
        }
        .card-num {
          position: absolute; top: 16px; left: 20px; z-index: 2;
          font-family: 'Bebas Neue', sans-serif; font-size: 52px;
          line-height: 1; letter-spacing: -1px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.12);
          pointer-events: none;
        }

        /* body */
        .card-body { position: relative; z-index: 2; padding: 20px 24px 26px; }

        .card-role {
          font-size: 9px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: var(--accent);
          margin: 0 0 6px; opacity: 0.9;
        }
        .card-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px; letter-spacing: 1px;
          color: #f0ece4; margin: 0 0 14px; line-height: 1;
        }

        .card-tagline-wrap {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 16px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-left: 3px solid color-mix(in srgb, var(--accent) 60%, transparent);
          border-radius: 0 10px 10px 0;
        }
        .card-tagline-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent); flex-shrink: 0; margin-top: 5px;
          box-shadow: 0 0 6px var(--accent);
          animation: eyeDot 2.5s infinite;
        }
        .card-tagline {
          font-size: 12px; color: #888898; line-height: 1.6;
          font-style: italic; margin: 0;
        }

        .card-fun-fact {
          display: flex; flex-direction: column; gap: 3px;
          margin-bottom: 18px; padding: 10px 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 10px;
        }
        .fun-label {
          font-size: 8px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: #3a3a50;
        }
        .fun-text { font-size: 12px; color: #888898; }

        .card-socials { display: flex; gap: 8px; }
        .card-social {
          width: 32px; height: 32px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #888898; display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: all 0.22s ease;
        }
        .card-social:hover {
          background: color-mix(in srgb, var(--accent) 16%, transparent);
          border-color: color-mix(in srgb, var(--accent) 40%, transparent);
          color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px color-mix(in srgb, var(--accent) 20%, transparent);
        }

        /* floating blobs */
        .card-blob {
          position: absolute; border-radius: 50%;
          pointer-events: none; opacity: 0;
          transition: opacity 0.5s ease;
          filter: blur(40px);
        }
        .member-scene:hover .card-blob { opacity: 1; }
        .card-blob-1 {
          width: 200px; height: 200px;
          bottom: -60px; right: -60px; opacity: 0.06;
        }
        .card-blob-2 {
          width: 120px; height: 120px;
          top: -30px; left: -30px; opacity: 0.04;
        }
        .member-scene:hover .card-blob-1 { opacity: 0.08; }
        .member-scene:hover .card-blob-2 { opacity: 0.05; }

        /* ══════════════════════════════════════
           BOTTOM CTA STRIP
        ══════════════════════════════════════ */
        .team-cta-strip {
          position: relative; z-index: 1;
          background: #0d0d16;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 80px 64px;
          text-align: center;
          overflow: hidden;
        }
        .team-cta-strip::before {
          content: '';
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,77,0,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .team-cta-big {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 9vw, 100px);
          line-height: 0.9; letter-spacing: 2px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.12);
          margin: 0 0 24px;
          position: relative;
        }
        .team-cta-sub {
          font-size: 14px; color: #888898; line-height: 1.7;
          max-width: 440px; margin: 0 auto 36px;
          position: relative;
        }
        .team-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #ff5200, #ff7033);
          color: #fff; text-decoration: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 700; letter-spacing: 0.5px;
          padding: 14px 30px; border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
          box-shadow: 0 8px 28px rgba(255,77,0,0.35);
          position: relative;
        }
        .team-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(255,77,0,0.5);
        }
        @media(max-width:768px){ .team-cta-strip { padding: 60px 24px; } }
      `}),r.jsxs("div",{className:"team-pg",children:[r.jsxs("section",{className:"team-hero",ref:l,children:[r.jsx("div",{className:"hero-orb hero-orb-1"}),r.jsx("div",{className:"hero-orb hero-orb-2"}),r.jsx("div",{className:"hero-orb hero-orb-3"}),r.jsx("div",{className:"team-hero-bg-text",style:{transform:`translate(-50%, calc(-50% + ${i*80}px))`},children:"CREW"}),r.jsxs("div",{className:"hero-count",children:[r.jsx("div",{className:"hero-count-num",children:String(Xc.length).padStart(2,"0")}),r.jsx("div",{className:"hero-count-label",children:"Members"})]}),r.jsxs("div",{className:"team-hero-content",children:[r.jsxs("div",{className:"team-eyebrow",children:[r.jsx("span",{className:"team-eyebrow-dot"}),"The People Behind The Plans"]}),r.jsxs("h1",{className:"team-headline",children:["MEET",r.jsx("br",{}),"THE ",r.jsx("em",{children:"CREW"})]}),r.jsx("p",{className:"team-hero-sub",children:"Small team. Big mountains. Questionable decisions at altitude. These are the people who make every trip happen — and somehow survive to plan the next one."}),r.jsxs("div",{className:"hero-scroll-hint",children:[r.jsx("div",{className:"hero-scroll-line"}),"Scroll to meet them"]})]})]}),r.jsx("div",{className:"marquee-strip",children:r.jsx(om,{items:["ESCAPE","EXPLORE","EXPERIENCE","ADVENTURE","HILLS","TRAILS","CAMPING","LADAKH","SPITI","MANALI","PEAKS"]})}),r.jsxs("div",{className:"cards-section",children:[r.jsxs("div",{className:"cards-section-label",children:[r.jsx("div",{className:"cards-section-label-line"}),r.jsxs("span",{className:"cards-section-label-text",children:["The full team — all ",Xc.length," of them"]}),r.jsx("div",{className:"cards-section-label-line",style:{background:"linear-gradient(90deg, transparent, rgba(255,77,0,0.4))"}})]}),r.jsx("div",{className:"cards-grid",children:Xc.map((s,c)=>r.jsx(x5,{member:s,index:c},s.id))})]}),r.jsx("div",{className:"marquee-strip",children:r.jsx(om,{items:["VETTED ROUTES","HONEST PRICES","SAFETY FIRST","GROUP VIBES","NO TOURIST TRAPS","REAL GUIDES","MEMORIES"],reverse:!0})}),r.jsxs("div",{className:"team-cta-strip",children:[r.jsx("div",{className:"team-cta-big",children:"WANT IN?"}),r.jsx("p",{className:"team-cta-sub",children:"We're always looking for people who love the mountains as much as we do. Come explore with us."}),r.jsxs("a",{href:"/events",className:"team-cta-btn",children:["Browse Trips",r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:r.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})]})]})]})}var gh={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},sm=ve.createContext&&ve.createContext(gh),v5=["attr","size","title"];function y5(l,i){if(l==null)return{};var s,c,d=w5(l,i);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(l);for(c=0;c<f.length;c++)s=f[c],i.indexOf(s)===-1&&{}.propertyIsEnumerable.call(l,s)&&(d[s]=l[s])}return d}function w5(l,i){if(l==null)return{};var s={};for(var c in l)if({}.hasOwnProperty.call(l,c)){if(i.indexOf(c)!==-1)continue;s[c]=l[c]}return s}function Ii(){return Ii=Object.assign?Object.assign.bind():function(l){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var c in s)({}).hasOwnProperty.call(s,c)&&(l[c]=s[c])}return l},Ii.apply(null,arguments)}function cm(l,i){var s=Object.keys(l);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(l);i&&(c=c.filter(function(d){return Object.getOwnPropertyDescriptor(l,d).enumerable})),s.push.apply(s,c)}return s}function Wi(l){for(var i=1;i<arguments.length;i++){var s=arguments[i]!=null?arguments[i]:{};i%2?cm(Object(s),!0).forEach(function(c){j5(l,c,s[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(s)):cm(Object(s)).forEach(function(c){Object.defineProperty(l,c,Object.getOwnPropertyDescriptor(s,c))})}return l}function j5(l,i,s){return(i=N5(i))in l?Object.defineProperty(l,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):l[i]=s,l}function N5(l){var i=S5(l,"string");return typeof i=="symbol"?i:i+""}function S5(l,i){if(typeof l!="object"||!l)return l;var s=l[Symbol.toPrimitive];if(s!==void 0){var c=s.call(l,i);if(typeof c!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(i==="string"?String:Number)(l)}function xh(l){return l&&l.map((i,s)=>ve.createElement(i.tag,Wi({key:s},i.attr),xh(i.child)))}function kr(l){return i=>ve.createElement(E5,Ii({attr:Wi({},l.attr)},i),xh(l.child))}function E5(l){var i=s=>{var{attr:c,size:d,title:f}=l,p=y5(l,v5),h=d||s.size||"1em",b;return s.className&&(b=s.className),l.className&&(b=(b?b+" ":"")+l.className),ve.createElement("svg",Ii({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},s.attr,c,p,{className:b,style:Wi(Wi({color:l.color||s.color},s.style),l.style),height:h,width:h,xmlns:"http://www.w3.org/2000/svg"}),f&&ve.createElement("title",null,f),l.children)};return sm!==void 0?ve.createElement(sm.Consumer,null,s=>i(s)):i(gh)}function k5(l){return kr({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"},child:[]}]})(l)}function T5(l){return kr({attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"},child:[]}]})(l)}const _5=[{name:"Garv Noor Sandha",role:"Full Stack Developer",photo:"https://res.cloudinary.com/dbl2so7ff/image/upload/v1762839758/Profile_LINK_x49mdb.jpg",linkedin:"https://www.linkedin.com/in/garvsandha/",github:"https://github.com/Garrvvvvvv",id:"001928"},{name:"Yuvraj Chawla",role:"Full Stack Developer",photo:"https://res.cloudinary.com/dc45s96yk/image/upload/v1770222123/yuvi_eqdws3.jpg",linkedin:"https://www.linkedin.com/in/yuvraj-chawla-b8a708286/",github:"https://github.com/yc786",id:"001929"}];function C5(){return r.jsxs("div",{className:"min-h-screen bg-[#f0f2f5] py-24 px-4 sm:px-6 lg:px-8 font-sans",children:[r.jsxs("div",{className:"text-center mb-24 relative z-10",children:[r.jsxs("h1",{className:"text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4",children:["Meet the  ",r.jsx("span",{className:"text-[#EB1B24]",children:" WEB DEVELOPERS"})]}),r.jsx("div",{className:"h-1 w-24 bg-[#EB1B24] mx-auto rounded-full"})]}),r.jsx("div",{className:"flex flex-wrap justify-center gap-16 lg:gap-24 max-w-7xl mx-auto items-center",children:_5.map((l,i)=>r.jsxs("div",{className:"group relative w-[300px] h-[450px] transition-all duration-500 hover:scale-105",children:[r.jsxs("div",{className:"absolute -top-16 left-1/2 -translate-x-1/2 w-32 flex flex-col items-center z-0 opacity-80",children:[r.jsx("div",{className:"w-6 h-24 bg-gray-900 rounded-b-lg shadow-sm"}),r.jsx("div",{className:"-mt-4 w-10 h-10 border-4 border-gray-400 rounded-full bg-transparent z-10"}),r.jsx("div",{className:"-mt-6 w-4 h-12 bg-gray-300 rounded-full shadow-inner border border-gray-400"})]}),r.jsxs("div",{className:"absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden z-20 flex flex-col",children:[r.jsx("div",{className:"relative h-[65%] bg-gray-100 overflow-hidden",children:r.jsx("img",{src:l.photo,alt:l.name,className:"w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"})}),r.jsxs("div",{className:"relative flex-1 bg-white p-6 flex flex-col justify-center",children:[r.jsx("div",{className:"absolute -top-10 right-0 w-20 h-20 bg-white rounded-tl-[80px] z-10 pointer-events-none"}),r.jsxs("div",{className:"relative z-20",children:[r.jsx("h2",{className:"text-2xl font-bold text-gray-900 leading-none mb-1",children:l.name.split(" ")[0]}),r.jsx("h2",{className:"text-2xl font-light text-gray-600 leading-none mb-3",children:l.name.split(" ").slice(1).join(" ")}),r.jsx("p",{className:"text-[#EB1B24] font-medium text-sm tracking-wide uppercase mb-4",children:l.role}),r.jsx("div",{className:"flex items-center justify-between border-t border-gray-100 pt-4 mt-auto",children:r.jsxs("div",{className:"flex gap-4",children:[r.jsx("a",{href:l.linkedin,target:"_blank",rel:"noreferrer",className:"text-gray-400 hover:text-[#0077b5] transition-colors text-xl",children:r.jsx(k5,{})}),r.jsx("a",{href:l.github,target:"_blank",rel:"noreferrer",className:"text-gray-400 hover:text-gray-900 transition-colors text-xl",children:r.jsx(T5,{})})]})})]})]})]})]},i))})]})}const Qc="itinerary",um="dates",dm="inclusions";function z5(l,i=[]){return!l||!l.includes("/upload/")?l:l.replace("/upload/",`/upload/${i.filter(Boolean).join(",")}/`)}const Zc=`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

  :root {
    --bg: #06060b;
    --bg-card: #0d0d16;
    --bg-elevated: #121220;
    --accent: #ff4d00;
    --accent2: #ffc447;
    --text: #f0ece4;
    --text-muted: #888898;
    --text-dim: #3a3a50;
    --border: rgba(255,255,255,0.07);
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
  }

  .td-page {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── HERO ── */
  .td-hero {
    position: relative;
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    margin-top: -90px;
  }

  .td-hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: transform 0.1s linear;
    will-change: transform;
  }

  .td-hero-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to top, rgba(6,6,11,1) 0%, rgba(6,6,11,0.7) 40%, rgba(6,6,11,0.3) 70%, transparent 100%),
      linear-gradient(to right, rgba(6,6,11,0.6) 0%, transparent 60%);
  }

  .td-hero-noise {
    position: absolute; inset: 0; z-index: 2;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  .td-hero-content {
    position: relative;
    z-index: 10;
    padding: 90px 72px 56px;
    max-width: 1300px;
    width: 100%;
  }

  @media (max-width: 768px) {
    .td-hero-content { padding: 90px 24px 40px; }
  }

  .td-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 16px;
    animation: tdFadeUp 0.7s 0.1s both;
  }

  .td-hero-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
    animation: tdDotPulse 2.5s infinite;
  }

  @keyframes tdDotPulse {
    0%,100% { box-shadow: 0 0 6px var(--accent); }
    50%      { box-shadow: 0 0 18px var(--accent), 0 0 30px rgba(255,77,0,0.4); }
  }

  .td-hero-title {
    font-family: var(--font-display);
    font-size: clamp(52px, 8vw, 120px);
    line-height: 0.88;
    letter-spacing: 1.5px;
    color: var(--text);
    margin: 0 0 28px;
    animation: tdFadeUp 0.7s 0.25s both;
  }

  .td-hero-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    animation: tdFadeUp 0.7s 0.4s both;
  }

  .td-hero-stat {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .td-hero-stat-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .td-hero-stat-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 2px;
  }

  .td-hero-stat-value {
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
  }

  .td-hero-stat-value.accent { color: var(--accent2); font-size: 17px; }

  /* ── STICKY BAR ── */
  .td-sticky {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(6,6,11,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 14px 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    box-shadow: 0 4px 40px rgba(0,0,0,0.5);
  }

  @media (max-width: 768px) {
    .td-sticky { padding: 12px 24px; }
  }

  .td-sticky-name {
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 1px;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .td-sticky-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    color: #fff;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 11px 24px;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 6px 20px rgba(255,77,0,0.3);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .td-sticky-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255,77,0,0.5);
  }

  /* ── MAIN GRID ── */
  .td-main {
    max-width: 1300px;
    margin: 0 auto;
    padding: 56px 72px 100px;
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 40px;
    align-items: start;
  }

  @media (max-width: 1100px) {
    .td-main { grid-template-columns: 1fr; padding: 40px 40px 80px; }
  }

  @media (max-width: 768px) {
    .td-main { padding: 32px 24px 64px; gap: 32px; }
  }

  /* ── DESC ── */
  .td-description {
    font-size: 16px;
    line-height: 1.85;
    color: var(--text-muted);
    margin-bottom: 40px;
    max-width: 660px;
  }

  /* ── TABS ── */
  .td-tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--border);
    margin-bottom: 40px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .td-tab-btn {
    all: unset;
    cursor: pointer;
    padding: 14px 20px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-dim);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;
  }

  .td-tab-btn:hover { color: var(--text-muted); }
  .td-tab-btn.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  /* ── TIMELINE (itinerary) ── */
  .td-timeline {
    position: relative;
    padding-left: 44px;
  }

  .td-timeline-line {
    position: absolute;
    left: 14px; top: 6px; bottom: 6px;
    width: 1px;
    background: linear-gradient(to bottom, var(--accent), rgba(255,77,0,0.05));
  }

  .td-timeline-item {
    position: relative;
    margin-bottom: 24px;
  }

  .td-timeline-dot {
    position: absolute;
    left: -44px; top: 12px;
    width: 28px; height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-size: 13px;
    letter-spacing: 0.5px;
    color: #fff;
    box-shadow: 0 0 0 4px rgba(255,77,0,0.12), 0 4px 12px rgba(255,77,0,0.3);
    flex-shrink: 0;
  }

  .td-timeline-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px 24px;
    transition: border-color 0.25s, box-shadow 0.25s;
  }

  .td-timeline-card:hover {
    border-color: rgba(255,77,0,0.2);
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  }

  .td-timeline-day-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 6px;
  }

  .td-timeline-title {
    font-family: var(--font-display);
    font-size: 22px;
    letter-spacing: 0.5px;
    color: var(--text);
    margin: 0 0 8px;
  }

  .td-timeline-desc {
    font-size: 13.5px;
    color: var(--text-muted);
    line-height: 1.75;
    margin: 0;
  }

  /* ── PRICING TABLE ── */
  .td-table-wrap {
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--border);
    margin-bottom: 32px;
  }

  .td-table {
    width: 100%;
    border-collapse: collapse;
  }

  .td-table thead tr {
    background: linear-gradient(135deg, #ff5200, #ff7033);
  }

  .td-table th {
    padding: 14px 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;
  }

  .td-table th:last-child { text-align: right; }

  .td-table td {
    padding: 14px 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
  }

  .td-table td:last-child {
    text-align: right;
    font-size: 16px;
    font-weight: 800;
    color: var(--accent2);
  }

  .td-table tr:last-child td { border-bottom: none; }
  .td-table tbody tr:hover { background: rgba(255,255,255,0.02); }

  /* ── DATE CHIPS ── */
  .td-date-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .td-date-chip {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 20px;
    min-width: 200px;
    transition: border-color 0.2s;
  }

  .td-date-chip:hover { border-color: rgba(255,77,0,0.25); }

  .td-date-chip-dates {
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 4px;
  }

  .td-date-chip-note {
    font-size: 12px;
    color: var(--accent);
  }

  /* ── INCLUSIONS / EXCLUSIONS ── */
  .td-inc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  @media (max-width: 600px) { .td-inc-grid { grid-template-columns: 1fr; } }

  .td-inc-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .td-inc-list {
    list-style: none;
    margin: 0; padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .td-inc-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 13.5px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .td-inc-item:last-child { border-bottom: none; }

  .td-inc-check { color: #34d399; flex-shrink: 0; font-size: 14px; margin-top: 1px; }
  .td-inc-cross { color: var(--accent); flex-shrink: 0; font-size: 14px; margin-top: 1px; }

  /* ── INFO BLOCKS (notes, cancellation, carry) ── */
  .td-info-block {
    margin-top: 28px;
    border-radius: 16px;
    padding: 22px 24px;
    border: 1px solid;
  }

  .td-info-block.notes {
    background: rgba(255,196,71,0.04);
    border-color: rgba(255,196,71,0.15);
  }

  .td-info-block.cancel {
    background: rgba(255,77,0,0.04);
    border-color: rgba(255,77,0,0.15);
  }

  .td-info-block.carry {
    background: rgba(52,211,153,0.04);
    border-color: rgba(52,211,153,0.15);
  }

  .td-info-block-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .td-info-block.notes .td-info-block-title  { color: var(--accent2); }
  .td-info-block.cancel .td-info-block-title { color: var(--accent); }
  .td-info-block.carry .td-info-block-title  { color: #34d399; }

  .td-info-block ul {
    margin: 0;
    padding: 0 0 0 18px;
  }

  .td-info-block li {
    font-size: 13.5px;
    line-height: 1.75;
    color: var(--text-muted);
    margin-bottom: 4px;
  }

  .td-info-block p {
    margin: 0;
    font-size: 13.5px;
    color: var(--text-muted);
    line-height: 1.85;
    white-space: pre-line;
  }

  /* ── SECTION LABEL ── */
  .td-section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 20px;
    display: block;
  }

  /* ── BOOKING CARD ── */
  .td-book-card {
    position: sticky;
    top: 84px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5);
  }

  .td-book-card-header {
    background: linear-gradient(135deg, #ff5200, #ff7033);
    padding: 24px 28px;
    position: relative;
    overflow: hidden;
  }

  .td-book-card-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.04;
    pointer-events: none;
  }

  .td-book-card-from {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    margin-bottom: 6px;
    position: relative;
  }

  .td-book-card-price {
    font-family: var(--font-display);
    font-size: 62px;
    line-height: 1;
    letter-spacing: -1px;
    color: #fff;
    position: relative;
  }

  .td-book-card-price-sub {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    opacity: 0.75;
    margin-left: 4px;
    vertical-align: bottom;
    line-height: 2.5;
  }

  .td-book-card-body { padding: 24px 28px; }

  .td-book-info-row {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
  }

  .td-book-info-row:last-of-type { border-bottom: none; margin-bottom: 20px; }

  .td-book-info-icon {
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .td-book-info-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 2px;
  }

  .td-book-info-value {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
  }

  .td-book-cta {
    display: block;
    text-align: center;
    text-decoration: none;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    color: #fff;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 16px;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 8px 28px rgba(255,77,0,0.35);
    margin-bottom: 16px;
  }

  .td-book-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(255,77,0,0.55);
  }

  .td-book-cta-disabled {
    display: block;
    text-align: center;
    padding: 16px;
    border-radius: 12px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    color: var(--text-dim);
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .td-trust-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .td-trust-badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: var(--text-dim);
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    padding: 5px 12px;
    border-radius: 100px;
  }

  /* ── QUICK LINKS ── */
  .td-quick-links {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }

  .td-quick-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.03);
    color: var(--text-muted);
    text-decoration: none;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.2s ease;
  }

  .td-quick-link:hover {
    color: var(--accent);
    border-color: rgba(255,77,0,0.3);
    background: rgba(255,77,0,0.06);
  }

  /* ── EMPTY / LOADER / 404 ── */
  .td-empty {
    color: var(--text-dim);
    font-size: 14px;
    font-style: italic;
    padding: 20px 0;
  }

  .td-loader {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-family: var(--font-body);
  }

  .td-loader-ring {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 2px solid rgba(255,77,0,0.15);
    border-top-color: var(--accent);
    animation: tdSpin 0.8s linear infinite;
  }

  .td-loader-text {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--text-dim);
    animation: tdPulse 2s ease-in-out infinite;
  }

  @keyframes tdSpin { to { transform: rotate(360deg); } }
  @keyframes tdPulse { 0%,100%{opacity:.3} 50%{opacity:1} }

  .td-notfound {
    min-height: 80vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-family: var(--font-body);
    text-align: center;
  }

  .td-notfound-icon {
    font-family: var(--font-display);
    font-size: 120px;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.08);
  }

  .td-notfound h2 {
    font-family: var(--font-display);
    font-size: 48px;
    color: var(--text-dim);
    margin: 0;
    letter-spacing: 1px;
  }

  .td-notfound p {
    font-size: 14px;
    color: var(--text-dim);
    margin: 0;
  }

  .td-notfound-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    color: #fff;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 13px 28px;
    border-radius: 11px;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 8px 24px rgba(255,77,0,0.3);
  }

  .td-notfound-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(255,77,0,0.5);
  }

  @keyframes tdFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;function A5(){var _,H,S,A,y,M,q,C,F,P,ne;const{eventSlug:l}=pu(),i=bn(),[s,c]=w.useState(null),[d,f]=w.useState(!0),[p,h]=w.useState(null),[b,g]=w.useState(Qc);if(w.useEffect(()=>{mr.get(`/api/events/${l}`).then(Y=>{c(Y.data),f(!1)}).catch(()=>{h("Trip not found."),f(!1)})},[l]),d)return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:Zc}),r.jsxs("div",{className:"td-loader",children:[r.jsx("div",{className:"td-loader-ring"}),r.jsx("p",{className:"td-loader-text",children:"Loading trip…"})]})]});if(p||!s)return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:Zc}),r.jsxs("div",{className:"td-notfound",children:[r.jsx("div",{className:"td-notfound-icon",children:"404"}),r.jsx("h2",{children:"Trip Not Found"}),r.jsx("p",{children:"We couldn't find that route. Maybe it's still being scouted."}),r.jsx("button",{className:"td-notfound-btn",onClick:()=>i("/events"),children:"← Back to Trips"})]})]});const v=(_=s.pricingTiers)!=null&&_.length?Math.min(...s.pricingTiers.map(Y=>Y.pricePerPerson)):s.startingPrice,N=s.posterUrl?z5(s.posterUrl,["f_auto","q_auto","w_1800","c_fill","g_auto"]):null;return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:Zc}),r.jsxs("div",{className:"td-page",children:[r.jsxs("section",{className:"td-hero",children:[N?r.jsx("div",{className:"td-hero-bg",style:{backgroundImage:`url(${N})`}}):r.jsx("div",{className:"td-hero-bg",style:{background:"linear-gradient(135deg, #0f0a1a 0%, #1a0a08 60%, #06060b 100%)"}}),r.jsx("div",{className:"td-hero-overlay"}),r.jsx("div",{className:"td-hero-noise"}),r.jsxs("div",{className:"td-hero-content",children:[r.jsxs("div",{className:"td-hero-eyebrow",children:[r.jsx("span",{className:"td-hero-eyebrow-dot"}),r.jsx("span",{children:s.type==="TRIP"?"Adventure Trip":"Club Event"}),s.status==="LIVE"&&r.jsx("span",{style:{fontSize:9,padding:"3px 10px",borderRadius:"100px",background:"rgba(255,77,0,.15)",color:"#ff4d00",border:"1px solid rgba(255,77,0,.35)",letterSpacing:"1.5px"},children:"● Live"})]}),r.jsx("h1",{className:"td-hero-title",children:s.name}),r.jsxs("div",{className:"td-hero-stats",children:[s.duration&&r.jsxs("div",{className:"td-hero-stat",children:[r.jsx("div",{className:"td-hero-stat-icon",children:"🗓️"}),r.jsxs("div",{children:[r.jsx("div",{className:"td-hero-stat-label",children:"Duration"}),r.jsx("div",{className:"td-hero-stat-value",children:s.duration})]})]}),v>0&&r.jsxs("div",{className:"td-hero-stat",children:[r.jsx("div",{className:"td-hero-stat-icon",children:"💰"}),r.jsxs("div",{children:[r.jsx("div",{className:"td-hero-stat-label",children:"Starting at"}),r.jsxs("div",{className:"td-hero-stat-value accent",children:["₹",v.toLocaleString("en-IN"),"/-"]})]})]}),s.pickupDrop&&r.jsxs("div",{className:"td-hero-stat",children:[r.jsx("div",{className:"td-hero-stat-icon",children:"📍"}),r.jsxs("div",{children:[r.jsx("div",{className:"td-hero-stat-label",children:"Pickup & Drop"}),r.jsx("div",{className:"td-hero-stat-value",children:s.pickupDrop})]})]})]})]})]}),s.googleFormLink&&r.jsxs("div",{className:"td-sticky",children:[r.jsx("span",{className:"td-sticky-name",children:s.name}),r.jsxs("a",{href:s.googleFormLink,target:"_blank",rel:"noopener noreferrer",className:"td-sticky-btn",children:["Book Now",r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:r.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})]}),r.jsxs("div",{className:"td-main",children:[r.jsxs("div",{children:[s.description&&r.jsx("p",{className:"td-description",children:s.description}),r.jsx("div",{className:"td-tabs",children:[{id:Qc,label:"Day-Wise Plan"},{id:um,label:"Dates & Costing"},{id:dm,label:"What's Included"}].map(Y=>r.jsx("button",{className:`td-tab-btn${b===Y.id?" active":""}`,onClick:()=>g(Y.id),children:Y.label},Y.id))}),b===Qc&&r.jsx("div",{children:((H=s.itinerary)==null?void 0:H.length)>0?r.jsxs("div",{className:"td-timeline",children:[r.jsx("div",{className:"td-timeline-line"}),s.itinerary.map((Y,I)=>r.jsxs("div",{className:"td-timeline-item",children:[r.jsx("div",{className:"td-timeline-dot",children:Y.dayNumber}),r.jsxs("div",{className:"td-timeline-card",children:[r.jsxs("div",{className:"td-timeline-day-label",children:["Day ",Y.dayNumber]}),r.jsx("h3",{className:"td-timeline-title",children:Y.title}),Y.description&&r.jsx("p",{className:"td-timeline-desc",children:Y.description})]})]},I))]}):r.jsx("p",{className:"td-empty",children:"Itinerary coming soon — check back shortly."})}),b===um&&r.jsxs("div",{children:[((S=s.pricingTiers)==null?void 0:S.length)>0&&r.jsxs("div",{style:{marginBottom:36},children:[r.jsx("span",{className:"td-section-label",children:"Package Pricing"}),r.jsx("div",{className:"td-table-wrap",children:r.jsxs("table",{className:"td-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{style:{textAlign:"left"},children:"Room Sharing"}),r.jsx("th",{children:"Cost per Person"})]})}),r.jsx("tbody",{children:s.pricingTiers.map((Y,I)=>r.jsxs("tr",{children:[r.jsx("td",{children:Y.roomType}),r.jsxs("td",{children:["₹",Y.pricePerPerson.toLocaleString("en-IN"),"/-"]})]},I))})]})})]}),((A=s.tripDates)==null?void 0:A.length)>0&&r.jsxs("div",{children:[r.jsx("span",{className:"td-section-label",children:"Available Dates"}),r.jsx("div",{className:"td-date-chips",children:s.tripDates.map((Y,I)=>r.jsxs("div",{className:"td-date-chip",children:[r.jsxs("div",{className:"td-date-chip-dates",children:[new Date(Y.startDate).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})," – ",new Date(Y.endDate).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})]}),Y.note&&r.jsx("div",{className:"td-date-chip-note",children:Y.note})]},I))})]}),!((y=s.pricingTiers)!=null&&y.length)&&!((M=s.tripDates)!=null&&M.length)&&r.jsx("p",{className:"td-empty",children:"Dates and pricing will be announced soon."})]}),b===dm&&r.jsxs("div",{className:"td-inc-grid",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"td-inc-section-title",style:{color:"#34d399"},children:[r.jsx("span",{children:"✓"})," Inclusions"]}),((q=s.inclusions)==null?void 0:q.length)>0?r.jsx("ul",{className:"td-inc-list",children:s.inclusions.map((Y,I)=>r.jsxs("li",{className:"td-inc-item",children:[r.jsx("span",{className:"td-inc-check",children:"✓"}),Y]},I))}):r.jsx("p",{className:"td-empty",children:"Details coming soon."})]}),r.jsxs("div",{children:[r.jsxs("div",{className:"td-inc-section-title",style:{color:"#ff4d00"},children:[r.jsx("span",{children:"✗"})," Exclusions"]}),((C=s.exclusions)==null?void 0:C.length)>0?r.jsx("ul",{className:"td-inc-list",children:s.exclusions.map((Y,I)=>r.jsxs("li",{className:"td-inc-item",children:[r.jsx("span",{className:"td-inc-cross",children:"✗"}),Y]},I))}):r.jsx("p",{className:"td-empty",children:"Details coming soon."})]})]}),((F=s.notes)==null?void 0:F.length)>0&&r.jsxs("div",{className:"td-info-block notes",children:[r.jsxs("div",{className:"td-info-block-title",children:[r.jsx("span",{children:"📋"})," Important Notes"]}),r.jsx("ul",{children:s.notes.map((Y,I)=>r.jsx("li",{children:Y},I))})]}),s.cancellationPolicy&&r.jsxs("div",{className:"td-info-block cancel",children:[r.jsxs("div",{className:"td-info-block-title",children:[r.jsx("span",{children:"🔖"})," Cancellation Policy"]}),r.jsx("p",{children:s.cancellationPolicy})]}),((P=s.thingsToCarry)==null?void 0:P.length)>0&&r.jsxs("div",{className:"td-info-block carry",children:[r.jsxs("div",{className:"td-info-block-title",children:[r.jsx("span",{children:"🎒"})," Things to Carry"]}),r.jsx("ul",{children:s.thingsToCarry.map((Y,I)=>r.jsx("li",{children:Y},I))})]})]}),r.jsx("div",{children:r.jsxs("div",{className:"td-book-card",children:[r.jsxs("div",{className:"td-book-card-header",children:[r.jsx("div",{className:"td-book-card-from",children:"Starting from"}),r.jsxs("div",{className:"td-book-card-price",children:["₹",v>0?v.toLocaleString("en-IN"):"—",r.jsx("span",{className:"td-book-card-price-sub",children:"/person"})]})]}),r.jsxs("div",{className:"td-book-card-body",children:[s.duration&&r.jsxs("div",{className:"td-book-info-row",children:[r.jsx("span",{className:"td-book-info-icon",children:"🗓️"}),r.jsxs("div",{children:[r.jsx("div",{className:"td-book-info-label",children:"Duration"}),r.jsx("div",{className:"td-book-info-value",children:s.duration})]})]}),s.pickupDrop&&r.jsxs("div",{className:"td-book-info-row",children:[r.jsx("span",{className:"td-book-info-icon",children:"📍"}),r.jsxs("div",{children:[r.jsx("div",{className:"td-book-info-label",children:"Pickup & Drop"}),r.jsx("div",{className:"td-book-info-value",children:s.pickupDrop})]})]}),((ne=s.pricingTiers)==null?void 0:ne.length)>0&&r.jsxs("div",{className:"td-book-info-row",style:{marginBottom:24},children:[r.jsx("span",{className:"td-book-info-icon",children:"🛏️"}),r.jsxs("div",{children:[r.jsx("div",{className:"td-book-info-label",children:"Sharing Options"}),r.jsx("div",{className:"td-book-info-value",children:s.pricingTiers.map(Y=>Y.roomType).join(", ")})]})]}),s.googleFormLink?r.jsx("a",{href:s.googleFormLink,target:"_blank",rel:"noopener noreferrer",className:"td-book-cta",children:"Reserve Your Spot →"}):r.jsx("div",{className:"td-book-cta-disabled",children:"Bookings opening soon"}),r.jsx("div",{className:"td-trust-badges",children:["Best Price Assured","Flexible Cancellation","Expert Guides"].map(Y=>r.jsxs("span",{className:"td-trust-badge",children:["✓ ",Y]},Y))}),r.jsxs("div",{className:"td-quick-links",children:[r.jsxs(De,{to:`/event/${l}/flow`,className:"td-quick-link",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",children:[r.jsx("circle",{cx:"4",cy:"4",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4",cy:"12",r:"1.5",fill:"currentColor"}),r.jsx("line",{x1:"6.5",y1:"4",x2:"13",y2:"4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),r.jsx("line",{x1:"6.5",y1:"8",x2:"13",y2:"8",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),r.jsx("line",{x1:"6.5",y1:"12",x2:"13",y2:"12",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Timeline"]}),r.jsxs(De,{to:`/event/${l}/memories`,className:"td-quick-link",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",children:[r.jsx("rect",{x:"1",y:"3",width:"14",height:"10",rx:"2",stroke:"currentColor",strokeWidth:"1.5"}),r.jsx("circle",{cx:"5.5",cy:"7",r:"1.5",stroke:"currentColor",strokeWidth:"1.3"}),r.jsx("path",{d:"M1 11l3.5-3 2.5 2.5 2.5-2.5L15 11",stroke:"currentColor",strokeWidth:"1.3",strokeLinecap:"round",strokeLinejoin:"round"})]}),"Gallery"]})]})]})]})})]})]})]})}const fm=[{name:"Home",path:"/"},{name:"Trips",path:"/events"},{name:"Memories",path:"/memories"}];function $c(){try{const l=localStorage.getItem("app_auth"),i=l?JSON.parse(l):null;return(i==null?void 0:i.user)||null}catch{return null}}function R5(){const l=ta(),[i,s]=w.useState(!1),[c,d]=w.useState(!1),[f,p]=w.useState(()=>$c()),h=w.useRef(0);w.useEffect(()=>{const v=()=>d(window.scrollY>20);return window.addEventListener("scroll",v,{passive:!0}),()=>window.removeEventListener("scroll",v)},[]),w.useEffect(()=>{const v=N=>{N.key==="app_auth"&&p($c())};return window.addEventListener("storage",v),()=>window.removeEventListener("storage",v)},[]),w.useEffect(()=>{p($c())},[l.pathname]),w.useEffect(()=>{if(i)h.current=window.scrollY||0,document.body.style.position="fixed",document.body.style.top=`-${h.current}px`,document.body.style.left="0",document.body.style.right="0",document.body.style.overflow="hidden",document.body.style.width="100%";else{const v=h.current;document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.right="",document.body.style.overflow="",document.body.style.width="",window.scrollTo(0,v)}return()=>{document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.right="",document.body.style.overflow="",document.body.style.width=""}},[i]);const b=f!=null&&f.name?f.name.split(" ")[0]:null,g=()=>{localStorage.removeItem("app_auth"),window.dispatchEvent(new Event("storage")),window.location.href="/"};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1200;
          height: 72px;
          display: flex;
          align-items: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          background: rgba(6,6,11,0);
          border-bottom: 1px solid transparent;
        }
        .nav-root.scrolled {
          background: rgba(6,6,11,0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 4px 40px rgba(0,0,0,0.5);
        }

        .nav-inner {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── LOGO ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-img {
          height: 36px;
          width: 36px;
          object-fit: contain;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          padding: 4px;
        }
        .nav-logo-wordmark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          color: #f0ece4;
          line-height: 1;
        }
        .nav-logo-wordmark span {
          background: linear-gradient(135deg, #ff4d00, #ffc447);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── DESKTOP LINKS ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }
        @media (max-width: 767px) { .nav-links { display: none; } }

        .nav-link {
          position: relative;
          text-decoration: none;
          color: #888898;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 8px 14px;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .nav-link:hover {
          color: #f0ece4;
          background: rgba(255,255,255,0.05);
        }
        .nav-link.active {
          color: #ff4d00;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #ff4d00, #ffc447);
        }

        /* ── RIGHT SIDE ── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        @media (max-width: 767px) { .nav-right .nav-user-desktop { display: none; } }

        .nav-user-desktop {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-greeting {
          font-size: 12px;
          font-weight: 600;
          color: #888898;
          letter-spacing: 0.3px;
        }
        .nav-greeting strong {
          color: #f0ece4;
          margin-left: 3px;
        }
        .nav-logout-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          color: #888898;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-logout-btn:hover {
          color: #ff4d00;
          border-color: rgba(255,77,0,0.4);
          background: rgba(255,77,0,0.06);
        }

        .nav-login-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #ff5200, #ff7033);
          color: #fff;
          text-decoration: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 9px 20px;
          border-radius: 9px;
          transition: all 0.25s cubic-bezier(0.23,1,0.32,1);
          box-shadow: 0 4px 18px rgba(255,77,0,0.3);
        }
        .nav-login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,77,0,0.45);
        }

        /* ── MOBILE BURGER ── */
        .nav-burger {
          display: none;
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px;
          padding: 8px 10px;
          cursor: pointer;
          flex-direction: column;
          gap: 4px;
          transition: border-color 0.2s ease;
        }
        .nav-burger:hover { border-color: rgba(255,77,0,0.4); }
        @media (max-width: 767px) { .nav-burger { display: flex; } }

        .burger-bar {
          width: 20px; height: 2px;
          border-radius: 2px;
          background: #888898;
          transition: all 0.28s cubic-bezier(0.23,1,0.32,1);
          transform-origin: center;
        }
        .nav-burger.open .burger-bar:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
          background: #ff4d00;
        }
        .nav-burger.open .burger-bar:nth-child(2) {
          opacity: 0; transform: scaleX(0);
        }
        .nav-burger.open .burger-bar:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
          background: #ff4d00;
        }

        /* ── MOBILE DRAWER ── */
        .nav-drawer {
          position: fixed;
          inset: 0;
          z-index: 1100;
          background: rgba(6,6,11,0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          padding: 96px 32px 40px;
          gap: 4px;
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: transform 320ms cubic-bezier(0.2,0.9,0.2,1), opacity 240ms ease;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-drawer.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .nav-drawer-link {
          text-decoration: none;
          color: #888898;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-drawer-link:hover, .nav-drawer-link.active { color: #ff4d00; }
        .nav-drawer-link .arrow { opacity: 0; transition: opacity 0.2s, transform 0.2s; }
        .nav-drawer-link:hover .arrow { opacity: 1; transform: translateX(4px); }
        .nav-drawer-link.active .arrow { opacity: 1; color: #ff4d00; }

        .nav-drawer-bottom {
          margin-top: auto;
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .nav-drawer-greeting {
          font-size: 13px;
          color: #888898;
          padding: 0 0 4px;
        }
        .nav-drawer-greeting strong { color: #f0ece4; }
      `}),r.jsx("nav",{className:`nav-root${c?" scrolled":""}`,children:r.jsxs("div",{className:"nav-inner",children:[r.jsxs(De,{to:"/",className:"nav-logo",children:[r.jsx("img",{src:"/assets/bglogo.png",alt:"Club Bexley",className:"nav-logo-img"}),r.jsxs("span",{className:"nav-logo-wordmark",children:["CLUB ",r.jsx("span",{children:"BEXLEY"})]})]}),r.jsx("ul",{className:"nav-links",children:fm.map(v=>r.jsx("li",{children:r.jsx(De,{to:v.path,className:`nav-link${l.pathname===v.path?" active":""}`,children:v.name})},v.name))}),r.jsxs("div",{className:"nav-right",children:[r.jsx("div",{className:"nav-user-desktop",children:f?r.jsxs(r.Fragment,{children:[r.jsxs("span",{className:"nav-greeting",children:["Hey,",r.jsx("strong",{children:b})]}),r.jsx("button",{className:"nav-logout-btn",onClick:g,children:"Logout"})]}):r.jsxs(De,{to:"/login",className:"nav-login-btn",children:["Login",r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:r.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})}),r.jsxs("button",{className:`nav-burger${i?" open":""}`,onClick:()=>s(v=>!v),"aria-label":"Toggle menu","aria-expanded":i,children:[r.jsx("span",{className:"burger-bar"}),r.jsx("span",{className:"burger-bar"}),r.jsx("span",{className:"burger-bar"})]})]})]})}),r.jsxs("div",{className:`nav-drawer${i?" open":""}`,"aria-hidden":!i,children:[fm.map(v=>r.jsxs(De,{to:v.path,className:`nav-drawer-link${l.pathname===v.path?" active":""}`,onClick:()=>s(!1),children:[v.name,r.jsx("span",{className:"arrow",children:"→"})]},v.name)),r.jsx("div",{className:"nav-drawer-bottom",children:f?r.jsxs(r.Fragment,{children:[r.jsxs("p",{className:"nav-drawer-greeting",children:["Logged in as ",r.jsx("strong",{children:b})]}),r.jsx("button",{className:"nav-logout-btn",onClick:g,children:"Logout"})]}):r.jsxs(De,{to:"/login",className:"nav-login-btn",onClick:()=>s(!1),children:["Login",r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:r.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})})]})]})}function L5(l){return kr({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"},child:[]}]})(l)}function O5(l){return kr({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"},child:[]}]})(l)}function D5(l){return kr({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"},child:[]}]})(l)}const M5=[{name:"Home",path:"/"},{name:"Trips",path:"/events"},{name:"Memories",path:"/memories"},{name:"Our Team",path:"/meetourteam"},{name:"Meet Our Devs",path:"/meetourdevelopers"}],U5=["Himalayan Adventures","Weekend Getaways","Heritage Circuits","Group Tours"],pm=["ESCAPE","EXPLORE","EXPERIENCE","MANALI","LADAKH","KASOL","SPITI","RISHIKESH","KEDARNATH","CHOPTA"];function B5(){const l=bn(),i=s=>{l(s),window.scrollTo({top:0,behavior:"smooth"})};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .footer-root {
          position: relative;
          background: #06060b;
          color: #f0ece4;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow: hidden;
        }

        /* ── noise overlay ── */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── ambient glow orbs ── */
        .footer-orb-l {
          position: absolute;
          left: -160px; bottom: -80px;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,77,0,0.13) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .footer-orb-r {
          position: absolute;
          right: -120px; top: -100px;
          width: 440px; height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,196,71,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* ── top border glow ── */
        .footer-topline {
          position: relative;
          z-index: 1;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,77,0,0.6) 20%,
            rgba(255,196,71,0.8) 50%,
            rgba(255,77,0,0.6) 80%,
            transparent 100%);
          box-shadow: 0 0 24px rgba(255,77,0,0.4), 0 0 60px rgba(255,77,0,0.15);
        }

        /* ── scrolling marquee ── */
        .footer-marquee-wrap {
          position: relative;
          z-index: 1;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 18px 0;
        }
        .footer-marquee {
          display: flex;
          gap: 0;
          width: max-content;
          animation: footerMarquee 22s linear infinite;
        }
        .footer-marquee:hover { animation-play-state: paused; }
        @keyframes footerMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .fmarquee-item {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 0 28px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.18);
          white-space: nowrap;
          transition: color 0.2s;
        }
        .fmarquee-item:hover { color: rgba(255,77,0,0.7); }
        .fmarquee-dot {
          color: #ff4d00;
          font-size: 8px;
          opacity: 0.6;
        }

        /* ── big wordmark ── */
        .footer-wordmark-wrap {
          position: relative;
          z-index: 1;
          padding: 48px 48px 0;
          overflow: hidden;
        }
        .footer-wordmark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 12vw, 160px);
          line-height: 0.88;
          letter-spacing: 4px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.07);
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
        }
        .footer-wordmark span {
          -webkit-text-stroke: 1px rgba(255,77,0,0.2);
        }

        /* ── main grid ── */
        .footer-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
          gap: 48px;
          padding: 40px 48px 56px;
        }
        @media (max-width: 1023px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; padding: 32px 28px 48px; }
        }
        @media (max-width: 599px) {
          .footer-grid { grid-template-columns: 1fr; gap: 28px; padding: 28px 20px 40px; }
          .footer-wordmark-wrap { padding: 32px 20px 0; }
        }

        /* ── brand col ── */
        .footer-brand-logo-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .footer-logo-img {
          height: 40px; width: 40px;
          object-fit: contain;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          padding: 5px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .footer-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2.5px;
          color: #f0ece4;
          line-height: 1;
        }
        .footer-brand-name em {
          font-style: normal;
          background: linear-gradient(135deg, #ff4d00, #ffc447);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-brand-tagline {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888898;
          margin-bottom: 16px;
        }
        .footer-brand-desc {
          font-size: 13px;
          line-height: 1.8;
          color: #888898;
          max-width: 280px;
        }

        /* ── pill tag ── */
        .footer-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,77,0,0.1);
          border: 1px solid rgba(255,77,0,0.2);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ff6a1a;
          margin-top: 20px;
        }
        .footer-pill-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #ff4d00;
          box-shadow: 0 0 6px #ff4d00;
          animation: fpulse 2.5s infinite;
        }
        @keyframes fpulse {
          0%,100% { box-shadow: 0 0 4px #ff4d00; }
          50%      { box-shadow: 0 0 12px #ff4d00, 0 0 20px rgba(255,77,0,0.4); }
        }

        /* ── col headings ── */
        .footer-col-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: #f0ece4;
          margin-bottom: 20px;
          position: relative;
          display: inline-block;
        }
        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: -6px; left: 0;
          width: 24px; height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #ff4d00, #ffc447);
        }

        /* ── links ── */
        .footer-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
        .footer-link-btn {
          all: unset;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 500;
          color: #888898;
          cursor: pointer;
          padding: 5px 0;
          transition: color 0.2s, gap 0.2s;
          width: 100%;
        }
        .footer-link-btn:hover { color: #f0ece4; gap: 14px; }
        .footer-link-arrow {
          font-size: 10px;
          color: #ff4d00;
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        .footer-link-btn:hover .footer-link-arrow { opacity: 1; transform: translateX(2px); }

        /* ── contact ── */
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
        }
        .footer-contact-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(255,77,0,0.1);
          border: 1px solid rgba(255,77,0,0.18);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .footer-contact-text {
          font-size: 12px;
          color: #888898;
          line-height: 1.6;
        }
        .footer-contact-text a {
          color: #888898;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-contact-text a:hover { color: #ff4d00; }

        /* ── social buttons ── */
        .footer-socials {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        .footer-social-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #888898;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .footer-social-btn:hover {
          background: rgba(255,77,0,0.12);
          border-color: rgba(255,77,0,0.3);
          color: #ff4d00;
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(255,77,0,0.2);
        }

        /* ── divider ── */
        .footer-divider {
          position: relative;
          z-index: 1;
          margin: 0 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent);
        }
        @media (max-width: 599px) { .footer-divider { margin: 0 20px; } }

        /* ── bottom bar ── */
        .footer-bottom {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 20px 48px 28px;
        }
        @media (max-width: 599px) { .footer-bottom { padding: 16px 20px 24px; flex-direction: column; align-items: flex-start; } }
        .footer-copy {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.3px;
        }
        .footer-copy strong {
          background: linear-gradient(135deg, #ff4d00, #ffc447);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-legal {
          display: flex;
          gap: 20px;
        }
        .footer-legal a {
          font-size: 11px;
          color: rgba(255,255,255,0.18);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-legal a:hover { color: #ff4d00; }
      `}),r.jsxs("footer",{className:"footer-root",children:[r.jsx("div",{className:"footer-orb-l"}),r.jsx("div",{className:"footer-orb-r"}),r.jsx("div",{className:"footer-topline"}),r.jsx("div",{className:"footer-marquee-wrap",children:r.jsx("div",{className:"footer-marquee",children:[...pm,...pm].map((s,c)=>r.jsxs("span",{className:"fmarquee-item",children:[r.jsx("span",{className:"fmarquee-dot",children:"✦"}),s]},c))})}),r.jsx("div",{className:"footer-wordmark-wrap",children:r.jsxs("div",{className:"footer-wordmark",children:["CLUB ",r.jsx("span",{children:"BEXLEY"})]})}),r.jsxs("div",{className:"footer-grid",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"footer-brand-logo-row",children:[r.jsx("img",{src:"/assets/bglogo.png",alt:"Club Bexley",className:"footer-logo-img",onError:s=>s.target.style.display="none"}),r.jsxs("span",{className:"footer-brand-name",children:["CLUB ",r.jsx("em",{children:"BEXLEY"})]})]}),r.jsx("p",{className:"footer-brand-tagline",children:"Trips & Travel Experiences"}),r.jsx("p",{className:"footer-brand-desc",children:"We curate unforgettable group travel — Himalayan treks, heritage circuits, weekend escapes. No tourist traps. Just honest adventures at honest prices."}),r.jsxs("div",{className:"footer-pill",children:[r.jsx("span",{className:"footer-pill-dot"}),"Trips Open Now"]})]}),r.jsxs("div",{children:[r.jsx("h4",{className:"footer-col-title",children:"Navigate"}),r.jsx("ul",{className:"footer-links",children:M5.map(s=>r.jsx("li",{children:r.jsxs("button",{className:"footer-link-btn",onClick:()=>i(s.path),children:[r.jsx("span",{className:"footer-link-arrow",children:"→"}),s.name]})},s.name))})]}),r.jsxs("div",{children:[r.jsx("h4",{className:"footer-col-title",children:"Trip Types"}),r.jsx("ul",{className:"footer-links",children:U5.map(s=>r.jsx("li",{children:r.jsxs("button",{className:"footer-link-btn",onClick:()=>i("/events"),children:[r.jsx("span",{className:"footer-link-arrow",children:"→"}),s]})},s))})]}),r.jsxs("div",{children:[r.jsx("h4",{className:"footer-col-title",children:"Get In Touch"}),r.jsxs("div",{className:"footer-contact-item",children:[r.jsx("div",{className:"footer-contact-icon",children:"📍"}),r.jsxs("div",{className:"footer-contact-text",children:["Club Bexley Travels,",r.jsx("br",{}),"India"]})]}),r.jsxs("div",{className:"footer-contact-item",children:[r.jsx("div",{className:"footer-contact-icon",children:"✉️"}),r.jsx("div",{className:"footer-contact-text",children:r.jsx("a",{href:"mailto:hello@clubbexley.com",children:"hello@clubbexley.com"})})]}),r.jsxs("div",{style:{marginTop:20},children:[r.jsx("p",{style:{fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"#888898",marginBottom:10},children:"Follow Along"}),r.jsxs("div",{className:"footer-socials",children:[r.jsx("a",{href:"#",className:"footer-social-btn",target:"_blank",rel:"noopener noreferrer","aria-label":"Instagram",children:r.jsx(D5,{size:15})}),r.jsx("a",{href:"#",className:"footer-social-btn",target:"_blank",rel:"noopener noreferrer","aria-label":"LinkedIn",children:r.jsx(O5,{size:15})}),r.jsx("a",{href:"#",className:"footer-social-btn",target:"_blank",rel:"noopener noreferrer","aria-label":"YouTube",children:r.jsx(L5,{size:15})})]})]})]})]}),r.jsx("div",{className:"footer-divider"}),r.jsxs("div",{className:"footer-bottom",children:[r.jsxs("p",{className:"footer-copy",children:["© 2026 ",r.jsx("strong",{children:"Club Bexley"}),". All rights reserved."]}),r.jsxs("div",{className:"footer-legal",children:[r.jsx("a",{href:"#",children:"Privacy Policy"}),r.jsx("a",{href:"#",children:"Terms of Service"}),r.jsx("a",{href:"#",children:"Refund Policy"})]})]})]})]})}function H5({children:l}){return localStorage.getItem("adminToken")?l:r.jsx(Jc,{to:"/admin/login"})}const Ve=He.create({baseURL:"http://localhost:5001",withCredentials:!0});Ve.interceptors.request.use(l=>{const i=localStorage.getItem("adminToken");return i&&!l.url.includes("/api/admin/auth/login")&&(l.headers.Authorization=`Bearer ${i}`),l});Ve.interceptors.response.use(l=>l,l=>{var c,d;const i=(c=l==null?void 0:l.response)==null?void 0:c.status;return(((d=l==null?void 0:l.config)==null?void 0:d.url)||"").includes("/api/admin/auth/login")||i===401&&(localStorage.removeItem("adminToken"),alert("Session expired. Please log in again."),location.replace("/admin/login")),Promise.reject(l)});const bh=w.createContext(),q5=({children:l})=>{const[i,s]=w.useState([]),[c,d]=w.useState(null),[f,p]=w.useState(!0),h=async()=>{try{const g=(await Ve.get("/api/admin/events")).data,v=Array.isArray(g)?g:[];s(v),!c&&v.length>0&&d(v[0])}catch{console.error("Failed to load events"),s([])}finally{p(!1)}};return w.useEffect(()=>{h()},[]),r.jsx(bh.Provider,{value:{events:i,setEvents:s,activeEvent:c,setActiveEvent:d,fetchEvents:h,loading:f},children:l})},Nu=()=>w.useContext(bh),G5=`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --sb-bg: #08080f;
    --sb-surface: #0d0d18;
    --sb-border: rgba(255,255,255,0.06);
    --sb-border-hi: rgba(255,255,255,0.1);
    --sb-accent: #ff4d00;
    --sb-accent2: #ffc447;
    --sb-text: #f0ece4;
    --sb-muted: #7a7a8c;
    --sb-dim: #383850;
    --sb-font-d: 'Bebas Neue', sans-serif;
    --sb-font: 'Plus Jakarta Sans', sans-serif;
  }

  /* ─── SHELL ─── */
  .asb {
    width: 260px;
    flex-shrink: 0;
    background: var(--sb-bg);
    border-right: 1px solid var(--sb-border);
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
    font-family: var(--sb-font);
    overflow: hidden;
    z-index: 50;
  }

  /* top accent line */
  .asb-topline {
    height: 2px;
    background: linear-gradient(90deg, var(--sb-accent) 0%, var(--sb-accent2) 50%, transparent 100%);
    flex-shrink: 0;
  }

  /* all direct children above z:0 so they appear over noise pseudo */
  .asb > * { position: relative; z-index: 1; }

  /* ─── HEADER ─── */
  .asb-header {
    padding: 22px 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .asb-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .asb-logo-img-wrap {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,77,0,0.1);
    border: 1px solid rgba(255,77,0,0.2);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; overflow: hidden;
  }

  .asb-logo-img {
    width: 28px; height: 28px;
    object-fit: contain;
  }

  .asb-logo-text {
    font-family: var(--sb-font-d);
    font-size: 17px;
    letter-spacing: 2px;
    color: var(--sb-text);
    line-height: 1;
  }

  .asb-logo-text em {
    font-style: normal;
    background: linear-gradient(135deg, #ff4d00, #ffc447);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .asb-close-btn {
    display: none;
    background: none;
    border: 1px solid var(--sb-border);
    color: var(--sb-muted);
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
    transition: all 0.2s;
    align-items: center;
  }
  .asb-close-btn:hover { color: var(--sb-accent); border-color: rgba(255,77,0,0.3); }
  @media (max-width: 1023px) { .asb-close-btn { display: flex; } }

  /* ─── DIVIDER ─── */
  .asb-divider {
    height: 1px;
    margin: 0 20px;
    background: var(--sb-border);
    flex-shrink: 0;
  }

  /* ─── EVENT SELECTOR ─── */
  .asb-event-wrap {
    padding: 16px 16px 14px;
    flex-shrink: 0;
  }

  .asb-event-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--sb-dim);
    margin-bottom: 9px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .asb-select-wrap { position: relative; }

  .asb-select {
    width: 100%;
    background: var(--sb-surface);
    border: 1px solid var(--sb-border-hi);
    border-radius: 11px;
    padding: 10px 38px 10px 13px;
    color: var(--sb-text);
    font-family: var(--sb-font);
    font-size: 13px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .asb-select:focus {
    border-color: rgba(255,77,0,0.5);
    box-shadow: 0 0 0 3px rgba(255,77,0,0.08);
  }

  .asb-select option { background: #0d0d18; color: #f0ece4; }

  .asb-select-chevron {
    position: absolute;
    right: 11px; top: 50%;
    transform: translateY(-50%);
    color: var(--sb-dim);
    pointer-events: none;
    transition: transform 0.2s;
  }

  /* ─── NAV ─── */
  .asb-nav {
    flex: 1;
    padding: 8px 12px 12px;
    overflow-y: auto;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .asb-nav::-webkit-scrollbar { display: none; }

  .asb-nav-section {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--sb-dim);
    padding: 12px 8px 6px;
  }

  .asb-link {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 11px 12px;
    border-radius: 11px;
    text-decoration: none;
    color: var(--sb-muted);
    font-size: 13px;
    font-weight: 600;
    transition: all 0.18s ease;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;
  }

  .asb-link:hover {
    color: var(--sb-text);
    background: rgba(255,255,255,0.04);
    border-color: var(--sb-border);
  }

  .asb-link.active {
    color: var(--sb-text);
    background: rgba(255,77,0,0.08);
    border-color: rgba(255,77,0,0.2);
  }

  /* left accent bar on active */
  .asb-link.active::before {
    content: '';
    position: absolute;
    left: 0; top: 25%; bottom: 25%;
    width: 2.5px;
    border-radius: 0 2px 2px 0;
    background: var(--sb-accent);
    box-shadow: 0 0 8px rgba(255,77,0,0.6);
  }

  .asb-link-icon {
    width: 34px; height: 34px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    background: rgba(255,255,255,0.05);
    border: 1px solid transparent;
    transition: all 0.18s;
  }

  .asb-link.active .asb-link-icon {
    background: rgba(255,77,0,0.12);
    border-color: rgba(255,77,0,0.2);
    color: var(--sb-accent);
  }

  .asb-link:hover .asb-link-icon {
    background: rgba(255,255,255,0.08);
  }

  /* ─── ACTIVE EVENT CHIP ─── */
  .asb-event-chip {
    margin: 4px 12px 12px;
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(255,77,0,0.06);
    border: 1px solid rgba(255,77,0,0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .asb-event-chip-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--sb-accent);
    box-shadow: 0 0 8px rgba(255,77,0,0.6);
    flex-shrink: 0;
    animation: chipPulse 2.5s ease-in-out infinite;
  }
  @keyframes chipPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  .asb-event-chip-text {
    flex: 1; min-width: 0;
  }

  .asb-event-chip-label {
    font-size: 9px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--sb-accent); display: block; margin-bottom: 2px;
  }

  .asb-event-chip-name {
    font-size: 12px; font-weight: 700; color: var(--sb-text);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;
  }

  /* ─── BOTTOM ─── */
  .asb-bottom {
    padding: 12px;
    border-top: 1px solid var(--sb-border);
    flex-shrink: 0;
  }

  .asb-logout {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 14px;
    border-radius: 11px;
    width: 100%;
    background: none;
    border: 1px solid var(--sb-border);
    color: var(--sb-muted);
    font-family: var(--sb-font);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .asb-logout:hover {
    color: #f87171;
    border-color: rgba(248,113,113,0.3);
    background: rgba(248,113,113,0.06);
  }

  .asb-logout-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.04); flex-shrink: 0; transition: all 0.2s;
  }

  .asb-logout:hover .asb-logout-icon {
    background: rgba(248,113,113,0.12);
    color: #f87171;
  }

  /* ─── MOBILE BURGER ─── */
  .asb-burger {
    display: none;
    position: fixed;
    top: 16px; left: 16px;
    z-index: 9999;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    border: none; border-radius: 10px;
    width: 42px; height: 42px;
    align-items: center; justify-content: center;
    color: #fff; cursor: pointer;
    box-shadow: 0 4px 16px rgba(255,77,0,0.4);
    transition: all 0.2s ease;
  }
  .asb-burger:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,77,0,0.5); }

  @media (max-width: 1023px) {
    .asb-burger { display: flex; }

    .asb {
      position: fixed;
      inset-y: 0; left: 0;
      transform: translateX(-100%);
      transition: transform 300ms cubic-bezier(0.25, 0.9, 0.25, 1);
      box-shadow: none;
      z-index: 200;
    }

    .asb.open {
      transform: translateX(0);
      box-shadow: 12px 0 60px rgba(0,0,0,0.8);
    }
  }

  /* ─── MOBILE OVERLAY ─── */
  .asb-overlay {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(4px);
    z-index: 199;
  }
  @media (max-width: 1023px) { .asb-overlay { display: block; } }
`,Y5=[{to:"/admin/events",icon:r2,label:"Events"},{to:"/admin/memories",icon:C2,label:"Photos"}];function X5(){const{events:l,activeEvent:i,setActiveEvent:s}=Nu(),[c,d]=w.useState(!1);w.useEffect(()=>(document.body.style.overflow=c?"hidden":"",()=>{document.body.style.overflow=""}),[c]);const f=()=>d(!1),p=async()=>{try{const h=localStorage.getItem("adminToken");await fetch("/api/admin/auth/logout",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`}})}catch{}finally{localStorage.removeItem("adminToken"),window.location.href="/admin/login"}};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:G5}),r.jsx("button",{className:"asb-burger",onClick:()=>d(h=>!h),"aria-label":"Toggle menu",children:c?r.jsx(ba,{size:18}):r.jsx(X2,{size:18})}),c&&r.jsx("div",{className:"asb-overlay",onClick:f}),r.jsxs("aside",{className:`asb${c?" open":""}`,children:[r.jsx("div",{className:"asb-topline"}),r.jsxs("div",{className:"asb-header",children:[r.jsxs("a",{href:"/",className:"asb-logo",children:[r.jsx("div",{className:"asb-logo-img-wrap",children:r.jsx("img",{src:"/assets/bglogo.png",alt:"Club Bexley",className:"asb-logo-img",onError:h=>{h.target.style.display="none"}})}),r.jsx("div",{children:r.jsxs("div",{className:"asb-logo-text",children:["CLUB ",r.jsx("em",{children:"BEXLEY"})]})})]}),r.jsx("button",{className:"asb-close-btn",onClick:f,"aria-label":"Close menu",children:r.jsx(ba,{size:15})})]}),r.jsx("div",{className:"asb-divider"}),r.jsxs("div",{className:"asb-event-wrap",children:[r.jsxs("span",{className:"asb-event-label",children:[r.jsx(W2,{size:9})," Active Event"]}),r.jsxs("div",{className:"asb-select-wrap",children:[r.jsxs("select",{className:"asb-select",value:(i==null?void 0:i._id)||"",onChange:h=>{s(l.find(b=>b._id===h.target.value)),f()},children:[l.length===0&&r.jsx("option",{value:"",children:"No Events"}),l.map(h=>r.jsx("option",{value:h._id,children:h.name},h._id))]}),r.jsx(c2,{size:13,className:"asb-select-chevron"})]})]}),r.jsx("div",{className:"asb-divider"}),r.jsxs("nav",{className:"asb-nav",children:[r.jsx("div",{className:"asb-nav-section",children:"Manage"}),Y5.map(({to:h,icon:b,label:g})=>r.jsxs(Lm,{to:h,onClick:f,className:({isActive:v})=>`asb-link${v?" active":""}`,children:[r.jsx("span",{className:"asb-link-icon",children:r.jsx(b,{size:15})}),g]},h))]}),i&&r.jsxs("div",{className:"asb-event-chip",children:[r.jsx("div",{className:"asb-event-chip-dot"}),r.jsxs("div",{className:"asb-event-chip-text",children:[r.jsx("span",{className:"asb-event-chip-label",children:"Viewing"}),r.jsx("span",{className:"asb-event-chip-name",children:i.name})]})]}),r.jsx("div",{className:"asb-bottom",children:r.jsxs("button",{className:"asb-logout",onClick:p,children:[r.jsx("span",{className:"asb-logout-icon",children:r.jsx(H2,{size:14})}),"Sign Out"]})})]})]})}function V5({children:l}){return r.jsxs("div",{style:{display:"flex",height:"100vh",width:"100vw",background:"#06060b",color:"#f0ece4",fontFamily:"'Plus Jakarta Sans', sans-serif",overflow:"hidden"},children:[r.jsx(X5,{}),r.jsxs("div",{style:{flex:1,overflowY:"auto",overflowX:"hidden",background:"#06060b",position:"relative"},children:[r.jsx("div",{style:{position:"fixed",top:-100,right:-100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle, rgba(255,77,0,0.05) 0%, transparent 70%)",pointerEvents:"none",zIndex:0}}),r.jsx("div",{style:{position:"fixed",bottom:-150,left:300,width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle, rgba(255,196,71,0.03) 0%, transparent 70%)",pointerEvents:"none",zIndex:0}}),r.jsx("div",{style:{position:"relative",zIndex:1,padding:"32px",minHeight:"100%"},children:l||r.jsx(Kb,{})})]})]})}const Q5=`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --al-bg: #06060b;
    --al-card: #0d0d16;
    --al-border: rgba(255,255,255,0.07);
    --al-accent: #ff4d00;
    --al-accent2: #ffc447;
    --al-text: #f0ece4;
    --al-muted: #888898;
    --al-dim: #3a3a50;
    --al-font-d: 'Bebas Neue', sans-serif;
    --al-font: 'Plus Jakarta Sans', sans-serif;
  }

  .al-page {
    min-height: 100vh;
    background: var(--al-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font-family: var(--al-font);
    position: relative;
    overflow: hidden;
  }

  /* orbs */
  .al-orb-1 {
    position: absolute;
    width: 600px; height: 600px;
    top: -200px; left: -200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.1) 0%, transparent 70%);
    pointer-events: none;
    animation: alOrb1 14s ease-in-out infinite;
  }
  .al-orb-2 {
    position: absolute;
    width: 500px; height: 500px;
    bottom: -150px; right: -150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,196,71,0.07) 0%, transparent 70%);
    pointer-events: none;
    animation: alOrb2 18s ease-in-out infinite;
  }
  @keyframes alOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
  @keyframes alOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-40px)} }

  /* noise */
  .al-noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* mountain silhouette */
  .al-mountains {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: 120px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  /* card */
  .al-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
    background: var(--al-card);
    border: 1px solid var(--al-border);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
  }

  /* top glow line */
  .al-topline {
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--al-accent) 30%, var(--al-accent2) 60%, transparent);
    box-shadow: 0 0 20px rgba(255,77,0,0.4);
  }

  .al-body { padding: 40px; }

  /* logo row */
  .al-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
  }

  .al-logo-img {
    width: 36px; height: 36px;
    border-radius: 9px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--al-border);
    padding: 4px;
    object-fit: contain;
  }

  .al-logo-name {
    font-family: var(--al-font-d);
    font-size: 20px;
    letter-spacing: 1.5px;
    color: var(--al-text);
    line-height: 1;
  }

  .al-logo-name em {
    font-style: normal;
    background: linear-gradient(135deg, #ff4d00, #ffc447);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .al-logo-badge {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--al-accent);
    background: rgba(255,77,0,0.1);
    border: 1px solid rgba(255,77,0,0.2);
    padding: 2px 8px;
    border-radius: 100px;
    margin-top: 2px;
    display: block;
  }

  /* headline */
  .al-headline {
    font-family: var(--al-font-d);
    font-size: 48px;
    line-height: 0.9;
    letter-spacing: 1px;
    color: var(--al-text);
    margin-bottom: 6px;
  }

  .al-sub {
    font-size: 13px;
    color: var(--al-muted);
    margin-bottom: 32px;
  }

  /* fields */
  .al-field { margin-bottom: 18px; }

  .al-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--al-dim);
    display: block;
    margin-bottom: 8px;
  }

  .al-input-wrap { position: relative; }

  .al-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--al-border);
    border-radius: 11px;
    padding: 13px 16px;
    color: var(--al-text);
    font-family: var(--al-font);
    font-size: 14px;
    font-weight: 500;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    box-sizing: border-box;
  }

  .al-input::placeholder { color: var(--al-dim); }

  .al-input:focus {
    border-color: rgba(255,77,0,0.5);
    box-shadow: 0 0 0 3px rgba(255,77,0,0.08);
    background: rgba(255,255,255,0.04);
  }

  .al-input.has-toggle { padding-right: 44px; }

  .al-eye {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--al-dim);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }

  .al-eye:hover { color: var(--al-muted); }

  /* forgot */
  .al-forgot {
    text-align: right;
    margin-bottom: 24px;
  }

  .al-forgot a {
    font-size: 11px;
    font-weight: 700;
    color: var(--al-muted);
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: color 0.2s;
  }

  .al-forgot a:hover { color: var(--al-accent); }

  /* error */
  .al-error {
    font-size: 12px;
    color: var(--al-accent);
    background: rgba(255,77,0,0.08);
    border: 1px solid rgba(255,77,0,0.2);
    border-radius: 10px;
    padding: 11px 14px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* submit */
  .al-btn {
    width: 100%;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 15px;
    font-family: var(--al-font);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 8px 24px rgba(255,77,0,0.3);
    position: relative;
    overflow: hidden;
  }

  .al-btn:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba(255,77,0,0.5);
  }

  .al-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .al-btn-loader {
    display: inline-block;
    width: 16px; height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    animation: alSpin 0.7s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
  }

  @keyframes alSpin { to { transform: rotate(360deg); } }

  /* footer */
  .al-footer {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--al-border);
    text-align: center;
    font-size: 11px;
    color: var(--al-dim);
    letter-spacing: 0.5px;
  }
`;function Z5(){const[l,i]=w.useState(""),[s,c]=w.useState(""),[d,f]=w.useState(!1),[p,h]=w.useState(""),[b,g]=w.useState(!1),v=async N=>{var _,H,S;N.preventDefault(),h(""),g(!0);try{const y=(_=(await Ve.post("/api/admin/auth/login",{username:l,password:s})).data)==null?void 0:_.token;if(!y)throw new Error("No token");localStorage.setItem("adminToken",y),window.location.href="/admin/dashboard"}catch(A){h(((S=(H=A==null?void 0:A.response)==null?void 0:H.data)==null?void 0:S.message)||"Invalid credentials. Please try again.")}finally{g(!1)}};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:Q5}),r.jsxs("div",{className:"al-page",children:[r.jsx("div",{className:"al-noise"}),r.jsx("div",{className:"al-orb-1"}),r.jsx("div",{className:"al-orb-2"}),r.jsxs("svg",{className:"al-mountains",viewBox:"0 0 1440 120",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("path",{d:"M0,120 L0,80 L100,52 L200,72 L300,36 L400,60 L500,24 L600,55 L700,22 L800,56 L900,30 L1000,58 L1100,38 L1200,62 L1300,42 L1440,58 L1440,120 Z",fill:"#0d0d16"}),r.jsx("path",{d:"M0,120 L0,92 L120,70 L240,85 L360,58 L480,75 L600,50 L720,72 L840,48 L960,70 L1080,55 L1200,75 L1320,60 L1440,72 L1440,120 Z",fill:"#06060b"})]}),r.jsxs("div",{className:"al-card",children:[r.jsx("div",{className:"al-topline"}),r.jsxs("div",{className:"al-body",children:[r.jsxs("div",{className:"al-logo",children:[r.jsx("img",{src:"/assets/bglogo.png",alt:"Club Bexley",className:"al-logo-img",onError:N=>{N.target.style.display="none"}}),r.jsxs("div",{children:[r.jsxs("div",{className:"al-logo-name",children:["CLUB ",r.jsx("em",{children:"BEXLEY"})]}),r.jsx("span",{className:"al-logo-badge",children:"Admin Portal"})]})]}),r.jsxs("h1",{className:"al-headline",children:["SIGN",r.jsx("br",{}),"IN"]}),r.jsx("p",{className:"al-sub",children:"Enter your credentials to access the dashboard."}),p&&r.jsxs("div",{className:"al-error",children:[r.jsx("span",{children:"⚠"})," ",p]}),r.jsxs("form",{onSubmit:v,children:[r.jsxs("div",{className:"al-field",children:[r.jsx("label",{className:"al-label",children:"Username"}),r.jsx("input",{className:"al-input",placeholder:"Enter username",value:l,onChange:N=>i(N.target.value),autoComplete:"username",required:!0})]}),r.jsxs("div",{className:"al-field",children:[r.jsx("label",{className:"al-label",children:"Password"}),r.jsxs("div",{className:"al-input-wrap",children:[r.jsx("input",{className:"al-input has-toggle",type:d?"text":"password",placeholder:"••••••••",value:s,onChange:N=>c(N.target.value),autoComplete:"current-password",required:!0}),r.jsx("button",{type:"button",className:"al-eye",onClick:()=>f(N=>!N),children:d?r.jsx(y2,{size:16}):r.jsx(j2,{size:16})})]})]}),r.jsx("div",{className:"al-forgot",children:r.jsx(De,{to:"/admin/forgot-password",children:"Forgot password?"})}),r.jsxs("button",{type:"submit",className:"al-btn",disabled:b,children:[b&&r.jsx("span",{className:"al-btn-loader"}),b?"Signing in…":"Sign In →"]})]}),r.jsx("div",{className:"al-footer",children:"Club Bexley Admin · Authorised access only"})]})]})]})]})}async function mm(l,i={}){const{maxWidth:s=1920,maxHeight:c=1920,quality:d=.85,mimeType:f=l.type}=i;if(!l||!l.type.startsWith("image/"))throw new Error("Invalid image file");return l.size<100*1024?l:new Promise((p,h)=>{const b=new FileReader;b.onerror=()=>h(new Error("Failed to read file")),b.onload=g=>{const v=new Image;v.onerror=()=>h(new Error("Failed to load image")),v.onload=()=>{try{let{width:N,height:_}=v;if(N>s||_>c){const A=N/_;N>_?(N=s,_=N/A):(_=c,N=_*A)}const H=document.createElement("canvas");H.width=N,H.height=_;const S=H.getContext("2d");S.imageSmoothingEnabled=!0,S.imageSmoothingQuality="high",S.drawImage(v,0,0,N,_),H.toBlob(A=>{if(!A){h(new Error("Failed to compress image"));return}const y=new File([A],l.name,{type:f,lastModified:Date.now()});p(y)},f,d)}catch(N){h(N)}},v.src=g.target.result},b.readAsDataURL(l)})}const xa={EVENT:"EVENT",GLOBAL:"GLOBAL"},$5={home_announcement:"Announcements Carousel",home_memories:"Memories Section"},P5=`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --mm-bg: #06060b; --mm-card: #0d0d16; --mm-elevated: #121220;
    --mm-border: rgba(255,255,255,0.07); --mm-accent: #ff4d00; --mm-accent2: #ffc447;
    --mm-text: #f0ece4; --mm-muted: #888898; --mm-dim: #3a3a50;
    --mm-purple: #a78bfa;
    --mm-font-d: 'Bebas Neue', sans-serif; --mm-font: 'Plus Jakarta Sans', sans-serif;
  }

  .mm-page { font-family: var(--mm-font); color: var(--mm-text); max-width: 1400px; margin: 0 auto; padding-bottom: 80px; }

  /* page header */
  .mm-header {
    display: flex; flex-wrap: wrap; justify-content: space-between;
    align-items: flex-start; gap: 20px;
    padding-bottom: 24px; margin-bottom: 24px;
    border-bottom: 1px solid var(--mm-border);
  }
  .mm-header h1 {
    font-family: var(--mm-font-d); font-size: 36px; letter-spacing: 1px;
    color: var(--mm-text); margin: 0 0 4px; display: flex; align-items: center; gap: 12px;
  }
  .mm-header-icon { color: var(--mm-accent); }
  .mm-header p { font-size: 13px; color: var(--mm-muted); margin: 0; }

  /* tab switcher */
  .mm-tabs {
    display: flex; background: rgba(255,255,255,0.04);
    border: 1px solid var(--mm-border); border-radius: 12px; padding: 4px;
  }
  .mm-tab {
    padding: 9px 18px; border-radius: 9px; font-family: var(--mm-font);
    font-size: 13px; font-weight: 700; border: none; cursor: pointer;
    display: flex; align-items: center; gap: 7px; transition: all 0.2s;
    background: none;
  }
  .mm-tab-inactive { color: var(--mm-muted); }
  .mm-tab-inactive:hover { color: var(--mm-text); }
  .mm-tab-active-orange { background: linear-gradient(135deg,#ff5200,#ff7033); color: #fff; box-shadow: 0 4px 14px rgba(255,77,0,0.3); }
  .mm-tab-active-purple { background: rgba(167,139,250,0.2); color: var(--mm-purple); border: 1px solid rgba(167,139,250,0.3); }

  /* empty event */
  .mm-no-event {
    min-height: 50vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: var(--mm-card); border: 1px solid var(--mm-border); border-radius: 20px;
  }
  .mm-no-event-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    display: flex; align-items: center; justify-content: center; color: var(--mm-accent); margin-bottom: 20px;
  }
  .mm-no-event p { font-size: 15px; font-weight: 600; color: var(--mm-muted); }

  /* upload bar */
  .mm-upload-bar {
    background: var(--mm-card); border: 1px solid var(--mm-border);
    border-radius: 20px; padding: 24px; margin-bottom: 20px;
    display: flex; flex-wrap: wrap; align-items: center; gap: 20px;
    position: relative; overflow: hidden;
  }
  .mm-upload-accent-line {
    position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: linear-gradient(180deg, var(--mm-accent), var(--mm-accent2));
  }
  .mm-upload-bar-purple .mm-upload-accent-line { background: linear-gradient(180deg, var(--mm-purple), #c084fc); }
  .mm-upload-label {
    font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--mm-dim); display: block; margin-bottom: 8px;
  }
  .mm-upload-label em { color: var(--mm-accent); font-style: normal; }
  .mm-upload-label-purple em { color: var(--mm-purple); }
  .mm-file-input {
    width: 100%;
    background: rgba(255,255,255,0.03); border: 1px solid var(--mm-border);
    border-radius: 10px; padding: 10px 14px; color: var(--mm-text);
    font-family: var(--mm-font); font-size: 13px; outline: none; cursor: pointer;
    transition: all 0.2s;
  }
  .mm-file-input:focus { border-color: rgba(255,77,0,0.5); }
  .mm-file-input::file-selector-button {
    background: var(--mm-accent); color: #fff; border: none;
    padding: 4px 12px; border-radius: 6px; font-size: 11px; font-weight: 700;
    cursor: pointer; margin-right: 12px; transition: all 0.2s;
  }
  .mm-file-input-purple::file-selector-button { background: var(--mm-purple); color: #fff; }

  /* buttons */
  .mm-btn {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    padding: 10px 20px; border-radius: 10px; font-family: var(--mm-font);
    font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; border: 1px solid;
    white-space: nowrap;
  }
  .mm-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .mm-btn-ghost { background: rgba(255,255,255,0.04); border-color: var(--mm-border); color: var(--mm-muted); }
  .mm-btn-ghost:not(:disabled):hover { color: var(--mm-text); border-color: rgba(255,255,255,0.15); }
  .mm-btn-primary { background: linear-gradient(135deg,#ff5200,#ff7033); border-color: transparent; color: #fff; box-shadow: 0 4px 14px rgba(255,77,0,0.25); }
  .mm-btn-primary:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,77,0,0.35); }
  .mm-btn-purple { background: rgba(167,139,250,0.15); border-color: rgba(167,139,250,0.3); color: var(--mm-purple); }
  .mm-btn-purple:not(:disabled):hover { background: rgba(167,139,250,0.25); }
  .mm-btn-divider { width: 1px; height: 32px; background: var(--mm-border); }

  /* global: category selector */
  .mm-cat-grid { display: flex; flex-direction: column; gap: 8px; min-width: 200px; }
  .mm-cat-btn {
    padding: 12px 16px; border-radius: 12px; font-family: var(--mm-font);
    font-size: 13px; font-weight: 700; border: 1px solid; cursor: pointer;
    text-align: left; transition: all 0.2s;
  }
  .mm-cat-active { background: rgba(167,139,250,0.15); border-color: rgba(167,139,250,0.35); color: var(--mm-purple); }
  .mm-cat-inactive { background: rgba(255,255,255,0.03); border-color: var(--mm-border); color: var(--mm-muted); }
  .mm-cat-inactive:hover { color: var(--mm-text); border-color: rgba(255,255,255,0.15); }

  /* gallery grid */
  .mm-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
  .mm-img-card {
    position: relative; border-radius: 16px; overflow: hidden;
    background: var(--mm-card); border: 1px solid var(--mm-border);
    aspect-ratio: 4/3; transition: all 0.3s ease;
  }
  .mm-img-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.15); }
  .mm-img-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .mm-img-overlay {
    position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: flex-end;
    padding: 12px; opacity: 0; transition: opacity 0.3s;
    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%);
  }
  .mm-img-card:hover .mm-img-overlay { opacity: 1; }
  .mm-del-btn {
    width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.1); backdrop-filter: blur(6px); color: #fff;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    transition: all 0.2s;
  }
  .mm-del-btn:hover { background: #f87171; border-color: #f87171; }

  /* gallery states */
  .mm-gallery-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 24px; color: var(--mm-muted); }
  .mm-gallery-loading p { margin-top: 16px; font-size: 13px; font-weight: 500; }
  .mm-spin { animation: mmSpin 0.7s linear infinite; }
  @keyframes mmSpin { to { transform: rotate(360deg); } }
  .mm-gallery-empty {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 72px 24px; background: var(--mm-card); border: 1px dashed var(--mm-border); border-radius: 20px;
  }
  .mm-gallery-empty-icon { color: var(--mm-dim); margin-bottom: 16px; }
  .mm-gallery-empty p { font-size: 15px; font-weight: 700; color: var(--mm-muted); margin: 0 0 6px; }
  .mm-gallery-empty small { font-size: 12px; color: var(--mm-dim); }

  /* import modal */
  .mm-modal-overlay { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgba(0,0,0,0.8); backdrop-filter: blur(12px); }
  .mm-modal {
    background: var(--mm-card); border: 1px solid var(--mm-border);
    border-radius: 24px; width: 100%; max-width: 1000px; max-height: 90vh;
    display: flex; flex-direction: column; overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.7);
  }
  .mm-modal-header {
    padding: 22px 28px; border-bottom: 1px solid var(--mm-border);
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(255,255,255,0.02); flex-shrink: 0;
  }
  .mm-modal-title { font-family: var(--mm-font-d); font-size: 26px; color: var(--mm-text); margin: 0; display: flex; align-items: center; gap: 10px; }
  .mm-modal-title-icon { color: var(--mm-accent); }
  .mm-modal-close {
    width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.06);
    border: 1px solid var(--mm-border); display: flex; align-items: center; justify-content: center;
    color: var(--mm-muted); cursor: pointer; transition: all 0.2s;
  }
  .mm-modal-close:hover { color: var(--mm-accent); border-color: rgba(255,77,0,0.3); }
  .mm-modal-body { flex: 1; overflow-y: auto; padding: 28px; background: rgba(255,255,255,0.01); }
  .mm-modal-select-wrap { max-width: 480px; margin-bottom: 28px; }
  .mm-modal-select-label { font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--mm-dim); display: block; margin-bottom: 8px; }
  .mm-modal-select {
    width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--mm-border);
    border-radius: 12px; padding: 12px 16px; color: var(--mm-text);
    font-family: var(--mm-font); font-size: 14px; font-weight: 600;
    outline: none; appearance: none; cursor: pointer; transition: all 0.2s; box-sizing: border-box;
  }
  .mm-modal-select:focus { border-color: rgba(255,77,0,0.5); box-shadow: 0 0 0 3px rgba(255,77,0,0.08); }
  .mm-modal-select option { background: #0d0d16; color: #f0ece4; }
  .mm-import-bar {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--mm-border);
    flex-wrap: wrap; gap: 14px;
  }
  .mm-import-bar h3 { font-family: var(--mm-font-d); font-size: 20px; color: var(--mm-text); margin: 0 0 4px; }
  .mm-import-bar p { font-size: 12px; color: var(--mm-muted); margin: 0; }
  .mm-selected-count { font-size: 12px; font-weight: 700; color: var(--mm-accent); background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2); padding: 4px 14px; border-radius: 100px; }
  .mm-import-actions { display: flex; align-items: center; gap: 10px; }
  .mm-select-all-btn {
    font-size: 12px; font-weight: 700; color: var(--mm-muted); background: rgba(255,255,255,0.04);
    border: 1px solid var(--mm-border); padding: 5px 14px; border-radius: 100px; cursor: pointer;
    font-family: var(--mm-font); transition: all 0.2s;
  }
  .mm-select-all-btn:hover { color: var(--mm-text); border-color: rgba(255,255,255,0.15); }
  /* import photo grid */
  .mm-import-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
  .mm-import-photo {
    position: relative; aspect-ratio: 1; border-radius: 14px; overflow: hidden; cursor: pointer;
    border: 2px solid transparent; transition: all 0.2s;
  }
  .mm-import-photo:hover { border-color: rgba(255,255,255,0.2); transform: scale(1.02); }
  .mm-import-photo.selected { border-color: var(--mm-accent); box-shadow: 0 0 16px rgba(255,77,0,0.3); transform: scale(0.97); }
  .mm-import-photo img { width: 100%; height: 100%; object-fit: cover; display: block; background: #121220; }
  .mm-import-photo-overlay { position: absolute; inset: 0; transition: opacity 0.2s; }
  .mm-import-photo.selected .mm-import-photo-overlay { background: rgba(255,77,0,0.25); }
  .mm-import-check {
    position: absolute; top: 8px; right: 8px;
    color: var(--mm-accent); background: #fff; border-radius: 50%; padding: 1px;
  }
  .mm-modal-footer {
    padding: 16px 28px; border-top: 1px solid var(--mm-border);
    background: rgba(255,255,255,0.01); display: flex; justify-content: flex-end; gap: 10px; flex-shrink: 0;
  }
  .mm-modal-cancel {
    padding: 10px 20px; background: none; border: 1px solid var(--mm-border);
    border-radius: 10px; color: var(--mm-muted); font-family: var(--mm-font); font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
  }
  .mm-modal-cancel:hover { color: var(--mm-text); border-color: rgba(255,255,255,0.15); }
`;function K5(){const{activeEvent:l}=Nu(),[i,s]=w.useState(xa.EVENT),[c,d]=w.useState([]),[f,p]=w.useState(null),[h,b]=w.useState(!1),[g,v]=w.useState(!1),[N,_]=w.useState([]),[H,S]=w.useState("home_announcement"),[A,y]=w.useState(!1),[M,q]=w.useState([]),[C,F]=w.useState(""),[P,ne]=w.useState([]),[Y,I]=w.useState(new Set),[W,ie]=w.useState(!1),de=async()=>{if(l){v(!0);try{const j=await Ve.get(`/api/admin/events/${l._id}/photos`);d(j.data)}catch(j){console.error(j)}finally{v(!1)}}},oe=async()=>{if(f){b(!0);try{const j=await mm(f,{quality:.85}),D=new FormData;D.append("image",j),await Ve.post(`/api/admin/events/${l._id}/photos`,D),p(null),document.getElementById("event-upload").value="",de(),ue.success("Photo uploaded successfully!")}catch{ue.error("Failed to upload photo")}finally{b(!1)}}},Te=async j=>{if(window.confirm("Are you sure you want to permanently delete this photo?"))try{await Ve.delete(`/api/admin/events/${l._id}/photos/${j}`),de(),ue.success("Photo deleted")}catch{ue.error("Delete failed")}},J=async()=>{y(!0);try{const j=await Ve.get("/api/admin/events");q(j.data.filter(D=>D._id!==l._id))}catch(j){console.error(j)}},ee=async j=>{const D=j.target.value;if(F(D),ne([]),I(new Set),!!D){v(!0);try{const $=await Ve.get(`/api/admin/events/${D}/photos`);ne($.data)}catch($){console.error($)}finally{v(!1)}}},R=j=>{const D=new Set(Y);D.has(j)?D.delete(j):D.add(j),I(D)},K=()=>{I(Y.size===P.length?new Set:new Set(P.map(j=>j._id)))},te=async()=>{if(Y.size!==0){ie(!0);try{const j=P.filter(D=>Y.has(D._id));await Ve.post(`/api/admin/events/${l._id}/photos/import`,{sourceEventId:C,photos:j.map(D=>({url:D.url,public_id:D.public_id}))}),ue.success("Photos imported successfully!"),y(!1),de()}catch{ue.error("Import failed")}finally{ie(!1)}}},he=async()=>{v(!0);try{const j=await Ve.get("/api/admin/images",{params:{category:H}});_(j.data||[])}catch(j){console.error(j)}finally{v(!1)}},k=async()=>{if(f){b(!0);try{const j=await mm(f,{quality:.85}),D=new FormData;D.append("image",j),D.append("category",H),await Ve.post("/api/admin/images/upload",D),p(null),document.getElementById("global-upload").value="",he(),ue.success("Global photo uploaded!")}catch{ue.error("Failed to upload global photo")}finally{b(!1)}}},Q=async j=>{if(window.confirm("Are you sure you want to permanently delete this global photo?"))try{await Ve.delete(`/api/admin/images/${j}`),he(),ue.success("Photo deleted")}catch{ue.error("Delete failed")}};return w.useEffect(()=>{i===xa.EVENT&&l?de():i===xa.GLOBAL&&he()},[i,l,H]),r.jsxs(r.Fragment,{children:[r.jsx("style",{children:P5}),r.jsxs("div",{className:"mm-page",children:[r.jsxs("div",{className:"mm-header",children:[r.jsxs("div",{children:[r.jsxs("h1",{children:[r.jsx(Za,{size:28,className:"mm-header-icon"})," Gallery Manager"]}),r.jsx("p",{children:"Manage event memories and global website imagery."})]}),r.jsxs("div",{className:"mm-tabs",children:[r.jsxs("button",{className:`mm-tab ${i===xa.EVENT?"mm-tab-active-orange":"mm-tab-inactive"}`,onClick:()=>s(xa.EVENT),children:[r.jsx(em,{size:14})," Event Photos"]}),r.jsxs("button",{className:`mm-tab ${i===xa.GLOBAL?"mm-tab-active-purple":"mm-tab-inactive"}`,onClick:()=>s(xa.GLOBAL),children:[r.jsx(k2,{size:14})," Global Assets"]})]})]}),i===xa.EVENT&&(l?r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:20},children:[r.jsxs("div",{className:"mm-upload-bar",children:[r.jsx("div",{className:"mm-upload-accent-line"}),r.jsxs("div",{style:{flex:1,paddingLeft:16},children:[r.jsxs("label",{className:"mm-upload-label",children:["Upload to ",r.jsx("em",{children:l.name})]}),r.jsx("input",{id:"event-upload",type:"file",accept:"image/*",onChange:j=>p(j.target.files[0]),className:"mm-file-input"})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,flexShrink:0},children:[r.jsxs("button",{className:"mm-btn mm-btn-ghost",onClick:oe,disabled:!f||h,children:[h?r.jsx(pr,{size:14,className:"mm-spin"}):r.jsx(nm,{size:14}),h?"Uploading…":"Upload Photo"]}),r.jsx("div",{className:"mm-btn-divider"}),r.jsxs("button",{className:"mm-btn mm-btn-primary",onClick:J,children:[r.jsx(Hc,{size:14})," Import Photos"]})]})]}),r.jsx(hm,{images:c,onDelete:Te,loading:g})]}):r.jsxs("div",{className:"mm-no-event",children:[r.jsx("div",{className:"mm-no-event-icon",children:r.jsx(em,{size:28})}),r.jsx("p",{children:"Please select an event from the sidebar first."})]})),i===xa.GLOBAL&&r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:20},children:[r.jsxs("div",{className:"mm-upload-bar mm-upload-bar-purple",children:[r.jsx("div",{className:"mm-upload-accent-line"}),r.jsxs("div",{style:{paddingLeft:16,display:"flex",gap:28,flexWrap:"wrap",flex:1},children:[r.jsxs("div",{children:[r.jsx("label",{className:"mm-upload-label mm-upload-label-purple",children:"Global Category"}),r.jsx("div",{className:"mm-cat-grid",children:Object.entries($5).map(([j,D])=>r.jsx("button",{className:`mm-cat-btn ${H===j?"mm-cat-active":"mm-cat-inactive"}`,onClick:()=>S(j),children:D},j))})]}),r.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:12},children:[r.jsxs("div",{children:[r.jsx("label",{className:"mm-upload-label mm-upload-label-purple",children:"Upload New Global Asset"}),r.jsx("input",{id:"global-upload",type:"file",accept:"image/*",onChange:j=>p(j.target.files[0]),className:"mm-file-input mm-file-input-purple"})]}),r.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:r.jsxs("button",{className:"mm-btn mm-btn-purple",onClick:k,disabled:!f||h,children:[h?r.jsx(pr,{size:14,className:"mm-spin"}):r.jsx(nm,{size:14}),h?"Uploading…":"Upload to Global"]})})]})]})]}),r.jsx(hm,{images:N,onDelete:Q,loading:g})]}),A&&r.jsx("div",{className:"mm-modal-overlay",children:r.jsxs("div",{className:"mm-modal",children:[r.jsxs("div",{className:"mm-modal-header",children:[r.jsxs("div",{className:"mm-modal-title",children:[r.jsx(Hc,{size:20,className:"mm-modal-title-icon"})," Import Memories"]}),r.jsx("button",{className:"mm-modal-close",onClick:()=>y(!1),children:r.jsx(ba,{size:14})})]}),r.jsxs("div",{className:"mm-modal-body",children:[r.jsxs("div",{className:"mm-modal-select-wrap",children:[r.jsx("label",{className:"mm-modal-select-label",children:"Select Source Event"}),r.jsxs("select",{className:"mm-modal-select",value:C,onChange:ee,children:[r.jsx("option",{value:"",children:"-- Choose an event to copy from --"}),M.map(j=>r.jsx("option",{value:j._id,children:j.name},j._id))]})]}),C&&r.jsxs("div",{children:[r.jsxs("div",{className:"mm-import-bar",children:[r.jsxs("div",{children:[r.jsx("h3",{children:"Select Photos to Clone"}),r.jsxs("p",{children:["These photos will be copied into ",l==null?void 0:l.name]})]}),r.jsxs("div",{className:"mm-import-actions",children:[r.jsxs("span",{className:"mm-selected-count",children:[Y.size," selected"]}),r.jsx("button",{className:"mm-select-all-btn",onClick:K,children:Y.size===P.length?"Deselect All":"Select All"})]})]}),g?r.jsxs("div",{className:"mm-gallery-loading",style:{padding:"48px 24px"},children:[r.jsx(pr,{size:32,className:"mm-spin"}),r.jsx("p",{children:"Loading gallery…"})]}):P.length===0?r.jsxs("div",{className:"mm-gallery-empty",style:{border:"2px dashed"},children:[r.jsx(Za,{size:40,className:"mm-gallery-empty-icon"}),r.jsx("p",{children:"No photos found in this event."})]}):r.jsx("div",{className:"mm-import-grid",children:P.map(j=>{const D=Y.has(j._id);return r.jsxs("div",{className:`mm-import-photo${D?" selected":""}`,onClick:()=>R(j._id),children:[r.jsx("img",{src:j.url,alt:""}),r.jsx("div",{className:"mm-import-photo-overlay"}),D&&r.jsx("div",{className:"mm-import-check",children:r.jsx(ou,{size:22})})]},j._id)})})]})]}),r.jsxs("div",{className:"mm-modal-footer",children:[r.jsx("button",{className:"mm-modal-cancel",onClick:()=>y(!1),children:"Cancel"}),r.jsxs("button",{className:"mm-btn mm-btn-primary",onClick:te,disabled:Y.size===0||W,children:[W?r.jsx(pr,{size:14,className:"mm-spin"}):r.jsx(Hc,{size:14}),W?"Importing…":`Pull in ${Y.size} Photos`]})]})]})})]})]})}function hm({images:l,onDelete:i,loading:s}){return s?r.jsxs("div",{className:"mm-gallery-loading",children:[r.jsx(pr,{size:32,className:"mm-spin"}),r.jsx("p",{children:"Loading gallery…"})]}):l.length===0?r.jsxs("div",{className:"mm-gallery-empty",children:[r.jsx(Za,{size:48,className:"mm-gallery-empty-icon"}),r.jsx("p",{children:"Gallery is empty."}),r.jsx("small",{children:"Upload some photos to get started!"})]}):r.jsx("div",{className:"mm-grid",children:l.map(c=>r.jsxs("div",{className:"mm-img-card",children:[r.jsx("img",{src:c.url,alt:"Gallery Memory",loading:"lazy"}),r.jsx("div",{className:"mm-img-overlay",children:r.jsx("button",{className:"mm-del-btn",onClick:()=>i(c._id),title:"Delete Photo",children:r.jsx(fh,{size:14})})})]},c._id))})}function Pc({label:l,onChange:i}){return r.jsxs("div",{className:"relative w-full group",children:[r.jsx("input",{type:"file",accept:"image/*",onChange:i,className:"absolute inset-0 opacity-0 cursor-pointer z-10"}),r.jsxs("div",{className:"w-full bg-white border border-gray-200 hover:border-[#CA0002] transition-colors rounded-xl px-4 py-3 text-gray-700 font-medium flex justify-between items-center shadow-sm",children:[r.jsx("span",{className:"truncate mr-4",children:l}),r.jsx("span",{className:"text-sm font-bold bg-gray-50 text-[#CA0002] border border-red-100 px-4 py-1.5 rounded-lg group-hover:bg-[#CA0002] group-hover:text-white transition-all whitespace-nowrap",children:"Browse"})]})]})}const J5=`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --ev-bg: #06060b; --ev-card: #0d0d16; --ev-elevated: #121220;
    --ev-border: rgba(255,255,255,0.07); --ev-accent: #ff4d00; --ev-accent2: #ffc447;
    --ev-text: #f0ece4; --ev-muted: #888898; --ev-dim: #3a3a50;
    --ev-font-d: 'Bebas Neue', sans-serif; --ev-font: 'Plus Jakarta Sans', sans-serif;
  }

  .ev-page { font-family: var(--ev-font); color: var(--ev-text); max-width: 1200px; margin: 0 auto; padding-bottom: 80px; }

  /* page header */
  .ev-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    padding-bottom: 24px; margin-bottom: 32px; border-bottom: 1px solid var(--ev-border);
  }
  .ev-header h1 { font-family: var(--ev-font-d); font-size: 36px; letter-spacing: 1px; color: var(--ev-text); margin: 0 0 4px; }
  .ev-header p { font-size: 13px; color: var(--ev-muted); margin: 0; }

  /* create button */
  .ev-create-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 11px 22px; background: linear-gradient(135deg,#ff5200,#ff7033);
    border: none; border-radius: 12px; color: #fff;
    font-family: var(--ev-font); font-size: 13px; font-weight: 700;
    cursor: pointer; box-shadow: 0 6px 20px rgba(255,77,0,0.3); transition: all 0.3s;
    white-space: nowrap;
  }
  .ev-create-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(255,77,0,0.4); }

  /* events section label */
  .ev-section-label { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .ev-section-bar { width: 3px; height: 22px; background: var(--ev-accent); border-radius: 2px; }
  .ev-section-title { font-size: 18px; font-weight: 700; color: var(--ev-text); }

  /* events grid */
  .ev-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }

  /* empty */
  .ev-empty {
    padding: 48px 24px; background: rgba(255,255,255,0.02);
    border: 1px dashed var(--ev-border); border-radius: 20px; text-align: center;
  }
  .ev-empty p { font-size: 14px; color: var(--ev-muted); font-weight: 500; }

  /* event card */
  .ev-card {
    position: relative; background: var(--ev-card); border: 1px solid var(--ev-border);
    border-radius: 18px; overflow: hidden; cursor: pointer;
    transition: all 0.3s ease; flex-direction: column;
  }
  .ev-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.14); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
  .ev-card.active-card { border-color: rgba(255,77,0,0.5); box-shadow: 0 0 0 2px rgba(255,77,0,0.3), 0 12px 30px rgba(255,77,0,0.15); }

  .ev-card-img { height: 160px; overflow: hidden; background: #121220; position: relative; }
  .ev-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .ev-card:hover .ev-card-img img { transform: scale(1.08); }
  .ev-card-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent); }

  .ev-card-status {
    position: absolute; top: 10px; left: 10px; z-index: 5;
    font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px; border: 1px solid;
  }
  .ev-status-live { background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.35); color: #34d399; }
  .ev-status-draft { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: var(--ev-muted); }
  .ev-status-paused { background: rgba(251,191,36,0.15); border-color: rgba(251,191,36,0.35); color: #fbbf24; }
  .ev-status-closed { background: rgba(248,113,113,0.15); border-color: rgba(248,113,113,0.35); color: #f87171; }

  .ev-del-btn {
    position: absolute; top: 10px; right: 10px; z-index: 20;
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(255,255,255,0.08); backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.1); color: var(--ev-muted);
    display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
  }
  .ev-del-btn:hover { background: #f87171; color: #fff; border-color: #f87171; }

  .ev-card-body { padding: 16px; }
  .ev-card-name { font-weight: 700; font-size: 15px; color: var(--ev-text); margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ev-card-slug { font-size: 10px; font-family: monospace; color: var(--ev-dim); background: rgba(255,255,255,0.04); padding: 2px 8px; border-radius: 5px; display: inline-block; margin-bottom: 10px; }
  .ev-card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .ev-tag {
    font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    padding: 2px 8px; border-radius: 100px; border: 1px solid;
  }
  .ev-tag-blue { background: rgba(96,165,250,0.1); border-color: rgba(96,165,250,0.25); color: #60a5fa; }
  .ev-tag-amber { background: rgba(251,191,36,0.1); border-color: rgba(251,191,36,0.25); color: #fbbf24; }

  /* ═══ EDITOR FORM ═══ */
  .ev-form {
    background: var(--ev-card); border: 1px solid rgba(255,77,0,0.25);
    border-radius: 20px; padding: 0; margin-top: 40px; overflow: hidden;
    position: relative;
  }
  .ev-form-topline {
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--ev-accent) 30%, var(--ev-accent2) 60%, transparent);
    box-shadow: 0 0 20px rgba(255,77,0,0.4);
  }
  .ev-form-inner { padding: 32px; }
  .ev-form-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid var(--ev-border);
  }
  .ev-form-title { font-family: var(--ev-font-d); font-size: 28px; color: var(--ev-text); margin: 0; display: flex; align-items: center; gap: 10px; }
  .ev-form-title-icon { color: var(--ev-accent); }
  .ev-form-name-badge {
    font-size: 11px; font-weight: 700; color: var(--ev-accent);
    background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    padding: 3px 12px; border-radius: 100px; margin-left: 8px;
  }
  .ev-close-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; background: rgba(255,255,255,0.04); border: 1px solid var(--ev-border);
    border-radius: 10px; color: var(--ev-muted); font-family: var(--ev-font); font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
  }
  .ev-close-btn:hover { color: var(--ev-accent); border-color: rgba(255,77,0,0.3); }

  /* section panel */
  .ev-panel {
    background: rgba(255,255,255,0.02); border: 1px solid var(--ev-border);
    border-radius: 16px; padding: 20px; margin-bottom: 20px;
  }
  .ev-panel-title {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--ev-border);
  }
  .ev-panel-bar { width: 3px; height: 16px; background: var(--ev-accent); border-radius: 2px; }
  .ev-panel-bar-amber { background: var(--ev-accent2); }
  .ev-panel-bar-blue { background: #60a5fa; }
  .ev-panel-bar-green { background: #34d399; }
  .ev-panel-name { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--ev-text); }

  /* inputs */
  .ev-label { font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--ev-dim); display: block; margin-bottom: 6px; }
  .ev-input, .ev-select, .ev-textarea {
    width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--ev-border);
    border-radius: 10px; padding: 11px 14px; color: var(--ev-text);
    font-family: var(--ev-font); font-size: 13px; font-weight: 500; outline: none;
    transition: all 0.2s; box-sizing: border-box; margin-top: 0;
  }
  .ev-input::placeholder, .ev-textarea::placeholder { color: var(--ev-dim); }
  .ev-input:focus, .ev-select:focus, .ev-textarea:focus { border-color: rgba(255,77,0,0.5); box-shadow: 0 0 0 3px rgba(255,77,0,0.08); background: rgba(255,255,255,0.06); }
  .ev-select { appearance: none; cursor: pointer; }
  .ev-select option { background: #0d0d16; color: #f0ece4; }
  .ev-textarea { resize: none; }
  .ev-input-mono { font-family: monospace; }

  /* grid layouts */
  .ev-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .ev-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  @media (max-width: 640px) { .ev-grid-2, .ev-grid-3 { grid-template-columns: 1fr; } }

  /* form row items */
  .ev-field { margin-bottom: 14px; }
  .ev-field:last-child { margin-bottom: 0; }

  /* list item row */
  .ev-list-item {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.03); border: 1px solid var(--ev-border);
    border-radius: 10px; padding: 10px 12px; margin-bottom: 8px;
  }
  .ev-list-input {
    flex: 1; background: transparent; border: none; outline: none;
    color: var(--ev-text); font-family: var(--ev-font); font-size: 13px; font-weight: 500; padding: 0;
  }
  .ev-list-input::placeholder { color: var(--ev-dim); }
  .ev-small-input {
    background: rgba(255,255,255,0.04); border: 1px solid var(--ev-border);
    border-radius: 8px; padding: 8px 10px; color: var(--ev-text);
    font-family: var(--ev-font); font-size: 13px; outline: none;
    transition: border-color 0.2s;
  }
  .ev-small-input:focus { border-color: rgba(255,77,0,0.5); }
  .ev-small-input::placeholder { color: var(--ev-dim); }

  /* remove btn */
  .ev-remove-btn {
    width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
    background: none; border: 1px solid var(--ev-border); color: var(--ev-dim);
    display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
  }
  .ev-remove-btn:hover { background: rgba(248,113,113,0.15); border-color: rgba(248,113,113,0.35); color: #f87171; }

  /* add btn */
  .ev-add-btn {
    font-size: 12px; font-weight: 700; color: var(--ev-muted);
    background: rgba(255,255,255,0.04); border: 1px solid var(--ev-border);
    padding: 7px 16px; border-radius: 8px; cursor: pointer; font-family: var(--ev-font); transition: all 0.2s;
  }
  .ev-add-btn:hover { color: var(--ev-accent); border-color: rgba(255,77,0,0.3); }

  /* empty hint */
  .ev-list-empty { font-size: 12px; color: var(--ev-dim); font-style: italic; text-align: center; padding: 12px; }

  /* tag chip */
  .ev-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.05); border: 1px solid var(--ev-border);
    color: var(--ev-muted); font-size: 12px; font-weight: 600;
    padding: 4px 10px; border-radius: 100px;
  }
  .ev-chip button { background: none; border: none; color: var(--ev-dim); cursor: pointer; font-size: 14px; line-height: 1; padding: 0 0 0 2px; }
  .ev-chip button:hover { color: #f87171; }
  .ev-chips-wrap { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
  .ev-add-chip-row { display: flex; gap: 8px; margin-top: 8px; }
  .ev-chip-input {
    flex: 1; background: rgba(255,255,255,0.04); border: 1px solid var(--ev-border);
    border-radius: 8px; padding: 8px 12px; color: var(--ev-text);
    font-family: var(--ev-font); font-size: 13px; outline: none; transition: border-color 0.2s;
  }
  .ev-chip-input::placeholder { color: var(--ev-dim); }
  .ev-chip-input:focus { border-color: rgba(255,77,0,0.5); }
  .ev-chip-add-btn {
    padding: 8px 16px; background: var(--ev-accent); color: #fff; border: none;
    border-radius: 8px; font-family: var(--ev-font); font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s; flex-shrink: 0;
  }
  .ev-chip-add-btn:hover { background: #e04400; }

  /* checkbox */
  .ev-check-row {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    background: rgba(255,255,255,0.03); border: 1px solid var(--ev-border);
    border-radius: 10px; cursor: pointer;
  }
  .ev-check-row input { accent-color: var(--ev-accent); width: 16px; height: 16px; cursor: pointer; }
  .ev-check-row span { font-size: 13px; font-weight: 600; color: var(--ev-text); }

  /* itinerary block */
  .ev-itin-item {
    background: rgba(255,255,255,0.03); border: 1px solid var(--ev-border);
    border-radius: 12px; padding: 14px; margin-bottom: 8px;
  }
  .ev-itin-row { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 8px; }
  .ev-day-num {
    width: 52px; flex-shrink: 0; text-align: center;
    background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    border-radius: 8px; padding: 8px 4px; color: var(--ev-accent);
    font-family: var(--ev-font); font-size: 13px; font-weight: 700; outline: none;
  }

  /* assets panel */
  .ev-assets {
    background: rgba(255,255,255,0.02); border: 1px solid var(--ev-border);
    border-radius: 14px; padding: 18px;
  }
  .ev-asset-section { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--ev-border); }
  .ev-asset-section:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .ev-asset-name { font-size: 13px; font-weight: 700; color: var(--ev-text); margin-bottom: 2px; }
  .ev-asset-hint { font-size: 11px; color: var(--ev-dim); margin-bottom: 10px; }
  .ev-asset-img { border-radius: 10px; overflow: hidden; margin-bottom: 8px; border: 1px solid var(--ev-border); }
  .ev-asset-img img { width: 100%; height: 120px; object-fit: cover; display: block; }
  .ev-asset-empty {
    width: 100%; height: 120px; background: rgba(255,255,255,0.02);
    border: 1px dashed var(--ev-border); border-radius: 10px; margin-bottom: 8px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    color: var(--ev-dim);
  }
  .ev-asset-empty span { font-size: 11px; margin-top: 6px; }
  .ev-asset-warn {
    font-size: 11px; color: #fbbf24; background: rgba(251,191,36,0.08);
    border: 1px solid rgba(251,191,36,0.2); border-radius: 8px; padding: 8px 12px;
    margin-bottom: 12px; font-weight: 600;
  }
  .ev-qr-preview { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .ev-qr-img { padding: 8px; background: #fff; border-radius: 10px; border: 1px solid var(--ev-border); }
  .ev-qr-img img { width: 56px; height: 56px; object-fit: contain; display: block; }
  .ev-qr-empty {
    width: 72px; height: 72px; background: rgba(255,255,255,0.02);
    border: 1px dashed var(--ev-border); border-radius: 10px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--ev-dim);
  }
  .ev-qr-empty span { font-size: 9px; margin-top: 4px; }

  /* action buttons */
  .ev-actions { display: flex; gap: 10px; margin-top: 0; }
  .ev-cancel-btn {
    flex: 1; padding: 14px; border-radius: 12px; border: 1px solid var(--ev-border);
    background: rgba(255,255,255,0.04); color: var(--ev-muted);
    font-family: var(--ev-font); font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;
  }
  .ev-cancel-btn:hover { color: var(--ev-text); border-color: rgba(255,255,255,0.15); }
  .ev-save-btn {
    flex: 2; padding: 14px; border-radius: 12px; border: none;
    background: linear-gradient(135deg,#ff5200,#ff7033); color: #fff;
    font-family: var(--ev-font); font-size: 14px; font-weight: 700; cursor: pointer;
    box-shadow: 0 8px 24px rgba(255,77,0,0.3); transition: all 0.3s;
  }
  .ev-save-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(255,77,0,0.45); }

  /* form grid */
  .ev-form-grid { display: grid; grid-template-columns: 1fr 360px; gap: 24px; }
  @media (max-width: 1024px) { .ev-form-grid { grid-template-columns: 1fr; } }
`,xt=({children:l})=>r.jsx("label",{className:"ev-label",children:l}),Zt=({children:l,className:i=""})=>r.jsx("div",{className:`ev-field${i?" "+i:""}`,children:l}),$t=({children:l,color:i=""})=>r.jsxs("div",{className:"ev-panel-title",children:[r.jsx("span",{className:`ev-panel-bar${i?" ev-panel-bar-"+i:""}`}),r.jsx("span",{className:"ev-panel-name",children:l})]});function Xi({label:l,items:i=[],onChange:s}){const[c,d]=w.useState(""),f=()=>{const p=c.trim();p&&(s([...i,p]),d(""))};return r.jsxs("div",{children:[r.jsx(xt,{children:l}),r.jsxs("div",{className:"ev-add-chip-row",children:[r.jsx("input",{value:c,onChange:p=>d(p.target.value),onKeyDown:p=>p.key==="Enter"&&(p.preventDefault(),f()),placeholder:`Add ${l.toLowerCase()}…`,className:"ev-chip-input"}),r.jsx("button",{type:"button",onClick:f,className:"ev-chip-add-btn",children:"+"})]}),r.jsxs("div",{className:"ev-chips-wrap",children:[i.map((p,h)=>r.jsxs("span",{className:"ev-chip",children:[p,r.jsx("button",{type:"button",onClick:()=>s(i.filter((b,g)=>g!==h)),children:"×"})]},h)),i.length===0&&r.jsx("span",{style:{fontSize:12,color:"#3a3a50",fontStyle:"italic"},children:"None added yet."})]})]})}function F5(){const{fetchEvents:l}=Nu(),[i,s]=w.useState([]),[c,d]=w.useState(null),[f,p]=w.useState(null),[h,b]=w.useState(null),[g,v]=w.useState(null),[N,_]=w.useState(!1),H={name:"",slug:"",description:"",type:"CLUB_EVENT",status:"DRAFT",isHidden:!1,posterUrl:"",mobilePosterUrl:"",paymentQRUrl:"",googleFormLink:"",duration:"",pickupDrop:"",startingPrice:0,itinerary:[],pricingTiers:[],tripDates:[],inclusions:[],exclusions:[],notes:[],cancellationPolicy:"",thingsToCarry:[],paid:!1,basePrice:0,familyAllowed:!1,addonPricePerMember:0,flow:[]},[S,A]=w.useState(H),y=(j,D)=>A($=>({...$,[j]:D})),M=async()=>{try{const j=await Ve.get("/api/admin/events");s(Array.isArray(j.data)?j.data:[]),l()}catch{ue.error("Could not load events")}};w.useEffect(()=>{M()},[]);const q=async(j,D)=>{if(j.stopPropagation(),prompt("Type CONFIRM to delete this event permanently:")==="CONFIRM")try{await Ve.delete(`/api/admin/events/${D}`),ue.success("Event deleted"),s($=>$.filter(le=>le._id!==D)),c===D&&Y()}catch{ue.error("Delete failed")}},C=async(j,D)=>{if(!D)return;if(!c)return ue.warning("Save event first before uploading assets.");const $=URL.createObjectURL(D);j==="poster"?p($):j==="mobile-poster"?b($):v($);const le=new FormData;le.append("image",D);try{const me=await Ve.post(`/api/admin/events/${c}/${j}`,le,{headers:{"Content-Type":"multipart/form-data"}}),Ee={poster:"posterUrl","mobile-poster":"mobilePosterUrl",qr:"paymentQRUrl"}[j],ut=me.data[Ee];y(Ee,ut),s(dt=>dt.map(zt=>zt._id===c?{...zt,[Ee]:ut}:zt)),ue.success(`${j==="poster"?"Desktop Poster":j==="mobile-poster"?"Mobile Poster":"QR"} uploaded!`)}catch{ue.error("Upload failed")}},F=async()=>{var Ee,ut;if(!S.name||!S.slug)return ue.warning("Name and Slug are required");if(S.name.length<3||S.name.length>80)return ue.error("Name must be 3–80 characters");if(S.slug.length<1||S.slug.length>60)return ue.error("Slug must be 1–60 characters");if(S.description.length<10||S.description.length>500)return ue.error("Description must be 10–500 characters");const{_id:j,createdAt:D,updatedAt:$,__v:le,createdBy:me,...et}=S;try{if(c){const dt=await Ve.patch(`/api/admin/events/${c}`,et);ue.success("Event updated"),s(zt=>zt.map(vn=>vn._id===c?dt.data:vn)),A(dt.data)}else{const dt=await Ve.post("/api/admin/events",et);ue.success("Event created! Now upload a poster."),d(dt.data._id),A(dt.data),s(zt=>[dt.data,...zt])}}catch(dt){ue.error(((ut=(Ee=dt.response)==null?void 0:Ee.data)==null?void 0:ut.message)||"Save failed")}},P=j=>{d(j._id),A({...H,...j,itinerary:j.itinerary||[],pricingTiers:j.pricingTiers||[],tripDates:j.tripDates||[],inclusions:j.inclusions||[],exclusions:j.exclusions||[],notes:j.notes||[],thingsToCarry:j.thingsToCarry||[],flow:j.flow||[]}),p(j.posterUrl||null),b(j.mobilePosterUrl||null),v(j.paymentQRUrl||null),_(!0)},ne=()=>{d(null),A(H),p(null),v(null),_(!0)},Y=()=>{d(null),A(H),p(null),v(null),_(!1)},I=()=>y("itinerary",[...S.itinerary,{dayNumber:S.itinerary.length+1,title:"",description:""}]),W=j=>y("itinerary",S.itinerary.filter((D,$)=>$!==j)),ie=(j,D,$)=>{const le=[...S.itinerary];le[j]={...le[j],[D]:$},y("itinerary",le)},de=()=>y("pricingTiers",[...S.pricingTiers,{roomType:"",pricePerPerson:0}]),oe=j=>y("pricingTiers",S.pricingTiers.filter((D,$)=>$!==j)),Te=(j,D,$)=>{const le=[...S.pricingTiers];le[j]={...le[j],[D]:$},y("pricingTiers",le)},J=()=>y("tripDates",[...S.tripDates,{startDate:"",endDate:"",note:""}]),ee=j=>y("tripDates",S.tripDates.filter((D,$)=>$!==j)),R=(j,D,$)=>{const le=[...S.tripDates];le[j]={...le[j],[D]:$},y("tripDates",le)},K=()=>y("flow",[...S.flow,{title:"",date:"",desc:""}]),te=j=>y("flow",S.flow.filter((D,$)=>$!==j)),he=(j,D,$)=>{const le=[...S.flow];le[j]={...le[j],[D]:$},y("flow",le)},k=S.type==="TRIP",Q=j=>j==="LIVE"?"ev-status-live":j==="PAUSED"?"ev-status-paused":j==="CLOSED"?"ev-status-closed":"ev-status-draft";return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:J5}),r.jsxs("div",{className:"ev-page",children:[r.jsxs("div",{className:"ev-header",children:[r.jsxs("div",{children:[r.jsx("h1",{children:"Event Manager"}),r.jsx("p",{children:"Create and manage trips & club events."})]}),!N&&r.jsxs("button",{className:"ev-create-btn",onClick:ne,children:[r.jsx(am,{size:15})," Create New"]})]}),r.jsxs("div",{children:[r.jsxs("div",{className:"ev-section-label",children:[r.jsx("div",{className:"ev-section-bar"}),r.jsxs("span",{className:"ev-section-title",children:["Existing Events (",i.length,")"]})]}),i.length===0&&r.jsx("div",{className:"ev-empty",children:r.jsx("p",{children:'No events yet. Click "Create New" to start.'})}),r.jsx("div",{className:"ev-grid",children:i.map(j=>r.jsxs("div",{className:`ev-card${c===j._id&&N?" active-card":""}`,onClick:()=>P(j),children:[r.jsxs("div",{className:"ev-card-img",children:[r.jsx("img",{src:j.posterUrl||"https://placehold.co/400x300/0d0d16/3a3a50?text=No+Poster",alt:j.name,onError:D=>{D.target.onerror=null,D.target.src="https://placehold.co/400x300/0d0d16/3a3a50?text=No+Image"}}),r.jsx("div",{className:"ev-card-img-overlay"})]}),r.jsx("span",{className:`ev-card-status ${Q(j.status)}`,children:j.status}),r.jsx("button",{className:"ev-del-btn",onClick:D=>q(D,j._id),title:"Delete",children:r.jsx(fh,{size:12})}),r.jsxs("div",{className:"ev-card-body",children:[r.jsx("div",{className:"ev-card-name",children:j.name}),r.jsx("div",{className:"ev-card-slug",children:j.slug}),r.jsxs("div",{className:"ev-card-tags",children:[r.jsx("span",{className:"ev-tag ev-tag-blue",children:j.type==="TRIP"?"Trip":"Club Event"}),j.isHidden&&r.jsx("span",{className:"ev-tag ev-tag-amber",children:"Hidden"})]})]})]},j._id))})]}),N&&r.jsxs("div",{className:"ev-form",children:[r.jsx("div",{className:"ev-form-topline"}),r.jsxs("div",{className:"ev-form-inner",children:[r.jsxs("div",{className:"ev-form-header",children:[r.jsxs("div",{className:"ev-form-title",children:[c?r.jsx(Q2,{size:20,className:"ev-form-title-icon"}):r.jsx(am,{size:20,className:"ev-form-title-icon"}),c?"Editing Event":"Create New Event",c&&r.jsx("span",{className:"ev-form-name-badge",children:S.name})]}),r.jsxs("button",{className:"ev-close-btn",onClick:Y,children:[r.jsx(ba,{size:14})," Close"]})]}),r.jsxs("div",{className:"ev-form-grid",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"ev-panel",children:[r.jsx($t,{children:"Core Details"}),r.jsxs("div",{className:"ev-grid-2",children:[r.jsxs(Zt,{children:[r.jsx(xt,{children:"Name"}),r.jsx("input",{className:"ev-input",value:S.name,onChange:j=>y("name",j.target.value),placeholder:"E.g. Kasol Trek 2026"})]}),r.jsxs(Zt,{children:[r.jsx(xt,{children:"Slug (URL)"}),r.jsx("input",{className:"ev-input ev-input-mono",value:S.slug,onChange:j=>y("slug",j.target.value),placeholder:"kasol-trek"})]})]}),r.jsxs("div",{className:"ev-grid-2",style:{marginTop:14},children:[r.jsxs(Zt,{children:[r.jsx(xt,{children:"Type"}),r.jsxs("select",{className:"ev-select",value:S.type,onChange:j=>y("type",j.target.value),children:[r.jsx("option",{value:"TRIP",children:"Trip"}),r.jsx("option",{value:"CLUB_EVENT",children:"Club Event"})]})]}),r.jsxs(Zt,{children:[r.jsx(xt,{children:"Google Form Link"}),r.jsx("input",{className:"ev-input",value:S.googleFormLink,onChange:j=>y("googleFormLink",j.target.value),placeholder:"https://forms.gle/…"})]})]}),r.jsxs(Zt,{style:{marginTop:14},children:[r.jsx(xt,{children:"Description"}),r.jsx("textarea",{className:"ev-textarea",style:{height:80},value:S.description,onChange:j=>y("description",j.target.value),placeholder:"Short description shown in listings (10–500 chars)"})]})]}),k&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"ev-panel",children:[r.jsx($t,{color:"amber",children:"Trip Info"}),r.jsxs("div",{className:"ev-grid-3",children:[r.jsxs(Zt,{children:[r.jsx(xt,{children:"Duration"}),r.jsx("input",{className:"ev-input",value:S.duration,onChange:j=>y("duration",j.target.value),placeholder:"2N-3D"})]}),r.jsxs(Zt,{children:[r.jsx(xt,{children:"Pickup & Drop"}),r.jsx("input",{className:"ev-input",value:S.pickupDrop,onChange:j=>y("pickupDrop",j.target.value),placeholder:"Delhi"})]}),r.jsxs(Zt,{children:[r.jsx(xt,{children:"Starting Price (₹)"}),r.jsx("input",{type:"number",className:"ev-input",value:S.startingPrice,onChange:j=>y("startingPrice",Number(j.target.value))})]})]})]}),r.jsxs("div",{className:"ev-panel",children:[r.jsx($t,{color:"amber",children:"Pricing Tiers"}),S.pricingTiers.map((j,D)=>r.jsxs("div",{className:"ev-list-item",children:[r.jsx("input",{className:"ev-list-input",placeholder:"Room type (e.g. Quad Sharing)",value:j.roomType,onChange:$=>Te(D,"roomType",$.target.value)}),r.jsx("input",{type:"number",className:"ev-small-input",style:{width:110},placeholder:"Price/person",value:j.pricePerPerson,onChange:$=>Te(D,"pricePerPerson",Number($.target.value))}),r.jsx("button",{className:"ev-remove-btn",onClick:()=>oe(D),children:r.jsx(ba,{size:12})})]},D)),S.pricingTiers.length===0&&r.jsx("p",{className:"ev-list-empty",children:"No pricing tiers added."}),r.jsx("button",{className:"ev-add-btn",onClick:de,children:"+ Add Tier"})]}),r.jsxs("div",{className:"ev-panel",children:[r.jsx($t,{color:"amber",children:"Trip Dates"}),S.tripDates.map((j,D)=>r.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",border:"1px solid var(--ev-border)",borderRadius:10,padding:12,marginBottom:8},children:[r.jsxs("div",{style:{display:"flex",gap:10,marginBottom:8},children:[r.jsxs("div",{style:{flex:1},children:[r.jsx(xt,{children:"Start"}),r.jsx("input",{type:"date",className:"ev-small-input",style:{width:"100%",colorScheme:"dark"},value:j.startDate?j.startDate.slice(0,10):"",onChange:$=>R(D,"startDate",$.target.value)})]}),r.jsxs("div",{style:{flex:1},children:[r.jsx(xt,{children:"End"}),r.jsx("input",{type:"date",className:"ev-small-input",style:{width:"100%",colorScheme:"dark"},value:j.endDate?j.endDate.slice(0,10):"",onChange:$=>R(D,"endDate",$.target.value)})]}),r.jsx("button",{className:"ev-remove-btn",style:{marginTop:20},onClick:()=>ee(D),children:r.jsx(ba,{size:12})})]}),r.jsx("input",{className:"ev-small-input",style:{width:"100%",boxSizing:"border-box"},placeholder:'Note (e.g. "Limited Seats")',value:j.note,onChange:$=>R(D,"note",$.target.value)})]},D)),S.tripDates.length===0&&r.jsx("p",{className:"ev-list-empty",children:"No dates added."}),r.jsx("button",{className:"ev-add-btn",onClick:J,children:"+ Add Date"})]}),r.jsxs("div",{className:"ev-panel",children:[r.jsx($t,{color:"amber",children:"Day-wise Itinerary"}),S.itinerary.map((j,D)=>r.jsxs("div",{className:"ev-itin-item",children:[r.jsxs("div",{className:"ev-itin-row",children:[r.jsx("input",{type:"number",className:"ev-day-num",value:j.dayNumber,onChange:$=>ie(D,"dayNumber",Number($.target.value))}),r.jsx("input",{className:"ev-small-input",style:{flex:1},placeholder:"Day title",value:j.title,onChange:$=>ie(D,"title",$.target.value)}),r.jsx("button",{className:"ev-remove-btn",onClick:()=>W(D),children:r.jsx(ba,{size:12})})]}),r.jsx("textarea",{className:"ev-small-input",style:{width:"100%",height:56,resize:"none",boxSizing:"border-box"},placeholder:"Description (optional)",value:j.description||"",onChange:$=>ie(D,"description",$.target.value)})]},D)),S.itinerary.length===0&&r.jsx("p",{className:"ev-list-empty",children:"No itinerary days added."}),r.jsx("button",{className:"ev-add-btn",onClick:I,children:"+ Add Day"})]}),r.jsxs("div",{className:"ev-panel",children:[r.jsx($t,{color:"green",children:"Inclusions & Exclusions"}),r.jsx("div",{style:{marginBottom:20},children:r.jsx(Xi,{label:"Inclusions",items:S.inclusions,onChange:j=>y("inclusions",j)})}),r.jsx(Xi,{label:"Exclusions",items:S.exclusions,onChange:j=>y("exclusions",j)})]}),r.jsxs("div",{className:"ev-panel",children:[r.jsx($t,{color:"green",children:"Notes & Things to Carry"}),r.jsx("div",{style:{marginBottom:20},children:r.jsx(Xi,{label:"Notes",items:S.notes,onChange:j=>y("notes",j)})}),r.jsx(Xi,{label:"Things to Carry",items:S.thingsToCarry,onChange:j=>y("thingsToCarry",j)})]}),r.jsxs("div",{className:"ev-panel",children:[r.jsx($t,{children:"Cancellation Policy"}),r.jsx("textarea",{className:"ev-textarea",style:{height:100},value:S.cancellationPolicy,onChange:j=>y("cancellationPolicy",j.target.value),placeholder:"Describe the cancellation and refund policy…"})]})]}),!k&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"ev-panel",children:[r.jsx($t,{color:"amber",children:"Pricing"}),r.jsxs("label",{className:"ev-check-row",style:{marginBottom:12},children:[r.jsx("input",{type:"checkbox",checked:S.paid,onChange:j=>y("paid",j.target.checked)}),r.jsx("span",{children:"Paid Event"})]}),S.paid&&r.jsxs("div",{style:{paddingLeft:8},children:[r.jsxs(Zt,{children:[r.jsx(xt,{children:"Base Price (INR)"}),r.jsx("input",{type:"number",className:"ev-input",style:{maxWidth:240},value:S.basePrice,onChange:j=>y("basePrice",Number(j.target.value))})]}),r.jsxs("label",{className:"ev-check-row",style:{margin:"12px 0"},children:[r.jsx("input",{type:"checkbox",checked:S.familyAllowed,onChange:j=>y("familyAllowed",j.target.checked)}),r.jsx("span",{children:"Allow Family Members"})]}),S.familyAllowed&&r.jsxs(Zt,{children:[r.jsx(xt,{children:"Add-on Price per Member (INR)"}),r.jsx("input",{type:"number",className:"ev-input",style:{maxWidth:240},value:S.addonPricePerMember,onChange:j=>y("addonPricePerMember",Number(j.target.value))})]})]})]}),r.jsxs("div",{className:"ev-panel",children:[r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:12,borderBottom:"1px solid var(--ev-border)"},children:[r.jsxs("div",{className:"ev-panel-title",style:{margin:0,padding:0,border:"none"},children:[r.jsx("span",{className:"ev-panel-bar"}),r.jsx("span",{className:"ev-panel-name",children:"Event Timeline"})]}),r.jsx("button",{className:"ev-add-btn",onClick:K,children:"+ Add Activity"})]}),S.flow.map((j,D)=>r.jsxs("div",{className:"ev-itin-item",children:[r.jsxs("div",{className:"ev-itin-row",children:[r.jsx("input",{className:"ev-small-input",style:{width:"25%"},placeholder:"10:00 AM",value:j.date,onChange:$=>he(D,"date",$.target.value)}),r.jsx("input",{className:"ev-small-input",style:{flex:1},placeholder:"Activity Title",value:j.title,onChange:$=>he(D,"title",$.target.value)}),r.jsx("button",{className:"ev-remove-btn",onClick:()=>te(D),children:r.jsx(ba,{size:12})})]}),r.jsx("textarea",{className:"ev-small-input",style:{width:"100%",height:52,resize:"none",boxSizing:"border-box"},placeholder:"Description (optional)",value:j.desc||"",onChange:$=>he(D,"desc",$.target.value)})]},D)),S.flow.length===0&&r.jsx("p",{className:"ev-list-empty",children:"No timeline items added."})]})]})]}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[r.jsxs("div",{className:"ev-panel",children:[r.jsx($t,{color:"blue",children:"Publish Status"}),r.jsxs(Zt,{children:[r.jsx(xt,{children:"Status"}),r.jsxs("select",{className:"ev-select",value:S.status,onChange:j=>y("status",j.target.value),children:[r.jsx("option",{value:"DRAFT",children:"Draft (Hidden)"}),r.jsx("option",{value:"LIVE",children:"Live (Active)"}),r.jsx("option",{value:"PAUSED",children:"Paused"}),r.jsx("option",{value:"CLOSED",children:"Closed"})]})]}),r.jsxs("label",{className:"ev-check-row",style:{marginTop:12},children:[r.jsx("input",{type:"checkbox",checked:S.isHidden,onChange:j=>y("isHidden",j.target.checked)}),r.jsx("span",{children:"Hide from Public Page"})]})]}),r.jsxs("div",{className:"ev-panel",style:{opacity:c?1:.6,pointerEvents:c?"all":"none"},children:[r.jsxs($t,{children:[r.jsx(Za,{size:13,style:{display:"inline",marginRight:6}}),"Assets"]}),!c&&r.jsx("div",{className:"ev-asset-warn",children:"Save event first to upload assets."}),r.jsxs("div",{className:"ev-assets",children:[r.jsxs("div",{className:"ev-asset-section",children:[r.jsx("div",{className:"ev-asset-name",children:"Desktop Poster"}),r.jsx("div",{className:"ev-asset-hint",children:"Landscape · 1920×1080 px (16:9)"}),f?r.jsx("div",{className:"ev-asset-img",children:r.jsx("img",{src:f,alt:"Poster"})}):r.jsxs("div",{className:"ev-asset-empty",children:[r.jsx(Za,{size:20}),r.jsx("span",{children:"No Image"})]}),r.jsx(Pc,{label:f?"Change Desktop Poster":"Upload Desktop Poster",onChange:j=>C("poster",j.target.files[0])})]}),r.jsxs("div",{className:"ev-asset-section",children:[r.jsx("div",{className:"ev-asset-name",children:"Mobile Poster"}),r.jsx("div",{className:"ev-asset-hint",children:"Portrait · 1080×1350 px (4:5)"}),h?r.jsx("div",{className:"ev-asset-img",children:r.jsx("img",{src:h,alt:"Mobile Poster",style:{height:160,objectFit:"cover"}})}):r.jsxs("div",{className:"ev-asset-empty",children:[r.jsx(Za,{size:20}),r.jsx("span",{children:"No Image"})]}),r.jsx(Pc,{label:h?"Change Mobile Poster":"Upload Mobile Poster",onChange:j=>C("mobile-poster",j.target.files[0])})]}),!k&&S.paid&&r.jsxs("div",{className:"ev-asset-section",children:[r.jsx("div",{className:"ev-asset-name",children:"Payment QR"}),r.jsxs("div",{className:"ev-qr-preview",children:[g?r.jsx("div",{className:"ev-qr-img",children:r.jsx("img",{src:g,alt:"QR"})}):r.jsxs("div",{className:"ev-qr-empty",children:[r.jsx(P2,{size:20}),r.jsx("span",{children:"No QR"})]}),r.jsx(Pc,{label:g?"Change QR":"Upload QR",onChange:j=>C("qr",j.target.files[0])})]})]})]})]}),r.jsxs("div",{className:"ev-actions",children:[r.jsx("button",{className:"ev-cancel-btn",onClick:Y,children:"Cancel"}),r.jsx("button",{className:"ev-save-btn",onClick:F,children:c?"Save Changes":"Create Event"})]})]})]})]})]})]})]})}const I5=`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --fp-bg: #06060b; --fp-card: #0d0d16; --fp-border: rgba(255,255,255,0.07);
    --fp-accent: #ff4d00; --fp-accent2: #ffc447; --fp-text: #f0ece4;
    --fp-muted: #888898; --fp-dim: #3a3a50;
    --fp-font-d: 'Bebas Neue', sans-serif; --fp-font: 'Plus Jakarta Sans', sans-serif;
  }

  .fp-page {
    min-height: 100vh;
    background: var(--fp-bg);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    font-family: var(--fp-font);
    position: relative; overflow: hidden;
  }

  .fp-orb-1 {
    position: absolute; width: 600px; height: 600px;
    top: -200px; left: -200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.09) 0%, transparent 70%);
    pointer-events: none; animation: fpOrb1 14s ease-in-out infinite;
  }
  .fp-orb-2 {
    position: absolute; width: 500px; height: 500px;
    bottom: -150px; right: -150px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,196,71,0.06) 0%, transparent 70%);
    pointer-events: none; animation: fpOrb2 18s ease-in-out infinite;
  }
  @keyframes fpOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
  @keyframes fpOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-40px)} }

  .fp-mountains {
    position: fixed; bottom: 0; left: 0; right: 0; height: 100px;
    pointer-events: none; z-index: 0; opacity: 0.35;
  }

  .fp-card {
    position: relative; z-index: 1;
    width: 100%; max-width: 440px;
    background: var(--fp-card);
    border: 1px solid var(--fp-border);
    border-radius: 24px; overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
  }

  .fp-topline {
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--fp-accent) 30%, var(--fp-accent2) 60%, transparent);
    box-shadow: 0 0 20px rgba(255,77,0,0.4);
  }

  .fp-body { padding: 40px; }

  /* step tracker */
  .fp-steps {
    display: flex; align-items: center; gap: 0; margin-bottom: 36px;
  }
  .fp-step {
    display: flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 50%;
    font-size: 11px; font-weight: 700;
    border: 1px solid var(--fp-border);
    color: var(--fp-dim); background: rgba(255,255,255,0.02);
    transition: all 0.3s;
  }
  .fp-step.active { background: var(--fp-accent); color: #fff; border-color: var(--fp-accent); box-shadow: 0 0 14px rgba(255,77,0,0.4); }
  .fp-step.done { background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.4); color: #34d399; }
  .fp-step-line { flex: 1; height: 1px; background: var(--fp-border); margin: 0 6px; }
  .fp-step-line.done { background: rgba(52,211,153,0.3); }

  /* logo */
  .fp-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; text-decoration: none; }
  .fp-logo-img { width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.04); border: 1px solid var(--fp-border); padding: 3px; object-fit: contain; }
  .fp-logo-name { font-family: var(--fp-font-d); font-size: 18px; letter-spacing: 1.5px; color: var(--fp-text); }
  .fp-logo-name em { font-style: normal; background: linear-gradient(135deg,#ff4d00,#ffc447); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  .fp-headline { font-family: var(--fp-font-d); font-size: 42px; line-height: 0.9; color: var(--fp-text); margin-bottom: 6px; }
  .fp-sub { font-size: 13px; color: var(--fp-muted); margin-bottom: 28px; }

  /* messages */
  .fp-error { font-size: 12px; color: var(--fp-accent); background: rgba(255,77,0,0.08); border: 1px solid rgba(255,77,0,0.2); border-radius: 10px; padding: 11px 14px; margin-bottom: 18px; display: flex; align-items: center; gap: 8px; }
  .fp-success { font-size: 12px; color: #34d399; background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.2); border-radius: 10px; padding: 11px 14px; margin-bottom: 18px; display: flex; align-items: center; gap: 8px; }

  /* input */
  .fp-field { margin-bottom: 18px; }
  .fp-label { font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--fp-dim); display: block; margin-bottom: 8px; }
  .fp-input-wrap { position: relative; }
  .fp-input-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--fp-dim); pointer-events: none; }
  .fp-input {
    width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--fp-border);
    border-radius: 11px; padding: 13px 13px 13px 40px;
    color: var(--fp-text); font-family: var(--fp-font); font-size: 14px; font-weight: 500;
    outline: none; transition: all 0.2s; box-sizing: border-box;
  }
  .fp-input::placeholder { color: var(--fp-dim); }
  .fp-input:focus { border-color: rgba(255,77,0,0.5); box-shadow: 0 0 0 3px rgba(255,77,0,0.08); background: rgba(255,255,255,0.04); }

  /* btn */
  .fp-btn {
    width: 100%; background: linear-gradient(135deg,#ff5200,#ff7033); color: #fff;
    border: none; border-radius: 12px; padding: 15px;
    font-family: var(--fp-font); font-size: 14px; font-weight: 700; letter-spacing: 0.5px;
    cursor: pointer; transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 8px 24px rgba(255,77,0,0.3);
    display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 8px;
  }
  .fp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(255,77,0,0.5); }
  .fp-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .fp-btn-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; animation: fpSpin .7s linear infinite; }
  @keyframes fpSpin { to { transform: rotate(360deg); } }

  .fp-back { font-size: 11px; font-weight: 700; color: var(--fp-dim); text-decoration: none; margin-top: 16px; display: inline-block; transition: color .2s; }
  .fp-back:hover { color: var(--fp-muted); }

  .fp-footer { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--fp-border); text-align: center; font-size: 11px; color: var(--fp-dim); }
  .fp-footer a { color: var(--fp-muted); text-decoration: none; transition: color .2s; }
  .fp-footer a:hover { color: var(--fp-accent); }
`;function W5(){const[l,i]=w.useState(1),[s,c]=w.useState(!1),[d,f]=w.useState(""),[p,h]=w.useState(""),[b,g]=w.useState(""),[v,N]=w.useState(""),[_,H]=w.useState(""),[S,A]=w.useState(""),[y,M]=w.useState(""),q=bn(),C=()=>{f(""),h("")},F=async W=>{var ie,de;W.preventDefault(),C(),c(!0);try{const oe=await Ve.post("/api/admin/auth/forgot-password",{username:b});h(oe.data.message),i(2)}catch(oe){f(((de=(ie=oe.response)==null?void 0:ie.data)==null?void 0:de.message)||"Failed to request OTP")}finally{c(!1)}},P=async W=>{var ie,de;W.preventDefault(),C(),c(!0);try{const oe=await Ve.post("/api/admin/auth/verify-otp",{username:b,otp:v});M(oe.data.resetToken),h("OTP verified. Set your new password below."),i(3)}catch(oe){f(((de=(ie=oe.response)==null?void 0:ie.data)==null?void 0:de.message)||"Invalid or expired OTP")}finally{c(!1)}},ne=async W=>{var ie,de;if(W.preventDefault(),C(),_!==S)return f("Passwords do not match");c(!0);try{const oe=await Ve.post("/api/admin/auth/reset-password",{resetToken:y,newPassword:_});h(oe.data.message),setTimeout(()=>q("/admin/login"),2e3)}catch(oe){f(((de=(ie=oe.response)==null?void 0:ie.data)==null?void 0:de.message)||"Failed to reset password")}finally{c(!1)}},Y=["Recover Access","Verify OTP","New Password"],I=["Enter your admin username to receive a one-time code.","Enter the 6-digit code sent to your registered email.","Create a new secure password for your account."];return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:I5}),r.jsxs("div",{className:"fp-page",children:[r.jsx("div",{className:"fp-orb-1"}),r.jsx("div",{className:"fp-orb-2"}),r.jsxs("svg",{className:"fp-mountains",viewBox:"0 0 1440 100",preserveAspectRatio:"none",children:[r.jsx("path",{d:"M0,100 L0,70 L100,46 L200,62 L300,30 L400,54 L500,22 L600,50 L700,20 L800,52 L900,28 L1000,54 L1100,35 L1200,58 L1300,40 L1440,55 L1440,100 Z",fill:"#0d0d16"}),r.jsx("path",{d:"M0,100 L0,84 L120,65 L240,78 L360,54 L480,70 L600,46 L720,68 L840,44 L960,66 L1080,52 L1200,70 L1320,56 L1440,68 L1440,100 Z",fill:"#06060b"})]}),r.jsxs("div",{className:"fp-card",children:[r.jsx("div",{className:"fp-topline"}),r.jsxs("div",{className:"fp-body",children:[r.jsxs("a",{href:"/",className:"fp-logo",children:[r.jsx("img",{src:"/assets/bglogo.png",alt:"Club Bexley",className:"fp-logo-img",onError:W=>{W.target.style.display="none"}}),r.jsxs("span",{className:"fp-logo-name",children:["CLUB ",r.jsx("em",{children:"BEXLEY"})]})]}),r.jsx("div",{className:"fp-steps",children:[1,2,3].map((W,ie)=>r.jsxs(r.Fragment,{children:[r.jsx("div",{className:`fp-step${l===W?" active":l>W?" done":""}`,children:l>W?r.jsx(ou,{size:13}):W},W),ie<2&&r.jsx("div",{className:`fp-step-line${l>W?" done":""}`},`line-${W}`)]}))}),r.jsx("h1",{className:"fp-headline",children:Y[l-1]}),r.jsx("p",{className:"fp-sub",children:I[l-1]}),d&&r.jsxs("div",{className:"fp-error",children:[r.jsx("span",{children:"⚠"}),d]}),p&&r.jsxs("div",{className:"fp-success",children:[r.jsx(ou,{size:14}),p]}),l===1&&r.jsxs("form",{onSubmit:F,children:[r.jsxs("div",{className:"fp-field",children:[r.jsx("label",{className:"fp-label",children:"Admin Username / Email"}),r.jsxs("div",{className:"fp-input-wrap",children:[r.jsx(G2,{size:16,className:"fp-input-icon"}),r.jsx("input",{type:"email",required:!0,placeholder:"your@email.com",value:b,onChange:W=>g(W.target.value),className:"fp-input"})]})]}),r.jsx("button",{type:"submit",className:"fp-btn",disabled:s,children:s?r.jsx("span",{className:"fp-btn-spin"}):r.jsxs(r.Fragment,{children:[r.jsx("span",{children:"Send OTP"}),r.jsx(Bc,{size:15})]})})]}),l===2&&r.jsxs("form",{onSubmit:P,children:[r.jsxs("div",{className:"fp-field",children:[r.jsx("label",{className:"fp-label",children:"6-Digit OTP"}),r.jsxs("div",{className:"fp-input-wrap",children:[r.jsx(L2,{size:16,className:"fp-input-icon"}),r.jsx("input",{type:"text",required:!0,placeholder:"123456",maxLength:6,value:v,onChange:W=>N(W.target.value),className:"fp-input"})]})]}),r.jsx("button",{type:"submit",className:"fp-btn",disabled:s,children:s?r.jsx("span",{className:"fp-btn-spin"}):r.jsxs(r.Fragment,{children:[r.jsx("span",{children:"Verify Code"}),r.jsx(Bc,{size:15})]})}),r.jsx("div",{style:{textAlign:"center",marginTop:14},children:r.jsx("button",{type:"button",onClick:()=>{C(),i(1)},className:"fp-back",children:"← Didn't get a code? Go back"})})]}),l===3&&r.jsxs("form",{onSubmit:ne,children:[r.jsxs("div",{className:"fp-field",children:[r.jsx("label",{className:"fp-label",children:"New Password"}),r.jsxs("div",{className:"fp-input-wrap",children:[r.jsx(tm,{size:16,className:"fp-input-icon"}),r.jsx("input",{type:"password",required:!0,placeholder:"••••••••",minLength:6,value:_,onChange:W=>H(W.target.value),className:"fp-input"})]})]}),r.jsxs("div",{className:"fp-field",children:[r.jsx("label",{className:"fp-label",children:"Confirm Password"}),r.jsxs("div",{className:"fp-input-wrap",children:[r.jsx(tm,{size:16,className:"fp-input-icon"}),r.jsx("input",{type:"password",required:!0,placeholder:"••••••••",minLength:6,value:S,onChange:W=>A(W.target.value),className:"fp-input"})]})]}),r.jsx("button",{type:"submit",className:"fp-btn",disabled:s,children:s?r.jsx("span",{className:"fp-btn-spin"}):r.jsxs(r.Fragment,{children:[r.jsx("span",{children:"Reset Password"}),r.jsx(Bc,{size:15})]})})]}),r.jsxs("div",{className:"fp-footer",children:["Remember your password?"," ",r.jsx(De,{to:"/admin/login",children:"Sign in"})]})]})]})]})]})}function e4(){const s=ta().pathname.startsWith("/admin");return r.jsxs(r.Fragment,{children:[!s&&r.jsx(R5,{}),r.jsx("div",{className:s?"":"pt-[90px]",style:s?{}:{background:"#06060b",minHeight:"100vh"},children:r.jsxs(R0,{children:[r.jsx($e,{path:"/",element:r.jsx(I0,{})}),r.jsx($e,{path:"/home",element:r.jsx(I0,{})}),r.jsx($e,{path:"/events",element:r.jsx(Ky,{})}),r.jsx($e,{path:"/login",element:r.jsx(g5,{})}),r.jsx($e,{path:"/meetourteam",element:r.jsx(b5,{})}),r.jsx($e,{path:"/meetourdevelopers",element:r.jsx(C5,{})}),r.jsx($e,{path:"/eventFlow",element:r.jsx(lm,{})}),r.jsx($e,{path:"/event/:eventSlug/flow",element:r.jsx(lm,{})}),r.jsx($e,{path:"/memories",element:r.jsx(Yc,{})}),r.jsx($e,{path:"/events/memories",element:r.jsx(Yc,{})}),r.jsx($e,{path:"/event/:eventSlug/memories",element:r.jsx(Yc,{})}),r.jsx($e,{path:"/event/:eventSlug",element:r.jsx(A5,{})}),r.jsx($e,{path:"/admin/login",element:r.jsx(Z5,{})}),r.jsx($e,{path:"/admin/forgot-password",element:r.jsx(W5,{})}),r.jsx($e,{path:"/admin/*",element:r.jsx(H5,{children:r.jsx(q5,{children:r.jsx(V5,{children:r.jsxs(R0,{children:[r.jsx($e,{path:"events",element:r.jsx(F5,{})}),r.jsx($e,{path:"memories",element:r.jsx(K5,{})}),r.jsx($e,{path:"*",element:r.jsx(Jc,{to:"events",replace:!0})})]})})})})}),r.jsx($e,{path:"*",element:r.jsx(Jc,{to:"/",replace:!0})})]})}),!s&&r.jsx(B5,{}),r.jsx(cv,{position:"top-right",autoClose:3e3})]})}class t4 extends w.Component{constructor(i){super(i),this.state={hasError:!1,error:null}}static getDerivedStateFromError(i){return{hasError:!0,error:i}}componentDidCatch(i,s){console.error("Uncaught Error:",i,s)}render(){return this.state.hasError?r.jsxs("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-6 text-center",children:[r.jsx("h1",{className:"text-4xl font-bold text-[#ca0002] mb-4",children:"Something went wrong."}),r.jsxs("p",{className:"text-gray-500 mb-6 max-w-lg",children:["The application encountered an unexpected error.",r.jsx("br",{}),r.jsx("span",{className:"text-xs font-mono bg-gray-100 p-1 rounded mt-2 inline-block",children:this.state.error&&this.state.error.toString()})]}),r.jsx("button",{onClick:()=>window.location.reload(),className:"bg-[#ca0002] hover:bg-[#a00002] text-white px-6 py-3 rounded-lg font-bold transition",children:"Reload Application"})]}):this.props.children}}Fx.createRoot(document.getElementById("root")).render(r.jsx(w.StrictMode,{children:r.jsx(t4,{children:r.jsx(y1,{children:r.jsx(e4,{})})})}));
