(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f526e1b0"],{"4de4":function(t,a,e){"use strict";var r=e("23e7"),i=e("b727").filter,n=e("1dde"),c=e("ae40"),s=n("filter"),d=c("filter");r({target:"Array",proto:!0,forced:!s||!d},{filter:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},"65f0":function(t,a,e){var r=e("861d"),i=e("e8b5"),n=e("b622"),c=n("species");t.exports=function(t,a){var e;return i(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!i(e.prototype)?r(e)&&(e=e[c],null===e&&(e=void 0)):e=void 0),new(void 0===e?Array:e)(0===a?0:a)}},b0c0:function(t,a,e){var r=e("83ab"),i=e("9bf2").f,n=Function.prototype,c=n.toString,s=/^\s*function ([^ (]*)/,d="name";r&&!(d in n)&&i(n,d,{configurable:!0,get:function(){try{return c.call(this).match(s)[1]}catch(t){return""}}})},b727:function(t,a,e){var r=e("0366"),i=e("44ad"),n=e("7b0b"),c=e("50c4"),s=e("65f0"),d=[].push,l=function(t){var a=1==t,e=2==t,l=3==t,o=4==t,_=6==t,u=5==t||_;return function(g,m,v,p){for(var f,b,h=n(g),y=i(h),x=r(m,v,3),C=c(y.length),w=0,S=p||s,k=a?S(g,C):e?S(g,0):void 0;C>w;w++)if((u||w in y)&&(f=y[w],b=x(f,w,h),t))if(a)k[w]=b;else if(b)switch(t){case 3:return!0;case 5:return f;case 6:return w;case 2:d.call(k,f)}else if(o)return!1;return _?-1:l||o?o:k}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},e12b:function(t,a,e){"use strict";var r=e("f264"),i=e.n(r);i.a},f23e:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"app-body"},[e("div",{staticClass:"container-fluid w-100 mx-4"},[t._m(0),e("ServicesHome"),e("b-row",{staticClass:"mt-4"},[e("a",{staticClass:"nav-link",attrs:{href:"http://vana.mech.upatras.gr/redmine/projects/serena/wiki/Wiki",exact:"","active-class":"active"}},[t._v("SERENA wiki")]),e("router-link",{staticClass:"nav-link",attrs:{to:"/user/login",exact:"","active-class":"active"}},[t._v("Login")]),e("router-link",{staticClass:"nav-link",attrs:{to:"/user/register",exact:"","active-class":"active"}},[t._v("Register")])],1)],1)])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card border-0 shadow my-4"},[e("img",{attrs:{src:"img/logo-1400.jpg",width:"80%",alt:"Serena Project Logo"}})])}],n=(e("4de4"),e("b0c0"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container-fluid bv-example-row bv-example-row-flex-cols"},[e("div",{staticClass:"animated fadein"},[e("b-card-group",{attrs:{deck:""}},[e("ServiceCard",{attrs:{card_img_path:"img/illustrations/svg/undraw_dashboard_nklg.svg",card_image_alt:"Card image cap",card_title:"Dashboard",card_body_text:"Dashboard component.",card_button_text:"Dashboard",card_button_link:"/dashboard"}}),e("ServiceCard",{attrs:{card_img_path:"img/illustrations/svg/undraw_timeline_9u4u.svg",card_image_alt:"Card image cap",card_title:"Scheduler",card_body_text:"Link to LMS Scheduler Service",card_button_text:"Scheduler",card_button_link:t.lms_scheduler}}),e("ServiceCard",{attrs:{card_img_path:"img/illustrations/svg/undraw_server_status_5pbv.svg",card_image_alt:"Card image cap",card_title:"Metadata service",card_body_text:"Link to Dell Metadata Manager component",card_button_text:"Metadata Manager",card_button_link:t.md_manager}}),e("ServiceCard",{attrs:{card_img_path:"img/illustrations/svg/undraw_safe_bnk7.svg",card_image_alt:"Card image cap",card_title:"RPCA Manager",card_body_text:"Link to ENG RPCA Manager component",card_button_text:"RPCA Manager",card_button_link:t.rpca_manager}}),e("ServiceCard",{attrs:{card_img_path:"img/illustrations/svg/undraw_predictive_analytics_kf9n.svg",card_image_alt:"Card image cap",card_title:"Predictive model",card_body_text:"Link to Polito predictive model evaluation charts visualization component",card_button_text:"Predictive model evaluation",card_button_link:t.polito_charts}}),e("ServiceCard",{attrs:{card_img_path:"img/illustrations/svg/undraw_QA_engineers_dg5p.svg",card_image_alt:"Card image cap",card_title:"Gateway manager",card_body_text:"Link to gateway manager, in order to associate segments and gateways",card_button_text:"Gateway manager",card_button_link:t.gw_manager}})],1)],1)])}),c=[],s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-card",{staticClass:"shadow border-0",attrs:{sm:"12",md:"4",lg:"3"}},[e("img",{staticClass:"card-img-top img-fluid w-100 px-2",attrs:{"v-if":t.card_img_path,src:t.card_img_path,alt:t.card_image_alt}}),e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title",attrs:{"v-if":t.card_title}},[t._v(t._s(t.card_title))]),e("p",{staticClass:"card-text",attrs:{"v-if":t.card_body_text}},[t._v(t._s(t.card_body_text))]),e("p",{staticClass:"card-text",attrs:{"v-if":t.card_text_muted}},[e("small",{staticClass:"text-muted"},[t._v(t._s(t.card_text_muted))])]),e("div",{staticClass:"float-right"},[t.card_button_link?e("a",{staticClass:"btn btn-outline-primary",attrs:{href:t.card_button_link}},[t._v(t._s(t.card_button_text))]):t._e()])])])},d=[],l={name:"ServiceCard",props:{card_img_path:{type:String,default:" "},card_image_alt:{type:String,default:""},card_title:{type:String,default:" "},card_body_text:{type:String,default:" "},card_text_muted:{type:String,default:" "},card_button_text:{type:String,default:""},card_button_link:{type:String,default:""}}},o=l,_=e("2877"),u=Object(_["a"])(o,s,d,!1,null,null,null),g=u.exports,m=e("ace7"),v=e.n(m),p={name:"services-home",components:{ServiceCard:g},props:{lms_scheduler:{type:String,default:v.a.lmsScheduler},rpca_manager:{type:String,default:v.a.rpcaManager},polito_charts:{type:String,default:v.a.politoCharts},gw_manager:{type:String,default:v.a.gatewayManager},md_manager:{type:String,default:v.a.metadataManager}},data:function(){return{}}},f=p,b=(e("e12b"),Object(_["a"])(f,n,c,!1,null,"b6679482",null)),h=b.exports,y={name:"services",components:{ServicesHome:h},data:function(){return{}},methods:{},computed:{name:function(){return this.$route.name},list:function(){return this.$route.matched.filter((function(t){return t.name||t.meta.label}))}}},x=y,C=Object(_["a"])(x,r,i,!1,null,null,null);a["default"]=C.exports},f264:function(t,a,e){}}]);
//# sourceMappingURL=chunk-f526e1b0.7f15f76a.js.map