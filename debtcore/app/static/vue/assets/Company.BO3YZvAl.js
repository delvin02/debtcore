import{_ as $e,a as xe,b as ke,c as Ce,d as Ve,e as te,u as H,f as Se,g as Xe,h as Ie,i as ee,j as G,k as Ue,l as Pe,m as Re,n as Fe,o as ze,p as Te,q as Me,r as De,F as ae,z as q,s as Q}from"./Checkbox.vue_vue_type_script_setup_true_lang.5ojqHNh9.js";import{e as R,r as N,o as r,c as v,d,t as I,a as e,k as t,u as a,F as z,v as T,s as S,b as c,x as O,l as h,y as se,z as le,A as ne,B as Y,E as A,i as k,I as Z,K as oe,H as D,W as ie,X as re,a3 as de,_ as V,R as ce,N as ue,Q as me,a4 as pe,a5 as fe,a6 as _e,a7 as ge,a8 as K,Y as J,m as B,Z as he,a9 as ve,n as W,C as Ne,D as E,T as L,g as je,U as Ae,j as Be,a0 as j,G as Ee,a1 as We,a2 as He}from"../main.js";import{_ as Ge,a as qe}from"./DropdownMenuLabel.vue_vue_type_script_setup_true_lang.DeeBgwnz.js";import{_ as Le}from"./DialogScrollContent.vue_vue_type_script_setup_true_lang.G3qJvuAl.js";import{_ as we}from"./DialogFooter.vue_vue_type_script_setup_true_lang.CUbi7heN.js";import{_ as P}from"./Input.vue_vue_type_script_setup_true_lang.CSFnz65k.js";import{_ as ye}from"./lodash.BtnTHUG3.js";const Qe={class:"flex flex-col md:flex-row items-center justify-between px-2 pb-10"},Ke={class:"flex-1 text-sm text-muted-foreground mb-4 md:mb-0"},Je={class:"flex items-center space-x-6 lg:space-x-8 text-primary"},Oe={class:"flex items-center space-x-2"},Ye=d("p",{class:"text-sm font-medium"},"Rows per page",-1),Ze={class:"flex w-[100px] items-center justify-center text-sm font-medium"},ea={class:"flex items-center space-x-2"},aa=d("span",{class:"sr-only"},"Go to first page",-1),ta=d("span",{class:"sr-only"},"Go to previous page",-1),sa=d("span",{class:"sr-only"},"Go to next page",-1),la=d("span",{class:"sr-only"},"Go to last page",-1),na=R({__name:"DataTablePagination",props:{table:{}},setup(u){return(l,o)=>{const s=N("VIcon");return r(),v("div",Qe,[d("div",Ke,I(l.table.getFilteredSelectedRowModel().rows.length)+" of "+I(l.table.getFilteredRowModel().rows.length)+" row(s) selected. ",1),d("div",Je,[d("div",Oe,[Ye,e(a(Ce),{"model-value":`${l.table.getState().pagination.pageSize}`,"onUpdate:modelValue":l.table.setPageSize},{default:t(()=>[e(a($e),{class:"h-8 w-[70px]"},{default:t(()=>[e(a(xe),{placeholder:`${l.table.getState().pagination.pageSize}`},null,8,["placeholder"])]),_:1}),e(a(ke),{side:"top"},{default:t(()=>[(r(),v(z,null,T([10,20,30,40,50],i=>e(a(Ve),{key:i,value:`${i}`},{default:t(()=>[c(I(i),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1},8,["model-value","onUpdate:modelValue"])]),d("div",Ze," Page "+I(l.table.getState().pagination.pageIndex+1)+" of "+I(l.table.getPageCount()),1),d("div",ea,[e(a(S),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!l.table.getCanPreviousPage(),onClick:o[0]||(o[0]=i=>l.table.setPageIndex(0))},{default:t(()=>[aa,e(s,{name:"fa-arrow-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),e(a(S),{variant:"outline",class:"h-8 w-8 p-0",disabled:!l.table.getCanPreviousPage(),onClick:o[1]||(o[1]=i=>l.table.previousPage())},{default:t(()=>[ta,e(s,{name:"fa-chevron-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),e(a(S),{variant:"outline",class:"h-8 w-8 p-0",disabled:!l.table.getCanNextPage(),onClick:o[2]||(o[2]=i=>l.table.nextPage())},{default:t(()=>[sa,e(s,{name:"fa-chevron-right",class:"h-4 w-4"})]),_:1},8,["disabled"]),e(a(S),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!l.table.getCanNextPage(),onClick:o[3]||(o[3]=i=>l.table.setPageIndex(l.table.getPageCount()-1))},{default:t(()=>[la,e(s,{name:"fa-arrow-right",class:"h-4 w-4"})]),_:1},8,["disabled"])])])])}}}),oa=R({__name:"DataTableViewOptions",props:{table:{}},setup(u){const l=u,o=O(()=>l.table.getAllColumns().filter(s=>typeof s.accessorFn<"u"&&s.getCanHide()));return(s,i)=>(r(),h(a(ne),null,{default:t(()=>[e(a(se),{"as-child":""},{default:t(()=>[e(a(S),{variant:"outline",size:"sm",class:"ml-auto hidden h-8 lg:flex"},{default:t(()=>[c(" View ")]),_:1})]),_:1}),e(a(le),{align:"end",class:"w-[150px]"},{default:t(()=>[e(a(Ge),null,{default:t(()=>[c("Toggle columns")]),_:1}),e(a(te)),(r(!0),v(z,null,T(o.value,p=>(r(),h(a(qe),{key:p.id,class:"capitalize",checked:p.getIsVisible(),"onUpdate:checked":w=>p.toggleVisibility(!!w)},{default:t(()=>{var w;return[c(I(((w=p.columnDef.meta)==null?void 0:w.title)||p.id),1)]}),_:2},1032,["checked","onUpdate:checked"]))),128))]),_:1})]),_:1}))}}),ia={class:"grid gap-4 py-4"},ra={class:"grid grid-cols-4 items-center gap-4"},da={class:"grid grid-cols-4 items-center gap-4"},ca=d("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),ua={class:"col-span-3"},ma={class:"grid grid-cols-4 items-center gap-4"},pa={class:"grid grid-cols-4 items-center gap-4"},fa={class:"grid grid-cols-4 items-center gap-4"},_a={class:"grid grid-cols-4 items-center gap-4"},ga=R({__name:"DataTableCreateModal",setup(u){const l=Y("tableStore",H("company")),o=A({name:"",phone:"",email:"",website:"",streetAddress:"",city:"",state:"",business_registration_id:"",whatsapp_business_account_id:"",country:null}),s=A({is_loading:!0,is_open:!1,data:[{value:"",label:""}]}),i=k("");async function p(X,f){s.is_loading=!0;try{var _=`/api/country/list?search=${X}`;f&&(_+=`&current_country=${f}`);const n=await D.get(_,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});s.data=n.data.Result}catch(n){console.error("There was an error fetching the select list:",n)}finally{s.is_loading=!1}}const w=k(!1),y=k(!1),C=k(null),{toast:b}=Z();oe(i,ye.debounce(async X=>{s.is_open&&await p(X,o.country)},500));function g(){const X=[{condition:o.name==="",message:"Name cannot be blank"},{condition:o.country==null,message:"Whatsapp Phone cannot be blank"}];for(let f of X)if(f.condition)return C.value=f.message,!1;return!0}async function M(){var _;if(!g())return;w.value=!0;const f=JSON.parse(((_=document.getElementById("drf_csrf"))==null?void 0:_.textContent)||"{}");try{await D.post("/api/company",{...o},{headers:{"Content-Type":"application/json",[f.csrfHeaderName]:f.csrfToken}}),$(),await l.refresh(l.page_index),C.value="",b({title:"Company created successfully.",variant:"success"})}catch{b({title:"Whoops, something went wrong",description:"An unexpected error occured",variant:"destructive"})}finally{w.value=!1}}function $(){y.value=!y.value,y.value&&p(i.value)}function U(X){o.country=X.id,s.is_open=!1}function F(X){i.value=X.target.value}return(X,f)=>{const _=N("VIcon");return r(),v("div",null,[d("div",null,[e(a(S),{variant:"default",size:"sm",class:"h-8 ml-2 flex",onClick:$},{default:t(()=>[e(_,{name:"fa-plus",class:"size-4"})]),_:1})]),e(a(he),{open:y.value,"onUpdate:open":f[7]||(f[7]=n=>y.value=n)},{default:t(()=>[e(a(Le),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:t(()=>[e(a(ie),null,{default:t(()=>[e(a(re),null,{default:t(()=>[c("Create Company")]),_:1}),e(a(de),null,{default:t(()=>[c(" Insert the details of the company here. Click create when you're done. ")]),_:1})]),_:1}),d("div",ia,[d("div",ra,[e(a(V),{for:"name",class:"text-right required:"},{default:t(()=>[c(" Name ")]),_:1}),e(a(P),{id:"name",modelValue:o.name,"onUpdate:modelValue":f[0]||(f[0]=n=>o.name=n),placeholder:"Geroge Sdn Bhd",class:"col-span-3"},null,8,["modelValue"])]),d("div",da,[e(a(V),{for:"country",class:"text-right leading-normal"},{default:t(()=>[c(" Country "),ca]),_:1}),d("div",ua,[e(a(ce),{open:s.is_open,"onUpdate:open":f[2]||(f[2]=n=>s.is_open=n)},{default:t(()=>[e(a(ue),{"as-child":""},{default:t(()=>[e(a(S),{variant:"outline",role:"combobox","aria-expanded":s.is_open,class:"w-full justify-between px-3",disabled:s.is_loading},{default:t(()=>{var n;return[c(I(o.country?(n=s.data.find(x=>x.id===o.country))==null?void 0:n.label:"Select country")+" ",1),s.is_loading?(r(),h(_,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(r(),h(_,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),e(a(me),{class:"w-[500px] p-1"},{default:t(()=>[e(a(pe),null,{default:t(()=>[e(a(fe),{class:"h-9",modelValue:i.value,"onUpdate:modelValue":f[1]||(f[1]=n=>i.value=n),placeholder:"Search country...",onInput:F},null,8,["modelValue"]),e(a(_e),null,{default:t(()=>[c("No country found.")]),_:1}),s.is_loading?(r(),h(a(K),{key:1},{default:t(()=>[(r(),h(_,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2 my-2 mx-auto"}))]),_:1})):(r(),h(a(K),{key:0},{default:t(()=>[e(a(ge),null,{default:t(()=>[(r(!0),v(z,null,T(s.data,n=>(r(),h(a(ve),{key:n.id,value:n.value??"",onSelect:()=>U(n)},{default:t(()=>[c(I(n.label)+" ",1),e(_,{name:"fa-check",class:W(["ml-auto h-4 w-4",o.country===n.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1}))]),_:1})]),_:1})]),_:1},8,["open"])])]),d("div",ma,[e(a(V),{for:"phone",class:"text-right required:"},{default:t(()=>[c(" Phone ")]),_:1}),e(a(P),{id:"phone",modelValue:o.phone,"onUpdate:modelValue":f[3]||(f[3]=n=>o.phone=n),placeholder:"012-9886348",class:"col-span-3"},null,8,["modelValue"])]),d("div",pa,[e(a(V),{for:"email",class:"text-right leading-normal"},{default:t(()=>[c(" Email ")]),_:1}),e(a(P),{id:"email",modelValue:o.email,"onUpdate:modelValue":f[4]||(f[4]=n=>o.email=n),placeholder:"hello@example.com",class:"col-span-3"},null,8,["modelValue"])]),d("div",fa,[e(a(V),{for:"website",class:"text-right leading-normal"},{default:t(()=>[c(" Website ")]),_:1}),e(a(P),{id:"website",modelValue:o.website,"onUpdate:modelValue":f[5]||(f[5]=n=>o.website=n),placeholder:"www.kckok.my",class:"col-span-3"},null,8,["modelValue"])]),e(J),d("div",_a,[e(a(V),{for:"whatsapp_id",class:"text-right leading-normal"},{default:t(()=>[c(" Whatsapp Business Account ID ")]),_:1}),e(a(P),{id:"whatsapp_id",modelValue:o.whatsapp_business_account_id,"onUpdate:modelValue":f[6]||(f[6]=n=>o.whatsapp_business_account_id=n),placeholder:"XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX",class:"col-span-3"},null,8,["modelValue"])])]),e(a(we),{class:"flex justify-end"},{default:t(()=>[e(a(S),{type:"submit",onClick:M,disabled:w.value},{default:t(()=>[w.value?(r(),h(_,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):B("",!0),c(" Create")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),ha={class:"flex items-center justify-between"},va={class:"flex flex-1 items-center space-x-2"},wa=R({__name:"DataTableToolbar",props:{table:{}},setup(u){const l=u,o=O(()=>l.table.getState().columnFilters.length>0);return k(!1),(s,i)=>{var p;return r(),v("div",ha,[d("div",va,[e(a(P),{placeholder:"Search...","model-value":((p=s.table.getColumn("name"))==null?void 0:p.getFilterValue())??"",class:"h-8 w-[150px] lg:w-[250px]",onInput:i[0]||(i[0]=w=>s.table.setGlobalFilter(w.target.value))},null,8,["model-value"]),o.value?(r(),h(a(S),{key:0,variant:"default",class:"h-8 px-2 lg:px-3",onClick:i[1]||(i[1]=w=>s.table.resetColumnFilters())},{default:t(()=>[c(" Reset ")]),_:1})):B("",!0)]),e(oa,{table:s.table},null,8,["table"]),e(ga)])}}}),ya={class:"space-y-4 text-muted-foreground"},ba={class:"rounded-md border"},$a=R({__name:"DataTable",props:{columns:{},data:{}},setup(u){const l=Y("tableStore",H("company")),o=u,s=k([]),i=k([]),p=k({}),w=k({pageIndex:l.page_index,pageSize:l.page_size}),y=k();function C(g,M){let $;typeof g=="function"?$=g(M.value):$=g,M.value=$,l.set_page_index($.pageIndex),l.set_page_size($.pageSize)}const b=Se({get data(){return o.data},get columns(){return o.columns},state:{get sorting(){return s.value},get columnFilters(){return i.value},get columnVisibility(){return p.value},get rowSelection(){return y.value},get pagination(){return w.value}},enableRowSelection:!0,onSortingChange:g=>E(g,s),onPaginationChange:g=>C(g,w),onColumnFiltersChange:g=>E(g,i),onColumnVisibilityChange:g=>E(g,p),onRowSelectionChange:g=>E(g,y),getCoreRowModel:Pe(),getFilteredRowModel:Re(),getPaginationRowModel:Fe(),getSortedRowModel:ze(),getFacetedRowModel:Te(),getFacetedUniqueValues:Me()});return Ne(()=>{b.setPageIndex(l.page_index),b.setPageSize(l.page_size)}),(g,M)=>(r(),v("div",ya,[e(wa,{table:a(b)},null,8,["table"]),d("div",ba,[e(a(Ue),null,{default:t(()=>[e(a(Xe),null,{default:t(()=>[(r(!0),v(z,null,T(a(b).getHeaderGroups(),$=>(r(),h(a(G),{key:$.id},{default:t(()=>[(r(!0),v(z,null,T($.headers,U=>(r(),h(a(De),{key:U.id},{default:t(()=>[U.isPlaceholder?B("",!0):(r(),h(a(ae),{key:0,render:U.column.columnDef.header,props:U.getContext()},null,8,["render","props"]))]),_:2},1024))),128))]),_:2},1024))),128))]),_:1}),e(a(Ie),{id:"dbTableBody"},{default:t(()=>{var $;return[($=a(b).getRowModel().rows)!=null&&$.length?(r(!0),v(z,{key:0},T(a(b).getRowModel().rows,U=>(r(),h(a(G),{key:U.id,"data-state":U.getIsSelected()&&"selected"},{default:t(()=>[(r(!0),v(z,null,T(U.getVisibleCells(),F=>(r(),h(a(ee),{key:F.id},{default:t(()=>[e(a(ae),{render:F.column.columnDef.cell,props:F.getContext()},null,8,["render","props"])]),_:2},1024))),128))]),_:2},1032,["data-state"]))),128)):(r(),h(a(G),{key:1},{default:t(()=>[e(a(ee),{colspan:g.columns.length,class:"h-24 text-center"},{default:t(()=>[c(" No results. ")]),_:1},8,["colspan"])]),_:1}))]}),_:1})]),_:1})]),e(na,{table:a(b)},null,8,["table"])]))}}),xa=R({__name:"DataTableColumnHeader",props:{column:{},title:{}},setup(u){return(l,o)=>{const s=N("VIcon");return l.column.getCanSort()?(r(),v("div",{key:0,class:W(a(je)("flex items-center space-x-2",l.$attrs.class??""))},[e(a(ne),null,{default:t(()=>[e(a(se),{"as-child":""},{default:t(()=>[e(a(S),{variant:"ghost",size:"sm",class:"-ml-3 h-8 data-[state=open]:bg-accent"},{default:t(()=>[d("span",null,I(l.title),1),l.column.getIsSorted()==="desc"?(r(),h(s,{key:0,name:"fa-arrow-down",class:"ml-2 h-4 w-4"})):l.column.getIsSorted()==="asc"?(r(),h(s,{key:1,name:"fa-arrow-up",class:"ml-2 h-4 w-4"})):(r(),h(s,{key:2,name:"fa-sort",class:"ml-2 h-4 w-4"}))]),_:1})]),_:1}),e(a(le),{align:"start"},{default:t(()=>[e(a(L),{onClick:o[0]||(o[0]=i=>l.column.toggleSorting(!1))},{default:t(()=>[e(s,{name:"fa-arrow-up",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),c(" Asc ")]),_:1}),e(a(L),{onClick:o[1]||(o[1]=i=>l.column.toggleSorting(!0))},{default:t(()=>[e(s,{name:"fa-arrow-down",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),c(" Desc ")]),_:1}),e(a(te)),e(a(L),{onClick:o[2]||(o[2]=i=>l.column.toggleVisibility(!1))},{default:t(()=>[e(s,{name:"fa-regular-eye-slash",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),c(" Hide ")]),_:1})]),_:1})]),_:1})],2)):(r(),v("div",{key:1,class:W(l.$attrs.class)},I(l.title),3))}}}),ka=q.object({id:q.number(),name:q.string().max(50)}),Ca={class:"grid gap-4 py-4"},Va={class:"grid grid-cols-4 items-center gap-4"},Sa={class:"grid grid-cols-4 items-center gap-4"},Xa=d("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Ia={class:"col-span-3"},Ua={class:"grid grid-cols-4 items-center gap-4"},Pa={class:"grid grid-cols-4 items-center gap-4"},Ra={class:"grid grid-cols-4 items-center gap-4"},Fa={class:"grid grid-cols-4 items-center gap-4"},za={class:"grid grid-cols-4 items-center gap-4"},Ta={key:0,class:"grid grid-cols-4 items-center gap-4"},Ma=R({__name:"DataTableEditModal",props:{row:{}},setup(u){const l=Y("tableStore",H("company")),o=u,s=A({id:o.row.id,name:o.row.name,country:null,phone:"",email:"",website:"",whatsapp_business_account_id:"",is_active:!1}),i=A({is_loading:!1,is_open:!1,data:[{value:"",label:""}]}),p=k("");async function w(_,n){i.is_loading=!0;try{var x=`/api/country/list?search=${_}`;n&&(x+=`&current_country=${n}`);const m=await D.get(x,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});i.data=m.data.Result}catch{g({title:"Whoops, something went wrong",description:"There was an error fetching the select list",variant:"destructive"})}finally{i.is_loading=!1}}const y=k(!0),C=k(!1),b=k(null),{toast:g}=Z();oe(p,ye.debounce(async _=>{i.is_open&&await w(_,s.country)},500));async function M(){try{const _=await D.get(`/api/company/${o.row.id}/`);Object.assign(s,_.data.Result),s.country&&await w("",s.country),y.value=!1}catch{g({title:"Whoops, something went wrong",description:"Failed to retrieved the data",variant:"destructive"})}finally{y.value=!1}}function $(){var n;const _=[{condition:s.name==="",message:"Name cannot be blank"},{condition:((n=s.country)==null?void 0:n.toString)==null,message:"Country cannot be blank"}];for(let x of _)if(x.condition)return b.value=x.message,!1;return!0}async function U(){if($()){y.value=!0;try{const n=await D.patch(`http://127.0.0.1:8000/api/company/${o.row.id}/`,{...s},{headers:{"Content-Type":"application/json"}});F(),await l.refresh(l.page_index),g({title:n.data.Result,variant:"success"})}catch{g({title:"Whoops, something went wrong",description:"An unexpected error occurred.",variant:"destructive"})}finally{y.value=!1}}}function F(){C.value||M(),C.value=!C.value}function X(_){s.country=_.id,i.is_open=!1}function f(_){p.value=_.target.value}return(_,n)=>{const x=N("VIcon");return r(),v("div",null,[d("div",null,[e(a(S),{variant:"default",size:"sm",class:"h-8 ml-2 flex",onClick:F},{default:t(()=>[e(x,{name:"fa-pen",class:"size-4"})]),_:1})]),e(a(he),{open:C.value,"onUpdate:open":n[8]||(n[8]=m=>C.value=m)},{default:t(()=>[e(a(Ae),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:t(()=>[e(a(ie),null,{default:t(()=>[e(a(re),null,{default:t(()=>[c("Edit Company")]),_:1}),e(a(de),null,{default:t(()=>[c(" Insert the details of the company here. Click edit when you're done. ")]),_:1})]),_:1}),d("div",Ca,[d("div",Va,[e(a(V),{for:"name",class:"text-right required:"},{default:t(()=>[c(" Name ")]),_:1}),e(a(P),{id:"name",modelValue:s.name,"onUpdate:modelValue":n[0]||(n[0]=m=>s.name=m),placeholder:"Geroge Sdn Bhd",class:"col-span-3"},null,8,["modelValue"])]),d("div",Sa,[e(a(V),{for:"country",class:"text-right leading-normal"},{default:t(()=>[c(" Country "),Xa]),_:1}),d("div",Ia,[e(a(ce),{open:i.is_open,"onUpdate:open":n[2]||(n[2]=m=>i.is_open=m)},{default:t(()=>[e(a(ue),{"as-child":""},{default:t(()=>[e(a(S),{variant:"outline",role:"combobox","aria-expanded":i.is_open,class:"w-full justify-between px-3",disabled:i.is_loading},{default:t(()=>{var m;return[c(I(s.country?(m=i.data.find(be=>be.id===s.country))==null?void 0:m.label:"Select Country")+" ",1),i.is_loading?(r(),h(x,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(r(),h(x,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),e(a(me),{class:"w-[500px] p-1"},{default:t(()=>[e(a(pe),null,{default:t(()=>[e(a(fe),{class:"h-9",modelValue:p.value,"onUpdate:modelValue":n[1]||(n[1]=m=>p.value=m),placeholder:"Search country...",onInput:f},null,8,["modelValue"]),e(a(_e),null,{default:t(()=>[c("No country found.")]),_:1}),e(a(K),null,{default:t(()=>[e(a(ge),null,{default:t(()=>[(r(!0),v(z,null,T(i.data,m=>(r(),h(a(ve),{key:m.id,value:m.value??"",onSelect:()=>X(m)},{default:t(()=>[c(I(m.label)+" ",1),e(x,{name:"fa-check",class:W(["ml-auto h-4 w-4",s.country===m.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["open"])])]),d("div",Ua,[e(a(V),{for:"phone",class:"text-right required:"},{default:t(()=>[c(" Phone ")]),_:1}),e(a(P),{id:"phone",modelValue:s.phone,"onUpdate:modelValue":n[3]||(n[3]=m=>s.phone=m),placeholder:"012-9886348",class:"col-span-3"},null,8,["modelValue"])]),d("div",Pa,[e(a(V),{for:"email",class:"text-right leading-normal"},{default:t(()=>[c(" Email ")]),_:1}),e(a(P),{id:"email",modelValue:s.email,"onUpdate:modelValue":n[4]||(n[4]=m=>s.email=m),placeholder:"hello@example.com",class:"col-span-3"},null,8,["modelValue"])]),d("div",Ra,[e(a(V),{for:"website",class:"text-right leading-normal"},{default:t(()=>[c(" Website ")]),_:1}),e(a(P),{id:"website",modelValue:s.website,"onUpdate:modelValue":n[5]||(n[5]=m=>s.website=m),placeholder:"www.kckok.my",class:"col-span-3"},null,8,["modelValue"])]),e(J),d("div",Fa,[e(a(V),{for:"name",class:"text-right leading-normal"},{default:t(()=>[c(" Whatsapp Business Account ID ")]),_:1}),e(a(P),{id:"name",modelValue:s.whatsapp_business_account_id,"onUpdate:modelValue":n[6]||(n[6]=m=>s.whatsapp_business_account_id=m),placeholder:"XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX",class:"col-span-3"},null,8,["modelValue"])]),e(J),d("div",za,[e(a(V),{for:"is_active",class:"text-right leading-normal"},{default:t(()=>[c(" Active ")]),_:1}),e(a(Q),{id:"is_active",checked:s.is_active,"onUpdate:checked":n[7]||(n[7]=m=>s.is_active=!s.is_active)},null,8,["checked"])])]),b.value?(r(),v("div",Ta,[e(a(V),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:t(()=>[e(x,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),c(" "+I(b.value),1)]),_:1})])):B("",!0),e(a(we),{class:"flex justify-end"},{default:t(()=>[e(a(S),{type:"submit",onClick:U,disabled:y.value},{default:t(()=>[y.value?(r(),h(x,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):B("",!0),c(" Edit")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),Da=R({__name:"DataTableChangeCompany",props:{row:{}},setup(u){const l=Be(),s=A({company:u.row.id}),i=k(!1),{toast:p}=Z();async function w(){i.value=!0;try{const C=await D.post("/api/user/change-company/",{...s},{headers:{"Content-Type":"application/json"}});l.get_user(),p({title:C.data.Result,variant:"success"})}catch{p({title:"Whoops, something went wrong",description:"An unexpected error occurred.",variant:"destructive"})}finally{i.value=!1}}async function y(){await w()}return(C,b)=>{const g=N("VIcon");return r(),v("div",null,[d("div",null,[e(a(S),{variant:"outline",size:"sm",class:"hidden h-8 lg:flex border border-primary",onClick:y},{default:t(()=>[i.value?(r(),h(g,{key:1,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"size-4"})):(r(),h(g,{key:0,name:"fa-building",class:"size-4"}))]),_:1})])])}}}),Na={class:"flex gap-1"},ja=R({__name:"DataTableRowActions",props:{row:{}},setup(u){const l=u,o=O(()=>ka.parse(l.row.original));return(s,i)=>(r(),v("div",Na,[e(Ma,{row:o.value},null,8,["row"]),e(Da,{row:o.value},null,8,["row"])]))}}),Aa=[{id:"select",header:({table:u})=>j(Q,{checked:u.getIsAllPageRowsSelected()||u.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":l=>u.toggleAllPageRowsSelected(!!l),ariaLabel:"Select all",class:"translate-y-0.5"}),cell:({row:u})=>j(Q,{checked:u.getIsSelected(),"onUpdate:checked":l=>u.toggleSelected(!!l),ariaLabel:"Select row",class:"translate-y-0.5"}),enableSorting:!1,enableHiding:!1,meta:{title:"Select"}},{accessorKey:"name",header:({column:u})=>j(xa,{column:u,title:"Name"}),cell:({row:u})=>j("div",{class:"w-fit font-bold"},u.getValue("name")),enableSorting:!0,enableHiding:!0,enableColumnFilter:!0,filterFn:(u,l,o)=>{var p;const s=((p=u.getValue(l))==null?void 0:p.toString().toLowerCase())??"",i=o==null?void 0:o.toString().toLowerCase();return s.includes(i)},meta:{title:"Name"}},{id:"actions",cell:({row:u})=>j(ja,{row:u})}],Ba={class:"p-4 md:p-8 space-y-8 h-full"},Ea=d("div",{class:"flex items-center justify-between space-y-2"},[d("div",null,[d("h2",{class:"text-2xl font-bold tracking-tight"},"Company"),d("p",{class:"text-muted-foreground"},"Here's a list of your existing companies!")])],-1),Wa={key:0,class:"text-center"},Ha={key:1},Ga="/api/company",Za=R({__name:"Company",setup(u){const l=H("company"),o=s=>({id:s.id,name:s.name});return Ee(()=>{l.fetch(Ga,0,o)}),He("tableStore",l),We(()=>{l.$reset()}),(s,i)=>{const p=N("VIcon");return r(),v("div",Ba,[Ea,a(l).is_loading?(r(),v("div",Wa,[e(p,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-10 h-10"})])):(r(),v("div",Ha,[e($a,{data:a(l).tasks,columns:a(Aa)},null,8,["data","columns"])]))])}}});export{Za as default};
