import{_ as Ve,a as Ce,b as ke,c as Se,d as Pe,e as se,u as Q,f as Ie,g as Ue,h as Re,i as ee,j as J,k as Fe,l as De,m as Te,n as ze,o as Me,p as Ne,q as Ae,r as je,F as ae,z as A,s as te}from"./Checkbox.vue_vue_type_script_setup_true_lang.5ojqHNh9.js";import{e as D,r as L,o as d,c as y,d as i,t as S,a,k as t,u as e,F as z,v as M,s as I,b as u,x as Y,l as f,y as le,z as ne,A as oe,B as Z,E as G,i as P,I as ie,K as re,H as E,W as de,X as ce,a3 as ue,_ as v,R as me,N as pe,Q as _e,a4 as fe,a5 as ge,a6 as he,a7 as be,a8 as K,Y as X,m as H,Z as ye,a9 as ve,n as q,C as Be,D as W,T as O,g as Ee,a0 as k,aa as He,G as Le,a1 as We,a2 as Ge}from"../main.js";import{_ as Ke,a as qe}from"./DropdownMenuLabel.vue_vue_type_script_setup_true_lang.DeeBgwnz.js";import{_ as we}from"./DialogScrollContent.vue_vue_type_script_setup_true_lang.G3qJvuAl.js";import{_ as xe}from"./DialogFooter.vue_vue_type_script_setup_true_lang.CUbi7heN.js";import{_ as w}from"./Input.vue_vue_type_script_setup_true_lang.CSFnz65k.js";import{_ as $e}from"./lodash.BtnTHUG3.js";import{_ as Qe}from"./index.DhdF1qMN.js";const Je={class:"flex flex-col md:flex-row items-center justify-between px-2 pb-10"},Oe={class:"flex-1 text-sm text-muted-foreground mb-4 md:mb-0"},Xe={class:"flex items-center space-x-6 lg:space-x-8 text-primary"},Ye={class:"flex items-center space-x-2"},Ze=i("p",{class:"text-sm font-medium"},"Rows per page",-1),ea={class:"flex w-[100px] items-center justify-center text-sm font-medium"},aa={class:"flex items-center space-x-2"},ta=i("span",{class:"sr-only"},"Go to first page",-1),sa=i("span",{class:"sr-only"},"Go to previous page",-1),la=i("span",{class:"sr-only"},"Go to next page",-1),na=i("span",{class:"sr-only"},"Go to last page",-1),oa=D({__name:"DataTablePagination",props:{table:{}},setup(r){return(n,o)=>{const s=L("VIcon");return d(),y("div",Je,[i("div",Oe,S(n.table.getFilteredSelectedRowModel().rows.length)+" of "+S(n.table.getFilteredRowModel().rows.length)+" row(s) selected. ",1),i("div",Xe,[i("div",Ye,[Ze,a(e(Se),{"model-value":`${n.table.getState().pagination.pageSize}`,"onUpdate:modelValue":n.table.setPageSize},{default:t(()=>[a(e(Ve),{class:"h-8 w-[70px]"},{default:t(()=>[a(e(Ce),{placeholder:`${n.table.getState().pagination.pageSize}`},null,8,["placeholder"])]),_:1}),a(e(ke),{side:"top"},{default:t(()=>[(d(),y(z,null,M([10,20,30,40,50],c=>a(e(Pe),{key:c,value:`${c}`},{default:t(()=>[u(S(c),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1},8,["model-value","onUpdate:modelValue"])]),i("div",ea," Page "+S(n.table.getState().pagination.pageIndex+1)+" of "+S(n.table.getPageCount()),1),i("div",aa,[a(e(I),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!n.table.getCanPreviousPage(),onClick:o[0]||(o[0]=c=>n.table.setPageIndex(0))},{default:t(()=>[ta,a(s,{name:"fa-arrow-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(I),{variant:"outline",class:"h-8 w-8 p-0",disabled:!n.table.getCanPreviousPage(),onClick:o[1]||(o[1]=c=>n.table.previousPage())},{default:t(()=>[sa,a(s,{name:"fa-chevron-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(I),{variant:"outline",class:"h-8 w-8 p-0",disabled:!n.table.getCanNextPage(),onClick:o[2]||(o[2]=c=>n.table.nextPage())},{default:t(()=>[la,a(s,{name:"fa-chevron-right",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(I),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!n.table.getCanNextPage(),onClick:o[3]||(o[3]=c=>n.table.setPageIndex(n.table.getPageCount()-1))},{default:t(()=>[na,a(s,{name:"fa-arrow-right",class:"h-4 w-4"})]),_:1},8,["disabled"])])])])}}}),ia=D({__name:"DataTableViewOptions",props:{table:{}},setup(r){const n=r,o=Y(()=>n.table.getAllColumns().filter(s=>typeof s.accessorFn<"u"&&s.getCanHide()));return(s,c)=>(d(),f(e(oe),null,{default:t(()=>[a(e(le),{"as-child":""},{default:t(()=>[a(e(I),{variant:"outline",size:"sm",class:"ml-auto hidden h-8 lg:flex"},{default:t(()=>[u(" View ")]),_:1})]),_:1}),a(e(ne),{align:"end",class:"w-[150px]"},{default:t(()=>[a(e(Ke),null,{default:t(()=>[u("Toggle columns")]),_:1}),a(e(se)),(d(!0),y(z,null,M(o.value,_=>(d(),f(e(qe),{key:_.id,class:"capitalize",checked:_.getIsVisible(),"onUpdate:checked":h=>_.toggleVisibility(!!h)},{default:t(()=>{var h;return[u(S(((h=_.columnDef.meta)==null?void 0:h.title)||_.id),1)]}),_:2},1032,["checked","onUpdate:checked"]))),128))]),_:1})]),_:1}))}}),ra={class:"grid gap-4 py-4"},da={class:"grid grid-cols-4 items-center gap-4"},ca=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),ua={class:"grid grid-cols-4 items-center gap-4"},ma=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),pa={class:"grid grid-cols-4 items-center gap-4"},_a=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),fa={class:"col-span-3"},ga={class:"grid grid-cols-4 items-center gap-4"},ha={class:"grid grid-cols-4 items-center gap-4"},ba={class:"grid grid-cols-4 items-center gap-4"},ya={class:"grid grid-cols-4 items-center gap-4"},va={class:"grid grid-cols-4 items-center gap-4"},wa={class:"grid grid-cols-4 items-center gap-4"},xa={key:0,class:"grid grid-cols-4 items-center gap-4"},$a=D({__name:"DataTableCreateCustomer",setup(r){const n=Z("tableStore",Q("customer")),o=G({name:"",business_registration_id:"",whatsapp_phone_number:"",email:"",streetAddress:"",postcode:"",city:"",state:"",country:null}),s=G({is_loading:!1,is_open:!1,data:[{value:"",label:""}]}),c=P("");async function _(C){s.is_loading=!0;try{const m=await E.get(`/api/country/list?search=${C||""}`,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});s.data=m.data.Result}catch{x({title:"Whoops, something went wrong",description:"There was an error fetching the country list",variant:"destructive"})}finally{s.is_loading=!1}}const h=P(!1),R=P(!1),F=P(null),{toast:x}=ie();re(c,$e.debounce(async C=>{R.value&&await _(C)},500));function b(){const C=[{condition:o.name==="",message:"Name cannot be blank"},{condition:o.whatsapp_phone_number==="",message:"Whatsapp Phone cannot be blank"},{condition:o.country==null,message:"Country cannot be blank"}];for(let m of C)if(m.condition)return F.value=m.message,!1;return!0}async function N(){var l;if(!b())return;h.value=!0;const m=JSON.parse(((l=document.getElementById("drf_csrf"))==null?void 0:l.textContent)||"{}");try{const V=await E.post("/api/customer",{...o},{headers:{"Content-Type":"application/json",[m.csrfHeaderName]:m.csrfToken}});$(),await n.refresh(n.page_index),x({title:V.data.Result,variant:"success"})}catch(V){var g=V.response.data.message||"";x({title:"Whoops, something went wrong",description:g,variant:"destructive"})}finally{h.value=!1}}function $(){R.value=!R.value,R.value&&_(c.value)}function U(C){o.country=C.id,s.is_open=!1}function T(C){c.value=C.target.value}return(C,m)=>{const g=L("VIcon");return d(),y("div",null,[i("div",null,[a(e(I),{variant:"default",size:"sm",class:"h-8 ml-2 flex",onClick:$},{default:t(()=>[a(g,{name:"fa-plus",class:"size-4"})]),_:1})]),a(e(ye),{open:R.value,"onUpdate:open":m[10]||(m[10]=l=>R.value=l)},{default:t(()=>[a(e(we),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:t(()=>[a(e(de),null,{default:t(()=>[a(e(ce),null,{default:t(()=>[u("Create Custsomer")]),_:1}),a(e(ue),null,{default:t(()=>[u(" Insert the details of the customer here. Click create when you're done. ")]),_:1})]),_:1}),i("div",ra,[i("div",da,[a(e(v),{for:"name",class:"text-right"},{default:t(()=>[u(" Company Name "),ca]),_:1}),a(e(w),{id:"name",modelValue:o.name,"onUpdate:modelValue":m[0]||(m[0]=l=>o.name=l),placeholder:"Geroge Sdn Bhd",class:"col-span-3"},null,8,["modelValue"])]),i("div",ua,[a(e(v),{for:"whatsapp_phone",class:"text-right required:"},{default:t(()=>[u(" Whatsapp Phone "),ma]),_:1}),a(e(w),{id:"whatsapp_phone",modelValue:o.whatsapp_phone_number,"onUpdate:modelValue":m[1]||(m[1]=l=>o.whatsapp_phone_number=l),placeholder:"0129876348",class:"col-span-3"},null,8,["modelValue"])]),i("div",pa,[a(e(v),{for:"country",class:"text-right leading-normal"},{default:t(()=>[u(" Country "),_a]),_:1}),i("div",fa,[a(e(me),{open:s.is_open,"onUpdate:open":m[3]||(m[3]=l=>s.is_open=l)},{default:t(()=>[a(e(pe),{"as-child":""},{default:t(()=>[a(e(I),{variant:"outline",role:"combobox","aria-expanded":s.is_open,class:"w-full justify-between px-3",disabled:s.is_loading},{default:t(()=>{var l;return[u(S(o.country?(l=s.data.find(V=>V.id===o.country))==null?void 0:l.label:"Select country")+" ",1),s.is_loading?(d(),f(g,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(d(),f(g,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),a(e(_e),{class:"w-[500px] p-1"},{default:t(()=>[a(e(fe),null,{default:t(()=>[a(e(ge),{class:"h-9",modelValue:c.value,"onUpdate:modelValue":m[2]||(m[2]=l=>c.value=l),placeholder:"Search country...",onInput:T},null,8,["modelValue"]),a(e(he),null,{default:t(()=>[u("No country found.")]),_:1}),s.is_loading?(d(),f(e(K),{key:1},{default:t(()=>[(d(),f(g,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2 my-2 mx-auto"}))]),_:1})):(d(),f(e(K),{key:0},{default:t(()=>[a(e(be),null,{default:t(()=>[(d(!0),y(z,null,M(s.data,l=>(d(),f(e(ve),{key:l.id,value:l.value??"",onSelect:()=>U(l)},{default:t(()=>[u(S(l.label)+" ",1),a(g,{name:"fa-check",class:q(["ml-auto h-4 w-4",o.country===l.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1}))]),_:1})]),_:1})]),_:1},8,["open"])])]),i("div",ga,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Email ")]),_:1}),a(e(w),{id:"email",modelValue:o.email,"onUpdate:modelValue":m[4]||(m[4]=l=>o.email=l),placeholder:"hello@example.com",class:"col-span-3"},null,8,["modelValue"])]),i("div",ha,[a(e(v),{for:"business_registration_id",class:"text-right"},{default:t(()=>[u(" Business ID ")]),_:1}),a(e(w),{id:"business_registration_id",modelValue:o.business_registration_id,"onUpdate:modelValue":m[5]||(m[5]=l=>o.business_registration_id=l),placeholder:"820720-X",class:"col-span-3"},null,8,["modelValue"])]),a(X),i("div",ba,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Address ")]),_:1}),a(e(w),{id:"email",modelValue:o.streetAddress,"onUpdate:modelValue":m[6]||(m[6]=l=>o.streetAddress=l),placeholder:"Lot 2000, Taman Jalan Indah",class:"col-span-3"},null,8,["modelValue"])]),i("div",ya,[a(e(v),{for:"state",class:"text-right leading-normal"},{default:t(()=>[u(" State ")]),_:1}),a(e(w),{id:"state",modelValue:o.state,"onUpdate:modelValue":m[7]||(m[7]=l=>o.state=l),placeholder:"Selangor",class:"col-span-3"},null,8,["modelValue"])]),i("div",va,[a(e(v),{for:"city",class:"text-right leading-normal"},{default:t(()=>[u(" City ")]),_:1}),a(e(w),{id:"city",modelValue:o.city,"onUpdate:modelValue":m[8]||(m[8]=l=>o.city=l),placeholder:"Puchong",class:"col-span-3"},null,8,["modelValue"])]),i("div",wa,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Post Code ")]),_:1}),a(e(w),{id:"email",modelValue:o.postcode,"onUpdate:modelValue":m[9]||(m[9]=l=>o.postcode=l),placeholder:"22000",class:"col-span-3"},null,8,["modelValue"])]),a(X)]),F.value?(d(),y("div",xa,[a(e(v),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:t(()=>[a(g,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),u(" "+S(F.value),1)]),_:1})])):H("",!0),a(e(xe),{class:"flex justify-end"},{default:t(()=>[a(e(I),{type:"submit",onClick:N,disabled:h.value},{default:t(()=>[h.value?(d(),f(g,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):H("",!0),u(" Create")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),Va={class:"flex items-center justify-between"},Ca={class:"flex flex-1 items-center space-x-2"},ka=D({__name:"DataTableToolbar",props:{table:{}},setup(r){const n=r,o=Y(()=>n.table.getState().columnFilters.length>0);return(s,c)=>{var _;return d(),y("div",Va,[i("div",Ca,[a(e(w),{placeholder:"Search...","model-value":((_=s.table.getColumn("name"))==null?void 0:_.getFilterValue())??"",class:"h-8 w-[150px] lg:w-[250px]",onInput:c[0]||(c[0]=h=>s.table.setGlobalFilter(h.target.value))},null,8,["model-value"]),o.value?(d(),f(e(I),{key:0,variant:"ghost",class:"h-8 px-2 lg:px-3",onClick:c[1]||(c[1]=h=>s.table.resetColumnFilters())},{default:t(()=>[u(" Reset ")]),_:1})):H("",!0)]),a(ia,{table:s.table},null,8,["table"]),a($a)])}}}),Sa={class:"space-y-4 text-muted-foreground"},Pa={class:"rounded-md border"},Ia=D({__name:"DataTable",props:{columns:{},data:{}},setup(r){const n=Z("tableStore",Q("customer")),o=r,s=P([]),c=P([]),_=P({}),h=P({pageIndex:n.page_index,pageSize:n.page_size}),R=P();function F(b,N){let $;typeof b=="function"?$=b(N.value):$=b,N.value=$,n.set_page_index($.pageIndex),n.set_page_size($.pageSize)}const x=Ie({get data(){return o.data},get columns(){return o.columns},state:{get sorting(){return s.value},get columnFilters(){return c.value},get columnVisibility(){return _.value},get rowSelection(){return R.value},get pagination(){return h.value}},enableRowSelection:!0,onSortingChange:b=>W(b,s),onPaginationChange:b=>F(b,h),onColumnFiltersChange:b=>W(b,c),onColumnVisibilityChange:b=>W(b,_),onRowSelectionChange:b=>W(b,R),getCoreRowModel:De(),getFilteredRowModel:Te(),getPaginationRowModel:ze(),getSortedRowModel:Me(),getFacetedRowModel:Ne(),getFacetedUniqueValues:Ae()});return Be(()=>{x.setPageIndex(n.page_index),x.setPageSize(n.page_size)}),(b,N)=>(d(),y("div",Sa,[a(ka,{table:e(x)},null,8,["table"]),i("div",Pa,[a(e(Fe),null,{default:t(()=>[a(e(Ue),null,{default:t(()=>[(d(!0),y(z,null,M(e(x).getHeaderGroups(),$=>(d(),f(e(J),{key:$.id},{default:t(()=>[(d(!0),y(z,null,M($.headers,U=>(d(),f(e(je),{key:U.id},{default:t(()=>[U.isPlaceholder?H("",!0):(d(),f(e(ae),{key:0,render:U.column.columnDef.header,props:U.getContext()},null,8,["render","props"]))]),_:2},1024))),128))]),_:2},1024))),128))]),_:1}),a(e(Re),{id:"dbTableBody"},{default:t(()=>{var $;return[($=e(x).getRowModel().rows)!=null&&$.length?(d(!0),y(z,{key:0},M(e(x).getRowModel().rows,U=>(d(),f(e(J),{key:U.id,"data-state":U.getIsSelected()&&"selected"},{default:t(()=>[(d(!0),y(z,null,M(U.getVisibleCells(),T=>(d(),f(e(ee),{key:T.id},{default:t(()=>[a(e(ae),{render:T.column.columnDef.cell,props:T.getContext()},null,8,["render","props"])]),_:2},1024))),128))]),_:2},1032,["data-state"]))),128)):(d(),f(e(J),{key:1},{default:t(()=>[a(e(ee),{colspan:b.columns.length,class:"h-24 text-center"},{default:t(()=>[u(" No results. ")]),_:1},8,["colspan"])]),_:1}))]}),_:1})]),_:1})]),a(oa,{table:e(x)},null,8,["table"])]))}}),B=D({__name:"DataTableColumnHeader",props:{column:{},title:{}},setup(r){return(n,o)=>{const s=L("VIcon");return n.column.getCanSort()?(d(),y("div",{key:0,class:q(e(Ee)("flex items-center space-x-2",n.$attrs.class??""))},[a(e(oe),null,{default:t(()=>[a(e(le),{"as-child":""},{default:t(()=>[a(e(I),{variant:"ghost",size:"sm",class:"-ml-3 h-8 data-[state=open]:bg-accent"},{default:t(()=>[i("span",null,S(n.title),1),n.column.getIsSorted()==="desc"?(d(),f(s,{key:0,name:"fa-arrow-down",class:"ml-2 h-4 w-4"})):n.column.getIsSorted()==="asc"?(d(),f(s,{key:1,name:"fa-arrow-up",class:"ml-2 h-4 w-4"})):(d(),f(s,{key:2,name:"fa-sort",class:"ml-2 h-4 w-4"}))]),_:1})]),_:1}),a(e(ne),{align:"start"},{default:t(()=>[a(e(O),{onClick:o[0]||(o[0]=c=>n.column.toggleSorting(!1))},{default:t(()=>[a(s,{name:"fa-arrow-up",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),u(" Asc ")]),_:1}),a(e(O),{onClick:o[1]||(o[1]=c=>n.column.toggleSorting(!0))},{default:t(()=>[a(s,{name:"fa-arrow-down",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),u(" Desc ")]),_:1}),a(e(se)),a(e(O),{onClick:o[2]||(o[2]=c=>n.column.toggleVisibility(!1))},{default:t(()=>[a(s,{name:"fa-regular-eye-slash",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),u(" Hide ")]),_:1})]),_:1})]),_:1})],2)):(d(),y("div",{key:1,class:q(n.$attrs.class)},S(n.title),3))}}}),Ua=A.object({id:A.number(),name:A.string().min(2).max(50),whatsapp_phone_number:A.string(),email:A.string(),country_name:A.string(),outstanding_debts:A.number()}),Ra={class:"grid gap-4 py-4"},Fa={class:"grid grid-cols-4 items-center gap-4"},Da=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Ta={class:"grid grid-cols-4 items-center gap-4"},za=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Ma={class:"grid grid-cols-4 items-center gap-4"},Na=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Aa={class:"col-span-3"},ja={class:"grid grid-cols-4 items-center gap-4"},Ba={class:"grid grid-cols-4 items-center gap-4"},Ea={class:"grid grid-cols-4 items-center gap-4"},Ha={class:"grid grid-cols-4 items-center gap-4"},La={class:"grid grid-cols-4 items-center gap-4"},Wa={class:"grid grid-cols-4 items-center gap-4"},Ga=D({__name:"DataTableEditModal",props:{row:{}},setup(r){const n=Z("tableStore",Q("customer")),o=r,s=G({name:"",business_registration_id:"",whatsapp_phone_number:"",email:"",streetAddress:"",postcode:"",city:"",state:"",country:0}),c=G({is_loading:!1,is_open:!1,data:[{value:"",label:""}]}),_=P(!0),h=P(!1),R=P(null),{toast:F}=ie(),x=P("");async function b(g,l){c.is_loading=!0;try{var V=`/api/country/list?search=${g}`;l&&(V+=`&current_country=${l}`);const j=await E.get(V,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});c.data=j.data.Result}catch(j){var p=j.response.data.message||"";F({title:"Whoops, something went wrong",description:p,variant:"destructive"})}finally{c.is_loading=!1}}re(x,$e.debounce(async g=>{await b(g,s.country)},300));async function N(){try{const g=await E.get(`/api/customer/${o.row.id}/`);Object.assign(s,g.data.Result),s.country&&await b("",s.country),_.value=!1}catch{_.value=!1}}function $(){const g=[{condition:s.name==="",message:"Name cannot be blank"},{condition:s.whatsapp_phone_number==="",message:"Whatsapp Phone cannot be blank"},{condition:s.country==null,message:"Country cannot be blank"}];for(let l of g)if(l.condition)return R.value=l.message,!1;return!0}async function U(){if($()){_.value=!0;try{const l=await E.patch(`/api/customer/${o.row.id}/`,{...s},{headers:{"Content-Type":"application/json"}});T(),await n.refresh(n.page_index),F({title:l.data.Result,variant:"success"})}catch{F({title:"Whoops, something went wrong",description:"An unexpected error occurred.",variant:"destructive"})}finally{_.value=!1}}}function T(){h.value=!h.value,h.value&&N()}function C(g){s.country=g.id,c.is_open=!1}function m(g){x.value=g.target.value}return(g,l)=>{const V=L("VIcon");return d(),y("div",null,[i("div",null,[a(e(I),{variant:"default",size:"sm",class:"h-8 ml-2 flex",onClick:T},{default:t(()=>[a(V,{name:"fa-pen",class:"size-4"})]),_:1})]),a(e(ye),{open:h.value,"onUpdate:open":l[10]||(l[10]=p=>h.value=p)},{default:t(()=>[a(e(we),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:t(()=>[a(e(de),null,{default:t(()=>[a(e(ce),null,{default:t(()=>[u("Edit Custsomer")]),_:1}),a(e(ue),null,{default:t(()=>[u(" Insert the details of the customer here. Click edit when you're done. ")]),_:1})]),_:1}),i("div",null,[i("div",Ra,[i("div",Fa,[a(e(v),{for:"name",class:"text-right"},{default:t(()=>[u(" Company Name "),Da]),_:1}),a(e(w),{id:"name",modelValue:s.name,"onUpdate:modelValue":l[0]||(l[0]=p=>s.name=p),placeholder:"Geroge Sdn Bhd",class:"col-span-3"},null,8,["modelValue"])]),i("div",Ta,[a(e(v),{for:"whatsapp_phone",class:"text-right required:"},{default:t(()=>[u(" Whatsapp Phone "),za]),_:1}),a(e(w),{id:"whatsapp_phone",modelValue:s.whatsapp_phone_number,"onUpdate:modelValue":l[1]||(l[1]=p=>s.whatsapp_phone_number=p),placeholder:"0129876348",class:"col-span-3"},null,8,["modelValue"])]),i("div",Ma,[a(e(v),{for:"country",class:"text-right leading-normal"},{default:t(()=>[u(" Country "),Na]),_:1}),i("div",Aa,[a(e(me),{open:c.is_open,"onUpdate:open":l[3]||(l[3]=p=>c.is_open=p)},{default:t(()=>[a(e(pe),{"as-child":""},{default:t(()=>[a(e(I),{variant:"outline",role:"combobox","aria-expanded":c.is_open,class:"w-full justify-between px-3",disabled:c.is_loading},{default:t(()=>{var p;return[u(S(s.country?(p=c.data.find(j=>j.id===s.country))==null?void 0:p.label:"Select country")+" ",1),c.is_loading?(d(),f(V,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(d(),f(V,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),a(e(_e),{class:"w-[500px] p-1"},{default:t(()=>[a(e(fe),null,{default:t(()=>[a(e(ge),{class:"h-9",modelValue:x.value,"onUpdate:modelValue":l[2]||(l[2]=p=>x.value=p),placeholder:"Search country...",onInput:m},null,8,["modelValue"]),a(e(he),null,{default:t(()=>[u("No country found.")]),_:1}),c.is_loading?(d(),f(e(K),{key:1},{default:t(()=>[a(V,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2 my-2 mx-auto"})]),_:1})):(d(),f(e(K),{key:0},{default:t(()=>[a(e(be),null,{default:t(()=>[(d(!0),y(z,null,M(c.data,p=>(d(),f(e(ve),{key:p.id,value:p.value??"",onSelect:()=>C(p)},{default:t(()=>[u(S(p.label)+" ",1),a(V,{name:"fa-check",class:q(["ml-auto h-4 w-4",s.country===p.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1}))]),_:1})]),_:1})]),_:1},8,["open"])])]),i("div",ja,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Email ")]),_:1}),a(e(w),{id:"email",modelValue:s.email,"onUpdate:modelValue":l[4]||(l[4]=p=>s.email=p),placeholder:"hello@example.com",class:"col-span-3"},null,8,["modelValue"])]),i("div",Ba,[a(e(v),{for:"business_registration_id",class:"text-right"},{default:t(()=>[u(" Business ID ")]),_:1}),a(e(w),{id:"business_registration_id",modelValue:s.business_registration_id,"onUpdate:modelValue":l[5]||(l[5]=p=>s.business_registration_id=p),placeholder:"820720-X",class:"col-span-3"},null,8,["modelValue"])]),a(X),i("div",Ea,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Address ")]),_:1}),a(e(w),{id:"email",modelValue:s.streetAddress,"onUpdate:modelValue":l[6]||(l[6]=p=>s.streetAddress=p),placeholder:"Lot 2000, Taman Jalan Indah",class:"col-span-3"},null,8,["modelValue"])]),i("div",Ha,[a(e(v),{for:"state",class:"text-right leading-normal"},{default:t(()=>[u(" State ")]),_:1}),a(e(w),{id:"state",modelValue:s.state,"onUpdate:modelValue":l[7]||(l[7]=p=>s.state=p),placeholder:"Selangor",class:"col-span-3"},null,8,["modelValue"])]),i("div",La,[a(e(v),{for:"city",class:"text-right leading-normal"},{default:t(()=>[u(" City ")]),_:1}),a(e(w),{id:"city",modelValue:s.city,"onUpdate:modelValue":l[8]||(l[8]=p=>s.city=p),placeholder:"Puchong",class:"col-span-3"},null,8,["modelValue"])]),i("div",Wa,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Post Code ")]),_:1}),a(e(w),{id:"email",modelValue:s.postcode,"onUpdate:modelValue":l[9]||(l[9]=p=>s.postcode=p),placeholder:"22000",class:"col-span-3"},null,8,["modelValue"])])])]),a(e(xe),{class:"flex justify-end"},{default:t(()=>[a(e(I),{type:"submit",onClick:U,disabled:_.value},{default:t(()=>[_.value?(d(),f(V,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):H("",!0),u(" Edit")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),Ka={class:"flex gap-1"},qa=D({__name:"DataTableRowActions",props:{row:{}},setup(r){const n=r,o=Y(()=>Ua.parse(n.row.original));return(s,c)=>(d(),y("div",Ka,[a(Ga,{row:o.value},null,8,["row"])]))}}),Qa=[{id:"select",header:({table:r})=>k(te,{checked:r.getIsAllPageRowsSelected()||r.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":n=>r.toggleAllPageRowsSelected(!!n),ariaLabel:"Select all",class:"translate-y-0.5"}),cell:({row:r})=>k(te,{checked:r.getIsSelected(),"onUpdate:checked":n=>r.toggleSelected(!!n),ariaLabel:"Select row",class:"translate-y-0.5"}),enableSorting:!1,enableHiding:!1},{accessorKey:"name",header:({column:r})=>k(B,{column:r,title:"Name"}),cell:({row:r})=>{const n=r.original.id,o=r.getValue("name");return k(He,{class:"w-fit underline cursor-pointer font-bold",to:`/customer/${n}`},()=>o)},enableSorting:!1,enableHiding:!1,filterFn:(r,n,o)=>{var _;const s=((_=r.getValue(n))==null?void 0:_.toString().toLowerCase())??"",c=o==null?void 0:o.toString().toLowerCase();return s.includes(c)}},{accessorKey:"email",header:({column:r})=>k(B,{column:r,title:"Email"}),cell:({row:r})=>k("div",{class:"w-fit"},r.getValue("email")),enableSorting:!1,enableHiding:!1,meta:{title:"Email"}},{accessorKey:"whatsapp_phone_number",header:({column:r})=>k(B,{column:r,title:"Whatsapp Phone"}),cell:({row:r})=>k("div",{class:"w-fit"},r.getValue("whatsapp_phone_number")),enableSorting:!1,enableHiding:!1,meta:{title:"Whatsapp Phone"}},{accessorKey:"country_name",header:({column:r})=>k(B,{column:r,title:"Country"}),cell:({row:r})=>k("div",{class:"w-fit"},r.getValue("country_name")),enableSorting:!1,enableHiding:!1,meta:{title:"Company Name"}},{accessorKey:"outstanding_debts",header:({column:r})=>k(B,{column:r,title:"Outstanding Debts"}),cell:({row:r})=>{const n=r.getValue("outstanding_debts");return k(Qe,{variant:n===0||n===0?"success":"destructive"},`${n} MYR`)},enableSorting:!0,enableHiding:!0,meta:{title:"Outstanding Debt"}},{id:"actions",cell:({row:r})=>k(qa,{row:r})}],Ja={class:"p-4 md:p-8 space-y-8 h-full"},Oa=i("div",{class:"flex items-center justify-between space-y-2"},[i("div",null,[i("h2",{class:"text-2xl font-bold tracking-tight"},"Customer"),i("p",{class:"text-muted-foreground"},"Here's a list of your existing customers!")])],-1),Xa={key:0,class:"text-center"},Ya={key:1},Za="/api/customer",rt=D({__name:"Customer",setup(r){const n=Q("customer"),o=s=>({id:s.id,name:s.name,company_name:s.company_name,whatsapp_phone_number:s.whatsapp_phone_number,email:s.email,country_name:s.country_name,outstanding_debts:s.outstanding_debts});return Le(async()=>{await n.fetch(Za,0,o)}),Ge("tableStore",n),We(()=>{n.$reset()}),(s,c)=>{const _=L("VIcon");return d(),y("div",Ja,[Oa,e(n).is_loading?(d(),y("div",Xa,[a(_,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-10 h-10"})])):(d(),y("div",Ya,[a(Ia,{data:e(n).tasks,columns:e(Qa)},null,8,["data","columns"])]))])}}});export{rt as default};
