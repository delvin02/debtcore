import{e as o,o as c,c as l,f as h,n as f,u as _,g as p,aP as d,ax as g}from"../main.js";const x=o({__name:"DialogFooter",props:{class:{}},setup(s){const e=s;return(a,t)=>(c(),l("div",{class:f(_(p)("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2",e.class))},[h(a.$slots,"default")],2))}}),m=s=>d(s,{state:()=>({tasks:[],is_loading:!1,page_index:0,page_size:10,fetch_url:""}),actions:{async fetch(e,a,t){this.tasks=[],this.is_loading=!0,this.fetch_url=e;try{const i=await g.get(e,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}}),n=typeof t=="function";this.tasks=i.data.Result.map(r=>n?t(r):r),this.set_page_index(a??0)}catch(i){console.error("There was an error fetching the companies:",i)}finally{this.is_loading=!1}},async refresh(e){this.fetch_url&&await this.fetch(this.fetch_url,e)},set_page_index(e){this.page_index=e},set_page_size(e){this.page_size=e},$reset(){this.tasks=[],this.is_loading=!1,this.page_index=0,this.page_size=10,this.fetch_url=""}}})();export{x as _,m as u};