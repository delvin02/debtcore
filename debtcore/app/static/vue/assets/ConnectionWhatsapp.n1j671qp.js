import{e as a,G as r,H as p,r as i,o as u,c as l,a as m,aA as d,q as _}from"../main.js";const f={class:"flex justify-center items-center h-full"},x=a({__name:"ConnectionWhatsapp",setup(h){const t=d(),n=_();r(()=>{const e=t.query.code;e&&c(e)});const c=e=>{p.post("/api/connections/facebook",{code:e}).then(()=>{n.push({name:"connections"})}).catch(o=>{const s=o.response&&o.response.data.error?o.response.data.error:"Unknown error occurred";n.push({path:"/connections",query:{error:s}})})};return(e,o)=>{const s=i("VIcon");return u(),l("div",f,[m(s,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"self-center my-auto size-12"})])}}});export{x as default};
