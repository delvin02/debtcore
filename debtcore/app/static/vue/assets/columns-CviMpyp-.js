import{_ as $e,a as Ce,b as ke,c as Se,d as Pe,e as Ie,f as te,g as Ue,u as Re,h as Fe,i as De,j as Z,k as q,l as Te,m as Me,n as Ne,o as Ae,p as ze,q as Ee,r as je,s as He,F as ee}from"./TableRow.vue_vue_type_script_setup_true_lang-BOvJHCsz.js";import{e as N,r as W,o as d,c as v,d as i,t as S,a,k as t,u as e,F as T,D as M,s as I,b as u,A as Q,l as g,P as se,Q as le,R as ne,an as X,ao as L,i as P,ap as oe,a0 as ie,aq as E,as as re,at as de,au as ce,_ as b,O as ue,G as me,N as pe,H as ge,I as fe,K as _e,L as he,J as G,E as O,m as H,av as be,M as ye,n as K,aw as Be,a3 as B,a4 as J,g as Le,a5 as k}from"../main.js";import{_ as we}from"./DialogScrollContent.vue_vue_type_script_setup_true_lang-ao_tKgWI.js";import{_ as ve}from"./DialogFooter.vue_vue_type_script_setup_true_lang-CUbi7heN.js";import{_ as w}from"./Input.vue_vue_type_script_setup_true_lang-BaBacWsD.js";import{u as Y,z,_ as ae}from"./Checkbox.vue_vue_type_script_setup_true_lang-Di5NrHb0.js";import{_ as xe}from"./lodash-BtnTHUG3.js";import{_ as Ge}from"./index-DhdF1qMN.js";const Ke={class:"flex items-center justify-between px-2 pb-10"},We={class:"flex-1 text-sm text-muted-foreground"},qe={class:"flex items-center space-x-6 lg:space-x-8 text-primary"},Je={class:"flex items-center space-x-2"},Oe=i("p",{class:"text-sm font-medium"},"Rows per page",-1),Qe={class:"flex w-[100px] items-center justify-center text-sm font-medium"},Xe={class:"flex items-center space-x-2"},Ye=i("span",{class:"sr-only"},"Go to first page",-1),Ze=i("span",{class:"sr-only"},"Go to previous page",-1),ea=i("span",{class:"sr-only"},"Go to next page",-1),aa=i("span",{class:"sr-only"},"Go to last page",-1),ta=N({__name:"DataTablePagination",props:{table:{}},setup(r){return(o,n)=>{const l=W("VIcon");return d(),v("div",Ke,[i("div",We,S(o.table.getFilteredSelectedRowModel().rows.length)+" of "+S(o.table.getFilteredRowModel().rows.length)+" row(s) selected. ",1),i("div",qe,[i("div",Je,[Oe,a(e(Se),{"model-value":`${o.table.getState().pagination.pageSize}`,"onUpdate:modelValue":o.table.setPageSize},{default:t(()=>[a(e($e),{class:"h-8 w-[70px]"},{default:t(()=>[a(e(Ce),{placeholder:`${o.table.getState().pagination.pageSize}`},null,8,["placeholder"])]),_:1}),a(e(ke),{side:"top"},{default:t(()=>[(d(),v(T,null,M([10,20,30,40,50],c=>a(e(Pe),{key:c,value:`${c}`},{default:t(()=>[u(S(c),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1},8,["model-value","onUpdate:modelValue"])]),i("div",Qe," Page "+S(o.table.getState().pagination.pageIndex+1)+" of "+S(o.table.getPageCount()),1),i("div",Xe,[a(e(I),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!o.table.getCanPreviousPage(),onClick:n[0]||(n[0]=c=>o.table.setPageIndex(0))},{default:t(()=>[Ye,a(l,{name:"fa-arrow-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(I),{variant:"outline",class:"h-8 w-8 p-0",disabled:!o.table.getCanPreviousPage(),onClick:n[1]||(n[1]=c=>o.table.previousPage())},{default:t(()=>[Ze,a(l,{name:"fa-chevron-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(I),{variant:"outline",class:"h-8 w-8 p-0",disabled:!o.table.getCanNextPage(),onClick:n[2]||(n[2]=c=>o.table.nextPage())},{default:t(()=>[ea,a(l,{name:"fa-chevron-right",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(I),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!o.table.getCanNextPage(),onClick:n[3]||(n[3]=c=>o.table.setPageIndex(o.table.getPageCount()-1))},{default:t(()=>[aa,a(l,{name:"fa-arrow-right",class:"h-4 w-4"})]),_:1},8,["disabled"])])])])}}}),sa=N({__name:"DataTableViewOptions",props:{table:{}},setup(r){const o=r;console.log(o.table.getAllColumns());const n=Q(()=>o.table.getAllColumns().filter(l=>typeof l.accessorFn<"u"&&l.getCanHide()));return console.log(n),(l,c)=>(d(),g(e(ne),null,{default:t(()=>[a(e(se),{"as-child":""},{default:t(()=>[a(e(I),{variant:"outline",size:"sm",class:"ml-auto hidden h-8 lg:flex"},{default:t(()=>[u(" View ")]),_:1})]),_:1}),a(e(le),{align:"end",class:"w-[150px]"},{default:t(()=>[a(e(Ie),null,{default:t(()=>[u("Toggle columns")]),_:1}),a(e(te)),(d(!0),v(T,null,M(n.value,_=>(d(),g(e(Ue),{key:_.id,class:"capitalize",checked:_.getIsVisible(),"onUpdate:checked":y=>_.toggleVisibility(!!y)},{default:t(()=>{var y;return[u(S(((y=_.columnDef.meta)==null?void 0:y.title)||_.id),1)]}),_:2},1032,["checked","onUpdate:checked"]))),128))]),_:1})]),_:1}))}}),la={class:"grid gap-4 py-4"},na={class:"grid grid-cols-4 items-center gap-4"},oa=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),ia={class:"grid grid-cols-4 items-center gap-4"},ra=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),da={class:"grid grid-cols-4 items-center gap-4"},ca=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),ua={class:"grid grid-cols-4 items-center gap-4"},ma=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),pa={class:"col-span-3"},ga={class:"grid grid-cols-4 items-center gap-4"},fa={class:"grid grid-cols-4 items-center gap-4"},_a={class:"grid grid-cols-4 items-center gap-4"},ha={class:"grid grid-cols-4 items-center gap-4"},ba={class:"grid grid-cols-4 items-center gap-4"},ya={key:0,class:"grid grid-cols-4 items-center gap-4"},wa=N({__name:"DataTableCreateCustomer",setup(r){const o=X("tableStore",Y("customer")),n=L({name:"",business_registration_id:"",whatsapp_phone_number:"",email:"",streetAddress:"",postcode:"",city:"",state:"",country:null}),l=L({is_loading:!1,is_open:!1,data:[{value:"",label:""}]}),c=P("");async function _(C){l.is_loading=!0;try{const p=await E.get(`http://127.0.0.1:8000/api/country/list?search=${C||""}`,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});l.data=p.data.Result}catch(p){console.error("There was an error fetching the select list:",p)}finally{l.is_loading=!1}}const y=P(!1),x=P(!1),F=P(null),{toast:U}=oe();ie(c,xe.debounce(async C=>{x.value&&await _(C)},500));function h(){const C=[{condition:n.name==="",message:"Name cannot be blank"},{condition:n.whatsapp_phone_number==="",message:"Whatsapp Phone cannot be blank"},{condition:n.email==="",message:"Email cannot be blank"},{condition:n.country==null,message:"Country cannot be blank"}];for(let p of C)if(p.condition)return F.value=p.message,!1;return!0}async function A(){var f;if(!h())return;y.value=!0;const p=JSON.parse(((f=document.getElementById("drf_csrf"))==null?void 0:f.textContent)||"{}");try{const s=await E.post("http://127.0.0.1:8000/api/customer",{...n},{headers:{"Content-Type":"application/json",[p.csrfHeaderName]:p.csrfToken}});V(),await o.refresh(o.page_index),U({title:s.data.Result,variant:"success"})}catch(s){let $="An unexpected error occurred.";if(E.isAxiosError(s)&&s.response)if(s.response.data.details&&typeof s.response.data.details=="object"){const m=Object.keys(s.response.data.details);m.length>0&&s.response.data.details[m[0]].length>0&&($=s.response.data.details[m[0]][0])}else s.response.data.error&&($=s.response.data.error);U({title:"Whoops, something went wrong",description:$||"",variant:"destructive"})}finally{y.value=!1}}function V(){x.value=!x.value,x.value&&_(c.value)}function R(C){n.country=C.id,l.is_open=!1}function D(C){c.value=C.target.value}return(C,p)=>{const f=W("VIcon");return d(),v("div",null,[i("div",null,[a(e(I),{variant:"default",size:"sm",class:"hidden h-8 ml-2 lg:flex",onClick:V},{default:t(()=>[a(f,{name:"fa-plus",class:"size-4"})]),_:1})]),a(e(be),{open:x.value,"onUpdate:open":p[10]||(p[10]=s=>x.value=s)},{default:t(()=>[a(e(we),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:t(()=>[a(e(re),null,{default:t(()=>[a(e(de),null,{default:t(()=>[u("Create Custsomer")]),_:1}),a(e(ce),null,{default:t(()=>[u(" Insert the details of the customer here. Click create when you're done. ")]),_:1})]),_:1}),i("div",la,[i("div",na,[a(e(b),{for:"name",class:"text-right"},{default:t(()=>[u(" Company Name "),oa]),_:1}),a(e(w),{id:"name",modelValue:n.name,"onUpdate:modelValue":p[0]||(p[0]=s=>n.name=s),placeholder:"Geroge Sdn Bhd",class:"col-span-3"},null,8,["modelValue"])]),i("div",ia,[a(e(b),{for:"whatsapp_phone",class:"text-right required:"},{default:t(()=>[u(" Whatsapp Phone "),ra]),_:1}),a(e(w),{id:"whatsapp_phone",modelValue:n.whatsapp_phone_number,"onUpdate:modelValue":p[1]||(p[1]=s=>n.whatsapp_phone_number=s),placeholder:"012-9886348",class:"col-span-3"},null,8,["modelValue"])]),i("div",da,[a(e(b),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Email "),ca]),_:1}),a(e(w),{id:"email",modelValue:n.email,"onUpdate:modelValue":p[2]||(p[2]=s=>n.email=s),placeholder:"hello@example.com",class:"col-span-3"},null,8,["modelValue"])]),i("div",ua,[a(e(b),{for:"country",class:"text-right leading-normal"},{default:t(()=>[u(" Country "),ma]),_:1}),i("div",pa,[a(e(ue),{open:l.is_open,"onUpdate:open":p[4]||(p[4]=s=>l.is_open=s)},{default:t(()=>[a(e(me),{"as-child":""},{default:t(()=>[a(e(I),{variant:"outline",role:"combobox","aria-expanded":l.is_open,class:"w-full justify-between px-3",disabled:l.is_loading},{default:t(()=>{var s;return[u(S(n.country?(s=l.data.find($=>$.id===n.country))==null?void 0:s.label:"Select country")+" ",1),l.is_loading?(d(),g(f,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(d(),g(f,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),a(e(pe),{class:"w-[500px] p-1"},{default:t(()=>[a(e(ge),null,{default:t(()=>[a(e(fe),{class:"h-9",modelValue:c.value,"onUpdate:modelValue":p[3]||(p[3]=s=>c.value=s),placeholder:"Search country...",onInput:D},null,8,["modelValue"]),a(e(_e),null,{default:t(()=>[u("No country found.")]),_:1}),l.is_loading?(d(),g(e(G),{key:1},{default:t(()=>[(d(),g(f,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2 my-2 mx-auto"}))]),_:1})):(d(),g(e(G),{key:0},{default:t(()=>[a(e(he),null,{default:t(()=>[(d(!0),v(T,null,M(l.data,s=>(d(),g(e(ye),{key:s.id,value:s.value??"",onSelect:()=>R(s)},{default:t(()=>[u(S(s.label)+" ",1),a(f,{name:"fa-check",class:K(["ml-auto h-4 w-4",n.country===s.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1}))]),_:1})]),_:1})]),_:1},8,["open"])])]),i("div",ga,[a(e(b),{for:"business_registration_id",class:"text-right"},{default:t(()=>[u(" Business ID ")]),_:1}),a(e(w),{id:"business_registration_id",modelValue:n.business_registration_id,"onUpdate:modelValue":p[5]||(p[5]=s=>n.business_registration_id=s),placeholder:"820720-X",class:"col-span-3"},null,8,["modelValue"])]),a(O),i("div",fa,[a(e(b),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Address ")]),_:1}),a(e(w),{id:"email",modelValue:n.streetAddress,"onUpdate:modelValue":p[6]||(p[6]=s=>n.streetAddress=s),placeholder:"Lot 2000, Taman Jalan Indah",class:"col-span-3"},null,8,["modelValue"])]),i("div",_a,[a(e(b),{for:"state",class:"text-right leading-normal"},{default:t(()=>[u(" State ")]),_:1}),a(e(w),{id:"state",modelValue:n.state,"onUpdate:modelValue":p[7]||(p[7]=s=>n.state=s),placeholder:"Selangor",class:"col-span-3"},null,8,["modelValue"])]),i("div",ha,[a(e(b),{for:"city",class:"text-right leading-normal"},{default:t(()=>[u(" City ")]),_:1}),a(e(w),{id:"city",modelValue:n.city,"onUpdate:modelValue":p[8]||(p[8]=s=>n.city=s),placeholder:"Puchong",class:"col-span-3"},null,8,["modelValue"])]),i("div",ba,[a(e(b),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Post Code ")]),_:1}),a(e(w),{id:"email",modelValue:n.postcode,"onUpdate:modelValue":p[9]||(p[9]=s=>n.postcode=s),placeholder:"22000",class:"col-span-3"},null,8,["modelValue"])]),a(O)]),F.value?(d(),v("div",ya,[a(e(b),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:t(()=>[a(f,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),u(" "+S(F.value),1)]),_:1})])):H("",!0),a(e(ve),{class:"flex justify-end"},{default:t(()=>[a(e(I),{type:"submit",onClick:A,disabled:y.value},{default:t(()=>[y.value?(d(),g(f,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):H("",!0),u(" Create")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),va={class:"flex items-center justify-between"},xa={class:"flex flex-1 items-center space-x-2"},Va=N({__name:"DataTableToolbar",props:{table:{}},setup(r){const o=r,n=Q(()=>o.table.getState().columnFilters.length>0);return(l,c)=>{var _;return d(),v("div",va,[i("div",xa,[a(e(w),{placeholder:"Search...","model-value":((_=l.table.getColumn("name"))==null?void 0:_.getFilterValue())??"",class:"h-8 w-[150px] lg:w-[250px]",onInput:c[0]||(c[0]=y=>l.table.setGlobalFilter(y.target.value))},null,8,["model-value"]),n.value?(d(),g(e(I),{key:0,variant:"ghost",class:"h-8 px-2 lg:px-3",onClick:c[1]||(c[1]=y=>l.table.resetColumnFilters())},{default:t(()=>[u(" Reset ")]),_:1})):H("",!0)]),a(sa,{table:l.table},null,8,["table"]),a(wa)])}}}),$a={class:"space-y-4 text-muted-foreground"},Ca={class:"rounded-md border"},Za=N({__name:"DataTable",props:{columns:{},data:{}},setup(r){const o=X("tableStore",Y("customer")),n=r,l=P([]),c=P([]),_=P({}),y=P({pageIndex:o.page_index,pageSize:o.page_size}),x=P();function F(h,A){let V;typeof h=="function"?V=h(A.value):V=h,A.value=V,o.set_page_index(V.pageIndex),o.set_page_size(V.pageSize)}const U=Re({get data(){return n.data},get columns(){return n.columns},state:{get sorting(){return l.value},get columnFilters(){return c.value},get columnVisibility(){return _.value},get rowSelection(){return x.value},get pagination(){return y.value}},enableRowSelection:!0,onSortingChange:h=>B(h,l),onPaginationChange:h=>F(h,y),onColumnFiltersChange:h=>B(h,c),onColumnVisibilityChange:h=>B(h,_),onRowSelectionChange:h=>B(h,x),getCoreRowModel:Me(),getFilteredRowModel:Ne(),getPaginationRowModel:Ae(),getSortedRowModel:ze(),getFacetedRowModel:Ee(),getFacetedUniqueValues:je()});return Be(()=>{U.setPageIndex(o.page_index),U.setPageSize(o.page_size)}),(h,A)=>(d(),v("div",$a,[a(Va,{table:e(U)},null,8,["table"]),i("div",Ca,[a(e(Te),null,{default:t(()=>[a(e(Fe),null,{default:t(()=>[(d(!0),v(T,null,M(e(U).getHeaderGroups(),V=>(d(),g(e(q),{key:V.id},{default:t(()=>[(d(!0),v(T,null,M(V.headers,R=>(d(),g(e(He),{key:R.id},{default:t(()=>[R.isPlaceholder?H("",!0):(d(),g(e(ee),{key:0,render:R.column.columnDef.header,props:R.getContext()},null,8,["render","props"]))]),_:2},1024))),128))]),_:2},1024))),128))]),_:1}),a(e(De),null,{default:t(()=>{var V;return[(V=e(U).getRowModel().rows)!=null&&V.length?(d(!0),v(T,{key:0},M(e(U).getRowModel().rows,R=>(d(),g(e(q),{key:R.id,"data-state":R.getIsSelected()&&"selected"},{default:t(()=>[(d(!0),v(T,null,M(R.getVisibleCells(),D=>(d(),g(e(Z),{key:D.id},{default:t(()=>[a(e(ee),{render:D.column.columnDef.cell,props:D.getContext()},null,8,["render","props"])]),_:2},1024))),128))]),_:2},1032,["data-state"]))),128)):(d(),g(e(q),{key:1},{default:t(()=>[a(e(Z),{colspan:h.columns.length,class:"h-24 text-center"},{default:t(()=>[u(" No results. ")]),_:1},8,["colspan"])]),_:1}))]}),_:1})]),_:1})]),a(ta,{table:e(U)},null,8,["table"])]))}}),j=N({__name:"DataTableColumnHeader",props:{column:{},title:{}},setup(r){return(o,n)=>{const l=W("VIcon");return o.column.getCanSort()?(d(),v("div",{key:0,class:K(e(Le)("flex items-center space-x-2",o.$attrs.class??""))},[a(e(ne),null,{default:t(()=>[a(e(se),{"as-child":""},{default:t(()=>[a(e(I),{variant:"ghost",size:"sm",class:"-ml-3 h-8 data-[state=open]:bg-accent"},{default:t(()=>[i("span",null,S(o.title),1),o.column.getIsSorted()==="desc"?(d(),g(l,{key:0,name:"fa-arrow-down",class:"ml-2 h-4 w-4"})):o.column.getIsSorted()==="asc"?(d(),g(l,{key:1,name:"fa-arrow-up",class:"ml-2 h-4 w-4"})):(d(),g(l,{key:2,name:"fa-sort",class:"ml-2 h-4 w-4"}))]),_:1})]),_:1}),a(e(le),{align:"start"},{default:t(()=>[a(e(J),{onClick:n[0]||(n[0]=c=>o.column.toggleSorting(!1))},{default:t(()=>[a(l,{name:"fa-arrow-up",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),u(" Asc ")]),_:1}),a(e(J),{onClick:n[1]||(n[1]=c=>o.column.toggleSorting(!0))},{default:t(()=>[a(l,{name:"fa-arrow-down",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),u(" Desc ")]),_:1}),a(e(te)),a(e(J),{onClick:n[2]||(n[2]=c=>o.column.toggleVisibility(!1))},{default:t(()=>[a(l,{name:"fa-regular-eye-slash",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),u(" Hide ")]),_:1})]),_:1})]),_:1})],2)):(d(),v("div",{key:1,class:K(o.$attrs.class)},S(o.title),3))}}}),ka=z.object({id:z.number(),name:z.string().min(2).max(50),whatsapp_phone_number:z.string(),email:z.string(),country_name:z.string(),outstanding_debts:z.number()}),Sa={class:"grid gap-4 py-4"},Pa={class:"grid grid-cols-4 items-center gap-4"},Ia=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Ua={class:"grid grid-cols-4 items-center gap-4"},Ra=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Fa={class:"grid grid-cols-4 items-center gap-4"},Da=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Ta={class:"grid grid-cols-4 items-center gap-4"},Ma=i("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Na={class:"col-span-3"},Aa={class:"grid grid-cols-4 items-center gap-4"},za={class:"grid grid-cols-4 items-center gap-4"},Ea={class:"grid grid-cols-4 items-center gap-4"},ja={class:"grid grid-cols-4 items-center gap-4"},Ha={class:"grid grid-cols-4 items-center gap-4"},Ba=N({__name:"DataTableEditModal",props:{row:{}},setup(r){const o=X("tableStore",Y("customer")),n=r,l=L({name:"",business_registration_id:"",whatsapp_phone_number:"",email:"",streetAddress:"",postcode:"",city:"",state:"",country:0}),c=L({is_loading:!1,is_open:!1,data:[{value:"",label:""}]}),_=P("");async function y(f,s){c.is_loading=!0;try{var $=`http://127.0.0.1:8000/api/country/list?search=${f}`;s&&($+=`&current_country=${s}`);const m=await E.get($,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});c.data=m.data.Result}catch(m){console.error("There was an error fetching the select list:",m)}finally{c.is_loading=!1}}const x=P(!0),F=P(!1),U=P(null),{toast:h}=oe();ie(_,xe.debounce(async f=>{await y(f,l.country)},300));async function A(){try{const f=await E.get(`http://127.0.0.1:8000/api/customer/${n.row.id}/`);Object.assign(l,f.data.Result),l.country&&await y("",l.country),x.value=!1}catch{x.value=!1}}function V(){const f=[{condition:l.name==="",message:"Name cannot be blank"},{condition:l.whatsapp_phone_number==="",message:"Whatsapp Phone cannot be blank"},{condition:l.email==="",message:"Email cannot be blank"},{condition:l.country==null,message:"Country cannot be blank"}];for(let s of f)if(s.condition)return U.value=s.message,!1;return!0}async function R(){if(V()){x.value=!0;try{const s=await E.patch(`http://127.0.0.1:8000/api/customer/${n.row.id}/`,{...l},{headers:{"Content-Type":"application/json"}});D(),await o.refresh(o.page_index),h({title:s.data.Result,variant:"success"})}catch{h({title:"Whoops, something went wrong",description:"An unexpected error occurred.",variant:"destructive"})}finally{x.value=!1}}}function D(){F.value=!F.value,F.value&&A()}function C(f){l.country=f.id,c.is_open=!1}function p(f){_.value=f.target.value}return(f,s)=>{const $=W("VIcon");return d(),v("div",null,[i("div",null,[a(e(I),{variant:"default",size:"sm",class:"hidden h-8 ml-2 lg:flex",onClick:D},{default:t(()=>[a($,{name:"fa-pen",class:"size-4"})]),_:1})]),a(e(be),{open:F.value,"onUpdate:open":s[10]||(s[10]=m=>F.value=m)},{default:t(()=>[a(e(we),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:t(()=>[a(e(re),null,{default:t(()=>[a(e(de),null,{default:t(()=>[u("Edit Custsomer")]),_:1}),a(e(ce),null,{default:t(()=>[u(" Insert the details of the customer here. Click edit when you're done. ")]),_:1})]),_:1}),i("div",null,[i("div",Sa,[i("div",Pa,[a(e(b),{for:"name",class:"text-right"},{default:t(()=>[u(" Company Name "),Ia]),_:1}),a(e(w),{id:"name",modelValue:l.name,"onUpdate:modelValue":s[0]||(s[0]=m=>l.name=m),placeholder:"Geroge Sdn Bhd",class:"col-span-3"},null,8,["modelValue"])]),i("div",Ua,[a(e(b),{for:"whatsapp_phone",class:"text-right required:"},{default:t(()=>[u(" Whatsapp Phone "),Ra]),_:1}),a(e(w),{id:"whatsapp_phone",modelValue:l.whatsapp_phone_number,"onUpdate:modelValue":s[1]||(s[1]=m=>l.whatsapp_phone_number=m),placeholder:"012-9886348",class:"col-span-3"},null,8,["modelValue"])]),i("div",Fa,[a(e(b),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Email "),Da]),_:1}),a(e(w),{id:"email",modelValue:l.email,"onUpdate:modelValue":s[2]||(s[2]=m=>l.email=m),placeholder:"hello@example.com",class:"col-span-3"},null,8,["modelValue"])]),i("div",Ta,[a(e(b),{for:"country",class:"text-right leading-normal"},{default:t(()=>[u(" Country "),Ma]),_:1}),i("div",Na,[a(e(ue),{open:c.is_open,"onUpdate:open":s[4]||(s[4]=m=>c.is_open=m)},{default:t(()=>[a(e(me),{"as-child":""},{default:t(()=>[a(e(I),{variant:"outline",role:"combobox","aria-expanded":c.is_open,class:"w-full justify-between px-3",disabled:c.is_loading},{default:t(()=>{var m;return[u(S(l.country?(m=c.data.find(Ve=>Ve.id===l.country))==null?void 0:m.label:"Select country")+" ",1),c.is_loading?(d(),g($,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(d(),g($,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),a(e(pe),{class:"w-[500px] p-1"},{default:t(()=>[a(e(ge),null,{default:t(()=>[a(e(fe),{class:"h-9",modelValue:_.value,"onUpdate:modelValue":s[3]||(s[3]=m=>_.value=m),placeholder:"Search country...",onInput:p},null,8,["modelValue"]),a(e(_e),null,{default:t(()=>[u("No country found.")]),_:1}),c.is_loading?(d(),g(e(G),{key:1},{default:t(()=>[(d(),g($,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2 my-2 mx-auto"}))]),_:1})):(d(),g(e(G),{key:0},{default:t(()=>[a(e(he),null,{default:t(()=>[(d(!0),v(T,null,M(c.data,m=>(d(),g(e(ye),{key:m.id,value:m.value??"",onSelect:()=>C(m)},{default:t(()=>[u(S(m.label)+" ",1),a($,{name:"fa-check",class:K(["ml-auto h-4 w-4",l.country===m.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1}))]),_:1})]),_:1})]),_:1},8,["open"])])]),i("div",Aa,[a(e(b),{for:"business_registration_id",class:"text-right"},{default:t(()=>[u(" Business ID ")]),_:1}),a(e(w),{id:"business_registration_id",modelValue:l.business_registration_id,"onUpdate:modelValue":s[5]||(s[5]=m=>l.business_registration_id=m),placeholder:"820720-X",class:"col-span-3"},null,8,["modelValue"])]),a(O),i("div",za,[a(e(b),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Address ")]),_:1}),a(e(w),{id:"email",modelValue:l.streetAddress,"onUpdate:modelValue":s[6]||(s[6]=m=>l.streetAddress=m),placeholder:"Lot 2000, Taman Jalan Indah",class:"col-span-3"},null,8,["modelValue"])]),i("div",Ea,[a(e(b),{for:"state",class:"text-right leading-normal"},{default:t(()=>[u(" State ")]),_:1}),a(e(w),{id:"state",modelValue:l.state,"onUpdate:modelValue":s[7]||(s[7]=m=>l.state=m),placeholder:"Selangor",class:"col-span-3"},null,8,["modelValue"])]),i("div",ja,[a(e(b),{for:"city",class:"text-right leading-normal"},{default:t(()=>[u(" City ")]),_:1}),a(e(w),{id:"city",modelValue:l.city,"onUpdate:modelValue":s[8]||(s[8]=m=>l.city=m),placeholder:"Puchong",class:"col-span-3"},null,8,["modelValue"])]),i("div",Ha,[a(e(b),{for:"email",class:"text-right leading-normal"},{default:t(()=>[u(" Post Code ")]),_:1}),a(e(w),{id:"email",modelValue:l.postcode,"onUpdate:modelValue":s[9]||(s[9]=m=>l.postcode=m),placeholder:"22000",class:"col-span-3"},null,8,["modelValue"])])])]),a(e(ve),{class:"flex justify-end"},{default:t(()=>[a(e(I),{type:"submit",onClick:R,disabled:x.value},{default:t(()=>[x.value?(d(),g($,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):H("",!0),u(" Edit")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),La={class:"flex gap-1"},Ga=N({__name:"DataTableRowActions",props:{row:{}},setup(r){const o=r,n=Q(()=>ka.parse(o.row.original));return(l,c)=>(d(),v("div",La,[a(Ba,{row:n.value},null,8,["row"])]))}}),et=[{id:"select",header:({table:r})=>k(ae,{checked:r.getIsAllPageRowsSelected()||r.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":o=>r.toggleAllPageRowsSelected(!!o),ariaLabel:"Select all",class:"translate-y-0.5"}),cell:({row:r})=>k(ae,{checked:r.getIsSelected(),"onUpdate:checked":o=>r.toggleSelected(!!o),ariaLabel:"Select row",class:"translate-y-0.5"}),enableSorting:!1,enableHiding:!1},{accessorKey:"name",header:({column:r})=>k(j,{column:r,title:"Name"}),cell:({row:r})=>k("div",{class:"w-fit underline"},r.getValue("name")),enableSorting:!1,enableHiding:!1,filterFn:(r,o,n)=>{var _;const l=((_=r.getValue(o))==null?void 0:_.toString().toLowerCase())??"",c=n==null?void 0:n.toString().toLowerCase();return l.includes(c)}},{accessorKey:"email",header:({column:r})=>k(j,{column:r,title:"Email"}),cell:({row:r})=>k("div",{class:"w-20"},r.getValue("email")),enableSorting:!1,enableHiding:!1,meta:{title:"Email"}},{accessorKey:"whatsapp_phone_number",header:({column:r})=>k(j,{column:r,title:"Whatsapp Phone"}),cell:({row:r})=>k("div",{class:"w-fit"},r.getValue("whatsapp_phone_number")),enableSorting:!1,enableHiding:!1,meta:{title:"Whatsapp Phone"}},{accessorKey:"country_name",header:({column:r})=>k(j,{column:r,title:"Country"}),cell:({row:r})=>k("div",{class:"w-fit"},r.getValue("country_name")),enableSorting:!1,enableHiding:!1,meta:{title:"Company Name"}},{accessorKey:"outstanding_debts",header:({column:r})=>k(j,{column:r,title:"Outstanding Debts"}),cell:({row:r})=>{const o=r.getValue("outstanding_debts");return k(Ge,{variant:o===0||o===0?"success":"destructive"},`${o} MYR`)},enableSorting:!0,enableHiding:!0,meta:{title:"Outstanding Debt"}},{id:"actions",cell:({row:r})=>k(Ga,{row:r})}];export{Za as _,et as c};
