"use strict";(self["webpackChunkvue_english_app"]=self["webpackChunkvue_english_app"]||[]).push([[178],{7178:function(e,t,r){r.r(t),r.d(t,{default:function(){return v}});var s=r(3396),a=r(9242),d=r(7139);const i={class:"profile my-auto w-full"},o={key:0},n={key:1},l=(0,s._)("h1",{class:"mb-4 font-semibold text-lg text-center"}," Здесь будут находится слова которые вы выучили ",-1),u=[l],g={key:2},m={class:"mb-4 font-semibold text-lg text-center"},c={class:"grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3 mb-6"};function L(e,t,r,l,L,h){const p=(0,s.up)("Loader");return(0,s.wg)(),(0,s.iD)("div",i,[(0,s.Wm)(a.uT,{name:"fade-scale",mode:"out-in"},{default:(0,s.w5)((()=>[L.isLoaded?0===h.learnedWordList.length?((0,s.wg)(),(0,s.iD)("div",n,u)):((0,s.wg)(),(0,s.iD)("div",g,[(0,s._)("h1",m," Вы уже выучили "+(0,d.zw)(h.learnedWordList.length)+" слов(а): ",1),(0,s._)("ul",c,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(h.learnedWordList,(e=>((0,s.wg)(),(0,s.iD)("li",{key:e.text,class:"p-4 pr-8 bg-white rounded shadow-sm relative"},[(0,s._)("p",{class:(0,d.C_)(["font-semibold transition-colors",`text-${h.theme}-600`])},(0,d.zw)(e.text),3),(0,s._)("p",null,(0,d.zw)(e.translate),1)])))),128))])])):((0,s.wg)(),(0,s.iD)("div",o,[(0,s.Wm)(p)]))])),_:1})])}var h=r(3294),p=r(65),f={name:"ProfileView",components:{Loader:h.Z},data(){return{isLoaded:!1}},computed:{theme(){return this.getTheme()},learnedWordList(){return this.getLearnedWordList()},isLearnedListSavedToStorage(){return localStorage.getItem("learnedWordList")}},mounted(){this.isLearnedListSavedToStorage&&this.setLearnedWordList(JSON.parse(localStorage.getItem("learnedWordList"))),this.isLoaded=!0},methods:{...(0,p.Se)(["getLearnedWordList","getTheme"]),...(0,p.OI)(["setLearnedWordList"])}},w=r(89);const _=(0,w.Z)(f,[["render",L]]);var v=_}}]);
//# sourceMappingURL=178.2d409c0c.js.map