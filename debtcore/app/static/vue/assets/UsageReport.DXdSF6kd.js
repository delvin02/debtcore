import{_ as n,c as i}from"./columns.C1JGEgMv.js";import{u as c}from"./Checkbox.vue_vue_type_script_setup_true_lang.B1OsCrsj.js";import{e as d,J as l,a8 as m,o as p,c as u,a as _,u as s,d as a,a9 as g}from"../main.js";import"./index.DhdF1qMN.js";import"./index.Dq4Y6CJz.js";import"./DropdownMenuLabel.vue_vue_type_script_setup_true_lang.CMtdOpeP.js";import"./Input.vue_vue_type_script_setup_true_lang.CydXMrwJ.js";import"./_plugin-vue_export-helper.DlAUqK2U.js";const f={class:"p-8 space-y-8"},x=a("div",{class:"flex items-center justify-between space-y-2"},[a("div",null,[a("h2",{class:"text-2xl font-bold tracking-tight"},"Usage Report"),a("p",{class:"text-muted-foreground"},"Here's a list of your existing reports!")])],-1),y="/api/template",N=d({__name:"UsageReport",setup(h){const t=c("template"),o=e=>({id:e.id,template_id:e.template_id,name:e.name,language:e.language,category:e.category,status:e.status,message_delivered:e.message_delivered,message_read:e.message_read,last_updated_date:e.last_updated_date});return l(async()=>{await t.fetch(y,0,o)}),g("tableStore",t),m(()=>{t.$reset()}),(e,r)=>(p(),u("div",f,[x,_(n,{data:s(t).tasks,columns:s(i)},null,8,["data","columns"])]))}});export{N as default};
