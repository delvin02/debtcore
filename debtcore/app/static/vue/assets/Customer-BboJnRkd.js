import{_ as Ve,a as Ce,b as ke,c as Se,d as Pe,e as se,u as J,f as Ue,g as Ie,h as Re,i as ee,j as Q,k as Fe,l as De,m as Te,n as ze,o as Me,p as Ne,q as Ae,r as Ee,F as ae,z as A,s as te}from"./Checkbox.vue_vue_type_script_setup_true_lang-eutFf37Q.js";import{e as D,r as L,o as d,c as y,d as i,t as S,a,k as t,u as e,F as z,v as M,s as U,b as u,x as Y,l as g,y as le,z as ne,A as oe,B as Z,E as G,i as P,J as ie,V as re,H as B,L as de,M as ce,W as ue,_ as v,N as me,O as pe,P as _e,X as ge,Y as fe,Z as he,$ as be,a0 as q,Q as X,m as H,R as ye,a1 as ve,n as K,C as je,D as W,I as O,g as Be,S as k,a2 as He,G as Le,T as We,U as Ge}from"../main.js";import{_ as qe,a as Ke}from"./DropdownMenuLabel.vue_vue_type_script_setup_true_lang-vQutYflC.js";import{_ as we}from"./DialogScrollContent.vue_vue_type_script_setup_true_lang-DHewif45.js";import{_ as xe}from"./DialogFooter.vue_vue_type_script_setup_true_lang-CUbi7heN.js";import{_ as w}from"./Input.vue_vue_type_script_setup_true_lang-B0xvdIsq.js";import{_ as $e}from"./lodash-BtnTHUG3.js";import{_ as Je}from"./index-DhdF1qMN.js";const Qe={class:"flex items-center justify-between px-2 pb-10"},Oe={class:"flex-1 text-sm text-muted-foreground"},Xe={class:"flex items-center space-x-6 lg:space-x-8 text-primary"},Ye={class:"flex items-center space-x-2"},Ze=i("p",{class:"text-sm font-medium"},"Rows per page",-1),ea={class:"flex w-[100px] items-center justify-center text-sm font-medium"},aa={class:"flex items-center space-x-2"},ta=i("span",{class:"sr-only"},"Go to first page",-1),sa=i("span",{class:"sr-only"},"Go to previous page",-1),la=i("span",{class:"sr-only"},"Go to next page",-1),na=i("span",{class:"sr-only"},"Go to last page",-1),oa=D({__name:"DataTablePagination",props:{table:{}},setup(r){return(l,o)=>{const s=L("VIcon");return d(),y("div",Qe,[i("div",Oe,S(l.table.getFilteredSelectedRowModel().rows.length)+" of "+S(l.table.getFilteredRowModel().rows.length)+" row(s) selected. ",1),i("div",Xe,[i("div",Ye,[Ze,a(e(Se),{"model-value":`${l.table.getState().pagination.pageSize}`,"onUpdate:modelValue":l.table.setPageSize},{default:t(()=>[a(e(Ve),{class:"h-8 w-[70px]"},{default:t(()=>[a(e(Ce),{placeholder:`${l.table.getState().pagination.pageSize}`},null,8,["placeholder"])]),_:1}),a(e(ke),{side:"top"},{default:t(()=>[(d(),y(z,null,M([10,20,30,40,50],c=>a(e(Pe),{key:c,value:`${c}`},{default:t(()=>[u(S(c),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1},8,["model-value","onUpdate:modelValue"])]),i("div",ea," Page "+S(l.table.getState().pagination.pageIndex+1)+" of "+S(l.table.getPageCount()),1),i("div",aa,[a(e(U),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!l.table.getCanPreviousPage(),onClick:o[0]||(o[0]=c=>l.table.setPageIndex(0))},{default:t(()=>[ta,a(s,{name:"fa-arrow-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(U),{variant:"outline",class:"h-8 w-8 p-0",disabled:!l.table.getCanPreviousPage(),onClick:o[1]||(o[1]=c=>l.table.previousPage())},{default:t(()=>[sa,a(s,{name:"fa-chevron-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(U),{variant:"outline",class:"h-8 w-8 p-0",disabled:!l.table.getCanNextPage(),onClick:o[2]||(o[2]=c=>l.table.nextPage())},{default:t(()=>[la,a(s,{name:"fa-chevron-right",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(U),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!l.table.getCanNextPage(),onClick:o[3]||(o[3]=c=>l.table.setPageIndex(l.table.getPageCount()-1))},{default:t(()=>[na,a(s,{name:"fa-arrow-right",class:"h-4 w-4"})]),_:1},8,["disabled"])])])])}}}),ia=D({__name:"DataTableViewOptions",props:{table:{}},setup(r){const l=r;console.log(l.table.getAllColumns());const o=Y(()=>l.table.getAllColumns().filter(s=>typeof s.accessorFn<"u"&&s.getCanHide()));return console.log(o),(s,c)=>(d(),g(e(oe),null,{default:t(()=>[a(e(le),{"as-child":""},{default:t(()=>[a(e(U),{variant:"outline",size:"sm",class:"ml-auto hidden h-8 lg:flex"},{default:t(()=>[u(" View ")]),_:1})]),_:1}),a(e(ne),{align:"end",class:"w-[150px]"},{default:t(()=>[a(e(qe),null,{default:t(()=>[u("Toggle columns")]),_:1}),a(e(se)),(d(!0),y(z,null,M(o.value,_=>(d(),g(e(Ke),{key:_.id,class:"capitalize",checked:_.getIsVisible(),"onUpdate:checked":h=>_.toggleVisibility(!!h)},{default:t(()=>{var h;return[u(S(((h=_.columnDef.meta)==null?void 0:h.title)||_.id),1)]}),_:2},1032,["checked","onUpdate:checked"]))),128))]),_:1})]),_:1}))}}),ra={class:"grid gap-4 py-4"},da={class:"grid grid-cols-4 items-center gap-4"},ca=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),ua={class:"grid grid-cols-4 items-center gap-4"},ma=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),pa={class:"grid grid-cols-4 items-center gap-4"},_a=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),ga={class:"grid grid-cols-4 items-center gap-4"},fa=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),ha={class:"col-span-3"},ba={class:"grid grid-cols-4 items-center gap-4"},ya={class:"grid grid-cols-4 items-center gap-4"},va={class:"grid grid-cols-4 items-center gap-4"},wa={class:"grid grid-cols-4 items-center gap-4"},xa={class:"grid grid-cols-4 items-center gap-4"},$a={key:0,class:"grid grid-cols-4 items-center gap-4"},Va=D({__name:"DataTableCreateCustomer",setup(r){const l=Z("tableStore",J("customer")),o=G({name:"",business_registration_id:"",whatsapp_phone_number:"",email:"",streetAddress:"",postcode:"",city:"",state:"",country:null}),s=G({is_loading:!1,is_open:!1,data:[{value:"",label:""}]}),c=P("");async function _(C){s.is_loading=!0;try{const m=await B.get(`http://127.0.0.1:8000/api/country/list?search=${C||""}`,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});s.data=m.data.Result}catch(m){console.error("There was an error fetching the select list:",m)}finally{s.is_loading=!1}}const h=P(!1),R=P(!1),F=P(null),{toast:V}=ie();re(c,$e.debounce(async C=>{R.value&&await _(C)},500));function b(){const C=[{condition:o.name==="",message:"Name cannot be blank"},{condition:o.whatsapp_phone_number==="",message:"Whatsapp Phone cannot be blank"},{condition:o.email==="",message:"Email cannot be blank"},{condition:o.country==null,message:"Country cannot be blank"}];for(let m of C)if(m.condition)return F.value=m.message,!1;return!0}async function N(){var n;if(!b())return;h.value=!0;const m=JSON.parse(((n=document.getElementById("drf_csrf"))==null?void 0:n.textContent)||"{}");try{const $=await B.post("http://127.0.0.1:8000/api/customer",{...o},{headers:{"Content-Type":"application/json",[m.csrfHeaderName]:m.csrfToken}});x(),await l.refresh(l.page_index),V({title:$.data.Result,variant:"success"})}catch($){var f=$.response.data.message||"";V({title:"Whoops, something went wrong",description:f,variant:"destructive"})}finally{h.value=!1}}function x(){R.value=!R.value,R.value&&_(c.value)}function I(C){o.country=C.id,s.is_open=!1}function T(C){c.value=C.target.value}return(C,m)=>{const f=L("VIcon");return d(),y("div",null,[i("div",null,[a(e(U),{variant:"default",size:"sm",class:"hidden h-8 ml-2 lg:flex",onClick:x},{default:t(()=>[a(f,{name:"fa-plus",class:"size-4"})]),_:1})]),a(e(ye),{open:R.value,"onUpdate:open":m[10]||(m[10]=n=>R.value=n)},{default:t(()=>[a(e(we),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:t(()=>[a(e(de),null,{default:t(()=>[a(e(ce),null,{default:t(()=>[u("Create Custsomer")]),_:1}),a(e(ue),null,{default:t(()=>[u(" Insert the details of the customer here. Click create when you're done. ")]),_:1})]),_:1}),i("div",ra,[i("div",da,[a(e(v),{for:"name",class:"text-right"},{default:t(()=>[u(" Company Name "),ca]),_:1}),a(e(w),{id:"name",modelValue:o.name,"onUpdate:modelValue":m[0]||(m[0]=n=>o.name=n),placeholder:"Geroge Sdn Bhd",class:"col-span-3"},null,8,["modelValue"])]),i("div",ua,[a(e(v),{for:"whatsapp_phone",class:"text-right required:"},{default:t(()=>[u(" Whatsapp Phone "),ma]),_:1}),a(e(w),{id:"whatsapp_phone",modelValue:o.whatsapp_phone_number,"onUpdate:modelValue":m[1]||(m[1]=n=>o.whatsapp_phone_number=n),placeholder:"012-9886348",class:"col-span-3"},null,8,["modelValue"])]),i("div",pa,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Email "),_a]),_:1}),a(e(w),{id:"email",modelValue:o.email,"onUpdate:modelValue":m[2]||(m[2]=n=>o.email=n),placeholder:"hello@example.com",class:"col-span-3"},null,8,["modelValue"])]),i("div",ga,[a(e(v),{for:"country",class:"text-right leading-normal"},{default:t(()=>[u(" Country "),fa]),_:1}),i("div",ha,[a(e(me),{open:s.is_open,"onUpdate:open":m[4]||(m[4]=n=>s.is_open=n)},{default:t(()=>[a(e(pe),{"as-child":""},{default:t(()=>[a(e(U),{variant:"outline",role:"combobox","aria-expanded":s.is_open,class:"w-full justify-between px-3",disabled:s.is_loading},{default:t(()=>{var n;return[u(S(o.country?(n=s.data.find($=>$.id===o.country))==null?void 0:n.label:"Select country")+" ",1),s.is_loading?(d(),g(f,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(d(),g(f,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),a(e(_e),{class:"w-[500px] p-1"},{default:t(()=>[a(e(ge),null,{default:t(()=>[a(e(fe),{class:"h-9",modelValue:c.value,"onUpdate:modelValue":m[3]||(m[3]=n=>c.value=n),placeholder:"Search country...",onInput:T},null,8,["modelValue"]),a(e(he),null,{default:t(()=>[u("No country found.")]),_:1}),s.is_loading?(d(),g(e(q),{key:1},{default:t(()=>[(d(),g(f,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2 my-2 mx-auto"}))]),_:1})):(d(),g(e(q),{key:0},{default:t(()=>[a(e(be),null,{default:t(()=>[(d(!0),y(z,null,M(s.data,n=>(d(),g(e(ve),{key:n.id,value:n.value??"",onSelect:()=>I(n)},{default:t(()=>[u(S(n.label)+" ",1),a(f,{name:"fa-check",class:K(["ml-auto h-4 w-4",o.country===n.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1}))]),_:1})]),_:1})]),_:1},8,["open"])])]),i("div",ba,[a(e(v),{for:"business_registration_id",class:"text-right"},{default:t(()=>[u(" Business ID ")]),_:1}),a(e(w),{id:"business_registration_id",modelValue:o.business_registration_id,"onUpdate:modelValue":m[5]||(m[5]=n=>o.business_registration_id=n),placeholder:"820720-X",class:"col-span-3"},null,8,["modelValue"])]),a(X),i("div",ya,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Address ")]),_:1}),a(e(w),{id:"email",modelValue:o.streetAddress,"onUpdate:modelValue":m[6]||(m[6]=n=>o.streetAddress=n),placeholder:"Lot 2000, Taman Jalan Indah",class:"col-span-3"},null,8,["modelValue"])]),i("div",va,[a(e(v),{for:"state",class:"text-right leading-normal"},{default:t(()=>[u(" State ")]),_:1}),a(e(w),{id:"state",modelValue:o.state,"onUpdate:modelValue":m[7]||(m[7]=n=>o.state=n),placeholder:"Selangor",class:"col-span-3"},null,8,["modelValue"])]),i("div",wa,[a(e(v),{for:"city",class:"text-right leading-normal"},{default:t(()=>[u(" City ")]),_:1}),a(e(w),{id:"city",modelValue:o.city,"onUpdate:modelValue":m[8]||(m[8]=n=>o.city=n),placeholder:"Puchong",class:"col-span-3"},null,8,["modelValue"])]),i("div",xa,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Post Code ")]),_:1}),a(e(w),{id:"email",modelValue:o.postcode,"onUpdate:modelValue":m[9]||(m[9]=n=>o.postcode=n),placeholder:"22000",class:"col-span-3"},null,8,["modelValue"])]),a(X)]),F.value?(d(),y("div",$a,[a(e(v),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:t(()=>[a(f,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),u(" "+S(F.value),1)]),_:1})])):H("",!0),a(e(xe),{class:"flex justify-end"},{default:t(()=>[a(e(U),{type:"submit",onClick:N,disabled:h.value},{default:t(()=>[h.value?(d(),g(f,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):H("",!0),u(" Create")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),Ca={class:"flex items-center justify-between"},ka={class:"flex flex-1 items-center space-x-2"},Sa=D({__name:"DataTableToolbar",props:{table:{}},setup(r){const l=r,o=Y(()=>l.table.getState().columnFilters.length>0);return(s,c)=>{var _;return d(),y("div",Ca,[i("div",ka,[a(e(w),{placeholder:"Search...","model-value":((_=s.table.getColumn("name"))==null?void 0:_.getFilterValue())??"",class:"h-8 w-[150px] lg:w-[250px]",onInput:c[0]||(c[0]=h=>s.table.setGlobalFilter(h.target.value))},null,8,["model-value"]),o.value?(d(),g(e(U),{key:0,variant:"ghost",class:"h-8 px-2 lg:px-3",onClick:c[1]||(c[1]=h=>s.table.resetColumnFilters())},{default:t(()=>[u(" Reset ")]),_:1})):H("",!0)]),a(ia,{table:s.table},null,8,["table"]),a(Va)])}}}),Pa={class:"space-y-4 text-muted-foreground"},Ua={class:"rounded-md border"},Ia=D({__name:"DataTable",props:{columns:{},data:{}},setup(r){const l=Z("tableStore",J("customer")),o=r,s=P([]),c=P([]),_=P({}),h=P({pageIndex:l.page_index,pageSize:l.page_size}),R=P();function F(b,N){let x;typeof b=="function"?x=b(N.value):x=b,N.value=x,l.set_page_index(x.pageIndex),l.set_page_size(x.pageSize)}const V=Ue({get data(){return o.data},get columns(){return o.columns},state:{get sorting(){return s.value},get columnFilters(){return c.value},get columnVisibility(){return _.value},get rowSelection(){return R.value},get pagination(){return h.value}},enableRowSelection:!0,onSortingChange:b=>W(b,s),onPaginationChange:b=>F(b,h),onColumnFiltersChange:b=>W(b,c),onColumnVisibilityChange:b=>W(b,_),onRowSelectionChange:b=>W(b,R),getCoreRowModel:De(),getFilteredRowModel:Te(),getPaginationRowModel:ze(),getSortedRowModel:Me(),getFacetedRowModel:Ne(),getFacetedUniqueValues:Ae()});return je(()=>{V.setPageIndex(l.page_index),V.setPageSize(l.page_size)}),(b,N)=>(d(),y("div",Pa,[a(Sa,{table:e(V)},null,8,["table"]),i("div",Ua,[a(e(Fe),null,{default:t(()=>[a(e(Ie),null,{default:t(()=>[(d(!0),y(z,null,M(e(V).getHeaderGroups(),x=>(d(),g(e(Q),{key:x.id},{default:t(()=>[(d(!0),y(z,null,M(x.headers,I=>(d(),g(e(Ee),{key:I.id},{default:t(()=>[I.isPlaceholder?H("",!0):(d(),g(e(ae),{key:0,render:I.column.columnDef.header,props:I.getContext()},null,8,["render","props"]))]),_:2},1024))),128))]),_:2},1024))),128))]),_:1}),a(e(Re),{id:"dbTableBody"},{default:t(()=>{var x;return[(x=e(V).getRowModel().rows)!=null&&x.length?(d(!0),y(z,{key:0},M(e(V).getRowModel().rows,I=>(d(),g(e(Q),{key:I.id,"data-state":I.getIsSelected()&&"selected"},{default:t(()=>[(d(!0),y(z,null,M(I.getVisibleCells(),T=>(d(),g(e(ee),{key:T.id},{default:t(()=>[a(e(ae),{render:T.column.columnDef.cell,props:T.getContext()},null,8,["render","props"])]),_:2},1024))),128))]),_:2},1032,["data-state"]))),128)):(d(),g(e(Q),{key:1},{default:t(()=>[a(e(ee),{colspan:b.columns.length,class:"h-24 text-center"},{default:t(()=>[u(" No results. ")]),_:1},8,["colspan"])]),_:1}))]}),_:1})]),_:1})]),a(oa,{table:e(V)},null,8,["table"])]))}}),j=D({__name:"DataTableColumnHeader",props:{column:{},title:{}},setup(r){return(l,o)=>{const s=L("VIcon");return l.column.getCanSort()?(d(),y("div",{key:0,class:K(e(Be)("flex items-center space-x-2",l.$attrs.class??""))},[a(e(oe),null,{default:t(()=>[a(e(le),{"as-child":""},{default:t(()=>[a(e(U),{variant:"ghost",size:"sm",class:"-ml-3 h-8 data-[state=open]:bg-accent"},{default:t(()=>[i("span",null,S(l.title),1),l.column.getIsSorted()==="desc"?(d(),g(s,{key:0,name:"fa-arrow-down",class:"ml-2 h-4 w-4"})):l.column.getIsSorted()==="asc"?(d(),g(s,{key:1,name:"fa-arrow-up",class:"ml-2 h-4 w-4"})):(d(),g(s,{key:2,name:"fa-sort",class:"ml-2 h-4 w-4"}))]),_:1})]),_:1}),a(e(ne),{align:"start"},{default:t(()=>[a(e(O),{onClick:o[0]||(o[0]=c=>l.column.toggleSorting(!1))},{default:t(()=>[a(s,{name:"fa-arrow-up",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),u(" Asc ")]),_:1}),a(e(O),{onClick:o[1]||(o[1]=c=>l.column.toggleSorting(!0))},{default:t(()=>[a(s,{name:"fa-arrow-down",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),u(" Desc ")]),_:1}),a(e(se)),a(e(O),{onClick:o[2]||(o[2]=c=>l.column.toggleVisibility(!1))},{default:t(()=>[a(s,{name:"fa-regular-eye-slash",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),u(" Hide ")]),_:1})]),_:1})]),_:1})],2)):(d(),y("div",{key:1,class:K(l.$attrs.class)},S(l.title),3))}}}),Ra=A.object({id:A.number(),name:A.string().min(2).max(50),whatsapp_phone_number:A.string(),email:A.string(),country_name:A.string(),outstanding_debts:A.number()}),Fa={class:"grid gap-4 py-4"},Da={class:"grid grid-cols-4 items-center gap-4"},Ta=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),za={class:"grid grid-cols-4 items-center gap-4"},Ma=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Na={class:"grid grid-cols-4 items-center gap-4"},Aa=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Ea={class:"grid grid-cols-4 items-center gap-4"},ja=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Ba={class:"col-span-3"},Ha={class:"grid grid-cols-4 items-center gap-4"},La={class:"grid grid-cols-4 items-center gap-4"},Wa={class:"grid grid-cols-4 items-center gap-4"},Ga={class:"grid grid-cols-4 items-center gap-4"},qa={class:"grid grid-cols-4 items-center gap-4"},Ka=D({__name:"DataTableEditModal",props:{row:{}},setup(r){const l=Z("tableStore",J("customer")),o=r,s=G({name:"",business_registration_id:"",whatsapp_phone_number:"",email:"",streetAddress:"",postcode:"",city:"",state:"",country:0}),c=G({is_loading:!1,is_open:!1,data:[{value:"",label:""}]}),_=P(!0),h=P(!1),R=P(null),{toast:F}=ie(),V=P("");async function b(f,n){c.is_loading=!0;try{var $=`/api/country/list?search=${f}`;n&&($+=`&current_country=${n}`);const E=await B.get($,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});c.data=E.data.Result}catch(E){var p=E.response.data.message||"";F({title:"Whoops, something went wrong",description:p,variant:"destructive"})}finally{c.is_loading=!1}}re(V,$e.debounce(async f=>{await b(f,s.country)},300));async function N(){try{const f=await B.get(`/api/customer/${o.row.id}/`);Object.assign(s,f.data.Result),s.country&&await b("",s.country),_.value=!1}catch{_.value=!1}}function x(){const f=[{condition:s.name==="",message:"Name cannot be blank"},{condition:s.whatsapp_phone_number==="",message:"Whatsapp Phone cannot be blank"},{condition:s.email==="",message:"Email cannot be blank"},{condition:s.country==null,message:"Country cannot be blank"}];for(let n of f)if(n.condition)return R.value=n.message,!1;return!0}async function I(){if(x()){_.value=!0;try{const n=await B.patch(`/api/customer/${o.row.id}/`,{...s},{headers:{"Content-Type":"application/json"}});T(),await l.refresh(l.page_index),F({title:n.data.Result,variant:"success"})}catch{F({title:"Whoops, something went wrong",description:"An unexpected error occurred.",variant:"destructive"})}finally{_.value=!1}}}function T(){h.value=!h.value,h.value&&N()}function C(f){s.country=f.id,c.is_open=!1}function m(f){V.value=f.target.value}return(f,n)=>{const $=L("VIcon");return d(),y("div",null,[i("div",null,[a(e(U),{variant:"default",size:"sm",class:"hidden h-8 ml-2 lg:flex",onClick:T},{default:t(()=>[a($,{name:"fa-pen",class:"size-4"})]),_:1})]),a(e(ye),{open:h.value,"onUpdate:open":n[10]||(n[10]=p=>h.value=p)},{default:t(()=>[a(e(we),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:t(()=>[a(e(de),null,{default:t(()=>[a(e(ce),null,{default:t(()=>[u("Edit Custsomer")]),_:1}),a(e(ue),null,{default:t(()=>[u(" Insert the details of the customer here. Click edit when you're done. ")]),_:1})]),_:1}),i("div",null,[i("div",Fa,[i("div",Da,[a(e(v),{for:"name",class:"text-right"},{default:t(()=>[u(" Company Name "),Ta]),_:1}),a(e(w),{id:"name",modelValue:s.name,"onUpdate:modelValue":n[0]||(n[0]=p=>s.name=p),placeholder:"Geroge Sdn Bhd",class:"col-span-3"},null,8,["modelValue"])]),i("div",za,[a(e(v),{for:"whatsapp_phone",class:"text-right required:"},{default:t(()=>[u(" Whatsapp Phone "),Ma]),_:1}),a(e(w),{id:"whatsapp_phone",modelValue:s.whatsapp_phone_number,"onUpdate:modelValue":n[1]||(n[1]=p=>s.whatsapp_phone_number=p),placeholder:"012-9886348",class:"col-span-3"},null,8,["modelValue"])]),i("div",Na,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Email "),Aa]),_:1}),a(e(w),{id:"email",modelValue:s.email,"onUpdate:modelValue":n[2]||(n[2]=p=>s.email=p),placeholder:"hello@example.com",class:"col-span-3"},null,8,["modelValue"])]),i("div",Ea,[a(e(v),{for:"country",class:"text-right leading-normal"},{default:t(()=>[u(" Country "),ja]),_:1}),i("div",Ba,[a(e(me),{open:c.is_open,"onUpdate:open":n[4]||(n[4]=p=>c.is_open=p)},{default:t(()=>[a(e(pe),{"as-child":""},{default:t(()=>[a(e(U),{variant:"outline",role:"combobox","aria-expanded":c.is_open,class:"w-full justify-between px-3",disabled:c.is_loading},{default:t(()=>{var p;return[u(S(s.country?(p=c.data.find(E=>E.id===s.country))==null?void 0:p.label:"Select country")+" ",1),c.is_loading?(d(),g($,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(d(),g($,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),a(e(_e),{class:"w-[500px] p-1"},{default:t(()=>[a(e(ge),null,{default:t(()=>[a(e(fe),{class:"h-9",modelValue:V.value,"onUpdate:modelValue":n[3]||(n[3]=p=>V.value=p),placeholder:"Search country...",onInput:m},null,8,["modelValue"]),a(e(he),null,{default:t(()=>[u("No country found.")]),_:1}),c.is_loading?(d(),g(e(q),{key:1},{default:t(()=>[a($,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2 my-2 mx-auto"})]),_:1})):(d(),g(e(q),{key:0},{default:t(()=>[a(e(be),null,{default:t(()=>[(d(!0),y(z,null,M(c.data,p=>(d(),g(e(ve),{key:p.id,value:p.value??"",onSelect:()=>C(p)},{default:t(()=>[u(S(p.label)+" ",1),a($,{name:"fa-check",class:K(["ml-auto h-4 w-4",s.country===p.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1}))]),_:1})]),_:1})]),_:1},8,["open"])])]),i("div",Ha,[a(e(v),{for:"business_registration_id",class:"text-right"},{default:t(()=>[u(" Business ID ")]),_:1}),a(e(w),{id:"business_registration_id",modelValue:s.business_registration_id,"onUpdate:modelValue":n[5]||(n[5]=p=>s.business_registration_id=p),placeholder:"820720-X",class:"col-span-3"},null,8,["modelValue"])]),a(X),i("div",La,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Address ")]),_:1}),a(e(w),{id:"email",modelValue:s.streetAddress,"onUpdate:modelValue":n[6]||(n[6]=p=>s.streetAddress=p),placeholder:"Lot 2000, Taman Jalan Indah",class:"col-span-3"},null,8,["modelValue"])]),i("div",Wa,[a(e(v),{for:"state",class:"text-right leading-normal"},{default:t(()=>[u(" State ")]),_:1}),a(e(w),{id:"state",modelValue:s.state,"onUpdate:modelValue":n[7]||(n[7]=p=>s.state=p),placeholder:"Selangor",class:"col-span-3"},null,8,["modelValue"])]),i("div",Ga,[a(e(v),{for:"city",class:"text-right leading-normal"},{default:t(()=>[u(" City ")]),_:1}),a(e(w),{id:"city",modelValue:s.city,"onUpdate:modelValue":n[8]||(n[8]=p=>s.city=p),placeholder:"Puchong",class:"col-span-3"},null,8,["modelValue"])]),i("div",qa,[a(e(v),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Post Code ")]),_:1}),a(e(w),{id:"email",modelValue:s.postcode,"onUpdate:modelValue":n[9]||(n[9]=p=>s.postcode=p),placeholder:"22000",class:"col-span-3"},null,8,["modelValue"])])])]),a(e(xe),{class:"flex justify-end"},{default:t(()=>[a(e(U),{type:"submit",onClick:I,disabled:_.value},{default:t(()=>[_.value?(d(),g($,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):H("",!0),u(" Edit")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),Ja={class:"flex gap-1"},Qa=D({__name:"DataTableRowActions",props:{row:{}},setup(r){const l=r,o=Y(()=>Ra.parse(l.row.original));return(s,c)=>(d(),y("div",Ja,[a(Ka,{row:o.value},null,8,["row"])]))}}),Oa=[{id:"select",header:({table:r})=>k(te,{checked:r.getIsAllPageRowsSelected()||r.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":l=>r.toggleAllPageRowsSelected(!!l),ariaLabel:"Select all",class:"translate-y-0.5"}),cell:({row:r})=>k(te,{checked:r.getIsSelected(),"onUpdate:checked":l=>r.toggleSelected(!!l),ariaLabel:"Select row",class:"translate-y-0.5"}),enableSorting:!1,enableHiding:!1},{accessorKey:"name",header:({column:r})=>k(j,{column:r,title:"Name"}),cell:({row:r})=>{const l=r.original.id,o=r.getValue("name");return k(He,{class:"w-fit underline cursor-pointer",to:`/customer/${l}`},()=>o)},enableSorting:!1,enableHiding:!1,filterFn:(r,l,o)=>{var _;const s=((_=r.getValue(l))==null?void 0:_.toString().toLowerCase())??"",c=o==null?void 0:o.toString().toLowerCase();return s.includes(c)}},{accessorKey:"email",header:({column:r})=>k(j,{column:r,title:"Email"}),cell:({row:r})=>k("div",{class:"w-20"},r.getValue("email")),enableSorting:!1,enableHiding:!1,meta:{title:"Email"}},{accessorKey:"whatsapp_phone_number",header:({column:r})=>k(j,{column:r,title:"Whatsapp Phone"}),cell:({row:r})=>k("div",{class:"w-fit"},r.getValue("whatsapp_phone_number")),enableSorting:!1,enableHiding:!1,meta:{title:"Whatsapp Phone"}},{accessorKey:"country_name",header:({column:r})=>k(j,{column:r,title:"Country"}),cell:({row:r})=>k("div",{class:"w-fit"},r.getValue("country_name")),enableSorting:!1,enableHiding:!1,meta:{title:"Company Name"}},{accessorKey:"outstanding_debts",header:({column:r})=>k(j,{column:r,title:"Outstanding Debts"}),cell:({row:r})=>{const l=r.getValue("outstanding_debts");return k(Je,{variant:l===0||l===0?"success":"destructive"},`${l} MYR`)},enableSorting:!0,enableHiding:!0,meta:{title:"Outstanding Debt"}},{id:"actions",cell:({row:r})=>k(Qa,{row:r})}],Xa={class:"p-8 space-y-8 h-full"},Ya=i("div",{class:"flex items-center justify-between space-y-2"},[i("div",null,[i("h2",{class:"text-2xl font-bold tracking-tight"},"Customer"),i("p",{class:"text-muted-foreground"},"Here's a list of your existing customers!")])],-1),Za={key:0,class:"text-center"},et={key:1},at="/api/customer",ct=D({__name:"Customer",setup(r){const l=J("customer"),o=s=>({id:s.id,name:s.name,company_name:s.company_name,whatsapp_phone_number:s.whatsapp_phone_number,email:s.email,country_name:s.country_name,outstanding_debts:s.outstanding_debts});return Le(async()=>{await l.fetch(at,0,o)}),Ge("tableStore",l),We(()=>{l.$reset()}),(s,c)=>{const _=L("VIcon");return d(),y("div",Xa,[Ya,e(l).is_loading?(d(),y("div",Za,[a(_,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-10 h-10"})])):(d(),y("div",et,[a(Ia,{data:e(l).tasks,columns:e(Oa)},null,8,["data","columns"])]))])}}});export{ct as default};
