import{_ as re,a as de,b as ce,c as ue,d as _e,e as Z,u as q,f as fe,g as me,h as ge,i as J,j as B,k as pe,l as he,m as we,n as be,o as ve,p as ye,q as $e,r as Se,F as Q,z as y,s as W}from"./Checkbox.vue_vue_type_script_setup_true_lang.C3smPaJx.js";import{e as x,r as j,o as d,c as _,d as u,t as w,a,k as o,u as e,F as D,v as I,s as S,b as c,x as O,l as h,y as ee,z as te,A as ae,m as P,B as se,i as V,C as Ce,D as T,E as le,G as ne,H as K,I as Y,n as G,g as oe,J as xe,$ as Ve,K as ke,L as De,M as Ie,_ as E,N as Re,O as Fe,P as Le,Q as Me,R as Pe,S as m,T as ze,U as Te}from"../main.js";import{_ as Ue,a as Ne}from"./DropdownMenuLabel.vue_vue_type_script_setup_true_lang.zHXQIui9.js";import{_ as ie}from"./Input.vue_vue_type_script_setup_true_lang.LM1FtyXv.js";import"./lodash.BtnTHUG3.js";import{_ as U,a as N,b as A}from"./CardDescription.vue_vue_type_script_setup_true_lang.nuAmEoIx.js";import{_ as H}from"./CardTitle.vue_vue_type_script_setup_true_lang.CooFW0om.js";import{_ as Ae}from"./DialogFooter.vue_vue_type_script_setup_true_lang.CUbi7heN.js";import{_ as He}from"./CalendarPrevButton.vue_vue_type_script_setup_true_lang.YkNaXevc.js";import{r as je,t as Be,a as Ye,f as X}from"./index.DNZ2qQq3.js";import{p as Ee}from"./index.ChZjCHsy.js";const Ke={class:"flex items-center justify-between px-2 pb-10"},Ge={class:"flex-1 text-sm text-muted-foreground"},qe={class:"flex items-center space-x-6 lg:space-x-8 text-primary"},Oe={class:"flex items-center space-x-2"},Je=u("p",{class:"text-sm font-medium"},"Rows per page",-1),Qe={class:"flex w-[100px] items-center justify-center text-sm font-medium"},We={class:"flex items-center space-x-2"},Xe=u("span",{class:"sr-only"},"Go to first page",-1),Ze=u("span",{class:"sr-only"},"Go to previous page",-1),et=u("span",{class:"sr-only"},"Go to next page",-1),tt=u("span",{class:"sr-only"},"Go to last page",-1),at=x({__name:"DataTablePagination",props:{table:{}},setup(l){return(t,s)=>{const n=j("VIcon");return d(),_("div",Ke,[u("div",Ge,w(t.table.getFilteredSelectedRowModel().rows.length)+" of "+w(t.table.getFilteredRowModel().rows.length)+" row(s) selected. ",1),u("div",qe,[u("div",Oe,[Je,a(e(ue),{"model-value":`${t.table.getState().pagination.pageSize}`,"onUpdate:modelValue":t.table.setPageSize},{default:o(()=>[a(e(re),{class:"h-8 w-[70px]"},{default:o(()=>[a(e(de),{placeholder:`${t.table.getState().pagination.pageSize}`},null,8,["placeholder"])]),_:1}),a(e(ce),{side:"top"},{default:o(()=>[(d(),_(D,null,I([10,20,30,40,50],i=>a(e(_e),{key:i,value:`${i}`},{default:o(()=>[c(w(i),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1},8,["model-value","onUpdate:modelValue"])]),u("div",Qe," Page "+w(t.table.getState().pagination.pageIndex+1)+" of "+w(t.table.getPageCount()),1),u("div",We,[a(e(S),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!t.table.getCanPreviousPage(),onClick:s[0]||(s[0]=i=>t.table.setPageIndex(0))},{default:o(()=>[Xe,a(n,{name:"fa-arrow-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(S),{variant:"outline",class:"h-8 w-8 p-0",disabled:!t.table.getCanPreviousPage(),onClick:s[1]||(s[1]=i=>t.table.previousPage())},{default:o(()=>[Ze,a(n,{name:"fa-chevron-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(S),{variant:"outline",class:"h-8 w-8 p-0",disabled:!t.table.getCanNextPage(),onClick:s[2]||(s[2]=i=>t.table.nextPage())},{default:o(()=>[et,a(n,{name:"fa-chevron-right",class:"h-4 w-4"})]),_:1},8,["disabled"]),a(e(S),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!t.table.getCanNextPage(),onClick:s[3]||(s[3]=i=>t.table.setPageIndex(t.table.getPageCount()-1))},{default:o(()=>[tt,a(n,{name:"fa-arrow-right",class:"h-4 w-4"})]),_:1},8,["disabled"])])])])}}}),st=x({__name:"DataTableViewOptions",props:{table:{}},setup(l){const t=l;console.log(t.table.getAllColumns());const s=O(()=>t.table.getAllColumns().filter(n=>typeof n.accessorFn<"u"&&n.getCanHide()));return console.log(s),(n,i)=>(d(),h(e(ae),null,{default:o(()=>[a(e(ee),{"as-child":""},{default:o(()=>[a(e(S),{variant:"outline",size:"sm",class:"ml-auto hidden h-8 lg:flex"},{default:o(()=>[c(" View ")]),_:1})]),_:1}),a(e(te),{align:"end",class:"w-[150px]"},{default:o(()=>[a(e(Ue),null,{default:o(()=>[c("Toggle columns")]),_:1}),a(e(Z)),(d(!0),_(D,null,I(s.value,r=>(d(),h(e(Ne),{key:r.id,class:"capitalize",checked:r.getIsVisible(),"onUpdate:checked":b=>r.toggleVisibility(!!b)},{default:o(()=>{var b;return[c(w(((b=r.columnDef.meta)==null?void 0:b.title)||r.id),1)]}),_:2},1032,["checked","onUpdate:checked"]))),128))]),_:1})]),_:1}))}});function lt(l,t){je(2,arguments);var s=Be(l),n=Ye(t);return isNaN(n)?new Date(NaN):(n&&s.setDate(s.getDate()+n),s)}const nt={class:"flex items-center justify-between"},ot={class:"flex flex-1 items-center space-x-2"},it=x({__name:"DataTableToolbar",props:{table:{}},setup(l){const t=l,s=O(()=>t.table.getState().columnFilters.length>0);return(n,i)=>{var r;return d(),_("div",nt,[u("div",ot,[a(e(ie),{placeholder:"Search invoice...","model-value":((r=n.table.getColumn("invoice"))==null?void 0:r.getFilterValue())??"",class:"h-8 w-[150px] lg:w-[250px]",onInput:i[0]||(i[0]=b=>n.table.setGlobalFilter(b.target.value))},null,8,["model-value"]),s.value?(d(),h(e(S),{key:0,variant:"ghost",class:"h-8 px-2 lg:px-3",onClick:i[1]||(i[1]=b=>n.table.resetColumnFilters())},{default:o(()=>[c(" Reset ")]),_:1})):P("",!0)]),a(st,{table:n.table},null,8,["table"])])}}}),rt={class:"space-y-4 text-muted-foreground"},dt={class:"rounded-md border"},ct=x({__name:"DataTable",props:{columns:{},data:{}},setup(l){const t=se("tableStore",q("debt")),s=l,n=V([]),i=V([]),r=V({}),b=V({pageIndex:t.page_index,pageSize:t.page_size}),R=V();function F(f,L){let p;typeof f=="function"?p=f(L.value):p=f,L.value=p,t.set_page_index(p.pageIndex),t.set_page_size(p.pageSize)}const C=fe({get data(){return s.data},get columns(){return s.columns},state:{get sorting(){return n.value},get columnFilters(){return i.value},get columnVisibility(){return r.value},get rowSelection(){return R.value},get pagination(){return b.value}},enableRowSelection:!0,onSortingChange:f=>T(f,n),onPaginationChange:f=>F(f,b),onColumnFiltersChange:f=>T(f,i),onColumnVisibilityChange:f=>T(f,r),onRowSelectionChange:f=>T(f,R),getCoreRowModel:he(),getFilteredRowModel:we(),getPaginationRowModel:be(),getSortedRowModel:ve(),getFacetedRowModel:ye(),getFacetedUniqueValues:$e()});return Ce(()=>{C.setPageIndex(t.page_index),C.setPageSize(t.page_size)}),(f,L)=>(d(),_("div",rt,[a(it,{table:e(C)},null,8,["table"]),u("div",dt,[a(e(pe),{class:"text-xs"},{default:o(()=>[a(e(me),null,{default:o(()=>[(d(!0),_(D,null,I(e(C).getHeaderGroups(),p=>(d(),h(e(B),{key:p.id},{default:o(()=>[(d(!0),_(D,null,I(p.headers,$=>(d(),h(e(Se),{key:$.id},{default:o(()=>[$.isPlaceholder?P("",!0):(d(),h(e(Q),{key:0,render:$.column.columnDef.header,props:$.getContext()},null,8,["render","props"]))]),_:2},1024))),128))]),_:2},1024))),128))]),_:1}),a(e(ge),{id:"dbTableBody"},{default:o(()=>{var p;return[(p=e(C).getRowModel().rows)!=null&&p.length?(d(!0),_(D,{key:0},I(e(C).getRowModel().rows,$=>(d(),h(e(B),{key:$.id,"data-state":$.getIsSelected()&&"selected"},{default:o(()=>[(d(!0),_(D,null,I($.getVisibleCells(),g=>(d(),h(e(J),{key:g.id},{default:o(()=>[a(e(Q),{render:g.column.columnDef.cell,props:g.getContext()},null,8,["render","props"])]),_:2},1024))),128))]),_:2},1032,["data-state"]))),128)):(d(),h(e(B),{key:1},{default:o(()=>[a(e(J),{colspan:f.columns.length,class:"h-24 text-center"},{default:o(()=>[c(" No results. ")]),_:1},8,["colspan"])]),_:1}))]}),_:1})]),_:1})]),a(at,{table:e(C)},null,8,["table"])]))}}),ut={class:"flex sm:flex-row sm gap-4 flex-col w-full"},_t="/api/session/card",ft=x({__name:"DashboardCard",setup(l){const t=le({scheduled_reminders:0,active_debts:0,active_debts_amount:"0.00",settled_debts_amount:"0.00"}),s=async()=>{try{const n=await K.get(_t);Object.assign(t,n.data.Result)}catch{}};return ne(()=>{s()}),(n,i)=>(d(),_("div",ut,[a(e(A),{class:"w-1/3"},{default:o(()=>[a(e(U),null,{default:o(()=>[a(e(H),null,{default:o(()=>[c(w(t.scheduled_reminders),1)]),_:1}),a(e(N),null,{default:o(()=>[c("Scheduled Reminder(s)")]),_:1})]),_:1})]),_:1}),a(e(A),{class:"w-1/3"},{default:o(()=>[a(e(U),null,{default:o(()=>[a(e(H),null,{default:o(()=>[c(w(t.active_debts),1)]),_:1}),a(e(N),null,{default:o(()=>[c("Active Debt(s)")]),_:1})]),_:1})]),_:1}),a(e(A),{class:"w-1/3"},{default:o(()=>[a(e(U),null,{default:o(()=>[a(e(H),null,{default:o(()=>[c("RM "+w(t.active_debts_amount),1)]),_:1}),a(e(N),null,{default:o(()=>[c("Active Debt Amount")]),_:1})]),_:1})]),_:1}),a(e(A),{class:"w-1/3"},{default:o(()=>[a(e(U),null,{default:o(()=>[a(e(H),null,{default:o(()=>[c("RM "+w(t.settled_debts_amount),1)]),_:1}),a(e(N),null,{default:o(()=>[c("Settled Debt")]),_:1})]),_:1})]),_:1})]))}}),k=x({__name:"DataTableColumnHeader",props:{column:{},title:{}},setup(l){return(t,s)=>{const n=j("VIcon");return t.column.getCanSort()?(d(),_("div",{key:0,class:G(e(oe)("flex items-center space-x-2",t.$attrs.class??""))},[a(e(ae),null,{default:o(()=>[a(e(ee),{"as-child":""},{default:o(()=>[a(e(S),{variant:"ghost",size:"sm",class:"-ml-3 h-8 data-[state=open]:bg-accent"},{default:o(()=>[u("span",null,w(t.title),1),t.column.getIsSorted()==="desc"?(d(),h(n,{key:0,name:"fa-arrow-down",class:"ml-2 h-4 w-4"})):t.column.getIsSorted()==="asc"?(d(),h(n,{key:1,name:"fa-arrow-up",class:"ml-2 h-4 w-4"})):(d(),h(n,{key:2,name:"fa-sort",class:"ml-2 h-4 w-4"}))]),_:1})]),_:1}),a(e(te),{align:"start"},{default:o(()=>[a(e(Y),{onClick:s[0]||(s[0]=i=>t.column.toggleSorting(!1))},{default:o(()=>[a(n,{name:"fa-arrow-up",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),c(" Asc ")]),_:1}),a(e(Y),{onClick:s[1]||(s[1]=i=>t.column.toggleSorting(!0))},{default:o(()=>[a(n,{name:"fa-arrow-down",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),c(" Desc ")]),_:1}),a(e(Z)),a(e(Y),{onClick:s[2]||(s[2]=i=>t.column.toggleVisibility(!1))},{default:o(()=>[a(n,{name:"fa-regular-eye-slash",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),c(" Hide ")]),_:1})]),_:1})]),_:1})],2)):(d(),_("div",{key:1,class:G(t.$attrs.class)},w(t.title),3))}}}),mt=y.object({id:y.number(),invoice:y.string(),customer_name:y.string().min(2).max(50),event_display:y.string(),scheduled_date:y.preprocess(l=>typeof l=="string"?new Date(l):l,y.date()),status:y.string(),additional_info:y.string(),change_info:y.string().nullable(),editable:y.boolean()}),gt={class:"grid gap-4 py-4"},pt={class:"grid grid-cols-4 items-center gap-4"},ht={class:"grid grid-cols-4 items-center gap-4"},wt={class:"col-span-3"},bt={key:0,class:"grid grid-cols-4 items-center gap-4"},vt=x({__name:"DataTableEditScheduleModal",props:{row:{}},setup(l){const t=se("dashboardStore",q("dashboard")),s=l,n=le({id:s.row.id,invoice:s.row.invoice,scheduled_date:null}),i=V(!1),r=V(!1),b=V(null),{toast:R}=xe(),F=lt(new Date,1),C=new Ve(F.getFullYear(),F.getMonth()+1,F.getDate());async function f(){try{const g=await K.get(`/api/session/${s.row.id}/scheduled_date`);if(Object.assign(n,g.data.Result),g.data.Result.scheduled_date){const v=Ee(g.data.Result.scheduled_date);n.scheduled_date=X(v,"yyyy-MM-dd")}else n.scheduled_date=null;console.log(n.scheduled_date)}catch(g){console.log(g)}finally{i.value=!1}}async function L(){i.value=!0;try{const g=await K.patch(`/api/session/${s.row.id}/scheduled_date`,{...n},{headers:{"Content-Type":"multipart/form-data"}});p(),await t.refresh(t.page_index),R({title:g.data.Result,variant:"success"})}catch{R({title:"Whoops, something went wrong",description:"An unexpected error occurred.",variant:"destructive"})}finally{i.value=!1}}function p(){r.value=!r.value,r.value&&f()}function $(g){const v=new Date(g);n.scheduled_date=X(v,"yyyy-MM-dd")}return(g,v)=>{const z=j("VIcon");return d(),_("div",null,[u("div",null,[a(e(S),{variant:"default",size:"sm",class:"hidden h-8 ml-2 lg:flex",onClick:p},{default:o(()=>[a(z,{name:"fa-pen",class:"size-4"})]),_:1})]),a(e(Pe),{open:r.value,"onUpdate:open":v[2]||(v[2]=M=>r.value=M)},{default:o(()=>[a(e(ke),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:o(()=>[a(e(De),null,{default:o(()=>[a(e(Ie),null,{default:o(()=>[c("Reschedule Reminder")]),_:1})]),_:1}),u("div",gt,[u("div",pt,[a(e(E),{for:"invoice",class:"text-right"},{default:o(()=>[c(" Invoice ")]),_:1}),a(e(ie),{id:"invoice",modelValue:n.invoice,"onUpdate:modelValue":v[0]||(v[0]=M=>n.invoice=M),class:"col-span-3",disabled:""},null,8,["modelValue"])]),u("div",ht,[a(e(E),{for:"email",class:"text-right"},{default:o(()=>[c(" Schedule Date ")]),_:1}),u("div",wt,[a(e(Re),null,{default:o(()=>[a(e(Fe),{"as-child":""},{default:o(()=>[a(e(S),{variant:"outline",class:G(e(oe)("w-full justify-start text-left font-normal",!n.scheduled_date&&"text-muted-foreground"))},{default:o(()=>[a(z,{name:"bi-calendar-fill",class:"mr-2 size-4"}),u("span",null,w(n.scheduled_date??"Select a date"),1)]),_:1},8,["class"])]),_:1}),a(e(Le),{class:"w-auto p-0"},{default:o(()=>[a(e(He),{mode:"date","min-value":e(C),"onUpdate:modelValue":v[1]||(v[1]=M=>$(M)),masks:{L:"YYYY-MM-DD"},modelConfig:{type:"string",mask:"YYYY/MM/DD"},"is-required":""},null,8,["min-value"])]),_:1})]),_:1})])])]),a(Me),b.value?(d(),_("div",bt,[a(e(E),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:o(()=>[a(z,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),c(" "+w(b.value),1)]),_:1})])):P("",!0),a(e(Ae),{class:"flex justify-end"},{default:o(()=>[a(e(S),{type:"submit",onClick:L,disabled:i.value},{default:o(()=>[i.value?(d(),h(z,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):P("",!0),c(" Edit")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),yt={class:"flex gap-1"},$t=x({__name:"DataTableRowActions",props:{row:{}},setup(l){const t=l,s=O(()=>mt.parse(t.row.original));return(n,i)=>(d(),_("div",yt,[s.value.editable?(d(),h(vt,{key:0,row:s.value},null,8,["row"])):P("",!0)]))}}),St=[{id:"select",header:({table:l})=>m(W,{checked:l.getIsAllPageRowsSelected()||l.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":t=>l.toggleAllPageRowsSelected(!!t),ariaLabel:"Select all",class:"translate-y-0.5"}),cell:({row:l})=>m(W,{checked:l.getIsSelected(),"onUpdate:checked":t=>l.toggleSelected(!!t),ariaLabel:"Select row",class:"translate-y-0.5"}),enableSorting:!1,enableHiding:!1,meta:{title:"Select"}},{accessorKey:"invoice",header:({column:l})=>m(k,{column:l,title:"Invoice"}),cell:({row:l})=>m("div",{class:"w-20"},l.getValue("invoice")),enableSorting:!0,enableHiding:!0,filterFn:(l,t,s)=>{var r;const n=((r=l.getValue(t))==null?void 0:r.toString().toLowerCase())??"",i=s==null?void 0:s.toString().toLowerCase();return n.includes(i)},meta:{title:"Invoice"}},{accessorKey:"customer_name",header:({column:l})=>m(k,{column:l,title:"Customer"}),cell:({row:l})=>m("div",{class:"w-fit"},l.getValue("customer_name")),enableSorting:!0,enableHiding:!0,enableColumnFilter:!0,filterFn:(l,t,s)=>{var r;const n=((r=l.getValue(t))==null?void 0:r.toString().toLowerCase())??"",i=s==null?void 0:s.toString().toLowerCase();return n.includes(i)},meta:{title:"Customer"}},{accessorKey:"event_display",header:({column:l})=>m(k,{column:l,title:"Event Type"}),cell:({row:l})=>m("div",{class:"w-fit"},l.getValue("event_display")),enableSorting:!0,enableHiding:!0,enableColumnFilter:!0,filterFn:(l,t,s)=>{var r;const n=((r=l.getValue(t))==null?void 0:r.toString().toLowerCase())??"",i=s==null?void 0:s.toString().toLowerCase();return n.includes(i)},meta:{title:"Event Type"}},{accessorKey:"scheduled_date",header:({column:l})=>m(k,{column:l,title:l.columnDef.meta.title}),cell:({row:l})=>{const t=l.getValue("scheduled_date");let s="";if(t){const n=new Date(Date.parse(t));isNaN(n.getTime())?s="Not Provided":s=n.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}else s="Not provided";return m("div",{class:`w-fit ${s!="Not Provided"?"":"text-red-600 font-bold"}`},s)},enableSorting:!0,enableHiding:!0,meta:{title:"Scheduled Date"}},{accessorKey:"status",header:({column:l})=>m(k,{column:l,title:"Status"}),cell:({row:l})=>m("div",{class:"w-fit"},l.getValue("status")),enableSorting:!0,enableHiding:!0,filterFn:(l,t,s)=>{var r;const n=((r=l.getValue(t))==null?void 0:r.toString().toLowerCase())||"",i=s==null?void 0:s.toString().toLowerCase();return n.includes(i)},meta:{title:"Status"}},{accessorKey:"additional_info",header:({column:l})=>m(k,{column:l,title:"Additional Info"}),cell:({row:l})=>m("div",{class:"w-fit"},l.getValue("additional_info")),enableSorting:!0,enableHiding:!0,filterFn:(l,t,s)=>{var r;const n=((r=l.getValue(t))==null?void 0:r.toString().toLowerCase())||"",i=s==null?void 0:s.toString().toLowerCase();return n.includes(i)},meta:{title:"Additional Info"}},{accessorKey:"change_info",header:({column:l})=>m(k,{column:l,title:"Change Info"}),cell:({row:l})=>m("div",{class:"w-44"},l.getValue("change_info")),enableSorting:!0,enableHiding:!0,filterFn:(l,t,s)=>{var r;const n=((r=l.getValue(t))==null?void 0:r.toString().toLowerCase())||"",i=s==null?void 0:s.toString().toLowerCase();return n.includes(i)},meta:{title:"Change Info"}},{id:"actions",cell:({row:l})=>m($t,{row:l})}],Ct={class:"p-8 space-y-8 h-full"},xt=u("div",{class:"flex items-center justify-between space-y-2"},[u("div",null,[u("h2",{class:"text-2xl font-bold tracking-tight"},"Dashboard")])],-1),Vt={key:0,class:"text-center"},kt={key:1},Dt="/api/session",Ht=x({__name:"Dashboard",setup(l){const t=q("dashboard"),s=n=>({id:n.id,invoice:n.invoice,customer_name:n.customer_name,event_display:n.event_display,scheduled_date:n.scheduled_date,status:n.status_display,additional_info:n.additional_info,change_info:n.change_info,editable:n.editable});return ne(async()=>{await t.fetch(Dt,0,s)}),Te("dashboardStore",t),ze(()=>{t.$reset()}),(n,i)=>{const r=j("VIcon");return d(),_("div",Ct,[xt,a(ft),e(t).is_loading?(d(),_("div",Vt,[a(r,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-10 h-10"})])):(d(),_("div",kt,[a(ct,{data:e(t).tasks,columns:e(St)},null,8,["data","columns"])]))])}}});export{Ht as default};
