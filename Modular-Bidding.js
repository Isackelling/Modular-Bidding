(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const j of document.querySelectorAll('link[rel="modulepreload"]'))S(j);new MutationObserver(j=>{for(const k of j)if(k.type==="childList")for(const L of k.addedNodes)L.tagName==="LINK"&&L.rel==="modulepreload"&&S(L)}).observe(document,{childList:!0,subtree:!0});function h(j){const k={};return j.integrity&&(k.integrity=j.integrity),j.referrerPolicy&&(k.referrerPolicy=j.referrerPolicy),j.crossOrigin==="use-credentials"?k.credentials="include":j.crossOrigin==="anonymous"?k.credentials="omit":k.credentials="same-origin",k}function S(j){if(j.ep)return;j.ep=!0;const k=h(j);fetch(j.href,k)}})();function Kp(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var Md={exports:{}},Ho={},Wd={exports:{}},mt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Op;function Yu(){if(Op)return mt;Op=1;var l=Symbol.for("react.element"),u=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),j=Symbol.for("react.profiler"),k=Symbol.for("react.provider"),L=Symbol.for("react.context"),T=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),E=Symbol.for("react.memo"),z=Symbol.for("react.lazy"),V=Symbol.iterator;function F(w){return w===null||typeof w!="object"?null:(w=V&&w[V]||w["@@iterator"],typeof w=="function"?w:null)}var J={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Y=Object.assign,oe={};function ee(w,d,P){this.props=w,this.context=d,this.refs=oe,this.updater=P||J}ee.prototype.isReactComponent={},ee.prototype.setState=function(w,d){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,d,"setState")},ee.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function R(){}R.prototype=ee.prototype;function $(w,d,P){this.props=w,this.context=d,this.refs=oe,this.updater=P||J}var H=$.prototype=new R;H.constructor=$,Y(H,ee.prototype),H.isPureReactComponent=!0;var I=Array.isArray,v=Object.prototype.hasOwnProperty,re={current:null},O={key:!0,ref:!0,__self:!0,__source:!0};function te(w,d,P){var ie,le={},de=null,_e=null;if(d!=null)for(ie in d.ref!==void 0&&(_e=d.ref),d.key!==void 0&&(de=""+d.key),d)v.call(d,ie)&&!O.hasOwnProperty(ie)&&(le[ie]=d[ie]);var $e=arguments.length-2;if($e===1)le.children=P;else if(1<$e){for(var Ee=Array($e),Xe=0;Xe<$e;Xe++)Ee[Xe]=arguments[Xe+2];le.children=Ee}if(w&&w.defaultProps)for(ie in $e=w.defaultProps,$e)le[ie]===void 0&&(le[ie]=$e[ie]);return{$$typeof:l,type:w,key:de,ref:_e,props:le,_owner:re.current}}function ze(w,d){return{$$typeof:l,type:w.type,key:d,ref:w.ref,props:w.props,_owner:w._owner}}function ne(w){return typeof w=="object"&&w!==null&&w.$$typeof===l}function ye(w){var d={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(P){return d[P]})}var ve=/\/+/g;function ce(w,d){return typeof w=="object"&&w!==null&&w.key!=null?ye(""+w.key):d.toString(36)}function Ae(w,d,P,ie,le){var de=typeof w;(de==="undefined"||de==="boolean")&&(w=null);var _e=!1;if(w===null)_e=!0;else switch(de){case"string":case"number":_e=!0;break;case"object":switch(w.$$typeof){case l:case u:_e=!0}}if(_e)return _e=w,le=le(_e),w=ie===""?"."+ce(_e,0):ie,I(le)?(P="",w!=null&&(P=w.replace(ve,"$&/")+"/"),Ae(le,d,P,"",function(Xe){return Xe})):le!=null&&(ne(le)&&(le=ze(le,P+(!le.key||_e&&_e.key===le.key?"":(""+le.key).replace(ve,"$&/")+"/")+w)),d.push(le)),1;if(_e=0,ie=ie===""?".":ie+":",I(w))for(var $e=0;$e<w.length;$e++){de=w[$e];var Ee=ie+ce(de,$e);_e+=Ae(de,d,P,Ee,le)}else if(Ee=F(w),typeof Ee=="function")for(w=Ee.call(w),$e=0;!(de=w.next()).done;)de=de.value,Ee=ie+ce(de,$e++),_e+=Ae(de,d,P,Ee,le);else if(de==="object")throw d=String(w),Error("Objects are not valid as a React child (found: "+(d==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":d)+"). If you meant to render a collection of children, use an array instead.");return _e}function Ne(w,d,P){if(w==null)return w;var ie=[],le=0;return Ae(w,ie,"","",function(de){return d.call(P,de,le++)}),ie}function A(w){if(w._status===-1){var d=w._result;d=d(),d.then(function(P){(w._status===0||w._status===-1)&&(w._status=1,w._result=P)},function(P){(w._status===0||w._status===-1)&&(w._status=2,w._result=P)}),w._status===-1&&(w._status=0,w._result=d)}if(w._status===1)return w._result.default;throw w._result}var pe={current:null},G={transition:null},ae={ReactCurrentDispatcher:pe,ReactCurrentBatchConfig:G,ReactCurrentOwner:re};function y(){throw Error("act(...) is not supported in production builds of React.")}return mt.Children={map:Ne,forEach:function(w,d,P){Ne(w,function(){d.apply(this,arguments)},P)},count:function(w){var d=0;return Ne(w,function(){d++}),d},toArray:function(w){return Ne(w,function(d){return d})||[]},only:function(w){if(!ne(w))throw Error("React.Children.only expected to receive a single React element child.");return w}},mt.Component=ee,mt.Fragment=h,mt.Profiler=j,mt.PureComponent=$,mt.StrictMode=S,mt.Suspense=W,mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ae,mt.act=y,mt.cloneElement=function(w,d,P){if(w==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+w+".");var ie=Y({},w.props),le=w.key,de=w.ref,_e=w._owner;if(d!=null){if(d.ref!==void 0&&(de=d.ref,_e=re.current),d.key!==void 0&&(le=""+d.key),w.type&&w.type.defaultProps)var $e=w.type.defaultProps;for(Ee in d)v.call(d,Ee)&&!O.hasOwnProperty(Ee)&&(ie[Ee]=d[Ee]===void 0&&$e!==void 0?$e[Ee]:d[Ee])}var Ee=arguments.length-2;if(Ee===1)ie.children=P;else if(1<Ee){$e=Array(Ee);for(var Xe=0;Xe<Ee;Xe++)$e[Xe]=arguments[Xe+2];ie.children=$e}return{$$typeof:l,type:w.type,key:le,ref:de,props:ie,_owner:_e}},mt.createContext=function(w){return w={$$typeof:L,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},w.Provider={$$typeof:k,_context:w},w.Consumer=w},mt.createElement=te,mt.createFactory=function(w){var d=te.bind(null,w);return d.type=w,d},mt.createRef=function(){return{current:null}},mt.forwardRef=function(w){return{$$typeof:T,render:w}},mt.isValidElement=ne,mt.lazy=function(w){return{$$typeof:z,_payload:{_status:-1,_result:w},_init:A}},mt.memo=function(w,d){return{$$typeof:E,type:w,compare:d===void 0?null:d}},mt.startTransition=function(w){var d=G.transition;G.transition={};try{w()}finally{G.transition=d}},mt.unstable_act=y,mt.useCallback=function(w,d){return pe.current.useCallback(w,d)},mt.useContext=function(w){return pe.current.useContext(w)},mt.useDebugValue=function(){},mt.useDeferredValue=function(w){return pe.current.useDeferredValue(w)},mt.useEffect=function(w,d){return pe.current.useEffect(w,d)},mt.useId=function(){return pe.current.useId()},mt.useImperativeHandle=function(w,d,P){return pe.current.useImperativeHandle(w,d,P)},mt.useInsertionEffect=function(w,d){return pe.current.useInsertionEffect(w,d)},mt.useLayoutEffect=function(w,d){return pe.current.useLayoutEffect(w,d)},mt.useMemo=function(w,d){return pe.current.useMemo(w,d)},mt.useReducer=function(w,d,P){return pe.current.useReducer(w,d,P)},mt.useRef=function(w){return pe.current.useRef(w)},mt.useState=function(w){return pe.current.useState(w)},mt.useSyncExternalStore=function(w,d,P){return pe.current.useSyncExternalStore(w,d,P)},mt.useTransition=function(){return pe.current.useTransition()},mt.version="18.3.1",mt}var Ip;function Xd(){return Ip||(Ip=1,Wd.exports=Yu()),Wd.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rp;function Zu(){if(Rp)return Ho;Rp=1;var l=Xd(),u=Symbol.for("react.element"),h=Symbol.for("react.fragment"),S=Object.prototype.hasOwnProperty,j=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,k={key:!0,ref:!0,__self:!0,__source:!0};function L(T,W,E){var z,V={},F=null,J=null;E!==void 0&&(F=""+E),W.key!==void 0&&(F=""+W.key),W.ref!==void 0&&(J=W.ref);for(z in W)S.call(W,z)&&!k.hasOwnProperty(z)&&(V[z]=W[z]);if(T&&T.defaultProps)for(z in W=T.defaultProps,W)V[z]===void 0&&(V[z]=W[z]);return{$$typeof:u,type:T,key:F,ref:J,props:V,_owner:j.current}}return Ho.Fragment=h,Ho.jsx=L,Ho.jsxs=L,Ho}var Bp;function Ju(){return Bp||(Bp=1,Md.exports=Zu()),Md.exports}var n=Ju(),xe=Xd();const cs=Kp(xe);var ia={},Fd={exports:{}},Hn={},Ud={exports:{}},Hd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lp;function Xu(){return Lp||(Lp=1,(function(l){function u(G,ae){var y=G.length;G.push(ae);e:for(;0<y;){var w=y-1>>>1,d=G[w];if(0<j(d,ae))G[w]=ae,G[y]=d,y=w;else break e}}function h(G){return G.length===0?null:G[0]}function S(G){if(G.length===0)return null;var ae=G[0],y=G.pop();if(y!==ae){G[0]=y;e:for(var w=0,d=G.length,P=d>>>1;w<P;){var ie=2*(w+1)-1,le=G[ie],de=ie+1,_e=G[de];if(0>j(le,y))de<d&&0>j(_e,le)?(G[w]=_e,G[de]=y,w=de):(G[w]=le,G[ie]=y,w=ie);else if(de<d&&0>j(_e,y))G[w]=_e,G[de]=y,w=de;else break e}}return ae}function j(G,ae){var y=G.sortIndex-ae.sortIndex;return y!==0?y:G.id-ae.id}if(typeof performance=="object"&&typeof performance.now=="function"){var k=performance;l.unstable_now=function(){return k.now()}}else{var L=Date,T=L.now();l.unstable_now=function(){return L.now()-T}}var W=[],E=[],z=1,V=null,F=3,J=!1,Y=!1,oe=!1,ee=typeof setTimeout=="function"?setTimeout:null,R=typeof clearTimeout=="function"?clearTimeout:null,$=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function H(G){for(var ae=h(E);ae!==null;){if(ae.callback===null)S(E);else if(ae.startTime<=G)S(E),ae.sortIndex=ae.expirationTime,u(W,ae);else break;ae=h(E)}}function I(G){if(oe=!1,H(G),!Y)if(h(W)!==null)Y=!0,A(v);else{var ae=h(E);ae!==null&&pe(I,ae.startTime-G)}}function v(G,ae){Y=!1,oe&&(oe=!1,R(te),te=-1),J=!0;var y=F;try{for(H(ae),V=h(W);V!==null&&(!(V.expirationTime>ae)||G&&!ye());){var w=V.callback;if(typeof w=="function"){V.callback=null,F=V.priorityLevel;var d=w(V.expirationTime<=ae);ae=l.unstable_now(),typeof d=="function"?V.callback=d:V===h(W)&&S(W),H(ae)}else S(W);V=h(W)}if(V!==null)var P=!0;else{var ie=h(E);ie!==null&&pe(I,ie.startTime-ae),P=!1}return P}finally{V=null,F=y,J=!1}}var re=!1,O=null,te=-1,ze=5,ne=-1;function ye(){return!(l.unstable_now()-ne<ze)}function ve(){if(O!==null){var G=l.unstable_now();ne=G;var ae=!0;try{ae=O(!0,G)}finally{ae?ce():(re=!1,O=null)}}else re=!1}var ce;if(typeof $=="function")ce=function(){$(ve)};else if(typeof MessageChannel<"u"){var Ae=new MessageChannel,Ne=Ae.port2;Ae.port1.onmessage=ve,ce=function(){Ne.postMessage(null)}}else ce=function(){ee(ve,0)};function A(G){O=G,re||(re=!0,ce())}function pe(G,ae){te=ee(function(){G(l.unstable_now())},ae)}l.unstable_IdlePriority=5,l.unstable_ImmediatePriority=1,l.unstable_LowPriority=4,l.unstable_NormalPriority=3,l.unstable_Profiling=null,l.unstable_UserBlockingPriority=2,l.unstable_cancelCallback=function(G){G.callback=null},l.unstable_continueExecution=function(){Y||J||(Y=!0,A(v))},l.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ze=0<G?Math.floor(1e3/G):5},l.unstable_getCurrentPriorityLevel=function(){return F},l.unstable_getFirstCallbackNode=function(){return h(W)},l.unstable_next=function(G){switch(F){case 1:case 2:case 3:var ae=3;break;default:ae=F}var y=F;F=ae;try{return G()}finally{F=y}},l.unstable_pauseExecution=function(){},l.unstable_requestPaint=function(){},l.unstable_runWithPriority=function(G,ae){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var y=F;F=G;try{return ae()}finally{F=y}},l.unstable_scheduleCallback=function(G,ae,y){var w=l.unstable_now();switch(typeof y=="object"&&y!==null?(y=y.delay,y=typeof y=="number"&&0<y?w+y:w):y=w,G){case 1:var d=-1;break;case 2:d=250;break;case 5:d=1073741823;break;case 4:d=1e4;break;default:d=5e3}return d=y+d,G={id:z++,callback:ae,priorityLevel:G,startTime:y,expirationTime:d,sortIndex:-1},y>w?(G.sortIndex=y,u(E,G),h(W)===null&&G===h(E)&&(oe?(R(te),te=-1):oe=!0,pe(I,y-w))):(G.sortIndex=d,u(W,G),Y||J||(Y=!0,A(v))),G},l.unstable_shouldYield=ye,l.unstable_wrapCallback=function(G){var ae=F;return function(){var y=F;F=ae;try{return G.apply(this,arguments)}finally{F=y}}}})(Hd)),Hd}var Mp;function Ku(){return Mp||(Mp=1,Ud.exports=Xu()),Ud.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wp;function qu(){if(Wp)return Hn;Wp=1;var l=Xd(),u=Ku();function h(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,i=1;i<arguments.length;i++)t+="&args[]="+encodeURIComponent(arguments[i]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var S=new Set,j={};function k(e,t){L(e,t),L(e+"Capture",t)}function L(e,t){for(j[e]=t,e=0;e<t.length;e++)S.add(t[e])}var T=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),W=Object.prototype.hasOwnProperty,E=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,z={},V={};function F(e){return W.call(V,e)?!0:W.call(z,e)?!1:E.test(e)?V[e]=!0:(z[e]=!0,!1)}function J(e,t,i,s){if(i!==null&&i.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:i!==null?!i.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Y(e,t,i,s){if(t===null||typeof t>"u"||J(e,t,i,s))return!0;if(s)return!1;if(i!==null)switch(i.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function oe(e,t,i,s,o,a,f){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=o,this.mustUseProperty=i,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=f}var ee={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ee[e]=new oe(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ee[t]=new oe(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){ee[e]=new oe(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ee[e]=new oe(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ee[e]=new oe(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){ee[e]=new oe(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){ee[e]=new oe(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){ee[e]=new oe(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){ee[e]=new oe(e,5,!1,e.toLowerCase(),null,!1,!1)});var R=/[\-:]([a-z])/g;function $(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(R,$);ee[t]=new oe(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(R,$);ee[t]=new oe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(R,$);ee[t]=new oe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){ee[e]=new oe(e,1,!1,e.toLowerCase(),null,!1,!1)}),ee.xlinkHref=new oe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){ee[e]=new oe(e,1,!1,e.toLowerCase(),null,!0,!0)});function H(e,t,i,s){var o=ee.hasOwnProperty(t)?ee[t]:null;(o!==null?o.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Y(t,i,o,s)&&(i=null),s||o===null?F(t)&&(i===null?e.removeAttribute(t):e.setAttribute(t,""+i)):o.mustUseProperty?e[o.propertyName]=i===null?o.type===3?!1:"":i:(t=o.attributeName,s=o.attributeNamespace,i===null?e.removeAttribute(t):(o=o.type,i=o===3||o===4&&i===!0?"":""+i,s?e.setAttributeNS(s,t,i):e.setAttribute(t,i))))}var I=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,v=Symbol.for("react.element"),re=Symbol.for("react.portal"),O=Symbol.for("react.fragment"),te=Symbol.for("react.strict_mode"),ze=Symbol.for("react.profiler"),ne=Symbol.for("react.provider"),ye=Symbol.for("react.context"),ve=Symbol.for("react.forward_ref"),ce=Symbol.for("react.suspense"),Ae=Symbol.for("react.suspense_list"),Ne=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),pe=Symbol.for("react.offscreen"),G=Symbol.iterator;function ae(e){return e===null||typeof e!="object"?null:(e=G&&e[G]||e["@@iterator"],typeof e=="function"?e:null)}var y=Object.assign,w;function d(e){if(w===void 0)try{throw Error()}catch(i){var t=i.stack.trim().match(/\n( *(at )?)/);w=t&&t[1]||""}return`
`+w+e}var P=!1;function ie(e,t){if(!e||P)return"";P=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(U){var s=U}Reflect.construct(e,[],t)}else{try{t.call()}catch(U){s=U}e.call(t.prototype)}else{try{throw Error()}catch(U){s=U}e()}}catch(U){if(U&&s&&typeof U.stack=="string"){for(var o=U.stack.split(`
`),a=s.stack.split(`
`),f=o.length-1,b=a.length-1;1<=f&&0<=b&&o[f]!==a[b];)b--;for(;1<=f&&0<=b;f--,b--)if(o[f]!==a[b]){if(f!==1||b!==1)do if(f--,b--,0>b||o[f]!==a[b]){var C=`
`+o[f].replace(" at new "," at ");return e.displayName&&C.includes("<anonymous>")&&(C=C.replace("<anonymous>",e.displayName)),C}while(1<=f&&0<=b);break}}}finally{P=!1,Error.prepareStackTrace=i}return(e=e?e.displayName||e.name:"")?d(e):""}function le(e){switch(e.tag){case 5:return d(e.type);case 16:return d("Lazy");case 13:return d("Suspense");case 19:return d("SuspenseList");case 0:case 2:case 15:return e=ie(e.type,!1),e;case 11:return e=ie(e.type.render,!1),e;case 1:return e=ie(e.type,!0),e;default:return""}}function de(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case O:return"Fragment";case re:return"Portal";case ze:return"Profiler";case te:return"StrictMode";case ce:return"Suspense";case Ae:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ye:return(e.displayName||"Context")+".Consumer";case ne:return(e._context.displayName||"Context")+".Provider";case ve:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ne:return t=e.displayName||null,t!==null?t:de(e.type)||"Memo";case A:t=e._payload,e=e._init;try{return de(e(t))}catch{}}return null}function _e(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return de(t);case 8:return t===te?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function $e(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ee(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Xe(e){var t=Ee(e)?"checked":"value",i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var o=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(f){s=""+f,a.call(this,f)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return s},setValue:function(f){s=""+f},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $t(e){e._valueTracker||(e._valueTracker=Xe(e))}function yt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var i=t.getValue(),s="";return e&&(s=Ee(e)?e.checked?"true":"false":e.value),e=s,e!==i?(t.setValue(e),!0):!1}function mn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ot(e,t){var i=t.checked;return y({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:i??e._wrapperState.initialChecked})}function Kt(e,t){var i=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;i=$e(t.value!=null?t.value:i),e._wrapperState={initialChecked:s,initialValue:i,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function an(e,t){t=t.checked,t!=null&&H(e,"checked",t,!1)}function gn(e,t){an(e,t);var i=$e(t.value),s=t.type;if(i!=null)s==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+i):e.value!==""+i&&(e.value=""+i);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Gn(e,t.type,i):t.hasOwnProperty("defaultValue")&&Gn(e,t.type,$e(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function $i(e,t,i){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,i||t===e.value||(e.value=t),e.defaultValue=t}i=e.name,i!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,i!==""&&(e.name=i)}function Gn(e,t,i){(t!=="number"||mn(e.ownerDocument)!==e)&&(i==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+i&&(e.defaultValue=""+i))}var Hi=Array.isArray;function Yn(e,t,i,s){if(e=e.options,t){t={};for(var o=0;o<i.length;o++)t["$"+i[o]]=!0;for(i=0;i<e.length;i++)o=t.hasOwnProperty("$"+e[i].value),e[i].selected!==o&&(e[i].selected=o),o&&s&&(e[i].defaultSelected=!0)}else{for(i=""+$e(i),t=null,o=0;o<e.length;o++){if(e[o].value===i){e[o].selected=!0,s&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Hs(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(h(91));return y({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Er(e,t){var i=t.value;if(i==null){if(i=t.children,t=t.defaultValue,i!=null){if(t!=null)throw Error(h(92));if(Hi(i)){if(1<i.length)throw Error(h(93));i=i[0]}t=i}t==null&&(t=""),i=t}e._wrapperState={initialValue:$e(i)}}function On(e,t){var i=$e(t.value),s=$e(t.defaultValue);i!=null&&(i=""+i,i!==e.value&&(e.value=i),t.defaultValue==null&&e.defaultValue!==i&&(e.defaultValue=i)),s!=null&&(e.defaultValue=""+s)}function Qi(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Rt(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ei(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Rt(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var pi,zi=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,i,s,o){MSApp.execUnsafeLocalFunction(function(){return e(t,i,s,o)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(pi=pi||document.createElement("div"),pi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=pi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Zn(e,t){if(t){var i=e.firstChild;if(i&&i===e.lastChild&&i.nodeType===3){i.nodeValue=t;return}}e.textContent=t}var Vi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Jn=["Webkit","ms","Moz","O"];Object.keys(Vi).forEach(function(e){Jn.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Vi[t]=Vi[e]})});function ps(e,t,i){return t==null||typeof t=="boolean"||t===""?"":i||typeof t!="number"||t===0||Vi.hasOwnProperty(e)&&Vi[e]?(""+t).trim():t+"px"}function Pt(e,t){e=e.style;for(var i in t)if(t.hasOwnProperty(i)){var s=i.indexOf("--")===0,o=ps(i,t[i],s);i==="float"&&(i="cssFloat"),s?e.setProperty(i,o):e[i]=o}}var us=y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function vt(e,t){if(t){if(us[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(h(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(h(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(h(61))}if(t.style!=null&&typeof t.style!="object")throw Error(h(62))}}function Zt(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ui=null;function Qs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fi=null,Di=null,In=null;function zr(e){if(e=zo(e)){if(typeof fi!="function")throw Error(h(280));var t=e.stateNode;t&&(t=yl(t),fi(e.stateNode,e.type,t))}}function Ai(e){Di?In?In.push(e):In=[e]:Di=e}function Dr(){if(Di){var e=Di,t=In;if(In=Di=null,zr(e),t)for(e=0;e<t.length;e++)zr(t[e])}}function xn(e,t){return e(t)}function fs(){}var _i=!1;function Gi(e,t,i){if(_i)return e(t,i);_i=!0;try{return xn(e,t,i)}finally{_i=!1,(Di!==null||In!==null)&&(fs(),Dr())}}function ni(e,t){var i=e.stateNode;if(i===null)return null;var s=yl(i);if(s===null)return null;i=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(i&&typeof i!="function")throw Error(h(231,t,typeof i));return i}var Yi=!1;if(T)try{var Rn={};Object.defineProperty(Rn,"passive",{get:function(){Yi=!0}}),window.addEventListener("test",Rn,Rn),window.removeEventListener("test",Rn,Rn)}catch{Yi=!1}function Ve(e,t,i,s,o,a,f,b,C){var U=Array.prototype.slice.call(arguments,3);try{t.apply(i,U)}catch(me){this.onError(me)}}var Nt=!1,Xn=null,ii=!1,Vs=null,Gs={onError:function(e){Nt=!0,Xn=e}};function Zi(e,t,i,s,o,a,f,b,C){Nt=!1,Xn=null,Ve.apply(Gs,arguments)}function lo(e,t,i,s,o,a,f,b,C){if(Zi.apply(this,arguments),Nt){if(Nt){var U=Xn;Nt=!1,Xn=null}else throw Error(h(198));ii||(ii=!0,Vs=U)}}function dn(e){var t=e,i=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(i=t.return),e=t.return;while(e)}return t.tag===3?i:null}function ao(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Vo(e){if(dn(e)!==e)throw Error(h(188))}function ha(e){var t=e.alternate;if(!t){if(t=dn(e),t===null)throw Error(h(188));return t!==e?null:e}for(var i=e,s=t;;){var o=i.return;if(o===null)break;var a=o.alternate;if(a===null){if(s=o.return,s!==null){i=s;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===i)return Vo(o),e;if(a===s)return Vo(o),t;a=a.sibling}throw Error(h(188))}if(i.return!==s.return)i=o,s=a;else{for(var f=!1,b=o.child;b;){if(b===i){f=!0,i=o,s=a;break}if(b===s){f=!0,s=o,i=a;break}b=b.sibling}if(!f){for(b=a.child;b;){if(b===i){f=!0,i=a,s=o;break}if(b===s){f=!0,s=a,i=o;break}b=b.sibling}if(!f)throw Error(h(189))}}if(i.alternate!==s)throw Error(h(190))}if(i.tag!==3)throw Error(h(188));return i.stateNode.current===i?e:t}function Ys(e){return e=ha(e),e!==null?Zs(e):null}function Zs(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Zs(e);if(t!==null)return t;e=e.sibling}return null}var Js=u.unstable_scheduleCallback,Xs=u.unstable_cancelCallback,Ks=u.unstable_shouldYield,Go=u.unstable_requestPaint,Et=u.unstable_now,ma=u.unstable_getCurrentPriorityLevel,hs=u.unstable_ImmediatePriority,qs=u.unstable_UserBlockingPriority,Ji=u.unstable_NormalPriority,Ar=u.unstable_LowPriority,ms=u.unstable_IdlePriority,er=null,yn=null;function gs(e){if(yn&&typeof yn.onCommitFiberRoot=="function")try{yn.onCommitFiberRoot(er,e,void 0,(e.current.flags&128)===128)}catch{}}var cn=Math.clz32?Math.clz32:ga,Yo=Math.log,co=Math.LN2;function ga(e){return e>>>=0,e===0?32:31-(Yo(e)/co|0)|0}var xs=64,$n=4194304;function si(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function tr(e,t){var i=e.pendingLanes;if(i===0)return 0;var s=0,o=e.suspendedLanes,a=e.pingedLanes,f=i&268435455;if(f!==0){var b=f&~o;b!==0?s=si(b):(a&=f,a!==0&&(s=si(a)))}else f=i&~o,f!==0?s=si(f):a!==0&&(s=si(a));if(s===0)return 0;if(t!==0&&t!==s&&(t&o)===0&&(o=s&-s,a=t&-t,o>=a||o===16&&(a&4194240)!==0))return t;if((s&4)!==0&&(s|=i&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)i=31-cn(t),o=1<<i,s|=e[i],t&=~o;return s}function Zo(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function qd(e,t){for(var i=e.suspendedLanes,s=e.pingedLanes,o=e.expirationTimes,a=e.pendingLanes;0<a;){var f=31-cn(a),b=1<<f,C=o[f];C===-1?((b&i)===0||(b&s)!==0)&&(o[f]=Zo(b,t)):C<=t&&(e.expiredLanes|=b),a&=~b}}function Jo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function xa(){var e=xs;return xs<<=1,(xs&4194240)===0&&(xs=64),e}function Xo(e){for(var t=[],i=0;31>i;i++)t.push(e);return t}function nr(e,t,i){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-cn(t),e[t]=i}function po(e,t){var i=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<i;){var o=31-cn(i),a=1<<o;t[o]=0,s[o]=-1,e[o]=-1,i&=~a}}function pn(e,t){var i=e.entangledLanes|=t;for(e=e.entanglements;i;){var s=31-cn(i),o=1<<s;o&t|e[s]&t&&(e[s]|=t),i&=~o}}var ut=0;function Vt(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var ys,it,ir,Ft,sr,zt=!1,Xi=[],lt=null,Bn=null,He=null,hi=new Map,ft=new Map,vn=[],mi="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ki(e,t){switch(e){case"focusin":case"focusout":lt=null;break;case"dragenter":case"dragleave":Bn=null;break;case"mouseover":case"mouseout":He=null;break;case"pointerover":case"pointerout":hi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ft.delete(t.pointerId)}}function Gt(e,t,i,s,o,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:i,eventSystemFlags:s,nativeEvent:a,targetContainers:[o]},t!==null&&(t=zo(t),t!==null&&it(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function En(e,t,i,s,o){switch(t){case"focusin":return lt=Gt(lt,e,t,i,s,o),!0;case"dragenter":return Bn=Gt(Bn,e,t,i,s,o),!0;case"mouseover":return He=Gt(He,e,t,i,s,o),!0;case"pointerover":var a=o.pointerId;return hi.set(a,Gt(hi.get(a)||null,e,t,i,s,o)),!0;case"gotpointercapture":return a=o.pointerId,ft.set(a,Gt(ft.get(a)||null,e,t,i,s,o)),!0}return!1}function _r(e){var t=fr(e.target);if(t!==null){var i=dn(t);if(i!==null){if(t=i.tag,t===13){if(t=ao(i),t!==null){e.blockedOn=t,sr(e.priority,function(){ir(i)});return}}else if(t===3&&i.stateNode.current.memoizedState.isDehydrated){e.blockedOn=i.tag===3?i.stateNode.containerInfo:null;return}}}e.blockedOn=null}function rr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var i=vs(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(i===null){i=e.nativeEvent;var s=new i.constructor(i.type,i);ui=s,i.target.dispatchEvent(s),ui=null}else return t=zo(i),t!==null&&it(t),e.blockedOn=i,!1;t.shift()}return!0}function at(e,t,i){rr(e)&&i.delete(t)}function _t(){zt=!1,lt!==null&&rr(lt)&&(lt=null),Bn!==null&&rr(Bn)&&(Bn=null),He!==null&&rr(He)&&(He=null),hi.forEach(at),ft.forEach(at)}function or(e,t){e.blockedOn===t&&(e.blockedOn=null,zt||(zt=!0,u.unstable_scheduleCallback(u.unstable_NormalPriority,_t)))}function lr(e){function t(o){return or(o,e)}if(0<Xi.length){or(Xi[0],e);for(var i=1;i<Xi.length;i++){var s=Xi[i];s.blockedOn===e&&(s.blockedOn=null)}}for(lt!==null&&or(lt,e),Bn!==null&&or(Bn,e),He!==null&&or(He,e),hi.forEach(t),ft.forEach(t),i=0;i<vn.length;i++)s=vn[i],s.blockedOn===e&&(s.blockedOn=null);for(;0<vn.length&&(i=vn[0],i.blockedOn===null);)_r(i),i.blockedOn===null&&vn.shift()}var Q=I.ReactCurrentBatchConfig,uo=!0;function Se(e,t,i,s){var o=ut,a=Q.transition;Q.transition=null;try{ut=1,ar(e,t,i,s)}finally{ut=o,Q.transition=a}}function Ko(e,t,i,s){var o=ut,a=Q.transition;Q.transition=null;try{ut=4,ar(e,t,i,s)}finally{ut=o,Q.transition=a}}function ar(e,t,i,s){if(uo){var o=vs(e,t,i,s);if(o===null)gi(e,t,s,Te,i),Ki(e,s);else if(En(o,e,t,i,s))s.stopPropagation();else if(Ki(e,s),t&4&&-1<mi.indexOf(e)){for(;o!==null;){var a=zo(o);if(a!==null&&ys(a),a=vs(e,t,i,s),a===null&&gi(e,t,s,Te,i),a===o)break;o=a}o!==null&&s.stopPropagation()}else gi(e,t,s,null,i)}}var Te=null;function vs(e,t,i,s){if(Te=null,e=Qs(s),e=fr(e),e!==null)if(t=dn(e),t===null)e=null;else if(i=t.tag,i===13){if(e=ao(t),e!==null)return e;e=null}else if(i===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Te=e,null}function qo(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ma()){case hs:return 1;case qs:return 4;case Ji:case Ar:return 16;case ms:return 536870912;default:return 16}default:return 16}}var Ti=null,dr=null,Tr=null;function el(){if(Tr)return Tr;var e,t=dr,i=t.length,s,o="value"in Ti?Ti.value:Ti.textContent,a=o.length;for(e=0;e<i&&t[e]===o[e];e++);var f=i-e;for(s=1;s<=f&&t[i-s]===o[a-s];s++);return Tr=o.slice(e,1<s?1-s:void 0)}function Pr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Or(){return!0}function tl(){return!1}function jt(e){function t(i,s,o,a,f){this._reactName=i,this._targetInst=o,this.type=s,this.nativeEvent=a,this.target=f,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(i=e[b],this[b]=i?i(a):a[b]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Or:tl,this.isPropagationStopped=tl,this}return y(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var i=this.nativeEvent;i&&(i.preventDefault?i.preventDefault():typeof i.returnValue!="unknown"&&(i.returnValue=!1),this.isDefaultPrevented=Or)},stopPropagation:function(){var i=this.nativeEvent;i&&(i.stopPropagation?i.stopPropagation():typeof i.cancelBubble!="unknown"&&(i.cancelBubble=!0),this.isPropagationStopped=Or)},persist:function(){},isPersistent:Or}),t}var zn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ut=jt(zn),bs=y({},zn,{view:0,detail:0}),ya=jt(bs),fo,Pi,ws,cr=y({},bs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ws&&(ws&&e.type==="mousemove"?(fo=e.screenX-ws.screenX,Pi=e.screenY-ws.screenY):Pi=fo=0,ws=e),fo)},movementY:function(e){return"movementY"in e?e.movementY:Pi}}),Ir=jt(cr),va=y({},cr,{dataTransfer:0}),ba=jt(va),nl=y({},bs,{relatedTarget:0}),Ss=jt(nl),ks=y({},zn,{animationName:0,elapsedTime:0,pseudoElement:0}),js=jt(ks),Cs=y({},zn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ns=jt(Cs),$s=y({},zn,{data:0}),qi=jt($s),wa={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ho={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},il={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sl(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=il[e])?!!t[e]:!1}function Rr(){return sl}var Sa=y({},bs,{key:function(e){if(e.key){var t=wa[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Pr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ho[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rr,charCode:function(e){return e.type==="keypress"?Pr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),rl=jt(Sa),ka=y({},cr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),mo=jt(ka),ol=y({},bs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rr}),ja=jt(ol),Ca=y({},zn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Na=jt(Ca),$a=y({},cr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ea=jt($a),za=[9,13,27,32],go=T&&"CompositionEvent"in window,pr=null;T&&"documentMode"in document&&(pr=document.documentMode);var Da=T&&"TextEvent"in window&&!pr,xo=T&&(!go||pr&&8<pr&&11>=pr),yo=" ",vo=!1;function bo(e,t){switch(e){case"keyup":return za.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function wo(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var es=!1;function ll(e,t){switch(e){case"compositionend":return wo(t);case"keypress":return t.which!==32?null:(vo=!0,yo);case"textInput":return e=t.data,e===yo&&vo?null:e;default:return null}}function al(e,t){if(es)return e==="compositionend"||!go&&bo(e,t)?(e=el(),Tr=dr=Ti=null,es=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return xo&&t.locale!=="ko"?null:t.data;default:return null}}var dl={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function So(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!dl[e.type]:t==="textarea"}function ko(e,t,i,s){Ai(s),t=ct(t,"onChange"),0<t.length&&(i=new Ut("onChange","change",null,i,s),e.push({event:i,listeners:t}))}var Es=null,zs=null;function cl(e){bn(e,0)}function ur(e){var t=Wr(e);if(yt(t))return e}function pl(e,t){if(e==="change")return t}var jo=!1;if(T){var Br;if(T){var Lr="oninput"in document;if(!Lr){var Co=document.createElement("div");Co.setAttribute("oninput","return;"),Lr=typeof Co.oninput=="function"}Br=Lr}else Br=!1;jo=Br&&(!document.documentMode||9<document.documentMode)}function No(){Es&&(Es.detachEvent("onpropertychange",$o),zs=Es=null)}function $o(e){if(e.propertyName==="value"&&ur(zs)){var t=[];ko(t,zs,e,Qs(e)),Gi(cl,t)}}function ul(e,t,i){e==="focusin"?(No(),Es=t,zs=i,Es.attachEvent("onpropertychange",$o)):e==="focusout"&&No()}function fl(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ur(zs)}function hl(e,t){if(e==="click")return ur(t)}function ml(e,t){if(e==="input"||e==="change")return ur(t)}function r(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var c=typeof Object.is=="function"?Object.is:r;function m(e,t){if(c(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var i=Object.keys(e),s=Object.keys(t);if(i.length!==s.length)return!1;for(s=0;s<i.length;s++){var o=i[s];if(!W.call(t,o)||!c(e[o],t[o]))return!1}return!0}function g(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function x(e,t){var i=g(e);e=0;for(var s;i;){if(i.nodeType===3){if(s=e+i.textContent.length,e<=t&&s>=t)return{node:i,offset:t-e};e=s}e:{for(;i;){if(i.nextSibling){i=i.nextSibling;break e}i=i.parentNode}i=void 0}i=g(i)}}function N(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?N(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function X(){for(var e=window,t=mn();t instanceof e.HTMLIFrameElement;){try{var i=typeof t.contentWindow.location.href=="string"}catch{i=!1}if(i)e=t.contentWindow;else break;t=mn(e.document)}return t}function be(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function ke(e){var t=X(),i=e.focusedElem,s=e.selectionRange;if(t!==i&&i&&i.ownerDocument&&N(i.ownerDocument.documentElement,i)){if(s!==null&&be(i)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in i)i.selectionStart=t,i.selectionEnd=Math.min(e,i.value.length);else if(e=(t=i.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=i.textContent.length,a=Math.min(s.start,o);s=s.end===void 0?a:Math.min(s.end,o),!e.extend&&a>s&&(o=s,s=a,a=o),o=x(i,a);var f=x(i,s);o&&f&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==f.node||e.focusOffset!==f.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),a>s?(e.addRange(t),e.extend(f.node,f.offset)):(t.setEnd(f.node,f.offset),e.addRange(t)))}}for(t=[],e=i;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof i.focus=="function"&&i.focus(),i=0;i<t.length;i++)e=t[i],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var K=T&&"documentMode"in document&&11>=document.documentMode,q=null,ue=null,Ce=null,De=!1;function Oe(e,t,i){var s=i.window===i?i.document:i.nodeType===9?i:i.ownerDocument;De||q==null||q!==mn(s)||(s=q,"selectionStart"in s&&be(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Ce&&m(Ce,s)||(Ce=s,s=ct(ue,"onSelect"),0<s.length&&(t=new Ut("onSelect","select",null,t,i),e.push({event:t,listeners:s}),t.target=q)))}function Fe(e,t){var i={};return i[e.toLowerCase()]=t.toLowerCase(),i["Webkit"+e]="webkit"+t,i["Moz"+e]="moz"+t,i}var dt={animationend:Fe("Animation","AnimationEnd"),animationiteration:Fe("Animation","AnimationIteration"),animationstart:Fe("Animation","AnimationStart"),transitionend:Fe("Transition","TransitionEnd")},Bt={},un={};T&&(un=document.createElement("div").style,"AnimationEvent"in window||(delete dt.animationend.animation,delete dt.animationiteration.animation,delete dt.animationstart.animation),"TransitionEvent"in window||delete dt.transitionend.transition);function he(e){if(Bt[e])return Bt[e];if(!dt[e])return e;var t=dt[e],i;for(i in t)if(t.hasOwnProperty(i)&&i in un)return Bt[e]=t[i];return e}var Re=he("animationend"),Z=he("animationiteration"),Ge=he("animationstart"),Qe=he("transitionend"),se=new Map,gt="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function st(e,t){se.set(e,t),k(t,[e])}for(var bt=0;bt<gt.length;bt++){var ht=gt[bt],Dt=ht.toLowerCase(),Ht=ht[0].toUpperCase()+ht.slice(1);st(Dt,"on"+Ht)}st(Re,"onAnimationEnd"),st(Z,"onAnimationIteration"),st(Ge,"onAnimationStart"),st("dblclick","onDoubleClick"),st("focusin","onFocus"),st("focusout","onBlur"),st(Qe,"onTransitionEnd"),L("onMouseEnter",["mouseout","mouseover"]),L("onMouseLeave",["mouseout","mouseover"]),L("onPointerEnter",["pointerout","pointerover"]),L("onPointerLeave",["pointerout","pointerover"]),k("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),k("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),k("onBeforeInput",["compositionend","keypress","textInput","paste"]),k("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),k("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),k("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var je="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qe=new Set("cancel close invalid load scroll toggle".split(" ").concat(je));function Ct(e,t,i){var s=e.type||"unknown-event";e.currentTarget=i,lo(s,t,void 0,e),e.currentTarget=null}function bn(e,t){t=(t&4)!==0;for(var i=0;i<e.length;i++){var s=e[i],o=s.event;s=s.listeners;e:{var a=void 0;if(t)for(var f=s.length-1;0<=f;f--){var b=s[f],C=b.instance,U=b.currentTarget;if(b=b.listener,C!==a&&o.isPropagationStopped())break e;Ct(o,b,U),a=C}else for(f=0;f<s.length;f++){if(b=s[f],C=b.instance,U=b.currentTarget,b=b.listener,C!==a&&o.isPropagationStopped())break e;Ct(o,b,U),a=C}}}if(ii)throw e=Vs,ii=!1,Vs=null,e}function xt(e,t){var i=t[Ia];i===void 0&&(i=t[Ia]=new Set);var s=e+"__bubble";i.has(s)||(Lt(t,e,2,!1),i.add(s))}function Dn(e,t,i){var s=0;t&&(s|=4),Lt(i,e,s,t)}var nt="_reactListening"+Math.random().toString(36).slice(2);function Ue(e){if(!e[nt]){e[nt]=!0,S.forEach(function(i){i!=="selectionchange"&&(qe.has(i)||Dn(i,!1,e),Dn(i,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[nt]||(t[nt]=!0,Dn("selectionchange",!1,t))}}function Lt(e,t,i,s){switch(qo(t)){case 1:var o=Se;break;case 4:o=Ko;break;default:o=ar}i=o.bind(null,t,i,e),o=void 0,!Yi||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),s?o!==void 0?e.addEventListener(t,i,{capture:!0,passive:o}):e.addEventListener(t,i,!0):o!==void 0?e.addEventListener(t,i,{passive:o}):e.addEventListener(t,i,!1)}function gi(e,t,i,s,o){var a=s;if((t&1)===0&&(t&2)===0&&s!==null)e:for(;;){if(s===null)return;var f=s.tag;if(f===3||f===4){var b=s.stateNode.containerInfo;if(b===o||b.nodeType===8&&b.parentNode===o)break;if(f===4)for(f=s.return;f!==null;){var C=f.tag;if((C===3||C===4)&&(C=f.stateNode.containerInfo,C===o||C.nodeType===8&&C.parentNode===o))return;f=f.return}for(;b!==null;){if(f=fr(b),f===null)return;if(C=f.tag,C===5||C===6){s=a=f;continue e}b=b.parentNode}}s=s.return}Gi(function(){var U=a,me=Qs(i),ge=[];e:{var fe=se.get(e);if(fe!==void 0){var Pe=Ut,Be=e;switch(e){case"keypress":if(Pr(i)===0)break e;case"keydown":case"keyup":Pe=rl;break;case"focusin":Be="focus",Pe=Ss;break;case"focusout":Be="blur",Pe=Ss;break;case"beforeblur":case"afterblur":Pe=Ss;break;case"click":if(i.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Pe=Ir;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Pe=ba;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Pe=ja;break;case Re:case Z:case Ge:Pe=js;break;case Qe:Pe=Na;break;case"scroll":Pe=ya;break;case"wheel":Pe=Ea;break;case"copy":case"cut":case"paste":Pe=Ns;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Pe=mo}var Le=(t&4)!==0,Yt=!Le&&e==="scroll",B=Le?fe!==null?fe+"Capture":null:fe;Le=[];for(var _=U,M;_!==null;){M=_;var we=M.stateNode;if(M.tag===5&&we!==null&&(M=we,B!==null&&(we=ni(_,B),we!=null&&Le.push(xi(_,we,M)))),Yt)break;_=_.return}0<Le.length&&(fe=new Pe(fe,Be,null,i,me),ge.push({event:fe,listeners:Le}))}}if((t&7)===0){e:{if(fe=e==="mouseover"||e==="pointerover",Pe=e==="mouseout"||e==="pointerout",fe&&i!==ui&&(Be=i.relatedTarget||i.fromElement)&&(fr(Be)||Be[ts]))break e;if((Pe||fe)&&(fe=me.window===me?me:(fe=me.ownerDocument)?fe.defaultView||fe.parentWindow:window,Pe?(Be=i.relatedTarget||i.toElement,Pe=U,Be=Be?fr(Be):null,Be!==null&&(Yt=dn(Be),Be!==Yt||Be.tag!==5&&Be.tag!==6)&&(Be=null)):(Pe=null,Be=U),Pe!==Be)){if(Le=Ir,we="onMouseLeave",B="onMouseEnter",_="mouse",(e==="pointerout"||e==="pointerover")&&(Le=mo,we="onPointerLeave",B="onPointerEnter",_="pointer"),Yt=Pe==null?fe:Wr(Pe),M=Be==null?fe:Wr(Be),fe=new Le(we,_+"leave",Pe,i,me),fe.target=Yt,fe.relatedTarget=M,we=null,fr(me)===U&&(Le=new Le(B,_+"enter",Be,i,me),Le.target=M,Le.relatedTarget=Yt,we=Le),Yt=we,Pe&&Be)t:{for(Le=Pe,B=Be,_=0,M=Le;M;M=Je(M))_++;for(M=0,we=B;we;we=Je(we))M++;for(;0<_-M;)Le=Je(Le),_--;for(;0<M-_;)B=Je(B),M--;for(;_--;){if(Le===B||B!==null&&Le===B.alternate)break t;Le=Je(Le),B=Je(B)}Le=null}else Le=null;Pe!==null&&St(ge,fe,Pe,Le,!1),Be!==null&&Yt!==null&&St(ge,Yt,Be,Le,!0)}}e:{if(fe=U?Wr(U):window,Pe=fe.nodeName&&fe.nodeName.toLowerCase(),Pe==="select"||Pe==="input"&&fe.type==="file")var We=pl;else if(So(fe))if(jo)We=ml;else{We=fl;var Ye=ul}else(Pe=fe.nodeName)&&Pe.toLowerCase()==="input"&&(fe.type==="checkbox"||fe.type==="radio")&&(We=hl);if(We&&(We=We(e,U))){ko(ge,We,i,me);break e}Ye&&Ye(e,fe,U),e==="focusout"&&(Ye=fe._wrapperState)&&Ye.controlled&&fe.type==="number"&&Gn(fe,"number",fe.value)}switch(Ye=U?Wr(U):window,e){case"focusin":(So(Ye)||Ye.contentEditable==="true")&&(q=Ye,ue=U,Ce=null);break;case"focusout":Ce=ue=q=null;break;case"mousedown":De=!0;break;case"contextmenu":case"mouseup":case"dragend":De=!1,Oe(ge,i,me);break;case"selectionchange":if(K)break;case"keydown":case"keyup":Oe(ge,i,me)}var Ze;if(go)e:{switch(e){case"compositionstart":var et="onCompositionStart";break e;case"compositionend":et="onCompositionEnd";break e;case"compositionupdate":et="onCompositionUpdate";break e}et=void 0}else es?bo(e,i)&&(et="onCompositionEnd"):e==="keydown"&&i.keyCode===229&&(et="onCompositionStart");et&&(xo&&i.locale!=="ko"&&(es||et!=="onCompositionStart"?et==="onCompositionEnd"&&es&&(Ze=el()):(Ti=me,dr="value"in Ti?Ti.value:Ti.textContent,es=!0)),Ye=ct(U,et),0<Ye.length&&(et=new qi(et,e,null,i,me),ge.push({event:et,listeners:Ye}),Ze?et.data=Ze:(Ze=wo(i),Ze!==null&&(et.data=Ze)))),(Ze=Da?ll(e,i):al(e,i))&&(U=ct(U,"onBeforeInput"),0<U.length&&(me=new qi("onBeforeInput","beforeinput",null,i,me),ge.push({event:me,listeners:U}),me.data=Ze))}bn(ge,t)})}function xi(e,t,i){return{instance:e,listener:t,currentTarget:i}}function ct(e,t){for(var i=t+"Capture",s=[];e!==null;){var o=e,a=o.stateNode;o.tag===5&&a!==null&&(o=a,a=ni(e,i),a!=null&&s.unshift(xi(e,a,o)),a=ni(e,t),a!=null&&s.push(xi(e,a,o))),e=e.return}return s}function Je(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function St(e,t,i,s,o){for(var a=t._reactName,f=[];i!==null&&i!==s;){var b=i,C=b.alternate,U=b.stateNode;if(C!==null&&C===s)break;b.tag===5&&U!==null&&(b=U,o?(C=ni(i,a),C!=null&&f.unshift(xi(i,C,b))):o||(C=ni(i,a),C!=null&&f.push(xi(i,C,b)))),i=i.return}f.length!==0&&e.push({event:t,listeners:f})}var ou=/\r\n?/g,lu=/\u0000|\uFFFD/g;function ec(e){return(typeof e=="string"?e:""+e).replace(ou,`
`).replace(lu,"")}function gl(e,t,i){if(t=ec(t),ec(e)!==t&&i)throw Error(h(425))}function xl(){}var Aa=null,_a=null;function Ta(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Pa=typeof setTimeout=="function"?setTimeout:void 0,au=typeof clearTimeout=="function"?clearTimeout:void 0,tc=typeof Promise=="function"?Promise:void 0,du=typeof queueMicrotask=="function"?queueMicrotask:typeof tc<"u"?function(e){return tc.resolve(null).then(e).catch(cu)}:Pa;function cu(e){setTimeout(function(){throw e})}function Oa(e,t){var i=t,s=0;do{var o=i.nextSibling;if(e.removeChild(i),o&&o.nodeType===8)if(i=o.data,i==="/$"){if(s===0){e.removeChild(o),lr(t);return}s--}else i!=="$"&&i!=="$?"&&i!=="$!"||s++;i=o}while(i);lr(t)}function Ds(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function nc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var i=e.data;if(i==="$"||i==="$!"||i==="$?"){if(t===0)return e;t--}else i==="/$"&&t++}e=e.previousSibling}return null}var Mr=Math.random().toString(36).slice(2),Oi="__reactFiber$"+Mr,Eo="__reactProps$"+Mr,ts="__reactContainer$"+Mr,Ia="__reactEvents$"+Mr,pu="__reactListeners$"+Mr,uu="__reactHandles$"+Mr;function fr(e){var t=e[Oi];if(t)return t;for(var i=e.parentNode;i;){if(t=i[ts]||i[Oi]){if(i=t.alternate,t.child!==null||i!==null&&i.child!==null)for(e=nc(e);e!==null;){if(i=e[Oi])return i;e=nc(e)}return t}e=i,i=e.parentNode}return null}function zo(e){return e=e[Oi]||e[ts],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Wr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(h(33))}function yl(e){return e[Eo]||null}var Ra=[],Fr=-1;function As(e){return{current:e}}function Tt(e){0>Fr||(e.current=Ra[Fr],Ra[Fr]=null,Fr--)}function At(e,t){Fr++,Ra[Fr]=e.current,e.current=t}var _s={},wn=As(_s),Ln=As(!1),hr=_s;function Ur(e,t){var i=e.type.contextTypes;if(!i)return _s;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var o={},a;for(a in i)o[a]=t[a];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Mn(e){return e=e.childContextTypes,e!=null}function vl(){Tt(Ln),Tt(wn)}function ic(e,t,i){if(wn.current!==_s)throw Error(h(168));At(wn,t),At(Ln,i)}function sc(e,t,i){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return i;s=s.getChildContext();for(var o in s)if(!(o in t))throw Error(h(108,_e(e)||"Unknown",o));return y({},i,s)}function bl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||_s,hr=wn.current,At(wn,e),At(Ln,Ln.current),!0}function rc(e,t,i){var s=e.stateNode;if(!s)throw Error(h(169));i?(e=sc(e,t,hr),s.__reactInternalMemoizedMergedChildContext=e,Tt(Ln),Tt(wn),At(wn,e)):Tt(Ln),At(Ln,i)}var ns=null,wl=!1,Ba=!1;function oc(e){ns===null?ns=[e]:ns.push(e)}function fu(e){wl=!0,oc(e)}function Ts(){if(!Ba&&ns!==null){Ba=!0;var e=0,t=ut;try{var i=ns;for(ut=1;e<i.length;e++){var s=i[e];do s=s(!0);while(s!==null)}ns=null,wl=!1}catch(o){throw ns!==null&&(ns=ns.slice(e+1)),Js(hs,Ts),o}finally{ut=t,Ba=!1}}return null}var Hr=[],Qr=0,Sl=null,kl=0,ri=[],oi=0,mr=null,is=1,ss="";function gr(e,t){Hr[Qr++]=kl,Hr[Qr++]=Sl,Sl=e,kl=t}function lc(e,t,i){ri[oi++]=is,ri[oi++]=ss,ri[oi++]=mr,mr=e;var s=is;e=ss;var o=32-cn(s)-1;s&=~(1<<o),i+=1;var a=32-cn(t)+o;if(30<a){var f=o-o%5;a=(s&(1<<f)-1).toString(32),s>>=f,o-=f,is=1<<32-cn(t)+o|i<<o|s,ss=a+e}else is=1<<a|i<<o|s,ss=e}function La(e){e.return!==null&&(gr(e,1),lc(e,1,0))}function Ma(e){for(;e===Sl;)Sl=Hr[--Qr],Hr[Qr]=null,kl=Hr[--Qr],Hr[Qr]=null;for(;e===mr;)mr=ri[--oi],ri[oi]=null,ss=ri[--oi],ri[oi]=null,is=ri[--oi],ri[oi]=null}var Kn=null,qn=null,Ot=!1,yi=null;function ac(e,t){var i=ci(5,null,null,0);i.elementType="DELETED",i.stateNode=t,i.return=e,t=e.deletions,t===null?(e.deletions=[i],e.flags|=16):t.push(i)}function dc(e,t){switch(e.tag){case 5:var i=e.type;return t=t.nodeType!==1||i.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Kn=e,qn=Ds(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Kn=e,qn=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(i=mr!==null?{id:is,overflow:ss}:null,e.memoizedState={dehydrated:t,treeContext:i,retryLane:1073741824},i=ci(18,null,null,0),i.stateNode=t,i.return=e,e.child=i,Kn=e,qn=null,!0):!1;default:return!1}}function Wa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Fa(e){if(Ot){var t=qn;if(t){var i=t;if(!dc(e,t)){if(Wa(e))throw Error(h(418));t=Ds(i.nextSibling);var s=Kn;t&&dc(e,t)?ac(s,i):(e.flags=e.flags&-4097|2,Ot=!1,Kn=e)}}else{if(Wa(e))throw Error(h(418));e.flags=e.flags&-4097|2,Ot=!1,Kn=e}}}function cc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Kn=e}function jl(e){if(e!==Kn)return!1;if(!Ot)return cc(e),Ot=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ta(e.type,e.memoizedProps)),t&&(t=qn)){if(Wa(e))throw pc(),Error(h(418));for(;t;)ac(e,t),t=Ds(t.nextSibling)}if(cc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(h(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var i=e.data;if(i==="/$"){if(t===0){qn=Ds(e.nextSibling);break e}t--}else i!=="$"&&i!=="$!"&&i!=="$?"||t++}e=e.nextSibling}qn=null}}else qn=Kn?Ds(e.stateNode.nextSibling):null;return!0}function pc(){for(var e=qn;e;)e=Ds(e.nextSibling)}function Vr(){qn=Kn=null,Ot=!1}function Ua(e){yi===null?yi=[e]:yi.push(e)}var hu=I.ReactCurrentBatchConfig;function Do(e,t,i){if(e=i.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(i._owner){if(i=i._owner,i){if(i.tag!==1)throw Error(h(309));var s=i.stateNode}if(!s)throw Error(h(147,e));var o=s,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(f){var b=o.refs;f===null?delete b[a]:b[a]=f},t._stringRef=a,t)}if(typeof e!="string")throw Error(h(284));if(!i._owner)throw Error(h(290,e))}return e}function Cl(e,t){throw e=Object.prototype.toString.call(t),Error(h(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function uc(e){var t=e._init;return t(e._payload)}function fc(e){function t(B,_){if(e){var M=B.deletions;M===null?(B.deletions=[_],B.flags|=16):M.push(_)}}function i(B,_){if(!e)return null;for(;_!==null;)t(B,_),_=_.sibling;return null}function s(B,_){for(B=new Map;_!==null;)_.key!==null?B.set(_.key,_):B.set(_.index,_),_=_.sibling;return B}function o(B,_){return B=Ws(B,_),B.index=0,B.sibling=null,B}function a(B,_,M){return B.index=M,e?(M=B.alternate,M!==null?(M=M.index,M<_?(B.flags|=2,_):M):(B.flags|=2,_)):(B.flags|=1048576,_)}function f(B){return e&&B.alternate===null&&(B.flags|=2),B}function b(B,_,M,we){return _===null||_.tag!==6?(_=Pd(M,B.mode,we),_.return=B,_):(_=o(_,M),_.return=B,_)}function C(B,_,M,we){var We=M.type;return We===O?me(B,_,M.props.children,we,M.key):_!==null&&(_.elementType===We||typeof We=="object"&&We!==null&&We.$$typeof===A&&uc(We)===_.type)?(we=o(_,M.props),we.ref=Do(B,_,M),we.return=B,we):(we=Zl(M.type,M.key,M.props,null,B.mode,we),we.ref=Do(B,_,M),we.return=B,we)}function U(B,_,M,we){return _===null||_.tag!==4||_.stateNode.containerInfo!==M.containerInfo||_.stateNode.implementation!==M.implementation?(_=Od(M,B.mode,we),_.return=B,_):(_=o(_,M.children||[]),_.return=B,_)}function me(B,_,M,we,We){return _===null||_.tag!==7?(_=jr(M,B.mode,we,We),_.return=B,_):(_=o(_,M),_.return=B,_)}function ge(B,_,M){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Pd(""+_,B.mode,M),_.return=B,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case v:return M=Zl(_.type,_.key,_.props,null,B.mode,M),M.ref=Do(B,null,_),M.return=B,M;case re:return _=Od(_,B.mode,M),_.return=B,_;case A:var we=_._init;return ge(B,we(_._payload),M)}if(Hi(_)||ae(_))return _=jr(_,B.mode,M,null),_.return=B,_;Cl(B,_)}return null}function fe(B,_,M,we){var We=_!==null?_.key:null;if(typeof M=="string"&&M!==""||typeof M=="number")return We!==null?null:b(B,_,""+M,we);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case v:return M.key===We?C(B,_,M,we):null;case re:return M.key===We?U(B,_,M,we):null;case A:return We=M._init,fe(B,_,We(M._payload),we)}if(Hi(M)||ae(M))return We!==null?null:me(B,_,M,we,null);Cl(B,M)}return null}function Pe(B,_,M,we,We){if(typeof we=="string"&&we!==""||typeof we=="number")return B=B.get(M)||null,b(_,B,""+we,We);if(typeof we=="object"&&we!==null){switch(we.$$typeof){case v:return B=B.get(we.key===null?M:we.key)||null,C(_,B,we,We);case re:return B=B.get(we.key===null?M:we.key)||null,U(_,B,we,We);case A:var Ye=we._init;return Pe(B,_,M,Ye(we._payload),We)}if(Hi(we)||ae(we))return B=B.get(M)||null,me(_,B,we,We,null);Cl(_,we)}return null}function Be(B,_,M,we){for(var We=null,Ye=null,Ze=_,et=_=0,ln=null;Ze!==null&&et<M.length;et++){Ze.index>et?(ln=Ze,Ze=null):ln=Ze.sibling;var kt=fe(B,Ze,M[et],we);if(kt===null){Ze===null&&(Ze=ln);break}e&&Ze&&kt.alternate===null&&t(B,Ze),_=a(kt,_,et),Ye===null?We=kt:Ye.sibling=kt,Ye=kt,Ze=ln}if(et===M.length)return i(B,Ze),Ot&&gr(B,et),We;if(Ze===null){for(;et<M.length;et++)Ze=ge(B,M[et],we),Ze!==null&&(_=a(Ze,_,et),Ye===null?We=Ze:Ye.sibling=Ze,Ye=Ze);return Ot&&gr(B,et),We}for(Ze=s(B,Ze);et<M.length;et++)ln=Pe(Ze,B,et,M[et],we),ln!==null&&(e&&ln.alternate!==null&&Ze.delete(ln.key===null?et:ln.key),_=a(ln,_,et),Ye===null?We=ln:Ye.sibling=ln,Ye=ln);return e&&Ze.forEach(function(Fs){return t(B,Fs)}),Ot&&gr(B,et),We}function Le(B,_,M,we){var We=ae(M);if(typeof We!="function")throw Error(h(150));if(M=We.call(M),M==null)throw Error(h(151));for(var Ye=We=null,Ze=_,et=_=0,ln=null,kt=M.next();Ze!==null&&!kt.done;et++,kt=M.next()){Ze.index>et?(ln=Ze,Ze=null):ln=Ze.sibling;var Fs=fe(B,Ze,kt.value,we);if(Fs===null){Ze===null&&(Ze=ln);break}e&&Ze&&Fs.alternate===null&&t(B,Ze),_=a(Fs,_,et),Ye===null?We=Fs:Ye.sibling=Fs,Ye=Fs,Ze=ln}if(kt.done)return i(B,Ze),Ot&&gr(B,et),We;if(Ze===null){for(;!kt.done;et++,kt=M.next())kt=ge(B,kt.value,we),kt!==null&&(_=a(kt,_,et),Ye===null?We=kt:Ye.sibling=kt,Ye=kt);return Ot&&gr(B,et),We}for(Ze=s(B,Ze);!kt.done;et++,kt=M.next())kt=Pe(Ze,B,et,kt.value,we),kt!==null&&(e&&kt.alternate!==null&&Ze.delete(kt.key===null?et:kt.key),_=a(kt,_,et),Ye===null?We=kt:Ye.sibling=kt,Ye=kt);return e&&Ze.forEach(function(Gu){return t(B,Gu)}),Ot&&gr(B,et),We}function Yt(B,_,M,we){if(typeof M=="object"&&M!==null&&M.type===O&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case v:e:{for(var We=M.key,Ye=_;Ye!==null;){if(Ye.key===We){if(We=M.type,We===O){if(Ye.tag===7){i(B,Ye.sibling),_=o(Ye,M.props.children),_.return=B,B=_;break e}}else if(Ye.elementType===We||typeof We=="object"&&We!==null&&We.$$typeof===A&&uc(We)===Ye.type){i(B,Ye.sibling),_=o(Ye,M.props),_.ref=Do(B,Ye,M),_.return=B,B=_;break e}i(B,Ye);break}else t(B,Ye);Ye=Ye.sibling}M.type===O?(_=jr(M.props.children,B.mode,we,M.key),_.return=B,B=_):(we=Zl(M.type,M.key,M.props,null,B.mode,we),we.ref=Do(B,_,M),we.return=B,B=we)}return f(B);case re:e:{for(Ye=M.key;_!==null;){if(_.key===Ye)if(_.tag===4&&_.stateNode.containerInfo===M.containerInfo&&_.stateNode.implementation===M.implementation){i(B,_.sibling),_=o(_,M.children||[]),_.return=B,B=_;break e}else{i(B,_);break}else t(B,_);_=_.sibling}_=Od(M,B.mode,we),_.return=B,B=_}return f(B);case A:return Ye=M._init,Yt(B,_,Ye(M._payload),we)}if(Hi(M))return Be(B,_,M,we);if(ae(M))return Le(B,_,M,we);Cl(B,M)}return typeof M=="string"&&M!==""||typeof M=="number"?(M=""+M,_!==null&&_.tag===6?(i(B,_.sibling),_=o(_,M),_.return=B,B=_):(i(B,_),_=Pd(M,B.mode,we),_.return=B,B=_),f(B)):i(B,_)}return Yt}var Gr=fc(!0),hc=fc(!1),Nl=As(null),$l=null,Yr=null,Ha=null;function Qa(){Ha=Yr=$l=null}function Va(e){var t=Nl.current;Tt(Nl),e._currentValue=t}function Ga(e,t,i){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===i)break;e=e.return}}function Zr(e,t){$l=e,Ha=Yr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Wn=!0),e.firstContext=null)}function li(e){var t=e._currentValue;if(Ha!==e)if(e={context:e,memoizedValue:t,next:null},Yr===null){if($l===null)throw Error(h(308));Yr=e,$l.dependencies={lanes:0,firstContext:e}}else Yr=Yr.next=e;return t}var xr=null;function Ya(e){xr===null?xr=[e]:xr.push(e)}function mc(e,t,i,s){var o=t.interleaved;return o===null?(i.next=i,Ya(t)):(i.next=o.next,o.next=i),t.interleaved=i,rs(e,s)}function rs(e,t){e.lanes|=t;var i=e.alternate;for(i!==null&&(i.lanes|=t),i=e,e=e.return;e!==null;)e.childLanes|=t,i=e.alternate,i!==null&&(i.childLanes|=t),i=e,e=e.return;return i.tag===3?i.stateNode:null}var Ps=!1;function Za(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function gc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function os(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Os(e,t,i){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,(wt&2)!==0){var o=s.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),s.pending=t,rs(e,i)}return o=s.interleaved,o===null?(t.next=t,Ya(s)):(t.next=o.next,o.next=t),s.interleaved=t,rs(e,i)}function El(e,t,i){if(t=t.updateQueue,t!==null&&(t=t.shared,(i&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,i|=s,t.lanes=i,pn(e,i)}}function xc(e,t){var i=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,i===s)){var o=null,a=null;if(i=i.firstBaseUpdate,i!==null){do{var f={eventTime:i.eventTime,lane:i.lane,tag:i.tag,payload:i.payload,callback:i.callback,next:null};a===null?o=a=f:a=a.next=f,i=i.next}while(i!==null);a===null?o=a=t:a=a.next=t}else o=a=t;i={baseState:s.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:s.shared,effects:s.effects},e.updateQueue=i;return}e=i.lastBaseUpdate,e===null?i.firstBaseUpdate=t:e.next=t,i.lastBaseUpdate=t}function zl(e,t,i,s){var o=e.updateQueue;Ps=!1;var a=o.firstBaseUpdate,f=o.lastBaseUpdate,b=o.shared.pending;if(b!==null){o.shared.pending=null;var C=b,U=C.next;C.next=null,f===null?a=U:f.next=U,f=C;var me=e.alternate;me!==null&&(me=me.updateQueue,b=me.lastBaseUpdate,b!==f&&(b===null?me.firstBaseUpdate=U:b.next=U,me.lastBaseUpdate=C))}if(a!==null){var ge=o.baseState;f=0,me=U=C=null,b=a;do{var fe=b.lane,Pe=b.eventTime;if((s&fe)===fe){me!==null&&(me=me.next={eventTime:Pe,lane:0,tag:b.tag,payload:b.payload,callback:b.callback,next:null});e:{var Be=e,Le=b;switch(fe=t,Pe=i,Le.tag){case 1:if(Be=Le.payload,typeof Be=="function"){ge=Be.call(Pe,ge,fe);break e}ge=Be;break e;case 3:Be.flags=Be.flags&-65537|128;case 0:if(Be=Le.payload,fe=typeof Be=="function"?Be.call(Pe,ge,fe):Be,fe==null)break e;ge=y({},ge,fe);break e;case 2:Ps=!0}}b.callback!==null&&b.lane!==0&&(e.flags|=64,fe=o.effects,fe===null?o.effects=[b]:fe.push(b))}else Pe={eventTime:Pe,lane:fe,tag:b.tag,payload:b.payload,callback:b.callback,next:null},me===null?(U=me=Pe,C=ge):me=me.next=Pe,f|=fe;if(b=b.next,b===null){if(b=o.shared.pending,b===null)break;fe=b,b=fe.next,fe.next=null,o.lastBaseUpdate=fe,o.shared.pending=null}}while(!0);if(me===null&&(C=ge),o.baseState=C,o.firstBaseUpdate=U,o.lastBaseUpdate=me,t=o.shared.interleaved,t!==null){o=t;do f|=o.lane,o=o.next;while(o!==t)}else a===null&&(o.shared.lanes=0);br|=f,e.lanes=f,e.memoizedState=ge}}function yc(e,t,i){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],o=s.callback;if(o!==null){if(s.callback=null,s=i,typeof o!="function")throw Error(h(191,o));o.call(s)}}}var Ao={},Ii=As(Ao),_o=As(Ao),To=As(Ao);function yr(e){if(e===Ao)throw Error(h(174));return e}function Ja(e,t){switch(At(To,t),At(_o,e),At(Ii,Ao),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ei(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ei(t,e)}Tt(Ii),At(Ii,t)}function Jr(){Tt(Ii),Tt(_o),Tt(To)}function vc(e){yr(To.current);var t=yr(Ii.current),i=Ei(t,e.type);t!==i&&(At(_o,e),At(Ii,i))}function Xa(e){_o.current===e&&(Tt(Ii),Tt(_o))}var Mt=As(0);function Dl(e){for(var t=e;t!==null;){if(t.tag===13){var i=t.memoizedState;if(i!==null&&(i=i.dehydrated,i===null||i.data==="$?"||i.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ka=[];function qa(){for(var e=0;e<Ka.length;e++)Ka[e]._workInProgressVersionPrimary=null;Ka.length=0}var Al=I.ReactCurrentDispatcher,ed=I.ReactCurrentBatchConfig,vr=0,Wt=null,qt=null,rn=null,_l=!1,Po=!1,Oo=0,mu=0;function Sn(){throw Error(h(321))}function td(e,t){if(t===null)return!1;for(var i=0;i<t.length&&i<e.length;i++)if(!c(e[i],t[i]))return!1;return!0}function nd(e,t,i,s,o,a){if(vr=a,Wt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Al.current=e===null||e.memoizedState===null?vu:bu,e=i(s,o),Po){a=0;do{if(Po=!1,Oo=0,25<=a)throw Error(h(301));a+=1,rn=qt=null,t.updateQueue=null,Al.current=wu,e=i(s,o)}while(Po)}if(Al.current=Ol,t=qt!==null&&qt.next!==null,vr=0,rn=qt=Wt=null,_l=!1,t)throw Error(h(300));return e}function id(){var e=Oo!==0;return Oo=0,e}function Ri(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rn===null?Wt.memoizedState=rn=e:rn=rn.next=e,rn}function ai(){if(qt===null){var e=Wt.alternate;e=e!==null?e.memoizedState:null}else e=qt.next;var t=rn===null?Wt.memoizedState:rn.next;if(t!==null)rn=t,qt=e;else{if(e===null)throw Error(h(310));qt=e,e={memoizedState:qt.memoizedState,baseState:qt.baseState,baseQueue:qt.baseQueue,queue:qt.queue,next:null},rn===null?Wt.memoizedState=rn=e:rn=rn.next=e}return rn}function Io(e,t){return typeof t=="function"?t(e):t}function sd(e){var t=ai(),i=t.queue;if(i===null)throw Error(h(311));i.lastRenderedReducer=e;var s=qt,o=s.baseQueue,a=i.pending;if(a!==null){if(o!==null){var f=o.next;o.next=a.next,a.next=f}s.baseQueue=o=a,i.pending=null}if(o!==null){a=o.next,s=s.baseState;var b=f=null,C=null,U=a;do{var me=U.lane;if((vr&me)===me)C!==null&&(C=C.next={lane:0,action:U.action,hasEagerState:U.hasEagerState,eagerState:U.eagerState,next:null}),s=U.hasEagerState?U.eagerState:e(s,U.action);else{var ge={lane:me,action:U.action,hasEagerState:U.hasEagerState,eagerState:U.eagerState,next:null};C===null?(b=C=ge,f=s):C=C.next=ge,Wt.lanes|=me,br|=me}U=U.next}while(U!==null&&U!==a);C===null?f=s:C.next=b,c(s,t.memoizedState)||(Wn=!0),t.memoizedState=s,t.baseState=f,t.baseQueue=C,i.lastRenderedState=s}if(e=i.interleaved,e!==null){o=e;do a=o.lane,Wt.lanes|=a,br|=a,o=o.next;while(o!==e)}else o===null&&(i.lanes=0);return[t.memoizedState,i.dispatch]}function rd(e){var t=ai(),i=t.queue;if(i===null)throw Error(h(311));i.lastRenderedReducer=e;var s=i.dispatch,o=i.pending,a=t.memoizedState;if(o!==null){i.pending=null;var f=o=o.next;do a=e(a,f.action),f=f.next;while(f!==o);c(a,t.memoizedState)||(Wn=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),i.lastRenderedState=a}return[a,s]}function bc(){}function wc(e,t){var i=Wt,s=ai(),o=t(),a=!c(s.memoizedState,o);if(a&&(s.memoizedState=o,Wn=!0),s=s.queue,od(jc.bind(null,i,s,e),[e]),s.getSnapshot!==t||a||rn!==null&&rn.memoizedState.tag&1){if(i.flags|=2048,Ro(9,kc.bind(null,i,s,o,t),void 0,null),on===null)throw Error(h(349));(vr&30)!==0||Sc(i,t,o)}return o}function Sc(e,t,i){e.flags|=16384,e={getSnapshot:t,value:i},t=Wt.updateQueue,t===null?(t={lastEffect:null,stores:null},Wt.updateQueue=t,t.stores=[e]):(i=t.stores,i===null?t.stores=[e]:i.push(e))}function kc(e,t,i,s){t.value=i,t.getSnapshot=s,Cc(t)&&Nc(e)}function jc(e,t,i){return i(function(){Cc(t)&&Nc(e)})}function Cc(e){var t=e.getSnapshot;e=e.value;try{var i=t();return!c(e,i)}catch{return!0}}function Nc(e){var t=rs(e,1);t!==null&&Si(t,e,1,-1)}function $c(e){var t=Ri();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:e},t.queue=e,e=e.dispatch=yu.bind(null,Wt,e),[t.memoizedState,e]}function Ro(e,t,i,s){return e={tag:e,create:t,destroy:i,deps:s,next:null},t=Wt.updateQueue,t===null?(t={lastEffect:null,stores:null},Wt.updateQueue=t,t.lastEffect=e.next=e):(i=t.lastEffect,i===null?t.lastEffect=e.next=e:(s=i.next,i.next=e,e.next=s,t.lastEffect=e)),e}function Ec(){return ai().memoizedState}function Tl(e,t,i,s){var o=Ri();Wt.flags|=e,o.memoizedState=Ro(1|t,i,void 0,s===void 0?null:s)}function Pl(e,t,i,s){var o=ai();s=s===void 0?null:s;var a=void 0;if(qt!==null){var f=qt.memoizedState;if(a=f.destroy,s!==null&&td(s,f.deps)){o.memoizedState=Ro(t,i,a,s);return}}Wt.flags|=e,o.memoizedState=Ro(1|t,i,a,s)}function zc(e,t){return Tl(8390656,8,e,t)}function od(e,t){return Pl(2048,8,e,t)}function Dc(e,t){return Pl(4,2,e,t)}function Ac(e,t){return Pl(4,4,e,t)}function _c(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Tc(e,t,i){return i=i!=null?i.concat([e]):null,Pl(4,4,_c.bind(null,t,e),i)}function ld(){}function Pc(e,t){var i=ai();t=t===void 0?null:t;var s=i.memoizedState;return s!==null&&t!==null&&td(t,s[1])?s[0]:(i.memoizedState=[e,t],e)}function Oc(e,t){var i=ai();t=t===void 0?null:t;var s=i.memoizedState;return s!==null&&t!==null&&td(t,s[1])?s[0]:(e=e(),i.memoizedState=[e,t],e)}function Ic(e,t,i){return(vr&21)===0?(e.baseState&&(e.baseState=!1,Wn=!0),e.memoizedState=i):(c(i,t)||(i=xa(),Wt.lanes|=i,br|=i,e.baseState=!0),t)}function gu(e,t){var i=ut;ut=i!==0&&4>i?i:4,e(!0);var s=ed.transition;ed.transition={};try{e(!1),t()}finally{ut=i,ed.transition=s}}function Rc(){return ai().memoizedState}function xu(e,t,i){var s=Ls(e);if(i={lane:s,action:i,hasEagerState:!1,eagerState:null,next:null},Bc(e))Lc(t,i);else if(i=mc(e,t,i,s),i!==null){var o=_n();Si(i,e,s,o),Mc(i,t,s)}}function yu(e,t,i){var s=Ls(e),o={lane:s,action:i,hasEagerState:!1,eagerState:null,next:null};if(Bc(e))Lc(t,o);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var f=t.lastRenderedState,b=a(f,i);if(o.hasEagerState=!0,o.eagerState=b,c(b,f)){var C=t.interleaved;C===null?(o.next=o,Ya(t)):(o.next=C.next,C.next=o),t.interleaved=o;return}}catch{}finally{}i=mc(e,t,o,s),i!==null&&(o=_n(),Si(i,e,s,o),Mc(i,t,s))}}function Bc(e){var t=e.alternate;return e===Wt||t!==null&&t===Wt}function Lc(e,t){Po=_l=!0;var i=e.pending;i===null?t.next=t:(t.next=i.next,i.next=t),e.pending=t}function Mc(e,t,i){if((i&4194240)!==0){var s=t.lanes;s&=e.pendingLanes,i|=s,t.lanes=i,pn(e,i)}}var Ol={readContext:li,useCallback:Sn,useContext:Sn,useEffect:Sn,useImperativeHandle:Sn,useInsertionEffect:Sn,useLayoutEffect:Sn,useMemo:Sn,useReducer:Sn,useRef:Sn,useState:Sn,useDebugValue:Sn,useDeferredValue:Sn,useTransition:Sn,useMutableSource:Sn,useSyncExternalStore:Sn,useId:Sn,unstable_isNewReconciler:!1},vu={readContext:li,useCallback:function(e,t){return Ri().memoizedState=[e,t===void 0?null:t],e},useContext:li,useEffect:zc,useImperativeHandle:function(e,t,i){return i=i!=null?i.concat([e]):null,Tl(4194308,4,_c.bind(null,t,e),i)},useLayoutEffect:function(e,t){return Tl(4194308,4,e,t)},useInsertionEffect:function(e,t){return Tl(4,2,e,t)},useMemo:function(e,t){var i=Ri();return t=t===void 0?null:t,e=e(),i.memoizedState=[e,t],e},useReducer:function(e,t,i){var s=Ri();return t=i!==void 0?i(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=xu.bind(null,Wt,e),[s.memoizedState,e]},useRef:function(e){var t=Ri();return e={current:e},t.memoizedState=e},useState:$c,useDebugValue:ld,useDeferredValue:function(e){return Ri().memoizedState=e},useTransition:function(){var e=$c(!1),t=e[0];return e=gu.bind(null,e[1]),Ri().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,i){var s=Wt,o=Ri();if(Ot){if(i===void 0)throw Error(h(407));i=i()}else{if(i=t(),on===null)throw Error(h(349));(vr&30)!==0||Sc(s,t,i)}o.memoizedState=i;var a={value:i,getSnapshot:t};return o.queue=a,zc(jc.bind(null,s,a,e),[e]),s.flags|=2048,Ro(9,kc.bind(null,s,a,i,t),void 0,null),i},useId:function(){var e=Ri(),t=on.identifierPrefix;if(Ot){var i=ss,s=is;i=(s&~(1<<32-cn(s)-1)).toString(32)+i,t=":"+t+"R"+i,i=Oo++,0<i&&(t+="H"+i.toString(32)),t+=":"}else i=mu++,t=":"+t+"r"+i.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},bu={readContext:li,useCallback:Pc,useContext:li,useEffect:od,useImperativeHandle:Tc,useInsertionEffect:Dc,useLayoutEffect:Ac,useMemo:Oc,useReducer:sd,useRef:Ec,useState:function(){return sd(Io)},useDebugValue:ld,useDeferredValue:function(e){var t=ai();return Ic(t,qt.memoizedState,e)},useTransition:function(){var e=sd(Io)[0],t=ai().memoizedState;return[e,t]},useMutableSource:bc,useSyncExternalStore:wc,useId:Rc,unstable_isNewReconciler:!1},wu={readContext:li,useCallback:Pc,useContext:li,useEffect:od,useImperativeHandle:Tc,useInsertionEffect:Dc,useLayoutEffect:Ac,useMemo:Oc,useReducer:rd,useRef:Ec,useState:function(){return rd(Io)},useDebugValue:ld,useDeferredValue:function(e){var t=ai();return qt===null?t.memoizedState=e:Ic(t,qt.memoizedState,e)},useTransition:function(){var e=rd(Io)[0],t=ai().memoizedState;return[e,t]},useMutableSource:bc,useSyncExternalStore:wc,useId:Rc,unstable_isNewReconciler:!1};function vi(e,t){if(e&&e.defaultProps){t=y({},t),e=e.defaultProps;for(var i in e)t[i]===void 0&&(t[i]=e[i]);return t}return t}function ad(e,t,i,s){t=e.memoizedState,i=i(s,t),i=i==null?t:y({},t,i),e.memoizedState=i,e.lanes===0&&(e.updateQueue.baseState=i)}var Il={isMounted:function(e){return(e=e._reactInternals)?dn(e)===e:!1},enqueueSetState:function(e,t,i){e=e._reactInternals;var s=_n(),o=Ls(e),a=os(s,o);a.payload=t,i!=null&&(a.callback=i),t=Os(e,a,o),t!==null&&(Si(t,e,o,s),El(t,e,o))},enqueueReplaceState:function(e,t,i){e=e._reactInternals;var s=_n(),o=Ls(e),a=os(s,o);a.tag=1,a.payload=t,i!=null&&(a.callback=i),t=Os(e,a,o),t!==null&&(Si(t,e,o,s),El(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var i=_n(),s=Ls(e),o=os(i,s);o.tag=2,t!=null&&(o.callback=t),t=Os(e,o,s),t!==null&&(Si(t,e,s,i),El(t,e,s))}};function Wc(e,t,i,s,o,a,f){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,a,f):t.prototype&&t.prototype.isPureReactComponent?!m(i,s)||!m(o,a):!0}function Fc(e,t,i){var s=!1,o=_s,a=t.contextType;return typeof a=="object"&&a!==null?a=li(a):(o=Mn(t)?hr:wn.current,s=t.contextTypes,a=(s=s!=null)?Ur(e,o):_s),t=new t(i,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Il,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=a),t}function Uc(e,t,i,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(i,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(i,s),t.state!==e&&Il.enqueueReplaceState(t,t.state,null)}function dd(e,t,i,s){var o=e.stateNode;o.props=i,o.state=e.memoizedState,o.refs={},Za(e);var a=t.contextType;typeof a=="object"&&a!==null?o.context=li(a):(a=Mn(t)?hr:wn.current,o.context=Ur(e,a)),o.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(ad(e,t,a,i),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Il.enqueueReplaceState(o,o.state,null),zl(e,i,o,s),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Xr(e,t){try{var i="",s=t;do i+=le(s),s=s.return;while(s);var o=i}catch(a){o=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:o,digest:null}}function cd(e,t,i){return{value:e,source:null,stack:i??null,digest:t??null}}function pd(e,t){try{console.error(t.value)}catch(i){setTimeout(function(){throw i})}}var Su=typeof WeakMap=="function"?WeakMap:Map;function Hc(e,t,i){i=os(-1,i),i.tag=3,i.payload={element:null};var s=t.value;return i.callback=function(){Ul||(Ul=!0,Nd=s),pd(e,t)},i}function Qc(e,t,i){i=os(-1,i),i.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var o=t.value;i.payload=function(){return s(o)},i.callback=function(){pd(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(i.callback=function(){pd(e,t),typeof s!="function"&&(Rs===null?Rs=new Set([this]):Rs.add(this));var f=t.stack;this.componentDidCatch(t.value,{componentStack:f!==null?f:""})}),i}function Vc(e,t,i){var s=e.pingCache;if(s===null){s=e.pingCache=new Su;var o=new Set;s.set(t,o)}else o=s.get(t),o===void 0&&(o=new Set,s.set(t,o));o.has(i)||(o.add(i),e=Iu.bind(null,e,t,i),t.then(e,e))}function Gc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Yc(e,t,i,s,o){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,i.flags|=131072,i.flags&=-52805,i.tag===1&&(i.alternate===null?i.tag=17:(t=os(-1,1),t.tag=2,Os(i,t,1))),i.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var ku=I.ReactCurrentOwner,Wn=!1;function An(e,t,i,s){t.child=e===null?hc(t,null,i,s):Gr(t,e.child,i,s)}function Zc(e,t,i,s,o){i=i.render;var a=t.ref;return Zr(t,o),s=nd(e,t,i,s,a,o),i=id(),e!==null&&!Wn?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,ls(e,t,o)):(Ot&&i&&La(t),t.flags|=1,An(e,t,s,o),t.child)}function Jc(e,t,i,s,o){if(e===null){var a=i.type;return typeof a=="function"&&!Td(a)&&a.defaultProps===void 0&&i.compare===null&&i.defaultProps===void 0?(t.tag=15,t.type=a,Xc(e,t,a,s,o)):(e=Zl(i.type,null,s,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,(e.lanes&o)===0){var f=a.memoizedProps;if(i=i.compare,i=i!==null?i:m,i(f,s)&&e.ref===t.ref)return ls(e,t,o)}return t.flags|=1,e=Ws(a,s),e.ref=t.ref,e.return=t,t.child=e}function Xc(e,t,i,s,o){if(e!==null){var a=e.memoizedProps;if(m(a,s)&&e.ref===t.ref)if(Wn=!1,t.pendingProps=s=a,(e.lanes&o)!==0)(e.flags&131072)!==0&&(Wn=!0);else return t.lanes=e.lanes,ls(e,t,o)}return ud(e,t,i,s,o)}function Kc(e,t,i){var s=t.pendingProps,o=s.children,a=e!==null?e.memoizedState:null;if(s.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},At(qr,ei),ei|=i;else{if((i&1073741824)===0)return e=a!==null?a.baseLanes|i:i,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,At(qr,ei),ei|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=a!==null?a.baseLanes:i,At(qr,ei),ei|=s}else a!==null?(s=a.baseLanes|i,t.memoizedState=null):s=i,At(qr,ei),ei|=s;return An(e,t,o,i),t.child}function qc(e,t){var i=t.ref;(e===null&&i!==null||e!==null&&e.ref!==i)&&(t.flags|=512,t.flags|=2097152)}function ud(e,t,i,s,o){var a=Mn(i)?hr:wn.current;return a=Ur(t,a),Zr(t,o),i=nd(e,t,i,s,a,o),s=id(),e!==null&&!Wn?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,ls(e,t,o)):(Ot&&s&&La(t),t.flags|=1,An(e,t,i,o),t.child)}function ep(e,t,i,s,o){if(Mn(i)){var a=!0;bl(t)}else a=!1;if(Zr(t,o),t.stateNode===null)Bl(e,t),Fc(t,i,s),dd(t,i,s,o),s=!0;else if(e===null){var f=t.stateNode,b=t.memoizedProps;f.props=b;var C=f.context,U=i.contextType;typeof U=="object"&&U!==null?U=li(U):(U=Mn(i)?hr:wn.current,U=Ur(t,U));var me=i.getDerivedStateFromProps,ge=typeof me=="function"||typeof f.getSnapshotBeforeUpdate=="function";ge||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(b!==s||C!==U)&&Uc(t,f,s,U),Ps=!1;var fe=t.memoizedState;f.state=fe,zl(t,s,f,o),C=t.memoizedState,b!==s||fe!==C||Ln.current||Ps?(typeof me=="function"&&(ad(t,i,me,s),C=t.memoizedState),(b=Ps||Wc(t,i,b,s,fe,C,U))?(ge||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(t.flags|=4194308)):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=C),f.props=s,f.state=C,f.context=U,s=b):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{f=t.stateNode,gc(e,t),b=t.memoizedProps,U=t.type===t.elementType?b:vi(t.type,b),f.props=U,ge=t.pendingProps,fe=f.context,C=i.contextType,typeof C=="object"&&C!==null?C=li(C):(C=Mn(i)?hr:wn.current,C=Ur(t,C));var Pe=i.getDerivedStateFromProps;(me=typeof Pe=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(b!==ge||fe!==C)&&Uc(t,f,s,C),Ps=!1,fe=t.memoizedState,f.state=fe,zl(t,s,f,o);var Be=t.memoizedState;b!==ge||fe!==Be||Ln.current||Ps?(typeof Pe=="function"&&(ad(t,i,Pe,s),Be=t.memoizedState),(U=Ps||Wc(t,i,U,s,fe,Be,C)||!1)?(me||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(s,Be,C),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(s,Be,C)),typeof f.componentDidUpdate=="function"&&(t.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof f.componentDidUpdate!="function"||b===e.memoizedProps&&fe===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||b===e.memoizedProps&&fe===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=Be),f.props=s,f.state=Be,f.context=C,s=U):(typeof f.componentDidUpdate!="function"||b===e.memoizedProps&&fe===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||b===e.memoizedProps&&fe===e.memoizedState||(t.flags|=1024),s=!1)}return fd(e,t,i,s,a,o)}function fd(e,t,i,s,o,a){qc(e,t);var f=(t.flags&128)!==0;if(!s&&!f)return o&&rc(t,i,!1),ls(e,t,a);s=t.stateNode,ku.current=t;var b=f&&typeof i.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&f?(t.child=Gr(t,e.child,null,a),t.child=Gr(t,null,b,a)):An(e,t,b,a),t.memoizedState=s.state,o&&rc(t,i,!0),t.child}function tp(e){var t=e.stateNode;t.pendingContext?ic(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ic(e,t.context,!1),Ja(e,t.containerInfo)}function np(e,t,i,s,o){return Vr(),Ua(o),t.flags|=256,An(e,t,i,s),t.child}var hd={dehydrated:null,treeContext:null,retryLane:0};function md(e){return{baseLanes:e,cachePool:null,transitions:null}}function ip(e,t,i){var s=t.pendingProps,o=Mt.current,a=!1,f=(t.flags&128)!==0,b;if((b=f)||(b=e!==null&&e.memoizedState===null?!1:(o&2)!==0),b?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),At(Mt,o&1),e===null)return Fa(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(f=s.children,e=s.fallback,a?(s=t.mode,a=t.child,f={mode:"hidden",children:f},(s&1)===0&&a!==null?(a.childLanes=0,a.pendingProps=f):a=Jl(f,s,0,null),e=jr(e,s,i,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=md(i),t.memoizedState=hd,e):gd(t,f));if(o=e.memoizedState,o!==null&&(b=o.dehydrated,b!==null))return ju(e,t,f,s,b,o,i);if(a){a=s.fallback,f=t.mode,o=e.child,b=o.sibling;var C={mode:"hidden",children:s.children};return(f&1)===0&&t.child!==o?(s=t.child,s.childLanes=0,s.pendingProps=C,t.deletions=null):(s=Ws(o,C),s.subtreeFlags=o.subtreeFlags&14680064),b!==null?a=Ws(b,a):(a=jr(a,f,i,null),a.flags|=2),a.return=t,s.return=t,s.sibling=a,t.child=s,s=a,a=t.child,f=e.child.memoizedState,f=f===null?md(i):{baseLanes:f.baseLanes|i,cachePool:null,transitions:f.transitions},a.memoizedState=f,a.childLanes=e.childLanes&~i,t.memoizedState=hd,s}return a=e.child,e=a.sibling,s=Ws(a,{mode:"visible",children:s.children}),(t.mode&1)===0&&(s.lanes=i),s.return=t,s.sibling=null,e!==null&&(i=t.deletions,i===null?(t.deletions=[e],t.flags|=16):i.push(e)),t.child=s,t.memoizedState=null,s}function gd(e,t){return t=Jl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Rl(e,t,i,s){return s!==null&&Ua(s),Gr(t,e.child,null,i),e=gd(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ju(e,t,i,s,o,a,f){if(i)return t.flags&256?(t.flags&=-257,s=cd(Error(h(422))),Rl(e,t,f,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=s.fallback,o=t.mode,s=Jl({mode:"visible",children:s.children},o,0,null),a=jr(a,o,f,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,(t.mode&1)!==0&&Gr(t,e.child,null,f),t.child.memoizedState=md(f),t.memoizedState=hd,a);if((t.mode&1)===0)return Rl(e,t,f,null);if(o.data==="$!"){if(s=o.nextSibling&&o.nextSibling.dataset,s)var b=s.dgst;return s=b,a=Error(h(419)),s=cd(a,s,void 0),Rl(e,t,f,s)}if(b=(f&e.childLanes)!==0,Wn||b){if(s=on,s!==null){switch(f&-f){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=(o&(s.suspendedLanes|f))!==0?0:o,o!==0&&o!==a.retryLane&&(a.retryLane=o,rs(e,o),Si(s,e,o,-1))}return _d(),s=cd(Error(h(421))),Rl(e,t,f,s)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Ru.bind(null,e),o._reactRetry=t,null):(e=a.treeContext,qn=Ds(o.nextSibling),Kn=t,Ot=!0,yi=null,e!==null&&(ri[oi++]=is,ri[oi++]=ss,ri[oi++]=mr,is=e.id,ss=e.overflow,mr=t),t=gd(t,s.children),t.flags|=4096,t)}function sp(e,t,i){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),Ga(e.return,t,i)}function xd(e,t,i,s,o){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:i,tailMode:o}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=s,a.tail=i,a.tailMode=o)}function rp(e,t,i){var s=t.pendingProps,o=s.revealOrder,a=s.tail;if(An(e,t,s.children,i),s=Mt.current,(s&2)!==0)s=s&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&sp(e,i,t);else if(e.tag===19)sp(e,i,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(At(Mt,s),(t.mode&1)===0)t.memoizedState=null;else switch(o){case"forwards":for(i=t.child,o=null;i!==null;)e=i.alternate,e!==null&&Dl(e)===null&&(o=i),i=i.sibling;i=o,i===null?(o=t.child,t.child=null):(o=i.sibling,i.sibling=null),xd(t,!1,o,i,a);break;case"backwards":for(i=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Dl(e)===null){t.child=o;break}e=o.sibling,o.sibling=i,i=o,o=e}xd(t,!0,i,null,a);break;case"together":xd(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Bl(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ls(e,t,i){if(e!==null&&(t.dependencies=e.dependencies),br|=t.lanes,(i&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(h(153));if(t.child!==null){for(e=t.child,i=Ws(e,e.pendingProps),t.child=i,i.return=t;e.sibling!==null;)e=e.sibling,i=i.sibling=Ws(e,e.pendingProps),i.return=t;i.sibling=null}return t.child}function Cu(e,t,i){switch(t.tag){case 3:tp(t),Vr();break;case 5:vc(t);break;case 1:Mn(t.type)&&bl(t);break;case 4:Ja(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,o=t.memoizedProps.value;At(Nl,s._currentValue),s._currentValue=o;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(At(Mt,Mt.current&1),t.flags|=128,null):(i&t.child.childLanes)!==0?ip(e,t,i):(At(Mt,Mt.current&1),e=ls(e,t,i),e!==null?e.sibling:null);At(Mt,Mt.current&1);break;case 19:if(s=(i&t.childLanes)!==0,(e.flags&128)!==0){if(s)return rp(e,t,i);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),At(Mt,Mt.current),s)break;return null;case 22:case 23:return t.lanes=0,Kc(e,t,i)}return ls(e,t,i)}var op,yd,lp,ap;op=function(e,t){for(var i=t.child;i!==null;){if(i.tag===5||i.tag===6)e.appendChild(i.stateNode);else if(i.tag!==4&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return;i=i.return}i.sibling.return=i.return,i=i.sibling}},yd=function(){},lp=function(e,t,i,s){var o=e.memoizedProps;if(o!==s){e=t.stateNode,yr(Ii.current);var a=null;switch(i){case"input":o=ot(e,o),s=ot(e,s),a=[];break;case"select":o=y({},o,{value:void 0}),s=y({},s,{value:void 0}),a=[];break;case"textarea":o=Hs(e,o),s=Hs(e,s),a=[];break;default:typeof o.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=xl)}vt(i,s);var f;i=null;for(U in o)if(!s.hasOwnProperty(U)&&o.hasOwnProperty(U)&&o[U]!=null)if(U==="style"){var b=o[U];for(f in b)b.hasOwnProperty(f)&&(i||(i={}),i[f]="")}else U!=="dangerouslySetInnerHTML"&&U!=="children"&&U!=="suppressContentEditableWarning"&&U!=="suppressHydrationWarning"&&U!=="autoFocus"&&(j.hasOwnProperty(U)?a||(a=[]):(a=a||[]).push(U,null));for(U in s){var C=s[U];if(b=o!=null?o[U]:void 0,s.hasOwnProperty(U)&&C!==b&&(C!=null||b!=null))if(U==="style")if(b){for(f in b)!b.hasOwnProperty(f)||C&&C.hasOwnProperty(f)||(i||(i={}),i[f]="");for(f in C)C.hasOwnProperty(f)&&b[f]!==C[f]&&(i||(i={}),i[f]=C[f])}else i||(a||(a=[]),a.push(U,i)),i=C;else U==="dangerouslySetInnerHTML"?(C=C?C.__html:void 0,b=b?b.__html:void 0,C!=null&&b!==C&&(a=a||[]).push(U,C)):U==="children"?typeof C!="string"&&typeof C!="number"||(a=a||[]).push(U,""+C):U!=="suppressContentEditableWarning"&&U!=="suppressHydrationWarning"&&(j.hasOwnProperty(U)?(C!=null&&U==="onScroll"&&xt("scroll",e),a||b===C||(a=[])):(a=a||[]).push(U,C))}i&&(a=a||[]).push("style",i);var U=a;(t.updateQueue=U)&&(t.flags|=4)}},ap=function(e,t,i,s){i!==s&&(t.flags|=4)};function Bo(e,t){if(!Ot)switch(e.tailMode){case"hidden":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e.tail=null:i.sibling=null;break;case"collapsed":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function kn(e){var t=e.alternate!==null&&e.alternate.child===e.child,i=0,s=0;if(t)for(var o=e.child;o!==null;)i|=o.lanes|o.childLanes,s|=o.subtreeFlags&14680064,s|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)i|=o.lanes|o.childLanes,s|=o.subtreeFlags,s|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=s,e.childLanes=i,t}function Nu(e,t,i){var s=t.pendingProps;switch(Ma(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return kn(t),null;case 1:return Mn(t.type)&&vl(),kn(t),null;case 3:return s=t.stateNode,Jr(),Tt(Ln),Tt(wn),qa(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(jl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,yi!==null&&(zd(yi),yi=null))),yd(e,t),kn(t),null;case 5:Xa(t);var o=yr(To.current);if(i=t.type,e!==null&&t.stateNode!=null)lp(e,t,i,s,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(h(166));return kn(t),null}if(e=yr(Ii.current),jl(t)){s=t.stateNode,i=t.type;var a=t.memoizedProps;switch(s[Oi]=t,s[Eo]=a,e=(t.mode&1)!==0,i){case"dialog":xt("cancel",s),xt("close",s);break;case"iframe":case"object":case"embed":xt("load",s);break;case"video":case"audio":for(o=0;o<je.length;o++)xt(je[o],s);break;case"source":xt("error",s);break;case"img":case"image":case"link":xt("error",s),xt("load",s);break;case"details":xt("toggle",s);break;case"input":Kt(s,a),xt("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!a.multiple},xt("invalid",s);break;case"textarea":Er(s,a),xt("invalid",s)}vt(i,a),o=null;for(var f in a)if(a.hasOwnProperty(f)){var b=a[f];f==="children"?typeof b=="string"?s.textContent!==b&&(a.suppressHydrationWarning!==!0&&gl(s.textContent,b,e),o=["children",b]):typeof b=="number"&&s.textContent!==""+b&&(a.suppressHydrationWarning!==!0&&gl(s.textContent,b,e),o=["children",""+b]):j.hasOwnProperty(f)&&b!=null&&f==="onScroll"&&xt("scroll",s)}switch(i){case"input":$t(s),$i(s,a,!0);break;case"textarea":$t(s),Qi(s);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(s.onclick=xl)}s=o,t.updateQueue=s,s!==null&&(t.flags|=4)}else{f=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Rt(i)),e==="http://www.w3.org/1999/xhtml"?i==="script"?(e=f.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=f.createElement(i,{is:s.is}):(e=f.createElement(i),i==="select"&&(f=e,s.multiple?f.multiple=!0:s.size&&(f.size=s.size))):e=f.createElementNS(e,i),e[Oi]=t,e[Eo]=s,op(e,t,!1,!1),t.stateNode=e;e:{switch(f=Zt(i,s),i){case"dialog":xt("cancel",e),xt("close",e),o=s;break;case"iframe":case"object":case"embed":xt("load",e),o=s;break;case"video":case"audio":for(o=0;o<je.length;o++)xt(je[o],e);o=s;break;case"source":xt("error",e),o=s;break;case"img":case"image":case"link":xt("error",e),xt("load",e),o=s;break;case"details":xt("toggle",e),o=s;break;case"input":Kt(e,s),o=ot(e,s),xt("invalid",e);break;case"option":o=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},o=y({},s,{value:void 0}),xt("invalid",e);break;case"textarea":Er(e,s),o=Hs(e,s),xt("invalid",e);break;default:o=s}vt(i,o),b=o;for(a in b)if(b.hasOwnProperty(a)){var C=b[a];a==="style"?Pt(e,C):a==="dangerouslySetInnerHTML"?(C=C?C.__html:void 0,C!=null&&zi(e,C)):a==="children"?typeof C=="string"?(i!=="textarea"||C!=="")&&Zn(e,C):typeof C=="number"&&Zn(e,""+C):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(j.hasOwnProperty(a)?C!=null&&a==="onScroll"&&xt("scroll",e):C!=null&&H(e,a,C,f))}switch(i){case"input":$t(e),$i(e,s,!1);break;case"textarea":$t(e),Qi(e);break;case"option":s.value!=null&&e.setAttribute("value",""+$e(s.value));break;case"select":e.multiple=!!s.multiple,a=s.value,a!=null?Yn(e,!!s.multiple,a,!1):s.defaultValue!=null&&Yn(e,!!s.multiple,s.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=xl)}switch(i){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return kn(t),null;case 6:if(e&&t.stateNode!=null)ap(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(h(166));if(i=yr(To.current),yr(Ii.current),jl(t)){if(s=t.stateNode,i=t.memoizedProps,s[Oi]=t,(a=s.nodeValue!==i)&&(e=Kn,e!==null))switch(e.tag){case 3:gl(s.nodeValue,i,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&gl(s.nodeValue,i,(e.mode&1)!==0)}a&&(t.flags|=4)}else s=(i.nodeType===9?i:i.ownerDocument).createTextNode(s),s[Oi]=t,t.stateNode=s}return kn(t),null;case 13:if(Tt(Mt),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ot&&qn!==null&&(t.mode&1)!==0&&(t.flags&128)===0)pc(),Vr(),t.flags|=98560,a=!1;else if(a=jl(t),s!==null&&s.dehydrated!==null){if(e===null){if(!a)throw Error(h(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(h(317));a[Oi]=t}else Vr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;kn(t),a=!1}else yi!==null&&(zd(yi),yi=null),a=!0;if(!a)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=i,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(Mt.current&1)!==0?en===0&&(en=3):_d())),t.updateQueue!==null&&(t.flags|=4),kn(t),null);case 4:return Jr(),yd(e,t),e===null&&Ue(t.stateNode.containerInfo),kn(t),null;case 10:return Va(t.type._context),kn(t),null;case 17:return Mn(t.type)&&vl(),kn(t),null;case 19:if(Tt(Mt),a=t.memoizedState,a===null)return kn(t),null;if(s=(t.flags&128)!==0,f=a.rendering,f===null)if(s)Bo(a,!1);else{if(en!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(f=Dl(e),f!==null){for(t.flags|=128,Bo(a,!1),s=f.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=i,i=t.child;i!==null;)a=i,e=s,a.flags&=14680066,f=a.alternate,f===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=f.childLanes,a.lanes=f.lanes,a.child=f.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=f.memoizedProps,a.memoizedState=f.memoizedState,a.updateQueue=f.updateQueue,a.type=f.type,e=f.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),i=i.sibling;return At(Mt,Mt.current&1|2),t.child}e=e.sibling}a.tail!==null&&Et()>eo&&(t.flags|=128,s=!0,Bo(a,!1),t.lanes=4194304)}else{if(!s)if(e=Dl(f),e!==null){if(t.flags|=128,s=!0,i=e.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),Bo(a,!0),a.tail===null&&a.tailMode==="hidden"&&!f.alternate&&!Ot)return kn(t),null}else 2*Et()-a.renderingStartTime>eo&&i!==1073741824&&(t.flags|=128,s=!0,Bo(a,!1),t.lanes=4194304);a.isBackwards?(f.sibling=t.child,t.child=f):(i=a.last,i!==null?i.sibling=f:t.child=f,a.last=f)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Et(),t.sibling=null,i=Mt.current,At(Mt,s?i&1|2:i&1),t):(kn(t),null);case 22:case 23:return Ad(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&(t.mode&1)!==0?(ei&1073741824)!==0&&(kn(t),t.subtreeFlags&6&&(t.flags|=8192)):kn(t),null;case 24:return null;case 25:return null}throw Error(h(156,t.tag))}function $u(e,t){switch(Ma(t),t.tag){case 1:return Mn(t.type)&&vl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Jr(),Tt(Ln),Tt(wn),qa(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Xa(t),null;case 13:if(Tt(Mt),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(h(340));Vr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Tt(Mt),null;case 4:return Jr(),null;case 10:return Va(t.type._context),null;case 22:case 23:return Ad(),null;case 24:return null;default:return null}}var Ll=!1,jn=!1,Eu=typeof WeakSet=="function"?WeakSet:Set,Ie=null;function Kr(e,t){var i=e.ref;if(i!==null)if(typeof i=="function")try{i(null)}catch(s){Qt(e,t,s)}else i.current=null}function vd(e,t,i){try{i()}catch(s){Qt(e,t,s)}}var dp=!1;function zu(e,t){if(Aa=uo,e=X(),be(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else e:{i=(i=e.ownerDocument)&&i.defaultView||window;var s=i.getSelection&&i.getSelection();if(s&&s.rangeCount!==0){i=s.anchorNode;var o=s.anchorOffset,a=s.focusNode;s=s.focusOffset;try{i.nodeType,a.nodeType}catch{i=null;break e}var f=0,b=-1,C=-1,U=0,me=0,ge=e,fe=null;t:for(;;){for(var Pe;ge!==i||o!==0&&ge.nodeType!==3||(b=f+o),ge!==a||s!==0&&ge.nodeType!==3||(C=f+s),ge.nodeType===3&&(f+=ge.nodeValue.length),(Pe=ge.firstChild)!==null;)fe=ge,ge=Pe;for(;;){if(ge===e)break t;if(fe===i&&++U===o&&(b=f),fe===a&&++me===s&&(C=f),(Pe=ge.nextSibling)!==null)break;ge=fe,fe=ge.parentNode}ge=Pe}i=b===-1||C===-1?null:{start:b,end:C}}else i=null}i=i||{start:0,end:0}}else i=null;for(_a={focusedElem:e,selectionRange:i},uo=!1,Ie=t;Ie!==null;)if(t=Ie,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Ie=e;else for(;Ie!==null;){t=Ie;try{var Be=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(Be!==null){var Le=Be.memoizedProps,Yt=Be.memoizedState,B=t.stateNode,_=B.getSnapshotBeforeUpdate(t.elementType===t.type?Le:vi(t.type,Le),Yt);B.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var M=t.stateNode.containerInfo;M.nodeType===1?M.textContent="":M.nodeType===9&&M.documentElement&&M.removeChild(M.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(h(163))}}catch(we){Qt(t,t.return,we)}if(e=t.sibling,e!==null){e.return=t.return,Ie=e;break}Ie=t.return}return Be=dp,dp=!1,Be}function Lo(e,t,i){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var o=s=s.next;do{if((o.tag&e)===e){var a=o.destroy;o.destroy=void 0,a!==void 0&&vd(t,i,a)}o=o.next}while(o!==s)}}function Ml(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var i=t=t.next;do{if((i.tag&e)===e){var s=i.create;i.destroy=s()}i=i.next}while(i!==t)}}function bd(e){var t=e.ref;if(t!==null){var i=e.stateNode;switch(e.tag){case 5:e=i;break;default:e=i}typeof t=="function"?t(e):t.current=e}}function cp(e){var t=e.alternate;t!==null&&(e.alternate=null,cp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Oi],delete t[Eo],delete t[Ia],delete t[pu],delete t[uu])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function pp(e){return e.tag===5||e.tag===3||e.tag===4}function up(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||pp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function wd(e,t,i){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?i.nodeType===8?i.parentNode.insertBefore(e,t):i.insertBefore(e,t):(i.nodeType===8?(t=i.parentNode,t.insertBefore(e,i)):(t=i,t.appendChild(e)),i=i._reactRootContainer,i!=null||t.onclick!==null||(t.onclick=xl));else if(s!==4&&(e=e.child,e!==null))for(wd(e,t,i),e=e.sibling;e!==null;)wd(e,t,i),e=e.sibling}function Sd(e,t,i){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?i.insertBefore(e,t):i.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(Sd(e,t,i),e=e.sibling;e!==null;)Sd(e,t,i),e=e.sibling}var fn=null,bi=!1;function Is(e,t,i){for(i=i.child;i!==null;)fp(e,t,i),i=i.sibling}function fp(e,t,i){if(yn&&typeof yn.onCommitFiberUnmount=="function")try{yn.onCommitFiberUnmount(er,i)}catch{}switch(i.tag){case 5:jn||Kr(i,t);case 6:var s=fn,o=bi;fn=null,Is(e,t,i),fn=s,bi=o,fn!==null&&(bi?(e=fn,i=i.stateNode,e.nodeType===8?e.parentNode.removeChild(i):e.removeChild(i)):fn.removeChild(i.stateNode));break;case 18:fn!==null&&(bi?(e=fn,i=i.stateNode,e.nodeType===8?Oa(e.parentNode,i):e.nodeType===1&&Oa(e,i),lr(e)):Oa(fn,i.stateNode));break;case 4:s=fn,o=bi,fn=i.stateNode.containerInfo,bi=!0,Is(e,t,i),fn=s,bi=o;break;case 0:case 11:case 14:case 15:if(!jn&&(s=i.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){o=s=s.next;do{var a=o,f=a.destroy;a=a.tag,f!==void 0&&((a&2)!==0||(a&4)!==0)&&vd(i,t,f),o=o.next}while(o!==s)}Is(e,t,i);break;case 1:if(!jn&&(Kr(i,t),s=i.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=i.memoizedProps,s.state=i.memoizedState,s.componentWillUnmount()}catch(b){Qt(i,t,b)}Is(e,t,i);break;case 21:Is(e,t,i);break;case 22:i.mode&1?(jn=(s=jn)||i.memoizedState!==null,Is(e,t,i),jn=s):Is(e,t,i);break;default:Is(e,t,i)}}function hp(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var i=e.stateNode;i===null&&(i=e.stateNode=new Eu),t.forEach(function(s){var o=Bu.bind(null,e,s);i.has(s)||(i.add(s),s.then(o,o))})}}function wi(e,t){var i=t.deletions;if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];try{var a=e,f=t,b=f;e:for(;b!==null;){switch(b.tag){case 5:fn=b.stateNode,bi=!1;break e;case 3:fn=b.stateNode.containerInfo,bi=!0;break e;case 4:fn=b.stateNode.containerInfo,bi=!0;break e}b=b.return}if(fn===null)throw Error(h(160));fp(a,f,o),fn=null,bi=!1;var C=o.alternate;C!==null&&(C.return=null),o.return=null}catch(U){Qt(o,t,U)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)mp(t,e),t=t.sibling}function mp(e,t){var i=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(wi(t,e),Bi(e),s&4){try{Lo(3,e,e.return),Ml(3,e)}catch(Le){Qt(e,e.return,Le)}try{Lo(5,e,e.return)}catch(Le){Qt(e,e.return,Le)}}break;case 1:wi(t,e),Bi(e),s&512&&i!==null&&Kr(i,i.return);break;case 5:if(wi(t,e),Bi(e),s&512&&i!==null&&Kr(i,i.return),e.flags&32){var o=e.stateNode;try{Zn(o,"")}catch(Le){Qt(e,e.return,Le)}}if(s&4&&(o=e.stateNode,o!=null)){var a=e.memoizedProps,f=i!==null?i.memoizedProps:a,b=e.type,C=e.updateQueue;if(e.updateQueue=null,C!==null)try{b==="input"&&a.type==="radio"&&a.name!=null&&an(o,a),Zt(b,f);var U=Zt(b,a);for(f=0;f<C.length;f+=2){var me=C[f],ge=C[f+1];me==="style"?Pt(o,ge):me==="dangerouslySetInnerHTML"?zi(o,ge):me==="children"?Zn(o,ge):H(o,me,ge,U)}switch(b){case"input":gn(o,a);break;case"textarea":On(o,a);break;case"select":var fe=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!a.multiple;var Pe=a.value;Pe!=null?Yn(o,!!a.multiple,Pe,!1):fe!==!!a.multiple&&(a.defaultValue!=null?Yn(o,!!a.multiple,a.defaultValue,!0):Yn(o,!!a.multiple,a.multiple?[]:"",!1))}o[Eo]=a}catch(Le){Qt(e,e.return,Le)}}break;case 6:if(wi(t,e),Bi(e),s&4){if(e.stateNode===null)throw Error(h(162));o=e.stateNode,a=e.memoizedProps;try{o.nodeValue=a}catch(Le){Qt(e,e.return,Le)}}break;case 3:if(wi(t,e),Bi(e),s&4&&i!==null&&i.memoizedState.isDehydrated)try{lr(t.containerInfo)}catch(Le){Qt(e,e.return,Le)}break;case 4:wi(t,e),Bi(e);break;case 13:wi(t,e),Bi(e),o=e.child,o.flags&8192&&(a=o.memoizedState!==null,o.stateNode.isHidden=a,!a||o.alternate!==null&&o.alternate.memoizedState!==null||(Cd=Et())),s&4&&hp(e);break;case 22:if(me=i!==null&&i.memoizedState!==null,e.mode&1?(jn=(U=jn)||me,wi(t,e),jn=U):wi(t,e),Bi(e),s&8192){if(U=e.memoizedState!==null,(e.stateNode.isHidden=U)&&!me&&(e.mode&1)!==0)for(Ie=e,me=e.child;me!==null;){for(ge=Ie=me;Ie!==null;){switch(fe=Ie,Pe=fe.child,fe.tag){case 0:case 11:case 14:case 15:Lo(4,fe,fe.return);break;case 1:Kr(fe,fe.return);var Be=fe.stateNode;if(typeof Be.componentWillUnmount=="function"){s=fe,i=fe.return;try{t=s,Be.props=t.memoizedProps,Be.state=t.memoizedState,Be.componentWillUnmount()}catch(Le){Qt(s,i,Le)}}break;case 5:Kr(fe,fe.return);break;case 22:if(fe.memoizedState!==null){yp(ge);continue}}Pe!==null?(Pe.return=fe,Ie=Pe):yp(ge)}me=me.sibling}e:for(me=null,ge=e;;){if(ge.tag===5){if(me===null){me=ge;try{o=ge.stateNode,U?(a=o.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(b=ge.stateNode,C=ge.memoizedProps.style,f=C!=null&&C.hasOwnProperty("display")?C.display:null,b.style.display=ps("display",f))}catch(Le){Qt(e,e.return,Le)}}}else if(ge.tag===6){if(me===null)try{ge.stateNode.nodeValue=U?"":ge.memoizedProps}catch(Le){Qt(e,e.return,Le)}}else if((ge.tag!==22&&ge.tag!==23||ge.memoizedState===null||ge===e)&&ge.child!==null){ge.child.return=ge,ge=ge.child;continue}if(ge===e)break e;for(;ge.sibling===null;){if(ge.return===null||ge.return===e)break e;me===ge&&(me=null),ge=ge.return}me===ge&&(me=null),ge.sibling.return=ge.return,ge=ge.sibling}}break;case 19:wi(t,e),Bi(e),s&4&&hp(e);break;case 21:break;default:wi(t,e),Bi(e)}}function Bi(e){var t=e.flags;if(t&2){try{e:{for(var i=e.return;i!==null;){if(pp(i)){var s=i;break e}i=i.return}throw Error(h(160))}switch(s.tag){case 5:var o=s.stateNode;s.flags&32&&(Zn(o,""),s.flags&=-33);var a=up(e);Sd(e,a,o);break;case 3:case 4:var f=s.stateNode.containerInfo,b=up(e);wd(e,b,f);break;default:throw Error(h(161))}}catch(C){Qt(e,e.return,C)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Du(e,t,i){Ie=e,gp(e)}function gp(e,t,i){for(var s=(e.mode&1)!==0;Ie!==null;){var o=Ie,a=o.child;if(o.tag===22&&s){var f=o.memoizedState!==null||Ll;if(!f){var b=o.alternate,C=b!==null&&b.memoizedState!==null||jn;b=Ll;var U=jn;if(Ll=f,(jn=C)&&!U)for(Ie=o;Ie!==null;)f=Ie,C=f.child,f.tag===22&&f.memoizedState!==null?vp(o):C!==null?(C.return=f,Ie=C):vp(o);for(;a!==null;)Ie=a,gp(a),a=a.sibling;Ie=o,Ll=b,jn=U}xp(e)}else(o.subtreeFlags&8772)!==0&&a!==null?(a.return=o,Ie=a):xp(e)}}function xp(e){for(;Ie!==null;){var t=Ie;if((t.flags&8772)!==0){var i=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:jn||Ml(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!jn)if(i===null)s.componentDidMount();else{var o=t.elementType===t.type?i.memoizedProps:vi(t.type,i.memoizedProps);s.componentDidUpdate(o,i.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&yc(t,a,s);break;case 3:var f=t.updateQueue;if(f!==null){if(i=null,t.child!==null)switch(t.child.tag){case 5:i=t.child.stateNode;break;case 1:i=t.child.stateNode}yc(t,f,i)}break;case 5:var b=t.stateNode;if(i===null&&t.flags&4){i=b;var C=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":C.autoFocus&&i.focus();break;case"img":C.src&&(i.src=C.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var U=t.alternate;if(U!==null){var me=U.memoizedState;if(me!==null){var ge=me.dehydrated;ge!==null&&lr(ge)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(h(163))}jn||t.flags&512&&bd(t)}catch(fe){Qt(t,t.return,fe)}}if(t===e){Ie=null;break}if(i=t.sibling,i!==null){i.return=t.return,Ie=i;break}Ie=t.return}}function yp(e){for(;Ie!==null;){var t=Ie;if(t===e){Ie=null;break}var i=t.sibling;if(i!==null){i.return=t.return,Ie=i;break}Ie=t.return}}function vp(e){for(;Ie!==null;){var t=Ie;try{switch(t.tag){case 0:case 11:case 15:var i=t.return;try{Ml(4,t)}catch(C){Qt(t,i,C)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var o=t.return;try{s.componentDidMount()}catch(C){Qt(t,o,C)}}var a=t.return;try{bd(t)}catch(C){Qt(t,a,C)}break;case 5:var f=t.return;try{bd(t)}catch(C){Qt(t,f,C)}}}catch(C){Qt(t,t.return,C)}if(t===e){Ie=null;break}var b=t.sibling;if(b!==null){b.return=t.return,Ie=b;break}Ie=t.return}}var Au=Math.ceil,Wl=I.ReactCurrentDispatcher,kd=I.ReactCurrentOwner,di=I.ReactCurrentBatchConfig,wt=0,on=null,Jt=null,hn=0,ei=0,qr=As(0),en=0,Mo=null,br=0,Fl=0,jd=0,Wo=null,Fn=null,Cd=0,eo=1/0,as=null,Ul=!1,Nd=null,Rs=null,Hl=!1,Bs=null,Ql=0,Fo=0,$d=null,Vl=-1,Gl=0;function _n(){return(wt&6)!==0?Et():Vl!==-1?Vl:Vl=Et()}function Ls(e){return(e.mode&1)===0?1:(wt&2)!==0&&hn!==0?hn&-hn:hu.transition!==null?(Gl===0&&(Gl=xa()),Gl):(e=ut,e!==0||(e=window.event,e=e===void 0?16:qo(e.type)),e)}function Si(e,t,i,s){if(50<Fo)throw Fo=0,$d=null,Error(h(185));nr(e,i,s),((wt&2)===0||e!==on)&&(e===on&&((wt&2)===0&&(Fl|=i),en===4&&Ms(e,hn)),Un(e,s),i===1&&wt===0&&(t.mode&1)===0&&(eo=Et()+500,wl&&Ts()))}function Un(e,t){var i=e.callbackNode;qd(e,t);var s=tr(e,e===on?hn:0);if(s===0)i!==null&&Xs(i),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(i!=null&&Xs(i),t===1)e.tag===0?fu(wp.bind(null,e)):oc(wp.bind(null,e)),du(function(){(wt&6)===0&&Ts()}),i=null;else{switch(Vt(s)){case 1:i=hs;break;case 4:i=qs;break;case 16:i=Ji;break;case 536870912:i=ms;break;default:i=Ji}i=zp(i,bp.bind(null,e))}e.callbackPriority=t,e.callbackNode=i}}function bp(e,t){if(Vl=-1,Gl=0,(wt&6)!==0)throw Error(h(327));var i=e.callbackNode;if(to()&&e.callbackNode!==i)return null;var s=tr(e,e===on?hn:0);if(s===0)return null;if((s&30)!==0||(s&e.expiredLanes)!==0||t)t=Yl(e,s);else{t=s;var o=wt;wt|=2;var a=kp();(on!==e||hn!==t)&&(as=null,eo=Et()+500,Sr(e,t));do try{Pu();break}catch(b){Sp(e,b)}while(!0);Qa(),Wl.current=a,wt=o,Jt!==null?t=0:(on=null,hn=0,t=en)}if(t!==0){if(t===2&&(o=Jo(e),o!==0&&(s=o,t=Ed(e,o))),t===1)throw i=Mo,Sr(e,0),Ms(e,s),Un(e,Et()),i;if(t===6)Ms(e,s);else{if(o=e.current.alternate,(s&30)===0&&!_u(o)&&(t=Yl(e,s),t===2&&(a=Jo(e),a!==0&&(s=a,t=Ed(e,a))),t===1))throw i=Mo,Sr(e,0),Ms(e,s),Un(e,Et()),i;switch(e.finishedWork=o,e.finishedLanes=s,t){case 0:case 1:throw Error(h(345));case 2:kr(e,Fn,as);break;case 3:if(Ms(e,s),(s&130023424)===s&&(t=Cd+500-Et(),10<t)){if(tr(e,0)!==0)break;if(o=e.suspendedLanes,(o&s)!==s){_n(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Pa(kr.bind(null,e,Fn,as),t);break}kr(e,Fn,as);break;case 4:if(Ms(e,s),(s&4194240)===s)break;for(t=e.eventTimes,o=-1;0<s;){var f=31-cn(s);a=1<<f,f=t[f],f>o&&(o=f),s&=~a}if(s=o,s=Et()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*Au(s/1960))-s,10<s){e.timeoutHandle=Pa(kr.bind(null,e,Fn,as),s);break}kr(e,Fn,as);break;case 5:kr(e,Fn,as);break;default:throw Error(h(329))}}}return Un(e,Et()),e.callbackNode===i?bp.bind(null,e):null}function Ed(e,t){var i=Wo;return e.current.memoizedState.isDehydrated&&(Sr(e,t).flags|=256),e=Yl(e,t),e!==2&&(t=Fn,Fn=i,t!==null&&zd(t)),e}function zd(e){Fn===null?Fn=e:Fn.push.apply(Fn,e)}function _u(e){for(var t=e;;){if(t.flags&16384){var i=t.updateQueue;if(i!==null&&(i=i.stores,i!==null))for(var s=0;s<i.length;s++){var o=i[s],a=o.getSnapshot;o=o.value;try{if(!c(a(),o))return!1}catch{return!1}}}if(i=t.child,t.subtreeFlags&16384&&i!==null)i.return=t,t=i;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ms(e,t){for(t&=~jd,t&=~Fl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var i=31-cn(t),s=1<<i;e[i]=-1,t&=~s}}function wp(e){if((wt&6)!==0)throw Error(h(327));to();var t=tr(e,0);if((t&1)===0)return Un(e,Et()),null;var i=Yl(e,t);if(e.tag!==0&&i===2){var s=Jo(e);s!==0&&(t=s,i=Ed(e,s))}if(i===1)throw i=Mo,Sr(e,0),Ms(e,t),Un(e,Et()),i;if(i===6)throw Error(h(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,kr(e,Fn,as),Un(e,Et()),null}function Dd(e,t){var i=wt;wt|=1;try{return e(t)}finally{wt=i,wt===0&&(eo=Et()+500,wl&&Ts())}}function wr(e){Bs!==null&&Bs.tag===0&&(wt&6)===0&&to();var t=wt;wt|=1;var i=di.transition,s=ut;try{if(di.transition=null,ut=1,e)return e()}finally{ut=s,di.transition=i,wt=t,(wt&6)===0&&Ts()}}function Ad(){ei=qr.current,Tt(qr)}function Sr(e,t){e.finishedWork=null,e.finishedLanes=0;var i=e.timeoutHandle;if(i!==-1&&(e.timeoutHandle=-1,au(i)),Jt!==null)for(i=Jt.return;i!==null;){var s=i;switch(Ma(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&vl();break;case 3:Jr(),Tt(Ln),Tt(wn),qa();break;case 5:Xa(s);break;case 4:Jr();break;case 13:Tt(Mt);break;case 19:Tt(Mt);break;case 10:Va(s.type._context);break;case 22:case 23:Ad()}i=i.return}if(on=e,Jt=e=Ws(e.current,null),hn=ei=t,en=0,Mo=null,jd=Fl=br=0,Fn=Wo=null,xr!==null){for(t=0;t<xr.length;t++)if(i=xr[t],s=i.interleaved,s!==null){i.interleaved=null;var o=s.next,a=i.pending;if(a!==null){var f=a.next;a.next=o,s.next=f}i.pending=s}xr=null}return e}function Sp(e,t){do{var i=Jt;try{if(Qa(),Al.current=Ol,_l){for(var s=Wt.memoizedState;s!==null;){var o=s.queue;o!==null&&(o.pending=null),s=s.next}_l=!1}if(vr=0,rn=qt=Wt=null,Po=!1,Oo=0,kd.current=null,i===null||i.return===null){en=1,Mo=t,Jt=null;break}e:{var a=e,f=i.return,b=i,C=t;if(t=hn,b.flags|=32768,C!==null&&typeof C=="object"&&typeof C.then=="function"){var U=C,me=b,ge=me.tag;if((me.mode&1)===0&&(ge===0||ge===11||ge===15)){var fe=me.alternate;fe?(me.updateQueue=fe.updateQueue,me.memoizedState=fe.memoizedState,me.lanes=fe.lanes):(me.updateQueue=null,me.memoizedState=null)}var Pe=Gc(f);if(Pe!==null){Pe.flags&=-257,Yc(Pe,f,b,a,t),Pe.mode&1&&Vc(a,U,t),t=Pe,C=U;var Be=t.updateQueue;if(Be===null){var Le=new Set;Le.add(C),t.updateQueue=Le}else Be.add(C);break e}else{if((t&1)===0){Vc(a,U,t),_d();break e}C=Error(h(426))}}else if(Ot&&b.mode&1){var Yt=Gc(f);if(Yt!==null){(Yt.flags&65536)===0&&(Yt.flags|=256),Yc(Yt,f,b,a,t),Ua(Xr(C,b));break e}}a=C=Xr(C,b),en!==4&&(en=2),Wo===null?Wo=[a]:Wo.push(a),a=f;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var B=Hc(a,C,t);xc(a,B);break e;case 1:b=C;var _=a.type,M=a.stateNode;if((a.flags&128)===0&&(typeof _.getDerivedStateFromError=="function"||M!==null&&typeof M.componentDidCatch=="function"&&(Rs===null||!Rs.has(M)))){a.flags|=65536,t&=-t,a.lanes|=t;var we=Qc(a,b,t);xc(a,we);break e}}a=a.return}while(a!==null)}Cp(i)}catch(We){t=We,Jt===i&&i!==null&&(Jt=i=i.return);continue}break}while(!0)}function kp(){var e=Wl.current;return Wl.current=Ol,e===null?Ol:e}function _d(){(en===0||en===3||en===2)&&(en=4),on===null||(br&268435455)===0&&(Fl&268435455)===0||Ms(on,hn)}function Yl(e,t){var i=wt;wt|=2;var s=kp();(on!==e||hn!==t)&&(as=null,Sr(e,t));do try{Tu();break}catch(o){Sp(e,o)}while(!0);if(Qa(),wt=i,Wl.current=s,Jt!==null)throw Error(h(261));return on=null,hn=0,en}function Tu(){for(;Jt!==null;)jp(Jt)}function Pu(){for(;Jt!==null&&!Ks();)jp(Jt)}function jp(e){var t=Ep(e.alternate,e,ei);e.memoizedProps=e.pendingProps,t===null?Cp(e):Jt=t,kd.current=null}function Cp(e){var t=e;do{var i=t.alternate;if(e=t.return,(t.flags&32768)===0){if(i=Nu(i,t,ei),i!==null){Jt=i;return}}else{if(i=$u(i,t),i!==null){i.flags&=32767,Jt=i;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{en=6,Jt=null;return}}if(t=t.sibling,t!==null){Jt=t;return}Jt=t=e}while(t!==null);en===0&&(en=5)}function kr(e,t,i){var s=ut,o=di.transition;try{di.transition=null,ut=1,Ou(e,t,i,s)}finally{di.transition=o,ut=s}return null}function Ou(e,t,i,s){do to();while(Bs!==null);if((wt&6)!==0)throw Error(h(327));i=e.finishedWork;var o=e.finishedLanes;if(i===null)return null;if(e.finishedWork=null,e.finishedLanes=0,i===e.current)throw Error(h(177));e.callbackNode=null,e.callbackPriority=0;var a=i.lanes|i.childLanes;if(po(e,a),e===on&&(Jt=on=null,hn=0),(i.subtreeFlags&2064)===0&&(i.flags&2064)===0||Hl||(Hl=!0,zp(Ji,function(){return to(),null})),a=(i.flags&15990)!==0,(i.subtreeFlags&15990)!==0||a){a=di.transition,di.transition=null;var f=ut;ut=1;var b=wt;wt|=4,kd.current=null,zu(e,i),mp(i,e),ke(_a),uo=!!Aa,_a=Aa=null,e.current=i,Du(i),Go(),wt=b,ut=f,di.transition=a}else e.current=i;if(Hl&&(Hl=!1,Bs=e,Ql=o),a=e.pendingLanes,a===0&&(Rs=null),gs(i.stateNode),Un(e,Et()),t!==null)for(s=e.onRecoverableError,i=0;i<t.length;i++)o=t[i],s(o.value,{componentStack:o.stack,digest:o.digest});if(Ul)throw Ul=!1,e=Nd,Nd=null,e;return(Ql&1)!==0&&e.tag!==0&&to(),a=e.pendingLanes,(a&1)!==0?e===$d?Fo++:(Fo=0,$d=e):Fo=0,Ts(),null}function to(){if(Bs!==null){var e=Vt(Ql),t=di.transition,i=ut;try{if(di.transition=null,ut=16>e?16:e,Bs===null)var s=!1;else{if(e=Bs,Bs=null,Ql=0,(wt&6)!==0)throw Error(h(331));var o=wt;for(wt|=4,Ie=e.current;Ie!==null;){var a=Ie,f=a.child;if((Ie.flags&16)!==0){var b=a.deletions;if(b!==null){for(var C=0;C<b.length;C++){var U=b[C];for(Ie=U;Ie!==null;){var me=Ie;switch(me.tag){case 0:case 11:case 15:Lo(8,me,a)}var ge=me.child;if(ge!==null)ge.return=me,Ie=ge;else for(;Ie!==null;){me=Ie;var fe=me.sibling,Pe=me.return;if(cp(me),me===U){Ie=null;break}if(fe!==null){fe.return=Pe,Ie=fe;break}Ie=Pe}}}var Be=a.alternate;if(Be!==null){var Le=Be.child;if(Le!==null){Be.child=null;do{var Yt=Le.sibling;Le.sibling=null,Le=Yt}while(Le!==null)}}Ie=a}}if((a.subtreeFlags&2064)!==0&&f!==null)f.return=a,Ie=f;else e:for(;Ie!==null;){if(a=Ie,(a.flags&2048)!==0)switch(a.tag){case 0:case 11:case 15:Lo(9,a,a.return)}var B=a.sibling;if(B!==null){B.return=a.return,Ie=B;break e}Ie=a.return}}var _=e.current;for(Ie=_;Ie!==null;){f=Ie;var M=f.child;if((f.subtreeFlags&2064)!==0&&M!==null)M.return=f,Ie=M;else e:for(f=_;Ie!==null;){if(b=Ie,(b.flags&2048)!==0)try{switch(b.tag){case 0:case 11:case 15:Ml(9,b)}}catch(We){Qt(b,b.return,We)}if(b===f){Ie=null;break e}var we=b.sibling;if(we!==null){we.return=b.return,Ie=we;break e}Ie=b.return}}if(wt=o,Ts(),yn&&typeof yn.onPostCommitFiberRoot=="function")try{yn.onPostCommitFiberRoot(er,e)}catch{}s=!0}return s}finally{ut=i,di.transition=t}}return!1}function Np(e,t,i){t=Xr(i,t),t=Hc(e,t,1),e=Os(e,t,1),t=_n(),e!==null&&(nr(e,1,t),Un(e,t))}function Qt(e,t,i){if(e.tag===3)Np(e,e,i);else for(;t!==null;){if(t.tag===3){Np(t,e,i);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Rs===null||!Rs.has(s))){e=Xr(i,e),e=Qc(t,e,1),t=Os(t,e,1),e=_n(),t!==null&&(nr(t,1,e),Un(t,e));break}}t=t.return}}function Iu(e,t,i){var s=e.pingCache;s!==null&&s.delete(t),t=_n(),e.pingedLanes|=e.suspendedLanes&i,on===e&&(hn&i)===i&&(en===4||en===3&&(hn&130023424)===hn&&500>Et()-Cd?Sr(e,0):jd|=i),Un(e,t)}function $p(e,t){t===0&&((e.mode&1)===0?t=1:(t=$n,$n<<=1,($n&130023424)===0&&($n=4194304)));var i=_n();e=rs(e,t),e!==null&&(nr(e,t,i),Un(e,i))}function Ru(e){var t=e.memoizedState,i=0;t!==null&&(i=t.retryLane),$p(e,i)}function Bu(e,t){var i=0;switch(e.tag){case 13:var s=e.stateNode,o=e.memoizedState;o!==null&&(i=o.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(h(314))}s!==null&&s.delete(t),$p(e,i)}var Ep;Ep=function(e,t,i){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ln.current)Wn=!0;else{if((e.lanes&i)===0&&(t.flags&128)===0)return Wn=!1,Cu(e,t,i);Wn=(e.flags&131072)!==0}else Wn=!1,Ot&&(t.flags&1048576)!==0&&lc(t,kl,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;Bl(e,t),e=t.pendingProps;var o=Ur(t,wn.current);Zr(t,i),o=nd(null,t,s,e,o,i);var a=id();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Mn(s)?(a=!0,bl(t)):a=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Za(t),o.updater=Il,t.stateNode=o,o._reactInternals=t,dd(t,s,e,i),t=fd(null,t,s,!0,a,i)):(t.tag=0,Ot&&a&&La(t),An(null,t,o,i),t=t.child),t;case 16:s=t.elementType;e:{switch(Bl(e,t),e=t.pendingProps,o=s._init,s=o(s._payload),t.type=s,o=t.tag=Mu(s),e=vi(s,e),o){case 0:t=ud(null,t,s,e,i);break e;case 1:t=ep(null,t,s,e,i);break e;case 11:t=Zc(null,t,s,e,i);break e;case 14:t=Jc(null,t,s,vi(s.type,e),i);break e}throw Error(h(306,s,""))}return t;case 0:return s=t.type,o=t.pendingProps,o=t.elementType===s?o:vi(s,o),ud(e,t,s,o,i);case 1:return s=t.type,o=t.pendingProps,o=t.elementType===s?o:vi(s,o),ep(e,t,s,o,i);case 3:e:{if(tp(t),e===null)throw Error(h(387));s=t.pendingProps,a=t.memoizedState,o=a.element,gc(e,t),zl(t,s,null,i);var f=t.memoizedState;if(s=f.element,a.isDehydrated)if(a={element:s,isDehydrated:!1,cache:f.cache,pendingSuspenseBoundaries:f.pendingSuspenseBoundaries,transitions:f.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){o=Xr(Error(h(423)),t),t=np(e,t,s,i,o);break e}else if(s!==o){o=Xr(Error(h(424)),t),t=np(e,t,s,i,o);break e}else for(qn=Ds(t.stateNode.containerInfo.firstChild),Kn=t,Ot=!0,yi=null,i=hc(t,null,s,i),t.child=i;i;)i.flags=i.flags&-3|4096,i=i.sibling;else{if(Vr(),s===o){t=ls(e,t,i);break e}An(e,t,s,i)}t=t.child}return t;case 5:return vc(t),e===null&&Fa(t),s=t.type,o=t.pendingProps,a=e!==null?e.memoizedProps:null,f=o.children,Ta(s,o)?f=null:a!==null&&Ta(s,a)&&(t.flags|=32),qc(e,t),An(e,t,f,i),t.child;case 6:return e===null&&Fa(t),null;case 13:return ip(e,t,i);case 4:return Ja(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=Gr(t,null,s,i):An(e,t,s,i),t.child;case 11:return s=t.type,o=t.pendingProps,o=t.elementType===s?o:vi(s,o),Zc(e,t,s,o,i);case 7:return An(e,t,t.pendingProps,i),t.child;case 8:return An(e,t,t.pendingProps.children,i),t.child;case 12:return An(e,t,t.pendingProps.children,i),t.child;case 10:e:{if(s=t.type._context,o=t.pendingProps,a=t.memoizedProps,f=o.value,At(Nl,s._currentValue),s._currentValue=f,a!==null)if(c(a.value,f)){if(a.children===o.children&&!Ln.current){t=ls(e,t,i);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var b=a.dependencies;if(b!==null){f=a.child;for(var C=b.firstContext;C!==null;){if(C.context===s){if(a.tag===1){C=os(-1,i&-i),C.tag=2;var U=a.updateQueue;if(U!==null){U=U.shared;var me=U.pending;me===null?C.next=C:(C.next=me.next,me.next=C),U.pending=C}}a.lanes|=i,C=a.alternate,C!==null&&(C.lanes|=i),Ga(a.return,i,t),b.lanes|=i;break}C=C.next}}else if(a.tag===10)f=a.type===t.type?null:a.child;else if(a.tag===18){if(f=a.return,f===null)throw Error(h(341));f.lanes|=i,b=f.alternate,b!==null&&(b.lanes|=i),Ga(f,i,t),f=a.sibling}else f=a.child;if(f!==null)f.return=a;else for(f=a;f!==null;){if(f===t){f=null;break}if(a=f.sibling,a!==null){a.return=f.return,f=a;break}f=f.return}a=f}An(e,t,o.children,i),t=t.child}return t;case 9:return o=t.type,s=t.pendingProps.children,Zr(t,i),o=li(o),s=s(o),t.flags|=1,An(e,t,s,i),t.child;case 14:return s=t.type,o=vi(s,t.pendingProps),o=vi(s.type,o),Jc(e,t,s,o,i);case 15:return Xc(e,t,t.type,t.pendingProps,i);case 17:return s=t.type,o=t.pendingProps,o=t.elementType===s?o:vi(s,o),Bl(e,t),t.tag=1,Mn(s)?(e=!0,bl(t)):e=!1,Zr(t,i),Fc(t,s,o),dd(t,s,o,i),fd(null,t,s,!0,e,i);case 19:return rp(e,t,i);case 22:return Kc(e,t,i)}throw Error(h(156,t.tag))};function zp(e,t){return Js(e,t)}function Lu(e,t,i,s){this.tag=e,this.key=i,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ci(e,t,i,s){return new Lu(e,t,i,s)}function Td(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Mu(e){if(typeof e=="function")return Td(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ve)return 11;if(e===Ne)return 14}return 2}function Ws(e,t){var i=e.alternate;return i===null?(i=ci(e.tag,t,e.key,e.mode),i.elementType=e.elementType,i.type=e.type,i.stateNode=e.stateNode,i.alternate=e,e.alternate=i):(i.pendingProps=t,i.type=e.type,i.flags=0,i.subtreeFlags=0,i.deletions=null),i.flags=e.flags&14680064,i.childLanes=e.childLanes,i.lanes=e.lanes,i.child=e.child,i.memoizedProps=e.memoizedProps,i.memoizedState=e.memoizedState,i.updateQueue=e.updateQueue,t=e.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},i.sibling=e.sibling,i.index=e.index,i.ref=e.ref,i}function Zl(e,t,i,s,o,a){var f=2;if(s=e,typeof e=="function")Td(e)&&(f=1);else if(typeof e=="string")f=5;else e:switch(e){case O:return jr(i.children,o,a,t);case te:f=8,o|=8;break;case ze:return e=ci(12,i,t,o|2),e.elementType=ze,e.lanes=a,e;case ce:return e=ci(13,i,t,o),e.elementType=ce,e.lanes=a,e;case Ae:return e=ci(19,i,t,o),e.elementType=Ae,e.lanes=a,e;case pe:return Jl(i,o,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ne:f=10;break e;case ye:f=9;break e;case ve:f=11;break e;case Ne:f=14;break e;case A:f=16,s=null;break e}throw Error(h(130,e==null?e:typeof e,""))}return t=ci(f,i,t,o),t.elementType=e,t.type=s,t.lanes=a,t}function jr(e,t,i,s){return e=ci(7,e,s,t),e.lanes=i,e}function Jl(e,t,i,s){return e=ci(22,e,s,t),e.elementType=pe,e.lanes=i,e.stateNode={isHidden:!1},e}function Pd(e,t,i){return e=ci(6,e,null,t),e.lanes=i,e}function Od(e,t,i){return t=ci(4,e.children!==null?e.children:[],e.key,t),t.lanes=i,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Wu(e,t,i,s,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xo(0),this.expirationTimes=Xo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xo(0),this.identifierPrefix=s,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Id(e,t,i,s,o,a,f,b,C){return e=new Wu(e,t,i,b,C),t===1?(t=1,a===!0&&(t|=8)):t=0,a=ci(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:s,isDehydrated:i,cache:null,transitions:null,pendingSuspenseBoundaries:null},Za(a),e}function Fu(e,t,i){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:re,key:s==null?null:""+s,children:e,containerInfo:t,implementation:i}}function Dp(e){if(!e)return _s;e=e._reactInternals;e:{if(dn(e)!==e||e.tag!==1)throw Error(h(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Mn(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(h(171))}if(e.tag===1){var i=e.type;if(Mn(i))return sc(e,i,t)}return t}function Ap(e,t,i,s,o,a,f,b,C){return e=Id(i,s,!0,e,o,a,f,b,C),e.context=Dp(null),i=e.current,s=_n(),o=Ls(i),a=os(s,o),a.callback=t??null,Os(i,a,o),e.current.lanes=o,nr(e,o,s),Un(e,s),e}function Xl(e,t,i,s){var o=t.current,a=_n(),f=Ls(o);return i=Dp(i),t.context===null?t.context=i:t.pendingContext=i,t=os(a,f),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=Os(o,t,f),e!==null&&(Si(e,o,f,a),El(e,o,f)),f}function Kl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function _p(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var i=e.retryLane;e.retryLane=i!==0&&i<t?i:t}}function Rd(e,t){_p(e,t),(e=e.alternate)&&_p(e,t)}function Uu(){return null}var Tp=typeof reportError=="function"?reportError:function(e){console.error(e)};function Bd(e){this._internalRoot=e}ql.prototype.render=Bd.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(h(409));Xl(e,t,null,null)},ql.prototype.unmount=Bd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;wr(function(){Xl(null,e,null,null)}),t[ts]=null}};function ql(e){this._internalRoot=e}ql.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ft();e={blockedOn:null,target:e,priority:t};for(var i=0;i<vn.length&&t!==0&&t<vn[i].priority;i++);vn.splice(i,0,e),i===0&&_r(e)}};function Ld(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ea(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Pp(){}function Hu(e,t,i,s,o){if(o){if(typeof s=="function"){var a=s;s=function(){var U=Kl(f);a.call(U)}}var f=Ap(t,s,e,0,null,!1,!1,"",Pp);return e._reactRootContainer=f,e[ts]=f.current,Ue(e.nodeType===8?e.parentNode:e),wr(),f}for(;o=e.lastChild;)e.removeChild(o);if(typeof s=="function"){var b=s;s=function(){var U=Kl(C);b.call(U)}}var C=Id(e,0,!1,null,null,!1,!1,"",Pp);return e._reactRootContainer=C,e[ts]=C.current,Ue(e.nodeType===8?e.parentNode:e),wr(function(){Xl(t,C,i,s)}),C}function ta(e,t,i,s,o){var a=i._reactRootContainer;if(a){var f=a;if(typeof o=="function"){var b=o;o=function(){var C=Kl(f);b.call(C)}}Xl(t,f,e,o)}else f=Hu(i,t,e,o,s);return Kl(f)}ys=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var i=si(t.pendingLanes);i!==0&&(pn(t,i|1),Un(t,Et()),(wt&6)===0&&(eo=Et()+500,Ts()))}break;case 13:wr(function(){var s=rs(e,1);if(s!==null){var o=_n();Si(s,e,1,o)}}),Rd(e,1)}},it=function(e){if(e.tag===13){var t=rs(e,134217728);if(t!==null){var i=_n();Si(t,e,134217728,i)}Rd(e,134217728)}},ir=function(e){if(e.tag===13){var t=Ls(e),i=rs(e,t);if(i!==null){var s=_n();Si(i,e,t,s)}Rd(e,t)}},Ft=function(){return ut},sr=function(e,t){var i=ut;try{return ut=e,t()}finally{ut=i}},fi=function(e,t,i){switch(t){case"input":if(gn(e,i),t=i.name,i.type==="radio"&&t!=null){for(i=e;i.parentNode;)i=i.parentNode;for(i=i.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<i.length;t++){var s=i[t];if(s!==e&&s.form===e.form){var o=yl(s);if(!o)throw Error(h(90));yt(s),gn(s,o)}}}break;case"textarea":On(e,i);break;case"select":t=i.value,t!=null&&Yn(e,!!i.multiple,t,!1)}},xn=Dd,fs=wr;var Qu={usingClientEntryPoint:!1,Events:[zo,Wr,yl,Ai,Dr,Dd]},Uo={findFiberByHostInstance:fr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Vu={bundleType:Uo.bundleType,version:Uo.version,rendererPackageName:Uo.rendererPackageName,rendererConfig:Uo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:I.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ys(e),e===null?null:e.stateNode},findFiberByHostInstance:Uo.findFiberByHostInstance||Uu,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var na=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!na.isDisabled&&na.supportsFiber)try{er=na.inject(Vu),yn=na}catch{}}return Hn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Qu,Hn.createPortal=function(e,t){var i=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ld(t))throw Error(h(200));return Fu(e,t,null,i)},Hn.createRoot=function(e,t){if(!Ld(e))throw Error(h(299));var i=!1,s="",o=Tp;return t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Id(e,1,!1,null,null,i,!1,s,o),e[ts]=t.current,Ue(e.nodeType===8?e.parentNode:e),new Bd(t)},Hn.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(h(188)):(e=Object.keys(e).join(","),Error(h(268,e)));return e=Ys(t),e=e===null?null:e.stateNode,e},Hn.flushSync=function(e){return wr(e)},Hn.hydrate=function(e,t,i){if(!ea(t))throw Error(h(200));return ta(null,e,t,!0,i)},Hn.hydrateRoot=function(e,t,i){if(!Ld(e))throw Error(h(405));var s=i!=null&&i.hydratedSources||null,o=!1,a="",f=Tp;if(i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(a=i.identifierPrefix),i.onRecoverableError!==void 0&&(f=i.onRecoverableError)),t=Ap(t,null,e,1,i??null,o,!1,a,f),e[ts]=t.current,Ue(e),s)for(e=0;e<s.length;e++)i=s[e],o=i._getVersion,o=o(i._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[i,o]:t.mutableSourceEagerHydrationData.push(i,o);return new ql(t)},Hn.render=function(e,t,i){if(!ea(t))throw Error(h(200));return ta(null,e,t,!1,i)},Hn.unmountComponentAtNode=function(e){if(!ea(e))throw Error(h(40));return e._reactRootContainer?(wr(function(){ta(null,null,e,!1,function(){e._reactRootContainer=null,e[ts]=null})}),!0):!1},Hn.unstable_batchedUpdates=Dd,Hn.unstable_renderSubtreeIntoContainer=function(e,t,i,s){if(!ea(i))throw Error(h(200));if(e==null||e._reactInternals===void 0)throw Error(h(38));return ta(e,t,i,!1,s)},Hn.version="18.3.1-next-f1338f8080-20240426",Hn}var Fp;function ef(){if(Fp)return Fd.exports;Fp=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(u){console.error(u)}}return l(),Fd.exports=qu(),Fd.exports}var Up;function tf(){if(Up)return ia;Up=1;var l=ef();return ia.createRoot=l.createRoot,ia.hydrateRoot=l.hydrateRoot,ia}var nf=tf();const sf=Kp(nf),It=["permits","gravel_driveway","sand_pad","sewer","well","crane"],ji=["installation_of_home","siding_install","permits","electric_connection","concrete_skirting","plumbing","gas_propane","drywall","painting","carpet","dumpster","interior_trim_out"],sn=["installation_of_home","siding_install","permits","electric_connection","concrete_skirting","plumbing","gas_propane"],rf=["basement_stairs","water_heater","updraft_furnace","crane"],Vn=["lp_siding","tray_ceiling","full_backsplash","sets_of_drawers","meter_loop","drop_down_beam","lp_trim","amp_service_200"],Ke={name:"SHERMAN",address:"2244 Hwy 65, Mora, MN 55051",addressFull:"2244 Highway 65, Mora, MN 55051",phone:"(320) 679-3438",tagline:"Professional Modular Home Installation & Foundation Services",logoUrl:"https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png"},of=Ke,pa=15,Qd=22,Nr=20,Qo=15,Vd=15,ds=1.2,Li={SINGLE_WIDE_BASE:800,DOUBLE_WIDE_BASE:1600,SINGLE_WIDE_AXLES:275,DOUBLE_WIDE_AXLES:550,DELIVERY_INSPECTION:600,WRAP_UP:600,FOUNDATION_ADJUSTMENT:4e3,DRIVE_RATE_PER_MILE:20},ro={SPACING:{OUTER_BEAMS:6,MARRIAGE_LINE:12},CANTILEVER:2},qp={SLAB_COST_PER_SQ_FT:8},sa=[{name:"NONE",price:0,width:0,length:0,floorPlanUrl:""},{name:"RIGHT CHOICE 6616-106",price:54025,width:16,length:66,floorPlanUrl:"https://www.claytonhomes.com/homes/54RCH16663AH/"},{name:"RIGHT CHOICE 7616-107",price:59057,width:16,length:76,floorPlanUrl:"https://www.claytonhomes.com/homes/54RCH16763AH/"},{name:"RIGHT CHOICE 4028-108",price:60201,width:28,length:40,floorPlanUrl:"https://www.claytonhomes.com/homes/54RCH28403AH/"},{name:"RIGHT CHOICE 4828-109",price:64242,width:28,length:48,floorPlanUrl:"https://www.claytonhomes.com/homes/54RCH28484AH/"},{name:"RIGHT CHOICE 5628-110",price:75193,width:28,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54RCH28564AH/"},{name:"TEMPO RHYTHM NATION",price:59169,width:16,length:66,floorPlanUrl:"https://www.claytonhomes.com/homes/54TPO16663AH/"},{name:"TEMPO MOVE ON UP",price:63451,width:16,length:72,floorPlanUrl:"https://www.claytonhomes.com/homes/54TMI16723AH/"},{name:"TEMPO SWEET CAROLINE",price:65790,width:16,length:76,floorPlanUrl:"https://www.claytonhomes.com/homes/54TMI16763AH/"},{name:"TEMPO RISING SUN",price:68633,width:24,length:44,floorPlanUrl:"https://www.claytonhomes.com/homes/54TPO24442AH/"},{name:"TEMPO RISING SUN MOD",price:73102,width:24,length:44,floorPlanUrl:"https://www.claytonhomes.com/homes/54TPO24442AH/"},{name:"TEMPO 3 LITTLE BIRDS",price:74852,width:24,length:52,floorPlanUrl:"https://www.claytonhomes.com/homes/54TPO24523AH/"},{name:"TEMPO 3 LITTLE BIRDS MOD",price:77660,width:24,length:52,floorPlanUrl:"https://www.claytonhomes.com/homes/54TPO24523AH/"},{name:"TEMPO MY GIRL",price:77336,width:24,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54TPO24563AH/"},{name:"TEMPO MY GIRL MOD",price:81354,width:24,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54TPO24563AH/"},{name:"TEMPO SWEET DREAMS",price:69114,width:28,length:40,floorPlanUrl:"https://www.claytonhomes.com/homes/54TPO28403AH/"},{name:"TEMPO SWEET DREAMS MOD",price:72207,width:28,length:40,floorPlanUrl:"https://www.claytonhomes.com/homes/58TPO28403AM/"},{name:"TEMPO JOHNNY B GOODE",price:78604,width:28,length:52,floorPlanUrl:"https://www.claytonhomes.com/homes/25TPO28523PH/"},{name:"TEMPO JOHNNY B GOODE MOD",price:81749,width:28,length:52,floorPlanUrl:"https://www.claytonhomes.com/homes/58TPO28523PM/"},{name:"TEMPO LEAN ON ME",price:83676,width:28,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54TMI28563BH/"},{name:"TEMPO LEAN ON ME MOD",price:86117,width:28,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/58TMI28563BM/"},{name:"TEMPO BROWN EYED GIRL",price:85241,width:28,length:60,floorPlanUrl:"https://www.claytonhomes.com/homes/54TMI28604AH/"},{name:"TEMPO BROWN EYED GIRL MOD",price:87913,width:28,length:60,floorPlanUrl:"https://www.claytonhomes.com/homes/58TMI28604AM/"},{name:"TEMPO HEY JUDE",price:99847,width:28,length:72,floorPlanUrl:"https://www.claytonhomes.com/homes/54TPO28724AH/"},{name:"TEMPO HEY JUDE MOD",price:103756,width:28,length:72,floorPlanUrl:"https://www.claytonhomes.com/homes/54TPO28724AH/"},{name:"RAMSEY 215-1",price:44429,width:14,length:42,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS14421AH/"},{name:"RAMSEY 210-1",price:50193,width:14,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS14562AH/"},{name:"RAMSEY 208-1",price:59048,width:16,length:66,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS16663DH/"},{name:"RAMSEY 217-1",price:61202,width:16,length:70,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS16703AH/"},{name:"RAMSEY 218-1",price:60821,width:16,length:70,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS16703BH/"},{name:"RAMSEY 223",price:66878,width:16,length:76,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS16763AH/"},{name:"RAMSEY 207-1",price:64916,width:16,length:76,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS16763CH/"},{name:"RAMSEY 216-2",price:66089,width:16,length:76,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS16763DH/"},{name:"RAMSEY 65-3",price:69756,width:28,length:48,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS28483AH/"},{name:"RAMSEY 65-3 MOD",price:71297,width:28,length:48,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS28483AM/"},{name:"RAMSEY 4045-1",price:82063,width:28,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS28563AH/"},{name:"RAMSEY 4045-1 MOD",price:84422,width:28,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS28563AM/"},{name:"RAMSEY 2022-1",price:82929,width:28,length:58,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS28583AH/"},{name:"RAMSEY 2022-1 MOD",price:85482,width:28,length:58,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS28583AM/"},{name:"RAMSEY 75",price:86712,width:28,length:60,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS28604AH/"},{name:"RAMSEY 75 MOD",price:89248,width:28,length:60,floorPlanUrl:"https://www.claytonhomes.com/homes/54RMS28604AM/"},{name:"WINSTON",price:109897,width:28,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54ENC28563BH/"},{name:"WINSTON MOD",price:114449,width:28,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54ENC28563BM/"},{name:"MONTGOMERY",price:136592,width:32,length:62,floorPlanUrl:"https://www.claytonhomes.com/homes/54ENC32623AH/"},{name:"MONTGOMERY MOD",price:142295,width:32,length:62,floorPlanUrl:"https://www.claytonhomes.com/homes/54ENC32623AM/"},{name:"LANDMARK 50TH ANNIVERSARY",price:114465,width:32,length:64,floorPlanUrl:"https://www.claytonhomes.com/homes/54LDK32643AH/"},{name:"LANDMARK 50TH ANNIVERSARY MOD",price:119777,width:32,length:64,floorPlanUrl:"https://www.claytonhomes.com/homes/54LDK32643AM/"},{name:"LEGEND 518-2",price:88404,width:28,length:44,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28443BH/"},{name:"LEGEND 518-2 MOD",price:90719,width:28,length:44,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28443BM/"},{name:"LEGEND 98-2",price:93917,width:28,length:48,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28482AH/"},{name:"LEGEND 98-2 MOD",price:96494,width:28,length:48,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28482AM/"},{name:"LEGEND 76-5",price:92596,width:28,length:48,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28483BH/"},{name:"LEGEND 76-5 MOD",price:98921,width:28,length:48,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28483BM/"},{name:"LEGEND 78",price:105257,width:28,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28563AH/"},{name:"LEGEND 78 MOD",price:108851,width:28,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28563AM/"},{name:"LEGEND 412-2",price:110344,width:28,length:60,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28603AH/"},{name:"LEGEND 412-2 MOD",price:113546,width:28,length:60,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28603AM/"},{name:"LEGEND 327-2",price:112694,width:28,length:64,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28643BH/"},{name:"LEGEND 327-2 MOD",price:117114,width:28,length:64,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28643BM/"},{name:"LEGEND 413-2",price:120188,width:28,length:67,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28673AH/"},{name:"LEGEND 413-2 MOD",price:122470,width:28,length:67,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD28673AM/"},{name:"LEGEND 86",price:113965,width:32,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD32563AH/"},{name:"LEGEND 86 MOD",price:121007,width:32,length:56,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD32563AM/"},{name:"LEGEND 377-1",price:121698,width:32,length:60,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD32603AH/"},{name:"LEGEND 377-1 MOD",price:127780,width:32,length:60,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD32603AM/"},{name:"LEGEND 43",price:129362,width:32,length:64,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD32643AH/"},{name:"LEGEND 43 MOD",price:135071,width:32,length:64,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD32643AM/"},{name:"LEGEND 402",price:139408,width:32,length:72,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD32723AH/"},{name:"LEGEND 402 MOD",price:145696,width:32,length:72,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD32723AM/"},{name:"LEGEND 17-1",price:143061,width:32,length:76,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD32763AH/"},{name:"LEGEND 17-1 MOD",price:149243,width:32,length:76,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD32763AM/"},{name:"LEGEND 572-1 MOD",price:171042,width:45,length:76,floorPlanUrl:"https://www.claytonhomes.com/homes/54LGD45763AM/"}],la={great_stuff:{name:"Great Stuff",cost:9,price:18},floor_coverings:{name:"Floor Coverings",cost:65,price:130},cookies_16x4:{name:"16x4 Cookies",cost:12.01,price:24.02},tyvek:{name:"Tyvek",cost:50,price:50},anchor_system:{name:'Anchor System 44"',cost:107.51,price:161.27},steel_pier_20:{name:'20" Steel Pier',cost:15,price:30},steel_pier_22:{name:'22" Steel Pier',cost:16,price:32},steel_pier_32:{name:'32" Steel Pier',cost:24,price:48},tie_down_straps:{name:"5' Anchor Strap",cost:11.98,price:23.96},coil_nails:{name:'2" Ring Coil Nails 3600ct',cost:76.35,price:152.7},asphalt_silicon:{name:"Asphalt Silicon",cost:9.58,price:19.16},stairs_4step:{name:"4 Step Stairs w/ Platform",cost:811.65,price:1623.3},heat_tape:{name:"Heat Tape",cost:30,price:60},fiberglass_wrap:{name:"Fiberglass Pipe Wrap 3x1",cost:10,price:20},aluminum_foil_tape:{name:"Aluminum Foil Heat Tape",cost:15,price:30}},Pn={installation_of_home:{name:"Installation of Home",base:0,calc:"install_home"},permits:{name:"Permits",base:5500,addDrive:!0},drywall:{name:"Drywall",base:2500,addDrive:!0},surfaced_driveway:{name:"Surfaced Driveway",base:4320,addDrive:!0},surfaced_sidewalks:{name:"Surfaced Sidewalks",base:720,addDrive:!0},professional_cleaning:{name:"Professional Cleaning",base:1e3,addDrive:!0},electric_connection:{name:"Electric Connection",base:5e3,addDrive:!0},transformer:{name:"Transformer",base:2e3,addDrive:!0},hvac:{name:"HVAC (AC Unit)",base:5e3,addDrive:!0},concrete_skirting:{name:"Concrete Skirting",base:0,calc:"skirt"},gas_propane:{name:"Gas & Propane Connection",base:2500,addDrive:!0},plumbing:{name:"Plumbing Connections",base:2500,addDrive:!0},gravel_driveway:{name:"Gravel Driveway",base:4320,addDrive:!0},sand_pad:{name:"Sand Pad",base:2180,addDrive:!0},survey:{name:"Survey",base:1500,addDrive:!0},culvert:{name:"Culvert",base:1500,addDrive:!0},siding_install:{name:"Siding Install",base:2200,addDrive:!0},city_sewer_water:{name:"City Sewer & Water",base:5e3,addDrive:!0},underground_sleeves:{name:"Underground Sleeves",base:1400,addDrive:!0},dumpster:{name:"Dumpster Service",base:950,addDrive:!1},painting:{name:"Painting",base:900,addDrive:!1},carpet:{name:"Carpet",base:500,addDrive:!1},crane:{name:"Crane",base:8e3,addDrive:!0},updraft_furnace:{name:"Updraft Furnace",base:6e3,addDrive:!0},water_heater:{name:"Water Heater",base:1500,addDrive:!0},basement_stairs:{name:"Basement Stairs",base:2e3,addDrive:!0},closing_costs:{name:"Closing Costs (7% of Total)",base:0,calc:"closing"},interior_trim_out:{name:"Interior Trim Out",base:1200,addDrive:!0},lp_siding:{name:"LP SmartSide Siding",base:0,calc:"lp_siding"},tray_ceiling:{name:"Tray Ceiling",base:900,addDrive:!1},full_backsplash:{name:"Full Backsplash",base:800,addDrive:!1},sets_of_drawers:{name:"Sets of Drawers",base:900,addDrive:!1},meter_loop:{name:"Meter Loop",base:300,addDrive:!1},drop_down_beam:{name:"Drop Down Beam",base:500,addDrive:!1},lp_trim:{name:"LP SmartSide Trim",base:2e3,addDrive:!1},amp_service_200:{name:"200 Amp Service",base:400,addDrive:!1}},aa={none:0,"1_bed":14200,"2_bed":16700,"3_bed":17200},io={none:0,6:8300,8:10300,10:13800},oo={basement:3e4,crawlspace:22e3},Hp=[{mfr:"BlueLinx (Exterior Door)",terms:"10yr Steel/25yr Fiberglass",phone:""},{mfr:"Certainteed (Shingles)",terms:"10 Years",phone:"800-782-8777"},{mfr:"Samsung (Appliances)",terms:"2 Years",phone:"800-726-7864"},{mfr:"Carrier",terms:"2 Year Limited",phone:"866-234-1018"},{mfr:"Pella Windows",terms:"5 Year",phone:"800-374-4758"},{mfr:"Rheem (Water Heaters)",terms:"1 Year",phone:"800-432-8373"},{mfr:"Shaw Flooring",terms:"1 Year",phone:"800-720-7429"},{mfr:"Smart Lap Siding",terms:"50yr Pro-Rated",phone:"888-820-0325"},{mfr:"Sherman - Structural",terms:"30 Years",phone:"320-679-3438"},{mfr:"Sherman - Workmanship",terms:"10 Years",phone:"320-679-3438"}],lf=[{id:1,item:"Seal Badge",src:"Dept of Labor"},{id:2,item:"State Seal Certificate",src:"Dept of Labor"},{id:3,item:"Foundation Inspection Request",src:"Chuck Olsen"},{id:4,item:"Builders Certificate",src:"HUD"},{id:5,item:"Radon Gas Certificate",src:""},{id:6,item:"Certificate of Occupancy",src:"Permit Issuer"},{id:7,item:"Surety Bond",src:""},{id:8,item:"Plot Plan",src:""},{id:9,item:"Manufactured Home Warranty",src:""},{id:10,item:"Certificate of Origin",src:"Manufacturer"},{id:11,item:"Lien Release",src:""}],Qp={docs:["Verify HUD data plate","Confirm red HUD tag","Check installation instructions","Review warranties","Rivet Install Badge - Photo"],exterior:["Examine siding","Inspect roof","Check windows","Inspect trim/porches","Transit damage check"]},$r=[{id:"modular_home",name:"Modular Home",icon:"🏠",enabled:!0},{id:"stud_steel",name:"Stud and Steel",icon:"🔩",enabled:!1},{id:"traditional_garage",name:"Traditional Garage",icon:"🚗",enabled:!1},{id:"post_frame_garage",name:"Post Frame Garage",icon:"🚙",enabled:!1},{id:"stud_barndo",name:"Stud Barndo",icon:"🏚️",enabled:!1},{id:"post_frame_barndo",name:"Post Frame Barndo",icon:"🏛️",enabled:!1},{id:"traditional_home",name:"Traditional Home",icon:"🏡",enabled:!1}],Tn=()=>Date.now().toString(36)+Math.random().toString(36).substr(2),Vp=(l,u,h,S)=>{const j=of.address,k=[l,u,h,S].filter(Boolean).join(", ");return k.length>3?`https://www.google.com/maps/dir/${encodeURIComponent(j)}/${encodeURIComponent(k)}`:null},Ci=l=>l<56?10:12,af=(l,u)=>(parseFloat(l)+parseFloat(u))*2,D=l=>"$"+(parseFloat(l)||0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,","),Me=D,df=l=>"$"+(parseFloat(l)||0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,","),Fi=l=>new Date(l).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),cf=l=>new Date(l).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Mi=l=>l?l.replace(/\D/g,""):"",Wi=l=>l?l.toLowerCase().trim():"",Ui=l=>{if(!l)return"";const u=l.replace(/\D/g,"");return u.length===10?`(${u.slice(0,3)}) ${u.slice(3,6)}-${u.slice(6)}`:u.length===11&&u[0]==="1"?`(${u.slice(1,4)}) ${u.slice(4,7)}-${u.slice(7)}`:l},tn=(l,u,h)=>l.map(S=>S.id===u?h:S),ki=(l,u,h)=>({...l,...u,updatedAt:new Date().toISOString(),updatedBy:h}),p={app:{fontFamily:"'Segoe UI',sans-serif",minHeight:"100vh",background:"#f0f2f5"},login:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#2c5530,#1a3a1f)",padding:20},card:{background:"#fff",padding:32,borderRadius:12,boxShadow:"0 10px 40px rgba(0,0,0,0.3)",width:"100%",maxWidth:420,textAlign:"center"},input:{width:"100%",padding:"12px 14px",border:"2px solid #ddd",borderRadius:6,fontSize:15,marginBottom:12,boxSizing:"border-box"},inputSm:{width:"90px",padding:"8px",border:"1px solid #ddd",borderRadius:4,fontSize:14,textAlign:"right"},inputEdit:{padding:"6px 10px",border:"1px solid #2c5530",borderRadius:4,fontSize:14,textAlign:"right",width:"100px"},btn:{padding:"14px 24px",background:"#2c5530",color:"#fff",border:"none",borderRadius:6,fontSize:16,fontWeight:600,cursor:"pointer",width:"100%"},btn2:{padding:"10px 20px",background:"#6c757d",color:"#fff",border:"none",borderRadius:6,cursor:"pointer"},btnSm:{padding:"8px 12px",background:"#2c5530",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontSize:13,textDecoration:"none",display:"inline-block"},btnDanger:{padding:"10px 20px",background:"#dc3545",color:"#fff",border:"none",borderRadius:6,cursor:"pointer"},header:{background:"#2c5530",color:"#fff",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12},nav:{background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.3)",padding:"8px 16px",borderRadius:4,cursor:"pointer",fontSize:14},main:{padding:24,maxWidth:1200,margin:"0 auto"},box:{background:"#fff",borderRadius:8,padding:20,boxShadow:"0 2px 8px rgba(0,0,0,0.08)",marginBottom:16},grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16},row:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:16},label:{display:"block",marginBottom:6,fontWeight:500,fontSize:14},select:{width:"100%",padding:"12px 14px",border:"2px solid #ddd",borderRadius:6,fontSize:15,background:"#fff"},tab:{padding:"10px 16px",background:"#fff",border:"1px solid #ddd",borderRadius:4,cursor:"pointer",fontSize:14},tabA:{borderColor:"#2c5530",background:"#f0f7f1",fontWeight:600},badge:{display:"inline-block",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600},table:{width:"100%",borderCollapse:"collapse",fontSize:14},th:{textAlign:"left",padding:"10px 8px",borderBottom:"2px solid #ddd",background:"#f8f9fa",fontWeight:600},td:{padding:"8px",borderBottom:"1px solid #eee"},override:{background:"#fff3cd",borderColor:"#ffc107"},customSvc:{display:"grid",gridTemplateColumns:"1fr 100px",gap:8,padding:"10px",background:"#f0f7f1",borderRadius:6,border:"1px dashed #2c5530",marginTop:8},chk:{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderBottom:"1px solid #eee"},btnBlue:{padding:"8px 12px",background:"#1565c0",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontSize:13,textDecoration:"none",display:"inline-block"},btnOrange:{padding:"8px 12px",background:"#e65100",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontSize:13,textDecoration:"none",display:"inline-block"},btnPurple:{padding:"8px 12px",background:"#6a1b9a",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontSize:13,textDecoration:"none",display:"inline-block"},btnPurpleAlt:{padding:"8px 12px",background:"#6f42c1",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontSize:13,textDecoration:"none",display:"inline-block"},btnAmber:{padding:"8px 12px",background:"#ff6f00",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontSize:13,textDecoration:"none",display:"inline-block"},btnEditSm:{background:"transparent",border:"none",color:"#1565c0",cursor:"pointer",fontSize:11},btnDeleteSm:{background:"transparent",border:"none",color:"#dc3545",cursor:"pointer",fontSize:11},btnDeleteSmMd:{background:"transparent",border:"none",color:"#dc3545",cursor:"pointer",fontSize:12}},nn=(l,u=null)=>new Promise((h,S)=>{const j=new FileReader;j.onload=()=>h(j.result),j.onerror=()=>S(new Error(`Failed to read file${u?": "+u:""}`)),j.onabort=()=>S(new Error(`File read was aborted${u?": "+u:""}`)),j.readAsDataURL(l)}),ra=(l,u)=>async h=>{try{await window.storage.set(l,JSON.stringify(h)),u(h)}catch(S){throw console.error(`Failed to save ${l}:`,S),S}},tt={success:l=>alert(`✅ ${l}`),error:l=>alert(`❌ ${l}`),warning:l=>alert(`⚠️ ${l}`),info:l=>alert(`ℹ️ ${l}`),fileSaved:(l,u)=>tt.success(`${l} saved to ${u}!`),duplicateError:(l,u,h)=>tt.error(`DUPLICATE ${l.toUpperCase()}

👤 ${u}
${h}

Cannot save this duplicate. Please use a different ${l}.`)},rt={formatDate:(l=new Date)=>l.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),getQuoteNum:l=>{var u;return((u=l==null?void 0:l.id)==null?void 0:u.slice(-8).toUpperCase())||"DRAFT"},getHomeDesc:l=>l!=null&&l.homeModel&&l.homeModel!=="NONE"?l.homeModel:`${(l==null?void 0:l.houseWidth)||""}' × ${(l==null?void 0:l.houseLength)||""}'`,getBaseStyles:(l="850px")=>`
    body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;max-width:${l};margin:0 auto;color:#333;line-height:1.6}
    .header{border-bottom:3px solid #2c5530;padding-bottom:20px;margin-bottom:30px;display:flex;justify-content:space-between;align-items:flex-start}
    .section{margin-bottom:25px;padding:15px;background:#f8f9fa;border-radius:8px}
    .section-title{font-size:18px;font-weight:600;color:#2c5530;margin-bottom:10px;border-bottom:2px solid #2c5530;padding-bottom:5px}
    table{width:100%;border-collapse:collapse;margin:10px 0}
    th,td{padding:10px;text-align:left;border-bottom:1px solid #ddd}
    th{background:#2c5530;color:white;font-weight:600}
    tr:hover{background:#f5f5f5}
  `},Gd={required:(l,u)=>{if(!l||l.toString().trim()==="")throw new Error(`${u} is required`)},email:(l,u,h=null,S="email")=>{const j=u.find(k=>k[S]===l&&k.id!==h);if(j)throw new Error(`Duplicate ${S}: ${j.firstName} ${j.lastName} (${l})`)},phone:(l,u,h=null,S="phone")=>{const j=u.find(k=>k[S]===l&&k.id!==h);if(j)throw new Error(`Duplicate ${S}: ${j.firstName} ${j.lastName} (${l})`)},fileSize:(l,u=50)=>{const h=u*1024*1024;if(l.size>h)throw new Error(`File "${l.name}" exceeds ${u}MB limit`)}},Cn=(l,u)=>{var j,k,L,T,W,E;const h=parseFloat(u.houseWidth)||0,S=parseFloat(u.houseLength)||0;switch(l){case"siding_install":{const z="Gable 1 and Gable 2, soffits, fascial";return u.patioSize&&u.patioSize!=="none"?`${z}, ceiling soffit and trims`:z}case"interior_trim_out":return"Includes doors, jams, stops, base, casements, etc.";case"gravel_driveway":{const z=((j=u.serviceDimensions)==null?void 0:j.gravel_driveway)||{};return z.length&&z.width?`${z.width}' x ${z.length}'`:""}case"sand_pad":return h>0&&S>0?`${h+10}' x ${S+10}'`:"";case"surfaced_driveway":{const z=((k=u.serviceDimensions)==null?void 0:k.surfaced_driveway)||{},V=z.depth||"4";return z.length&&z.width?`${z.width}' x ${z.length}' x ${V}"`:""}case"surfaced_sidewalks":{const z=((L=u.serviceDimensions)==null?void 0:L.surfaced_sidewalks)||{},V=z.depth||"4";return z.length&&z.width?`${z.width}' x ${z.length}' x ${V}"`:""}case"culvert":{const z=((T=u.serviceDimensions)==null?void 0:T.culvert)||{};return z.length?`${z.length} ft`:""}case"landscaping":return((W=u.serviceDescriptions)==null?void 0:W.landscaping)||"";case"deck":return((E=u.serviceDescriptions)==null?void 0:E.deck)||"";default:return""}},eu={4:9.25,5:10,6:10.5},Gp=(l,u)=>{var T;const h=((T=l.serviceDimensions)==null?void 0:T[u])||{},S=parseFloat(h.length)||0,j=parseFloat(h.width)||0,k=h.depth||"4",L=eu[k]||9.25;return S>0&&j>0?S*j*L:0},pf=(l,u)=>Math.ceil(l*12/39*u/100),uf=(l,u,h,S)=>{const j=(u==null?void 0:u.toLowerCase())==="double",k=2*Math.ceil(l/6+1)*(j?2.5:1);return Math.ceil(k+(j?0:2*((parseInt(h)||0)+(parseInt(S)||0))))},so=l=>Math.max(pa,parseFloat(l)||pa),tu=(l,u)=>{if(u==="basement"){if(l==="sand_pad")return 5e3;if(l==="plumbing")return 2e3;if(l==="electric_connection")return 3e3}return u==="crawlspace"&&l==="sand_pad"?5e3:0},nu=(l,u,h)=>{const S=u==="Double",j=l*Li.DRIVE_RATE_PER_MILE*2+(S?Li.DOUBLE_WIDE_BASE:Li.SINGLE_WIDE_BASE),k=S?Li.DOUBLE_WIDE_AXLES:Li.SINGLE_WIDE_AXLES,L=l*Li.DRIVE_RATE_PER_MILE+Li.DELIVERY_INSPECTION,T=l*Li.DRIVE_RATE_PER_MILE+Li.WRAP_UP,W=h==="basement"||h==="crawlspace"?Li.FOUNDATION_ADJUSTMENT:0;return{installation:j,axles:k,deliveryInspection:L,wrapUp:T,foundationAdj:W,total:j+k+L+T+W,breakdown:[{name:"Installation",cost:j},{name:"Axles",cost:k},{name:"Delivery & Inspection",cost:L},{name:"Wrap-Up",cost:T},...W>0?[{name:"Foundation Adjustment",cost:W}]:[]]}},Jd=(l,u,h,S,j,k=Nr,L=1,T="Single",W="none",E=0)=>{const z=h*k;if(u.calc==="pad")return S*j*qp.SLAB_COST_PER_SQ_FT+z;if(u.calc==="skirt"){const V=E>0?E*2:0;return(24*(af(S,j)+V)+(h+200)*3)*1.1}if(u.calc==="lp_siding"){let V=0;return j<=52?V=6550:j>=53&&j<=64?V=6950:j>=65&&(V=7850),V*1.05}return u.calc==="install_home"?nu(h,T,W).total:u.calc==="landscaping"?2200+z*L:u.calc==="deck"?3700+z*L:u.calc==="closing"?0:u.addDrive?u.base+z:u.base},ff=l=>{let u=Object.values(l.selectedServices||{}).filter(Boolean).length;return l.sewerType&&l.sewerType!=="none"&&u++,parseFloat(l.wellDepth)>0&&u++,l.patioSize&&l.patioSize!=="none"&&u++,(l.customServices||[]).forEach(h=>{h.name&&h.price&&u++}),u},hf=(l,u=Qo,h={})=>{const S=h.psPerService||150,j=h.pmBase||4e3,k=so(l.driveTime),L=ff(l),T=L*S+k*u*L,W=k*u+j,E=W/2+k*u;return{ps:T,pm:W,pc:E,total:T+W+E,numSvc:L,miles:k,psPerService:S,pmBase:j}},da=(l,u)=>{var Y,oe;const h=[],S=parseFloat(l.houseWidth)||0,j=parseFloat(l.houseLength)||0,k=parseInt(l.walkDoors)||2,L=l.iBeamHeight||Ci(j),T=uf(j,l.singleDouble,k,0),W=l.removedMaterials||{},E=(ee,R,$,H)=>{W[ee]||h.push({key:ee,item:R,qty:$,price:H,total:$*H})};E("great_stuff",u.great_stuff.name,2,u.great_stuff.price);const z=pf(S,j);E("floor_coverings",u.floor_coverings.name,z,u.floor_coverings.price),k>0&&E("cookies_16x4",u.cookies_16x4.name,k*6,u.cookies_16x4.price),E("tyvek",u.tyvek.name,1,u.tyvek.price),E("anchor_system",u.anchor_system.name,2,u.anchor_system.price);const V=T+k*2,F=L>=11?u.steel_pier_20:u.steel_pier_22,J=L>=11?"steel_pier_20":"steel_pier_22";return E(J,F.name,V,F.price),((Y=l.singleDouble)==null?void 0:Y.toLowerCase())==="double"&&E("steel_pier_32",u.steel_pier_32.name,Math.ceil(j/12),u.steel_pier_32.price),((oe=l.singleDouble)==null?void 0:oe.toLowerCase())==="single"&&E("tie_down_straps",u.tie_down_straps.name,4,u.tie_down_straps.price),E("coil_nails",u.coil_nails.name,1,u.coil_nails.price),E("asphalt_silicon",u.asphalt_silicon.name,2,u.asphalt_silicon.price),k>0&&E("stairs_4step",u.stairs_4step.name,k,u.stairs_4step.price),E("heat_tape",u.heat_tape.name,1,u.heat_tape.price),E("fiberglass_wrap",u.fiberglass_wrap.name,1,u.fiberglass_wrap.price),E("aluminum_foil_tape",u.aluminum_foil_tape.name,1,u.aluminum_foil_tape.price),(l.customMaterials||[]).forEach((ee,R)=>{if(ee.name&&ee.price&&!W[`custmat_${R}`]){const $=parseFloat(ee.quantity)||1,H=parseFloat(ee.price)||0;h.push({key:`custmat_${R}`,item:ee.name,qty:$,price:H,total:$*H})}}),h},mf=(l,u,h,S,j,k,L,T,W)=>{const E=[];return Object.entries(l.selectedServices||{}).forEach(([z,V])=>{var H,I,v;if(!V||!u[z]||W[z])return;const F=u[z],J=(H=l.servicePriceOverrides)==null?void 0:H[z],Y=F.hasQuantity&&((I=l.serviceQuantities)==null?void 0:I[z])||1,oe=l.serviceDays&&l.serviceDays[z]||1,ee=l.patioSize&&l.patioSize!=="none"&&parseFloat(l.patioSize)||0;let R=J!==void 0&&J!==""?parseFloat(J):Jd(z,F,h,j,k,L,oe,l.singleDouble,T,ee);if(z==="installation_of_home"&&(J===void 0||J==="")&&(R=nu(h,l.singleDouble,T).total),(z==="surfaced_driveway"||z==="surfaced_sidewalks")&&(J===void 0||J==="")){const re=((v=l.serviceDimensions)==null?void 0:v[z])||{},O=parseFloat(re.length)||0,te=parseFloat(re.width)||0,ze=re.depth||"4",ne=eu[ze]||9.25;O>0&&te>0&&(R=O*te*ne)}(J===void 0||J==="")&&(R+=tu(z,T)),R=R*Y;let $=F.hasQuantity&&Y>1?`${F.name} (×${Y})`:F.name;E.push({item:$,key:z,cost:R,isOverride:J!==void 0&&J!==""})}),E},gf=(l,u,h,S,j,k,L)=>{var z;if(L.foundation)return null;const T=(z=l.servicePriceOverrides)==null?void 0:z.foundation;let W=0,E="";return j==="slab"?(E="Foundation - Engineered Slab",W=u*h*qp.SLAB_COST_PER_SQ_FT+S):j==="basement"?(E="Foundation - Basement (includes waterproofing & insulation)",W=((k==null?void 0:k.basement)||3e4)+S):j==="crawlspace"&&(E="Foundation - Crawl Space",W=((k==null?void 0:k.crawlspace)||22e3)+S),T!==void 0&&T!==""&&(W=parseFloat(T)),{item:E,key:"foundation",cost:W,isOverride:T!==void 0&&T!==""}},xf=(l,u,h,S,j)=>{const k=[];return S==="basement"&&["basement_stairs","water_heater","updraft_furnace"].forEach(T=>{var W,E;if(!j[T]&&!((W=l.selectedServices)!=null&&W[T])&&u[T]){const z=u[T],V=(E=l.servicePriceOverrides)==null?void 0:E[T],F=V!==void 0&&V!==""?parseFloat(V):z.base+h;k.push({item:z.name,key:T,cost:F,isOverride:V!==void 0&&V!=="",autoAdded:!0})}}),k},yf=(l,u,h,S,j)=>{var L,T,W;const k=[];if(l.sewerType&&l.sewerType!=="none"&&!j.sewer){const E=(L=l.servicePriceOverrides)==null?void 0:L.sewer;k.push({item:`Sewer (${l.sewerType.replace("_"," ")})`,key:"sewer",cost:E?parseFloat(E):u[l.sewerType]+S*2,isOverride:!!E})}if(parseFloat(l.wellDepth)>0&&!j.well){const E=(T=l.servicePriceOverrides)==null?void 0:T.well;k.push({item:`Well (${l.wellDepth} ft)`,key:"well",cost:E?parseFloat(E):120*parseFloat(l.wellDepth)+S,isOverride:!!E})}if(l.patioSize&&l.patioSize!=="none"&&!j.patio){const E=(W=l.servicePriceOverrides)==null?void 0:W.patio;k.push({item:`Patio (${l.patioSize} ft)`,key:"patio",cost:E?parseFloat(E):h[l.patioSize],isOverride:!!E})}return k},vf=(l,u,h)=>{const S=[];if(l.hasLandscaping&&!h.landscaping){const j=l.landscapingDays||1,k=parseFloat(l.landscapingMaterialCost)||0,L=1200,T=u*j,W=k+L+T;S.push({item:`Landscaping (${j} day${j>1?"s":""}) - Materials: ${D(k)} + Labor: ${D(L)} + Drive: ${D(T)}`,key:"landscaping",cost:W})}if(l.hasDeck&&!h.deck){const j=l.deckDays||1,k=parseFloat(l.deckMaterialCost)||0,L=1200,T=u*j,W=k+L+T;S.push({item:`Deck (${j} day${j>1?"s":""}) - Materials: ${D(k)} + Labor: ${D(L)} + Drive: ${D(T)}`,key:"deck",cost:W})}return S},bf=(l,u)=>{const h=[];return(l.customServices||[]).forEach((S,j)=>{S.name&&S.price&&!u[`custom_${j}`]&&h.push({item:S.name,key:`custom_${j}`,cost:parseFloat(S.price)||0,isCustom:!0})}),(l.customOptions||[]).forEach((S,j)=>{if(S.name&&S.price&&!u[`customopt_${j}`]){const k=parseFloat(S.quantity)||1,L=(parseFloat(S.price)||0)*k,T=k>1?`${S.name} (×${k})`:S.name;h.push({item:T,key:`customopt_${j}`,cost:L,isCustom:!0})}}),h},wf=(l,u,h,S,j=Nr,k=oo)=>{const L=so(l.driveTime),T=L*j,W=parseFloat(l.houseWidth)||0,E=parseFloat(l.houseLength)||0,z=l.removedServices||{},V=l.foundationType||"none";return[...mf(l,u,L,T,W,E,j,V,z),gf(l,W,E,T,V,k,z),...xf(l,u,T,V,z),...yf(l,h,S,T,z),...vf(l,T,z),...bf(l,z)].filter(Boolean)},Kd=(l,u,h,S,j,k={install:22,service:20,projectCommand:15,inspection:15},L=oo,T={})=>{var ze,ne,ye;const W=da(l,u),E=[];let z=wf(l,h,S,j,k.service,L);const V=W.reduce((ve,ce)=>ve+ce.total,0),F=0,J=hf(l,k.projectCommand,T);let Y=z.reduce((ve,ce)=>ve+ce.cost,0);const oe=parseFloat(l.homeBasePrice)||0,ee=oe*ds;let R=V+F+Y+ee+J.total,$=R*.05;const H=(l.markupRate!==void 0&&l.markupRate!==""?parseFloat(l.markupRate):10)/100;let I=(R+$)*H,v=R+$+I;if((ze=l.selectedServices)!=null&&ze.closing_costs&&!((ne=l.removedServices)!=null&&ne.closing_costs)){const ve=(ye=l.servicePriceOverrides)==null?void 0:ye.closing_costs,ce=ve!==void 0&&ve!==""?parseFloat(ve):Math.round(v*(.07/.93));z.push({item:"Closing Costs (7% of Total)",key:"closing_costs",cost:ce,isOverride:ve!==void 0&&ve!==""}),Y+=ce,R=V+F+Y+ee+J.total,$=R*.05,I=(R+$)*H,v=R+$+I}const re=(l.contingencyRate!==void 0&&l.contingencyRate!==""?parseFloat(l.contingencyRate):2)/100,O=Math.round(v*re),te=v+O;return{mat:W,lab:E,svc:z,projCmd:J,matT:V,labT:F,svcT:Y,homeBasePrice:oe,homePrice:ee,sub:R,oh:$,mu:I,total:v,contingency:O,totalWithContingency:te}},Xt={calculateQuoteTotals:(l,u,h,S,j,k,L,T,W)=>{const E={...l,...u};return Kd(E,h,S,j,k,L,T,W)},getBeamHeight:l=>(l==null?void 0:l.iBeamHeight)||Ci(parseFloat(l==null?void 0:l.houseLength)||56)},Nn={DEFAULT_FOLDERS:{clayton_docs:[],crew_files:[],estimates:[],permits:[],change_orders:[],contracts:[]},getFolders:l=>({...Nn.DEFAULT_FOLDERS,...(l==null?void 0:l.folders)||{}}),createFileObject:(l,u,h,S="",j="")=>({id:Tn(),name:l,type:u,url:h,notes:S,addedBy:j,addedAt:new Date().toISOString()})},iu=(l,u)=>Kd(l,la,u||Pn,aa,io,{service:Nr,projectCommand:Qo},oo),ti=l=>new Date(l).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"}),Sf={slab:"Concrete Slab Foundation",crawlspace:"Crawl Space Foundation",basement:"Full Basement Foundation"},su=l=>Sf[l]||"None",ru=(l,u,h,S)=>{var L,T,W,E,z,V;const j=h[l],k=(L=S==null?void 0:S.svc)==null?void 0:L.find(F=>F.key===l);return{key:l,name:(j==null?void 0:j.name)||l,description:(j==null?void 0:j.description)||"",customerNote:((T=u.serviceNotes)==null?void 0:T[l])||"",publishedCustomerNotes:((W=u.publishedServiceNotes)==null?void 0:W[l])||[],publishedCrewNotes:((E=u.publishedServiceCrewNotes)==null?void 0:E[l])||[],cost:(k==null?void 0:k.cost)||0,quantity:((z=u.serviceQuantities)==null?void 0:z[l])||"",days:((V=u.serviceDays)==null?void 0:V[l])||""}},ua=(l,u)=>{var S,j,k,L,T,W,E,z,V,F,J,Y,oe,ee,R,$,H,I,v,re,O,te,ze,ne,ye;const h=[];return l.sewerType&&l.sewerType!=="none"&&h.push({key:"sewer",name:"Sewer System",nameWithDetail:`Sewer System (${l.sewerType.replace("_"," ")})`,description:l.sewerType,cost:((j=(S=u==null?void 0:u.svc)==null?void 0:S.find(ve=>ve.key==="sewer"))==null?void 0:j.cost)||0,customerNote:((k=l.serviceNotes)==null?void 0:k.sewer)||"",publishedCustomerNotes:((L=l.publishedServiceNotes)==null?void 0:L.sewer)||[],publishedCrewNotes:((T=l.publishedServiceCrewNotes)==null?void 0:T.sewer)||[]}),l.wellDepth&&parseFloat(l.wellDepth)>0&&h.push({key:"well",name:"Well System",nameWithDetail:`Well Drilling (${l.wellDepth} ft)`,description:`${l.wellDepth} ft deep`,cost:((E=(W=u==null?void 0:u.svc)==null?void 0:W.find(ve=>ve.key==="well"))==null?void 0:E.cost)||0,customerNote:((z=l.serviceNotes)==null?void 0:z.well)||"",publishedCustomerNotes:((V=l.publishedServiceNotes)==null?void 0:V.well)||[],publishedCrewNotes:((F=l.publishedServiceCrewNotes)==null?void 0:F.well)||[]}),l.patioSize&&l.patioSize!=="none"&&h.push({key:"patio",name:"Patio",nameWithDetail:`Patio (${l.patioSize} ft)`,description:`${l.patioSize} wide`,cost:((Y=(J=u==null?void 0:u.svc)==null?void 0:J.find(ve=>ve.key==="patio"))==null?void 0:Y.cost)||0,customerNote:((oe=l.serviceNotes)==null?void 0:oe.patio)||"",publishedCustomerNotes:((ee=l.publishedServiceNotes)==null?void 0:ee.patio)||[],publishedCrewNotes:((R=l.publishedServiceCrewNotes)==null?void 0:R.patio)||[]}),l.hasLandscaping&&h.push({key:"landscaping",name:"Landscaping",nameWithDetail:"Landscaping",description:"Landscaping services",cost:((H=($=u==null?void 0:u.svc)==null?void 0:$.find(ve=>ve.key==="landscaping"))==null?void 0:H.cost)||0,customerNote:((I=l.serviceNotes)==null?void 0:I.landscaping)||"",publishedCustomerNotes:((v=l.publishedServiceNotes)==null?void 0:v.landscaping)||[],publishedCrewNotes:((re=l.publishedServiceCrewNotes)==null?void 0:re.landscaping)||[]}),l.hasDeck&&h.push({key:"deck",name:"Deck Project",nameWithDetail:"Deck",description:"Deck construction services",cost:((te=(O=u==null?void 0:u.svc)==null?void 0:O.find(ve=>ve.key==="deck"))==null?void 0:te.cost)||0,customerNote:((ze=l.serviceNotes)==null?void 0:ze.deck)||"",publishedCustomerNotes:((ne=l.publishedServiceNotes)==null?void 0:ne.deck)||[],publishedCrewNotes:((ye=l.publishedServiceCrewNotes)==null?void 0:ye.deck)||[]}),h},kf=(l,u,h)=>{const S=[],j=[],k=h==null?void 0:h.find(R=>R.name===l.homeModel),L=(k==null?void 0:k.floorPlanUrl)||"",T=[],W='<span style="display:inline-block;font-size:9px;background:#e3f2fd;color:#1565c0;padding:1px 5px;border-radius:3px;margin-left:6px;font-weight:600">MN LICENSE REQ.</span>',E='<span style="display:inline-block;font-size:9px;background:#fff3cd;color:#856404;padding:1px 5px;border-radius:3px;margin-left:6px;font-weight:600">ALLOWANCE</span>';Object.entries(l.selectedServices||{}).forEach(([R,$])=>{var H;if($&&Pn[R]){const I=Pn[R].name;if(It.includes(R)){const v=((H=u.svc.find(re=>re.key===R))==null?void 0:H.cost)||0;T.push({name:I,key:R,cost:v})}else Vn.includes(R)?j.push(I):S.push({name:I,key:R})}}),ua(l,u).forEach(R=>{R.key==="sewer"||R.key==="well"?T.push({name:R.nameWithDetail,key:R.key,cost:R.cost}):S.push({name:R.nameWithDetail,key:R.key})}),(l.customServices||[]).forEach(R=>{R.name&&S.push({name:R.name,key:"custom"})}),(l.customOptions||[]).forEach((R,$)=>{if(R.name&&R.price){const H=parseFloat(R.quantity)||1;S.push({name:H>1?`${R.name} (×${H})`:R.name,key:`customopt_${$}`})}});const V=(R,$)=>{const H=sn.includes(R.key)?0:1,I=sn.includes($.key)?0:1;return H-I},F=S.filter(R=>ji.includes(R.key)).sort(V),J=S.filter(R=>!ji.includes(R.key)).sort(V);T.sort(V);const Y=R=>{let $="";sn.includes(R.key)&&($+=W),It.includes(R.key)&&($+=E);const H=Cn(R.key,l);return`<li>${R.name}${$}${H?`<div style="font-size:12px;color:#555;font-style:italic;margin-top:2px">${H}</div>`:""}</li>`},oe=T.reduce((R,$)=>R+$.cost,0),ee=rt.formatDate();return`<!DOCTYPE html><html><head><title>Quote - ${l.customerFirstName} ${l.customerLastName}</title>
<style>
${rt.getBaseStyles("850px")}
.total{font-size:24px;font-weight:700;color:#2c5530;text-align:center;padding:18px;background:#e8f5e9;border-radius:8px;border:2px solid #2c5530}
.allowance-box{background:#fff9e6;padding:15px;border-radius:8px;border:2px solid #ffc107;margin-bottom:20px}
.allowance-table{width:100%;border-collapse:collapse;margin-top:10px}
.allowance-table td{padding:8px;border-bottom:1px solid #ddd}
.allowance-table td:first-child{font-weight:600}
.allowance-table td:last-child{text-align:right;font-weight:700;color:#856404}
.contingency-box{background:#e3f2fd;padding:18px;border-radius:8px;border:2px solid #1565c0;margin:20px 0}
.contingency-title{font-size:20px;font-weight:700;color:#1565c0;margin-bottom:10px;display:flex;justify-content:space-between}
.investment-total{font-size:32px;font-weight:800;color:#2c5530;text-align:center;padding:24px;background:#e8f5e9;border-radius:8px;border:3px solid #2c5530;margin-top:20px}
</style></head><body>
<div class="header"><img src="${Ke.logoUrl}" style="height:50px"><div style="float:right;text-align:right;font-size:13px;color:#666">Quote #${rt.getQuoteNum(l)}<br>${ee}</div></div>
<div class="section"><div class="section-title">Customer</div><strong>${l.customerFirstName} ${l.customerLastName}</strong><br>${Ui(l.phone)} | ${l.email}<br>${l.siteAddress}, ${l.siteCity}, ${l.siteState} ${l.siteZip}</div>
${l.homeModel&&l.homeModel!=="NONE"?`<div class="section"><div class="section-title">Home</div><strong>${l.homeModel}</strong><br>${l.houseWidth}' × ${l.houseLength}' ${l.singleDouble} Wide</div>`:""}
${L?`<div class="section"><div class="section-title">Floor Plan</div><p><a href="${L}" target="_blank" style="color:#1565c0">View Floor Plan on Clayton Homes Website</a></p></div>`:""}
${F.length>0?`<div class="section"><div class="section-title">Home Installation Services</div><ul>${F.map(Y).join("")}</ul></div>`:""}
${J.length>0?`<div class="section"><div class="section-title">Professional Services</div><ul>${J.map(Y).join("")}</ul></div>`:""}
${j.length>0?`<div class="section"><div class="section-title">Home Spec Additions</div><ul>${j.map(R=>`<li>${R}</li>`).join("")}</ul></div>`:""}
<div class="total">Total Project Price: ${D(u.total)}</div>
${T.length>0?`
<div class="allowance-box">
  <div style="font-size:20px;font-weight:700;color:#856404;margin-bottom:12px;border-bottom:2px solid #ffc107;padding-bottom:10px">Allowances & Contingency Fund</div>
  <p style="font-size:13px;color:#856404;margin:0 0 12px 0;line-height:1.5"><strong>What are allowances?</strong> These are estimated costs based on 49 years of experience. Actual costs may vary depending on site conditions. Any savings or overages are tracked in your Running Balance below.</p>

  <div style="font-size:15px;font-weight:600;color:#856404;margin:12px 0 8px 0">Allowance Items:</div>
  <table class="allowance-table">
    ${T.map(R=>{const $=Cn(R.key,l);return`<tr><td>${R.name}${sn.includes(R.key)?W:""}${E}${$?`<div style="font-size:12px;color:#555;font-style:italic;margin-top:2px">${$}</div>`:""}</td><td>${D(R.cost)}</td></tr>`}).join("")}
    <tr style="border-top:2px solid #ffc107"><td style="font-weight:700">Total Allowances</td><td style="font-weight:700">${D(oe)}</td></tr>
  </table>

  <div style="margin-top:16px;padding:12px;background:#e3f2fd;border-radius:6px;border-left:4px solid #1565c0">
    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
      <span style="font-weight:600;color:#1565c0">Contingency Fund</span>
      <span style="font-weight:700;color:#1565c0">${D(u.contingency)}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding-top:8px;border-top:2px solid #1565c0">
      <span style="font-size:16px;font-weight:700;color:#1565c0">Running Balance (Allowances + Contingency)</span>
      <span style="font-size:16px;font-weight:700;color:#1565c0">${D(oe+u.contingency)}</span>
    </div>
  </div>

  <p style="font-size:12px;color:#666;margin:12px 0 0 0;line-height:1.5">This running balance is your project protection fund. If allowances come in under budget, savings are added here. If they exceed estimates or you make change orders, funds are drawn from here first. At project completion, any remaining balance is returned to you.</p>
</div>
`:`
<div class="contingency-box">
  <div style="display:flex;justify-content:space-between;margin-bottom:8px">
    <span style="font-weight:600;color:#1565c0">Contingency Fund</span>
    <span style="font-weight:700;color:#1565c0">${D(u.contingency)}</span>
  </div>
  <p style="font-size:13px;color:#666;line-height:1.6;margin:0">A dedicated fund for change orders and project adjustments. At project completion, any unused contingency is returned to you.</p>
</div>
`}
<div class="investment-total">Total Investment: ${D(u.totalWithContingency)}</div>
<div style="margin-top:30px;padding:15px;background:#fff9e6;border-radius:8px;font-size:13px"><strong>Terms:</strong> Quote valid 30 days. 50% deposit required. Balance due upon completion.</div>
</body></html>`},jf=(l,u)=>{const h=parseFloat(l.houseWidth)||28,S=parseFloat(l.houseLength)||56,j=l.singleDouble==="Single"||h<=16,k=l.iBeamHeight||Ci(S),L=k>=11?20:22,W=L+k+1,E=ro.CANTILEVER,z=S-E*2,V=ro.SPACING.OUTER_BEAMS,F=ro.SPACING.MARRIAGE_LINE,J=Math.ceil(z/V)+1,Y=z/(J-1),oe=j?0:Math.ceil(z/F)+1,ee=j?0:z/(oe-1),R=7,$=80,H=90,I=S*R+$+60,v=h*R+H+100,re=$,O=H,te=$+E*R,ze=[],ne=[],ye=[];for(let le=0;le<J;le++){const de=le*Y,_e=te+de*R;ze.push({x:_e,dist:E+de}),ne.push({x:_e,dist:E+de})}if(!j)for(let le=0;le<oe;le++){const de=le*ee;ye.push({x:te+de*R,dist:E+de})}const ve=ze.length*2+ye.length,ce=le=>{const de=Math.floor(le),_e=Math.round((le-de)*12);return`${de}'-${_e}"`},Ae=ze.map(le=>`<rect x="${le.x-8}" y="${O-8}" width="16" height="16" fill="none" stroke="#333" stroke-width="1.5"/>`).join(""),Ne=ne.map(le=>`<rect x="${le.x-8}" y="${O+h*R-8}" width="16" height="16" fill="none" stroke="#333" stroke-width="1.5"/>`).join(""),A=ye.map(le=>`<rect x="${le.x-8}" y="${O+h/2*R-8}" width="16" height="16" fill="none" stroke="#333" stroke-width="1.5"/>`).join(""),pe=ze.map(le=>`<line x1="${le.x}" y1="${O-45}" x2="${le.x}" y2="${O-35}" stroke="#333" stroke-width="1"/>`).join(""),G=ze.slice(0,-1).map((le,de)=>`<text x="${(le.x+ze[de+1].x)/2}" y="${O-50}" text-anchor="middle" font-size="10">${ce(Y)}</text>`).join(""),ae=220,y=ae-L*2.5,w=y-8,d=w-7,P=d-k*2.5,ie=P-18;return`<!DOCTYPE html><html><head><title>Pier Layout - ${u.firstName} ${u.lastName}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:1100px;margin:0 auto}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;border-bottom:2px solid #333;padding-bottom:10px}
.info-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:20px}
.info-box{background:#f8f9fa;padding:10px;border-radius:4px;text-align:center;border:1px solid #ddd}
.info-label{font-size:10px;color:#666;text-transform:uppercase}
.info-value{font-size:18px;font-weight:700}
.diagrams{display:grid;grid-template-columns:350px 1fr;gap:20px}
.section-title{font-size:12px;font-weight:600;color:#333;margin:0 0 10px;padding-bottom:5px;border-bottom:1px solid #ddd}
@media print{body{padding:20px}.diagrams{grid-template-columns:1fr}}
</style></head><body>
<div class="header">
  <div><img src="${Ke.logoUrl}" style="height:35px"></div>
  <div style="text-align:right">
    <div style="font-size:18px;font-weight:700">PIER SET</div>
    <div style="font-size:12px;color:#666">${u.firstName} ${u.lastName}</div>
  </div>
</div>
<p style="color:#666;margin:0 0 15px;font-size:12px">📍 ${u.siteAddress}, ${u.siteCity}, ${u.siteState} ${u.siteZip||""}</p>
<div class="info-grid">
  <div class="info-box"><div class="info-label">Width</div><div class="info-value">${h}'</div></div>
  <div class="info-box"><div class="info-label">Length</div><div class="info-value">${S}'</div></div>
  <div class="info-box"><div class="info-label">I-Beam</div><div class="info-value">${k}"</div></div>
  <div class="info-box"><div class="info-label">Pier Size</div><div class="info-value">${L}"</div></div>
  <div class="info-box"><div class="info-label">Total Height</div><div class="info-value">${W}"</div></div>
  <div class="info-box"><div class="info-label">Total Piers</div><div class="info-value">${ve}</div></div>
</div>
<div class="diagrams">
  <div>
    <div class="section-title">CROSS-SECTION</div>
    <svg width="100%" viewBox="0 0 350 280" style="background:#fff;border:1px solid #ddd;border-radius:4px">
      <rect x="30" y="235" width="290" height="25" fill="#8B4513"/>
      <text x="175" y="252" text-anchor="middle" font-size="10" fill="#fff">GROUND</text>
      <rect x="100" y="${ae}" width="150" height="15" fill="#999" stroke="#666" stroke-width="1"/>
      <text x="55" y="${ae+10}" text-anchor="end" font-size="9" fill="#666">Pad</text>
      <polygon points="175,${y} 125,${ae} 225,${ae}" fill="#2c5530" stroke="#1a3a1f" stroke-width="2"/>
      <text x="175" y="${ae-L*1.1}" text-anchor="middle" font-size="13" fill="#fff" font-weight="bold">${L}"</text>
      <text x="55" y="${ae-L*1.1}" text-anchor="end" font-size="9" fill="#2c5530">Pier</text>
      <rect x="167" y="${w}" width="16" height="8" fill="#555" stroke="#333" stroke-width="1"/>
      <text x="55" y="${w+6}" text-anchor="end" font-size="8" fill="#666">Bolt (1")</text>
      <rect x="110" y="${P}" width="130" height="8" fill="#8B4513" stroke="#5D3A1A" stroke-width="1"/>
      <rect x="167" y="${P+8}" width="16" height="${k*2.5-16}" fill="#8B4513" stroke="#5D3A1A" stroke-width="1"/>
      <rect x="110" y="${d-8}" width="130" height="8" fill="#8B4513" stroke="#5D3A1A" stroke-width="1"/>
      <text x="175" y="${(P+d)/2}" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">${k}"</text>
      <text x="55" y="${(P+d)/2}" text-anchor="end" font-size="9" fill="#8B4513">I-Beam</text>
      <rect x="90" y="${ie}" width="170" height="16" fill="#DEB887" stroke="#8B4513" stroke-width="1"/>
      <text x="175" y="${ie+12}" text-anchor="middle" font-size="9" fill="#333">House Floor</text>
      <line x1="295" y1="${ae}" x2="295" y2="${P}" stroke="#333" stroke-width="1"/>
      <line x1="290" y1="${ae}" x2="300" y2="${ae}" stroke="#333" stroke-width="1"/>
      <line x1="290" y1="${P}" x2="300" y2="${P}" stroke="#333" stroke-width="1"/>
      <text x="310" y="${(ae+P)/2+4}" text-anchor="start" font-size="14" font-weight="bold">${W}"</text>
    </svg>
  </div>
  <div>
    <div class="section-title">PLAN VIEW - ${Y.toFixed(1)}' BEAM SPACING${j?"":`, ${ee.toFixed(1)}' MARRIAGE`}</div>
    <svg width="100%" viewBox="0 0 ${I} ${v}" style="background:#fff;border:1px solid #ddd;border-radius:4px">
      <rect x="${re}" y="${O}" width="${S*R}" height="${h*R}" fill="none" stroke="#333" stroke-width="2"/>
      <line x1="${te}" y1="${O}" x2="${te+z*R}" y2="${O}" stroke="#333" stroke-width="1"/>
      <line x1="${te}" y1="${O+h*R}" x2="${te+z*R}" y2="${O+h*R}" stroke="#333" stroke-width="1"/>
      ${j?"":`<line x1="${te}" y1="${O+h/2*R}" x2="${te+z*R}" y2="${O+h/2*R}" stroke="#333" stroke-width="1" stroke-dasharray="5,3"/>`}
      ${Ae}
      ${Ne}
      ${A}
      <line x1="${re}" y1="${O-40}" x2="${re+S*R}" y2="${O-40}" stroke="#333" stroke-width="1"/>
      <line x1="${re}" y1="${O-45}" x2="${re}" y2="${O-35}" stroke="#333" stroke-width="1"/>
      <line x1="${re+S*R}" y1="${O-45}" x2="${re+S*R}" y2="${O-35}" stroke="#333" stroke-width="1"/>
      ${pe}
      ${G}
      <text x="${re+E*R/2}" y="${O-52}" text-anchor="middle" font-size="9" fill="#666">${E}'-0"</text>
      <text x="${re+S*R-E*R/2}" y="${O-52}" text-anchor="middle" font-size="9" fill="#666">${E}'-0"</text>
      <text x="${re+S*R/2}" y="${O-65}" text-anchor="middle" font-size="14" font-weight="bold">${S}'-0"</text>
      <line x1="${re+S*R+20}" y1="${O}" x2="${re+S*R+20}" y2="${O+h*R}" stroke="#333" stroke-width="1"/>
      <line x1="${re+S*R+15}" y1="${O}" x2="${re+S*R+25}" y2="${O}" stroke="#333" stroke-width="1"/>
      <line x1="${re+S*R+15}" y1="${O+h*R}" x2="${re+S*R+25}" y2="${O+h*R}" stroke="#333" stroke-width="1"/>
      ${j?`<text x="${re+S*R+30}" y="${O+h/2*R+4}" text-anchor="start" font-size="12" font-weight="bold">${h}'-0"</text>`:`<line x1="${re+S*R+15}" y1="${O+h/2*R}" x2="${re+S*R+25}" y2="${O+h/2*R}" stroke="#333" stroke-width="1"/>
      <text x="${re+S*R+30}" y="${O+h/4*R+4}" text-anchor="start" font-size="10">${h/2}'-0"</text>
      <text x="${re+S*R+30}" y="${O+3*h/4*R+4}" text-anchor="start" font-size="10">${h/2}'-0"</text>`}
      <text x="${re-5}" y="${O+4}" text-anchor="end" font-size="9" fill="#666">Top Beam</text>
      ${j?"":`<text x="${re-5}" y="${O+h/2*R+4}" text-anchor="end" font-size="9" fill="#666">Marriage</text>`}
      <text x="${re-5}" y="${O+h*R+4}" text-anchor="end" font-size="9" fill="#666">Bot Beam</text>
      <text x="${re+S*R/2}" y="${O+h*R+30}" text-anchor="middle" font-size="11">Outer: ${Y.toFixed(1)}' o/c (${ze.length*2} piers)${j?"":` | Marriage: ${ee.toFixed(1)}' o/c (${ye.length} piers)`}</text>
    </svg>
  </div>
</div>
<div style="margin-top:15px;display:flex;gap:20px;font-size:11px;color:#666">
  <div style="display:flex;align-items:center;gap:6px"><div style="width:14px;height:14px;border:1.5px solid #333"></div>Pier Location</div>
  <div style="display:flex;align-items:center;gap:6px"><div style="width:20px;height:2px;background:#333"></div>I-Beam</div>
  <div style="display:flex;align-items:center;gap:6px"><div style="width:20px;border-top:2px dashed #333"></div>Marriage Line</div>
</div>
<p style="text-align:center;margin-top:20px;color:#999;font-size:10px">Generated by ${Ke.name} Bidding System</p>
</body></html>`},ca=(l,u)=>{const h=window.open("","_blank");if(h)h.document.write(l),h.document.close();else if(u){const S=new Blob([l],{type:"text/html"}),j=URL.createObjectURL(S),k=document.createElement("a");k.href=j,k.download=u,document.body.appendChild(k),k.click(),document.body.removeChild(k),setTimeout(()=>URL.revokeObjectURL(j),5e3),alert("Document downloaded as HTML file. Open it in your browser to view and print.")}return h},Cf=(l,u,h)=>{var F;const S=[],j=[],k=[],L=h==null?void 0:h.find(J=>J.name===l.homeModel),T=(L==null?void 0:L.floorPlanUrl)||"";Object.entries(l.selectedServices||{}).forEach(([J,Y])=>{if(Y&&Pn[J]){const oe=Pn[J].name,ee=Cn(J,l);It.includes(J)?k.push({name:oe,key:J,description:ee}):Vn.includes(J)?j.push(oe):S.push({name:oe,description:ee})}}),ua(l,u).forEach(J=>{J.key==="sewer"||J.key==="well"?k.push({name:J.nameWithDetail,key:J.key}):J.key==="landscaping"||J.key==="deck"?S.push({name:J.nameWithDetail,description:Cn(J.key,l)}):S.push({name:J.nameWithDetail,description:""})}),(l.customServices||[]).forEach(J=>{J.name&&S.push({name:J.name,description:""})});const E=rt.formatDate(),z=rt.formatDate(new Date(Date.now()+720*60*60*1e3)),V=`
<!DOCTYPE html>
<html>
<head>
  <title>Sherman Quote - ${l.customerFirstName} ${l.customerLastName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; padding: 40px; max-width: 850px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #2c5530; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; color: #2c5530; }
    .logo-sub { font-size: 14px; color: #666; }
    .company-info { text-align: right; font-size: 13px; color: #666; }
    .quote-title { background: #2c5530; color: white; padding: 15px 25px; font-size: 24px; font-weight: bold; margin-bottom: 25px; }
    .quote-meta { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .meta-box { background: #f8f9fa; padding: 15px 20px; border-radius: 8px; flex: 1; margin: 0 10px; }
    .meta-box:first-child { margin-left: 0; }
    .meta-box:last-child { margin-right: 0; }
    .meta-label { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 5px; }
    .meta-value { font-size: 16px; font-weight: 600; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 18px; font-weight: 600; color: #2c5530; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; margin-bottom: 15px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .info-item { }
    .info-label { font-size: 12px; color: #666; }
    .info-value { font-size: 15px; font-weight: 500; }
    .scope-section { margin-bottom: 16px; }
    .scope-heading { font-size: 13px; color: #2c5530; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; padding-bottom: 6px; margin-bottom: 8px; border-bottom: 2px solid #e0e0e0; }
    .scope-heading.allowance { color: #856404; }
    .scope-items { columns: 2; column-gap: 24px; }
    .scope-item { padding: 4px 0; font-size: 13px; border-bottom: 1px solid #e9ecef; break-inside: avoid; }
    .scope-item::before { content: "✓ "; color: #2c5530; font-weight: 700; }
    .scope-item.allowance::before { color: #ffc107; }
    .scope-item .svc-desc { display: block; font-size: 11px; color: #555; font-style: italic; margin: 1px 0 2px 16px; }
    .home-box { background: linear-gradient(135deg, #2c5530, #1a3a1f); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .home-model { font-size: 20px; font-weight: 600; }
    .home-specs { opacity: 0.9; margin-top: 5px; }
    .total-section { background: #f8f9fa; border: 2px solid #2c5530; border-radius: 8px; padding: 25px; margin-top: 30px; }
    .total-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
    .total-row:last-child { border-bottom: none; }
    .total-row.grand { font-size: 24px; font-weight: 700; color: #2c5530; border-top: 2px solid #2c5530; margin-top: 10px; padding-top: 15px; }
    .terms { margin-top: 40px; padding: 20px; background: #fff9e6; border-radius: 8px; font-size: 13px; }
    .terms-title { font-weight: 600; margin-bottom: 10px; }
    .terms ul { margin-left: 20px; }
    .signature-section { margin-top: 50px; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; }
    .signature-box { border-top: 2px solid #333; padding-top: 10px; }
    .signature-label { font-size: 12px; color: #666; }
    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; padding-top: 20px; }
    @media print { 
      body { padding: 20px; } 
      .no-print { display: none; }
    }
    .btn-group { position: fixed; top: 20px; right: 20px; display: flex; gap: 10px; }
    .close-btn { background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; }
    .close-btn:hover { background: #5a6268; }
  </style>
</head>
<body>
  <div class="btn-group no-print">
    <button class="close-btn" onclick="window.close()">Close</button>
  </div>

  <script>
    // Functions kept for backward compatibility but not used in UI
    function emailQuote() {
      const customerEmail = '${(l.email||"").replace(/'/g,"\\'")}';
      const customerName = '${(l.customerFirstName+" "+l.customerLastName).replace(/'/g,"\\'")}';
      const customerLogin = '${(l.customerFirstName+l.customerLastName).toLowerCase().replace(/\\s+/g,"").replace(/'/g,"\\'")}';
      const quoteNum = '${rt.getQuoteNum(l)}';
      const total = '${D(u.total)}';
      const homeModel = '${rt.getHomeDesc(l).replace(/'/g,"\\'")}';

      const subject = encodeURIComponent('${Ke.name} - Your Project Quote #' + quoteNum);
      const body = encodeURIComponent(
        'Dear ' + customerName + ',\\n\\n' +
        'Thank you for your interest in ${Ke.name}! Please find your project quote details below:\\n\\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n' +
        'QUOTE SUMMARY\\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n' +
        'Quote #: ' + quoteNum + '\\n' +
        'Home: ' + homeModel + '\\n' +
        'Total Contract Price: ' + total + '\\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n' +
        '🔗 VIEW YOUR QUOTE ONLINE\\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n' +
        'Visit our Customer Portal to view your complete quote:\\n' +
        'https://claude.site/artifacts/YOUR_ARTIFACT_ID\\n\\n' +
        'Login with:\\n' +
        '  Username: ' + customerLogin + '\\n' +
        '  Password: mybid\\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n' +
        'This quote is valid for 30 days. A 50% deposit is required to schedule installation.\\n\\n' +
        'If you have any questions, please don\\'t hesitate to reach out:\\n' +
        '📞 ${Ke.phone}\\n' +
        '📍 ${Ke.address}\\n\\n' +
        'We look forward to working with you!\\n\\n' +
        'Best regards,\\n' +
        '${Ke.name}\\n' +
        'Quality Erections Since 1976'
      );

      const mailtoLink = 'mailto:' + customerEmail + '?subject=' + subject + '&body=' + body;
      window.location.href = mailtoLink;
    }

    function editQuote() {
      alert('To edit this quote, please use the main application.');
      window.close();
    }
  <\/script>
  
  <div class="header">
    <div>
      <div class="logo">${Ke.name}</div>
      <div class="logo-sub">Modular Home Installation</div>
    </div>
    <div class="company-info">
      <strong>${Ke.name}</strong><br>
      ${Ke.address}<br>
      ${Ke.phone}
    </div>
  </div>
  
  <div class="quote-title">PROJECT QUOTE</div>
  
  <div class="quote-meta">
    <div class="meta-box">
      <div class="meta-label">Quote Date</div>
      <div class="meta-value">${E}</div>
    </div>
    <div class="meta-box">
      <div class="meta-label">Valid Until</div>
      <div class="meta-value">${z}</div>
    </div>
    <div class="meta-box">
      <div class="meta-label">Quote #</div>
      <div class="meta-value">${rt.getQuoteNum(l)}</div>
    </div>
  </div>
  
  <div class="section">
    <div class="section-title">Customer Information</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Name</div>
        <div class="info-value">${l.customerFirstName} ${l.customerLastName}${l.person2FirstName?` & ${l.person2FirstName} ${l.person2LastName||""}`:""}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Phone</div>
        <div class="info-value">${Ui(l.phone)||"N/A"}${l.phone2?` / ${Ui(l.phone2)}`:""}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Email</div>
        <div class="info-value">${l.email||"N/A"}${l.email2?`<br/>${l.email2}`:""}</div>
      </div>
      ${l.mailingAddress?`<div class="info-item">
        <div class="info-label">Mailing Address</div>
        <div class="info-value">${l.mailingAddress}, ${l.mailingCity}, ${l.mailingState} ${l.mailingZip}</div>
      </div>`:""}
    </div>
  </div>
  
  <div class="section">
    <div class="section-title">Installation Site</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Address</div>
        <div class="info-value">${l.siteAddress||"TBD"}</div>
      </div>
      <div class="info-item">
        <div class="info-label">City, State, ZIP</div>
        <div class="info-value">${l.siteCity||"TBD"}, ${l.siteState} ${l.siteZip||""}</div>
      </div>
      <div class="info-item">
        <div class="info-label">County</div>
        <div class="info-value">${l.siteCounty||"N/A"}</div>
      </div>
    </div>
  </div>
  
  ${l.homeModel&&l.homeModel!=="NONE"?`
  <div class="section">
    <div class="section-title">Home</div>
    <div class="home-box">
      <div class="home-model">${l.homeModel}</div>
      <div class="home-specs">${l.houseWidth}' × ${l.houseLength}' ${l.singleDouble} Wide</div>
    </div>
    ${T?`
    <div style="margin-top: 20px;">
      <div style="font-weight: 600; margin-bottom: 10px; color: #2c5530;">Floor Plan</div>
      <p style="margin: 0;"><a href="${T}" target="_blank" style="color: #1565c0; text-decoration: none; font-size: 14px;">View Full Floor Plan, Photos & 3D Tour on Clayton Homes</a></p>
    </div>
    `:""}
  </div>
  `:`
  <div class="section">
    <div class="section-title">Decor Checklist</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Dimensions</div>
        <div class="info-value">${l.houseWidth}' × ${l.houseLength}'</div>
      </div>
      <div class="info-item">
        <div class="info-label">Type</div>
        <div class="info-value">${l.singleDouble} Wide</div>
      </div>
    </div>
  </div>
  `}
  
  <div class="section">
    <div class="section-title">Scope of Work</div>
    <p style="margin-bottom: 15px; color: #666;">This quote includes complete professional installation services:</p>

    ${j.length>0?`
    <div class="scope-section">
      <div class="scope-heading">Home Spec Additions</div>
      <div class="scope-items">
        ${j.map(J=>`<div class="scope-item">${J}</div>`).join("")}
      </div>
    </div>
    `:""}

    <div class="scope-section">
      <div class="scope-heading">Standard Installation</div>
      <div class="scope-items">
        <div class="scope-item">Site prep and foundation review</div>
        <div class="scope-item">Home delivery coordination and inspection</div>
        <div class="scope-item">Professional home installation and leveling</div>
        <div class="scope-item">Pier and anchor system installation</div>
        <div class="scope-item">Marriage line connection</div>
        <div class="scope-item">Final inspection and walkthrough</div>
      </div>
    </div>

    ${S.length>0?`
    <div class="scope-section">
      <div class="scope-heading">Professional Services</div>
      <div class="scope-items">
        ${S.map(J=>`<div class="scope-item">${J.name}${J.description?`<span class="svc-desc">${J.description}</span>`:""}</div>`).join("")}
      </div>
    </div>
    `:""}

    ${k.length>0?`
    <div class="scope-section">
      <div class="scope-heading allowance">Allowances*</div>
      <div class="scope-items">
        ${k.map(J=>`<div class="scope-item allowance">${J.name}${J.description?`<span class="svc-desc">${J.description}</span>`:""}</div>`).join("")}
      </div>
    </div>
    `:""}

    ${k.length>0?`
    <div style="background: #fff9e6; padding: 10px 14px; border-radius: 6px; margin-top: 12px; border-left: 4px solid #ffc107;">
      <p style="margin: 0; font-size: 12px; color: #856404;">
        <strong>*Allowances:</strong> Estimated costs based on 49 years of experience. Actual costs may vary depending on site conditions and location factors. Final costs confirmed upon site evaluation.
      </p>
    </div>
    `:""}
  </div>
  
  <div class="total-section">
    <div class="section-title" style="border: none; margin-bottom: 20px;">Investment Summary</div>
    <div class="total-row grand"><span>Total</span><span>${D(u.total)}</span></div>

    <div style="background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px;">
      <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 18px; color: #1565c0; margin-bottom: 8px;">
        <span>Contingency Allowance</span>
        <span>${D(u.contingency)}</span>
      </div>
      <div style="font-size: 13px; color: #666; line-height: 1.6;">
        <strong>Purpose:</strong> A dedicated fund for change orders and allowance adjustments. If allowances (permits, well, sand pad, sewer, etc.) come in under budget, savings are added to this fund. If they exceed estimates or you make change orders, funds are drawn from here first, minimizing out-of-pocket costs. At project completion, if there are no overages or change orders, you receive back the full contingency amount plus any allowance savings.
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 28px; color: #2c5530; border-top: 3px solid #2c5530; padding-top: 16px; margin-top: 16px;">
      <span>Total Investment</span>
      <span>${D(u.totalWithContingency)}</span>
    </div>
  </div>

  ${(()=>{var Y,oe,ee,R;const J=[];return Object.keys(l.selectedServices||{}).forEach($=>{var H,I,v;if(l.selectedServices[$]&&((I=(H=l.publishedServiceNotes)==null?void 0:H[$])==null?void 0:I.length)>0){const re=((v=Pn[$])==null?void 0:v.name)||$;l.publishedServiceNotes[$].forEach(O=>{J.push({serviceName:re,text:O.text,publishedAt:O.publishedAt,publishedBy:O.publishedBy})})}}),l.sewerType&&l.sewerType!=="none"&&((oe=(Y=l.publishedServiceNotes)==null?void 0:Y.sewer)==null?void 0:oe.length)>0&&l.publishedServiceNotes.sewer.forEach($=>{J.push({serviceName:"Sewer System",text:$.text,publishedAt:$.publishedAt,publishedBy:$.publishedBy})}),parseFloat(l.wellDepth)>0&&((R=(ee=l.publishedServiceNotes)==null?void 0:ee.well)==null?void 0:R.length)>0&&l.publishedServiceNotes.well.forEach($=>{J.push({serviceName:"Well Drilling",text:$.text,publishedAt:$.publishedAt,publishedBy:$.publishedBy})}),J.length===0?"":`
    <div style="background: #f0f7ff; border: 2px solid #1565c0; border-radius: 8px; padding: 20px; margin: 30px 0;">
      <h3 style="margin: 0 0 16px; color: #1565c0; font-size: 18px;">📋 Important Project Information</h3>
      ${J.map($=>`
        <div style="background: #fff; padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 4px solid #1565c0;">
          <div style="font-weight: 600; color: #2c5530; margin-bottom: 6px; font-size: 14px;">${$.serviceName}</div>
          <div style="color: #333; margin-bottom: 6px; line-height: 1.5;">${$.text}</div>
          <div style="font-size: 11px; color: #999;">
            ${new Date($.publishedAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} by ${$.publishedBy}
          </div>
        </div>
      `).join("")}
    </div>
    `})()}

  <div class="terms">
    <div class="terms-title">Terms & Conditions</div>
    <div style="font-weight:700;margin:10px 0 8px;font-size:14px">Payment Schedule:</div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:14px">
      <tr><td style="padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600;width:60px">50%</td><td style="padding:6px 10px;border-bottom:1px solid #ddd">Down payment — due at signing to schedule project</td><td style="padding:6px 10px;border-bottom:1px solid #ddd;text-align:right;font-weight:600;white-space:nowrap">${D(u.totalWithContingency*.5)}</td></tr>
      <tr><td style="padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600">30%</td><td style="padding:6px 10px;border-bottom:1px solid #ddd">Due at delivery — home is modular complete and requires payment before delivery</td><td style="padding:6px 10px;border-bottom:1px solid #ddd;text-align:right;font-weight:600;white-space:nowrap">${D(u.totalWithContingency*.3)}</td></tr>
      <tr><td style="padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600">10%</td><td style="padding:6px 10px;border-bottom:1px solid #ddd">Due after installation — licensed requirements completed</td><td style="padding:6px 10px;border-bottom:1px solid #ddd;text-align:right;font-weight:600;white-space:nowrap">${D(u.totalWithContingency*.1)}</td></tr>
      <tr><td style="padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600">10%</td><td style="padding:6px 10px;border-bottom:1px solid #ddd">Due upon project completion</td><td style="padding:6px 10px;border-bottom:1px solid #ddd;text-align:right;font-weight:600;white-space:nowrap">${D(u.totalWithContingency*.1)}</td></tr>
    </table>
    <div style="background:#e8f5e9;border-left:4px solid #2c5530;padding:10px 14px;border-radius:4px;margin-bottom:14px;font-size:13px;color:#333">
      <strong>Note:</strong> Any remaining contingency allowance balance will be subtracted from your final payment. If allowances come in under budget and no change orders are made, your final amount owed may be significantly less than the scheduled payment above.
    </div>
    <ul>
      <li>Quote valid for 30 days from date issued</li>
      <li>Price subject to change if site conditions differ from initial assessment</li>
      <li>Allowance items are estimates and may be adjusted based on actual site conditions</li>
      <li>All work performed in accordance with both Federal and State regulations</li>
    </ul>
  </div>
  
  <div class="signature-section">
    <div>
      <div class="signature-box">
        <div class="signature-label">Customer Signature / Date</div>
      </div>
    </div>
    <div>
      <div class="signature-box">
        <div class="signature-label">Sherman Representative / Date</div>
      </div>
    </div>
  </div>
  
  <div class="footer">
    <strong>${Ke.name}</strong> | ${Ke.address} | ${Ke.phone}<br>
    Thank you for choosing ${Ke.name} for your modular home installation!
  </div>
</body>
</html>
  `;ca(V,`Sherman-Quote-${l.customerLastName}-${((F=l.id)==null?void 0:F.slice(-8))||"draft"}.html`)},Yp=(l,u,h,S,j,k,L,T,W,E,z,V=[],F={},J=[])=>{const Y=rt.formatDate(),oe={modified:[],added:[],removed:[]};V.forEach(O=>{const te=L[O];if(!te)return;const ze=j.svc.find(ye=>ye.key===O),ne=(ze==null?void 0:ze.cost)||0;oe.removed.push({name:te.name,cost:ne,key:O})}),Object.keys(F).forEach(O=>{const te=F[O];if(!(!te||te.amount===0))if(O==="home_base_price"){const ze=(parseFloat(u.homeBasePrice)||0)*1.2,ne=ze+te.amount;oe.modified.push({name:"Home Base Price",oldCost:ze,newCost:ne,diff:te.amount,key:O})}else{const ze=L[O];if(!ze)return;const ne=j.svc.find(ce=>ce.key===O),ye=(ne==null?void 0:ne.cost)||0,ve=ye+te.amount;oe.modified.push({name:ze.name,oldCost:ye,newCost:ve,diff:te.amount,key:O})}}),J.forEach(O=>{const te=L[O];if(!te)return;const ze=S.svc.find(ye=>ye.key===O),ne=(ze==null?void 0:ze.cost)||0;oe.added.push({name:te.name,cost:ne,key:O})});const ee=oe.removed.reduce((O,te)=>O+te.cost,0),R=oe.modified.reduce((O,te)=>O+te.diff,0),H=oe.added.reduce((O,te)=>O+te.cost,0)+R-ee,I=j.contingency,v=Math.min(Math.abs(H),I),re=H>0?Math.max(0,H-v):0;return`<!DOCTYPE html><html><head><title>Change Order #${l.changeOrderNum}${l.changeOrderVersion||""} - ${h.firstName} ${h.lastName}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;max-width:900px;margin:0 auto;color:#333;line-height:1.6}
.header{border-bottom:4px solid #ffc107;padding-bottom:20px;margin-bottom:30px;display:flex;justify-content:space-between;align-items:flex-start}
.co-title{font-size:32px;font-weight:800;color:#ffc107;margin:0}
.co-number{font-size:48px;font-weight:900;color:#ffc107}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px}
.info-box{background:#f8f9fa;padding:15px;border-radius:8px}
.section-title{font-size:20px;font-weight:700;color:#2c5530;margin:30px 0 15px;border-bottom:2px solid #2c5530;padding-bottom:8px}
.change-item{display:flex;justify-content:space-between;padding:12px;margin:8px 0;border-radius:6px}
.change-added{background:#d1e7dd;border-left:4px solid #28a745}
.change-modified{background:#cfe2ff;border-left:4px solid #0d6efd}
.change-removed{background:#f8d7da;border-left:4px solid #dc3545}
.financial{background:#e3f2fd;padding:20px;border-radius:8px;border:2px solid #1565c0;margin:30px 0}
.financial-row{display:flex;justify-content:space-between;padding:8px 0;font-size:16px}
.financial-total{font-size:24px;font-weight:800;border-top:3px solid #1565c0;margin-top:12px;padding-top:12px}
.signature-box{margin-top:40px;border:2px solid #333;padding:20px;border-radius:8px}
.sig-line{border-bottom:2px solid #333;margin:30px 0 10px;min-height:40px}
.warning{background:#fff3cd;border:2px solid #ffc107;padding:15px;border-radius:8px;margin:20px 0}
</style></head><body>

<div class="header">
  <div>
    <div class="co-title">CHANGE ORDER</div>
    <div class="co-number">#${l.changeOrderNum}${l.changeOrderVersion||""}</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:18px;font-weight:700;color:#2c5530">${Ke.name}</div>
    <div style="font-size:13px;color:#666">${Y}</div>
    <div style="font-size:13px;color:#666">Quote #${rt.getQuoteNum(u)}</div>
  </div>
</div>

<div class="info-grid">
  <div class="info-box">
    <div style="font-weight:700;margin-bottom:8px">Customer</div>
    <div>${h.firstName} ${h.lastName}</div>
    <div style="font-size:13px;color:#666">${Ui(h.phone)}</div>
    <div style="font-size:13px;color:#666">${h.email}</div>
  </div>
  <div class="info-box">
    <div style="font-weight:700;margin-bottom:8px">Project Address</div>
    <div>${h.siteAddress}</div>
    <div>${h.siteCity}, ${h.siteState} ${h.siteZip}</div>
  </div>
</div>

<div class="warning">
  <strong>IMPORTANT:</strong> This change order modifies the original accepted quote. All changes must be approved and signed by the customer before work proceeds.
</div>

<div class="section-title">ORIGINAL QUOTE TOTAL</div>
<div style="font-size:24px;font-weight:700;color:#2c5530;padding:15px;background:#e8f5e9;border-radius:8px">
  ${D(j.totalWithContingency)}
  <div style="font-size:13px;font-weight:400;color:#666;margin-top:4px">Contingency Fund Available: ${D(I)}</div>
</div>

<div class="section-title">CHANGES MADE</div>

${oe.added.length>0?`
<div style="margin-bottom:20px">
  <div style="font-weight:700;color:#28a745;margin-bottom:8px">ADDED SERVICES</div>
  ${oe.added.map(O=>`
    <div class="change-item change-added">
      <span><strong>${O.name}</strong></span>
      <span style="font-weight:700;color:#28a745">+${D(O.cost)}</span>
    </div>
  `).join("")}
</div>
`:""}

${oe.modified.length>0?`
<div style="margin-bottom:20px">
  <div style="font-weight:700;color:#0d6efd;margin-bottom:8px">MODIFIED SERVICES</div>
  ${oe.modified.map(O=>`
    <div class="change-item change-modified">
      <div>
        <strong>${O.name}</strong>
        <div style="font-size:13px;color:#666">Original: ${D(O.oldCost)} → New: ${D(O.newCost)}</div>
      </div>
      <span style="font-weight:700;color:${O.diff>0?"#0d6efd":"#28a745"}">${O.diff>0?"+":""}${D(O.diff)}</span>
    </div>
  `).join("")}
</div>
`:""}

${oe.removed.length>0?`
<div style="margin-bottom:20px">
  <div style="font-weight:700;color:#dc3545;margin-bottom:8px">REMOVED SERVICES</div>
  ${oe.removed.map(O=>`
    <div class="change-item change-removed">
      <span><strong>${O.name}</strong></span>
      <span style="font-weight:700;color:#dc3545">-${D(O.cost)}</span>
    </div>
  `).join("")}
</div>
`:""}

${oe.added.length===0&&oe.modified.length===0&&oe.removed.length===0?'<p style="color:#666;font-style:italic">No service changes detected.</p>':""}

<div class="section-title">FINANCIAL SUMMARY</div>
<div class="financial">
  <div class="financial-row">
    <span>Original Total:</span>
    <span style="font-weight:700">${D(j.totalWithContingency)}</span>
  </div>
  <div class="financial-row">
    <span>Change Order Adjustments:</span>
    <span style="font-weight:700;color:${H>=0?"#dc3545":"#28a745"}">${H>=0?"+":""}${D(H)}</span>
  </div>
  <div class="financial-row">
    <span>Contingency Fund Applied:</span>
    <span style="font-weight:700;color:#1565c0">-${D(v)}</span>
  </div>
  <div class="financial-row financial-total">
    <span>New Total:</span>
    <span style="color:#2c5530">${D(S.totalWithContingency)}</span>
  </div>
  <div class="financial-row" style="border-top:2px solid #1565c0;margin-top:12px;padding-top:12px">
    <span style="font-size:20px;font-weight:800">Customer Additional Cost:</span>
    <span style="font-size:20px;font-weight:800;color:${re>0?"#dc3545":"#28a745"}">${D(re)}</span>
  </div>
  <div style="font-size:13px;color:#666;margin-top:12px;font-style:italic">
    ${v>0?`${D(v)} paid from contingency fund`:""}
    ${v<I?` | Remaining contingency: ${D(I-v)}`:""}
    ${v>=I?" | Contingency fund fully utilized":""}
  </div>
</div>

<div class="section-title">APPROVAL & SIGNATURES</div>
<div class="signature-box">
  <p style="margin-bottom:20px"><strong>By signing below, all parties agree to the changes outlined in this Change Order.</strong></p>

  <div style="margin-bottom:40px">
    <div style="font-weight:700;margin-bottom:8px">Customer Signature:</div>
    <div class="sig-line"></div>
    <div style="display:flex;justify-content:space-between;font-size:13px;color:#666">
      <span>Print Name: ${h.firstName} ${h.lastName}</span>
      <span>Date: _______________</span>
    </div>
  </div>

  <div>
    <div style="font-weight:700;margin-bottom:8px">${Ke.name} Representative:</div>
    <div class="sig-line"></div>
    <div style="display:flex;justify-content:space-between;font-size:13px;color:#666">
      <span>Print Name: _______________</span>
      <span>Date: _______________</span>
    </div>
  </div>
</div>

<div style="margin-top:40px;padding:20px;background:#f8f9fa;border-radius:8px;font-size:12px;color:#666">
  <p style="margin-bottom:8px"><strong>Terms & Conditions:</strong></p>
  <ul style="margin-left:20px">
    <li>This change order is valid for 30 days from the date above</li>
    <li>Work will not proceed until this change order is signed by the customer</li>
    <li>Payment for additional costs is due before work begins on the changes</li>
    <li>All other terms of the original contract remain in effect</li>
  </ul>
</div>

</body></html>`},Zp=(l,u,h)=>{const S=rt.formatDate(),j=rt.getQuoteNum(l),k=Object.entries(l.selectedServices||{}).filter(([E,z])=>z).map(([E])=>{const z=h[E];return{key:E,name:(z==null?void 0:z.name)||E,description:(z==null?void 0:z.description)||""}}),L={slab:{name:"Concrete Slab Foundation",description:"Monolithic concrete slab on grade with integrated footings",specifications:['Minimum 4" thick concrete slab (3000 PSI)','6" compacted gravel base',"6-mil polyethylene vapor barrier","Wire mesh reinforcement (WWF 6x6 W1.4xW1.4)","Perimeter frost footings per local code","Anchor bolts for home attachment"],workIncluded:['Site excavation and rough grading (up to 6" cut/fill)',"Removal of topsoil and organic material in foundation area","Installation of compacted gravel base","Installation of vapor barrier","Setting grade stakes and forming","Pouring and finishing concrete slab","Installation of anchor bolts per manufacturer specs","Minimum 7-day cure time before home installation","Final grade and slope for drainage away from foundation"],excluded:['Excavation exceeding 6" depth (rock, excessive soil removal)',"Removal of trees, stumps, or large obstacles","Utility trenching and connections","Site access road or driveway construction","Permits (unless separately contracted)","Dewatering or soil stabilization for poor soil conditions"]},crawlspace:{name:"Crawl Space Foundation",description:"Elevated foundation with perimeter walls and ventilated crawl space",specifications:["Concrete block or poured concrete perimeter walls","Concrete footings per local frost depth requirements",'Minimum 18" crawl space height',"Pressure-treated sill plates","Foundation vents (1 sq ft per 150 sq ft of crawl space)",'Access door (minimum 18" x 24")'],workIncluded:["Site excavation and rough grading","Excavation for footings per local frost depth","Pouring concrete footings","Construction of perimeter foundation walls","Installation of sill plates with anchor bolts","Installation of foundation vents","Installation of crawl space access door","6-mil vapor barrier over crawl space floor","Backfilling and compaction around foundation","Final grade sloped away from foundation"],excluded:["Interior crawl space insulation","Crawl space encapsulation or conditioning","Pest control treatments or barriers","Plumbing or electrical rough-ins","Excessive excavation for rock or poor soil","Drainage systems beyond perimeter grading"]},basement:{name:"Full Basement Foundation",description:"Full-depth excavated basement with concrete walls and floor",specifications:['Poured concrete or concrete block walls (8" minimum)',"Concrete footings sized per load requirements",`Minimum 7'6" clear height inside basement`,'4" concrete floor slab with gravel base',"Exterior waterproofing and drainage board","Perimeter drain tile system","At least one egress window per building code","Sump pump pit (if required by site conditions)"],workIncluded:["Full-depth basement excavation","Excavation for footings","Installation of perimeter drain tile and gravel","Pouring concrete footings","Construction of basement walls","Exterior waterproofing application","Installation of drainage board","Backfilling and compaction","Installation of egress window wells and windows","Pouring basement floor slab","Installation of sump pump pit (if needed)","Final grading around foundation"],excluded:["Interior basement finishing (framing, drywall, flooring)","Additional windows beyond minimum egress requirements","Plumbing fixtures and final connections","Electrical fixtures and final connections","HVAC installation","Basement stairs (unless specifically quoted)","Interior drainage systems","Radon mitigation systems"]}},T=l.foundationType||"none",W=L[T]||{name:"Pier Foundation (Standard)",description:"Standard pier and beam foundation system per manufacturer specifications",specifications:['Steel piers sized per I-beam height (20" or 22")',"Piers spaced per manufacturer installation instructions","Anchor system with tie-down straps (single-wide)","Marriage line piers for double-wide homes"],workIncluded:["Layout and placement of piers per manufacturer specs","Leveling and shimming to manufacturer tolerances","Installation of anchor systems","Final leveling check after home is set"],excluded:["Excavation for basement or crawlspace","Concrete work beyond pier pads","Grading or site preparation beyond pier locations"]};return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Scope of Work - ${u.firstName||"Customer"} ${u.lastName||""}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;max-width:1000px;margin:0 auto;color:#222;line-height:1.7}
.header{border-bottom:5px solid #2c5530;padding-bottom:24px;margin-bottom:40px;background:linear-gradient(135deg,#f8f9fa 0%,#e9ecef 100%);padding:30px;border-radius:8px}
.title{font-size:42px;font-weight:900;color:#2c5530;margin:0;letter-spacing:-1px}
.subtitle{font-size:18px;color:#555;margin-top:12px;font-weight:500}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px}
.info-box{background:#f8f9fa;padding:20px;border-radius:8px;border-left:4px solid #2c5530}
.info-label{font-weight:700;margin-bottom:10px;color:#2c5530;font-size:15px;text-transform:uppercase;letter-spacing:0.5px}
.section-title{font-size:26px;font-weight:800;color:#2c5530;margin:50px 0 24px;border-bottom:4px solid #2c5530;padding-bottom:10px;text-transform:uppercase;letter-spacing:0.5px}
.subsection-title{font-size:19px;font-weight:700;color:#1565c0;margin:28px 0 14px;border-left:4px solid #1565c0;padding-left:12px}
.service-box{background:#fff;border:2px solid #dee2e6;border-radius:10px;padding:24px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
.service-name{font-size:22px;font-weight:800;color:#2c5530;margin-bottom:16px;padding-bottom:8px;border-bottom:2px solid #e9ecef}
.specs-box{background:#f1f3f5;padding:16px;border-radius:6px;margin:16px 0;border-left:4px solid #495057}
.specs-title{font-weight:700;color:#495057;margin-bottom:10px;font-size:16px}
.included-list{list-style:none;padding:0;margin:16px 0}
.included-list li{padding:10px 0 10px 32px;position:relative;font-size:15px;line-height:1.6}
.included-list li:before{content:'\\2713';position:absolute;left:0;color:#28a745;font-weight:900;font-size:20px}
.excluded-list{list-style:none;padding:0;margin:16px 0}
.excluded-list li{padding:10px 0 10px 32px;position:relative;font-size:15px;line-height:1.6;color:#666}
.excluded-list li:before{content:'\\2717';position:absolute;left:0;color:#dc3545;font-weight:900;font-size:20px}
.highlight-box{background:#e7f5ff;border:3px solid #1565c0;padding:24px;border-radius:10px;margin:32px 0}
.warning-box{background:#fff3cd;border:3px solid #ffc107;padding:24px;border-radius:10px;margin:32px 0}
.success-box{background:#d4edda;border:3px solid #28a745;padding:24px;border-radius:10px;margin:32px 0}
.sig-section{margin-top:70px;padding-top:40px;border-top:4px solid #2c5530}
.sig-line{border-bottom:2px solid #333;margin:50px 0 12px;min-height:60px}
.phase-box{background:#fff;border-left:6px solid #1565c0;padding:20px;margin:20px 0;border-radius:6px;box-shadow:0 2px 4px rgba(0,0,0,0.08)}
.phase-title{font-weight:700;color:#1565c0;font-size:18px;margin-bottom:12px}
table{width:100%;border-collapse:collapse;margin:20px 0;background:#fff;border-radius:8px;overflow:hidden}
th{background:#2c5530;color:#fff;padding:14px;text-align:left;font-weight:700;font-size:15px}
td{padding:12px 14px;border-bottom:1px solid #dee2e6;font-size:14px}
tr:last-child td{border-bottom:none}
.page-break{page-break-after:always}
@media print{body{padding:20px;font-size:12px}.page-break{page-break-after:always}}
</style></head><body>

<div class="header">
  <div class="title">SCOPE OF WORK</div>
  <div class="subtitle">Comprehensive Project Specifications & Deliverables</div>
  <div style="margin-top:16px;font-size:15px;color:#666;display:flex;justify-content:space-between">
    <span><strong>Quote #:</strong> ${j}</span>
    <span><strong>Date:</strong> ${S}</span>
  </div>
</div>

<!-- SECTION 1: PROJECT OVERVIEW -->
<div class="section-title">1. Project Overview & Objectives</div>

<div class="info-grid">
  <div class="info-box">
    <div class="info-label">Customer Information</div>
    <div style="font-size:18px;font-weight:700;margin-bottom:8px">${u.firstName} ${u.lastName}</div>
    <div style="font-size:14px;color:#555;margin-bottom:4px">Phone: ${Ui(u.phone)}</div>
    <div style="font-size:14px;color:#555">Email: ${u.email}</div>
  </div>
  <div class="info-box">
    <div class="info-label">Project Location</div>
    <div style="font-size:15px;margin-bottom:4px">${u.siteAddress}</div>
    <div style="font-size:15px">${u.siteCity}, ${u.siteState} ${u.siteZip}</div>
  </div>
</div>

<div class="highlight-box">
  <div style="font-weight:800;font-size:20px;color:#1565c0;margin-bottom:12px">Project Description</div>
  <div style="font-size:17px;margin-bottom:8px">
    <strong>Installation of ${l.singleDouble==="double"?"Double-Wide":"Single-Wide"} Modular Home</strong>
    ${l.homeModel!=="NONE"?` - Model: <strong>${l.homeModel}</strong>`:""}
  </div>
  <div style="font-size:15px;color:#555;margin-top:12px">
    <strong>Home Dimensions:</strong> ${l.houseWidth} feet wide × ${l.houseLength} feet long<br>
    <strong>Foundation Type:</strong> ${W.name}
  </div>
</div>

<div class="success-box">
  <div style="font-weight:700;font-size:18px;margin-bottom:12px;color:#28a745">Project Objectives</div>
  <ul style="margin:0;padding-left:20px;line-height:1.8">
    <li>Deliver and install a turn-key modular home at the specified location</li>
    <li>Construct a code-compliant foundation to manufacturer specifications</li>
    <li>Complete all selected services to meet or exceed industry standards</li>
    <li>Ensure site safety and minimize disruption during construction</li>
    <li>Coordinate all inspections and obtain required approvals</li>
    <li>Provide customer with a completed, move-in ready home</li>
  </ul>
</div>

<!-- SECTION 2: ROLES & RESPONSIBILITIES -->
<div class="section-title">2. Roles & Responsibilities</div>

<table>
  <thead>
    <tr>
      <th style="width:30%">Party</th>
      <th>Responsibilities</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="font-weight:700;color:#2c5530">${Ke.name}</td>
      <td>
        &bull;Provide all labor, materials, and equipment for contracted work<br>
        &bull;Coordinate with home manufacturer for delivery schedule<br>
        &bull;Ensure all work meets local building codes and manufacturer specs<br>
        &bull;Manage subcontractors and ensure quality workmanship<br>
        &bull;Coordinate inspections with local authorities<br>
        &bull;Communicate progress and any issues to customer promptly<br>
        &bull;Clean work site upon completion
      </td>
    </tr>
    <tr>
      <td style="font-weight:700;color:#2c5530">Customer</td>
      <td>
        &bull;Provide clear, legal access to work site for all vehicles and equipment<br>
        &bull;Obtain necessary permits (unless included in contract)<br>
        &bull;Ensure utilities are available at property line prior to installation<br>
        &bull;Remove any obstacles that would interfere with construction<br>
        &bull;Make timely payments per contract terms<br>
        &bull;Communicate any concerns or questions promptly<br>
        &bull;Be available for walkthroughs and sign-offs<br>
        &bull;Provide adequate space for material storage during construction
      </td>
    </tr>
    <tr>
      <td style="font-weight:700;color:#2c5530">Home Manufacturer</td>
      <td>
        &bull;Manufacture home to specifications and quality standards<br>
        &bull;Deliver home sections to site on agreed schedule<br>
        &bull;Provide installation instructions and specifications<br>
        &bull;Honor manufacturer's warranty on home components<br>
        &bull;Provide technical support during installation if needed
      </td>
    </tr>
  </tbody>
</table>

<!-- SECTION 3: DETAILED WORK BREAKDOWN -->
<div class="section-title page-break">3. Work Breakdown & Specifications</div>

<div class="phase-box">
  <div class="phase-title">Phase 1: Site Preparation & Foundation</div>
  <div style="font-size:14px;color:#666;margin-top:4px">Duration: 3-7 days depending on weather and site conditions</div>
</div>

<div class="service-box">
  <div class="service-name">${W.name}</div>
  <div style="font-size:14px;color:#666;margin-bottom:20px">${W.description}</div>

  <div class="specs-box">
    <div class="specs-title">Technical Specifications:</div>
    <ul style="margin:8px 0;padding-left:20px;font-size:14px;line-height:1.7">
      ${W.specifications.map(E=>`<li>${E}</li>`).join("")}
    </ul>
  </div>

  <div class="subsection-title">Work Included in This Phase</div>
  <ul class="included-list">
    ${W.workIncluded.map(E=>`<li>${E}</li>`).join("")}
  </ul>

  <div class="subsection-title">Work NOT Included (Additional Cost if Needed)</div>
  <ul class="excluded-list">
    ${W.excluded.map(E=>`<li>${E}</li>`).join("")}
  </ul>
</div>

<div class="phase-box">
  <div class="phase-title">Phase 2: Home Delivery & Set</div>
  <div style="font-size:14px;color:#666;margin-top:4px">Duration: 1-2 days for delivery and crane set</div>
</div>

<div class="service-box">
  <div class="service-name">Modular Home Delivery</div>
  <div style="font-size:14px;color:#666;margin-bottom:20px">Factory-built home sections transported to site and prepared for installation</div>

  <div class="subsection-title">What's Included</div>
  <ul class="included-list">
    <li>Factory construction of home per manufacturer specifications</li>
    <li>All factory-installed features, finishes, and appliances</li>
    <li>Transport of home sections from factory to site</li>
    <li>Delivery on agreed date (weather permitting)</li>
    <li>Basic delivery route preparation coordination</li>
    <li>Manufacturer's structural warranty documentation</li>
  </ul>

  <div class="subsection-title">What's NOT Included</div>
  <ul class="excluded-list">
    <li>Site preparation (covered in Phase 1)</li>
    <li>Foundation construction (covered in Phase 1)</li>
    <li>Utility connections beyond what's factory-installed</li>
    <li>Permit fees (unless specifically contracted)</li>
    <li>Oversize load permits (included in delivery cost)</li>
    <li>Custom modifications not in original factory order</li>
  </ul>
</div>

${k.filter(E=>E.key==="installation_of_home").length>0?`
<div class="phase-box">
  <div class="phase-title">Phase 3: Home Installation & Finishing</div>
  <div style="font-size:14px;color:#666;margin-top:4px">Duration: 3-7 days depending on home size and weather</div>
</div>

<div class="service-box">
  <div class="service-name">Professional Home Installation</div>
  <div style="font-size:14px;color:#666;margin-bottom:20px">Complete installation of home sections including marriage wall, roof connection, and weatherproofing</div>

  <div class="subsection-title">Installation Work Included</div>
  <ul class="included-list">
    <li><strong>Crane Service:</strong> Professional crane operation to lift and set home sections on foundation</li>
    <li><strong>Alignment & Leveling:</strong> Precise positioning and leveling of all home sections</li>
    <li><strong>Marriage Wall Construction:</strong> Complete marriage wall framing, insulation, and sealing</li>
    <li><strong>Roof Connection:</strong> Roof sections joined, shingled over seam, and fully weatherproofed</li>
    <li><strong>Exterior Completion:</strong> All exterior trim, siding seams, and weatherproofing completed</li>
    <li><strong>Door & Window Check:</strong> Verify all doors and windows operate properly after set</li>
    <li><strong>Utility Connections:</strong> Connect plumbing, electrical, and HVAC systems at marriage wall</li>
    <li><strong>Final Walkthrough:</strong> Complete inspection with customer, address any concerns</li>
    <li><strong>Inspection Coordination:</strong> Schedule and coordinate final building inspections</li>
  </ul>

  <div class="subsection-title">Installation Limitations & Exclusions</div>
  <ul class="excluded-list">
    <li>Foundation repairs or modifications after home is set</li>
    <li>Structural changes to home layout or design</li>
    <li>Custom modifications not part of original factory order</li>
    <li>Repairs to any pre-existing damage from transport</li>
    <li>Interior finishing beyond what's factory-installed</li>
    <li>Additional windows, doors, or openings</li>
  </ul>
</div>
`:""}

${k.filter(E=>!["installation_of_home"].includes(E.key)).length>0?`
<div class="phase-box">
  <div class="phase-title">Phase ${k.filter(E=>E.key==="installation_of_home").length>0?"4":"3"}: Additional Services & Site Completion</div>
  <div style="font-size:14px;color:#666;margin-top:4px">Services performed as needed throughout or after main installation</div>
</div>

${k.filter(E=>!["installation_of_home"].includes(E.key)).map(E=>`
<div class="service-box">
  <div class="service-name">${E.name}</div>
  <div style="font-size:14px;color:#666;margin-top:8px">Service will be completed per industry standards and local code requirements</div>
</div>
`).join("")}
`:""}

<!-- SECTION 4: SITE REQUIREMENTS & CONDITIONS -->
<div class="section-title page-break">4. Site Requirements & Customer Obligations</div>

<div class="warning-box">
  <div style="font-weight:700;font-size:18px;margin-bottom:12px;color:#856404">Site Access & Preparation Requirements</div>
  <ul style="margin:0;padding-left:20px;line-height:1.9;font-size:15px">
    <li><strong>Access Road:</strong> Must accommodate semi-truck with 65'+ trailer and 85-ton crane</li>
    <li><strong>Turning Radius:</strong> Minimum 45-foot turning radius for delivery vehicles</li>
    <li><strong>Overhead Clearance:</strong> Minimum 16 feet clearance (power lines, tree branches, etc.)</li>
    <li><strong>Foundation Ready:</strong> Foundation must be complete, cured, and inspected before delivery date</li>
    <li><strong>Utilities:</strong> Electric, water, and sewer/septic available at property line</li>
    <li><strong>Site Clearing:</strong> Work area clear of vehicles, equipment, debris, and obstacles</li>
    <li><strong>Staging Area:</strong> Minimum 50' x 100' clear area near home site for crane setup</li>
    <li><strong>Weather Dependent:</strong> Installation cannot proceed in high winds, rain, or icy conditions</li>
  </ul>
</div>

<!-- SECTION 5: PROJECT EXCLUSIONS -->
<div class="section-title">5. General Exclusions</div>

<div class="service-box">
  <div style="font-size:16px;margin-bottom:20px;font-weight:600;color:#495057">
    Unless specifically listed in this scope of work as included, the following items are <strong>NOT</strong> part of this contract:
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
    <div>
      <div style="font-weight:700;color:#2c5530;margin-bottom:12px;font-size:16px">Site & Exterior</div>
      <ul class="excluded-list">
        <li>Landscaping, seeding, or sod installation</li>
        <li>Decorative grading or site beautification</li>
        <li>Driveway paving or surfacing beyond gravel (if selected)</li>
        <li>Fencing or property line work</li>
        <li>Tree removal (unless obstructing work)</li>
        <li>Retaining walls or extensive grading</li>
        <li>Outdoor structures (sheds, garages, decks)</li>
        <li>Mailbox installation</li>
      </ul>
    </div>
    <div>
      <div style="font-weight:700;color:#2c5530;margin-bottom:12px;font-size:16px">Interior & Finish Work</div>
      <ul class="excluded-list">
        <li>Interior painting or wall finishes</li>
        <li>Flooring beyond factory-installed</li>
        <li>Cabinet or countertop upgrades</li>
        <li>Appliance installation beyond factory</li>
        <li>Window treatments (blinds, curtains)</li>
        <li>Light fixture upgrades</li>
        <li>Furniture or decorations</li>
        <li>Custom carpentry or built-ins</li>
      </ul>
    </div>
  </div>

  <div style="margin-top:24px">
    <div style="font-weight:700;color:#2c5530;margin-bottom:12px;font-size:16px">Utilities & Systems</div>
    <ul class="excluded-list">
      <li>Well drilling or septic system installation (unless contracted separately)</li>
      <li>Utility company connection fees and meter installation</li>
      <li>Electrical service upgrade at pole or transformer</li>
      <li>HVAC system installation (unless contracted separately)</li>
      <li>Interior plumbing beyond factory-installed fixtures</li>
      <li>Water softener or filtration systems</li>
      <li>Security or camera systems</li>
      <li>Smart home technology installation</li>
    </ul>
  </div>
</div>

<!-- SECTION 6: CHANGE ORDERS & MODIFICATIONS -->
<div class="section-title">6. Change Orders & Project Modifications</div>

<div class="highlight-box">
  <div style="font-weight:700;font-size:18px;margin-bottom:12px;color:#1565c0">Change Order Process</div>
  <p style="margin:12px 0;line-height:1.8;font-size:15px">
    Any modifications, additions, or deletions to this Scope of Work must be documented in writing through a formal Change Order.
    No verbal agreements will be honored. All Change Orders must include:
  </p>
  <ul style="margin:12px 0;padding-left:20px;line-height:1.8;font-size:15px">
    <li>Detailed description of the work to be added, removed, or modified</li>
    <li>Cost impact (additional charges or credits)</li>
    <li>Schedule impact (if any)</li>
    <li>Signatures from both ${Ke.name} and Customer</li>
    <li>Change Order number and date</li>
  </ul>
  <p style="margin:16px 0 0;line-height:1.8;font-size:15px;font-weight:600">
    Change Orders may result in adjustments to project timeline and cost. Work will not proceed on changes until signed Change Order is received.
  </p>
</div>

<!-- SECTION 7: ASSUMPTIONS & CONDITIONS -->
<div class="section-title">7. Project Assumptions & Conditions</div>

<div class="service-box">
  <div style="font-weight:700;font-size:17px;margin-bottom:16px;color:#2c5530">This Scope of Work is Based on the Following Assumptions:</div>

  <table>
    <thead>
      <tr>
        <th>Assumption Category</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-weight:700">Site Conditions</td>
        <td>Normal soil conditions, adequate drainage, no rock or unsuitable soil, water table below foundation depth</td>
      </tr>
      <tr>
        <td style="font-weight:700">Access</td>
        <td>Clear, unrestricted access for all delivery and construction vehicles during normal business hours</td>
      </tr>
      <tr>
        <td style="font-weight:700">Utilities</td>
        <td>Electric, water, and sewer/septic available at property line; utility connections within 100 feet of home</td>
      </tr>
      <tr>
        <td style="font-weight:700">Permits</td>
        <td>All necessary permits can be obtained; no zoning restrictions or variance requirements unknown at time of quote</td>
      </tr>
      <tr>
        <td style="font-weight:700">Weather</td>
        <td>Typical weather conditions for the season; work may be delayed by extreme weather</td>
      </tr>
      <tr>
        <td style="font-weight:700">Schedule</td>
        <td>Home manufacturer delivers on agreed date; materials and subcontractors available as scheduled</td>
      </tr>
      <tr>
        <td style="font-weight:700">Existing Structures</td>
        <td>No demolition or removal of existing buildings required (unless specifically quoted)</td>
      </tr>
    </tbody>
  </table>

  <div class="warning-box" style="margin-top:24px">
    <div style="font-weight:700;font-size:16px;margin-bottom:8px">Important Note About Unforeseen Conditions:</div>
    <p style="margin:0;font-size:14px;line-height:1.7">
      If unforeseen site conditions are discovered (rock, poor soil, high water table, underground utilities, etc.), work may need to be stopped
      until the condition is addressed. Additional costs for dealing with unforeseen conditions will be documented in a Change Order and approved
      by the customer before work proceeds.
    </p>
  </div>
</div>

<!-- SECTION 8: ACKNOWLEDGMENT -->
<div class="sig-section">
  <div style="font-size:24px;font-weight:800;color:#2c5530;margin-bottom:24px">Acknowledgment & Agreement</div>

  <p style="margin-bottom:20px;font-size:15px;line-height:1.8">
    By signing below, both parties acknowledge that they have read, understood, and agree to the scope of work as outlined in this document.
    This Scope of Work is an integral part of <strong>Quote #${j}</strong> and should be reviewed in conjunction with all contract documents including:
  </p>

  <ul style="margin:20px 0;padding-left:24px;line-height:1.9;font-size:15px">
    <li>Full itemized quote with pricing</li>
    <li>Payment schedule and terms</li>
    <li>Warranty information</li>
    <li>Home manufacturer specifications</li>
    <li>Any addendums or Change Orders</li>
  </ul>

  <p style="margin:24px 0;font-size:15px;line-height:1.8;font-weight:600">
    Both parties understand that work not specifically included in this Scope of Work is not part of the contracted services and will require
    a separate agreement or Change Order if requested.
  </p>

  <div style="margin-top:50px">
    <div style="font-weight:700;margin-bottom:12px;font-size:16px">Customer Signature:</div>
    <div class="sig-line"></div>
    <div style="display:flex;justify-content:space-between;font-size:14px;color:#666">
      <span><strong>Print Name:</strong> ${u.firstName} ${u.lastName}</span>
      <span><strong>Date:</strong> _______________</span>
    </div>
  </div>

  <div style="margin-top:60px">
    <div style="font-weight:700;margin-bottom:12px;font-size:16px">${Ke.name} Representative:</div>
    <div class="sig-line"></div>
    <div style="display:flex;justify-content:space-between;font-size:14px;color:#666">
      <span><strong>Print Name:</strong> _______________</span>
      <span><strong>Date:</strong> _______________</span>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:80px;padding:28px;background:linear-gradient(135deg,#2c5530 0%,#1a3320 100%);color:#fff;border-radius:10px;text-align:center">
  <div style="font-size:22px;font-weight:800;margin-bottom:8px">${Ke.name}</div>
  <div style="font-size:15px;margin-bottom:12px">${Ke.tagline}</div>
  <div style="font-size:14px;margin-bottom:4px">${Ke.addressFull}</div>
  <div style="font-size:14px;margin-bottom:4px">Phone: ${Ke.phone}</div>
  <div style="font-size:12px;margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.3);font-style:italic">
    This Scope of Work document is valid for 30 days from ${S}
  </div>
</div>

</body></html>`},Jp=(l,u,h)=>{var J,Y,oe,ee,R;const S=h||Pn,j=rt.formatDate(),k=rt.getQuoteNum(l),L=iu(l,S),T=$=>ru($,l,S,L),W=Object.entries(l.selectedServices||{}).filter(([$,H])=>H&&sn.includes($)).map(([$])=>T($)),E=Object.entries(l.selectedServices||{}).filter(([$,H])=>H&&!sn.includes($)&&!Vn.includes($)).map(([$])=>T($)),z=Object.entries(l.selectedServices||{}).filter(([$,H])=>H&&Vn.includes($)).map(([$])=>T($)),V=ua(l,L),F=su(l.foundationType);return`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Crew Work Order - ${u.firstName||"Customer"} ${u.lastName||""}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:1400px;margin:0 auto;color:#222;line-height:1.6}
.header{background:linear-gradient(135deg,#ff6b35 0%,#f7931e 100%);color:#fff;padding:30px;border-radius:10px;margin-bottom:30px;box-shadow:0 4px 12px rgba(0,0,0,0.15)}
.title{font-size:38px;font-weight:900;margin:0;letter-spacing:-0.5px}
.subtitle{font-size:16px;margin-top:8px;opacity:0.95;font-weight:500}
.info-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:30px}
.info-box{background:#f8f9fa;padding:18px;border-radius:8px;border-left:4px solid #ff6b35}
.info-label{font-weight:700;margin-bottom:8px;color:#ff6b35;font-size:13px;text-transform:uppercase;letter-spacing:0.5px}
.info-value{font-size:15px;color:#333}
.section-title{font-size:24px;font-weight:800;color:#ff6b35;margin:40px 0 20px;border-bottom:3px solid #ff6b35;padding-bottom:8px;text-transform:uppercase;letter-spacing:0.5px}
.service-card{background:#fff;border:2px solid #dee2e6;border-radius:8px;padding:20px;margin-bottom:20px;box-shadow:0 2px 6px rgba(0,0,0,0.08);transition:all 0.3s ease}
.service-card.completed{background:#f1f8f4;border-color:#2e7d32;opacity:0.7}
.service-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;padding-bottom:12px;border-bottom:2px solid #e9ecef}
.service-name{font-size:20px;font-weight:800;color:#2c5530;display:flex;align-items:center;gap:12px}
.service-checkbox{width:24px;height:24px;cursor:pointer;accent-color:#2e7d32}
.service-cost{font-size:18px;font-weight:700;color:#ff6b35}
.service-description{font-size:14px;color:#666;margin-bottom:12px;font-style:italic}
.service-details{display:flex;gap:20px;margin-bottom:15px;font-size:14px}
.service-detail-item{background:#f1f3f5;padding:8px 12px;border-radius:4px;font-weight:600}
.crew-note{background:#fff3e0;border-left:4px solid #ff6b35;padding:15px;border-radius:4px;margin-top:12px}
.crew-note-title{font-weight:700;color:#e65100;margin-bottom:8px;font-size:14px;display:flex;align-items:center;gap:8px}
.crew-note-content{font-size:14px;line-height:1.6;white-space:pre-wrap;color:#333}
.customer-note{background:#e3f2fd;border-left:4px solid #1565c0;padding:15px;border-radius:4px;margin-top:12px}
.customer-note-title{font-weight:700;color:#1565c0;margin-bottom:8px;font-size:14px;display:flex;align-items:center;gap:8px}
.customer-note-content{font-size:14px;line-height:1.6;white-space:pre-wrap;color:#333}
.important-box{background:#ffebee;border:3px solid #c62828;padding:20px;border-radius:8px;margin:25px 0}
.important-title{font-weight:800;color:#c62828;font-size:18px;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.project-summary{background:#e8f5e9;border:2px solid #2e7d32;padding:20px;border-radius:8px;margin-bottom:30px}
.summary-title{font-weight:800;color:#2e7d32;font-size:18px;margin-bottom:15px}
.summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}
.summary-item{font-size:15px;padding:8px 0}
.summary-label{font-weight:700;color:#2e7d32}
.no-services{background:#f8f9fa;padding:30px;text-align:center;color:#666;border-radius:8px;font-style:italic}
.progress-bar-container{background:#e0e0e0;border-radius:10px;height:30px;margin:20px 0;overflow:hidden;position:relative}
.progress-bar{background:linear-gradient(90deg,#2e7d32 0%,#66bb6a 100%);height:100%;transition:width 0.5s ease;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}
.checklist-item{display:flex;align-items:flex-start;gap:10px;margin:8px 0;padding:8px;border-radius:4px;transition:background 0.2s}
.checklist-item:hover{background:#f5f5f5}
.checklist-checkbox{width:20px;height:20px;cursor:pointer;margin-top:2px;accent-color:#2e7d32;flex-shrink:0}
.checklist-label{flex-grow:1;cursor:pointer;user-select:none}
.checklist-item.checked .checklist-label{text-decoration:line-through;opacity:0.6}
.crew-comment-section{margin-top:8px;padding:8px 12px;background:#f8f9fa;border-radius:6px;border-left:3px solid #2e7d32}
.crew-comment-label{font-size:11px;font-weight:700;color:#2e7d32;margin-bottom:4px;display:flex;align-items:center;gap:6px}
.crew-comment-input{width:100%;padding:4px 8px;border:1px solid #ccc;border-radius:4px;font-size:13px;font-family:inherit;resize:none;height:28px;overflow:hidden;transition:all 0.25s ease;box-sizing:border-box;background:#fafafa}
.crew-comment-input:focus{outline:none;border-color:#2e7d32;border-width:2px;height:70px;padding:8px;background:#fff;box-shadow:0 2px 8px rgba(46,125,50,0.15)}
.crew-comment-input.has-content{height:44px;padding:6px 8px;background:#fff;border-color:#66bb6a}
.crew-comment-input::placeholder{color:#bbb;font-style:italic;font-size:12px}
.comment-row{display:flex;gap:6px;align-items:flex-start}
.comment-row .crew-comment-input{flex:1}
.publish-btn{background:#2e7d32;color:#fff;border:none;border-radius:4px;padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;height:28px;transition:all 0.2s ease;letter-spacing:0.3px}
.publish-btn:hover{background:#1b5e20;transform:scale(1.05)}
.publish-btn:active{transform:scale(0.97)}
.published-notes-list{margin-top:6px}
.published-note-item{background:#e8f5e9;border-left:3px solid #2e7d32;padding:6px 10px;border-radius:4px;margin-top:4px;font-size:12px;line-height:1.5;position:relative}
.published-note-item .note-text{color:#333;white-space:pre-wrap}
.published-note-item .note-timestamp{font-size:10px;color:#666;margin-top:3px;font-style:italic}
.published-note-item .delete-note-btn{position:absolute;top:4px;right:6px;background:none;border:none;color:#c62828;cursor:pointer;font-size:14px;line-height:1;padding:2px 4px;opacity:0.5;transition:opacity 0.2s}
.published-note-item .delete-note-btn:hover{opacity:1}
.camera-btn{background:#1565c0;color:#fff;border:none;border-radius:4px;padding:4px 8px;font-size:15px;cursor:pointer;height:28px;width:32px;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;flex-shrink:0}
.camera-btn:hover{background:#0d47a1;transform:scale(1.05)}
.camera-btn:active{transform:scale(0.97)}
.image-staging{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.image-staging:empty{display:none}
.staged-thumb{position:relative;width:60px;height:60px;border-radius:4px;overflow:hidden;border:2px solid #1565c0;cursor:pointer}
.staged-thumb img{width:100%;height:100%;object-fit:cover}
.staged-thumb .remove-staged{position:absolute;top:-2px;right:-2px;background:#c62828;color:#fff;border:none;border-radius:50%;width:18px;height:18px;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}
.published-note-images{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.published-note-images img{width:56px;height:56px;object-fit:cover;border-radius:3px;border:1px solid #ccc;cursor:pointer;transition:transform 0.2s}
.published-note-images img:hover{transform:scale(1.1);border-color:#2e7d32}
.crew-comment-input.dragover{border-color:#1565c0!important;border-width:2px!important;background:#e3f2fd!important;box-shadow:0 0 8px rgba(21,101,192,0.3)!important}
.lightbox-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:pointer}
.lightbox-overlay img{max-width:90%;max-height:90%;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.5)}
.checklist-item-wrapper{display:flex;flex-direction:column;width:100%;break-inside:avoid}
.checklist-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 20px}
.service-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.service-grid .service-card{margin-bottom:0}
.collapsible-section{margin-bottom:30px}
.section-header{display:flex;justify-content:space-between;align-items:center;cursor:pointer;padding:15px 20px;background:linear-gradient(135deg,#ff6b35 0%,#f7931e 100%);border-radius:8px;margin-bottom:0;transition:all 0.3s ease}
.section-header:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(255,107,53,0.3)}
.section-header-title{font-size:24px;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:0.5px;display:flex;align-items:center;gap:10px}
.section-toggle-btn{background:rgba(255,255,255,0.2);border:2px solid #fff;color:#fff;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;transition:all 0.3s ease;cursor:pointer}
.section-toggle-btn:hover{background:rgba(255,255,255,0.4);transform:scale(1.1)}
.section-content{max-height:0;overflow:hidden;transition:max-height 0.5s ease;padding:0}
.section-content.expanded{max-height:50000px;padding:20px 0}
.delivery-section .section-header{background:linear-gradient(135deg,#1565c0 0%,#42a5f5 100%)}
.delivery-section .section-header:hover{box-shadow:0 4px 12px rgba(21,101,192,0.3)}
.completion-section .section-header{background:linear-gradient(135deg,#2e7d32 0%,#66bb6a 100%)}
.completion-section .section-header:hover{box-shadow:0 4px 12px rgba(46,125,50,0.3)}
@media(max-width:1024px){body{padding:20px;max-width:100%}.info-grid{grid-template-columns:1fr 1fr}.service-grid{grid-template-columns:1fr}.title{font-size:28px}.section-header-title{font-size:18px}}
@media(max-width:768px){body{padding:12px}.info-grid{grid-template-columns:1fr}.checklist-grid{grid-template-columns:1fr}.service-grid{grid-template-columns:1fr}.summary-grid{grid-template-columns:1fr}.title{font-size:24px}.section-header-title{font-size:16px}.section-header{padding:12px 16px}.service-name{font-size:16px}.info-box{padding:12px}.header{padding:20px}.crew-comment-input:focus{height:60px}.publish-btn{padding:4px 8px;font-size:10px}.staged-thumb{width:50px;height:50px}.published-note-images img{width:48px;height:48px}}
@media print{body{padding:15px;font-size:12px;max-width:100%}.service-card{page-break-inside:avoid}.progress-bar-container{display:none}.crew-comment-input{border:1px solid #999;height:36px!important}.section-content{max-height:none!important;padding:20px 0!important}.section-toggle-btn{display:none}.checklist-grid{grid-template-columns:1fr 1fr}.service-grid{grid-template-columns:1fr 1fr}.publish-btn{display:none}.delete-note-btn{display:none}.camera-btn{display:none}.image-staging{display:none}.remove-staged{display:none}.published-note-item{border-left:2px solid #2e7d32}.published-note-images img{width:80px;height:80px}}
</style></head><body>

<div class="header">
  <div class="title">🔧 CREW WORK ORDER</div>
  <div class="subtitle">Internal Installation & Service Instructions - Check off tasks as you complete them</div>
  <div style="margin-top:15px;font-size:14px;display:flex;justify-content:space-between;opacity:0.95">
    <span><strong>Quote #:</strong> ${k}</span>
    <span><strong>Generated:</strong> ${j}</span>
  </div>
  <div class="progress-bar-container" style="margin-top:20px">
    <div class="progress-bar" id="progressBar" style="width:0%">
      <span id="progressText">0% Complete</span>
    </div>
  </div>
</div>

<!-- CUSTOMER & PROJECT INFO -->
<div class="info-grid">
  <div class="info-box">
    <div class="info-label">Customer</div>
    <div class="info-value" style="font-size:17px;font-weight:700;margin-bottom:6px">${u.firstName} ${u.lastName}</div>
    <div class="info-value" style="font-size:13px">📞 ${Ui(u.phone)}</div>
    <div class="info-value" style="font-size:13px">✉️ ${u.email}</div>
  </div>
  <div class="info-box">
    <div class="info-label">Site Address</div>
    <div class="info-value">${u.siteAddress}</div>
    <div class="info-value">${u.siteCity}, ${u.siteState} ${u.siteZip}</div>
  </div>
  <div class="info-box">
    <div class="info-label">Contact Person</div>
    <div class="info-value">${l.contactPerson||"Primary Contact"}</div>
    <div class="info-value" style="font-size:13px">${Ui(l.contactPhone||u.phone)}</div>
  </div>
</div>

<!-- PROJECT SUMMARY -->
<div class="project-summary">
  <div class="summary-title">📋 Project Overview</div>
  <div class="summary-grid">
    <div class="summary-item"><span class="summary-label">Home Type:</span> ${l.singleDouble==="double"?"Double-Wide":"Single-Wide"}</div>
    <div class="summary-item"><span class="summary-label">Model:</span> ${l.homeModel!=="NONE"?l.homeModel:"Custom"}</div>
    <div class="summary-item"><span class="summary-label">Dimensions:</span> ${l.houseWidth}' × ${l.houseLength}'</div>
    <div class="summary-item"><span class="summary-label">Foundation:</span> ${F}</div>
    <div class="summary-item"><span class="summary-label">Drive Time:</span> ${l.driveTime} miles (${(parseFloat(l.driveTime)*2).toFixed(0)} miles round trip)</div>
    <div class="summary-item"><span class="summary-label">Total Services:</span> ${W.length+E.length+z.length+V.length}</div>
  </div>
</div>

<!-- IMPORTANT NOTES -->
<div class="important-box">
  <div class="important-title">⚠️ BEFORE STARTING WORK</div>
  <ul style="margin:10px 0;padding-left:25px;line-height:1.8">
    <li><strong>Review ALL crew notes</strong> below for special instructions from sales rep</li>
    <li><strong>Verify site access</strong> - Check for overhead clearance, turning radius, and staging area</li>
    <li><strong>Confirm utilities</strong> - Electric, water, sewer/septic ready at property line</li>
    <li><strong>Weather check</strong> - Do not proceed in high winds, rain, or icy conditions</li>
    <li><strong>Contact customer</strong> 24 hours before arrival to confirm schedule</li>
    <li><strong>Document everything</strong> - Take photos before, during, and after work</li>
  </ul>
</div>

${(()=>{var Ae,Ne,A,pe;const $=[],H=l.publishedGeneralCrewNotes||[];H.length>0&&$.push({name:"General Project Notes",notes:H});const I=((Ae=l.publishedServiceCrewNotes)==null?void 0:Ae.home_selection)||[];I.length>0&&$.push({name:"Home Selection",notes:I});const v=((Ne=l.publishedServiceCrewNotes)==null?void 0:Ne.foundation)||[];v.length>0&&$.push({name:"Foundation",notes:v}),[W,E,z,V].flat().forEach(G=>{G.publishedCrewNotes.length>0&&$.push({name:G.name,notes:G.publishedCrewNotes})});const re=$.reduce((G,ae)=>G+ae.notes.length,0),O=[],te=l.publishedGeneralCustomerNotes||[];te.length>0&&O.push({name:"General Project Notes",notes:te});const ze=((A=l.publishedServiceNotes)==null?void 0:A.home_selection)||[];ze.length>0&&O.push({name:"Home Selection",notes:ze});const ne=((pe=l.publishedServiceNotes)==null?void 0:pe.foundation)||[];ne.length>0&&O.push({name:"Foundation",notes:ne}),[W,E,z,V].flat().forEach(G=>{G.publishedCustomerNotes&&G.publishedCustomerNotes.length>0&&O.push({name:G.name,notes:G.publishedCustomerNotes})});const ye=O.reduce((G,ae)=>G+ae.notes.length,0),ve=re+ye;return`
<!-- NOTE SUMMARY -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('note-summary')" style="background:linear-gradient(135deg,#2c5530 0%,#4a7c59 100%)">
    <div class="section-header-title">
      📋 NOTE SUMMARY (${ve} Notes)
    </div>
    <div class="section-toggle-btn" id="toggle-note-summary">+</div>
  </div>
  <div class="section-content" id="content-note-summary">
${re>0?`
  <div style="margin-bottom:${ye>0?"20px":"0"}">
    <div style="font-size:15px;font-weight:800;color:#e65100;margin-bottom:10px">🔧 Crew Notes (${re})</div>
    ${$.map(G=>`
    <div style="margin-bottom:12px;padding:12px;background:#fff3e0;border-left:4px solid #e65100;border-radius:4px">
      <div style="font-size:14px;font-weight:800;color:#e65100;margin-bottom:6px">${G.name}</div>
      <ul style="margin:0;padding-left:20px;line-height:1.8">
        ${G.notes.map(ae=>`
        <li><strong>${ae.text}</strong>
          <span style="font-size:11px;color:#999;font-style:italic;margin-left:8px">— ${ae.publishedBy}</span>
        </li>
        `).join("")}
      </ul>
    </div>
    `).join("")}
  </div>
`:""}
${ye>0?`
  <div>
    <div style="font-size:15px;font-weight:800;color:#1565c0;margin-bottom:4px">💬 Customer Notes (${ye})</div>
    <div style="font-size:12px;color:#1565c0;font-weight:600;margin-bottom:10px;font-style:italic">Notes shared with the customer — review so you know what was communicated.</div>
    ${O.map(G=>`
    <div style="margin-bottom:12px;padding:12px;background:#e3f2fd;border-left:4px solid #1565c0;border-radius:4px">
      <div style="font-size:14px;font-weight:800;color:#1565c0;margin-bottom:6px">${G.name}</div>
      <ul style="margin:0;padding-left:20px;line-height:1.8">
        ${G.notes.map(ae=>`
        <li><strong>${ae.text}</strong>
          <span style="font-size:11px;color:#999;font-style:italic;margin-left:8px">— ${ae.publishedBy}</span>
        </li>
        `).join("")}
      </ul>
    </div>
    `).join("")}
  </div>
`:""}
${ve===0?'<div style="padding:10px;text-align:center;color:#999;font-style:italic">No notes for this project</div>':""}
  </div>
</div>
`})()}

<!-- DELIVERY & INSPECTION CHECKLIST -->
<div class="collapsible-section delivery-section">
  <div class="section-header" onclick="toggleSection('delivery-checklist')">
    <div class="section-header-title">
      📦 DELIVERY & INSPECTION CHECKLIST
    </div>
    <div class="section-toggle-btn" id="toggle-delivery-checklist">+</div>
  </div>
  <div class="section-content" id="content-delivery-checklist">

<div style="background:#e3f2fd;border:2px solid #1565c0;border-radius:8px;padding:20px;margin-bottom:30px">

  <!-- Documentation and Compliance -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin-bottom:10px;border-bottom:2px solid #1565c0;padding-bottom:6px">📄 Documentation and Compliance</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_hud_data_plate">
      <label class="checklist-label">Verify the HUD data plate is present</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_hud_data_plate" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_hud_cert">
      <label class="checklist-label">Confirm the HUD certification label</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_hud_cert" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_manufacturer_install">
      <label class="checklist-label">Manufacturer's install instructions</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_manufacturer_install" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_warranties">
      <label class="checklist-label">Review warranties, manuals for appliances</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_warranties" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_rivet_badge">
      <label class="checklist-label">Rivet Install Badge and White # on home</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_rivet_badge" placeholder="Comments..."></textarea>
    </div>
  </div>
  </div>

  <!-- Exterior Inspection -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin:20px 0 10px;border-bottom:2px solid #1565c0;padding-bottom:6px">🏠 Exterior Inspection</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_siding">
      <label class="checklist-label">Siding — breaks, dents, damage</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_siding" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_roof">
      <label class="checklist-label">Roof — leaks, missing shingles, damage</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_roof" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_windows">
      <label class="checklist-label">Windows — breaks, proper operation</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_windows" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_trim">
      <label class="checklist-label">Trim, porches, decks, exterior fixtures</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_trim" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_transit_damage">
      <label class="checklist-label">Transit damage (scratches, dents)</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_transit_damage" placeholder="Comments..."></textarea>
    </div>
  </div>
  ${(J=l.selectedServices)!=null&&J.gas_propane?`<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_gas_line">
      <label class="checklist-label">Gas Line Location</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_gas_line" placeholder="Location details..."></textarea>
    </div>
  </div>`:""}
  ${(Y=l.selectedServices)!=null&&Y.electric_connection?`<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_electric_stub">
      <label class="checklist-label">Electric stub — How many Ft.</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_electric_stub" placeholder="Feet..."></textarea>
    </div>
  </div>`:""}
  ${(oe=l.selectedServices)!=null&&oe.plumbing?`<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_water_line">
      <label class="checklist-label">Water Line — How many ft for hookup</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_water_line" placeholder="Feet..."></textarea>
    </div>
  </div>`:""}
  ${l.sewerType&&l.sewerType!=="none"?`<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_sewer_line">
      <label class="checklist-label">Sewer line — How many Ft.</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_sewer_line" placeholder="Feet..."></textarea>
    </div>
  </div>`:""}
  </div>

  <!-- Interior Inspection -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin:20px 0 10px;border-bottom:2px solid #1565c0;padding-bottom:6px">🔍 Interior Inspection</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_drywall">
      <label class="checklist-label">Drywall/walls — excessive damage</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_drywall" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_ceilings">
      <label class="checklist-label">Ceilings — sags, stains, damage</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_ceilings" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_floors">
      <label class="checklist-label">Floors — levelness, soft spots</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_floors" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_cabinets">
      <label class="checklist-label">Cabinets, countertops, fixtures</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_cabinets" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_insulation">
      <label class="checklist-label">Insulation — walls, floors, ceilings</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_insulation" placeholder="Comments..."></textarea>
    </div>
  </div>
  </div>

  <!-- Appliances and Equipment -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin:20px 0 10px;border-bottom:2px solid #1565c0;padding-bottom:6px">🔌 Appliances and Equipment</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_appliances">
      <label class="checklist-label">Appliances (fridge, stove, dishwasher)</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_appliances" placeholder="List and condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_equipment">
      <label class="checklist-label">Installed equipment (HVAC) functional</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_equipment" placeholder="Comments..."></textarea>
    </div>
  </div>
  </div>

  <!-- Verify Material List -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin:20px 0 10px;border-bottom:2px solid #1565c0;padding-bottom:6px">📋 Verify Material List</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_door_jam">
      <label class="checklist-label">Door Jam Board</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_door_jam" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_door_casement">
      <label class="checklist-label">Door Casement</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_door_casement" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_door_stops">
      <label class="checklist-label">Door Stops</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_door_stops" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_screen_door">
      <label class="checklist-label">Screen Door</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_screen_door" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_vinyl_floor">
      <label class="checklist-label">Vinyl Floor Coverings</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_vinyl_floor" placeholder="Enough? Sq ft..."></textarea>
    </div>
  </div>
  ${l.sewerType&&l.sewerType!=="none"?`<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_sewer_pipe">
      <label class="checklist-label">Sewer Pipe — ft</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_sewer_pipe" placeholder="Feet..."></textarea>
    </div>
  </div>`:""}
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_beam_trim">
      <label class="checklist-label">Beam Trim</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_beam_trim" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  ${(ee=l.selectedServices)!=null&&ee.siding_install?`<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_siding_material">
      <label class="checklist-label">Siding</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_siding_material" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_siding_starter">
      <label class="checklist-label">Siding Starter</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_siding_starter" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_facia">
      <label class="checklist-label">Facia</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_facia" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_roof_facia">
      <label class="checklist-label">Roof Facia</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_roof_facia" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_soffits">
      <label class="checklist-label">Soffits</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_soffits" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_j_channel">
      <label class="checklist-label">J-channel</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_j_channel" placeholder="Qty/condition..."></textarea>
    </div>
  </div>`:""}
  ${(R=l.selectedServices)!=null&&R.painting?`<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_paint">
      <label class="checklist-label">Paint</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_paint" placeholder="Qty/condition..."></textarea>
    </div>
  </div>`:""}
  </div>

  <!-- Final Steps -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin:20px 0 10px;border-bottom:2px solid #1565c0;padding-bottom:6px">📸 Final Steps</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_pictures">
      <label class="checklist-label">Take photos and attach to document</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_pictures" placeholder="# of photos, what was documented..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_clean_floors">
      <label class="checklist-label">Clean floors, lay floor coverings</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_clean_floors" placeholder="Comments..."></textarea>
    </div>
  </div>
  </div>

</div>

  </div>
</div>

${W.length>0?`
<!-- INSTALL SERVICES SECTION -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('install-services')">
    <div class="section-header-title">
      🏗️ Licensed Required Services
    </div>
    <div class="section-toggle-btn" id="toggle-install-services">+</div>
  </div>
  <div class="section-content" id="content-install-services">
<div class="service-grid">
${W.map($=>$.key==="plumbing"?`
<div class="service-card" data-task-id="install_plumbing">
  <div class="service-header">
    <div class="service-name">
      <span>${$.name}</span>
    </div>
  </div>
  ${$.description?`<div class="service-description">${$.description}</div>`:""}
  <div style="padding:10px 15px;display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;align-items:center;gap:10px">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="install_plumbing_water" style="width:18px;height:18px">
      <label style="font-size:14px;font-weight:600">🚰 Water Connection</label>
    </div>
    <div style="display:flex;align-items:center;gap:10px">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="install_plumbing_sewer" style="width:18px;height:18px">
      <label style="font-size:14px;font-weight:600">🚿 Sewer Connection</label>
    </div>
  </div>
  ${$.publishedCrewNotes.length>0?$.publishedCrewNotes.map(H=>`
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${H.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${ti(H.publishedAt)} by ${H.publishedBy}
    </div>
  </div>
  `).join(""):""}
  ${$.publishedCustomerNotes&&$.publishedCustomerNotes.length>0?$.publishedCustomerNotes.map(H=>`
  <div class="customer-note" style="margin-bottom:10px">
    <div class="customer-note-title">💬 Customer Note</div>
    <div class="customer-note-content">${H.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${ti(H.publishedAt)} by ${H.publishedBy}
    </div>
  </div>
  `).join(""):""}
  ${$.customerNote?`
  <div class="customer-note" style="opacity:0.7">
    <div class="customer-note-title">📝 Draft Customer Note (unpublished)</div>
    <div class="customer-note-content">${$.customerNote}</div>
  </div>
  `:""}
  <div class="crew-comment-section">
    <div class="crew-comment-label">💭 Crew Feedback / Survey Comments:</div>
    <textarea class="crew-comment-input task-comment" data-task-id="install_plumbing" placeholder="Add your comments, observations, issues, or suggestions about this task..."></textarea>
  </div>
</div>
`:`
<div class="service-card" data-task-id="install_${$.key}">
  <div class="service-header">
    <div class="service-name">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="install_${$.key}">
      <span>${$.name}</span>
    </div>
  </div>
  ${$.description?`<div class="service-description">${$.description}</div>`:""}
  ${$.quantity||$.days?`
  <div class="service-details">
    ${$.quantity?`<div class="service-detail-item">📦 Quantity: ${$.quantity}</div>`:""}
    ${$.days?`<div class="service-detail-item">📅 Days: ${$.days}</div>`:""}
  </div>
  `:""}
  ${$.publishedCrewNotes.length>0?$.publishedCrewNotes.map(H=>`
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${H.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${ti(H.publishedAt)} by ${H.publishedBy}
    </div>
  </div>
  `).join(""):""}
  ${$.publishedCustomerNotes&&$.publishedCustomerNotes.length>0?$.publishedCustomerNotes.map(H=>`
  <div class="customer-note" style="margin-bottom:10px">
    <div class="customer-note-title">💬 Customer Note</div>
    <div class="customer-note-content">${H.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${ti(H.publishedAt)} by ${H.publishedBy}
    </div>
  </div>
  `).join(""):""}
  ${$.customerNote?`
  <div class="customer-note" style="opacity:0.7">
    <div class="customer-note-title">📝 Draft Customer Note (unpublished)</div>
    <div class="customer-note-content">${$.customerNote}</div>
  </div>
  `:""}
  <div class="crew-comment-section">
    <div class="crew-comment-label">💭 Crew Feedback / Survey Comments:</div>
    <textarea class="crew-comment-input task-comment" data-task-id="install_${$.key}" placeholder="Add your comments, observations, issues, or suggestions about this task..."></textarea>
  </div>
</div>
`).join("")}
</div>
  </div>
</div>
`:""}

${E.length>0?`
<!-- PROFESSIONAL SERVICES SECTION -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('professional-services')">
    <div class="section-header-title">
      ⚡ Professional Services
    </div>
    <div class="section-toggle-btn" id="toggle-professional-services">+</div>
  </div>
  <div class="section-content" id="content-professional-services">
<div class="service-grid">
${E.map($=>`
<div class="service-card" data-task-id="professional_${$.key}">
  <div class="service-header">
    <div class="service-name">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="professional_${$.key}">
      <span>${$.name}</span>
    </div>
  </div>
  ${$.description?`<div class="service-description">${$.description}</div>`:""}
  ${$.quantity||$.days?`
  <div class="service-details">
    ${$.quantity?`<div class="service-detail-item">📦 Quantity: ${$.quantity}</div>`:""}
    ${$.days?`<div class="service-detail-item">📅 Days: ${$.days}</div>`:""}
  </div>
  `:""}
  ${$.publishedCrewNotes.length>0?$.publishedCrewNotes.map(H=>`
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${H.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${ti(H.publishedAt)} by ${H.publishedBy}
    </div>
  </div>
  `).join(""):""}
  ${$.publishedCustomerNotes&&$.publishedCustomerNotes.length>0?$.publishedCustomerNotes.map(H=>`
  <div class="customer-note" style="margin-bottom:10px">
    <div class="customer-note-title">💬 Customer Note</div>
    <div class="customer-note-content">${H.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${ti(H.publishedAt)} by ${H.publishedBy}
    </div>
  </div>
  `).join(""):""}
  ${$.customerNote?`
  <div class="customer-note" style="opacity:0.7">
    <div class="customer-note-title">📝 Draft Customer Note (unpublished)</div>
    <div class="customer-note-content">${$.customerNote}</div>
  </div>
  `:""}
  <div class="crew-comment-section">
    <div class="crew-comment-label">💭 Crew Feedback / Survey Comments:</div>
    <textarea class="crew-comment-input task-comment" data-task-id="professional_${$.key}" placeholder="Add your comments, observations, issues, or suggestions about this task..."></textarea>
  </div>
</div>
`).join("")}
</div>
  </div>
</div>
`:""}

${z.length>0?`
<!-- HOME SPEC ADDITIONS SECTION -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('homespec-services')">
    <div class="section-header-title">
      🏠 Home Spec Additions
    </div>
    <div class="section-toggle-btn" id="toggle-homespec-services">+</div>
  </div>
  <div class="section-content" id="content-homespec-services">
<div class="service-grid">
${z.map($=>`
<div class="service-card" data-task-id="homespec_${$.key}">
  <div class="service-header">
    <div class="service-name">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="homespec_${$.key}">
      <span>${$.name}</span>
    </div>
  </div>
  ${$.description?`<div class="service-description">${$.description}</div>`:""}
  ${$.quantity||$.days?`
  <div class="service-details">
    ${$.quantity?`<div class="service-detail-item">📦 Quantity: ${$.quantity}</div>`:""}
    ${$.days?`<div class="service-detail-item">📅 Days: ${$.days}</div>`:""}
  </div>
  `:""}
  ${$.publishedCrewNotes.length>0?$.publishedCrewNotes.map(H=>`
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${H.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${ti(H.publishedAt)} by ${H.publishedBy}
    </div>
  </div>
  `).join(""):""}
  ${$.publishedCustomerNotes&&$.publishedCustomerNotes.length>0?$.publishedCustomerNotes.map(H=>`
  <div class="customer-note" style="margin-bottom:10px">
    <div class="customer-note-title">💬 Customer Note</div>
    <div class="customer-note-content">${H.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${ti(H.publishedAt)} by ${H.publishedBy}
    </div>
  </div>
  `).join(""):""}
  ${$.customerNote?`
  <div class="customer-note" style="opacity:0.7">
    <div class="customer-note-title">📝 Draft Customer Note (unpublished)</div>
    <div class="customer-note-content">${$.customerNote}</div>
  </div>
  `:""}
  <div class="crew-comment-section">
    <div class="crew-comment-label">💭 Crew Feedback / Survey Comments:</div>
    <textarea class="crew-comment-input task-comment" data-task-id="homespec_${$.key}" placeholder="Add your comments, observations, issues, or suggestions about this task..."></textarea>
  </div>
</div>
`).join("")}
</div>
  </div>
</div>
`:""}

${V.length>0?`
<!-- OTHER SERVICES SECTION -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('other-services')">
    <div class="section-header-title">
      🔨 Additional Services
    </div>
    <div class="section-toggle-btn" id="toggle-other-services">+</div>
  </div>
  <div class="section-content" id="content-other-services">
<div class="service-grid">
${V.map($=>`
<div class="service-card" data-task-id="other_${$.key}">
  <div class="service-header">
    <div class="service-name">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="other_${$.key}">
      <span>${$.name}</span>
    </div>
  </div>
  ${$.description?`<div class="service-description">${$.description}</div>`:""}
  ${$.publishedCrewNotes.length>0?$.publishedCrewNotes.map(H=>`
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${H.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${ti(H.publishedAt)} by ${H.publishedBy}
    </div>
  </div>
  `).join(""):""}
  ${$.publishedCustomerNotes&&$.publishedCustomerNotes.length>0?$.publishedCustomerNotes.map(H=>`
  <div class="customer-note" style="margin-bottom:10px">
    <div class="customer-note-title">💬 Customer Note</div>
    <div class="customer-note-content">${H.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${ti(H.publishedAt)} by ${H.publishedBy}
    </div>
  </div>
  `).join(""):""}
  ${$.customerNote?`
  <div class="customer-note" style="opacity:0.7">
    <div class="customer-note-title">📝 Draft Customer Note (unpublished)</div>
    <div class="customer-note-content">${$.customerNote}</div>
  </div>
  `:""}
  <div class="crew-comment-section">
    <div class="crew-comment-label">💭 Crew Feedback / Survey Comments:</div>
    <textarea class="crew-comment-input task-comment" data-task-id="other_${$.key}" placeholder="Add your comments, observations, issues, or suggestions about this task..."></textarea>
  </div>
</div>
`).join("")}
</div>
  </div>
</div>
`:""}

${W.length===0&&E.length===0&&z.length===0&&V.length===0?`
<div class="no-services">
  <div style="font-size:24px;margin-bottom:10px">📋</div>
  <div>No services selected for this quote</div>
</div>
`:""}

<!-- COMPLETION CHECKLIST -->
<div class="collapsible-section completion-section">
  <div class="section-header" onclick="toggleSection('completion-checklist')">
    <div class="section-header-title">
      ✅ COMPLETION CHECKLIST
    </div>
    <div class="section-toggle-btn" id="toggle-completion-checklist">+</div>
  </div>
  <div class="section-content" id="content-completion-checklist">

<div class="important-box" style="background:#e8f5e9;border-color:#2e7d32">
  <div class="checklist-grid" style="margin:10px 0">
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_services_complete">
        <label class="checklist-label">All services completed per specs</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_services_complete" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_site_cleaned">
        <label class="checklist-label">Site cleaned, debris removed</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_site_cleaned" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_walkthrough">
        <label class="checklist-label">Customer walkthrough completed</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_walkthrough" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_issues_documented">
        <label class="checklist-label">Issues or concerns documented</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_issues_documented" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_photos">
        <label class="checklist-label">Photos taken of completed work</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_photos" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_signature">
        <label class="checklist-label">Customer signature obtained</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_signature" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_materials">
        <label class="checklist-label">Materials inventory updated</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_materials" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_timesheets">
        <label class="checklist-label">Time sheets submitted</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_timesheets" placeholder="Notes..."></textarea>
      </div>
    </div>
  </div>
</div>

  </div>
</div>

<div style="margin-top:40px;padding-top:30px;border-top:3px solid #dee2e6;text-align:center;color:#666">
  <div style="font-size:18px;font-weight:700;margin-bottom:8px">${Ke.name}</div>
  <div style="font-size:14px">${Ke.address}</div>
  <div style="font-size:14px">Phone: ${Ke.phone}</div>
  <div style="font-size:12px;margin-top:15px;font-style:italic">This is an internal crew document - Not for customer distribution</div>
</div>

<script>
// Crew Work Order Checklist Manager with Comments
(function() {
  const quoteId = '${k}';
  const storageKey = 'crew_checklist_' + quoteId;
  const commentsKey = 'crew_comments_' + quoteId;
  const publishedKey = 'crew_published_' + quoteId;

  // Toggle section expand/collapse
  window.toggleSection = function(sectionId) {
    const content = document.getElementById('content-' + sectionId);
    const toggle = document.getElementById('toggle-' + sectionId);

    if (content.classList.contains('expanded')) {
      content.classList.remove('expanded');
      toggle.textContent = '+';
    } else {
      content.classList.add('expanded');
      toggle.textContent = '−';
    }
  };

  // Load saved checkbox states from localStorage
  function loadChecklistState() {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  }

  // Save checkbox state to localStorage
  function saveChecklistState(checklistState) {
    localStorage.setItem(storageKey, JSON.stringify(checklistState));
  }

  // Load saved comments from localStorage
  function loadCommentsState() {
    const saved = localStorage.getItem(commentsKey);
    return saved ? JSON.parse(saved) : {};
  }

  // Save comments state to localStorage
  function saveCommentsState(commentsState) {
    localStorage.setItem(commentsKey, JSON.stringify(commentsState));
  }

  // Load published notes from localStorage
  function loadPublishedNotes() {
    const saved = localStorage.getItem(publishedKey);
    return saved ? JSON.parse(saved) : {};
  }

  // Save published notes to localStorage
  function savePublishedNotes(publishedNotes) {
    localStorage.setItem(publishedKey, JSON.stringify(publishedNotes));
  }

  // Format a timestamp for display
  function formatTimestamp(isoString) {
    const d = new Date(isoString);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    var minStr = minutes < 10 ? '0' + minutes : '' + minutes;
    return month + '/' + day + '/' + year + ' at ' + hours + ':' + minStr + ' ' + ampm;
  }

  // Render published notes for a task into its container
  function renderPublishedNotes(taskId, publishedNotes) {
    var container = document.querySelector('.published-notes-list[data-task-id="' + taskId + '"]');
    if (!container) return;
    var notes = publishedNotes[taskId] || [];
    if (notes.length === 0) { container.innerHTML = ''; return; }
    container.innerHTML = notes.map(function(note, idx) {
      var imagesHtml = '';
      if (note.images && note.images.length > 0) {
        imagesHtml = '<div class="published-note-images">' +
          note.images.map(function(src) {
            return '<img src="' + src + '" onclick="showLightbox(this.src)" title="Click to enlarge">';
          }).join('') + '</div>';
      }
      var textHtml = note.text ? '<div class="note-text">' + note.text.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>' : '';
      return '<div class="published-note-item">' +
        textHtml + imagesHtml +
        '<div class="note-timestamp">Published: ' + formatTimestamp(note.publishedAt) + '</div>' +
        '<button class="delete-note-btn" data-task-id="' + taskId + '" data-note-idx="' + idx + '" title="Delete note">&times;</button>' +
      '</div>';
    }).join('');
  }

  // Compress and resize an image file, returns a promise with base64 data URL
  function compressImage(file, maxDim, quality) {
    maxDim = maxDim || 800;
    quality = quality || 0.6;
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
          var w = img.width, h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
            else { w = Math.round(w * maxDim / h); h = maxDim; }
          }
          var canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Lightbox for full-size image viewing
  window.showLightbox = function(src) {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<img src="' + src + '">';
    overlay.addEventListener('click', function() { overlay.remove(); });
    document.body.appendChild(overlay);
  };

  // Staged images per task (not yet published)
  var stagedImages = {};

  // Update progress bar based on completion percentage
  function updateProgressBar() {
    const allCheckboxes = document.querySelectorAll('.task-checkbox');
    const checkedCheckboxes = document.querySelectorAll('.task-checkbox:checked');
    const total = allCheckboxes.length;
    const completed = checkedCheckboxes.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    if (progressBar && progressText) {
      progressBar.style.width = percentage + '%';
      progressText.textContent = percentage + '% Complete (' + completed + '/' + total + ' tasks)';
    }
  }

  // Toggle service card completed styling
  function updateServiceCardStyle(checkbox) {
    const serviceCard = checkbox.closest('.service-card');
    if (serviceCard) {
      if (checkbox.checked) {
        serviceCard.classList.add('completed');
      } else {
        serviceCard.classList.remove('completed');
      }
    }
  }

  // Toggle checklist item styling
  function updateChecklistItemStyle(checkbox) {
    const checklistItem = checkbox.closest('.checklist-item');
    if (checklistItem) {
      if (checkbox.checked) {
        checklistItem.classList.add('checked');
      } else {
        checklistItem.classList.remove('checked');
      }
    }
  }

  // Initialize the checklist on page load
  function init() {
    const checklistState = loadChecklistState();
    const commentsState = loadCommentsState();
    const publishedNotes = loadPublishedNotes();
    const allCheckboxes = document.querySelectorAll('.task-checkbox');
    const allComments = document.querySelectorAll('.task-comment');

    // Restore saved checkbox states
    allCheckboxes.forEach(checkbox => {
      const taskId = checkbox.dataset.taskId;
      if (checklistState[taskId]) {
        checkbox.checked = true;
        updateServiceCardStyle(checkbox);
        updateChecklistItemStyle(checkbox);
      }

      // Add change event listener
      checkbox.addEventListener('change', function() {
        checklistState[this.dataset.taskId] = this.checked;
        saveChecklistState(checklistState);
        updateProgressBar();
        updateServiceCardStyle(this);
        updateChecklistItemStyle(this);
      });
    });

    // Wrap each textarea with publish button and published notes container
    allComments.forEach(commentField => {
      const taskId = commentField.dataset.taskId;
      const parent = commentField.parentNode;

      // Create comment-row wrapper
      var row = document.createElement('div');
      row.className = 'comment-row';
      parent.insertBefore(row, commentField);
      row.appendChild(commentField);

      // Add camera button (opens camera on mobile, file picker on desktop)
      var cameraBtn = document.createElement('button');
      cameraBtn.className = 'camera-btn';
      cameraBtn.setAttribute('title', 'Take photo or upload image');
      cameraBtn.innerHTML = '&#128247;';
      row.appendChild(cameraBtn);

      // Hidden file input - accepts images, capture opens camera on mobile
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.setAttribute('capture', 'environment');
      fileInput.multiple = true;
      fileInput.style.display = 'none';
      row.appendChild(fileInput);

      // Add publish button
      var publishBtn = document.createElement('button');
      publishBtn.className = 'publish-btn';
      publishBtn.setAttribute('data-task-id', taskId);
      publishBtn.textContent = 'Publish';
      row.appendChild(publishBtn);

      // Image staging area (thumbnails before publishing)
      var stagingArea = document.createElement('div');
      stagingArea.className = 'image-staging';
      stagingArea.setAttribute('data-task-id', taskId);

      // Add published notes container after the row
      var notesContainer = document.createElement('div');
      notesContainer.className = 'published-notes-list';
      notesContainer.setAttribute('data-task-id', taskId);
      // Insert staging then notes after the row
      row.parentNode.insertBefore(stagingArea, row.nextSibling);
      row.parentNode.insertBefore(notesContainer, stagingArea.nextSibling);

      // Initialize staged images array for this task
      if (!stagedImages[taskId]) stagedImages[taskId] = [];

      // Helper: render staged thumbnails
      function renderStaged() {
        stagingArea.innerHTML = stagedImages[taskId].map(function(src, i) {
          return '<div class="staged-thumb">' +
            '<img src="' + src + '" onclick="showLightbox(this.src)">' +
            '<button class="remove-staged" data-task-id="' + taskId + '" data-idx="' + i + '">&times;</button>' +
          '</div>';
        }).join('');
      }

      // Helper: process files (compress and stage)
      function processFiles(files) {
        Array.from(files).forEach(function(file) {
          if (!file.type.startsWith('image/')) return;
          compressImage(file, 800, 0.6).then(function(dataUrl) {
            stagedImages[taskId].push(dataUrl);
            renderStaged();
          });
        });
      }

      // Camera button click → trigger file input
      cameraBtn.addEventListener('click', function() { fileInput.click(); });

      // File input change
      fileInput.addEventListener('change', function() {
        if (this.files.length > 0) processFiles(this.files);
        this.value = '';
      });

      // Drag and drop on textarea
      commentField.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
      });
      commentField.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
      });
      commentField.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) processFiles(e.dataTransfer.files);
      });

      // Remove staged image (delegated from staging area)
      stagingArea.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-staged')) {
          var idx = parseInt(e.target.getAttribute('data-idx'), 10);
          stagedImages[taskId].splice(idx, 1);
          renderStaged();
        }
      });

      // Render existing published notes
      renderPublishedNotes(taskId, publishedNotes);

      // Restore saved draft comment
      if (commentsState[taskId]) {
        commentField.value = commentsState[taskId];
        commentField.classList.add('has-content');
      }

      // Expand on focus
      commentField.addEventListener('focus', function() {
        this.style.height = '70px';
        this.style.resize = 'vertical';
      });

      // Collapse on blur if empty
      commentField.addEventListener('blur', function() {
        commentsState[this.dataset.taskId] = this.value;
        saveCommentsState(commentsState);
        this.style.resize = 'none';
        if (this.value.trim()) {
          this.classList.add('has-content');
          this.style.height = '44px';
        } else {
          this.classList.remove('has-content');
          this.style.height = '28px';
        }
      });

      // Save as they type
      commentField.addEventListener('input', function() {
        commentsState[this.dataset.taskId] = this.value;
        saveCommentsState(commentsState);
      });

      // Publish button click
      publishBtn.addEventListener('click', function() {
        var textarea = row.querySelector('.task-comment');
        var text = textarea.value.trim();
        var images = stagedImages[taskId] || [];
        if (!text && images.length === 0) return;
        if (!publishedNotes[taskId]) publishedNotes[taskId] = [];
        publishedNotes[taskId].push({
          text: text,
          images: images.length > 0 ? images.slice() : [],
          publishedAt: new Date().toISOString()
        });
        savePublishedNotes(publishedNotes);
        renderPublishedNotes(taskId, publishedNotes);
        // Clear the textarea and staged images after publishing
        textarea.value = '';
        textarea.classList.remove('has-content');
        textarea.style.height = '28px';
        commentsState[taskId] = '';
        saveCommentsState(commentsState);
        stagedImages[taskId] = [];
        renderStaged();
      });
    });

    // Delete published note handler (delegated)
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-note-btn')) {
        var taskId = e.target.getAttribute('data-task-id');
        var idx = parseInt(e.target.getAttribute('data-note-idx'), 10);
        if (publishedNotes[taskId] && publishedNotes[taskId][idx] !== undefined) {
          publishedNotes[taskId].splice(idx, 1);
          savePublishedNotes(publishedNotes);
          renderPublishedNotes(taskId, publishedNotes);
        }
      }
    });

    // Make checklist labels clickable
    document.querySelectorAll('.checklist-label').forEach(label => {
      label.addEventListener('click', function() {
        const checkbox = this.parentElement.querySelector('.checklist-checkbox');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });
    });

    // Initial progress bar update
    updateProgressBar();
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
<\/script>

</body></html>`},Nf=(l,u,h,S)=>{const j=rt.formatDate(),k=rt.getQuoteNum(l),L=(I,v)=>{var ne,ye;const re=((ne=h.svc.find(ve=>ve.key===I))==null?void 0:ne.cost)||0,O=((ye=l.scrubbCosts)==null?void 0:ye[I])||0,te=O>0?re-O:0,ze=O===0?"Pending":te>0?"Under Budget":te<0?"Over Budget":"On Budget";return{key:I,name:v,contractPrice:re,actualCost:O,variance:te,status:ze,hasActual:O>0}},T=Object.entries(l.selectedServices||{}).filter(([I,v])=>v&&It.includes(I)).map(([I])=>{var v;return L(I,((v=S[I])==null?void 0:v.name)||I)});l.sewerType&&l.sewerType!=="none"&&T.push(L("sewer",`Sewer System (${l.sewerType.replace("_"," ")})`)),parseFloat(l.wellDepth)>0&&T.push(L("well",`Well Drilling (${l.wellDepth} ft)`));const W=T.reduce((I,v)=>I+v.contractPrice,0),E=T.reduce((I,v)=>I+v.actualCost,0),z=T.filter(I=>I.hasActual).length,V=T.length,F=l.changeOrderHistory||[],J=F.length>0?(F[0].contingencyUsed||0)+(F[0].contingencyBalance||0):h.contingency,Y=F.reduce((I,v)=>I+(v.contingencyUsed||0),0),oe=T.filter(I=>I.variance>0).reduce((I,v)=>I+v.variance,0),ee=T.filter(I=>I.variance<0).reduce((I,v)=>I+Math.abs(v.variance),0),$=(l.scrubbPayments||[]).filter(I=>I.isContingencyPayment).reduce((I,v)=>I+parseFloat(v.amount||0),0),H=J-Y+oe-ee+$;return`<!DOCTYPE html><html><head><title>Allowance Progress Update - ${u.firstName} ${u.lastName}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;max-width:900px;margin:0 auto;color:#333;line-height:1.6}
.header{border-bottom:4px solid #1565c0;padding-bottom:20px;margin-bottom:30px;display:flex;justify-content:space-between;align-items:flex-start}
.title{font-size:32px;font-weight:800;color:#1565c0;margin:0}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px}
.info-box{background:#f8f9fa;padding:15px;border-radius:8px}
.progress-bar{background:#e0e0e0;height:30px;border-radius:15px;overflow:hidden;margin:20px 0}
.progress-fill{background:linear-gradient(90deg,#1565c0,#42a5f5);height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}
.section-title{font-size:20px;font-weight:700;color:#2c5530;margin:30px 0 15px;border-bottom:2px solid#2c5530;padding-bottom:8px}
.allowance-table{width:100%;border-collapse:collapse;margin:20px 0}
.allowance-table th{background:#2c5530;color:#fff;padding:12px;text-align:left;font-size:13px}
.allowance-table td{padding:12px;border-bottom:1px solid #e0e0e0;font-size:14px}
.status-badge{padding:4px 12px;border-radius:12px;font-size:11px;font-weight:700;text-transform:uppercase}
.status-pending{background:#e0e0e0;color:#666}
.status-under{background:#d1e7dd;color:#0a5a2a}
.status-over{background:#f8d7da;color:#721c24}
.status-on{background:#cfe2ff;color:#084298}
.fund-box{background:#e3f2fd;padding:20px;border-radius:8px;border:2px solid #1565c0;margin:20px 0}
.fund-row{display:flex;justify-content:space-between;padding:8px 0;font-size:16px}
.fund-total{font-size:24px;font-weight:800;border-top:3px solid #1565c0;margin-top:12px;padding-top:12px}
</style></head><body>

<div class="header">
  <div>
    <div class="title">Allowance Progress Update</div>
    <div style="font-size:16px;color:#666;margin-top:8px">Quote #${k}</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:18px;font-weight:700;color:#2c5530">${Ke.name}</div>
    <div style="font-size:13px;color:#666">${j}</div>
  </div>
</div>

<div class="info-grid">
  <div class="info-box">
    <div style="font-weight:700;margin-bottom:8px">Customer</div>
    <div>${u.firstName} ${u.lastName}</div>
    <div style="font-size:13px;color:#666">${Ui(u.phone)}</div>
  </div>
  <div class="info-box">
    <div style="font-weight:700;margin-bottom:8px">Project Address</div>
    <div>${u.siteAddress}</div>
    <div>${u.siteCity}, ${u.siteState} ${u.siteZip}</div>
  </div>
</div>

<div class="section-title">Project Progress</div>
<div style="background:#fff;padding:20px;border-radius:8px;border:1px solid #e0e0e0">
  <div style="display:flex;justify-content:space-between;margin-bottom:12px">
    <span style="font-size:14px;color:#666">Allowance Items Completed</span>
    <span style="font-size:18px;font-weight:700;color:#1565c0">${z} of ${V}</span>
  </div>
  <div class="progress-bar">
    <div class="progress-fill" style="width:${V>0?(z/V*100).toFixed(0):0}%">
      ${V>0?(z/V*100).toFixed(0):0}%
    </div>
  </div>
</div>

<div class="section-title">Allowance Items Detail</div>
<table class="allowance-table">
  <thead>
    <tr>
      <th>Item</th>
      <th style="text-align:right">Estimated</th>
      <th style="text-align:right">Actual</th>
      <th style="text-align:right">Difference</th>
      <th style="text-align:center">Status</th>
    </tr>
  </thead>
  <tbody>
    ${T.map(I=>`
      <tr>
        <td><strong>${I.name}</strong></td>
        <td style="text-align:right">${D(I.contractPrice)}</td>
        <td style="text-align:right">${I.hasActual?D(I.actualCost):'<em style="color:#999">Pending</em>'}</td>
        <td style="text-align:right;font-weight:700;color:${I.variance>0?"#28a745":I.variance<0?"#dc3545":"#666"}">
          ${I.hasActual?(I.variance>=0?"+":"")+D(I.variance):"--"}
        </td>
        <td style="text-align:center">
          <span class="status-badge ${I.status==="Pending"?"status-pending":I.status==="Under Budget"?"status-under":I.status==="Over Budget"?"status-over":"status-on"}">
            ${I.status}
          </span>
        </td>
      </tr>
    `).join("")}
    <tr style="background:#f8f9fa">
      <td><strong>TOTAL</strong></td>
      <td style="text-align:right;font-weight:700">${D(W)}</td>
      <td style="text-align:right;font-weight:700">${D(E)}</td>
      <td style="text-align:right;font-weight:800;font-size:16px;color:${oe-ee>=0?"#28a745":"#dc3545"}">
        ${oe-ee>=0?"+":""}${D(oe-ee)}
      </td>
      <td></td>
    </tr>
  </tbody>
</table>

<div class="section-title">Contingency Fund Status</div>
<div class="fund-box">
  <div class="fund-row">
    <span>Starting Contingency Fund:</span>
    <span style="font-weight:700">${D(J)}</span>
  </div>
  ${Y>0?`<div class="fund-row">
    <span>Change Order Draws:</span>
    <span style="font-weight:700;color:#dc3545">-${D(Y)}</span>
  </div>`:""}
  <div class="fund-row">
    <span>Allowance Savings (added to fund):</span>
    <span style="font-weight:700;color:#28a745">+${D(oe)}</span>
  </div>
  <div class="fund-row">
    <span>Allowance Overages (drawn from fund):</span>
    <span style="font-weight:700;color:#dc3545">-${D(ee)}</span>
  </div>
  ${$>0?`<div class="fund-row">
    <span>Customer Payments (refunding fund):</span>
    <span style="font-weight:700;color:#28a745">+${D($)}</span>
  </div>`:""}
  <div class="fund-row fund-total">
    <span>Current Contingency Balance:</span>
    <span style="color:${H>0?"#28a745":"#dc3545"}">${D(H)}</span>
  </div>
</div>

${(()=>{const I=l.scrubbPayments||[];if(I.length===0)return"";const v=I.filter(ne=>ne.isContingencyPayment),re=I.filter(ne=>!ne.isContingencyPayment),O=v.reduce((ne,ye)=>ne+parseFloat(ye.amount||0),0),te=re.reduce((ne,ye)=>ne+parseFloat(ye.amount||0),0),ze=O+te;return`
<div class="section-title">Payment Breakdown</div>
<div style="background:#fff;padding:20px;border-radius:8px;border:1px solid #e0e0e0;margin:20px 0">
  <table style="width:100%;border-collapse:collapse">
    <thead>
      <tr style="background:#f8f9fa">
        <th style="padding:12px;text-align:left;border-bottom:2px solid #e0e0e0">Date</th>
        <th style="padding:12px;text-align:left;border-bottom:2px solid #e0e0e0">Type</th>
        <th style="padding:12px;text-align:right;border-bottom:2px solid #e0e0e0">Amount</th>
        <th style="padding:12px;text-align:left;border-bottom:2px solid #e0e0e0">Notes</th>
      </tr>
    </thead>
    <tbody>
      ${I.sort((ne,ye)=>new Date(ne.date)-new Date(ye.date)).map(ne=>{const ye=ne.date?new Date(ne.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"N/A",ve=ne.isContingencyPayment;return`
        <tr>
          <td style="padding:12px;border-bottom:1px solid #e0e0e0">${ye}</td>
          <td style="padding:12px;border-bottom:1px solid #e0e0e0">
            <span style="background:${ve?"#fff3e0":"#e3f2fd"};color:${ve?"#ff9800":"#1565c0"};padding:4px 8px;border-radius:4px;font-size:11px;font-weight:700">
              ${ve?"Contingency Fund":"Regular Payment"}
            </span>
          </td>
          <td style="padding:12px;border-bottom:1px solid #e0e0e0;text-align:right;font-weight:700">${D(ne.amount)}</td>
          <td style="padding:12px;border-bottom:1px solid #e0e0e0;font-size:13px;color:#666">${ne.notes||"--"}</td>
        </tr>
        `}).join("")}
    </tbody>
    <tfoot>
      <tr style="background:#f8f9fa;font-weight:700">
        <td colspan="2" style="padding:12px;border-top:2px solid #e0e0e0">TOTAL PAYMENTS</td>
        <td style="padding:12px;border-top:2px solid #e0e0e0;text-align:right;font-size:18px;color:#1565c0">${D(ze)}</td>
        <td style="padding:12px;border-top:2px solid #e0e0e0"></td>
      </tr>
    </tfoot>
  </table>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:20px">
    <div style="background:#e3f2fd;padding:15px;border-radius:6px">
      <div style="font-size:12px;color:#666;margin-bottom:4px">Regular Payments</div>
      <div style="font-size:20px;font-weight:700;color:#1565c0">${D(te)}</div>
      <div style="font-size:11px;color:#666;margin-top:4px">${re.length} payment${re.length!==1?"s":""}</div>
    </div>
    <div style="background:#fff3e0;padding:15px;border-radius:6px">
      <div style="font-size:12px;color:#666;margin-bottom:4px">Contingency Fund Payments</div>
      <div style="font-size:20px;font-weight:700;color:#ff9800">${D(O)}</div>
      <div style="font-size:11px;color:#666;margin-top:4px">${v.length} payment${v.length!==1?"s":""}</div>
    </div>
  </div>

  ${H<0?`
  <div style="background:#fff3cd;border:1px solid #ffc107;padding:12px;border-radius:6px;margin-top:15px">
    <div style="font-size:13px;font-weight:700;color:#856404;margin-bottom:8px">💰 Contingency Fund Balance After Payments</div>
    <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px">
      <span>Amount Exceeded:</span>
      <span style="font-weight:700;color:#dc3545">${D(Math.max(0,ee-(J+oe)))}</span>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px">
      <span>Contingency Payments Applied:</span>
      <span style="font-weight:700;color:#28a745">-${D(O)}</span>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;padding-top:8px;border-top:2px solid #ffc107;margin-top:8px">
      <span>Remaining Balance Owed:</span>
      <span style="color:${Math.max(0,ee-(J+oe))-O>0?"#dc3545":"#28a745"}">
        ${D(Math.max(0,Math.max(0,ee-(J+oe))-O))}
      </span>
    </div>
  </div>
  `:""}
</div>
`})()}

<div style="background:#fff3cd;border:2px solid #ffc107;padding:15px;border-radius:8px;margin:20px 0">
  <strong>What This Means:</strong>
  <ul style="margin:8px 0 0 20px;line-height:1.8">
    <li>Items marked "Under Budget" save money that goes into your contingency fund</li>
    <li>Items marked "Over Budget" draw from your contingency fund first</li>
    <li>The contingency fund protects you from unexpected costs</li>
    <li>At project completion, any remaining contingency balance is returned to you</li>
  </ul>
</div>

<div style="margin-top:40px;padding:20px;background:#f8f9fa;border-radius:8px;font-size:12px;color:#666">
  <p style="margin-bottom:8px"><strong>Questions or Concerns?</strong></p>
  <p style="margin:0">Please contact ${Ke.name} at ${Ke.phone} if you have any questions about this update or your project's progress.</p>
</div>

</body></html>`},$f=(l,u,h,S,j)=>{var ve;const k=h||Pn,L=rt.formatDate(),T=rt.getQuoteNum(l),W=S||{},E=j||{},z=Object.keys(W).length>0||Object.keys(E).length>0,V=iu(l,k),F=ce=>ru(ce,l,k,V),J=Object.entries(l.selectedServices||{}).filter(([ce,Ae])=>Ae&&sn.includes(ce)).map(([ce])=>F(ce)),Y=Object.entries(l.selectedServices||{}).filter(([ce,Ae])=>Ae&&!sn.includes(ce)&&!Vn.includes(ce)).map(([ce])=>F(ce)),oe=Object.entries(l.selectedServices||{}).filter(([ce,Ae])=>Ae&&Vn.includes(ce)).map(([ce])=>F(ce)),ee=ua(l,V),R=su(l.foundationType),$=ce=>W[ce]?'<span style="color:#2e7d32;font-weight:700">&#10004;</span>':'<span style="color:#c62828;font-weight:700">&#10008;</span>',H=ce=>{const Ae=E[ce];return Ae?`<div style="background:#f3e5f5;border-left:4px solid #6a1b9a;padding:10px 12px;border-radius:4px;margin-top:6px;font-size:13px;white-space:pre-wrap">${Ae}</div>`:""},I=(ce,Ae,Ne)=>Ae.length===0?"":`
    <div style="margin-bottom:30px">
      <div style="font-size:18px;font-weight:800;color:#283593;margin-bottom:12px;border-bottom:2px solid #c5cae9;padding-bottom:6px">${ce}</div>
      ${Ae.map(A=>`
      <div style="background:#fff;border:2px solid #dee2e6;border-radius:8px;padding:16px;margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div style="font-size:16px;font-weight:700;color:#2c5530">${$(Ne+"_"+A.key)} ${A.name}</div>
          <div style="font-size:15px;font-weight:700;color:#283593">${Me(A.cost)}</div>
        </div>
        ${A.description?`<div style="font-size:13px;color:#666;font-style:italic;margin-bottom:8px">${A.description}</div>`:""}
        ${A.quantity||A.days?`<div style="display:flex;gap:15px;font-size:13px;margin-bottom:8px">${A.quantity?`<span style="background:#e8eaf6;padding:4px 10px;border-radius:4px">Qty: ${A.quantity}</span>`:""}${A.days?`<span style="background:#e8eaf6;padding:4px 10px;border-radius:4px">Days: ${A.days}</span>`:""}</div>`:""}
        ${A.publishedCrewNotes.length>0?A.publishedCrewNotes.map(pe=>`
        <div style="background:#fff3e0;border-left:4px solid #ff6b35;padding:10px 12px;border-radius:4px;margin-top:6px">
          <div style="font-size:12px;font-weight:700;color:#e65100;margin-bottom:4px">Crew Instructions</div>
          <div style="font-size:13px;white-space:pre-wrap">${pe.text}</div>
          <div style="font-size:11px;color:#999;margin-top:4px;font-style:italic">— ${pe.publishedBy}, ${ti(pe.publishedAt)}</div>
        </div>`).join(""):""}
        ${A.publishedCustomerNotes&&A.publishedCustomerNotes.length>0?A.publishedCustomerNotes.map(pe=>`
        <div style="background:#e3f2fd;border-left:4px solid #1565c0;padding:10px 12px;border-radius:4px;margin-top:6px">
          <div style="font-size:12px;font-weight:700;color:#1565c0;margin-bottom:4px">Customer Note</div>
          <div style="font-size:13px;white-space:pre-wrap">${pe.text}</div>
          <div style="font-size:11px;color:#999;margin-top:4px;font-style:italic">— ${pe.publishedBy}, ${ti(pe.publishedAt)}</div>
        </div>`).join(""):""}
        ${H(Ne+"_"+A.key)}
        ${E[Ne+"_"+A.key]?"":'<div style="color:#999;font-style:italic;font-size:12px;margin-top:6px">No crew feedback submitted</div>'}
      </div>
      `).join("")}
    </div>`,v=[{title:"Documentation and Compliance",items:[{id:"delivery_hud_data_plate",label:"Verify the HUD data plate is present"},{id:"delivery_hud_cert",label:"Confirm the HUD certification label"},{id:"delivery_manufacturer_install",label:"Check for manufacturer's installation instructions"},{id:"delivery_warranties",label:"Review warranties, manuals for appliances"},{id:"delivery_rivet_badge",label:"Rivet Install Badge and White # on home"}]},{title:"Exterior Inspection",items:[{id:"delivery_siding",label:"Examine siding for breaks, dents, damage"},{id:"delivery_roof",label:"Inspect the roof for leaks, missing shingles, damage"},{id:"delivery_windows",label:"Check windows for breaks, proper operation"},{id:"delivery_trim",label:"Inspect trim, porches, decks, and exterior fixtures"},{id:"delivery_transit_damage",label:"Check for transit damage"},{id:"delivery_gas_line",label:"Gas Line Location"},{id:"delivery_electric_stub",label:"Electric stub - How many Ft."},{id:"delivery_water_line",label:"Water Line - How many ft for hookup"},{id:"delivery_sewer_line",label:"Sewer line location - How many Ft."}]},{title:"Interior Inspection",items:[{id:"delivery_drywall",label:"Check drywall/walls for excessive damage"},{id:"delivery_ceilings",label:"Inspect ceilings for sags, stains, or damage"},{id:"delivery_floors",label:"Examine floors for levelness, soft spots"},{id:"delivery_cabinets",label:"Verify cabinets, countertops, and fixtures"},{id:"delivery_insulation",label:"Check insulation in walls, floors, ceilings"}]},{title:"Appliances and Equipment",items:[{id:"delivery_appliances",label:"Check appliances (fridge, stove, dishwasher)"},{id:"delivery_equipment",label:"Ensure all installed equipment (HVAC) is functional"}]},{title:"Material List Verification",items:[{id:"delivery_door_jam",label:"Door Jam Board"},{id:"delivery_door_casement",label:"Door Casement"},{id:"delivery_door_stops",label:"Door Stops"},{id:"delivery_screen_door",label:"Screen Door"},{id:"delivery_vinyl_floor",label:"Vinyl Floor Coverings"},{id:"delivery_sewer_pipe",label:"Sewer Pipe (ft)"},{id:"delivery_beam_trim",label:"Beam Trim"},{id:"delivery_siding_material",label:"Siding"},{id:"delivery_siding_starter",label:"Siding Starter"},{id:"delivery_facia",label:"Facia"},{id:"delivery_roof_facia",label:"Roof Facia"},{id:"delivery_soffits",label:"Soffits"},{id:"delivery_j_channel",label:"J-channel"},{id:"delivery_paint",label:"Paint"}]},{title:"Final Steps",items:[{id:"delivery_pictures",label:"Take many pictures and attach to document"},{id:"delivery_clean_floors",label:"Clean all floors and lay floor coverings to protect"}]}],re=[{id:"checklist_services_complete",label:"All services completed per specifications"},{id:"checklist_site_cleaned",label:"Site cleaned and debris removed"},{id:"checklist_walkthrough",label:"Customer walkthrough completed"},{id:"checklist_issues_documented",label:"Any issues or concerns documented"},{id:"checklist_photos",label:"Photos taken of completed work"},{id:"checklist_signature",label:"Customer signature obtained (if required)"},{id:"checklist_materials",label:"Materials inventory updated"},{id:"checklist_timesheets",label:"Time sheets submitted"}],O=re.filter(ce=>W[ce.id]).length,te=v.flatMap(ce=>ce.items.map(Ae=>Ae.id)),ze=te.filter(ce=>W[ce]).length,ye=(l.changeOrderHistory||[]).filter(ce=>!ce.isReversal);return`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Job Summary - ${(u==null?void 0:u.firstName)||"Customer"} ${(u==null?void 0:u.lastName)||""} - #${T}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:1000px;margin:0 auto;color:#222;line-height:1.6;background:#fafafa}
.header{background:linear-gradient(135deg,#283593 0%,#3949ab 100%);color:#fff;padding:30px;border-radius:10px;margin-bottom:30px;box-shadow:0 4px 12px rgba(0,0,0,0.15);display:flex;justify-content:space-between;align-items:center}
.header-left{display:flex;align-items:center;gap:20px}
.title{font-size:32px;font-weight:900;letter-spacing:-0.5px}
.subtitle{font-size:14px;margin-top:4px;opacity:0.9}
.header-right{text-align:right;font-size:14px;opacity:0.9}
.section{background:#fff;border-radius:8px;padding:24px;margin-bottom:20px;box-shadow:0 2px 6px rgba(0,0,0,0.06)}
.section-title{font-size:20px;font-weight:800;color:#283593;margin:0 0 16px;border-bottom:3px solid #c5cae9;padding-bottom:8px}
.info-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.info-box{background:#e8eaf6;padding:14px;border-radius:6px;border-left:4px solid #283593}
.info-label{font-weight:700;color:#283593;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px}
.info-value{font-size:14px;color:#333}
.cost-table{width:100%;border-collapse:collapse}
.cost-table td{padding:10px 14px;font-size:14px}
.cost-table tr{border-bottom:1px solid #eee}
.cost-table .label{font-weight:600;color:#333}
.cost-table .amount{text-align:right;font-weight:600}
.cost-table .total-row{border-top:3px solid #283593}
.cost-table .total-row td{font-size:18px;font-weight:800;color:#283593;padding-top:14px}
.checklist-row{display:flex;align-items:flex-start;gap:10px;padding:8px 12px;border-radius:4px;margin-bottom:4px}
.checklist-row:nth-child(odd){background:#f5f5f5}
.no-data-notice{background:#fff3cd;border:2px solid #ffc107;border-radius:8px;padding:20px;text-align:center;margin-bottom:20px}
.co-card{background:#fff;border:2px solid #ff6b35;border-radius:8px;padding:16px;margin-bottom:12px}
@media print{body{padding:15px;background:#fff}.section{box-shadow:none;border:1px solid #ddd;page-break-inside:avoid}.header{box-shadow:none}}
</style></head><body>

<div class="header">
  <div class="header-left">
    <img src="${Ke.logoUrl}" style="height:45px" alt="${Ke.name} Logo">
    <div>
      <div class="title">JOB SUMMARY REPORT</div>
      <div class="subtitle">Complete Project Overview — Internal Document</div>
    </div>
  </div>
  <div class="header-right">
    <div><strong>Quote #:</strong> ${T}</div>
    <div><strong>Status:</strong> ${l.status||"N/A"}</div>
    <div><strong>Generated:</strong> ${L}</div>
  </div>
</div>

${z?"":`
<div class="no-data-notice">
  <div style="font-weight:700;color:#856404;font-size:16px;margin-bottom:8px">No Crew Feedback Data Available</div>
  <div style="color:#856404;font-size:14px">Crew checklist and feedback data is stored locally on the device where the Crew Work Order was completed. If the crew used a different device, their feedback will not appear here.</div>
</div>
`}

<!-- CUSTOMER INFO -->
<div class="section">
  <div class="section-title">Customer Information</div>
  <div class="info-grid">
    <div class="info-box">
      <div class="info-label">Customer</div>
      <div class="info-value">${(u==null?void 0:u.firstName)||""} ${(u==null?void 0:u.lastName)||""}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Phone</div>
      <div class="info-value">${Ui(u==null?void 0:u.phone)||"N/A"}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Email</div>
      <div class="info-value">${(u==null?void 0:u.email)||"N/A"}</div>
    </div>
    <div class="info-box" style="grid-column:span 2">
      <div class="info-label">Site Address</div>
      <div class="info-value">${(u==null?void 0:u.siteAddress)||""} ${(u==null?void 0:u.siteCity)||""} ${(u==null?void 0:u.siteState)||""} ${(u==null?void 0:u.siteZip)||""}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Contact Person</div>
      <div class="info-value">${(u==null?void 0:u.contactPerson)||(u==null?void 0:u.firstName)||"N/A"}</div>
    </div>
    ${u!=null&&u.person2FirstName?`
    <div class="info-box">
      <div class="info-label">Second Contact</div>
      <div class="info-value">${u.person2FirstName} ${u.person2LastName||""}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Second Phone</div>
      <div class="info-value">${Ui(u.phone2)||"N/A"}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Second Email</div>
      <div class="info-value">${u.email2||"N/A"}</div>
    </div>`:""}
  </div>
</div>

<!-- PROJECT SPECS -->
<div class="section">
  <div class="section-title">Project Specifications</div>
  <div class="info-grid">
    <div class="info-box">
      <div class="info-label">Home Type</div>
      <div class="info-value">${l.singleDouble==="double"?"Double-Wide":"Single-Wide"}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Model</div>
      <div class="info-value">${l.homeModel!=="NONE"?l.homeModel:"Custom"}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Dimensions</div>
      <div class="info-value">${l.houseWidth||""}&apos; x ${l.houseLength||""}&apos;</div>
    </div>
    <div class="info-box">
      <div class="info-label">Foundation</div>
      <div class="info-value">${R}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Drive Time</div>
      <div class="info-value">${l.driveTime||0} miles</div>
    </div>
    <div class="info-box">
      <div class="info-label">Walk Doors</div>
      <div class="info-value">${l.walkDoors||"N/A"}</div>
    </div>
  </div>
</div>

<!-- SERVICES PERFORMED -->
<div class="section">
  <div class="section-title">Services Performed</div>
  ${I("Licensed Required Services",J,"install")}
  ${I("Professional Services",Y,"professional")}
  ${I("Home Spec Additions",oe,"homespec")}
  ${I("Other Services",ee,"other")}
  ${J.length===0&&Y.length===0&&oe.length===0&&ee.length===0?'<div style="text-align:center;color:#999;font-style:italic;padding:20px">No services selected for this project</div>':""}
</div>

<!-- DELIVERY & INSPECTION RESULTS -->
<div class="section">
  <div class="section-title">Delivery & Inspection Results <span style="font-size:14px;font-weight:400;color:#666">(${ze}/${te.length} checked)</span></div>
  ${v.map(ce=>`
  <div style="margin-bottom:20px">
    <div style="font-size:15px;font-weight:700;color:#1565c0;margin-bottom:8px;border-bottom:1px solid #e3f2fd;padding-bottom:4px">${ce.title}</div>
    ${ce.items.map(Ae=>`
    <div class="checklist-row">
      <div style="flex-shrink:0;width:22px;text-align:center">${$(Ae.id)}</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600">${Ae.label}</div>
        ${E[Ae.id]?`<div style="font-size:12px;color:#555;margin-top:4px;background:#f3e5f5;padding:6px 10px;border-radius:4px;border-left:3px solid #6a1b9a">${E[Ae.id]}</div>`:""}
      </div>
    </div>`).join("")}
  </div>`).join("")}
</div>

<!-- COMPLETION CHECKLIST -->
<div class="section">
  <div class="section-title">Completion Checklist <span style="font-size:14px;font-weight:400;color:${O===re.length?"#2e7d32":"#c62828"}">(${O}/${re.length} complete)</span></div>
  ${re.map(ce=>`
  <div class="checklist-row">
    <div style="flex-shrink:0;width:22px;text-align:center">${$(ce.id)}</div>
    <div style="flex:1">
      <div style="font-size:14px;font-weight:600">${ce.label}</div>
      ${E[ce.id]?`<div style="font-size:12px;color:#555;margin-top:4px;background:#f3e5f5;padding:6px 10px;border-radius:4px;border-left:3px solid #6a1b9a">${E[ce.id]}</div>`:""}
    </div>
  </div>`).join("")}
</div>

<!-- COST SUMMARY -->
<div class="section">
  <div class="section-title">Financial Summary</div>
  <table class="cost-table">
    <tbody>
      ${V.homePrice>0?`<tr><td class="label">Home</td><td class="amount">${Me(V.homePrice)}</td></tr>`:""}
      <tr><td class="label">Materials</td><td class="amount">${Me(V.matT)}</td></tr>
      <tr><td class="label">Services</td><td class="amount">${Me(V.svcT)}</td></tr>
      <tr><td class="label">Project Command</td><td class="amount">${Me(((ve=V.projCmd)==null?void 0:ve.total)||0)}</td></tr>
      <tr style="border-top:2px solid #ddd"><td class="label">Subtotal</td><td class="amount">${Me(V.sub)}</td></tr>
      <tr><td class="label">Overhead (5%)</td><td class="amount">${Me(V.oh)}</td></tr>
      <tr><td class="label">Markup (${l.markupRate!==void 0&&l.markupRate!==""?l.markupRate:"10"}%)</td><td class="amount">${Me(V.mu)}</td></tr>
      <tr style="border-top:2px solid #ddd"><td class="label">Total</td><td class="amount" style="font-weight:700">${Me(V.total)}</td></tr>
      <tr><td class="label">Contingency Fund</td><td class="amount">${Me(V.contingency)}</td></tr>
      <tr class="total-row"><td class="label">Total Investment</td><td class="amount">${Me(V.totalWithContingency)}</td></tr>
    </tbody>
  </table>
</div>

${ye.length>0?`
<!-- CHANGE ORDERS -->
<div class="section">
  <div class="section-title">Change Orders (${ye.length})</div>
  ${ye.map(ce=>`
  <div class="co-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <div style="font-size:16px;font-weight:700;color:#e65100">CO #${ce.changeOrderNum||"?"}</div>
      <div style="font-size:13px;color:#666">${ce.createdAt?ti(ce.createdAt):"N/A"} ${ce.createdBy?"by "+ce.createdBy:""}</div>
    </div>
    ${ce.contingencyUsed?'<div style="font-size:13px;margin-bottom:4px"><strong>Contingency Used:</strong> '+Me(ce.contingencyUsed)+"</div>":""}
    ${ce.contingencyBalance!==void 0?'<div style="font-size:13px;margin-bottom:4px"><strong>Contingency Balance After:</strong> '+Me(ce.contingencyBalance)+"</div>":""}
    ${ce.customerCost?'<div style="font-size:13px;margin-bottom:4px"><strong>Customer Cost:</strong> '+Me(ce.customerCost)+"</div>":""}
    ${ce.deletions&&ce.deletions.length>0?'<div style="margin-top:8px"><strong style="color:#c62828">Deletions:</strong> '+ce.deletions.map(Ae=>Ae.name||Ae).join(", ")+"</div>":""}
    ${ce.additions&&ce.additions.length>0?'<div style="margin-top:4px"><strong style="color:#2e7d32">Additions:</strong> '+ce.additions.map(Ae=>Ae.name||Ae).join(", ")+"</div>":""}
  </div>
  `).join("")}
</div>
`:""}

<!-- TIMELINE -->
<div class="section">
  <div class="section-title">Timeline</div>
  <div class="info-grid" style="grid-template-columns:1fr 1fr">
    <div class="info-box">
      <div class="info-label">Quote Created</div>
      <div class="info-value">${l.createdAt?rt.formatDate(new Date(l.createdAt)):"N/A"}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Last Updated</div>
      <div class="info-value">${l.updatedAt?rt.formatDate(new Date(l.updatedAt)):"N/A"}</div>
    </div>
  </div>
</div>

<div style="margin-top:40px;padding-top:30px;border-top:3px solid #dee2e6;text-align:center;color:#666">
  <div style="font-size:18px;font-weight:700;margin-bottom:8px">${Ke.name}</div>
  <div style="font-size:14px">${Ke.address}</div>
  <div style="font-size:14px">Phone: ${Ke.phone}</div>
  <div style="font-size:12px;margin-top:15px;font-style:italic">CONFIDENTIAL — Internal Job Summary Report</div>
</div>

</body></html>`},fa=`
  body { font-family: Arial, sans-serif; max-width: 850px; margin: 40px auto; padding: 20px 28px; color: #222; line-height: 1.6; }
  h1 { color: #2c5530; border-bottom: 3px solid #2c5530; padding-bottom: 8px; margin-bottom: 4px; }
  h2 { color: #2c5530; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 28px; }
  h3 { color: #2c5530; margin-top: 18px; margin-bottom: 6px; }
  .subtitle { color: #555; margin-top: 0; margin-bottom: 20px; }
  .blank { border-bottom: 1px solid #333; display: inline-block; min-width: 200px; }
  .filled { font-weight: 600; }
  .party-block { margin: 12px 0 16px; padding: 12px 16px; background: #f5f9f5; border-left: 4px solid #2c5530; }
  .party-block p { margin: 3px 0; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  th { background: #2c5530; color: #fff; padding: 8px 12px; text-align: left; font-size: 13px; }
  td { padding: 7px 12px; border-bottom: 1px solid #ddd; font-size: 13px; }
  blockquote { background: #fff8e1; border-left: 4px solid #f57f17; padding: 10px 14px; margin: 14px 0; font-size: 13px; }
  ul, ol { margin: 8px 0 8px 24px; padding: 0; }
  li { margin-bottom: 4px; }
  .sig-section { margin-top: 32px; border-top: 2px solid #2c5530; padding-top: 20px; }
  .sig-block { margin-bottom: 24px; }
  .sig-line { display: inline-block; border-bottom: 1px solid #333; min-width: 280px; margin-bottom: 2px; }
  .sig-label { font-size: 12px; color: #555; }
  .initial-row { margin: 12px 0; }
  .initial-box { display: inline-block; border-bottom: 1px solid #333; width: 60px; margin-right: 20px; }
  .header-bar { background: #2c5530; color: #fff; padding: 10px 16px; margin: -20px -28px 24px; }
  .header-bar h1 { color: #fff; border: none; margin: 0; padding: 0; font-size: 20px; }
  .header-bar .sub { color: #c8e6c9; font-size: 13px; margin: 2px 0 0; }
  .notice-box { background: #fff3e0; border: 1px solid #ff9800; border-radius: 4px; padding: 12px 16px; margin: 16px 0; font-size: 13px; }
  .important-notice { background: #ffebee; border: 2px solid #c62828; padding: 14px 16px; margin: 16px 0; font-weight: bold; font-size: 13px; }
  .checklist-table td:first-child { width: 85%; }
  .checklist-table td:last-child { width: 15%; text-align: center; font-size: 18px; }
  .generated-note { margin-top: 40px; padding-top: 12px; border-top: 1px solid #ddd; font-size: 11px; color: #999; }
  @media print { body { margin: 16px; } .header-bar { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
`,Us=(l,u="")=>l&&l!=="none"&&l!=="0"?`<span class="filled">${l}</span>`:`<span class="blank">${u||"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"}</span>`,pt=(l=200)=>`<span class="blank" style="min-width:${l}px">&nbsp;</span>`,Ni=l=>`<div class="sig-block"><div class="sig-line">&nbsp;</div><div class="sig-label">${l}</div></div>`,Ef=(l,u)=>{const h=rt.formatDate(),S=u?`${u.firstName||""} ${u.lastName||""}`.trim():"",j=(u==null?void 0:u.siteAddress)||"",k=u?`${u.siteCity||""}, ${u.siteState||""} ${u.siteZip||""}`.trim().replace(/^,\s*/,""):"",L=(u==null?void 0:u.phone)||"",T=(u==null?void 0:u.email)||"",W=j,E=k,z=(l==null?void 0:l.homeModel)||"";return`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Purchase & Installation Agreement — ${S||"Sherman Builders"}</title><style>${fa}</style></head><body>
<div class="header-bar"><h1>Fixed Contract Amount</h1><p class="sub">Modular / Manufactured Home Purchase &amp; Installation Agreement &mdash; ${Ke.name} &mdash; Lic. # BC532878</p></div>

<p><strong>Agreement Date:</strong> ${Us(h)}</p>

<h2 style="margin-top:8px">Parties</h2>
<div class="party-block">
  <p><strong>The Owner:</strong></p>
  <p>Name: ${Us(S)}</p>
  <p>Address: ${Us(j)}</p>
  <p>City, State, Zip: ${Us(k)}</p>
  <p>Phone &amp; Email: ${Us(L?`${L}${T?" / "+T:""}`:"")}</p>
</div>
<div class="party-block">
  <p><strong>The Contractor:</strong></p>
  <p>Sherman Builders &mdash; 2244 Hwy 65, Mora, MN 55051 &mdash; Lic. # BC532878</p>
</div>
<div class="party-block">
  <p><strong>The Manufacturer</strong> <em>(third-party factory builder)</em><strong>:</strong></p>
  <p>Name: ${pt(220)} &nbsp; Address: ${pt(220)}</p>
  <p>HUD Certification / License No.: ${pt(180)} &nbsp; Sales Contact: ${pt(180)}</p>
</div>
<div class="party-block">
  <p><strong>For The Project:</strong></p>
  <p>Home Model: ${Us(z)} &nbsp;&nbsp; Project Address: ${Us(W)}</p>
  <p>City, State, Zip: ${Us(E)}</p>
</div>

<hr>

<h2>1. Contract Documents</h2>
<p>The Contract Documents consist of this Agreement, the Plans, the Specification Booklet, the Allowance Budget, the Owner Responsibilities Acknowledgement, the Payment Schedule, and the Manufacturer's Quote, Floor Plan, and Specifications (attached as <strong>Exhibit A</strong>); as well as any Addendums, Change Orders, and Allowance Reallocations executed after the date of this Agreement. These Contract Documents represent the entire agreement between the parties and supersede any prior oral or written agreement(s).</p>
<blockquote><strong>Note:</strong> The Homeowner Guide is incorporated into this Contract by reference. Owner must read, initial, and sign the Homeowner Guide as part of executing this Agreement.</blockquote>

<h2>2. Scope of Work — Division of Responsibility</h2>
<p>Because this project involves a factory-built home, construction responsibilities are divided between the Manufacturer and Sherman Builders as follows.</p>
<h3>2.1 Manufacturer Responsibilities (Off-Site Factory Work)</h3>
<ul>
  <li>Fabrication of the structural home unit per the agreed floor plan and specifications</li>
  <li>Factory installation of interior finishes, cabinetry, flooring, plumbing rough-in, and electrical rough-in as specified in Exhibit A</li>
  <li>Compliance with all applicable HUD or state modular construction standards</li>
  <li>Provision of the HUD Data Plate and certification label(s)</li>
  <li>Providing manufacturer warranties covering factory-built components and workmanship</li>
</ul>
<p><strong>Sherman Builders is not liable for defects, omissions, or non-conforming work originating in the manufacturing facility.</strong></p>
<h3>2.2 Sherman Builders Responsibilities (Site Work &amp; Installation)</h3>
<ul>
  <li>Site preparation and grading</li>
  <li>Foundation design coordination, permitting, and construction</li>
  <li>Coordination of home delivery from the Manufacturer to the project site</li>
  <li>Transportation and oversize-load permit acquisition</li>
  <li>Crane and set operations — placing the home unit on the foundation</li>
  <li>Marriage wall assembly and sealing for multi-section homes</li>
  <li>Utility stub-outs and final connections (electric, plumbing, HVAC, fuel)</li>
  <li>All finish work not completed at the factory as specified in Exhibit A</li>
  <li>Obtaining all required local permits for site and installation work</li>
  <li>Final site cleanup and broom-clean condition at project completion</li>
</ul>

<h2>3. Time of Completion</h2>
<p>The approximate completion date shall be on or about <strong>90–120 working days from site readiness</strong>, subject to the Manufacturer's production schedule. Change Orders, unusual weather, and Manufacturer production delays may affect the completion date.</p>

<h2>4. Factory Order Lock-In</h2>
<p>Owner must finalize all factory selections by the <strong>Factory Order Lock-In Date</strong>, agreed upon in writing before order placement. Changes to factory-built components after order placement are the Owner's sole financial responsibility. The Allowance Budget distinguishes between <strong>factory-locked items</strong> and <strong>site allowance items</strong>.</p>

<h2>5. The Contract Price</h2>
<p>The Contract Price shall be ${pt(180)} ($${pt(120)}), subject to the Allowance Budget, Change Orders, and short-notice price increases. The Owner shall pay a Down Payment of <strong>Twenty Thousand Dollars ($20,000.00)</strong> upon signing. This Contract Price is contingent on the agreed Payment Schedule between the Contractor, Owner, and Loan Agency, if applicable.</p>

<h2>6. Progress Payments</h2>
<p>Payment delays will result in construction delays. Owner shall respond to payment requests within 3 business days. If payment is not received within 7 business days of a request for substantially completed work, Contractor may stop work and/or terminate the Contract.</p>

<h2>7. Duties of the Contractor</h2>
<p>All site work and installation shall be in accordance with the Plans, completed in a workmanlike manner, and comply with all applicable MN State Building Code. Contractor shall obtain all permits necessary for site work, at the Owner's expense, and remove all construction debris.</p>

<h2>8. Duties of the Owner</h2>
<p>Owner shall communicate with subcontractors and the Manufacturer only through the Contractor. Owner is responsible for all utility account setups, fees, and usage expenses. <strong>Owner is responsible for ensuring the project site is ready for delivery on or before the confirmed delivery date.</strong> No third-party contractor work shall be performed during the delivery and installation phase without prior written approval from Sherman Builders.</p>

<h2>9. Change Orders</h2>
<p>All Change Orders must be agreed upon in writing. 100% of each Change Order cost must be paid prior to the change being made. A <strong>$300 Change Order administrative fee</strong> shall be added to the cost of each Change Order. An Allowance Overage Change Order shall not be subject to an administrative fee but is subject to additional costs at the rate of 15%.</p>

<h2>10. Allowances</h2>
<p>The Allowance Budget includes an Allowance Contingency reserve fund. When any allowance line item exceeds its allocated amount, the overage shall be automatically deducted from the Allowance Contingency. Unused funds in the Allowance Budget, including any unused Allowance Contingency, will be credited back to the Owner.</p>

<h2>11. Delivery, Transportation &amp; Installation</h2>
<p>Sherman Builders shall coordinate transportation from the Manufacturer's facility to the project site. Transportation costs, oversize-load road permits, and crane and set fees are <strong>included in the Contract Price</strong> unless otherwise specified. A joint pre-delivery inspection shall be conducted before placement on the foundation. Any visible damage must be documented and reported to the Manufacturer within <strong>5 business days</strong> of delivery.</p>

<h2>12. Insurance</h2>
<p>The Owner shall maintain liability insurance on the property. Contractor shall maintain Workers Compensation, Liability, and Builder's Risk insurance. Property shall not be occupied until the Owner acquires a homeowners insurance policy (immediately after drywall is hung).</p>

<h2>13. General Provisions</h2>
<p>If subsurface or concealed conditions are encountered that differ from those ordinarily expected and cause an increase in the Contractor's cost or time, such conditions shall be treated as a Change Order.</p>

<h2>14. Force Majeure and Delays Beyond Contractor's Control</h2>
<p>If the Contractor is delayed by causes beyond their reasonable control — including acts of God, fire, flood, epidemic, war, strikes, unavailability of materials, <strong>Manufacturer production delays</strong>, or other Force Majeure Events — the completion date shall be extended accordingly. Contractor shall notify Owner in writing within 7 business days of any Force Majeure Event.</p>

<h2>15. Hazardous Materials &amp; Formaldehyde</h2>
<p>Unless specifically included in this Agreement, upon discovery of hazardous materials, Contractor shall notify the Owner and allow engagement of a licensed hazardous material contractor, treated as a Change Order. The Manufacturer bears primary responsibility for formaldehyde-emitting materials introduced during factory construction.</p>
<blockquote><strong>Note:</strong> Read and sign the Formaldehyde Disclosure before executing this Agreement.</blockquote>

<h2>16. Arbitration of Disputes</h2>
<p>Any controversy or claim arising out of or relating to this Contract shall be settled by arbitration administered by the American Arbitration Association under its Construction Industry Arbitration Rules.</p>

<h2>17. Warranty</h2>
<p>At project completion, Contractor shall execute a warranty covering Sherman Builders' site work and installation for: <strong>1 year</strong> on workmanship and material defects; <strong>2 years</strong> on plumbing, heating, and electrical system defects; <strong>10 years</strong> on structural defects related to the foundation and site installation. This warranty covers only work performed by Sherman Builders. As required by MN Stat. § 327A, Owner must provide written notice of any warranty claim within <strong>6 months</strong> of discovering the defect.</p>
<blockquote><strong>Note:</strong> Read and sign the Warranty Statement.</blockquote>

<h2>18. Termination of the Contract</h2>
<p>If either party fails to carry out this Contract, the non-defaulting party may declare the Contract in default and proceed for recovery of all damages, including reasonable attorney fees. The Down Payment shall be applied to legally ascertained damages in the case of a defaulting Owner. In the event of Manufacturer default, Sherman Builders shall notify Owner within 5 business days and cooperate to identify an alternate remedy; costs already incurred for site work remain the Owner's responsibility.</p>

<h2>19. Attorney Fees</h2>
<p>In the event of any arbitration or litigation, the prevailing party shall be entitled to reasonable attorney fees, costs, and expenses.</p>

<h2>20. Acceptance and Occupancy</h2>
<p>Upon final payment, Contractor will provide Owner and Loan Agency with Lien Waivers for all materials and labor. The Owner shall not occupy the property until final payment has been received and a signed Right to Occupy Certificate has been issued.</p>

<div class="notice-box"><strong>PLEASE TAKE NOTICE:</strong> Any person or company supplying labor or materials for this improvement to your property may file a lien against your property if that person or company is not paid for their contributions. Under Minnesota law, you have the right to pay persons who supplied labor or materials directly and deduct this amount from the contract price, or withhold the amounts due them from us until 120 days after completion of the improvement.</div>

<h2>Exhibits</h2>
<ul>
  <li><strong>Exhibit A:</strong> Manufacturer's Quote, Floor Plan, and Specifications</li>
  <li><strong>Exhibit B:</strong> Manufacturer's Warranty Documentation</li>
</ul>

<div class="sig-section">
  <h2 style="border:none;margin-top:0">Acknowledgment and Signature</h2>
  <p>By signing below, all parties agree they have read, understand, and accept all terms of this Contract and its exhibits.</p>
  <div style="display:flex;gap:40px;flex-wrap:wrap;margin-top:20px">
    <div>
      <div class="sig-block">${Ni("Owner Signature")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Print Name</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
    <div>
      <div class="sig-block">${Ni("Owner Signature (if applicable)")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Print Name</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
    <div>
      <div class="sig-block">${Ni("Sherman Builders (Contractor) Signature")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Print Name / Title</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
  </div>
  <p style="margin-top:24px;font-size:12px;color:#555;font-style:italic">This Contract is for site work and installation services only. The purchase of the manufactured/modular home unit itself is governed by a separate Purchase Agreement. This Contract does not constitute legal advice. Consult a licensed Minnesota construction attorney before executing.</p>
</div>

<div class="generated-note">Generated by Sherman Bidding System &mdash; ${h} &mdash; ${Ke.name}, ${Ke.address}</div>
</body></html>`},zf=(l,u)=>{const h=rt.formatDate();return`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Formaldehyde Disclosure — ${(u?`${u.firstName||""} ${u.lastName||""}`.trim():"")||"Sherman Builders"}</title><style>${fa}</style></head><body>
<div class="header-bar"><h1>Formaldehyde Disclosure</h1><p class="sub">Modular / Manufactured Home &mdash; ${Ke.name} &mdash; Lic. # BC532878</p></div>

<h2>Why You're Receiving This Disclosure</h2>
<p>Minnesota law requires us to inform you that some building materials used in construction may contain formaldehyde. Please carefully read the following important health information.</p>
<p><strong>This disclosure is especially important for modular and manufactured homes.</strong> Because the majority of construction occurs in a factory setting, your home contains significant quantities of engineered wood products — including particleboard, oriented strand board (OSB), plywood, factory-installed cabinetry, and flooring — which may emit higher concentrations of formaldehyde than materials used in traditional site-built construction. These materials are selected and installed by the Manufacturer, not by Sherman Builders.</p>

<div class="important-notice">
  SOME OF THE BUILDING MATERIALS USED IN THIS HOME EMIT FORMALDEHYDE. EYE, NOSE, AND THROAT IRRITATION, HEADACHE, NAUSEA AND A VARIETY OF ASTHMA-LIKE SYMPTOMS, INCLUDING SHORTNESS OF BREATH, HAVE BEEN REPORTED AS A RESULT OF FORMALDEHYDE EXPOSURE. ELDERLY PERSONS AND YOUNG CHILDREN, AS WELL AS ANYONE WITH A HISTORY OF ASTHMA, ALLERGIES, OR LUNG PROBLEMS, MAY BE AT GREATER RISK. RESEARCH IS CONTINUING ON THE POSSIBLE LONG-TERM EFFECTS OF EXPOSURE TO FORMALDEHYDE.
  <br><br>
  REDUCED VENTILATION MAY ALLOW FORMALDEHYDE AND OTHER CONTAMINANTS TO ACCUMULATE IN THE INDOOR AIR. HIGH INDOOR TEMPERATURES AND HUMIDITY RAISE FORMALDEHYDE LEVELS. WHEN A HOME IS TO BE LOCATED IN AREAS SUBJECT TO EXTREME SUMMER TEMPERATURES, AN AIR-CONDITIONING SYSTEM CAN BE USED TO CONTROL INDOOR TEMPERATURE LEVELS. OTHER MEANS OF CONTROLLED MECHANICAL VENTILATION CAN BE USED TO REDUCE LEVELS OF FORMALDEHYDE AND OTHER INDOOR AIR CONTAMINANTS.
  <br><br>
  IF YOU HAVE ANY QUESTIONS REGARDING THE HEALTH EFFECTS OF FORMALDEHYDE, CONSULT YOUR DOCTOR OR LOCAL HEALTH DEPARTMENT.
</div>

<h2>Modular &amp; Manufactured Home — Additional Information</h2>

<h3>Sources of Formaldehyde in Factory-Built Homes</h3>
<p>In modular and manufactured homes, formaldehyde-emitting materials are commonly introduced during factory construction and may include:</p>
<ul>
  <li>Particleboard and MDF used in cabinetry, shelving, and subflooring</li>
  <li>Oriented strand board (OSB) used in walls, floors, and roof decking</li>
  <li>Plywood used in structural panels</li>
  <li>Factory-installed flooring with adhesives or composite cores</li>
  <li>Furniture and built-in components assembled at the factory</li>
</ul>
<p>Because the factory environment involves enclosed assembly of many of these materials simultaneously, formaldehyde concentrations in newly delivered manufactured homes may be higher than in site-built homes during the initial period after delivery and installation.</p>

<h3>Manufacturer Responsibility</h3>
<p>The Manufacturer — not Sherman Builders — is primarily responsible for the selection and installation of factory-built materials, including those that may emit formaldehyde. Sherman Builders' role is limited to site work, installation, and finish work performed on-site.</p>
<p>If you have questions about the specific materials used in your home, you have the right to request material specifications directly from the Manufacturer prior to the Factory Order Lock-In Date. The Manufacturer can provide information on formaldehyde emission levels and, in many cases, offer lower-formaldehyde or no-added-formaldehyde (NAF) material options.</p>

<h3>Steps You Can Take</h3>
<ul>
  <li><strong>Before ordering:</strong> Ask the Manufacturer about low-formaldehyde or NAF (no-added-formaldehyde) options for cabinetry, flooring, and engineered wood panels.</li>
  <li><strong>After delivery:</strong> Ventilate the home thoroughly before and after move-in by opening windows and running ventilation systems.</li>
  <li><strong>Ongoing:</strong> Maintain moderate indoor temperatures and humidity levels. Formaldehyde emissions typically decrease significantly within the first 1–2 years after manufacture.</li>
</ul>

<h2>Governing Law</h2>
<p>This disclosure is provided as required by <strong>Minnesota Statutes Section 325F.182</strong>. This disclosure does not limit or waive any rights the Owner may have under Minnesota or federal law regarding indoor air quality, manufacturer liability, or warranty claims.</p>

<div class="sig-section">
  <h2 style="border:none;margin-top:0">Acknowledgment and Signature</h2>
  <p>By signing below, I/we acknowledge that I/we have received and read this Formaldehyde Disclosure as required by Minnesota Statutes Section 325F.182, and that I/we understand the particular relevance of formaldehyde emissions in modular and manufactured homes built with factory-installed engineered wood products.</p>
  <div style="display:flex;gap:40px;flex-wrap:wrap;margin-top:20px">
    <div>
      <div class="sig-block">${Ni("Owner Signature")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Print Name</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
    <div>
      <div class="sig-block">${Ni("Owner Signature")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Print Name</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
  </div>
</div>

<div class="generated-note">Generated by Sherman Bidding System &mdash; ${h} &mdash; ${Ke.name}, ${Ke.address}</div>
</body></html>`},Df=(l,u)=>{const h=rt.formatDate(),S=u?`${u.firstName||""} ${u.lastName||""}`.trim():"",j=(l==null?void 0:l.homeModel)||"";return`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Homeowner's Guide — ${S||"Sherman Builders"}</title><style>${fa}</style></head><body>
<div class="header-bar"><h1>Homeowner's Guide to Selections, Purchases &amp; Key Milestones</h1><p class="sub">Modular / Manufactured Home &mdash; ${Ke.name} &mdash; Lic. # BC532878</p></div>

${S?`<p><strong>Prepared for:</strong> <span class="filled">${S}</span>${j?` &mdash; Home Model: <span class="filled">${j}</span>`:""}</p>`:""}

<h2>Your Sherman Team</h2>
<table>
  <tr><th>Role</th><th>Name</th><th>Phone</th><th>Email</th></tr>
  <tr><td>Project Design Representative</td><td>${pt(130)}</td><td>${pt(100)}</td><td>${pt(130)}</td></tr>
  <tr><td>Project Specification Coordinator</td><td>${pt(130)}</td><td>${pt(100)}</td><td>${pt(130)}</td></tr>
  <tr><td>Project Construction Manager</td><td>${pt(130)}</td><td>${pt(100)}</td><td>${pt(130)}</td></tr>
  <tr><td>Manufacturer Sales Contact</td><td>${pt(130)}</td><td>${pt(100)}</td><td>${pt(130)}</td></tr>
</table>

<h2>How This Process Works</h2>
<p>Because your home is built in a manufacturing facility — not entirely on-site — this process works differently than a traditional custom home build. <strong>Two separate workflows run in parallel:</strong> the Manufacturer builds your home unit in the factory while Sherman Builders prepares your site, foundation, and utilities.</p>
<p>Many selections are <strong>locked the moment the factory order is placed.</strong> Changes that are easy and inexpensive before the order can become impossible — or very costly — after it. Please do not assume any specific materials or services are included. It's always better to ask for clarification early.</p>

<h2>Understanding Your Build: Factory vs. Site</h2>
<h3>What the Manufacturer Builds (Factory)</h3>
<p>The Manufacturer constructs your home unit in a controlled factory environment. This includes the structural frame, walls, roof, factory-installed insulation, interior finishes, cabinetry, flooring, plumbing rough-in, electrical rough-in, and any other factory-installed options you select. Once the factory order is placed, <strong>these items are locked.</strong></p>
<h3>What Sherman Builders Builds (On-Site)</h3>
<p>Sherman Builders handles everything at your property: site preparation, grading, foundation construction, utility stub-outs, home delivery coordination, crane and set operations, marriage wall assembly, final utility connections, site finish work, and any on-site upgrades specified in your Allowance Budget.</p>
<h3>Factory vs. Site Selections at a Glance</h3>
<table>
  <tr><th>Selection Type</th><th>Examples</th><th>Deadline</th></tr>
  <tr><td><strong>Factory-locked</strong></td><td>Home model, floor plan, structural options, factory cabinetry, factory flooring, factory-installed fixtures</td><td>Before Factory Order Lock-In Date</td></tr>
  <tr><td><strong>Site allowance</strong></td><td>Foundation type, utility connections, on-site finish upgrades, landscaping, exterior grading</td><td>Per Sherman timeline</td></tr>
</table>
<blockquote><strong>Rule of thumb:</strong> If it's built or installed inside the factory, it must be decided before the Factory Order Lock-In Date. If it happens at your property after delivery, it follows Sherman's standard timeline.</blockquote>

<h2>Your Project Timeline</h2>
<p><strong>Phase 1 — Pre-Order:</strong> All factory selections finalized. Foundation design and permits initiated. Factory Order Lock-In Date confirmed in writing.</p>
<p><strong>Phase 2 — Factory Production:</strong> Manufacturer builds home unit in factory (typically 4–8 weeks). Sherman Builders completes site preparation, foundation, and utility stub-outs.</p>
<p><strong>Phase 3 — Delivery &amp; Set:</strong> Home unit transported to site. Joint pre-delivery inspection conducted before placement on foundation. Crane and set operations.</p>
<p><strong>Phase 4 — Installation &amp; Site Finish:</strong> Sherman Builders connects utilities, completes marriage wall assembly (if applicable), completes on-site finish work, and coordinates final inspections.</p>
<p><strong>Phase 5 — Final Walkthrough &amp; Occupancy:</strong> Final inspection, punch list completion, final payment, and issuance of the Right to Occupy Certificate.</p>

<h2>Key Acknowledgements</h2>
<p>Please read each statement carefully and initial to confirm your understanding.</p>

${[["1. Document Review","I/We have received and reviewed the Agreement, Plans, Specification Booklet, Allowance Budget, and Manufacturer's Quote and Floor Plan. I/We understand these documents define the scope, specifications, and pricing for this project."],["2. Factory Order Lock-In","I/We understand that once the factory order is placed, changes to factory-built components may not be possible. Any changes the Manufacturer permits will be treated as a Change Order and are my/our sole financial responsibility."],["3. Change Authorization","I/We understand that only changes discussed directly with our Sherman Team project contacts will be authorized. This policy ensures all modifications are properly documented and priced."],["4. Cost Responsibility","I/We understand that the final price is subject to unknown conditions and enhancements made as construction progresses. I/We accept responsibility for costs associated with changes we request."],["5. Site Readiness for Delivery","I/We understand that the project site must be fully ready on or before the confirmed delivery date (foundation complete, driveway clear, grading complete). Delays caused by site unreadiness are my/our financial responsibility."],["6. Pre-Delivery Inspection","I/We understand that a joint inspection will be conducted at delivery, before placement on the foundation. Any visible defects must be documented at that time."],["7. Floor Plan & Framing Tolerances","I/We understand that floor plan and framing layouts are subject to reasonable field tolerances. Factory-built dimensions may vary slightly from plan drawings."],["8. Homeowner-Hired Contractors","I/We understand that no third-party contractor work is permitted during the delivery and installation phase without prior written approval from Sherman Builders."],["9. Homeowner-Selected Subcontractors","I/We understand that Sherman Builders does not accept responsibility for the work quality or warranty of homeowner-selected subcontractors. We understand we should obtain written contracts directly from any subcontractors we select."],["10. Seasonal Construction & Weather Delays","I/We understand that construction in Minnesota and Wisconsin is very seasonal and that weather-related delays are not the responsibility of Sherman Builders."],["11. Utility Costs During Construction","I/We understand that all utility bills accrued during construction are our responsibility and will be billed directly to us."],["12. Insurance Requirements","I/We understand the insurance requirements. Sherman Builders carries Workers Compensation, Liability, and Builder's Risk insurance. I/We are required to maintain liability insurance on the property during construction."]].map(([k,L])=>`
<div style="margin:16px 0;padding:12px;border:1px solid #ddd;border-radius:4px">
  <p style="margin:0 0 8px"><strong>${k}</strong></p>
  <p style="margin:0 0 12px;font-size:13px">${L}</p>
  <div class="initial-row"><span class="initial-box">&nbsp;</span><span style="font-size:12px;color:#666">Initial</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="initial-box">&nbsp;</span><span style="font-size:12px;color:#666">Initial</span></div>
</div>`).join("")}

<h2>Your Selections &amp; Recommended Partners</h2>
<div class="notice-box"><strong>IMPORTANT: Factory-Locked vs. Site Selections</strong><br>Before making any selection, confirm with your Sherman Team whether it is a factory-locked item or a site allowance item. Making this distinction early prevents costly delays and change fees.</div>
<div class="notice-box"><strong>IMPORTANT: Monitor Your Allowances</strong><br>Throughout the selection process, keep track of your spending against the Allowance Budget.</div>

<table>
  <tr><th>Item</th><th>Deadline / Type</th><th>Notes</th></tr>
  <tr><td><strong>Home Model &amp; Floor Plan</strong></td><td>Before Factory Order Lock-In</td><td>Factory-locked — cannot be changed after order</td></tr>
  <tr><td><strong>Factory-Installed Cabinetry &amp; Finishes</strong></td><td>Before Factory Order Lock-In</td><td>Factory-locked</td></tr>
  <tr><td><strong>Plumbing Fixtures (factory-plumbed)</strong></td><td>Before Factory Order Lock-In</td><td>Factory-locked</td></tr>
  <tr><td><strong>Fireplace (if factory option)</strong></td><td>Before Factory Order Lock-In</td><td>Factory-locked</td></tr>
  <tr><td><strong>Plumbing Fixtures (site-connected)</strong></td><td>Before site work begins</td><td>Site allowance — Ferguson Showroom</td></tr>
  <tr><td><strong>On-Site Cabinetry (if applicable)</strong></td><td>Before site finish work</td><td>Site allowance — Maranatha Cabinets: (320) 358-3774</td></tr>
  <tr><td><strong>Countertops — Quartz/Granite</strong></td><td>Before site finish work</td><td>Site allowance — Stone Tree (763) 309-8066 | L&amp;L Granite (218) 451-0277</td></tr>
  <tr><td><strong>Flooring (on-site upgrades)</strong></td><td>Before site finish work</td><td>Site allowance — Monarch Flooring (651) 674-4300</td></tr>
  <tr><td><strong>Tile (on-site)</strong></td><td>Before site finish work</td><td>Site allowance — Chris Tile: (763) 458-0979</td></tr>
  <tr><td><strong>Paint Colors</strong></td><td>Before site finish work</td><td>Site allowance — Sherwin Williams</td></tr>
  <tr><td><strong>Electrical Fixtures</strong></td><td>Purchase after walkthrough; deliver after painting</td><td>Owner purchases; label with location</td></tr>
  <tr><td><strong>Appliances</strong></td><td>Purchase after painting</td><td>Retailer must handle installation; coordinate delivery with PM</td></tr>
  <tr><td><strong>Mirrors, Hardware, etc.</strong></td><td>Deliver after painting</td><td>Sherman installs; installation fees may apply</td></tr>
</table>

<h2>Factory Delivery &amp; Set — What to Expect</h2>
<p><strong>Before Delivery:</strong> Sherman Builders will confirm delivery date and time in writing. Foundation must be complete, inspected, and approved. Driveway and site access must be clear.</p>
<p><strong>Day of Delivery — Pre-Delivery Inspection:</strong> Before the home is placed on the foundation, you (or your designated representative) and a Sherman Builders representative will conduct a joint inspection. Document any visible damage, incomplete work, or items not matching specifications in writing. Do not formally accept the unit until this inspection is complete. Any factory defects or transit damage must be reported to the Manufacturer in writing within <strong>5 business days</strong> of delivery.</p>
<p><strong>Set Operations:</strong> A crane will be used to lift and place the home unit(s) on the foundation. <strong>No guests, family members, or third-party contractors are permitted on site during set operations</strong> for safety reasons.</p>
<p><strong>After Set:</strong> Sherman Builders will connect utilities, complete installation, and begin site finish work. HUD inspection (if applicable) will be scheduled by Sherman Builders.</p>

<h2>Quick Reference Checklist</h2>
<h3>Factory-Locked Selections <span style="font-size:12px;color:#666">(Must be completed before the Factory Order Lock-In Date)</span></h3>
<table class="checklist-table">
  <tr><td>Home model &amp; floor plan confirmed</td><td>☐</td></tr>
  <tr><td>Structural options &amp; upgrades selected</td><td>☐</td></tr>
  <tr><td>Factory cabinetry &amp; finish selections made</td><td>☐</td></tr>
  <tr><td>Factory-plumbed fixtures selected</td><td>☐</td></tr>
  <tr><td>Factory flooring selections made</td><td>☐</td></tr>
  <tr><td>Fireplace (if factory option) confirmed</td><td>☐</td></tr>
  <tr><td>Factory Order Lock-In Date confirmed in writing</td><td>☐</td></tr>
</table>

<h3>Project Milestones</h3>
<table>
  <tr><th>Milestone</th><th>Who is Responsible</th></tr>
  <tr><td>Factory Order Lock-In Date</td><td>Owner + Sherman Builders</td></tr>
  <tr><td>Factory production complete</td><td>Manufacturer</td></tr>
  <tr><td>Site ready for delivery (foundation, access)</td><td>Owner + Sherman Builders</td></tr>
  <tr><td>Pre-delivery inspection</td><td>Owner + Sherman Builders</td></tr>
  <tr><td>Delivery &amp; set</td><td>Sherman Builders</td></tr>
  <tr><td>HUD/modular inspection</td><td>Sherman Builders</td></tr>
  <tr><td>Utility connections complete</td><td>Sherman Builders</td></tr>
  <tr><td>Final walkthrough</td><td>Owner + Sherman Builders</td></tr>
  <tr><td>Right to Occupy Certificate issued</td><td>Sherman Builders</td></tr>
</table>

<div class="sig-section">
  <h2 style="border:none;margin-top:0">Signatures</h2>
  <p>By signing below, we acknowledge that we have read and understand this guide in its entirety, that we understand the key differences between a modular/manufactured home build and a traditional site-built home, and that we have initialed each Key Acknowledgement above.</p>
  <div style="display:flex;gap:40px;flex-wrap:wrap;margin-top:20px">
    <div>
      <div class="sig-block">${Ni("Homeowner 1 Signature")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Printed Name</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
    <div>
      <div class="sig-block">${Ni("Homeowner 2 Signature")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Printed Name</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
    <div>
      <div class="sig-block">${Ni("Sherman Builders Representative Signature")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Printed Name</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
  </div>
  <p style="margin-top:24px;font-size:12px;color:#555;font-style:italic">This guide is for informational purposes and project coordination. It is incorporated by reference into the Main Contract. It does not constitute legal advice. Consult a licensed Minnesota construction attorney with any legal questions regarding your purchase.</p>
  <p style="font-size:14px;margin-top:16px;color:#2c5530;font-weight:600">Thank you for choosing Sherman Builders. Let's build something amazing together.</p>
</div>

<div class="generated-note">Generated by Sherman Bidding System &mdash; ${h} &mdash; ${Ke.name}, ${Ke.address}</div>
</body></html>`},Af=(l,u)=>{const h=rt.formatDate();return`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Warranty Statement — ${(u?`${u.firstName||""} ${u.lastName||""}`.trim():"")||"Sherman Builders"}</title><style>${fa}</style></head><body>
<div class="header-bar"><h1>Warranty Statement</h1><p class="sub">Modular / Manufactured Home &mdash; ${Ke.name} &mdash; Lic. # BC532878</p></div>

<blockquote><strong>Important Notice:</strong> This warranty statement covers a factory-built home. Construction responsibilities — and therefore warranty responsibilities — are divided between <strong>the Manufacturer</strong> (who builds the home unit in a factory) and <strong>Sherman Builders</strong> (who performs site work and installation). Read all sections carefully. This document does not constitute legal advice; consult a licensed Minnesota attorney with questions about your rights.</blockquote>

<h2>A. Sherman Builders Statutory Warranties — Site Work &amp; Installation</h2>
<p>Sherman Builders warrants the <strong>site work and installation</strong> portions of your home under Minnesota Statutes Chapter 327A, as follows:</p>
<table>
  <tr><th>Warranty Period</th><th>Coverage</th></tr>
  <tr><td><strong>1-Year</strong></td><td>Site work and installation shall be free from defects caused by faulty workmanship and defective materials due to non-compliance with building standards.</td></tr>
  <tr><td><strong>2-Year</strong></td><td>Site-installed plumbing, electrical, heating, and cooling systems shall be free from defects caused by faulty installation due to non-compliance with building standards.</td></tr>
  <tr><td><strong>10-Year</strong></td><td>Site work and installation shall be free from major construction defects due to non-compliance with building standards.</td></tr>
</table>
<p><strong>Sherman Builders' warranties apply to site work and installation only.</strong> They do not cover defects originating in the manufacturing facility.</p>
<p><strong>Warranty Date:</strong> The Warranty Date for Sherman Builders' statutory warranties is the earlier of: (1) the date the Owner first occupies the home, or (2) the date the Owner takes legal title to the home — but not earlier than the date the home unit is set on the foundation and site work commences.</p>
<p><strong>Claims Requirement:</strong> Written warranty claims against Sherman Builders must be reported within <strong>six months</strong> after the Owner discovers or should have discovered the defect.</p>

<h2>B. Scope of Responsibility — Why This Warranty Is Divided</h2>
<p><strong>The Manufacturer</strong> constructed the home unit in a factory, including: structural framing, roof, and exterior shell; factory-installed interior finishes, cabinetry, flooring; plumbing rough-in and electrical rough-in completed at the factory; factory-installed appliances and mechanical systems.</p>
<p><strong>Sherman Builders</strong> is responsible for: foundation design coordination and construction; delivery coordination and transportation permitting; crane and set operations; marriage wall assembly; final utility connections; all finish work completed on-site; site cleanup and final inspection coordination.</p>
<p>Defects in <strong>manufacturer-supplied components or factory workmanship are the responsibility of the Manufacturer</strong>, not Sherman Builders.</p>

<h2>C. Manufacturer Warranty</h2>
<p>Sherman Builders will pass through to the Owner all warranties provided by the Manufacturer with respect to the factory-built home unit.</p>
<div class="party-block">
  <p><strong>Manufacturer Information:</strong></p>
  <p>Manufacturer Name: ${pt(200)}</p>
  <p>Address: ${pt(280)}</p>
  <p>HUD Certification / License No.: ${pt(160)}</p>
  <p>Warranty Contact Name: ${pt(180)} &nbsp; Phone: ${pt(130)}</p>
  <p>Warranty Email / Portal: ${pt(220)}</p>
</div>
<table>
  <tr><th>Coverage</th><th>Term</th><th>Notes</th></tr>
  <tr><td>Structural / Home Unit</td><td>${pt(60)} Year(s)</td><td>Per manufacturer warranty document</td></tr>
  <tr><td>Plumbing (factory-installed)</td><td>${pt(60)} Year(s)</td><td>Per manufacturer warranty document</td></tr>
  <tr><td>Electrical (factory-installed)</td><td>${pt(60)} Year(s)</td><td>Per manufacturer warranty document</td></tr>
  <tr><td>Roofing</td><td>${pt(60)} Year(s)</td><td>Per manufacturer warranty document</td></tr>
  <tr><td>Appliances</td><td>Per appliance mfr.</td><td>Individual appliance warranties passed through</td></tr>
  <tr><td>Windows &amp; Doors</td><td>${pt(60)} Year(s)</td><td>Per manufacturer warranty document</td></tr>
</table>
<p><strong>The full manufacturer warranty document is attached to this Warranty Statement as Exhibit W-1.</strong></p>
<p><strong>How to File a Manufacturer Warranty Claim:</strong></p>
<ol>
  <li>Document the defect in writing with photographs.</li>
  <li>Contact the Manufacturer directly using the contact information above.</li>
  <li>Notify Sherman Builders in writing at the same time.</li>
  <li>Sherman Builders will cooperate with and assist in the claims process.</li>
</ol>

<h2>D. Applicable Building Standards — HUD Code vs. MN State Building Code</h2>
<p><strong>HUD-Code Manufactured Home:</strong> Factory-built portions are constructed under federal HUD Manufactured Home Construction and Safety Standards (24 CFR Part 3280). Federal HUD standards may govern warranty rights for factory-built components in ways that differ from or supersede Minnesota Chapter 327A.</p>
<p><strong>Modular Home:</strong> A modular home is factory-built to Minnesota State Building Code standards. Minnesota Chapter 327A applies in full to both site work and factory-built portions.</p>
<p><strong>Site Work (both home types):</strong> All site work performed by Sherman Builders complies with the Minnesota State Building Code and applicable local codes.</p>
<p>The HUD Data Plate and/or certification label(s) must be present on the completed unit at delivery. If any label is missing, notify Sherman Builders immediately.</p>

<h2>E. Warranty Date — Factory-Built Home Clarification</h2>
<p>For Sherman Builders' site work warranties, the Warranty Date shall not begin earlier than the <strong>date the home unit is set on the foundation and site work commences.</strong> For the Manufacturer's warranty, the warranty date is governed by the Manufacturer's warranty document (Exhibit W-1).</p>

<h2>F. Claims Procedures</h2>
<h3>F.1 — Claims Against Sherman Builders (Site Work &amp; Installation)</h3>
<ol>
  <li><strong>Report in writing</strong> within six months of discovering the defect. Send written notice to: Sherman Builders | 2244 Hwy 65, Mora, MN 55051</li>
  <li>Sherman Builders will <strong>inspect within 30 days</strong> of receiving written notice.</li>
  <li>Sherman Builders will provide a <strong>written offer to repair within 15 days</strong> of completing the inspection.</li>
  <li>If the parties agree on scope of repair, Sherman Builders will perform repairs per the written agreement.</li>
  <li>If the parties do not agree, the matter proceeds to the <strong>MN Home Warranty Dispute Resolution Process</strong> under MN Stat. § 327A.051.</li>
</ol>
<h3>F.2 — Claims Against the Manufacturer (Factory-Built Components)</h3>
<ol>
  <li>Contact the Manufacturer directly using the contact information in Section C.</li>
  <li>Notify Sherman Builders in writing at the same time.</li>
  <li>Follow the Manufacturer's claims procedure as set forth in Exhibit W-1.</li>
  <li>Sherman Builders will assist in coordinating access, documentation, and follow-up.</li>
</ol>
<h3>F.3 — Disputed Claims (Origin Unclear)</h3>
<p>Notify both Sherman Builders and the Manufacturer in writing. Both parties will cooperate to inspect and determine the responsible party.</p>

<h2>G. Warranty Exclusions</h2>
<p>The liability of Sherman Builders under this warranty does not extend to:</p>
<ul>
  <li>Loss or damage <strong>not reported in writing within six months</strong> after discovery</li>
  <li>Loss or damage caused by defects in design, materials, or installation <strong>supplied or directed by the Owner</strong></li>
  <li>Secondary loss or damage such as personal injury or property damage</li>
  <li>Loss or damage from <strong>normal wear and tear</strong> or normal shrinkage</li>
  <li>Loss or damage from dampness or condensation due to insufficient ventilation after occupancy</li>
  <li>Loss or damage from <strong>negligence, improper maintenance, or alteration</strong> by parties other than Sherman Builders</li>
  <li>Loss or damage from <strong>Acts of God</strong> (fire, flood, windstorm, hail, earthquake, etc.)</li>
  <li>Loss or damage due to soil conditions on Owner-supplied land</li>
  <li><strong>Defects in manufacturer-supplied components, factory workmanship, or materials originating in the manufacturing facility</strong></li>
</ul>

<h2>H. Waiver and Modification</h2>
<p>The warranties provided under Minnesota Statutes Chapter 327A cannot be waived or modified except as provided by § 327A.04. Any modification must be made by a written instrument, printed in boldface type of minimum 10-point size, signed by the Owner.</p>

<h2>I. Minnesota Statutes Chapter 327A — Reference</h2>
<p>The complete text of Minnesota Statutes Chapter 327A (New Home Warranties) is available at: <strong>https://www.revisor.mn.gov/statutes/cite/327A</strong></p>
<p>A printed copy of Chapter 327A will be provided to the Owner upon request. Key provisions governing this warranty: § 327A.01 (Definitions), § 327A.02 (Statutory Warranties), § 327A.03 (Exclusions), § 327A.04 (Waiver and Modification), § 327A.05 (Remedies), § 327A.051 (Dispute Resolution), § 327A.08 (Limitations).</p>

<div class="sig-section">
  <h2 style="border:none;margin-top:0">Acknowledgment and Signature</h2>
  <p>By signing below, I/we acknowledge that I/we have received and reviewed this Warranty Statement, understand the division of warranty responsibility between Sherman Builders and the Manufacturer, and understand the warranty coverage, exclusions, claims procedures, and dispute resolution process.</p>
  <p>I/we understand that: Sherman Builders warrants <strong>site work and installation</strong> under MN Chapter 327A. The <strong>Manufacturer</strong> warrants factory-built components per Exhibit W-1. Written warranty claims must be reported within <strong>six months</strong> of discovery. The <strong>Manufacturer Warranty document (Exhibit W-1)</strong> is attached and has been provided to me/us.</p>
  <div style="display:flex;gap:40px;flex-wrap:wrap;margin-top:20px">
    <div>
      <div class="sig-block">${Ni("Owner Signature")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Print Name</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
    <div>
      <div class="sig-block">${Ni("Owner Signature")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Print Name</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
    <div>
      <div class="sig-block">${Ni("Sherman Builders Representative Signature")}<div class="sig-line" style="min-width:180px">&nbsp;</div><div class="sig-label">Print Name / Title</div></div>
      <div style="margin-top:8px"><span class="sig-label">Date: </span>${pt(120)}</div>
    </div>
  </div>
  <p style="margin-top:24px;font-size:12px;color:#555;font-style:italic">This Warranty Statement is a required contract document under MN Stat. § 327A.08. Failure to provide this warranty in writing is a violation of MN Stat. § 326B.84. This document does not constitute legal advice. Consult a licensed Minnesota construction attorney with questions about your rights.</p>
</div>

<div class="generated-note">Generated by Sherman Bidding System &mdash; ${h} &mdash; ${Ke.name}, ${Ke.address}</div>
</body></html>`},_f=({materials:l,services:u,sewerPricing:h,patioPricing:S,driveRates:j,foundationPricing:k,homeModels:L,userName:T,quotes:W,contracts:E,selQuote:z,selContract:V,selCustomer:F,setSelQuote:J,setSelContract:Y,saveQuotes:oe,saveContracts:ee,generateQuoteHtml:R,generatePierDiagramHtml:$,generateScopeOfWorkDocument:H,generateCrewWorkOrderDocument:I,generateAllowanceProgressDocument:v,generateChangeOrderDocument:re})=>{const O=async(y,w,d,P)=>{let ie=Nn.getFolders(d);for(const $e of w){const Ee=ie[$e]||[],Xe=Ee.findIndex($t=>$t.name===y.name);Xe>=0?(Ee[Xe]={...y,id:Ee[Xe].id},ie[$e]=Ee):ie[$e]=[...Ee,{...y,id:Tn()}]}const le={...d,folders:ie},de=W.find($e=>$e.id===d.id),_e=E.find($e=>$e.id===d.id);if(de){const $e=W.map(Ee=>Ee.id===d.id?le:Ee);await oe($e),(z==null?void 0:z.id)===d.id&&J(le)}else if(_e){const $e=E.map(Ee=>Ee.id===d.id?le:Ee);await ee($e),(V==null?void 0:V.id)===d.id&&Y(le)}return le};return{autoSaveFileToFolders:O,saveQuoteToFolder:async(y,w)=>{const d=w||F,P=Xt.calculateQuoteTotals(y,d,l,u,h,S,j,k),ie=rt.getQuoteNum(y),le=rt.getHomeDesc(y),de=R({...y,customerFirstName:d.firstName,customerLastName:d.lastName,phone:d.phone,email:d.email,siteAddress:d.siteAddress,siteCity:d.siteCity,siteState:d.siteState,siteZip:d.siteZip},P,L),_e=new Blob([de],{type:"text/html"}),$e=await nn(_e,"Quote"),Ee={name:`Quote #${ie} - ${le}`,type:"pdf",url:$e,notes:`Total: ${D(P.total)} | Status: ${y.status} | Version: ${y.editVersion||0}`,addedBy:T,addedAt:new Date().toISOString()};await O(Ee,["change_orders"],y),tt.success("Quote saved to Customer Docs folder!")},savePierLayoutToFolder:async(y,w)=>{const d=w||F,P=rt.getQuoteNum(y),ie=rt.getHomeDesc(y),le=$(y,d),de=new Blob([le],{type:"text/html"}),_e=await nn(de,"Pier Layout"),$e={name:`Pier Layout - ${ie}`,type:"pdf",url:_e,notes:`${y.houseWidth}'W × ${y.houseLength}'L | I-Beam: ${Xt.getBeamHeight(y)}" | Quote #${P}`,addedBy:T,addedAt:new Date().toISOString()};await O($e,["crew_files"],y),tt.success("Pier Layout saved to Crew Files folder!")},saveMaterialListToFolder:async(y,w)=>{const d=w||F,P=da({...y,...d},l),ie=rt.getQuoteNum(y),le=rt.getHomeDesc(y),de=P.map($t=>`<tr><td style="padding:6px 12px;border-bottom:1px solid #ddd">${$t.item}</td><td style="padding:6px 12px;border-bottom:1px solid #ddd;text-align:right">${$t.qty}</td></tr>`).join(""),_e=`<!DOCTYPE html><html><head><title>Material List - ${le}</title></head><body style="font-family:Arial,sans-serif;max-width:700px;margin:40px auto;padding:20px"><h1 style="color:#2c5530;border-bottom:2px solid #2c5530;padding-bottom:8px">Material List</h1><p><strong>Home:</strong> ${le} &nbsp;|&nbsp; <strong>Quote:</strong> #${ie}</p><p><strong>${d.firstName} ${d.lastName}</strong></p><table style="width:100%;border-collapse:collapse;margin-top:16px"><thead><tr style="background:#2c5530;color:#fff"><th style="padding:8px 12px;text-align:left">Material</th><th style="padding:8px 12px;text-align:right">Qty</th></tr></thead><tbody>${de}</tbody></table><p style="margin-top:24px;color:#666;font-size:12px">Generated ${new Date().toLocaleDateString()}</p></body></html>`,$e=new Blob([_e],{type:"text/html"}),Ee=await nn($e,"Material List"),Xe={name:`Material List - ${le}`,type:"pdf",url:Ee,notes:`${P.length} items | Quote #${ie}`,addedBy:T,addedAt:new Date().toISOString()};await O(Xe,["crew_files"],y),tt.success("Material List saved to Crew Files folder!")},saveDecorChecklistToFolder:async(y,w)=>{const d=w||F,P=rt.getQuoteNum(y),ie=rt.getHomeDesc(y);da({...y,...d},l),Xt.calculateQuoteTotals(y,d,l,u,h,S,j,k);const le=["lp_siding","tray_ceiling","full_backsplash","sets_of_drawers","meter_loop","drop_down_beam","lp_trim","amp_service_200"],de=Object.entries(y.selectedServices||{}).filter(([ot,Kt])=>Kt&&le.includes(ot)).map(([ot,Kt])=>{var Gn;const an=u[ot],gn=(Gn=y.serviceQuantities)==null?void 0:Gn[ot],$i=gn&&gn>1?` (×${gn})`:"";return an?`${an.name}${$i}`:ot});y.customOptions&&y.customOptions.length>0&&y.customOptions.forEach(ot=>{ot.name&&de.push(`${ot.name}${ot.price?` ($${ot.price})`:""}`)});const _e=y.foundationType||"none",$e={none:"Not selected",deck:"Deck Piers",crawl:"Crawl Space",crawlspace:"Crawl Space",basement:"Basement",slab:"Engineered Slab"},Ee=Xt.getBeamHeight(y),Xe=`<!DOCTYPE html><html><head><title>Decor Checklist - ${ie}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:40px 30px;max-width:900px;margin:0 auto;color:#333;background:#fff}
.header{text-align:center;border-bottom:3px solid #2c5530;padding-bottom:20px;margin-bottom:30px}
.logo{margin-bottom:15px}
.title{font-size:32px;font-weight:700;color:#2c5530;margin:10px 0}
.subtitle{font-size:14px;color:#666;margin:5px 0}
.section{margin-bottom:30px;page-break-inside:avoid}
.section h2{font-size:18px;color:#2c5530;border-bottom:2px solid #2c5530;padding-bottom:8px;margin:0 0 15px;text-transform:uppercase}
.form-row{margin-bottom:12px;display:flex;align-items:center;gap:10px}
.form-label{font-size:13px;font-weight:600;color:#333;min-width:180px}
input[type="text"]{border:none;border-bottom:2px solid #ccc;padding:6px 0;font-size:14px;flex:1;outline:none}
input[type="text"]:focus{border-bottom-color:#2c5530}
.radio-group{display:flex;gap:20px;align-items:center}
.radio-group label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}
.checkbox-group{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin:10px 0}
.checkbox-group label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}
.standards{background:#f8f9fa;padding:15px;border-left:4px solid #2c5530;margin:20px 0;font-size:12px}
.standards ul{margin:8px 0;padding-left:20px}
.standards li{padding:3px 0}
.signature-section{margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:30px}
.signature-box{border-bottom:2px solid #333;padding-top:40px;position:relative}
.signature-box label{position:absolute;top:0;font-size:12px;color:#666;font-weight:600}
.footer{margin-top:40px;padding-top:20px;border-top:2px solid #ddd;text-align:center;color:#999;font-size:12px}
@media print{body{padding:20px}.section{page-break-inside:avoid}}
</style></head><body>

<div class="header">
  <div class="logo">
    <img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:50px">
  </div>
  <div class="title">Modular/Manufactured Home Decor Checklist</div>
  <div class="subtitle">Quote #${P}</div>
  <div class="subtitle">Customer: ${d.firstName} ${d.lastName}</div>
  <div class="subtitle">Address: ${d.siteAddress}, ${d.siteCity}, ${d.siteState}</div>
</div>

<div style="margin-bottom:30px">
  <div class="form-row">
    <span class="form-label">Home Model:</span>
    <input type="text" value="${y.homeModel!=="NONE"?y.homeModel:""}" style="font-weight:700;font-size:16px">
  </div>
  <div class="form-row">
    <span class="form-label">House Size:</span>
    <input type="text" value="${y.houseWidth}' × ${y.houseLength}' ${y.singleDouble}" style="font-size:14px">
  </div>
  <div class="form-row">
    <span class="form-label">I-Beam:</span>
    <input type="text" value="${Ee}&quot;" style="font-size:14px">
  </div>
  <div class="form-row">
    <span class="form-label">Foundation:</span>
    <input type="text" value="${$e[_e]}" style="font-size:14px">
  </div>
  <div class="form-row">
    <span class="form-label">Drive Time:</span>
    <input type="text" value="${y.driveTime} mi" style="font-size:14px">
  </div>
</div>

<div class="section">
  <h2>Exterior</h2>
  <div class="form-row">
    <span class="form-label">Siding Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Trim Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Shingles Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Accent Siding? (Circle One)</span>
    <div class="radio-group">
      <label><input type="radio" name="accent"> Shakes</label>
      <label><input type="radio" name="accent"> Board Batten</label>
      <label style="flex:1">Color: <input type="text" value="" style="margin-left:10px"></label>
    </div>
  </div>
  <div class="form-row">
    <span class="form-label">Add 20' Dormer</span>
    <div class="radio-group">
      <label><input type="radio" name="dormer"> Yes</label>
      <label><input type="radio" name="dormer"> No</label>
    </div>
  </div>
  <div class="form-row">
    <span class="form-label">Add Siding Accent? (Circle One)</span>
    <div class="radio-group">
      <label><input type="radio" name="sidingAccent"> No</label>
      <label><input type="radio" name="sidingAccent"> Shakes</label>
      <label><input type="radio" name="sidingAccent"> Board Batten</label>
      <label><input type="radio" name="sidingAccent"> Siding</label>
    </div>
  </div>
  <div class="form-row">
    <span class="form-label" style="visibility:hidden">_</span>
    <span style="flex:1">Color: <input type="text" value="" style="margin-left:10px"></span>
  </div>
  <div class="form-row">
    <span class="form-label">Porch:</span>
    <div class="radio-group">
      <label><input type="radio" name="porch"> 6'</label>
      <label><input type="radio" name="porch"> 8'</label>
      <label><input type="radio" name="porch"> 10'</label>
      <label><input type="radio" name="porch"> No</label>
      <span style="margin-left:20px">Railing Color:</span>
      <label><input type="radio" name="railing"> Black</label>
      <label><input type="radio" name="railing"> White</label>
    </div>
  </div>
</div>

<div class="section">
  <h2>Kitchen (Samsung)</h2>
  <div class="form-row">
    <span class="form-label">Floor Type (Circle One):</span>
    <div class="radio-group">
      <label><input type="radio" name="kitchen_floor"> Vinyl</label>
      <label><input type="radio" name="kitchen_floor"> Hardwood</label>
    </div>
  </div>
  <div class="form-row">
    <span class="form-label">Cabinets Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Countertop Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Backsplash Color:</span>
    <input type="text" value="">
  </div>
</div>

<div class="section">
  <h2>Flooring</h2>
  <div class="form-row">
    <span class="form-label">Carpet Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Lino Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Whole Home Lino?</span>
    <div class="radio-group">
      <label><input type="radio" name="wholeHomeLino"> Yes</label>
      <label><input type="radio" name="wholeHomeLino"> No</label>
    </div>
  </div>
</div>

<div class="section">
  <h2>Bathrooms</h2>
  <div class="form-row">
    <span class="form-label">Shower Type:</span>
    <div class="radio-group">
      <label><input type="radio" name="shower"> Inert</label>
      <label><input type="radio" name="shower"> Walk In</label>
    </div>
  </div>
  <div class="form-row">
    <span class="form-label">Shower Tile:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Vanity Cabinet Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Vanity Countertop Color:</span>
    <input type="text" value="">
  </div>
</div>

<div class="section">
  <h2>Notes / Upgrades</h2>
  <p style="font-size:12px;color:#666;margin:0 0 10px">Include locations: <strong>Faucets, Outlets</strong> in or out, <strong>Additional Can Lights</strong> on layout.</p>
  <textarea style="width:100%;min-height:100px;border:2px solid #ccc;padding:10px;font-family:inherit;font-size:13px;border-radius:4px;outline:none" placeholder="Enter notes here..."></textarea>
</div>

${de.length>0?`<div class="standards"><h3 style="margin:0 0 10px;font-size:14px;color:#2c5530">Additional Options</h3><ul>${de.map(ot=>`<li>${ot}</li>`).join("")}</ul></div>`:""}

<div class="signature-section">
  <div class="signature-box">
    <label>Customer Signature:</label>
  </div>
  <div class="signature-box">
    <label>Rep:</label>
  </div>
</div>

<div class="footer">
  <p><strong>SHERMAN</strong></p>
  <p>2244 Hwy 65, Mora, MN 55051 | (320) 679-3438</p>
  <p>Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
</div>

</body></html>`,$t=new Blob([Xe],{type:"text/html"}),yt=await nn($t,"Decor Checklist"),mn={name:`Decor Checklist - ${ie}`,type:"pdf",url:yt,notes:`Quote #${P} | ${y.houseWidth}' × ${y.houseLength}' | ${$e[_e]}`,addedBy:T,addedAt:new Date().toISOString()};await O(mn,["clayton_docs"],y),tt.success("Decor Checklist saved to Clayton Docs folder!")},saveCustomerInfoToFolder:async(y,w)=>{const d=w||F,P=rt.getQuoteNum(y),ie=rt.getHomeDesc(y),le=`${d.siteAddress}, ${d.siteCity}, ${d.siteState} ${d.siteZip||""}`.trim(),de=encodeURIComponent(le),_e=`https://www.google.com/maps/search/?api=1&query=${de}`,$e=`https://maps.google.com/maps?q=${de}&t=k&z=17&output=embed`,Ee=`<!DOCTYPE html><html><head><title>Customer Info - ${d.firstName} ${d.lastName}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:900px;margin:0 auto;color:#333}
.header{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #2c5530;padding-bottom:15px;margin-bottom:25px}
.title{font-size:22px;font-weight:700;color:#2c5530}
.subtitle{font-size:13px;color:#666}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px}
.card{background:#f8f9fa;border:1px solid #ddd;border-radius:8px;padding:20px}
.card h3{margin:0 0 12px;font-size:15px;color:#2c5530;border-bottom:1px solid #ddd;padding-bottom:8px}
.row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee}
.row:last-child{border-bottom:none}
.label{font-size:12px;color:#888;text-transform:uppercase}
.value{font-weight:600;font-size:14px}
.map-section{margin-top:10px}
.map-section h3{font-size:15px;color:#2c5530;margin:0 0 10px;border-bottom:1px solid #ddd;padding-bottom:8px}
.map-link{display:inline-block;background:#2c5530;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;margin-bottom:15px}
.map-link:hover{background:#1a3a1f}
iframe{width:100%;height:400px;border:2px solid #ddd;border-radius:8px}
.footer{margin-top:20px;text-align:center;color:#999;font-size:11px}
@media print{body{padding:15px}iframe{height:300px}}
</style></head><body>
<div class="header">
  <div>
    <div class="title">${d.firstName} ${d.lastName}</div>
    <div class="subtitle">Customer Info Sheet | Quote #${P} - ${ie}</div>
  </div>
  <div style="text-align:right">
    <img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:35px">
  </div>
</div>
<div class="cards">
  <div class="card">
    <h3>Primary Contact</h3>
    <div class="row"><span class="label">Name</span><span class="value">${d.firstName} ${d.lastName}</span></div>
    <div class="row"><span class="label">Phone</span><span class="value"><a href="tel:${d.phone}">${d.phone||"N/A"}</a></span></div>
    ${d.phone2?`<div class="row"><span class="label">Phone 2</span><span class="value"><a href="tel:${d.phone2}">${d.phone2}</a></span></div>`:""}
    <div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${d.email}">${d.email||"N/A"}</a></span></div>
    ${d.email2?`<div class="row"><span class="label">Email 2</span><span class="value"><a href="mailto:${d.email2}">${d.email2}</a></span></div>`:""}
  </div>
  ${d.person2FirstName?`<div class="card">
    <h3>Secondary Contact</h3>
    <div class="row"><span class="label">Name</span><span class="value">${d.person2FirstName} ${d.person2LastName||""}</span></div>
    ${d.phone2?`<div class="row"><span class="label">Phone</span><span class="value"><a href="tel:${d.phone2}">${d.phone2}</a></span></div>`:""}
    ${d.email2?`<div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${d.email2}">${d.email2}</a></span></div>`:""}
  </div>`:`<div class="card">
    <h3>Mailing Address</h3>
    <div class="row"><span class="label">Address</span><span class="value">${d.mailingAddress||"Same as site"}</span></div>
    ${d.mailingCity?`<div class="row"><span class="label">City</span><span class="value">${d.mailingCity}, ${d.mailingState} ${d.mailingZip||""}</span></div>`:""}
  </div>`}
</div>
<div class="card" style="margin-bottom:25px">
  <h3>Job Site</h3>
  <div class="row"><span class="label">Address</span><span class="value">${d.siteAddress||"N/A"}</span></div>
  <div class="row"><span class="label">City / State</span><span class="value">${d.siteCity||""}, ${d.siteState||""} ${d.siteZip||""}</span></div>
  ${d.siteCounty?`<div class="row"><span class="label">County</span><span class="value">${d.siteCounty}</span></div>`:""}
</div>
<div class="map-section">
  <h3>Directions to Job Site</h3>
  <a class="map-link" href="${_e}" target="_blank">Open in Google Maps</a>
  <br>
  <iframe src="${$e}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
<div class="footer">Generated by SHERMAN Bidding System - ${new Date().toLocaleDateString()}</div>
</body></html>`,Xe=new Blob([Ee],{type:"text/html"}),$t=await nn(Xe,"Customer Info"),yt={name:`Customer Info - ${d.firstName} ${d.lastName}`,type:"pdf",url:$t,notes:`${le} | Quote #${P}`,addedBy:T,addedAt:new Date().toISOString()};await O(yt,["crew_files"],y),tt.success("Customer Info + Map saved to Crew Files!")},saveFloorPlanToFolders:async(y,w)=>{const d=L.find(le=>le.name===y.homeModel),P=d==null?void 0:d.floorPlanUrl;if(!P){tt.warning("No floor plan URL set for this home model. Add one in Pricing > Homes.");return}const ie={name:`Floor Plan - ${y.homeModel} (Clayton Website)`,type:"link",url:P,notes:`${y.houseWidth}'W × ${y.houseLength}'L ${y.singleDouble} Wide | Drag actual PDF here for direct access`,addedBy:T,addedAt:new Date().toISOString()};await O(ie,["clayton_docs","crew_files"],y),tt.success("Floor Plan link saved! Tip: For direct access, download the floor plan PDF from Clayton and drag it into this folder.")},saveScopeOfWorkToFolders:async(y,w)=>{const P=H(y,w||F,u),ie=`Scope_of_Work_${new Date().toLocaleDateString("en-US").replace(/\//g,"-")}.html`,le=new Blob([P],{type:"text/html"}),de=await nn(le,"Scope of Work"),_e={name:ie,type:"scope_of_work",url:de,notes:`Scope of Work for Quote #${rt.getQuoteNum(y)}`,addedBy:T,addedAt:new Date().toISOString()};return await O(_e,["change_orders"],y),_e},saveCrewWorkOrderToFolders:async(y,w)=>{const P=I(y,w||F,u),ie=`Crew_Work_Order_${new Date().toLocaleDateString("en-US").replace(/\//g,"-")}.html`,le=new Blob([P],{type:"text/html"}),de=await nn(le,"Change Order"),_e={name:ie,type:"crew_work_order",url:de,notes:`Crew Work Order for Quote #${rt.getQuoteNum(y)} - Internal use only`,addedBy:T,addedAt:new Date().toISOString()};return await O(_e,["crew_files"],y),_e},saveAllowanceProgressToFolders:async(y,w)=>{const d=w||F,P=Xt.calculateQuoteTotals(y,d,l,u,h,S,j,k),ie=v(y,d,P,u),le=`Allowance_Progress_${new Date().toLocaleDateString("en-US").replace(/\//g,"-")}.html`,de=new Blob([ie],{type:"text/html"}),_e=await nn(de,"Allowance Progress"),$e={name:le,type:"allowance_update",url:_e,notes:`Allowance progress update | Current balance: ${D(P.contingency)}`,addedBy:T,addedAt:new Date().toISOString()};await O($e,["change_orders"],y),tt.success("Allowance Progress Update saved! Document saved to Customer Docs folder. You can now share this with the customer.")},saveLatestChangeOrderToFolders:async(y,w)=>{const d=w||F,P=W.filter(Kt=>Kt.changeOrderOf===y.id);if(P.length===0){tt.warning("No change orders found for this quote.");return}const ie=P.sort((Kt,an)=>{if(Kt.changeOrderNum!==an.changeOrderNum)return(an.changeOrderNum||0)-(Kt.changeOrderNum||0);const gn=Kt.changeOrderVersion||"";return(an.changeOrderVersion||"").localeCompare(gn)})[0],le=Xt.calculateQuoteTotals(y,d,l,u,h,S,j,k),de=Xt.calculateQuoteTotals(ie,d,l,u,h,S,j,k),_e=ie.changeOrderDeletions||[],$e=ie.changeOrderAdjustments||{},Ee=ie.changeOrderAdditions||[],Xe=re(ie,y,{...d,customerId:d.id},de,le,l,u,h,S,j,k,_e,$e,Ee),$t=`Change_Order_#${ie.changeOrderNum}${ie.changeOrderVersion}_${new Date().toLocaleDateString("en-US").replace(/\//g,"-")}.html`,yt=new Blob([Xe],{type:"text/html"}),mn=await nn(yt,"Change Order Document"),ot={name:$t,type:"change_order",url:mn,notes:`Change Order #${ie.changeOrderNum}${ie.changeOrderVersion} | New Total: ${D(de.totalWithContingency)}`,addedBy:T,addedAt:new Date().toISOString()};await O(ot,["crew_files","change_orders"],y),tt.success(`Change Order #${ie.changeOrderNum}${ie.changeOrderVersion} saved!

Document saved to:
• Crew Files
• Customer Docs`)},saveAllDocsToFolders:async(y,w)=>{try{const d=w||F,P=Xt.calculateQuoteTotals(y,d,l,u,h,S,j,k),ie=rt.getQuoteNum(y),le=rt.getHomeDesc(y),de=L.find(Ve=>Ve.name===y.homeModel),_e=de==null?void 0:de.floorPlanUrl;let $e=0,Ee=Nn.getFolders(y);const Xe=R({...y,customerFirstName:d.firstName,customerLastName:d.lastName,phone:d.phone,email:d.email,siteAddress:d.siteAddress,siteCity:d.siteCity,siteState:d.siteState,siteZip:d.siteZip},P,L),$t=new Blob([Xe],{type:"text/html"}),yt=await nn($t,"Quote Document"),mn=Nn.createFileObject(`Quote #${ie} - ${le}`,"pdf",yt,`Total: ${D(P.total)} | Status: ${y.status}`,T);Ee.change_orders=[...(Ee.change_orders||[]).filter(Ve=>!Ve.name.startsWith(`Quote #${ie}`)),mn],$e++;const ot=$(y,d),Kt=new Blob([ot],{type:"text/html"}),an=await nn(Kt,"Pier Layout Document"),gn=Nn.createFileObject(`Pier Layout - ${le}`,"pdf",an,`${y.houseWidth}'W × ${y.houseLength}'L | I-Beam: ${Xt.getBeamHeight(y)}"`,T);Ee.crew_files=[...(Ee.crew_files||[]).filter(Ve=>!Ve.name.startsWith("Pier Layout")),gn],$e++;const $i=da({...y,...d},l),Gn=$i.map(Ve=>`<tr><td style="padding:6px 12px;border-bottom:1px solid #ddd">${Ve.item}</td><td style="padding:6px 12px;border-bottom:1px solid #ddd;text-align:right">${Ve.qty}</td></tr>`).join(""),Hi=`<!DOCTYPE html><html><head><title>Material List - ${le}</title></head><body style="font-family:Arial,sans-serif;max-width:700px;margin:40px auto;padding:20px"><h1 style="color:#2c5530;border-bottom:2px solid #2c5530;padding-bottom:8px">Material List</h1><p><strong>Home:</strong> ${le} &nbsp;|&nbsp; <strong>Quote:</strong> #${ie}</p><p><strong>${d.firstName} ${d.lastName}</strong></p><table style="width:100%;border-collapse:collapse;margin-top:16px"><thead><tr style="background:#2c5530;color:#fff"><th style="padding:8px 12px;text-align:left">Material</th><th style="padding:8px 12px;text-align:right">Qty</th></tr></thead><tbody>${Gn}</tbody></table><p style="margin-top:24px;color:#666;font-size:12px">Generated ${new Date().toLocaleDateString()}</p></body></html>`,Yn=new Blob([Hi],{type:"text/html"}),Hs=await nn(Yn,"Material List Document"),Er=Nn.createFileObject(`Material List - ${le}`,"pdf",Hs,`${$i.length} items | Quote #${ie}`,T);Ee.crew_files=[...(Ee.crew_files||[]).filter(Ve=>!Ve.name.startsWith("Material List")),Er],$e++;const On=`${d.siteAddress}, ${d.siteCity}, ${d.siteState} ${d.siteZip||""}`.trim(),Qi=encodeURIComponent(On),Rt=`https://www.google.com/maps/search/?api=1&query=${Qi}`,Ei=`https://maps.google.com/maps?q=${Qi}&t=k&z=17&output=embed`,pi=`<!DOCTYPE html><html><head><title>Customer Info - ${d.firstName} ${d.lastName}</title>
<style>body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:900px;margin:0 auto;color:#333}.header{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #2c5530;padding-bottom:15px;margin-bottom:25px}.title{font-size:22px;font-weight:700;color:#2c5530}.subtitle{font-size:13px;color:#666}.cards{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px}.card{background:#f8f9fa;border:1px solid #ddd;border-radius:8px;padding:20px}.card h3{margin:0 0 12px;font-size:15px;color:#2c5530;border-bottom:1px solid #ddd;padding-bottom:8px}.row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee}.row:last-child{border-bottom:none}.label{font-size:12px;color:#888;text-transform:uppercase}.value{font-weight:600;font-size:14px}.map-link{display:inline-block;background:#2c5530;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;margin-bottom:15px}iframe{width:100%;height:400px;border:2px solid #ddd;border-radius:8px}@media print{body{padding:15px}iframe{height:300px}}</style></head><body>
<div class="header"><div><div class="title">${d.firstName} ${d.lastName}</div><div class="subtitle">Customer Info | Quote #${ie} - ${le}</div></div><div style="text-align:right"><img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:35px"></div></div>
<div class="cards"><div class="card"><h3>Primary Contact</h3><div class="row"><span class="label">Name</span><span class="value">${d.firstName} ${d.lastName}</span></div><div class="row"><span class="label">Phone</span><span class="value"><a href="tel:${d.phone}">${d.phone||"N/A"}</a></span></div>${d.phone2?`<div class="row"><span class="label">Phone 2</span><span class="value"><a href="tel:${d.phone2}">${d.phone2}</a></span></div>`:""}<div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${d.email}">${d.email||"N/A"}</a></span></div>${d.email2?`<div class="row"><span class="label">Email 2</span><span class="value"><a href="mailto:${d.email2}">${d.email2}</a></span></div>`:""}</div>
<div class="card"><h3>Job Site</h3><div class="row"><span class="label">Address</span><span class="value">${d.siteAddress||"N/A"}</span></div><div class="row"><span class="label">City / State</span><span class="value">${d.siteCity||""}, ${d.siteState||""} ${d.siteZip||""}</span></div>${d.siteCounty?`<div class="row"><span class="label">County</span><span class="value">${d.siteCounty}</span></div>`:""}</div></div>
<div style="margin-bottom:25px"><h3 style="font-size:15px;color:#2c5530;margin:0 0 10px;border-bottom:1px solid #ddd;padding-bottom:8px">Directions to Job Site</h3><a class="map-link" href="${Rt}" target="_blank">Open in Google Maps</a><br><iframe src="${Ei}" allowfullscreen loading="lazy"></iframe></div>
<div style="text-align:center;color:#999;font-size:11px">Generated ${new Date().toLocaleDateString()}</div></body></html>`,zi=new Blob([pi],{type:"text/html"}),Zn=await nn(zi,"Customer Info Document"),Vi=Nn.createFileObject(`Customer Info - ${d.firstName} ${d.lastName}`,"pdf",Zn,`${On} | Quote #${ie}`,T);if(Ee.crew_files=[...(Ee.crew_files||[]).filter(Ve=>!Ve.name.startsWith("Customer Info")),Vi],$e++,_e){const Ve=Nn.createFileObject(`Floor Plan - ${y.homeModel} (Clayton Website)`,"link",_e,`${y.houseWidth}'W × ${y.houseLength}'L ${y.singleDouble} Wide`,T);Ee.clayton_docs=[...(Ee.clayton_docs||[]).filter(Nt=>!Nt.name.startsWith("Floor Plan")),{...Ve,id:Tn()}],Ee.crew_files=[...(Ee.crew_files||[]).filter(Nt=>!Nt.name.startsWith("Floor Plan")),{...Ve,id:Tn()}],$e++}const Jn=["lp_siding","tray_ceiling","full_backsplash","sets_of_drawers","meter_loop","drop_down_beam","lp_trim","amp_service_200"],ps=Object.entries(y.selectedServices||{}).filter(([Ve,Nt])=>Nt&&Jn.includes(Ve)).map(([Ve,Nt])=>{var Gs;const Xn=u[Ve],ii=(Gs=y.serviceQuantities)==null?void 0:Gs[Ve],Vs=ii&&ii>1?` (×${ii})`:"";return Xn?`${Xn.name}${Vs}`:Ve});y.customOptions&&y.customOptions.length>0&&y.customOptions.forEach(Ve=>{Ve.name&&ps.push(`${Ve.name}${Ve.price?` ($${Ve.price})`:""}`)});const Pt=y.foundationType||"none",us={none:"Not selected",deck:"Deck Piers",crawl:"Crawl Space",crawlspace:"Crawl Space",basement:"Basement",slab:"Engineered Slab"},vt=Xt.getBeamHeight(y),Zt=`<!DOCTYPE html><html><head><title>Decor Checklist - ${le}</title><style>body{font-family:'Segoe UI',Arial,sans-serif;padding:40px 30px;max-width:900px;margin:0 auto;color:#333;background:#fff}.header{text-align:center;border-bottom:3px solid #2c5530;padding-bottom:20px;margin-bottom:30px}.logo{margin-bottom:15px}.title{font-size:32px;font-weight:700;color:#2c5530;margin:10px 0}.subtitle{font-size:14px;color:#666;margin:5px 0}.section{margin-bottom:30px;page-break-inside:avoid}.section h2{font-size:18px;color:#2c5530;border-bottom:2px solid #2c5530;padding-bottom:8px;margin:0 0 15px;text-transform:uppercase}.form-row{margin-bottom:12px;display:flex;align-items:center;gap:10px}.form-label{font-size:13px;font-weight:600;color:#333;min-width:180px}input[type="text"]{border:none;border-bottom:2px solid #ccc;padding:6px 0;font-size:14px;flex:1;outline:none}input[type="text"]:focus{border-bottom-color:#2c5530}.radio-group{display:flex;gap:20px;align-items:center}.radio-group label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}.checkbox-group{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin:10px 0}.checkbox-group label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}.standards{background:#f8f9fa;padding:15px;border-left:4px solid #2c5530;margin:20px 0;font-size:12px}.standards ul{margin:8px 0;padding-left:20px}.standards li{padding:3px 0}.signature-section{margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:30px}.signature-box{border-bottom:2px solid #333;padding-top:40px;position:relative}.signature-box label{position:absolute;top:0;font-size:12px;color:#666;font-weight:600}.footer{margin-top:40px;padding-top:20px;border-top:2px solid #ddd;text-align:center;color:#999;font-size:12px}@media print{body{padding:20px}.section{page-break-inside:avoid}}</style></head><body><div class="header"><div class="logo"><img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:50px"></div><div class="title">Modular/Manufactured Home Decor Checklist</div><div class="subtitle">Quote #${ie}</div><div class="subtitle">Customer: ${d.firstName} ${d.lastName}</div><div class="subtitle">Address: ${d.siteAddress}, ${d.siteCity}, ${d.siteState}</div></div><div style="margin-bottom:30px"><div class="form-row"><span class="form-label">Home Model:</span><input type="text" value="${y.homeModel!=="NONE"?y.homeModel:""}" style="font-weight:700;font-size:16px"></div><div class="form-row"><span class="form-label">House Size:</span><input type="text" value="${y.houseWidth}' × ${y.houseLength}' ${y.singleDouble}" style="font-size:14px"></div><div class="form-row"><span class="form-label">I-Beam:</span><input type="text" value="${vt}&quot;" style="font-size:14px"></div><div class="form-row"><span class="form-label">Foundation:</span><input type="text" value="${us[Pt]}" style="font-size:14px"></div><div class="form-row"><span class="form-label">Drive Time:</span><input type="text" value="${y.driveTime} mi" style="font-size:14px"></div></div><div class="section"><h2>Exterior</h2><div class="form-row"><span class="form-label">Siding Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Trim Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Shingles Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Accent Siding? (Circle One)</span><div class="radio-group"><label><input type="radio" name="accent"> Shakes</label><label><input type="radio" name="accent"> Board Batten</label><label style="flex:1">Color: <input type="text" value="" style="margin-left:10px"></label></div></div><div class="form-row"><span class="form-label">Add 20' Dormer</span><div class="radio-group"><label><input type="radio" name="dormer"> Yes</label><label><input type="radio" name="dormer"> No</label></div></div><div class="form-row"><span class="form-label">Add Siding Accent? (Circle One)</span><div class="radio-group"><label><input type="radio" name="sidingAccent"> No</label><label><input type="radio" name="sidingAccent"> Shakes</label><label><input type="radio" name="sidingAccent"> Board Batten</label><label><input type="radio" name="sidingAccent"> Siding</label></div></div><div class="form-row"><span class="form-label" style="visibility:hidden">_</span><span style="flex:1">Color: <input type="text" value="" style="margin-left:10px"></span></div><div class="form-row"><span class="form-label">Porch:</span><div class="radio-group"><label><input type="radio" name="porch"> 6'</label><label><input type="radio" name="porch"> 8'</label><label><input type="radio" name="porch"> 10'</label><label><input type="radio" name="porch"> No</label><span style="margin-left:20px">Railing Color:</span><label><input type="radio" name="railing"> Black</label><label><input type="radio" name="railing"> White</label></div></div></div><div class="section"><h2>Kitchen (Samsung)</h2><div class="form-row"><span class="form-label">Floor Type (Circle One):</span><div class="radio-group"><label><input type="radio" name="kitchen_floor"> Vinyl</label><label><input type="radio" name="kitchen_floor"> Hardwood</label></div></div><div class="form-row"><span class="form-label">Cabinets Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Countertop Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Backsplash Color:</span><input type="text" value=""></div></div><div class="section"><h2>Flooring</h2><div class="form-row"><span class="form-label">Carpet Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Lino Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Whole Home Lino?</span><div class="radio-group"><label><input type="radio" name="wholeHomeLino"> Yes</label><label><input type="radio" name="wholeHomeLino"> No</label></div></div></div><div class="section"><h2>Bathrooms</h2><div class="form-row"><span class="form-label">Shower Type:</span><div class="radio-group"><label><input type="radio" name="shower"> Inert</label><label><input type="radio" name="shower"> Walk In</label></div></div><div class="form-row"><span class="form-label">Shower Tile:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Vanity Cabinet Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Vanity Countertop Color:</span><input type="text" value=""></div></div><div class="section"><h2>Notes / Upgrades</h2><p style="font-size:12px;color:#666;margin:0 0 10px">Include locations: <strong>Faucets, Outlets</strong> in or out, <strong>Additional Can Lights</strong> on layout.</p><textarea style="width:100%;min-height:100px;border:2px solid #ccc;padding:10px;font-family:inherit;font-size:13px;border-radius:4px;outline:none" placeholder="Enter notes here..."></textarea></div>${ps.length>0?`<div class="standards"><h3 style="margin:0 0 10px;font-size:14px;color:#2c5530">Additional Options</h3><ul>${ps.map(Ve=>`<li>${Ve}</li>`).join("")}</ul></div>`:""}<div class="signature-section"><div class="signature-box"><label>Customer Signature:</label></div><div class="signature-box"><label>Rep:</label></div></div><div class="footer"><p><strong>SHERMAN</strong></p><p>2244 Hwy 65, Mora, MN 55051 | (320) 679-3438</p><p>Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p></div></body></html>`,ui=new Blob([Zt],{type:"text/html"}),Qs=await nn(ui,"Decor Checklist Document"),fi=Nn.createFileObject(`Decor Checklist - ${le}`,"pdf",Qs,`Quote #${ie} | ${y.houseWidth}' × ${y.houseLength}' | ${us[Pt]}`,T);Ee.clayton_docs=[...(Ee.clayton_docs||[]).filter(Ve=>!Ve.name.startsWith("Decor Checklist")),fi],$e++;const Di=I(y,d,u),In=new Blob([Di],{type:"text/html"}),zr=await nn(In,"Crew Work Order"),Ai=Nn.createFileObject(`Crew Work Order - ${le}`,"crew_work_order",zr,`Quote #${ie} - Internal use only`,T);Ee.crew_files=[...(Ee.crew_files||[]).filter(Ve=>!Ve.name.startsWith("Crew Work Order")),Ai],$e++;const Dr=H(y,d,u),xn=new Blob([Dr],{type:"text/html"}),fs=await nn(xn,"Scope of Work"),_i=Nn.createFileObject(`Scope of Work - ${le}`,"scope_of_work",fs,`Quote #${ie} | ${d.firstName} ${d.lastName}`,T);Ee.change_orders=[...(Ee.change_orders||[]).filter(Ve=>!Ve.name.startsWith("Scope of Work")&&!Ve.name.startsWith("Scope_of_Work")),_i],$e++;const Gi=Ve=>{const Nt=new Map;for(const Xn of Ve)Nt.set(Xn.name,Xn);return Array.from(Nt.values())};Object.keys(Ee).forEach(Ve=>{Ee[Ve]=Gi(Ee[Ve]||[])});const ni={...y,folders:Ee},Yi=W.find(Ve=>Ve.id===y.id),Rn=E.find(Ve=>Ve.id===y.id);if(Yi){const Ve=W.map(Nt=>Nt.id===y.id?ni:Nt);await oe(Ve),(z==null?void 0:z.id)===y.id&&J(ni)}else if(Rn){const Ve=E.map(Nt=>Nt.id===y.id?ni:Nt);await ee(Ve),(V==null?void 0:V.id)===y.id&&Y(ni)}tt.success(`Saved ${$e} documents to folders!${_e?"":`
⚠️ No floor plan URL - add one in Pricing > Homes.`}`)}catch(d){console.error("Save All Docs Error:",d),tt.error("Error updating files: "+d.message)}},saveManufacturedHomeDocToContracts:async(y,w,d)=>{const P=d||F,ie=P?`${P.firstName||""} ${P.lastName||""}`.trim():"",de={contract:{fn:Ef,name:"MH Purchase & Installation Contract"},formaldehyde:{fn:zf,name:"MH Formaldehyde Disclosure"},guide:{fn:Df,name:"MH Homeowner's Guide"},warranty:{fn:Af,name:"MH Warranty Statement"}}[y];if(!de){tt.error("Unknown document type: "+y);return}const _e=de.fn(w,P),$e=new Blob([_e],{type:"text/html"}),Ee=await nn($e,de.name),Xe={name:`${de.name}${ie?" - "+ie:""}`,type:"pdf",url:Ee,notes:`Generated ${new Date().toLocaleDateString()}`,addedBy:T,addedAt:new Date().toISOString()};await O(Xe,["contracts"],w),tt.success(`${de.name} saved to Contracts folder!`)}}};class Tf extends cs.Component{constructor(u){super(u),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(u){return{hasError:!0}}componentDidCatch(u,h){this.setState({error:u,errorInfo:h}),console.error("ErrorBoundary caught:",u,h)}render(){return this.state.hasError?n.jsxs("div",{style:{padding:40,maxWidth:600,margin:"40px auto",background:"#fff",borderRadius:8,boxShadow:"0 2px 8px rgba(0,0,0,0.1)"},children:[n.jsx("h1",{style:{color:"#dc3545",marginTop:0},children:"⚠️ Something Went Wrong"}),n.jsx("p",{style:{color:"#666",lineHeight:1.6},children:"The application encountered an unexpected error. Please try refreshing the page."}),n.jsxs("details",{style:{marginTop:20,padding:12,background:"#f8f9fa",borderRadius:4,fontSize:12,fontFamily:"monospace"},children:[n.jsx("summary",{style:{cursor:"pointer",fontWeight:600,marginBottom:8},children:"Error Details"}),n.jsxs("pre",{style:{margin:0,whiteSpace:"pre-wrap",wordBreak:"break-word"},children:[this.state.error&&this.state.error.toString(),this.state.errorInfo&&this.state.errorInfo.componentStack]})]}),n.jsx("button",{onClick:()=>window.location.reload(),style:{marginTop:20,padding:"12px 24px",background:"#2c5530",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontSize:14,fontWeight:600},children:"Refresh Page"})]}):this.props.children}}const no=({serviceKey:l,customerNote:u,crewNote:h,isExpanded:S,onToggleExpand:j,onUpdateCustomerNote:k,onUpdateCrewNote:L,publishedCustomerNotes:T=[],publishedCrewNotes:W=[],onPublishCustomerNote:E,onPublishCrewNote:z,onEditCustomerNote:V,onEditCrewNote:F,onDeleteCustomerNote:J,onDeleteCrewNote:Y,userName:oe="User"})=>{const[ee,R]=cs.useState(!1),$=H=>new Date(H).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"});return n.jsxs("div",{style:{marginTop:12,display:"flex",flexDirection:"column",gap:12},children:[n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"#e3f2fd",borderRadius:"4px 4px 0 0",cursor:"pointer",userSelect:"none"},onClick:()=>j(l),children:[n.jsxs("span",{style:{fontSize:13,fontWeight:600,color:"#1565c0"},children:["📋 Customer Note (shows on quote & scope of work) ",T.length>0&&`(${T.length} published)`]}),n.jsx("span",{style:{fontSize:16,color:"#1565c0"},children:S?"▼":"▶"})]}),S&&n.jsxs("div",{style:{border:"1px solid #90caf9",borderTop:"none",borderRadius:"0 0 4px 4px"},children:[n.jsx("textarea",{style:{width:"100%",minHeight:100,padding:12,fontSize:14,fontFamily:"inherit",border:"none",borderBottom:u?"1px solid #90caf9":"none",borderRadius:0,resize:"vertical"},placeholder:"Add notes visible to customer...",value:u||"",onChange:H=>k(l,H.target.value)}),u&&n.jsx("div",{style:{padding:"8px 12px",background:"#f5f5f5",display:"flex",justifyContent:"flex-end"},children:n.jsx("button",{onClick:()=>E(l),style:{padding:"6px 16px",background:"#1565c0",color:"#fff",border:"none",borderRadius:4,fontSize:13,fontWeight:600,cursor:"pointer"},children:"📤 Publish Note"})}),T.length>0&&n.jsxs("div",{style:{padding:12,background:"#f9f9f9",borderTop:"1px solid #90caf9"},children:[n.jsx("div",{style:{fontSize:12,fontWeight:600,color:"#1565c0",marginBottom:8},children:"Published Notes:"}),T.map((H,I)=>n.jsxs("div",{style:{padding:8,background:"#fff",borderRadius:4,marginBottom:6,border:"1px solid #e3f2fd"},children:[n.jsx("div",{style:{fontSize:13,lineHeight:1.5,marginBottom:4},children:H.text}),n.jsxs("div",{style:{fontSize:11,color:"#999",marginBottom:6},children:[$(H.publishedAt)," by ",H.publishedBy]}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{onClick:()=>V(l,I),style:{padding:"4px 12px",background:"#1976d2",color:"#fff",border:"none",borderRadius:3,fontSize:11,fontWeight:600,cursor:"pointer"},children:"✏️ Edit"}),n.jsx("button",{onClick:()=>{window.confirm("Delete this published note?")&&J(l,I)},style:{padding:"4px 12px",background:"#d32f2f",color:"#fff",border:"none",borderRadius:3,fontSize:11,fontWeight:600,cursor:"pointer"},children:"🗑️ Delete"})]})]},I))]})]}),!S&&u&&n.jsxs("div",{style:{padding:8,fontSize:12,color:"#666",background:"#f5f5f5",borderRadius:"0 0 4px 4px",fontStyle:"italic"},children:[u.slice(0,60),u.length>60?"...":""]})]}),n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"#fff3e0",borderRadius:"4px 4px 0 0",cursor:"pointer",userSelect:"none"},onClick:()=>R(!ee),children:[n.jsxs("span",{style:{fontSize:13,fontWeight:600,color:"#e65100"},children:["🔧 Internal Crew Note (staff only - not visible to customer) ",W.length>0&&`(${W.length} published)`]}),n.jsx("span",{style:{fontSize:16,color:"#e65100"},children:ee?"▼":"▶"})]}),ee&&n.jsxs("div",{style:{border:"1px solid #ffb74d",borderTop:"none",borderRadius:"0 0 4px 4px"},children:[n.jsx("textarea",{style:{width:"100%",minHeight:100,padding:12,fontSize:14,fontFamily:"inherit",border:"none",borderBottom:h?"1px solid #ffb74d":"none",borderRadius:0,resize:"vertical"},placeholder:"Add internal notes for crew...",value:h||"",onChange:H=>L(l,H.target.value)}),h&&n.jsx("div",{style:{padding:"8px 12px",background:"#f5f5f5",display:"flex",justifyContent:"flex-end"},children:n.jsx("button",{onClick:()=>z(l),style:{padding:"6px 16px",background:"#e65100",color:"#fff",border:"none",borderRadius:4,fontSize:13,fontWeight:600,cursor:"pointer"},children:"📤 Publish Note"})}),W.length>0&&n.jsxs("div",{style:{padding:12,background:"#f9f9f9",borderTop:"1px solid #ffb74d"},children:[n.jsx("div",{style:{fontSize:12,fontWeight:600,color:"#e65100",marginBottom:8},children:"Published Notes:"}),W.map((H,I)=>n.jsxs("div",{style:{padding:8,background:"#fff",borderRadius:4,marginBottom:6,border:"1px solid #fff3e0"},children:[n.jsx("div",{style:{fontSize:13,lineHeight:1.5,marginBottom:4},children:H.text}),n.jsxs("div",{style:{fontSize:11,color:"#999",marginBottom:6},children:[$(H.publishedAt)," by ",H.publishedBy]}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{onClick:()=>F(l,I),style:{padding:"4px 12px",background:"#f57c00",color:"#fff",border:"none",borderRadius:3,fontSize:11,fontWeight:600,cursor:"pointer"},children:"✏️ Edit"}),n.jsx("button",{onClick:()=>{window.confirm("Delete this published note?")&&Y(l,I)},style:{padding:"4px 12px",background:"#d32f2f",color:"#fff",border:"none",borderRadius:3,fontSize:11,fontWeight:600,cursor:"pointer"},children:"🗑️ Delete"})]})]},I))]})]}),!ee&&h&&n.jsxs("div",{style:{padding:8,fontSize:12,color:"#666",background:"#f5f5f5",borderRadius:"0 0 4px 4px",fontStyle:"italic"},children:[h.slice(0,60),h.length>60?"...":""]})]})]})},Yd=({quote:l})=>{var Ae;const u=parseFloat(l.houseWidth)||28,h=parseFloat(l.houseLength)||56,S=l.iBeamHeight||Ci(h),j=((Ae=l.singleDouble)==null?void 0:Ae.toLowerCase())==="double",k=S>=11?20:22,L=ro.CANTILEVER,T=h-L*2,W=ro.SPACING.OUTER_BEAMS,E=ro.SPACING.MARRIAGE_LINE,z=Math.ceil(T/W)+1,V=T/(z-1),F=j?Math.ceil(T/E)+1:0,J=j?T/(F-1):0,Y=5,oe=60,ee=70,R=80,$=h*Y+oe+40,H=u*Y+ee+R,I=oe,v=ee,re=oe+L*Y,O=[],te=[],ze=[],ne=[],ye=[];for(let Ne=0;Ne<z;Ne++){const A=Ne*V,pe=re+A*Y;O.push({x:pe,y:v,dist:L+A}),ye.push({x:pe,y:v+u*Y,dist:L+A})}if(j){for(let Ne=0;Ne<z;Ne++){const A=Ne*V,pe=re+A*Y;te.push({x:pe,y:v+u/4*Y,dist:L+A}),ne.push({x:pe,y:v+3*u/4*Y,dist:L+A})}for(let Ne=0;Ne<F;Ne++){const A=Ne*J,pe=re+A*Y;ze.push({x:pe,y:v+u/2*Y,dist:L+A})}}const ve=O.length+te.length+ze.length+ne.length+ye.length,ce=Ne=>{const A=Math.floor(Ne),pe=Math.round((Ne-A)*12);return`${A}'-${pe}"`};return n.jsxs("div",{style:{background:"#f8f9fa",padding:16,borderRadius:8,marginTop:16},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[n.jsxs("div",{children:[n.jsx("h4",{style:{margin:"0 0 4px",color:"#2c5530",fontSize:14},children:"📐 Pier Layout"}),n.jsx("p",{style:{margin:0,fontSize:12,color:"#666"},children:l.homeModel!=="NONE"?l.homeModel:`${u}' × ${h}'`})]}),n.jsxs("div",{style:{textAlign:"right",fontSize:11},children:[n.jsxs("div",{children:[n.jsxs("strong",{children:[k,'"']})," Piers @ 6' o/c ",j&&n.jsxs(n.Fragment,{children:[n.jsx("span",{children:" • "}),n.jsx("strong",{children:'32"'})," Marriage @ 12' o/c"]})]}),n.jsxs("div",{style:{color:"#666"},children:[ve," total piers • ",S,'" I-Beam']})]})]}),n.jsxs("div",{style:{background:"#fff",border:"1px solid #ddd",borderRadius:4,padding:16,marginBottom:16},children:[n.jsx("h5",{style:{margin:"0 0 8px",fontSize:12,color:"#666",textAlign:"center"},children:"CROSS-SECTION VIEW"}),n.jsxs("svg",{width:"100%",viewBox:"0 0 700 390",children:[n.jsx("rect",{x:"50",y:"255",width:"600",height:"40",fill:"#8B4513",stroke:"#5D3A1A",strokeWidth:"2"}),n.jsx("text",{x:"350",y:"280",textAnchor:"middle",fontSize:"12",fill:"#fff",fontWeight:"bold",children:"GROUND"}),n.jsx("rect",{x:"95",y:"215",width:"40",height:"40",fill:"#A0A0A0",stroke:"#666",strokeWidth:"2"}),n.jsx("rect",{x:"565",y:"215",width:"40",height:"40",fill:"#A0A0A0",stroke:"#666",strokeWidth:"2"}),n.jsx("rect",{x:"135",y:"215",width:"430",height:"30",fill:"#A0A0A0",stroke:"#666",strokeWidth:"2"}),n.jsx("rect",{x:"135",y:"245",width:"430",height:"10",fill:"#8B4513",stroke:"none"}),n.jsx("polygon",{points:`350,${215-k*5} 290,215 410,215`,fill:"#2c5530",stroke:"#1a3a1f",strokeWidth:"2"}),n.jsx("rect",{x:"338",y:215-k*5-5,width:"24",height:"5",fill:"#444",stroke:"#222",strokeWidth:"1"}),n.jsx("rect",{x:"270",y:215-k*5-5-S*5,width:"160",height:"12",fill:"#8B4513",stroke:"#5D3A1A",strokeWidth:"2"}),n.jsx("rect",{x:"338",y:215-k*5-5-S*5+12,width:"24",height:S*5-24,fill:"#8B4513",stroke:"#5D3A1A",strokeWidth:"2"}),n.jsx("rect",{x:"270",y:215-k*5-5-12,width:"160",height:"12",fill:"#8B4513",stroke:"#5D3A1A",strokeWidth:"2"}),n.jsx("rect",{x:"82",y:215-k*5-5-S*5-5-25,width:"536",height:"25",fill:"#DEB887",stroke:"#8B4513",strokeWidth:"2"}),n.jsx("text",{x:"350",y:215-k*5-5-S*5-5-9,textAnchor:"middle",fontSize:"12",fill:"#333",fontWeight:"bold",children:"HOUSE FLOOR"}),n.jsx("rect",{x:"65",y:215-k*5-5-S*5-5-25,width:"17",height:"45",fill:"#1565C0",stroke:"#0D47A1",strokeWidth:"2"}),n.jsx("rect",{x:"618",y:215-k*5-5-S*5-5-25,width:"17",height:"45",fill:"#1565C0",stroke:"#0D47A1",strokeWidth:"2"}),n.jsx("rect",{x:"97",y:215-k*5-S*5,width:"20",height:k*5+S*5,fill:"#707070",stroke:"#505050",strokeWidth:"2"}),n.jsx("rect",{x:"583",y:215-k*5-S*5,width:"20",height:k*5+S*5,fill:"#707070",stroke:"#505050",strokeWidth:"2"}),n.jsx("text",{x:"40",y:215-k*5-5-S*5-35,textAnchor:"start",fontSize:"11",fill:"#1565C0",fontWeight:"bold",children:"SIDING"}),n.jsx("line",{x1:"670",y1:215-k*5-S*5,x2:"670",y2:"215",stroke:"#707070",strokeWidth:"2"}),n.jsx("line",{x1:"663",y1:215-k*5-S*5,x2:"677",y2:215-k*5-S*5,stroke:"#707070",strokeWidth:"2"}),n.jsx("line",{x1:"663",y1:"215",x2:"677",y2:"215",stroke:"#707070",strokeWidth:"2"}),n.jsx("text",{x:"682",y:215-(k*5+S*5)/2+5,textAnchor:"start",fontSize:"14",fontWeight:"bold",fill:"#707070",children:'32"'}),n.jsx("line",{x1:"445",y1:215-k*5-5-S*5,x2:"460",y2:215-k*5-5-S*5,stroke:"#8B4513",strokeWidth:"1"}),n.jsx("line",{x1:"445",y1:215-k*5-5,x2:"460",y2:215-k*5-5,stroke:"#8B4513",strokeWidth:"1"}),n.jsx("line",{x1:"455",y1:215-k*5-5-S*5,x2:"455",y2:215-k*5-5,stroke:"#8B4513",strokeWidth:"1"}),n.jsxs("text",{x:"465",y:215-k*5-5-S*2.5+4,textAnchor:"start",fontSize:"12",fill:"#8B4513",fontWeight:"bold",children:["I-BEAM ",S,'"']}),n.jsx("text",{x:"200",y:215-k*5-2,textAnchor:"start",fontSize:"12",fill:"#333",fontWeight:"bold",children:'BOLT 1"'}),n.jsx("line",{x1:"250",y1:215-k*5-3,x2:"335",y2:215-k*5-3,stroke:"#333",strokeWidth:"1",strokeDasharray:"3,2"}),n.jsx("line",{x1:"425",y1:215-k*5,x2:"500",y2:215-k*5,stroke:"#2c5530",strokeWidth:"1"}),n.jsx("line",{x1:"425",y1:"215",x2:"500",y2:"215",stroke:"#2c5530",strokeWidth:"1"}),n.jsx("line",{x1:"490",y1:215-k*5,x2:"490",y2:"215",stroke:"#2c5530",strokeWidth:"1"}),n.jsxs("text",{x:"505",y:215-k*2.5+4,textAnchor:"start",fontSize:"12",fill:"#2c5530",fontWeight:"bold",children:["PIER ",k,'"']}),n.jsx("rect",{x:"100",y:"315",width:"500",height:"45",fill:"#f5f5f5",stroke:"#ccc",strokeWidth:"1",rx:"4"}),n.jsx("text",{x:"350",y:"333",textAnchor:"middle",fontSize:"11",fontWeight:"bold",fill:"#333",children:"LEGEND"}),n.jsx("rect",{x:"115",y:"342",width:"18",height:"12",fill:"#DEB887",stroke:"#8B4513",strokeWidth:"1"}),n.jsx("text",{x:"137",y:"352",fontSize:"10",fill:"#333",children:"Floor"}),n.jsx("rect",{x:"185",y:"342",width:"18",height:"12",fill:"#1565C0",stroke:"#0D47A1",strokeWidth:"1"}),n.jsx("text",{x:"207",y:"352",fontSize:"10",fill:"#333",children:"Siding"}),n.jsx("rect",{x:"265",y:"342",width:"18",height:"12",fill:"#707070",stroke:"#505050",strokeWidth:"1"}),n.jsx("text",{x:"287",y:"352",fontSize:"10",fill:"#333",children:"Skirting"}),n.jsx("rect",{x:"350",y:"342",width:"18",height:"12",fill:"#2c5530",stroke:"#1a3a1f",strokeWidth:"1"}),n.jsx("text",{x:"372",y:"352",fontSize:"10",fill:"#333",children:"Pier"}),n.jsx("rect",{x:"415",y:"342",width:"18",height:"12",fill:"#8B4513",stroke:"#5D3A1A",strokeWidth:"1"}),n.jsx("text",{x:"437",y:"352",fontSize:"10",fill:"#333",children:"I-Beam"}),n.jsx("rect",{x:"495",y:"342",width:"18",height:"12",fill:"#A0A0A0",stroke:"#666",strokeWidth:"1"}),n.jsx("text",{x:"517",y:"352",fontSize:"10",fill:"#333",children:"Slab"}),n.jsx("rect",{x:"560",y:"342",width:"18",height:"12",fill:"#8B4513",stroke:"#5D3A1A",strokeWidth:"1"}),n.jsx("text",{x:"582",y:"352",fontSize:"10",fill:"#333",children:"Ground"})]})]}),n.jsx("h5",{style:{margin:"0 0 8px",fontSize:12,color:"#666"},children:"PLAN VIEW"}),n.jsxs("svg",{width:"100%",viewBox:`0 0 ${$} ${H}`,style:{background:"#fff",borderRadius:4,border:"1px solid #ddd"},children:[n.jsx("rect",{x:I,y:v,width:h*Y,height:u*Y,fill:"none",stroke:"#333",strokeWidth:"2"}),n.jsx("line",{x1:re,y1:v,x2:re+T*Y,y2:v,stroke:"#333",strokeWidth:"1"}),j&&n.jsx("line",{x1:re,y1:v+u/4*Y,x2:re+T*Y,y2:v+u/4*Y,stroke:"#333",strokeWidth:"1"}),j&&n.jsx("line",{x1:re,y1:v+u/2*Y,x2:re+T*Y,y2:v+u/2*Y,stroke:"#333",strokeWidth:"1.5",strokeDasharray:"6,3"}),j&&n.jsx("line",{x1:re,y1:v+3*u/4*Y,x2:re+T*Y,y2:v+3*u/4*Y,stroke:"#333",strokeWidth:"1"}),n.jsx("line",{x1:re,y1:v+u*Y,x2:re+T*Y,y2:v+u*Y,stroke:"#333",strokeWidth:"1"}),O.map((Ne,A)=>n.jsx("g",{children:n.jsx("rect",{x:Ne.x-6,y:Ne.y-6,width:"12",height:"12",fill:"none",stroke:"#333",strokeWidth:"1.5"})},`h1o-${A}`)),te.map((Ne,A)=>n.jsx("g",{children:n.jsx("rect",{x:Ne.x-6,y:Ne.y-6,width:"12",height:"12",fill:"none",stroke:"#333",strokeWidth:"1.5"})},`h1i-${A}`)),ze.map((Ne,A)=>n.jsx("g",{children:n.jsx("rect",{x:Ne.x-6,y:Ne.y-6,width:"12",height:"12",fill:"#333",stroke:"#333",strokeWidth:"1.5"})},`mar-${A}`)),ne.map((Ne,A)=>n.jsx("g",{children:n.jsx("rect",{x:Ne.x-6,y:Ne.y-6,width:"12",height:"12",fill:"none",stroke:"#333",strokeWidth:"1.5"})},`h2i-${A}`)),ye.map((Ne,A)=>n.jsx("g",{children:n.jsx("rect",{x:Ne.x-6,y:Ne.y-6,width:"12",height:"12",fill:"none",stroke:"#333",strokeWidth:"1.5"})},`h2o-${A}`)),n.jsx("line",{x1:I,y1:v-30,x2:I+h*Y,y2:v-30,stroke:"#333",strokeWidth:"1"}),n.jsx("line",{x1:I,y1:v-35,x2:I,y2:v-25,stroke:"#333",strokeWidth:"1"}),O.map((Ne,A)=>n.jsxs("g",{children:[n.jsx("line",{x1:Ne.x,y1:v-35,x2:Ne.x,y2:v-25,stroke:"#333",strokeWidth:"1"}),A<O.length-1&&n.jsx("text",{x:(Ne.x+O[A+1].x)/2,y:v-40,textAnchor:"middle",fontSize:"9",children:ce(V)})]},`dim-${A}`)),n.jsx("line",{x1:I+h*Y,y1:v-35,x2:I+h*Y,y2:v-25,stroke:"#333",strokeWidth:"1"}),n.jsxs("text",{x:I+L*Y/2,y:v-42,textAnchor:"middle",fontSize:"8",fill:"#666",children:[L,`'-0"`]}),n.jsxs("text",{x:I+h*Y-L*Y/2,y:v-42,textAnchor:"middle",fontSize:"8",fill:"#666",children:[L,`'-0"`]}),n.jsxs("text",{x:I+h*Y/2,y:v-52,textAnchor:"middle",fontSize:"11",fontWeight:"bold",children:[h,`'-0"`]}),n.jsx("line",{x1:I+h*Y+15,y1:v,x2:I+h*Y+15,y2:v+u*Y,stroke:"#333",strokeWidth:"1"}),n.jsx("line",{x1:I+h*Y+10,y1:v,x2:I+h*Y+20,y2:v,stroke:"#333",strokeWidth:"1"}),n.jsx("line",{x1:I+h*Y+10,y1:v+u*Y,x2:I+h*Y+20,y2:v+u*Y,stroke:"#333",strokeWidth:"1"}),j&&n.jsx("line",{x1:I+h*Y+10,y1:v+u/2*Y,x2:I+h*Y+20,y2:v+u/2*Y,stroke:"#333",strokeWidth:"1"}),j?n.jsxs(n.Fragment,{children:[n.jsx("text",{x:I+h*Y+25,y:v+u/4*Y+4,textAnchor:"start",fontSize:"9",children:"HALF 1"}),n.jsx("text",{x:I+h*Y+25,y:v+3*u/4*Y+4,textAnchor:"start",fontSize:"9",children:"HALF 2"})]}):n.jsxs("text",{x:I+h*Y+25,y:v+u/2*Y+4,textAnchor:"start",fontSize:"10",fontWeight:"bold",children:[u,`'-0"`]}),n.jsxs("text",{x:I+h*Y/2,y:v+u*Y+20,textAnchor:"middle",fontSize:"10",children:[k,'" Piers: ',V.toFixed(1),"' o/c",j&&` | 32" Marriage Piers: ${J.toFixed(1)}' o/c`]}),n.jsx("text",{x:I-5,y:v+4,textAnchor:"end",fontSize:"8",fill:"#666",children:"Half 1"}),j&&n.jsx("text",{x:I-5,y:v+u/2*Y+4,textAnchor:"end",fontSize:"8",fill:"#666",children:"Marriage"}),n.jsx("text",{x:I-5,y:v+u*Y+4,textAnchor:"end",fontSize:"8",fill:"#666",children:"Half 2"})]}),n.jsxs("div",{style:{display:"flex",gap:16,marginTop:12,fontSize:11,color:"#666",flexWrap:"wrap",justifyContent:"space-between"},children:[n.jsxs("div",{style:{display:"flex",gap:16},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx("div",{style:{width:12,height:12,border:"1.5px solid #333"}}),n.jsxs("span",{children:[k,`" Pier (6' o/c)`]})]}),j&&n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx("div",{style:{width:12,height:12,background:"#333"}}),n.jsx("span",{children:`32" Marriage Pier (12' o/c)`})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx("div",{style:{width:20,height:2,background:"#333"}}),n.jsx("span",{children:"I-Beam"})]})]}),n.jsx("div",{style:{fontSize:10,color:"#999"},children:j?`Half 1: ${O.length+te.length} piers | Marriage: ${ze.length} piers | Half 2: ${ne.length+ye.length} piers | Total: ${ve}`:`${O.length+ye.length} piers on 2 beams`})]})]})},Pf="https://sherman-ai-proxy.onrender.com",Of="sherman-ai-key-2024",Qn={bubble:{position:"fixed",bottom:24,right:24,width:56,height:56,borderRadius:"50%",background:"#2c5530",color:"#fff",border:"none",cursor:"pointer",boxShadow:"0 4px 16px rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,zIndex:9999,transition:"transform 0.2s ease, box-shadow 0.2s ease"},window:{position:"fixed",bottom:90,right:24,width:380,maxHeight:520,borderRadius:12,background:"#fff",boxShadow:"0 8px 32px rgba(0,0,0,0.2)",display:"flex",flexDirection:"column",zIndex:9998,overflow:"hidden",border:"1px solid #e0e0e0"},header:{background:"#2c5530",color:"#fff",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:15,fontWeight:600},headerActions:{display:"flex",gap:8},headerBtn:{background:"rgba(255,255,255,0.2)",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontSize:14,padding:"4px 8px"},messages:{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:12,minHeight:300,maxHeight:360,background:"#f8f9fa"},msgUser:{alignSelf:"flex-end",background:"#2c5530",color:"#fff",padding:"10px 14px",borderRadius:"12px 12px 4px 12px",maxWidth:"80%",fontSize:14,lineHeight:1.5,wordBreak:"break-word"},msgAI:{alignSelf:"flex-start",background:"#fff",color:"#333",padding:"10px 14px",borderRadius:"12px 12px 12px 4px",maxWidth:"80%",fontSize:14,lineHeight:1.5,border:"1px solid #e0e0e0",wordBreak:"break-word",whiteSpace:"pre-wrap"},loading:{alignSelf:"flex-start",color:"#999",fontSize:13,fontStyle:"italic",padding:"8px 0"},welcome:{textAlign:"center",color:"#666",fontSize:13,lineHeight:1.6,padding:"20px 10px"},inputArea:{display:"flex",gap:8,padding:12,borderTop:"1px solid #e0e0e0",background:"#fff"},input:{flex:1,padding:"10px 12px",border:"2px solid #ddd",borderRadius:6,fontSize:14,outline:"none",fontFamily:"'Segoe UI', sans-serif",resize:"none"},sendBtn:{padding:"10px 16px",background:"#2c5530",color:"#fff",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,fontWeight:600,whiteSpace:"nowrap"}};function If(){const[l,u]=xe.useState(!1),[h,S]=xe.useState([]),[j,k]=xe.useState(""),[L,T]=xe.useState(!1),[W,E]=xe.useState(!1),[z,V]=xe.useState(!1),F=xe.useRef(null),J=xe.useRef(null);xe.useEffect(()=>{F.current&&F.current.scrollIntoView({behavior:"smooth"})},[h,L]),xe.useEffect(()=>{l&&J.current&&setTimeout(()=>J.current.focus(),100)},[l]);const Y=async()=>{const ee=j.trim();if(!ee||L)return;const R={role:"user",content:ee},$=[...h,R];S($),k(""),T(!0);try{const H=await fetch(`${Pf}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Of},body:JSON.stringify({messages:$.map(v=>({role:v.role,content:v.content}))})});if(!H.ok){const v=await H.json().catch(()=>({}));throw new Error(v.error||`Server returned ${H.status}`)}const I=await H.json();S(v=>[...v,{role:"assistant",content:I.content}])}catch(H){S(I=>[...I,{role:"assistant",content:`Sorry, I encountered an error: ${H.message}`}])}finally{T(!1)}},oe=ee=>{ee.key==="Enter"&&!ee.shiftKey&&(ee.preventDefault(),Y())};return n.jsxs(n.Fragment,{children:[l&&n.jsxs("div",{style:Qn.window,children:[n.jsxs("div",{style:Qn.header,children:[n.jsx("span",{children:"Sherman AI Assistant"}),n.jsxs("div",{style:Qn.headerActions,children:[n.jsx("button",{style:Qn.headerBtn,onClick:()=>{S([])},title:"Clear chat",children:"Clear"}),n.jsx("button",{style:Qn.headerBtn,onClick:()=>u(!1),title:"Close",children:"X"})]})]}),n.jsxs("div",{style:Qn.messages,children:[h.length===0&&n.jsxs("div",{style:Qn.welcome,children:[n.jsx("strong",{children:"Welcome to Sherman AI"}),n.jsx("br",{}),n.jsx("br",{}),"Ask me about creating quotes, managing customers, understanding pricing, using the Scrubb page, generating documents, or anything else about the bidding system."]}),h.map((ee,R)=>n.jsx("div",{style:ee.role==="user"?Qn.msgUser:Qn.msgAI,children:ee.content},R)),L&&n.jsx("div",{style:Qn.loading,children:"Thinking..."}),n.jsx("div",{ref:F})]}),n.jsxs("div",{style:Qn.inputArea,children:[n.jsx("textarea",{ref:J,style:{...Qn.input,...W?{borderColor:"#2c5530"}:{}},rows:1,placeholder:"Ask a question...",value:j,onChange:ee=>k(ee.target.value),onKeyDown:oe,onFocus:()=>E(!0),onBlur:()=>E(!1)}),n.jsx("button",{style:{...Qn.sendBtn,...!j.trim()||L?{opacity:.5,cursor:"not-allowed"}:{}},onClick:Y,disabled:L||!j.trim(),children:"Send"})]})]}),n.jsx("button",{style:{...Qn.bubble,...z?{transform:"scale(1.1)",boxShadow:"0 6px 20px rgba(0,0,0,0.4)"}:{}},onClick:()=>u(!l),onMouseEnter:()=>V(!0),onMouseLeave:()=>V(!1),title:"Chat with Sherman AI",children:l?"✕":"💬"})]})}const Xp=({show:l,title:u,nameLabel:h="Name",namePlaceholder:S="",costLabel:j="Cost",saveLabel:k="Save",entryName:L,entryCost:T,setEntryName:W,setEntryCost:E,onSave:z,onClose:V})=>l?n.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:n.jsxs("div",{style:{background:"#fff",padding:32,borderRadius:8,maxWidth:500,width:"90%",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"},children:[n.jsx("h3",{style:{marginTop:0},children:u}),n.jsxs("div",{style:{marginBottom:16},children:[n.jsx("label",{style:{...p.label,color:"#333"},children:h}),n.jsx("input",{type:"text",style:p.input,value:L,onChange:F=>W(F.target.value),placeholder:S,autoFocus:!0})]}),n.jsxs("div",{style:{marginBottom:24},children:[n.jsx("label",{style:{...p.label,color:"#333"},children:j}),n.jsx("input",{type:"number",style:p.input,value:T,onChange:F=>E(F.target.value),placeholder:"0.00"})]}),n.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"flex-end"},children:[n.jsx("button",{style:{...p.btn2,background:"#666"},onClick:V,children:"Cancel"}),n.jsx("button",{style:p.btn,onClick:z,children:k})]})]})}):null,Rf=()=>{const[l,u]=xe.useState(null),[h,S]=xe.useState(""),[j,k]=xe.useState(!1),[L,T]=xe.useState(!1),[W,E]=xe.useState(null),[z,V]=xe.useState(""),[F,J]=xe.useState(""),[Y,oe]=xe.useState(!1),[ee,R]=xe.useState(null),[$,H]=xe.useState(""),[I,v]=xe.useState(""),[re,O]=xe.useState(null),[te,ze]=xe.useState(null),[ne,ye]=xe.useState(!1),[ve,ce]=xe.useState({amount:"",date:"",notes:"",isContingencyPayment:!1});return{scrubbEditingService:l,setScrubbEditingService:u,scrubbNewCost:h,setScrubbNewCost:S,nhlExpanded:j,setNhlExpanded:k,showPermitModal:L,setShowPermitModal:T,editingPermitEntry:W,setEditingPermitEntry:E,permitEntryName:z,setPermitEntryName:V,permitEntryCost:F,setPermitEntryCost:J,showAddlMaterialModal:Y,setShowAddlMaterialModal:oe,editingMaterialEntry:ee,setEditingMaterialEntry:R,materialEntryName:$,setMaterialEntryName:H,materialEntryCost:I,setMaterialEntryCost:v,scrubbDragOverService:re,setScrubbDragOverService:O,scrubbUploadingService:te,setScrubbUploadingService:ze,showPaymentForm:ne,setShowPaymentForm:ye,newPayment:ve,setNewPayment:ce}},Bf=()=>{const[l,u]=xe.useState(!0),[h,S]=xe.useState(!1),[j,k]=xe.useState(null),[L,T]=xe.useState("sales"),[W,E]=xe.useState("admin"),[z,V]=xe.useState("SHERMAN"),[F,J]=xe.useState(""),[Y,oe]=xe.useState(""),[ee,R]=xe.useState(""),[$,H]=xe.useState(""),[I,v]=xe.useState("");return{isAuth:l,setIsAuth:u,isCustomerPortal:h,setIsCustomerPortal:S,customerData:j,setCustomerData:k,userRole:L,setUserRole:T,originalRole:W,setOriginalRole:E,userName:z,setUserName:V,loginU:F,setLoginU:J,loginP:Y,setLoginP:oe,loginError:ee,setLoginError:R,tempName:$,setTempName:H,tempRole:I,setTempRole:v}},Lf=l=>{const[u,h]=xe.useState(l()),[S,j]=xe.useState(null),[k,L]=xe.useState(null),[T,W]=xe.useState([]),[E,z]=xe.useState({}),[V,F]=xe.useState([]);return{newQ:u,setNewQ:h,editingQuoteId:S,setEditingQuoteId:j,originalQuoteForComparison:k,setOriginalQuoteForComparison:L,changeOrderDeletions:T,setChangeOrderDeletions:W,changeOrderAdjustments:E,setChangeOrderAdjustments:z,changeOrderAdditions:V,setChangeOrderAdditions:F}},Mf=()=>{const[l,u]=xe.useState("details"),[h,S]=xe.useState(null),[j,k]=xe.useState(""),[L,T]=xe.useState("jobs"),[W,E]=xe.useState("homes"),[z,V]=xe.useState(!1),[F,J]=xe.useState({}),[Y,oe]=xe.useState(!0),[ee,R]=xe.useState(!0),[$,H]=xe.useState(!1),[I,v]=xe.useState(!1),[re,O]=xe.useState(null),[te,ze]=xe.useState(null),[ne,ye]=xe.useState(!1),[ve,ce]=xe.useState(!1),[Ae,Ne]=xe.useState(!1),[A,pe]=xe.useState(!1),[G,ae]=xe.useState(!0),[y,w]=xe.useState({});return{quoteTab:l,setQuoteTab:u,generalNoteMode:h,setGeneralNoteMode:S,generalNoteDraft:j,setGeneralNoteDraft:k,crewTab:L,setCrewTab:T,pricingTab:W,setPricingTab:E,pricingEditMode:z,setPricingEditMode:V,expandedServiceNotes:F,setExpandedServiceNotes:J,installSvcCollapsed:Y,setInstallSvcCollapsed:oe,proSvcCollapsed:ee,setProSvcCollapsed:R,homeSelCollapsed:$,setHomeSelCollapsed:H,houseSpecsCollapsed:I,setHouseSpecsCollapsed:v,deleteConfirm:re,setDeleteConfirm:O,deleteCustomerConfirm:te,setDeleteCustomerConfirm:ze,showRestoreMaterials:ne,setShowRestoreMaterials:ye,isPierDiagramExpanded:ve,setIsPierDiagramExpanded:ce,isFloorPlanExpanded:Ae,setIsFloorPlanExpanded:Ne,isPierDiagramExpandedSummary:A,setIsPierDiagramExpandedSummary:pe,isChangeOrderHistoryExpanded:G,setIsChangeOrderHistoryExpanded:ae,expandedCO:y,setExpandedCO:w}},Wf=()=>{const[l,u]=xe.useState({overview:!1,roles:!1,foundation:!1,services:!1,deliverables:!1,exclusions:!1,assumptions:!1}),[h,S]=xe.useState(!1),[j,k]=xe.useState(null);return{scopeSections:l,setScopeSections:u,scopeEditMode:h,setScopeEditMode:S,scopeEditContent:j,setScopeEditContent:k}},Ff={slab:"Engineered Slab",basement:"Basement",crawlspace:"Crawl Space"},Uf={Signed:"#d1e7dd",Draft:"#fff3cd",Sent:"#cfe2ff"},Hf={Signed:"#0f5132",Draft:"#664d03",Sent:"#084298"},Zd=(l,u,h="None")=>l[u]??h,Qf=({loginU:l,setLoginU:u,loginP:h,setLoginP:S,loginError:j,onLogin:k})=>n.jsx("div",{style:p.login,children:n.jsxs("div",{style:p.card,children:[n.jsx("span",{style:{fontWeight:800,fontSize:32,letterSpacing:3,color:"#1a237e",marginBottom:20,display:"block"},children:"SHERMAN"}),n.jsx("h2",{style:{margin:"0 0 8px",color:"#333"},children:"Bidding System"}),n.jsx("p",{style:{color:"#666",marginBottom:24},children:"Manufactured Home Installation"}),n.jsx("input",{"data-testid":"login-username",type:"text",placeholder:"Username",style:p.input,value:l,onChange:L=>u(L.target.value)}),n.jsx("input",{"data-testid":"login-password",type:"password",placeholder:"Password",style:p.input,value:h,onChange:L=>S(L.target.value),onKeyDown:L=>L.key==="Enter"&&k()}),j&&n.jsx("p",{style:{color:"#dc3545",margin:"0 0 12px"},children:j}),n.jsx("button",{"data-testid":"login-btn",style:p.btn,onClick:k,children:"Sign In"}),n.jsxs("div",{style:{marginTop:20,padding:12,background:"#e8f5e9",borderRadius:6,textAlign:"left"},children:[n.jsx("p",{style:{margin:0,fontSize:13,color:"#2c5530"},children:n.jsx("strong",{children:"👷 Staff Login"})}),n.jsxs("p",{style:{margin:"8px 0 0",fontSize:12,color:"#666"},children:["Username: ",n.jsx("code",{style:{background:"#fff",padding:"2px 6px",borderRadius:3},children:"SHERMAN"}),n.jsx("br",{}),"Password: ",n.jsx("code",{style:{background:"#fff",padding:"2px 6px",borderRadius:3},children:"BIDDING"})]})]}),n.jsxs("div",{style:{marginTop:12,padding:12,background:"#e3f2fd",borderRadius:6,textAlign:"left"},children:[n.jsx("p",{style:{margin:0,fontSize:13,color:"#1565c0"},children:n.jsx("strong",{children:"🏠 Customer Portal"})}),n.jsxs("p",{style:{margin:"8px 0 0",fontSize:12,color:"#666"},children:["Username: ",n.jsx("code",{style:{background:"#fff",padding:"2px 6px",borderRadius:3},children:"firstnamelastname"})," (no spaces)",n.jsx("br",{}),"Password: ",n.jsx("code",{style:{background:"#fff",padding:"2px 6px",borderRadius:3},children:"mybid"})]})]})]})}),Vf=({users:l,tempName:u,setTempName:h,loginError:S,setLoginError:j,onSelectUser:k})=>{const L=()=>{if(l.length===0&&u.toLowerCase()==="admin"){k({role:"admin",username:"admin"});return}const T=l.find(W=>W.username.toLowerCase()===u.toLowerCase());T?k(T):j("Username not found. Please contact an admin to create your account.")};return n.jsx("div",{style:p.login,children:n.jsxs("div",{style:{...p.card,maxWidth:550},children:[n.jsx("span",{style:{fontWeight:800,fontSize:32,letterSpacing:3,color:"#1a237e",marginBottom:16,display:"block"},children:"SHERMAN"}),n.jsx("h2",{style:{margin:"0 0 8px"},children:"Welcome!"}),n.jsx("p",{style:{color:"#666",marginBottom:20},children:"Select your username to continue"}),n.jsx("input",{"data-testid":"user-selector-input",type:"text",placeholder:"Enter your username...",style:p.input,value:u,onChange:T=>{h(T.target.value),j("")},onKeyDown:T=>{T.key==="Enter"&&L()}}),S&&n.jsx("p",{style:{color:"#dc3545",margin:"0 0 12px",fontSize:14},children:S}),l.length===0?n.jsx("div",{style:{background:"#fff3cd",padding:12,borderRadius:6,marginBottom:16},children:n.jsxs("p",{style:{margin:0,fontSize:13,color:"#856404"},children:[n.jsx("strong",{children:"First Time Setup:"}),' No users exist yet. Enter "admin" as username to create the first admin account.']})}):n.jsxs("div",{style:{background:"#f8f9fa",padding:16,borderRadius:8,marginBottom:16,textAlign:"left"},children:[n.jsx("p",{style:{margin:"0 0 12px",fontSize:14,fontWeight:600,color:"#333"},children:"👥 Available Users"}),n.jsxs("table",{style:{width:"100%",fontSize:13,borderCollapse:"collapse"},children:[n.jsx("thead",{children:n.jsxs("tr",{style:{borderBottom:"2px solid #dee2e6"},children:[n.jsx("th",{style:{textAlign:"left",padding:"8px",color:"#666"},children:"Name"}),n.jsx("th",{style:{textAlign:"left",padding:"8px",color:"#666"},children:"Username"}),n.jsx("th",{style:{textAlign:"left",padding:"8px",color:"#666"},children:"Role"})]})}),n.jsx("tbody",{children:l.map(T=>n.jsxs("tr",{"data-testid":`select-user-${T.username}`,style:{borderBottom:"1px solid #eee",cursor:"pointer",background:u.toLowerCase()===T.username.toLowerCase()?"#e8f5e9":"transparent"},onClick:()=>h(T.username),children:[n.jsx("td",{style:{padding:"10px 8px"},children:T.fullName}),n.jsx("td",{style:{padding:"10px 8px"},children:n.jsx("code",{style:{background:"#e9ecef",padding:"3px 8px",borderRadius:4,fontWeight:600},children:T.username})}),n.jsx("td",{style:{padding:"10px 8px"},children:n.jsx("span",{style:{padding:"3px 8px",borderRadius:4,fontSize:11,fontWeight:600,textTransform:"uppercase",background:T.role==="admin"?"#dc3545":T.role==="sales"?"#0d6efd":"#198754",color:"#fff"},children:T.role})})]},T.id))})]}),n.jsxs("p",{style:{margin:"12px 0 0",fontSize:12,color:"#666"},children:["💡 ",n.jsx("strong",{children:"Tip:"})," Click on a row to select that user, or type the username above."]})]}),n.jsx("button",{"data-testid":"user-selector-continue",style:{...p.btn,opacity:u?1:.5},disabled:!u,onClick:L,children:"Continue"})]})})},Gf=({customerData:l,quotes:u,services:h,materials:S,sewerPricing:j,patioPricing:k,driveRates:L,foundationPricing:T,homeModels:W,onLogout:E,onGenerateQuote:z})=>{const V=u.filter(v=>v.customerId===l.id),F=["Accepted","Under Contract","Completed"],J=V.filter(v=>F.includes(v.status)),Y=V.filter(v=>v.status==="Sent"),oe=J.length>0,ee=[];V.forEach(v=>{var re,O,te,ze;Object.keys(v.selectedServices||{}).forEach(ne=>{var ye,ve,ce;if(v.selectedServices[ne]&&((ve=(ye=v.publishedServiceNotes)==null?void 0:ye[ne])==null?void 0:ve.length)>0){const Ae=((ce=h[ne])==null?void 0:ce.name)||ne;v.publishedServiceNotes[ne].forEach(Ne=>{ee.push({quoteId:v.id,homeModel:v.homeModel!=="NONE"?v.homeModel:`${v.houseWidth}' × ${v.houseLength}'`,serviceName:Ae,text:Ne.text,publishedAt:Ne.publishedAt,publishedBy:Ne.publishedBy})})}}),v.sewerType&&v.sewerType!=="none"&&((O=(re=v.publishedServiceNotes)==null?void 0:re.sewer)==null?void 0:O.length)>0&&v.publishedServiceNotes.sewer.forEach(ne=>{ee.push({quoteId:v.id,homeModel:v.homeModel!=="NONE"?v.homeModel:`${v.houseWidth}' × ${v.houseLength}'`,serviceName:"Sewer System",text:ne.text,publishedAt:ne.publishedAt,publishedBy:ne.publishedBy})}),parseFloat(v.wellDepth)>0&&((ze=(te=v.publishedServiceNotes)==null?void 0:te.well)==null?void 0:ze.length)>0&&v.publishedServiceNotes.well.forEach(ne=>{ee.push({quoteId:v.id,homeModel:v.homeModel!=="NONE"?v.homeModel:`${v.houseWidth}' × ${v.houseLength}'`,serviceName:"Well Drilling",text:ne.text,publishedAt:ne.publishedAt,publishedBy:ne.publishedBy})})});const R=v=>({...v,customerFirstName:l.firstName,customerLastName:l.lastName,phone:l.phone,email:l.email,siteAddress:l.siteAddress,siteCity:l.siteCity,siteState:l.siteState,siteZip:l.siteZip,siteCounty:l.siteCounty,person2FirstName:l.person2FirstName,person2LastName:l.person2LastName,phone2:l.phone2,email2:l.email2,mailingAddress:l.mailingAddress,mailingCity:l.mailingCity,mailingState:l.mailingState,mailingZip:l.mailingZip}),$=(v,re)=>{var G,ae;const O=[];if(Object.entries(v.selectedServices||{}).forEach(([y,w])=>{var d,P;if(w&&It.includes(y)){const ie=re.svc.find($e=>$e.key===y),le=(ie==null?void 0:ie.cost)||0,de=((d=v.scrubbCosts)==null?void 0:d[y])||0,_e=de>0?le-de:0;O.push({key:y,name:((P=h[y])==null?void 0:P.name)||y,contractPrice:le,actualCost:de,variance:_e})}}),v.sewerType&&v.sewerType!=="none"){const y=re.svc.find(ie=>ie.key==="sewer"),w=(y==null?void 0:y.cost)||0,d=((G=v.scrubbCosts)==null?void 0:G.sewer)||0,P=d>0?w-d:0;O.push({key:"sewer",name:"Sewer System",contractPrice:w,actualCost:d,variance:P})}if(parseFloat(v.wellDepth)>0){const y=re.svc.find(ie=>ie.key==="well"),w=(y==null?void 0:y.cost)||0,d=((ae=v.scrubbCosts)==null?void 0:ae.well)||0,P=d>0?w-d:0;O.push({key:"well",name:"Well Drilling",contractPrice:w,actualCost:d,variance:P})}if(O.length===0)return null;const te=O.reduce((y,w)=>y+w.contractPrice,0),ze=v.changeOrderHistory||[],ne=ze.length>0?(ze[0].contingencyUsed||0)+(ze[0].contingencyBalance||0):re.contingency||0,ye=ze.reduce((y,w)=>y+(w.contingencyUsed||0),0),ve=te+ne,ce=O.filter(y=>y.variance>0).reduce((y,w)=>y+w.variance,0),Ae=O.filter(y=>y.variance<0).reduce((y,w)=>y+Math.abs(w.variance),0),Ne=ce-Ae,A=(v.scrubbPayments||[]).filter(y=>y.isContingencyPayment).reduce((y,w)=>y+parseFloat(w.amount||0),0),pe=ve-ye+Ne+A;return n.jsxs("div",{style:{background:"linear-gradient(135deg, #fff9e6, #fff3e0)",border:"2px solid #ffc107",borderRadius:8,padding:16,marginTop:16,marginBottom:16},children:[n.jsx("h4",{style:{margin:"0 0 12px",color:"#856404",fontSize:15},children:"💰 Live Budget Tracker"}),n.jsxs("div",{style:{background:"#fff",padding:12,borderRadius:6,marginBottom:12,fontSize:13},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6},children:[n.jsx("span",{style:{fontWeight:600,color:"#856404"},children:"Starting Allowances"}),n.jsx("span",{style:{fontWeight:700,color:"#856404"},children:D(te)})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",paddingTop:6,borderTop:"1px solid #ffe0b2"},children:[n.jsx("span",{style:{fontWeight:600,color:"#1565c0"},children:"Contingency"}),n.jsxs("span",{style:{fontWeight:700,color:"#1565c0"},children:["+ ",D(ne)]})]}),ye>0&&n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",paddingTop:6,borderTop:"1px solid #ffe0b2"},children:[n.jsx("span",{style:{fontWeight:600,color:"#dc3545"},children:"Change Order Draws"}),n.jsxs("span",{style:{fontWeight:700,color:"#dc3545"},children:["- ",D(ye)]})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:8,paddingTop:8,borderTop:"2px solid #ffc107"},children:[n.jsx("span",{style:{fontWeight:700,color:"#2c5530"},children:"Starting Balance"}),n.jsx("span",{style:{fontWeight:700,color:"#2c5530"},children:D(ve-ye)})]})]}),n.jsxs("div",{style:{marginBottom:12},children:[n.jsx("div",{style:{fontSize:13,fontWeight:600,color:"#856404",marginBottom:8},children:"Allowance Items:"}),O.map(y=>{var d;const w=((d=v.publishedServiceNotes)==null?void 0:d[y.key])||[];return n.jsxs("div",{style:{background:"#fff",padding:8,borderRadius:4,marginBottom:6,fontSize:12},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[n.jsx("span",{style:{fontWeight:600},children:y.name}),y.variance!==0&&n.jsxs("span",{style:{fontWeight:700,color:y.variance>0?"#2e7d32":"#d32f2f"},children:[y.variance>0?"+":"",D(y.variance)]})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:11,color:"#666",marginBottom:w.length>0?8:0},children:[n.jsxs("span",{children:["Budget: ",D(y.contractPrice)]}),n.jsxs("span",{children:["Actual: ",y.actualCost>0?D(y.actualCost):"Pending"]})]}),w.length>0&&n.jsx("div",{style:{borderTop:"1px solid #e0e0e0",paddingTop:8},children:w.map((P,ie)=>n.jsxs("div",{style:{background:"#f8f9fa",padding:6,borderRadius:4,marginBottom:ie<w.length-1?4:0,borderLeft:"3px solid #1565c0"},children:[n.jsx("div",{style:{fontSize:11,color:"#333",marginBottom:2},children:P.text}),n.jsxs("div",{style:{fontSize:9,color:"#999"},children:[Fi(P.publishedAt)," by ",P.publishedBy]})]},ie))})]},y.key)})]}),n.jsxs("div",{style:{background:pe>=ve?"#e8f5e9":"#ffebee",padding:14,borderRadius:6,border:`2px solid ${pe>=ve?"#2e7d32":"#d32f2f"}`},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:11,color:"#666",marginBottom:2},children:"Final Balance"}),n.jsx("div",{"data-testid":"portal-contingency-balance",style:{fontSize:20,fontWeight:700,color:pe>=ve?"#2e7d32":"#d32f2f"},children:D(pe)})]}),n.jsxs("div",{style:{textAlign:"right"},children:[n.jsx("div",{style:{fontSize:11,color:"#666",marginBottom:2},children:"Net Change"}),n.jsxs("div",{style:{fontSize:16,fontWeight:700,color:Ne>=0?"#2e7d32":"#d32f2f"},children:[Ne>0?"+":"",D(Ne)]})]})]}),A>0&&n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:12,color:"#28a745"},children:[n.jsx("span",{children:"Customer Payments (refunding fund)"}),n.jsxs("span",{style:{fontWeight:600},children:["+ ",D(A)]})]}),n.jsxs("div",{style:{marginTop:8,paddingTop:8,borderTop:`1px solid ${pe>=ve?"#a5d6a7":"#ef9a9a"}`,fontSize:11,color:"#666"},children:[Ne>0&&A===0&&`✓ Under budget - You'll receive back ${D(pe)} at completion`,Ne>0&&A>0&&`✓ Under budget - Estimated return at completion: ${D(pe)}`,Ne<0&&`⚠ Over budget - Drawing ${D(Math.abs(Ne))} from contingency`,Ne===0&&A===0&&"• Tracking in progress",Ne===0&&A>0&&`• ${D(A)} added back to contingency fund`]})]})]})},H=v=>{var O,te,ze,ne;const re=[];return Object.keys(v.selectedServices||{}).forEach(ye=>{var ve,ce,Ae;if(v.selectedServices[ye]&&((ce=(ve=v.publishedServiceNotes)==null?void 0:ve[ye])==null?void 0:ce.length)>0){const Ne=((Ae=h[ye])==null?void 0:Ae.name)||ye;v.publishedServiceNotes[ye].forEach(A=>{re.push({serviceName:Ne,text:A.text,publishedAt:A.publishedAt,publishedBy:A.publishedBy})})}}),v.sewerType&&v.sewerType!=="none"&&((te=(O=v.publishedServiceNotes)==null?void 0:O.sewer)==null?void 0:te.length)>0&&v.publishedServiceNotes.sewer.forEach(ye=>{re.push({serviceName:"Sewer System",text:ye.text,publishedAt:ye.publishedAt,publishedBy:ye.publishedBy})}),parseFloat(v.wellDepth)>0&&((ne=(ze=v.publishedServiceNotes)==null?void 0:ze.well)==null?void 0:ne.length)>0&&v.publishedServiceNotes.well.forEach(ye=>{re.push({serviceName:"Well Drilling",text:ye.text,publishedAt:ye.publishedAt,publishedBy:ye.publishedBy})}),re.length===0?null:n.jsxs("div",{"data-testid":"portal-project-notes",style:{background:"linear-gradient(135deg, #e3f2fd, #bbdefb)",border:"2px solid #1565c0",borderRadius:8,padding:16,marginTop:16},children:[n.jsx("h4",{style:{margin:"0 0 12px",color:"#1565c0",fontSize:15},children:"📋 Important Project Information"}),re.map((ye,ve)=>n.jsxs("div",{style:{background:"#fff",padding:10,borderRadius:6,marginBottom:8,borderLeft:"4px solid #1565c0"},children:[n.jsx("div",{style:{fontWeight:600,color:"#2c5530",marginBottom:4,fontSize:13},children:ye.serviceName}),n.jsx("div",{style:{color:"#333",marginBottom:4,fontSize:12,lineHeight:1.5},children:ye.text}),n.jsxs("div",{style:{fontSize:10,color:"#999"},children:[Fi(ye.publishedAt)," by ",ye.publishedBy]})]},ve))]})},I=(v,re=!1)=>{const O=Xt.calculateQuoteTotals(v,l,S,h,j,k,L,T),te=$r.find(ye=>ye.id===v.quoteType)||$r[0],ze=W.find(ye=>ye.name===v.homeModel),ne=ze==null?void 0:ze.floorPlanUrl;if(re){const ve={Accepted:{bg:"#d1e7dd",text:"#0f5132",label:"✅ Accepted"},"Under Contract":{bg:"#cfe2ff",text:"#084298",label:"📝 Under Contract"},Completed:{bg:"#d3d3d3",text:"#333",label:"🎉 Completed"}}[v.status]||{bg:"#e9ecef",text:"#333",label:v.status};return n.jsxs("div",{style:{...p.box,background:"#f0f7f1"},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[n.jsxs("div",{style:{fontSize:11,color:"#666"},children:[te.icon," ",te.name]}),n.jsx("span",{style:{...p.badge,background:ve.bg,color:ve.text},children:ve.label})]}),n.jsx("h3",{style:{margin:"0 0 8px"},children:v.homeModel!=="NONE"?v.homeModel:`${v.houseWidth}' × ${v.houseLength}'`}),n.jsxs("p",{style:{fontSize:14,color:"#666",margin:"0 0 8px"},children:[v.houseWidth,"' × ",v.houseLength,"' ",v.singleDouble," Wide"]}),n.jsx("div",{style:{fontSize:28,fontWeight:700,color:"#2c5530",margin:"16px 0"},children:O?D(O.total):"-"}),$(v,O),H(v),n.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[n.jsx("button",{style:{...p.btn,background:"#2c5530",flex:1},onClick:()=>z(R(v),O,W),children:"📄 View Quote"}),ne&&n.jsx("a",{href:ne,target:"_blank",rel:"noopener noreferrer",style:{...p.btn,background:"#1565c0",flex:1,textAlign:"center",textDecoration:"none"},children:"🏠 Floor Plan & Photos"})]})]},v.id)}return n.jsxs("div",{style:{...p.box,background:"#f8f9fa"},children:[n.jsxs("div",{style:{fontSize:11,color:"#666",marginBottom:4},children:[te.icon," ",te.name]}),n.jsx("h3",{style:{margin:"0 0 8px"},children:v.homeModel!=="NONE"?v.homeModel:`${v.houseWidth}' × ${v.houseLength}'`}),n.jsxs("p",{style:{fontSize:14,color:"#666",margin:"0 0 8px"},children:[v.houseWidth,"' × ",v.houseLength,"' ",v.singleDouble," Wide"]}),n.jsx("div",{style:{fontSize:28,fontWeight:700,color:"#1565c0",margin:"16px 0"},children:O?D(O.total):"-"}),n.jsxs("p",{style:{fontSize:12,color:"#666",margin:"0 0 16px"},children:["Quote Date: ",Fi(v.createdAt)]}),n.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[n.jsx("button",{style:{...p.btn,background:"#1565c0",flex:1},onClick:()=>z(R(v),O,W),children:"📄 View Full Quote"}),ne&&n.jsx("a",{href:ne,target:"_blank",rel:"noopener noreferrer",style:{...p.btn,background:"#2c5530",flex:1,textAlign:"center",textDecoration:"none"},children:"🏠 Floor Plan & Photos"})]})]},v.id)};return n.jsxs("div",{style:p.app,children:[n.jsxs("header",{style:{...p.header,background:"#1565c0"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsx("span",{style:{fontWeight:800,fontSize:22,letterSpacing:2,color:"#fff"},children:"SHERMAN"}),n.jsx("span",{style:{fontWeight:600},children:"Customer Portal"})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsxs("span",{children:["Welcome, ",l.firstName,"!"]}),n.jsx("button",{style:p.nav,onClick:E,children:"Sign Out"})]})]}),n.jsxs("div",{style:p.main,children:[n.jsxs("h1",{style:{margin:"0 0 24px"},children:["👋 Hello, ",l.firstName," ",l.lastName]}),n.jsx("div",{style:p.grid,children:n.jsxs("div",{style:{...p.box,gridColumn:"span 2"},children:[n.jsx("h2",{style:{marginTop:0,borderBottom:"2px solid #1565c0",paddingBottom:8,color:"#1565c0"},children:"📋 Your Profile"}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24},children:[n.jsxs("div",{children:[n.jsx("h4",{style:{margin:"0 0 12px",color:"#666"},children:"Contact Information"}),n.jsx("p",{children:n.jsxs("strong",{children:[l.firstName," ",l.lastName]})}),l.person2FirstName&&n.jsxs("p",{style:{color:"#666"},children:["& ",l.person2FirstName," ",l.person2LastName]}),n.jsxs("p",{children:["📞 ",l.phone,l.phone2&&` / ${l.phone2}`]}),n.jsxs("p",{children:["✉️ ",l.email]}),l.email2&&n.jsxs("p",{children:["✉️ ",l.email2]})]}),n.jsxs("div",{children:[n.jsx("h4",{style:{margin:"0 0 12px",color:"#666"},children:"Site Address"}),n.jsx("p",{children:l.siteAddress}),n.jsxs("p",{children:[l.siteCity,", ",l.siteState," ",l.siteZip]}),l.siteCounty&&n.jsxs("p",{style:{color:"#666"},children:["County: ",l.siteCounty]}),l.mailingAddress&&n.jsxs(n.Fragment,{children:[n.jsx("h4",{style:{margin:"16px 0 12px",color:"#666"},children:"Mailing Address"}),n.jsx("p",{children:l.mailingAddress}),n.jsxs("p",{children:[l.mailingCity,", ",l.mailingState," ",l.mailingZip]})]})]})]})]})}),ee.length>0&&n.jsxs("div",{style:{...p.box,marginTop:24,background:"linear-gradient(135deg, #fff9e6, #fff3e0)",border:"3px solid #ffc107"},children:[n.jsx("h2",{style:{marginTop:0,borderBottom:"2px solid #ffc107",paddingBottom:8,color:"#856404"},children:"📌 Special Notes"}),n.jsx("p",{style:{fontSize:13,color:"#666",marginBottom:16},children:"Important information about your project from our team:"}),ee.map((v,re)=>n.jsxs("div",{style:{background:"#fff",padding:12,borderRadius:6,marginBottom:12,borderLeft:"4px solid #ffc107"},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontWeight:600,color:"#2c5530",fontSize:14},children:v.serviceName}),n.jsx("div",{style:{fontSize:11,color:"#999",marginTop:2},children:v.homeModel})]}),n.jsxs("div",{style:{fontSize:10,color:"#999",textAlign:"right"},children:[Fi(v.publishedAt),n.jsx("br",{}),"by ",v.publishedBy]})]}),n.jsx("div",{style:{color:"#333",fontSize:13,lineHeight:1.5},children:v.text})]},re))]}),oe&&n.jsxs("div",{style:{...p.box,marginTop:24,borderLeft:"4px solid #2c5530"},children:[n.jsxs("h2",{style:{marginTop:0,borderBottom:"2px solid #2c5530",paddingBottom:8,color:"#2c5530"},children:["🏗️ Your Active Project",J.length>1?"s":""]}),n.jsx("div",{style:p.grid,children:J.map(v=>I(v,!0))})]}),!oe&&n.jsxs("div",{style:{...p.box,marginTop:24},children:[n.jsx("h2",{style:{marginTop:0,borderBottom:"2px solid #1565c0",paddingBottom:8,color:"#1565c0"},children:"📄 Your Quotes"}),Y.length===0?n.jsxs("div",{style:{textAlign:"center",padding:40,color:"#666"},children:[n.jsx("p",{style:{fontSize:18},children:"No published quotes yet"}),n.jsx("p",{style:{fontSize:14},children:"When your sales representative sends you a quote, it will appear here."})]}):n.jsx("div",{style:p.grid,children:Y.map(v=>I(v,!1))})]}),n.jsxs("div",{style:{...p.box,marginTop:24,background:"#fff9e6",textAlign:"center",borderLeft:"4px solid #ffc107"},children:[n.jsx("h3",{style:{margin:"0 0 8px",color:"#f57c00"},children:"😄 Building Humor"}),n.jsxs("p",{style:{margin:0,color:"#555",fontStyle:"italic"},children:["Why did the modular home break up with the stick-built house?",n.jsx("br",{}),"Because it was tired of all the ",n.jsx("strong",{children:"framing"})," and wanted a relationship that could move faster! 🏠"]})]}),n.jsxs("div",{style:{...p.box,marginTop:24,background:"#f0f7f1",textAlign:"center"},children:[n.jsxs("h3",{style:{margin:"0 0 8px",color:"#2c5530"},children:["Questions about your ",oe?"project":"quote","?"]}),n.jsxs("p",{style:{margin:0,color:"#666"},children:["Contact SHERMAN at ",n.jsx("strong",{children:"(320) 679-3438"})," or visit us at ",n.jsx("strong",{children:"2244 Hwy 65, Mora, MN 55051"})]})]})]})]})},Yf=({myCustomers:l,myQuotes:u,quotes:h,contracts:S,searchQuery:j,setSearchQuery:k,isAdmin:L,userName:T,onNewCustomer:W,onSelectCustomer:E,onDeleteCustomer:z})=>{const V=l.filter(F=>{if(!j)return!0;const J=j.toLowerCase(),Y=h.filter(v=>v.customerId===F.id),oe=(S||[]).filter(v=>v.customerId===F.id),ee=(F.firstName+" "+F.lastName).toLowerCase().includes(J),R=(F.phone||"").toLowerCase().includes(J),$=(F.email||"").toLowerCase().includes(J),H=((F.siteAddress||"")+" "+(F.siteCity||"")+" "+(F.siteState||"")+" "+(F.siteZip||"")).toLowerCase().includes(J),I=[...Y,...oe].some(v=>rt.getQuoteNum(v).toLowerCase().includes(J));return ee||R||$||H||I});return n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[n.jsxs("div",{children:[n.jsx("h1",{style:{margin:0},children:L?"All Customers":"My Customers"}),!L&&n.jsxs("p",{style:{margin:"4px 0 0",color:"#666",fontSize:14},children:["Showing customers created by ",T]})]}),n.jsx("button",{"data-testid":"new-customer-btn",style:{...p.btn,width:"auto"},onClick:W,children:"+ New Customer"})]}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24},children:[{l:"Customers",v:l.length},{l:"Total Quotes",v:u.length},{l:"Accepted",v:u.filter(F=>F.status==="Accepted").length},{l:"Draft",v:u.filter(F=>F.status==="Draft").length}].map(F=>n.jsxs("div",{style:{...p.box,textAlign:"center"},children:[n.jsx("div",{style:{fontSize:28,fontWeight:700,color:"#2c5530"},children:F.v}),n.jsx("div",{style:{color:"#666"},children:F.l})]},F.l))}),n.jsx("div",{style:{...p.box,marginBottom:24},children:n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsx("span",{style:{fontSize:18},children:"🔍"}),n.jsx("input",{"data-testid":"search-input",type:"text",placeholder:"Search by name, phone, email, address, or quote number...",style:{...p.input,marginBottom:0,flex:1},value:j,onChange:F=>k(F.target.value)}),j&&n.jsx("button",{style:{...p.btn2,padding:"8px 16px"},onClick:()=>k(""),children:"Clear"})]})}),l.length===0?n.jsxs("div",{style:{...p.box,textAlign:"center",padding:40},children:[n.jsx("p",{style:{fontSize:18,marginBottom:16},children:"No customers yet"}),n.jsx("p",{style:{color:"#666"},children:"Create your first customer profile to get started with quotes."})]}):n.jsx("div",{style:p.grid,children:V.length===0?n.jsxs("div",{style:{...p.box,textAlign:"center",padding:40,gridColumn:"1 / -1"},children:[n.jsx("p",{style:{fontSize:18,marginBottom:16},children:"No customers found"}),n.jsx("p",{style:{color:"#666"},children:"Try a different search term or clear the search."})]}):V.sort((F,J)=>new Date(J.createdAt)-new Date(F.createdAt)).map(F=>{const J=h.filter(ee=>ee.customerId===F.id&&!ee.changeOrderOf),Y=J.filter(ee=>ee.status==="Accepted").length,oe=J.length>0;return n.jsxs("div",{style:{...p.box,position:"relative",cursor:"pointer"},onClick:()=>E(F),children:[n.jsx("button",{style:{position:"absolute",top:8,right:8,background:"transparent",border:"none",color:oe?"#ccc":"#dc3545",cursor:oe?"not-allowed":"pointer",fontSize:16,padding:4,zIndex:10},onClick:ee=>{ee.stopPropagation(),ee.preventDefault(),oe?alert(`Cannot delete customer with ${J.length} quote(s). Delete quotes first.`):z(F)},title:oe?`Has ${J.length} quote(s) - delete quotes first`:"Delete customer",children:"🗑️"}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",paddingRight:24},children:[n.jsxs("h3",{style:{margin:0},children:[F.firstName," ",F.lastName]}),J.length>0&&n.jsxs("span",{style:{...p.badge,background:Y>0?"#d1e7dd":"#e9ecef"},children:[J.length," quote",J.length!==1?"s":""]})]}),F.person2FirstName&&n.jsxs("p",{style:{color:"#666",fontSize:13,margin:"4px 0 0"},children:["& ",F.person2FirstName," ",F.person2LastName]}),n.jsxs("p",{style:{color:"#666",fontSize:13,marginTop:8},children:["📍 ",F.siteCity,", ",F.siteState]}),n.jsxs("p",{style:{color:"#666",fontSize:13},children:["📞 ",F.phone]}),n.jsxs("div",{style:{fontSize:12,color:"#999",marginTop:8},children:[Fi(F.createdAt),L&&F.createdBy&&` • by ${F.createdBy}`]})]},F.id)})})]})},Zf=({newCust:l,updateCustField:u,editingCustomerId:h,showCustSecondContact:S,setShowCustSecondContact:j,showCustMailingAddress:k,setShowCustMailingAddress:L,onSave:T,onCancel:W})=>n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[n.jsxs("div",{children:[n.jsx("h1",{style:{margin:0},children:h?"✏️ Edit Customer":"👤 New Customer"}),h&&n.jsxs("p",{style:{color:"#666",margin:"4px 0 0"},children:["Editing: ",l.firstName," ",l.lastName]})]}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{style:p.btn2,onClick:W,children:"Cancel"}),n.jsxs("button",{"data-testid":"save-customer-btn",style:{...p.btn,width:"auto"},onClick:T,children:["💾 ",h?"Update":"Save Customer"]})]})]}),n.jsxs("div",{style:p.box,children:[n.jsx("h2",{style:{marginTop:0,borderBottom:"2px solid #2c5530",paddingBottom:8},children:"Contact Information"}),n.jsx("h4",{style:{margin:"0 0 12px",color:"#2c5530"},children:"Primary Contact"}),n.jsxs("div",{style:p.row,children:[n.jsxs("div",{children:[n.jsx("label",{style:{...p.label,color:"#dc3545"},children:"First Name *"}),n.jsx("input",{"data-testid":"customer-firstName",style:{...p.input,borderColor:"#dc3545"},value:l.firstName,onChange:E=>u("firstName",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{style:{...p.label,color:"#dc3545"},children:"Last Name *"}),n.jsx("input",{"data-testid":"customer-lastName",style:{...p.input,borderColor:"#dc3545"},value:l.lastName,onChange:E=>u("lastName",E.target.value)})]})]}),n.jsxs("div",{style:p.row,children:[n.jsxs("div",{children:[n.jsx("label",{style:{...p.label,color:"#dc3545"},children:"Phone *"}),n.jsx("input",{"data-testid":"customer-phone",style:{...p.input,borderColor:"#dc3545"},value:l.phone,onChange:E=>u("phone",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{style:{...p.label,color:"#dc3545"},children:"Email *"}),n.jsx("input",{"data-testid":"customer-email",style:{...p.input,borderColor:"#dc3545"},type:"email",value:l.email,onChange:E=>u("email",E.target.value)})]})]}),n.jsxs("div",{style:{borderTop:"1px solid #eee",marginTop:16,paddingTop:12},children:[n.jsxs("button",{type:"button",onClick:()=>j(!S),style:{background:"transparent",border:"none",cursor:"pointer",color:"#2c5530",fontSize:14,padding:0,display:"flex",alignItems:"center",gap:6},children:[n.jsx("span",{style:{fontSize:12},children:S?"▼":"▶"}),n.jsxs("span",{children:["Second Contact ",l.person2FirstName&&`(${l.person2FirstName} ${l.person2LastName})`]})]}),S&&n.jsxs("div",{style:{marginTop:12},children:[n.jsxs("div",{style:p.row,children:[n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"First Name"}),n.jsx("input",{style:p.input,value:l.person2FirstName,onChange:E=>u("person2FirstName",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Last Name"}),n.jsx("input",{style:p.input,value:l.person2LastName,onChange:E=>u("person2LastName",E.target.value)})]})]}),n.jsxs("div",{style:p.row,children:[n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Phone 2"}),n.jsx("input",{style:p.input,value:l.phone2,onChange:E=>u("phone2",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Email 2"}),n.jsx("input",{style:p.input,type:"email",value:l.email2,onChange:E=>u("email2",E.target.value)})]})]})]})]})]}),n.jsxs("div",{style:p.box,children:[n.jsx("h2",{style:{marginTop:0,borderBottom:"2px solid #2c5530",paddingBottom:8},children:"Site Address (Installation Location)"}),n.jsxs("div",{children:[n.jsx("label",{style:{...p.label,color:"#dc3545"},children:"Address *"}),n.jsx("input",{"data-testid":"customer-siteAddress",style:{...p.input,borderColor:"#dc3545"},value:l.siteAddress,onChange:E=>u("siteAddress",E.target.value)})]}),n.jsxs("div",{style:p.row,children:[n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"City"}),n.jsx("input",{"data-testid":"customer-siteCity",style:p.input,value:l.siteCity,onChange:E=>u("siteCity",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"State"}),n.jsx("input",{"data-testid":"customer-siteState",style:p.input,value:l.siteState,onChange:E=>u("siteState",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Zip"}),n.jsx("input",{"data-testid":"customer-siteZip",style:p.input,value:l.siteZip,onChange:E=>u("siteZip",E.target.value)})]})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"County"}),n.jsx("input",{"data-testid":"customer-siteCounty",style:p.input,value:l.siteCounty,onChange:E=>u("siteCounty",E.target.value)})]}),n.jsxs("div",{style:{borderTop:"1px solid #eee",marginTop:16,paddingTop:12},children:[n.jsxs("button",{type:"button",onClick:()=>L(!k),style:{background:"transparent",border:"none",cursor:"pointer",color:"#2c5530",fontSize:14,padding:0,display:"flex",alignItems:"center",gap:6},children:[n.jsx("span",{style:{fontSize:12},children:k?"▼":"▶"}),n.jsxs("span",{children:["Mailing Address ",l.mailingAddress&&`(${l.mailingCity}, ${l.mailingState})`]})]}),k&&n.jsxs("div",{style:{marginTop:12},children:[n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Address"}),n.jsx("input",{style:p.input,value:l.mailingAddress,onChange:E=>u("mailingAddress",E.target.value)})]}),n.jsxs("div",{style:p.row,children:[n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"City"}),n.jsx("input",{style:p.input,value:l.mailingCity,onChange:E=>u("mailingCity",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"State"}),n.jsx("input",{style:p.input,value:l.mailingState,onChange:E=>u("mailingState",E.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Zip"}),n.jsx("input",{style:p.input,value:l.mailingZip,onChange:E=>u("mailingZip",E.target.value)})]})]})]})]})]})]}),Jf=({selCustomer:l,quotes:u,contracts:h,customers:S,services:j,materials:k,sewerPricing:L,patioPricing:T,driveRates:W,foundationPricing:E,isAdmin:z,showNewQuoteMenu:V,setShowNewQuoteMenu:F,onBack:J,onEditCustomer:Y,onDeleteCustomer:oe,onNewQuote:ee,onViewQuote:R,onEditQuote:$,onStartChangeOrder:H,onDeleteQuote:I,onUpdateStatus:v,emptyQuote:re})=>{const O=u.filter(A=>A.customerId===l.id),te=h.filter(A=>A.customerId===l.id),ze=te.filter(A=>A.status!=="Cancelled"),ne=te.filter(A=>A.status==="Cancelled"),ye={Completed:0,"Under Contract":1,Accepted:2},ve={Sent:0,Draft:1,Declined:2},ce=ze.slice().sort((A,pe)=>{const G=ye[A.status]??3,ae=ye[pe.status]??3;return G!==ae?G-ae:new Date(pe.createdAt)-new Date(A.createdAt)}),Ae=O.slice().sort((A,pe)=>{const G=ve[A.status]??3,ae=ve[pe.status]??3;return G!==ae?G-ae:new Date(pe.createdAt)-new Date(A.createdAt)}),Ne=(A,pe)=>{var d,P,ie,le,de,_e,$e,Ee,Xe,$t;const G=Xt.calculateQuoteTotals(A,l,k,j,L,T,W,E),ae=$r.find(yt=>yt.id===A.quoteType)||$r[0],y=(((P=(d=A.folders)==null?void 0:d.clayton_docs)==null?void 0:P.length)||0)+(((le=(ie=A.folders)==null?void 0:ie.crew_files)==null?void 0:le.length)||0)+(((_e=(de=A.folders)==null?void 0:de.estimates)==null?void 0:_e.length)||0)+(((Ee=($e=A.folders)==null?void 0:$e.permits)==null?void 0:Ee.length)||0)+((($t=(Xe=A.folders)==null?void 0:Xe.change_orders)==null?void 0:$t.length)||0);let w=(G==null?void 0:G.totalWithContingency)||0;return A.changeOrderHistory&&A.changeOrderHistory.length>0&&(w=A.changeOrderHistory[A.changeOrderHistory.length-1].newTotal),n.jsxs("div",{style:{...p.box,padding:32,position:"relative",background:A.status==="Cancelled"?"#f8d7da":pe?"#e8f5e9":"#f8f9fa",borderLeft:A.status==="Cancelled"?"6px solid #dc3545":pe?"6px solid #2c5530":"none",opacity:A.status==="Cancelled"?.75:1},children:[n.jsxs("div",{style:{position:"absolute",top:12,right:12,display:"flex",gap:8},children:[pe&&A.status!=="Cancelled"?n.jsx("button",{"data-testid":"start-change-order-btn",style:{...p.btnSm,background:"#0d6efd",color:"#fff",padding:"8px 16px",fontSize:14,fontWeight:600},onClick:()=>H(A),title:"Create change order",children:"📝 Change Order"}):pe?null:n.jsx("button",{"data-testid":"edit-quote-btn",style:{...p.btnSm,background:"#ffc107",color:"#000",padding:"8px 16px",fontSize:14,fontWeight:600},onClick:()=>$(A),title:"Edit quote",children:"✏️ Edit"}),n.jsx("button",{style:{...p.btnSm,background:"#2c5530",padding:"8px 16px",fontSize:14,fontWeight:600},onClick:()=>R(A,pe),title:pe?"View contract and folders":"View quote and folders",children:"👁️ View"}),n.jsx("button",{style:{background:"#dc3545",border:"none",color:"#fff",cursor:"pointer",fontSize:18,padding:"6px 10px",borderRadius:6},onClick:()=>I(A),title:"Delete",children:"🗑️"})]}),n.jsxs("div",{style:{marginBottom:12},children:[n.jsxs("div",{style:{fontSize:14,color:"#666",fontWeight:500,marginBottom:8,paddingRight:200},children:[ae.icon," ",ae.name,pe&&(A.status==="Cancelled"?n.jsx("span",{style:{marginLeft:8,color:"#dc3545",fontWeight:700},children:"• CANCELLED CONTRACT"}):n.jsx("span",{style:{marginLeft:8,color:"#2c5530",fontWeight:700},children:"• CONTRACT"}))]}),n.jsx("h4",{style:{margin:0,fontSize:24,fontWeight:700,paddingRight:40},children:A.homeModel!=="NONE"?A.homeModel:`${A.houseWidth}' × ${A.houseLength}'`})]}),n.jsx("div",{style:{fontSize:28,fontWeight:800,color:"#2c5530",marginTop:12,marginBottom:16},children:D(w)}),A.changeOrderHistory&&A.changeOrderHistory.length>0&&n.jsxs("div",{style:{fontSize:12,color:"#666",marginBottom:8,fontStyle:"italic"},children:["Includes ",A.changeOrderHistory.length," change order(s) • ",A.changeOrderHistory.filter(yt=>yt.status==="Signed").length," signed"]}),n.jsxs("div",{style:{marginTop:16,padding:"16px",background:"#fff3cd",borderRadius:8,border:"3px solid #ffc107"},children:[n.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#856404",marginBottom:6,textTransform:"uppercase",letterSpacing:"1px"},children:"Last Saved"}),n.jsxs("div",{style:{fontSize:22,fontWeight:800,color:"#000",marginBottom:6,lineHeight:1.2},children:["🕐 ",cf(A.updatedAt||A.createdAt)]}),n.jsxs("div",{style:{fontSize:14,color:"#666",fontWeight:600},children:["by ",A.updatedBy||A.createdBy||"System",A.editVersion>0&&` • Version ${A.editVersion}`]})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,gap:12},children:[n.jsxs("span",{style:{fontSize:13,color:"#999",fontWeight:500},children:["Created: ",Fi(A.createdAt)]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("select",{style:{fontSize:13,padding:"6px 12px",fontWeight:700,borderRadius:6,border:"2px solid",cursor:"pointer",background:A.status==="Completed"?"#198754":A.status==="Under Contract"?"#0d6efd":A.status==="Cancelled"?"#dc3545":A.status==="Accepted"?"#d1e7dd":A.status==="Draft"?"#fff3cd":A.status==="Declined"?"#f8d7da":"#e9ecef",color:["Completed","Under Contract","Cancelled"].includes(A.status)?"#fff":"#000",borderColor:A.status==="Completed"?"#146c43":A.status==="Under Contract"?"#0a58ca":A.status==="Cancelled"?"#b02a37":A.status==="Accepted"?"#a3cfbb":A.status==="Draft"?"#ffca2c":A.status==="Declined"?"#f1aeb5":"#dee2e6"},"data-testid":"quote-status-select",value:A.status,onChange:yt=>{yt.stopPropagation(),v(A,yt.target.value)},onClick:yt=>yt.stopPropagation(),children:pe?["Accepted","Under Contract","Completed","Cancelled"].map(yt=>n.jsx("option",{value:yt,children:yt},yt)):["Draft","Sent","Accepted","Declined"].map(yt=>n.jsx("option",{value:yt,children:yt},yt))}),y>0&&n.jsxs("span",{style:{fontSize:13,color:"#666",fontWeight:500},children:["📁 ",y," file",y!==1?"s":""]})]})]})]},A.id)};return n.jsxs("div",{children:[n.jsx("button",{"data-testid":"back-to-dashboard-btn",style:{...p.btn2,marginBottom:16},onClick:J,children:"← Back to Customers"}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[n.jsxs("div",{children:[n.jsxs("h1",{style:{margin:0},children:[l.firstName," ",l.lastName]}),l.person2FirstName&&n.jsxs("p",{style:{color:"#666"},children:["& ",l.person2FirstName," ",l.person2LastName]}),n.jsxs("p",{style:{color:"#999",fontSize:12},children:["Created by ",l.createdBy," on ",Fi(l.createdAt)]})]}),n.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[n.jsx("button",{"data-testid":"edit-customer-btn",style:{...p.btn,width:"auto",background:"#ffc107",color:"#000"},onClick:()=>Y(l),children:"✏️ Edit"}),n.jsxs("div",{style:{position:"relative"},children:[n.jsxs("button",{"data-testid":"new-quote-btn",style:{...p.btn,width:"auto",display:"flex",alignItems:"center",gap:8},onClick:()=>F(!V),children:["+ New Quote ",n.jsx("span",{style:{fontSize:10},children:"▼"})]}),V&&n.jsxs(n.Fragment,{children:[n.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:99},onClick:()=>F(!1)}),n.jsxs("div",{style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"#fff",borderRadius:8,boxShadow:"0 4px 20px rgba(0,0,0,0.15)",border:"1px solid #e0e0e0",minWidth:220,zIndex:100,overflow:"hidden"},children:[n.jsx("div",{style:{padding:"8px 12px",background:"#f8f9fa",borderBottom:"1px solid #e0e0e0",fontSize:12,color:"#666",fontWeight:600},children:"Select Quote Type"}),$r.map(A=>n.jsxs("div",{onClick:()=>{A.enabled&&(ee(A.id),F(!1))},style:{padding:"12px 16px",cursor:A.enabled?"pointer":"default",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid #f0f0f0",background:A.enabled?"#fff":"#f8f9fa",opacity:A.enabled?1:.6,transition:"background 0.15s"},onMouseEnter:pe=>A.enabled&&(pe.currentTarget.style.background="#f0f7f1"),onMouseLeave:pe=>A.enabled&&(pe.currentTarget.style.background="#fff"),children:[n.jsx("span",{style:{fontSize:20},children:A.icon}),n.jsxs("div",{style:{flex:1},children:[n.jsx("div",{style:{fontWeight:500},children:A.name}),!A.enabled&&n.jsx("a",{href:"https://claude.ai",target:"_blank",rel:"noopener noreferrer",title:"Add subscription to access",style:{fontSize:11,color:"#1565c0",textDecoration:"none"},onClick:pe=>pe.stopPropagation(),children:"🔒 Add subscription to access"})]})]},A.id))]})]})]}),n.jsx("button",{style:p.btnDanger,onClick:()=>oe(l),children:"🗑️"})]})]}),n.jsxs("div",{style:p.grid,children:[n.jsxs("div",{style:p.box,children:[n.jsx("h3",{children:"Contact"}),n.jsxs("p",{children:["📞 ",l.phone,l.phone2&&` / ${l.phone2}`]}),n.jsxs("p",{style:{fontSize:13},children:["✉️ ",l.email]}),l.email2&&n.jsxs("p",{style:{fontSize:13},children:["✉️ ",l.email2]})]}),n.jsxs("div",{style:p.box,children:[n.jsx("h3",{children:"Site Address"}),n.jsx("p",{children:l.siteAddress}),n.jsxs("p",{children:[l.siteCity,", ",l.siteState," ",l.siteZip]}),l.siteCounty&&n.jsxs("p",{style:{fontSize:13,color:"#666"},children:["County: ",l.siteCounty]})]}),l.mailingAddress&&n.jsxs("div",{style:p.box,children:[n.jsx("h3",{children:"Mailing Address"}),n.jsx("p",{children:l.mailingAddress}),n.jsxs("p",{children:[l.mailingCity,", ",l.mailingState," ",l.mailingZip]})]})]}),n.jsx("div",{style:{...p.box,marginTop:24},children:Ae.length===0&&ce.length===0&&ne.length===0?n.jsxs("div",{children:[n.jsx("h2",{style:{margin:"0 0 16px"},children:"Quotes & Contracts"}),n.jsx("p",{style:{color:"#666",textAlign:"center",padding:20},children:'No quotes yet. Click "+ New Quote" to create one.'})]}):n.jsxs("div",{children:[ce.length>0&&n.jsxs("div",{style:{marginBottom:32},children:[n.jsxs("h2",{style:{margin:"0 0 16px",color:"#2c5530"},children:["📜 Contracts (",ce.length,")"]}),n.jsx("div",{style:p.grid,children:ce.map(A=>Ne(A,!0))})]}),n.jsxs("div",{children:[n.jsxs("h2",{style:{margin:"0 0 16px"},children:["📋 Quotes (",Ae.length,")"]}),Ae.length===0?n.jsx("p",{style:{color:"#666",textAlign:"center",padding:20},children:"No pending quotes."}):n.jsx("div",{style:p.grid,children:Ae.map(A=>Ne(A,!1))})]}),ne.length>0&&n.jsxs("div",{style:{marginTop:32},children:[n.jsxs("h2",{style:{margin:"0 0 16px",color:"#dc3545"},children:["🚫 Cancelled Contracts (",ne.length,")"]}),n.jsx("div",{style:p.grid,children:ne.sort((A,pe)=>new Date(pe.createdAt)-new Date(A.createdAt)).map(A=>Ne(A,!0))})]})]})})]})},Cr=()=>({id:"",customerId:"",quoteType:"modular_home",homeModel:"NONE",homeBasePrice:"0",houseWidth:"",houseLength:"",singleDouble:"Single",walkDoors:"2",foundationType:"none",iBeamHeight:"",selectedServices:{installation_of_home:!0,drywall:!0,painting:!0,carpet:!0,dumpster:!0,siding_install:!0,interior_trim_out:!0,permits:!0,electric_connection:!0,concrete_skirting:!0,plumbing:!0,gas_propane:!0},servicePriceOverrides:{},serviceQuantities:{},serviceDays:{},serviceDimensions:{},serviceDescriptions:{},serviceNotes:{},serviceCrewNotes:{},publishedServiceNotes:{},publishedServiceCrewNotes:{},generalCrewNote:"",generalCustomerNote:"",publishedGeneralCrewNotes:[],publishedGeneralCustomerNotes:[],removedMaterials:{},removedServices:{},landscapingMaterialCost:"",deckMaterialCost:"",customServices:[{name:"",price:""}],customOptions:[],customMaterials:[],sewerType:"none",wellDepth:"0",patioSize:"none",driveTime:String(pa),status:"Draft",folders:{clayton_docs:[],crew_files:[],estimates:[],permits:[],change_orders:[],contracts:[]},scrubbCosts:{},scrubbDocs:{},scrubbHistory:[],permitEntries:[]}),oa=()=>({id:"",firstName:"",lastName:"",phone:"",email:"",person2FirstName:"",person2LastName:"",phone2:"",email2:"",siteAddress:"",siteCity:"",siteState:"MN",siteZip:"",siteCounty:"",mailingAddress:"",mailingCity:"",mailingState:"",mailingZip:""}),Xf="https://sherman-callerid.onrender.com",Kf="sherman-sync-key-2024";function qf(){return n.jsxs(Tf,{children:[n.jsx(eh,{}),n.jsx(If,{})]})}function eh(){var xo,yo,vo,bo,wo,es,ll,al,dl,So,ko,Es,zs,cl,ur,pl,jo,Br,Lr,Co,No,$o,ul,fl,hl,ml;const{isAuth:l,setIsAuth:u,isCustomerPortal:h,setIsCustomerPortal:S,customerData:j,setCustomerData:k,userRole:L,setUserRole:T,originalRole:W,setOriginalRole:E,userName:z,setUserName:V,loginU:F,setLoginU:J,loginP:Y,setLoginP:oe,loginError:ee,setLoginError:R,tempName:$,setTempName:H}=Bf(),[I,v]=xe.useState("dashboard"),[re,O]=xe.useState(""),[te,ze]=xe.useState([]),[ne,ye]=xe.useState([]),[ve,ce]=xe.useState([]),[Ae,Ne]=xe.useState([]),[A,pe]=xe.useState(null),[G,ae]=xe.useState(null),[y,w]=xe.useState(null),{newQ:d,setNewQ:P,editingQuoteId:ie,setEditingQuoteId:le,originalQuoteForComparison:de,setOriginalQuoteForComparison:_e,changeOrderDeletions:$e,setChangeOrderDeletions:Ee,changeOrderAdjustments:Xe,setChangeOrderAdjustments:$t,changeOrderAdditions:yt,setChangeOrderAdditions:mn}=Lf(Cr),[ot,Kt]=xe.useState(oa()),[an,gn]=xe.useState(null),[$i,Gn]=xe.useState(!1),[Hi,Yn]=xe.useState(!1),[Hs,Er]=xe.useState(!1),{quoteTab:On,setQuoteTab:Qi,generalNoteMode:Rt,setGeneralNoteMode:Ei,generalNoteDraft:pi,setGeneralNoteDraft:zi,crewTab:Zn,setCrewTab:Vi,pricingTab:Jn,setPricingTab:ps,pricingEditMode:Pt,setPricingEditMode:us,expandedServiceNotes:vt,setExpandedServiceNotes:Zt,installSvcCollapsed:ui,setInstallSvcCollapsed:Qs,proSvcCollapsed:fi,setProSvcCollapsed:Di,homeSelCollapsed:In,setHomeSelCollapsed:zr,houseSpecsCollapsed:Ai,setHouseSpecsCollapsed:Dr,deleteConfirm:xn,setDeleteConfirm:fs,deleteCustomerConfirm:_i,setDeleteCustomerConfirm:Gi,showRestoreMaterials:ni,setShowRestoreMaterials:Yi,isPierDiagramExpanded:Rn,setIsPierDiagramExpanded:Ve,isFloorPlanExpanded:Nt,setIsFloorPlanExpanded:Xn,isPierDiagramExpandedSummary:ii,setIsPierDiagramExpandedSummary:Vs}=Mf();Wf();const{scrubbEditingService:Gs,setScrubbEditingService:Zi,scrubbNewCost:lo,setScrubbNewCost:dn,nhlExpanded:ao,setNhlExpanded:Vo,showPermitModal:ha,setShowPermitModal:Ys,editingPermitEntry:Zs,setEditingPermitEntry:Js,permitEntryName:Xs,setPermitEntryName:Ks,permitEntryCost:Go,setPermitEntryCost:Et,showAddlMaterialModal:ma,setShowAddlMaterialModal:hs,editingMaterialEntry:qs,setEditingMaterialEntry:Ji,materialEntryName:Ar,setMaterialEntryName:ms,materialEntryCost:er,setMaterialEntryCost:yn,scrubbDragOverService:gs,setScrubbDragOverService:cn,scrubbUploadingService:Yo,setScrubbUploadingService:co,showPaymentForm:ga,setShowPaymentForm:xs,newPayment:$n,setNewPayment:si}=Rf(),[tr,Zo]=xe.useState(null),[qd,Jo]=xe.useState(!1),[xa,Xo]=xe.useState({name:"",type:"link",url:"",notes:""}),[nr,po]=xe.useState(null),[pn,ut]=xe.useState(sa),[Vt,ys]=xe.useState(la),[it,ir]=xe.useState(Pn),[Ft,sr]=xe.useState(aa),[zt,Xi]=xe.useState(io),[lt,Bn]=xe.useState(oo),[He,hi]=xe.useState({install:Qd,service:Nr,projectCommand:Qo,inspection:Vd}),[ft,vn]=xe.useState({psPerService:150,pmBase:4e3}),[mi,Ki]=xe.useState({username:"",fullName:"",company:"",role:"sales",phone:""});xe.useEffect(()=>{(async()=>{try{const r=await window.storage.get("sherman_quotes");r!=null&&r.value&&ze(JSON.parse(r.value))}catch{}try{const r=await window.storage.get("sherman_contracts");r!=null&&r.value&&ye(JSON.parse(r.value))}catch{}try{const r=await window.storage.get("sherman_pricing");if(r!=null&&r.value){const c=JSON.parse(r.value);if(c.homeModels){const m=c.homeModels.map(g=>{const x=sa.find(N=>N.name===g.name);return{...g,floorPlanUrl:g.floorPlanUrl||(x==null?void 0:x.floorPlanUrl)||""}});ut(m)}if(c.materials){const m={};Object.entries(c.materials).forEach(([g,x])=>{m[g]={...x,cost:x.cost!==void 0?x.cost:x.price||0}}),ys(m)}if(c.services){const{landscaping:m,deck:g,...x}=c.services,N=Object.fromEntries(Object.entries(x).filter(([be,ke])=>ke!=null&&Pn[be])),X={...Pn,...N};ir(X)}c.sewer&&sr(c.sewer),c.patio&&Xi({...c.patio,...io}),c.foundation&&Bn(c.foundation),c.driveRates&&hi(c.driveRates),c.projectCommandRates&&vn(c.projectCommandRates)}}catch{}try{const r=await window.storage.get("sherman_users");r!=null&&r.value&&Ne(JSON.parse(r.value))}catch{}try{const r=await window.storage.get("sherman_customers");r!=null&&r.value&&ce(JSON.parse(r.value))}catch{}})()},[]);const Gt=ra("sherman_quotes",ze),En=ra("sherman_contracts",ye),_r=ra("sherman_customers",ce),rr=ra("sherman_users",Ne),at=L==="admin",_t=L==="sales",or=at||_t?te:te.filter(r=>r.createdBy===z),lr=at||_t?ve:ve.filter(r=>r.createdBy===z),Q=G||A,Se=y||(Q?(r=>ve.find(c=>c.id===r))(Q.customerId):null),Ko=Se?Vp(Se.siteAddress,Se.siteCity,Se.siteState,Se.siteZip):null,ar=Q&&Se?{...Q,...Se,customerFirstName:Se.firstName,customerLastName:Se.lastName}:null;Ae.find(r=>r.username===z);const Te=xe.useMemo(()=>I==="newQuote"&&y&&d.houseWidth&&d.houseLength?Xt.calculateQuoteTotals(d,y,Vt,it,Ft,zt,He,lt,ft):I==="viewQuote"&&ar?Kd(ar,Vt,it,Ft,zt,He,lt,ft):null,[I,d,y,ar,Vt,it,Ft,zt,He,lt,ft]),vs=xe.useMemo(()=>_f({materials:Vt,services:it,sewerPricing:Ft,patioPricing:zt,driveRates:He,foundationPricing:lt,homeModels:pn,userName:z,quotes:te,contracts:ne,selQuote:A,selContract:G,selCustomer:y,setSelQuote:pe,setSelContract:ae,saveQuotes:Gt,saveContracts:En,generateQuoteHtml:kf,generatePierDiagramHtml:jf,generateScopeOfWorkDocument:Zp,generateCrewWorkOrderDocument:Jp,generateAllowanceProgressDocument:Nf,generateChangeOrderDocument:Yp}),[Vt,it,Ft,zt,He,lt,pn,z,te,ne,A,G,y]),qo=async r=>{const c=ve;try{const m=c.filter(x=>x.phone).map(x=>{const N=te.filter(X=>X.customerId===x.id||X.createdBy===x.createdBy).sort((X,be)=>new Date(be.createdAt)-new Date(X.createdAt))[0];return{name:`${x.firstName} ${x.lastName}`,phone:x.phone,phone2:x.phone2||"",quoteInfo:N?`${N.houseWidth}'x${N.houseLength}' ${N.singleDouble||""} - ${N.homeModel||"Custom"} (${N.status})`:""}}),g=await fetch(`${Xf}/api/sync-customers`,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Kf},body:JSON.stringify({customers:m})});if(!g.ok)throw new Error(`Server returned ${g.status}`);return!0}catch(m){return console.warn("Caller ID sync failed:",m.message),!1}},Ti=()=>{if(F.toUpperCase()==="SHERMAN"&&Y.toUpperCase()==="BIDDING")u(!0),S(!1),R("");else if(Y.toLowerCase()==="mybid"){const r=F.trim().toLowerCase().replace(/\s+/g,""),c=ve.find(m=>(m.firstName+m.lastName).toLowerCase().replace(/\s+/g,"")===r);if(c){u(!0),S(!0),k(c),R("");return}R("Customer not found. Enter your first and last name (no spaces) as username.")}else R("Invalid credentials")},dr=()=>{u(!1),S(!1),k(null),T(null),E(null),V("")},Tr=r=>{T(r.role),E(r.role),V(r.username)},el=(r,c)=>Kt(m=>({...m,[r]:c})),Pr=async()=>{var x,N,X,be,ke;if(!((x=ot.firstName)!=null&&x.trim())||!((N=ot.lastName)!=null&&N.trim())||!((X=ot.siteAddress)!=null&&X.trim())||!((be=ot.phone)!=null&&be.trim())||!((ke=ot.email)!=null&&ke.trim())){tt.warning("Please fill in required fields: Name, Site Address, Phone, and Email");return}const r=ve.filter(K=>!(an&&K.id===an)),c=Wi(ot.email);if(c){const K=r.find(q=>Wi(q.email)&&Wi(q.email)===c||Wi(q.email2)&&Wi(q.email2)===c);if(K){const q=Ae.find(Ce=>Ce.username===K.createdBy),ue=(q==null?void 0:q.fullName)||K.createdBy;tt.error(`DUPLICATE EMAIL ADDRESS

This email already exists for:

${K.firstName} ${K.lastName}
Email: ${ot.email}
Saved by: ${ue}

Cannot save customer with duplicate email.`);return}}if(ot.email2){const K=Wi(ot.email2);if(K){const q=r.find(ue=>Wi(ue.email)&&Wi(ue.email)===K||Wi(ue.email2)&&Wi(ue.email2)===K);if(q){const ue=Ae.find(De=>De.username===q.createdBy),Ce=(ue==null?void 0:ue.fullName)||q.createdBy;tt.error(`DUPLICATE EMAIL ADDRESS

This email already exists for:

${q.firstName} ${q.lastName}
Email: ${ot.email2}
Saved by: ${Ce}

Cannot save customer with duplicate email.`);return}}}const m=Mi(ot.phone);if(m){const K=r.find(q=>Mi(q.phone)&&Mi(q.phone)===m||Mi(q.phone2)&&Mi(q.phone2)===m);if(K){const q=Ae.find(Ce=>Ce.username===K.createdBy),ue=(q==null?void 0:q.fullName)||K.createdBy;tt.error(`DUPLICATE PHONE NUMBER

This phone number already exists for:

${K.firstName} ${K.lastName}
Phone: ${ot.phone}
Saved by: ${ue}

Cannot save customer with duplicate phone number.`);return}}if(ot.phone2){const K=Mi(ot.phone2);if(K){const q=r.find(ue=>Mi(ue.phone)&&Mi(ue.phone)===K||Mi(ue.phone2)&&Mi(ue.phone2)===K);if(q){const ue=Ae.find(De=>De.username===q.createdBy),Ce=(ue==null?void 0:ue.fullName)||q.createdBy;tt.error(`DUPLICATE PHONE NUMBER

This phone number already exists for:

${q.firstName} ${q.lastName}
Phone: ${ot.phone2}
Saved by: ${Ce}

Cannot save customer with duplicate phone number.`);return}}}const g=Object.keys(ot).reduce((K,q)=>(K[q]=typeof ot[q]=="string"?ot[q].trim():ot[q],K),{});if(an){const K=ki(g,{},z),q=tn(ve,an,K);await _r(q),w(K),v("viewCustomer")}else{const K={...g,id:Tn(),createdAt:new Date().toISOString(),createdBy:z};await _r([...ve,K]),w(K),v("viewCustomer")}Kt(oa()),gn(null),Gn(!1),Yn(!1),qo()},Or=r=>{Kt({...r}),gn(r.id),Gn(!!(r.person2FirstName||r.phone2||r.email2)),Yn(!!r.mailingAddress),v("newCustomer")},tl=async r=>{const c=te.filter(m=>m.customerId===r&&!m.changeOrderOf);if(c.length>0){tt.warning(`Cannot delete customer with ${c.length} quote(s). Delete quotes first.`);return}await _r(ve.filter(m=>m.id!==r)),v("dashboard"),w(null)},jt=(r,c)=>{P(m=>{const g={...m,[r]:c};if(r==="houseLength"&&c&&(g.iBeamHeight=Ci(parseFloat(c))),r==="houseWidth"&&parseFloat(c)>16?g.singleDouble="Double":r==="houseWidth"&&parseFloat(c)>0&&parseFloat(c)<=16&&(g.singleDouble="Single"),r==="driveTime"&&(g.driveTime=String(so(c))),r==="homeModel"){const x=pn.find(N=>N.name===c);g.homeBasePrice=x?String(x.price):"0",x&&x.width&&x.length&&(g.houseWidth=String(x.width),g.houseLength=String(x.length),g.iBeamHeight=Ci(x.length),g.singleDouble=x.width>16?"Double":"Single")}if(r==="foundationType"){g.selectedServices={...m.selectedServices};const x=m.foundationType,N=["basement_stairs","water_heater","updraft_furnace"],X=["gravel_driveway","sand_pad","crane"],be=["plumbing","electric_connection"];x==="basement"?[...N,...X,...be].forEach(ke=>{(c!=="crawlspace"||!X.includes(ke))&&(g.selectedServices[ke]=!1)}):x==="crawlspace"&&X.forEach(ke=>{c!=="basement"&&(g.selectedServices[ke]=!1)}),c==="basement"&&[...N,...X,...be].forEach(ke=>{g.selectedServices[ke]=!0}),c==="crawlspace"&&X.forEach(ke=>{g.selectedServices[ke]=!0})}return g})},zn=r=>P(c=>{const m={...c.selectedServices,[r]:!c.selectedServices[r]},g={...c.servicePriceOverrides},x={...c.serviceDimensions},N={...c.serviceDescriptions};return m[r]||(delete g[r],delete x[r],delete N[r]),{...c,selectedServices:m,servicePriceOverrides:g,serviceDimensions:x,serviceDescriptions:N}}),Ut=(r,c)=>P(m=>({...m,servicePriceOverrides:{...m.servicePriceOverrides,[r]:c}})),bs=(r,c,m)=>P(g=>{const x=[...g.customServices];return x[r]={...x[r],[c]:m},{...g,customServices:x}}),ya=()=>P(r=>({...r,customServices:[...r.customServices,{name:"",price:""}]})),fo=r=>P(c=>({...c,customServices:c.customServices.filter((m,g)=>g!==r)})),Pi=(r,c,m)=>P(g=>{const x=[...g.customOptions||[]];return x[r]={...x[r],[c]:m},{...g,customOptions:x}}),ws=()=>P(r=>({...r,customOptions:[...r.customOptions||[],{name:"",price:"",quantity:"1"}]})),cr=r=>P(c=>({...c,customOptions:(c.customOptions||[]).filter((m,g)=>g!==r)})),Ir=(r,c,m)=>P(g=>{const x=[...g.customMaterials||[]];return x[r]={...x[r],[c]:m},{...g,customMaterials:x}}),va=()=>P(r=>({...r,customMaterials:[...r.customMaterials||[],{name:"",price:"",quantity:"1"}]})),ba=r=>P(c=>({...c,customMaterials:(c.customMaterials||[]).filter((m,g)=>g!==r)})),nl=r=>P(c=>{var m;return{...c,removedMaterials:{...c.removedMaterials,[r]:!((m=c.removedMaterials)!=null&&m[r])}}}),Ss=r=>{if(!it[r])return 0;const c=d.serviceDays&&d.serviceDays[r]||1,m=d.patioSize&&d.patioSize!=="none"&&parseFloat(d.patioSize)||0;let g=Jd(r,it[r],so(d.driveTime),parseFloat(d.houseWidth)||0,parseFloat(d.houseLength)||0,He.service,c,d.singleDouble,d.foundationType,m);return g+=tu(r,d.foundationType||"none"),g},ks=r=>{var g;const c=(g=d.serviceNotes)==null?void 0:g[r];if(!c||!c.trim())return;const m={text:c,publishedAt:new Date().toISOString(),publishedBy:z||"User"};P(x=>{var N;return{...x,publishedServiceNotes:{...x.publishedServiceNotes,[r]:[...((N=x.publishedServiceNotes)==null?void 0:N[r])||[],m]},serviceNotes:{...x.serviceNotes,[r]:""}}})},js=r=>{var g;const c=(g=d.serviceCrewNotes)==null?void 0:g[r];if(!c||!c.trim())return;const m={text:c,publishedAt:new Date().toISOString(),publishedBy:z||"User"};P(x=>{var N;return{...x,publishedServiceCrewNotes:{...x.publishedServiceCrewNotes,[r]:[...((N=x.publishedServiceCrewNotes)==null?void 0:N[r])||[],m]},serviceCrewNotes:{...x.serviceCrewNotes,[r]:""}}})},Cs=(r,c)=>{var x;const m=((x=d.publishedServiceNotes)==null?void 0:x[r])||[],g=m[c];g&&(P(N=>({...N,serviceNotes:{...N.serviceNotes,[r]:g.text},publishedServiceNotes:{...N.publishedServiceNotes,[r]:m.filter((X,be)=>be!==c)}})),Zt(N=>({...N,[r]:!0})))},Ns=(r,c)=>{var x;const m=((x=d.publishedServiceCrewNotes)==null?void 0:x[r])||[],g=m[c];g&&(P(N=>({...N,serviceCrewNotes:{...N.serviceCrewNotes,[r]:g.text},publishedServiceCrewNotes:{...N.publishedServiceCrewNotes,[r]:m.filter((X,be)=>be!==c)}})),Zt(N=>({...N,[r]:!0})))},$s=(r,c)=>{var g;const m=((g=d.publishedServiceNotes)==null?void 0:g[r])||[];P(x=>({...x,publishedServiceNotes:{...x.publishedServiceNotes,[r]:m.filter((N,X)=>X!==c)}}))},qi=(r,c)=>{var g;const m=((g=d.publishedServiceCrewNotes)==null?void 0:g[r])||[];P(x=>({...x,publishedServiceCrewNotes:{...x.publishedServiceCrewNotes,[r]:m.filter((N,X)=>X!==c)}}))},wa=async(r,c,m)=>{var X;if(!confirm("Delete this file?"))return;const g={...m,folders:{...m.folders,[r]:(((X=m.folders)==null?void 0:X[r])||[]).filter(be=>be.id!==c)}},x=te.find(be=>be.id===m.id),N=ne.find(be=>be.id===m.id);if(x){const be=tn(te,m.id,g);await Gt(be),pe(g)}else if(N){const be=tn(ne,m.id,g);await En(be),ae(g)}},ho=async(r,c,m)=>{r.preventDefault(),r.stopPropagation(),po(null);try{if(!m){tt.warning("Please select a quote or contract first");return}const g=Array.from(r.dataTransfer.files);if(g.length===0)return;const x=50*1024*1024;for(const ke of g)if(ke.size>x){tt.error(`File "${ke.name}" is too large (max 50MB)`);return}let N=Nn.getFolders(m);for(const ke of g){let K="other";ke.type==="application/pdf"?K="pdf":ke.type.startsWith("image/")&&(K="image");const q=await nn(ke,ke.name),ue=Nn.createFileObject(ke.name,K,q,"",z);N[c]=[...N[c]||[],ue]}const X={...m,folders:N};if(te.find(ke=>ke.id===m.id)){const ke=tn(te,m.id,X);await Gt(ke),pe(X)}else{const ke=tn(ne,m.id,X);await En(ke),ae(X)}Zo(c),tt.success(`${g.length} file${g.length>1?"s":""} added to folder!`)}catch(g){console.error("Error uploading files:",g),tt.error(`Error uploading files: ${g.message}`)}},il=async()=>{var c,m;try{if(Gd.required(y,"Customer"),!d.houseWidth||!d.houseLength)throw new Error("Please select a home or enter house dimensions")}catch(g){tt.error(g.message);return}const r=ie&&de;if(ie&&!r){const g=d.editVersion||0,x={...d,customerId:y.id,id:Tn(),createdAt:new Date().toISOString(),createdBy:z,iBeamHeight:d.iBeamHeight||Ci(parseFloat(d.houseLength)||56),editVersion:g+1,copiedFrom:ie,status:"Draft"};await Gt([...te,x]),pe(x),v("viewQuote"),P(Cr()),le(null),_e(null)}else if(r){const g=d.changeOrderHistory||[],x=g.length+1,N={...d,servicePriceOverrides:{...d.servicePriceOverrides||{}},selectedServices:{...d.selectedServices||{}},customServices:[...d.customServices||[]],removedMaterials:{...d.removedMaterials||{}},removedServices:{...d.removedServices||{}}};Object.entries(Xe).forEach(([Qe,se])=>{if(se&&se.amount)if(Qe==="home_base_price")N.homeBasePrice=(parseFloat(d.homeBasePrice)||0)+se.amount;else if(Qe==="install_price")N.installPrice=(parseFloat(d.installPrice)||0)+se.amount;else{const gt=N.servicePriceOverrides[Qe]!==void 0?N.servicePriceOverrides[Qe]:it[Qe]?Jd(Qe,it[Qe],so(d.driveTime),parseFloat(d.houseWidth)||0,parseFloat(d.houseLength)||0,He.service,d.serviceDays&&d.serviceDays[Qe]||1,d.singleDouble,d.foundationType,d.patioSize&&d.patioSize!=="none"&&parseFloat(d.patioSize)||0):0;N.servicePriceOverrides[Qe]=gt+se.amount}});const X=Xt.calculateQuoteTotals(N,y,Vt,it,Ft,zt,He,lt,ft),be=Xt.calculateQuoteTotals(de,y,Vt,it,Ft,zt,He,lt,ft),ke=X.totalWithContingency-be.totalWithContingency;let K=be.contingency||0;g.forEach(Qe=>{Qe.contingencyUsed&&(K-=Qe.contingencyUsed)});let q=be.totalWithContingency;g.length>0&&(q=g[g.length-1].newTotal);const ue=ne.find(Qe=>Qe.id===ie);let Ce=0,De=0;if(ue){Ce=ke,De=0;const Qe=K-ke;if(Qe<0){if(!window.confirm(`Change Order Cost: ${D(ke)}

Contingency Available: ${D(K)}
Remaining After CO: ${D(Qe)}

WARNING: This will overdraft the contingency fund by ${D(Math.abs(Qe))}.
The contracted price will NOT change.

Proceed anyway?`))return}else if(!window.confirm(`Change Order Cost: ${D(ke)}

Contingency Available: ${D(K)}
Remaining After CO: ${D(Qe)}

The contracted price will NOT change. This will be drawn from the contingency fund.

Proceed?`))return}else De=ke;const Oe=Yp(d,de,{...y,customerId:y.id},X,be,Vt,it,Ft,zt,He,lt,$e,Xe,yt),Fe=`Change_Order_#${x}_${new Date().toLocaleDateString("en-US").replace(/\//g,"-")}.html`,dt=new TextEncoder().encode(Oe),Bt=btoa(String.fromCharCode(...dt)),un=Nn.createFileObject(Fe,"change_order",`data:text/html;base64,${Bt}`,"",z),he={...N,id:ie,customerId:y.id,updatedAt:new Date().toISOString(),updatedBy:z,iBeamHeight:N.iBeamHeight||Ci(parseFloat(N.houseLength)||56),folders:{...N.folders||Nn.getFolders(),crew_files:[...((c=N.folders)==null?void 0:c.crew_files)||[],un],change_orders:[...((m=N.folders)==null?void 0:m.change_orders)||[],un]},changeOrderHistory:[...g,{changeOrderNum:x,status:d.status,totalChange:ke,contingencyUsed:Ce,customerCost:De,contingencyBalance:K-Ce,newTotal:q+De,createdAt:new Date().toISOString(),createdBy:z,deletions:$e,adjustments:Xe,additions:yt}]},Re=te.find(Qe=>Qe.id===ie);if(ne.find(Qe=>Qe.id===ie)){const Qe=tn(ne,ie,he);await En(Qe),ae(he),pe(null)}else if(Re){const Qe=tn(te,ie,he);await Gt(Qe),pe(he),ae(null)}v("viewQuote"),P(Cr()),le(null),_e(null),Ee([]),$t({}),mn([]),tt.success(`Change Order #${x} saved!`);const Ge=K-Ce;Ge<0&&setTimeout(()=>{tt.warning(`⚠️ CONTINGENCY FUND OVERDRAWN ⚠️

The contingency fund is now negative by ${D(Math.abs(Ge))}.

A payment must be collected from the customer before any additional work can continue.

Go to the Contingency Fund Tracker on the Scrubb tab to review the balance.`)},300)}else{let g={...d,customerId:y.id,id:Tn(),createdAt:new Date().toISOString(),createdBy:z,iBeamHeight:d.iBeamHeight||Ci(parseFloat(d.houseLength)||56),editVersion:0};await Gt([...te,g]),pe(g),v("viewQuote"),P(Cr()),_e(null)}},sl=r=>{P({...r}),le(r.id),v("newQuote")},Rr=r=>{_e({...r}),Ee([]),$t({}),mn([]),P({...r}),le(r.id),v("newQuote")},Sa=r=>{const{id:c,createdAt:m,createdBy:g,updatedAt:x,updatedBy:N,editVersion:X,...be}=r;P({...be,status:"Draft"}),le(null),v("newQuote")},rl=()=>{P(Cr()),le(null),_e(null),Ee([]),$t({}),mn([]),v(y?"viewCustomer":"dashboard")},ka=async r=>{try{const c=te.some(g=>g.id===r),m=ne.some(g=>g.id===r);c&&await Gt(te.filter(g=>g.id!==r)),m&&await En(ne.filter(g=>g.id!==r))}catch(c){console.error("Delete failed:",c)}v(y?"viewCustomer":"dashboard"),pe(null),ae(null),fs(null)},mo=async(r,c)=>{const m=te.find(N=>N.id===r.id),g=ne.find(N=>N.id===r.id);if(m&&c==="Accepted"&&r.status!=="Accepted"){const N={...r,status:c,contractCreatedAt:new Date().toISOString(),contractCreatedBy:z,changeOrderHistory:[]},X=te.filter(K=>K.id!==r.id),be=[...ne,N];await Gt(X),await En(be),A&&A.id===r.id&&(ae(N),pe(null));try{const K=ve.find(q=>q.id===N.customerId);K?(await vs.saveScopeOfWorkToFolders(N,K),tt.success(`Quote accepted and converted to Contract!

Scope of Work document has been automatically generated and saved to Customer Docs folder.`)):tt.success("Quote accepted and converted to Contract!")}catch(K){console.error("Error generating Scope of Work:",K),alert("Quote accepted and converted to Contract!")}const ke=JSON.parse(localStorage.getItem("sherman_quotes")||"[]").filter(K=>K.id!==r.id);localStorage.setItem("sherman_quotes",JSON.stringify(ke)),ze(ke)}else if(g){const N=ne.map(X=>X.id===r.id?{...X,status:c}:X);await En(N),G&&G.id===r.id&&ae({...r,status:c})}else if(m){const N=te.map(X=>X.id===r.id?{...X,status:c}:X);await Gt(N),A&&A.id===r.id&&pe({...r,status:c})}},ol=async(r,c)=>{const m=te.find(x=>x.id===r),g=ne.find(x=>x.id===r);if(m){const x={...m,...c},N=tn(te,r,x);await Gt(N),(A==null?void 0:A.id)===r&&pe(x)}else if(g){const x={...g,...c},N=tn(ne,r,x);await En(N),(G==null?void 0:G.id)===r&&ae(x)}},ja=async()=>{try{if(Gd.required(mi.username,"Username"),Gd.required(mi.fullName,"Full Name"),Ae.find(m=>m.username.toLowerCase()===mi.username.toLowerCase())){tt.error("Username already exists");return}const c={...mi,id:Tn(),createdAt:new Date().toISOString()};await rr([...Ae,c]),Ki({username:"",fullName:"",company:"",role:"sales",phone:""})}catch(r){tt.error(r.message)}},Ca=async r=>{confirm("Delete this user?")&&await rr(Ae.filter(c=>c.id!==r))},Na=async()=>{try{await window.storage.set("sherman_pricing",JSON.stringify({homeModels:pn,materials:Vt,services:it,sewer:Ft,patio:zt,foundation:lt,driveRates:He,projectCommandRates:ft})),us(!1),tt.success("Pricing saved and locked!")}catch{tt.error("Error saving pricing")}},$a=async()=>{if(confirm("Discard all unsaved changes?")){try{const r=await window.storage.get("sherman_pricing");if(r!=null&&r.value){const c=JSON.parse(r.value);if(c.homeModels&&ut(c.homeModels),c.materials){const m={};Object.entries(c.materials).forEach(([g,x])=>{m[g]={...x,cost:x.cost!==void 0?x.cost:x.price||0}}),ys(m)}if(c.services){const{landscaping:m,deck:g,...x}=c.services,N=Object.fromEntries(Object.entries(x).filter(([X,be])=>be!=null&&Pn[X]));ir({...Pn,...N})}c.sewer&&sr(c.sewer),c.patio&&Xi({...c.patio,...io}),c.foundation&&Bn(c.foundation),c.driveRates&&hi(c.driveRates),c.projectCommandRates&&vn(c.projectCommandRates)}}catch{}us(!1)}},Ea=async()=>{if(confirm("Reset all pricing to factory defaults?")){ut(sa),ys(la),ir(Pn),sr(aa),Xi(io),Bn(oo),hi({install:Qd,service:Nr,projectCommand:Qo,inspection:Vd}),vn({psPerService:150,pmBase:4e3});try{await window.storage.set("sherman_pricing",JSON.stringify({homeModels:sa,materials:la,services:Pn,sewer:aa,patio:io,foundation:oo,driveRates:{install:Qd,service:Nr,projectCommand:Qo,inspection:Vd},projectCommandRates:{psPerService:150,pmBase:4e3}})),tt.success("Pricing reset to defaults and saved!")}catch{tt.warning("Pricing reset but failed to save")}}},za=()=>{if(!Xs.trim()){tt.warning("Please enter a permit name");return}const r=parseFloat(Go)||0,c=(Q==null?void 0:Q.permitEntries)||[],m=Zs?c.map(x=>x.id===Zs.id?{...x,name:Xs,cost:r}:x):[...c,{id:Tn(),name:Xs,cost:r,addedAt:new Date().toISOString(),addedBy:z}],g=ki(Q,{permitEntries:m},z);(A==null?void 0:A.id)===Q.id?(Gt(tn(te,Q.id,g)),pe(g)):(G==null?void 0:G.id)===Q.id&&(En(tn(ne,Q.id,g)),ae(g)),Ys(!1),Js(null),Ks(""),Et("")},go=()=>{Ys(!1),Js(null),Ks(""),Et("")},pr=()=>{if(!Ar.trim()){tt.warning("Please enter a material name");return}const r=parseFloat(er)||0,c=(Q==null?void 0:Q.addlMaterialEntries)||[],m=qs?c.map(x=>x.id===qs.id?{...x,name:Ar,cost:r}:x):[...c,{id:Tn(),name:Ar,cost:r,addedAt:new Date().toISOString(),addedBy:z}],g=ki(Q,{addlMaterialEntries:m},z);(A==null?void 0:A.id)===Q.id?(Gt(tn(te,Q.id,g)),pe(g)):(G==null?void 0:G.id)===Q.id&&(En(tn(ne,Q.id,g)),ae(g)),hs(!1),Ji(null),ms(""),yn("")},Da=()=>{hs(!1),Ji(null),ms(""),yn("")};return xe.useEffect(()=>(window.editQuoteFromPopup=r=>{const c=te.find(m=>m.id===r);if(c){const m=ve.find(g=>g.id===c.customerId);m&&w(m),Sa(c)}},()=>{delete window.editQuoteFromPopup}),[te,ve]),l?h&&j?n.jsx(Gf,{customerData:j,quotes:te,services:it,materials:Vt,sewerPricing:Ft,patioPricing:zt,driveRates:He,foundationPricing:lt,homeModels:pn,onLogout:dr,onGenerateQuote:()=>{}}):L?L==="crew"?n.jsxs("div",{style:p.app,children:[n.jsxs("header",{style:p.header,children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsx("span",{style:{fontWeight:800,fontSize:22,letterSpacing:2,color:"#fff"},children:"SHERMAN"}),n.jsx("span",{style:{fontWeight:600},children:"Field Crew"})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[W==="admin"&&n.jsxs("select",{"data-testid":"role-switcher",style:{background:"rgba(255,255,255,0.15)",color:"#fff",border:"1px solid rgba(255,255,255,0.3)",padding:"8px 12px",borderRadius:4,fontSize:14,cursor:"pointer"},value:L,onChange:r=>{T(r.target.value),v("dashboard"),pe(null),w(null)},children:[n.jsx("option",{value:"admin",style:{color:"#333"},children:"Admin View"}),n.jsx("option",{value:"sales",style:{color:"#333"},children:"Sales View"}),n.jsx("option",{value:"crew",style:{color:"#333"},children:"Crew View"})]}),n.jsxs("span",{children:[z," ",W==="admin"&&n.jsx("span",{style:{opacity:.7},children:"(viewing as crew)"})]}),n.jsx("button",{"data-testid":"logout-btn",style:p.nav,onClick:dr,children:"Sign Out"})]})]}),n.jsxs("div",{style:p.main,children:[n.jsx("div",{style:{display:"flex",gap:8,marginBottom:20},children:["Jobs","Warranties","Checklists"].map(r=>n.jsx("button",{style:{...p.tab,...Zn===r.toLowerCase()?p.tabA:{}},onClick:()=>Vi(r.toLowerCase()),children:r},r))}),Zn==="jobs"&&!A&&n.jsxs("div",{children:[n.jsx("h2",{children:"Active Jobs"}),ne.filter(r=>r.status!=="Cancelled").concat(te.filter(r=>["Accepted","Under Contract"].includes(r.status))).map(r=>{const c=ve.find(m=>m.id===r.customerId);return n.jsxs("div",{style:{...p.box,cursor:"pointer"},onClick:()=>pe(r),children:[n.jsxs("h3",{style:{margin:0},children:[(c==null?void 0:c.firstName)||"Unknown"," ",(c==null?void 0:c.lastName)||"Customer"]}),n.jsxs("p",{style:{color:"#666"},children:[(c==null?void 0:c.siteCity)||"Unknown",", ",(c==null?void 0:c.siteState)||""]})]},r.id)}),ne.filter(r=>r.status!=="Cancelled").length===0&&te.filter(r=>["Accepted","Under Contract"].includes(r.status)).length===0&&n.jsx("div",{style:p.box,children:"No active jobs"})]}),Zn==="jobs"&&A&&(()=>{var m;const r=ve.find(g=>g.id===A.customerId),c=((m=A.folders)==null?void 0:m.crew_files)||[];return n.jsxs("div",{children:[n.jsx("button",{style:p.btn2,onClick:()=>pe(null),children:"← Back"}),n.jsxs("div",{style:{...p.box,marginTop:16},children:[n.jsxs("h2",{children:[(r==null?void 0:r.firstName)||"Unknown"," ",(r==null?void 0:r.lastName)||"Customer"]}),n.jsx("p",{children:(r==null?void 0:r.phone)||"N/A"}),n.jsxs("p",{children:[(r==null?void 0:r.siteAddress)||"N/A",", ",(r==null?void 0:r.siteCity)||"N/A",", ",(r==null?void 0:r.siteState)||"N/A"]}),n.jsx("a",{href:Vp(r==null?void 0:r.siteAddress,r==null?void 0:r.siteCity,r==null?void 0:r.siteState,r==null?void 0:r.siteZip),target:"_blank",style:{...p.btnSm,background:"#4285f4",marginTop:12},children:"Maps / Directions"}),n.jsx(Yd,{quote:A})]}),n.jsxs("div",{style:{...p.box,marginTop:16},children:[n.jsx("h3",{style:{marginTop:0,color:"#2c5530"},children:"Crew Files"}),c.length>0?n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:c.map(g=>n.jsxs("div",{style:{padding:12,background:"#f8f9fa",borderRadius:6,border:"1px solid #dee2e6"},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[n.jsxs("div",{style:{fontWeight:700,fontSize:15},children:[g.type==="link"?"🔗":g.type==="pdf"?"📄":g.type==="image"?"🖼️":"📎"," ",g.name]}),n.jsx("button",{onClick:()=>{if(g.url.startsWith("data:")){const x=window.open();if(x){const N=x.document;N.open(),N.write("<!DOCTYPE html><html><head><title>"+g.name+"</title><style>body{margin:0;padding:0;overflow:hidden;}</style></head><body></body></html>"),N.close();const X=g.type==="image"?N.createElement("img"):N.createElement("iframe");X.style.cssText=g.type==="image"?"max-width:100%;display:block;":"width:100%;height:100vh;border:none;",X.src=g.url,N.body.appendChild(X)}}else window.open(g.url,"_blank")},style:{...p.btnSm,background:"#2c5530"},children:"Open"})]}),g.notes&&n.jsx("div",{style:{fontSize:13,color:"#666",marginBottom:6},children:g.notes}),n.jsxs("div",{style:{fontSize:11,color:"#999"},children:["Added by ",g.addedBy," on ",new Date(g.addedAt).toLocaleDateString()]})]},g.id||g.url))}):n.jsx("p",{style:{color:"#666",fontStyle:"italic"},children:"No crew files available"})]})]})})(),Zn==="warranties"&&n.jsxs("div",{style:p.box,children:[n.jsx("h2",{children:"Warranties"}),n.jsxs("table",{style:p.table,children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:p.th,children:"Manufacturer"}),n.jsx("th",{style:p.th,children:"Terms"}),n.jsx("th",{style:p.th,children:"Phone"})]})}),n.jsx("tbody",{children:Hp.map((r,c)=>n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:r.mfr}),n.jsx("td",{style:p.td,children:r.terms}),n.jsx("td",{style:p.td,children:r.phone})]},c))})]})]}),Zn==="checklists"&&n.jsxs("div",{children:[n.jsxs("div",{style:p.box,children:[n.jsx("h3",{children:"Delivery Checklist"}),Qp.docs.map((r,c)=>n.jsxs("label",{style:p.chk,children:[n.jsx("input",{type:"checkbox"}),n.jsx("span",{children:r})]},c)),Qp.exterior.map((r,c)=>n.jsxs("label",{style:p.chk,children:[n.jsx("input",{type:"checkbox"}),n.jsx("span",{children:r})]},`ext-${c}`))]}),n.jsxs("div",{style:p.box,children:[n.jsx("h3",{children:"Contract Checklist"}),lf.map(r=>n.jsxs("label",{style:p.chk,children:[n.jsx("input",{type:"checkbox"}),n.jsxs("span",{children:[r.id,". ",r.item]})]},r.id))]})]})]})]}):n.jsxs("div",{style:p.app,children:[n.jsxs("header",{style:p.header,children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsx("span",{style:{fontWeight:800,fontSize:22,letterSpacing:2,color:"#fff"},children:"SHERMAN"}),n.jsx("span",{style:{fontWeight:600},children:"Bidding System"})]}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{style:{...p.nav,...I==="dashboard"?{background:"rgba(255,255,255,0.2)"}:{}},onClick:()=>{v("dashboard"),pe(null),ae(null),w(null)},children:"Dashboard"}),n.jsx("button",{style:{...p.nav,...I==="warranties"?{background:"rgba(255,255,255,0.2)"}:{}},onClick:()=>v("warranties"),children:"Warranties"}),at&&n.jsx("button",{style:{...p.nav,...I==="users"?{background:"rgba(255,255,255,0.2)"}:{}},onClick:()=>v("users"),children:"Users"}),at&&n.jsx("button",{style:{...p.nav,...I==="pricing"?{background:"rgba(255,255,255,0.2)"}:{}},onClick:()=>v("pricing"),children:"Pricing"})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[W==="admin"&&n.jsxs("select",{"data-testid":"role-switcher",style:{background:"rgba(255,255,255,0.15)",color:"#fff",border:"1px solid rgba(255,255,255,0.3)",padding:"8px 12px",borderRadius:4,fontSize:14,cursor:"pointer"},value:L,onChange:r=>{T(r.target.value),v("dashboard"),pe(null),w(null)},children:[n.jsx("option",{value:"admin",style:{color:"#333"},children:"Admin View"}),n.jsx("option",{value:"sales",style:{color:"#333"},children:"Sales View"}),n.jsx("option",{value:"crew",style:{color:"#333"},children:"Crew View"})]}),n.jsxs("span",{children:[z," ",W==="admin"&&L!=="admin"&&n.jsxs("span",{style:{opacity:.7},children:["(viewing as ",L,")"]})]}),n.jsx("button",{"data-testid":"logout-btn",style:p.nav,onClick:dr,children:"Sign Out"})]})]}),n.jsxs("div",{style:p.main,children:[I==="dashboard"&&n.jsx(Yf,{myCustomers:lr,myQuotes:or,quotes:te,contracts:ne,searchQuery:re,setSearchQuery:O,isAdmin:at,userName:z,onNewCustomer:()=>{Kt(oa()),gn(null),Gn(!1),Yn(!1),v("newCustomer")},onSelectCustomer:r=>{w(r),v("viewCustomer")},onDeleteCustomer:r=>Gi(r)}),I==="newCustomer"&&n.jsx(Zf,{newCust:ot,updateCustField:el,editingCustomerId:an,showCustSecondContact:$i,setShowCustSecondContact:Gn,showCustMailingAddress:Hi,setShowCustMailingAddress:Yn,onSave:Pr,onCancel:()=>{Kt(oa()),gn(null),v("dashboard")}}),I==="viewCustomer"&&y&&n.jsx(Jf,{selCustomer:y,quotes:te,contracts:ne,customers:ve,services:it,materials:Vt,sewerPricing:Ft,patioPricing:zt,driveRates:He,foundationPricing:lt,isAdmin:at,showNewQuoteMenu:Hs,setShowNewQuoteMenu:Er,onBack:()=>{v("dashboard"),w(null)},onEditCustomer:()=>Or(y),onDeleteCustomer:r=>Gi(r),onNewQuote:r=>{P({...Cr(),quoteType:r,driveTime:String(pa)}),le(null),v("newQuote")},onViewQuote:r=>{ne.find(m=>m.id===r.id)?(ae(r),pe(null)):(pe(r),ae(null)),Qi("details"),v("viewQuote")},onEditQuote:r=>sl(r),onStartChangeOrder:r=>Rr(r),onDeleteQuote:r=>fs(r),onUpdateStatus:mo,emptyQuote:Cr}),I==="viewQuote"&&Q&&n.jsxs("div",{style:p.box,children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[n.jsx("button",{"data-testid":"back-to-customer-btn",style:p.btn2,onClick:()=>{v(y?"viewCustomer":"dashboard"),pe(null),ae(null)},children:"Back"}),n.jsxs("h2",{style:{margin:0},children:[G?"Contract":"Quote"," #",rt.getQuoteNum(Q)]}),n.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[n.jsx("select",{"data-testid":"quote-status-select",style:{fontSize:13,padding:"6px 12px",fontWeight:700,borderRadius:6,border:"2px solid",cursor:"pointer",background:Q.status==="Completed"?"#198754":Q.status==="Under Contract"?"#0d6efd":Q.status==="Accepted"?"#d1e7dd":Q.status==="Draft"?"#fff3cd":Q.status==="Declined"?"#f8d7da":"#e9ecef",color:["Completed","Under Contract"].includes(Q.status)?"#fff":"#000",borderColor:Q.status==="Completed"?"#146c43":Q.status==="Under Contract"?"#0a58ca":Q.status==="Accepted"?"#a3cfbb":Q.status==="Draft"?"#ffca2c":Q.status==="Declined"?"#f1aeb5":"#dee2e6"},value:Q.status,onChange:r=>mo(Q,r.target.value),children:G?["Accepted","Under Contract","Completed"].map(r=>n.jsx("option",{value:r,children:r},r)):["Draft","Sent","Accepted","Declined"].map(r=>n.jsx("option",{value:r,children:r},r))}),G?n.jsx("button",{"data-testid":"create-change-order-btn",style:p.btnBlue,onClick:()=>Rr(Q),children:"Change Order"}):n.jsx("button",{style:p.btnSm,onClick:()=>sl(Q),children:"Edit"})]})]}),n.jsxs("div",{style:{display:"flex",gap:4,marginBottom:16,flexWrap:"wrap"},children:[["details","files","scrubb","notes"].map(r=>n.jsx("button",{style:{...p.tab,...On===r?p.tabA:{}},onClick:()=>{Qi(r),r!=="notes"&&(Ei(null),zi(""))},children:r.charAt(0).toUpperCase()+r.slice(1)},r)),G&&n.jsx("button",{style:{...p.tab,...On==="scope"?p.tabA:{}},onClick:()=>Qi("scope"),children:"Scope of Work"})]}),On==="details"&&Te&&n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16},children:[n.jsx("button",{style:p.btnSm,onClick:()=>{const r={...Q,customerFirstName:Se==null?void 0:Se.firstName,customerLastName:Se==null?void 0:Se.lastName,phone:Se==null?void 0:Se.phone,email:Se==null?void 0:Se.email,siteAddress:Se==null?void 0:Se.siteAddress,siteCity:Se==null?void 0:Se.siteCity,siteState:Se==null?void 0:Se.siteState,siteZip:Se==null?void 0:Se.siteZip,siteCounty:Se==null?void 0:Se.siteCounty,person2FirstName:Se==null?void 0:Se.person2FirstName,person2LastName:Se==null?void 0:Se.person2LastName,phone2:Se==null?void 0:Se.phone2,email2:Se==null?void 0:Se.email2,mailingAddress:Se==null?void 0:Se.mailingAddress,mailingCity:Se==null?void 0:Se.mailingCity,mailingState:Se==null?void 0:Se.mailingState,mailingZip:Se==null?void 0:Se.mailingZip};Cf(r,Te,pn)},children:"📄 View Quote"}),n.jsx("button",{style:p.btnBlue,onClick:()=>{const r=rt.getQuoteNum(Q),c=Q.homeModel!=="NONE"?Q.homeModel:`${Q.houseWidth}'x${Q.houseLength}'`,m=Me(Te.totalWithContingency),g=`${(Se==null?void 0:Se.firstName)||""} ${(Se==null?void 0:Se.lastName)||""}`,x=((Se==null?void 0:Se.firstName)+(Se==null?void 0:Se.lastName)).replace(/\s+/g,""),N=encodeURIComponent(`Sherman Lumber - Quote #${r} for ${g}`),X=encodeURIComponent(`Hi ${(Se==null?void 0:Se.firstName)||"there"},

Thank you for choosing Sherman Lumber! Here are your quote details:

Quote #: ${r}
Home: ${c}
Total Investment: ${m}

To view your full quote online:
- Username: ${x}
- Password: mybid

Please don't hesitate to reach out with any questions.

Best regards,
${z}
Sherman Lumber Inc.`);window.location.href=`mailto:${(Se==null?void 0:Se.email)||""}?subject=${N}&body=${X}`},children:"✉️ Email Quote"}),G&&n.jsx("button",{style:p.btnOrange,onClick:()=>{const r=Jp(Q,Se,it);ca(r)},children:"🔧 Crew Work Order"}),G&&at&&n.jsx("button",{style:p.btnPurple,onClick:()=>{const r=rt.getQuoteNum(Q);let c={},m={};try{const x=localStorage.getItem("crew_checklist_"+r);x&&(c=JSON.parse(x))}catch{}try{const x=localStorage.getItem("crew_comments_"+r);x&&(m=JSON.parse(x))}catch{}const g=$f(Q,Se,it,c,m);ca(g)},children:"📊 Job Summary"})]}),n.jsx("h3",{children:"Quote Summary"}),n.jsx("div",{style:p.row,children:n.jsxs("div",{children:[n.jsx("strong",{children:"Status:"})," ",Q.status]})}),n.jsxs("div",{style:{background:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:8,padding:16,marginBottom:16},children:[n.jsx("h4",{style:{margin:"0 0 12px 0",color:"#2c5530",borderBottom:"2px solid #2c5530",paddingBottom:6},children:"Home"}),n.jsxs("div",{children:[n.jsx("strong",{children:"Model:"})," ",Q.homeModel!=="NONE"?Q.homeModel:"Custom"]}),Q.patioSize&&Q.patioSize!=="none"&&n.jsxs("div",{style:{marginTop:4},children:[n.jsx("strong",{children:"Patio:"})," ",Q.patioSize,"ft"]}),n.jsxs("div",{style:{marginTop:4},children:[n.jsx("strong",{children:"Foundation:"})," ",Zd(Ff,Q.foundationType)]}),(()=>{const r=Vn.filter(m=>{var g;return(g=Q.selectedServices)==null?void 0:g[m]}),c=(Q.customOptions||[]).filter(m=>m.name&&m.price);return r.length===0&&c.length===0?null:n.jsxs("div",{style:{marginTop:8},children:[n.jsx("strong",{style:{fontSize:13,color:"#555"},children:"Home Options:"}),n.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:6},children:[r.map(m=>{var be;const g=((be=Q.serviceQuantities)==null?void 0:be[m])||1,x=it[m],N=(x==null?void 0:x.name)||m.replace(/_/g," ").replace(/\b\w/g,ke=>ke.toUpperCase()),X=["tray_ceiling","sets_of_drawers"].includes(m);return n.jsxs("span",{style:{background:"#e8f5e9",color:"#2c5530",padding:"4px 10px",borderRadius:16,fontSize:12,fontWeight:600,border:"1px solid #a5d6a7"},children:[N,X&&g>1?` (x${g})`:""]},m)}),c.map((m,g)=>{const x=parseFloat(m.quantity)||1;return n.jsxs("span",{style:{background:"#e3f2fd",color:"#1565c0",padding:"4px 10px",borderRadius:16,fontSize:12,fontWeight:600,border:"1px solid #90caf9"},children:[m.name,x>1?` (x${x})`:""]},`custom_${g}`)})]})]})})()]}),n.jsx("table",{style:p.table,children:n.jsxs("tbody",{children:[(()=>{const r=new Set(["foundation","patio",...Vn,...(Q.customOptions||[]).map((x,N)=>`customopt_${N}`)]),c=Te.svc.filter(x=>r.has(x.key)),m=c.reduce((x,N)=>x+N.cost,0),g=Te.homePrice+m;return g<=0?null:n.jsxs(n.Fragment,{children:[n.jsx("tr",{children:n.jsx("td",{colSpan:2,style:{...p.td,fontWeight:700,fontSize:13,color:"#2c5530",paddingTop:8},children:"Home"})}),Te.homePrice>0&&n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,paddingLeft:20,fontSize:13,color:"#555"},children:Q.homeModel!=="NONE"?Q.homeModel:"Custom Home"}),n.jsx("td",{style:{...p.td,textAlign:"right",fontSize:13},children:Me(Te.homePrice)})]}),c.map(x=>n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,paddingLeft:20,fontSize:13,color:"#555"},children:x.item}),n.jsx("td",{style:{...p.td,textAlign:"right",fontSize:13},children:Me(x.cost)})]},x.key)),n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,paddingLeft:20,fontWeight:600},children:"Home Total"}),n.jsx("td",{style:{...p.td,textAlign:"right",fontWeight:600},children:Me(g)})]})]})})(),at&&Te.mat.length>0&&n.jsxs(n.Fragment,{children:[n.jsx("tr",{style:{borderTop:"1px solid #ddd"},children:n.jsx("td",{colSpan:2,style:{...p.td,fontWeight:700,fontSize:13,color:"#2c5530",paddingTop:8},children:"Materials"})}),Te.mat.map(r=>n.jsxs("tr",{children:[n.jsxs("td",{style:{...p.td,paddingLeft:20,fontSize:13,color:"#555"},children:[r.item," ",r.qty>1?`(x${r.qty})`:""]}),n.jsx("td",{style:{...p.td,textAlign:"right",fontSize:13},children:Me(r.total)})]},r.key)),n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,paddingLeft:20,fontWeight:600},children:"Materials Total"}),n.jsx("td",{style:{...p.td,textAlign:"right",fontWeight:600},children:Me(Te.matT)})]})]}),(()=>{const r=new Set(["foundation","patio",...Vn,...(Q.customOptions||[]).map((g,x)=>`customopt_${x}`)]),c=Te.svc.filter(g=>!r.has(g.key)),m=c.reduce((g,x)=>g+x.cost,0);return c.length===0?null:n.jsxs(n.Fragment,{children:[n.jsx("tr",{style:{borderTop:"1px solid #ddd"},children:n.jsx("td",{colSpan:2,style:{...p.td,fontWeight:700,fontSize:13,color:"#2c5530",paddingTop:8},children:"Services"})}),c.map(g=>n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,paddingLeft:20,fontSize:13,color:"#555"},children:g.item}),n.jsx("td",{style:{...p.td,textAlign:"right",fontSize:13},children:Me(g.cost)})]},g.key)),n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,paddingLeft:20,fontWeight:600},children:"Services Total"}),n.jsx("td",{style:{...p.td,textAlign:"right",fontWeight:600},children:Me(m)})]})]})})(),n.jsx("tr",{style:{borderTop:"1px solid #ddd"},children:n.jsx("td",{colSpan:2,style:{...p.td,fontWeight:700,fontSize:13,color:"#2c5530",paddingTop:8},children:"Project Command"})}),n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,paddingLeft:20,fontSize:13,color:"#555"},children:"Project Supervisor"}),n.jsx("td",{style:{...p.td,textAlign:"right",fontSize:13},children:Me(Te.projCmd.ps)})]}),n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,paddingLeft:20,fontSize:13,color:"#555"},children:"Project Manager"}),n.jsx("td",{style:{...p.td,textAlign:"right",fontSize:13},children:Me(Te.projCmd.pm)})]}),n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,paddingLeft:20,fontSize:13,color:"#555"},children:"Project Coordinator"}),n.jsx("td",{style:{...p.td,textAlign:"right",fontSize:13},children:Me(Te.projCmd.pc)})]}),n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,paddingLeft:20,fontWeight:600},children:"Project Command Total"}),n.jsx("td",{style:{...p.td,textAlign:"right",fontWeight:600},children:Me(Te.projCmd.total)})]}),n.jsxs("tr",{style:{borderTop:"2px solid #ddd"},children:[n.jsx("td",{style:p.td,children:n.jsx("strong",{children:"Subtotal"})}),n.jsx("td",{style:{...p.td,textAlign:"right"},children:Me(Te.sub)})]}),n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:"Overhead (5%)"}),n.jsx("td",{style:{...p.td,textAlign:"right"},children:Me(Te.oh)})]}),n.jsxs("tr",{children:[n.jsxs("td",{style:p.td,children:["Markup (",Q.markupRate!==void 0&&Q.markupRate!==""?Q.markupRate:"10","%)"]}),n.jsx("td",{style:{...p.td,textAlign:"right"},children:Me(Te.mu)})]}),n.jsxs("tr",{style:{borderTop:"2px solid #2c5530"},children:[n.jsx("td",{style:p.td,children:n.jsx("strong",{children:"Total"})}),n.jsx("td",{style:{...p.td,textAlign:"right",fontWeight:700},children:Me(Te.total)})]}),n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:n.jsx("strong",{children:"Contingency"})}),n.jsx("td",{style:{...p.td,textAlign:"right"},children:Me(Te.contingency)})]}),n.jsx("tr",{children:n.jsx("td",{colSpan:2,style:{...p.td,fontSize:11,color:"#856404",fontStyle:"italic",padding:"2px 12px"},children:"This is the original contracted contingency amount, not a running balance. See the Contingency Fund Tracker on the Scrubb tab for the current balance."})}),n.jsxs("tr",{style:{fontWeight:700,fontSize:18,borderTop:"3px solid #2c5530"},children:[n.jsx("td",{style:p.td,children:n.jsx("strong",{children:"Total Investment"})}),n.jsx("td",{style:{...p.td,textAlign:"right",color:"#2c5530"},children:Me(Te.totalWithContingency)})]})]})}),Q.houseWidth&&Q.houseLength&&n.jsxs("div",{style:{marginTop:16},children:[n.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",padding:"8px 0"},onClick:()=>Vs(!ii),children:n.jsxs("h4",{style:{margin:0},children:[ii?"▼":"▶"," Pier Layout"]})}),ii&&n.jsx(Yd,{quote:Q})]}),((xo=Q.changeOrderHistory)==null?void 0:xo.length)>0&&n.jsx("div",{style:{marginTop:16,padding:12,background:"#e3f2fd",borderRadius:8,border:"1px solid #1565c0"},children:n.jsxs("div",{style:{fontSize:13,color:"#1565c0",fontWeight:600},children:[Q.changeOrderHistory.filter(r=>!r.isReversal).length," Change Order(s) - See the Contingency Fund Tracker on the Scrubb tab for full details and running balance."]})})]}),On==="files"&&n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[n.jsx("h3",{style:{margin:0},children:"Project Files"}),n.jsx("button",{style:{...p.btnAmber,padding:"8px 20px",fontSize:14},onClick:()=>vs.saveAllDocsToFolders(Q,Se),title:"Generate and save all documents - replaces outdated copies with latest versions",children:"Update All Files"})]}),Object.entries(Nn.getFolders(Q)).map(([r,c])=>n.jsxs("div",{style:{...p.box,padding:12,border:nr===r?"2px dashed #2c5530":"1px solid #eee"},onDragOver:m=>{m.preventDefault(),po(r)},onDragLeave:()=>po(null),onDrop:m=>ho(m,r,Q),children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"},onClick:()=>Zo(tr===r?null:r),children:[n.jsx("strong",{children:r.replace(/_/g," ").replace(/\b\w/g,m=>m.toUpperCase())}),n.jsxs("span",{style:p.badge,children:[c.length," file",c.length!==1?"s":""]})]}),tr===r&&n.jsxs("div",{style:{marginTop:8},children:[r==="contracts"&&n.jsxs("div",{style:{marginBottom:12,padding:"10px 12px",background:"#f5f9f5",border:"1px solid #c8e6c9",borderRadius:6},children:[n.jsx("p",{style:{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"#2c5530",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Manufactured Home Documents"}),n.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:[{key:"contract",label:"Purchase & Installation Contract"},{key:"formaldehyde",label:"Formaldehyde Disclosure"},{key:"guide",label:"Homeowner's Guide"},{key:"warranty",label:"Warranty Statement"}].map(({key:m,label:g})=>n.jsxs("button",{style:{...p.btnSm,padding:"5px 12px",fontSize:12,background:"#2c5530",color:"#fff"},onClick:()=>vs.saveManufacturedHomeDocToContracts(m,Q,Se),title:`Generate and save ${g} to Contracts folder`,children:["📄 ",g]},m))})]}),n.jsxs("div",{style:{display:"flex",gap:6,marginBottom:8},children:[n.jsxs("label",{style:{...p.btnSm,padding:"4px 10px",fontSize:12,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4},children:["📎 Upload Files",n.jsx("input",{type:"file",accept:"image/*,.pdf,application/pdf",multiple:!0,style:{display:"none"},onChange:async m=>{const g=Array.from(m.target.files||[]);if(g.length===0)return;await ho({preventDefault:()=>{},stopPropagation:()=>{},dataTransfer:{files:g}},r,Q),m.target.value=""}})]}),n.jsxs("label",{style:{...p.btnSm,padding:"4px 10px",fontSize:12,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4,background:"#1565c0"},children:["📷 Camera",n.jsx("input",{type:"file",accept:"image/*",capture:"environment",style:{display:"none"},onChange:async m=>{const g=Array.from(m.target.files||[]);if(g.length===0)return;await ho({preventDefault:()=>{},stopPropagation:()=>{},dataTransfer:{files:g}},r,Q),m.target.value=""}})]})]}),c.length===0?n.jsx("p",{style:{color:"#999",fontSize:13},children:"No files yet. Drag and drop, upload, or take a photo."}):c.map(m=>n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #eee"},children:[n.jsxs("button",{onClick:()=>{var g,x;if((g=m.url)!=null&&g.startsWith("data:text/html;base64,"))try{const N=m.url.split(",")[1],X=decodeURIComponent(escape(atob(N))),be=new Blob([X],{type:"text/html"}),ke=URL.createObjectURL(be);window.open(ke,"_blank")}catch{const X=window.open();X&&(X.document.open(),X.document.write('<iframe src="'+m.url+'" style="width:100%;height:100vh;border:none;"></iframe>'),X.document.close())}else if((x=m.url)!=null&&x.startsWith("data:")){const N=window.open();N&&(N.document.open(),N.document.write('<img src="'+m.url+'" style="max-width:100%;">'),N.document.close())}else window.open(m.url,"_blank")},style:{background:"none",border:"none",color:"#2c5530",cursor:"pointer",textAlign:"left",padding:0,font:"inherit",fontSize:14},children:[m.type==="link"?"🔗":m.type==="image"?"🖼️":"📄"," ",m.name]}),n.jsx("button",{style:p.btnDeleteSmMd,onClick:()=>wa(r,m.id,Q),children:"Delete"})]},m.id))]})]},r))]}),On==="scrubb"&&Q&&["Accepted","Under Contract","Completed"].includes(Q.status)&&n.jsxs("div",{style:p.box,children:[n.jsx("h2",{style:{marginTop:0,borderBottom:"2px solid #2c5530",paddingBottom:8},children:"Project Cost Tracking (Scrubb)"}),n.jsx("p",{style:{fontSize:13,color:"#666",marginBottom:20},children:"Track actual costs for professional services as the project progresses."}),(()=>{var Bt,un;if(!Te)return n.jsx("div",{style:{textAlign:"center",padding:40,color:"#999"},children:n.jsx("p",{children:"Unable to load cost tracking data."})});const r=[],c=(he,Re,Z,Ge,Qe=!1)=>{var st,bt;const se=((st=Q.scrubbCosts)==null?void 0:st[he])||0,gt=se>0?Z-se:0;return{key:he,name:Re,contractPrice:Z,actualCost:se,variance:gt,variancePct:Z>0&&se>0?(gt/Z*100).toFixed(1):"0.0",docs:((bt=Q.scrubbDocs)==null?void 0:bt[he])||[],isAllowance:Qe,category:Ge}};(Te==null?void 0:Te.homePrice)>0&&r.push(c("home_dealership","Home from Dealership",Te.homePrice,"home"));const m=["installation_of_home","painting"],g=(Te==null?void 0:Te.svc)||[],x=[],N=g.find(he=>he.key==="installation_of_home");(N==null?void 0:N.cost)>0&&x.push({label:"Install",cost:N.cost});const X=g.find(he=>he.key==="painting");(X==null?void 0:X.cost)>0&&x.push({label:"Paint",cost:X.cost}),Te.matT>0&&x.push({label:"Install Materials",cost:Te.matT});const be=x.reduce((he,Re)=>he+Re.cost,0);if(be>0){const he=c("nhl_contract","NHL Contract",be,"services");he.subItems=x,r.push(he)}if(g.forEach(he=>{if(he.cost>0&&!m.includes(he.key)){const Re=c(he.key,he.item,he.cost,"services",It.includes(he.key));if(he.key==="permits"){const Ge=(Q.permitEntries||[]).reduce((Qe,se)=>Qe+(parseFloat(se.cost)||0),0);Re.actualCost=Ge,Re.variance=Ge>0?he.cost-Ge:0,Re.variancePct=he.cost>0&&Ge>0?(Re.variance/he.cost*100).toFixed(1):"0.0"}r.push(Re)}}),((Bt=Te.projCmd)==null?void 0:Bt.total)>0&&r.push(c("project_command","Project Command (PS + PM + PC)",Te.projCmd.total,"services")),r.push({key:"addl_materials",name:"Additional Materials",contractPrice:0,actualCost:0,variance:0,variancePct:"0.0",docs:((un=Q.scrubbDocs)==null?void 0:un.addl_materials)||[],isAllowance:!1,category:"services"}),Te.oh>0&&r.push({...c("overhead","Overhead (5%)",Te.oh,"margin"),actualCost:Te.oh}),Te.mu>0&&r.push({...c("markup",`Markup (${Q.markupRate!==void 0&&Q.markupRate!==""?Q.markupRate:"10"}%)`,Te.mu,"margin"),actualCost:Te.mu}),r.length===0)return n.jsx("div",{style:{textAlign:"center",padding:40,color:"#999"},children:n.jsx("p",{children:"No items to track."})});const ke=Te.contingency||0,K=he=>{const Z=he.replace(/[^0-9.]/g,"").split(".");return Z[0]=Z[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),Z.length>1?Z[0]+"."+Z[1].slice(0,2):Z[0]},q=he=>parseFloat(he.replace(/,/g,""))||0,ue=he=>{(A==null?void 0:A.id)===Q.id?(Gt(tn(te,Q.id,he)),pe(he)):(G==null?void 0:G.id)===Q.id&&(En(tn(ne,Q.id,he)),ae(he))},Ce=async(he,Re)=>{var Z,Ge,Qe;he.preventDefault(),he.stopPropagation(),cn(null);try{const se=Array.from(((Z=he.dataTransfer)==null?void 0:Z.files)||((Ge=he.target)==null?void 0:Ge.files)||[]);if(se.length===0)return;const gt=50*1024*1024,st=[];for(const ht of se){if(ht.size>gt){tt.error(`File "${ht.name}" is too large (max 50MB)`);continue}if(!ht.type.startsWith("image/")&&ht.type!=="application/pdf"){tt.warning(`"${ht.name}" skipped — only images and PDFs are supported`);continue}st.push(ht)}if(st.length===0)return;co(Re);const bt=[];for(const ht of st){const Dt=await nn(ht,ht.name);bt.push({id:Tn(),name:ht.name,url:Dt,type:ht.type==="application/pdf"?"pdf":"image",addedAt:new Date().toISOString(),addedBy:z})}ue(ki(Q,{scrubbDocs:{...Q.scrubbDocs||{},[Re]:[...((Qe=Q.scrubbDocs)==null?void 0:Qe[Re])||[],...bt]}},z)),tt.success(`${st.length} file${st.length>1?"s":""} added`),co(null)}catch(se){console.error("Error uploading scrubb files:",se),tt.error(`Upload failed: ${se.message}`),co(null)}},De=(he,Re)=>{const Z=he.target.files;!Z||Z.length===0||(Ce({preventDefault:()=>{},stopPropagation:()=>{},dataTransfer:{files:Z}},Re),he.target.value="")},Oe=(he,Re)=>{var Ge;if(!confirm("Delete this file?"))return;const Z=(((Ge=Q.scrubbDocs)==null?void 0:Ge[he])||[]).filter(Qe=>Qe.id!==Re);ue(ki(Q,{scrubbDocs:{...Q.scrubbDocs||{},[he]:Z}},z))},Fe=he=>{var Re,Z;if((Re=he.url)!=null&&Re.startsWith("data:image/")){const Ge=window.open("","_blank");Ge&&(Ge.document.write(`<html><head><title>${he.name}</title><style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#111}</style></head><body><img src="${he.url}" style="max-width:100%;max-height:100vh;object-fit:contain" /></body></html>`),Ge.document.close())}else if((Z=he.url)!=null&&Z.startsWith("data:application/pdf")){const Ge=window.open("","_blank");Ge&&(Ge.document.write(`<html><head><title>${he.name}</title></head><body style="margin:0"><iframe src="${he.url}" style="width:100%;height:100vh;border:none"></iframe></body></html>`),Ge.document.close())}else he.url&&window.open(he.url,"_blank")},dt=he=>{const Re=q(lo),Z={id:Tn(),serviceKey:he.key,serviceName:he.name,previousCost:he.actualCost||0,newCost:Re,contractPrice:he.contractPrice,variance:Re>0?he.contractPrice-Re:0,isAllowance:It.includes(he.key),updatedAt:new Date().toISOString(),updatedBy:z};if(ue(ki(Q,{scrubbCosts:{...Q.scrubbCosts||{},[he.key]:Re},scrubbHistory:[...Q.scrubbHistory||[],Z]},z)),Zi(null),dn(""),It.includes(he.key)){const Ge=Re>0?he.contractPrice-Re:0,Qe={...Q.scrubbCosts||{},[he.key]:Re};let se=0,gt=0;r.forEach(Dt=>{if(It.includes(Dt.key)){const Ht=Dt.key===he.key?Re:Qe[Dt.key]||Dt.actualCost||0;if(Ht>0){const je=Dt.contractPrice-Ht;je>0?se+=je:gt+=Math.abs(je)}}});const st=(Q.changeOrderHistory||[]).reduce((Dt,Ht)=>Dt+(Ht.contingencyUsed||0),0),bt=(Q.scrubbPayments||[]).filter(Dt=>Dt.isContingencyPayment).reduce((Dt,Ht)=>Dt+parseFloat(Ht.amount||0),0),ht=ke+se-gt+bt-st;ht<0?tt.warning(`⚠️ CONTINGENCY FUND OVERDRAWN ⚠️

${he.name} is ${D(Math.abs(Ge))} over budget.

The contingency fund is now negative by ${D(Math.abs(ht))}.

A payment must be collected from the customer before any additional work can continue.`):tt.info(Ge>0?`${he.name} came in ${D(Ge)} under budget.
Added to contingency fund.`:Ge<0?`${he.name} is ${D(Math.abs(Ge))} over budget.
Drawn from contingency fund.`:`${he.name} is exactly on budget.`)}};return n.jsxs("div",{children:[n.jsxs("table",{style:p.table,children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:p.th,children:"Service"}),n.jsx("th",{style:p.th,children:"Contract Price"}),n.jsx("th",{style:p.th,children:"Actual Cost"}),n.jsx("th",{style:p.th,children:"Variance"}),n.jsx("th",{style:p.th,children:"Docs"}),n.jsx("th",{style:p.th})]})}),n.jsx("tbody",{children:[{key:"home",label:"Home"},{key:"services",label:"Services & Site Work"},{key:"cost_basis",label:"Cost Basis"},{key:"margin",label:"Margin"}].map(he=>{const Re=r.filter(Z=>Z.category===he.key);return Re.length===0?null:n.jsxs(cs.Fragment,{children:[n.jsx("tr",{children:n.jsx("td",{colSpan:6,style:{background:"#e9ecef",fontWeight:700,fontSize:13,padding:"8px 12px",color:"#2c5530",borderBottom:"2px solid #2c5530"},children:he.label})}),Re.map(Z=>{var Qe;if(Z.key==="permits"){const se=Q.permitEntries||[],gt=se.reduce((ht,Dt)=>ht+(parseFloat(Dt.cost)||0),0),st=gt>0?Z.contractPrice-gt:0,bt=Z.contractPrice>0&&gt>0?(st/Z.contractPrice*100).toFixed(1):"0.0";return n.jsxs("tr",{children:[n.jsxs("td",{style:p.td,children:[n.jsx("strong",{children:Z.name}),Z.isAllowance&&n.jsx("span",{style:{marginLeft:8,fontSize:11,color:"#856404",fontWeight:600,background:"#ffc107",padding:"2px 6px",borderRadius:3},children:"ALLOWANCE"})]}),n.jsx("td",{style:{...p.td,color:"#2c5530",fontWeight:600},children:D(Z.contractPrice)}),n.jsxs("td",{style:p.td,children:[se.length>0?n.jsxs("div",{style:{marginBottom:8},children:[se.map((ht,Dt)=>n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 8px",marginBottom:4,background:"#f8f9fa",borderRadius:4,fontSize:13},children:[n.jsx("span",{children:ht.name}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("span",{style:{fontWeight:600},children:D(ht.cost)}),n.jsx("button",{style:p.btnEditSm,onClick:()=>{Js(ht),Ks(ht.name),Et(ht.cost.toString()),Ys(!0)},children:"✏️"}),n.jsx("button",{style:p.btnDeleteSm,onClick:()=>{if(confirm(`Delete ${ht.name}?`)){const Ht=se.filter((je,qe)=>qe!==Dt);ue(ki(Q,{permitEntries:Ht},z))}},children:"🗑️"})]})]},ht.id||Dt)),n.jsxs("div",{style:{borderTop:"1px solid #ddd",paddingTop:4,marginTop:4,fontWeight:600,fontSize:14},children:["Total: ",D(gt)]})]}):n.jsx("div",{style:{color:"#999",marginBottom:8},children:"No permits entered"}),n.jsx("button",{style:{...p.btnSm,padding:"4px 12px",fontSize:12,width:"100%"},onClick:()=>{Js(null),Ks(""),Et(""),Ys(!0)},children:"+ Add Permit"})]}),n.jsx("td",{style:{...p.td,color:gt>0?st>0?"#28a745":st<0?"#dc3545":"#666":"#999",fontWeight:gt>0?600:400},children:gt>0?n.jsxs(n.Fragment,{children:[st>=0?"+":"",D(st)," (",bt,"%)"]}):"-"}),n.jsx("td",{style:p.td,children:n.jsxs("span",{style:{fontSize:12,color:"#666"},children:[Z.docs.length," file",Z.docs.length!==1?"s":""]})}),n.jsx("td",{style:p.td})]},Z.key)}if(Z.key==="addl_materials"){const se=Q.addlMaterialEntries||[],gt=se.reduce((st,bt)=>st+(parseFloat(bt.cost)||0),0);return n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:n.jsx("strong",{children:Z.name})}),n.jsx("td",{style:{...p.td,color:"#999"},children:"-"}),n.jsxs("td",{style:p.td,children:[se.length>0?n.jsxs("div",{style:{marginBottom:8},children:[se.map((st,bt)=>n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 8px",marginBottom:4,background:"#f8f9fa",borderRadius:4,fontSize:13},children:[n.jsx("span",{children:st.name}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("span",{style:{fontWeight:600},children:D(st.cost)}),n.jsx("button",{style:p.btnEditSm,onClick:()=>{Ji(st),ms(st.name),yn(st.cost.toString()),hs(!0)},children:"✏️"}),n.jsx("button",{style:p.btnDeleteSm,onClick:()=>{if(confirm(`Delete ${st.name}?`)){const ht=se.filter((Dt,Ht)=>Ht!==bt);ue(ki(Q,{addlMaterialEntries:ht},z))}},children:"🗑️"})]})]},st.id||bt)),n.jsxs("div",{style:{borderTop:"1px solid #ddd",paddingTop:4,marginTop:4,fontWeight:600,fontSize:14},children:["Total: ",D(gt)]})]}):n.jsx("div",{style:{color:"#999",marginBottom:8},children:"No materials entered"}),n.jsx("button",{style:{...p.btnSm,padding:"4px 12px",fontSize:12,width:"100%"},onClick:()=>{Ji(null),ms(""),yn(""),hs(!0)},children:"+ Add Material"})]}),n.jsx("td",{style:p.td}),n.jsx("td",{style:p.td}),n.jsx("td",{style:p.td})]},Z.key)}if(Z.key==="nhl_contract")return n.jsxs(cs.Fragment,{children:[n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx("button",{style:{background:"transparent",border:"none",cursor:"pointer",fontSize:14,padding:0,lineHeight:1},onClick:()=>Vo(se=>!se),children:ao?"▼":"▶"}),n.jsx("strong",{children:Z.name})]})}),n.jsx("td",{style:{...p.td,color:"#2c5530",fontWeight:600},children:D(Z.contractPrice)}),n.jsx("td",{style:p.td,children:Gs===Z.key?n.jsxs("div",{style:{display:"flex",gap:4},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",background:"#fff",border:"1px solid #2c5530",borderRadius:4,padding:"0 8px"},children:[n.jsx("span",{style:{color:"#666",fontSize:14},children:"$"}),n.jsx("input",{type:"text",inputMode:"decimal",style:{...p.inputEdit,width:110,border:"none",padding:"6px 4px"},value:K(lo),onChange:se=>dn(se.target.value.replace(/[^0-9.]/g,"")),onKeyDown:se=>{se.key==="Enter"&&dt(Z),se.key==="Escape"&&(Zi(null),dn(""))},placeholder:"0.00",autoFocus:!0})]}),n.jsx("button",{style:{...p.btnSm,padding:"4px 8px",background:"#28a745"},onClick:()=>dt(Z),children:"✓"}),n.jsx("button",{style:{...p.btnSm,padding:"4px 8px",background:"#dc3545"},onClick:()=>{Zi(null),dn("")},children:"✕"})]}):n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("span",{style:{color:Z.actualCost>0?"#000":"#999"},children:Z.actualCost>0?D(Z.actualCost):"Not entered"}),n.jsx("button",{style:{background:"transparent",border:"none",color:"#1565c0",cursor:"pointer",fontSize:12},onClick:()=>{Zi(Z.key),dn(Z.actualCost>0?Z.actualCost.toString():"")},children:"✏️"})]})}),n.jsx("td",{style:p.td,children:Z.actualCost>0?n.jsxs("span",{style:{color:Z.variance>0?"#28a745":Z.variance<0?"#dc3545":"#666",fontWeight:600},children:[Z.variance>=0?"+":"",D(Z.variance)," (",Z.variancePct,"%)"]}):"-"}),n.jsx("td",{style:p.td,children:n.jsxs("div",{onDragOver:se=>{se.preventDefault(),cn(Z.key)},onDragLeave:()=>cn(null),onDrop:se=>Ce(se,Z.key),style:{padding:6,borderRadius:6,border:gs===Z.key?"2px dashed #2c5530":"2px dashed transparent",background:gs===Z.key?"#e8f5e9":"transparent",transition:"all 0.2s"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"},children:[n.jsxs("span",{style:{fontSize:12,color:"#666"},children:[Z.docs.length," file",Z.docs.length!==1?"s":""]}),n.jsxs("label",{style:{...p.btnSm,padding:"4px 8px",fontSize:11,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4},children:["📎 Upload",n.jsx("input",{type:"file",accept:"image/*,.pdf",multiple:!0,style:{display:"none"},onChange:se=>De(se,Z.key)})]}),n.jsxs("label",{style:{...p.btnSm,padding:"4px 8px",fontSize:11,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4,background:"#1565c0"},children:["📷 Camera",n.jsx("input",{type:"file",accept:"image/*",capture:"environment",style:{display:"none"},onChange:se=>De(se,Z.key)})]}),n.jsx("button",{style:{...p.btnSm,padding:"4px 8px",fontSize:11},onClick:()=>{var bt;const se=prompt("Document name:");if(!se)return;const gt=prompt("Document URL (or leave blank):"),st={id:Tn(),name:se,url:gt||"",addedAt:new Date().toISOString(),addedBy:z};ue(ki(Q,{scrubbDocs:{...Q.scrubbDocs||{},[Z.key]:[...((bt=Q.scrubbDocs)==null?void 0:bt[Z.key])||[],st]}},z))},children:"+ Link"})]}),Yo===Z.key&&n.jsx("div",{style:{fontSize:11,color:"#1565c0",marginTop:4},children:"Uploading..."}),gs===Z.key&&n.jsx("div",{style:{fontSize:11,color:"#2c5530",marginTop:4,textAlign:"center"},children:"Drop images or PDFs here"})]})}),n.jsx("td",{style:p.td,children:Z.docs.length>0&&n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4},children:Z.docs.map(se=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,fontSize:12},children:[se.type==="image"?n.jsx("span",{style:{cursor:"pointer"},onClick:()=>Fe(se),title:"Click to view",children:"🖼️"}):se.type==="pdf"?n.jsx("span",{style:{cursor:"pointer"},onClick:()=>Fe(se),title:"Click to view",children:"📄"}):n.jsx("span",{children:"🔗"}),n.jsx("span",{style:{cursor:se.url?"pointer":"default",color:se.url?"#1565c0":"#333",textDecoration:se.url?"underline":"none",maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},onClick:()=>se.url&&Fe(se),title:se.name,children:se.name}),n.jsx("button",{style:{background:"transparent",border:"none",color:"#dc3545",cursor:"pointer",fontSize:10,padding:0},onClick:()=>Oe(Z.key,se.id),title:"Delete",children:"✕"})]},se.id))})})]}),ao&&((Qe=Z.subItems)==null?void 0:Qe.map((se,gt)=>n.jsxs("tr",{style:{background:"#f8f9fa"},children:[n.jsx("td",{style:{...p.td,paddingLeft:36,fontSize:13,color:"#555"},children:se.label}),n.jsx("td",{style:{...p.td,fontSize:13,color:"#555"},children:D(se.cost)}),n.jsx("td",{style:p.td}),n.jsx("td",{style:p.td}),n.jsx("td",{style:p.td}),n.jsx("td",{style:p.td})]},`nhl-sub-${gt}`)))]},Z.key);const Ge=Z.category==="cost_basis"||Z.category==="margin";return n.jsxs("tr",{style:Ge?{background:"#f8f9fa"}:{},children:[n.jsxs("td",{style:p.td,children:[n.jsx("strong",{children:Z.name}),Z.isAllowance&&n.jsx("span",{style:{marginLeft:8,fontSize:11,color:"#856404",fontWeight:600,background:"#ffc107",padding:"2px 6px",borderRadius:3},children:"ALLOWANCE"})]}),n.jsx("td",{style:{...p.td,color:"#2c5530",fontWeight:600},children:D(Z.contractPrice)}),n.jsx("td",{style:p.td,children:Ge?n.jsx("span",{style:{color:"#666",fontStyle:"italic",fontSize:12},children:"Fixed cost"}):Gs===Z.key?n.jsxs("div",{style:{display:"flex",gap:4},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",background:"#fff",border:"1px solid #2c5530",borderRadius:4,padding:"0 8px"},children:[n.jsx("span",{style:{color:"#666",fontSize:14},children:"$"}),n.jsx("input",{type:"text",inputMode:"decimal",style:{...p.inputEdit,width:110,border:"none",padding:"6px 4px"},value:K(lo),onChange:se=>dn(se.target.value.replace(/[^0-9.]/g,"")),onKeyDown:se=>{se.key==="Enter"&&dt(Z),se.key==="Escape"&&(Zi(null),dn(""))},placeholder:"0.00",autoFocus:!0})]}),n.jsx("button",{style:{...p.btnSm,padding:"4px 8px",background:"#28a745"},onClick:()=>dt(Z),children:"✓"}),n.jsx("button",{style:{...p.btnSm,padding:"4px 8px",background:"#dc3545"},onClick:()=>{Zi(null),dn("")},children:"✕"})]}):n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("span",{style:{color:Z.actualCost>0?"#000":"#999"},children:Z.actualCost>0?D(Z.actualCost):"Not entered"}),n.jsx("button",{style:{background:"transparent",border:"none",color:"#1565c0",cursor:"pointer",fontSize:12},onClick:()=>{Zi(Z.key),dn(Z.actualCost>0?Z.actualCost.toString():"")},children:"✏️"})]})}),n.jsx("td",{style:p.td,children:Ge?n.jsx("span",{style:{color:"#666"},children:"-"}):Z.actualCost>0?n.jsxs("span",{style:{color:Z.variance>0?"#28a745":Z.variance<0?"#dc3545":"#666",fontWeight:600},children:[Z.variance>=0?"+":"",D(Z.variance)," (",Z.variancePct,"%)"]}):"-"}),n.jsx("td",{style:p.td,children:Ge?null:n.jsxs("div",{onDragOver:se=>{se.preventDefault(),cn(Z.key)},onDragLeave:()=>cn(null),onDrop:se=>Ce(se,Z.key),style:{padding:6,borderRadius:6,border:gs===Z.key?"2px dashed #2c5530":"2px dashed transparent",background:gs===Z.key?"#e8f5e9":"transparent",transition:"all 0.2s"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"},children:[n.jsxs("span",{style:{fontSize:12,color:"#666"},children:[Z.docs.length," file",Z.docs.length!==1?"s":""]}),n.jsxs("label",{style:{...p.btnSm,padding:"4px 8px",fontSize:11,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4},children:["📎 Upload",n.jsx("input",{type:"file",accept:"image/*,.pdf",multiple:!0,style:{display:"none"},onChange:se=>De(se,Z.key)})]}),n.jsxs("label",{style:{...p.btnSm,padding:"4px 8px",fontSize:11,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4,background:"#1565c0"},children:["📷 Camera",n.jsx("input",{type:"file",accept:"image/*",capture:"environment",style:{display:"none"},onChange:se=>De(se,Z.key)})]}),n.jsx("button",{style:{...p.btnSm,padding:"4px 8px",fontSize:11},onClick:()=>{var bt;const se=prompt("Document name:");if(!se)return;const gt=prompt("Document URL (or leave blank):"),st={id:Tn(),name:se,url:gt||"",addedAt:new Date().toISOString(),addedBy:z};ue(ki(Q,{scrubbDocs:{...Q.scrubbDocs||{},[Z.key]:[...((bt=Q.scrubbDocs)==null?void 0:bt[Z.key])||[],st]}},z))},children:"+ Link"})]}),Yo===Z.key&&n.jsx("div",{style:{fontSize:11,color:"#1565c0",marginTop:4},children:"Uploading..."}),gs===Z.key&&n.jsx("div",{style:{fontSize:11,color:"#2c5530",marginTop:4,textAlign:"center"},children:"Drop images or PDFs here"})]})}),n.jsx("td",{style:p.td,children:!Ge&&Z.docs.length>0&&n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4},children:Z.docs.map(se=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,fontSize:12},children:[se.type==="image"?n.jsx("span",{style:{cursor:"pointer"},onClick:()=>Fe(se),title:"Click to view",children:"🖼️"}):se.type==="pdf"?n.jsx("span",{style:{cursor:"pointer"},onClick:()=>Fe(se),title:"Click to view",children:"📄"}):n.jsx("span",{children:"🔗"}),n.jsx("span",{style:{cursor:se.url?"pointer":"default",color:se.url?"#1565c0":"#333",textDecoration:se.url?"underline":"none",maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},onClick:()=>se.url&&Fe(se),title:se.name,children:se.name}),n.jsx("button",{style:{background:"transparent",border:"none",color:"#dc3545",cursor:"pointer",fontSize:10,padding:0},onClick:()=>Oe(Z.key,se.id),title:"Delete",children:"✕"})]},se.id))})})]},Z.key)})]},he.key)})})]}),n.jsxs("div",{style:{marginTop:32,padding:20,background:"#f8f9fa",borderRadius:8},children:[n.jsx("h3",{style:{marginTop:0},children:"Summary"}),(()=>{const he=r.reduce((Qe,se)=>Qe+se.contractPrice,0),Re=r.reduce((Qe,se)=>Qe+se.actualCost,0),Z=r.reduce((Qe,se)=>Qe+se.variance,0),Ge=Re>he;return n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:12,color:"#666"},children:"Total Contract Price"}),n.jsx("div",{style:{fontSize:24,fontWeight:700,color:"#2c5530"},children:D(he)})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:12,color:"#666"},children:"Total Actual Cost"}),n.jsx("div",{style:{fontSize:24,fontWeight:700,color:Ge?"#dc3545":"#1565c0"},children:D(Re)})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:12,color:"#666"},children:"Total Variance"}),n.jsx("div",{style:{fontSize:24,fontWeight:700,color:Ge?"#dc3545":Z>0?"#28a745":Z<0?"#dc3545":"#666"},children:(Z>=0?"+":"")+D(Z)})]})]})})()]}),n.jsxs("div",{style:{marginTop:24,padding:20,background:"#e3f2fd",borderRadius:8,border:"2px solid #1565c0"},children:[n.jsx("h3",{style:{marginTop:0,color:"#1565c0"},children:"Contingency Fund Tracker"}),n.jsxs("p",{style:{fontSize:13,color:"#666",marginBottom:16,lineHeight:1.6},children:[n.jsx("strong",{children:"Purpose:"})," A fund for change orders and allowance adjustments. When allowances come in under budget, savings are added here. When costs exceed estimates or change orders are made, funds are drawn from here first, minimizing customer out-of-pocket costs. At project completion, if there are no overages or change orders, the customer receives back the full contingency amount plus any allowance savings."]}),(()=>{const he=Q.changeOrderHistory||[],Re=he.length>0?(he[0].contingencyUsed||0)+(he[0].contingencyBalance||0):Te.contingency||0,Z=he.reduce((je,qe)=>je+(qe.contingencyUsed||0),0),Ge=r.filter(je=>je.isChangeOrderAddition),Qe=r.filter(je=>It.includes(je.key)&&je.actualCost>0),se=Qe.filter(je=>je.variance>0).reduce((je,qe)=>je+qe.variance,0),gt=Qe.filter(je=>je.variance<0).reduce((je,qe)=>je+Math.abs(qe.variance),0),bt=(Q.scrubbPayments||[]).filter(je=>je.isContingencyPayment).reduce((je,qe)=>je+parseFloat(qe.amount||0),0),ht=Re-Z+se-gt+bt,Dt=ht<0,Ht=Math.abs(Math.min(0,ht));return n.jsxs("div",{children:[n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16},children:[n.jsxs("div",{style:{padding:12,background:"#fff",borderRadius:6},children:[n.jsx("div",{style:{fontSize:12,color:"#666",marginBottom:4},children:"Starting Fund"}),n.jsx("div",{style:{fontSize:20,fontWeight:700,color:"#1565c0"},children:D(Re)})]}),n.jsxs("div",{style:{padding:12,background:"#fff",borderRadius:6},children:[n.jsx("div",{style:{fontSize:12,color:"#666",marginBottom:4},children:"Current Balance"}),n.jsx("div",{style:{fontSize:20,fontWeight:700,color:ht>=0?"#28a745":"#dc3545"},children:D(ht)})]})]}),Dt&&n.jsxs("div",{style:{padding:16,background:"#f8d7da",border:"2px solid #dc3545",borderRadius:8,marginBottom:16,textAlign:"center"},children:[n.jsx("div",{style:{fontSize:18,fontWeight:700,color:"#dc3545",marginBottom:6},children:"CONTINGENCY FUND OVERDRAWN"}),n.jsxs("div",{style:{fontSize:14,color:"#721c24",marginBottom:8},children:["The contingency fund is negative by ",n.jsx("strong",{children:D(Ht)}),"."]}),n.jsxs("div",{style:{fontSize:13,color:"#721c24"},children:["The customer must pay ",n.jsx("strong",{children:D(Ht)})," to cover the deficit. The contract amount does not change."]}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:12},children:[n.jsxs("div",{style:{padding:10,background:"#fff",borderRadius:4,textAlign:"center"},children:[n.jsx("div",{style:{fontSize:11,color:"#666"},children:"Total Draws"}),n.jsx("div",{style:{fontSize:16,fontWeight:700,color:"#dc3545"},children:D(Z+gt)})]}),n.jsxs("div",{style:{padding:10,background:"#fff",borderRadius:4,textAlign:"center"},children:[n.jsx("div",{style:{fontSize:11,color:"#666"},children:"Fund + Savings"}),n.jsx("div",{style:{fontSize:16,fontWeight:700,color:"#28a745"},children:D(Re+se+bt)})]}),n.jsxs("div",{style:{padding:10,background:"#fff",borderRadius:4,textAlign:"center"},children:[n.jsx("div",{style:{fontSize:11,color:"#666"},children:"Customer Owes"}),n.jsx("div",{style:{fontSize:16,fontWeight:700,color:"#dc3545"},children:D(Ht)})]})]})]}),n.jsxs("div",{style:{padding:12,background:"#fff",borderRadius:6,marginBottom:8},children:[Ge.map(je=>n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6},children:[n.jsxs("span",{style:{fontSize:13,color:"#333"},children:["CO: ",je.name]}),n.jsxs("span",{style:{fontSize:13,fontWeight:600,color:"#dc3545"},children:["-",D(je.contractPrice)]})]},je.key)),se>0&&n.jsxs("div",{style:{marginBottom:6},children:[n.jsx("div",{style:{fontSize:12,color:"#666"},children:"Allowance Savings (added to fund)"}),n.jsxs("div",{style:{fontSize:16,fontWeight:600,color:"#28a745"},children:["+",D(se)]})]}),gt>0&&n.jsxs("div",{style:{marginBottom:6},children:[n.jsx("div",{style:{fontSize:12,color:"#666"},children:"Allowance Overages (drawn from fund)"}),n.jsxs("div",{style:{fontSize:16,fontWeight:600,color:"#dc3545"},children:["-",D(gt)]})]}),bt>0&&n.jsxs("div",{style:{marginBottom:6},children:[n.jsx("div",{style:{fontSize:12,color:"#666"},children:"Customer Payments (refunding fund)"}),n.jsxs("div",{style:{fontSize:16,fontWeight:600,color:"#28a745"},children:["+",D(bt)]})]}),Ge.length===0&&se===0&&gt===0&&bt===0&&n.jsx("div",{style:{fontSize:13,color:"#999",textAlign:"center",padding:8},children:"No activity yet — the full fund is available."})]}),(()=>{const je=r.filter(qe=>It.includes(qe.key)&&qe.actualCost>0);return je.length===0?null:n.jsxs("div",{style:{marginTop:12,padding:16,background:"#fff",borderRadius:6,border:"1px solid #e0e0e0"},children:[n.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#2c5530",marginBottom:12},children:"Allowance Breakdown"}),je.map(qe=>{const Ct=qe.variance>0?"#28a745":qe.variance<0?"#dc3545":"#666",bn=qe.variance>0?"Under Budget":qe.variance<0?"Over Budget":"On Budget",xt=qe.key==="permits"?Q.permitEntries||[]:[];return n.jsxs("div",{style:{padding:8,marginBottom:6,background:"#f8f9fa",borderRadius:4,borderLeft:`3px solid ${Ct}`},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[n.jsx("span",{style:{fontSize:13,fontWeight:600},children:qe.name}),n.jsx("span",{style:{fontSize:11,fontWeight:600,color:Ct,padding:"2px 8px",background:qe.variance>0?"#d1e7dd":qe.variance<0?"#f8d7da":"#e0e0e0",borderRadius:10},children:bn})]}),n.jsxs("div",{style:{fontSize:12,color:"#666",marginTop:4},children:["Budget: ",D(qe.contractPrice)," | Actual: ",D(qe.actualCost)," ",n.jsxs("span",{style:{fontWeight:700,color:Ct,marginLeft:8},children:["(",qe.variance>=0?"+":"",D(qe.variance),")"]})]}),xt.length>0&&n.jsx("div",{style:{marginTop:6,paddingTop:6,borderTop:"1px solid #e0e0e0"},children:xt.map((Dn,nt)=>n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"3px 0 3px 12px",fontSize:12,color:"#555"},children:[n.jsx("span",{children:Dn.name}),n.jsx("span",{style:{fontWeight:600},children:D(Dn.cost)})]},Dn.id||nt))})]},qe.key)})]})})(),he.length>0&&n.jsxs("div",{style:{marginTop:12,padding:16,background:"#fff3e0",borderRadius:6,border:"1px solid #ff9800"},children:[n.jsxs("div",{style:{fontSize:14,fontWeight:700,color:"#e65100",marginBottom:12},children:["Change Orders (",he.filter(je=>!je.isReversal).length,")"]}),he.map((je,qe)=>{var bn,xt,Dn,nt;const Ct=je.isReversal||je.status==="Voided";return n.jsxs("div",{style:{padding:10,marginBottom:8,background:"#fff",borderRadius:4,borderLeft:`3px solid ${Ct?"#999":je.totalChange>=0?"#dc3545":"#28a745"}`,opacity:Ct?.6:1},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsxs("span",{style:{fontWeight:700,fontSize:13},children:["CO #",je.changeOrderNum]}),n.jsx("span",{style:{fontSize:10,padding:"2px 6px",borderRadius:10,fontWeight:600,background:Zd(Uf,je.status,"#e2e3e5"),color:Zd(Hf,je.status,"#41464b")},children:Ct?"VOIDED":je.status==="Signed"?"✓ Signed":je.status})]}),n.jsxs("span",{style:{fontWeight:700,fontSize:14,color:je.totalChange>=0?"#dc3545":"#198754"},children:[je.totalChange>=0?"+":"",Me(je.totalChange)]})]}),n.jsx("div",{style:{fontSize:12,marginTop:6},children:je.contingencyUsed>0?n.jsxs("span",{style:{color:"#ff9800"},children:["From contingency: -",Me(je.contingencyUsed),je.customerCost>0?` | Customer pays: +${Me(je.customerCost)}`:" (fully covered)"]}):je.contingencyUsed<0?n.jsxs("span",{style:{color:"#198754"},children:["Savings added to contingency: +",Me(Math.abs(je.contingencyUsed))]}):je.totalChange>0?n.jsxs("span",{style:{color:"#dc3545"},children:["Customer pays: +",Me(je.totalChange)]}):null}),(((bn=je.deletions)==null?void 0:bn.length)>0||((xt=je.additions)==null?void 0:xt.length)>0||Object.keys(je.adjustments||{}).some(Ue=>{var Lt;return(Lt=je.adjustments[Ue])==null?void 0:Lt.amount}))&&n.jsxs("div",{style:{fontSize:12,marginTop:8,padding:8,background:"#f8f9fa",borderRadius:4},children:[((Dn=je.additions)==null?void 0:Dn.length)>0&&n.jsxs("div",{style:{marginBottom:4},children:[n.jsx("span",{style:{color:"#198754",fontWeight:600},children:"Added: "}),je.additions.map(Ue=>{var Lt;return((Lt=it[Ue])==null?void 0:Lt.name)||Ue.replace(/_/g," ")}).join(", ")]}),((nt=je.deletions)==null?void 0:nt.length)>0&&n.jsxs("div",{style:{marginBottom:4},children:[n.jsx("span",{style:{color:"#dc3545",fontWeight:600},children:"Removed: "}),je.deletions.map(Ue=>{var Lt;return((Lt=it[Ue])==null?void 0:Lt.name)||Ue.replace(/_/g," ")}).join(", ")]}),Object.entries(je.adjustments||{}).filter(([,Ue])=>Ue==null?void 0:Ue.amount).length>0&&n.jsxs("div",{children:[n.jsx("span",{style:{color:"#e65100",fontWeight:600},children:"Adjusted: "}),Object.entries(je.adjustments).filter(([,Ue])=>Ue==null?void 0:Ue.amount).map(([Ue,Lt])=>{var xi;return`${Ue==="home_base_price"?"Home Base Price":Ue==="install_price"?"Install Price":((xi=it[Ue])==null?void 0:xi.name)||Ue.replace(/_/g," ")} (${Lt.amount>=0?"+":""}${Me(Lt.amount)})`}).join(", ")]})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6},children:[n.jsxs("div",{style:{fontSize:11,color:"#666"},children:[Fi(je.createdAt)," by ",je.createdBy]}),!Ct&&n.jsxs("div",{style:{display:"flex",gap:6},children:[je.status!=="Signed"&&n.jsx("button",{style:{...p.btnSm,background:"#198754",fontSize:10,padding:"3px 8px"},onClick:async()=>{const Ue={...Q,changeOrderHistory:Q.changeOrderHistory.map((Lt,gi)=>gi===qe?{...Lt,status:"Signed"}:Lt)};G?(await En(tn(ne,Ue.id,Ue)),ae(Ue)):(await Gt(tn(te,Ue.id,Ue)),pe(Ue))},children:"✓ Sign"}),je.status==="Signed"&&n.jsx("button",{style:{...p.btnSm,background:"#6c757d",fontSize:10,padding:"3px 8px"},onClick:async()=>{const Ue={...Q,changeOrderHistory:Q.changeOrderHistory.map((Lt,gi)=>gi===qe?{...Lt,status:"Draft"}:Lt)};G?(await En(tn(ne,Ue.id,Ue)),ae(Ue)):(await Gt(tn(te,Ue.id,Ue)),pe(Ue))},children:"Undo"})]})]})]},qe)})]}),n.jsx("p",{style:{fontSize:11,color:"#666",marginTop:12,marginBottom:0,fontStyle:"italic"},children:"* Allowances (permits, well, sand pad, sewer, etc.) and change orders affect the contingency fund. Other services are tracked separately."}),(()=>{const je=(Q.scrubbHistory||[]).filter(qe=>qe.isAllowance).sort((qe,Ct)=>new Date(Ct.updatedAt)-new Date(qe.updatedAt));return je.length===0?null:n.jsxs("div",{style:{marginTop:20,padding:16,background:"#f8f9fa",borderRadius:6,border:"1px solid #e0e0e0"},children:[n.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#2c5530",marginBottom:12},children:"Allowance Update History"}),n.jsx("div",{style:{maxHeight:200,overflowY:"auto"},children:je.map(qe=>{const Ct=qe.variance,bn=Ct>0?"#28a745":Ct<0?"#dc3545":"#666";return n.jsxs("div",{style:{padding:8,marginBottom:8,background:"#fff",borderRadius:4,borderLeft:`3px solid ${bn}`},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:13,fontWeight:600},children:qe.serviceName}),n.jsx("div",{style:{fontSize:11,color:"#666"},children:Fi(qe.updatedAt)})]}),n.jsx("div",{style:{fontSize:11,fontWeight:700,color:bn,padding:"2px 8px",background:Ct>0?"#d1e7dd":Ct<0?"#f8d7da":"#e0e0e0",borderRadius:10},children:Ct>0?"Under Budget":Ct<0?"Over Budget":"On Budget"})]}),n.jsxs("div",{style:{fontSize:12,color:"#666"},children:["Estimated: ",D(qe.contractPrice)," → Actual: ",D(qe.newCost)," ",n.jsxs("span",{style:{fontWeight:700,color:bn,marginLeft:8},children:["(",Ct>=0?"+":"",D(Ct),")"]})]})]},qe.id)})})]})})(),n.jsx("button",{style:{...p.btn,width:"100%",marginTop:16,background:"#1565c0"},onClick:()=>vs.saveAllowanceProgressToFolders(Q,Se),title:"Generate and save allowance progress update for customer",children:"Generate Customer Update"}),(()=>{const je=Q.scrubbPayments||[],qe=je.reduce((nt,Ue)=>nt+parseFloat(Ue.amount||0),0),Ct=je.filter(nt=>nt.isContingencyPayment).reduce((nt,Ue)=>nt+parseFloat(Ue.amount||0),0),bn=je.filter(nt=>!nt.isContingencyPayment).reduce((nt,Ue)=>nt+parseFloat(Ue.amount||0),0),xt=Ht-Ct,Dn=()=>{if(!$n.amount||parseFloat($n.amount)<=0){tt.error("Please enter a valid amount");return}const nt={id:Tn(),amount:parseFloat($n.amount),date:$n.date||new Date().toISOString().split("T")[0],notes:$n.notes||"",isContingencyPayment:$n.isContingencyPayment||!1,createdAt:new Date().toISOString(),createdBy:z};ue(ki(Q,{scrubbPayments:[...je,nt]},z)),si({amount:"",date:"",notes:"",isContingencyPayment:!1}),xs(!1),tt.success("Payment recorded")};return n.jsxs("div",{style:{marginTop:20,padding:16,background:"#e3f2fd",borderRadius:6,border:"1px solid #2196f3"},children:[n.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#1565c0",marginBottom:12},children:"Payment Tracking"}),n.jsxs("div",{style:{marginBottom:16,padding:12,background:"#fff",borderRadius:4,border:"1px solid #e0e0e0"},children:[n.jsx("div",{style:{fontSize:11,color:"#666",marginBottom:8},children:"Track all project payments (down payment, progress payments, etc.)"}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:11,color:"#666"},children:"Total Payments"}),n.jsx("div",{style:{fontSize:16,fontWeight:700,color:"#1565c0"},children:D(qe)})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:11,color:"#666"},children:"Regular Payments"}),n.jsx("div",{style:{fontSize:16,fontWeight:700,color:"#2196f3"},children:D(bn)})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:11,color:"#666"},children:"Contingency Fund"}),n.jsx("div",{style:{fontSize:16,fontWeight:700,color:"#ff9800"},children:D(Ct)})]})]})]}),Dt&&n.jsxs("div",{style:{marginBottom:16,padding:12,background:"#fff3cd",borderRadius:4,border:"1px solid #ffc107"},children:[n.jsxs("div",{style:{fontSize:12,color:"#856404",marginBottom:8},children:["Contingency fund overdrafted by ",n.jsx("strong",{children:D(Ht)})," — customer must pay to refund."]}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:11,color:"#666"},children:"Overdraft Amount"}),n.jsx("div",{style:{fontSize:14,fontWeight:600,color:"#dc3545"},children:D(Ht)})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:11,color:"#666"},children:"Customer Paid"}),n.jsx("div",{style:{fontSize:14,fontWeight:600,color:"#28a745"},children:D(Ct)})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:11,color:"#666"},children:"Still Owed"}),n.jsx("div",{style:{fontSize:14,fontWeight:600,color:xt>0?"#dc3545":"#28a745"},children:D(Math.max(0,xt))})]})]})]}),je.length>0&&n.jsx("div",{style:{marginBottom:12,maxHeight:200,overflowY:"auto"},children:je.sort((nt,Ue)=>new Date(Ue.createdAt)-new Date(nt.createdAt)).map(nt=>n.jsxs("div",{style:{padding:8,marginBottom:8,background:"#fff",borderRadius:4,borderLeft:`3px solid ${nt.isContingencyPayment?"#ff9800":"#28a745"}`},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[n.jsx("div",{style:{fontSize:13,fontWeight:600,color:nt.isContingencyPayment?"#ff9800":"#28a745"},children:D(nt.amount)}),n.jsx("span",{style:{fontSize:11,fontWeight:600,color:nt.isContingencyPayment?"#ff9800":"#28a745",padding:"2px 8px",background:nt.isContingencyPayment?"#fff3e0":"#d1e7dd",borderRadius:10},children:nt.isContingencyPayment?"Contingency":"Regular"})]}),nt.notes&&n.jsx("div",{style:{fontSize:12,color:"#666",marginTop:4},children:nt.notes}),n.jsxs("div",{style:{fontSize:10,color:"#999",marginTop:2},children:["Recorded ",Fi(nt.createdAt)," by ",nt.createdBy]})]},nt.id))}),ga?n.jsxs("div",{style:{padding:12,background:"#fff",borderRadius:4,border:"1px solid #e0e0e0"},children:[n.jsx("div",{style:{fontSize:13,fontWeight:600,marginBottom:12},children:"Record New Payment"}),n.jsxs("div",{style:{marginBottom:12},children:[n.jsx("label",{style:{fontSize:11,display:"block",marginBottom:4,color:"#666"},children:"Amount *"}),n.jsx("input",{type:"number",step:"0.01",placeholder:"0.00",value:$n.amount,onChange:nt=>si(Ue=>({...Ue,amount:nt.target.value})),style:{...p.input,width:"100%"}})]}),n.jsxs("div",{style:{marginBottom:12},children:[n.jsx("label",{style:{fontSize:11,display:"block",marginBottom:4,color:"#666"},children:"Date"}),n.jsx("input",{type:"date",value:$n.date||new Date().toISOString().split("T")[0],onChange:nt=>si(Ue=>({...Ue,date:nt.target.value})),style:{...p.input,width:"100%"}})]}),n.jsxs("div",{style:{marginBottom:12},children:[n.jsx("label",{style:{fontSize:11,display:"block",marginBottom:4,color:"#666"},children:"Notes"}),n.jsx("textarea",{placeholder:"Payment method, check number...",value:$n.notes,onChange:nt=>si(Ue=>({...Ue,notes:nt.target.value})),style:{...p.input,width:"100%",minHeight:60,resize:"vertical"}})]}),n.jsx("div",{style:{marginBottom:12,padding:12,background:"#fff3e0",borderRadius:4,border:"1px solid #ff9800"},children:n.jsxs("label",{style:{display:"flex",alignItems:"center",cursor:"pointer"},children:[n.jsx("input",{type:"checkbox",checked:$n.isContingencyPayment,onChange:nt=>si(Ue=>({...Ue,isContingencyPayment:nt.target.checked})),style:{marginRight:8,width:16,height:16}}),n.jsx("span",{style:{fontSize:12,fontWeight:600,color:"#856404"},children:"Apply to Contingency Fund"})]})}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{style:{...p.btn,flex:1,background:"#28a745"},onClick:Dn,children:"Save Payment"}),n.jsx("button",{style:{...p.btn,flex:1,background:"#6c757d"},onClick:()=>{xs(!1),si({amount:"",date:"",notes:"",isContingencyPayment:!1})},children:"Cancel"})]})]}):n.jsx("button",{style:{...p.btn,width:"100%",background:"#28a745"},onClick:()=>xs(!0),children:"+ Add Payment"})]})})()]})})()]})]})})()]}),On==="scrubb"&&Q&&!["Accepted","Under Contract","Completed"].includes(Q.status)&&n.jsxs("div",{style:{textAlign:"center",padding:40,color:"#666"},children:[n.jsx("p",{style:{fontSize:16},children:"Cost tracking is available for accepted quotes and contracts."}),n.jsxs("p",{style:{fontSize:13},children:["Current status: ",n.jsx("strong",{children:Q.status})]})]}),n.jsx(Xp,{show:ha,title:Zs?"Edit Permit":"Add Permit",nameLabel:"Permit Name",namePlaceholder:"e.g., Building Permit, Electrical Permit",costLabel:"Actual Cost",saveLabel:Zs?"Update Permit":"Add Permit",entryName:Xs,entryCost:Go,setEntryName:Ks,setEntryCost:Et,onSave:za,onClose:go}),n.jsx(Xp,{show:ma,title:qs?"Edit Material":"Add Material",nameLabel:"Material Name",namePlaceholder:"e.g., Lumber, Hardware, Fixtures",costLabel:"Cost",saveLabel:qs?"Update Material":"Add Material",entryName:Ar,entryCost:er,setEntryName:ms,setEntryCost:yn,onSave:pr,onClose:Da}),On==="scope"&&G&&(()=>{const r=Zp(Q,Se,it);return n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[n.jsx("h3",{style:{margin:0},children:"Scope of Work"}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{style:p.btnPurpleAlt,onClick:()=>ca(r),children:"Open in New Tab"}),n.jsx("button",{style:p.btnSm,onClick:()=>{const c=new Blob([r],{type:"text/html"}),m=URL.createObjectURL(c),g=document.createElement("a");g.href=m,g.download=`Scope_of_Work_${rt.getQuoteNum(Q)}.html`,g.click(),URL.revokeObjectURL(m)},children:"Download"})]})]}),n.jsx("iframe",{srcDoc:r,style:{width:"100%",height:"calc(100vh - 200px)",border:"1px solid #e0e0e0",borderRadius:8},title:"Scope of Work"})]})})(),On==="notes"&&(()=>{const r=Q.publishedGeneralCrewNotes||[],c=Q.publishedGeneralCustomerNotes||[],m=N=>new Date(N).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"}),g=()=>{if(!pi.trim())return;const N={text:pi,publishedAt:new Date().toISOString(),publishedBy:z||"User"},X=Rt==="crew"?"publishedGeneralCrewNotes":"publishedGeneralCustomerNotes",be=Q[X]||[];ol(Q.id,{[X]:[...be,N]}),zi(""),Ei(null)},x=(N,X)=>{if(!window.confirm("Delete this note?"))return;const be=Q[N]||[];ol(Q.id,{[N]:be.filter((ke,K)=>K!==X)})};return n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[n.jsx("h3",{style:{margin:0,color:"#2c5530"},children:"General Project Notes"}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{onClick:()=>{Ei(Rt==="crew"?null:"crew"),zi("")},style:{padding:"6px 14px",background:Rt==="crew"?"#e65100":"#fff3e0",color:Rt==="crew"?"#fff":"#e65100",border:"2px solid #e65100",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"},children:Rt==="crew"?"✕ Cancel":"+ Crew Note"}),n.jsx("button",{onClick:()=>{Ei(Rt==="customer"?null:"customer"),zi("")},style:{padding:"6px 14px",background:Rt==="customer"?"#1565c0":"#e3f2fd",color:Rt==="customer"?"#fff":"#1565c0",border:"2px solid #1565c0",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"},children:Rt==="customer"?"✕ Cancel":"+ Customer Note"})]})]}),Rt&&n.jsxs("div",{style:{padding:16,background:Rt==="crew"?"#fff3e0":"#e3f2fd",borderRadius:8,marginBottom:16,border:`2px solid ${Rt==="crew"?"#ffb74d":"#90caf9"}`},children:[n.jsx("div",{style:{fontSize:14,fontWeight:700,color:Rt==="crew"?"#e65100":"#1565c0",marginBottom:10},children:Rt==="crew"?"🔧 New Crew Note (staff only)":"💬 New Customer Note (visible to customer)"}),n.jsx("textarea",{style:{width:"100%",minHeight:80,padding:12,fontSize:14,fontFamily:"inherit",border:`1px solid ${Rt==="crew"?"#ffb74d":"#90caf9"}`,borderRadius:4,resize:"vertical"},placeholder:Rt==="crew"?"Type crew instructions...":"Type customer note...",value:pi,onChange:N=>zi(N.target.value),autoFocus:!0}),pi.trim()&&n.jsx("div",{style:{marginTop:8,display:"flex",justifyContent:"flex-end"},children:n.jsx("button",{onClick:g,style:{padding:"8px 20px",background:Rt==="crew"?"#e65100":"#1565c0",color:"#fff",border:"none",borderRadius:6,fontSize:14,fontWeight:700,cursor:"pointer"},children:"📤 Publish Note"})})]}),r.length===0&&c.length===0&&!Rt&&n.jsx("p",{style:{color:"#999",fontSize:13,fontStyle:"italic",margin:0},children:"No general notes yet. Use the buttons above to add crew or customer notes."}),r.length>0&&n.jsxs("div",{style:{marginBottom:c.length>0?16:0},children:[n.jsxs("div",{style:{fontSize:13,fontWeight:700,color:"#e65100",marginBottom:8},children:["🔧 Crew Notes (",r.length,")"]}),r.map((N,X)=>n.jsx("div",{style:{padding:10,background:"#fff",borderRadius:4,marginBottom:6,border:"1px solid #fff3e0",borderLeft:"4px solid #ff6b35"},children:n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[n.jsxs("div",{style:{flex:1},children:[n.jsx("div",{style:{fontSize:13,lineHeight:1.5},children:N.text}),n.jsxs("div",{style:{fontSize:11,color:"#999",marginTop:4},children:[m(N.publishedAt)," by ",N.publishedBy]})]}),n.jsx("button",{onClick:()=>x("publishedGeneralCrewNotes",X),style:{padding:"3px 10px",background:"#d32f2f",color:"#fff",border:"none",borderRadius:3,fontSize:11,fontWeight:600,cursor:"pointer",marginLeft:8},children:"🗑️"})]})},X))]}),c.length>0&&n.jsxs("div",{children:[n.jsxs("div",{style:{fontSize:13,fontWeight:700,color:"#1565c0",marginBottom:8},children:["💬 Customer Notes (",c.length,")"]}),c.map((N,X)=>n.jsx("div",{style:{padding:10,background:"#fff",borderRadius:4,marginBottom:6,border:"1px solid #e3f2fd",borderLeft:"4px solid #1565c0"},children:n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[n.jsxs("div",{style:{flex:1},children:[n.jsx("div",{style:{fontSize:13,lineHeight:1.5},children:N.text}),n.jsxs("div",{style:{fontSize:11,color:"#999",marginTop:4},children:[m(N.publishedAt)," by ",N.publishedBy]})]}),n.jsx("button",{onClick:()=>x("publishedGeneralCustomerNotes",X),style:{padding:"3px 10px",background:"#d32f2f",color:"#fff",border:"none",borderRadius:3,fontSize:11,fontWeight:600,cursor:"pointer",marginLeft:8},children:"🗑️"})]})},X))]})]})})()]}),I==="newQuote"&&y&&n.jsxs("div",{children:[de&&n.jsxs("div",{style:{marginBottom:20},children:[n.jsxs("h1",{style:{margin:0,fontSize:28,fontWeight:800,color:"#1a1a1a"},children:["Change Order #",d.changeOrderNum,d.changeOrderVersion]}),n.jsxs("p",{style:{margin:"6px 0 0",fontSize:14,color:"#888",display:"flex",alignItems:"center",gap:6},children:[n.jsx("span",{style:{color:"#ffc107",fontSize:16},children:"⚠"}),"Original Quote: ",de.homeModel," — ",D(Xt.calculateQuoteTotals(de,y,Vt,it,Ft,zt,He,lt,ft).totalWithContingency)]})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[n.jsxs("div",{children:[(()=>{const r=$r.find(m=>m.id===d.quoteType)||$r[0],c=de?`Change Order #${d.changeOrderNum||""}${d.changeOrderVersion||""}`:ie?"Edit Quote":`${r.icon} New ${r.name} Quote`;return n.jsx("h1",{style:{margin:0},children:c})})(),n.jsxs("p",{style:{color:"#666",margin:"4px 0 0"},children:["Customer: ",y.firstName," ",y.lastName]})]}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{style:p.btn2,onClick:rl,children:"← Back"}),n.jsx("button",{"data-testid":"save-quote-btn",style:{...p.btn,width:"auto"},onClick:il,children:de?"Save Change Order":ie?"Update":"Save Quote"})]})]}),de?n.jsxs("div",{style:{display:"flex",gap:24,alignItems:"flex-start"},children:[n.jsx("div",{style:{flex:"1 1 0",minWidth:0},children:n.jsxs("div",{style:{...p.box,marginBottom:24},children:[n.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[n.jsx("thead",{children:n.jsxs("tr",{style:{borderBottom:"2px solid #e0e0e0"},children:[n.jsx("th",{style:{textAlign:"left",padding:"12px 16px",fontSize:13,fontWeight:600,color:"#666"},children:"Service"}),n.jsx("th",{style:{textAlign:"right",padding:"12px 16px",fontSize:13,fontWeight:600,color:"#666"},children:"Original"}),n.jsx("th",{style:{textAlign:"center",padding:"12px 16px",fontSize:13,fontWeight:600,color:"#666"},children:"Adj."}),n.jsx("th",{style:{textAlign:"right",padding:"12px 16px",fontSize:13,fontWeight:600,color:"#666"},children:"New Cost"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{style:{borderBottom:"1px solid #f0f0f0"},children:[n.jsxs("td",{style:{padding:"14px 16px",fontWeight:600,fontSize:14},children:["Installation of Home",(yo=Xe.home_base_price)!=null&&yo.amount?n.jsx("span",{style:{marginLeft:8,fontSize:11,padding:"2px 10px",background:"#1976d2",color:"#fff",borderRadius:10,fontWeight:600},children:"ADJUSTED"}):null]}),n.jsx("td",{style:{textAlign:"right",padding:"14px 16px",color:"#666",fontSize:14},children:D((parseFloat(de.homeBasePrice)||0)*ds)}),n.jsx("td",{style:{textAlign:"center",padding:"14px 16px"},children:(vo=Xe.home_base_price)!=null&&vo.amount?n.jsx("input",{type:"number",style:{width:80,padding:"6px 8px",border:"2px solid #1976d2",borderRadius:6,fontSize:13,textAlign:"center",fontWeight:600,color:"#1976d2",background:"#e3f2fd"},value:((bo=Xe.home_base_price)==null?void 0:bo.amount)||"",onChange:r=>{const c=parseFloat(r.target.value)||0;$t(m=>({...m,home_base_price:{...m.home_base_price,amount:c}}))}}):n.jsx("input",{type:"number",placeholder:"—",style:{width:80,padding:"6px 8px",border:"1px solid #e0e0e0",borderRadius:6,fontSize:13,textAlign:"center",color:"#999",background:"#fafafa"},value:((wo=Xe.home_base_price)==null?void 0:wo.amount)||"",onChange:r=>{const c=parseFloat(r.target.value)||0;$t(m=>({...m,home_base_price:{...m.home_base_price,amount:c}}))}})}),n.jsx("td",{style:{textAlign:"right",padding:"14px 16px",fontWeight:700,fontSize:14,color:"#1a1a1a"},children:D((parseFloat(de.homeBasePrice)||0)*ds+(((es=Xe.home_base_price)==null?void 0:es.amount)||0))})]}),(()=>{const r=Xt.calculateQuoteTotals(de,y,Vt,it,Ft,zt,He,lt,ft),c=Object.keys(de.selectedServices||{}).filter(m=>de.selectedServices[m]&&it[m]);return c.length===0?null:c.map(m=>{var q,ue;const g=it[m],x=$e.includes(m),N=((q=Xe[m])==null?void 0:q.amount)||0,X=N!==0,be=r.svc.find(Ce=>Ce.key===m),ke=(be==null?void 0:be.cost)||0,K=ke+N;return n.jsxs("tr",{style:{borderBottom:"1px solid #f0f0f0",background:x?"#fff5f5":"transparent",cursor:"pointer"},onClick:()=>{Ee(x?Ce=>Ce.filter(De=>De!==m):Ce=>[...Ce,m])},children:[n.jsxs("td",{style:{padding:"14px 16px"},children:[n.jsx("span",{style:{fontWeight:600,fontSize:14,textDecoration:x?"line-through":"none",color:x?"#999":"#1a1a1a"},children:g.name}),x&&n.jsx("span",{style:{marginLeft:8,fontSize:11,padding:"2px 10px",background:"#dc3545",color:"#fff",borderRadius:10,fontWeight:600},children:"DELETED"}),!x&&X&&n.jsx("span",{style:{marginLeft:8,fontSize:11,padding:"2px 10px",background:"#1976d2",color:"#fff",borderRadius:10,fontWeight:600},children:"ADJUSTED"})]}),n.jsx("td",{style:{textAlign:"right",padding:"14px 16px",fontSize:14,color:x?"#dc3545":"#666",textDecoration:x?"line-through":"none"},children:D(ke)}),n.jsx("td",{style:{textAlign:"center",padding:"14px 16px"},onClick:Ce=>Ce.stopPropagation(),children:x?n.jsx("span",{style:{color:"#999"},children:"—"}):n.jsx("input",{type:"number",placeholder:"—",style:{width:80,padding:"6px 8px",fontSize:13,textAlign:"center",borderRadius:6,fontWeight:X?600:400,border:X?"2px solid #1976d2":"1px solid #e0e0e0",color:X?"#1976d2":"#999",background:X?"#e3f2fd":"#fafafa"},value:((ue=Xe[m])==null?void 0:ue.amount)||"",onChange:Ce=>{const De=parseFloat(Ce.target.value)||0;$t(Oe=>({...Oe,[m]:{...Oe[m],amount:De}}))}})}),n.jsx("td",{style:{textAlign:"right",padding:"14px 16px",fontWeight:700,fontSize:14,color:x?"#dc3545":"#1a1a1a",textDecoration:x?"line-through":"none"},children:D(x?ke:K)})]},m)})})(),(()=>{const r=Xt.calculateQuoteTotals({...d,selectedServices:{...d.selectedServices}},y,Vt,it,Ft,zt,He,lt,ft);return yt.map(c=>{const m=it[c];if(!m)return null;const g=r.svc.find(N=>N.key===c),x=(g==null?void 0:g.cost)||0;return n.jsxs("tr",{style:{borderBottom:"1px solid #f0f0f0",background:"#f0fdf4"},children:[n.jsxs("td",{style:{padding:"14px 16px"},children:[n.jsx("span",{style:{fontWeight:600,fontSize:14,color:"#1a1a1a"},children:m.name}),n.jsx("span",{style:{marginLeft:8,fontSize:11,padding:"2px 10px",background:"#28a745",color:"#fff",borderRadius:10,fontWeight:600},children:"NEW"}),n.jsx("button",{style:{marginLeft:8,background:"none",border:"none",color:"#dc3545",cursor:"pointer",fontSize:12,fontWeight:600,textDecoration:"underline"},onClick:()=>{mn(N=>N.filter(X=>X!==c)),P(N=>({...N,selectedServices:{...N.selectedServices,[c]:!1}}))},children:"remove"})]}),n.jsx("td",{style:{textAlign:"right",padding:"14px 16px",color:"#999",fontSize:14},children:"—"}),n.jsxs("td",{style:{textAlign:"center",padding:"14px 16px",color:"#28a745",fontWeight:600,fontSize:14},children:["+",D(x)]}),n.jsx("td",{style:{textAlign:"right",padding:"14px 16px",fontWeight:700,fontSize:14,color:"#28a745"},children:D(x)})]},c)})})()]})]}),(()=>{const r=Object.keys(de.selectedServices||{}).filter(m=>de.selectedServices[m]),c=Object.keys(it).filter(m=>!r.includes(m)&&!yt.includes(m));return c.length===0?null:n.jsx("div",{style:{padding:"16px",borderTop:"2px solid #e0e0e0"},children:n.jsxs("select",{style:{...p.select,fontSize:13,maxWidth:300},onChange:m=>{if(m.target.value){const g=m.target.value;mn(x=>[...x,g]),P(x=>({...x,selectedServices:{...x.selectedServices,[g]:!0}})),m.target.value=""}},children:[n.jsx("option",{value:"",children:"+ Add a service..."}),c.map(m=>n.jsx("option",{value:m,children:it[m].name},m))]})})})()]})}),n.jsx("div",{style:{width:340,flexShrink:0,position:"sticky",top:80,alignSelf:"flex-start"},children:(()=>{const r=Xt.calculateQuoteTotals(de,y,Vt,it,Ft,zt,He,lt,ft),c=Xt.calculateQuoteTotals({...d,selectedServices:{...d.selectedServices}},y,Vt,it,Ft,zt,He,lt,ft),m=Object.values(Xe).reduce((De,Oe)=>De+(Oe.amount||0),0),g=$e.reduce((De,Oe)=>{const Fe=r.svc.find(dt=>dt.key===Oe);return De+((Fe==null?void 0:Fe.cost)||0)},0),x=yt.reduce((De,Oe)=>{const Fe=c.svc.find(dt=>dt.key===Oe);return De+((Fe==null?void 0:Fe.cost)||0)},0),N=m-g+x,X=ne.find(De=>De.id===ie),be=d.changeOrderHistory||[];let ke=r.contingency||0;be.forEach(De=>{De.contingencyUsed&&(ke-=De.contingencyUsed)});let K=r.totalWithContingency;be.length>0&&(K=be[be.length-1].newTotal);const q=ke-N,ue=X?K:K+N,Ce=X&&q<0;return n.jsxs("div",{style:{background:"#2c5530",color:"#fff",borderRadius:12,padding:24,boxShadow:"0 4px 20px rgba(0,0,0,0.15)"},children:[n.jsx("h3",{style:{margin:"0 0 20px",fontSize:14,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"rgba(255,255,255,0.7)"},children:"CHANGE ORDER SUMMARY"}),n.jsxs("div",{style:{marginBottom:20},children:[n.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.6)",fontWeight:600},children:"Original Total"}),n.jsx("div",{style:{fontSize:24,fontWeight:800},children:D(r.totalWithContingency)})]}),$e.length>0&&n.jsxs("div",{style:{marginBottom:16},children:[n.jsx("div",{style:{fontSize:11,fontWeight:700,color:"#ff6b6b",letterSpacing:.5,marginBottom:8,textTransform:"uppercase"},children:"Deleted Items:"}),$e.map(De=>{const Oe=it[De],Fe=r.svc.find(dt=>dt.key===De);return n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4},children:[n.jsx("div",{style:{opacity:.9},children:(Oe==null?void 0:Oe.name)||De}),n.jsxs("div",{style:{color:"#ff6b6b",fontWeight:700},children:["-",D((Fe==null?void 0:Fe.cost)||0)]})]},De)})]}),Object.keys(Xe).filter(De=>{var Oe;return((Oe=Xe[De])==null?void 0:Oe.amount)!==0}).length>0&&n.jsxs("div",{style:{marginBottom:16},children:[n.jsx("div",{style:{fontSize:11,fontWeight:700,color:"#ffc107",letterSpacing:.5,marginBottom:8,textTransform:"uppercase"},children:"Adjusted Items:"}),Object.keys(Xe).filter(De=>{var Oe;return((Oe=Xe[De])==null?void 0:Oe.amount)!==0}).map(De=>{var Bt,un;const Oe=Xe[De];let Fe=De==="home_base_price"?"Home Base Price":((Bt=it[De])==null?void 0:Bt.name)||De,dt=De==="home_base_price"?(parseFloat(de.homeBasePrice)||0)*ds:((un=r.svc.find(he=>he.key===De))==null?void 0:un.cost)||0;return n.jsxs("div",{style:{marginBottom:6},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:13},children:[n.jsx("div",{style:{opacity:.9},children:Fe}),n.jsxs("div",{style:{color:Oe.amount>0?"#90ee90":"#ff6b6b",fontWeight:700},children:[Oe.amount>0?"+":"",D(Oe.amount)]})]}),n.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.5)"},children:[D(dt)," → ",D(dt+Oe.amount)]})]},De)})]}),yt.length>0&&n.jsxs("div",{style:{marginBottom:16},children:[n.jsx("div",{style:{fontSize:11,fontWeight:700,color:"#90ee90",letterSpacing:.5,marginBottom:8,textTransform:"uppercase"},children:"Added Items:"}),yt.map(De=>{const Oe=it[De],Fe=c.svc.find(dt=>dt.key===De);return n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4},children:[n.jsx("div",{style:{opacity:.9},children:(Oe==null?void 0:Oe.name)||De}),n.jsxs("div",{style:{color:"#90ee90",fontWeight:700},children:["+",D((Fe==null?void 0:Fe.cost)||0)]})]},De)})]}),n.jsx("div",{style:{borderTop:"1px solid rgba(255,255,255,0.2)",margin:"16px 0"}}),X&&n.jsxs("div",{style:{padding:12,background:Ce?"rgba(255,80,80,0.15)":"rgba(255,255,255,0.08)",borderRadius:8,marginBottom:16,fontSize:12,border:Ce?"1px solid rgba(255,80,80,0.4)":"none"},children:[n.jsx("div",{style:{fontWeight:600,marginBottom:6,color:"#ffc107",fontSize:11,textTransform:"uppercase",letterSpacing:.5},children:"Contingency Fund"}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:3},children:[n.jsx("span",{style:{opacity:.8},children:"Available:"}),n.jsx("span",{style:{fontWeight:600},children:D(ke)})]}),N>0&&n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:3,color:"#ffc107"},children:[n.jsx("span",{children:"Drawn:"}),n.jsxs("span",{style:{fontWeight:600},children:["-",D(N)]})]}),N<0&&n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:3,color:"#90ee90"},children:[n.jsx("span",{children:"Savings added:"}),n.jsxs("span",{style:{fontWeight:600},children:["+",D(Math.abs(N))]})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",paddingTop:4,borderTop:"1px solid rgba(255,255,255,0.15)"},children:[n.jsx("span",{style:{opacity:.8},children:"Remaining:"}),n.jsx("span",{style:{fontWeight:700,color:q>0?"#90ee90":"#ff6b6b"},children:D(q)})]}),Ce&&n.jsxs("div",{style:{marginTop:8,padding:"6px 8px",background:"rgba(255,80,80,0.2)",borderRadius:4,color:"#ff6b6b",fontSize:11,fontWeight:600},children:["WARNING: Contingency overdrafted by ",D(Math.abs(q))]})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.6)",fontWeight:600},children:X?"Contracted Price":"New Total"}),n.jsx("div",{style:{fontSize:32,fontWeight:900,lineHeight:1.2},children:D(ue)}),X&&N!==0&&n.jsxs("div",{style:{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:4},children:["Contracted price unchanged — ",N>0?"cost":"savings"," applied to contingency"]}),!X&&N!==0&&n.jsx("div",{style:{fontSize:14,fontWeight:700,marginTop:4,color:N<0?"#90ee90":"#ff6b6b"},children:N<0?D(Math.abs(N))+" savings":"+"+D(N)+" increase"})]})]})})()})]}):n.jsxs("div",{children:[n.jsx("div",{style:{...p.box,background:"#f0f7f1",marginBottom:24},children:n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[n.jsxs("div",{children:[n.jsxs("h3",{style:{margin:"0 0 8px",color:"#2c5530"},children:[y.firstName," ",y.lastName]}),n.jsxs("p",{style:{margin:0,fontSize:13},children:[y.siteAddress,", ",y.siteCity,", ",y.siteState]}),n.jsxs("p",{style:{margin:"4px 0 0",fontSize:13},children:[y.phone," ",y.email]})]}),n.jsxs("div",{style:{background:"#f8f9fa",padding:12,borderRadius:8,textAlign:"center"},children:[n.jsx("label",{style:{...p.label,marginBottom:4},children:"Drive Distance"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("input",{"data-testid":"quote-driveTime",style:{...p.input,width:70,marginBottom:0,textAlign:"center",fontWeight:600},type:"number",value:d.driveTime,onChange:r=>jt("driveTime",r.target.value)}),n.jsx("span",{children:"mi"})]}),Ko&&n.jsx("a",{href:Ko,target:"_blank",style:{...p.btnSm,background:"#4285f4",marginTop:8,fontSize:11},children:"Maps"})]})]})}),n.jsxs("div",{style:p.box,children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:In?0:8},onClick:()=>zr(r=>!r),children:[n.jsx("h2",{style:{marginTop:0,borderBottom:In?"none":"2px solid #2c5530",paddingBottom:In?0:8,flex:1},children:"Home Selection"}),n.jsx("span",{style:{fontSize:18,color:"#2c5530",fontWeight:600},children:In?"▶":"▼"})]}),!In&&n.jsxs(n.Fragment,{children:[n.jsx("p",{style:{fontSize:12,color:"#666",marginBottom:10},children:"Selecting a home will auto-fill dimensions below"}),n.jsxs("div",{style:p.row,children:[n.jsxs("div",{style:{gridColumn:"span 2"},children:[n.jsx("label",{style:p.label,children:"Model"}),n.jsx("select",{"data-testid":"quote-homeModel",style:p.select,value:d.homeModel,onChange:r=>jt("homeModel",r.target.value),children:pn.map(r=>n.jsxs("option",{value:r.name,children:[r.name,r.width>0?` (${r.width}x${r.length})`:""," ",r.price>0&&`- ${D(r.price*ds)}`]},r.name))})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Home Sale Price"}),n.jsxs("div",{style:{position:"relative"},children:[n.jsx("span",{style:{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:16,fontWeight:600,color:"#2c5530",pointerEvents:"none"},children:"$"}),n.jsx("input",{style:{...p.input,background:"#e8f5e9",fontWeight:600,fontSize:18,paddingLeft:24},type:"text",inputMode:"numeric",value:Math.round((parseFloat(d.homeBasePrice)||0)*ds)?Math.round((parseFloat(d.homeBasePrice)||0)*ds).toLocaleString():"",onChange:r=>{const c=parseFloat(r.target.value.replace(/[^0-9.]/g,""))||0;P(m=>({...m,homeBasePrice:String(c/ds)}))},placeholder:"0"})]}),at&&n.jsxs("small",{style:{color:"#666"},children:["Base: ",D(parseFloat(d.homeBasePrice)||0)," x ",ds]})]})]}),d.homeModel&&d.homeModel!=="NONE"&&(()=>{const r=pn.find(m=>m.name===d.homeModel),c=(r==null?void 0:r.floorPlanUrl)||"";return n.jsxs("div",{style:{marginTop:16,padding:16,background:"#f8f9fa",borderRadius:8},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:Nt?12:0,cursor:"pointer"},onClick:()=>Xn(!Nt),children:[n.jsxs("label",{style:{...p.label,margin:0,fontWeight:600,cursor:"pointer"},children:[Nt?"▼":"▶"," Floor Plan"]}),n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#666",cursor:"pointer",fontSize:12,fontWeight:600},onClick:m=>{m.stopPropagation(),Xn(!Nt)},children:Nt?"Minimize":"Maximize"})]}),Nt&&n.jsxs(n.Fragment,{children:[at&&n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:12},children:[n.jsx("input",{type:"text",placeholder:"Paste floor plan image URL...",style:{...p.input,width:300,marginBottom:0,fontSize:12},value:c,onChange:m=>ut(g=>g.map(x=>x.name===d.homeModel?{...x,floorPlanUrl:m.target.value}:x))}),c&&n.jsx("a",{href:c,target:"_blank",style:{fontSize:12},children:"View"})]}),c?n.jsxs("div",{style:{textAlign:"center",padding:20,background:"#fff",borderRadius:8},children:[n.jsx("p",{style:{margin:"0 0 12px",fontWeight:600,color:"#2c5530"},children:d.homeModel}),n.jsx("a",{href:c,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-block",padding:"12px 24px",background:"#2c5530",color:"#fff",borderRadius:6,textDecoration:"none",fontWeight:600},children:"View Floor Plan, Photos & 3D Tour"}),n.jsx("p",{style:{margin:"12px 0 0",fontSize:12,color:"#666"},children:"Opens Clayton Homes website with full details"})]}):n.jsxs("div",{style:{textAlign:"center",padding:20,color:"#666"},children:[n.jsx("p",{style:{margin:0},children:"No floor plan link available for this model."}),at&&n.jsx("p",{style:{margin:"8px 0 0",fontSize:12},children:"Paste a Clayton Homes URL above to add one."})]})]})]})})(),n.jsx(no,{serviceKey:"home_selection",customerNote:(ll=d.serviceNotes)==null?void 0:ll.home_selection,crewNote:(al=d.serviceCrewNotes)==null?void 0:al.home_selection,isExpanded:vt.home_selection,onToggleExpand:()=>Zt(r=>({...r,home_selection:!r.home_selection})),onUpdateCustomerNote:(r,c)=>P(m=>({...m,serviceNotes:{...m.serviceNotes,[r]:c}})),onUpdateCrewNote:(r,c)=>P(m=>({...m,serviceCrewNotes:{...m.serviceCrewNotes,[r]:c}})),publishedCustomerNotes:((dl=d.publishedServiceNotes)==null?void 0:dl.home_selection)||[],publishedCrewNotes:((So=d.publishedServiceCrewNotes)==null?void 0:So.home_selection)||[],onPublishCustomerNote:ks,onPublishCrewNote:js,onEditCustomerNote:Cs,onEditCrewNote:Ns,onDeleteCustomerNote:$s,onDeleteCrewNote:qi,userName:z})]})]}),n.jsxs("div",{style:p.box,children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:Ai?0:8},onClick:()=>Dr(r=>!r),children:[n.jsx("h2",{style:{marginTop:0,borderBottom:Ai?"none":"2px solid #2c5530",paddingBottom:Ai?0:8,flex:1},children:"House Specs"}),n.jsx("span",{style:{fontSize:18,color:"#2c5530",fontWeight:600},children:Ai?"▶":"▼"})]}),!Ai&&n.jsxs(n.Fragment,{children:[!at&&d.houseWidth&&d.houseLength?n.jsxs("div",{children:[n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:16,marginBottom:16},children:[n.jsxs("div",{style:{background:"#f8f9fa",padding:12,borderRadius:6},children:[n.jsx("label",{style:{...p.label,color:"#666"},children:"Width"}),n.jsxs("div",{style:{fontSize:18,fontWeight:600},children:[d.houseWidth,"'"]})]}),n.jsxs("div",{style:{background:"#f8f9fa",padding:12,borderRadius:6},children:[n.jsx("label",{style:{...p.label,color:"#666"},children:"Length"}),n.jsxs("div",{style:{fontSize:18,fontWeight:600},children:[d.houseLength,"'"]})]}),n.jsxs("div",{style:{background:"#f8f9fa",padding:12,borderRadius:6},children:[n.jsx("label",{style:{...p.label,color:"#666"},children:"Type"}),n.jsx("div",{style:{fontSize:18,fontWeight:600},children:d.singleDouble})]})]}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"120px 1fr",gap:12,marginBottom:8},children:[n.jsxs("div",{style:{background:"#f8f9fa",padding:12,borderRadius:6,display:"flex",flexDirection:"column",justifyContent:"center"},children:[n.jsx("label",{style:{...p.label,color:"#666",fontSize:11},children:"I-Beam"}),n.jsxs("div",{style:{fontSize:18,fontWeight:600},children:[d.iBeamHeight||Ci(parseFloat(d.houseLength)||56),'"']})]}),n.jsxs("div",{style:{background:"#f8f9fa",padding:16,borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[n.jsx("label",{style:{...p.label,color:"#666",marginBottom:10},children:"# of Pre Built Stairs"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:0,marginBottom:12},children:[n.jsx("button",{onClick:()=>jt("walkDoors",Math.max(0,(parseInt(d.walkDoors)||0)-1).toString()),style:{width:38,height:38,border:"2px solid #2c5530",borderRadius:"8px 0 0 8px",background:"#fff",fontSize:20,fontWeight:700,color:"#2c5530",cursor:"pointer",lineHeight:1},children:"−"}),n.jsx("input",{style:{width:52,height:38,border:"2px solid #2c5530",borderLeft:"none",borderRight:"none",textAlign:"center",fontSize:20,fontWeight:700,color:"#2c5530",background:"#fff",outline:"none",MozAppearance:"textfield",WebkitAppearance:"none"},type:"number",min:"0",value:d.walkDoors||"",onChange:r=>jt("walkDoors",r.target.value),placeholder:"2"}),n.jsx("button",{onClick:()=>jt("walkDoors",((parseInt(d.walkDoors)||0)+1).toString()),style:{width:38,height:38,border:"2px solid #2c5530",borderRadius:"0 8px 8px 0",background:"#fff",fontSize:20,fontWeight:700,color:"#2c5530",cursor:"pointer",lineHeight:1},children:"+"})]}),n.jsx("p",{style:{fontSize:11,color:"#856404",background:"#fff3cd",padding:"6px 10px",borderRadius:4,border:"1px solid #ffc107",margin:0},children:"Stairs are required at every entry way. If customer declines pre-built stairs, or custom deck, find temporary stairs on Amazon sized for the home height and add to materials."})]})]}),n.jsxs("div",{style:{marginTop:20,padding:16,background:"#f8f9fa",borderRadius:8},children:[n.jsx("h3",{style:{margin:"0 0 12px",fontSize:15,fontWeight:700,color:"#2c5530"},children:"Additional Home Options"}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:12},children:(()=>{const r=parseFloat(d.houseLength)||0;let c=0;return r<=52?c=6550*1.05:r>=53&&r<=64?c=6950*1.05:r>=65&&(c=7850*1.05),[{key:"lp_siding",name:"LP Siding",price:c,hasQty:!1},{key:"tray_ceiling",name:"Tray Ceiling",price:900,hasQty:!0},{key:"full_backsplash",name:"Full Backsplash",price:800,hasQty:!1},{key:"sets_of_drawers",name:"Sets of Drawers",price:900,hasQty:!0},{key:"meter_loop",name:"Meter Loop",price:300,hasQty:!1},{key:"drop_down_beam",name:"Drop Down Beam",price:500,hasQty:!1},{key:"lp_trim",name:"LP Trim",price:2e3,hasQty:!1},{key:"amp_service_200",name:"200 Amp Service",price:400,hasQty:!1},{key:"_patio",name:"Patio",isPatio:!0}]})().map(r=>{var X,be,ke,K;if(r.isPatio){const q=d.patioSize&&d.patioSize!=="none",ue=(X=d.servicePriceOverrides)==null?void 0:X.patio;return n.jsxs("div",{style:{padding:12,background:q?ue?"#fffbeb":"#e8f5e9":"#fff",borderRadius:4,border:`1px solid ${q?ue?"#ffc107":"#2c5530":"#dee2e6"}`},children:[n.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("span",{style:{flex:1,fontSize:14,fontWeight:500},children:"Patio"}),q&&n.jsx("span",{style:{fontSize:13,fontWeight:600,color:ue?"#856404":"#2c5530"},children:D(ue?parseFloat(ue):zt[d.patioSize])})]}),n.jsxs("select",{"data-testid":"quote-patioSize",style:{...p.select,marginTop:6,fontSize:13},value:d.patioSize,onChange:Ce=>jt("patioSize",Ce.target.value),children:[n.jsx("option",{value:"none",children:"None"}),Object.entries(zt).filter(([Ce])=>Ce!=="none").map(([Ce,De])=>n.jsxs("option",{value:Ce,children:[Ce,"ft - ",D(De)]},Ce))]}),q&&n.jsxs("div",{style:{marginTop:8,display:"flex",alignItems:"center",gap:8},children:[n.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#666"},children:"Price:"}),n.jsx("span",{style:{fontSize:11,color:"#666"},children:"$"}),n.jsx("input",{type:"number",min:"0",style:{width:90,padding:"4px 6px",fontSize:13,border:`1px solid ${ue?"#ffc107":"#dee2e6"}`,borderRadius:4,background:ue?"#fffbeb":"#fff"},placeholder:zt[d.patioSize],value:ue||"",onChange:Ce=>{const De=Ce.target.value;(De===""||/^\d*\.?\d*$/.test(De))&&Ut("patio",De)},onFocus:Ce=>Ce.target.select()}),ue&&n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#666",cursor:"pointer",fontSize:11,padding:0},onClick:Ce=>{Ce.preventDefault(),Ut("patio","")},title:"Reset to default price",children:"↺"})]})]},"patio")}const c=((be=d.serviceQuantities)==null?void 0:be[r.key])||1,m=((ke=d.selectedServices)==null?void 0:ke[r.key])||!1,g=(K=d.servicePriceOverrides)==null?void 0:K[r.key],x=r.hasQty?r.price*c:r.price,N=g?parseFloat(g):x;return n.jsxs("div",{style:{padding:12,background:m?g?"#fffbeb":"#e8f5e9":"#fff",borderRadius:4,border:`1px solid ${m?g?"#ffc107":"#2c5530":"#dee2e6"}`},children:[n.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[n.jsx("input",{type:"checkbox",checked:m,onChange:()=>zn(r.key),style:{width:16,height:16,cursor:"pointer"}}),n.jsx("span",{style:{flex:1,fontSize:14,fontWeight:500},children:r.name}),n.jsx("span",{style:{fontSize:13,fontWeight:600,color:g?"#856404":"#2c5530"},children:r.price>0?r.hasQty?`${D(r.price)} each`:D(N):"Enter length"})]}),m&&n.jsxs("div",{style:{marginTop:8,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[r.hasQty&&n.jsxs(n.Fragment,{children:[n.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#666"},children:"Qty:"}),n.jsx("input",{type:"number",min:"1",value:c,onChange:q=>P(ue=>({...ue,serviceQuantities:{...ue.serviceQuantities,[r.key]:parseInt(q.target.value)||1}})),style:{width:50,padding:"4px 8px",fontSize:13,border:"1px solid #dee2e6",borderRadius:4},onClick:q=>q.stopPropagation()})]}),n.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#666"},children:"Price:"}),n.jsx("span",{style:{fontSize:11,color:"#666"},children:"$"}),n.jsx("input",{type:"number",min:"0",style:{width:90,padding:"4px 6px",fontSize:13,border:`1px solid ${g?"#ffc107":"#dee2e6"}`,borderRadius:4,background:g?"#fffbeb":"#fff"},placeholder:x,value:g||"",onChange:q=>Ut(r.key,q.target.value),onFocus:q=>q.target.select(),onClick:q=>q.stopPropagation()}),g&&n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#666",cursor:"pointer",fontSize:11,padding:0},onClick:q=>{q.preventDefault(),Ut(r.key,"")},title:"Reset to default price",children:"↺"}),r.hasQty&&n.jsxs("span",{style:{fontSize:13,fontWeight:600,color:"#2c5530"},children:["= ",D(N)]})]})]},r.key)})}),n.jsxs("div",{style:{marginTop:12},children:[(d.customOptions||[]).map((r,c)=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8,padding:10,background:"#fff",borderRadius:4,border:"1px solid #dee2e6"},children:[n.jsx("input",{type:"text",placeholder:"Option name",value:r.name||"",onChange:m=>Pi(c,"name",m.target.value),style:{flex:1,padding:"6px 8px",fontSize:13,border:"1px solid #dee2e6",borderRadius:4}}),n.jsx("span",{style:{fontSize:11,color:"#666"},children:"$"}),n.jsx("input",{type:"number",min:"0",placeholder:"Price",value:r.price||"",onChange:m=>Pi(c,"price",m.target.value),style:{width:90,padding:"6px 8px",fontSize:13,border:"1px solid #dee2e6",borderRadius:4}}),n.jsx("span",{style:{fontSize:11,color:"#666"},children:"Qty:"}),n.jsx("input",{type:"number",min:"1",value:r.quantity||"1",onChange:m=>Pi(c,"quantity",m.target.value),style:{width:50,padding:"6px 8px",fontSize:13,border:"1px solid #dee2e6",borderRadius:4,textAlign:"center"}}),n.jsx("button",{type:"button",onClick:()=>cr(c),style:{background:"#dc3545",color:"#fff",border:"none",borderRadius:4,padding:"4px 8px",cursor:"pointer",fontSize:13},children:"X"})]},c)),n.jsx("button",{type:"button",onClick:ws,style:{...p.btnSm,background:"#2c5530",fontSize:12,padding:"6px 14px"},children:"+ Add Custom Option"})]})]}),n.jsxs("div",{style:{marginTop:16},children:[n.jsx("label",{style:{...p.label,color:"#dc3545",fontSize:15,fontWeight:600},children:"Foundation Type *"}),n.jsxs("select",{"data-testid":"quote-foundationType",style:{...p.select,padding:"12px",fontSize:15,fontWeight:500},value:d.foundationType||"none",onChange:r=>jt("foundationType",r.target.value),children:[n.jsx("option",{value:"none",children:"None"}),n.jsx("option",{value:"slab",children:"Engineered Slab"}),n.jsx("option",{value:"basement",children:"Basement"}),n.jsx("option",{value:"crawlspace",children:"Crawl Space"})]})]}),(d.foundationType==="basement"||d.foundationType==="crawlspace")&&n.jsxs("div",{style:{marginTop:12,padding:12,background:"#fff3cd",borderRadius:6,border:"1px solid #ffc107"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8},children:[n.jsx("span",{style:{fontSize:11,fontWeight:600,color:"#856404"},children:"ALLOWANCE"}),n.jsx("span",{style:{fontSize:12,color:"#856404"},children:d.foundationType==="basement"?"Basement (includes waterproofing & insulation)":"Crawl Space"})]}),n.jsx("label",{style:{...p.label,fontSize:12},children:"Override Price (optional)"}),n.jsx("input",{type:"text",inputMode:"decimal",style:{...p.inputSm,...(ko=d.servicePriceOverrides)!=null&&ko.foundation?p.override:{},width:"100%"},placeholder:D(d.foundationType==="basement"?(lt==null?void 0:lt.basement)||3e4:(lt==null?void 0:lt.crawlspace)||22e3),value:((Es=d.servicePriceOverrides)==null?void 0:Es.foundation)||"",onChange:r=>{const c=r.target.value;(c===""||/^\d*\.?\d*$/.test(c))&&Ut("foundation",c)},onFocus:r=>r.target.select()})]}),n.jsx("p",{style:{fontSize:12,color:"#999",marginTop:8},children:"House dimensions are set by home model selection. Contact admin to change."})]}):!at&&!d.houseWidth?n.jsx("div",{style:{background:"#fff3cd",padding:16,borderRadius:6,textAlign:"center"},children:n.jsx("p",{style:{margin:0,color:"#856404"},children:"Please select a home model above to set house dimensions"})}):n.jsxs(n.Fragment,{children:[n.jsxs("div",{style:p.row,children:[n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Width"}),n.jsx("input",{style:p.input,type:"number",value:d.houseWidth,onChange:r=>jt("houseWidth",r.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Length"}),n.jsx("input",{style:p.input,type:"number",value:d.houseLength,onChange:r=>jt("houseLength",r.target.value)})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Type"}),n.jsxs("select",{style:p.select,value:d.singleDouble,onChange:r=>jt("singleDouble",r.target.value),children:[n.jsx("option",{value:"Single",children:"Single"}),n.jsx("option",{value:"Double",children:"Double"})]})]})]}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"120px 1fr",gap:12,marginBottom:8},children:[n.jsxs("div",{style:{background:"#f8f9fa",padding:12,borderRadius:6,display:"flex",flexDirection:"column",justifyContent:"center"},children:[n.jsx("label",{style:{...p.label,color:"#666",fontSize:11},children:"I-Beam"}),n.jsxs("div",{style:{fontSize:18,fontWeight:600},children:[d.iBeamHeight||Ci(parseFloat(d.houseLength)||56),'"']})]}),n.jsxs("div",{style:{background:"#f8f9fa",padding:16,borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[n.jsx("label",{style:{...p.label,color:"#666",marginBottom:10},children:"# of Pre Built Stairs"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:0,marginBottom:12},children:[n.jsx("button",{onClick:()=>jt("walkDoors",Math.max(0,(parseInt(d.walkDoors)||0)-1).toString()),style:{width:38,height:38,border:"2px solid #2c5530",borderRadius:"8px 0 0 8px",background:"#fff",fontSize:20,fontWeight:700,color:"#2c5530",cursor:"pointer",lineHeight:1},children:"−"}),n.jsx("input",{style:{width:52,height:38,border:"2px solid #2c5530",borderLeft:"none",borderRight:"none",textAlign:"center",fontSize:20,fontWeight:700,color:"#2c5530",background:"#fff",outline:"none",MozAppearance:"textfield",WebkitAppearance:"none"},type:"number",min:"0",value:d.walkDoors||"",onChange:r=>jt("walkDoors",r.target.value),placeholder:"2"}),n.jsx("button",{onClick:()=>jt("walkDoors",((parseInt(d.walkDoors)||0)+1).toString()),style:{width:38,height:38,border:"2px solid #2c5530",borderRadius:"0 8px 8px 0",background:"#fff",fontSize:20,fontWeight:700,color:"#2c5530",cursor:"pointer",lineHeight:1},children:"+"})]}),n.jsx("p",{style:{fontSize:11,color:"#856404",background:"#fff3cd",padding:"6px 10px",borderRadius:4,border:"1px solid #ffc107",margin:0},children:"Stairs are required at every entry way. If customer declines pre-built stairs, or custom deck, find temporary stairs on Amazon sized for the home height and add to materials."})]})]}),n.jsxs("div",{style:{marginTop:20,padding:16,background:"#f8f9fa",borderRadius:8},children:[n.jsx("h3",{style:{margin:"0 0 12px",fontSize:15,fontWeight:700,color:"#2c5530"},children:"Additional Home Options"}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:12},children:(()=>{const r=parseFloat(d.houseLength)||0;let c=0;return r<=52?c=6550*1.05:r>=53&&r<=64?c=6950*1.05:r>=65&&(c=7850*1.05),[{key:"lp_siding",name:"LP Siding",price:c,hasQty:!1},{key:"tray_ceiling",name:"Tray Ceiling",price:900,hasQty:!0},{key:"full_backsplash",name:"Full Backsplash",price:800,hasQty:!1},{key:"sets_of_drawers",name:"Sets of Drawers",price:900,hasQty:!0},{key:"meter_loop",name:"Meter Loop",price:300,hasQty:!1},{key:"drop_down_beam",name:"Drop Down Beam",price:500,hasQty:!1},{key:"lp_trim",name:"LP Trim",price:2e3,hasQty:!1},{key:"amp_service_200",name:"200 Amp Service",price:400,hasQty:!1},{key:"_patio",name:"Patio",isPatio:!0}]})().map(r=>{var X,be,ke,K;if(r.isPatio){const q=d.patioSize&&d.patioSize!=="none",ue=(X=d.servicePriceOverrides)==null?void 0:X.patio;return n.jsxs("div",{style:{padding:12,background:q?ue?"#fffbeb":"#e8f5e9":"#fff",borderRadius:4,border:`1px solid ${q?ue?"#ffc107":"#2c5530":"#dee2e6"}`},children:[n.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("span",{style:{flex:1,fontSize:14,fontWeight:500},children:"Patio"}),q&&n.jsx("span",{style:{fontSize:13,fontWeight:600,color:ue?"#856404":"#2c5530"},children:D(ue?parseFloat(ue):zt[d.patioSize])})]}),n.jsxs("select",{"data-testid":"quote-patioSize",style:{...p.select,marginTop:6,fontSize:13},value:d.patioSize,onChange:Ce=>jt("patioSize",Ce.target.value),children:[n.jsx("option",{value:"none",children:"None"}),Object.entries(zt).filter(([Ce])=>Ce!=="none").map(([Ce,De])=>n.jsxs("option",{value:Ce,children:[Ce,"ft - ",D(De)]},Ce))]}),q&&n.jsxs("div",{style:{marginTop:8,display:"flex",alignItems:"center",gap:8},children:[n.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#666"},children:"Price:"}),n.jsx("span",{style:{fontSize:11,color:"#666"},children:"$"}),n.jsx("input",{type:"number",min:"0",style:{width:90,padding:"4px 6px",fontSize:13,border:`1px solid ${ue?"#ffc107":"#dee2e6"}`,borderRadius:4,background:ue?"#fffbeb":"#fff"},placeholder:zt[d.patioSize],value:ue||"",onChange:Ce=>{const De=Ce.target.value;(De===""||/^\d*\.?\d*$/.test(De))&&Ut("patio",De)},onFocus:Ce=>Ce.target.select()}),ue&&n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#666",cursor:"pointer",fontSize:11,padding:0},onClick:Ce=>{Ce.preventDefault(),Ut("patio","")},title:"Reset to default price",children:"↺"})]})]},"patio")}const c=((be=d.serviceQuantities)==null?void 0:be[r.key])||1,m=((ke=d.selectedServices)==null?void 0:ke[r.key])||!1,g=(K=d.servicePriceOverrides)==null?void 0:K[r.key],x=r.hasQty?r.price*c:r.price,N=g?parseFloat(g):x;return n.jsxs("div",{style:{padding:12,background:m?g?"#fffbeb":"#e8f5e9":"#fff",borderRadius:4,border:`1px solid ${m?g?"#ffc107":"#2c5530":"#dee2e6"}`},children:[n.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[n.jsx("input",{type:"checkbox",checked:m,onChange:()=>zn(r.key),style:{width:16,height:16,cursor:"pointer"}}),n.jsx("span",{style:{flex:1,fontSize:14,fontWeight:500},children:r.name}),n.jsx("span",{style:{fontSize:13,fontWeight:600,color:g?"#856404":"#2c5530"},children:r.price>0?r.hasQty?`${D(r.price)} each`:D(N):"Enter length"})]}),m&&n.jsxs("div",{style:{marginTop:8,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[r.hasQty&&n.jsxs(n.Fragment,{children:[n.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#666"},children:"Qty:"}),n.jsx("input",{type:"number",min:"1",value:c,onChange:q=>P(ue=>({...ue,serviceQuantities:{...ue.serviceQuantities,[r.key]:parseInt(q.target.value)||1}})),style:{width:50,padding:"4px 8px",fontSize:13,border:"1px solid #dee2e6",borderRadius:4},onClick:q=>q.stopPropagation()})]}),n.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#666"},children:"Price:"}),n.jsx("span",{style:{fontSize:11,color:"#666"},children:"$"}),n.jsx("input",{type:"number",min:"0",style:{width:90,padding:"4px 6px",fontSize:13,border:`1px solid ${g?"#ffc107":"#dee2e6"}`,borderRadius:4,background:g?"#fffbeb":"#fff"},placeholder:x,value:g||"",onChange:q=>Ut(r.key,q.target.value),onFocus:q=>q.target.select(),onClick:q=>q.stopPropagation()}),g&&n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#666",cursor:"pointer",fontSize:11,padding:0},onClick:q=>{q.preventDefault(),Ut(r.key,"")},title:"Reset to default price",children:"↺"}),r.hasQty&&n.jsxs("span",{style:{fontSize:13,fontWeight:600,color:"#2c5530"},children:["= ",D(N)]})]})]},r.key)})}),n.jsxs("div",{style:{marginTop:12},children:[(d.customOptions||[]).map((r,c)=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8,padding:10,background:"#fff",borderRadius:4,border:"1px solid #dee2e6"},children:[n.jsx("input",{type:"text",placeholder:"Option name",value:r.name||"",onChange:m=>Pi(c,"name",m.target.value),style:{flex:1,padding:"6px 8px",fontSize:13,border:"1px solid #dee2e6",borderRadius:4}}),n.jsx("span",{style:{fontSize:11,color:"#666"},children:"$"}),n.jsx("input",{type:"number",min:"0",placeholder:"Price",value:r.price||"",onChange:m=>Pi(c,"price",m.target.value),style:{width:90,padding:"6px 8px",fontSize:13,border:"1px solid #dee2e6",borderRadius:4}}),n.jsx("span",{style:{fontSize:11,color:"#666"},children:"Qty:"}),n.jsx("input",{type:"number",min:"1",value:r.quantity||"1",onChange:m=>Pi(c,"quantity",m.target.value),style:{width:50,padding:"6px 8px",fontSize:13,border:"1px solid #dee2e6",borderRadius:4,textAlign:"center"}}),n.jsx("button",{type:"button",onClick:()=>cr(c),style:{background:"#dc3545",color:"#fff",border:"none",borderRadius:4,padding:"4px 8px",cursor:"pointer",fontSize:13},children:"X"})]},c)),n.jsx("button",{type:"button",onClick:ws,style:{...p.btnSm,background:"#2c5530",fontSize:12,padding:"6px 14px"},children:"+ Add Custom Option"})]})]}),n.jsxs("div",{style:{marginTop:16},children:[n.jsx("label",{style:{...p.label,color:"#dc3545",fontSize:15,fontWeight:600},children:"Foundation Type *"}),n.jsxs("select",{"data-testid":"quote-foundationType",style:{...p.select,padding:"12px",fontSize:15,fontWeight:500},value:d.foundationType||"none",onChange:r=>jt("foundationType",r.target.value),children:[n.jsx("option",{value:"none",children:"None"}),n.jsx("option",{value:"slab",children:"Engineered Slab"}),n.jsx("option",{value:"basement",children:"Basement"}),n.jsx("option",{value:"crawlspace",children:"Crawl Space"})]})]}),(d.foundationType==="basement"||d.foundationType==="crawlspace")&&n.jsxs("div",{style:{marginTop:12,padding:12,background:"#fff3cd",borderRadius:6,border:"1px solid #ffc107"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8},children:[n.jsx("span",{style:{fontSize:11,fontWeight:600,color:"#856404"},children:"ALLOWANCE"}),n.jsx("span",{style:{fontSize:12,color:"#856404"},children:d.foundationType==="basement"?"Basement (includes waterproofing & insulation)":"Crawl Space"})]}),n.jsx("label",{style:{...p.label,fontSize:12},children:"Override Price (optional)"}),n.jsx("input",{type:"text",inputMode:"decimal",style:{...p.inputSm,...(zs=d.servicePriceOverrides)!=null&&zs.foundation?p.override:{},width:"100%"},placeholder:D(d.foundationType==="basement"?(lt==null?void 0:lt.basement)||3e4:(lt==null?void 0:lt.crawlspace)||22e3),value:((cl=d.servicePriceOverrides)==null?void 0:cl.foundation)||"",onChange:r=>{const c=r.target.value;(c===""||/^\d*\.?\d*$/.test(c))&&Ut("foundation",c)},onFocus:r=>r.target.select()})]})]}),n.jsx(no,{serviceKey:"foundation",customerNote:(ur=d.serviceNotes)==null?void 0:ur.foundation,crewNote:(pl=d.serviceCrewNotes)==null?void 0:pl.foundation,isExpanded:vt.foundation,onToggleExpand:()=>Zt(r=>({...r,foundation:!r.foundation})),onUpdateCustomerNote:(r,c)=>P(m=>({...m,serviceNotes:{...m.serviceNotes,[r]:c}})),onUpdateCrewNote:(r,c)=>P(m=>({...m,serviceCrewNotes:{...m.serviceCrewNotes,[r]:c}})),publishedCustomerNotes:((jo=d.publishedServiceNotes)==null?void 0:jo.foundation)||[],publishedCrewNotes:((Br=d.publishedServiceCrewNotes)==null?void 0:Br.foundation)||[],onPublishCustomerNote:ks,onPublishCrewNote:js,onEditCustomerNote:Cs,onEditCrewNote:Ns,onDeleteCustomerNote:$s,onDeleteCrewNote:qi,userName:z})]})]}),n.jsxs("div",{style:p.box,children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:ui?0:8},onClick:()=>Qs(r=>!r),children:[n.jsx("h2",{style:{marginTop:0,borderBottom:ui?"none":"2px solid #2c5530",paddingBottom:ui?0:8,flex:1},children:"Home Installation Services"}),n.jsx("span",{style:{fontSize:18,color:"#2c5530",fontWeight:600},children:ui?"▶":"▼"})]}),!ui&&n.jsxs(n.Fragment,{children:[n.jsx("p",{style:{fontSize:12,color:"#666",marginBottom:12},children:"Select installation services and edit prices as needed. Prices can be customized per quote."}),n.jsx("div",{style:{display:"flex",flexDirection:"column",border:"1px solid #e0e0e0",borderRadius:6,overflow:"hidden"},children:ji.map((r,c)=>{var be,ke,K,q,ue,Ce,De,Oe,Fe,dt,Bt,un,he;const m=it[r];if(!m)return null;const g=(be=d.selectedServices)==null?void 0:be[r],x=(ke=d.servicePriceOverrides)==null?void 0:ke[r],N=((K=d.serviceQuantities)==null?void 0:K[r])||1,X=((q=d.serviceNotes)==null?void 0:q[r])||((ue=d.serviceCrewNotes)==null?void 0:ue[r])||((De=(Ce=d.publishedServiceNotes)==null?void 0:Ce[r])==null?void 0:De.length)>0||((Fe=(Oe=d.publishedServiceCrewNotes)==null?void 0:Oe[r])==null?void 0:Fe.length)>0;return n.jsxs(cs.Fragment,{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:g?x?"#fffbeb":"#e8f5e9":"#fff",borderBottom:c<ji.length-1?"1px solid #eee":"none"},children:[n.jsx("input",{type:"checkbox",checked:g||!1,onChange:()=>zn(r)}),m.hasQuantity&&g&&n.jsx("input",{type:"number",min:"1",style:{width:"50px",padding:"4px",border:"1px solid #ddd",borderRadius:4,fontSize:13,textAlign:"center"},value:N,onChange:Re=>P(Z=>({...Z,serviceQuantities:{...Z.serviceQuantities,[r]:parseInt(Re.target.value)||1}}))}),n.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column"},children:[n.jsxs("span",{style:{fontSize:14,fontWeight:g?600:400,color:g?"#2c5530":"#333"},children:[m.name,It.includes(r)&&n.jsx("span",{style:{fontSize:9,background:"#fff3cd",padding:"1px 4px",borderRadius:3,marginLeft:4},children:"ALLOWANCE"}),sn.includes(r)&&n.jsx("span",{style:{fontSize:9,background:"#e3f2fd",color:"#1565c0",padding:"1px 5px",borderRadius:3,marginLeft:6,fontWeight:600,cursor:"help"},title:"Installer's license required per MN State Statute",children:"MN LICENSE REQ."})]}),g&&Cn(r,d)&&n.jsx("span",{style:{fontSize:12,color:"#666",fontStyle:"italic",marginTop:2},children:Cn(r,d)})]}),g?n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx("span",{style:{fontSize:11,color:"#666"},children:"$"}),n.jsx("input",{type:"number",style:{...p.inputSm,...x?p.override:{},width:"90px",padding:"4px 6px"},placeholder:Ss(r)*N,value:x||"",onChange:Re=>Ut(r,Re.target.value),onFocus:Re=>Re.target.select()}),x&&n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#666",cursor:"pointer",fontSize:11,padding:0},onClick:()=>Ut(r,""),title:"Reset to default price",children:"↺"})]}):n.jsx("span",{style:{color:"#999",fontSize:13},children:m.calc?"Calc":D(Ss(r))}),g&&n.jsxs("button",{type:"button",onClick:()=>Zt(Re=>({...Re,[r]:!Re[r]})),style:{background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"2px 4px",color:X?"#1565c0":"#bbb",position:"relative"},title:vt[r]?"Hide notes":"Add/view notes",children:[vt[r]?"▼":"📝",X&&!vt[r]&&n.jsx("span",{style:{position:"absolute",top:0,right:0,width:6,height:6,background:"#1565c0",borderRadius:"50%"}})]})]}),g&&vt[r]&&n.jsx("div",{style:{padding:"0 12px 12px",background:"#f9fafb",borderBottom:"1px solid #e0e0e0"},children:n.jsx(no,{serviceKey:r,customerNote:(dt=d.serviceNotes)==null?void 0:dt[r],crewNote:(Bt=d.serviceCrewNotes)==null?void 0:Bt[r],isExpanded:vt[r],onToggleExpand:()=>Zt(Re=>({...Re,[r]:!Re[r]})),onUpdateCustomerNote:(Re,Z)=>P(Ge=>({...Ge,serviceNotes:{...Ge.serviceNotes,[Re]:Z}})),onUpdateCrewNote:(Re,Z)=>P(Ge=>({...Ge,serviceCrewNotes:{...Ge.serviceCrewNotes,[Re]:Z}})),publishedCustomerNotes:((un=d.publishedServiceNotes)==null?void 0:un[r])||[],publishedCrewNotes:((he=d.publishedServiceCrewNotes)==null?void 0:he[r])||[],onPublishCustomerNote:ks,onPublishCrewNote:js,onEditCustomerNote:Cs,onEditCrewNote:Ns,onDeleteCustomerNote:$s,onDeleteCrewNote:qi,userName:z})})]},r)})})]})]}),n.jsxs("div",{style:p.box,children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:fi?0:8},onClick:()=>Di(r=>!r),children:[n.jsx("h2",{style:{marginTop:0,borderBottom:fi?"none":"2px solid #2c5530",paddingBottom:fi?0:8,flex:1},children:"Professional Services"}),n.jsx("span",{style:{fontSize:18,color:"#2c5530",fontWeight:600},children:fi?"▶":"▼"})]}),!fi&&n.jsxs(n.Fragment,{children:[n.jsxs("p",{style:{fontSize:12,color:"#666",marginBottom:12},children:["Items marked with ",n.jsx("span",{style:{background:"#fff3cd",padding:"2px 6px",borderRadius:3,fontSize:11},children:"ALLOWANCE"})," are estimates that may vary based on site conditions. Final costs will be confirmed upon completion of work."]}),n.jsxs("div",{style:{display:"flex",flexDirection:"column",border:"1px solid #e0e0e0",borderRadius:6,overflow:"hidden"},children:[(()=>{var g,x,N,X,be,ke,K,q,ue,Ce,De;const r=d.sewerType&&d.sewerType!=="none",c=(g=d.servicePriceOverrides)==null?void 0:g.sewer,m=((x=d.serviceNotes)==null?void 0:x.sewer)||((N=d.serviceCrewNotes)==null?void 0:N.sewer)||((be=(X=d.publishedServiceNotes)==null?void 0:X.sewer)==null?void 0:be.length)>0||((K=(ke=d.publishedServiceCrewNotes)==null?void 0:ke.sewer)==null?void 0:K.length)>0;return n.jsxs(cs.Fragment,{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:r?c?"#fffbeb":"#e8f5e9":"#fff",borderBottom:"1px solid #eee"},children:[n.jsxs("select",{"data-testid":"quote-sewerType",style:{...p.select,marginBottom:0,width:"auto",minWidth:130,padding:"4px 8px",fontSize:13},value:d.sewerType,onChange:Oe=>jt("sewerType",Oe.target.value),children:[n.jsx("option",{value:"none",children:"None"}),Object.entries(Ft).filter(([Oe])=>Oe!=="none").map(([Oe,Fe])=>n.jsxs("option",{value:Oe,children:[Oe.replace("_"," ")," - ",D(Fe)]},Oe))]}),n.jsxs("span",{style:{flex:1,fontSize:14,fontWeight:r?600:400,color:r?"#2c5530":"#333"},children:["Sewer",n.jsx("span",{style:{fontSize:9,background:"#fff3cd",padding:"1px 4px",borderRadius:3,marginLeft:4},children:"ALLOWANCE"})]}),r?n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx("span",{style:{fontSize:11,color:"#666"},children:"$"}),n.jsx("input",{type:"number",style:{...p.inputSm,...c?p.override:{},width:"90px",padding:"4px 6px"},placeholder:D(Ft[d.sewerType]),value:c||"",onChange:Oe=>Ut("sewer",Oe.target.value),onFocus:Oe=>Oe.target.select()}),c&&n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#666",cursor:"pointer",fontSize:11,padding:0},onClick:()=>Ut("sewer",""),title:"Reset to default price",children:"↺"})]}):n.jsx("span",{style:{color:"#999",fontSize:13},children:"Select type"}),r&&n.jsxs("button",{type:"button",onClick:()=>Zt(Oe=>({...Oe,sewer:!Oe.sewer})),style:{background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"2px 4px",color:m?"#1565c0":"#bbb",position:"relative"},title:vt.sewer?"Hide notes":"Add/view notes",children:[vt.sewer?"▼":"📝",m&&!vt.sewer&&n.jsx("span",{style:{position:"absolute",top:0,right:0,width:6,height:6,background:"#1565c0",borderRadius:"50%"}})]})]}),r&&vt.sewer&&n.jsx("div",{style:{padding:"0 12px 12px",background:"#f9fafb",borderBottom:"1px solid #e0e0e0"},children:n.jsx(no,{serviceKey:"sewer",customerNote:(q=d.serviceNotes)==null?void 0:q.sewer,crewNote:(ue=d.serviceCrewNotes)==null?void 0:ue.sewer,isExpanded:vt.sewer,onToggleExpand:()=>Zt(Oe=>({...Oe,sewer:!Oe.sewer})),onUpdateCustomerNote:(Oe,Fe)=>P(dt=>({...dt,serviceNotes:{...dt.serviceNotes,[Oe]:Fe}})),onUpdateCrewNote:(Oe,Fe)=>P(dt=>({...dt,serviceCrewNotes:{...dt.serviceCrewNotes,[Oe]:Fe}})),publishedCustomerNotes:((Ce=d.publishedServiceNotes)==null?void 0:Ce.sewer)||[],publishedCrewNotes:((De=d.publishedServiceCrewNotes)==null?void 0:De.sewer)||[],onPublishCustomerNote:ks,onPublishCrewNote:js,onEditCustomerNote:Cs,onEditCrewNote:Ns,onDeleteCustomerNote:$s,onDeleteCrewNote:qi,userName:z})})]})})(),(()=>{var x,N,X,be,ke,K,q,ue,Ce,De,Oe;const r=parseFloat(d.wellDepth)>0,c=(x=d.servicePriceOverrides)==null?void 0:x.well,m=120*parseFloat(d.wellDepth||0)+so(d.driveTime)*Nr,g=((N=d.serviceNotes)==null?void 0:N.well)||((X=d.serviceCrewNotes)==null?void 0:X.well)||((ke=(be=d.publishedServiceNotes)==null?void 0:be.well)==null?void 0:ke.length)>0||((q=(K=d.publishedServiceCrewNotes)==null?void 0:K.well)==null?void 0:q.length)>0;return n.jsxs(cs.Fragment,{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:r?c?"#fffbeb":"#e8f5e9":"#fff",borderBottom:"1px solid #eee"},children:[n.jsx("input",{"data-testid":"quote-wellDepth",type:"number",min:"0",style:{width:70,padding:"4px 8px",fontSize:13,border:"1px solid #ddd",borderRadius:4,textAlign:"center"},value:d.wellDepth,onChange:Fe=>jt("wellDepth",Fe.target.value),placeholder:"0"}),n.jsxs("span",{style:{flex:1,fontSize:14,fontWeight:r?600:400,color:r?"#2c5530":"#333"},children:["Well (ft)",n.jsx("span",{style:{fontSize:9,background:"#fff3cd",padding:"1px 4px",borderRadius:3,marginLeft:4},children:"ALLOWANCE"})]}),r?n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx("span",{style:{fontSize:11,color:"#666"},children:"$"}),n.jsx("input",{type:"number",style:{...p.inputSm,...c?p.override:{},width:"90px",padding:"4px 6px"},placeholder:D(m),value:c||"",onChange:Fe=>Ut("well",Fe.target.value),onFocus:Fe=>Fe.target.select()}),c&&n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#666",cursor:"pointer",fontSize:11,padding:0},onClick:()=>Ut("well",""),title:"Reset to default price",children:"↺"})]}):n.jsx("span",{style:{color:"#999",fontSize:13},children:"Enter depth"}),r&&n.jsxs("button",{type:"button",onClick:()=>Zt(Fe=>({...Fe,well:!Fe.well})),style:{background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"2px 4px",color:g?"#1565c0":"#bbb",position:"relative"},title:vt.well?"Hide notes":"Add/view notes",children:[vt.well?"▼":"📝",g&&!vt.well&&n.jsx("span",{style:{position:"absolute",top:0,right:0,width:6,height:6,background:"#1565c0",borderRadius:"50%"}})]})]}),r&&vt.well&&n.jsx("div",{style:{padding:"0 12px 12px",background:"#f9fafb",borderBottom:"1px solid #e0e0e0"},children:n.jsx(no,{serviceKey:"well",customerNote:(ue=d.serviceNotes)==null?void 0:ue.well,crewNote:(Ce=d.serviceCrewNotes)==null?void 0:Ce.well,isExpanded:vt.well,onToggleExpand:()=>Zt(Fe=>({...Fe,well:!Fe.well})),onUpdateCustomerNote:(Fe,dt)=>P(Bt=>({...Bt,serviceNotes:{...Bt.serviceNotes,[Fe]:dt}})),onUpdateCrewNote:(Fe,dt)=>P(Bt=>({...Bt,serviceCrewNotes:{...Bt.serviceCrewNotes,[Fe]:dt}})),publishedCustomerNotes:((De=d.publishedServiceNotes)==null?void 0:De.well)||[],publishedCrewNotes:((Oe=d.publishedServiceCrewNotes)==null?void 0:Oe.well)||[],onPublishCustomerNote:ks,onPublishCrewNote:js,onEditCustomerNote:Cs,onEditCrewNote:Ns,onDeleteCustomerNote:$s,onDeleteCrewNote:qi,userName:z})})]})})(),(()=>{const r=Object.entries(it).filter(([c])=>!ji.includes(c)&&!Vn.includes(c)).sort((c,m)=>{const g=It.includes(c[0])?0:1,x=It.includes(m[0])?0:1;return g-x});return r.map(([c,m],g)=>{var q,ue,Ce,De,Oe,Fe,dt,Bt,un,he,Re,Z,Ge,Qe,se,gt,st,bt,ht,Dt,Ht,je,qe,Ct,bn,xt,Dn,nt,Ue,Lt,gi,xi;const x=(q=d.selectedServices)==null?void 0:q[c],N=(ue=d.servicePriceOverrides)==null?void 0:ue[c],X=((Ce=d.serviceQuantities)==null?void 0:Ce[c])||1,be=((De=d.serviceDays)==null?void 0:De[c])||1,ke=It.includes(c),K=((Oe=d.serviceNotes)==null?void 0:Oe[c])||((Fe=d.serviceCrewNotes)==null?void 0:Fe[c])||((Bt=(dt=d.publishedServiceNotes)==null?void 0:dt[c])==null?void 0:Bt.length)>0||((he=(un=d.publishedServiceCrewNotes)==null?void 0:un[c])==null?void 0:he.length)>0;return n.jsxs(cs.Fragment,{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:x?N?"#fffbeb":"#e8f5e9":"#fff",borderBottom:g<r.length-1?"1px solid #eee":"none"},children:[n.jsx("input",{type:"checkbox",checked:x||!1,onChange:()=>zn(c)}),m.hasQuantity&&x&&n.jsx("input",{type:"number",min:"1",style:{width:"50px",padding:"4px",border:"1px solid #ddd",borderRadius:4,fontSize:13,textAlign:"center"},value:X,onChange:ct=>P(Je=>({...Je,serviceQuantities:{...Je.serviceQuantities,[c]:parseInt(ct.target.value)||1}}))}),m.hasDays&&x&&n.jsx("input",{type:"number",min:"1",style:{width:"50px",padding:"4px",border:"1px solid #ddd",borderRadius:4,fontSize:13,textAlign:"center"},value:be,onChange:ct=>P(Je=>({...Je,serviceDays:{...Je.serviceDays,[c]:parseInt(ct.target.value)||1}})),placeholder:"Days",title:"Number of days crew will be on site"}),n.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column"},children:[n.jsxs("span",{style:{fontSize:14,fontWeight:x?600:400,color:x?"#2c5530":"#333"},children:[m.name,ke&&n.jsx("span",{style:{fontSize:9,background:"#fff3cd",padding:"1px 4px",borderRadius:3,marginLeft:4},children:"ALLOWANCE"}),sn.includes(c)&&n.jsx("span",{style:{fontSize:9,background:"#e3f2fd",color:"#1565c0",padding:"1px 5px",borderRadius:3,marginLeft:6,fontWeight:600,cursor:"help"},title:"Installer's license required per MN State Statute",children:"MN LICENSE REQ."}),rf.includes(c)&&n.jsx("span",{style:{fontSize:9,background:"#e8f5e9",color:"#2e7d32",padding:"1px 5px",borderRadius:3,marginLeft:6,fontWeight:600,cursor:"help"},title:"Common modular home need",children:"COMMON MODULAR NEED"})]}),x&&Cn(c,d)&&!["gravel_driveway","surfaced_driveway","surfaced_sidewalks","culvert"].includes(c)&&n.jsx("span",{style:{fontSize:12,color:"#666",fontStyle:"italic",marginTop:2},children:Cn(c,d)})]}),x?n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx("span",{style:{fontSize:11,color:"#666"},children:"$"}),n.jsx("input",{type:"number",style:{...p.inputSm,...N?p.override:{},width:"90px",padding:"4px 6px"},placeholder:(c==="surfaced_driveway"||c==="surfaced_sidewalks")&&Gp(d,c)>0?D(Gp(d,c)):D(Ss(c)*X),value:N||"",onChange:ct=>Ut(c,ct.target.value),onFocus:ct=>ct.target.select()}),N&&n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#666",cursor:"pointer",fontSize:11,padding:0},onClick:()=>Ut(c,""),title:"Reset to default price",children:"↺"})]}):n.jsx("span",{style:{color:"#999",fontSize:13},children:m.calc?"Calc":D(Ss(c))}),x&&n.jsxs("button",{type:"button",onClick:()=>Zt(ct=>({...ct,[c]:!ct[c]})),style:{background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"2px 4px",color:K?"#1565c0":"#bbb",position:"relative"},title:vt[c]?"Hide notes":"Add/view notes",children:[vt[c]?"▼":"📝",K&&!vt[c]&&n.jsx("span",{style:{position:"absolute",top:0,right:0,width:6,height:6,background:"#1565c0",borderRadius:"50%"}})]})]}),x&&c==="gravel_driveway"&&n.jsxs("div",{style:{padding:"6px 12px 10px",background:"#f0f8ff",borderBottom:"1px solid #e0e0e0",display:"flex",gap:10,alignItems:"center"},children:[n.jsx("label",{style:{fontSize:12,color:"#555"},children:"Width (ft)"}),n.jsx("input",{type:"number",min:"0",style:{width:70,padding:"3px 6px",fontSize:13,border:"1px solid #ccc",borderRadius:4},value:((Z=(Re=d.serviceDimensions)==null?void 0:Re.gravel_driveway)==null?void 0:Z.width)||"",onChange:ct=>P(Je=>{var St;return{...Je,serviceDimensions:{...Je.serviceDimensions,gravel_driveway:{...((St=Je.serviceDimensions)==null?void 0:St.gravel_driveway)||{},width:ct.target.value}}}})}),n.jsx("label",{style:{fontSize:12,color:"#555"},children:"Length (ft)"}),n.jsx("input",{type:"number",min:"0",style:{width:70,padding:"3px 6px",fontSize:13,border:"1px solid #ccc",borderRadius:4},value:((Qe=(Ge=d.serviceDimensions)==null?void 0:Ge.gravel_driveway)==null?void 0:Qe.length)||"",onChange:ct=>P(Je=>{var St;return{...Je,serviceDimensions:{...Je.serviceDimensions,gravel_driveway:{...((St=Je.serviceDimensions)==null?void 0:St.gravel_driveway)||{},length:ct.target.value}}}})}),Cn("gravel_driveway",d)&&n.jsx("span",{style:{fontSize:12,color:"#2c5530",fontStyle:"italic",fontWeight:600},children:Cn("gravel_driveway",d)})]}),x&&c==="surfaced_driveway"&&n.jsxs("div",{style:{padding:"6px 12px 10px",background:"#f0f8ff",borderBottom:"1px solid #e0e0e0",display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"},children:[n.jsx("label",{style:{fontSize:12,color:"#555"},children:"Width (ft)"}),n.jsx("input",{type:"number",min:"0",style:{width:70,padding:"3px 6px",fontSize:13,border:"1px solid #ccc",borderRadius:4},value:((gt=(se=d.serviceDimensions)==null?void 0:se.surfaced_driveway)==null?void 0:gt.width)||"",onChange:ct=>P(Je=>{var St;return{...Je,serviceDimensions:{...Je.serviceDimensions,surfaced_driveway:{...((St=Je.serviceDimensions)==null?void 0:St.surfaced_driveway)||{depth:"4"},width:ct.target.value}}}})}),n.jsx("label",{style:{fontSize:12,color:"#555"},children:"Length (ft)"}),n.jsx("input",{type:"number",min:"0",style:{width:70,padding:"3px 6px",fontSize:13,border:"1px solid #ccc",borderRadius:4},value:((bt=(st=d.serviceDimensions)==null?void 0:st.surfaced_driveway)==null?void 0:bt.length)||"",onChange:ct=>P(Je=>{var St;return{...Je,serviceDimensions:{...Je.serviceDimensions,surfaced_driveway:{...((St=Je.serviceDimensions)==null?void 0:St.surfaced_driveway)||{depth:"4"},length:ct.target.value}}}})}),n.jsx("label",{style:{fontSize:12,color:"#555"},children:"Depth"}),n.jsxs("select",{style:{padding:"3px 6px",fontSize:13,border:"1px solid #ccc",borderRadius:4},value:((Dt=(ht=d.serviceDimensions)==null?void 0:ht.surfaced_driveway)==null?void 0:Dt.depth)||"4",onChange:ct=>P(Je=>{var St;return{...Je,serviceDimensions:{...Je.serviceDimensions,surfaced_driveway:{...((St=Je.serviceDimensions)==null?void 0:St.surfaced_driveway)||{},depth:ct.target.value}}}}),children:[n.jsx("option",{value:"4",children:'4" ($9.25/sqft)'}),n.jsx("option",{value:"5",children:'5" ($10.00/sqft)'}),n.jsx("option",{value:"6",children:'6" ($10.50/sqft)'})]}),Cn("surfaced_driveway",d)&&n.jsx("span",{style:{fontSize:12,color:"#2c5530",fontStyle:"italic",fontWeight:600},children:Cn("surfaced_driveway",d)})]}),x&&c==="surfaced_sidewalks"&&n.jsxs("div",{style:{padding:"6px 12px 10px",background:"#f0f8ff",borderBottom:"1px solid #e0e0e0",display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"},children:[n.jsx("label",{style:{fontSize:12,color:"#555"},children:"Width (ft)"}),n.jsx("input",{type:"number",min:"0",style:{width:70,padding:"3px 6px",fontSize:13,border:"1px solid #ccc",borderRadius:4},value:((je=(Ht=d.serviceDimensions)==null?void 0:Ht.surfaced_sidewalks)==null?void 0:je.width)||"",onChange:ct=>P(Je=>{var St;return{...Je,serviceDimensions:{...Je.serviceDimensions,surfaced_sidewalks:{...((St=Je.serviceDimensions)==null?void 0:St.surfaced_sidewalks)||{depth:"4"},width:ct.target.value}}}})}),n.jsx("label",{style:{fontSize:12,color:"#555"},children:"Length (ft)"}),n.jsx("input",{type:"number",min:"0",style:{width:70,padding:"3px 6px",fontSize:13,border:"1px solid #ccc",borderRadius:4},value:((Ct=(qe=d.serviceDimensions)==null?void 0:qe.surfaced_sidewalks)==null?void 0:Ct.length)||"",onChange:ct=>P(Je=>{var St;return{...Je,serviceDimensions:{...Je.serviceDimensions,surfaced_sidewalks:{...((St=Je.serviceDimensions)==null?void 0:St.surfaced_sidewalks)||{depth:"4"},length:ct.target.value}}}})}),n.jsx("label",{style:{fontSize:12,color:"#555"},children:"Depth"}),n.jsxs("select",{style:{padding:"3px 6px",fontSize:13,border:"1px solid #ccc",borderRadius:4},value:((xt=(bn=d.serviceDimensions)==null?void 0:bn.surfaced_sidewalks)==null?void 0:xt.depth)||"4",onChange:ct=>P(Je=>{var St;return{...Je,serviceDimensions:{...Je.serviceDimensions,surfaced_sidewalks:{...((St=Je.serviceDimensions)==null?void 0:St.surfaced_sidewalks)||{},depth:ct.target.value}}}}),children:[n.jsx("option",{value:"4",children:'4" ($9.25/sqft)'}),n.jsx("option",{value:"5",children:'5" ($10.00/sqft)'}),n.jsx("option",{value:"6",children:'6" ($10.50/sqft)'})]}),Cn("surfaced_sidewalks",d)&&n.jsx("span",{style:{fontSize:12,color:"#2c5530",fontStyle:"italic",fontWeight:600},children:Cn("surfaced_sidewalks",d)})]}),x&&c==="culvert"&&n.jsxs("div",{style:{padding:"6px 12px 10px",background:"#f0f8ff",borderBottom:"1px solid #e0e0e0",display:"flex",gap:10,alignItems:"center"},children:[n.jsx("label",{style:{fontSize:12,color:"#555"},children:"Length (ft)"}),n.jsx("input",{type:"number",min:"0",style:{width:70,padding:"3px 6px",fontSize:13,border:"1px solid #ccc",borderRadius:4},value:((nt=(Dn=d.serviceDimensions)==null?void 0:Dn.culvert)==null?void 0:nt.length)||"",onChange:ct=>P(Je=>({...Je,serviceDimensions:{...Je.serviceDimensions,culvert:{length:ct.target.value}}}))}),Cn("culvert",d)&&n.jsx("span",{style:{fontSize:12,color:"#2c5530",fontStyle:"italic",fontWeight:600},children:Cn("culvert",d)})]}),x&&vt[c]&&n.jsx("div",{style:{padding:"0 12px 12px",background:"#f9fafb",borderBottom:"1px solid #e0e0e0"},children:n.jsx(no,{serviceKey:c,customerNote:(Ue=d.serviceNotes)==null?void 0:Ue[c],crewNote:(Lt=d.serviceCrewNotes)==null?void 0:Lt[c],isExpanded:vt[c],onToggleExpand:()=>Zt(ct=>({...ct,[c]:!ct[c]})),onUpdateCustomerNote:(ct,Je)=>P(St=>({...St,serviceNotes:{...St.serviceNotes,[ct]:Je}})),onUpdateCrewNote:(ct,Je)=>P(St=>({...St,serviceCrewNotes:{...St.serviceCrewNotes,[ct]:Je}})),publishedCustomerNotes:((gi=d.publishedServiceNotes)==null?void 0:gi[c])||[],publishedCrewNotes:((xi=d.publishedServiceCrewNotes)==null?void 0:xi[c])||[],onPublishCustomerNote:ks,onPublishCrewNote:js,onEditCustomerNote:Cs,onEditCrewNote:Ns,onDeleteCustomerNote:$s,onDeleteCrewNote:qi,userName:z})})]},c)})})()]}),n.jsxs("div",{style:{marginTop:20},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12},children:[n.jsx("h4",{style:{color:"#2c5530",margin:0},children:"Additional Services"}),n.jsx("button",{type:"button",style:{...p.btnSm,background:"#2c5530"},onClick:ya,children:"+ Add Service"})]}),d.customServices.map((r,c)=>n.jsxs("div",{style:{...p.customSvc,gridTemplateColumns:"1fr 100px 32px"},children:[n.jsx("input",{type:"text",placeholder:"Service name...",style:{...p.input,marginBottom:0},value:r.name,onChange:m=>bs(c,"name",m.target.value)}),n.jsx("input",{type:"number",placeholder:"$",style:p.inputSm,value:r.price,onChange:m=>bs(c,"price",m.target.value)}),d.customServices.length>1&&n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#dc3545",cursor:"pointer",fontSize:16,padding:0},onClick:()=>fo(c),title:"Remove",children:"X"})]},c))]}),n.jsxs("div",{style:{marginTop:24,padding:16,background:"#f9f9f9",borderRadius:8},children:[n.jsx("h3",{style:{marginTop:0,marginBottom:16,color:"#2c5530"},children:"Landscaping & Deck Services"}),n.jsxs("div",{style:{...p.row},children:[n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8},children:[n.jsx("input",{type:"checkbox",checked:d.hasLandscaping||!1,onChange:r=>P(c=>({...c,hasLandscaping:r.target.checked,serviceDescriptions:r.target.checked?c.serviceDescriptions:{...c.serviceDescriptions,landscaping:""}})),style:{width:20,height:20}}),n.jsx("label",{style:{...p.label,margin:0,fontWeight:600},children:"Landscaping"})]}),d.hasLandscaping&&n.jsxs(n.Fragment,{children:[n.jsx("div",{style:{marginBottom:8,fontSize:12,color:"#666"},children:"Labor: $1,200 (2-man crew) | Drive cost calculated per day"}),n.jsxs("div",{style:{marginBottom:8},children:[n.jsx("label",{style:{...p.label,fontSize:12},children:"Description (shown on quote)"}),n.jsx("input",{type:"text",style:{...p.input,marginBottom:0},placeholder:"e.g., Seed front yard and sod around deck area",value:((Lr=d.serviceDescriptions)==null?void 0:Lr.landscaping)||"",onChange:r=>P(c=>({...c,serviceDescriptions:{...c.serviceDescriptions,landscaping:r.target.value}}))})]}),n.jsxs("div",{style:{marginBottom:8},children:[n.jsx("label",{style:{...p.label,fontSize:12},children:"Material Cost ($)"}),n.jsx("input",{type:"text",inputMode:"decimal",style:{...p.input,marginBottom:0},placeholder:"Enter material cost",value:d.landscapingMaterialCost||"",onChange:r=>{const c=r.target.value;(c===""||/^\d*\.?\d*$/.test(c))&&P(m=>({...m,landscapingMaterialCost:c}))},onFocus:r=>r.target.select()})]}),n.jsxs("div",{children:[n.jsx("label",{style:{...p.label,fontSize:12},children:"Days on Site"}),n.jsx("input",{type:"number",min:"1",style:{...p.input,marginBottom:0},value:d.landscapingDays||1,onChange:r=>P(c=>({...c,landscapingDays:parseInt(r.target.value)||1}))})]}),n.jsxs("div",{style:{marginTop:12},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:13,fontWeight:700,color:"#1565c0",background:"#e3f2fd",padding:"6px 10px",borderRadius:4,cursor:"pointer"},onClick:()=>Zt(r=>({...r,landscaping:!r.landscaping})),children:[n.jsx("span",{children:"Customer Note"}),n.jsx("span",{style:{fontSize:16},children:vt.landscaping?"▼":"▶"})]}),vt.landscaping&&n.jsx("textarea",{style:{width:"100%",padding:12,border:"2px solid #1565c0",borderRadius:6,fontSize:14,fontFamily:"inherit",minHeight:100,resize:"vertical",boxSizing:"border-box",background:"#fff",marginTop:6},placeholder:"e.g., Seed front yard, sod around deck area...",value:((Co=d.serviceNotes)==null?void 0:Co.landscaping)||"",onChange:r=>P(c=>({...c,serviceNotes:{...c.serviceNotes,landscaping:r.target.value}}))}),!vt.landscaping&&((No=d.serviceNotes)==null?void 0:No.landscaping)&&n.jsxs("div",{style:{fontSize:12,color:"#666",fontStyle:"italic",marginTop:4,padding:"4px 8px",background:"#f5f5f5",borderRadius:4},children:[d.serviceNotes.landscaping.substring(0,60),d.serviceNotes.landscaping.length>60?"...":""]})]}),n.jsxs("div",{style:{marginTop:12},children:[n.jsx("label",{style:{display:"block",fontSize:13,fontWeight:700,marginBottom:6,color:"#e65100",background:"#fff3e0",padding:"6px 10px",borderRadius:4},children:"Internal Crew Note"}),n.jsx("textarea",{style:{width:"100%",padding:12,border:"2px solid #ff9800",borderRadius:6,fontSize:14,fontFamily:"inherit",minHeight:100,resize:"vertical",boxSizing:"border-box",background:"#fff"},placeholder:"e.g., Bring rototiller and topsoil...",value:(($o=d.serviceCrewNotes)==null?void 0:$o.landscaping)||"",onChange:r=>P(c=>({...c,serviceCrewNotes:{...c.serviceCrewNotes,landscaping:r.target.value}}))})]})]})]}),n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8},children:[n.jsx("input",{type:"checkbox",checked:d.hasDeck||!1,onChange:r=>P(c=>({...c,hasDeck:r.target.checked,serviceDescriptions:r.target.checked?c.serviceDescriptions:{...c.serviceDescriptions,deck:""}})),style:{width:20,height:20}}),n.jsx("label",{style:{...p.label,margin:0,fontWeight:600},children:"Deck"})]}),d.hasDeck&&n.jsxs(n.Fragment,{children:[n.jsx("div",{style:{marginBottom:8,fontSize:12,color:"#666"},children:"Labor: $1,200 (2-man crew) | Drive cost calculated per day"}),n.jsxs("div",{style:{marginBottom:8},children:[n.jsx("label",{style:{...p.label,fontSize:12},children:"Description (shown on quote)"}),n.jsx("input",{type:"text",style:{...p.input,marginBottom:0},placeholder:"e.g., 12x16 composite decking with railing",value:((ul=d.serviceDescriptions)==null?void 0:ul.deck)||"",onChange:r=>P(c=>({...c,serviceDescriptions:{...c.serviceDescriptions,deck:r.target.value}}))})]}),n.jsxs("div",{style:{marginBottom:8},children:[n.jsx("label",{style:{...p.label,fontSize:12},children:"Material Cost ($)"}),n.jsx("input",{type:"text",inputMode:"decimal",style:{...p.input,marginBottom:0},placeholder:"Enter material cost",value:d.deckMaterialCost||"",onChange:r=>{const c=r.target.value;(c===""||/^\d*\.?\d*$/.test(c))&&P(m=>({...m,deckMaterialCost:c}))},onFocus:r=>r.target.select()})]}),n.jsxs("div",{children:[n.jsx("label",{style:{...p.label,fontSize:12},children:"Days on Site"}),n.jsx("input",{type:"number",min:"1",style:{...p.input,marginBottom:0},value:d.deckDays||1,onChange:r=>P(c=>({...c,deckDays:parseInt(r.target.value)||1}))})]}),n.jsxs("div",{style:{marginTop:12},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:13,fontWeight:700,color:"#1565c0",background:"#e3f2fd",padding:"6px 10px",borderRadius:4,cursor:"pointer"},onClick:()=>Zt(r=>({...r,deck:!r.deck})),children:[n.jsx("span",{children:"Customer Note"}),n.jsx("span",{style:{fontSize:16},children:vt.deck?"▼":"▶"})]}),vt.deck&&n.jsx("textarea",{style:{width:"100%",padding:12,border:"2px solid #1565c0",borderRadius:6,fontSize:14,fontFamily:"inherit",minHeight:100,resize:"vertical",boxSizing:"border-box",background:"#fff",marginTop:6},placeholder:"e.g., Deck will be 12x16 with composite decking and railing...",value:((fl=d.serviceNotes)==null?void 0:fl.deck)||"",onChange:r=>P(c=>({...c,serviceNotes:{...c.serviceNotes,deck:r.target.value}}))}),!vt.deck&&((hl=d.serviceNotes)==null?void 0:hl.deck)&&n.jsxs("div",{style:{fontSize:12,color:"#666",fontStyle:"italic",marginTop:4,padding:"4px 8px",background:"#f5f5f5",borderRadius:4},children:[d.serviceNotes.deck.substring(0,60),d.serviceNotes.deck.length>60?"...":""]})]}),n.jsxs("div",{style:{marginTop:12},children:[n.jsx("label",{style:{display:"block",fontSize:13,fontWeight:700,marginBottom:6,color:"#e65100",background:"#fff3e0",padding:"6px 10px",borderRadius:4},children:"Internal Crew Note"}),n.jsx("textarea",{style:{width:"100%",padding:12,border:"2px solid #ff9800",borderRadius:6,fontSize:14,fontFamily:"inherit",minHeight:100,resize:"vertical",boxSizing:"border-box",background:"#fff"},placeholder:"e.g., Customer wants composite decking - order 2 weeks ahead...",value:((ml=d.serviceCrewNotes)==null?void 0:ml.deck)||"",onChange:r=>P(c=>({...c,serviceCrewNotes:{...c.serviceCrewNotes,deck:r.target.value}}))})]})]})]})]})]})]})]}),Te&&n.jsxs("div",{style:p.box,children:[n.jsx("h2",{style:{marginTop:0,borderBottom:"2px solid #2c5530",paddingBottom:8},children:"Quote Summary"}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24},children:[n.jsxs("div",{children:[(()=>{const r=new Set(["foundation","patio",...Vn,...(d.customOptions||[]).map((x,N)=>`customopt_${N}`)]),c=Te.svc.filter(x=>r.has(x.key)),m=c.reduce((x,N)=>x+N.cost,0),g=Te.homePrice+m;return g<=0?null:n.jsxs(n.Fragment,{children:[n.jsxs("h4",{style:{color:"#2c5530"},children:["Home",at||_t?`: ${D(g)}`:""]}),n.jsx("table",{style:{...p.table,fontSize:12,marginBottom:16},children:n.jsxs("tbody",{children:[Te.homePrice>0&&n.jsxs("tr",{children:[(at||_t)&&n.jsx("td",{style:{width:24},children:n.jsx("button",{type:"button",style:{...p.btnDeleteSmMd,padding:0},onClick:()=>{P(x=>({...x,homeModel:"NONE",homeBasePrice:""}))},title:"Remove home",children:"X"})}),n.jsx("td",{children:d.homeModel!=="NONE"?d.homeModel:"Custom Home"}),(at||_t)&&n.jsx("td",{style:{textAlign:"right"},children:D(Te.homePrice)})]}),c.filter(x=>x.cost>0||x.item).map((x,N)=>{var ke;const X=((ke=d.serviceQuantities)==null?void 0:ke[x.key])||1,be=["tray_ceiling","sets_of_drawers"].includes(x.key)&&X>1&&!x.item.includes("×");return n.jsxs("tr",{style:x.isOverride||x.isCustom?{background:"#fffbeb"}:{},children:[(at||_t)&&n.jsx("td",{style:{width:24},children:n.jsx("button",{type:"button",style:{...p.btnDeleteSmMd,padding:0},onClick:()=>{x.key==="foundation"?P(K=>({...K,foundationType:"none",servicePriceOverrides:{...K.servicePriceOverrides,foundation:void 0}})):x.key==="patio"?P(K=>({...K,patioSize:"none",servicePriceOverrides:{...K.servicePriceOverrides,patio:void 0}})):zn(x.key)},title:"Remove",children:"X"})}),n.jsxs("td",{children:[x.item,be&&n.jsxs("span",{style:{fontSize:11,color:"#666",marginLeft:4},children:["(x",X,")"]})]}),(at||_t)&&n.jsx("td",{style:{textAlign:"right"},children:D(x.cost)})]},N)})]})})]})})(),n.jsxs("h4",{children:["Materials",at||_t?`: ${D(Te.matT)}`:""]}),n.jsx("table",{style:{...p.table,fontSize:12},children:n.jsx("tbody",{children:Te.mat.map((r,c)=>n.jsxs("tr",{children:[(at||_t)&&n.jsx("td",{style:{width:24},children:n.jsx("button",{type:"button",style:{...p.btnDeleteSmMd,padding:0},onClick:()=>nl(r.key),title:"Remove item",children:"X"})}),n.jsx("td",{children:r.item}),n.jsx("td",{style:{textAlign:"right"},children:r.qty}),at&&n.jsx("td",{style:{textAlign:"right"},children:df(r.total)})]},c))})}),(at||_t)&&Object.keys(d.removedMaterials||{}).filter(r=>d.removedMaterials[r]).length>0&&n.jsxs("div",{style:{marginTop:8,fontSize:11,color:"#666"},children:[n.jsx("strong",{children:"Removed:"})," ",Object.keys(d.removedMaterials).filter(r=>d.removedMaterials[r]).length," item(s)",n.jsx("button",{type:"button",style:{marginLeft:8,background:"#6c757d",color:"#fff",border:"none",borderRadius:3,padding:"2px 6px",fontSize:10,cursor:"pointer"},onClick:()=>Yi(r=>!r),children:"Restore"}),ni&&n.jsxs("div",{style:{marginTop:8,padding:10,background:"#f8f9fa",borderRadius:6,border:"1px solid #dee2e6"},children:[n.jsx("div",{style:{fontSize:12,fontWeight:600,marginBottom:6,color:"#333"},children:"Select items to restore:"}),Object.keys(d.removedMaterials).filter(r=>d.removedMaterials[r]).map(r=>{var c;return n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,padding:"3px 0"},children:[n.jsx("button",{type:"button",style:{background:"#28a745",color:"#fff",border:"none",borderRadius:3,padding:"2px 8px",fontSize:10,cursor:"pointer"},onClick:()=>{nl(r),Object.keys(d.removedMaterials).filter(g=>g!==r&&d.removedMaterials[g]).length===0&&Yi(!1)},children:"Restore"}),n.jsx("span",{style:{fontSize:12},children:((c=Vt[r])==null?void 0:c.name)||r})]},r)}),n.jsx("button",{type:"button",style:{marginTop:6,background:"#6c757d",color:"#fff",border:"none",borderRadius:3,padding:"2px 8px",fontSize:10,cursor:"pointer"},onClick:()=>{P(r=>({...r,removedMaterials:{}})),Yi(!1)},children:"Restore All"})]})]}),(at||_t)&&(d.customMaterials||[]).length>0&&n.jsxs("div",{style:{marginTop:16,paddingTop:16,borderTop:"1px solid #ddd"},children:[n.jsx("h5",{style:{margin:"0 0 12px 0",fontSize:13,color:"#666"},children:"Custom Materials"}),d.customMaterials.map((r,c)=>n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 100px 80px 32px",gap:8,marginBottom:8,alignItems:"center"},children:[n.jsx("input",{type:"text",placeholder:"Material name...",style:{...p.input,marginBottom:0,fontSize:12},value:r.name,onChange:m=>Ir(c,"name",m.target.value)}),n.jsx("input",{type:"text",inputMode:"decimal",placeholder:"Price",style:{...p.inputSm,marginBottom:0},value:r.price,onChange:m=>{const g=m.target.value;(g===""||/^\d*\.?\d*$/.test(g))&&Ir(c,"price",g)}}),n.jsx("input",{type:"text",inputMode:"decimal",placeholder:"Qty",style:{...p.inputSm,marginBottom:0},value:r.quantity,onChange:m=>{const g=m.target.value;(g===""||/^\d*\.?\d*$/.test(g))&&Ir(c,"quantity",g)}}),n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#dc3545",cursor:"pointer",fontSize:16,padding:0},onClick:()=>ba(c),title:"Remove",children:"X"})]},c))]}),(at||_t)&&n.jsx("button",{type:"button",style:{...p.btnSm,background:"#2c5530",marginTop:12,fontSize:13},onClick:va,children:"+ Add Custom Material"})]}),n.jsxs("div",{children:[(()=>{const r=Te.svc.filter(g=>ji.includes(g.key)).sort((g,x)=>{const N=sn.includes(g.key)?0:1,X=sn.includes(x.key)?0:1;if(N!==X)return N-X;const be=It.includes(g.key)?0:1,ke=It.includes(x.key)?0:1;return be-ke}),c=r.reduce((g,x)=>g+x.cost,0),m=Te.labT+c;return r.length>0&&n.jsxs(n.Fragment,{children:[n.jsxs("h4",{children:["Home Installation Services",at||_t?`: ${D(m)}`:""]}),n.jsx("table",{style:{...p.table,fontSize:12},children:n.jsxs("tbody",{children:[Te.lab.map((g,x)=>n.jsxs("tr",{children:[n.jsx("td",{children:g.item}),(at||_t)&&n.jsx("td",{style:{textAlign:"right"},children:D(g.total)})]},x)),r.map((g,x)=>n.jsxs("tr",{style:g.isOverride?{background:"#fffbeb"}:{},children:[(at||_t)&&n.jsx("td",{style:{width:24},children:n.jsx("button",{type:"button",style:{...p.btnDeleteSmMd,padding:0},onClick:()=>zn(g.key),title:"Remove service",children:"X"})}),n.jsxs("td",{children:[g.item,It.includes(g.key)&&n.jsx("span",{style:{fontSize:9,background:"#fff3cd",padding:"1px 4px",borderRadius:3,marginLeft:4},children:"ALLOWANCE"}),sn.includes(g.key)&&n.jsx("span",{style:{fontSize:9,background:"#e3f2fd",color:"#1565c0",padding:"1px 5px",borderRadius:3,marginLeft:6,fontWeight:600},children:"MN LICENSE REQ."})]}),(at||_t)&&n.jsx("td",{style:{textAlign:"right"},children:D(g.cost)})]},`summary-${x}`))]})})]})})(),(()=>{const r=new Set(["foundation","patio",...Vn,...(d.customOptions||[]).map((K,q)=>`customopt_${q}`)]),c=Te.svc.filter(K=>!ji.includes(K.key)&&!r.has(K.key)),m=c.filter(K=>It.includes(K.key)).sort((K,q)=>{const ue=sn.includes(K.key)?0:1,Ce=sn.includes(q.key)?0:1;return ue-Ce}),g=c.filter(K=>!It.includes(K.key)).sort((K,q)=>{const ue=sn.includes(K.key)?0:1,Ce=sn.includes(q.key)?0:1;return ue-Ce}),x=g.reduce((K,q)=>K+q.cost,0),N=m.reduce((K,q)=>K+q.cost,0),X=Te.svc.filter(K=>ji.includes(K.key)&&It.includes(K.key)),be=X.reduce((K,q)=>K+q.cost,0),ke=N+be;return n.jsxs(n.Fragment,{children:[(m.length>0||X.length>0)&&n.jsxs(n.Fragment,{children:[n.jsxs("h4",{style:{marginTop:16,color:"#856404"},children:["Allowances (Estimated Costs)",at||_t?`: ${D(ke)}`:""]}),n.jsxs("div",{style:{background:"#fff9e6",padding:12,borderRadius:6,marginBottom:8,fontSize:12,color:"#856404",border:"1px solid #ffc107"},children:[n.jsx("strong",{children:"What are allowances?"})," These are estimated costs based on 49 years of experience. Actual costs may vary depending on site conditions. Savings or overages are tracked in your Contingency Fund."]}),n.jsx("table",{style:{...p.table,fontSize:12},children:n.jsx("tbody",{children:m.map((K,q)=>n.jsxs("tr",{style:{background:"#fffbeb"},children:[(at||_t)&&n.jsx("td",{style:{width:24},children:n.jsx("button",{type:"button",style:{...p.btnDeleteSmMd,padding:0},onClick:()=>zn(K.key),title:"Remove service",children:"X"})}),n.jsxs("td",{children:[K.item," ",n.jsx("span",{style:{fontSize:11,color:"#856404"},children:"(Allowance)"}),sn.includes(K.key)&&n.jsx("span",{style:{fontSize:9,background:"#e3f2fd",color:"#1565c0",padding:"1px 5px",borderRadius:3,marginLeft:6,fontWeight:600},children:"MN LICENSE REQ."})]}),(at||_t)&&n.jsx("td",{style:{textAlign:"right",fontWeight:600},children:D(K.cost)})]},q))})}),X.length>0&&n.jsxs("div",{style:{fontSize:11,color:"#856404",fontStyle:"italic",marginTop:6},children:[X.map(K=>K.item).join(", ")," listed under Home Installation Services ",X.length===1?"is":"are"," also ",X.length===1?"an allowance":"allowances"," (cost included above, not counted twice)."]})]}),g.length>0&&n.jsxs(n.Fragment,{children:[n.jsxs("h4",{style:{marginTop:16},children:["Professional Services",at||_t?`: ${D(x)}`:""]}),n.jsx("table",{style:{...p.table,fontSize:12},children:n.jsx("tbody",{children:g.map((K,q)=>n.jsxs("tr",{style:K.isOverride||K.isCustom?{background:"#fffbeb"}:{},children:[(at||_t)&&n.jsx("td",{style:{width:24},children:n.jsx("button",{type:"button",style:{...p.btnDeleteSmMd,padding:0},onClick:()=>zn(K.key),title:"Remove service",children:"X"})}),n.jsxs("td",{children:[K.item,It.includes(K.key)&&n.jsx("span",{style:{fontSize:9,background:"#fff3cd",padding:"1px 4px",borderRadius:3,marginLeft:4},children:"ALLOWANCE"}),sn.includes(K.key)&&n.jsx("span",{style:{fontSize:9,background:"#e3f2fd",color:"#1565c0",padding:"1px 5px",borderRadius:3,marginLeft:6,fontWeight:600},children:"MN LICENSE REQ."})]}),(at||_t)&&n.jsx("td",{style:{textAlign:"right"},children:D(K.cost)})]},q))})})]})]})})(),at&&Object.keys(d.removedServices||{}).filter(r=>d.removedServices[r]).length>0&&n.jsxs("div",{style:{marginTop:8,fontSize:11,color:"#666"},children:[n.jsx("strong",{children:"Removed Services:"})," ",Object.keys(d.removedServices).filter(r=>d.removedServices[r]).map(r=>it[r]?it[r].name:r==="sewer"?"Sewer":r==="well"?"Well":r==="patio"?"Patio":r.startsWith("custom_")?"Custom Service":r).join(", "),n.jsx("button",{type:"button",style:{marginLeft:8,background:"#6c757d",color:"#fff",border:"none",borderRadius:3,padding:"2px 6px",fontSize:10,cursor:"pointer"},onClick:()=>P(r=>({...r,removedServices:{}})),children:"Restore All"})]})]})]}),n.jsxs("div",{style:{marginTop:24,padding:16,background:"#f8f9fa",borderRadius:8},children:[(at||_t)&&(()=>{const r=new Set(["foundation","patio",...Vn,...(d.customOptions||[]).map((x,N)=>`customopt_${N}`)]),c=Te.svc.filter(x=>r.has(x.key)).reduce((x,N)=>x+N.cost,0),m=Te.homePrice+c,g=Te.svcT-c;return n.jsxs(n.Fragment,{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:8},children:[n.jsx("span",{children:"Materials"}),n.jsx("span",{children:D(Te.matT)})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:8},children:[n.jsx("span",{children:"Services"}),n.jsx("span",{children:D(g)})]}),m>0&&n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:8},children:[n.jsx("span",{children:"Home"}),n.jsx("span",{children:D(m)})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[n.jsx("span",{children:"Project Command"}),n.jsx("span",{children:D(Te.projCmd.total)})]}),(()=>{const x=new Set(["foundation","patio",...Vn,...(d.customOptions||[]).map((ue,Ce)=>`customopt_${Ce}`)]),N=Object.keys(d.selectedServices||{}).filter(ue=>d.selectedServices[ue]),X=N.filter(ue=>ji.includes(ue)).length,be=N.filter(ue=>x.has(ue)).length+(d.patioSize&&d.patioSize!=="none"?1:0)+(d.foundationType&&d.foundationType!=="none"?1:0),ke=N.filter(ue=>It.includes(ue)&&!ji.includes(ue)&&!x.has(ue)).length+(d.sewerType&&d.sewerType!=="none"?1:0)+(parseFloat(d.wellDepth)>0?1:0),K=N.filter(ue=>!ji.includes(ue)&&!x.has(ue)&&!It.includes(ue)).length,q=(d.customServices||[]).filter(ue=>ue.name&&ue.price).length;return n.jsxs("div",{style:{fontSize:11,color:"#888",marginBottom:8,paddingLeft:4},children:[Te.projCmd.numSvc," site visits: ",[X>0&&`${X} install`,be>0&&`${be} home`,ke>0&&`${ke} allowance`,K>0&&`${K} professional`,q>0&&`${q} custom`].filter(Boolean).join(", ")]})})(),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:8,borderTop:"1px solid #ddd",paddingTop:8},children:[n.jsx("span",{children:"Subtotal"}),n.jsx("span",{children:D(Te.sub)})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:8},children:[n.jsx("span",{children:"Overhead (5%)"}),n.jsx("span",{children:D(Te.oh)})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:["Markup (",n.jsx("input",{type:"number",min:"0",max:"100",step:"1",value:d.markupRate!==void 0&&d.markupRate!==""?d.markupRate:"10",onChange:x=>P(N=>({...N,markupRate:x.target.value})),style:{width:45,padding:"1px 4px",fontSize:14,border:"1px solid #ccc",borderRadius:4,textAlign:"center"}}),"%)"]}),n.jsx("span",{children:D(Te.mu)})]})]})})(),n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:24,color:"#2c5530",borderTop:"2px solid #2c5530",paddingTop:12,marginBottom:12},children:[n.jsx("span",{children:"Total"}),n.jsx("span",{children:D(Te.total)})]}),n.jsxs("div",{style:{background:"#e3f2fd",padding:16,borderRadius:8,marginTop:12},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:700,fontSize:18,color:"#1565c0",marginBottom:8},children:[n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:6},children:[n.jsx("input",{type:"number",min:"0",max:"100",step:"1",value:d.contingencyRate||"2",onChange:r=>P(c=>({...c,contingencyRate:r.target.value})),style:{width:55,padding:"2px 4px",fontSize:16,fontWeight:700,border:"1px solid #90caf9",borderRadius:4,textAlign:"center",color:"#1565c0",background:"#fff"}}),n.jsx("span",{children:"% Contingency Allowance"})]}),n.jsx("span",{children:D(Te.contingency)})]}),n.jsxs("div",{style:{fontSize:13,color:"#666",lineHeight:1.6},children:[n.jsx("strong",{children:"Purpose:"})," A dedicated fund for change orders and allowance adjustments. If allowances (permits, well, sand pad, sewer, etc.) come in under budget, savings are added to this fund. If they exceed estimates or you make change orders, funds are drawn from here first, minimizing out-of-pocket costs. At project completion, if there are no overages or change orders, you receive back the full contingency amount plus any allowance savings."]})]}),n.jsxs("div",{"data-testid":"grand-total",style:{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:28,color:"#2c5530",borderTop:"3px solid #2c5530",paddingTop:16,marginTop:16},children:[n.jsx("span",{children:"Total Investment"}),n.jsx("span",{children:D(Te.totalWithContingency)})]})]})]}),d.houseWidth&&d.houseLength&&n.jsxs("div",{style:p.box,children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:Rn?16:0,cursor:"pointer",borderBottom:"2px solid #2c5530",paddingBottom:8},onClick:()=>Ve(!Rn),children:[n.jsxs("h2",{style:{margin:0,cursor:"pointer"},children:[Rn?"▼":"▶"," Pier Layout & Plan View"]}),n.jsx("button",{type:"button",style:{background:"transparent",border:"none",color:"#666",cursor:"pointer",fontSize:12,fontWeight:600},onClick:r=>{r.stopPropagation(),Ve(!Rn)},children:Rn?"Minimize":"Maximize"})]}),Rn&&n.jsx("div",{style:{marginTop:16},children:n.jsx(Yd,{quote:d})})]}),n.jsxs("div",{style:{display:"flex",justifyContent:"center",gap:12,marginTop:24,paddingTop:24,borderTop:"2px solid #e0e0e0"},children:[n.jsx("button",{style:p.btn2,onClick:rl,children:"← Back"}),n.jsx("button",{"data-testid":"save-quote-btn",style:{...p.btn,width:"auto",fontSize:16,padding:"12px 32px"},onClick:il,children:de?"Save Change Order":ie?"Update":"Save Quote"})]})]})]}),I==="warranties"&&n.jsxs("div",{style:p.box,children:[n.jsx("h1",{children:"Warranty Reference"}),n.jsxs("table",{style:p.table,children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:p.th,children:"Manufacturer"}),n.jsx("th",{style:p.th,children:"Terms"}),n.jsx("th",{style:p.th,children:"Phone"})]})}),n.jsx("tbody",{children:Hp.map((r,c)=>n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:r.mfr}),n.jsx("td",{style:p.td,children:r.terms}),n.jsx("td",{style:p.td,children:r.phone})]},c))})]})]}),I==="users"&&at&&n.jsxs("div",{style:p.box,children:[n.jsx("h2",{children:"User Management"}),n.jsxs("div",{style:{...p.box,background:"#f8f9fa"},children:[n.jsx("h3",{style:{margin:"0 0 12px"},children:"Add New User"}),n.jsxs("div",{style:p.row,children:[n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Username"}),n.jsx("input",{style:p.input,value:mi.username,onChange:r=>Ki(c=>({...c,username:r.target.value}))})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Full Name"}),n.jsx("input",{style:p.input,value:mi.fullName,onChange:r=>Ki(c=>({...c,fullName:r.target.value}))})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Company"}),n.jsx("input",{style:p.input,value:mi.company,onChange:r=>Ki(c=>({...c,company:r.target.value}))})]})]}),n.jsxs("div",{style:p.row,children:[n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Role"}),n.jsxs("select",{style:p.select,value:mi.role,onChange:r=>Ki(c=>({...c,role:r.target.value})),children:[n.jsx("option",{value:"sales",children:"Sales"}),n.jsx("option",{value:"admin",children:"Admin"}),n.jsx("option",{value:"crew",children:"Crew"})]})]}),n.jsxs("div",{children:[n.jsx("label",{style:p.label,children:"Phone"}),n.jsx("input",{style:p.input,value:mi.phone,onChange:r=>Ki(c=>({...c,phone:r.target.value}))})]})]}),n.jsx("button",{style:{...p.btn,width:"auto"},onClick:ja,children:"Add User"})]}),n.jsxs("table",{style:p.table,children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:p.th,children:"Username"}),n.jsx("th",{style:p.th,children:"Full Name"}),n.jsx("th",{style:p.th,children:"Company"}),n.jsx("th",{style:p.th,children:"Role"}),n.jsx("th",{style:p.th,children:"Phone"}),n.jsx("th",{style:p.th,children:"Actions"})]})}),n.jsx("tbody",{children:Ae.map(r=>n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:r.username}),n.jsx("td",{style:p.td,children:r.fullName}),n.jsx("td",{style:p.td,children:r.company}),n.jsx("td",{style:p.td,children:r.role}),n.jsx("td",{style:p.td,children:r.phone}),n.jsx("td",{style:p.td,children:n.jsx("button",{style:{...p.btnDanger,padding:"4px 8px",fontSize:12},onClick:()=>Ca(r.id),children:"Delete"})})]},r.id))})]})]}),I==="pricing"&&at&&n.jsxs("div",{style:p.box,children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[n.jsx("h2",{style:{margin:0},children:"Pricing Management"}),n.jsx("div",{style:{display:"flex",gap:8},children:Pt?n.jsxs(n.Fragment,{children:[n.jsx("button",{style:{...p.btn,width:"auto"},onClick:Na,children:"Save & Lock"}),n.jsx("button",{style:p.btn2,onClick:$a,children:"Cancel"}),n.jsx("button",{style:p.btnDanger,onClick:Ea,children:"Reset to Defaults"})]}):n.jsx("button",{style:{...p.btn,width:"auto"},onClick:()=>us(!0),children:"Edit Pricing"})})]}),n.jsx("div",{style:{display:"flex",gap:4,marginBottom:16,flexWrap:"wrap"},children:["homes","services","materials","sewer","patio","foundation","drive","project command"].map(r=>n.jsx("button",{style:{...p.tab,...Jn===r?p.tabA:{}},onClick:()=>ps(r),children:r.split(" ").map(c=>c.charAt(0).toUpperCase()+c.slice(1)).join(" ")},r))}),Jn==="homes"&&n.jsxs("table",{style:p.table,children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:p.th,children:"Model Name"}),n.jsx("th",{style:p.th,children:"Width"}),n.jsx("th",{style:p.th,children:"Length"}),n.jsx("th",{style:p.th,children:"Price"})]})}),n.jsx("tbody",{children:pn.map((r,c)=>n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:Pt?n.jsx("input",{style:p.inputEdit,value:r.name,onChange:m=>{const g=[...pn];g[c]={...r,name:m.target.value},ut(g)}}):r.name}),n.jsx("td",{style:p.td,children:Pt?n.jsx("input",{type:"number",style:p.inputEdit,value:r.width,onChange:m=>{const g=[...pn];g[c]={...r,width:parseFloat(m.target.value)||0},ut(g)}}):r.width}),n.jsx("td",{style:p.td,children:Pt?n.jsx("input",{type:"number",style:p.inputEdit,value:r.length,onChange:m=>{const g=[...pn];g[c]={...r,length:parseFloat(m.target.value)||0},ut(g)}}):r.length}),n.jsx("td",{style:p.td,children:Pt?n.jsx("input",{type:"number",style:p.inputEdit,value:r.price,onChange:m=>{const g=[...pn];g[c]={...r,price:parseFloat(m.target.value)||0},ut(g)}}):Me(r.price)})]},c))})]}),Jn==="services"&&n.jsxs("div",{children:[n.jsx("div",{style:{marginBottom:16,padding:12,background:"#f0f7f1",borderRadius:6,border:"1px solid #2c5530"},children:n.jsxs("div",{style:{fontSize:13,color:"#333",lineHeight:1.6},children:[n.jsx("strong",{children:"How Service Pricing Works:"})," Each service has a ",n.jsx("strong",{children:"Base Price"}),". Services marked with ",n.jsx("span",{style:{background:"#e3f2fd",padding:"1px 6px",borderRadius:3,fontSize:12},children:"+Drive"})," add a drive cost calculated as: ",n.jsxs("strong",{children:["Miles x Drive Rate ($",He.service,"/mi)"]}),". Some services use special formulas (pad, skirting, installation, etc)."]})}),n.jsxs("table",{style:p.table,children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:p.th,children:"Service"}),n.jsx("th",{style:p.th,children:"Base Price"}),n.jsx("th",{style:p.th,children:"Drive"}),n.jsx("th",{style:p.th,children:"Pricing Formula"}),n.jsx("th",{style:p.th,children:"Example @ 30mi"})]})}),n.jsx("tbody",{children:Object.entries(it).map(([r,c])=>{const g=30*He.service;let x="",N=0;return c.calc==="install_home"?(x="Calculated (base + axles + delivery + drive)",N=null):c.calc==="pad"?(x="Width x Length x $8/sqft + Drive",N=null):c.calc==="skirt"?(x="(24 x Perimeter + (miles+200) x 3) x 1.1",N=null):c.calc==="lp_siding"?(x="By length: ≤52'=$6,878 | 53-64'=$7,298 | 65+'=$8,243",N=null):c.calc==="closing"?(x="7% of Total (calculated automatically)",N=null):c.calc==="landscaping"?(x="$2,200 + Drive x Days",N=2200+g):c.calc==="deck"?(x="$3,700 + Drive x Days",N=3700+g):c.addDrive?(x="Base + Drive",N=(c.base||0)+g):(x="Flat rate (no drive)",N=c.base||0),n.jsxs("tr",{style:{background:c.calc?"#f8f9fa":"transparent"},children:[n.jsxs("td",{style:p.td,children:[n.jsx("strong",{children:c.name}),c.calc&&n.jsx("span",{style:{display:"block",fontSize:11,color:"#666",fontStyle:"italic"},children:"Special calc"})]}),n.jsx("td",{style:p.td,children:Pt&&!c.calc?n.jsx("input",{type:"number",style:{...p.inputEdit,width:90},value:c.base||0,onChange:X=>{const be=parseFloat(X.target.value)||0;ir(ke=>({...ke,[r]:{...ke[r],base:be,basePrice:be,price:be}}))}}):n.jsx("span",{style:{fontWeight:600},children:c.calc?c.base>0?Me(c.base):"Calc":Me(c.base||0)})}),n.jsx("td",{style:{...p.td,textAlign:"center"},children:c.addDrive?n.jsxs("span",{style:{background:"#e3f2fd",color:"#1565c0",padding:"2px 8px",borderRadius:10,fontSize:11,fontWeight:600},children:["+$",He.service,"/mi"]}):c.calc==="skirt"||c.calc==="pad"?n.jsx("span",{style:{background:"#fff3e0",color:"#e65100",padding:"2px 8px",borderRadius:10,fontSize:11,fontWeight:600},children:"In formula"}):n.jsx("span",{style:{color:"#999",fontSize:11},children:"No"})}),n.jsx("td",{style:{...p.td,fontSize:12,color:"#666"},children:x}),n.jsx("td",{style:{...p.td,fontWeight:600,color:"#2c5530"},children:N!==null?Me(N):n.jsx("span",{style:{color:"#999",fontSize:12},children:"Varies"})})]},r)})})]}),n.jsxs("div",{style:{marginTop:16,padding:16,background:"#e3f2fd",borderRadius:8},children:[n.jsx("h4",{style:{margin:"0 0 8px",color:"#1565c0"},children:"Service Drive Rate"}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsx("span",{style:{fontSize:13},children:"Per-mile rate for services:"}),Pt?n.jsx("input",{type:"number",style:{...p.inputEdit,width:80},value:He.service,onChange:r=>hi(c=>({...c,service:parseFloat(r.target.value)||0}))}):n.jsxs("span",{style:{fontSize:18,fontWeight:700,color:"#1565c0"},children:["$",He.service,"/mile"]})]}),n.jsxs("div",{style:{marginTop:8,fontSize:12,color:"#666"},children:["Example: At 30 miles, drive cost = 30 x $",He.service," = ",Me(30*He.service)," added to base price"]})]})]}),Jn==="materials"&&n.jsxs("table",{style:p.table,children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:p.th,children:"Material"}),n.jsx("th",{style:p.th,children:"Price"}),n.jsx("th",{style:p.th,children:"Cost"})]})}),n.jsx("tbody",{children:Object.entries(Vt).map(([r,c])=>n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:c.name}),n.jsx("td",{style:p.td,children:Pt?n.jsx("input",{type:"number",style:p.inputEdit,value:c.price,onChange:m=>ys(g=>({...g,[r]:{...g[r],price:parseFloat(m.target.value)||0}}))}):Me(c.price)}),n.jsx("td",{style:p.td,children:Pt?n.jsx("input",{type:"number",style:p.inputEdit,value:c.cost||0,onChange:m=>ys(g=>({...g,[r]:{...g[r],cost:parseFloat(m.target.value)||0}}))}):Me(c.cost||0)})]},r))})]}),Jn==="sewer"&&n.jsxs("table",{style:p.table,children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:p.th,children:"Type"}),n.jsx("th",{style:p.th,children:"Price"})]})}),n.jsx("tbody",{children:Object.entries(Ft).filter(([r])=>r!=="none").map(([r,c])=>n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:r.replace("_"," ")}),n.jsx("td",{style:p.td,children:Pt?n.jsx("input",{type:"number",style:p.inputEdit,value:c,onChange:m=>sr(g=>({...g,[r]:parseFloat(m.target.value)||0}))}):Me(c)})]},r))})]}),Jn==="patio"&&n.jsxs("table",{style:p.table,children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:p.th,children:"Size"}),n.jsx("th",{style:p.th,children:"Price"})]})}),n.jsx("tbody",{children:Object.entries(zt).filter(([r])=>r!=="none").map(([r,c])=>n.jsxs("tr",{children:[n.jsxs("td",{style:p.td,children:[r," ft"]}),n.jsx("td",{style:p.td,children:Pt?n.jsx("input",{type:"number",style:p.inputEdit,value:c,onChange:m=>Xi(g=>({...g,[r]:parseFloat(m.target.value)||0}))}):Me(c)})]},r))})]}),Jn==="foundation"&&n.jsxs("table",{style:p.table,children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:p.th,children:"Type"}),n.jsx("th",{style:p.th,children:"Price"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:"Basement (includes waterproofing & insulation)"}),n.jsx("td",{style:p.td,children:Pt?n.jsx("input",{type:"number",style:p.inputEdit,value:lt.basement,onChange:r=>Bn(c=>({...c,basement:parseFloat(r.target.value)||0}))}):Me(lt.basement)})]}),n.jsxs("tr",{children:[n.jsx("td",{style:p.td,children:"Crawl Space"}),n.jsx("td",{style:p.td,children:Pt?n.jsx("input",{type:"number",style:p.inputEdit,value:lt.crawlspace,onChange:r=>Bn(c=>({...c,crawlspace:parseFloat(r.target.value)||0}))}):Me(lt.crawlspace)})]})]})]}),Jn==="drive"&&n.jsxs("div",{children:[n.jsx("h3",{children:"Drive Time Rates"}),n.jsx("div",{style:p.row,children:Object.entries(He).map(([r,c])=>n.jsxs("div",{children:[n.jsxs("label",{style:p.label,children:[r.replace(/([A-Z])/g," $1").replace(/^./,m=>m.toUpperCase())," Rate ($/mile)"]}),Pt?n.jsx("input",{type:"number",style:p.input,value:c,onChange:m=>hi(g=>({...g,[r]:parseFloat(m.target.value)||0}))}):n.jsxs("div",{style:{padding:"12px 14px",background:"#f8f9fa",borderRadius:6},children:["$",c,"/mile"]})]},r))})]}),Jn==="project command"&&n.jsxs("div",{children:[n.jsx("div",{style:{marginBottom:16,padding:12,background:"#f3e5f5",borderRadius:6,border:"1px solid #7b1fa2"},children:n.jsxs("div",{style:{fontSize:13,color:"#333",lineHeight:1.6},children:[n.jsx("strong",{children:"How Project Command Pricing Works:"})," Project Command is calculated from three roles based on the number of services and drive distance. The ",n.jsx("strong",{children:"Project Command Drive Rate"})," is currently ",n.jsxs("strong",{children:["$",He.projectCommand,"/mi"]})," (editable in the Drive tab)."]})}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:24},children:[n.jsxs("div",{style:{padding:20,background:"#e8f5e9",borderRadius:8,border:"2px solid #388e3c"},children:[n.jsx("h4",{style:{margin:"0 0 12px",color:"#2e7d32",fontSize:16},children:"Project Supervisor (PS)"}),n.jsxs("div",{style:{fontSize:13,color:"#333",lineHeight:1.8},children:[n.jsxs("div",{style:{marginBottom:8},children:[n.jsx("strong",{children:"Formula:"}),n.jsxs("div",{style:{background:"#fff",padding:8,borderRadius:4,marginTop:4,fontFamily:"monospace",fontSize:12},children:["(numServices x $",ft.psPerService,") + (miles x $",He.projectCommand," x numServices)"]})]}),n.jsxs("div",{style:{marginBottom:8},children:[n.jsx("strong",{children:"Per-Service Base:"}),Pt?n.jsx("input",{type:"number",style:{...p.inputEdit,width:100,marginLeft:8},value:ft.psPerService,onChange:r=>vn(c=>({...c,psPerService:parseFloat(r.target.value)||0}))}):n.jsxs("span",{style:{fontWeight:700,color:"#2e7d32",marginLeft:8},children:["$",ft.psPerService,"/service"]})]}),n.jsxs("div",{style:{padding:8,background:"#c8e6c9",borderRadius:4,fontSize:12},children:[n.jsx("strong",{children:"Example:"})," 5 services, 30 miles",n.jsx("br",{}),"= (5 x $",ft.psPerService,") + (30 x $",He.projectCommand," x 5)",n.jsx("br",{}),"= $",5*ft.psPerService," + $",30*He.projectCommand*5,n.jsx("br",{}),"= ",n.jsx("strong",{children:Me(5*ft.psPerService+30*He.projectCommand*5)})]})]})]}),n.jsxs("div",{style:{padding:20,background:"#e3f2fd",borderRadius:8,border:"2px solid #1976d2"},children:[n.jsx("h4",{style:{margin:"0 0 12px",color:"#1565c0",fontSize:16},children:"Project Manager (PM)"}),n.jsxs("div",{style:{fontSize:13,color:"#333",lineHeight:1.8},children:[n.jsxs("div",{style:{marginBottom:8},children:[n.jsx("strong",{children:"Formula:"}),n.jsxs("div",{style:{background:"#fff",padding:8,borderRadius:4,marginTop:4,fontFamily:"monospace",fontSize:12},children:["(miles x $",He.projectCommand,") + $",ft.pmBase]})]}),n.jsxs("div",{style:{marginBottom:8},children:[n.jsx("strong",{children:"Base Amount:"}),Pt?n.jsx("input",{type:"number",style:{...p.inputEdit,width:100,marginLeft:8},value:ft.pmBase,onChange:r=>vn(c=>({...c,pmBase:parseFloat(r.target.value)||0}))}):n.jsx("span",{style:{fontWeight:700,color:"#1565c0",marginLeft:8},children:Me(ft.pmBase)})]}),n.jsxs("div",{style:{padding:8,background:"#bbdefb",borderRadius:4,fontSize:12},children:[n.jsx("strong",{children:"Example:"})," 30 miles",n.jsx("br",{}),"= (30 x $",He.projectCommand,") + $",ft.pmBase,n.jsx("br",{}),"= $",30*He.projectCommand," + $",ft.pmBase,n.jsx("br",{}),"= ",n.jsx("strong",{children:Me(30*He.projectCommand+ft.pmBase)})]})]})]}),n.jsxs("div",{style:{padding:20,background:"#fff3e0",borderRadius:8,border:"2px solid #f57c00"},children:[n.jsx("h4",{style:{margin:"0 0 12px",color:"#e65100",fontSize:16},children:"Project Coordinator (PC)"}),n.jsxs("div",{style:{fontSize:13,color:"#333",lineHeight:1.8},children:[n.jsxs("div",{style:{marginBottom:8},children:[n.jsx("strong",{children:"Formula:"}),n.jsxs("div",{style:{background:"#fff",padding:8,borderRadius:4,marginTop:4,fontFamily:"monospace",fontSize:12},children:["(PM / 2) + (miles x $",He.projectCommand,")"]})]}),n.jsxs("div",{style:{marginBottom:8},children:[n.jsx("strong",{children:"Based on:"}),n.jsx("span",{style:{fontWeight:600,color:"#e65100",marginLeft:8},children:"Half of PM + drive"})]}),n.jsx("div",{style:{padding:8,background:"#ffe0b2",borderRadius:4,fontSize:12},children:(()=>{const r=30*He.projectCommand+ft.pmBase,c=r/2+30*He.projectCommand;return n.jsxs(n.Fragment,{children:[n.jsx("strong",{children:"Example:"})," 30 miles (PM = ",Me(r),")",n.jsx("br",{}),"= (",Me(r)," / 2) + (30 x $",He.projectCommand,")",n.jsx("br",{}),"= ",Me(r/2)," + $",30*He.projectCommand,n.jsx("br",{}),"= ",n.jsx("strong",{children:Me(c)})]})})()})]})]})]}),n.jsxs("div",{style:{padding:20,background:"#f5f5f5",borderRadius:8,border:"2px solid #616161"},children:[n.jsx("h4",{style:{margin:"0 0 12px",color:"#333"},children:"Total Project Command - Example Summary"}),n.jsxs("div",{style:{fontSize:13,color:"#555",marginBottom:12},children:["Based on ",n.jsx("strong",{children:"5 services"})," and ",n.jsx("strong",{children:"30 miles"})," drive time:"]}),(()=>{const m=5*ft.psPerService+30*He.projectCommand*5,g=30*He.projectCommand+ft.pmBase,x=g/2+30*He.projectCommand,N=m+g+x;return n.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{style:{...p.th,background:"#e0e0e0"},children:"Role"}),n.jsx("th",{style:{...p.th,background:"#e0e0e0"},children:"Calculation"}),n.jsx("th",{style:{...p.th,background:"#e0e0e0",textAlign:"right"},children:"Amount"})]})}),n.jsxs("tbody",{children:[n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,fontWeight:600,color:"#2e7d32"},children:"Project Supervisor"}),n.jsxs("td",{style:{...p.td,fontSize:12,fontFamily:"monospace"},children:["(",5," x $",ft.psPerService,") + (",30," x $",He.projectCommand," x ",5,")"]}),n.jsx("td",{style:{...p.td,textAlign:"right",fontWeight:700},children:Me(m)})]}),n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,fontWeight:600,color:"#1565c0"},children:"Project Manager"}),n.jsxs("td",{style:{...p.td,fontSize:12,fontFamily:"monospace"},children:["(",30," x $",He.projectCommand,") + $",ft.pmBase]}),n.jsx("td",{style:{...p.td,textAlign:"right",fontWeight:700},children:Me(g)})]}),n.jsxs("tr",{children:[n.jsx("td",{style:{...p.td,fontWeight:600,color:"#e65100"},children:"Project Coordinator"}),n.jsxs("td",{style:{...p.td,fontSize:12,fontFamily:"monospace"},children:["(",Me(g)," / 2) + (",30," x $",He.projectCommand,")"]}),n.jsx("td",{style:{...p.td,textAlign:"right",fontWeight:700},children:Me(x)})]}),n.jsxs("tr",{style:{background:"#e8eaf6",fontWeight:700},children:[n.jsx("td",{style:{...p.td,fontSize:16},children:"TOTAL"}),n.jsx("td",{style:p.td}),n.jsx("td",{style:{...p.td,textAlign:"right",fontSize:18,color:"#2c5530"},children:Me(N)})]})]})]})})()]}),n.jsxs("div",{style:{marginTop:16,padding:16,background:"#f3e5f5",borderRadius:8},children:[n.jsx("h4",{style:{margin:"0 0 8px",color:"#7b1fa2"},children:"Editable Project Command Settings"}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16},children:[n.jsxs("div",{children:[n.jsx("label",{style:{...p.label,fontSize:12},children:"PS Per-Service Rate"}),Pt?n.jsx("input",{type:"number",style:p.input,value:ft.psPerService,onChange:r=>vn(c=>({...c,psPerService:parseFloat(r.target.value)||0}))}):n.jsxs("div",{style:{padding:"12px 14px",background:"#fff",borderRadius:6,fontWeight:700,fontSize:18},children:["$",ft.psPerService]})]}),n.jsxs("div",{children:[n.jsx("label",{style:{...p.label,fontSize:12},children:"PM Base Amount"}),Pt?n.jsx("input",{type:"number",style:p.input,value:ft.pmBase,onChange:r=>vn(c=>({...c,pmBase:parseFloat(r.target.value)||0}))}):n.jsx("div",{style:{padding:"12px 14px",background:"#fff",borderRadius:6,fontWeight:700,fontSize:18},children:Me(ft.pmBase)})]}),n.jsxs("div",{children:[n.jsx("label",{style:{...p.label,fontSize:12},children:"PC Drive Rate (edit in Drive tab)"}),n.jsxs("div",{style:{padding:"12px 14px",background:"#fff",borderRadius:6,fontWeight:700,fontSize:18},children:["$",He.projectCommand,"/mi"]})]})]})]})]})]})]}),xn&&n.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:n.jsxs("div",{style:{...p.card,textAlign:"center",maxWidth:420},children:[n.jsxs("h3",{style:{marginBottom:8},children:["Delete this ",ne.some(r=>r.id===xn.id)?"contract":"quote","?"]}),n.jsx("p",{style:{color:"#666",margin:"0 0 4px",fontSize:14},children:xn.homeModel!=="NONE"?xn.homeModel:`${xn.houseWidth}' × ${xn.houseLength}'`}),n.jsxs("p",{style:{display:"inline-block",padding:"2px 10px",borderRadius:4,fontSize:13,fontWeight:700,background:["Accepted","Under Contract","Completed"].includes(xn.status)?"#dc3545":"#ffc107",color:["Accepted","Under Contract","Completed"].includes(xn.status)?"#fff":"#000",marginBottom:12},children:["Status: ",xn.status]}),["Accepted","Under Contract","Completed","Cancelled"].includes(xn.status)&&n.jsx("p",{style:{color:"#dc3545",fontWeight:600,fontSize:14,margin:"0 0 8px"},children:"All associated data, change orders, payments, and files will be permanently lost."}),n.jsx("p",{style:{color:"#666",fontSize:13},children:"This action cannot be undone."}),n.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:16},children:[n.jsx("button",{style:p.btnDanger,onClick:()=>ka(xn.id),children:"Yes, Delete"}),n.jsx("button",{style:p.btn2,onClick:()=>fs(null),children:"Cancel"})]})]})}),_i&&n.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:n.jsxs("div",{style:{...p.card,textAlign:"center"},children:[n.jsxs("h3",{children:["Delete ",_i.firstName," ",_i.lastName,"?"]}),n.jsx("p",{style:{color:"#666"},children:"This action cannot be undone."}),n.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[n.jsx("button",{style:p.btnDanger,onClick:()=>{tl(_i.id),Gi(null)},children:"Delete"}),n.jsx("button",{style:p.btn2,onClick:()=>Gi(null),children:"Cancel"})]})]})})]}):n.jsx(Vf,{users:Ae,tempName:$,setTempName:H,loginError:ee,setLoginError:R,onSelectUser:Tr}):n.jsx(Qf,{loginU:F,setLoginU:J,loginP:Y,setLoginP:oe,loginError:ee,onLogin:Ti})}window.storage={async get(l){try{const u=localStorage.getItem(l);return u?{value:u}:null}catch(u){return console.error("Storage get error:",u),null}},async set(l,u){try{return localStorage.setItem(l,u),{success:!0}}catch(h){return console.error("Storage set error:",h),{success:!1,error:h}}},async remove(l){try{return localStorage.removeItem(l),{success:!0}}catch(u){return console.error("Storage remove error:",u),{success:!1,error:u}}}};sf.createRoot(document.getElementById("root")).render(n.jsx(cs.StrictMode,{children:n.jsx(qf,{})}));
//# sourceMappingURL=index-CqyiaHwO.js.map
