(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"194c":function(t,a,n){"use strict";n.r(a);var e=n("78b3"),u=n.n(e);for(var c in e)"default"!==c&&function(t){n.d(a,t,function(){return e[t]})}(c);a["default"]=u.a},"78b3":function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,a=this.CustomBar,n=this.bgImage,e="height:".concat(a,"px;padding-top:").concat(t,"px;");return this.bgImage&&(e="".concat(e,"background-image:url(").concat(n,");")),e}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};a.default=n}).call(this,n("6e42")["default"])},addc:function(t,a,n){"use strict";n.r(a);var e=n("e2f8"),u=n("194c");for(var c in u)"default"!==c&&function(t){n.d(a,t,function(){return u[t]})}(c);var o=n("2877"),r=Object(o["a"])(u["default"],e["a"],e["b"],!1,null,null,null);a["default"]=r.exports},e2f8:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c},u=[];n.d(a,"a",function(){return e}),n.d(a,"b",function(){return u})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("addc"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);                
