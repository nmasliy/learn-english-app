"use strict";(self["webpackChunkvue_english_app"]=self["webpackChunkvue_english_app"]||[]).push([[860],{2860:function(e,t,s){s.r(t),s.d(t,{default:function(){return _}});var n=s(3396),a=s(9242),r=s(7139);const d={class:"learn my-auto w-full"},i={key:0},o={key:1},l={key:2,class:"text-left"},h={class:"mb-4 font-semibold text-lg"},c={class:"grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3 mb-6"},g=["onClick"],L={key:0,class:"absolute right-2 bottom-2",width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512",style:{"enable-background":"new 0 0 512 512"},"xml:space":"preserve"},u=(0,n._)("rect",{style:{fill:"#32bea6"},width:"512",height:"512"},null,-1),v=(0,n._)("polygon",{style:{fill:"#ffffff"},points:"203.728,392.144 104.512,305.392 125.584,281.296 200.144,346.496 383.776,126.128 408.368,146.64 "},null,-1),m=[u,v],w={key:1,class:"mb-4 font-semibold text-lg"},S={key:3,class:"text-left"},W=(0,n._)("h1",{class:"mb-4 font-semibold text-lg text-center"}," Список слов для изучения отсутствует ",-1),I=[W];function x(e,t,s,u,v,W){const x=(0,n.up)("Loader"),f=(0,n.up)("Card");return(0,n.wg)(),(0,n.iD)("div",d,[(0,n.Wm)(a.uT,{name:"fade-scale",mode:"out-in"},{default:(0,n.w5)((()=>[v.isLoaded?v.isLearnStarted?((0,n.wg)(),(0,n.iD)("div",o,[(0,n.Wm)(f,{words:W.words,isTranslated:e.getSavedIsTranslated(),activeWordIndex:e.getSavedCurrentIndex(),isReusable:!0,theme:W.theme,onIncreaseWordIndex:W.changeWord,onSaveWord:t[0]||(t[0]=t=>e.setSavedIsTranslated(!0)),onOnWordsOver:W.updateCard},null,8,["words","isTranslated","activeWordIndex","theme","onIncreaseWordIndex","onOnWordsOver"]),(0,n._)("button",{onClick:t[1]||(t[1]=(...e)=>W.finishLearning&&W.finishLearning(...e)),class:(0,r.C_)(["px-6 py-4 mt-8 text-slate-50 font-semibold rounded transition-all duration-300",`bg-${W.theme}-500 enabled:hover:bg-${W.theme}-600`])}," Вернуться к словам ",2)])):W.words.length>0?((0,n.wg)(),(0,n.iD)("div",l,[(0,n._)("h1",h,(0,r.zw)(W.isLearnedAtLeastOnce?"Выберите слова, если уже выучили их:":"Вы не знали перевод следующих слов:"),1),(0,n._)("ul",c,[(0,n.Wm)(a.W3,{name:"fade-scale-slowly",mode:"out-in"},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(v.wordsInLearning,((e,t)=>((0,n.wg)(),(0,n.iD)("li",{key:e.text,class:(0,r.C_)(["p-4 pr-8 bg-white rounded shadow-sm relative",{"cursor-pointer transition-colors hover:bg-cyan-50 select-none":W.isLearnedAtLeastOnce,"hover:bg-emerald-50 bg-emerald-50":e.isChecked}]),onClick:e=>W.chooseWord(t)},[e.isChecked?((0,n.wg)(),(0,n.iD)("svg",L,m)):(0,n.kq)("",!0),(0,n._)("p",{class:(0,r.C_)(["font-semibold transition-colors",`text-${W.theme}-600`])},(0,r.zw)(e.text),3),(0,n._)("p",null,(0,r.zw)(e.translate),1)],10,g)))),128))])),_:1})]),W.isCheckedAtLeastOne?((0,n.wg)(),(0,n.iD)("button",{key:0,onClick:t[2]||(t[2]=(...e)=>W.saveLearnedWordList&&W.saveLearnedWordList(...e)),class:(0,r.C_)(["px-6 py-4 mr-2 text-slate-50 font-semibold rounded transition-colors duration-300",`bg-${W.theme}-500 enabled:hover:bg-${W.theme}-600`])}," Я знаю эти слова ",2)):(0,n.kq)("",!0),W.isMinWordsTolearn?((0,n.wg)(),(0,n.iD)("button",{key:2,onClick:t[3]||(t[3]=(...e)=>W.startLearning&&W.startLearning(...e)),class:(0,r.C_)(["px-6 py-4 text-slate-50 font-semibold rounded transition-all duration-300",`bg-${W.theme}-500 enabled:hover:bg-${W.theme}-600`])},(0,r.zw)(W.startButtonText),3)):((0,n.wg)(),(0,n.iD)("h2",w," Вам нужно набрать хотя бы "+(0,r.zw)(v.minWordsToLearn)+" слов для изучения ",1))])):((0,n.wg)(),(0,n.iD)("div",S,I)):((0,n.wg)(),(0,n.iD)("div",i,[(0,n.Wm)(x)]))])),_:1})])}var f=s(1949),b=s(3294),p=s(2993),k=s(65),C={name:"LearnView",components:{Card:f.Z,Loader:b.Z},data(){return{minWordsToLearn:5,isLearnStarted:!1,savedWordList:[],isLoaded:!1,wordsInLearning:this.getSavedWordList()}},computed:{theme(){return this.getTheme()},words(){return this.getSavedWordList()},isLearnedAtLeastOnce(){return this.getIsLearnedAtLeastOnce()},isWordListSavedToStorage(){return localStorage.getItem("savedWordList")},isMinWordsTolearn(){return this.words.length>=this.minWordsToLearn},startButtonText(){return this.getSavedCurrentIndex()>0?"Продолжить изучение":"Начать изучение"},isSavedWordsEnd(){return 0===this.words.length},isCheckedAtLeastOne(){return this.wordsInLearning.find((e=>e.isChecked))}},watch:{words(){this.wordsInLearning=[...this.getSavedWordList()].map((e=>{if(!e.isChecked)return{...e,isChecked:!1}}))}},mounted(){this.isWordListSavedToStorage&&(this.setSavedWordList(JSON.parse(localStorage.getItem("savedWordList"))),this.setSavedIndex(+localStorage.getItem("savedCurrentIndex")||0)),this.isSavedWordsEnd&&this.setIsLearnedAtLeastOnce(!1),this.isLoaded=!0},beforeUnmount(){this.setSavedIsTranslated(!1)},methods:{...(0,k.Se)(["getSavedWordList","getSavedCurrentIndex","getSavedIsTranslated","getIsLearnedAtLeastOnce","getTheme"]),...(0,k.OI)(["increaseSavedIndex","setSavedIsTranslated","setSavedIndex","setSavedWordList","addToLearnedWordList","setIsLearnedAtLeastOnce"]),changeWord(){this.increaseSavedIndex(),this.setSavedIsTranslated(!1)},startLearning(){this.isLearnStarted=!0;const e=(0,p.Sy)(this.words);this.setSavedWordList(e)},finishLearning(){this.isLearnStarted=!1,this.setIsLearnedAtLeastOnce(!0),this.setSavedIndex(0)},chooseWord(e){this.isLearnedAtLeastOnce&&(this.wordsInLearning[e].isChecked=!this.wordsInLearning[e].isChecked)},updateCard(){const e=(0,p.Sy)(this.words);this.isLoaded=!1,this.setSavedWordList(e),this.setSavedIsTranslated(!1),this.setSavedIndex(0),this.isLoaded=!0},saveLearnedWordList(){const e=this.wordsInLearning.filter((e=>e.isChecked)),t=this.wordsInLearning.filter((e=>!e.isChecked));this.addToLearnedWordList(e),this.setSavedWordList(t)}}},T=s(89);const y=(0,T.Z)(C,[["render",x]]);var _=y}}]);
//# sourceMappingURL=860.b58b255c.js.map