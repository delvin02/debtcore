import{_ as l,c as p}from"./columns-CviMpyp-.js";import{u as _}from"./Checkbox.vue_vue_type_script_setup_true_lang-Di5NrHb0.js";import{e as u,v as d,x as f,r as h,o as s,c as n,u as a,a as c,d as o,y}from"../main.js";import"./TableRow.vue_vue_type_script_setup_true_lang-BOvJHCsz.js";import"./DialogScrollContent.vue_vue_type_script_setup_true_lang-ao_tKgWI.js";import"./DialogFooter.vue_vue_type_script_setup_true_lang-CUbi7heN.js";import"./Input.vue_vue_type_script_setup_true_lang-BaBacWsD.js";import"./lodash-BtnTHUG3.js";import"./index-DhdF1qMN.js";const b={class:"p-8 space-y-8 h-full"},x=o("div",{class:"flex items-center justify-between space-y-2"},[o("div",null,[o("h2",{class:"text-2xl font-bold tracking-tight"},"Customer"),o("p",{class:"text-muted-foreground"},"Here's a list of your existing customers!")])],-1),v={key:0,class:"text-center"},g={key:1},w="http://127.0.0.1:8000/api/customer",j=u({__name:"Customer",setup(B){const t=_("customer"),r=e=>({id:e.id,name:e.name,company_name:e.company_name,whatsapp_phone_number:e.whatsapp_phone_number,email:e.email,country_name:e.country_name,outstanding_debts:e.outstanding_debts});return d(async()=>{await t.fetch(w,0,r)}),y("tableStore",t),f(()=>{t.$reset()}),(e,i)=>{const m=h("VIcon");return s(),n("div",b,[x,a(t).is_loading?(s(),n("div",v,[c(m,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-10 h-10"})])):(s(),n("div",g,[c(l,{data:a(t).tasks,columns:a(p)},null,8,["data","columns"])]))])}}});export{j as default};
