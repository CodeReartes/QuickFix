import{o as n_}from"./vendor-core-B1Mfp3yQ.js";const r_=()=>{};var Ll={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},s_=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],c=r[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},xd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,c=o?r[s+1]:0,u=s+2<r.length,h=u?r[s+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let g=(c&15)<<2|h>>6,v=h&63;u||(v=64,o||(g=64)),n.push(t[f],t[m],t[g],t[v])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Nd(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):s_(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const m=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new i_;const g=i<<2|c>>4;if(n.push(g),h!==64){const v=c<<4&240|h>>2;if(n.push(v),m!==64){const V=h<<6&192|m;n.push(V)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class i_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const o_=function(r){const e=Nd(r);return xd.encodeByteArray(e,!0)},to=function(r){return o_(r).replace(/\./g,"")},Od=function(r){try{return xd.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Md(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a_=()=>Md().__FIREBASE_DEFAULTS__,c_=()=>{if(typeof process>"u"||typeof Ll>"u")return;const r=Ll.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},u_=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Od(r[1]);return e&&JSON.parse(e)},bo=()=>{try{return r_()||a_()||c_()||u_()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Ld=r=>{var e,t;return(t=(e=bo())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},l_=r=>{const e=Ld(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Fd=()=>{var r;return(r=bo())==null?void 0:r.config},Ud=r=>{var e;return(e=bo())==null?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d_(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[to(JSON.stringify(t)),to(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function f_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(we())}function Bd(){var e;const r=(e=bo())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function m_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function p_(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function g_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function __(){const r=we();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function qd(){return!Bd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function jd(){return!Bd()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function zd(){try{return typeof indexedDB=="object"}catch{return!1}}function y_(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I_="FirebaseError";class vt extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=I_,Object.setPrototypeOf(this,vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Js.prototype.create)}}class Js{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?E_(i,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new vt(s,c,n)}}function E_(r,e){return r.replace(T_,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const T_=/\{\$([^}]+)}/g;function w_(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function nt(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(Fl(i)&&Fl(o)){if(!nt(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Fl(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ys(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function v_(r,e){const t=new A_(r,e);return t.subscribe.bind(t)}class A_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");R_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=Ra),s.error===void 0&&(s.error=Ra),s.complete===void 0&&(s.complete=Ra);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function R_(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Ra(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fr(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function yc(r){return(await fetch(r,{credentials:"include"})).ok}class Nn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new h_;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(P_(e))try{this.getOrInitializeService({instanceIdentifier:En})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=En){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=En){return this.instances.has(e)}getOptions(e=En){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:S_(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=En){return this.component?this.component.multipleInstances?e:En:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function S_(r){return r===En?void 0:r}function P_(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new b_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Q;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(Q||(Q={}));const V_={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},D_=Q.INFO,k_={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},N_=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=k_[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ic{constructor(e){this.name=e,this._logLevel=D_,this._logHandler=N_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?V_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...e),this._logHandler(this,Q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...e),this._logHandler(this,Q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...e),this._logHandler(this,Q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...e),this._logHandler(this,Q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...e),this._logHandler(this,Q.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(O_(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function O_(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Fa="@firebase/app",Ul="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=new Ic("@firebase/app"),M_="@firebase/app-compat",L_="@firebase/analytics-compat",F_="@firebase/analytics",U_="@firebase/app-check-compat",B_="@firebase/app-check",q_="@firebase/auth",j_="@firebase/auth-compat",z_="@firebase/database",$_="@firebase/data-connect",G_="@firebase/database-compat",K_="@firebase/functions",H_="@firebase/functions-compat",W_="@firebase/installations",Q_="@firebase/installations-compat",J_="@firebase/messaging",Y_="@firebase/messaging-compat",X_="@firebase/performance",Z_="@firebase/performance-compat",ey="@firebase/remote-config",ty="@firebase/remote-config-compat",ny="@firebase/storage",ry="@firebase/storage-compat",sy="@firebase/firestore",iy="@firebase/ai",oy="@firebase/firestore-compat",ay="firebase",cy="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const no="[DEFAULT]",uy={[Fa]:"fire-core",[M_]:"fire-core-compat",[F_]:"fire-analytics",[L_]:"fire-analytics-compat",[B_]:"fire-app-check",[U_]:"fire-app-check-compat",[q_]:"fire-auth",[j_]:"fire-auth-compat",[z_]:"fire-rtdb",[$_]:"fire-data-connect",[G_]:"fire-rtdb-compat",[K_]:"fire-fn",[H_]:"fire-fn-compat",[W_]:"fire-iid",[Q_]:"fire-iid-compat",[J_]:"fire-fcm",[Y_]:"fire-fcm-compat",[X_]:"fire-perf",[Z_]:"fire-perf-compat",[ey]:"fire-rc",[ty]:"fire-rc-compat",[ny]:"fire-gcs",[ry]:"fire-gcs-compat",[sy]:"fire-fst",[oy]:"fire-fst-compat",[iy]:"fire-vertex","fire-js":"fire-js",[ay]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ro=new Map,ly=new Map,Ua=new Map;function Bl(r,e){try{r.container.addComponent(e)}catch(t){yt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function pr(r){const e=r.name;if(Ua.has(e))return yt.debug(`There were multiple attempts to register component ${e}.`),!1;Ua.set(e,r);for(const t of ro.values())Bl(t,r);for(const t of ly.values())Bl(t,r);return!0}function Xs(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function hy(r,e,t=no){Xs(r,e).clearInstance(t)}function Ye(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Kt=new Js("app","Firebase",dy);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Nn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Kt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur=cy;function my(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:no,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw Kt.create("bad-app-name",{appName:String(s)});if(t||(t=Fd()),!t)throw Kt.create("no-options");const i=ro.get(s);if(i){if(nt(t,i.options)&&nt(n,i.config))return i;throw Kt.create("duplicate-app",{appName:s})}const o=new C_(s);for(const u of Ua.values())o.addComponent(u);const c=new fy(t,n,o);return ro.set(s,c),c}function $d(r=no){const e=ro.get(r);if(!e&&r===no&&Fd())return my();if(!e)throw Kt.create("no-app",{appName:r});return e}function Ht(r,e,t){let n=uy[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),yt.warn(o.join(" "));return}pr(new Nn(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py="firebase-heartbeat-database",gy=1,Ms="firebase-heartbeat-store";let ba=null;function Gd(){return ba||(ba=n_(py,gy,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Ms)}catch(t){console.warn(t)}}}}).catch(r=>{throw Kt.create("idb-open",{originalErrorMessage:r.message})})),ba}async function _y(r){try{const t=(await Gd()).transaction(Ms),n=await t.objectStore(Ms).get(Kd(r));return await t.done,n}catch(e){if(e instanceof vt)yt.warn(e.message);else{const t=Kt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});yt.warn(t.message)}}}async function ql(r,e){try{const n=(await Gd()).transaction(Ms,"readwrite");await n.objectStore(Ms).put(e,Kd(r)),await n.done}catch(t){if(t instanceof vt)yt.warn(t.message);else{const n=Kt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});yt.warn(n.message)}}}function Kd(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yy=1024,Iy=30;class Ey{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new wy(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=jl();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Iy){const o=vy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){yt.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=jl(),{heartbeatsToSend:n,unsentEntries:s}=Ty(this._heartbeatsCache.heartbeats),i=to(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return yt.warn(t),""}}}function jl(){return new Date().toISOString().substring(0,10)}function Ty(r,e=yy){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),zl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),zl(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class wy{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zd()?y_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await _y(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return ql(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return ql(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function zl(r){return to(JSON.stringify({version:2,heartbeats:r})).length}function vy(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ay(r){pr(new Nn("platform-logger",e=>new x_(e),"PRIVATE")),pr(new Nn("heartbeat",e=>new Ey(e),"PRIVATE")),Ht(Fa,Ul,r),Ht(Fa,Ul,"esm2020"),Ht("fire-js","")}Ay("");function Hd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ry=Hd,Wd=new Js("auth","Firebase",Hd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const so=new Ic("@firebase/auth");function by(r,...e){so.logLevel<=Q.WARN&&so.warn(`Auth (${Ur}): ${r}`,...e)}function qi(r,...e){so.logLevel<=Q.ERROR&&so.error(`Auth (${Ur}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(r,...e){throw Tc(r,...e)}function Ze(r,...e){return Tc(r,...e)}function Ec(r,e,t){const n={...Ry(),[e]:t};return new Js("auth","Firebase",n).create(e,{appName:r.name})}function Cn(r){return Ec(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Sy(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&dt(r,"argument-error"),Ec(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Tc(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Wd.create(r,...e)}function z(r,e,...t){if(!r)throw Tc(e,...t)}function mt(r){const e="INTERNAL ASSERTION FAILED: "+r;throw qi(e),new Error(e)}function It(r,e){r||mt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ba(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function Py(){return $l()==="http:"||$l()==="https:"}function $l(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Py()||p_()||"connection"in navigator)?navigator.onLine:!0}function Vy(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(e,t){this.shortDelay=e,this.longDelay=t,It(t>e,"Short delay should be less than long delay!"),this.isMobile=f_()||g_()}get(){return Cy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wc(r,e){It(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;mt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;mt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;mt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ky=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Ny=new Zs(3e4,6e4);function ei(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function sn(r,e,t,n,s={}){return Jd(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const c=Ys({key:r.config.apiKey,...o}).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const h={method:e,headers:u,...i};return m_()||(h.referrerPolicy="no-referrer"),r.emulatorConfig&&Fr(r.emulatorConfig.host)&&(h.credentials="include"),Qd.fetch()(await Yd(r,r.config.apiHost,t,c),h)})}async function Jd(r,e,t){r._canInitEmulator=!1;const n={...Dy,...e};try{const s=new My(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ki(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ki(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ki(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw ki(r,"user-disabled",o);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Ec(r,f,h);dt(r,f)}}catch(s){if(s instanceof vt)throw s;dt(r,"network-request-failed",{message:String(s)})}}async function xy(r,e,t,n,s={}){const i=await sn(r,e,t,n,s);return"mfaPendingCredential"in i&&dt(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function Yd(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?wc(r.config,s):`${r.config.apiScheme}://${s}`;return ky.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function Oy(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class My{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Ze(this.auth,"network-request-failed")),Ny.get())})}}function ki(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=Ze(r,e,n);return s.customData._tokenResponse=t,s}function Gl(r){return r!==void 0&&r.enterprise!==void 0}class Ly{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Oy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Fy(r,e){return sn(r,"GET","/v2/recaptchaConfig",ei(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uy(r,e){return sn(r,"POST","/v1/accounts:delete",e)}async function io(r,e){return sn(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rs(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function By(r,e=!1){const t=ae(r),n=await t.getIdToken(e),s=vc(n);z(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:Rs(Sa(s.auth_time)),issuedAtTime:Rs(Sa(s.iat)),expirationTime:Rs(Sa(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Sa(r){return Number(r)*1e3}function vc(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return qi("JWT malformed, contained fewer than 3 sections"),null;try{const s=Od(t);return s?JSON.parse(s):(qi("Failed to decode base64 JWT payload"),null)}catch(s){return qi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Kl(r){const e=vc(r);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ls(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof vt&&qy(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function qy({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Rs(this.lastLoginAt),this.creationTime=Rs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oo(r){var m;const e=r.auth,t=await r.getIdToken(),n=await Ls(r,io(e,{idToken:t}));z(n==null?void 0:n.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=(m=s.providerUserInfo)!=null&&m.length?Xd(s.providerUserInfo):[],o=$y(r.providerData,i),c=r.isAnonymous,u=!(r.email&&s.passwordHash)&&!(o!=null&&o.length),h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new qa(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(r,f)}async function zy(r){const e=ae(r);await oo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $y(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function Xd(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gy(r,e){const t=await Jd(r,{},async()=>{const n=Ys({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await Yd(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:n};return r.emulatorConfig&&Fr(r.emulatorConfig.host)&&(u.credentials="include"),Qd.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ky(r,e){return sn(r,"POST","/v2/accounts:revokeToken",ei(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Kl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=Kl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await Gy(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new ur;return n&&(z(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(z(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(z(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ur,this.toJSON())}_performRefresh(){return mt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(r,e){z(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Xe{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new jy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new qa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Ls(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return By(this,e)}reload(){return zy(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Xe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await oo(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ye(this.auth.app))return Promise.reject(Cn(this.auth));const e=await this.getIdToken();return await Ls(this,Uy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:m,emailVerified:g,isAnonymous:v,providerData:V,stsTokenManager:D}=t;z(m&&D,e,"internal-error");const k=ur.fromJSON(this.name,D);z(typeof m=="string",e,"internal-error"),xt(n,e.name),xt(s,e.name),z(typeof g=="boolean",e,"internal-error"),z(typeof v=="boolean",e,"internal-error"),xt(i,e.name),xt(o,e.name),xt(c,e.name),xt(u,e.name),xt(h,e.name),xt(f,e.name);const F=new Xe({uid:m,auth:e,email:s,emailVerified:g,displayName:n,isAnonymous:v,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:k,createdAt:h,lastLoginAt:f});return V&&Array.isArray(V)&&(F.providerData=V.map(j=>({...j}))),u&&(F._redirectEventId=u),F}static async _fromIdTokenResponse(e,t,n=!1){const s=new ur;s.updateFromServerResponse(t);const i=new Xe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await oo(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];z(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Xd(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new ur;c.updateFromIdToken(n);const u=new Xe({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new qa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl=new Map;function pt(r){It(r instanceof Function,"Expected a class definition");let e=Hl.get(r);return e?(It(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Hl.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Zd.type="NONE";const Wl=Zd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(r,e,t){return`firebase:${r}:${e}:${t}`}class lr{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=ji(this.userKey,s.apiKey,i),this.fullPersistenceKey=ji("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await io(this.auth,{idToken:e}).catch(()=>{});return t?Xe._fromGetAccountInfoResponse(this.auth,t,e):null}return Xe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new lr(pt(Wl),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||pt(Wl);const o=ji(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let m;if(typeof f=="string"){const g=await io(e,{idToken:f}).catch(()=>{});if(!g)break;m=await Xe._fromGetAccountInfoResponse(e,g,f)}else m=Xe._fromJSON(e,f);h!==i&&(c=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new lr(i,e,n):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new lr(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ql(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(rf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ef(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(of(e))return"Blackberry";if(af(e))return"Webos";if(tf(e))return"Safari";if((e.includes("chrome/")||nf(e))&&!e.includes("edge/"))return"Chrome";if(sf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function ef(r=we()){return/firefox\//i.test(r)}function tf(r=we()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function nf(r=we()){return/crios\//i.test(r)}function rf(r=we()){return/iemobile/i.test(r)}function sf(r=we()){return/android/i.test(r)}function of(r=we()){return/blackberry/i.test(r)}function af(r=we()){return/webos/i.test(r)}function Ac(r=we()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function Hy(r=we()){var e;return Ac(r)&&!!((e=window.navigator)!=null&&e.standalone)}function Wy(){return __()&&document.documentMode===10}function cf(r=we()){return Ac(r)||sf(r)||af(r)||of(r)||/windows phone/i.test(r)||rf(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(r,e=[]){let t;switch(r){case"Browser":t=Ql(we());break;case"Worker":t=`${Ql(we())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ur}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jy(r,e={}){return sn(r,"GET","/v2/passwordPolicy",ei(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yy=6;class Xy{constructor(e){var n;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Yy,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zy{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Jl(this),this.idTokenSubscription=new Jl(this),this.beforeStateQueue=new Qy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=pt(t)),this._initializationPromise=this.queue(async()=>{var n,s,i;if(!this._deleted&&(this.persistenceManager=await lr.create(this,e),(n=this._resolvePersistenceManagerAvailable)==null||n.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await io(this,{idToken:e}),n=await Xe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Ye(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=n==null?void 0:n._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(n=u.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await oo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Vy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ye(this.app))return Promise.reject(Cn(this));const t=e?ae(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ye(this.app)?Promise.reject(Cn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ye(this.app)?Promise.reject(Cn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(pt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Jy(this),t=new Xy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Js("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await Ky(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&pt(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await lr.create(this,[pt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=uf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var t;if(Ye(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&by(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Br(r){return ae(r)}class Jl{constructor(e){this.auth=e,this.observer=null,this.addObserver=v_(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let So={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function eI(r){So=r}function lf(r){return So.loadJS(r)}function tI(){return So.recaptchaEnterpriseScript}function nI(){return So.gapiScript}function rI(r){return`__${r}${Math.floor(Math.random()*1e6)}`}class sI{constructor(){this.enterprise=new iI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class iI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const oI="recaptcha-enterprise",hf="NO_RECAPTCHA";class aI{constructor(e){this.type=oI,this.auth=Br(e)}async verify(e="verify",t=!1){async function n(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{Fy(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new Ly(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Gl(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(hf)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new sI().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{n(this.auth).then(c=>{if(!t&&Gl(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=tI();u.length!==0&&(u+=c),lf(u).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function Yl(r,e,t,n=!1,s=!1){const i=new aI(r);let o;if(s)o=hf;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};return n?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function cI(r,e,t,n,s){var i;if((i=r._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Yl(r,e,t,t==="getOobCode");return n(r,o)}else return n(r,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Yl(r,e,t,t==="getOobCode");return n(r,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uI(r,e){const t=Xs(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(nt(i,e??{}))return s;dt(s,"already-initialized")}return t.initialize({options:e})}function lI(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(pt);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function hI(r,e,t){const n=Br(r);z(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=df(e),{host:o,port:c}=dI(e),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){z(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),z(nt(h,n.config.emulator)&&nt(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,Fr(o)?yc(`${i}//${o}${u}`):fI()}function df(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function dI(r){const e=df(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:Xl(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:Xl(o)}}}function Xl(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function fI(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return mt("not implemented")}_getIdTokenResponse(e){return mt("not implemented")}_linkToIdToken(e,t){return mt("not implemented")}_getReauthenticationResolver(e){return mt("not implemented")}}async function mI(r,e){return sn(r,"POST","/v1/accounts:sendOobCode",ei(r,e))}async function pI(r,e){return mI(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hr(r,e){return xy(r,"POST","/v1/accounts:signInWithIdp",ei(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gI="http://localhost";class xn extends ff{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new xn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):dt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new xn(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return hr(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,hr(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,hr(e,t)}buildRequest(){const e={requestUri:gI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ys(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti extends Rc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends ti{constructor(){super("facebook.com")}static credential(e){return xn._fromParams({providerId:Ft.PROVIDER_ID,signInMethod:Ft.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ft.credentialFromTaggedObject(e)}static credentialFromError(e){return Ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ft.credential(e.oauthAccessToken)}catch{return null}}}Ft.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ft.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut extends ti{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return xn._fromParams({providerId:Ut.PROVIDER_ID,signInMethod:Ut.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ut.credentialFromTaggedObject(e)}static credentialFromError(e){return Ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Ut.credential(t,n)}catch{return null}}}Ut.GOOGLE_SIGN_IN_METHOD="google.com";Ut.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends ti{constructor(){super("github.com")}static credential(e){return xn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bt.credential(e.oauthAccessToken)}catch{return null}}}Bt.GITHUB_SIGN_IN_METHOD="github.com";Bt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends ti{constructor(){super("twitter.com")}static credential(e,t){return xn._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return qt.credential(t,n)}catch{return null}}}qt.TWITTER_SIGN_IN_METHOD="twitter.com";qt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await Xe._fromIdTokenResponse(e,n,s),o=Zl(n);return new gr({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=Zl(n);return new gr({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function Zl(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao extends vt{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,ao.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new ao(e,t,n,s)}}function mf(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ao._fromErrorAndOperation(r,i,e,n):i})}async function _I(r,e,t=!1){const n=await Ls(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return gr._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yI(r,e,t=!1){const{auth:n}=r;if(Ye(n.app))return Promise.reject(Cn(n));const s="reauthenticate";try{const i=await Ls(r,mf(n,s,e,r),t);z(i.idToken,n,"internal-error");const o=vc(i.idToken);z(o,n,"internal-error");const{sub:c}=o;return z(r.uid===c,n,"user-mismatch"),gr._forOperation(r,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&dt(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function II(r,e,t=!1){if(Ye(r.app))return Promise.reject(Cn(r));const n="signIn",s=await mf(r,n,e),i=await gr._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EI(r,e,t){var n;z(((n=t.url)==null?void 0:n.length)>0,r,"invalid-continue-uri"),z(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,r,"invalid-dynamic-link-domain"),z(typeof t.linkDomain>"u"||t.linkDomain.length>0,r,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(z(t.iOS.bundleId.length>0,r,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(z(t.android.packageName.length>0,r,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}async function qR(r,e,t){const n=Br(r),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&EI(n,s,t),await cI(n,s,"getOobCode",pI)}function TI(r,e,t,n){return ae(r).onIdTokenChanged(e,t,n)}function wI(r,e,t){return ae(r).beforeAuthStateChanged(e,t)}function jR(r,e,t,n){return ae(r).onAuthStateChanged(e,t,n)}function zR(r){return ae(r).signOut()}const co="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(co,"1"),this.storage.removeItem(co),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vI=1e3,AI=10;class gf extends pf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=cf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);Wy()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,AI):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},vI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}gf.type="LOCAL";const RI=gf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f extends pf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}_f.type="SESSION";const yf=_f;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bI(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new Po(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),u=await bI(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Po.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bc(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=bc("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(m){const g=m;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(){return window}function PI(r){ut().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(){return typeof ut().WorkerGlobalScope<"u"&&typeof ut().importScripts=="function"}async function CI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function VI(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function DI(){return If()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef="firebaseLocalStorageDb",kI=1,uo="firebaseLocalStorage",Tf="fbase_key";class ni{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Co(r,e){return r.transaction([uo],e?"readwrite":"readonly").objectStore(uo)}function NI(){const r=indexedDB.deleteDatabase(Ef);return new ni(r).toPromise()}function ja(){const r=indexedDB.open(Ef,kI);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(uo,{keyPath:Tf})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(uo)?e(n):(n.close(),await NI(),e(await ja()))})})}async function eh(r,e,t){const n=Co(r,!0).put({[Tf]:e,value:t});return new ni(n).toPromise()}async function xI(r,e){const t=Co(r,!1).get(e),n=await new ni(t).toPromise();return n===void 0?null:n.value}function th(r,e){const t=Co(r,!0).delete(e);return new ni(t).toPromise()}const OI=800,MI=3;class wf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ja(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>MI)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return If()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Po._getInstance(DI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await CI(),!this.activeServiceWorker)return;this.sender=new SI(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(n=e[0])!=null&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||VI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ja();return await eh(e,co,"1"),await th(e,co),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>eh(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>xI(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>th(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Co(s,!1).getAll();return new ni(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),OI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}wf.type="LOCAL";const LI=wf;new Zs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vf(r,e){return e?pt(e):(z(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc extends ff{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return hr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return hr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return hr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function FI(r){return II(r.auth,new Sc(r),r.bypassAuthState)}function UI(r){const{auth:e,user:t}=r;return z(t,e,"internal-error"),yI(t,new Sc(r),r.bypassAuthState)}async function BI(r){const{auth:e,user:t}=r;return z(t,e,"internal-error"),_I(t,new Sc(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return FI;case"linkViaPopup":case"linkViaRedirect":return BI;case"reauthViaPopup":case"reauthViaRedirect":return UI;default:dt(this.auth,"internal-error")}}resolve(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qI=new Zs(2e3,1e4);async function $R(r,e,t){if(Ye(r.app))return Promise.reject(Ze(r,"operation-not-supported-in-this-environment"));const n=Br(r);Sy(r,e,Rc);const s=vf(n,t);return new Sn(n,"signInViaPopup",e,s).executeNotNull()}class Sn extends Af{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Sn.currentPopupAction&&Sn.currentPopupAction.cancel(),Sn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){It(this.filter.length===1,"Popup operations only handle one event");const e=bc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ze(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Ze(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Sn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if((n=(t=this.authWindow)==null?void 0:t.window)!=null&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ze(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,qI.get())};e()}}Sn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jI="pendingRedirect",zi=new Map;class zI extends Af{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=zi.get(this.auth._key());if(!e){try{const n=await $I(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}zi.set(this.auth._key(),e)}return this.bypassAuthState||zi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function $I(r,e){const t=HI(e),n=KI(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function GI(r,e){zi.set(r._key(),e)}function KI(r){return pt(r._redirectPersistence)}function HI(r){return ji(jI,r.config.apiKey,r.name)}async function WI(r,e,t=!1){if(Ye(r.app))return Promise.reject(Cn(r));const n=Br(r),s=vf(n,e),o=await new zI(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QI=600*1e3;class JI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!YI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Rf(e)){const s=((n=e.error.code)==null?void 0:n.split("auth/")[1])||"internal-error";t.onError(Ze(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=QI&&this.cachedEventUids.clear(),this.cachedEventUids.has(nh(e))}saveEventToCache(e){this.cachedEventUids.add(nh(e)),this.lastProcessedEventTime=Date.now()}}function nh(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function Rf({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function YI(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Rf(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XI(r,e={}){return sn(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,eE=/^https?/;async function tE(r){if(r.config.emulator)return;const{authorizedDomains:e}=await XI(r);for(const t of e)try{if(nE(t))return}catch{}dt(r,"unauthorized-domain")}function nE(r){const e=Ba(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!eE.test(t))return!1;if(ZI.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE=new Zs(3e4,6e4);function rh(){const r=ut().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function sE(r){return new Promise((e,t)=>{var s,i,o;function n(){rh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{rh(),t(Ze(r,"network-request-failed"))},timeout:rE.get()})}if((i=(s=ut().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=ut().gapi)!=null&&o.load)n();else{const c=rI("iframefcb");return ut()[c]=()=>{gapi.load?n():t(Ze(r,"network-request-failed"))},lf(`${nI()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw $i=null,e})}let $i=null;function iE(r){return $i=$i||sE(r),$i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oE=new Zs(5e3,15e3),aE="__/auth/iframe",cE="emulator/auth/iframe",uE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},lE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function hE(r){const e=r.config;z(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?wc(e,cE):`https://${r.config.authDomain}/${aE}`,n={apiKey:e.apiKey,appName:r.name,v:Ur},s=lE.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${Ys(n).slice(1)}`}async function dE(r){const e=await iE(r),t=ut().gapi;return z(t,r,"internal-error"),e.open({where:document.body,url:hE(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:uE,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=Ze(r,"network-request-failed"),c=ut().setTimeout(()=>{i(o)},oE.get());function u(){ut().clearTimeout(c),s(n)}n.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},mE=500,pE=600,gE="_blank",_E="http://localhost";class sh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function yE(r,e,t,n=mE,s=pE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u={...fE,width:n.toString(),height:s.toString(),top:i,left:o},h=we().toLowerCase();t&&(c=nf(h)?gE:t),ef(h)&&(e=e||_E,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[v,V])=>`${g}${v}=${V},`,"");if(Hy(h)&&c!=="_self")return IE(e||"",c),new sh(null);const m=window.open(e||"",c,f);z(m,r,"popup-blocked");try{m.focus()}catch{}return new sh(m)}function IE(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EE="__/auth/handler",TE="emulator/auth/handler",wE=encodeURIComponent("fac");async function ih(r,e,t,n,s,i){z(r.config.authDomain,r,"auth-domain-config-required"),z(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Ur,eventId:s};if(e instanceof Rc){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",w_(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof ti){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),h=u?`#${wE}=${encodeURIComponent(u)}`:"";return`${vE(r)}?${Ys(c).slice(1)}${h}`}function vE({config:r}){return r.emulator?wc(r,TE):`https://${r.authDomain}/${EE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa="webStorageSupport";class AE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=yf,this._completeRedirectFn=WI,this._overrideRedirectResult=GI}async _openPopup(e,t,n,s){var o;It((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await ih(e,t,n,Ba(),s);return yE(e,i,bc())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await ih(e,t,n,Ba(),s);return PI(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(It(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await dE(e),n=new JI(e);return t.register("authEvent",s=>(z(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Pa,{type:Pa},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[Pa];i!==void 0&&t(!!i),dt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=tE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return cf()||tf()||Ac()}}const RE=AE;var oh="@firebase/auth",ah="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SE(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function PE(r){pr(new Nn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;z(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:uf(r)},h=new Zy(n,s,i,u);return lI(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),pr(new Nn("auth-internal",e=>{const t=Br(e.getProvider("auth").getImmediate());return(n=>new bE(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ht(oh,ah,SE(r)),Ht(oh,ah,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CE=300,VE=Ud("authIdTokenMaxAge")||CE;let ch=null;const DE=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>VE)return;const s=t==null?void 0:t.token;ch!==s&&(ch=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function GR(r=$d()){const e=Xs(r,"auth");if(e.isInitialized())return e.getImmediate();const t=uI(r,{popupRedirectResolver:RE,persistence:[LI,RI,yf]}),n=Ud("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=DE(i.toString());wI(t,o,()=>o(t.currentUser)),TI(t,c=>o(c))}}const s=Ld("auth");return s&&hI(t,`http://${s}`),t}function kE(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}eI({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=Ze("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",kE().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});PE("Browser");var uh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Wt,bf;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function I(){}I.prototype=_.prototype,E.F=_.prototype,E.prototype=new I,E.prototype.constructor=E,E.D=function(w,T,S){for(var y=Array(arguments.length-2),Fe=2;Fe<arguments.length;Fe++)y[Fe-2]=arguments[Fe];return _.prototype[T].apply(w,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,_,I){I||(I=0);const w=Array(16);if(typeof _=="string")for(var T=0;T<16;++T)w[T]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(T=0;T<16;++T)w[T]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=E.g[0],I=E.g[1],T=E.g[2];let S=E.g[3],y;y=_+(S^I&(T^S))+w[0]+3614090360&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+w[1]+3905402710&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+w[2]+606105819&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+w[3]+3250441966&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(S^I&(T^S))+w[4]+4118548399&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+w[5]+1200080426&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+w[6]+2821735955&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+w[7]+4249261313&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(S^I&(T^S))+w[8]+1770035416&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+w[9]+2336552879&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+w[10]+4294925233&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+w[11]+2304563134&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(S^I&(T^S))+w[12]+1804603682&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+w[13]+4254626195&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+w[14]+2792965006&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+w[15]+1236535329&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(T^S&(I^T))+w[1]+4129170786&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+w[6]+3225465664&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+w[11]+643717713&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+w[0]+3921069994&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(T^S&(I^T))+w[5]+3593408605&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+w[10]+38016083&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+w[15]+3634488961&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+w[4]+3889429448&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(T^S&(I^T))+w[9]+568446438&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+w[14]+3275163606&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+w[3]+4107603335&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+w[8]+1163531501&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(T^S&(I^T))+w[13]+2850285829&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+w[2]+4243563512&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+w[7]+1735328473&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+w[12]+2368359562&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(I^T^S)+w[5]+4294588738&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+w[8]+2272392833&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+w[11]+1839030562&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+w[14]+4259657740&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(I^T^S)+w[1]+2763975236&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+w[4]+1272893353&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+w[7]+4139469664&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+w[10]+3200236656&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(I^T^S)+w[13]+681279174&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+w[0]+3936430074&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+w[3]+3572445317&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+w[6]+76029189&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(I^T^S)+w[9]+3654602809&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+w[12]+3873151461&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+w[15]+530742520&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+w[2]+3299628645&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(T^(I|~S))+w[0]+4096336452&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+w[7]+1126891415&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+w[14]+2878612391&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+w[5]+4237533241&4294967295,I=T+(y<<21&4294967295|y>>>11),y=_+(T^(I|~S))+w[12]+1700485571&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+w[3]+2399980690&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+w[10]+4293915773&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+w[1]+2240044497&4294967295,I=T+(y<<21&4294967295|y>>>11),y=_+(T^(I|~S))+w[8]+1873313359&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+w[15]+4264355552&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+w[6]+2734768916&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+w[13]+1309151649&4294967295,I=T+(y<<21&4294967295|y>>>11),y=_+(T^(I|~S))+w[4]+4149444226&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+w[11]+3174756917&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+w[2]+718787259&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+S&4294967295}n.prototype.v=function(E,_){_===void 0&&(_=E.length);const I=_-this.blockSize,w=this.C;let T=this.h,S=0;for(;S<_;){if(T==0)for(;S<=I;)s(this,E,S),S+=this.blockSize;if(typeof E=="string"){for(;S<_;)if(w[T++]=E.charCodeAt(S++),T==this.blockSize){s(this,w),T=0;break}}else for(;S<_;)if(w[T++]=E[S++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=_},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;_=this.o*8;for(var I=E.length-8;I<E.length;++I)E[I]=_&255,_/=256;for(this.v(E),E=Array(16),_=0,I=0;I<4;++I)for(let w=0;w<32;w+=8)E[_++]=this.g[I]>>>w&255;return E};function i(E,_){var I=c;return Object.prototype.hasOwnProperty.call(I,E)?I[E]:I[E]=_(E)}function o(E,_){this.h=_;const I=[];let w=!0;for(let T=E.length-1;T>=0;T--){const S=E[T]|0;w&&S==_||(I[T]=S,w=!1)}this.g=I}var c={};function u(E){return-128<=E&&E<128?i(E,function(_){return new o([_|0],_<0?-1:0)}):new o([E|0],E<0?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return m;if(E<0)return k(h(-E));const _=[];let I=1;for(let w=0;E>=I;w++)_[w]=E/I|0,I*=4294967296;return new o(_,0)}function f(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return k(f(E.substring(1),_));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=h(Math.pow(_,8));let w=m;for(let S=0;S<E.length;S+=8){var T=Math.min(8,E.length-S);const y=parseInt(E.substring(S,S+T),_);T<8?(T=h(Math.pow(_,T)),w=w.j(T).add(h(y))):(w=w.j(I),w=w.add(h(y)))}return w}var m=u(0),g=u(1),v=u(16777216);r=o.prototype,r.m=function(){if(D(this))return-k(this).m();let E=0,_=1;for(let I=0;I<this.g.length;I++){const w=this.i(I);E+=(w>=0?w:4294967296+w)*_,_*=4294967296}return E},r.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(V(this))return"0";if(D(this))return"-"+k(this).toString(E);const _=h(Math.pow(E,6));var I=this;let w="";for(;;){const T=ee(I,_).g;I=F(I,T.j(_));let S=((I.g.length>0?I.g[0]:I.h)>>>0).toString(E);if(I=T,V(I))return S+w;for(;S.length<6;)S="0"+S;w=S+w}},r.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function V(E){if(E.h!=0)return!1;for(let _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function D(E){return E.h==-1}r.l=function(E){return E=F(this,E),D(E)?-1:V(E)?0:1};function k(E){const _=E.g.length,I=[];for(let w=0;w<_;w++)I[w]=~E.g[w];return new o(I,~E.h).add(g)}r.abs=function(){return D(this)?k(this):this},r.add=function(E){const _=Math.max(this.g.length,E.g.length),I=[];let w=0;for(let T=0;T<=_;T++){let S=w+(this.i(T)&65535)+(E.i(T)&65535),y=(S>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=y>>>16,S&=65535,y&=65535,I[T]=y<<16|S}return new o(I,I[I.length-1]&-2147483648?-1:0)};function F(E,_){return E.add(k(_))}r.j=function(E){if(V(this)||V(E))return m;if(D(this))return D(E)?k(this).j(k(E)):k(k(this).j(E));if(D(E))return k(this.j(k(E)));if(this.l(v)<0&&E.l(v)<0)return h(this.m()*E.m());const _=this.g.length+E.g.length,I=[];for(var w=0;w<2*_;w++)I[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<E.g.length;T++){const S=this.i(w)>>>16,y=this.i(w)&65535,Fe=E.i(T)>>>16,fn=E.i(T)&65535;I[2*w+2*T]+=y*fn,j(I,2*w+2*T),I[2*w+2*T+1]+=S*fn,j(I,2*w+2*T+1),I[2*w+2*T+1]+=y*Fe,j(I,2*w+2*T+1),I[2*w+2*T+2]+=S*Fe,j(I,2*w+2*T+2)}for(E=0;E<_;E++)I[E]=I[2*E+1]<<16|I[2*E];for(E=_;E<2*_;E++)I[E]=0;return new o(I,0)};function j(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function q(E,_){this.g=E,this.h=_}function ee(E,_){if(V(_))throw Error("division by zero");if(V(E))return new q(m,m);if(D(E))return _=ee(k(E),_),new q(k(_.g),k(_.h));if(D(_))return _=ee(E,k(_)),new q(k(_.g),_.h);if(E.g.length>30){if(D(E)||D(_))throw Error("slowDivide_ only works with positive integers.");for(var I=g,w=_;w.l(E)<=0;)I=X(I),w=X(w);var T=Z(I,1),S=Z(w,1);for(w=Z(w,2),I=Z(I,2);!V(w);){var y=S.add(w);y.l(E)<=0&&(T=T.add(I),S=y),w=Z(w,1),I=Z(I,1)}return _=F(E,T.j(_)),new q(T,_)}for(T=m;E.l(_)>=0;){for(I=Math.max(1,Math.floor(E.m()/_.m())),w=Math.ceil(Math.log(I)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),S=h(I),y=S.j(_);D(y)||y.l(E)>0;)I-=w,S=h(I),y=S.j(_);V(S)&&(S=g),T=T.add(S),E=F(E,y)}return new q(T,E)}r.B=function(E){return ee(this,E).h},r.and=function(E){const _=Math.max(this.g.length,E.g.length),I=[];for(let w=0;w<_;w++)I[w]=this.i(w)&E.i(w);return new o(I,this.h&E.h)},r.or=function(E){const _=Math.max(this.g.length,E.g.length),I=[];for(let w=0;w<_;w++)I[w]=this.i(w)|E.i(w);return new o(I,this.h|E.h)},r.xor=function(E){const _=Math.max(this.g.length,E.g.length),I=[];for(let w=0;w<_;w++)I[w]=this.i(w)^E.i(w);return new o(I,this.h^E.h)};function X(E){const _=E.g.length+1,I=[];for(let w=0;w<_;w++)I[w]=E.i(w)<<1|E.i(w-1)>>>31;return new o(I,E.h)}function Z(E,_){const I=_>>5;_%=32;const w=E.g.length-I,T=[];for(let S=0;S<w;S++)T[S]=_>0?E.i(S+I)>>>_|E.i(S+I+1)<<32-_:E.i(S+I);return new o(T,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,bf=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Wt=o}).apply(typeof uh<"u"?uh:typeof self<"u"?self:typeof window<"u"?window:{});var Ni=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Sf,Ts,Pf,Gi,za,Cf,Vf,Df;(function(){var r,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ni=="object"&&Ni];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var R=a[p];if(!(R in d))break e;d=d[R]}a=a[a.length-1],p=d[a],l=l(p),l!=p&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&d.push([p,l[p]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function m(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(p,R,P){for(var M=Array(arguments.length-2),K=2;K<arguments.length;K++)M[K-2]=arguments[K];return l.prototype[R].apply(p,M)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function v(a){const l=a.length;if(l>0){const d=Array(l);for(let p=0;p<l;p++)d[p]=a[p];return d}return[]}function V(a,l){for(let p=1;p<arguments.length;p++){const R=arguments[p];var d=typeof R;if(d=d!="object"?d:R?Array.isArray(R)?"array":d:"null",d=="array"||d=="object"&&typeof R.length=="number"){d=a.length||0;const P=R.length||0;a.length=d+P;for(let M=0;M<P;M++)a[d+M]=R[M]}else a.push(R)}}class D{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function k(a){o.setTimeout(()=>{throw a},0)}function F(){var a=E;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class j{constructor(){this.h=this.g=null}add(l,d){const p=q.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var q=new D(()=>new ee,a=>a.reset());class ee{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let X,Z=!1,E=new j,_=()=>{const a=Promise.resolve(void 0);X=()=>{a.then(I)}};function I(){for(var a;a=F();){try{a.h.call(a.g)}catch(d){k(d)}var l=q;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}Z=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function Fe(a,l){T.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}m(Fe,T),Fe.prototype.init=function(a,l){const d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Fe.Z.h.call(this)},Fe.prototype.h=function(){Fe.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var fn="closure_listenable_"+(Math.random()*1e6|0),Ag=0;function Rg(a,l,d,p,R){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=R,this.key=++Ag,this.da=this.fa=!1}function _i(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function yi(a,l,d){for(const p in a)l.call(d,a[p],p,a)}function bg(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function Mu(a){const l={};for(const d in a)l[d]=a[d];return l}const Lu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Fu(a,l){let d,p;for(let R=1;R<arguments.length;R++){p=arguments[R];for(d in p)a[d]=p[d];for(let P=0;P<Lu.length;P++)d=Lu[P],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function Ii(a){this.src=a,this.g={},this.h=0}Ii.prototype.add=function(a,l,d,p,R){const P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);const M=na(a,l,p,R);return M>-1?(l=a[M],d||(l.fa=!1)):(l=new Rg(l,this.src,P,!!p,R),l.fa=d,a.push(l)),l};function ta(a,l){const d=l.type;if(d in a.g){var p=a.g[d],R=Array.prototype.indexOf.call(p,l,void 0),P;(P=R>=0)&&Array.prototype.splice.call(p,R,1),P&&(_i(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function na(a,l,d,p){for(let R=0;R<a.length;++R){const P=a[R];if(!P.da&&P.listener==l&&P.capture==!!d&&P.ha==p)return R}return-1}var ra="closure_lm_"+(Math.random()*1e6|0),sa={};function Uu(a,l,d,p,R){if(Array.isArray(l)){for(let P=0;P<l.length;P++)Uu(a,l[P],d,p,R);return null}return d=ju(d),a&&a[fn]?a.J(l,d,c(p)?!!p.capture:!1,R):Sg(a,l,d,!1,p,R)}function Sg(a,l,d,p,R,P){if(!l)throw Error("Invalid event type");const M=c(R)?!!R.capture:!!R;let K=oa(a);if(K||(a[ra]=K=new Ii(a)),d=K.add(l,d,p,M,P),d.proxy)return d;if(p=Pg(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)S||(R=M),R===void 0&&(R=!1),a.addEventListener(l.toString(),p,R);else if(a.attachEvent)a.attachEvent(qu(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Pg(){function a(d){return l.call(a.src,a.listener,d)}const l=Cg;return a}function Bu(a,l,d,p,R){if(Array.isArray(l))for(var P=0;P<l.length;P++)Bu(a,l[P],d,p,R);else p=c(p)?!!p.capture:!!p,d=ju(d),a&&a[fn]?(a=a.i,P=String(l).toString(),P in a.g&&(l=a.g[P],d=na(l,d,p,R),d>-1&&(_i(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[P],a.h--)))):a&&(a=oa(a))&&(l=a.g[l.toString()],a=-1,l&&(a=na(l,d,p,R)),(d=a>-1?l[a]:null)&&ia(d))}function ia(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[fn])ta(l.i,a);else{var d=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(d,p,a.capture):l.detachEvent?l.detachEvent(qu(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=oa(l))?(ta(d,a),d.h==0&&(d.src=null,l[ra]=null)):_i(a)}}}function qu(a){return a in sa?sa[a]:sa[a]="on"+a}function Cg(a,l){if(a.da)a=!0;else{l=new Fe(l,this);const d=a.listener,p=a.ha||a.src;a.fa&&ia(a),a=d.call(p,l)}return a}function oa(a){return a=a[ra],a instanceof Ii?a:null}var aa="__closure_events_fn_"+(Math.random()*1e9>>>0);function ju(a){return typeof a=="function"?a:(a[aa]||(a[aa]=function(l){return a.handleEvent(l)}),a[aa])}function De(){w.call(this),this.i=new Ii(this),this.M=this,this.G=null}m(De,w),De.prototype[fn]=!0,De.prototype.removeEventListener=function(a,l,d,p){Bu(this,a,l,d,p)};function Me(a,l){var d,p=a.G;if(p)for(d=[];p;p=p.G)d.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new T(l,a);else if(l instanceof T)l.target=l.target||a;else{var R=l;l=new T(p,a),Fu(l,R)}R=!0;let P,M;if(d)for(M=d.length-1;M>=0;M--)P=l.g=d[M],R=Ei(P,p,!0,l)&&R;if(P=l.g=a,R=Ei(P,p,!0,l)&&R,R=Ei(P,p,!1,l)&&R,d)for(M=0;M<d.length;M++)P=l.g=d[M],R=Ei(P,p,!1,l)&&R}De.prototype.N=function(){if(De.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let p=0;p<d.length;p++)_i(d[p]);delete a.g[l],a.h--}}this.G=null},De.prototype.J=function(a,l,d,p){return this.i.add(String(a),l,!1,d,p)},De.prototype.K=function(a,l,d,p){return this.i.add(String(a),l,!0,d,p)};function Ei(a,l,d,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let R=!0;for(let P=0;P<l.length;++P){const M=l[P];if(M&&!M.da&&M.capture==d){const K=M.listener,Te=M.ha||M.src;M.fa&&ta(a.i,M),R=K.call(Te,p)!==!1&&R}}return R&&!p.defaultPrevented}function Vg(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function zu(a){a.g=Vg(()=>{a.g=null,a.i&&(a.i=!1,zu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class Dg extends w{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:zu(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Zr(a){w.call(this),this.h=a,this.g={}}m(Zr,w);var $u=[];function Gu(a){yi(a.g,function(l,d){this.g.hasOwnProperty(d)&&ia(l)},a),a.g={}}Zr.prototype.N=function(){Zr.Z.N.call(this),Gu(this)},Zr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ca=o.JSON.stringify,kg=o.JSON.parse,Ng=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Ku(){}function Hu(){}var es={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ua(){T.call(this,"d")}m(ua,T);function la(){T.call(this,"c")}m(la,T);var mn={},Wu=null;function Ti(){return Wu=Wu||new De}mn.Ia="serverreachability";function Qu(a){T.call(this,mn.Ia,a)}m(Qu,T);function ts(a){const l=Ti();Me(l,new Qu(l))}mn.STAT_EVENT="statevent";function Ju(a,l){T.call(this,mn.STAT_EVENT,a),this.stat=l}m(Ju,T);function Le(a){const l=Ti();Me(l,new Ju(l,a))}mn.Ja="timingevent";function Yu(a,l){T.call(this,mn.Ja,a),this.size=l}m(Yu,T);function ns(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function rs(){this.g=!0}rs.prototype.ua=function(){this.g=!1};function xg(a,l,d,p,R,P){a.info(function(){if(a.g)if(P){var M="",K=P.split("&");for(let oe=0;oe<K.length;oe++){var Te=K[oe].split("=");if(Te.length>1){const Re=Te[0];Te=Te[1];const st=Re.split("_");M=st.length>=2&&st[1]=="type"?M+(Re+"="+Te+"&"):M+(Re+"=redacted&")}}}else M=null;else M=P;return"XMLHTTP REQ ("+p+") [attempt "+R+"]: "+l+`
`+d+`
`+M})}function Og(a,l,d,p,R,P,M){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+R+"]: "+l+`
`+d+`
`+P+" "+M})}function Jn(a,l,d,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Lg(a,d)+(p?" "+p:"")})}function Mg(a,l){a.info(function(){return"TIMEOUT: "+l})}rs.prototype.info=function(){};function Lg(a,l){if(!a.g)return l;if(!l)return null;try{const P=JSON.parse(l);if(P){for(a=0;a<P.length;a++)if(Array.isArray(P[a])){var d=P[a];if(!(d.length<2)){var p=d[1];if(Array.isArray(p)&&!(p.length<1)){var R=p[0];if(R!="noop"&&R!="stop"&&R!="close")for(let M=1;M<p.length;M++)p[M]=""}}}}return ca(P)}catch{return l}}var wi={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Xu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Zu;function ha(){}m(ha,Ku),ha.prototype.g=function(){return new XMLHttpRequest},Zu=new ha;function ss(a){return encodeURIComponent(String(a))}function Fg(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function Pt(a,l,d,p){this.j=a,this.i=l,this.l=d,this.S=p||1,this.V=new Zr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new el}function el(){this.i=null,this.g="",this.h=!1}var tl={},da={};function fa(a,l,d){a.M=1,a.A=Ai(rt(l)),a.u=d,a.R=!0,nl(a,null)}function nl(a,l){a.F=Date.now(),vi(a),a.B=rt(a.A);var d=a.B,p=a.S;Array.isArray(p)||(p=[String(p)]),pl(d.i,"t",p),a.C=0,d=a.j.L,a.h=new el,a.g=Nl(a.j,d?l:null,!a.u),a.P>0&&(a.O=new Dg(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,p=a.ba;var R="readystatechange";Array.isArray(R)||(R&&($u[0]=R.toString()),R=$u);for(let P=0;P<R.length;P++){const M=Uu(d,R[P],p||l.handleEvent,!1,l.h||l);if(!M)break;l.g[M.key]=M}l=a.J?Mu(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),ts(),xg(a.i,a.v,a.B,a.l,a.S,a.u)}Pt.prototype.ba=function(a){a=a.target;const l=this.O;l&&Dt(a)==3?l.j():this.Y(a)},Pt.prototype.Y=function(a){try{if(a==this.g)e:{const K=Dt(this.g),Te=this.g.ya(),oe=this.g.ca();if(!(K<3)&&(K!=3||this.g&&(this.h.h||this.g.la()||wl(this.g)))){this.K||K!=4||Te==7||(Te==8||oe<=0?ts(3):ts(2)),ma(this);var l=this.g.ca();this.X=l;var d=Ug(this);if(this.o=l==200,Og(this.i,this.v,this.B,this.l,this.S,K,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,R=this.g;if((p=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(p)){var P=p;break t}}P=null}if(a=P)Jn(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,pa(this,a);else{this.o=!1,this.m=3,Le(12),pn(this),is(this);break e}}if(this.R){a=!0;let Re;for(;!this.K&&this.C<d.length;)if(Re=Bg(this,d),Re==da){K==4&&(this.m=4,Le(14),a=!1),Jn(this.i,this.l,null,"[Incomplete Response]");break}else if(Re==tl){this.m=4,Le(15),Jn(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else Jn(this.i,this.l,Re,null),pa(this,Re);if(rl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),K!=4||d.length!=0||this.h.h||(this.m=1,Le(16),a=!1),this.o=this.o&&a,!a)Jn(this.i,this.l,d,"[Invalid Chunked Response]"),pn(this),is(this);else if(d.length>0&&!this.W){this.W=!0;var M=this.j;M.g==this&&M.aa&&!M.P&&(M.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),va(M),M.P=!0,Le(11))}}else Jn(this.i,this.l,d,null),pa(this,d);K==4&&pn(this),this.o&&!this.K&&(K==4?Cl(this.j,this):(this.o=!1,vi(this)))}else e_(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Le(12)):(this.m=0,Le(13)),pn(this),is(this)}}}catch{}finally{}};function Ug(a){if(!rl(a))return a.g.la();const l=wl(a.g);if(l==="")return"";let d="";const p=l.length,R=Dt(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return pn(a),is(a),"";a.h.i=new o.TextDecoder}for(let P=0;P<p;P++)a.h.h=!0,d+=a.h.i.decode(l[P],{stream:!(R&&P==p-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function rl(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Bg(a,l){var d=a.C,p=l.indexOf(`
`,d);return p==-1?da:(d=Number(l.substring(d,p)),isNaN(d)?tl:(p+=1,p+d>l.length?da:(l=l.slice(p,p+d),a.C=p+d,l)))}Pt.prototype.cancel=function(){this.K=!0,pn(this)};function vi(a){a.T=Date.now()+a.H,sl(a,a.H)}function sl(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=ns(h(a.aa,a),l)}function ma(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Pt.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Mg(this.i,this.B),this.M!=2&&(ts(),Le(17)),pn(this),this.m=2,is(this)):sl(this,this.T-a)};function is(a){a.j.I==0||a.K||Cl(a.j,a)}function pn(a){ma(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,Gu(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function pa(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||ga(d.h,a))){if(!a.L&&ga(d.h,a)&&d.I==3){try{var p=d.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var R=p;if(R[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Ci(d),Si(d);else break e;wa(d),Le(18)}}else d.xa=R[1],0<d.xa-d.K&&R[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=ns(h(d.Va,d),6e3));al(d.h)<=1&&d.ta&&(d.ta=void 0)}else _n(d,11)}else if((a.L||d.g==a)&&Ci(d),!y(l))for(R=d.Ba.g.parse(l),l=0;l<R.length;l++){let oe=R[l];const Re=oe[0];if(!(Re<=d.K))if(d.K=Re,oe=oe[1],d.I==2)if(oe[0]=="c"){d.M=oe[1],d.ba=oe[2];const st=oe[3];st!=null&&(d.ka=st,d.j.info("VER="+d.ka));const yn=oe[4];yn!=null&&(d.za=yn,d.j.info("SVER="+d.za));const kt=oe[5];kt!=null&&typeof kt=="number"&&kt>0&&(p=1.5*kt,d.O=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Nt=a.g;if(Nt){const Di=Nt.g?Nt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Di){var P=p.h;P.g||Di.indexOf("spdy")==-1&&Di.indexOf("quic")==-1&&Di.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(_a(P,P.h),P.h=null))}if(p.G){const Aa=Nt.g?Nt.g.getResponseHeader("X-HTTP-Session-Id"):null;Aa&&(p.wa=Aa,ue(p.J,p.G,Aa))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),p=d;var M=a;if(p.na=kl(p,p.L?p.ba:null,p.W),M.L){cl(p.h,M);var K=M,Te=p.O;Te&&(K.H=Te),K.D&&(ma(K),vi(K)),p.g=M}else Sl(p);d.i.length>0&&Pi(d)}else oe[0]!="stop"&&oe[0]!="close"||_n(d,7);else d.I==3&&(oe[0]=="stop"||oe[0]=="close"?oe[0]=="stop"?_n(d,7):Ta(d):oe[0]!="noop"&&d.l&&d.l.qa(oe),d.A=0)}}ts(4)}catch{}}var qg=class{constructor(a,l){this.g=a,this.map=l}};function il(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ol(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function al(a){return a.h?1:a.g?a.g.size:0}function ga(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function _a(a,l){a.g?a.g.add(l):a.h=l}function cl(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}il.prototype.cancel=function(){if(this.i=ul(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function ul(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return v(a.i)}var ll=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function jg(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const p=a[d].indexOf("=");let R,P=null;p>=0?(R=a[d].substring(0,p),P=a[d].substring(p+1)):R=a[d],l(R,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Ct(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof Ct?(this.l=a.l,os(this,a.j),this.o=a.o,this.g=a.g,as(this,a.u),this.h=a.h,ya(this,gl(a.i)),this.m=a.m):a&&(l=String(a).match(ll))?(this.l=!1,os(this,l[1]||"",!0),this.o=cs(l[2]||""),this.g=cs(l[3]||"",!0),as(this,l[4]),this.h=cs(l[5]||"",!0),ya(this,l[6]||"",!0),this.m=cs(l[7]||"")):(this.l=!1,this.i=new ls(null,this.l))}Ct.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(us(l,hl,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(us(l,hl,!0),"@"),a.push(ss(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(us(d,d.charAt(0)=="/"?Gg:$g,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",us(d,Hg)),a.join("")},Ct.prototype.resolve=function(a){const l=rt(this);let d=!!a.j;d?os(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var p=a.h;if(d)as(l,a.u);else if(d=!!a.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var R=l.h.lastIndexOf("/");R!=-1&&(p=l.h.slice(0,R+1)+p)}if(R=p,R==".."||R==".")p="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){p=R.lastIndexOf("/",0)==0,R=R.split("/");const P=[];for(let M=0;M<R.length;){const K=R[M++];K=="."?p&&M==R.length&&P.push(""):K==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),p&&M==R.length&&P.push("")):(P.push(K),p=!0)}p=P.join("/")}else p=R}return d?l.h=p:d=a.i.toString()!=="",d?ya(l,gl(a.i)):d=!!a.m,d&&(l.m=a.m),l};function rt(a){return new Ct(a)}function os(a,l,d){a.j=d?cs(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function as(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function ya(a,l,d){l instanceof ls?(a.i=l,Wg(a.i,a.l)):(d||(l=us(l,Kg)),a.i=new ls(l,a.l))}function ue(a,l,d){a.i.set(l,d)}function Ai(a){return ue(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function cs(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function us(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,zg),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function zg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var hl=/[#\/\?@]/g,$g=/[#\?:]/g,Gg=/[#\?]/g,Kg=/[#\?@]/g,Hg=/#/g;function ls(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function gn(a){a.g||(a.g=new Map,a.h=0,a.i&&jg(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=ls.prototype,r.add=function(a,l){gn(this),this.i=null,a=Yn(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function dl(a,l){gn(a),l=Yn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function fl(a,l){return gn(a),l=Yn(a,l),a.g.has(l)}r.forEach=function(a,l){gn(this),this.g.forEach(function(d,p){d.forEach(function(R){a.call(l,R,p,this)},this)},this)};function ml(a,l){gn(a);let d=[];if(typeof l=="string")fl(a,l)&&(d=d.concat(a.g.get(Yn(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}r.set=function(a,l){return gn(this),this.i=null,a=Yn(this,a),fl(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=ml(this,a),a.length>0?String(a[0]):l):l};function pl(a,l,d){dl(a,l),d.length>0&&(a.i=null,a.g.set(Yn(a,l),v(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var d=l[p];const R=ss(d);d=ml(this,d);for(let P=0;P<d.length;P++){let M=R;d[P]!==""&&(M+="="+ss(d[P])),a.push(M)}}return this.i=a.join("&")};function gl(a){const l=new ls;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function Yn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Wg(a,l){l&&!a.j&&(gn(a),a.i=null,a.g.forEach(function(d,p){const R=p.toLowerCase();p!=R&&(dl(this,p),pl(this,R,d))},a)),a.j=l}function Qg(a,l){const d=new rs;if(o.Image){const p=new Image;p.onload=f(Vt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=f(Vt,d,"TestLoadImage: error",!1,l,p),p.onabort=f(Vt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=f(Vt,d,"TestLoadImage: timeout",!1,l,p),o.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function Jg(a,l){const d=new rs,p=new AbortController,R=setTimeout(()=>{p.abort(),Vt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(P=>{clearTimeout(R),P.ok?Vt(d,"TestPingServer: ok",!0,l):Vt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(R),Vt(d,"TestPingServer: error",!1,l)})}function Vt(a,l,d,p,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),p(d)}catch{}}function Yg(){this.g=new Ng}function Ia(a){this.i=a.Sb||null,this.h=a.ab||!1}m(Ia,Ku),Ia.prototype.g=function(){return new Ri(this.i,this.h)};function Ri(a,l){De.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(Ri,De),r=Ri.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,ds(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,hs(this)),this.readyState=0},r.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ds(this)),this.g&&(this.readyState=3,ds(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;_l(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function _l(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}r.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?hs(this):ds(this),this.readyState==3&&_l(this)}},r.Oa=function(a){this.g&&(this.response=this.responseText=a,hs(this))},r.Na=function(a){this.g&&(this.response=a,hs(this))},r.ga=function(){this.g&&hs(this)};function hs(a){a.readyState=4,a.l=null,a.j=null,a.B=null,ds(a)}r.setRequestHeader=function(a,l){this.A.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function ds(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ri.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function yl(a){let l="";return yi(a,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function Ea(a,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=yl(d),typeof a=="string"?d!=null&&ss(d):ue(a,l,d))}function ge(a){De.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(ge,De);var Xg=/^https?$/i,Zg=["POST","PUT"];r=ge.prototype,r.Fa=function(a){this.H=a},r.ea=function(a,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Zu.g(),this.g.onreadystatechange=g(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(P){Il(this,P);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var R in p)d.set(R,p[R]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const P of p.keys())d.set(P,p.get(P));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),R=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Zg,l,void 0)>=0)||p||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,M]of d)this.g.setRequestHeader(P,M);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(P){Il(this,P)}};function Il(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,El(a),bi(a)}function El(a){a.A||(a.A=!0,Me(a,"complete"),Me(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Me(this,"complete"),Me(this,"abort"),bi(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),bi(this,!0)),ge.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Tl(this):this.Xa())},r.Xa=function(){Tl(this)};function Tl(a){if(a.h&&typeof i<"u"){if(a.v&&Dt(a)==4)setTimeout(a.Ca.bind(a),0);else if(Me(a,"readystatechange"),Dt(a)==4){a.h=!1;try{const P=a.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=P===0){let M=String(a.D).match(ll)[1]||null;!M&&o.self&&o.self.location&&(M=o.self.location.protocol.slice(0,-1)),p=!Xg.test(M?M.toLowerCase():"")}d=p}if(d)Me(a,"complete"),Me(a,"success");else{a.o=6;try{var R=Dt(a)>2?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.ca()+"]",El(a)}}finally{bi(a)}}}}function bi(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||Me(a,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function Dt(a){return a.g?a.g.readyState:0}r.ca=function(){try{return Dt(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),kg(l)}};function wl(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function e_(a){const l={};a=(a.g&&Dt(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(y(a[p]))continue;var d=Fg(a[p]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=l[R]||[];l[R]=P,P.push(d)}bg(l,function(p){return p.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function fs(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function vl(a){this.za=0,this.i=[],this.j=new rs,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=fs("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=fs("baseRetryDelayMs",5e3,a),this.Za=fs("retryDelaySeedMs",1e4,a),this.Ta=fs("forwardChannelMaxRetries",2,a),this.va=fs("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new il(a&&a.concurrentRequestLimit),this.Ba=new Yg,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=vl.prototype,r.ka=8,r.I=1,r.connect=function(a,l,d,p){Le(0),this.W=a,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.J=kl(this,null,this.W),Pi(this)};function Ta(a){if(Al(a),a.I==3){var l=a.V++,d=rt(a.J);if(ue(d,"SID",a.M),ue(d,"RID",l),ue(d,"TYPE","terminate"),ms(a,d),l=new Pt(a,a.j,l),l.M=2,l.A=Ai(rt(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=Nl(l.j,null),l.g.ea(l.A)),l.F=Date.now(),vi(l)}Dl(a)}function Si(a){a.g&&(va(a),a.g.cancel(),a.g=null)}function Al(a){Si(a),a.v&&(o.clearTimeout(a.v),a.v=null),Ci(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Pi(a){if(!ol(a.h)&&!a.m){a.m=!0;var l=a.Ea;X||_(),Z||(X(),Z=!0),E.add(l,a),a.D=0}}function t_(a,l){return al(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=ns(h(a.Ea,a,l),Vl(a,a.D)),a.D++,!0)}r.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const R=new Pt(this,this.j,a);let P=this.o;if(this.U&&(P?(P=Mu(P),Fu(P,this.U)):P=this.U),this.u!==null||this.R||(R.J=P,P=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=bl(this,R,l),d=rt(this.J),ue(d,"RID",a),ue(d,"CVER",22),this.G&&ue(d,"X-HTTP-Session-Id",this.G),ms(this,d),P&&(this.R?l="headers="+ss(yl(P))+"&"+l:this.u&&Ea(d,this.u,P)),_a(this.h,R),this.Ra&&ue(d,"TYPE","init"),this.S?(ue(d,"$req",l),ue(d,"SID","null"),R.U=!0,fa(R,d,null)):fa(R,d,l),this.I=2}}else this.I==3&&(a?Rl(this,a):this.i.length==0||ol(this.h)||Rl(this))};function Rl(a,l){var d;l?d=l.l:d=a.V++;const p=rt(a.J);ue(p,"SID",a.M),ue(p,"RID",d),ue(p,"AID",a.K),ms(a,p),a.u&&a.o&&Ea(p,a.u,a.o),d=new Pt(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=bl(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),_a(a.h,d),fa(d,p,l)}function ms(a,l){a.H&&yi(a.H,function(d,p){ue(l,p,d)}),a.l&&yi({},function(d,p){ue(l,p,d)})}function bl(a,l,d){d=Math.min(a.i.length,d);const p=a.l?h(a.l.Ka,a.l,a):null;e:{var R=a.i;let K=-1;for(;;){const Te=["count="+d];K==-1?d>0?(K=R[0].g,Te.push("ofs="+K)):K=0:Te.push("ofs="+K);let oe=!0;for(let Re=0;Re<d;Re++){var P=R[Re].g;const st=R[Re].map;if(P-=K,P<0)K=Math.max(0,R[Re].g-100),oe=!1;else try{P="req"+P+"_"||"";try{var M=st instanceof Map?st:Object.entries(st);for(const[yn,kt]of M){let Nt=kt;c(kt)&&(Nt=ca(kt)),Te.push(P+yn+"="+encodeURIComponent(Nt))}}catch(yn){throw Te.push(P+"type="+encodeURIComponent("_badmap")),yn}}catch{p&&p(st)}}if(oe){M=Te.join("&");break e}}M=void 0}return a=a.i.splice(0,d),l.G=a,M}function Sl(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;X||_(),Z||(X(),Z=!0),E.add(l,a),a.A=0}}function wa(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=ns(h(a.Da,a),Vl(a,a.A)),a.A++,!0)}r.Da=function(){if(this.v=null,Pl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=ns(h(this.Wa,this),a)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Le(10),Si(this),Pl(this))};function va(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Pl(a){a.g=new Pt(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=rt(a.na);ue(l,"RID","rpc"),ue(l,"SID",a.M),ue(l,"AID",a.K),ue(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&ue(l,"TO",a.ia),ue(l,"TYPE","xmlhttp"),ms(a,l),a.u&&a.o&&Ea(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Ai(rt(l)),d.u=null,d.R=!0,nl(d,a)}r.Va=function(){this.C!=null&&(this.C=null,Si(this),wa(this),Le(19))};function Ci(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Cl(a,l){var d=null;if(a.g==l){Ci(a),va(a),a.g=null;var p=2}else if(ga(a.h,l))d=l.G,cl(a.h,l),p=1;else return;if(a.I!=0){if(l.o)if(p==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var R=a.D;p=Ti(),Me(p,new Yu(p,d)),Pi(a)}else Sl(a);else if(R=l.m,R==3||R==0&&l.X>0||!(p==1&&t_(a,l)||p==2&&wa(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),R){case 1:_n(a,5);break;case 4:_n(a,10);break;case 3:_n(a,6);break;default:_n(a,2)}}}function Vl(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function _n(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),p=a.Ua;const R=!p;p=new Ct(p||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||os(p,"https"),Ai(p),R?Qg(p.toString(),d):Jg(p.toString(),d)}else Le(2);a.I=0,a.l&&a.l.pa(l),Dl(a),Al(a)}r.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Le(2)):(this.j.info("Failed to ping google.com"),Le(1))};function Dl(a){if(a.I=0,a.ja=[],a.l){const l=ul(a.h);(l.length!=0||a.i.length!=0)&&(V(a.ja,l),V(a.ja,a.i),a.h.i.length=0,v(a.i),a.i.length=0),a.l.oa()}}function kl(a,l,d){var p=d instanceof Ct?rt(d):new Ct(d);if(p.g!="")l&&(p.g=l+"."+p.g),as(p,p.u);else{var R=o.location;p=R.protocol,l=l?l+"."+R.hostname:R.hostname,R=+R.port;const P=new Ct(null);p&&os(P,p),l&&(P.g=l),R&&as(P,R),d&&(P.h=d),p=P}return d=a.G,l=a.wa,d&&l&&ue(p,d,l),ue(p,"VER",a.ka),ms(a,p),p}function Nl(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new ge(new Ia({ab:d})):new ge(a.ma),l.Fa(a.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function xl(){}r=xl.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Vi(){}Vi.prototype.g=function(a,l){return new Ke(a,l)};function Ke(a,l){De.call(this),this.g=new vl(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!y(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Xn(this)}m(Ke,De),Ke.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ke.prototype.close=function(){Ta(this.g)},Ke.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=ca(a),a=d);l.i.push(new qg(l.Ya++,a)),l.I==3&&Pi(l)},Ke.prototype.N=function(){this.g.l=null,delete this.j,Ta(this.g),delete this.g,Ke.Z.N.call(this)};function Ol(a){ua.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}m(Ol,ua);function Ml(){la.call(this),this.status=1}m(Ml,la);function Xn(a){this.g=a}m(Xn,xl),Xn.prototype.ra=function(){Me(this.g,"a")},Xn.prototype.qa=function(a){Me(this.g,new Ol(a))},Xn.prototype.pa=function(a){Me(this.g,new Ml)},Xn.prototype.oa=function(){Me(this.g,"b")},Vi.prototype.createWebChannel=Vi.prototype.g,Ke.prototype.send=Ke.prototype.o,Ke.prototype.open=Ke.prototype.m,Ke.prototype.close=Ke.prototype.close,Df=function(){return new Vi},Vf=function(){return Ti()},Cf=mn,za={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},wi.NO_ERROR=0,wi.TIMEOUT=8,wi.HTTP_ERROR=6,Gi=wi,Xu.COMPLETE="complete",Pf=Xu,Hu.EventType=es,es.OPEN="a",es.CLOSE="b",es.ERROR="c",es.MESSAGE="d",De.prototype.listen=De.prototype.J,Ts=Hu,ge.prototype.listenOnce=ge.prototype.K,ge.prototype.getLastError=ge.prototype.Ha,ge.prototype.getLastErrorCode=ge.prototype.ya,ge.prototype.getStatus=ge.prototype.ca,ge.prototype.getResponseJson=ge.prototype.La,ge.prototype.getResponseText=ge.prototype.la,ge.prototype.send=ge.prototype.ea,ge.prototype.setWithCredentials=ge.prototype.Fa,Sf=ge}).apply(typeof Ni<"u"?Ni:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Se.UNAUTHENTICATED=new Se(null),Se.GOOGLE_CREDENTIALS=new Se("google-credentials-uid"),Se.FIRST_PARTY=new Se("first-party-uid"),Se.MOCK_USER=new Se("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qr="12.12.0";function NE(r){qr=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt=new Ic("@firebase/firestore");function ir(){return Jt.logLevel}function xE(r){Jt.setLogLevel(r)}function N(r,...e){if(Jt.logLevel<=Q.DEBUG){const t=e.map(Pc);Jt.debug(`Firestore (${qr}): ${r}`,...t)}}function _e(r,...e){if(Jt.logLevel<=Q.ERROR){const t=e.map(Pc);Jt.error(`Firestore (${qr}): ${r}`,...t)}}function Ge(r,...e){if(Jt.logLevel<=Q.WARN){const t=e.map(Pc);Jt.warn(`Firestore (${qr}): ${r}`,...t)}}function Pc(r){if(typeof r=="string")return r;try{return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,kf(r,n,t)}function kf(r,e,t){let n=`FIRESTORE (${qr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw _e(n),new Error(n)}function U(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||kf(e,s,n)}function OE(r,e){r||L(57014,e)}function O(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class C extends vt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class xf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Se.UNAUTHENTICATED)))}shutdown(){}}class ME{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class LE{constructor(e){this.t=e,this.currentUser=Se.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){U(this.o===void 0,42304);let n=this.i;const s=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let i=new Ce;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ce,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ce)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(U(typeof n.accessToken=="string",31837,{l:n}),new Nf(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return U(e===null||typeof e=="string",2055,{h:e}),new Se(e)}}class FE{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Se.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class UE{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new FE(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Se.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class $a{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class BE{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ye(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){U(this.o===void 0,3512);const n=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>n(i)))};const s=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new $a(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(U(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new $a(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class qE{getToken(){return Promise.resolve(new $a(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jE(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=jE(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function $(r,e){return r<e?-1:r>e?1:0}function Ga(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return Ca(s)===Ca(i)?$(s,i):Ca(s)?1:-1}return $(r.length,e.length)}const zE=55296,$E=57343;function Ca(r){const e=r.charCodeAt(0);return e>=zE&&e<=$E}function _r(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}function Of(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka="__name__";class it{constructor(e,t,n){t===void 0?t=0:t>e.length&&L(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&L(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return it.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof it?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=it.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return $(e.length,t.length)}static compareSegments(e,t){const n=it.isNumericId(e),s=it.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?it.extractNumericId(e).compare(it.extractNumericId(t)):Ga(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Wt.fromString(e.substring(4,e.length-2))}}class H extends it{construct(e,t,n){return new H(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new C(b.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new H(t)}static emptyPath(){return new H([])}}const GE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class he extends it{construct(e,t,n){return new he(e,t,n)}static isValidIdentifier(e){return GE.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),he.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ka}static keyField(){return new he([Ka])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new C(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new C(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new C(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(n+=c,s++):(i(),s++)}if(i(),o)throw new C(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new he(t)}static emptyPath(){return new he([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(H.fromString(e))}static fromName(e){return new x(H.fromString(e).popFirst(5))}static empty(){return new x(H.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&H.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return H.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new H(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cc(r,e,t){if(!t)throw new C(b.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function Mf(r,e,t,n){if(e===!0&&n===!0)throw new C(b.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function lh(r){if(!x.isDocumentKey(r))throw new C(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function hh(r){if(x.isDocumentKey(r))throw new C(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Lf(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Do(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":L(12329,{type:typeof r})}function W(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new C(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Do(r);throw new C(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function Ff(r,e){if(e<=0)throw new C(b.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(r,e){const t={typeString:r};return e&&(t.value=e),t}function $n(r,e){if(!Lf(r))throw new C(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const o=r[n];if(s&&typeof o!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new C(b.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh=-62135596800,fh=1e6;class te{static now(){return te.fromMillis(Date.now())}static fromDate(e){return te.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*fh);return new te(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new C(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new C(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<dh)throw new C(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new C(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/fh}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:te._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if($n(e,te._jsonSchema))return new te(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-dh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}te._jsonSchemaVersion="firestore/timestamp/1.0",te._jsonSchema={type:Ee("string",te._jsonSchemaVersion),seconds:Ee("number"),nanoseconds:Ee("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{static fromTimestamp(e){return new B(e)}static min(){return new B(new te(0,0))}static max(){return new B(new te(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=-1;class Ir{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function Ha(r){return r.fields.find((e=>e.kind===2))}function Tn(r){return r.fields.filter((e=>e.kind!==2))}function KE(r,e){let t=$(r.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let n=0;n<Math.min(r.fields.length,e.fields.length);++n)if(t=HE(r.fields[n],e.fields[n]),t!==0)return t;return $(r.fields.length,e.fields.length)}Ir.UNKNOWN_ID=-1;class Vn{constructor(e,t){this.fieldPath=e,this.kind=t}}function HE(r,e){const t=he.comparator(r.fieldPath,e.fieldPath);return t!==0?t:$(r.kind,e.kind)}class Er{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Er(0,Qe.min())}}function Uf(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=B.fromTimestamp(n===1e9?new te(t+1,0):new te(t,n));return new Qe(s,x.empty(),e)}function Bf(r){return new Qe(r.readTime,r.key,yr)}class Qe{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Qe(B.min(),x.empty(),yr)}static max(){return new Qe(B.max(),x.empty(),yr)}}function Vc(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(r.documentKey,e.documentKey),t!==0?t:$(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class jf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function on(r){if(r.code!==b.FAILED_PRECONDITION||r.message!==qf)throw r;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):A.reject(t)}static resolve(e){return new A(((t,n)=>{t(e)}))}static reject(e){return new A(((t,n)=>{n(e)}))}static waitFor(e){return new A(((t,n)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>n(u)))})),o=!0,i===s&&t()}))}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next((s=>s?A.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new A(((n,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{o[h]=f,++c,c===i&&n(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new A(((n,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He="SimpleDb";class ko{static open(e,t,n,s){try{return new ko(t,e.transaction(s,n))}catch(i){throw new bs(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Ce,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new bs(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=Dc(n.target.error);this.S.reject(new bs(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(N(He,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new QE(t)}}class lt{static delete(e){return N(He,"Removing database:",e),vn(Md().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!zd())return!1;if(lt.F())return!0;const e=we(),t=lt.M(e),n=0<t&&t<10,s=zf(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,lt.M(we())===12.2&&_e("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(N(He,"Opening database:",this.name),this.db=await new Promise(((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new bs(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new C(b.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new C(b.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new bs(e,o))},s.onupgradeneeded=i=>{N(He,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next((()=>{N(He,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=ko.open(this.db,e,i?"readonly":"readwrite",n),u=s(c).next((h=>(c.C(),h))).catch((h=>(c.abort(h),A.reject(h)))).toPromise();return u.catch((()=>{})),await c.D,u}catch(c){const u=c,h=u.name!=="FirebaseError"&&o<3;if(N(He,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function zf(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class WE{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return vn(this.U.delete())}}class bs extends C{constructor(e,t){super(b.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function an(r){return r.name==="IndexedDbTransactionError"}class QE{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(N(He,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(N(He,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),vn(n)}add(e){return N(He,"ADD",this.store.name,e,e),vn(this.store.add(e))}get(e){return vn(this.store.get(e)).next((t=>(t===void 0&&(t=null),N(He,"GET",this.store.name,e,t),t)))}delete(e){return N(He,"DELETE",this.store.name,e),vn(this.store.delete(e))}count(){return N(He,"COUNT",this.store.name),vn(this.store.count())}J(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A(((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}}))}{const i=this.cursor(n),o=[];return this.H(i,((c,u)=>{o.push(u)})).next((()=>o))}}Z(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A(((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}}))}X(e,t){N(He,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const s=this.cursor(n);return this.H(s,((i,o,c)=>c.delete()))}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.H(s,t)}te(e){const t=this.cursor({});return new A(((n,s)=>{t.onerror=i=>{const o=Dc(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():n()})):n()}}))}H(e,t){const n=[];return new A(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new WE(c),h=t(c.primaryKey,c.value,u);if(h instanceof A){const f=h.catch((m=>(u.done(),A.reject(m))));n.push(f)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}})).next((()=>A.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function vn(r){return new A(((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=Dc(n.target.error);t(s)}}))}let mh=!1;function Dc(r){const e=lt.M(we());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new C("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return mh||(mh=!0,setTimeout((()=>{throw n}),0)),n}}return r}const Ss="IndexBackfiller";class JE{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){N(Ss,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();N(Ss,`Documents written: ${t}`)}catch(t){an(t)?N(Ss,"Ignoring IndexedDB error during index backfill: ",t):await on(t)}await this.re(6e4)}))}}class YE{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const n=new Set;let s=t,i=!0;return A.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!n.has(o))return N(Ss,`Processing collection: ${o}`),this.oe(e,o,s).next((c=>{s-=c,n.add(o)}));i=!1})))).next((()=>t-s))}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(s,i))).next((c=>(N(Ss,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let n=e;return t.changes.forEach(((s,i)=>{const o=Bf(i);Vc(o,n)>0&&(n=o)})),new Qe(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Be.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt=-1;function ri(r){return r==null}function Fs(r){return r===0&&1/r==-1/0}function $f(r){return typeof r=="number"&&Number.isInteger(r)&&!Fs(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lo="";function xe(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=ph(e)),e=XE(r.get(t),e);return ph(e)}function XE(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case lo:t+="";break;default:t+=i}}return t}function ph(r){return r+lo+""}function at(r){const e=r.length;if(U(e>=2,64408,{path:r}),e===2)return U(r.charAt(0)===lo&&r.charAt(1)==="",56145,{path:r}),H.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(lo,i);switch((o<0||o>t)&&L(50515,{path:r}),r.charAt(o+1)){case"":const c=r.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),n.push(u);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:L(61167,{path:r})}i=o+2}return new H(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn="remoteDocuments",si="owner",Zn="owner",Us="mutationQueues",ZE="userId",Je="mutations",gh="batchId",Pn="userMutationsIndex",_h=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(r,e){return[r,xe(e)]}function Gf(r,e,t){return[r,xe(e),t]}const eT={},Tr="documentMutations",ho="remoteDocumentsV14",tT=["prefixPath","collectionGroup","readTime","documentId"],Hi="documentKeyIndex",nT=["prefixPath","collectionGroup","documentId"],Kf="collectionGroupIndex",rT=["collectionGroup","readTime","prefixPath","documentId"],Bs="remoteDocumentGlobal",Wa="remoteDocumentGlobalKey",wr="targets",Hf="queryTargetsIndex",sT=["canonicalId","targetId"],vr="targetDocuments",iT=["targetId","path"],kc="documentTargetsIndex",oT=["path","targetId"],fo="targetGlobalKey",Dn="targetGlobal",qs="collectionParents",aT=["collectionId","parent"],Ar="clientMetadata",cT="clientId",No="bundles",uT="bundleId",xo="namedQueries",lT="name",Nc="indexConfiguration",hT="indexId",Qa="collectionGroupIndex",dT="collectionGroup",Ps="indexState",fT=["indexId","uid"],Wf="sequenceNumberIndex",mT=["uid","sequenceNumber"],Cs="indexEntries",pT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Qf="documentKeyIndex",gT=["indexId","uid","orderedDocumentKey"],Oo="documentOverlays",_T=["userId","collectionPath","documentId"],Ja="collectionPathOverlayIndex",yT=["userId","collectionPath","largestBatchId"],Jf="collectionGroupOverlayIndex",IT=["userId","collectionGroup","largestBatchId"],xc="globals",ET="name",Yf=[Us,Je,Tr,wn,wr,si,Dn,vr,Ar,Bs,qs,No,xo],TT=[...Yf,Oo],Xf=[Us,Je,Tr,ho,wr,si,Dn,vr,Ar,Bs,qs,No,xo,Oo],Zf=Xf,Oc=[...Zf,Nc,Ps,Cs],wT=Oc,em=[...Oc,xc],vT=em;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya extends jf{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Ae(r,e){const t=O(r);return lt.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yh(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function cn(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function tm(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function nm(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){this.comparator=e,this.root=t||Ve.EMPTY}insert(e,t){return new ce(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ve.BLACK,null,null))}remove(e){return new ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ve.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new xi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new xi(this.root,e,this.comparator,!1)}getReverseIterator(){return new xi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new xi(this.root,e,this.comparator,!0)}}class xi{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ve{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??Ve.RED,this.left=s??Ve.EMPTY,this.right=i??Ve.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Ve(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ve.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ve.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ve.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ve.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw L(43730,{key:this.key,value:this.value});if(this.right.isRed())throw L(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw L(27949);return e+(this.isRed()?0:1)}}Ve.EMPTY=null,Ve.RED=!0,Ve.BLACK=!1;Ve.EMPTY=new class{constructor(){this.size=0}get key(){throw L(57766)}get value(){throw L(16141)}get color(){throw L(16727)}get left(){throw L(29726)}get right(){throw L(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new Ve(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ih(this.data.getIterator())}getIteratorFrom(e){return new Ih(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof se)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new se(this.comparator);return t.data=e,t}}class Ih{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function er(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this.fields=e,e.sort(he.comparator)}static empty(){return new qe([])}unionWith(e){let t=new se(he.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new qe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return _r(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AT(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new rm("Invalid base64 string: "+i):i}})(e);return new pe(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new pe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}pe.EMPTY_BYTE_STRING=new pe("");const RT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Et(r){if(U(!!r,39018),typeof r=="string"){let e=0;const t=RT.exec(r);if(U(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:de(r.seconds),nanos:de(r.nanos)}}function de(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Tt(r){return typeof r=="string"?pe.fromBase64String(r):pe.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm="server_timestamp",im="__type__",om="__previous_value__",am="__local_write_time__";function Mo(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[im])==null?void 0:n.stringValue)===sm}function Lo(r){const e=r.mapValue.fields[om];return Mo(e)?Lo(e):e}function js(r){const e=Et(r.mapValue.fields[am].timestampValue);return new te(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bT{constructor(e,t,n,s,i,o,c,u,h,f,m){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=m}}const zs="(default)";class Yt{constructor(e,t){this.projectId=e,this.database=t||zs}static empty(){return new Yt("","")}get isDefaultDatabase(){return this.database===zs}isEqual(e){return e instanceof Yt&&e.projectId===this.projectId&&e.database===this.database}}function ST(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new C(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Yt(r.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mc="__type__",cm="__max__",$t={mapValue:{fields:{__type__:{stringValue:cm}}}},Lc="__vector__",Rr="value",Wi={nullValue:"NULL_VALUE"};function Xt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Mo(r)?4:um(r)?9007199254740991:Fo(r)?10:11:L(28295,{value:r})}function ft(r,e){if(r===e)return!0;const t=Xt(r);if(t!==Xt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return js(r).isEqual(js(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Et(s.timestampValue),c=Et(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(s,i){return Tt(s.bytesValue).isEqual(Tt(i.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(s,i){return de(s.geoPointValue.latitude)===de(i.geoPointValue.latitude)&&de(s.geoPointValue.longitude)===de(i.geoPointValue.longitude)})(r,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return de(s.integerValue)===de(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=de(s.doubleValue),c=de(i.doubleValue);return o===c?Fs(o)===Fs(c):isNaN(o)&&isNaN(c)}return!1})(r,e);case 9:return _r(r.arrayValue.values||[],e.arrayValue.values||[],ft);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(yh(o)!==yh(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!ft(o[u],c[u])))return!1;return!0})(r,e);default:return L(52216,{left:r})}}function $s(r,e){return(r.values||[]).find((t=>ft(t,e)))!==void 0}function Zt(r,e){if(r===e)return 0;const t=Xt(r),n=Xt(e);if(t!==n)return $(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return $(r.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=de(i.integerValue||i.doubleValue),u=de(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(r,e);case 3:return Eh(r.timestampValue,e.timestampValue);case 4:return Eh(js(r),js(e));case 5:return Ga(r.stringValue,e.stringValue);case 6:return(function(i,o){const c=Tt(i),u=Tt(o);return c.compareTo(u)})(r.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=$(c[h],u[h]);if(f!==0)return f}return $(c.length,u.length)})(r.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=$(de(i.latitude),de(o.latitude));return c!==0?c:$(de(i.longitude),de(o.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return Th(r.arrayValue,e.arrayValue);case 10:return(function(i,o){var g,v,V,D;const c=i.fields||{},u=o.fields||{},h=(g=c[Rr])==null?void 0:g.arrayValue,f=(v=u[Rr])==null?void 0:v.arrayValue,m=$(((V=h==null?void 0:h.values)==null?void 0:V.length)||0,((D=f==null?void 0:f.values)==null?void 0:D.length)||0);return m!==0?m:Th(h,f)})(r.mapValue,e.mapValue);case 11:return(function(i,o){if(i===$t.mapValue&&o===$t.mapValue)return 0;if(i===$t.mapValue)return 1;if(o===$t.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const g=Ga(u[m],f[m]);if(g!==0)return g;const v=Zt(c[u[m]],h[f[m]]);if(v!==0)return v}return $(u.length,f.length)})(r.mapValue,e.mapValue);default:throw L(23264,{he:t})}}function Eh(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return $(r,e);const t=Et(r),n=Et(e),s=$(t.seconds,n.seconds);return s!==0?s:$(t.nanos,n.nanos)}function Th(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=Zt(t[s],n[s]);if(i)return i}return $(t.length,n.length)}function br(r){return Xa(r)}function Xa(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=Et(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return Tt(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return x.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=Xa(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${Xa(t.fields[o])}`;return s+"}"})(r.mapValue):L(61005,{value:r})}function Qi(r){switch(Xt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Lo(r);return e?16+Qi(e):16;case 5:return 2*r.stringValue.length;case 6:return Tt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+Qi(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return cn(n.fields,((i,o)=>{s+=i.length+Qi(o)})),s})(r.mapValue);default:throw L(13486,{value:r})}}function On(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Za(r){return!!r&&"integerValue"in r}function Gs(r){return!!r&&"arrayValue"in r}function wh(r){return!!r&&"nullValue"in r}function vh(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Ji(r){return!!r&&"mapValue"in r}function Fo(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[Mc])==null?void 0:n.stringValue)===Lc}function Vs(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return cn(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Vs(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Vs(r.arrayValue.values[t]);return e}return{...r}}function um(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===cm}const lm={mapValue:{fields:{[Mc]:{stringValue:Lc},[Rr]:{arrayValue:{}}}}};function PT(r){return"nullValue"in r?Wi:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?On(Yt.empty(),x.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Fo(r)?lm:{mapValue:{}}:L(35942,{value:r})}function CT(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?On(Yt.empty(),x.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?lm:"mapValue"in r?Fo(r)?{mapValue:{}}:$t:L(61959,{value:r})}function Ah(r,e){const t=Zt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Rh(r,e){const t=Zt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.value=e}static empty(){return new Pe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Ji(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Vs(t)}setAll(e){let t=he.emptyPath(),n={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,s),n={},s=[],t=c.popLast()}o?n[c.lastSegment()]=Vs(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Ji(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ft(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Ji(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){cn(t,((s,i)=>e[s]=i));for(const s of n)delete e[s]}clone(){return new Pe(Vs(this.value))}}function hm(r){const e=[];return cn(r.fields,((t,n)=>{const s=new he([t]);if(Ji(n)){const i=hm(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new qe(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t,n,s,i,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new le(e,0,B.min(),B.min(),B.min(),Pe.empty(),0)}static newFoundDocument(e,t,n,s){return new le(e,1,t,B.min(),n,s,0)}static newNoDocument(e,t){return new le(e,2,t,B.min(),B.min(),Pe.empty(),0)}static newUnknownDocument(e,t){return new le(e,3,t,B.min(),B.min(),Pe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Pe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Pe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof le&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new le(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,t){this.position=e,this.inclusive=t}}function bh(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=x.comparator(x.fromName(o.referenceValue),t.key):n=Zt(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Sh(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!ft(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e,t="asc"){this.field=e,this.dir=t}}function VT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{}class J extends dm{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new DT(e,t,n):t==="array-contains"?new xT(e,n):t==="in"?new ym(e,n):t==="not-in"?new OT(e,n):t==="array-contains-any"?new MT(e,n):new J(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new kT(e,n):new NT(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Zt(t,this.value)):t!==null&&Xt(this.value)===Xt(t)&&this.matchesComparison(Zt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ne extends dm{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ne(e,t)}matches(e){return Sr(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Sr(r){return r.op==="and"}function ec(r){return r.op==="or"}function Fc(r){return fm(r)&&Sr(r)}function fm(r){for(const e of r.filters)if(e instanceof ne)return!1;return!0}function tc(r){if(r instanceof J)return r.field.canonicalString()+r.op.toString()+br(r.value);if(Fc(r))return r.filters.map((e=>tc(e))).join(",");{const e=r.filters.map((t=>tc(t))).join(",");return`${r.op}(${e})`}}function mm(r,e){return r instanceof J?(function(n,s){return s instanceof J&&n.op===s.op&&n.field.isEqual(s.field)&&ft(n.value,s.value)})(r,e):r instanceof ne?(function(n,s){return s instanceof ne&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,o,c)=>i&&mm(o,s.filters[c])),!0):!1})(r,e):void L(19439)}function pm(r,e){const t=r.filters.concat(e);return ne.create(t,r.op)}function gm(r){return r instanceof J?(function(t){return`${t.field.canonicalString()} ${t.op} ${br(t.value)}`})(r):r instanceof ne?(function(t){return t.op.toString()+" {"+t.getFilters().map(gm).join(" ,")+"}"})(r):"Filter"}class DT extends J{constructor(e,t,n){super(e,t,n),this.key=x.fromName(n.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class kT extends J{constructor(e,t){super(e,"in",t),this.keys=_m("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class NT extends J{constructor(e,t){super(e,"not-in",t),this.keys=_m("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function _m(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((n=>x.fromName(n.referenceValue)))}class xT extends J{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Gs(t)&&$s(t.arrayValue,this.value)}}class ym extends J{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&$s(this.value.arrayValue,t)}}class OT extends J{constructor(e,t){super(e,"not-in",t)}matches(e){if($s(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!$s(this.value.arrayValue,t)}}class MT extends J{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Gs(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>$s(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LT{constructor(e,t=null,n=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function nc(r,e=null,t=[],n=[],s=null,i=null,o=null){return new LT(r,e,t,n,s,i,o)}function Mn(r){const e=O(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>tc(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),ri(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>br(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>br(n))).join(",")),e.Te=t}return e.Te}function ii(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!VT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!mm(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Sh(r.startAt,e.startAt)&&Sh(r.endAt,e.endAt)}function mo(r){return x.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function po(r,e){return r.filters.filter((t=>t instanceof J&&t.field.isEqual(e)))}function Ph(r,e,t){let n=Wi,s=!0;for(const i of po(r,e)){let o=Wi,c=!0;switch(i.op){case"<":case"<=":o=PT(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Wi}Ah({value:n,inclusive:s},{value:o,inclusive:c})<0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Ah({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function Ch(r,e,t){let n=$t,s=!0;for(const i of po(r,e)){let o=$t,c=!0;switch(i.op){case">=":case">":o=CT(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=$t}Rh({value:n,inclusive:s},{value:o,inclusive:c})>0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Rh({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e,t=null,n=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function Im(r,e,t,n,s,i,o,c){return new At(r,e,t,n,s,i,o,c)}function jr(r){return new At(r)}function Vh(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function FT(r){return x.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Uc(r){return r.collectionGroup!==null}function dr(r){const e=O(r);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new se(he.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new Ks(i,n))})),t.has(he.keyField().canonicalString())||e.Ee.push(new Ks(he.keyField(),n))}return e.Ee}function Oe(r){const e=O(r);return e.Ie||(e.Ie=Tm(e,dr(r))),e.Ie}function Em(r){const e=O(r);return e.Re||(e.Re=Tm(e,r.explicitOrderBy)),e.Re}function Tm(r,e){if(r.limitType==="F")return nc(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Ks(s.field,i)}));const t=r.endAt?new en(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new en(r.startAt.position,r.startAt.inclusive):null;return nc(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function rc(r,e){const t=r.filters.concat([e]);return new At(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function UT(r,e){const t=r.explicitOrderBy.concat([e]);return new At(r.path,r.collectionGroup,t,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function go(r,e,t){return new At(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function BT(r,e){return new At(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,e,r.endAt)}function qT(r,e){return new At(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,r.startAt,e)}function oi(r,e){return ii(Oe(r),Oe(e))&&r.limitType===e.limitType}function wm(r){return`${Mn(Oe(r))}|lt:${r.limitType}`}function or(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>gm(s))).join(", ")}]`),ri(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>br(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>br(s))).join(",")),`Target(${n})`})(Oe(r))}; limitType=${r.limitType})`}function ai(r,e){return e.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):x.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(const i of dr(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(o,c,u){const h=bh(o,c,u);return o.inclusive?h<=0:h<0})(n.startAt,dr(n),s)||n.endAt&&!(function(o,c,u){const h=bh(o,c,u);return o.inclusive?h>=0:h>0})(n.endAt,dr(n),s))})(r,e)}function vm(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Am(r){return(e,t)=>{let n=!1;for(const s of dr(r)){const i=jT(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function jT(r,e,t){const n=r.field.isKeyField()?x.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?Zt(u,h):L(42886)})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){cn(this.inner,((t,n)=>{for(const[s,i]of n)e(s,i)}))}isEmpty(){return nm(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zT=new ce(x.comparator);function je(){return zT}const Rm=new ce(x.comparator);function ws(...r){let e=Rm;for(const t of r)e=e.insert(t.key,t);return e}function bm(r){let e=Rm;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function ct(){return Ds()}function Sm(){return Ds()}function Ds(){return new Rt((r=>r.toString()),((r,e)=>r.isEqual(e)))}const $T=new ce(x.comparator),GT=new se(x.comparator);function G(...r){let e=GT;for(const t of r)e=e.add(t);return e}const KT=new se($);function Bc(){return KT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qc(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Fs(e)?"-0":e}}function Pm(r){return{integerValue:""+r}}function Cm(r,e){return $f(e)?Pm(e):qc(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(){this._=void 0}}function HT(r,e,t){return r instanceof Pr?(function(s,i){const o={fields:{[im]:{stringValue:sm},[am]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Mo(i)&&(i=Lo(i)),i&&(o.fields[om]=i),{mapValue:o}})(t,e):r instanceof Ln?Dm(r,e):r instanceof Fn?km(r,e):(function(s,i){const o=Vm(s,i),c=Dh(o)+Dh(s.Ae);return Za(o)&&Za(s.Ae)?Pm(c):qc(s.serializer,c)})(r,e)}function WT(r,e,t){return r instanceof Ln?Dm(r,e):r instanceof Fn?km(r,e):t}function Vm(r,e){return r instanceof Cr?(function(n){return Za(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(e)?e:{integerValue:0}:null}class Pr extends Uo{}class Ln extends Uo{constructor(e){super(),this.elements=e}}function Dm(r,e){const t=Nm(e);for(const n of r.elements)t.some((s=>ft(s,n)))||t.push(n);return{arrayValue:{values:t}}}class Fn extends Uo{constructor(e){super(),this.elements=e}}function km(r,e){let t=Nm(e);for(const n of r.elements)t=t.filter((s=>!ft(s,n)));return{arrayValue:{values:t}}}class Cr extends Uo{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Dh(r){return de(r.integerValue||r.doubleValue)}function Nm(r){return Gs(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e,t){this.field=e,this.transform=t}}function QT(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof Ln&&s instanceof Ln||n instanceof Fn&&s instanceof Fn?_r(n.elements,s.elements,ft):n instanceof Cr&&s instanceof Cr?ft(n.Ae,s.Ae):n instanceof Pr&&s instanceof Pr})(r.transform,e.transform)}class JT{constructor(e,t){this.version=e,this.transformResults=t}}class fe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new fe}static exists(e){return new fe(void 0,e)}static updateTime(e){return new fe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Yi(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Bo{}function xm(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new $r(r.key,fe.none()):new zr(r.key,r.data,fe.none());{const t=r.data,n=Pe.empty();let s=new se(he.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new bt(r.key,n,new qe(s.toArray()),fe.none())}}function YT(r,e,t){r instanceof zr?(function(s,i,o){const c=s.value.clone(),u=Nh(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(r,e,t):r instanceof bt?(function(s,i,o){if(!Yi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Nh(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Om(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(r,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function ks(r,e,t,n){return r instanceof zr?(function(i,o,c,u){if(!Yi(i.precondition,o))return c;const h=i.value.clone(),f=xh(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(r,e,t,n):r instanceof bt?(function(i,o,c,u){if(!Yi(i.precondition,o))return c;const h=xh(i.fieldTransforms,u,o),f=o.data;return f.setAll(Om(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(r,e,t,n):(function(i,o,c){return Yi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(r,e,t)}function XT(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=Vm(n.transform,s||null);i!=null&&(t===null&&(t=Pe.empty()),t.set(n.field,i))}return t||null}function kh(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&_r(n,s,((i,o)=>QT(i,o)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class zr extends Bo{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class bt extends Bo{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Om(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function Nh(r,e,t){const n=new Map;U(r.length===t.length,32656,{Ve:t.length,de:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,c=e.data.field(i.field);n.set(i.field,WT(o,c,t[s]))}return n}function xh(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,HT(i,o,e))}return n}class $r extends Bo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class jc extends Bo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&YT(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=ks(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=ks(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Sm();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=xm(o,c);u!==null&&n.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(B.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),G())}isEqual(e){return this.batchId===e.batchId&&_r(this.mutations,e.mutations,((t,n)=>kh(t,n)))&&_r(this.baseMutations,e.baseMutations,((t,n)=>kh(t,n)))}}class $c{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){U(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=(function(){return $T})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new $c(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ie,Y;function Lm(r){switch(r){case b.OK:return L(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return L(15467,{code:r})}}function Fm(r){if(r===void 0)return _e("GRPC error has no .code"),b.UNKNOWN;switch(r){case Ie.OK:return b.OK;case Ie.CANCELLED:return b.CANCELLED;case Ie.UNKNOWN:return b.UNKNOWN;case Ie.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case Ie.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case Ie.INTERNAL:return b.INTERNAL;case Ie.UNAVAILABLE:return b.UNAVAILABLE;case Ie.UNAUTHENTICATED:return b.UNAUTHENTICATED;case Ie.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case Ie.NOT_FOUND:return b.NOT_FOUND;case Ie.ALREADY_EXISTS:return b.ALREADY_EXISTS;case Ie.PERMISSION_DENIED:return b.PERMISSION_DENIED;case Ie.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case Ie.ABORTED:return b.ABORTED;case Ie.OUT_OF_RANGE:return b.OUT_OF_RANGE;case Ie.UNIMPLEMENTED:return b.UNIMPLEMENTED;case Ie.DATA_LOSS:return b.DATA_LOSS;default:return L(39323,{code:r})}}(Y=Ie||(Ie={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ns=null;function ew(r){if(Ns)throw new Error("a TestingHooksSpi instance is already set");Ns=r}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Um(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tw=new Wt([4294967295,4294967295],0);function Oh(r){const e=Um().encode(r),t=new bf;return t.update(e),new Uint8Array(t.digest())}function Mh(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Wt([t,n],0),new Wt([s,i],0)]}class Kc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new vs(`Invalid padding: ${t}`);if(n<0)throw new vs(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new vs(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new vs(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Wt.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(Wt.fromNumber(n)));return s.compare(tw)===1&&(s=new Wt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Oh(e),[n,s]=Mh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);if(!this.we(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Kc(i,s,t);return n.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=Oh(e),[n,s]=Mh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class vs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,li.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new ui(B.min(),s,new ce($),je(),G())}}class li{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new li(n,t,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class Bm{constructor(e,t){this.targetId=e,this.Ce=t}}class qm{constructor(e,t,n=pe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Lh{constructor(){this.ve=0,this.Fe=Fh(),this.Me=pe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=G(),t=G(),n=G();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:L(38017,{changeType:i})}})),new li(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Fh()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,U(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class nw{constructor(e){this.Ge=e,this.ze=new Map,this.je=je(),this.Je=Oi(),this.He=Oi(),this.Ze=new ce($)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:L(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((n,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(mo(i))if(n===0){const o=new x(i.path);this.et(t,o,le.newNoDocument(o,B.min()))}else U(n===1,20013,{expectedCount:n});else{const o=this._t(t);if(o!==n){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}Ns==null||Ns.o((function(f,m,g,v,V){var F,j,q;const D={localCacheCount:f,existenceFilterCount:m.count,databaseId:g.database,projectId:g.projectId},k=m.unchangedNames;return k&&(D.bloomFilter={applied:V===0,hashCount:(k==null?void 0:k.hashCount)??0,bitmapLength:((j=(F=k==null?void 0:k.bits)==null?void 0:F.bitmap)==null?void 0:j.length)??0,padding:((q=k==null?void 0:k.bits)==null?void 0:q.padding)??0,mightContain:ee=>(v==null?void 0:v.mightContain(ee))??!1}),D})(o,e.Ce,this.Ge.ht(),c,u))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Tt(n).toUint8Array()}catch(u){if(u instanceof rm)return Ge("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Kc(o,s,i)}catch(u){return Ge(u instanceof vs?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&mo(c.target)){const u=new x(c.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,le.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let n=G();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(n=n.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new ui(e,t,this.Ze,this.je,n);return this.je=je(),this.Je=Oi(),this.He=Oi(),this.Ze=new ce($),s}Ye(e,t){if(!this.rt(e))return;const n=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Lh,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new se($),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new se($),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Lh),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Oi(){return new ce(x.comparator)}function Fh(){return new ce(x.comparator)}const rw={asc:"ASCENDING",desc:"DESCENDING"},sw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},iw={and:"AND",or:"OR"};class ow{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function sc(r,e){return r.useProto3Json||ri(e)?e:{value:e}}function Vr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function jm(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function aw(r,e){return Vr(r,e.toTimestamp())}function ye(r){return U(!!r,49232),B.fromTimestamp((function(t){const n=Et(t);return new te(n.seconds,n.nanos)})(r))}function Hc(r,e){return ic(r,e).canonicalString()}function ic(r,e){const t=(function(s){return new H(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function zm(r){const e=H.fromString(r);return U(Xm(e),10190,{key:e.toString()}),e}function Hs(r,e){return Hc(r.databaseId,e.path)}function ht(r,e){const t=zm(e);if(t.get(1)!==r.databaseId.projectId)throw new C(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new C(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new x(Km(t))}function $m(r,e){return Hc(r.databaseId,e)}function Gm(r){const e=zm(r);return e.length===4?H.emptyPath():Km(e)}function oc(r){return new H(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Km(r){return U(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Uh(r,e,t){return{name:Hs(r,e),fields:t.value.mapValue.fields}}function qo(r,e,t){const n=ht(r,e.name),s=ye(e.updateTime),i=e.createTime?ye(e.createTime):B.min(),o=new Pe({mapValue:{fields:e.fields}}),c=le.newFoundDocument(n,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function cw(r,e){return"found"in e?(function(n,s){U(!!s.found,43571),s.found.name,s.found.updateTime;const i=ht(n,s.found.name),o=ye(s.found.updateTime),c=s.found.createTime?ye(s.found.createTime):B.min(),u=new Pe({mapValue:{fields:s.found.fields}});return le.newFoundDocument(i,o,c,u)})(r,e):"missing"in e?(function(n,s){U(!!s.missing,3894),U(!!s.readTime,22933);const i=ht(n,s.missing),o=ye(s.readTime);return le.newNoDocument(i,o)})(r,e):L(7234,{result:e})}function uw(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:L(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(U(f===void 0||typeof f=="string",58123),pe.fromBase64String(f||"")):(U(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),pe.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?b.UNKNOWN:Fm(h.code);return new C(f,h.message||"")})(o);t=new qm(n,s,i,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=ht(r,n.document.name),i=ye(n.document.updateTime),o=n.document.createTime?ye(n.document.createTime):B.min(),c=new Pe({mapValue:{fields:n.document.fields}}),u=le.newFoundDocument(s,i,o,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new Xi(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=ht(r,n.document),i=n.readTime?ye(n.readTime):B.min(),o=le.newNoDocument(s,i),c=n.removedTargetIds||[];t=new Xi([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=ht(r,n.document),i=n.removedTargetIds||[];t=new Xi([],i,s,null)}else{if(!("filter"in e))return L(11601,{Vt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new ZT(s,i),c=n.targetId;t=new Bm(c,o)}}return t}function Ws(r,e){let t;if(e instanceof zr)t={update:Uh(r,e.key,e.value)};else if(e instanceof $r)t={delete:Hs(r,e.key)};else if(e instanceof bt)t={update:Uh(r,e.key,e.data),updateMask:pw(e.fieldMask)};else{if(!(e instanceof jc))return L(16599,{dt:e.type});t={verify:Hs(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,o){const c=o.transform;if(c instanceof Pr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ln)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Fn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Cr)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw L(20930,{transform:o.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:aw(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:L(27497)})(r,e.precondition)),t}function ac(r,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?fe.updateTime(ye(i.updateTime)):i.exists!==void 0?fe.exists(i.exists):fe.none()})(e.currentDocument):fe.none(),n=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let u=null;if("setToServerValue"in c)U(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new Pr;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new Ln(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new Fn(f)}else"increment"in c?u=new Cr(o,c.increment):L(16584,{proto:c});const h=he.fromServerFormat(c.fieldPath);return new ci(h,u)})(r,s))):[];if(e.update){e.update.name;const s=ht(r,e.update.name),i=new Pe({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(u){const h=u.fieldPaths||[];return new qe(h.map((f=>he.fromServerFormat(f))))})(e.updateMask);return new bt(s,i,o,t,n)}return new zr(s,i,t,n)}if(e.delete){const s=ht(r,e.delete);return new $r(s,t)}if(e.verify){const s=ht(r,e.verify);return new jc(s,t)}return L(1463,{proto:e})}function lw(r,e){return r&&r.length>0?(U(e!==void 0,14353),r.map((t=>(function(s,i){let o=s.updateTime?ye(s.updateTime):ye(i);return o.isEqual(B.min())&&(o=ye(i)),new JT(o,s.transformResults||[])})(t,e)))):[]}function Hm(r,e){return{documents:[$m(r,e.path)]}}function jo(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=$m(r,s);const i=(function(h){if(h.length!==0)return Ym(ne.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(g){return{field:jt(g.field),direction:dw(g.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=sc(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function Wm(r,e,t,n){const{ft:s,parent:i}=jo(r,e),o={},c=[];let u=0;return t.forEach((h=>{const f=n?h.alias:"aggregate_"+u++;o[f]=h.alias,h.aggregateType==="count"?c.push({alias:f,count:{}}):h.aggregateType==="avg"?c.push({alias:f,avg:{field:jt(h.fieldPath)}}):h.aggregateType==="sum"&&c.push({alias:f,sum:{field:jt(h.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function Qm(r){let e=Gm(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){U(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(m){const g=Jm(m);return g instanceof ne&&Fc(g)?g.getFilters():[g]})(t.where));let o=[];t.orderBy&&(o=(function(m){return m.map((g=>(function(V){return new Ks(ar(V.field),(function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(V.direction))})(g)))})(t.orderBy));let c=null;t.limit&&(c=(function(m){let g;return g=typeof m=="object"?m.value:m,ri(g)?null:g})(t.limit));let u=null;t.startAt&&(u=(function(m){const g=!!m.before,v=m.values||[];return new en(v,g)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const g=!m.before,v=m.values||[];return new en(v,g)})(t.endAt)),Im(e,s,o,i,c,"F",u,h)}function hw(r,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Jm(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=ar(t.unaryFilter.field);return J.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=ar(t.unaryFilter.field);return J.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=ar(t.unaryFilter.field);return J.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ar(t.unaryFilter.field);return J.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return L(61313);default:return L(60726)}})(r):r.fieldFilter!==void 0?(function(t){return J.create(ar(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return L(58110);default:return L(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return ne.create(t.compositeFilter.filters.map((n=>Jm(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L(1026)}})(t.compositeFilter.op))})(r):L(30097,{filter:r})}function dw(r){return rw[r]}function fw(r){return sw[r]}function mw(r){return iw[r]}function jt(r){return{fieldPath:r.canonicalString()}}function ar(r){return he.fromServerFormat(r.fieldPath)}function Ym(r){return r instanceof J?(function(t){if(t.op==="=="){if(vh(t.value))return{unaryFilter:{field:jt(t.field),op:"IS_NAN"}};if(wh(t.value))return{unaryFilter:{field:jt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(vh(t.value))return{unaryFilter:{field:jt(t.field),op:"IS_NOT_NAN"}};if(wh(t.value))return{unaryFilter:{field:jt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:jt(t.field),op:fw(t.op),value:t.value}}})(r):r instanceof ne?(function(t){const n=t.getFilters().map((s=>Ym(s)));return n.length===1?n[0]:{compositeFilter:{op:mw(t.op),filters:n}}})(r):L(54877,{filter:r})}function pw(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Xm(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function Zm(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,t,n,s,i=B.min(),o=B.min(),c=pe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new gt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e){this.yt=e}}function gw(r,e){let t;if(e.document)t=qo(r.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=x.fromSegments(e.noDocument.path),s=Bn(e.noDocument.readTime);t=le.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return L(56709);{const n=x.fromSegments(e.unknownDocument.path),s=Bn(e.unknownDocument.version);t=le.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime((function(s){const i=new te(s[0],s[1]);return B.fromTimestamp(i)})(e.readTime)),t}function Bh(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:_o(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(i,o){return{name:Hs(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Vr(i,o.version.toTimestamp()),createTime:Vr(i,o.createTime.toTimestamp())}})(r.yt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Un(e.version)};else{if(!e.isUnknownDocument())return L(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Un(e.version)}}return n}function _o(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function Un(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Bn(r){const e=new te(r.seconds,r.nanoseconds);return B.fromTimestamp(e)}function An(r,e){const t=(e.baseMutations||[]).map((i=>ac(r.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map((i=>ac(r.yt,i))),s=te.fromMillis(e.localWriteTimeMs);return new zc(e.batchId,s,t,n)}function As(r){const e=Bn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?Bn(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const o=i.documents.length;return U(o===1,1966,{count:o}),Oe(jr(Gm(i.documents[0])))})(r.query):(function(i){return Oe(Qm(i))})(r.query),new gt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,pe.fromBase64String(r.resumeToken))}function tp(r,e){const t=Un(e.snapshotVersion),n=Un(e.lastLimboFreeSnapshotVersion);let s;s=mo(e.target)?Hm(r.yt,e.target):jo(r.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Mn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function zo(r){const e=Qm({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?go(e,e.limit,"L"):e}function Va(r,e){return new Gc(e.largestBatchId,ac(r.yt,e.overlayMutation))}function qh(r,e){const t=e.path.lastSegment();return[r,xe(e.path.popLast()),t]}function jh(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:Un(n.readTime),documentKey:xe(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _w{getBundleMetadata(e,t){return zh(e).get(t).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:Bn(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(e,t){return zh(e).put((function(s){return{bundleId:s.id,createTime:Un(ye(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return $h(e).get(t).next((n=>{if(n)return(function(i){return{name:i.name,query:zo(i.bundledQuery),readTime:Bn(i.readTime)}})(n)}))}saveNamedQuery(e,t){return $h(e).put((function(s){return{name:s.name,readTime:Un(ye(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function zh(r){return Ae(r,No)}function $h(r){return Ae(r,xo)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new $o(e,n)}getOverlay(e,t){return ps(e).get(qh(this.userId,t)).next((n=>n?Va(this.serializer,n):null))}getOverlays(e,t){const n=ct();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){const s=[];return n.forEach(((i,o)=>{const c=new Gc(t,o);s.push(this.St(e,c))})),A.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach((o=>s.add(xe(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(ps(e).X(Ja,c))})),A.waitFor(i)}getOverlaysForCollection(e,t,n){const s=ct(),i=xe(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return ps(e).J(Ja,o).next((c=>{for(const u of c){const h=Va(this.serializer,u);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(e,t,n,s){const i=ct();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return ps(e).ee({index:Jf,range:c},((u,h,f)=>{const m=Va(this.serializer,h);i.size()<s||m.largestBatchId===o?(i.set(m.getKey(),m),o=m.largestBatchId):f.done()})).next((()=>i))}St(e,t){return ps(e).put((function(s,i,o){const[c,u,h]=qh(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ws(s.yt,o.mutation)}})(this.serializer,this.userId,t))}}function ps(r){return Ae(r,Oo)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yw{bt(e){return Ae(e,xc)}getSessionToken(e){return this.bt(e).get("sessionToken").next((t=>{const n=t==null?void 0:t.value;return n?pe.fromUint8Array(n):pe.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(de(e.integerValue));else if("doubleValue"in e){const n=de(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),Fs(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),typeof n=="string"&&(n=Et(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Tt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?um(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):Fo(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):L(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const s of Object.keys(n))this.Ot(s,t),this.Ct(n[s],t)}kt(e,t){var o,c;const n=e.fields||{};this.Ft(t,53);const s=Rr,i=((c=(o=n[s].arrayValue)==null?void 0:o.values)==null?void 0:c.length)||0;this.Ft(t,15),t.Mt(de(i)),this.Ot(s,t),this.Ct(n[s],t)}Kt(e,t){const n=e.values||[];this.Ft(t,50);for(const s of n)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),x.fromName(e).path.forEach((n=>{this.Ft(t,60),this.$t(n,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}Rn.Wt=new Rn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr=255;function Iw(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function Gh(r){const e=64-(function(n){let s=0;for(let i=0;i<8;++i){const o=Iw(255&n[i]);if(s+=o,o!==8)break}return s})(r);return Math.ceil(e/8)}class Ew{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),n=Gh(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),n=Gh(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(tr),this.sn(255)}_n(){this.an(tr),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===tr?(this.sn(tr),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===tr?(this.an(tr),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class Tw{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class ww{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class gs{constructor(){this.cn=new Ew,this.ascending=new Tw(this.cn),this.descending=new ww(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,t,n,s){this.hn=e,this.Pn=t,this.Tn=n,this.En=s}In(){const e=this.En.length,t=e===0||this.En[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.En,0),t!==e?n.set([0],this.En.length):++n[n.length-1],new bn(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:Zi(this.Tn),directionalValue:Zi(this.En),orderedDocumentKey:Zi(t),documentKey:n.path.toArray()}}An(e,t,n){const s=this.Rn(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Ot(r,e){let t=r.hn-e.hn;return t!==0?t:(t=Kh(r.Tn,e.Tn),t!==0?t:(t=Kh(r.En,e.En),t!==0?t:x.comparator(r.Pn,e.Pn)))}function Kh(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function Zi(r){return jd()?(function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n})(r):r}function Hh(r){return typeof r!="string"?r:(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(r)}class Wh{constructor(e){this.Vn=new se(((t,n)=>he.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Vn=this.Vn.add(n):this.mn.push(n)}}get fn(){return this.Vn.size>1}gn(e){if(U(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=Ha(e);if(t!==void 0&&!this.pn(t))return!1;const n=Tn(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.pn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=n[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<n.length;++i){const c=n[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new se(he.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new Vn(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Vn(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Vn(n.field,n.dir==="asc"?0:1)));return new Ir(Ir.UNKNOWN_ID,this.collectionId,t,Er.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function np(r){var t,n;if(U(r instanceof J||r instanceof ne,20012),r instanceof J){if(r instanceof ym){const s=((n=(t=r.value.arrayValue)==null?void 0:t.values)==null?void 0:n.map((i=>J.create(r.field,"==",i))))||[];return ne.create(s,"or")}return r}const e=r.filters.map((s=>np(s)));return ne.create(e,r.op)}function vw(r){if(r.getFilters().length===0)return[];const e=lc(np(r));return U(rp(e),7391),cc(e)||uc(e)?[e]:e.getFilters()}function cc(r){return r instanceof J}function uc(r){return r instanceof ne&&Fc(r)}function rp(r){return cc(r)||uc(r)||(function(t){if(t instanceof ne&&ec(t)){for(const n of t.getFilters())if(!cc(n)&&!uc(n))return!1;return!0}return!1})(r)}function lc(r){if(U(r instanceof J||r instanceof ne,34018),r instanceof J)return r;if(r.filters.length===1)return lc(r.filters[0]);const e=r.filters.map((n=>lc(n)));let t=ne.create(e,r.op);return t=yo(t),rp(t)?t:(U(t instanceof ne,64498),U(Sr(t),40251),U(t.filters.length>1,57927),t.filters.reduce(((n,s)=>Wc(n,s))))}function Wc(r,e){let t;return U(r instanceof J||r instanceof ne,38388),U(e instanceof J||e instanceof ne,25473),t=r instanceof J?e instanceof J?(function(s,i){return ne.create([s,i],"and")})(r,e):Qh(r,e):e instanceof J?Qh(e,r):(function(s,i){if(U(s.filters.length>0&&i.filters.length>0,48005),Sr(s)&&Sr(i))return pm(s,i.getFilters());const o=ec(s)?s:i,c=ec(s)?i:s,u=o.filters.map((h=>Wc(h,c)));return ne.create(u,"or")})(r,e),yo(t)}function Qh(r,e){if(Sr(e))return pm(e,r.getFilters());{const t=e.filters.map((n=>Wc(r,n)));return ne.create(t,"or")}}function yo(r){if(U(r instanceof J||r instanceof ne,11850),r instanceof J)return r;const e=r.getFilters();if(e.length===1)return yo(e[0]);if(fm(r))return r;const t=e.map((s=>yo(s))),n=[];return t.forEach((s=>{s instanceof J?n.push(s):s instanceof ne&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:ne.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aw{constructor(){this.bn=new Qc}addToCollectionParentIndex(e,t){return this.bn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(Qe.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(Qe.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class Qc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new se(H.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new se(H.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh="IndexedDbIndexManager",Mi=new Uint8Array(0);class Rw{constructor(e,t){this.databaseId=t,this.Dn=new Qc,this.Cn=new Rt((n=>Mn(n)),((n,s)=>ii(n,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.Dn.add(t)}));const i={collectionId:n,parent:xe(s)};return Yh(e).put(i)}return A.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[Of(t),""],!1,!0);return Yh(e).J(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;n.push(at(o.parent))}return n}))}addFieldIndex(e,t){const n=_s(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=rr(e);return i.next((c=>{o.put(jh(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const n=_s(e),s=rr(e),i=nr(e);return n.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=_s(e),n=nr(e),s=rr(e);return t.X().next((()=>n.X())).next((()=>s.X()))}createTargetIndexes(e,t){return A.forEach(this.vn(t),(n=>this.getIndexType(e,n).next((s=>{if(s===0||s===1){const i=new Wh(n).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const n=nr(e);let s=!0;const i=new Map;return A.forEach(this.vn(t),(o=>this.Fn(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=G();const c=[];return A.forEach(i,((u,h)=>{N(Jh,`Using index ${(function(q){return`id=${q.indexId}|cg=${q.collectionGroup}|f=${q.fields.map((ee=>`${ee.fieldPath}:${ee.kind}`)).join(",")}`})(u)} to execute ${Mn(t)}`);const f=(function(q,ee){const X=Ha(ee);if(X===void 0)return null;for(const Z of po(q,X.fieldPath))switch(Z.op){case"array-contains-any":return Z.value.arrayValue.values||[];case"array-contains":return[Z.value]}return null})(h,u),m=(function(q,ee){const X=new Map;for(const Z of Tn(ee))for(const E of po(q,Z.fieldPath))switch(E.op){case"==":case"in":X.set(Z.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return X.set(Z.fieldPath.canonicalString(),E.value),Array.from(X.values())}return null})(h,u),g=(function(q,ee){const X=[];let Z=!0;for(const E of Tn(ee)){const _=E.kind===0?Ph(q,E.fieldPath,q.startAt):Ch(q,E.fieldPath,q.startAt);X.push(_.value),Z&&(Z=_.inclusive)}return new en(X,Z)})(h,u),v=(function(q,ee){const X=[];let Z=!0;for(const E of Tn(ee)){const _=E.kind===0?Ch(q,E.fieldPath,q.endAt):Ph(q,E.fieldPath,q.endAt);X.push(_.value),Z&&(Z=_.inclusive)}return new en(X,Z)})(h,u),V=this.Mn(u,h,g),D=this.Mn(u,h,v),k=this.xn(u,h,m),F=this.On(u.indexId,f,V,g.inclusive,D,v.inclusive,k);return A.forEach(F,(j=>n.Z(j,t.limit).next((q=>{q.forEach((ee=>{const X=x.fromSegments(ee.documentKey);o.has(X)||(o=o.add(X),c.push(X))}))}))))})).next((()=>c))}return A.resolve(null)}))}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=vw(ne.create(e.filters,"and")).map((n=>nc(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.Cn.set(e,t),t)}On(e,t,n,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(n.length,i.length),h=u/(t!=null?t.length:1),f=[];for(let m=0;m<u;++m){const g=t?this.Nn(t[m/h]):Mi,v=this.Bn(e,g,n[m%h],s),V=this.Ln(e,g,i[m%h],o),D=c.map((k=>this.Bn(e,g,k,!0)));f.push(...this.createRange(v,V,D))}return f}Bn(e,t,n,s){const i=new bn(e,x.empty(),t,n);return s?i:i.In()}Ln(e,t,n,s){const i=new bn(e,x.empty(),t,n);return s?i.In():i}Fn(e,t){const n=new Wh(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)n.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let n=2;const s=this.vn(t);return A.forEach(s,(i=>this.Fn(e,i).next((o=>{o?n!==0&&o.fields.length<(function(u){let h=new se(he.comparator),f=!1;for(const m of u.filters)for(const g of m.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?f=!0:h=h.add(g.field));for(const m of u.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&n===2?1:n))}kn(e,t){const n=new gs;for(const s of Tn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.ln(s.kind);Rn.Wt.Dt(i,o)}return n.un()}Nn(e){const t=new gs;return Rn.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const n=new gs;return Rn.Wt.Dt(On(this.databaseId,t),n.ln((function(i){const o=Tn(i);return o.length===0?0:o[o.length-1].kind})(e))),n.un()}xn(e,t,n){if(n===null)return[];let s=[];s.push(new gs);let i=0;for(const o of Tn(e)){const c=n[i++];for(const u of s)if(this.Kn(t,o.fieldPath)&&Gs(c))s=this.Un(s,o,c);else{const h=u.ln(o.kind);Rn.Wt.Dt(c,h)}}return this.$n(s)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const c of s){const u=new gs;u.seed(c.un()),Rn.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}Kn(e,t){return!!e.filters.find((n=>n instanceof J&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=_s(e),s=rr(e);return(t?n.J(Qa,IDBKeyRange.bound(t,t)):n.J()).next((i=>{const o=[];return A.forEach(i,(c=>s.get([c.indexId,this.uid]).next((u=>{o.push((function(f,m){const g=m?new Er(m.sequenceNumber,new Qe(Bn(m.readTime),new x(at(m.documentKey)),m.largestBatchId)):Er.empty(),v=f.fields.map((([V,D])=>new Vn(he.fromServerFormat(V),D)));return new Ir(f.indexId,f.collectionGroup,v,g)})(c,u))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:$(n.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const s=_s(e),i=rr(e);return this.Wn(e).next((o=>s.J(Qa,IDBKeyRange.bound(t,t)).next((c=>A.forEach(c,(u=>i.put(jh(u.indexId,this.uid,o,n))))))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,((s,i)=>{const o=n.get(s.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(n.set(s.collectionGroup,c),A.forEach(c,(u=>this.Qn(e,s,u).next((h=>{const f=this.Gn(i,u);return h.isEqual(f)?A.resolve():this.zn(e,i,u,h,f)})))))))}))}jn(e,t,n,s){return nr(e).put(s.Rn(this.uid,this.qn(n,t.key),t.key))}Jn(e,t,n,s){return nr(e).delete(s.An(this.uid,this.qn(n,t.key),t.key))}Qn(e,t,n){const s=nr(e);let i=new se(Ot);return s.ee({index:Qf,range:IDBKeyRange.only([n.indexId,this.uid,Zi(this.qn(n,t))])},((o,c)=>{i=i.add(new bn(n.indexId,t,Hh(c.arrayValue),Hh(c.directionalValue)))})).next((()=>i))}Gn(e,t){let n=new se(Ot);const s=this.kn(t,e);if(s==null)return n;const i=Ha(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Gs(o))for(const c of o.arrayValue.values||[])n=n.add(new bn(t.indexId,e.key,this.Nn(c),s))}else n=n.add(new bn(t.indexId,e.key,Mi,s));return n}zn(e,t,n,s,i){N(Jh,"Updating index entries for document '%s'",t.key);const o=[];return(function(u,h,f,m,g){const v=u.getIterator(),V=h.getIterator();let D=er(v),k=er(V);for(;D||k;){let F=!1,j=!1;if(D&&k){const q=f(D,k);q<0?j=!0:q>0&&(F=!0)}else D!=null?j=!0:F=!0;F?(m(k),k=er(V)):j?(g(D),D=er(v)):(D=er(v),k=er(V))}})(s,i,Ot,(c=>{o.push(this.jn(e,t,n,c))}),(c=>{o.push(this.Jn(e,t,n,c))})),A.waitFor(o)}Wn(e){let t=1;return rr(e).ee({index:Wf,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((o,c)=>Ot(o,c))).filter(((o,c,u)=>!c||Ot(o,u[c-1])!==0));const s=[];s.push(e);for(const o of n){const c=Ot(o,e),u=Ot(o,t);if(c===0)s[0]=e.In();else if(c>0&&u<0)s.push(o),s.push(o.In());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,Mi,x.empty()),u=s[o+1].An(this.uid,Mi,x.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return Ot(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Xh)}getMinOffset(e,t){return A.mapArray(this.vn(t),(n=>this.Fn(e,n).next((s=>s||L(44426))))).next(Xh)}}function Yh(r){return Ae(r,qs)}function nr(r){return Ae(r,Cs)}function _s(r){return Ae(r,Nc)}function rr(r){return Ae(r,Ps)}function Xh(r){U(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Vc(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new Qe(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},sp=41943040;class Ne{static withCacheSize(e){return new Ne(e,Ne.DEFAULT_COLLECTION_PERCENTILE,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ip(r,e,t){const n=r.store(Je),s=r.store(Tr),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=n.ee({range:o},((f,m,g)=>(c++,g.delete())));i.push(u.next((()=>{U(c===1,47070,{batchId:t.batchId})})));const h=[];for(const f of t.mutations){const m=Gf(e,f.key.path,t.batchId);i.push(s.delete(m)),h.push(f.key)}return A.waitFor(i).next((()=>h))}function Io(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw L(14731);e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ne.DEFAULT_COLLECTION_PERCENTILE=10,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ne.DEFAULT=new Ne(sp,Ne.DEFAULT_COLLECTION_PERCENTILE,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ne.DISABLED=new Ne(-1,0,0);class Go{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Zn={}}static wt(e,t,n,s){U(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new Go(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Mt(e).ee({index:Pn,range:n},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,n,s){const i=cr(e),o=Mt(e);return o.add({}).next((c=>{U(typeof c=="number",49019);const u=new zc(c,t,n,s),h=(function(v,V,D){const k=D.baseMutations.map((j=>Ws(v.yt,j))),F=D.mutations.map((j=>Ws(v.yt,j)));return{userId:V,batchId:D.batchId,localWriteTimeMs:D.localWriteTime.toMillis(),baseMutations:k,mutations:F}})(this.serializer,this.userId,u),f=[];let m=new se(((g,v)=>$(g.canonicalString(),v.canonicalString())));for(const g of s){const v=Gf(this.userId,g.key.path,c);m=m.add(g.key.path.popLast()),f.push(o.put(h)),f.push(i.put(v,eT))}return m.forEach((g=>{f.push(this.indexManager.addToCollectionParentIndex(e,g))})),e.addOnCommittedListener((()=>{this.Zn[c]=u.keys()})),A.waitFor(f).next((()=>u))}))}lookupMutationBatch(e,t){return Mt(e).get(t).next((n=>n?(U(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),An(this.serializer,n)):null))}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const s=n.keys();return this.Zn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Mt(e).ee({index:Pn,range:s},((o,c,u)=>{c.userId===this.userId&&(U(c.batchId>=n,47524,{Yn:n}),i=An(this.serializer,c)),u.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Qt;return Mt(e).ee({index:Pn,range:t,reverse:!0},((s,i,o)=>{n=i.batchId,o.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Qt],[this.userId,Number.POSITIVE_INFINITY]);return Mt(e).J(Pn,t).next((n=>n.map((s=>An(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Ki(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return cr(e).ee({range:s},((o,c,u)=>{const[h,f,m]=o,g=at(f);if(h===this.userId&&t.path.isEqual(g))return Mt(e).get(m).next((v=>{if(!v)throw L(61480,{er:o,batchId:m});U(v.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:v.userId,batchId:m}),i.push(An(this.serializer,v))}));u.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new se($);const s=[];return t.forEach((i=>{const o=Ki(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=cr(e).ee({range:c},((h,f,m)=>{const[g,v,V]=h,D=at(v);g===this.userId&&i.path.isEqual(D)?n=n.add(V):m.done()}));s.push(u)})),A.waitFor(s).next((()=>this.tr(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=Ki(this.userId,n),o=IDBKeyRange.lowerBound(i);let c=new se($);return cr(e).ee({range:o},((u,h,f)=>{const[m,g,v]=u,V=at(g);m===this.userId&&n.isPrefixOf(V)?V.length===s&&(c=c.add(v)):f.done()})).next((()=>this.tr(e,c)))}tr(e,t){const n=[],s=[];return t.forEach((i=>{s.push(Mt(e).get(i).next((o=>{if(o===null)throw L(35274,{batchId:i});U(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(An(this.serializer,o))})))})),A.waitFor(s).next((()=>n))}removeMutationBatch(e,t){return ip(e.le,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.nr(t.batchId)})),A.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return cr(e).ee({range:n},((i,o,c)=>{if(i[0]===this.userId){const u=at(i[1]);s.push(u)}else c.done()})).next((()=>{U(s.length===0,56720,{rr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return op(e,this.userId,t)}ir(e){return ap(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:Qt,lastStreamToken:""}))}}function op(r,e,t){const n=Ki(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return cr(r).ee({range:i,Y:!0},((c,u,h)=>{const[f,m,g]=c;f===e&&m===s&&(o=!0),h.done()})).next((()=>o))}function Mt(r){return Ae(r,Je)}function cr(r){return Ae(r,Tr)}function ap(r){return Ae(r,Us)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new qn(0)}static ar(){return new qn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bw{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next((t=>{const n=new qn(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.ur(e).next((t=>B.fromTimestamp(new te(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.ur(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.ur(e).next((s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s))))}addTargetData(e,t){return this.lr(e,t).next((()=>this.ur(e).next((n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>sr(e).delete(t.targetId))).next((()=>this.ur(e))).next((n=>(U(n.targetCount>0,8065),n.targetCount-=1,this.cr(e,n))))}removeTargets(e,t,n){let s=0;const i=[];return sr(e).ee(((o,c)=>{const u=As(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))})).next((()=>A.waitFor(i))).next((()=>s))}forEachTarget(e,t){return sr(e).ee(((n,s)=>{const i=As(s);t(i)}))}ur(e){return ed(e).get(fo).next((t=>(U(t!==null,2888),t)))}cr(e,t){return ed(e).put(fo,t)}lr(e,t){return sr(e).put(tp(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next((t=>t.targetCount))}getTargetData(e,t){const n=Mn(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return sr(e).ee({range:s,index:Hf},((o,c,u)=>{const h=As(c);ii(t,h.target)&&(i=h,u.done())})).next((()=>i))}addMatchingKeys(e,t,n){const s=[],i=zt(e);return t.forEach((o=>{const c=xe(o.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(e,n,o))})),A.waitFor(s)}removeMatchingKeys(e,t,n){const s=zt(e);return A.forEach(t,(i=>{const o=xe(i.path);return A.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])}))}removeMatchingKeysForTargetId(e,t){const n=zt(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=zt(e);let i=G();return s.ee({range:n,Y:!0},((o,c,u)=>{const h=at(o[1]),f=new x(h);i=i.add(f)})).next((()=>i))}containsKey(e,t){const n=xe(t.path),s=IDBKeyRange.bound([n],[Of(n)],!1,!0);let i=0;return zt(e).ee({index:kc,Y:!0,range:s},(([o,c],u,h)=>{o!==0&&(i++,h.done())})).next((()=>i>0))}At(e,t){return sr(e).get(t).next((n=>n?As(n):null))}}function sr(r){return Ae(r,wr)}function ed(r){return Ae(r,Dn)}function zt(r){return Ae(r,vr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td="LruGarbageCollector",cp=1048576;function nd([r,e],[t,n]){const s=$(r,t);return s===0?$(e,n):s}class Sw{constructor(e){this.Pr=e,this.buffer=new se(nd),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();nd(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class up{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){N(td,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){an(t)?N(td,"Ignoring IndexedDB error during garbage collection: ",t):await on(t)}await this.Ar(3e5)}))}}class Pw{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Be.ce);const n=new Sw(t);return this.Vr.forEachTarget(e,(s=>n.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>n.Ir(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Zh)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Zh):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(n=m,c=Date.now(),this.removeTargets(e,n,t)))).next((m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(e,n)))).next((m=>(h=Date.now(),ir()<=Q.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function lp(r,e){return new Pw(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(e,t){this.db=e,this.garbageCollector=lp(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}pr(e){let t=0;return this.mr(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,((n,s)=>t(s)))}addReference(e,t,n){return Li(e,n)}removeReference(e,t,n){return Li(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Li(e,t)}wr(e,t){return(function(s,i){let o=!1;return ap(s).te((c=>op(s,c,i).next((u=>(u&&(o=!0),A.resolve(!u)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,((o,c)=>{if(c<=t){const u=this.wr(e,o).next((h=>{if(!h)return i++,n.getEntry(e,o).next((()=>(n.removeEntry(o,B.min()),zt(e).delete((function(m){return[0,xe(m.path)]})(o)))))}));s.push(u)}})).next((()=>A.waitFor(s))).next((()=>n.apply(e))).next((()=>i))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Li(e,t)}yr(e,t){const n=zt(e);let s,i=Be.ce;return n.ee({index:kc},(([o,c],{path:u,sequenceNumber:h})=>{o===0?(i!==Be.ce&&t(new x(at(s)),i),i=h,s=u):i=Be.ce})).next((()=>{i!==Be.ce&&t(new x(at(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Li(r,e){return zt(r).put((function(n,s){return{targetId:0,path:xe(n.path),sequenceNumber:s}})(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(){this.changes=new Rt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,le.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return In(e).put(n)}removeEntry(e,t,n){return In(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],_o(o),c[c.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.Sr(e,n))))}getEntry(e,t){let n=le.newInvalidDocument(t);return In(e).ee({index:Hi,range:IDBKeyRange.only(ys(t))},((s,i)=>{n=this.br(t,i)})).next((()=>n))}Dr(e,t){let n={size:0,document:le.newInvalidDocument(t)};return In(e).ee({index:Hi,range:IDBKeyRange.only(ys(t))},((s,i)=>{n={document:this.br(t,i),size:Io(i)}})).next((()=>n))}getEntries(e,t){let n=je();return this.Cr(e,t,((s,i)=>{const o=this.br(s,i);n=n.insert(s,o)})).next((()=>n))}vr(e,t){let n=je(),s=new ce(x.comparator);return this.Cr(e,t,((i,o)=>{const c=this.br(i,o);n=n.insert(i,c),s=s.insert(i,Io(o))})).next((()=>({documents:n,Fr:s})))}Cr(e,t,n){if(t.isEmpty())return A.resolve();let s=new se(id);t.forEach((u=>s=s.add(u)));const i=IDBKeyRange.bound(ys(s.first()),ys(s.last())),o=s.getIterator();let c=o.getNext();return In(e).ee({index:Hi,range:i},((u,h,f)=>{const m=x.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&id(c,m)<0;)n(c,null),c=o.getNext();c&&c.isEqual(m)&&(n(c,h),c=o.hasNext()?o.getNext():null),c?f.j(ys(c)):f.done()})).next((()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),_o(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return In(e).J(IDBKeyRange.bound(c,u,!0)).next((h=>{i==null||i.incrementDocumentReadCount(h.length);let f=je();for(const m of h){const g=this.br(x.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);g.isFoundDocument()&&(ai(t,g)||s.has(g.key))&&(f=f.insert(g.key,g))}return f}))}getAllFromCollectionGroup(e,t,n,s){let i=je();const o=sd(t,n),c=sd(t,Qe.max());return In(e).ee({index:Kf,range:IDBKeyRange.bound(o,c,!0)},((u,h,f)=>{const m=this.br(x.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(e){return new Dw(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return rd(e).get(Wa).next((t=>(U(!!t,20021),t)))}Sr(e,t){return rd(e).put(Wa,t)}br(e,t){if(t){const n=gw(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return le.newInvalidDocument(e)}}function dp(r){return new Vw(r)}class Dw extends hp{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new Rt((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(e){const t=[];let n=0,s=new se(((i,o)=>$(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Bh(this.Mr.serializer,o);s=s.add(i.path.popLast());const h=Io(u);n+=h-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(n-=c.size,this.trackRemovals){const u=Bh(this.Mr.serializer,o.convertToNoDocument(B.min()));t.push(this.Mr.addEntry(e,i,u))}})),s.forEach((i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Mr.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next((n=>(this.Or.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.Mr.vr(e,t).next((({documents:n,Fr:s})=>(s.forEach(((i,o)=>{this.Or.set(i,{size:o,readTime:n.get(i).readTime})})),n)))}}function rd(r){return Ae(r,Bs)}function In(r){return Ae(r,ho)}function ys(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function sd(r,e){const t=e.documentKey.path.toArray();return[r,_o(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function id(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=$(t[i],n[i]),s)return s;return s=$(t.length,n.length),s||(s=$(t[t.length-2],n[n.length-2]),s||$(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&ks(n.mutation,s,qe.empty(),te.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,G()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=G()){const s=ct();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let o=ws();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const n=ct();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,G())))}populateOverlays(e,t,n){const s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,n,s){let i=je();const o=Ds(),c=(function(){return Ds()})();return t.forEach(((u,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof bt)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),ks(f.mutation,h,f.mutation.getFieldMask(),te.now())):o.set(h.key,qe.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>c.set(h,new kw(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const n=Ds();let s=new ce(((o,c)=>o-c)),i=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||qe.empty();f=c.applyToLocalView(h,f),n.set(u,f);const m=(s.get(c.batchId)||G()).add(u);s=s.insert(c.batchId,m)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,m=Sm();f.forEach((g=>{if(!i.has(g)){const v=xm(t.get(g),n.get(g));v!==null&&m.set(g,v),i=i.add(g)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return A.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return FT(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Uc(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):A.resolve(ct());let c=yr,u=i;return o.next((h=>A.forEach(h,((f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next((g=>{u=u.insert(f,g)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,G()))).next((f=>({batchId:c,changes:bm(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next((n=>{let s=ws();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=ws();return this.indexManager.getCollectionParents(e,i).next((c=>A.forEach(c,(u=>{const h=(function(m,g){return new At(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next((f=>{f.forEach(((m,g)=>{o=o.insert(m,g)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((o=>{i.forEach(((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,le.newInvalidDocument(f)))}));let c=ws();return o.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&ks(f.mutation,h,qe.empty(),te.now()),ai(t,h)&&(c=c.insert(u,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nw{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return A.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:ye(s.createTime)}})(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:zo(s.bundledQuery),readTime:ye(s.readTime)}})(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{constructor(){this.overlays=new ce(x.comparator),this.Lr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=ct();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.St(e,t,i)})),A.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Lr.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const s=ct(),i=t.length+1,o=new x(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>n&&s.set(u.getKey(),u)}return A.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new ce(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=ct(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=ct(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return A.resolve(c)}St(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(n.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new Gc(t,n));let i=this.Lr.get(t);i===void 0&&(i=G(),this.Lr.set(t,i)),this.Lr.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(){this.sessionToken=pe.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(){this.kr=new se(be.qr),this.Kr=new se(be.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new be(e,t);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Wr(new be(e,t))}Qr(e,t){e.forEach((n=>this.removeReference(n,t)))}Gr(e){const t=new x(new H([])),n=new be(t,e),s=new be(t,e+1),i=[];return this.Kr.forEachInRange([n,s],(o=>{this.Wr(o),i.push(o.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new x(new H([])),n=new be(t,e),s=new be(t,e+1);let i=G();return this.Kr.forEachInRange([n,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new be(e,0),n=this.kr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class be{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return x.comparator(e.key,t.key)||$(e.Jr,t.Jr)}static Ur(e,t){return $(e.Jr,t.Jr)||x.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new se(be.qr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new zc(i,t,n,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new be(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.Xr(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?Qt:this.Yn-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new be(t,0),s=new be(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([n,s],(o=>{const c=this.Zr(o.Jr);i.push(c)})),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new se($);return t.forEach((s=>{const i=new be(s,0),o=new be(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],(c=>{n=n.add(c.Jr)}))})),A.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;x.isDocumentKey(i)||(i=i.child(""));const o=new be(new x(i),0);let c=new se($);return this.Hr.forEachWhile((u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Jr)),!0)}),o),A.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((n=>{const s=this.Zr(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){U(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Hr;return A.forEach(t.mutations,(s=>{const i=new be(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=n}))}nr(e){}containsKey(e,t){const n=new be(t,0),s=this.Hr.firstAfterOrEqual(n);return A.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(e){this.ti=e,this.docs=(function(){return new ce(x.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():le.newInvalidDocument(t))}getEntries(e,t){let n=je();return t.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():le.newInvalidDocument(s))})),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=je();const o=t.path,c=new x(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Vc(Bf(f),n)<=0||(s.has(f.key)||ai(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(e,t,n,s){L(9500)}ni(e,t){return A.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new Fw(this)}getSize(e){return A.resolve(this.size)}}class Fw extends hp{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(n)})),A.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(e){this.persistence=e,this.ri=new Rt((t=>Mn(t)),ii),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.ii=0,this.si=new Jc,this.targetCount=0,this.oi=qn._r()}forEachTarget(e,t){return this.ri.forEach(((n,s)=>t(s))),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),A.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new qn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.lr(t),A.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.ri.forEach(((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),A.waitFor(i).next((()=>s))}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),A.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{constructor(e,t){this._i={},this.overlays={},this.ai=new Be(0),this.ui=!1,this.ui=!0,this.ci=new Ow,this.referenceDelegate=e(this),this.li=new Uw(this),this.indexManager=new Aw,this.remoteDocumentCache=(function(s){return new Lw(s)})((n=>this.referenceDelegate.hi(n))),this.serializer=new ep(t),this.Pi=new Nw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new xw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new Mw(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){N("MemoryPersistence","Starting transaction:",e);const s=new Bw(this.ai.next());return this.referenceDelegate.Ti(),n(s).next((i=>this.referenceDelegate.Ei(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return A.or(Object.values(this._i).map((n=>()=>n.containsKey(e,t))))}}class Bw extends jf{constructor(e){super(),this.currentSequenceNumber=e}}class Ko{constructor(e){this.persistence=e,this.Ri=new Jc,this.Ai=null}static Vi(e){return new Ko(e)}get di(){if(this.Ai)return this.Ai;throw L(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.di,(n=>{const s=x.fromPath(n);return this.mi(e,s).next((i=>{i||t.removeEntry(s,B.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((n=>{n?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return A.or([()=>A.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Eo{constructor(e,t){this.persistence=e,this.fi=new Rt((n=>xe(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=lp(this,t)}static Vi(e,t){return new Eo(e,t)}Ti(){}Ei(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}pr(e){let t=0;return this.mr(e,(n=>{t++})).next((()=>t))}mr(e,t){return A.forEach(this.fi,((n,s)=>this.wr(e,n,s).next((i=>i?A.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(o=>this.wr(e,o,t).next((c=>{c||(n++,i.removeEntry(o,B.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),A.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Qi(e.data.value)),t}wr(e,t,n){return A.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(e){this.serializer=e}k(e,t,n,s){const i=new ko("createOrUpgrade",t);n<1&&s>=1&&((function(u){u.createObjectStore(si)})(e),(function(u){u.createObjectStore(Us,{keyPath:ZE}),u.createObjectStore(Je,{keyPath:gh,autoIncrement:!0}).createIndex(Pn,_h,{unique:!0}),u.createObjectStore(Tr)})(e),od(e),(function(u){u.createObjectStore(wn)})(e));let o=A.resolve();return n<3&&s>=3&&(n!==0&&((function(u){u.deleteObjectStore(vr),u.deleteObjectStore(wr),u.deleteObjectStore(Dn)})(e),od(e)),o=o.next((()=>(function(u){const h=u.store(Dn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return h.put(fo,f)})(i)))),n<4&&s>=4&&(n!==0&&(o=o.next((()=>(function(u,h){return h.store(Je).J().next((m=>{u.deleteObjectStore(Je),u.createObjectStore(Je,{keyPath:gh,autoIncrement:!0}).createIndex(Pn,_h,{unique:!0});const g=h.store(Je),v=m.map((V=>g.put(V)));return A.waitFor(v)}))})(e,i)))),o=o.next((()=>{(function(u){u.createObjectStore(Ar,{keyPath:cT})})(e)}))),n<5&&s>=5&&(o=o.next((()=>this.gi(i)))),n<6&&s>=6&&(o=o.next((()=>((function(u){u.createObjectStore(Bs)})(e),this.pi(i))))),n<7&&s>=7&&(o=o.next((()=>this.yi(i)))),n<8&&s>=8&&(o=o.next((()=>this.wi(e,i)))),n<9&&s>=9&&(o=o.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&s>=10&&(o=o.next((()=>this.Si(i)))),n<11&&s>=11&&(o=o.next((()=>{(function(u){u.createObjectStore(No,{keyPath:uT})})(e),(function(u){u.createObjectStore(xo,{keyPath:lT})})(e)}))),n<12&&s>=12&&(o=o.next((()=>{(function(u){const h=u.createObjectStore(Oo,{keyPath:_T});h.createIndex(Ja,yT,{unique:!1}),h.createIndex(Jf,IT,{unique:!1})})(e)}))),n<13&&s>=13&&(o=o.next((()=>(function(u){const h=u.createObjectStore(ho,{keyPath:tT});h.createIndex(Hi,nT),h.createIndex(Kf,rT)})(e))).next((()=>this.bi(e,i))).next((()=>e.deleteObjectStore(wn)))),n<14&&s>=14&&(o=o.next((()=>this.Di(e,i)))),n<15&&s>=15&&(o=o.next((()=>(function(u){u.createObjectStore(Nc,{keyPath:hT,autoIncrement:!0}).createIndex(Qa,dT,{unique:!1}),u.createObjectStore(Ps,{keyPath:fT}).createIndex(Wf,mT,{unique:!1}),u.createObjectStore(Cs,{keyPath:pT}).createIndex(Qf,gT,{unique:!1})})(e)))),n<16&&s>=16&&(o=o.next((()=>{t.objectStore(Ps).clear()})).next((()=>{t.objectStore(Cs).clear()}))),n<17&&s>=17&&(o=o.next((()=>{(function(u){u.createObjectStore(xc,{keyPath:ET})})(e)}))),n<18&&s>=18&&jd()&&(o=o.next((()=>{t.objectStore(Ps).clear()})).next((()=>{t.objectStore(Cs).clear()}))),o}pi(e){let t=0;return e.store(wn).ee(((n,s)=>{t+=Io(s)})).next((()=>{const n={byteSize:t};return e.store(Bs).put(Wa,n)}))}gi(e){const t=e.store(Us),n=e.store(Je);return t.J().next((s=>A.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,Qt],[i.userId,i.lastAcknowledgedBatchId]);return n.J(Pn,o).next((c=>A.forEach(c,(u=>{U(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const h=An(this.serializer,u);return ip(e,i.userId,h).next((()=>{}))}))))}))))}yi(e){const t=e.store(vr),n=e.store(wn);return e.store(Dn).get(fo).next((s=>{const i=[];return n.ee(((o,c)=>{const u=new H(o),h=(function(m){return[0,xe(m)]})(u);i.push(t.get(h).next((f=>f?A.resolve():(m=>t.put({targetId:0,path:xe(m),sequenceNumber:s.highestListenSequenceNumber}))(u))))})).next((()=>A.waitFor(i)))}))}wi(e,t){e.createObjectStore(qs,{keyPath:aT});const n=t.store(qs),s=new Qc,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return n.put({collectionId:c,parent:xe(u)})}};return t.store(wn).ee({Y:!0},((o,c)=>{const u=new H(o);return i(u.popLast())})).next((()=>t.store(Tr).ee({Y:!0},(([o,c,u],h)=>{const f=at(c);return i(f.popLast())}))))}Si(e){const t=e.store(wr);return t.ee(((n,s)=>{const i=As(s),o=tp(this.serializer,i);return t.put(o)}))}bi(e,t){const n=t.store(wn),s=[];return n.ee(((i,o)=>{const c=t.store(ho),u=(function(m){return m.document?new x(H.fromString(m.document.name).popFirst(5)):m.noDocument?x.fromSegments(m.noDocument.path):m.unknownDocument?x.fromSegments(m.unknownDocument.path):L(36783)})(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))})).next((()=>A.waitFor(s)))}Di(e,t){const n=t.store(Je),s=dp(this.serializer),i=new Yc(Ko.Vi,this.serializer.yt);return n.J().next((o=>{const c=new Map;return o.forEach((u=>{let h=c.get(u.userId)??G();An(this.serializer,u).keys().forEach((f=>h=h.add(f))),c.set(u.userId,h)})),A.forEach(c,((u,h)=>{const f=new Se(h),m=$o.wt(this.serializer,f),g=i.getIndexManager(f),v=Go.wt(f,this.serializer,g,i.referenceDelegate);return new fp(s,v,m,g).recalculateAndSaveOverlaysForDocumentKeys(new Ya(t,Be.ce),u).next()}))}))}}function od(r){r.createObjectStore(vr,{keyPath:iT}).createIndex(kc,oT,{unique:!0}),r.createObjectStore(wr,{keyPath:"targetId"}).createIndex(Hf,sT,{unique:!0}),r.createObjectStore(Dn)}const Lt="IndexedDbPersistence",Da=18e5,ka=5e3,Na="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",mp="main";class Xc{constructor(e,t,n,s,i,o,c,u,h,f,m=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=i,this.window=o,this.document=c,this.Fi=h,this.Mi=f,this.xi=m,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=g=>Promise.resolve(),!Xc.v())throw new C(b.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Cw(this,s),this.qi=t+mp,this.serializer=new ep(u),this.Ki=new lt(this.qi,this.xi,new qw(this.serializer)),this.ci=new yw,this.li=new bw(this.referenceDelegate,this.serializer),this.remoteDocumentCache=dp(this.serializer),this.Pi=new _w,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&_e(Lt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new C(b.FAILED_PRECONDITION,Na);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.li.getHighestSequenceNumber(e)))})).then((e=>{this.ai=new Be(e,this.Fi)})).then((()=>{this.ui=!0})).catch((e=>(this.Ki&&this.Ki.close(),Promise.reject(e))))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>Fi(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(e).next((t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Ji(e))).next((t=>this.isPrimary&&!t?this.Hi(e).next((()=>!1)):!!t&&this.Zi(e).next((()=>!0)))))).catch((e=>{if(an(e))return N(Lt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return N(Lt,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable((()=>this.ki(e))),this.isPrimary=e}))}ji(e){return Is(e).get(Zn).next((t=>A.resolve(this.Xi(t))))}Yi(e){return Fi(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Da)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=Ae(t,Ar);return n.J().next((s=>{const i=this.ns(s,Da),o=s.filter((c=>i.indexOf(c)===-1));return A.forEach(o,(c=>n.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?A.resolve(!0):Is(e).get(Zn).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,ka)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new C(b.FAILED_PRECONDITION,Na);return!1}}return!(!this.networkEnabled||!this.inForeground)||Fi(e).J().next((n=>this.ns(n,ka).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&N(Lt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[si,Ar],(e=>{const t=new Ya(e,Be.ce);return this.Hi(t).next((()=>this.Yi(t)))})),this.Ki.close(),this.ls()}ns(e,t){return e.filter((n=>this.ts(n.updateTimeMs,t)&&!this.ss(n.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(e=>Fi(e).J().next((t=>this.ns(t,Da).map((n=>n.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return Go.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Rw(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return $o.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){N(Lt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(u){return u===18?vT:u===17?em:u===16?wT:u===15?Oc:u===14?Zf:u===13?Xf:u===12?TT:u===11?Yf:void L(60245)})(this.xi);let o;return this.Ki.runTransaction(e,s,i,(c=>(o=new Ya(c,this.ai?this.ai.next():Be.ce),t==="readwrite-primary"?this.ji(o).next((u=>!!u||this.Ji(o))).next((u=>{if(!u)throw _e(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new C(b.FAILED_PRECONDITION,qf);return n(o)})).next((u=>this.Zi(o).next((()=>u)))):this.Ps(o).next((()=>n(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Ps(e){return Is(e).get(Zn).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,ka)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new C(b.FAILED_PRECONDITION,Na)}))}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Is(e).put(Zn,t)}static v(){return lt.v()}Hi(e){const t=Is(e);return t.get(Zn).next((n=>this.Xi(n)?(N(Lt,"Releasing primary lease."),t.delete(Zn)):A.resolve()))}ts(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(_e(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;qd()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const n=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return N(Lt,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return _e(Lt,"Failed to get zombied client id.",n),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){_e("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Is(r){return Ae(r,si)}function Fi(r){return Ae(r,Ar)}function Zc(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Ts=n,this.Es=s}static Is(e,t){let n=G(),s=G();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new eu(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return qd()?8:zf(we())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.gs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ps(e,t,s,n).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new jw;return this.ys(e,t,o).next((c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)}))})).next((()=>i.result))}ws(e,t,n,s){return n.documentReadCount<this.Vs?(ir()<=Q.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",or(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(ir()<=Q.DEBUG&&N("QueryEngine","Query:",or(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(ir()<=Q.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",or(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Oe(t))):A.resolve())}gs(e,t){if(Vh(t))return A.resolve(null);let n=Oe(t);return this.indexManager.getIndexType(e,n).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=go(t,null,"F"),n=Oe(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((i=>{const o=G(...i);return this.fs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,n).next((u=>{const h=this.Ss(t,c);return this.bs(t,h,o,u.readTime)?this.gs(e,go(t,null,"F")):this.Ds(e,h,t,u)}))))})))))}ps(e,t,n,s){return Vh(t)||s.isEqual(B.min())?A.resolve(null):this.fs.getDocuments(e,n).next((i=>{const o=this.Ss(t,i);return this.bs(t,o,n,s)?A.resolve(null):(ir()<=Q.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),or(t)),this.Ds(e,o,t,Uf(s,yr)).next((c=>c)))}))}Ss(e,t){let n=new se(Am(e));return t.forEach(((s,i)=>{ai(e,i)&&(n=n.add(i))})),n}bs(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,n){return ir()<=Q.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",or(t)),this.fs.getDocumentsMatchingQuery(e,t,Qe.min(),n)}Ds(e,t,n,s){return this.fs.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu="LocalStore",zw=3e8;class $w{constructor(e,t,n,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new ce($),this.Fs=new Rt((i=>Mn(i)),ii),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new fp(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function gp(r,e,t,n){return new $w(r,e,t,n)}async function _p(r,e){const t=O(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{const o=[],c=[];let u=G();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next((h=>({Ns:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function Gw(r,e){const t=O(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const m=h.batch,g=m.keys();let v=A.resolve();return g.forEach((V=>{v=v.next((()=>f.getEntry(u,V))).next((D=>{const k=h.docVersions.get(V);U(k!==null,48541),D.version.compareTo(k)<0&&(m.applyToRemoteDocument(D,h),D.isValidDocument()&&(D.setReadTime(h.commitVersion),f.addEntry(D)))}))})),v.next((()=>c.mutationQueue.removeMutationBatch(u,m)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(c){let u=G();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function yp(r){const e=O(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function Kw(r,e){const t=O(r),n=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach(((f,m)=>{const g=s.get(m);if(!g)return;c.push(t.li.removeMatchingKeys(i,f.removedDocuments,m).next((()=>t.li.addMatchingKeys(i,f.addedDocuments,m))));let v=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?v=v.withResumeToken(pe.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,n)),s=s.insert(m,v),(function(D,k,F){return D.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=zw?!0:F.addedDocuments.size+F.modifiedDocuments.size+F.removedDocuments.size>0})(g,v,f)&&c.push(t.li.updateTargetData(i,v))}));let u=je(),h=G();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(Ip(i,o,e.documentUpdates).next((f=>{u=f.Bs,h=f.Ls}))),!n.isEqual(B.min())){const f=t.li.getLastRemoteSnapshotVersion(i).next((m=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,n)));c.push(f)}return A.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.vs=s,i)))}function Ip(r,e,t){let n=G(),s=G();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let o=je();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(B.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):N(tu,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Bs:o,Ls:s}}))}function Hw(r,e){const t=O(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=Qt),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function Dr(r,e){const t=O(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.li.getTargetData(n,e).next((i=>i?(s=i,A.resolve(s)):t.li.allocateTargetId(n).next((o=>(s=new gt(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.li.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.vs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(n.targetId,n),t.Fs.set(e,n.targetId)),n}))}async function kr(r,e,t){const n=O(r),s=n.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(o=>n.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!an(o))throw o;N(tu,`Failed to update sequence numbers for target ${e}: ${o}`)}n.vs=n.vs.remove(e),n.Fs.delete(s.target)}function To(r,e,t){const n=O(r);let s=B.min(),i=G();return n.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const m=O(u),g=m.Fs.get(f);return g!==void 0?A.resolve(m.vs.get(g)):m.li.getTargetData(h,f)})(n,o,Oe(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>n.Cs.getDocumentsMatchingQuery(o,e,t?s:B.min(),t?i:G()))).next((c=>(wp(n,vm(e),c),{documents:c,ks:i})))))}function Ep(r,e){const t=O(r),n=O(t.li),s=t.vs.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",(i=>n.At(i,e).next((o=>o?o.target:null))))}function Tp(r,e){const t=O(r),n=t.Ms.get(e)||B.min();return t.persistence.runTransaction("Get new document changes","readonly",(s=>t.xs.getAllFromCollectionGroup(s,e,Uf(n,yr),Number.MAX_SAFE_INTEGER))).then((s=>(wp(t,e,s),s)))}function wp(r,e,t){let n=r.Ms.get(e)||B.min();t.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Ms.set(e,n)}async function Ww(r,e,t,n){const s=O(r);let i=G(),o=je();for(const h of t){const f=e.qs(h.metadata.name);h.document&&(i=i.add(f));const m=e.Ks(h);m.setReadTime(e.Us(h.metadata.readTime)),o=o.insert(f,m)}const c=s.xs.newChangeBuffer({trackRemovals:!0}),u=await Dr(s,(function(f){return Oe(jr(H.fromString(`__bundle__/docs/${f}`)))})(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",(h=>Ip(h,c,o).next((f=>(c.apply(h),f))).next((f=>s.li.removeMatchingKeysForTargetId(h,u.targetId).next((()=>s.li.addMatchingKeys(h,i,u.targetId))).next((()=>s.localDocuments.getLocalViewOfDocuments(h,f.Bs,f.Ls))).next((()=>f.Bs))))))}async function Qw(r,e,t=G()){const n=await Dr(r,Oe(zo(e.bundledQuery))),s=O(r);return s.persistence.runTransaction("Save named query","readwrite",(i=>{const o=ye(e.readTime);if(n.snapshotVersion.compareTo(o)>=0)return s.Pi.saveNamedQuery(i,e);const c=n.withResumeToken(pe.EMPTY_BYTE_STRING,o);return s.vs=s.vs.insert(c.targetId,c),s.li.updateTargetData(i,c).next((()=>s.li.removeMatchingKeysForTargetId(i,n.targetId))).next((()=>s.li.addMatchingKeys(i,t,n.targetId))).next((()=>s.Pi.saveNamedQuery(i,e)))}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vp="firestore_clients";function ad(r,e){return`${vp}_${r}_${e}`}const Ap="firestore_mutations";function cd(r,e,t){let n=`${Ap}_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}const Rp="firestore_targets";function xa(r,e){return`${Rp}_${r}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot="SharedClientState";class wo{constructor(e,t,n,s){this.user=e,this.batchId=t,this.state=n,this.error=s}static $s(e,t,n){const s=JSON.parse(n);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new C(s.error.code,s.error.message))),o?new wo(e,t,s.state,i):(_e(ot,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class xs{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static $s(e,t){const n=JSON.parse(t);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new C(n.error.code,n.error.message))),i?new xs(e,n.state,s):(_e(ot,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class vo{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const n=JSON.parse(t);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=Bc();for(let o=0;s&&o<n.activeTargetIds.length;++o)s=$f(n.activeTargetIds[o]),i=i.add(n.activeTargetIds[o]);return s?new vo(e,i):(_e(ot,`Failed to parse client data for instance '${e}': ${t}`),null)}}class nu{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new nu(t.clientId,t.onlineState):(_e(ot,`Failed to parse online state: ${e}`),null)}}class hc{constructor(){this.activeTargetIds=Bc()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Oa{constructor(e,t,n,s,i){this.window=e,this.Ci=t,this.persistenceKey=n,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new ce($),this.started=!1,this.Zs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=ad(this.persistenceKey,this.zs),this.Ys=(function(u){return`firestore_sequence_number_${u}`})(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new hc),this.eo=new RegExp(`^${vp}_${o}_([^_]*)$`),this.no=new RegExp(`^${Ap}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${Rp}_${o}_(\\d+)$`),this.io=(function(u){return`firestore_online_state_${u}`})(this.persistenceKey),this.so=(function(u){return`firestore_bundle_loaded_v2_${u}`})(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const n of e){if(n===this.zs)continue;const s=this.getItem(ad(this.persistenceKey,n));if(s){const i=vo.$s(n,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const t=this.storage.getItem(this.io);if(t){const n=this._o(t);n&&this.ao(n)}for(const n of this.Zs)this.Js(n);this.Zs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach(((n,s)=>{s.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,n){this.co(e,t,n),this.lo(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(xa(this.persistenceKey,e));if(s){const i=xs.$s(e,s);i&&(n=i.state)}}return t&&this.ho.Qs(e),this.oo(),n}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(xa(this.persistenceKey,e))}updateQueryState(e,t,n){this.Po(e,t,n)}handleUserChange(e,t,n){t.forEach((s=>{this.lo(s)})),this.currentUser=e,n.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return N(ot,"READ",e,t),t}setItem(e,t){N(ot,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){N(ot,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(N(ot,"EVENT",t.key,t.newValue),t.key===this.Xs)return void _e("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const n=this.Io(t.key);return this.Ro(n,null)}{const n=this.Ao(t.key,t.newValue);if(n)return this.Ro(n.clientId,n)}}else if(this.no.test(t.key)){if(t.newValue!==null){const n=this.Vo(t.key,t.newValue);if(n)return this.mo(n)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const n=this.fo(t.key,t.newValue);if(n)return this.po(n)}}else if(t.key===this.io){if(t.newValue!==null){const n=this._o(t.newValue);if(n)return this.ao(n)}}else if(t.key===this.Ys){const n=(function(i){let o=Be.ce;if(i!=null)try{const c=JSON.parse(i);U(typeof c=="number",30636,{yo:i}),o=c}catch(c){_e(ot,"Failed to read sequence number from WebStorage",c)}return o})(t.newValue);n!==Be.ce&&this.sequenceNumberHandler(n)}else if(t.key===this.so){const n=this.wo(t.newValue);await Promise.all(n.map((s=>this.syncEngine.So(s))))}}}else this.Zs.push(t)}))}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,n){const s=new wo(this.currentUser,e,t,n),i=cd(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Ws())}lo(e){const t=cd(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,n){const s=xa(this.persistenceKey,e),i=new xs(e,t,n);this.setItem(s,i.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const n=this.Io(e);return vo.$s(n,t)}Vo(e,t){const n=this.no.exec(e),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return wo.$s(new Se(i),s,t)}fo(e,t){const n=this.ro.exec(e),s=Number(n[1]);return xs.$s(s,t)}_o(e){return nu.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);N(ot,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const n=t?this.Hs.insert(e,t):this.Hs.remove(e),s=this.uo(this.Hs),i=this.uo(n),o=[],c=[];return i.forEach((u=>{s.has(u)||o.push(u)})),s.forEach((u=>{i.has(u)||c.push(u)})),this.syncEngine.Co(o,c).then((()=>{this.Hs=n}))}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=Bc();return e.forEach(((n,s)=>{t=t.unionWith(s.activeTargetIds)})),t}}class bp{constructor(){this.vo=new hc,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new hc,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ud="ConnectivityMonitor";class ld{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){N(ud,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){N(ud,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ui=null;function dc(){return Ui===null?Ui=(function(){return 268435456+Math.round(2147483648*Math.random())})():Ui++,"0x"+Ui.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma="RestConnection",Yw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Xw{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${n}/databases/${s}`,this.$o=this.databaseId.database===zs?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Wo(e,t,n,s,i){const o=dc(),c=this.Qo(e,t.toUriEncodedString());N(Ma,`Sending RPC '${e}' ${o}:`,c,n);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:h}=new URL(c),f=Fr(h);return this.zo(e,c,u,n,f).then((m=>(N(Ma,`Received RPC '${e}' ${o}: `,m),m)),(m=>{throw Ge(Ma,`RPC '${e}' ${o} failed with error: `,m,"url: ",c,"request:",n),m}))}jo(e,t,n,s,i,o){return this.Wo(e,t,n,s,i)}Go(e,t,n){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+qr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),n&&n.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const n=Yw[e];let s=`${this.Ko}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="WebChannelConnection",Es=(r,e,t)=>{r.listen(e,(n=>{try{t(n)}catch(s){setTimeout((()=>{throw s}),0)}}))};class fr extends Xw{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!fr.c_){const e=Vf();Es(e,Cf.STAT_EVENT,(t=>{t.stat===za.PROXY?N(ke,"STAT_EVENT: detected buffering proxy"):t.stat===za.NOPROXY&&N(ke,"STAT_EVENT: detected no buffering proxy")})),fr.c_=!0}}zo(e,t,n,s,i){const o=dc();return new Promise(((c,u)=>{const h=new Sf;h.setWithCredentials(!0),h.listenOnce(Pf.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Gi.NO_ERROR:const m=h.getResponseJson();N(ke,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),c(m);break;case Gi.TIMEOUT:N(ke,`RPC '${e}' ${o} timed out`),u(new C(b.DEADLINE_EXCEEDED,"Request time out"));break;case Gi.HTTP_ERROR:const g=h.getStatus();if(N(ke,`RPC '${e}' ${o} failed with status:`,g,"response text:",h.getResponseText()),g>0){let v=h.getResponseJson();Array.isArray(v)&&(v=v[0]);const V=v==null?void 0:v.error;if(V&&V.status&&V.message){const D=(function(F){const j=F.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(j)>=0?j:b.UNKNOWN})(V.status);u(new C(D,V.message))}else u(new C(b.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new C(b.UNAVAILABLE,"Connection failed."));break;default:L(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{N(ke,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);N(ke,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,n,15)}))}T_(e,t,n){const s=dc(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const h=i.join("");N(ke,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=o.createWebChannel(h,c);this.E_(f);let m=!1,g=!1;const v=new Zw({Jo:V=>{g?N(ke,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(m||(N(ke,`Opening RPC '${e}' stream ${s} transport.`),f.open(),m=!0),N(ke,`RPC '${e}' stream ${s} sending:`,V),f.send(V))},Ho:()=>f.close()});return Es(f,Ts.EventType.OPEN,(()=>{g||(N(ke,`RPC '${e}' stream ${s} transport opened.`),v.i_())})),Es(f,Ts.EventType.CLOSE,(()=>{g||(g=!0,N(ke,`RPC '${e}' stream ${s} transport closed`),v.o_(),this.I_(f))})),Es(f,Ts.EventType.ERROR,(V=>{g||(g=!0,Ge(ke,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),v.o_(new C(b.UNAVAILABLE,"The operation could not be completed")))})),Es(f,Ts.EventType.MESSAGE,(V=>{var D;if(!g){const k=V.data[0];U(!!k,16349);const F=k,j=(F==null?void 0:F.error)||((D=F[0])==null?void 0:D.error);if(j){N(ke,`RPC '${e}' stream ${s} received error:`,j);const q=j.status;let ee=(function(E){const _=Ie[E];if(_!==void 0)return Fm(_)})(q),X=j.message;q==="NOT_FOUND"&&X.includes("database")&&X.includes("does not exist")&&X.includes(this.databaseId.database)&&Ge(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ee===void 0&&(ee=b.INTERNAL,X="Unknown error status: "+q+" with message "+j.message),g=!0,v.o_(new C(ee,X)),f.close()}else N(ke,`RPC '${e}' stream ${s} received:`,k),v.__(k)}})),fr.u_(),setTimeout((()=>{v.s_()}),0),v}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Df()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ev(r){return new fr(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sp(){return typeof window<"u"?window:null}function eo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gn(r){return new ow(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */fr.c_=!1;class ru{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hd="PersistentStream";class Pp{constructor(e,t,n,s,i,o,c,u){this.Ci=e,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ru(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(_e(t.toString()),_e("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===t&&this.G_(n,s)}),(n=>{e((()=>{const s=new C(b.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{n((()=>this.listener.Zo()))})),this.stream.Yo((()=>{n((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return N(hd,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(N(hd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class tv extends Pp{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=uw(this.serializer,e),n=(function(i){if(!("targetChange"in i))return B.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?B.min():o.readTime?ye(o.readTime):B.min()})(e);return this.listener.H_(t,n)}Z_(e){const t={};t.database=oc(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=mo(u)?{documents:Hm(i,u)}:{query:jo(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=jm(i,o.resumeToken);const h=sc(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(B.min())>0){c.readTime=Vr(i,o.snapshotVersion.toTimestamp());const h=sc(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const n=hw(this.serializer,e);n&&(t.labels=n),this.q_(t)}X_(e){const t={};t.database=oc(this.serializer),t.removeTarget=e,this.q_(t)}}class nv extends Pp{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return U(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,U(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){U(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=lw(e.writeResults,e.commitTime),n=ye(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=oc(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>Ws(this.serializer,n)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rv{}class sv extends rv{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new C(b.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,ic(t,n),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new C(b.UNKNOWN,i.toString())}))}jo(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.jo(e,ic(t,n),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new C(b.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function iv(r,e,t,n){return new sv(r,e,t,n)}class ov{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(_e(t),this.aa=!1):N("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn="RemoteStore";class av{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((o=>{n.enqueueAndForget((async()=>{un(this)&&(N(jn,"Restarting streams for network reachability change."),await(async function(u){const h=O(u);h.Ia.add(4),await Gr(h),h.Va.set("Unknown"),h.Ia.delete(4),await hi(h)})(this))}))})),this.Va=new ov(n,s)}}async function hi(r){if(un(r))for(const e of r.Ra)await e(!0)}async function Gr(r){for(const e of r.Ra)await e(!1)}function Ho(r,e){const t=O(r);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),ou(t)?iu(t):Hr(t).O_()&&su(t,e))}function Nr(r,e){const t=O(r),n=Hr(t);t.Ea.delete(e),n.O_()&&Cp(t,e),t.Ea.size===0&&(n.O_()?n.L_():un(t)&&t.Va.set("Unknown"))}function su(r,e){if(r.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Hr(r).Z_(e)}function Cp(r,e){r.da.$e(e),Hr(r).X_(e)}function iu(r){r.da=new nw({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ea.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),Hr(r).start(),r.Va.ua()}function ou(r){return un(r)&&!Hr(r).x_()&&r.Ea.size>0}function un(r){return O(r).Ia.size===0}function Vp(r){r.da=void 0}async function cv(r){r.Va.set("Online")}async function uv(r){r.Ea.forEach(((e,t)=>{su(r,e)}))}async function lv(r,e){Vp(r),ou(r)?(r.Va.ha(e),iu(r)):r.Va.set("Unknown")}async function hv(r,e,t){if(r.Va.set("Online"),e instanceof qm&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ea.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ea.delete(c),s.da.removeTarget(c))})(r,e)}catch(n){N(jn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Ao(r,n)}else if(e instanceof Xi?r.da.Xe(e):e instanceof Bm?r.da.st(e):r.da.tt(e),!t.isEqual(B.min()))try{const n=await yp(r.localStore);t.compareTo(n)>=0&&await(function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ea.get(h);f&&i.Ea.set(h,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.Ea.get(u);if(!f)return;i.Ea.set(u,f.withResumeToken(pe.EMPTY_BYTE_STRING,f.snapshotVersion)),Cp(i,u);const m=new gt(f.target,u,h,f.sequenceNumber);su(i,m)})),i.remoteSyncer.applyRemoteEvent(c)})(r,t)}catch(n){N(jn,"Failed to raise snapshot:",n),await Ao(r,n)}}async function Ao(r,e,t){if(!an(e))throw e;r.Ia.add(1),await Gr(r),r.Va.set("Offline"),t||(t=()=>yp(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{N(jn,"Retrying IndexedDB access"),await t(),r.Ia.delete(1),await hi(r)}))}function Dp(r,e){return e().catch((t=>Ao(r,t,e)))}async function Kr(r){const e=O(r),t=tn(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Qt;for(;dv(e);)try{const s=await Hw(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,fv(e,s)}catch(s){await Ao(e,s)}kp(e)&&Np(e)}function dv(r){return un(r)&&r.Ta.length<10}function fv(r,e){r.Ta.push(e);const t=tn(r);t.O_()&&t.Y_&&t.ea(e.mutations)}function kp(r){return un(r)&&!tn(r).x_()&&r.Ta.length>0}function Np(r){tn(r).start()}async function mv(r){tn(r).ra()}async function pv(r){const e=tn(r);for(const t of r.Ta)e.ea(t.mutations)}async function gv(r,e,t){const n=r.Ta.shift(),s=$c.from(n,e,t);await Dp(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await Kr(r)}async function _v(r,e){e&&tn(r).Y_&&await(async function(n,s){if((function(o){return Lm(o)&&o!==b.ABORTED})(s.code)){const i=n.Ta.shift();tn(n).B_(),await Dp(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Kr(n)}})(r,e),kp(r)&&Np(r)}async function dd(r,e){const t=O(r);t.asyncQueue.verifyOperationInProgress(),N(jn,"RemoteStore received new credentials");const n=un(t);t.Ia.add(3),await Gr(t),n&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await hi(t)}async function fc(r,e){const t=O(r);e?(t.Ia.delete(2),await hi(t)):e||(t.Ia.add(2),await Gr(t),t.Va.set("Unknown"))}function Hr(r){return r.ma||(r.ma=(function(t,n,s){const i=O(t);return i.sa(),new tv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:cv.bind(null,r),Yo:uv.bind(null,r),t_:lv.bind(null,r),H_:hv.bind(null,r)}),r.Ra.push((async e=>{e?(r.ma.B_(),ou(r)?iu(r):r.Va.set("Unknown")):(await r.ma.stop(),Vp(r))}))),r.ma}function tn(r){return r.fa||(r.fa=(function(t,n,s){const i=O(t);return i.sa(),new nv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:mv.bind(null,r),t_:_v.bind(null,r),ta:pv.bind(null,r),na:gv.bind(null,r)}),r.Ra.push((async e=>{e?(r.fa.B_(),await Kr(r)):(await r.fa.stop(),r.Ta.length>0&&(N(jn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Ce,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,c=new au(e,t,o,s,i);return c.start(n),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new C(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Wr(r,e){if(_e("AsyncQueue",`${e}: ${r}`),an(r))return new C(b.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{static emptySet(e){return new kn(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||x.comparator(t.key,n.key):(t,n)=>x.comparator(t.key,n.key),this.keyedMap=ws(),this.sortedSet=new ce(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof kn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new kn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(){this.ga=new ce(x.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):L(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,n)=>{e.push(n)})),e}}class zn{constructor(e,t,n,s,i,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new zn(e,t,kn.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&oi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class Iv{constructor(){this.queries=md(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=O(t),i=s.queries;s.queries=md(),i.forEach(((o,c)=>{for(const u of c.Sa)u.onError(n)}))})(this,new C(b.ABORTED,"Firestore shutting down"))}}function md(){return new Rt((r=>wm(r)),oi)}async function cu(r,e){const t=O(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(n=2):(i=new yv,n=e.Da()?0:1);try{switch(n){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Wr(o,`Initialization of query '${or(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&lu(t)}async function uu(r,e){const t=O(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function Ev(r,e){const t=O(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(n=!0);o.wa=s}}n&&lu(t)}function Tv(r,e,t){const n=O(r),s=n.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);n.queries.delete(e)}function lu(r){r.Ca.forEach((e=>{e.next()}))}var mc,pd;(pd=mc||(mc={})).Ma="default",pd.Cache="cache";class hu{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new zn(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=zn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==mc.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(e,t){this.Ka=e,this.byteLength=t}Ua(){return"metadata"in this.Ka}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{constructor(e){this.serializer=e}qs(e){return ht(this.serializer,e)}Ks(e){return e.metadata.exists?qo(this.serializer,e.document,!1):le.newNoDocument(this.qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return ye(e)}}class du{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=Op(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Ka.namedQuery)this.Wa.push(e.Ka.namedQuery);else if(e.Ka.documentMetadata){this.Qa.push({metadata:e.Ka.documentMetadata}),e.Ka.documentMetadata.exists||++t;const n=H.fromString(e.Ka.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.Ka.document&&(this.Qa[this.Qa.length-1].document=e.Ka.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,n=new gd(this.serializer);for(const s of e)if(s.metadata.queries){const i=n.qs(s.metadata.name);for(const o of s.metadata.queries){const c=(t.get(o)||G()).add(i);t.set(o,c)}}return t}async ja(e){const t=await Ww(e,new gd(this.serializer),this.Qa,this.$a.id),n=this.za(this.documents);for(const s of this.Wa)await Qw(e,s,n.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function Op(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(e){this.key=e}}class Lp{constructor(e){this.key=e}}class Fp{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=G(),this.mutatedKeys=G(),this.eu=Am(e),this.tu=new kn(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new fd,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,m)=>{const g=s.get(f),v=ai(this.query,m)?m:null,V=!!g&&this.mutatedKeys.has(g.key),D=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let k=!1;g&&v?g.data.isEqual(v.data)?V!==D&&(n.track({type:3,doc:v}),k=!0):this.su(g,v)||(n.track({type:2,doc:v}),k=!0,(u&&this.eu(v,u)>0||h&&this.eu(v,h)<0)&&(c=!0)):!g&&v?(n.track({type:0,doc:v}),k=!0):g&&!v&&(n.track({type:1,doc:g}),k=!0,(u||h)&&(c=!0)),k&&(v?(o=o.add(v),i=D?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:o,iu:n,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((f,m)=>(function(v,V){const D=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L(20277,{Vt:k})}};return D(v)-D(V)})(f.type,m.type)||this.eu(f.doc,m.doc))),this.ou(n),s=s??!1;const c=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,h=u!==this.Xa;return this.Xa=u,o.length!==0||h?{snapshot:new zn(this.query,e.tu,i,o,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new fd,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=G(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Ya=this.Ya.add(n.key))}));const t=[];return e.forEach((n=>{this.Ya.has(n)||t.push(new Lp(n))})),this.Ya.forEach((n=>{e.has(n)||t.push(new Mp(n))})),t}cu(e){this.Za=e.ks,this.Ya=G();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return zn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const ln="SyncEngine";class wv{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class vv{constructor(e){this.key=e,this.hu=!1}}class Av{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Rt((c=>wm(c)),oi),this.Eu=new Map,this.Iu=new Set,this.Ru=new ce(x.comparator),this.Au=new Map,this.Vu=new Jc,this.du={},this.mu=new Map,this.fu=qn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Rv(r,e,t=!0){const n=Wo(r);let s;const i=n.Tu.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Up(n,e,t,!0),s}async function bv(r,e){const t=Wo(r);await Up(t,e,!0,!1)}async function Up(r,e,t,n){const s=await Dr(r.localStore,Oe(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let c;return n&&(c=await fu(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&Ho(r.remoteStore,s),c}async function fu(r,e,t,n,s){r.pu=(m,g,v)=>(async function(D,k,F,j){let q=k.view.ru(F);q.bs&&(q=await To(D.localStore,k.query,!1).then((({documents:E})=>k.view.ru(E,q))));const ee=j&&j.targetChanges.get(k.targetId),X=j&&j.targetMismatches.get(k.targetId)!=null,Z=k.view.applyChanges(q,D.isPrimaryClient,ee,X);return pc(D,k.targetId,Z.au),Z.snapshot})(r,m,g,v);const i=await To(r.localStore,e,!0),o=new Fp(e,i.ks),c=o.ru(i.documents),u=li.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(c,r.isPrimaryClient,u);pc(r,t,h.au);const f=new wv(e,t,o);return r.Tu.set(e,f),r.Eu.has(t)?r.Eu.get(t).push(e):r.Eu.set(t,[e]),h.snapshot}async function Sv(r,e,t){const n=O(r),s=n.Tu.get(e),i=n.Eu.get(s.targetId);if(i.length>1)return n.Eu.set(s.targetId,i.filter((o=>!oi(o,e)))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await kr(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&Nr(n.remoteStore,s.targetId),xr(n,s.targetId)})).catch(on)):(xr(n,s.targetId),await kr(n.localStore,s.targetId,!0))}async function Pv(r,e){const t=O(r),n=t.Tu.get(e),s=t.Eu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Nr(t.remoteStore,n.targetId))}async function Cv(r,e,t){const n=_u(r);try{const s=await(function(o,c){const u=O(o),h=te.now(),f=c.reduce(((v,V)=>v.add(V.key)),G());let m,g;return u.persistence.runTransaction("Locally write mutations","readwrite",(v=>{let V=je(),D=G();return u.xs.getEntries(v,f).next((k=>{V=k,V.forEach(((F,j)=>{j.isValidDocument()||(D=D.add(F))}))})).next((()=>u.localDocuments.getOverlayedDocuments(v,V))).next((k=>{m=k;const F=[];for(const j of c){const q=XT(j,m.get(j.key).overlayedDocument);q!=null&&F.push(new bt(j.key,q,hm(q.value.mapValue),fe.exists(!0)))}return u.mutationQueue.addMutationBatch(v,h,F,c)})).next((k=>{g=k;const F=k.applyToLocalDocumentSet(m,D);return u.documentOverlayCache.saveOverlays(v,k.batchId,F)}))})).then((()=>({batchId:g.batchId,changes:bm(m)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.du[o.currentUser.toKey()];h||(h=new ce($)),h=h.insert(c,u),o.du[o.currentUser.toKey()]=h})(n,s.batchId,t),await St(n,s.changes),await Kr(n.remoteStore)}catch(s){const i=Wr(s,"Failed to persist write");t.reject(i)}}async function Bp(r,e){const t=O(r);try{const n=await Kw(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Au.get(i);o&&(U(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?U(o.hu,14607):s.removedDocuments.size>0&&(U(o.hu,42227),o.hu=!1))})),await St(t,n,e)}catch(n){await on(n)}}function _d(r,e,t){const n=O(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=O(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,m)=>{for(const g of m.Sa)g.va(c)&&(h=!0)})),h&&lu(u)})(n.eventManager,e),s.length&&n.Pu.H_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function Vv(r,e,t){const n=O(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),i=s&&s.key;if(i){let o=new ce(x.comparator);o=o.insert(i,le.newNoDocument(i,B.min()));const c=G().add(i),u=new ui(B.min(),new Map,new ce($),o,c);await Bp(n,u),n.Ru=n.Ru.remove(i),n.Au.delete(e),gu(n)}else await kr(n.localStore,e,!1).then((()=>xr(n,e,t))).catch(on)}async function Dv(r,e){const t=O(r),n=e.batch.batchId;try{const s=await Gw(t.localStore,e);pu(t,n,null),mu(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await St(t,s)}catch(s){await on(s)}}async function kv(r,e,t){const n=O(r);try{const s=await(function(o,c){const u=O(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((m=>(U(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(n.localStore,e);pu(n,e,t),mu(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await St(n,s)}catch(s){await on(s)}}async function Nv(r,e){const t=O(r);un(t.remoteStore)||N(ln,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await(function(o){const c=O(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(u=>c.mutationQueue.getHighestUnacknowledgedBatchId(u)))})(t.localStore);if(n===Qt)return void e.resolve();const s=t.mu.get(n)||[];s.push(e),t.mu.set(n,s)}catch(n){const s=Wr(n,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function mu(r,e){(r.mu.get(e)||[]).forEach((t=>{t.resolve()})),r.mu.delete(e)}function pu(r,e,t){const n=O(r);let s=n.du[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.du[n.currentUser.toKey()]=s}}function xr(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Eu.get(e))r.Tu.delete(n),t&&r.Pu.yu(n,t);r.Eu.delete(e),r.isPrimaryClient&&r.Vu.Gr(e).forEach((n=>{r.Vu.containsKey(n)||qp(r,n)}))}function qp(r,e){r.Iu.delete(e.path.canonicalString());const t=r.Ru.get(e);t!==null&&(Nr(r.remoteStore,t),r.Ru=r.Ru.remove(e),r.Au.delete(t),gu(r))}function pc(r,e,t){for(const n of t)n instanceof Mp?(r.Vu.addReference(n.key,e),xv(r,n)):n instanceof Lp?(N(ln,"Document no longer in limbo: "+n.key),r.Vu.removeReference(n.key,e),r.Vu.containsKey(n.key)||qp(r,n.key)):L(19791,{wu:n})}function xv(r,e){const t=e.key,n=t.path.canonicalString();r.Ru.get(t)||r.Iu.has(n)||(N(ln,"New document in limbo: "+t),r.Iu.add(n),gu(r))}function gu(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const e=r.Iu.values().next().value;r.Iu.delete(e);const t=new x(H.fromString(e)),n=r.fu.next();r.Au.set(n,new vv(t)),r.Ru=r.Ru.insert(t,n),Ho(r.remoteStore,new gt(Oe(jr(t.path)),n,"TargetPurposeLimboResolution",Be.ce))}}async function St(r,e,t){const n=O(r),s=[],i=[],o=[];n.Tu.isEmpty()||(n.Tu.forEach(((c,u)=>{o.push(n.pu(u,e,t).then((h=>{var f;if((h||t)&&n.isPrimaryClient){const m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){s.push(h);const m=eu.Is(u.targetId,h);i.push(m)}})))})),await Promise.all(o),n.Pu.H_(s),await(async function(u,h){const f=O(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>A.forEach(h,(g=>A.forEach(g.Ts,(v=>f.persistence.referenceDelegate.addReference(m,g.targetId,v))).next((()=>A.forEach(g.Es,(v=>f.persistence.referenceDelegate.removeReference(m,g.targetId,v)))))))))}catch(m){if(!an(m))throw m;N(tu,"Failed to update sequence numbers: "+m)}for(const m of h){const g=m.targetId;if(!m.fromCache){const v=f.vs.get(g),V=v.snapshotVersion,D=v.withLastLimboFreeSnapshotVersion(V);f.vs=f.vs.insert(g,D)}}})(n.localStore,i))}async function Ov(r,e){const t=O(r);if(!t.currentUser.isEqual(e)){N(ln,"User change. New user:",e.toKey());const n=await _p(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new C(b.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await St(t,n.Ns)}}function Mv(r,e){const t=O(r),n=t.Au.get(e);if(n&&n.hu)return G().add(n.key);{let s=G();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}async function Lv(r,e){const t=O(r),n=await To(t.localStore,e.query,!0),s=e.view.cu(n);return t.isPrimaryClient&&pc(t,e.targetId,s.au),s}async function Fv(r,e){const t=O(r);return Tp(t.localStore,e).then((n=>St(t,n)))}async function Uv(r,e,t,n){const s=O(r),i=await(function(c,u){const h=O(c),f=O(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",(m=>f.Xn(m,u).next((g=>g?h.localDocuments.getDocuments(m,g):A.resolve(null)))))})(s.localStore,e);i!==null?(t==="pending"?await Kr(s.remoteStore):t==="acknowledged"||t==="rejected"?(pu(s,e,n||null),mu(s,e),(function(c,u){O(O(c).mutationQueue).nr(u)})(s.localStore,e)):L(6720,"Unknown batchState",{Su:t}),await St(s,i)):N(ln,"Cannot apply mutation batch with id: "+e)}async function Bv(r,e){const t=O(r);if(Wo(t),_u(t),e===!0&&t.gu!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),s=await yd(t,n.toArray());t.gu=!0,await fc(t.remoteStore,!0);for(const i of s)Ho(t.remoteStore,i)}else if(e===!1&&t.gu!==!1){const n=[];let s=Promise.resolve();t.Eu.forEach(((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):s=s.then((()=>(xr(t,o),kr(t.localStore,o,!0)))),Nr(t.remoteStore,o)})),await s,await yd(t,n),(function(o){const c=O(o);c.Au.forEach(((u,h)=>{Nr(c.remoteStore,h)})),c.Vu.zr(),c.Au=new Map,c.Ru=new ce(x.comparator)})(t),t.gu=!1,await fc(t.remoteStore,!1)}}async function yd(r,e,t){const n=O(r),s=[],i=[];for(const o of e){let c;const u=n.Eu.get(o);if(u&&u.length!==0){c=await Dr(n.localStore,Oe(u[0]));for(const h of u){const f=n.Tu.get(h),m=await Lv(n,f);m.snapshot&&i.push(m.snapshot)}}else{const h=await Ep(n.localStore,o);c=await Dr(n.localStore,h),await fu(n,jp(h),o,!1,c.resumeToken)}s.push(c)}return n.Pu.H_(i),s}function jp(r){return Im(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function qv(r){return(function(t){return O(O(t).persistence).hs()})(O(r).localStore)}async function jv(r,e,t,n){const s=O(r);if(s.gu)return void N(ln,"Ignoring unexpected query state notification.");const i=s.Eu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await Tp(s.localStore,vm(i[0])),c=ui.createSynthesizedRemoteEventForCurrentChange(e,t==="current",pe.EMPTY_BYTE_STRING);await St(s,o,c);break}case"rejected":await kr(s.localStore,e,!0),xr(s,e,n);break;default:L(64155,t)}}async function zv(r,e,t){const n=Wo(r);if(n.gu){for(const s of e){if(n.Eu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){N(ln,"Adding an already active target "+s);continue}const i=await Ep(n.localStore,s),o=await Dr(n.localStore,i);await fu(n,jp(i),o.targetId,!1,o.resumeToken),Ho(n.remoteStore,o)}for(const s of t)n.Eu.has(s)&&await kr(n.localStore,s,!1).then((()=>{Nr(n.remoteStore,s),xr(n,s)})).catch(on)}}function Wo(r){const e=O(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Bp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Mv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Vv.bind(null,e),e.Pu.H_=Ev.bind(null,e.eventManager),e.Pu.yu=Tv.bind(null,e.eventManager),e}function _u(r){const e=O(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Dv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=kv.bind(null,e),e}function $v(r,e,t){const n=O(r);(async function(i,o,c){try{const u=await o.getMetadata();if(await(function(v,V){const D=O(v),k=ye(V.createTime);return D.persistence.runTransaction("hasNewerBundle","readonly",(F=>D.Pi.getBundleMetadata(F,V.id))).then((F=>!!F&&F.createTime.compareTo(k)>=0))})(i.localStore,u))return await o.close(),c._completeWith((function(v){return{taskState:"Success",documentsLoaded:v.totalDocuments,bytesLoaded:v.totalBytes,totalDocuments:v.totalDocuments,totalBytes:v.totalBytes}})(u)),Promise.resolve(new Set);c._updateProgress(Op(u));const h=new du(u,o.serializer);let f=await o.bu();for(;f;){const g=await h.Ga(f);g&&c._updateProgress(g),f=await o.bu()}const m=await h.ja(i.localStore);return await St(i,m.Ha,void 0),await(function(v,V){const D=O(v);return D.persistence.runTransaction("Save bundle","readwrite",(k=>D.Pi.saveBundleMetadata(k,V)))})(i.localStore,u),c._completeWith(m.progress),Promise.resolve(m.Ja)}catch(u){return Ge(ln,`Loading bundle failed with ${u}`),c._failWith(u),Promise.resolve(new Set)}})(n,e,t).then((s=>{n.sharedClientState.notifyBundleLoaded(s)}))}class Or{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Gn(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return gp(this.persistence,new pp,e.initialUser,this.serializer)}Cu(e){return new Yc(Ko.Vi,this.serializer)}Du(e){return new bp}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Or.provider={build:()=>new Or};class yu extends Or{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){U(this.persistence.referenceDelegate instanceof Eo,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new up(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ne.withCacheSize(this.cacheSizeBytes):Ne.DEFAULT;return new Yc((n=>Eo.Vi(n,t)),this.serializer)}}class Iu extends Or{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await _u(this.xu.syncEngine),await Kr(this.xu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return gp(this.persistence,new pp,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new up(n,e.asyncQueue,t)}Mu(e,t){const n=new YE(t,this.persistence);return new JE(e.asyncQueue,n)}Cu(e){const t=Zc(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Ne.withCacheSize(this.cacheSizeBytes):Ne.DEFAULT;return new Xc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Sp(),eo(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new bp}}class zp extends Iu{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof Oa&&(this.sharedClientState.syncEngine={bo:Uv.bind(null,t),Do:jv.bind(null,t),Co:zv.bind(null,t),hs:qv.bind(null,t),So:Fv.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi((async n=>{await Bv(this.xu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())}))}Du(e){const t=Sp();if(!Oa.v(t))throw new C(b.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Zc(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Oa(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class nn{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>_d(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ov.bind(null,this.syncEngine),await fc(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Iv})()}createDatastore(e){const t=Gn(e.databaseInfo.databaseId),n=ev(e.databaseInfo);return iv(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,o,c){return new av(n,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>_d(this.syncEngine,t,0)),(function(){return ld.v()?new ld:new Jw})())}createSyncEngine(e,t){return(function(s,i,o,c,u,h,f){const m=new Av(s,i,o,c,u,h);return f&&(m.gu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=O(s);N(jn,"RemoteStore shutting down."),i.Ia.add(5),await Gr(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}nn.provider={build:()=>new nn};function Id(r,e=10240){let t=0;return{async read(){if(t<r.byteLength){const n={value:r.slice(t,t+e),done:!1};return t+=e,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):_e("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gv{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new Ce,this.buffer=new Uint8Array,this.Lu=(function(){return new TextDecoder("utf-8")})(),this.ku().then((n=>{n&&n.Ua()?this.metadata.resolve(n.Ka.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n==null?void 0:n.Ka)}`))}),(n=>this.metadata.reject(n)))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(e===null)return null;const t=this.Lu.decode(e),n=Number(t);isNaN(n)&&this.Ku(`length string (${t}) is not valid number`);const s=await this.Uu(n);return new xp(JSON.parse(s),e.length+n)}$u(){return this.buffer.findIndex((e=>e===123))}async qu(){for(;this.$u()<0&&!await this.Wu(););if(this.buffer.length===0)return null;const e=this.$u();e<0&&this.Ku("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.Ku("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Ku(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kv{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.bu();if(!n||!n.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(n==null?void 0:n.Ka)}`);this.metadata=n;do n=this.bu(),n!==null&&this.elements.push(n);while(n!==null)}getMetadata(){return this.metadata}Qu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.Uu(e);return new xp(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new C(b.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hv=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new C(b.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(s,i){const o=O(s),c={documents:i.map((m=>Hs(o.serializer,m)))},u=await o.jo("BatchGetDocuments",o.serializer.databaseId,H.emptyPath(),c,i.length),h=new Map;u.forEach((m=>{const g=cw(o.serializer,m);h.set(g.key.toString(),g)}));const f=[];return i.forEach((m=>{const g=h.get(m.toString());U(!!g,55234,{key:m}),f.push(g)})),f})(this.datastore,e);return t.forEach((n=>this.recordVersion(n))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new $r(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,n)=>{const s=x.fromPath(n);this.mutations.push(new jc(s,this.precondition(s)))})),await(async function(n,s){const i=O(n),o={writes:s.map((c=>Ws(i.serializer,c)))};await i.Wo("Commit",i.serializer.databaseId,H.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw L(50498,{Gu:e.constructor.name});t=B.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new C(b.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(B.min())?fe.exists(!1):fe.updateTime(t):fe.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(B.min()))throw new C(b.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return fe.updateTime(t)}return fe.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wv{constructor(e,t,n,s,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=s,this.deferred=i,this.zu=n.maxAttempts,this.M_=new ru(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const e=new Hv(this.datastore),t=this.Hu(e);t&&t.then((n=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(n)})).catch((s=>{this.Zu(s)}))))})).catch((n=>{this.Zu(n)}))}))}Hu(e){try{const t=this.updateFunction(e);return!ri(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(e)}Xu(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Lm(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rn="FirestoreClient";class Qv{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=Se.UNAUTHENTICATED,this.clientId=Vo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async o=>{N(rn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>(N(rn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ce;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Wr(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function La(r,e){r.asyncQueue.verifyOperationInProgress(),N(rn,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await _p(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function Ed(r,e){r.asyncQueue.verifyOperationInProgress();const t=await Eu(r);N(rn,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>dd(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>dd(e.remoteStore,s))),r._onlineComponents=e}async function Eu(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){N(rn,"Using user provided OfflineComponentProvider");try{await La(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Ge("Error using user provided cache. Falling back to memory cache: "+t),await La(r,new Or)}}else N(rn,"Using default OfflineComponentProvider"),await La(r,new yu(void 0));return r._offlineComponents}async function Jo(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(N(rn,"Using user provided OnlineComponentProvider"),await Ed(r,r._uninitializedComponentsProvider._online)):(N(rn,"Using default OnlineComponentProvider"),await Ed(r,new nn))),r._onlineComponents}function $p(r){return Eu(r).then((e=>e.persistence))}function Qr(r){return Eu(r).then((e=>e.localStore))}function Gp(r){return Jo(r).then((e=>e.remoteStore))}function Tu(r){return Jo(r).then((e=>e.syncEngine))}function Kp(r){return Jo(r).then((e=>e.datastore))}async function Mr(r){const e=await Jo(r),t=e.eventManager;return t.onListen=Rv.bind(null,e.syncEngine),t.onUnlisten=Sv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=bv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Pv.bind(null,e.syncEngine),t}function Jv(r){return r.asyncQueue.enqueue((async()=>{const e=await $p(r),t=await Gp(r);return e.setNetworkEnabled(!0),(function(s){const i=O(s);return i.Ia.delete(0),hi(i)})(t)}))}function Yv(r){return r.asyncQueue.enqueue((async()=>{const e=await $p(r),t=await Gp(r);return e.setNetworkEnabled(!1),(async function(s){const i=O(s);i.Ia.add(0),await Gr(i),i.Va.set("Offline")})(t)}))}function Xv(r,e,t,n){const s=new Qo(n),i=new hu(e,s,t);return r.asyncQueue.enqueueAndForget((async()=>cu(await Mr(r),i))),()=>{s.Nu(),r.asyncQueue.enqueueAndForget((async()=>uu(await Mr(r),i)))}}function Zv(r,e){const t=new Ce;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await(function(h,f){const m=O(h);return m.persistence.runTransaction("read document","readonly",(g=>m.localDocuments.getDocument(g,f)))})(s,i);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new C(b.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=Wr(c,`Failed to get document '${i} from cache`);o.reject(u)}})(await Qr(r),e,t))),t.promise}function Hp(r,e,t={}){const n=new Ce;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Qo({next:g=>{f.Nu(),o.enqueueAndForget((()=>uu(i,m)));const v=g.docs.has(c);!v&&g.fromCache?h.reject(new C(b.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&g.fromCache&&u&&u.source==="server"?h.reject(new C(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new hu(jr(c.path),f,{includeMetadataChanges:!0,qa:!0});return cu(i,m)})(await Mr(r),r.asyncQueue,e,t,n))),n.promise}function eA(r,e){const t=new Ce;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await To(s,i,!0),u=new Fp(i,c.ks),h=u.ru(c.documents),f=u.applyChanges(h,!1);o.resolve(f.snapshot)}catch(c){const u=Wr(c,`Failed to execute query '${i} against cache`);o.reject(u)}})(await Qr(r),e,t))),t.promise}function Wp(r,e,t={}){const n=new Ce;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Qo({next:g=>{f.Nu(),o.enqueueAndForget((()=>uu(i,m))),g.fromCache&&u.source==="server"?h.reject(new C(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new hu(c,f,{includeMetadataChanges:!0,qa:!0});return cu(i,m)})(await Mr(r),r.asyncQueue,e,t,n))),n.promise}function tA(r,e,t){const n=new Ce;return r.asyncQueue.enqueueAndForget((async()=>{try{const s=await Kp(r);n.resolve((async function(o,c,u){var D;const h=O(o),{request:f,gt:m,parent:g}=Wm(h.serializer,Em(c),u);h.connection.qo||delete f.parent;const v=(await h.jo("RunAggregationQuery",h.serializer.databaseId,g,f,1)).filter((k=>!!k.result));U(v.length===1,64727);const V=(D=v[0].result)==null?void 0:D.aggregateFields;return Object.keys(V).reduce(((k,F)=>(k[m[F]]=V[F],k)),{})})(s,e,t))}catch(s){n.reject(s)}})),n.promise}function nA(r,e){const t=new Ce;return r.asyncQueue.enqueueAndForget((async()=>Cv(await Tu(r),e,t))),t.promise}function rA(r,e){const t=new Qo(e);return r.asyncQueue.enqueueAndForget((async()=>(function(s,i){O(s).Ca.add(i),i.next()})(await Mr(r),t))),()=>{t.Nu(),r.asyncQueue.enqueueAndForget((async()=>(function(s,i){O(s).Ca.delete(i)})(await Mr(r),t)))}}function sA(r,e,t){const n=new Ce;return r.asyncQueue.enqueueAndForget((async()=>{const s=await Kp(r);new Wv(r.asyncQueue,s,t,e,n).ju()})),n.promise}function iA(r,e,t,n){const s=(function(o,c){let u;return u=typeof o=="string"?Um().encode(o):o,(function(f,m){return new Gv(f,m)})((function(f,m){if(f instanceof Uint8Array)return Id(f,m);if(f instanceof ArrayBuffer)return Id(new Uint8Array(f),m);if(f instanceof ReadableStream)return f.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(u),c)})(t,Gn(e));r.asyncQueue.enqueueAndForget((async()=>{$v(await Tu(r),s,n)}))}function oA(r,e){return r.asyncQueue.enqueue((async()=>(function(n,s){const i=O(n);return i.persistence.runTransaction("Get named query","readonly",(o=>i.Pi.getNamedQuery(o,s)))})(await Qr(r),e)))}function Qp(r,e){return(function(n,s){return new Kv(n,s)})(r,e)}function aA(r,e){return r.asyncQueue.enqueue((async()=>(async function(n,s){const i=O(n),o=i.indexManager,c=[];return i.persistence.runTransaction("Configure indexes","readwrite",(u=>o.getFieldIndexes(u).next((h=>(function(m,g,v,V,D){m=[...m],g=[...g],m.sort(v),g.sort(v);const k=m.length,F=g.length;let j=0,q=0;for(;j<F&&q<k;){const ee=v(m[q],g[j]);ee<0?D(m[q++]):ee>0?V(g[j++]):(j++,q++)}for(;j<F;)V(g[j++]);for(;q<k;)D(m[q++])})(h,s,KE,(f=>{c.push(o.addFieldIndex(u,f))}),(f=>{c.push(o.deleteFieldIndex(u,f))})))).next((()=>A.waitFor(c)))))})(await Qr(r),e)))}function cA(r,e){return r.asyncQueue.enqueue((async()=>(function(n,s){O(n).Cs.As=s})(await Qr(r),e)))}function uA(r){return r.asyncQueue.enqueue((async()=>(function(t){const n=O(t),s=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",(i=>s.deleteAllFieldIndexes(i)))})(await Qr(r))))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jp(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lA="ComponentProvider",Td=new Map;function hA(r,e,t,n,s){return new bT(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Jp(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yp="firestore.googleapis.com",wd=!0;class vd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new C(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Yp,this.ssl=wd}else this.host=e.host,this.ssl=e.ssl??wd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=sp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<cp)throw new C(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Mf("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Jp(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new C(b.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new C(b.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new C(b.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class di{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new vd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new C(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new C(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new vd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new xf;switch(n.type){case"firstParty":return new UE(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new C(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=Td.get(t);n&&(N(lA,"Removing Datastore"),Td.delete(t),n.terminate())})(this),Promise.resolve()}}function Xp(r,e,t,n={}){var h;r=W(r,di);const s=Fr(e),i=r._getSettings(),o={...i,emulatorOptions:r._getEmulatorOptions()},c=`${e}:${t}`;s&&yc(`https://${c}`),i.host!==Yp&&i.host!==c&&Ge("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:n};if(!nt(u,o)&&(r._setSettings(u),n.mockUserToken)){let f,m;if(typeof n.mockUserToken=="string")f=n.mockUserToken,m=Se.MOCK_USER;else{f=d_(n.mockUserToken,(h=r._app)==null?void 0:h.options.projectId);const g=n.mockUserToken.sub||n.mockUserToken.user_id;if(!g)throw new C(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new Se(g)}r._authCredentials=new ME(new Nf(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new ve(this.firestore,e,this._query)}}class re{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new et(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new re(this.firestore,e,this._key)}toJSON(){return{type:re._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if($n(t,re._jsonSchema))return new re(e,n||null,new x(H.fromString(t.referencePath)))}}re._jsonSchemaVersion="firestore/documentReference/1.0",re._jsonSchema={type:Ee("string",re._jsonSchemaVersion),referencePath:Ee("string")};class et extends ve{constructor(e,t,n){super(e,t,jr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new re(this.firestore,null,new x(e))}withConverter(e){return new et(this.firestore,e,this._path)}}function dA(r,e,...t){if(r=ae(r),Cc("collection","path",e),r instanceof di){const n=H.fromString(e,...t);return hh(n),new et(r,null,n)}{if(!(r instanceof re||r instanceof et))throw new C(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(H.fromString(e,...t));return hh(n),new et(r.firestore,null,n)}}function fA(r,e){if(r=W(r,di),Cc("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new C(b.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new ve(r,null,(function(n){return new At(H.emptyPath(),n)})(e))}function Zp(r,e,...t){if(r=ae(r),arguments.length===1&&(e=Vo.newId()),Cc("doc","path",e),r instanceof di){const n=H.fromString(e,...t);return lh(n),new re(r,null,new x(n))}{if(!(r instanceof re||r instanceof et))throw new C(b.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(H.fromString(e,...t));return lh(n),new re(r.firestore,r instanceof et?r.converter:null,new x(n))}}function mA(r,e){return r=ae(r),e=ae(e),(r instanceof re||r instanceof et)&&(e instanceof re||e instanceof et)&&r.firestore===e.firestore&&r.path===e.path&&r.converter===e.converter}function wu(r,e){return r=ae(r),e=ae(e),r instanceof ve&&e instanceof ve&&r.firestore===e.firestore&&oi(r._query,e._query)&&r.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad="AsyncQueue";class Rd{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ru(this,"async_queue_retry"),this._c=()=>{const n=eo();n&&N(Ad,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=eo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=eo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Ce;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!an(e))throw e;N(Ad,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((n=>{throw this.nc=n,this.rc=!1,_e("INTERNAL UNHANDLED ERROR: ",bd(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=au.createAndSchedule(this,e,t,n,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&L(47125,{Pc:bd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function bd(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(){this._progressObserver={},this._taskCompletionResolver=new Ce,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pA=-1;class ie extends di{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Rd,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Rd(e),this._firestoreClient=void 0,await e}}}function gA(r,e,t){t||(t=zs);const n=Xs(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(nt(i,e))return s;throw new C(b.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new C(b.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<cp)throw new C(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Fr(e.host)&&yc(e.host),n.initialize({options:e,instanceIdentifier:t})}function _A(r,e){const t=typeof r=="object"?r:$d(),n=typeof r=="string"?r:e||zs,s=Xs(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=l_("firestore");i&&Xp(s,...i)}return s}function me(r){if(r._terminated)throw new C(b.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||tg(r),r._firestoreClient}function tg(r){var n,s,i,o;const e=r._freezeSettings(),t=hA(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,e);r._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new Qv(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}})(r._componentsProvider))}function yA(r,e){Ge("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return ng(r,nn.provider,{build:n=>new Iu(n,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function IA(r){Ge("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();ng(r,nn.provider,{build:t=>new zp(t,e.cacheSizeBytes)})}function ng(r,e,t){if((r=W(r,ie))._firestoreClient||r._terminated)throw new C(b.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new C(b.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},tg(r)}function EA(r){if(r._initialized&&!r._terminated)throw new C(b.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Ce;return r._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(n){if(!lt.v())return Promise.resolve();const s=n+mp;await lt.delete(s)})(Zc(r._databaseId,r._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function TA(r){return(function(t){const n=new Ce;return t.asyncQueue.enqueueAndForget((async()=>Nv(await Tu(t),n))),n.promise})(me(r=W(r,ie)))}function wA(r){return Jv(me(r=W(r,ie)))}function vA(r){return Yv(me(r=W(r,ie)))}function AA(r){return hy(r.app,"firestore",r._databaseId.database),r._delete()}function gc(r,e){const t=me(r=W(r,ie)),n=new eg;return iA(t,r._databaseId,e,n),n}function rg(r,e){return oA(me(r=W(r,ie)),e).then((t=>t?new ve(r,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ue(pe.fromBase64String(e))}catch(t){throw new C(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ue(pe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ue._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if($n(e,Ue._jsonSchema))return Ue.fromBase64String(e.bytes)}}Ue._jsonSchemaVersion="firestore/bytes/1.0",Ue._jsonSchema={type:Ee("string",Ue._jsonSchemaVersion),bytes:Ee("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new C(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new he(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function RA(){return new Kn(Ka)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new C(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new C(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:tt._jsonSchemaVersion}}static fromJSON(e){if($n(e,tt._jsonSchema))return new tt(e.latitude,e.longitude)}}tt._jsonSchemaVersion="firestore/geoPoint/1.0",tt._jsonSchema={type:Ee("string",tt._jsonSchemaVersion),latitude:Ee("number"),longitude:Ee("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:We._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if($n(e,We._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new We(e.vectorValues);throw new C(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}We._jsonSchemaVersion="firestore/vectorValue/1.0",We._jsonSchema={type:Ee("string",We._jsonSchemaVersion),vectorValues:Ee("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bA=/^__.*__$/;class SA{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new bt(e,this.data,this.fieldMask,t,this.fieldTransforms):new zr(e,this.data,t,this.fieldTransforms)}}class sg{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new bt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function ig(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L(40011,{dataSource:r})}}class Yo{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Yo({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.i({path:t,arrayElement:!1});return n.mc(e),n}fc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.i({path:t,arrayElement:!1});return n.Ac(),n}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Ro(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(ig(this.dataSource)&&bA.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class PA{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Gn(e)}I(e,t,n,s=!1){return new Yo({dataSource:e,methodName:t,targetDoc:n,path:he.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Hn(r){const e=r._freezeSettings(),t=Gn(r._databaseId);return new PA(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Xo(r,e,t,n,s,i={}){const o=r.I(i.merge||i.mergeFields?2:0,e,t,s);Cu("Data must be an object, but it was:",o,n);const c=cg(n,o);let u,h;if(i.merge)u=new qe(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const g=wt(e,m,t);if(!o.contains(g))throw new C(b.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);lg(f,g)||f.push(g)}u=new qe(f),h=o.fieldTransforms.filter((m=>u.covers(m.field)))}else u=null,h=o.fieldTransforms;return new SA(new Pe(c),u,h)}class fi extends hn{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof fi}}function og(r,e,t){return new Yo({dataSource:3,targetDoc:e.settings.targetDoc,methodName:r._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class vu extends hn{_toFieldTransform(e){return new ci(e.path,new Pr)}isEqual(e){return e instanceof vu}}class Au extends hn{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=og(this,e,!0),n=this.Sc.map((i=>Wn(i,t))),s=new Ln(n);return new ci(e.path,s)}isEqual(e){return e instanceof Au&&nt(this.Sc,e.Sc)}}class Ru extends hn{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=og(this,e,!0),n=this.Sc.map((i=>Wn(i,t))),s=new Fn(n);return new ci(e.path,s)}isEqual(e){return e instanceof Ru&&nt(this.Sc,e.Sc)}}class bu extends hn{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new Cr(e.serializer,Cm(e.serializer,this.bc));return new ci(e.path,t)}isEqual(e){return e instanceof bu&&this.bc===e.bc}}function Su(r,e,t,n){const s=r.I(1,e,t);Cu("Data must be an object, but it was:",s,n);const i=[],o=Pe.empty();cn(n,((u,h)=>{const f=Vu(e,u,t);h=ae(h);const m=s.fc(f);if(h instanceof fi)i.push(f);else{const g=Wn(h,m);g!=null&&(i.push(f),o.set(f,g))}}));const c=new qe(i);return new sg(o,c,s.fieldTransforms)}function Pu(r,e,t,n,s,i){const o=r.I(1,e,t),c=[wt(e,n,t)],u=[s];if(i.length%2!=0)throw new C(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(wt(e,i[g])),u.push(i[g+1]);const h=[],f=Pe.empty();for(let g=c.length-1;g>=0;--g)if(!lg(h,c[g])){const v=c[g];let V=u[g];V=ae(V);const D=o.fc(v);if(V instanceof fi)h.push(v);else{const k=Wn(V,D);k!=null&&(h.push(v),f.set(v,k))}}const m=new qe(h);return new sg(f,m,o.fieldTransforms)}function ag(r,e,t,n=!1){return Wn(t,r.I(n?4:3,e))}function Wn(r,e){if(ug(r=ae(r)))return Cu("Unsupported field value:",e,r),cg(r,e);if(r instanceof hn)return(function(n,s){if(!ig(s.dataSource))throw s.yc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(n,s){const i=[];let o=0;for(const c of n){let u=Wn(c,s.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(r,e)}return(function(n,s){if((n=ae(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Cm(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=te.fromDate(n);return{timestampValue:Vr(s.serializer,i)}}if(n instanceof te){const i=new te(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Vr(s.serializer,i)}}if(n instanceof tt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ue)return{bytesValue:jm(s.serializer,n._byteString)};if(n instanceof re){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Hc(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof We)return(function(o,c){const u=o instanceof We?o.toArray():o;return{mapValue:{fields:{[Mc]:{stringValue:Lc},[Rr]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.yc("VectorValues must only contain numeric values.");return qc(c.serializer,f)}))}}}}}})(n,s);if(Zm(n))return n._toProto(s.serializer);throw s.yc(`Unsupported field value: ${Do(n)}`)})(r,e)}function cg(r,e){const t={};return nm(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):cn(r,((n,s)=>{const i=Wn(s,e.dc(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function ug(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof te||r instanceof tt||r instanceof Ue||r instanceof re||r instanceof hn||r instanceof We||Zm(r))}function Cu(r,e,t){if(!ug(t)||!Lf(t)){const n=Do(t);throw n==="an object"?e.yc(r+" a custom object"):e.yc(r+" "+n)}}function wt(r,e,t){if((e=ae(e))instanceof Kn)return e._internalPath;if(typeof e=="string")return Vu(r,e);throw Ro("Field path arguments must be of type string or ",r,!1,void 0,t)}const CA=new RegExp("[~\\*/\\[\\]]");function Vu(r,e,t){if(e.search(CA)>=0)throw Ro(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Kn(...e.split("."))._internalPath}catch{throw Ro(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Ro(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${n}`),o&&(u+=` in document ${s}`),u+=")"),new C(b.INVALID_ARGUMENT,c+r+u)}function lg(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{convertValue(e,t="none"){switch(Xt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return de(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Tt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return cn(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){var n,s,i;const t=(i=(s=(n=e.fields)==null?void 0:n[Rr].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>de(o.doubleValue)));return new We(t)}convertGeoPoint(e){return new tt(de(e.latitude),de(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Lo(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(js(e));default:return null}}convertTimestamp(e){const t=Et(e);return new te(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=H.fromString(e);U(Xm(n),9688,{name:e});const s=new Yt(n.get(1),n.get(3)),i=new x(n.popFirst(5));return s.isEqual(t)||_e(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn extends Du{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ue(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new re(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VA(){return new fi("deleteField")}function DA(){return new vu("serverTimestamp")}function kA(...r){return new Au("arrayUnion",r)}function NA(...r){return new Ru("arrayRemove",r)}function xA(r){return new bu("increment",r)}function OA(r){return new We(r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MA(r){var n;const e=me(W(r.firestore,ie)),t=(n=e._onlineComponents)==null?void 0:n.datastore.serializer;return t===void 0?null:jo(t,Oe(r._query)).ft}function LA(r,e){var i;const t=tm(e,((o,c)=>new Mm(c,o.aggregateType,o._internalFieldPath))),n=me(W(r.firestore,ie)),s=(i=n._onlineComponents)==null?void 0:i.datastore.serializer;return s===void 0?null:Wm(s,Em(r._query),t,!0).request}const Sd="@firebase/firestore",Pd="4.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class hg{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new Pe({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new FA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(wt("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class FA extends Qs{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dg(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new C(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ku{}class Jr extends ku{}function UA(r,e,...t){let n=[];e instanceof ku&&n.push(e),n=n.concat(t),(function(i){const o=i.filter((u=>u instanceof Qn)).length,c=i.filter((u=>u instanceof Yr)).length;if(o>1||o>0&&c>0)throw new C(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class Yr extends Jr{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Yr(e,t,n)}_apply(e){const t=this._parse(e);return mg(e._query,t),new ve(e.firestore,e.converter,rc(e._query,t))}_parse(e){const t=Hn(e.firestore);return(function(i,o,c,u,h,f,m){let g;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new C(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Vd(m,f);const V=[];for(const D of m)V.push(Cd(u,i,D));g={arrayValue:{values:V}}}else g=Cd(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Vd(m,f),g=ag(c,o,m,f==="in"||f==="not-in");return J.create(h,f,g)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function BA(r,e,t){const n=e,s=wt("where",r);return Yr._create(s,n,t)}class Qn extends ku{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Qn(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:ne.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)mg(o,u),o=rc(o,u)})(e._query,t),new ve(e.firestore,e.converter,rc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function qA(...r){return r.forEach((e=>pg("or",e))),Qn._create("or",r)}function jA(...r){return r.forEach((e=>pg("and",e))),Qn._create("and",r)}class Zo extends Jr{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Zo(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new C(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new C(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ks(i,o)})(e._query,this._field,this._direction);return new ve(e.firestore,e.converter,UT(e._query,t))}}function zA(r,e="asc"){const t=e,n=wt("orderBy",r);return Zo._create(n,t)}class mi extends Jr{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new mi(e,t,n)}_apply(e){return new ve(e.firestore,e.converter,go(e._query,this._limit,this._limitType))}}function $A(r){return Ff("limit",r),mi._create("limit",r,"F")}function GA(r){return Ff("limitToLast",r),mi._create("limitToLast",r,"L")}class pi extends Jr{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new pi(e,t,n)}_apply(e){const t=fg(e,this.type,this._docOrFields,this._inclusive);return new ve(e.firestore,e.converter,BT(e._query,t))}}function KA(...r){return pi._create("startAt",r,!0)}function HA(...r){return pi._create("startAfter",r,!1)}class gi extends Jr{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new gi(e,t,n)}_apply(e){const t=fg(e,this.type,this._docOrFields,this._inclusive);return new ve(e.firestore,e.converter,qT(e._query,t))}}function WA(...r){return gi._create("endBefore",r,!1)}function QA(...r){return gi._create("endAt",r,!0)}function fg(r,e,t,n){if(t[0]=ae(t[0]),t[0]instanceof Qs)return(function(i,o,c,u,h){if(!u)throw new C(b.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const f=[];for(const m of dr(i))if(m.field.isKeyField())f.push(On(o,u.key));else{const g=u.data.field(m.field);if(Mo(g))throw new C(b.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const v=m.field.canonicalString();throw new C(b.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${v}' (used as the orderBy) does not exist.`)}f.push(g)}return new en(f,h)})(r._query,r.firestore._databaseId,e,t[0]._document,n);{const s=Hn(r.firestore);return(function(o,c,u,h,f,m){const g=o.explicitOrderBy;if(f.length>g.length)throw new C(b.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const v=[];for(let V=0;V<f.length;V++){const D=f[V];if(g[V].field.isKeyField()){if(typeof D!="string")throw new C(b.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof D}`);if(!Uc(o)&&D.indexOf("/")!==-1)throw new C(b.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${D}' contains a slash.`);const k=o.path.child(H.fromString(D));if(!x.isDocumentKey(k))throw new C(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${k}' is not because it contains an odd number of segments.`);const F=new x(k);v.push(On(c,F))}else{const k=ag(u,h,D);v.push(k)}}return new en(v,m)})(r._query,r.firestore._databaseId,s,e,t,n)}}function Cd(r,e,t){if(typeof(t=ae(t))=="string"){if(t==="")throw new C(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Uc(e)&&t.indexOf("/")!==-1)throw new C(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(H.fromString(t));if(!x.isDocumentKey(n))throw new C(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return On(r,new x(n))}if(t instanceof re)return On(r,t._key);throw new C(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Do(t)}.`)}function Vd(r,e){if(!Array.isArray(r)||r.length===0)throw new C(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function mg(r,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new C(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new C(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function pg(r,e){if(!(e instanceof Yr||e instanceof Qn))throw new C(b.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function ea(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class Nu extends Du{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ue(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new re(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JA(r){return new Lr("sum",wt("sum",r))}function YA(r){return new Lr("avg",wt("average",r))}function gg(){return new Lr("count")}function XA(r,e){var t,n;return r instanceof Lr&&e instanceof Lr&&r.aggregateType===e.aggregateType&&((t=r._internalFieldPath)==null?void 0:t.canonicalString())===((n=e._internalFieldPath)==null?void 0:n.canonicalString())}function ZA(r,e){return wu(r.query,e.query)&&nt(r.data(),e.data())}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eR(r){return _g(r,{count:gg()})}function _g(r,e){const t=W(r.firestore,ie),n=me(t),s=tm(e,((i,o)=>new Mm(o,i.aggregateType,i._internalFieldPath)));return tA(n,r._query,s).then((i=>(function(c,u,h){const f=new dn(c);return new hg(u,f,h)})(t,r,i)))}class tR{constructor(e){this.kind="memory",this._onlineComponentProvider=nn.provider,this._offlineComponentProvider=e!=null&&e.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new yu(void 0)}}toJSON(){return{kind:this.kind}}}class nR{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=yg(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class rR{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Or.provider}toJSON(){return{kind:this.kind}}}class sR{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new yu(e)}}toJSON(){return{kind:this.kind}}}function iR(){return new rR}function oR(r){return new sR(r==null?void 0:r.cacheSizeBytes)}function aR(r){return new tR(r)}function cR(r){return new nR(r)}class uR{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=nn.provider,this._offlineComponentProvider={build:t=>new Iu(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class lR{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=nn.provider,this._offlineComponentProvider={build:t=>new zp(t,e==null?void 0:e.cacheSizeBytes)}}}function yg(r){return new uR(r==null?void 0:r.forceOwnership)}function hR(){return new lR}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ig="NOT SUPPORTED";class _t{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ze extends Qs{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Os(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(wt("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new C(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ze._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function dR(r,e,t){if($n(e,ze._jsonSchema)){if(e.bundle===Ig)throw new C(b.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=Gn(r._databaseId),s=Qp(e.bundle,n),i=s.Qu(),o=new du(s.getMetadata(),n);for(const f of i)o.Ga(f);const c=o.documents;if(c.length!==1)throw new C(b.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=qo(n,c[0].document),h=new x(H.fromString(e.bundleName));return new ze(r,new Nu(r),h,u,new _t(!1,!1),t||null)}}ze._jsonSchemaVersion="firestore/documentSnapshot/1.0",ze._jsonSchema={type:Ee("string",ze._jsonSchemaVersion),bundleSource:Ee("string","DocumentSnapshot"),bundleName:Ee("string"),bundle:Ee("string")};class Os extends ze{data(e={}){return super.data(e)}}class $e{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new _t(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new Os(this._firestore,this._userDataWriter,n.key,n,new _t(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new C(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new Os(s._firestore,s._userDataWriter,c.doc.key,c.doc,new _t(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new Os(s._firestore,s._userDataWriter,c.doc.key,c.doc,new _t(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:mR(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new C(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=$e._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Vo.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function fR(r,e,t){if($n(e,$e._jsonSchema)){if(e.bundle===Ig)throw new C(b.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=Gn(r._databaseId),s=Qp(e.bundle,n),i=s.Qu(),o=new du(s.getMetadata(),n);for(const g of i)o.Ga(g);if(o.queries.length!==1)throw new C(b.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const c=zo(o.queries[0].bundledQuery),u=o.documents;let h=new kn;u.map((g=>{const v=qo(n,g.document);h=h.add(v)}));const f=zn.fromInitialDocuments(c,h,G(),!1,!1),m=new ve(r,t||null,c);return new $e(r,new Nu(r),m,f)}}function mR(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L(61501,{type:r})}}function pR(r,e){return r instanceof ze&&e instanceof ze?r._firestore===e._firestore&&r._key.isEqual(e._key)&&(r._document===null?e._document===null:r._document.isEqual(e._document))&&r._converter===e._converter:r instanceof $e&&e instanceof $e&&r._firestore===e._firestore&&wu(r.query,e.query)&&r.metadata.isEqual(e.metadata)&&r._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */$e._jsonSchemaVersion="firestore/querySnapshot/1.0",$e._jsonSchema={type:Ee("string",$e._jsonSchemaVersion),bundleSource:Ee("string","QuerySnapshot"),bundleName:Ee("string"),bundle:Ee("string")};const gR={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Hn(e)}set(e,t,n){this._verifyNotCommitted();const s=Gt(e,this._firestore),i=ea(s.converter,t,n),o=Xo(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(o.toMutation(s._key,fe.none())),this}update(e,t,n,...s){this._verifyNotCommitted();const i=Gt(e,this._firestore);let o;return o=typeof(t=ae(t))=="string"||t instanceof Kn?Pu(this._dataReader,"WriteBatch.update",i._key,t,n,s):Su(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,fe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Gt(e,this._firestore);return this._mutations=this._mutations.concat(new $r(t._key,fe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new C(b.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Gt(r,e){if((r=ae(r)).firestore!==e)throw new C(b.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _R{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Hn(e)}get(e){const t=Gt(e,this._firestore),n=new Nu(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return L(24041);const i=s[0];if(i.isFoundDocument())return new Qs(this._firestore,n,i.key,i,t.converter);if(i.isNoDocument())return new Qs(this._firestore,n,t._key,null,t.converter);throw L(18433,{doc:i})}))}set(e,t,n){const s=Gt(e,this._firestore),i=ea(s.converter,t,n),o=Xo(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,n);return this._transaction.set(s._key,o),this}update(e,t,n,...s){const i=Gt(e,this._firestore);let o;return o=typeof(t=ae(t))=="string"||t instanceof Kn?Pu(this._dataReader,"Transaction.update",i._key,t,n,s):Su(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=Gt(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg extends _R{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Gt(e,this._firestore),n=new dn(this._firestore);return super.get(e).then((s=>new ze(this._firestore,n,t._key,s._document,new _t(!1,!1),t.converter)))}}function yR(r,e,t){r=W(r,ie);const n={...gR,...t};(function(o){if(o.maxAttempts<1)throw new C(b.INVALID_ARGUMENT,"Max attempts must be at least 1")})(n);const s=me(r);return sA(s,(i=>e(new Tg(r,i))),n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IR(r){r=W(r,re);const e=W(r.firestore,ie),t=me(e);return Hp(t,r._key).then((n=>xu(e,r,n)))}function ER(r){r=W(r,re);const e=W(r.firestore,ie),t=me(e),n=new dn(e);return Zv(t,r._key).then((s=>new ze(e,n,r._key,s,new _t(s!==null&&s.hasLocalMutations,!0),r.converter)))}function TR(r){r=W(r,re);const e=W(r.firestore,ie),t=me(e);return Hp(t,r._key,{source:"server"}).then((n=>xu(e,r,n)))}function wR(r){r=W(r,ve);const e=W(r.firestore,ie),t=me(e),n=new dn(e);return dg(r._query),Wp(t,r._query).then((s=>new $e(e,n,r,s)))}function vR(r){r=W(r,ve);const e=W(r.firestore,ie),t=me(e),n=new dn(e);return eA(t,r._query).then((s=>new $e(e,n,r,s)))}function AR(r){r=W(r,ve);const e=W(r.firestore,ie),t=me(e),n=new dn(e);return Wp(t,r._query,{source:"server"}).then((s=>new $e(e,n,r,s)))}function RR(r,e,t){r=W(r,re);const n=W(r.firestore,ie),s=ea(r.converter,e,t),i=Hn(n);return Xr(n,[Xo(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,fe.none())])}function bR(r,e,t,...n){r=W(r,re);const s=W(r.firestore,ie),i=Hn(s);let o;return o=typeof(e=ae(e))=="string"||e instanceof Kn?Pu(i,"updateDoc",r._key,e,t,n):Su(i,"updateDoc",r._key,e),Xr(s,[o.toMutation(r._key,fe.exists(!0))])}function SR(r){return Xr(W(r.firestore,ie),[new $r(r._key,fe.none())])}function PR(r,e){const t=W(r.firestore,ie),n=Zp(r),s=ea(r.converter,e),i=Hn(r.firestore);return Xr(t,[Xo(i,"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,fe.exists(!1))]).then((()=>n))}function _c(r,...e){var h,f,m;r=ae(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||mr(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(mr(e[n])){const g=e[n];e[n]=(h=g.next)==null?void 0:h.bind(g),e[n+1]=(f=g.error)==null?void 0:f.bind(g),e[n+2]=(m=g.complete)==null?void 0:m.bind(g)}let i,o,c;if(r instanceof re)o=W(r.firestore,ie),c=jr(r._key.path),i={next:g=>{e[n]&&e[n](xu(o,r,g))},error:e[n+1],complete:e[n+2]};else{const g=W(r,ve);o=W(g.firestore,ie),c=g._query;const v=new dn(o);i={next:V=>{e[n]&&e[n](new $e(o,v,g,V))},error:e[n+1],complete:e[n+2]},dg(r._query)}const u=me(o);return Xv(u,c,s,i)}function CR(r,e,...t){const n=ae(r),s=(function(u){const h={bundle:"",bundleName:"",bundleSource:""},f=["bundle","bundleName","bundleSource"];for(const m of f){if(!(m in u)){h.error=`snapshotJson missing required field: ${m}`;break}const g=u[m];if(typeof g!="string"){h.error=`snapshotJson field '${m}' must be a string.`;break}if(g.length===0){h.error=`snapshotJson field '${m}' cannot be an empty string.`;break}m==="bundle"?h.bundle=g:m==="bundleName"?h.bundleName=g:m==="bundleSource"&&(h.bundleSource=g)}return h})(e);if(s.error)throw new C(b.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||mr(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let c=null;if(typeof t[o]=="object"&&mr(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(h,f,m,g,v){let V,D=!1;return gc(h,f.bundle).then((()=>rg(h,f.bundleName))).then((F=>{F&&!D&&(v&&F.withConverter(v),V=_c(F,m||{},g))})).catch((F=>(g.error&&g.error(F),()=>{}))),()=>{D||(D=!0,V&&V())}})(n,s,i,c,t[o])}if(s.bundleSource==="DocumentSnapshot"){let c=null;if(typeof t[o]=="object"&&mr(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(h,f,m,g,v){let V,D=!1;return gc(h,f.bundle).then((()=>{if(!D){const F=new re(h,v||null,x.fromPath(f.bundleName));V=_c(F,m||{},g)}})).catch((F=>(g.error&&g.error(F),()=>{}))),()=>{D||(D=!0,V&&V())}})(n,s,i,c,t[o])}throw new C(b.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function VR(r,e){r=W(r,ie);const t=me(r),n=mr(e)?e:{next:e};return rA(t,n)}function Xr(r,e){const t=me(r);return nA(t,e)}function xu(r,e,t){const n=t.docs.get(e._key),s=new dn(r);return new ze(r,s,e._key,n,new _t(t.hasPendingWrites,t.fromCache),e.converter)}function DR(r){return r=W(r,ie),me(r),new Eg(r,(e=>Xr(r,e)))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kR(r,e){r=W(r,ie);const t=me(r);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return Ge("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=(function(i){const o=typeof i=="string"?(function(h){try{return JSON.parse(h)}catch(f){throw new C(b.INVALID_ARGUMENT,"Failed to parse JSON: "+(f==null?void 0:f.message))}})(i):i,c=[];if(Array.isArray(o.indexes))for(const u of o.indexes){const h=Dd(u,"collectionGroup"),f=[];if(Array.isArray(u.fields))for(const m of u.fields){const g=Dd(m,"fieldPath"),v=Vu("setIndexConfiguration",g);m.arrayConfig==="CONTAINS"?f.push(new Vn(v,2)):m.order==="ASCENDING"?f.push(new Vn(v,0)):m.order==="DESCENDING"&&f.push(new Vn(v,1))}c.push(new Ir(Ir.UNKNOWN_ID,h,f,Er.empty()))}return c})(e);return aA(t,n)}function Dd(r,e){if(typeof r[e]!="string")throw new C(b.INVALID_ARGUMENT,"Missing string value for: "+e);return r[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wg{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function NR(r){var s;r=W(r,ie);const e=kd.get(r);if(e)return e;if(((s=me(r)._uninitializedComponentsProvider)==null?void 0:s._offline.kind)!=="persistent")return null;const n=new wg(r);return kd.set(r,n),n}function xR(r){vg(r,!0)}function OR(r){vg(r,!1)}function MR(r){const e=me(r._firestore);uA(e).then((t=>N("deleting all persistent cache indexes succeeded"))).catch((t=>Ge("deleting all persistent cache indexes failed",t)))}function vg(r,e){const t=me(r._firestore);cA(t,e).then((n=>N(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((n=>Ge(`setting persistent cache index auto creation isEnabled=${e} failed`,n)))}const kd=new WeakMap;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LR{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Ou.instance.onExistenceFilterMismatch(e)}}class Ou{constructor(){this.t=new Map}static get instance(){return Bi||(Bi=new Ou,ew(Bi)),Bi}o(e){this.t.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.t;return n.set(t,e),()=>n.delete(t)}}let Bi=null;(function(e,t=!0){NE(Ur),pr(new Nn("firestore",((n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),c=new ie(new LE(n.getProvider("auth-internal")),new BE(o,n.getProvider("app-check-internal")),ST(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Ht(Sd,Pd,e),Ht(Sd,Pd,"esm2020")})();const WR=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Du,AggregateField:Lr,AggregateQuerySnapshot:hg,Bytes:Ue,CACHE_SIZE_UNLIMITED:pA,CollectionReference:et,DocumentReference:re,DocumentSnapshot:ze,FieldPath:Kn,FieldValue:hn,Firestore:ie,FirestoreError:C,GeoPoint:tt,LoadBundleTask:eg,PersistentCacheIndexManager:wg,Query:ve,QueryCompositeFilterConstraint:Qn,QueryConstraint:Jr,QueryDocumentSnapshot:Os,QueryEndAtConstraint:gi,QueryFieldFilterConstraint:Yr,QueryLimitConstraint:mi,QueryOrderByConstraint:Zo,QuerySnapshot:$e,QueryStartAtConstraint:pi,SnapshotMetadata:_t,Timestamp:te,Transaction:Tg,VectorValue:We,WriteBatch:Eg,_AutoId:Vo,_ByteString:pe,_DatabaseId:Yt,_DocumentKey:x,_EmptyAppCheckTokenProvider:qE,_EmptyAuthCredentialsProvider:xf,_FieldPath:he,_TestingHooks:LR,_cast:W,_debugAssert:OE,_internalAggregationQueryToProtoRunAggregationQueryRequest:LA,_internalQueryToProtoQueryTarget:MA,_isBase64Available:AT,_logWarn:Ge,_validateIsNotUsedTogether:Mf,addDoc:PR,aggregateFieldEqual:XA,aggregateQuerySnapshotEqual:ZA,and:jA,arrayRemove:NA,arrayUnion:kA,average:YA,clearIndexedDbPersistence:EA,collection:dA,collectionGroup:fA,connectFirestoreEmulator:Xp,count:gg,deleteAllPersistentCacheIndexes:MR,deleteDoc:SR,deleteField:VA,disableNetwork:vA,disablePersistentCacheIndexAutoCreation:OR,doc:Zp,documentId:RA,documentSnapshotFromJSON:dR,enableIndexedDbPersistence:yA,enableMultiTabIndexedDbPersistence:IA,enableNetwork:wA,enablePersistentCacheIndexAutoCreation:xR,endAt:QA,endBefore:WA,ensureFirestoreConfigured:me,executeWrite:Xr,getAggregateFromServer:_g,getCountFromServer:eR,getDoc:IR,getDocFromCache:ER,getDocFromServer:TR,getDocs:wR,getDocsFromCache:vR,getDocsFromServer:AR,getFirestore:_A,getPersistentCacheIndexManager:NR,increment:xA,initializeFirestore:gA,limit:$A,limitToLast:GA,loadBundle:gc,memoryEagerGarbageCollector:iR,memoryLocalCache:aR,memoryLruGarbageCollector:oR,namedQuery:rg,onSnapshot:_c,onSnapshotResume:CR,onSnapshotsInSync:VR,or:qA,orderBy:zA,persistentLocalCache:cR,persistentMultipleTabManager:hR,persistentSingleTabManager:yg,query:UA,queryEqual:wu,querySnapshotFromJSON:fR,refEqual:mA,runTransaction:yR,serverTimestamp:DA,setDoc:RR,setIndexConfiguration:kR,setLogLevel:xE,snapshotEqual:pR,startAfter:HA,startAt:KA,sum:JA,terminate:AA,updateDoc:bR,vector:OA,waitForPendingWrites:TA,where:BA,writeBatch:DR},Symbol.toStringTag,{value:"Module"}));var FR="firebase",UR="12.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ht(FR,UR,"app");export{Ut as G,te as T,gA as a,TR as b,hR as c,Zp as d,dA as e,jR as f,GR as g,zR as h,my as i,$R as j,IR as k,DA as l,SR as m,wR as n,_c as o,cR as p,UA as q,PR as r,RR as s,zA as t,bR as u,qR as v,BA as w,WR as x};
