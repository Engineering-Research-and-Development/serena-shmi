(function(e){function n(n){for(var r,a,u=n[0],i=n[1],s=n[2],l=0,d=[];l<u.length;l++)a=u[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);p&&p(n);while(d.length)d.shift()();return c.push.apply(c,s||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],r=!0,a=1;a<t.length;a++){var u=t[a];0!==o[u]&&(r=!1)}r&&(c.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},o={app:0},c=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-0b1fc962":"4ef6900c","chunk-2d2268db":"78988c5e","chunk-47c9d12c":"96ca1004","chunk-2d0aad1c":"2e6bc6e8","chunk-2d0c4303":"84b55d9b","chunk-2d213307":"7e25497d","chunk-2d22c303":"620357c5","chunk-4ae8ad29":"90a64c5a"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-47c9d12c":1,"chunk-4ae8ad29":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-0b1fc962":"31d6cfe0","chunk-2d2268db":"31d6cfe0","chunk-47c9d12c":"e8debf37","chunk-2d0aad1c":"31d6cfe0","chunk-2d0c4303":"31d6cfe0","chunk-2d213307":"31d6cfe0","chunk-2d22c303":"31d6cfe0","chunk-4ae8ad29":"b7f87d03"}[e]+".css",o=i.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var s=c[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===o))return n()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){s=d[u],l=s.getAttribute("data-href");if(l===r||l===o)return n()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=n,p.onerror=function(n){var r=n&&n.target&&n.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],p.parentNode.removeChild(p),t(c)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)n.push(r[2]);else{var c=new Promise((function(n,t){r=o[e]=[n,t]}));n.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var d=new Error;s=function(n){l.onerror=l.onload=null,clearTimeout(p);var t=o[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,t[1](d)}o[e]=void 0}};var p=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=n,s=s.slice();for(var d=0;d<s.length;d++)n(s[d]);var p=l;c.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("c975"),t("baa5"),t("fb6a"),t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("router-view")},o=[],c=(t("5c0b"),t("2877")),u={},i=Object(c["a"])(u,a,o,!1,null,null,null),s=i.exports,l=(t("d3b7"),t("8c4f")),d=function(){return Promise.all([t.e("chunk-0b1fc962"),t.e("chunk-2d2268db")]).then(t.bind(null,"e8c5"))},p=function(){return Promise.all([t.e("chunk-0b1fc962"),t.e("chunk-47c9d12c")]).then(t.bind(null,"7277"))},f=function(){return t.e("chunk-4ae8ad29").then(t.bind(null,"f23e"))},h=function(){return t.e("chunk-2d0c4303").then(t.bind(null,"3a87"))},E=function(){return t.e("chunk-2d22c303").then(t.bind(null,"f1bd"))},m=function(){return t.e("chunk-2d213307").then(t.bind(null,"ac2a"))},L=function(){return t.e("chunk-2d0aad1c").then(t.bind(null,"1348"))};r["default"].use(l["a"]);var R=[{path:"/",redirect:"/home",name:"Homepage",component:d,children:[{path:"home",name:"Home",component:f},{path:"dashboard",name:"Dashboard",component:p}]},{path:"/pages",redirect:"/pages/404",name:"Pages",component:{render:function(e){return e("router-view")}},children:[{path:"404",name:"Page404",component:h},{path:"500",name:"Page500",component:E}]},{path:"/user",redirect:"/user/login",name:"User",component:{render:function(e){return e("router-view")}},children:[{path:"login",name:"Login",component:m},{path:"register",name:"Register",component:L}]}],_=new l["a"]({mode:"history",linkActiveClass:"open active",scrollBehavior:function(){return{y:0}},routes:R}),b=_,g=t("5f5b"),v=t("bc3a"),O=t.n(v),P=t("ace7"),y=t.n(P);r["default"].config.productionTip=!1,r["default"].use(g["a"]),r["default"].prototype.$http=O.a,r["default"].prototype.$config=y.a,r["default"].prototype.SerenaResourceAddressFromURL=function(e){return e.substr(e.indexOf("/")+1)},r["default"].prototype.LocalNifiResourceAddressFromURL=function(e){return e.substr(e.indexOf(":")+1)},r["default"].prototype.SerenaResourceListNameFromURL=function(e){return e.substr(e.lastIndexOf("/")+1)},r["default"].prototype.SerenaSingleResourceNameFromURL=function(e){return e.slice(0,-1)},r["default"].component("enterprise-component",{template:'\n    <router-link tag="li" class="nav-item nav-dropdown" :to="enterprise.url" disabled>\n    <div class="nav-link nav-dropdown-toggle" @click="handleClick">\n      <i :class="enterprise.classIcon"></i>\n      {{enterprise.name}}\n    </div>\n    <ul class="nav-dropdown-items">\n      <slot></slot>\n    </ul>\n  </router-link>\n  ',props:{enterprise:Object}}),new r["default"]({router:b,render:function(e){return e(s)}}).$mount("#app")},"5c0b":function(e,n,t){"use strict";var r=t("9c0c"),a=t.n(r);a.a},"9c0c":function(e,n,t){},ace7:function(e,n,t){e.exports={stage:"production",localMetadataApiUrl:"PLACEHOLDER_SHMI_WEBSERVER_URL_PLACEHOLDER/api/metadata/api/1.0",serenaPredictionUrl:"PLACEHOLDER_SHMI_WEBSERVER_URL_PLACEHOLDER/api/metadata/api/1.0/meas_location",visualization_links:{"Punching Tool":"PLACEHOLDER_SYN_WEBSERVER_URL_PLACEHOLDER/syn-vis/pages/use-case/kone/visualization/combi/index.html",RobotBox:"PLACEHOLDER_SYN_WEBSERVER_URL_PLACEHOLDER/syn-vis/pages/use-case/comau/visualization/robotbox/index.html"},training_links:{"Punching Tool":"PLACEHOLDER_SYN_WEBSERVER_URL_PLACEHOLDER/syn-vis/pages/use-case/kone/maintenance/combi/index.html",RobotBox:"PLACEHOLDER_SYN_WEBSERVER_URL_PLACEHOLDER/syn-vis/pages/use-case/comau/maintenance/belt/index.html"},metadataManager:"PLACEHOLDER_SYN_WEBSERVER_URL_PLACEHOLDER/syn-vis/pages/md-manager/",gatewayManager:"PLACEHOLDER_SYN_WEBSERVER_URL_PLACEHOLDER/syn-vis/pages/gw-manager/",politoCharts:"PLACEHOLDER_SYN_WEBSERVER_URL_PLACEHOLDER/syn-vis/pages/charts/silhouette/",rpcaManager:"PLACEHOLDER_RPCA_MANAGER_URL_PLACEHOLDER",lmsScheduler:"PLACEHOLDER_LMS_SCHEDULER_URL_PLACEHOLDER",hadoopMonitor:"PLACEHOLDER_HADOOP_MONITOR_URL_PLACEHOLDER",hueService:"PLACEHOLDER_HUE_URL_PLACEHOLDER",nifiService:"PLACEHOLDER_NIFI_URL_PLACEHOLDER",serenaLabelMlocCalcTypeId:"0000000000000000/6/10",serenaRulMlocCalcTypeId:"0000000000000000/6/11"}}});
//# sourceMappingURL=app.d45ececd.js.map