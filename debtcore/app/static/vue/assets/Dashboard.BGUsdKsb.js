import{_ as De,a as Me,b as Ie,c as Re,d as Fe,e as ve,u as O,f as Le,g as Pe,h as ze,i as ie,j as Z,k as Te,l as Ue,m as je,n as Ae,o as He,p as Ne,q as Oe,r as Ye,F as re,z as R,s as de}from"./Checkbox.vue_vue_type_script_setup_true_lang.0dpU0WqK.js";import{e as F,r as A,o as i,c as m,d as c,t as p,a as t,k as s,u as e,F as b,v as D,s as M,b as _,x as ne,l as h,y as we,z as be,A as ye,B as Q,m as N,i as x,C as Be,D as Y,E as oe,G as $e,H as se,$ as le,I as xe,J as Ke,K as ee,V as Ee,L as B,n as z,g as T,M as H,N as Se,O as Ge,P as K,Q as Ce,R as ke,S as ce,T as te,U as We,W as qe,X as Je,_ as ae,Y as Qe,Z as Xe,a0 as w,a1 as Ze,a2 as et}from"../main.js";import{_ as tt,a as at}from"./DropdownMenuLabel.vue_vue_type_script_setup_true_lang.H-PZVEjJ.js";import{_ as Ve}from"./Input.vue_vue_type_script_setup_true_lang.-kCyUBhQ.js";import{_ as E,a as G,b as W}from"./CardDescription.vue_vue_type_script_setup_true_lang.nuAmEoIx.js";import{_ as q}from"./CardTitle.vue_vue_type_script_setup_true_lang.CooFW0om.js";import{_ as ue,a as fe,b as J,c as me,d as _e,e as ge,f as pe,g as st}from"./index.BQRzPm5F.js";import{_ as lt}from"./DialogFooter.vue_vue_type_script_setup_true_lang.CUbi7heN.js";import{_ as nt}from"./CalendarPrevButton.vue_vue_type_script_setup_true_lang.Dvo5YOt3.js";import"./lodash.BtnTHUG3.js";import{f as he}from"./index.BccI3ZLR.js";import{p as ot}from"./index.DeXtphQp.js";import"./index.5qndC0qu.js";const it={class:"flex flex-col md:flex-row items-center justify-between px-2 pb-10"},rt={class:"flex-1 text-sm text-muted-foreground mb-4 md:mb-0"},dt={class:"flex items-center space-x-6 lg:space-x-8 text-primary"},ct={class:"flex items-center space-x-2"},ut=c("p",{class:"text-sm font-medium"},"Rows per page",-1),ft={class:"flex w-[100px] items-center justify-center text-sm font-medium"},mt={class:"flex items-center space-x-2"},_t=c("span",{class:"sr-only"},"Go to first page",-1),gt=c("span",{class:"sr-only"},"Go to previous page",-1),pt=c("span",{class:"sr-only"},"Go to next page",-1),ht=c("span",{class:"sr-only"},"Go to last page",-1),vt=F({__name:"DataTablePagination",props:{table:{}},setup(n){return(a,o)=>{const l=A("VIcon");return i(),m("div",it,[c("div",rt,p(a.table.getFilteredSelectedRowModel().rows.length)+" of "+p(a.table.getFilteredRowModel().rows.length)+" row(s) selected. ",1),c("div",dt,[c("div",ct,[ut,t(e(Re),{"model-value":`${a.table.getState().pagination.pageSize}`,"onUpdate:modelValue":a.table.setPageSize},{default:s(()=>[t(e(De),{class:"h-8 w-[70px]"},{default:s(()=>[t(e(Me),{placeholder:`${a.table.getState().pagination.pageSize}`},null,8,["placeholder"])]),_:1}),t(e(Ie),{side:"top"},{default:s(()=>[(i(),m(b,null,D([10,20,30,40,50],r=>t(e(Fe),{key:r,value:`${r}`},{default:s(()=>[_(p(r),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1},8,["model-value","onUpdate:modelValue"])]),c("div",ft," Page "+p(a.table.getState().pagination.pageIndex+1)+" of "+p(a.table.getPageCount()),1),c("div",mt,[t(e(M),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!a.table.getCanPreviousPage(),onClick:o[0]||(o[0]=r=>a.table.setPageIndex(0))},{default:s(()=>[_t,t(l,{name:"fa-arrow-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),t(e(M),{variant:"outline",class:"h-8 w-8 p-0",disabled:!a.table.getCanPreviousPage(),onClick:o[1]||(o[1]=r=>a.table.previousPage())},{default:s(()=>[gt,t(l,{name:"fa-chevron-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),t(e(M),{variant:"outline",class:"h-8 w-8 p-0",disabled:!a.table.getCanNextPage(),onClick:o[2]||(o[2]=r=>a.table.nextPage())},{default:s(()=>[pt,t(l,{name:"fa-chevron-right",class:"h-4 w-4"})]),_:1},8,["disabled"]),t(e(M),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!a.table.getCanNextPage(),onClick:o[3]||(o[3]=r=>a.table.setPageIndex(a.table.getPageCount()-1))},{default:s(()=>[ht,t(l,{name:"fa-arrow-right",class:"h-4 w-4"})]),_:1},8,["disabled"])])])])}}}),wt=F({__name:"DataTableViewOptions",props:{table:{}},setup(n){const a=n,o=ne(()=>a.table.getAllColumns().filter(l=>typeof l.accessorFn<"u"&&l.getCanHide()));return(l,r)=>(i(),h(e(ye),null,{default:s(()=>[t(e(we),{"as-child":""},{default:s(()=>[t(e(M),{variant:"outline",size:"sm",class:"ml-auto hidden h-8 lg:flex"},{default:s(()=>[_(" View ")]),_:1})]),_:1}),t(e(be),{align:"end",class:"w-[150px]"},{default:s(()=>[t(e(tt),null,{default:s(()=>[_("Toggle columns")]),_:1}),t(e(ve)),(i(!0),m(b,null,D(o.value,d=>(i(),h(e(at),{key:d.id,class:"capitalize",checked:d.getIsVisible(),"onUpdate:checked":y=>d.toggleVisibility(!!y)},{default:s(()=>{var y;return[_(p(((y=d.columnDef.meta)==null?void 0:y.title)||d.id),1)]}),_:2},1032,["checked","onUpdate:checked"]))),128))]),_:1})]),_:1}))}}),bt=F({__name:"DataTableRefreshButton",setup(n){const a=Q("tableStore",O("transaction")),o=()=>{a.refresh(a.page_index)};return(l,r)=>{const d=A("VIcon");return i(),m("div",null,[t(e(M),{variant:"outline",size:"default",class:"flex h-8 ml-2",onClick:o},{default:s(()=>[t(d,{name:"md-refresh",class:"size-4"})]),_:1})])}}}),yt={class:"flex items-center justify-between"},$t={class:"flex flex-1 items-center space-x-2"},xt=F({__name:"DataTableToolbar",props:{table:{}},setup(n){const a=n,o=ne(()=>a.table.getState().columnFilters.length>0);return(l,r)=>{var d;return i(),m("div",yt,[c("div",$t,[t(e(Ve),{placeholder:"Search invoice...","model-value":((d=l.table.getColumn("invoice"))==null?void 0:d.getFilterValue())??"",class:"h-8 w-[150px] lg:w-[250px]",onInput:r[0]||(r[0]=y=>l.table.setGlobalFilter(y.target.value))},null,8,["model-value"]),o.value?(i(),h(e(M),{key:0,variant:"ghost",class:"h-8 px-2 lg:px-3",onClick:r[1]||(r[1]=y=>l.table.resetColumnFilters())},{default:s(()=>[_(" Reset ")]),_:1})):N("",!0)]),t(wt,{table:l.table},null,8,["table"]),t(bt)])}}}),St={class:"space-y-4 text-muted-foreground"},Ct={key:0,class:"text-center"},kt={key:1,class:"rounded-md border"},Vt=F({__name:"DataTable",props:{columns:{},data:{}},setup(n){const a=Q("tableStore",O("transaction")),o=n,l=x([]),r=x([]),d=x({}),y=x({pageIndex:a.page_index,pageSize:a.page_size}),C=x();function I(g,L){let $;typeof g=="function"?$=g(L.value):$=g,L.value=$,a.set_page_index($.pageIndex),a.set_page_size($.pageSize)}const v=Le({get data(){return o.data},get columns(){return o.columns},state:{get sorting(){return l.value},get columnFilters(){return r.value},get columnVisibility(){return d.value},get rowSelection(){return C.value},get pagination(){return y.value}},enableRowSelection:!0,onSortingChange:g=>Y(g,l),onPaginationChange:g=>I(g,y),onColumnFiltersChange:g=>Y(g,r),onColumnVisibilityChange:g=>Y(g,d),onRowSelectionChange:g=>Y(g,C),getCoreRowModel:Ue(),getFilteredRowModel:je(),getPaginationRowModel:Ae(),getSortedRowModel:He(),getFacetedRowModel:Ne(),getFacetedUniqueValues:Oe()});return Be(()=>{v.setPageIndex(a.page_index),v.setPageSize(a.page_size)}),(g,L)=>{const $=A("VIcon");return i(),m("div",St,[t(xt,{table:e(v)},null,8,["table"]),e(a).is_loading?(i(),m("div",Ct,[t($,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-10 h-10"})])):(i(),m("div",kt,[t(e(Te),{class:"text-xs"},{default:s(()=>[t(e(Pe),null,{default:s(()=>[(i(!0),m(b,null,D(e(v).getHeaderGroups(),k=>(i(),h(e(Z),{key:k.id},{default:s(()=>[(i(!0),m(b,null,D(k.headers,f=>(i(),h(e(Ye),{key:f.id},{default:s(()=>[f.isPlaceholder?N("",!0):(i(),h(e(re),{key:0,render:f.column.columnDef.header,props:f.getContext()},null,8,["render","props"]))]),_:2},1024))),128))]),_:2},1024))),128))]),_:1}),t(e(ze),{id:"dbTableBody"},{default:s(()=>{var k;return[(k=e(v).getRowModel().rows)!=null&&k.length?(i(!0),m(b,{key:0},D(e(v).getRowModel().rows,f=>(i(),h(e(Z),{key:f.id,"data-state":f.getIsSelected()&&"selected"},{default:s(()=>[(i(!0),m(b,null,D(f.getVisibleCells(),u=>(i(),h(e(ie),{key:u.id},{default:s(()=>[t(e(re),{render:u.column.columnDef.cell,props:u.getContext()},null,8,["render","props"])]),_:2},1024))),128))]),_:2},1032,["data-state"]))),128)):(i(),h(e(Z),{key:1},{default:s(()=>[t(e(ie),{colspan:g.columns.length,class:"h-24 text-center"},{default:s(()=>[_(" No results. ")]),_:1},8,["colspan"])]),_:1}))]}),_:1})]),_:1})])),t(vt,{table:e(v)},null,8,["table"])])}}}),Dt={class:"flex sm:flex-row sm gap-4 flex-col w-full"},Mt="/api/transaction/card",It=F({__name:"DashboardCard",setup(n){const a=oe({scheduled_reminders:0,active_debts:0,active_debts_amount:"0.00",settled_debts_amount:"0.00"}),o=async()=>{const l=await se.get(Mt);Object.assign(a,l.data.Result)};return $e(()=>{o()}),(l,r)=>(i(),m("div",Dt,[t(e(W),{class:"w-full md:w-1/3"},{default:s(()=>[t(e(E),null,{default:s(()=>[t(e(q),null,{default:s(()=>[_(p(a.scheduled_reminders),1)]),_:1}),t(e(G),null,{default:s(()=>[_("Scheduled Reminder(s)")]),_:1})]),_:1})]),_:1}),t(e(W),{class:"w-full md:w-1/3"},{default:s(()=>[t(e(E),null,{default:s(()=>[t(e(q),null,{default:s(()=>[_(p(a.active_debts),1)]),_:1}),t(e(G),null,{default:s(()=>[_("Active Debt(s)")]),_:1})]),_:1})]),_:1}),t(e(W),{class:"w-full md:w-1/3"},{default:s(()=>[t(e(E),null,{default:s(()=>[t(e(q),null,{default:s(()=>[_("RM "+p(a.active_debts_amount),1)]),_:1}),t(e(G),null,{default:s(()=>[_("Active Debt Amount")]),_:1})]),_:1})]),_:1}),t(e(W),{class:"w-full md:w-1/3"},{default:s(()=>[t(e(E),null,{default:s(()=>[t(e(q),null,{default:s(()=>[_("RM "+p(a.settled_debts_amount),1)]),_:1}),t(e(G),null,{default:s(()=>[_("Settled Debt")]),_:1})]),_:1})]),_:1})]))}}),Rt={class:"flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"},Ft={class:"flex flex-col gap-4"},Lt={class:"flex items-center justify-between"},Pt={class:"flex flex-col gap-4"},zt={class:"flex items-center justify-between"},Tt=F({__name:"DateRangeFilter",setup(n){const a=Q("tableStore",O("dashboard")),o=new le(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()),l=x({start:new le(2024,5,20).subtract({months:3}),end:o}),r=oe({date:l.value}),{toast:d}=xe(),y=()=>{a.set_filter(r),a.refresh(a.page_index)};new Ke("en-US",{dateStyle:"medium"}),ee(()=>r.date,f=>{f.end&&(y(),d({title:"Transaction dashboard refreshed",variant:"success"}))},{deep:!0});const C=x("en-US"),I=Ee(C.value),v=x(l.value.start),g=x(l.value.end),L=x(B({dateObj:v.value,locale:C.value,fixedWeeks:!0,weekStartsOn:0})),$=x(B({dateObj:g.value,locale:C.value,fixedWeeks:!0,weekStartsOn:0}));function k(f,u){f==="first"?v.value=v.value.add({months:u}):g.value=g.value.add({months:u})}return ee(v,f=>{L.value=B({dateObj:f,weekStartsOn:0,fixedWeeks:!1,locale:C.value}),ce(g.value,f)&&(g.value=g.value.add({months:1}))}),ee(g,f=>{$.value=B({dateObj:f,weekStartsOn:0,fixedWeeks:!1,locale:C.value}),ce(f,v.value)&&(v.value=v.value.subtract({months:1}))}),(f,u)=>{const P=A("VIcon");return i(),h(e(ke),null,{default:s(()=>[t(e(Se),{"as-child":""},{default:s(()=>[t(e(M),{variant:"outline",class:z(e(T)("w-max-fit justify-start text-left font-normal",!l.value&&"text-muted-foreground"))},{default:s(()=>[t(P,{name:"bi-calendar-fill",class:"mr-2 h-4 w-4"}),l.value.start?(i(),m(b,{key:0},[l.value.end?(i(),m(b,{key:0},[_(p(e(I).custom(e(H)(l.value.start),{dateStyle:"medium"}))+" - "+p(e(I).custom(e(H)(l.value.end),{dateStyle:"medium"})),1)],64)):(i(),m(b,{key:1},[_(p(e(I).custom(e(H)(l.value.start),{dateStyle:"medium"})),1)],64))],64)):(i(),m(b,{key:1},[_(" Pick a date ")],64))]),_:1},8,["class"])]),_:1}),t(e(Ce),{class:"w-auto p-0",align:"end"},{default:s(()=>[t(e(Ge),{modelValue:r.date,"onUpdate:modelValue":u[4]||(u[4]=V=>r.date=V),placeholder:v.value,"onUpdate:placeholder":u[5]||(u[5]=V=>v.value=V),class:"p-3"},{default:s(({weekDays:V})=>[c("div",Rt,[c("div",Ft,[c("div",Lt,[c("button",{class:z(e(T)(e(K)({variant:"outline"}),"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")),onClick:u[0]||(u[0]=S=>k("first",-1))},[t(P,{name:"fa-chevron-left",class:"size-4"})],2),c("div",{class:z(e(T)("text-sm font-medium"))},p(e(I).fullMonthAndYear(e(H)(L.value.value))),3),c("button",{class:z(e(T)(e(K)({variant:"outline"}),"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")),onClick:u[1]||(u[1]=S=>k("first",1))},[t(P,{name:"fa-chevron-right",class:"size-4"})],2)]),t(e(ue),null,{default:s(()=>[t(e(fe),null,{default:s(()=>[t(e(J),null,{default:s(()=>[(i(!0),m(b,null,D(V,S=>(i(),h(e(_e),{key:S,class:"w-full"},{default:s(()=>[_(p(S),1)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024),t(e(me),null,{default:s(()=>[(i(!0),m(b,null,D(L.value.rows,(S,X)=>(i(),h(e(J),{key:`weekDate-${X}`,class:"mt-2 w-full"},{default:s(()=>[(i(!0),m(b,null,D(S,U=>(i(),h(e(ge),{key:U.toString(),date:U},{default:s(()=>[t(e(pe),{day:U,month:L.value.value},null,8,["day","month"])]),_:2},1032,["date"]))),128))]),_:2},1024))),128))]),_:1})]),_:2},1024)]),c("div",Pt,[c("div",zt,[c("button",{class:z(e(T)(e(K)({variant:"outline"}),"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")),onClick:u[2]||(u[2]=S=>k("second",-1))},[t(P,{name:"fa-chevron-left",class:"size-4"})],2),c("div",{class:z(e(T)("text-sm font-medium"))},p(e(I).fullMonthAndYear(e(H)($.value.value))),3),c("button",{class:z(e(T)(e(K)({variant:"outline"}),"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")),onClick:u[3]||(u[3]=S=>k("second",1))},[t(P,{name:"fa-chevron-right",class:"size-4"})],2)]),t(e(ue),null,{default:s(()=>[t(e(fe),null,{default:s(()=>[t(e(J),null,{default:s(()=>[(i(!0),m(b,null,D(V,S=>(i(),h(e(_e),{key:S,class:"w-full"},{default:s(()=>[_(p(S),1)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024),t(e(me),null,{default:s(()=>[(i(!0),m(b,null,D($.value.rows,(S,X)=>(i(),h(e(J),{key:`weekDate-${X}`,class:"mt-2 w-full"},{default:s(()=>[(i(!0),m(b,null,D(S,U=>(i(),h(e(ge),{key:U.toString(),date:U},{default:s(()=>[t(e(pe),{day:U,month:$.value.value},null,8,["day","month"])]),_:2},1032,["date"]))),128))]),_:2},1024))),128))]),_:1})]),_:2},1024)])])]),_:1},8,["modelValue","placeholder"])]),_:1})]),_:1})}}}),j=F({__name:"DataTableColumnHeader",props:{column:{},title:{}},setup(n){return(a,o)=>{const l=A("VIcon");return a.column.getCanSort()?(i(),m("div",{key:0,class:z(e(T)("flex items-center space-x-2",a.$attrs.class??""))},[t(e(ye),null,{default:s(()=>[t(e(we),{"as-child":""},{default:s(()=>[t(e(M),{variant:"ghost",size:"sm",class:"-ml-3 h-8 data-[state=open]:bg-accent"},{default:s(()=>[c("span",null,p(a.title),1),a.column.getIsSorted()==="desc"?(i(),h(l,{key:0,name:"fa-arrow-down",class:"ml-2 h-4 w-4"})):a.column.getIsSorted()==="asc"?(i(),h(l,{key:1,name:"fa-arrow-up",class:"ml-2 h-4 w-4"})):(i(),h(l,{key:2,name:"fa-sort",class:"ml-2 h-4 w-4"}))]),_:1})]),_:1}),t(e(be),{align:"start"},{default:s(()=>[t(e(te),{onClick:o[0]||(o[0]=r=>a.column.toggleSorting(!1))},{default:s(()=>[t(l,{name:"fa-arrow-up",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),_(" Asc ")]),_:1}),t(e(te),{onClick:o[1]||(o[1]=r=>a.column.toggleSorting(!0))},{default:s(()=>[t(l,{name:"fa-arrow-down",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),_(" Desc ")]),_:1}),t(e(ve)),t(e(te),{onClick:o[2]||(o[2]=r=>a.column.toggleVisibility(!1))},{default:s(()=>[t(l,{name:"fa-regular-eye-slash",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),_(" Hide ")]),_:1})]),_:1})]),_:1})],2)):(i(),m("div",{key:1,class:z(a.$attrs.class)},p(a.title),3))}}}),Ut=R.object({id:R.number(),invoice:R.string(),customer_name:R.string().min(2).max(50),event_display:R.string(),scheduled_date:R.preprocess(n=>typeof n=="string"?new Date(n):n,R.date()),status:R.string(),additional_info:R.string(),change_info:R.string().nullable(),editable:R.boolean()}),jt={class:"grid gap-4 py-4"},At={class:"grid grid-cols-4 items-center gap-4"},Ht={class:"grid grid-cols-4 items-center gap-4"},Nt={class:"col-span-3"},Ot={key:0,class:"grid grid-cols-4 items-center gap-4"},Yt=F({__name:"DataTableEditScheduleModal",props:{row:{}},setup(n){const a=Q("tableStore",O("transaction")),o=n,l=oe({id:o.row.id,invoice:o.row.invoice,scheduled_date:null}),r=x(!1),d=x(!1),y=x(null),{toast:C}=xe(),I=st(new Date,1),v=new le(I.getFullYear(),I.getMonth()+1,I.getDate());async function g(){try{const f=await se.get(`/api/transaction/${o.row.id}/scheduled_date`);if(Object.assign(l,f.data.Result),f.data.Result.scheduled_date){const u=ot(f.data.Result.scheduled_date);l.scheduled_date=he(u,"yyyy-MM-dd")}else l.scheduled_date=null;console.log(l.scheduled_date)}catch{C({title:"Whoops, something went wrong",description:"There was an error in initialising the form",variant:"destructive"})}finally{r.value=!1}}async function L(){r.value=!0;try{const f=await se.patch(`/api/transaction/${o.row.id}/scheduled_date`,{...l},{headers:{"Content-Type":"multipart/form-data"}});$(),await a.refresh(a.page_index),C({title:f.data.Result,variant:"success"})}catch{C({title:"Whoops, something went wrong",description:"An unexpected error occurred.",variant:"destructive"})}finally{r.value=!1}}function $(){d.value=!d.value,d.value&&g()}function k(f){const u=new Date(f);l.scheduled_date=he(u,"yyyy-MM-dd")}return(f,u)=>{const P=A("VIcon");return i(),m("div",null,[c("div",null,[t(e(M),{variant:"default",size:"sm",class:"h-8 lg:flex",onClick:$},{default:s(()=>[t(P,{name:"fa-pen",class:"size-4"})]),_:1})]),t(e(Xe),{open:d.value,"onUpdate:open":u[2]||(u[2]=V=>d.value=V)},{default:s(()=>[t(e(We),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:s(()=>[t(e(qe),null,{default:s(()=>[t(e(Je),null,{default:s(()=>[_("Reschedule Reminder")]),_:1})]),_:1}),c("div",jt,[c("div",At,[t(e(ae),{for:"invoice",class:"text-right"},{default:s(()=>[_(" Invoice ")]),_:1}),t(e(Ve),{id:"invoice",modelValue:l.invoice,"onUpdate:modelValue":u[0]||(u[0]=V=>l.invoice=V),class:"col-span-3",disabled:""},null,8,["modelValue"])]),c("div",Ht,[t(e(ae),{for:"email",class:"text-right"},{default:s(()=>[_(" Schedule Date ")]),_:1}),c("div",Nt,[t(e(ke),null,{default:s(()=>[t(e(Se),{"as-child":""},{default:s(()=>[t(e(M),{variant:"outline",class:z(e(T)("w-full justify-start text-left font-normal",!l.scheduled_date&&"text-muted-foreground"))},{default:s(()=>[t(P,{name:"bi-calendar-fill",class:"mr-2 size-4"}),c("span",null,p(l.scheduled_date??"Select a date"),1)]),_:1},8,["class"])]),_:1}),t(e(Ce),{class:"w-auto p-0"},{default:s(()=>[t(e(nt),{mode:"date","min-value":e(v),"onUpdate:modelValue":u[1]||(u[1]=V=>k(V)),masks:{L:"YYYY-MM-DD"},modelConfig:{type:"string",mask:"YYYY/MM/DD"},"is-required":""},null,8,["min-value"])]),_:1})]),_:1})])])]),t(Qe),y.value?(i(),m("div",Ot,[t(e(ae),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:s(()=>[t(P,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),_(" "+p(y.value),1)]),_:1})])):N("",!0),t(e(lt),{class:"flex justify-end"},{default:s(()=>[t(e(M),{type:"submit",onClick:L,disabled:r.value},{default:s(()=>[r.value?(i(),h(P,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):N("",!0),_(" Edit")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),Bt={class:"flex gap-1"},Kt=F({__name:"DataTableRowActions",props:{row:{}},setup(n){const a=n,o=ne(()=>Ut.parse(a.row.original));return(l,r)=>(i(),m("div",Bt,[o.value.editable?(i(),h(Yt,{key:0,row:o.value},null,8,["row"])):N("",!0)]))}}),Et=[{id:"select",header:({table:n})=>w(de,{checked:n.getIsAllPageRowsSelected()||n.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":a=>n.toggleAllPageRowsSelected(!!a),ariaLabel:"Select all",class:"translate-y-0.5"}),cell:({row:n})=>w(de,{checked:n.getIsSelected(),"onUpdate:checked":a=>n.toggleSelected(!!a),ariaLabel:"Select row",class:"translate-y-0.5"}),enableSorting:!1,enableHiding:!1,meta:{title:"Select"}},{accessorKey:"invoice",header:({column:n})=>w(j,{column:n,title:"Invoice"}),cell:({row:n})=>w("div",{class:"w-20"},n.getValue("invoice")),enableSorting:!0,enableHiding:!0,filterFn:(n,a,o)=>{var d;const l=((d=n.getValue(a))==null?void 0:d.toString().toLowerCase())??"",r=o==null?void 0:o.toString().toLowerCase();return l.includes(r)},meta:{title:"Invoice"}},{accessorKey:"customer_name",header:({column:n})=>w(j,{column:n,title:"Customer"}),cell:({row:n})=>w("div",{class:"w-fit"},n.getValue("customer_name")),enableSorting:!0,enableHiding:!0,enableColumnFilter:!0,filterFn:(n,a,o)=>{var d;const l=((d=n.getValue(a))==null?void 0:d.toString().toLowerCase())??"",r=o==null?void 0:o.toString().toLowerCase();return l.includes(r)},meta:{title:"Customer"}},{accessorKey:"event_display",header:({column:n})=>w(j,{column:n,title:"Event Type"}),cell:({row:n})=>w("div",{class:"w-fit"},n.getValue("event_display")),enableSorting:!0,enableHiding:!0,enableColumnFilter:!0,filterFn:(n,a,o)=>{var d;const l=((d=n.getValue(a))==null?void 0:d.toString().toLowerCase())??"",r=o==null?void 0:o.toString().toLowerCase();return l.includes(r)},meta:{title:"Event Type"}},{accessorKey:"scheduled_date",header:({column:n})=>w(j,{column:n,title:n.columnDef.meta.title}),cell:({row:n})=>{const a=n.getValue("scheduled_date");let o="";if(a){const l=new Date(Date.parse(a));isNaN(l.getTime())?o="Not Provided":o=l.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}else o="Not provided";return w("div",{class:`w-fit ${o!="Not Provided"?"":"text-red-600 font-bold"}`},o)},enableSorting:!0,enableHiding:!0,meta:{title:"Scheduled Date"}},{accessorKey:"status",header:({column:n})=>w(j,{column:n,title:"Status"}),cell:({row:n})=>w("div",{class:"w-fit"},n.getValue("status")),enableSorting:!0,enableHiding:!0,filterFn:(n,a,o)=>{var d;const l=((d=n.getValue(a))==null?void 0:d.toString().toLowerCase())||"",r=o==null?void 0:o.toString().toLowerCase();return l.includes(r)},meta:{title:"Status"}},{accessorKey:"additional_info",header:({column:n})=>w(j,{column:n,title:"Additional Info"}),cell:({row:n})=>w("div",{class:"w-fit"},n.getValue("additional_info")),enableSorting:!0,enableHiding:!0,filterFn:(n,a,o)=>{var d;const l=((d=n.getValue(a))==null?void 0:d.toString().toLowerCase())||"",r=o==null?void 0:o.toString().toLowerCase();return l.includes(r)},meta:{title:"Additional Info"}},{accessorKey:"change_info",header:({column:n})=>w(j,{column:n,title:"Change Info"}),cell:({row:n})=>w("div",{class:"w-44"},n.getValue("change_info")),enableSorting:!0,enableHiding:!0,filterFn:(n,a,o)=>{var d;const l=((d=n.getValue(a))==null?void 0:d.toString().toLowerCase())||"",r=o==null?void 0:o.toString().toLowerCase();return l.includes(r)},meta:{title:"Change Info"}},{id:"actions",cell:({row:n})=>w(Kt,{row:n})}],Gt={class:"p-4 md:p-8 space-y-8 h-full"},Wt={class:"flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between space-y-2"},qt=c("div",null,[c("h2",{class:"text-2xl font-bold tracking-tight"},"Dashboard")],-1),Jt="/api/transaction",ca=F({__name:"Dashboard",setup(n){const a=O("dashboard"),o=l=>({id:l.id,invoice:l.invoice,customer_name:l.customer_name,event_display:l.event_display,scheduled_date:l.scheduled_date,status:l.status_display,additional_info:l.additional_info,change_info:l.change_info,editable:l.editable});return $e(async()=>{await a.fetch(Jt,0,o)}),et("tableStore",a),Ze(()=>{a.$reset()}),(l,r)=>(i(),m("div",Gt,[c("div",Wt,[qt,t(Tt)]),t(It),t(Vt,{data:e(a).tasks,columns:e(Et)},null,8,["data","columns"])]))}});export{ca as default};
