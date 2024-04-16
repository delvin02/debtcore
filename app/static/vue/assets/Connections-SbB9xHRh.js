import{_ as p,a as _,b as u,c as g}from"./CardDescription.vue_vue_type_script_setup_true_lang-BXWkwlLW.js";import{_ as h}from"./CardContent.vue_vue_type_script_setup_true_lang-D46BGtUZ.js";import{e as b,o as w,c as y,f as k,n as v,u as t,g as x,v as B,r as C,d as n,a as e,k as s,b as o,E as m,s as A}from"../main.js";import{_ as W}from"./index-DhdF1qMN.js";const $=b({__name:"CardFooter",props:{class:{}},setup(d){const r=d;return(a,l)=>(w(),y("div",{class:v(t(x)("flex items-center p-6 pt-0",r.class))},[k(a.$slots,"default")],2))}}),S={class:"p-8 space-y-8"},I=n("div",{class:"flex items-center justify-between space-y-2"},[n("div",null,[n("h2",{class:"text-2xl font-bold tracking-tight"},"Connections"),n("p",{class:"text-muted-foreground"}," Here's a list of your connected apps! ")])],-1),j={class:"flex"},F={class:"flex items-stretch"},V=n("b",null,"'Connect to WhatsApp'",-1),E=n("b",null,"'Disconnect from WhatsApp'",-1),N=n("b",null,"'Authenticate'",-1),T=n("a",{href:"https://metastatus.com/whatsapp-business-api"},"Status",-1),M=b({__name:"Connections",setup(d){B(()=>{window.fbAsyncInit=function(){window.FB.init({appId:"1145991156753069",cookie:!0,xfbml:!0,version:"v19.0"})},function(a,l,c){let i,f=a.getElementsByTagName(l)[0];a.getElementById(c)||(i=a.createElement(l),i.id=c,i.src="https://connect.facebook.net/en_US/sdk.js",f.parentNode.insertBefore(i,f))}(document,"script","facebook-jssdk")});const r=()=>{if(typeof window.FB>"u"){alert("Facebook SDK not loaded yet.");return}typeof window.fbq=="function"&&window.fbq("trackCustom","WhatsAppOnboardingStart",{appId:"1145991156753069",feature:"whatsapp_embedded_signup"}),window.FB.login(a=>{a.authResponse?(console.log("Successfully logged in with Facebook"),console.log(a.authResponse)):console.log("User cancelled login or did not fully authorize.")},{config_id:"1452948938905891",response_type:"code",override_default_response_type:!0,extras:{sessionInfoVersion:2}})};return(a,l)=>{const c=C("VIcon");return w(),y("div",S,[I,n("div",null,[e(t(g),{class:"shadow-none"},{default:s(()=>[n("div",j,[e(t(p),null,{default:s(()=>[e(t(_),null,{default:s(()=>[e(c,{name:"fa-whatsapp",class:"size-24 fill-green-500"})]),_:1})]),_:1}),e(t(p),{class:"flex-1"},{default:s(()=>[e(t(h),{class:"py-2 pl-0"},{default:s(()=>[n("div",F,[e(t(_),null,{default:s(()=>[o("WhatsApp Business")]),_:1}),e(t(W),{class:"ml-3",variant:"success"},{default:s(()=>[o("Active")]),_:1})])]),_:1}),e(t(m),{class:"w-full"}),e(t(h),{class:"py-2 pl-0"},{default:s(()=>[n("div",null,[e(t(u),null,{default:s(()=>[o("To connect to WhatsApp Business, click the "),V,o(" button. You will be taken to the Meta Business website to allow DebtCore to connect to your Organisation.")]),_:1}),e(t(u),null,{default:s(()=>[o("To disconnect from WhatsApp Business, click the "),E,o(" button. This button will only be displayed when a connection has been established.")]),_:1}),e(t(u),{class:"mt-4"},{default:s(()=>[o("When the connection requires authentication, click the "),N,o(" button. You will be taken to the QBO website to re-establish connection to your Organisation.")]),_:1}),e(t(u),{class:"mt-8 text-blue-600 underline"},{default:s(()=>[o("Whatsapp Business's System"),T,o(".")]),_:1})])]),_:1})]),_:1})]),e(t(m),{class:"w-full"}),e(t($),{class:"flex items-end justify-end mt-5"},{default:s(()=>[e(t(A),{variant:"default",onClick:r},{default:s(()=>[o("Connect to WhatsApp")]),_:1})]),_:1})]),_:1})])])}}});export{M as default};
