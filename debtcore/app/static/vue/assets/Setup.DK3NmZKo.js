import{_ as $e,a as Ve,b as Ce,c as Se,d as Ie,u as W,f as Pe,g as De,h as Ue,i as pe,j as se,k as Re,l as Te,m as Me,n as Fe,o as je,p as ze,q as Ae,r as Be,F as me,e as Le,z as A,s as Y}from"./Checkbox.vue_vue_type_script_setup_true_lang.0dpU0WqK.js";import{e as F,aD as Ne,aE as We,u as t,o as c,c as w,aF as Ee,n as X,g as de,r as B,d as n,t as U,a as e,k as s,F as L,v as N,s as V,b as r,x as ce,B as H,i as I,C as Xe,l as y,D as G,m as R,y as He,z as qe,T as le,A as Ge,E as j,I as E,H as M,W as O,X as J,a3 as Q,_ as C,Y as K,R as ne,N as oe,Q as ie,a4 as _e,a5 as fe,a6 as ge,a8 as re,a7 as he,a9 as ve,Z,a0 as T,K as Ye,aB as be,aC as ye,G as Ke,a1 as Oe,a2 as Je}from"../main.js";import{u as Qe,_ as z}from"./Input.vue_vue_type_script_setup_true_lang.-kCyUBhQ.js";import{p as Ze}from"./index.DeXtphQp.js";import{_ as ee}from"./DialogScrollContent.vue_vue_type_script_setup_true_lang.G3qJvuAl.js";import{_ as te}from"./DialogFooter.vue_vue_type_script_setup_true_lang.CUbi7heN.js";import{_ as et}from"./lodash.BtnTHUG3.js";import{_ as tt}from"./index.DhdF1qMN.js";import{_ as at}from"./CalendarPrevButton.vue_vue_type_script_setup_true_lang.Dvo5YOt3.js";import{f as st}from"./index.BccI3ZLR.js";import{_ as we}from"./_plugin-vue_export-helper.DlAUqK2U.js";import"./index.5qndC0qu.js";const ue=F({__name:"Textarea",props:{class:{},defaultValue:{},modelValue:{}},emits:["update:modelValue"],setup(i,{emit:a}){const l=i,d=Qe(l,"modelValue",a,{passive:!0,defaultValue:l.defaultValue});return(p,b)=>Ne((c(),w("textarea",{"onUpdate:modelValue":b[0]||(b[0]=$=>Ee(d)?d.value=$:null),class:X(t(de)("flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",l.class))},null,2)),[[We,t(d)]])}}),lt={class:"flex flex-col md:flex-row items-center justify-between px-2 pb-10"},nt={class:"flex-1 text-sm text-muted-foreground mb-4 md:mb-0"},ot={class:"flex items-center space-x-6 lg:space-x-8 text-primary"},it={class:"flex items-center space-x-2"},rt=n("p",{class:"text-sm font-medium"},"Rows per page",-1),dt={class:"flex w-[100px] items-center justify-center text-sm font-medium"},ct={class:"flex items-center space-x-2"},ut=n("span",{class:"sr-only"},"Go to first page",-1),pt=n("span",{class:"sr-only"},"Go to previous page",-1),mt=n("span",{class:"sr-only"},"Go to next page",-1),_t=n("span",{class:"sr-only"},"Go to last page",-1),ft=F({__name:"DataTablePagination",props:{table:{}},setup(i){return(a,l)=>{const o=B("VIcon");return c(),w("div",lt,[n("div",nt,U(a.table.getFilteredSelectedRowModel().rows.length)+" of "+U(a.table.getFilteredRowModel().rows.length)+" row(s) selected. ",1),n("div",ot,[n("div",it,[rt,e(t(Se),{"model-value":`${a.table.getState().pagination.pageSize}`,"onUpdate:modelValue":a.table.setPageSize},{default:s(()=>[e(t($e),{class:"h-8 w-[70px]"},{default:s(()=>[e(t(Ve),{placeholder:`${a.table.getState().pagination.pageSize}`},null,8,["placeholder"])]),_:1}),e(t(Ce),{side:"top"},{default:s(()=>[(c(),w(L,null,N([10,20,30,40,50],d=>e(t(Ie),{key:d,value:`${d}`},{default:s(()=>[r(U(d),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1},8,["model-value","onUpdate:modelValue"])]),n("div",dt," Page "+U(a.table.getState().pagination.pageIndex+1)+" of "+U(a.table.getPageCount()),1),n("div",ct,[e(t(V),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!a.table.getCanPreviousPage(),onClick:l[0]||(l[0]=d=>a.table.setPageIndex(0))},{default:s(()=>[ut,e(o,{name:"fa-arrow-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),e(t(V),{variant:"outline",class:"h-8 w-8 p-0",disabled:!a.table.getCanPreviousPage(),onClick:l[1]||(l[1]=d=>a.table.previousPage())},{default:s(()=>[pt,e(o,{name:"fa-chevron-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),e(t(V),{variant:"outline",class:"h-8 w-8 p-0",disabled:!a.table.getCanNextPage(),onClick:l[2]||(l[2]=d=>a.table.nextPage())},{default:s(()=>[mt,e(o,{name:"fa-chevron-right",class:"h-4 w-4"})]),_:1},8,["disabled"]),e(t(V),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!a.table.getCanNextPage(),onClick:l[3]||(l[3]=d=>a.table.setPageIndex(a.table.getPageCount()-1))},{default:s(()=>[_t,e(o,{name:"fa-arrow-right",class:"h-4 w-4"})]),_:1},8,["disabled"])])])])}}}),gt={class:"flex items-center justify-between"},ht={class:"flex flex-1 items-center space-x-2"},vt=F({__name:"DataTableToolbar",props:{table:{}},setup(i){const a=i;return ce(()=>a.table.getState().columnFilters.length>0),(l,o)=>{var d;return c(),w("div",gt,[n("div",ht,[e(t(z),{placeholder:"Search...","model-value":((d=l.table.getColumn("verified_name"))==null?void 0:d.getFilterValue())??"",class:"h-8 w-[150px] lg:w-[250px]",onInput:o[0]||(o[0]=p=>l.table.setGlobalFilter(p.target.value))},null,8,["model-value"])])])}}}),bt={class:"space-y-4 text-muted-foreground"},yt={class:"rounded-md border"},wt=F({__name:"DataTable",props:{columns:{},data:{}},setup(i){const a=H("phoneStore",W("phone")),l=i,o=I([]),d=I([]),p=I({}),b=I({pageIndex:a.page_index,pageSize:a.page_size}),$=I();function x(m,h){let g;typeof m=="function"?g=m(h.value):g=m,h.value=g,a.set_page_index(g.pageIndex),a.set_page_size(g.pageSize)}const k=Pe({get data(){return l.data},get columns(){return l.columns},state:{get sorting(){return o.value},get columnFilters(){return d.value},get columnVisibility(){return p.value},get rowSelection(){return $.value},get pagination(){return b.value}},enableRowSelection:!0,onSortingChange:m=>G(m,o),onPaginationChange:m=>x(m,b),onColumnFiltersChange:m=>G(m,d),onColumnVisibilityChange:m=>G(m,p),onRowSelectionChange:m=>G(m,$),getCoreRowModel:Te(),getFilteredRowModel:Me(),getPaginationRowModel:Fe(),getSortedRowModel:je(),getFacetedRowModel:ze(),getFacetedUniqueValues:Ae()});return Xe(()=>{k.setPageIndex(a.page_index),k.setPageSize(a.page_size)}),(m,h)=>(c(),w("div",bt,[e(vt,{table:t(k)},null,8,["table"]),n("div",yt,[e(t(Re),null,{default:s(()=>[e(t(De),null,{default:s(()=>[(c(!0),w(L,null,N(t(k).getHeaderGroups(),g=>(c(),y(t(se),{key:g.id},{default:s(()=>[(c(!0),w(L,null,N(g.headers,S=>(c(),y(t(Be),{key:S.id},{default:s(()=>[S.isPlaceholder?R("",!0):(c(),y(t(me),{key:0,render:S.column.columnDef.header,props:S.getContext()},null,8,["render","props"]))]),_:2},1024))),128))]),_:2},1024))),128))]),_:1}),e(t(Ue),{id:"dbTableBody"},{default:s(()=>{var g;return[(g=t(k).getRowModel().rows)!=null&&g.length?(c(!0),w(L,{key:0},N(t(k).getRowModel().rows,S=>(c(),y(t(se),{key:S.id,"data-state":S.getIsSelected()&&"selected"},{default:s(()=>[(c(!0),w(L,null,N(S.getVisibleCells(),P=>(c(),y(t(pe),{key:P.id},{default:s(()=>[e(t(me),{render:P.column.columnDef.cell,props:P.getContext()},null,8,["render","props"])]),_:2},1024))),128))]),_:2},1032,["data-state"]))),128)):(c(),y(t(se),{key:1},{default:s(()=>[e(t(pe),{colspan:m.columns.length,class:"h-24 text-center"},{default:s(()=>[r(" No results. ")]),_:1},8,["colspan"])]),_:1}))]}),_:1})]),_:1})]),e(ft,{table:t(k)},null,8,["table"])]))}}),q=F({__name:"DataTableColumnHeader",props:{column:{},title:{}},setup(i){return(a,l)=>{const o=B("VIcon");return a.column.getCanSort()?(c(),w("div",{key:0,class:X(t(de)("flex items-center space-x-2",a.$attrs.class??""))},[e(t(Ge),null,{default:s(()=>[e(t(He),{"as-child":""},{default:s(()=>[e(t(V),{variant:"ghost",size:"sm",class:"-ml-3 h-8 data-[state=open]:bg-accent"},{default:s(()=>[n("span",null,U(a.title),1),a.column.getIsSorted()==="desc"?(c(),y(o,{key:0,name:"fa-arrow-down",class:"ml-2 h-4 w-4"})):a.column.getIsSorted()==="asc"?(c(),y(o,{key:1,name:"fa-arrow-up",class:"ml-2 h-4 w-4"})):(c(),y(o,{key:2,name:"fa-sort",class:"ml-2 h-4 w-4"}))]),_:1})]),_:1}),e(t(qe),{align:"start"},{default:s(()=>[e(t(le),{onClick:l[0]||(l[0]=d=>a.column.toggleSorting(!1))},{default:s(()=>[e(o,{name:"fa-arrow-up",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),r(" Asc ")]),_:1}),e(t(le),{onClick:l[1]||(l[1]=d=>a.column.toggleSorting(!0))},{default:s(()=>[e(o,{name:"fa-arrow-down",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),r(" Desc ")]),_:1}),e(t(Le)),e(t(le),{onClick:l[2]||(l[2]=d=>a.column.toggleVisibility(!1))},{default:s(()=>[e(o,{name:"fa-regular-eye-slash",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),r(" Hide ")]),_:1})]),_:1})]),_:1})],2)):(c(),w("div",{key:1,class:X(a.$attrs.class)},U(a.title),3))}}}),kt=A.object({id:A.number(),phone_number_id:A.string(),verified_name:A.string(),quality_rating:A.string(),platform_type:A.string(),last_onboarded_time:A.preprocess(i=>{if(typeof i=="string")try{return Ze(i)}catch{return new Date(i)}return i},A.date()),display_phone_number:A.string(),is_default_phone:A.boolean()}),xt=F({__name:"DataTableSetDefaultPhone",props:{row:{}},setup(i){const a=H("phoneStore",W("phone")),o=j({id:i.row.id}),d=I(!1),{toast:p}=E(),b=async()=>{d.value=!0;try{const x=await M.post("/api/setup/phone/setdefault",{...o});await a.refresh(a.page_index),p({title:x.data.message,variant:"success"})}catch(x){var $=x.response.data.message||"";p({title:"Whoops, something went wrong",description:$,variant:"destructive"})}finally{d.value=!1}};return($,x)=>{const k=B("VIcon");return c(),w("div",null,[e(t(V),{variant:"default",size:"sm",class:"p-2 px-3",onClick:b,disabled:d.value},{default:s(()=>[d.value?(c(),y(k,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),r(" Set Default ")]),_:1},8,["disabled"])])}}}),$t={class:"grid gap-4 py-4"},Vt={class:"flex justify-center"},Ct=["src"],St={class:"grid grid-cols-4 items-center"},It={class:"col-span-3"},Pt=n("p",{class:"col-start-2 col-span-3 text-sm text-gray-500 dark:text-gray-300"},[r(" Recommended Type: 640px x 640px "),n("b",null,"JPG/JPEG"),r(" (MAX. 5MB) ")],-1),Dt={class:"grid grid-cols-4 items-center gap-4"},Ut={class:"grid grid-cols-4 items-center gap-4"},Rt={class:"grid grid-cols-4 items-center gap-4"},Tt={class:"grid grid-cols-4 items-center gap-4"},Mt={class:"grid grid-cols-4 items-center gap-4"},Ft={class:"flex gap-2 col-span-3"},jt={class:"grid grid-cols-4 items-center gap-4"},zt={class:"col-span-3"},At={key:0,class:"grid grid-cols-4 items-center gap-4"},Bt=F({__name:"DataTableUpdateWhatsappProfile",props:{row:{}},setup(i){H("phoneStore",W("phone"));const l=j({phone_number_id:i.row.phone_number_id,image_url:"",about:"",address:"",description:"",email:"",vertical:"",website1:"",website2:"",new_image:null}),o=j({is_loading:!1,is_open:!1,data:[{value:"",label:""}]});async function d(){o.is_loading=!0;try{var D="/api/setup/whatsapp_business/category/list";const _=await M.get(D,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});o.data=_.data.Result}catch(_){var u=_.response.data.message||"";x({title:"Whoops, something went wrong",description:u,variant:"destructive"})}finally{o.is_loading=!1}}const p=I(!1),b=I(!1),$=I(null),{toast:x}=E();async function k(){try{const u=await M.get(`/api/setup/whatsapp-profile/${l.phone_number_id}`);console.log(u.data.Result),Object.assign(l,u.data.Result)}catch(u){var D=u.response.data.message||"";x({title:"Whoops, something went wrong",description:D,variant:"destructive"})}finally{p.value=!1}}const m=ce(()=>l.new_image?URL.createObjectURL(l.new_image):l.image_url);async function h(){p.value=!0;try{const D=await M.patch(`/api/setup/whatsapp-profile/${l.phone_number_id}`,{...l},{headers:{"Content-Type":"multipart/form-data"}});g(),x({title:D.data.Result,variant:"success"})}catch{x({title:"Whoops, something went wrong",description:"An unexpected error occurred.",variant:"destructive"})}finally{p.value=!1}}function g(){b.value=!b.value,b.value&&(k(),d())}function S(D){l.vertical=D.id,o.is_open=!1}const P=D=>{var _;const u=D.target;if((_=u.files)!=null&&_.length){const f=u.files[0];if(f.size>5*1024*1024){x({title:"The file size must be under 5MB",variant:"destructive"}),u.value="";return}l.new_image=f}};return(D,u)=>{const _=B("VIcon");return c(),w("div",null,[n("div",null,[e(t(V),{variant:"default",size:"sm",class:"p-2 px-3",onClick:g},{default:s(()=>[r(" Profile ")]),_:1})]),e(t(Z),{open:b.value,"onUpdate:open":u[7]||(u[7]=f=>b.value=f)},{default:s(()=>[e(t(ee),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:s(()=>[e(t(O),null,{default:s(()=>[e(t(J),null,{default:s(()=>[r("Whatsapp Profile")]),_:1}),e(t(Q),null,{default:s(()=>[r(" Insert the details of the debt here. Click edit when you're done. ")]),_:1})]),_:1}),n("div",$t,[n("div",Vt,[n("img",{id:"picture",src:m.value,class:"mx-auto size-48 mb-4 h-full"},null,8,Ct)]),n("div",St,[e(t(C),{for:"profile_picture",class:"mr-4 text-right"},{default:s(()=>[r(" Profile Picture ")]),_:1}),n("div",It,[e(t(z),{id:"profile_picture",type:"file",onChange:P,class:"col-span-3"})]),Pt]),e(K),n("div",Dt,[e(t(C),{for:"about",class:"text-right"},{default:s(()=>[r(" About ")]),_:1}),e(t(z),{id:"about",modelValue:l.about,"onUpdate:modelValue":u[0]||(u[0]=f=>l.about=f),placeholder:"Lot 1919, Taman Bandar Puteri, 5000 Selangor.",class:"col-span-3"},null,8,["modelValue"])]),n("div",Ut,[e(t(C),{for:"address",class:"text-right"},{default:s(()=>[r(" Address ")]),_:1}),e(t(z),{id:"address",modelValue:l.address,"onUpdate:modelValue":u[1]||(u[1]=f=>l.address=f),placeholder:"Lot 1111, Tmana Mawar Baiduri, 5000 Selangor",class:"col-span-3"},null,8,["modelValue"])]),n("div",Rt,[e(t(C),{for:"description",class:"text-right"},{default:s(()=>[r(" Description ")]),_:1}),e(ue,{id:"description",modelValue:l.description,"onUpdate:modelValue":u[2]||(u[2]=f=>l.description=f),placeholder:"Description...",class:"col-span-3"},null,8,["modelValue"])]),n("div",Tt,[e(t(C),{for:"email",class:"text-right"},{default:s(()=>[r(" Email ")]),_:1}),e(t(z),{id:"email",modelValue:l.email,"onUpdate:modelValue":u[3]||(u[3]=f=>l.email=f),placeholder:"hello@gmail.com",class:"col-span-3"},null,8,["modelValue"])]),n("div",Mt,[e(t(C),{for:"websites",class:"text-right"},{default:s(()=>[r(" Websites ")]),_:1}),n("div",Ft,[e(t(z),{id:"website",modelValue:l.website1,"onUpdate:modelValue":u[4]||(u[4]=f=>l.website1=f),placeholder:"https://facebook.com",class:"w-1/2"},null,8,["modelValue"]),e(t(z),{id:"website",modelValue:l.website2,"onUpdate:modelValue":u[5]||(u[5]=f=>l.website2=f),placeholder:"https://kckok.my",class:"w-1/2"},null,8,["modelValue"])])]),n("div",jt,[e(t(C),{for:"customer",class:"text-right leading-normal"},{default:s(()=>[r(" Category ")]),_:1}),n("div",zt,[e(t(ne),{open:o.is_open,"onUpdate:open":u[6]||(u[6]=f=>o.is_open=f)},{default:s(()=>[e(t(oe),{"as-child":""},{default:s(()=>[e(t(V),{variant:"outline",role:"combobox","aria-expanded":o.is_open,class:"w-full justify-between px-3",disabled:o.is_loading},{default:s(()=>{var f;return[r(U(l.vertical?(f=o.data.find(v=>v.id===l.vertical))==null?void 0:f.label:"Select Category")+" ",1),o.is_loading?(c(),y(_,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(c(),y(_,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),e(t(ie),{class:"w-[500px] p-1"},{default:s(()=>[e(t(_e),null,{default:s(()=>[e(t(fe),{class:"h-9",placeholder:"Search category..."}),e(t(ge),null,{default:s(()=>[r("No category found.")]),_:1}),o.is_loading?(c(),y(t(re),{key:1},{default:s(()=>[e(_,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2 my-2 mx-auto"})]),_:1})):(c(),y(t(re),{key:0},{default:s(()=>[e(t(he),null,{default:s(()=>[(c(!0),w(L,null,N(o.data,f=>(c(),y(t(ve),{key:f.id,value:f.value??"",onSelect:()=>S(f)},{default:s(()=>[r(U(f.label)+" ",1),e(_,{name:"fa-check",class:X(["ml-auto h-4 w-4",l.vertical===f.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1}))]),_:1})]),_:1})]),_:1},8,["open"])])])]),e(K),$.value?(c(),w("div",At,[e(t(C),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:s(()=>[e(_,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),r(" "+U($.value),1)]),_:1})])):R("",!0),e(t(te),{class:"flex justify-end"},{default:s(()=>[e(t(V),{type:"submit",onClick:h,disabled:p.value},{default:s(()=>[p.value?(c(),y(_,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),r(" Update")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),Lt={class:"grid gap-4 py-4"},Nt={class:"grid grid-cols-4 items-center gap-4"},Wt={key:0,class:"grid grid-cols-4 items-center gap-4"},Et=F({__name:"DataTableSendTestMessage",props:{row:{}},setup(i){const a=H("phoneStore",W("phone")),o=j({id:i.row.id,phone:""}),d=I(!1),p=I(!1),b=I(null),{toast:$}=E(),x=async()=>{d.value=!0;try{const h=await M.post("/api/setup/phone/send-test-message",{...o});await a.refresh(a.page_index),$({title:h.data.message,variant:"success"})}catch(h){var m=h.response.data.message||"";$({title:"Whoops, something went wrong",description:m,variant:"destructive"})}finally{d.value=!1}};function k(){p.value=!p.value}return(m,h)=>{const g=B("VIcon"),S=B("Label"),P=B("Separator");return c(),w("div",null,[n("div",null,[e(t(V),{variant:"default",size:"sm",class:"p-2 px-3",onClick:k},{default:s(()=>[d.value?(c(),y(g,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),r(" Send Message ")]),_:1})]),e(t(Z),{open:p.value,"onUpdate:open":h[1]||(h[1]=D=>p.value=D)},{default:s(()=>[e(t(ee),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:s(()=>[e(t(O),null,{default:s(()=>[e(t(J),null,{default:s(()=>[r("Send Test Message")]),_:1}),e(t(Q),null,{default:s(()=>[r(" Insert the phone number, click send. ")]),_:1})]),_:1}),n("div",Lt,[n("div",Nt,[e(S,{for:"phone",class:"text-right"},{default:s(()=>[r(" Phone Number ")]),_:1}),e(t(z),{id:"about",modelValue:o.phone,"onUpdate:modelValue":h[0]||(h[0]=D=>o.phone=D),placeholder:"60129884721",class:"col-span-3"},null,8,["modelValue"])])]),e(P),b.value?(c(),w("div",Wt,[e(S,{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:s(()=>[e(g,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),r(" "+U(b.value),1)]),_:1})])):R("",!0),e(t(te),{class:"flex justify-end"},{default:s(()=>[e(t(V),{type:"submit",onClick:x,disabled:d.value},{default:s(()=>[d.value?(c(),y(g,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),r(" Send")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),Xt={class:"flex gap-1"},Ht=F({__name:"DataTableRowActions",props:{row:{}},setup(i){const a=i,l=ce(()=>kt.parse(a.row.original));return(o,d)=>(c(),w("div",Xt,[e(xt,{row:l.value},null,8,["row"]),e(Bt,{row:l.value},null,8,["row"]),e(Et,{row:l.value},null,8,["row"])]))}}),qt=[{id:"select",header:({table:i})=>T(Y,{checked:i.getIsAllPageRowsSelected()||i.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":a=>i.toggleAllPageRowsSelected(!!a),ariaLabel:"Select all",class:"translate-y-0.5"}),cell:({row:i})=>T(Y,{checked:i.getIsSelected(),"onUpdate:checked":a=>i.toggleSelected(!!a),ariaLabel:"Select row",class:"translate-y-0.5"}),enableSorting:!1,enableHiding:!1,meta:{title:"Select"}},{accessorKey:"verified_name",header:({column:i})=>T(q,{column:i,title:"Name"}),cell:({row:i})=>T("div",{class:"w-20 underline"},i.getValue("verified_name")),enableSorting:!0,enableHiding:!0,filterFn:(i,a,l)=>{var p;const o=((p=i.getValue(a))==null?void 0:p.toString().toLowerCase())??"",d=l==null?void 0:l.toString().toLowerCase();return o.includes(d)},meta:{title:"Name"}},{accessorKey:"quality_rating",header:({column:i})=>T(q,{column:i,title:"Quality Rating"}),cell:({row:i})=>T("div",{class:"w-fit"},i.getValue("quality_rating")),enableSorting:!0,enableHiding:!0,enableColumnFilter:!0,filterFn:(i,a,l)=>{var p;const o=((p=i.getValue(a))==null?void 0:p.toString().toLowerCase())??"",d=l==null?void 0:l.toString().toLowerCase();return o.includes(d)},meta:{title:"Quality Rating"}},{accessorKey:"last_onboarded_time",header:({column:i})=>T(q,{column:i,title:i.columnDef.meta.title}),cell:({row:i})=>{const a=i.getValue("last_onboarded_time");if(!a||typeof a!="string"&&typeof a!="number")return T("div",{class:"w-fit"},"");const l={year:"numeric",month:"long",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},o=new Intl.DateTimeFormat("en-US",l).format(new Date(a));return T("div",{class:"w-fit"},o)},enableSorting:!0,enableHiding:!0,meta:{title:"Last Onboarded Time"}},{accessorKey:"display_phone_number",header:({column:i})=>T(q,{column:i,title:i.columnDef.meta.title}),cell:({row:i})=>T("div",{class:"w-fit"},i.getValue("display_phone_number")),enableSorting:!0,enableHiding:!0,meta:{title:"Display Phone Number"}},{accessorKey:"is_default_phone",header:({column:i})=>T(q,{column:i,title:i.columnDef.meta.title}),cell:({row:i})=>{const a=i.getValue("is_default_phone");return T(tt,{variant:a?"success":"outline"},a?"YES":"NO")},enableSorting:!0,enableHiding:!0,meta:{title:"Default Phone"}},{id:"actions",cell:({row:i})=>T(Ht,{row:i})}],Gt={class:"grid gap-4 py-4"},Yt={class:"grid grid-cols-4 items-center gap-4"},Kt=n("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Ot={class:"grid grid-cols-4 items-center gap-4"},Jt=n("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Qt={class:"col-span-3"},Zt={class:"grid grid-cols-4 items-center gap-4"},ea={class:"grid grid-cols-4 items-center gap-4"},ta={class:"grid grid-cols-4 items-center gap-4"},aa={class:"grid grid-cols-4 items-center gap-4"},sa={class:"grid grid-cols-4 items-center gap-4"},la={class:"col-span-3"},na={key:0,class:"grid grid-cols-4 items-center gap-4"},oa=F({__name:"EditCompanyModal",setup(i){const a=j({name:"",country:0,whatsapp_business_account_id:"",notes:"",is_active:!1,is_onboarded:!1,date_live:null}),l=j({is_loading:!1,is_open:!1,data:[{value:"",label:""}]}),o=I("");async function d(u,_){l.is_loading=!0;try{var f=`/api/country/list?search=${u}`;_&&(f+=`&current_country=${_}`);const v=await M.get(f,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});l.data=v.data.Result}catch{x({title:"Whoops, something went wrong",description:"There was an error fetching the country list",variant:"destructive"})}finally{l.is_loading=!1}}const p=I(!1),b=I(!1),$=I(null),{toast:x}=E();Ye(o,et.debounce(async u=>{l.is_open&&await d(u,a.country)},500));async function k(){try{const u=await M.get("/api/company/setup/");Object.assign(a,u.data.Result),a.country&&await d("",a.country)}catch{b.value=!1,x({title:"Whoops, something went wrong",description:"An unexpected error occurred",variant:"destructive"})}finally{p.value=!1}}function m(){var _;const u=[{condition:a.name==null||a.name=="",message:"Company name cannot be blank"},{condition:((_=a.country)==null?void 0:_.toString)==null,message:"Country cannot be blank"}];for(let f of u)if(f.condition)return $.value=f.message,!1;return!0}async function h(){if(m()){p.value=!0;try{const _=await M.patch("/api/company/setup/",{...a},{headers:{"Content-Type":"application/json"}});g(),$.value="",x({title:_.data.Result,variant:"success"})}catch{x({title:"Whoops, something went wrong",description:"An unexpected error occurred",variant:"destructive"})}finally{p.value=!1}}}function g(){b.value=!b.value,b.value&&(k(),d(o.value))}function S(u){a.country=u.id,l.is_open=!1}function P(u){const _=new Date(u);a.date_live=st(_,"yyyy-MM-dd")}function D(u){o.value=u.target.value}return(u,_)=>{const f=B("VIcon");return c(),w("div",null,[n("div",null,[e(t(V),{variant:"default",size:"sm",class:"p-2 px-3",onClick:g},{default:s(()=>[r(" Edit Company ")]),_:1})]),e(t(Z),{open:b.value,"onUpdate:open":_[8]||(_[8]=v=>b.value=v)},{default:s(()=>[e(t(ee),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:s(()=>[e(t(O),null,{default:s(()=>[e(t(J),null,{default:s(()=>[r("Edit Company")]),_:1}),e(t(Q),null,{default:s(()=>[r(" Insert the details of the company here. Click edit when you're done. ")]),_:1})]),_:1}),n("div",Gt,[n("div",Yt,[e(t(C),{for:"company_name",class:"text-right"},{default:s(()=>[r(" Company Name "),Kt]),_:1}),e(t(z),{id:"company_name",modelValue:a.name,"onUpdate:modelValue":_[0]||(_[0]=v=>a.name=v),placeholder:"George Sdn Bhd",class:"col-span-3"},null,8,["modelValue"])]),n("div",Ot,[e(t(C),{for:"country",class:"text-right leading-normal"},{default:s(()=>[r(" Country "),Jt]),_:1}),n("div",Qt,[e(t(ne),{open:l.is_open,"onUpdate:open":_[2]||(_[2]=v=>l.is_open=v)},{default:s(()=>[e(t(oe),{"as-child":""},{default:s(()=>[e(t(V),{variant:"outline",role:"combobox","aria-expanded":l.is_open,class:"w-full justify-between px-3",disabled:l.is_loading},{default:s(()=>{var v;return[r(U(a.country?(v=l.data.find(xe=>xe.id===a.country))==null?void 0:v.label:"Select Country")+" ",1),l.is_loading?(c(),y(f,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(c(),y(f,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),e(t(ie),{class:"w-[500px] p-1"},{default:s(()=>[e(t(_e),null,{default:s(()=>[e(t(fe),{class:"h-9",modelValue:o.value,"onUpdate:modelValue":_[1]||(_[1]=v=>o.value=v),placeholder:"Search country...",onInput:D},null,8,["modelValue"]),e(t(ge),null,{default:s(()=>[r("No country found.")]),_:1}),e(t(re),null,{default:s(()=>[e(t(he),null,{default:s(()=>[(c(!0),w(L,null,N(l.data,v=>(c(),y(t(ve),{key:v.id,value:v.value??"",onSelect:()=>S(v)},{default:s(()=>[r(U(v.label)+" ",1),e(f,{name:"fa-check",class:X(["ml-auto h-4 w-4",a.country===v.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["open"])])]),e(K),n("div",Zt,[e(t(C),{for:"whatsapp_business_id",class:"text-right"},{default:s(()=>[r(" Whatsapp Business ID ")]),_:1}),e(t(z),{id:"whatsapp_business_id",modelValue:a.whatsapp_business_account_id,"onUpdate:modelValue":_[3]||(_[3]=v=>a.whatsapp_business_account_id=v),placeholder:"XXXXXXXXXXXX",class:"col-span-3"},null,8,["modelValue"])]),e(K),n("div",ea,[e(t(C),{for:"is_active",class:"text-right"},{default:s(()=>[r(" Notes ")]),_:1}),e(t(ue),{id:"is_active",modelValue:a.notes,"onUpdate:modelValue":_[4]||(_[4]=v=>a.notes=v),placeholder:"Leave your footnote here...",class:"col-span-3"},null,8,["modelValue"])]),n("div",ta,[e(t(C),{for:"is_active",class:"text-right"},{default:s(()=>[r(" Active ")]),_:1}),e(t(Y),{id:"is_active",checked:a.is_active,"onUpdate:checked":_[5]||(_[5]=v=>a.is_active=v),"update:open":"form.is_active = $event",class:"col-span-3"},null,8,["checked"])]),n("div",aa,[e(t(C),{for:"is_onboarded",class:"text-right"},{default:s(()=>[r(" Onboarded ")]),_:1}),e(t(Y),{id:"is_onboarded",checked:a.is_onboarded,"onUpdate:checked":_[6]||(_[6]=v=>a.is_onboarded=v),"update:open":"form.is_active = $event",class:"col-span-3"},null,8,["checked"])]),n("div",sa,[e(t(C),{for:"email",class:"text-right"},{default:s(()=>[r(" Active Date ")]),_:1}),n("div",la,[e(t(ne),null,{default:s(()=>[e(t(oe),{"as-child":""},{default:s(()=>[e(t(V),{variant:"outline",class:X(t(de)("w-full justify-start text-left font-normal",!a.date_live&&"text-muted-foreground"))},{default:s(()=>[e(f,{name:"fa-regular-calendar-alt",class:"mr-2 h-4 w-4"}),n("span",null,U(a.date_live?a.date_live:"Pick a date"),1)]),_:1},8,["class"])]),_:1}),e(t(ie),{class:"w-auto p-0"},{default:s(()=>[e(t(at),{"onUpdate:modelValue":_[7]||(_[7]=v=>P(v)),masks:{L:"YYYY-MM-DD"},modelConfig:{type:"string",mask:"YYYY/MM/DD"}})]),_:1})]),_:1})])])]),$.value?(c(),w("div",na,[e(t(C),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:s(()=>[e(f,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),r(" "+U($.value),1)]),_:1})])):R("",!0),e(t(te),{class:"flex justify-end"},{default:s(()=>[e(t(V),{type:"submit",onClick:h,disabled:p.value},{default:s(()=>[p.value?(c(),y(f,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),r(" Edit")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),ae=i=>(be("data-v-45ee39d6"),i=i(),ye(),i),ia=ae(()=>n("h4",{class:"text-lg font-bold py-3"},"Company",-1)),ra={class:"flex border-t-2 border-primary bg-secondary gap-4 overflow-auto"},da={class:"flex justify-between w-full"},ca={class:"p-2"},ua={class:"p-2"},pa=ae(()=>n("h4",{class:"text-lg font-bold py-3"},"Management",-1)),ma={class:"flex border-t-2 border-primary bg-secondary gap-4 overflow-auto"},_a={class:"flex w-full items-center"},fa=ae(()=>n("td",{class:"p-2 text-sm w-1/4"},"Whatsapp Template",-1)),ga=ae(()=>n("td",{class:"font-bold text-center"},"Created",-1)),ha={class:"flex w-full justify-between ml-4"},va=F({__name:"Import",setup(i){const a=H("phoneStore",W("phone")),l=j({is_loading:!1}),o=j({is_loading:!1}),d=j({is_loading:!1}),{toast:p}=E();async function b(){d.is_loading=!0;try{const m=await M.post("/api/refresh/company");await a.refresh(a.page_index),p({title:m.data.message,variant:"success"})}catch(m){var k=m.response.data.message||"";p({title:"Whoops, something went wrong",description:k,variant:"destructive"})}finally{d.is_loading=!1}}async function $(){l.is_loading=!0;try{const m=await M.post("/api/export/reminder-template");p({title:m.data.message,variant:"success"})}catch(m){var k=m.response.data.message||"";p({title:"Whoops, something went wrong",description:k,variant:"destructive"})}finally{l.is_loading=!1}}async function x(){o.is_loading=!0;try{const m=await M.post("/api/setup/template");p({title:m.data.message,variant:"success"})}catch(m){var k=m.response.data.message||"";p({title:"Whoops, something went wrong",description:k,variant:"destructive"})}finally{o.is_loading=!1}}return(k,m)=>{const h=B("VIcon");return c(),w("div",null,[ia,n("table",ra,[n("tr",da,[n("td",ca,[e(oa)]),n("td",ua,[e(t(V),{class:"flex ml-auto",onClick:m[0]||(m[0]=()=>b()),disabled:d.is_loading},{default:s(()=>[d.is_loading?(c(),y(h,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):R("",!0),e(h,{name:"fa-sync",class:"h-4 w-4 shrink-0 mr-2"}),r(" Business Account")]),_:1},8,["disabled"])])])]),pa,n("table",ma,[n("tr",_a,[fa,ga,n("td",ha,[n("div",null,[e(t(V),{class:"my-2",onClick:m[1]||(m[1]=()=>$()),disabled:l.is_loading},{default:s(()=>[l.is_loading?(c(),y(h,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):R("",!0),e(h,{name:"fa-share-square",class:"h-4 w-4 shrink-0 mr-2"}),r(" Export Reminder Template")]),_:1},8,["disabled"])]),n("div",null,[e(t(V),{class:"m-2 md:ml-0 button",onClick:m[2]||(m[2]=()=>x()),disabled:o.is_loading},{default:s(()=>[o.is_loading?(c(),y(h,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):R("",!0),e(h,{name:"fa-sync",class:"h-4 w-4 shrink-0 mr-2"}),r(" Import")]),_:1},8,["disabled"])])])])])])}}}),ba=we(va,[["__scopeId","data-v-45ee39d6"]]),ya={class:"grid gap-4 py-4"},wa={class:"grid grid-cols-4 items-center gap-4"},ka={class:"grid grid-cols-4 items-center gap-4"},xa={class:"grid grid-cols-4 items-center gap-4"},$a={key:0,class:"grid grid-cols-4 items-center gap-4"},Va=F({__name:"EditCompanyBukkuModal",setup(i){const a=j({bukku_api:"",bukku_subdomain:"",bukku_access_token:""}),l=I(!1),o=I(!1),d=I(null),{toast:p}=E();async function b(){try{const h=await M.get("/api/company/setup/bukku");Object.assign(a,h.data.Result)}catch{o.value=!1,p({title:"Whoops, something went wrong",description:"An unexpected error occurred",variant:"destructive"})}finally{l.value=!1}}function $(){const h=[{condition:a.bukku_api==null||a.bukku_api=="",message:"API name cannot be blank"},{condition:a.bukku_subdomain==null||a.bukku_subdomain=="",message:"Subdomain cannot be blank"},{condition:a.bukku_access_token==null||a.bukku_access_token=="",message:"Access Token cannot be blank"}];for(let g of h)if(g.condition)return d.value=g.message,!1;return!0}async function x(){if($())try{const g=await M.post("api/company/setup/test-bukku",{...a},{headers:{"Content-Type":"application/json"}});d.value="",p({title:g.data.Result,variant:"success"})}catch{p({title:"Test failed",description:"Credentials may not be correct",variant:"destructive"})}finally{l.value=!1}}async function k(){l.value=!0;try{const h=await M.patch("/api/company/setup/bukku",{...a},{headers:{"Content-Type":"application/json"}});m(),d.value="",p({title:h.data.Result,variant:"success"})}catch{p({title:"Whoops, something went wrong",description:"An unexpected error occurred",variant:"destructive"})}finally{l.value=!1}}function m(){o.value=!o.value,o.value&&b()}return(h,g)=>{const S=B("VIcon");return c(),w("div",null,[n("div",null,[e(t(V),{variant:"default",size:"sm",class:"p-2 px-3",onClick:m},{default:s(()=>[r(" Configure Bukku ")]),_:1})]),e(t(Z),{open:o.value,"onUpdate:open":g[3]||(g[3]=P=>o.value=P)},{default:s(()=>[e(t(ee),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:s(()=>[e(t(O),null,{default:s(()=>[e(t(J),null,{default:s(()=>[r("Configure Bukku")]),_:1}),e(t(Q),null,{default:s(()=>[r(" Insert the details of the bukku credentials here. Click configure when you're done. ")]),_:1})]),_:1}),n("div",ya,[n("div",wa,[e(t(C),{for:"bukku_api",class:"text-right"},{default:s(()=>[r(" API ")]),_:1}),e(t(z),{id:"bukku_api",modelValue:a.bukku_api,"onUpdate:modelValue":g[0]||(g[0]=P=>a.bukku_api=P),placeholder:"https://api.bukku.fyi/",class:"col-span-3"},null,8,["modelValue"])]),n("div",ka,[e(t(C),{for:"bukku_subdomain",class:"text-right"},{default:s(()=>[r(" Subdomain ")]),_:1}),e(t(z),{id:"bukku_subdomain",modelValue:a.bukku_subdomain,"onUpdate:modelValue":g[1]||(g[1]=P=>a.bukku_subdomain=P),placeholder:"kckok",class:"col-span-3"},null,8,["modelValue"])]),n("div",xa,[e(t(C),{for:"bukku_access_token",class:"text-right"},{default:s(()=>[r(" Access Token ")]),_:1}),e(t(ue),{id:"bukku_access_token",modelValue:a.bukku_access_token,"onUpdate:modelValue":g[2]||(g[2]=P=>a.bukku_access_token=P),placeholder:"eyJ0eXAiOiJKV1QiLCJhb....",class:"col-span-3"},null,8,["modelValue"])])]),d.value?(c(),w("div",$a,[e(t(C),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:s(()=>[e(S,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),r(" "+U(d.value),1)]),_:1})])):R("",!0),e(t(te),{class:"flex"},{default:s(()=>[e(t(V),{type:"submit",variant:"secondary",onClick:x,disabled:l.value},{default:s(()=>[l.value?(c(),y(S,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),r(" Test")]),_:1},8,["disabled"]),e(t(V),{type:"submit",onClick:k,disabled:l.value},{default:s(()=>[l.value?(c(),y(S,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),r(" Configure")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),ke=i=>(be("data-v-f950aa88"),i=i(),ye(),i),Ca=ke(()=>n("h4",{class:"text-lg font-bold py-3"},"Accounting API Configuration",-1)),Sa={class:"flex border-t-2 border-primary bg-secondary gap-4 overflow-auto"},Ia={class:"flex justify-between w-full items-center"},Pa=ke(()=>n("td",{class:"p-2 text-sm w-1/4"},"Bukku",-1)),Da={class:"p-2"},Ua=F({__name:"Accounting",setup(i){return H("phoneStore",W("phone")),j({is_loading:!1}),j({is_loading:!1}),j({is_loading:!1}),E(),(a,l)=>(c(),w("div",null,[Ca,n("table",Sa,[n("tr",Ia,[Pa,n("td",Da,[e(Va)])])])]))}}),Ra=we(Ua,[["__scopeId","data-v-f950aa88"]]),Ta={class:"p-4 md:p-8 space-y-4 h-full"},Ma=n("div",{class:"flex items-center justify-between space-y-2"},[n("div",null,[n("h2",{class:"text-2xl font-bold tracking-tight"},"Setup")])],-1),Fa=n("hr",null,null,-1),ja=n("div",{class:"flex items-center justify-between space-y-2 my-2"},[n("div",null,[n("h3",{class:"text-lg font-bold tracking-tight"},"Phone Number")])],-1),za={class:"border-t-primary border-t-4 rounded"},Aa="/api/setup/phone",Ja=F({__name:"Setup",setup(i){const a=W("phone"),l=o=>({id:o.id,phone_number_id:o.whatsapp_id,display_phone_number:o.phone_number,verified_name:o.name,quality_rating:o.company_profile_details.quality_rating,platform_type:o.company_profile_details.platform_type,last_onboarded_time:o.company_profile_details.last_onboarded_time,is_default_phone:o.company_profile_details.is_default_phone});return Ke(()=>{a.fetch(Aa,0,l)}),Je("phoneStore",a),Oe(()=>{a.$reset()}),(o,d)=>(c(),w("div",Ta,[Ma,Fa,e(ba),e(Ra),n("div",null,[ja,n("div",za,[e(wt,{data:t(a).tasks,columns:t(qt)},null,8,["data","columns"])])])]))}});export{Ja as default};
