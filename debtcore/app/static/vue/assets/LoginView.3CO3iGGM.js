import{e as g,o as n,c as b,f as k,n as C,u as s,g as $,h as j,i as u,j as z,r as _,d as e,w as N,a as l,k as i,l as h,m as w,p as B,q as I,b as f,_ as y,s as q,t as E}from"../main.js";import{_ as V}from"./Input.vue_vue_type_script_setup_true_lang.CSFnz65k.js";const L=g({__name:"Alert",props:{class:{},variant:{}},setup(d){const a=d;return(t,m)=>(n(),b("div",{class:C(s($)(s(P)({variant:t.variant}),a.class)),role:"alert"},[k(t.$slots,"default")],2))}}),M=g({__name:"AlertDescription",props:{class:{}},setup(d){const a=d;return(t,m)=>(n(),b("div",{class:C(s($)("text-sm [&_p]:leading-relaxed",a.class))},[k(t.$slots,"default")],2))}}),P=j("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),U={class:"h-screen w-full flex flex-col"},R={class:"relative flex-col items-center p-4 md:p-0 justify-center md:grid lg:max-w-none lg:grid-cols-3 lg:px-0 overflow-hidden h-full bg-background shadow-md md:shadow-xl"},T=B('<div class="hidden md:block relative h-full col-span-2 flex-col bg-muted p-10 text-white lg:flex dark:border-r"><div class="absolute inset-0 bg-zinc-900"></div><div class="relative z-20 flex items-center text-lg font-medium"> DebtCore </div><div class="relative z-20 mt-auto"><blockquote class="space-y-2"><p class="text-lg">Debt collection made easy.</p><footer class="text-sm">Delvin</footer></blockquote></div></div>',1),F={class:"flex h-full justify-center items-center my-auto self-center p-4 lg:p-8"},G={class:"mx-auto flex my-auto w-full flex-col justify-center space-y-6 sm:w-[350px]"},H=e("div",{class:"flex flex-col space-y-2"},[e("h1",{class:"text-2xl font-semibold tracking-tight"},"Login"),e("p",{class:"text-sm text-muted-foreground"}," Enter your credentials below to sign in. ")],-1),J={class:"grid gap-6"},K={class:"grid gap-2"},O={class:"grid gap-1"},Q=e("p",{class:"px-8 text-center text-sm text-muted-foreground"}," © 2022 - 2024 DebtCore | All rights reserved ",-1),Y=g({__name:"LoginView",setup(d){const a=u(""),t=u(""),m=I(),A=z(),r=u(""),o=u(!1),D=async()=>{if(o.value=!0,a.value.trim()===""){r.value="Invalid email",o.value=!1;return}if(t.value===""){r.value="Password cannot be blank",o.value=!1;return}const p=await A.login(a.value,t.value);p?r.value=p:m.push("/dashboard"),o.value=!1};return(p,c)=>{const x=_("VIcon"),S=_("AlertCircle");return n(),b("div",U,[e("div",R,[T,e("div",F,[e("div",G,[H,e("div",J,[e("form",{onSubmit:N(D,["prevent"])},[e("div",K,[e("div",O,[l(s(y),{class:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only",for:"email"},{default:i(()=>[f("Email")]),_:1}),l(s(V),{class:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",id:"email",placeholder:"name@example.com",autocapitalize:"none",autocomplete:"email",autocorrect:"off",modelValue:a.value,"onUpdate:modelValue":c[0]||(c[0]=v=>a.value=v)},null,8,["modelValue"]),l(s(y),{class:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only",for:"password"},{default:i(()=>[f("Password")]),_:1}),l(s(V),{class:"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",id:"password",placeholder:"*******",autocorrect:"off",type:"password",modelValue:t.value,"onUpdate:modelValue":c[1]||(c[1]=v=>t.value=v)},null,8,["modelValue"])]),l(s(q),{disabled:o.value,class:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"},{default:i(()=>[o.value?(n(),h(x,{key:0,name:"fa-circle-notch",animation:"spin",class:"w-4 h-4 mr-2"})):w("",!0),f(" Sign In ")]),_:1},8,["disabled"])])],32),r.value?(n(),h(s(L),{key:0,variant:"destructive",class:"p-2 text-center"},{default:i(()=>[l(S,{class:"w-2 h-2"}),l(s(M),null,{default:i(()=>[l(x,{name:"fa-exclamation-triangle",class:"w-4 h-4"}),f(" "+E(r.value),1)]),_:1})]),_:1})):w("",!0)]),Q])])])])}}});export{Y as default};
