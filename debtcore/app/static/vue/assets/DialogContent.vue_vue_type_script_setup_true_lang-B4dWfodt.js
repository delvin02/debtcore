import{d,C as B,o as c,j as p,f as r,k as i,B as h,D as y,u as e,E as C,G as $,c as D,l as P,m as f,s as _,P as x,I as g,L as k,M as O,e as u,O as z,H as v,J as S,K as A,a as E}from"../main.js";import{X as F}from"./Checkbox.vue_vue_type_script_setup_true_lang-ZWoxLJrn.js";const M=d({__name:"Dialog",props:{open:{type:Boolean},defaultOpen:{type:Boolean},modal:{type:Boolean},class:{}},emits:["update:open"],setup(a,{emit:t}){const o=B(a,t);return(n,m)=>(c(),p(e(C),h(y(e(o))),{default:r(()=>[i(n.$slots,"default")]),_:3},16))}}),N=d({__name:"DialogTrigger",props:{asChild:{type:Boolean},as:{}},setup(a){const t=a;return(s,l)=>(c(),p(e($),h(y(t)),{default:r(()=>[i(s.$slots,"default")]),_:3},16))}}),T=d({__name:"DialogHeader",props:{class:{}},setup(a){const t=a;return(s,l)=>(c(),D("div",{class:P(e(f)("flex flex-col gap-y-1.5 text-center sm:text-left",t.class))},[i(s.$slots,"default")],2))}}),V=d({__name:"DialogTitle",props:{asChild:{type:Boolean},as:{},class:{}},setup(a){const t=a,s=_(()=>{const{class:o,...n}=t;return n}),l=x(s);return(o,n)=>(c(),p(e(k),g(e(l),{class:e(f)("text-lg font-semibold leading-none tracking-tight",t.class)}),{default:r(()=>[i(o.$slots,"default")]),_:3},16,["class"]))}}),j=d({__name:"DialogDescription",props:{asChild:{type:Boolean},as:{},class:{}},setup(a){const t=a,s=_(()=>{const{class:o,...n}=t;return n}),l=x(s);return(o,n)=>(c(),p(e(O),g(e(l),{class:e(f)("text-sm text-muted-foreground",t.class)}),{default:r(()=>[i(o.$slots,"default")]),_:3},16,["class"]))}}),H=E("span",{class:"sr-only"},"Close",-1),G=d({__name:"DialogContent",props:{forceMount:{type:Boolean},trapFocus:{type:Boolean},disableOutsidePointerEvents:{type:Boolean},asChild:{type:Boolean},as:{},isSideBar:{type:Boolean},class:{}},emits:["escapeKeyDown","pointerDownOutside","focusOutside","interactOutside","openAutoFocus","closeAutoFocus"],setup(a,{emit:t}){const s=a,l=t,o=_(()=>{const{class:m,isSideBar:b,...w}=s;return w}),n=B(o,l);return(m,b)=>(c(),p(e(A),null,{default:r(()=>[u(e(z),{class:"fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"}),u(e(v),g(e(n),{class:e(f)("fixed z-50 grid w-full border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",{"right-0 top-0 w-[1200px] h-full sm:rounded-l-lg gap-2":s.isSideBar,"left-1/2 top-1/2 -translate-x-1/2 max-w-lg -translate-y-1/2 gap-4":!s.isSideBar},s.class)}),{default:r(()=>[i(m.$slots,"default"),u(e(S),{class:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"},{default:r(()=>[u(e(F),{class:"w-4 h-4"}),H]),_:1})]),_:3},16,["class"])]),_:3}))}});export{N as _,G as a,T as b,V as c,j as d,M as e};