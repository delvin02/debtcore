import{e as n,o,c as s,f as i,n as c,u as e,g as d,h as u}from"../main.js";const p=n({__name:"Badge",props:{variant:{},class:{}},setup(t){const a=t;return(r,l)=>(o(),s("div",{class:c(e(d)(e(f)({variant:r.variant}),a.class))},[i(r.$slots,"default")],2))}}),f=u("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});export{p as _};
