import{i as F,a0 as x,u as V,ag as C,A as N,b6 as O,e as P,ax as W,aK as A,o as E,c as J,aA as $,n as j,g as B}from"../main.js";function y(e){return typeof e=="function"?e():V(e)}typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const G=e=>typeof e<"u",D=()=>{};function I(e,t){function o(...n){return new Promise((i,u)=>{Promise.resolve(e(()=>t.apply(this,n),{fn:t,thisArg:this,args:n})).then(i).catch(u)})}return o}function M(e,t={}){let o,n,i=D;const u=l=>{clearTimeout(l),i(),i=D};return l=>{const d=y(e),c=y(t.maxWait);return o&&u(o),d<=0||c!==void 0&&c<=0?(n&&(u(n),n=null),Promise.resolve(l())):new Promise((f,g)=>{i=t.rejectOnCancel?g:f,c&&!n&&(n=setTimeout(()=>{o&&u(o),n=null,f(l())},c)),o=setTimeout(()=>{n&&u(n),n=null,f(l())},d)})}}function R(e,t=200,o={}){return I(M(t,o),e)}function q(e,t=200,o={}){const n=F(e.value),i=R(()=>{n.value=e.value},t,o);return x(e,()=>i()),n}function U(e){return JSON.parse(JSON.stringify(e))}function z(e,t,o,n={}){var i,u,a;const{clone:l=!1,passive:d=!1,eventName:c,deep:f=!1,defaultValue:g,shouldEmit:h}=n,r=O(),_=o||(r==null?void 0:r.emit)||((i=r==null?void 0:r.$emit)==null?void 0:i.bind(r))||((a=(u=r==null?void 0:r.proxy)==null?void 0:u.$emit)==null?void 0:a.bind(r==null?void 0:r.proxy));let m=c;t||(t="modelValue"),m=m||`update:${t.toString()}`;const T=s=>l?typeof l=="function"?l(s):U(s):s,w=()=>G(e[t])?T(e[t]):g,S=s=>{h?h(s)&&_(m,s):_(m,s)};if(d){const s=w(),v=F(s);let p=!1;return x(()=>e[t],b=>{p||(p=!0,v.value=T(b),C(()=>p=!1))}),x(v,b=>{!p&&(b!==e[t]||f)&&S(b)},{deep:f}),v}else return N({get(){return w()},set(s){S(s)}})}const H=P({__name:"Input",props:{defaultValue:{},modelValue:{},class:{}},emits:["update:modelValue"],setup(e,{emit:t}){const o=e,i=z(o,"modelValue",t,{passive:!0,defaultValue:o.defaultValue});return(u,a)=>W((E(),J("input",{"onUpdate:modelValue":a[0]||(a[0]=l=>$(i)?i.value=l:null),class:j(V(B)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",o.class))},null,2)),[[A,V(i)]])}});export{H as _,q as r,z as u};