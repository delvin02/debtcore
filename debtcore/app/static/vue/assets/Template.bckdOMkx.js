import{_ as n,c as l}from"./columns.BeyBQRMX.js";import{u as m}from"./Checkbox.vue_vue_type_script_setup_true_lang.5ojqHNh9.js";import{e as i,G as d,a1 as c,o as p,c as _,a as u,u as s,d as a,a2 as f}from"../main.js";import"./index.DhdF1qMN.js";import"./CommandSeparator.vue_vue_type_script_setup_true_lang.DZgg3MH5.js";import"./DropdownMenuLabel.vue_vue_type_script_setup_true_lang.DeeBgwnz.js";import"./Input.vue_vue_type_script_setup_true_lang.CSFnz65k.js";import"./_plugin-vue_export-helper.DlAUqK2U.js";const g={class:"p-4 md:p-8 space-y-8"},x=a("div",{class:"flex items-center justify-between space-y-2"},[a("div",null,[a("h2",{class:"text-2xl font-bold tracking-tight"},"Template"),a("p",{class:"text-muted-foreground"},"Here's a list of your existing templates!")])],-1),y="/api/template",U=i({__name:"Template",setup(h){const t=m("template"),o=e=>({id:e.id,template_id:e.template_id,name:e.name,language:e.language,category:e.category,status:e.status,message_delivered:e.message_delivered,message_read:e.message_read,last_updated_date:e.last_updated_date});return d(async()=>{await t.fetch(y,0,o)}),f("tableStore",t),c(()=>{t.$reset()}),(e,r)=>(p(),_("div",g,[x,u(n,{data:s(t).tasks,columns:s(l)},null,8,["data","columns"])]))}});export{U as default};
