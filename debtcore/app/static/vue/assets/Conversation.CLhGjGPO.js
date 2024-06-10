import{e as g,ab as re,ac as ie,o as h,l as y,k as u,d as i,a as l,c as T,v as q,F as U,ad as le,u as s,ae as ee,n as N,g as C,t as v,m as te,Y as W,b as w,f as L,af as de,ag as ae,ah as ne,ai as ce,h as ue,x as D,r as V,s as X,aj as me,ak as fe,al as he,am as H,an as pe,ao as ve,ap as ge,i as B,G as be,aq as _e,ar as F,B as xe,as as we}from"../main.js";import{_ as ye}from"./index.DhdF1qMN.js";import{l as ke,g as Y,a as Ie,f as Te}from"./index.BccI3ZLR.js";import{r as b,t as p}from"./index.5qndC0qu.js";import{_ as Me}from"./_plugin-vue_export-helper.DlAUqK2U.js";import{_ as se,r as je}from"./Input.vue_vue_type_script_setup_true_lang.CSFnz65k.js";function R(a,e){b(2,arguments);var t=p(a),n=p(e),o=t.getTime()-n.getTime();return o<0?-1:o>0?1:o}function De(a,e){b(2,arguments);var t=p(a),n=p(e),o=t.getFullYear()-n.getFullYear(),d=t.getMonth()-n.getMonth();return o*12+d}function $e(a,e){return b(2,arguments),p(a).getTime()-p(e).getTime()}var J={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(e){return e<0?Math.ceil(e):Math.floor(e)}},Ce="trunc";function Le(a){return a?J[a]:J[Ce]}function Se(a){b(1,arguments);var e=p(a);return e.setHours(23,59,59,999),e}function Be(a){b(1,arguments);var e=p(a),t=e.getMonth();return e.setFullYear(e.getFullYear(),t+1,0),e.setHours(23,59,59,999),e}function Pe(a){b(1,arguments);var e=p(a);return Se(e).getTime()===Be(e).getTime()}function ze(a,e){b(2,arguments);var t=p(a),n=p(e),o=R(t,n),d=Math.abs(De(t,n)),r;if(d<1)r=0;else{t.getMonth()===1&&t.getDate()>27&&t.setDate(30),t.setMonth(t.getMonth()-o*d);var _=R(t,n)===-o;Pe(p(a))&&d===1&&R(a,n)===1&&(_=!1),r=o*(d-Number(_))}return r===0?0:r}function Re(a,e,t){b(2,arguments);var n=$e(a,e)/1e3;return Le(void 0)(n)}function oe(a,e){if(a==null)throw new TypeError("assign requires that input parameter not be null or undefined");for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(a[t]=e[t]);return a}function We(a){return oe({},a)}var K=1440,Ee=2520,A=43200,Ae=86400;function Ne(a,e,t){var n,o;b(2,arguments);var d=Ie(),r=(n=(o=t==null?void 0:t.locale)!==null&&o!==void 0?o:d.locale)!==null&&n!==void 0?n:ke;if(!r.formatDistance)throw new RangeError("locale must contain formatDistance property");var _=R(a,e);if(isNaN(_))throw new RangeError("Invalid time value");var m=oe(We(t),{addSuffix:!!(t!=null&&t.addSuffix),comparison:_}),k,M;_>0?(k=p(e),M=p(a)):(k=p(a),M=p(e));var I=Re(M,k),S=(Y(M)-Y(k))/1e3,c=Math.round((I-S)/60),f;if(c<2)return t!=null&&t.includeSeconds?I<5?r.formatDistance("lessThanXSeconds",5,m):I<10?r.formatDistance("lessThanXSeconds",10,m):I<20?r.formatDistance("lessThanXSeconds",20,m):I<40?r.formatDistance("halfAMinute",0,m):I<60?r.formatDistance("lessThanXMinutes",1,m):r.formatDistance("xMinutes",1,m):c===0?r.formatDistance("lessThanXMinutes",1,m):r.formatDistance("xMinutes",c,m);if(c<45)return r.formatDistance("xMinutes",c,m);if(c<90)return r.formatDistance("aboutXHours",1,m);if(c<K){var $=Math.round(c/60);return r.formatDistance("aboutXHours",$,m)}else{if(c<Ee)return r.formatDistance("xDays",1,m);if(c<A){var x=Math.round(c/K);return r.formatDistance("xDays",x,m)}else if(c<Ae)return f=Math.round(c/A),r.formatDistance("aboutXMonths",f,m)}if(f=ze(M,k),f<12){var j=Math.round(c/A);return r.formatDistance("xMonths",j,m)}else{var O=f%12,E=Math.floor(f/12);return O<3?r.formatDistance("aboutXYears",E,m):O<9?r.formatDistance("overXYears",E,m):r.formatDistance("almostXYears",E+1,m)}}function Ve(a,e){return b(1,arguments),Ne(a,Date.now(),e)}const He={class:"flex-1 flex flex-col gap-2 p-4 pt-0"},Oe=["onClick"],qe={class:"flex w-full flex-col gap-1"},Ue={class:"flex items-center"},Xe={class:"flex items-center gap-2"},Fe={class:"font-semibold"},Ye={key:0,class:"flex h-2 w-2 rounded-full bg-blue-600"},Je={class:"line-clamp-2 text-xs text-muted-foreground"},Ke={class:"flex items-center gap-2"},Ge=g({__name:"ConversationList",props:re({items:{}},{selectedConversation:{required:!1},selectedConversationModifiers:{}}),emits:["update:selectedConversation"],setup(a){const e=ie(a,"selectedConversation");function t(n){return["debt"].includes(n.toLowerCase())?"default":["important"].includes(n.toLowerCase())?"destructive":"secondary"}return(n,o)=>(h(),y(s(ee),{class:"flex-1"},{default:u(()=>[i("div",He,[l(le,{name:"list",appear:""},{default:u(()=>[(h(!0),T(U,null,q(n.items,d=>(h(),T("button",{key:d.id,class:N(s(C)("flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",e.value===d.id&&"bg-muted")),onClick:r=>e.value=d.id},[i("div",qe,[i("div",Ue,[i("div",Xe,[i("div",Fe,v(d.name),1),d.read?te("",!0):(h(),T("span",Ye))]),i("div",{class:N(s(C)("ml-auto text-xs",e.value===d.id?"text-foreground":"text-muted-foreground"))},v(s(Ve)(new Date(d.date),{addSuffix:!0})),3)]),l(W)]),i("div",Je,v(d.text.substring(0,300)),1),i("div",Ke,[(h(!0),T(U,null,q(d.labels,r=>(h(),y(s(ye),{key:r,variant:t(r)},{default:u(()=>[w(v(r),1)]),_:2},1032,["variant"]))),128))])],10,Oe))),128))]),_:1})])]),_:1}))}}),G=Me(Ge,[["__scopeId","data-v-e25f0711"]]),P=g({__name:"Avatar",props:{class:{},size:{default:"sm"},shape:{default:"circle"}},setup(a){const e=a;return(t,n)=>(h(),y(s(de),{class:N(s(C)(s(Qe)({size:t.size,shape:t.shape}),e.class))},{default:u(()=>[L(t.$slots,"default")]),_:3},8,["class"]))}}),z=g({__name:"AvatarFallback",props:{delayMs:{},asChild:{type:Boolean},as:{}},setup(a){const e=a;return(t,n)=>(h(),y(s(ce),ae(ne(e)),{default:u(()=>[L(t.$slots,"default")]),_:3},16))}}),Qe=ue("inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",{variants:{size:{sm:"h-10 w-10 text-xs",base:"h-16 w-16 text-2xl",lg:"h-32 w-32 text-5xl"},shape:{circle:"rounded-full",square:"rounded-md"}}}),Ze={key:0,class:"leading-[0px] overflow-y-hidden"},et={class:"flex items-start p-4"},tt={class:"flex items-start gap-4 text-sm"},at={class:"grid gap-1"},nt={class:"font-semibold"},st={class:"line-clamp-1 text-xs"},ot={key:0,class:"ml-auto text-xs text-muted-foreground"},rt={class:"flex md:w-2/3 lg:w-1/3 w-full ml-auto"},it={class:"flex flex-row-reverse"},lt={class:"flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"},dt={class:"flex md:w-2/3 lg:w-1/3 w-full"},ct={class:"flex"},ut=i("div",{class:"flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"}," Thanks! ",-1),mt={class:"flex md:w-2/3 lg:w-1/3 w-full"},ft={class:"flex"},ht={class:"flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"},pt={class:"flex-none box-border relative z-20"},vt={class:"p-4"},gt={class:"flex items-center gap-4"},bt={key:1,class:"p-8 text-center text-muted-foreground"},_t=g({__name:"ConversationDisplay",props:{conversation:{}},setup(a){const e=a,t=D(()=>{var n;return(n=e.conversation)==null?void 0:n.name.split(" ").map(o=>o[0]).join("")});return(n,o)=>{const d=V("VIcon");return n.conversation?(h(),T("div",Ze,[i("div",et,[i("div",tt,[l(s(P),null,{default:u(()=>[l(s(z),null,{default:u(()=>[w(v(t.value),1)]),_:1})]),_:1}),i("div",at,[i("div",nt,v(n.conversation.name),1),i("div",st,v(n.conversation.subject),1)])]),n.conversation.date?(h(),T("div",ot,v(s(Te)(new Date(n.conversation.date),"PPpp")),1)):te("",!0)]),l(s(W)),l(s(ee),{class:"flex-1"},{default:u(()=>[i("div",rt,[i("div",it,[l(s(P),{class:"flex mt-auto mr-2"},{default:u(()=>[l(s(z),null,{default:u(()=>[w(v(t.value),1)]),_:1})]),_:1}),i("div",lt,v(n.conversation.text),1)])]),i("div",dt,[i("div",ct,[l(s(P),{class:"flex mt-auto ml-2"},{default:u(()=>[l(s(z),null,{default:u(()=>[w(v(t.value),1)]),_:1})]),_:1}),ut])]),i("div",mt,[i("div",ft,[l(s(P),{class:"flex mt-auto ml-2"},{default:u(()=>[l(s(z),null,{default:u(()=>[w(v(t.value),1)]),_:1})]),_:1}),i("div",ht,v(n.conversation.text),1)])])]),_:1}),l(s(W),{class:"my-2"}),i("div",pt,[i("form",vt,[i("div",gt,[l(s(X),{type:"button",size:"sm",variant:"ghost"},{default:u(()=>[l(d,{name:"fa-paperclip",class:"h-full"})]),_:1}),l(s(se),{class:"p-4",placeholder:`Reply ${n.conversation.name}...`},null,8,["placeholder"]),l(s(X),{type:"button",size:"sm",class:"ml-auto"},{default:u(()=>[w(" Send ")]),_:1})])])])])):(h(),T("div",bt,"No message selected"))}}}),xt=g({__name:"Tabs",props:{defaultValue:{},orientation:{},dir:{},activationMode:{},modelValue:{},asChild:{type:Boolean},as:{}},emits:["update:modelValue"],setup(a,{emit:e}){const o=me(a,e);return(d,r)=>(h(),y(s(fe),ae(ne(s(o))),{default:u(()=>[L(d.$slots,"default")]),_:3},16))}}),Q=g({__name:"TabsTrigger",props:{value:{},disabled:{type:Boolean},asChild:{type:Boolean},as:{},class:{}},setup(a){const e=a,t=D(()=>{const{class:o,...d}=e;return d}),n=he(t);return(o,d)=>(h(),y(s(pe),H(s(n),{class:s(C)("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",e.class)}),{default:u(()=>[L(o.$slots,"default")]),_:3},16,["class"]))}}),wt=g({__name:"TabsList",props:{loop:{type:Boolean},asChild:{type:Boolean},as:{},class:{}},setup(a){const e=a,t=D(()=>{const{class:n,...o}=e;return o});return(n,o)=>(h(),y(s(ve),H(t.value,{class:s(C)("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",e.class)}),{default:u(()=>[L(n.$slots,"default")]),_:3},16,["class"]))}}),Z=g({__name:"TabsContent",props:{value:{},forceMount:{type:Boolean},asChild:{type:Boolean},as:{},class:{}},setup(a){const e=a,t=D(()=>{const{class:n,...o}=e;return o});return(n,o)=>(h(),y(s(ge),H({class:s(C)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",e.class)},t.value),{default:u(()=>[L(n.$slots,"default")]),_:3},16,["class"]))}}),yt={class:"flex"},kt={class:"basis-2/5 overflow-hidden h-full"},It={class:"text-xl font-bold text-green-600 flex items-center place-items-center"},Tt={class:"relative"},Mt={class:"w-full basis-4/5"},jt=g({__name:"Conversation",props:{accounts:{},conversations:{},defaultLayout:{default:()=>[265,440,655]},defaultCollapsed:{type:Boolean,default:!1}},setup(a){const e=a,t=B(e.conversations[0].id),n=B(""),o=je(n,250);var d=B(null),r=B(null),_=B(0),m=xe("height");const k=D(()=>{var $;let c=[];return(($=o.value)==null?void 0:$.trim())?c=e.conversations.filter(x=>x.name.includes(o.value)||x.email.includes(o.value)||x.name.includes(o.value)||x.subject.includes(o.value)||x.text.includes(o.value)):c=e.conversations,c}),M=D(()=>k.value.filter(c=>!c.read)),I=D(()=>e.conversations.find(c=>c.id===t.value)),S=()=>{we().then(()=>{var c,f;m&&(_.value=m.value-((((c=d.value)==null?void 0:c.clientHeight)||0)+(((f=r.value)==null?void 0:f.clientHeight)||0)))})};return be(()=>{S(),window.addEventListener("resize",S)}),_e(()=>{window.removeEventListener("resize",S)}),(c,f)=>{const $=V("VIcon"),x=V("Search");return h(),T("div",yt,[i("div",kt,[l(s(xt),{"default-value":"all",class:"border-r flex flex-col"},{default:u(()=>[i("div",{class:"flex items-center px-4 py-2",ref_key:"messageHeaderElement",ref:d},[i("h1",It,[l($,{name:"fa-whatsapp",class:"size-6 mr-2 fill-green-600 my-auto"}),w("Whatsapp Message ")]),l(s(wt),{class:"ml-auto"},{default:u(()=>[l(s(Q),{value:"all",class:"text-zinc-600 dark:text-zinc-200"},{default:u(()=>[w(" Read ")]),_:1}),l(s(Q),{value:"unread",class:"text-zinc-600 dark:text-zinc-200"},{default:u(()=>[w(" Unread ")]),_:1})]),_:1})],512),l(s(W)),i("div",{class:"bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60",ref_key:"searchHeaderElement",ref:r},[i("form",null,[i("div",Tt,[l(x,{class:"absolute left-2 top-2.5 size-4 text-muted-foreground"}),l(s(se),{modelValue:n.value,"onUpdate:modelValue":f[0]||(f[0]=j=>n.value=j),placeholder:"Search",class:"pl-8"},null,8,["modelValue"])])])],512),l(s(Z),{value:"all",class:"m-0"},{default:u(()=>[l(G,{"selected-conversation":t.value,"onUpdate:selectedConversation":f[1]||(f[1]=j=>t.value=j),items:k.value,style:F({height:s(_)+"px"})},null,8,["selected-conversation","items","style"])]),_:1}),l(s(Z),{value:"unread",class:"m-0"},{default:u(()=>[l(G,{"selected-conversation":t.value,"onUpdate:selectedConversation":f[2]||(f[2]=j=>t.value=j),items:M.value,class:"flex-grow"},null,8,["selected-conversation","items"])]),_:1})]),_:1})]),i("div",Mt,[l(_t,{conversation:I.value,style:F({height:s(m)+"px"}),class:"flex flex-col overflow-y-hidden"},null,8,["conversation","style"])])])}}}),Dt=[{id:"6c84fb90-12c4-11e1-840d-7b25c5ee775a",name:"William Smith",email:"williamsmith@example.com",subject:"Meeting Tomorrow",text:`Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.

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

It's sure to be a memorable experience! Samuel`,date:"2022-07-28T17:30:00",read:!1,labels:["personal"]}],$t=[{label:"Alicia Koch",email:"alicia@example.com",icon:"ion:logo-vercel"},{label:"Alicia Koch",email:"alicia@gmail.com",icon:"mdi:google"},{label:"Alicia Koch",email:"alicia@me.com",icon:"bx:bxl-gmail"}],Rt=g({__name:"Conversation",setup(a){return(e,t)=>(h(),y(jt,{accounts:s($t),conversations:s(Dt)},null,8,["accounts","conversations"]))}});export{Rt as default};
