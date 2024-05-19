import{_ as we,a as ye,b as xe,c as $e,d as Se,u as E,f as ke,g as Ve,h as Ce,i as ue,j as Q,k as Ie,l as Pe,m as De,n as Ue,o as Re,p as Me,q as Te,r as Fe,F as pe,e as ze,z as F,s as Y}from"./Checkbox.vue_vue_type_script_setup_true_lang.C3smPaJx.js";import{e as M,as as Le,at as je,u as t,o as d,c as w,au as Ne,n as A,g as se,r as j,d as n,t as D,a as e,k as s,F as B,v as W,s as k,b as c,x as le,B as H,i as I,C as Be,l as v,D as G,m as R,y as We,z as Ae,I as J,A as Ee,E as N,J as q,H as T,L as ne,M as oe,W as ie,_ as C,Q as K,N as Z,O as ee,P as te,X as me,Y as _e,Z as fe,a1 as ae,a0 as ge,a2 as he,R as re,S as U,V as Xe,a4 as He,a5 as qe,G as Ge,T as Ye,U as Ke}from"../main.js";import{u as Oe,_ as z}from"./Input.vue_vue_type_script_setup_true_lang.LM1FtyXv.js";import{p as Qe}from"./index.ChZjCHsy.js";import{_ as de}from"./DialogScrollContent.vue_vue_type_script_setup_true_lang.br81cgoc.js";import{_ as ce}from"./DialogFooter.vue_vue_type_script_setup_true_lang.CUbi7heN.js";import{_ as Je}from"./lodash.BtnTHUG3.js";import{_ as Ze}from"./index.DhdF1qMN.js";import{_ as et}from"./CalendarPrevButton.vue_vue_type_script_setup_true_lang.YkNaXevc.js";import{f as tt}from"./index.DNZ2qQq3.js";import{_ as at}from"./_plugin-vue_export-helper.DlAUqK2U.js";const ve=M({__name:"Textarea",props:{class:{},defaultValue:{},modelValue:{}},emits:["update:modelValue"],setup(i,{emit:a}){const l=i,r=Oe(l,"modelValue",a,{passive:!0,defaultValue:l.defaultValue});return(f,h)=>Le((d(),w("textarea",{"onUpdate:modelValue":h[0]||(h[0]=$=>Ne(r)?r.value=$:null),class:A(t(se)("flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",l.class))},null,2)),[[je,t(r)]])}}),st={class:"flex items-center justify-between px-2 pb-10"},lt={class:"flex-1 text-sm text-muted-foreground"},nt={class:"flex items-center space-x-6 lg:space-x-8 text-primary"},ot={class:"flex items-center space-x-2"},it=n("p",{class:"text-sm font-medium"},"Rows per page",-1),rt={class:"flex w-[100px] items-center justify-center text-sm font-medium"},dt={class:"flex items-center space-x-2"},ct=n("span",{class:"sr-only"},"Go to first page",-1),ut=n("span",{class:"sr-only"},"Go to previous page",-1),pt=n("span",{class:"sr-only"},"Go to next page",-1),mt=n("span",{class:"sr-only"},"Go to last page",-1),_t=M({__name:"DataTablePagination",props:{table:{}},setup(i){return(a,l)=>{const o=j("VIcon");return d(),w("div",st,[n("div",lt,D(a.table.getFilteredSelectedRowModel().rows.length)+" of "+D(a.table.getFilteredRowModel().rows.length)+" row(s) selected. ",1),n("div",nt,[n("div",ot,[it,e(t($e),{"model-value":`${a.table.getState().pagination.pageSize}`,"onUpdate:modelValue":a.table.setPageSize},{default:s(()=>[e(t(we),{class:"h-8 w-[70px]"},{default:s(()=>[e(t(ye),{placeholder:`${a.table.getState().pagination.pageSize}`},null,8,["placeholder"])]),_:1}),e(t(xe),{side:"top"},{default:s(()=>[(d(),w(B,null,W([10,20,30,40,50],r=>e(t(Se),{key:r,value:`${r}`},{default:s(()=>[c(D(r),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1},8,["model-value","onUpdate:modelValue"])]),n("div",rt," Page "+D(a.table.getState().pagination.pageIndex+1)+" of "+D(a.table.getPageCount()),1),n("div",dt,[e(t(k),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!a.table.getCanPreviousPage(),onClick:l[0]||(l[0]=r=>a.table.setPageIndex(0))},{default:s(()=>[ct,e(o,{name:"fa-arrow-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),e(t(k),{variant:"outline",class:"h-8 w-8 p-0",disabled:!a.table.getCanPreviousPage(),onClick:l[1]||(l[1]=r=>a.table.previousPage())},{default:s(()=>[ut,e(o,{name:"fa-chevron-left",class:"h-4 w-4"})]),_:1},8,["disabled"]),e(t(k),{variant:"outline",class:"h-8 w-8 p-0",disabled:!a.table.getCanNextPage(),onClick:l[2]||(l[2]=r=>a.table.nextPage())},{default:s(()=>[pt,e(o,{name:"fa-chevron-right",class:"h-4 w-4"})]),_:1},8,["disabled"]),e(t(k),{variant:"outline",class:"hidden h-8 w-8 p-0 lg:flex",disabled:!a.table.getCanNextPage(),onClick:l[3]||(l[3]=r=>a.table.setPageIndex(a.table.getPageCount()-1))},{default:s(()=>[mt,e(o,{name:"fa-arrow-right",class:"h-4 w-4"})]),_:1},8,["disabled"])])])])}}}),ft={class:"flex items-center justify-between"},gt={class:"flex flex-1 items-center space-x-2"},ht=M({__name:"DataTableToolbar",props:{table:{}},setup(i){const a=i;return le(()=>a.table.getState().columnFilters.length>0),(l,o)=>{var r;return d(),w("div",ft,[n("div",gt,[e(t(z),{placeholder:"Search...","model-value":((r=l.table.getColumn("verified_name"))==null?void 0:r.getFilterValue())??"",class:"h-8 w-[150px] lg:w-[250px]",onInput:o[0]||(o[0]=f=>l.table.setGlobalFilter(f.target.value))},null,8,["model-value"])])])}}}),vt={class:"space-y-4 text-muted-foreground"},bt={class:"rounded-md border"},wt=M({__name:"DataTable",props:{columns:{},data:{}},setup(i){const a=H("phoneStore",E("phone")),l=i,o=I([]),r=I([]),f=I({}),h=I({pageIndex:a.page_index,pageSize:a.page_size}),$=I();function S(m,b){let x;typeof m=="function"?x=m(b.value):x=m,b.value=x,a.set_page_index(x.pageIndex),a.set_page_size(x.pageSize)}const y=ke({get data(){return l.data},get columns(){return l.columns},state:{get sorting(){return o.value},get columnFilters(){return r.value},get columnVisibility(){return f.value},get rowSelection(){return $.value},get pagination(){return h.value}},enableRowSelection:!0,onSortingChange:m=>G(m,o),onPaginationChange:m=>S(m,h),onColumnFiltersChange:m=>G(m,r),onColumnVisibilityChange:m=>G(m,f),onRowSelectionChange:m=>G(m,$),getCoreRowModel:Pe(),getFilteredRowModel:De(),getPaginationRowModel:Ue(),getSortedRowModel:Re(),getFacetedRowModel:Me(),getFacetedUniqueValues:Te()});return Be(()=>{y.setPageIndex(a.page_index),y.setPageSize(a.page_size)}),(m,b)=>(d(),w("div",vt,[e(ht,{table:t(y)},null,8,["table"]),n("div",bt,[e(t(Ie),null,{default:s(()=>[e(t(Ve),null,{default:s(()=>[(d(!0),w(B,null,W(t(y).getHeaderGroups(),x=>(d(),v(t(Q),{key:x.id},{default:s(()=>[(d(!0),w(B,null,W(x.headers,P=>(d(),v(t(Fe),{key:P.id},{default:s(()=>[P.isPlaceholder?R("",!0):(d(),v(t(pe),{key:0,render:P.column.columnDef.header,props:P.getContext()},null,8,["render","props"]))]),_:2},1024))),128))]),_:2},1024))),128))]),_:1}),e(t(Ce),{id:"dbTableBody"},{default:s(()=>{var x;return[(x=t(y).getRowModel().rows)!=null&&x.length?(d(!0),w(B,{key:0},W(t(y).getRowModel().rows,P=>(d(),v(t(Q),{key:P.id,"data-state":P.getIsSelected()&&"selected"},{default:s(()=>[(d(!0),w(B,null,W(P.getVisibleCells(),L=>(d(),v(t(ue),{key:L.id},{default:s(()=>[e(t(pe),{render:L.column.columnDef.cell,props:L.getContext()},null,8,["render","props"])]),_:2},1024))),128))]),_:2},1032,["data-state"]))),128)):(d(),v(t(Q),{key:1},{default:s(()=>[e(t(ue),{colspan:m.columns.length,class:"h-24 text-center"},{default:s(()=>[c(" No results. ")]),_:1},8,["colspan"])]),_:1}))]}),_:1})]),_:1})]),e(_t,{table:t(y)},null,8,["table"])]))}}),X=M({__name:"DataTableColumnHeader",props:{column:{},title:{}},setup(i){return(a,l)=>{const o=j("VIcon");return a.column.getCanSort()?(d(),w("div",{key:0,class:A(t(se)("flex items-center space-x-2",a.$attrs.class??""))},[e(t(Ee),null,{default:s(()=>[e(t(We),{"as-child":""},{default:s(()=>[e(t(k),{variant:"ghost",size:"sm",class:"-ml-3 h-8 data-[state=open]:bg-accent"},{default:s(()=>[n("span",null,D(a.title),1),a.column.getIsSorted()==="desc"?(d(),v(o,{key:0,name:"fa-arrow-down",class:"ml-2 h-4 w-4"})):a.column.getIsSorted()==="asc"?(d(),v(o,{key:1,name:"fa-arrow-up",class:"ml-2 h-4 w-4"})):(d(),v(o,{key:2,name:"fa-sort",class:"ml-2 h-4 w-4"}))]),_:1})]),_:1}),e(t(Ae),{align:"start"},{default:s(()=>[e(t(J),{onClick:l[0]||(l[0]=r=>a.column.toggleSorting(!1))},{default:s(()=>[e(o,{name:"fa-arrow-up",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),c(" Asc ")]),_:1}),e(t(J),{onClick:l[1]||(l[1]=r=>a.column.toggleSorting(!0))},{default:s(()=>[e(o,{name:"fa-arrow-down",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),c(" Desc ")]),_:1}),e(t(ze)),e(t(J),{onClick:l[2]||(l[2]=r=>a.column.toggleVisibility(!1))},{default:s(()=>[e(o,{name:"fa-regular-eye-slash",class:"mr-2 h-3.5 w-3.5 text-muted-foreground/70"}),c(" Hide ")]),_:1})]),_:1})]),_:1})],2)):(d(),w("div",{key:1,class:A(a.$attrs.class)},D(a.title),3))}}}),yt=F.object({id:F.number(),phone_number_id:F.string(),verified_name:F.string(),quality_rating:F.string(),platform_type:F.string(),last_onboarded_time:F.preprocess(i=>{if(typeof i=="string")try{return Qe(i)}catch{return new Date(i)}return i},F.date()),display_phone_number:F.string(),is_default_phone:F.boolean()}),xt=M({__name:"DataTableSetDefaultPhone",props:{row:{}},setup(i){const a=H("phoneStore",E("phone")),o=N({id:i.row.id}),r=I(!1),{toast:f}=q(),h=async()=>{r.value=!0;try{const S=await T.post("/api/setup/phone/setdefault",{...o});await a.refresh(a.page_index),f({title:S.data.message,variant:"success"})}catch(S){var $=S.response.data.message||"";f({title:"Whoops, something went wrong",description:$,variant:"destructive"})}finally{r.value=!1}};return($,S)=>{const y=j("VIcon");return d(),w("div",null,[e(t(k),{variant:"default",size:"sm",class:"p-2 px-3",onClick:h,disabled:r.value},{default:s(()=>[r.value?(d(),v(y,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),c(" Set Default ")]),_:1},8,["disabled"])])}}}),$t={class:"grid gap-4 py-4"},St={class:"flex justify-center"},kt=["src"],Vt={class:"grid grid-cols-4 items-center"},Ct={class:"col-span-3"},It=n("p",{class:"col-start-2 col-span-3 text-sm text-gray-500 dark:text-gray-300"},[c(" Recommended Type: 640px x 640px "),n("b",null,"JPG/JPEG"),c(" (MAX. 5MB) ")],-1),Pt={class:"grid grid-cols-4 items-center gap-4"},Dt={class:"grid grid-cols-4 items-center gap-4"},Ut={class:"grid grid-cols-4 items-center gap-4"},Rt={class:"grid grid-cols-4 items-center gap-4"},Mt={class:"grid grid-cols-4 items-center gap-4"},Tt={class:"flex gap-2 col-span-3"},Ft={class:"grid grid-cols-4 items-center gap-4"},zt={class:"col-span-3"},Lt={key:0,class:"grid grid-cols-4 items-center gap-4"},jt=M({__name:"DataTableUpdateWhatsappProfile",props:{row:{}},setup(i){H("phoneStore",E("phone"));const l=N({phone_number_id:i.row.phone_number_id,image_url:"",about:"",address:"",description:"",email:"",vertical:"",website1:"",website2:"",new_image:null}),o=N({is_loading:!1,is_open:!1,data:[{value:"",label:""}]});async function r(){o.is_loading=!0;try{var V="/api/setup/whatsapp_business/category/list";const p=await T.get(V,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});o.data=p.data.Result}catch(p){var u=p.response.data.message||"";S({title:"Whoops, something went wrong",description:u,variant:"destructive"})}finally{o.is_loading=!1}}const f=I(!1),h=I(!1),$=I(null),{toast:S}=q();async function y(){try{const u=await T.get(`/api/setup/whatsapp-profile/${l.phone_number_id}`);console.log(u.data.Result),Object.assign(l,u.data.Result)}catch(u){var V=u.response.data.message||"";S({title:"Whoops, something went wrong",description:V,variant:"destructive"})}finally{f.value=!1}}const m=le(()=>l.new_image?URL.createObjectURL(l.new_image):l.image_url);async function b(){f.value=!0;try{const V=await T.patch(`/api/setup/whatsapp-profile/${l.phone_number_id}`,{...l},{headers:{"Content-Type":"multipart/form-data"}});x(),S({title:V.data.Result,variant:"success"})}catch{S({title:"Whoops, something went wrong",description:"An unexpected error occurred.",variant:"destructive"})}finally{f.value=!1}}function x(){h.value=!h.value,h.value&&(y(),r())}function P(V){l.vertical=V.id,o.is_open=!1}const L=V=>{var p;const u=V.target;if((p=u.files)!=null&&p.length){const _=u.files[0];if(_.size>5*1024*1024){S({title:"The file size must be under 5MB",variant:"destructive"}),u.value="";return}l.new_image=_}};return(V,u)=>{const p=j("VIcon");return d(),w("div",null,[n("div",null,[e(t(k),{variant:"default",size:"sm",class:"p-2 px-3",onClick:x},{default:s(()=>[c(" Profile ")]),_:1})]),e(t(re),{open:h.value,"onUpdate:open":u[7]||(u[7]=_=>h.value=_)},{default:s(()=>[e(t(de),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:s(()=>[e(t(ne),null,{default:s(()=>[e(t(oe),null,{default:s(()=>[c("Whatsapp Profile")]),_:1}),e(t(ie),null,{default:s(()=>[c(" Insert the details of the debt here. Click edit when you're done. ")]),_:1})]),_:1}),n("div",$t,[n("div",St,[n("img",{id:"picture",src:m.value,class:"mx-auto size-48 mb-4 h-full"},null,8,kt)]),n("div",Vt,[e(t(C),{for:"profile_picture",class:"mr-4 text-right"},{default:s(()=>[c(" Profile Picture ")]),_:1}),n("div",Ct,[e(t(z),{id:"profile_picture",type:"file",onChange:L,class:"col-span-3"})]),It]),e(K),n("div",Pt,[e(t(C),{for:"about",class:"text-right"},{default:s(()=>[c(" About ")]),_:1}),e(t(z),{id:"about",modelValue:l.about,"onUpdate:modelValue":u[0]||(u[0]=_=>l.about=_),placeholder:"Lot 1919, Taman Bandar Puteri, 5000 Selangor.",class:"col-span-3"},null,8,["modelValue"])]),n("div",Dt,[e(t(C),{for:"address",class:"text-right"},{default:s(()=>[c(" Address ")]),_:1}),e(t(z),{id:"address",modelValue:l.address,"onUpdate:modelValue":u[1]||(u[1]=_=>l.address=_),placeholder:"Lot 1111, Tmana Mawar Baiduri, 5000 Selangor",class:"col-span-3"},null,8,["modelValue"])]),n("div",Ut,[e(t(C),{for:"description",class:"text-right"},{default:s(()=>[c(" Description ")]),_:1}),e(ve,{id:"description",modelValue:l.description,"onUpdate:modelValue":u[2]||(u[2]=_=>l.description=_),placeholder:"Description...",class:"col-span-3"},null,8,["modelValue"])]),n("div",Rt,[e(t(C),{for:"email",class:"text-right"},{default:s(()=>[c(" Email ")]),_:1}),e(t(z),{id:"email",modelValue:l.email,"onUpdate:modelValue":u[3]||(u[3]=_=>l.email=_),placeholder:"hello@gmail.com",class:"col-span-3"},null,8,["modelValue"])]),n("div",Mt,[e(t(C),{for:"websites",class:"text-right"},{default:s(()=>[c(" Websites ")]),_:1}),n("div",Tt,[e(t(z),{id:"website",modelValue:l.website1,"onUpdate:modelValue":u[4]||(u[4]=_=>l.website1=_),placeholder:"https://facebook.com",class:"w-1/2"},null,8,["modelValue"]),e(t(z),{id:"website",modelValue:l.website2,"onUpdate:modelValue":u[5]||(u[5]=_=>l.website2=_),placeholder:"https://kckok.my",class:"w-1/2"},null,8,["modelValue"])])]),n("div",Ft,[e(t(C),{for:"customer",class:"text-right leading-normal"},{default:s(()=>[c(" Category ")]),_:1}),n("div",zt,[e(t(Z),{open:o.is_open,"onUpdate:open":u[6]||(u[6]=_=>o.is_open=_)},{default:s(()=>[e(t(ee),{"as-child":""},{default:s(()=>[e(t(k),{variant:"outline",role:"combobox","aria-expanded":o.is_open,class:"w-full justify-between px-3",disabled:o.is_loading},{default:s(()=>{var _;return[c(D(l.vertical?(_=o.data.find(g=>g.id===l.vertical))==null?void 0:_.label:"Select Category")+" ",1),o.is_loading?(d(),v(p,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(d(),v(p,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),e(t(te),{class:"w-[500px] p-1"},{default:s(()=>[e(t(me),null,{default:s(()=>[e(t(_e),{class:"h-9",placeholder:"Search category..."}),e(t(fe),null,{default:s(()=>[c("No category found.")]),_:1}),o.is_loading?(d(),v(t(ae),{key:1},{default:s(()=>[e(p,{name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2 my-2 mx-auto"})]),_:1})):(d(),v(t(ae),{key:0},{default:s(()=>[e(t(ge),null,{default:s(()=>[(d(!0),w(B,null,W(o.data,_=>(d(),v(t(he),{key:_.id,value:_.value??"",onSelect:()=>P(_)},{default:s(()=>[c(D(_.label)+" ",1),e(p,{name:"fa-check",class:A(["ml-auto h-4 w-4",l.vertical===_.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1}))]),_:1})]),_:1})]),_:1},8,["open"])])])]),e(K),$.value?(d(),w("div",Lt,[e(t(C),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:s(()=>[e(p,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),c(" "+D($.value),1)]),_:1})])):R("",!0),e(t(ce),{class:"flex justify-end"},{default:s(()=>[e(t(k),{type:"submit",onClick:b,disabled:f.value},{default:s(()=>[f.value?(d(),v(p,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),c(" Update")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),Nt={class:"grid gap-4 py-4"},Bt={class:"grid grid-cols-4 items-center gap-4"},Wt={key:0,class:"grid grid-cols-4 items-center gap-4"},At=M({__name:"DataTableSendTestMessage",props:{row:{}},setup(i){const a=H("phoneStore",E("phone")),o=N({id:i.row.id,phone:""}),r=I(!1),f=I(!1),h=I(null),{toast:$}=q(),S=async()=>{r.value=!0;try{const b=await T.post("/api/setup/phone/send-test-message",{...o});await a.refresh(a.page_index),$({title:b.data.message,variant:"success"})}catch(b){var m=b.response.data.message||"";$({title:"Whoops, something went wrong",description:m,variant:"destructive"})}finally{r.value=!1}};function y(){f.value=!f.value}return(m,b)=>{const x=j("VIcon"),P=j("Label"),L=j("Separator");return d(),w("div",null,[n("div",null,[e(t(k),{variant:"default",size:"sm",class:"p-2 px-3",onClick:y},{default:s(()=>[r.value?(d(),v(x,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),c(" Send Message ")]),_:1})]),e(t(re),{open:f.value,"onUpdate:open":b[1]||(b[1]=V=>f.value=V)},{default:s(()=>[e(t(de),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:s(()=>[e(t(ne),null,{default:s(()=>[e(t(oe),null,{default:s(()=>[c("Send Test Message")]),_:1}),e(t(ie),null,{default:s(()=>[c(" Insert the phone number, click send. ")]),_:1})]),_:1}),n("div",Nt,[n("div",Bt,[e(P,{for:"phone",class:"text-right"},{default:s(()=>[c(" Phone Number ")]),_:1}),e(t(z),{id:"about",modelValue:o.phone,"onUpdate:modelValue":b[0]||(b[0]=V=>o.phone=V),placeholder:"60129884721",class:"col-span-3"},null,8,["modelValue"])])]),e(L),h.value?(d(),w("div",Wt,[e(P,{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:s(()=>[e(x,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),c(" "+D(h.value),1)]),_:1})])):R("",!0),e(t(ce),{class:"flex justify-end"},{default:s(()=>[e(t(k),{type:"submit",onClick:S,disabled:r.value},{default:s(()=>[r.value?(d(),v(x,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),c(" Send")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),Et={class:"flex gap-1"},Xt=M({__name:"DataTableRowActions",props:{row:{}},setup(i){const a=i,l=le(()=>yt.parse(a.row.original));return(o,r)=>(d(),w("div",Et,[e(xt,{row:l.value},null,8,["row"]),e(jt,{row:l.value},null,8,["row"]),e(At,{row:l.value},null,8,["row"])]))}}),Ht=[{id:"select",header:({table:i})=>U(Y,{checked:i.getIsAllPageRowsSelected()||i.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":a=>i.toggleAllPageRowsSelected(!!a),ariaLabel:"Select all",class:"translate-y-0.5"}),cell:({row:i})=>U(Y,{checked:i.getIsSelected(),"onUpdate:checked":a=>i.toggleSelected(!!a),ariaLabel:"Select row",class:"translate-y-0.5"}),enableSorting:!1,enableHiding:!1,meta:{title:"Select"}},{accessorKey:"verified_name",header:({column:i})=>U(X,{column:i,title:"Name"}),cell:({row:i})=>U("div",{class:"w-20 underline"},i.getValue("verified_name")),enableSorting:!0,enableHiding:!0,filterFn:(i,a,l)=>{var f;const o=((f=i.getValue(a))==null?void 0:f.toString().toLowerCase())??"",r=l==null?void 0:l.toString().toLowerCase();return o.includes(r)},meta:{title:"Name"}},{accessorKey:"quality_rating",header:({column:i})=>U(X,{column:i,title:"Quality Rating"}),cell:({row:i})=>U("div",{class:"w-fit"},i.getValue("quality_rating")),enableSorting:!0,enableHiding:!0,enableColumnFilter:!0,filterFn:(i,a,l)=>{var f;const o=((f=i.getValue(a))==null?void 0:f.toString().toLowerCase())??"",r=l==null?void 0:l.toString().toLowerCase();return o.includes(r)},meta:{title:"Quality Rating"}},{accessorKey:"last_onboarded_time",header:({column:i})=>U(X,{column:i,title:i.columnDef.meta.title}),cell:({row:i})=>{const a=i.getValue("last_onboarded_time");if(!a||typeof a!="string"&&typeof a!="number")return U("div",{class:"w-fit"},"");const l={year:"numeric",month:"long",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},o=new Intl.DateTimeFormat("en-US",l).format(new Date(a));return U("div",{class:"w-fit"},o)},enableSorting:!0,enableHiding:!0,meta:{title:"Last Onboarded Time"}},{accessorKey:"display_phone_number",header:({column:i})=>U(X,{column:i,title:i.columnDef.meta.title}),cell:({row:i})=>U("div",{class:"w-fit"},i.getValue("display_phone_number")),enableSorting:!0,enableHiding:!0,meta:{title:"Display Phone Number"}},{accessorKey:"is_default_phone",header:({column:i})=>U(X,{column:i,title:i.columnDef.meta.title}),cell:({row:i})=>{const a=i.getValue("is_default_phone");return U(Ze,{variant:a?"success":"outline"},a?"YES":"NO")},enableSorting:!0,enableHiding:!0,meta:{title:"Default Phone"}},{id:"actions",cell:({row:i})=>U(Xt,{row:i})}],qt={class:"grid gap-4 py-4"},Gt={class:"grid grid-cols-4 items-center gap-4"},Yt=n("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Kt={class:"grid grid-cols-4 items-center gap-4"},Ot=n("span",{class:"absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"},"*",-1),Qt={class:"col-span-3"},Jt={class:"grid grid-cols-4 items-center gap-4"},Zt={class:"grid grid-cols-4 items-center gap-4"},ea={class:"grid grid-cols-4 items-center gap-4"},ta={class:"grid grid-cols-4 items-center gap-4"},aa={class:"grid grid-cols-4 items-center gap-4"},sa={class:"col-span-3"},la={key:0,class:"grid grid-cols-4 items-center gap-4"},na=M({__name:"EditCompanyModal",setup(i){const a=N({name:"",country:0,whatsapp_business_account_id:"",notes:"",is_active:!1,is_onboarded:!1,date_live:null}),l=N({is_loading:!1,is_open:!1,data:[{value:"",label:""}]}),o=I("");async function r(u,p){l.is_loading=!0;try{var _=`/api/country/list?search=${u}`;p&&(_+=`&current_country=${p}`);const g=await T.get(_,{withCredentials:!0,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});l.data=g.data.Result}catch(g){console.error("There was an error fetching the select list:",g)}finally{l.is_loading=!1}}const f=I(!1),h=I(!1),$=I(null),{toast:S}=q();Xe(o,Je.debounce(async u=>{l.is_open&&await r(u,a.country)},500));async function y(){try{const u=await T.get("/api/company/setup/");Object.assign(a,u.data.Result),a.country&&await r("",a.country)}catch{h.value=!1,S({title:"Whoops, something went wrong",description:"An unexpected error occurred",variant:"destructive"})}finally{f.value=!1}}function m(){var p;const u=[{condition:a.name==null||a.name=="",message:"Company name cannot be blank"},{condition:((p=a.country)==null?void 0:p.toString)==null,message:"Country cannot be blank"}];for(let _ of u)if(_.condition)return $.value=_.message,!1;return!0}async function b(){if(m()){f.value=!0;try{const p=await T.patch("/api/company/setup/",{...a},{headers:{"Content-Type":"application/json"}});x(),$.value="",S({title:p.data.Result,variant:"success"})}catch{S({title:"Whoops, something went wrong",description:"An unexpected error occurred",variant:"destructive"})}finally{f.value=!1}}}function x(){h.value=!h.value,h.value&&(y(),r(o.value))}function P(u){a.country=u.id,l.is_open=!1}function L(u){const p=new Date(u);a.date_live=tt(p,"yyyy-MM-dd")}function V(u){o.value=u.target.value}return(u,p)=>{const _=j("VIcon");return d(),w("div",null,[n("div",null,[e(t(k),{variant:"default",size:"sm",class:"p-2 px-3",onClick:x},{default:s(()=>[c(" Edit Company ")]),_:1})]),e(t(re),{open:h.value,"onUpdate:open":p[8]||(p[8]=g=>h.value=g)},{default:s(()=>[e(t(de),{isSideBar:!1,class:"sm:max-w-[700px]"},{default:s(()=>[e(t(ne),null,{default:s(()=>[e(t(oe),null,{default:s(()=>[c("Edit Company")]),_:1}),e(t(ie),null,{default:s(()=>[c(" Insert the details of the company here. Click edit when you're done. ")]),_:1})]),_:1}),n("div",qt,[n("div",Gt,[e(t(C),{for:"company_name",class:"text-right"},{default:s(()=>[c(" Company Name "),Yt]),_:1}),e(t(z),{id:"company_name",modelValue:a.name,"onUpdate:modelValue":p[0]||(p[0]=g=>a.name=g),placeholder:"George Sdn Bhd",class:"col-span-3"},null,8,["modelValue"])]),n("div",Kt,[e(t(C),{for:"country",class:"text-right leading-normal"},{default:s(()=>[c(" Country "),Ot]),_:1}),n("div",Qt,[e(t(Z),{open:l.is_open,"onUpdate:open":p[2]||(p[2]=g=>l.is_open=g)},{default:s(()=>[e(t(ee),{"as-child":""},{default:s(()=>[e(t(k),{variant:"outline",role:"combobox","aria-expanded":l.is_open,class:"w-full justify-between px-3",disabled:l.is_loading},{default:s(()=>{var g;return[c(D(a.country?(g=l.data.find(be=>be.id===a.country))==null?void 0:g.label:"Select Country")+" ",1),l.is_loading?(d(),v(_,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):(d(),v(_,{key:1,name:"fa-angle-down",class:"h-4 w-4 shrink-0 opacity-50"}))]}),_:1},8,["aria-expanded","disabled"])]),_:1}),e(t(te),{class:"w-[500px] p-1"},{default:s(()=>[e(t(me),null,{default:s(()=>[e(t(_e),{class:"h-9",modelValue:o.value,"onUpdate:modelValue":p[1]||(p[1]=g=>o.value=g),placeholder:"Search country...",onInput:V},null,8,["modelValue"]),e(t(fe),null,{default:s(()=>[c("No country found.")]),_:1}),e(t(ae),null,{default:s(()=>[e(t(ge),null,{default:s(()=>[(d(!0),w(B,null,W(l.data,g=>(d(),v(t(he),{key:g.id,value:g.value??"",onSelect:()=>P(g)},{default:s(()=>[c(D(g.label)+" ",1),e(_,{name:"fa-check",class:A(["ml-auto h-4 w-4",a.country===g.id?"opacity-100":"opacity-0"])},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["open"])])]),e(K),n("div",Jt,[e(t(C),{for:"whatsapp_business_id",class:"text-right"},{default:s(()=>[c(" Whatsapp Business ID ")]),_:1}),e(t(z),{id:"whatsapp_business_id",modelValue:a.whatsapp_business_account_id,"onUpdate:modelValue":p[3]||(p[3]=g=>a.whatsapp_business_account_id=g),placeholder:"XXXXXXXXXXXX",class:"col-span-3"},null,8,["modelValue"])]),e(K),n("div",Zt,[e(t(C),{for:"is_active",class:"text-right"},{default:s(()=>[c(" Notes ")]),_:1}),e(t(ve),{id:"is_active",modelValue:a.notes,"onUpdate:modelValue":p[4]||(p[4]=g=>a.notes=g),placeholder:"Leave your footnote here...",class:"col-span-3"},null,8,["modelValue"])]),n("div",ea,[e(t(C),{for:"is_active",class:"text-right"},{default:s(()=>[c(" Active ")]),_:1}),e(t(Y),{id:"is_active",checked:a.is_active,"onUpdate:checked":p[5]||(p[5]=g=>a.is_active=g),"update:open":"form.is_active = $event",class:"col-span-3"},null,8,["checked"])]),n("div",ta,[e(t(C),{for:"is_onboarded",class:"text-right"},{default:s(()=>[c(" Onboarded ")]),_:1}),e(t(Y),{id:"is_onboarded",checked:a.is_onboarded,"onUpdate:checked":p[6]||(p[6]=g=>a.is_onboarded=g),"update:open":"form.is_active = $event",class:"col-span-3"},null,8,["checked"])]),n("div",aa,[e(t(C),{for:"email",class:"text-right"},{default:s(()=>[c(" Active Date ")]),_:1}),n("div",sa,[e(t(Z),null,{default:s(()=>[e(t(ee),{"as-child":""},{default:s(()=>[e(t(k),{variant:"outline",class:A(t(se)("w-full justify-start text-left font-normal",!a.date_live&&"text-muted-foreground"))},{default:s(()=>[e(_,{name:"fa-regular-calendar-alt",class:"mr-2 h-4 w-4"}),n("span",null,D(a.date_live?a.date_live:"Pick a date"),1)]),_:1},8,["class"])]),_:1}),e(t(te),{class:"w-auto p-0"},{default:s(()=>[e(t(et),{"onUpdate:modelValue":p[7]||(p[7]=g=>L(g)),masks:{L:"YYYY-MM-DD"},modelConfig:{type:"string",mask:"YYYY/MM/DD"}})]),_:1})]),_:1})])])]),$.value?(d(),w("div",la,[e(t(C),{for:"name",class:"text-red-600 col-span-3 col-start-2"},{default:s(()=>[e(_,{name:"fa-exclamation-triangle",class:"size-4 fill-red-600"}),c(" "+D($.value),1)]),_:1})])):R("",!0),e(t(ce),{class:"flex justify-end"},{default:s(()=>[e(t(k),{type:"submit",onClick:b,disabled:f.value},{default:s(()=>[f.value?(d(),v(_,{key:0,name:"fa-circle-notch",animation:"spin",speed:"slow",class:"w-fit h-fit mr-2"})):R("",!0),c(" Edit")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])}}}),O=i=>(He("data-v-cbe32b44"),i=i(),qe(),i),oa=O(()=>n("h4",{class:"text-lg font-bold py-3"},"Company",-1)),ia={class:"w-full border-t-2 border-primary bg-secondary mb-5"},ra={class:"p-2"},da={class:"p-2"},ca=O(()=>n("h4",{class:"text-lg font-bold py-3"},"Management",-1)),ua={class:"w-full border-t-2 border-primary bg-secondary gap-4 overflow-auto"},pa={class:"pb-2"},ma=O(()=>n("td",{class:"p-2 text-sm w-1/4"},"Whatsapp Template",-1)),_a=O(()=>n("td",{class:"font-bold text-center"},"Created",-1)),fa={class:"px-2"},ga={class:"px-2"},ha=M({__name:"Import",setup(i){const a=H("phoneStore",E("phone")),l=N({is_loading:!1}),o=N({is_loading:!1}),r=N({is_loading:!1}),{toast:f}=q();async function h(){r.is_loading=!0;try{const m=await T.post("/api/refresh/company");await a.refresh(a.page_index),f({title:m.data.message,variant:"success"})}catch(m){var y=m.response.data.message||"";f({title:"Whoops, something went wrong",description:y,variant:"destructive"})}finally{r.is_loading=!1}}async function $(){l.is_loading=!0;try{const m=await T.post("/api/export/reminder-template");f({title:m.data.message,variant:"success"})}catch(m){var y=m.response.data.message||"";f({title:"Whoops, something went wrong",description:y,variant:"destructive"})}finally{l.is_loading=!1}}async function S(){o.is_loading=!0;try{const m=await T.post("/api/setup/template");f({title:m.data.message,variant:"success"})}catch(m){var y=m.response.data.message||"";f({title:"Whoops, something went wrong",description:y,variant:"destructive"})}finally{o.is_loading=!1}}return(y,m)=>{const b=j("VIcon");return d(),w("div",null,[oa,n("table",ia,[n("tr",null,[n("td",ra,[e(na)]),n("td",da,[e(t(k),{class:"flex ml-auto",onClick:m[0]||(m[0]=()=>h()),disabled:r.is_loading},{default:s(()=>[r.is_loading?(d(),v(b,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):R("",!0),e(b,{name:"fa-sync",class:"h-4 w-4 shrink-0 mr-2"}),c(" Business Account")]),_:1},8,["disabled"])])])]),ca,n("table",ua,[n("tr",pa,[ma,_a,n("td",fa,[e(t(k),{class:"my-2",onClick:m[1]||(m[1]=()=>$()),disabled:l.is_loading},{default:s(()=>[l.is_loading?(d(),v(b,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):R("",!0),e(b,{name:"fa-share-square",class:"h-4 w-4 shrink-0 mr-2"}),c(" Export Reminder Template")]),_:1},8,["disabled"])]),n("td",ga,[e(t(k),{class:"my-2 flex ml-auto",onClick:m[2]||(m[2]=()=>S()),disabled:o.is_loading},{default:s(()=>[o.is_loading?(d(),v(b,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):R("",!0),e(b,{name:"fa-sync",class:"h-4 w-4 shrink-0 mr-2"}),c(" Import")]),_:1},8,["disabled"])])])])])}}}),va=at(ha,[["__scopeId","data-v-cbe32b44"]]),ba={class:"p-8 space-y-4 h-full"},wa=n("div",{class:"flex items-center justify-between space-y-2"},[n("div",null,[n("h2",{class:"text-2xl font-bold tracking-tight"},"Setup")])],-1),ya=n("hr",null,null,-1),xa=n("div",{class:"flex items-center justify-between space-y-2 my-2"},[n("div",null,[n("h3",{class:"text-lg font-bold tracking-tight"},"Phone Number")])],-1),$a={class:"border-t-primary border-t-4 rounded"},Sa="/api/setup/phone",za=M({__name:"Setup",setup(i){const a=E("phone"),l=o=>({id:o.id,phone_number_id:o.whatsapp_id,display_phone_number:o.phone_number,verified_name:o.name,quality_rating:o.company_profile_details.quality_rating,platform_type:o.company_profile_details.platform_type,last_onboarded_time:o.company_profile_details.last_onboarded_time,is_default_phone:o.company_profile_details.is_default_phone});return Ge(()=>{a.fetch(Sa,0,l)}),Ke("phoneStore",a),Ye(()=>{a.$reset()}),(o,r)=>(d(),w("div",ba,[wa,ya,e(va),n("div",null,[xa,n("div",$a,[e(wt,{data:t(a).tasks,columns:t(Ht),class:"p-3"},null,8,["data","columns"])])])]))}});export{za as default};
