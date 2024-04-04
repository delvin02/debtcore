import{d as x,o as m,j as I,f as u,k as D,l as C,u as s,m as T,$ as se,B as Y,D as J,a0 as ne,N as oe,s as M,C as K,e as c,a1 as re,I as N,a2 as ie,a3 as le,R as de,a as l,c as w,q as H,F as V,a4 as ce,t as b,v as G,h as k,r as j,a5 as ue,n as me,a6 as fe,x as R,_ as he,a7 as pe,P as ge,a8 as ve,a9 as be,aa as _e,b as xe}from"../main.js";import{_ as Q}from"./ScrollArea.vue_vue_type_script_setup_true_lang-aYsCht8h.js";import{_ as we}from"./index-BJIJ_0qg.js";import{r as y,t as g,l as ye,g as O,a as ke,f as Ie}from"./index-TspuI3zQ.js";import{_ as Me}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{a as Te,r as je,_ as $e}from"./Input.vue_vue_type_script_setup_true_lang-BY2ADgF2.js";import{_ as De}from"./Textarea.vue_vue_type_script_setup_true_lang-DUPCxqNO.js";import{S as Be}from"./search-DgxQe8uN.js";const S=x({__name:"Avatar",props:{class:{},size:{default:"sm"},shape:{default:"circle"}},setup(t){const e=t;return(a,n)=>(m(),I(s(se),{class:C(s(T)(s(Se)({size:a.size,shape:a.shape}),e.class))},{default:u(()=>[D(a.$slots,"default")]),_:3},8,["class"]))}}),L=x({__name:"AvatarFallback",props:{delayMs:{},asChild:{type:Boolean},as:{}},setup(t){const e=t;return(a,n)=>(m(),I(s(ne),Y(J(e)),{default:u(()=>[D(a.$slots,"default")]),_:3},16))}}),Se=oe("inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",{variants:{size:{sm:"h-10 w-10 text-xs",base:"h-16 w-16 text-2xl",lg:"h-32 w-32 text-5xl"},shape:{circle:"rounded-full",square:"rounded-md"}}}),Le=x({__name:"Switch",props:{defaultChecked:{type:Boolean},checked:{type:Boolean},disabled:{type:Boolean},required:{type:Boolean},name:{},id:{},value:{},asChild:{type:Boolean},as:{},class:{}},emits:["update:checked"],setup(t,{emit:e}){const a=t,n=e,i=M(()=>{const{class:r,..._}=a;return _}),d=K(i,n);return(r,_)=>(m(),I(s(ie),N(s(d),{class:s(T)("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",a.class)}),{default:u(()=>[c(s(re),{class:C(s(T)("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"))},null,8,["class"])]),_:1},16,["class"]))}});function P(t,e){y(2,arguments);var a=g(t),n=g(e),i=a.getTime()-n.getTime();return i<0?-1:i>0?1:i}function Re(t,e){y(2,arguments);var a=g(t),n=g(e),i=a.getFullYear()-n.getFullYear(),d=a.getMonth()-n.getMonth();return i*12+d}function Pe(t,e){return y(2,arguments),g(t).getTime()-g(e).getTime()}var E={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(e){return e<0?Math.ceil(e):Math.floor(e)}},Ce="trunc";function Ne(t){return t?E[t]:E[Ce]}function We(t){y(1,arguments);var e=g(t);return e.setHours(23,59,59,999),e}function Ae(t){y(1,arguments);var e=g(t),a=e.getMonth();return e.setFullYear(e.getFullYear(),a+1,0),e.setHours(23,59,59,999),e}function ze(t){y(1,arguments);var e=g(t);return We(e).getTime()===Ae(e).getTime()}function He(t,e){y(2,arguments);var a=g(t),n=g(e),i=P(a,n),d=Math.abs(Re(a,n)),r;if(d<1)r=0;else{a.getMonth()===1&&a.getDate()>27&&a.setDate(30),a.setMonth(a.getMonth()-i*d);var _=P(a,n)===-i;ze(g(t))&&d===1&&P(t,n)===1&&(_=!1),r=i*(d-Number(_))}return r===0?0:r}function Ve(t,e,a){y(2,arguments);var n=Pe(t,e)/1e3;return Ne(a==null?void 0:a.roundingMethod)(n)}function Z(t,e){if(t==null)throw new TypeError("assign requires that input parameter not be null or undefined");for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}function Oe(t){return Z({},t)}var q=1440,Ee=2520,A=43200,qe=86400;function Xe(t,e,a){var n,i;y(2,arguments);var d=ke(),r=(n=(i=a==null?void 0:a.locale)!==null&&i!==void 0?i:d.locale)!==null&&n!==void 0?n:ye;if(!r.formatDistance)throw new RangeError("locale must contain formatDistance property");var _=P(t,e);if(isNaN(_))throw new RangeError("Invalid time value");var o=Z(Oe(a),{addSuffix:!!(a!=null&&a.addSuffix),comparison:_}),f,p;_>0?(f=g(e),p=g(t)):(f=g(t),p=g(e));var v=Ve(p,f),B=(O(p)-O(f))/1e3,h=Math.round((v-B)/60),$;if(h<2)return a!=null&&a.includeSeconds?v<5?r.formatDistance("lessThanXSeconds",5,o):v<10?r.formatDistance("lessThanXSeconds",10,o):v<20?r.formatDistance("lessThanXSeconds",20,o):v<40?r.formatDistance("halfAMinute",0,o):v<60?r.formatDistance("lessThanXMinutes",1,o):r.formatDistance("xMinutes",1,o):h===0?r.formatDistance("lessThanXMinutes",1,o):r.formatDistance("xMinutes",h,o);if(h<45)return r.formatDistance("xMinutes",h,o);if(h<90)return r.formatDistance("aboutXHours",1,o);if(h<q){var ee=Math.round(h/60);return r.formatDistance("aboutXHours",ee,o)}else{if(h<Ee)return r.formatDistance("xDays",1,o);if(h<A){var ae=Math.round(h/q);return r.formatDistance("xDays",ae,o)}else if(h<qe)return $=Math.round(h/A),r.formatDistance("aboutXMonths",$,o)}if($=He(p,f),$<12){var te=Math.round(h/A);return r.formatDistance("xMonths",te,o)}else{var z=$%12,W=Math.floor($/12);return z<3?r.formatDistance("aboutXYears",W,o):z<9?r.formatDistance("overXYears",W,o):r.formatDistance("almostXYears",W+1,o)}}function Fe(t,e){return y(1,arguments),Xe(t,Date.now(),e)}const Ue={class:"flex-1 flex flex-col gap-2 p-4 pt-0"},Ye=["onClick"],Je={class:"flex w-full flex-col gap-1"},Ke={class:"flex items-center"},Ge={class:"flex items-center gap-2"},Qe={class:"font-semibold"},Ze={key:0,class:"flex h-2 w-2 rounded-full bg-blue-600"},ea={class:"text-xs font-medium"},aa={class:"line-clamp-2 text-xs text-muted-foreground"},ta={class:"flex items-center gap-2"},sa=x({__name:"MailList",props:le({items:{}},{selectedMail:{required:!1},selectedMailModifiers:{}}),emits:["update:selectedMail"],setup(t){const e=de(t,"selectedMail");function a(n){return["debt"].includes(n.toLowerCase())?"default":["important"].includes(n.toLowerCase())?"destructive":"secondary"}return(n,i)=>(m(),I(s(Q),{class:"h-[80vh] flex"},{default:u(()=>[l("div",Ue,[c(ce,{name:"list",appear:""},{default:u(()=>[(m(!0),w(V,null,H(n.items,d=>(m(),w("button",{key:d.id,class:C(s(T)("flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",e.value===d.id&&"bg-muted")),onClick:r=>e.value=d.id},[l("div",Je,[l("div",Ke,[l("div",Ge,[l("div",Qe,b(d.name),1),d.read?G("",!0):(m(),w("span",Ze))]),l("div",{class:C(s(T)("ml-auto text-xs",e.value===d.id?"text-foreground":"text-muted-foreground"))},b(s(Fe)(new Date(d.date),{addSuffix:!0})),3)]),l("div",ea,b(d.subject),1)]),l("div",aa,b(d.text.substring(0,300)),1),l("div",ta,[(m(!0),w(V,null,H(d.labels,r=>(m(),I(s(we),{key:r,variant:a(r)},{default:u(()=>[k(b(r),1)]),_:2},1032,["variant"]))),128))])],10,Ye))),128))]),_:1})])]),_:1}))}}),X=Me(sa,[["__scopeId","data-v-ec103d30"]]),na={class:"flex h-full flex-col"},oa={class:"flex items-start gap-4 text-sm"},ra={class:"grid gap-1"},ia={class:"font-semibold"},la={class:"line-clamp-1 text-xs"},da={key:0,class:"ml-auto text-xs text-muted-foreground"},ca={class:"flex md:w-2/3 lg:w-1/3 w-full ml-auto"},ua={class:"flex flex-row-reverse"},ma={class:"flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"},fa={class:"flex md:w-2/3 lg:w-1/3 w-full"},ha={class:"flex"},pa=l("div",{class:"flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"}," Thanks! ",-1),ga={class:"flex md:w-2/3 lg:w-1/3 w-full"},va={class:"flex"},ba={class:"flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"},_a={class:"p-4"},xa={class:"grid gap-4"},wa={class:"flex items-center"},ya={key:1,class:"p-8 text-center text-muted-foreground"},ka=x({__name:"MailDisplay",props:{mail:{}},setup(t){const e=t,a=M(()=>{var o;return(o=e.mail)==null?void 0:o.name.split(" ").map(f=>f[0]).join("")}),n=j(null),i=j(null),d=j(null),r=j("0px"),_=()=>{fe(()=>{var v,B,h;const o=((v=i.value)==null?void 0:v.offsetHeight)??0,f=((B=d.value)==null?void 0:B.offsetHeight)??0,p=((h=n.value)==null?void 0:h.offsetHeight)??0;r.value=`${p-(o+f+30)}px`,console.log(r.value)})};return ue(()=>{_()}),(o,f)=>(m(),w("div",na,[c(s(R)),o.mail?(m(),w("div",{key:0,class:"flex flex-1 flex-col leading-[0px] items-stretch",ref_key:"wrapperRef",ref:n},[l("div",{class:"flex items-start p-4",ref_key:"chatHeaderRef",ref:i},[l("div",oa,[c(s(S),null,{default:u(()=>[c(s(L),null,{default:u(()=>[k(b(a.value),1)]),_:1})]),_:1}),l("div",ra,[l("div",ia,b(o.mail.name),1),l("div",la,b(o.mail.subject),1)])]),o.mail.date?(m(),w("div",da,b(s(Ie)(new Date(o.mail.date),"PPpp")),1)):G("",!0)],512),c(s(R)),c(s(Q),{style:me({height:r.value})},{default:u(()=>[l("div",ca,[l("div",ua,[c(s(S),{class:"flex mt-auto mr-2"},{default:u(()=>[c(s(L),null,{default:u(()=>[k(b(a.value),1)]),_:1})]),_:1}),l("div",ma,b(o.mail.text),1)])]),l("div",fa,[l("div",ha,[c(s(S),{class:"flex mt-auto ml-2"},{default:u(()=>[c(s(L),null,{default:u(()=>[k(b(a.value),1)]),_:1})]),_:1}),pa])]),l("div",ga,[l("div",va,[c(s(S),{class:"flex mt-auto ml-2"},{default:u(()=>[c(s(L),null,{default:u(()=>[k(b(a.value),1)]),_:1})]),_:1}),l("div",ba,b(o.mail.text),1)])])]),_:1},8,["style"]),c(s(R),{class:"my-2"}),l("div",{class:"flex-none box-border relative min-h-[160px] z-20",ref_key:"sendMessageRef",ref:d},[l("form",_a,[l("div",xa,[c(s(De),{class:"p-4",placeholder:`Reply ${o.mail.name}...`},null,8,["placeholder"]),l("div",wa,[c(s(Te),{"html-for":"mute",class:"flex items-center gap-2 text-xs font-normal"},{default:u(()=>[c(s(Le),{id:"mute","aria-label":"Mute thread"}),k(" Mute this thread ")]),_:1}),c(s(he),{type:"button",size:"sm",class:"ml-auto"},{default:u(()=>[k(" Send ")]),_:1})])])])],512)],512)):(m(),w("div",ya,"No message selected"))]))}}),Ia=x({__name:"Tabs",props:{defaultValue:{},orientation:{},dir:{},activationMode:{},modelValue:{},asChild:{type:Boolean},as:{}},emits:["update:modelValue"],setup(t,{emit:e}){const i=K(t,e);return(d,r)=>(m(),I(s(pe),Y(J(s(i))),{default:u(()=>[D(d.$slots,"default")]),_:3},16))}}),F=x({__name:"TabsTrigger",props:{value:{},disabled:{type:Boolean},asChild:{type:Boolean},as:{},class:{}},setup(t){const e=t,a=M(()=>{const{class:i,...d}=e;return d}),n=ge(a);return(i,d)=>(m(),I(s(ve),N(s(n),{class:s(T)("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",e.class)}),{default:u(()=>[D(i.$slots,"default")]),_:3},16,["class"]))}}),Ma=x({__name:"TabsList",props:{loop:{type:Boolean},asChild:{type:Boolean},as:{},class:{}},setup(t){const e=t,a=M(()=>{const{class:n,...i}=e;return i});return(n,i)=>(m(),I(s(be),N(a.value,{class:s(T)("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",e.class)}),{default:u(()=>[D(n.$slots,"default")]),_:3},16,["class"]))}}),U=x({__name:"TabsContent",props:{value:{},forceMount:{type:Boolean},asChild:{type:Boolean},as:{},class:{}},setup(t){const e=t,a=M(()=>{const{class:n,...i}=e;return i});return(n,i)=>(m(),I(s(_e),N({class:s(T)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",e.class)},a.value),{default:u(()=>[D(n.$slots,"default")]),_:3},16,["class"]))}}),Ta={class:"flex"},ja={class:"basis-2/5 overflow-hidden"},$a={class:"flex items-center px-4 py-2"},Da=l("h1",{class:"text-xl font-bold"},"Whatsapp Message",-1),Ba={class:"bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"},Sa={class:"relative"},La={class:"w-full basis-4/5 flex-grow"},Ra=x({__name:"Message",props:{accounts:{},mails:{},defaultLayout:{default:()=>[265,440,655]},defaultCollapsed:{type:Boolean,default:!1}},setup(t){const e=t;j(e.defaultCollapsed);const a=j(e.mails[0].id),n=j(""),i=je(n,250),d=M(()=>{var p;let o=[];return((p=i.value)==null?void 0:p.trim())?o=e.mails.filter(v=>v.name.includes(i.value)||v.email.includes(i.value)||v.name.includes(i.value)||v.subject.includes(i.value)||v.text.includes(i.value)):o=e.mails,o}),r=M(()=>d.value.filter(o=>!o.read)),_=M(()=>e.mails.find(o=>o.id===a.value));return(o,f)=>(m(),w("div",Ta,[l("div",ja,[c(s(Ia),{"default-value":"all",class:"border-r"},{default:u(()=>[l("div",$a,[Da,c(s(Ma),{class:"ml-auto"},{default:u(()=>[c(s(F),{value:"all",class:"text-zinc-600 dark:text-zinc-200"},{default:u(()=>[k(" Read ")]),_:1}),c(s(F),{value:"unread",class:"text-zinc-600 dark:text-zinc-200"},{default:u(()=>[k(" Unread ")]),_:1})]),_:1})]),c(s(R)),l("div",Ba,[l("form",null,[l("div",Sa,[c(s(Be),{class:"absolute left-2 top-2.5 size-4 text-muted-foreground"}),c(s($e),{modelValue:n.value,"onUpdate:modelValue":f[0]||(f[0]=p=>n.value=p),placeholder:"Search",class:"pl-8"},null,8,["modelValue"])])])]),c(s(U),{value:"all",class:"m-0"},{default:u(()=>[c(X,{"selected-mail":a.value,"onUpdate:selectedMail":f[1]||(f[1]=p=>a.value=p),items:d.value},null,8,["selected-mail","items"])]),_:1}),c(s(U),{value:"unread",class:"m-0"},{default:u(()=>[c(X,{"selected-mail":a.value,"onUpdate:selectedMail":f[2]||(f[2]=p=>a.value=p),items:r.value},null,8,["selected-mail","items"])]),_:1})]),_:1})]),l("div",La,[c(ka,{mail:_.value},null,8,["mail"])])]))}}),Pa=[{id:"6c84fb90-12c4-11e1-840d-7b25c5ee775a",name:"William Smith",email:"williamsmith@example.com",subject:"Meeting Tomorrow",text:`Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.

Please come prepared with any questions or insights you may have. Looking forward to our meeting!

Best regards, William`,date:"2023-10-22T09:00:00",read:!0,labels:["meeting","debt","important"]},{id:"110e8400-e29b-11d4-a716-446655440000",name:"Alice Smith",email:"alicesmith@example.com",subject:"Re: Project Update",text:`Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.

I have a few minor suggestions that I'll include in the attached document.

Let's discuss these during our next meeting. Keep up the excellent work!

Best regards, Alice`,date:"2023-10-22T10:30:00",read:!0,labels:["work","important"]},{id:"3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",name:"Bob Johnson",email:"bobjohnson@example.com",subject:"Weekend Plans",text:`Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.

If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.

Looking forward to your response!

Best, Bob`,date:"2023-04-10T11:45:00",read:!0,labels:["personal"]},{id:"61c35085-72d7-42b4-8d62-738f700d4b92",name:"Emily Davis",email:"emilydavis@example.com",subject:"Re: Question about Budget",text:`I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.

I've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.

I've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.

Thanks, Emily`,date:"2023-03-25T13:15:00",read:!1,labels:["work","budget"]},{id:"8f7b5db9-d935-4e42-8e05-1f1d0a3dfb97",name:"Michael Wilson",email:"michaelwilson@example.com",subject:"Important Announcement",text:`I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. We've received valuable feedback from our beta testers, and I believe it's time to make some adjustments to better meet our customers' needs.

This change is crucial to our success, and I look forward to discussing it with the team. Please be prepared to share your insights during the meeting.

Regards, Michael`,date:"2023-03-10T15:00:00",read:!1,labels:["meeting","work","important"]},{id:"1f0f2c02-e299-40de-9b1d-86ef9e42126b",name:"Sarah Brown",email:"sarahbrown@example.com",subject:"Re: Feedback on Proposal",text:`Thank you for your feedback on the proposal. It looks great! I'm pleased to hear that you found it promising. The team worked diligently to address all the key points you raised, and I believe we now have a strong foundation for the project.

I've attached the revised proposal for your review.

Please let me know if you have any further comments or suggestions. Looking forward to your response.

Best regards, Sarah`,date:"2023-02-15T16:30:00",read:!0,labels:["work"]},{id:"17c0a96d-4415-42b1-8b4f-764efab57f66",name:"David Lee",email:"davidlee@example.com",subject:"New Project Idea",text:`I have an exciting new project idea to discuss with you. It involves expanding our services to target a niche market that has shown considerable growth in recent months.

I've prepared a detailed proposal outlining the potential benefits and the strategy for execution.

This project has the potential to significantly impact our business positively. Let's set up a meeting to dive into the details and determine if it aligns with our current goals.

Best regards, David`,date:"2023-01-28T17:45:00",read:!1,labels:["meeting","work","important"]},{id:"2f0130cb-39fc-44c4-bb3c-0a4337edaaab",name:"Olivia Wilson",email:"oliviawilson@example.com",subject:"Vacation Plans",text:`Let's plan our vacation for next month. What do you think? I've been thinking of visiting a tropical paradise, and I've put together some destination options.

I believe it's time for us to unwind and recharge. Please take a look at the options and let me know your preferences.

We can start making arrangements to ensure a smooth and enjoyable trip.

Excited to hear your thoughts! Olivia`,date:"2022-12-20T18:30:00",read:!0,labels:["personal"]},{id:"de305d54-75b4-431b-adb2-eb6b9e546014",name:"James Martin",email:"jamesmartin@example.com",subject:"Re: Conference Registration",text:`I've completed the registration for the conference next month. The event promises to be a great networking opportunity, and I'm looking forward to attending the various sessions and connecting with industry experts.

I've also attached the conference schedule for your reference.

If there are any specific topics or sessions you'd like me to explore, please let me know. It's an exciting event, and I'll make the most of it.

Best regards, James`,date:"2022-11-30T19:15:00",read:!0,labels:["work","conference"]},{id:"7dd90c63-00f6-40f3-bd87-5060a24e8ee7",name:"Sophia White",email:"sophiawhite@example.com",subject:"Team Dinner",text:`Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication.

I've made reservations at a lovely restaurant, and I'm sure it'll be an enjoyable evening.

Please confirm your availability and any dietary preferences. Looking forward to a fun and memorable dinner with the team!

Best, Sophia`,date:"2022-11-05T20:30:00",read:!1,labels:["meeting","work"]},{id:"99a88f78-3eb4-4d87-87b7-7b15a49a0a05",name:"Daniel Johnson",email:"danieljohnson@example.com",subject:"Feedback Request",text:`I'd like your feedback on the latest project deliverables. We've made significant progress, and I value your input to ensure we're on the right track.

I've attached the deliverables for your review, and I'm particularly interested in any areas where you think we can further enhance the quality or efficiency.

Your feedback is invaluable, and I appreciate your time and expertise. Let's work together to make this project a success.

Regards, Daniel`,date:"2022-10-22T09:30:00",read:!1,labels:["work"]},{id:"f47ac10b-58cc-4372-a567-0e02b2c3d479",name:"Ava Taylor",email:"avataylor@example.com",subject:"Re: Meeting Agenda",text:`Here's the agenda for our meeting next week. I've included all the topics we need to cover, as well as time allocations for each.

If you have any additional items to discuss or any specific points to address, please let me know, and we can integrate them into the agenda.

It's essential that our meeting is productive and addresses all relevant matters.

Looking forward to our meeting! Ava`,date:"2022-10-10T10:45:00",read:!0,labels:["meeting","work"]},{id:"c1a0ecb4-2540-49c5-86f8-21e5ce79e4e6",name:"William Anderson",email:"williamanderson@example.com",subject:"Product Launch Update",text:`The product launch is on track. I'll provide an update during our call. We've made substantial progress in the development and marketing of our new product.

I'm excited to share the latest updates with you during our upcoming call. It's crucial that we coordinate our efforts to ensure a successful launch. Please come prepared with any questions or insights you may have.

Let's make this product launch a resounding success!

Best regards, William`,date:"2022-09-20T12:00:00",read:!1,labels:["meeting","work","important"]},{id:"ba54eefd-4097-4949-99f2-2a9ae4d1a836",name:"Mia Harris",email:"miaharris@example.com",subject:"Re: Travel Itinerary",text:`I've received the travel itinerary. It looks great! Thank you for your prompt assistance in arranging the details. I've reviewed the schedule and the accommodations, and everything seems to be in order. I'm looking forward to the trip, and I'm confident it'll be a smooth and enjoyable experience.

If there are any specific activities or attractions you recommend at our destination, please feel free to share your suggestions.

Excited for the trip! Mia`,date:"2022-09-10T13:15:00",read:!0,labels:["personal","travel"]},{id:"df09b6ed-28bd-4e0c-85a9-9320ec5179aa",name:"Ethan Clark",email:"ethanclark@example.com",subject:"Team Building Event",text:`Let's plan a team-building event for our department. Team cohesion and morale are vital to our success, and I believe a well-organized team-building event can be incredibly beneficial. I've done some research and have a few ideas for fun and engaging activities.

Please let me know your thoughts and availability. We want this event to be both enjoyable and productive.

Together, we'll strengthen our team and boost our performance.

Regards, Ethan`,date:"2022-08-25T15:30:00",read:!1,labels:["meeting","work"]},{id:"d67c1842-7f8b-4b4b-9be1-1b3b1ab4611d",name:"Chloe Hall",email:"chloehall@example.com",subject:"Re: Budget Approval",text:`The budget has been approved. We can proceed with the project. I'm delighted to inform you that our budget proposal has received the green light from the finance department. This is a significant milestone, and it means we can move forward with the project as planned.

I've attached the finalized budget for your reference. Let's ensure that we stay on track and deliver the project on time and within budget.

It's an exciting time for us! Chloe`,date:"2022-08-10T16:45:00",read:!0,labels:["work","budget"]},{id:"6c9a7f94-8329-4d70-95d3-51f68c186ae1",name:"Samuel Turner",email:"samuelturner@example.com",subject:"Weekend Hike",text:`Who's up for a weekend hike in the mountains? I've been craving some outdoor adventure, and a hike in the mountains sounds like the perfect escape. If you're up for the challenge, we can explore some scenic trails and enjoy the beauty of nature.

I've done some research and have a few routes in mind.

Let me know if you're interested, and we can plan the details.

It's sure to be a memorable experience! Samuel`,date:"2022-07-28T17:30:00",read:!1,labels:["personal"]}],Ca=[{label:"Alicia Koch",email:"alicia@example.com",icon:"ion:logo-vercel"},{label:"Alicia Koch",email:"alicia@gmail.com",icon:"mdi:google"},{label:"Alicia Koch",email:"alicia@me.com",icon:"bx:bxl-gmail"}],Na={class:"flex-1"},Wa={class:"md:hidden"},Aa={class:"hidden md:flex"},Ua=x({__name:"Message",setup(t){return(e,a)=>{const n=xe("VPImage");return m(),w("div",Na,[l("div",Wa,[c(n,{alt:"Tasks",width:"1280",height:"1214",class:"block",image:{dark:"/examples/tasks-dark.png",light:"/examples/tasks-light.png"}},null,8,["image"])]),l("div",Aa,[c(Ra,{accounts:s(Ca),mails:s(Pa)},null,8,["accounts","mails"])])])}}});export{Ua as default};