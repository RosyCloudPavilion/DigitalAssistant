(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ff29287"],{"645d":function(t,s,e){"use strict";e("7253")},7253:function(t,s,e){},"9e24":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"studentlists"},[e("el-card",{staticClass:"box-card searchnav",staticStyle:{"box-shadow":"0 0px 0px 0 rgb(0 0 0 / 10%)","border-bottom":"0px","border-left":"0px","border-right":"0px","margin-left":"-10px",width:"975px","z-index":"0"}},[e("el-button-group",{staticStyle:{width:"100%"}},[e("el-row",{attrs:{gutter:20}},[e("el-col",{staticStyle:{width:"22%"},attrs:{span:6}},[e("div",{staticClass:"grid-content bg-purple",staticStyle:{"text-align":"left"}},[e("span",{staticStyle:{"font-size":"20px","padding-left":"5px"}},[e("strong",[t._v(" 信息管理")])])])]),e("el-col",{staticStyle:{width:"78%"},attrs:{span:18}},[e("div",{staticClass:"grid-content bg-purple-light",staticStyle:{"text-align":"right","margin-top":"-8px"}},[e("el-select",{staticStyle:{width:"200px"},attrs:{filterable:"",placeholder:"请选择班级"},on:{change:t.changeClass},model:{value:t.class_id,callback:function(s){t.class_id=s},expression:"class_id"}},t._l(t.optionsClass,(function(t){return e("el-option",{key:t.class_id,attrs:{label:t.name,value:t.class_id}})})),1)],1)])],1)],1)],1),e("br"),e("router-view")],1)},l=[],i={components:{},data:function(){return{class_id:"",optionsClass:[]}},created:function(){var t=this;this.request.get("/classes").then((function(s){s.data&&(t.optionsClass=s.data)}))},methods:{changeClass:function(){console.log(this.class_id)}}},n=i,c=(e("645d"),e("2877")),o=Object(c["a"])(n,a,l,!1,null,"88965522",null);s["default"]=o.exports}}]);
//# sourceMappingURL=chunk-5ff29287.26a37b2f.js.map