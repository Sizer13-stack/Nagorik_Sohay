import {SEED} from './data';import {SEED_KB,SEED_BUDGET} from './kb';
const ld=(k,seed)=>{try{const r=localStorage.getItem(k);if(r)return JSON.parse(r);localStorage.setItem(k,JSON.stringify(seed));return seed}catch{return seed}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
export const getReports=()=>ld('cs_reports_v2',SEED);
export const addReport=r=>sv('cs_reports_v2',[r,...getReports()]);
export const updateReport=(id,p,note)=>sv('cs_reports_v2',getReports().map(r=>r.id===id?{...r,...p,events:[...r.events,{status:p.status||r.status,at:new Date().toISOString(),note:note||'upd'}]}:r));
export const getKB=()=>ld('cs_kb_v5',SEED_KB);
export const addSource=s=>sv('cs_kb_v5',[{...s,id:'u'+Date.now(),mock:false},...getKB()]);
export const delSource=id=>sv('cs_kb_v5',getKB().filter(s=>s.id!==id));
export const getBudget=()=>ld('cs_budget_v3',SEED_BUDGET);
export const setBudget=t=>sv('cs_budget_v3',t);
export const tk=s=>(s.toLowerCase().match(/[\p{L}\p{M}\p{N}]{2,}/gu)||[]);
// Extractive, source-grounded answer: never invents text outside the sources.
const mt=(t,keys)=>keys.some(k=>k===t||(t.length>=4&&k.length>=4&&(k.startsWith(t)||t.startsWith(k))));
export function answer(q,kb,lang){const P=(o,k)=>lang==='en'&&o[k+'_en']?o[k+'_en']:o[k];const qt=[...new Set(tk(q))];let best=null;
 for(const s of kb){const keys=tk([s.title,s.title_en,s.aliases].filter(Boolean).join(' '));const n=qt.filter(t=>mt(t,keys)).length;if(n&&(!best||n>best.n))best={s,n}}
 if(!best)return{answer:lang==='en'?"I'm not sure about this. I don't have verified information for this question. Please contact your local office, call the 333 helpline, or send the question to officials.":'আমি এ বিষয়ে নিশ্চিত নই। আমার কাছে এই প্রশ্নের যাচাই করা তথ্য নেই। স্থানীয় অফিসে যোগাযোগ করুন, ৩৩৩ হেল্পলাইনে ফোন করুন, বা প্রশ্নটি কর্মকর্তাদের কাছে পাঠান।',citations:[],confidence:'low',needs_human:true};
 const ss=P(best.s,'text').split(/(?<=[।.!?])\s+|\n+/).filter(Boolean).map(x=>({x,n:qt.filter(t=>mt(t,tk(x))).length})).sort((a,b)=>b.n-a.n).slice(0,2).map(o=>o.x).join(' ');
 const pend=!!best.s.pending;return{answer:ss,citations:[best.s],confidence:pend?'low':best.n>=2?'high':'medium',needs_human:pend}}
export function suggest(text,CATS){const t=text.toLowerCase();let b=null,n=0;for(const c of CATS){const s=c.k.filter(k=>t.includes(k.toLowerCase())).length;if(s>n){n=s;b=c.id}}
 return{cat:b,confidence:n>1?'high':n?'medium':'low',priority:/দুর্ঘটনা|বিপজ্জনক|accident|danger|খোলা/.test(t)?'high':'medium'}}
export function parseCSV(t){const [h,...r]=t.trim().split(/\r?\n/);const k=h.split(',').map(x=>x.trim());return r.map(l=>{const c=l.split(',');return Object.fromEntries(k.map((x,i)=>[x,(c[i]||'').trim()]))}).filter(o=>o.item)}
export function flagAnomalies(rows){const g={};rows.forEach(r=>(g[r.item]=g[r.item]||[]).push(+r.unit_price));
 const med=a=>{const s=[...a].sort((x,y)=>x-y);return s[Math.floor(s.length/2)]};
 return rows.map(r=>{const m=med(g[r.item]);const ratio=m?+r.unit_price/m:1;return{...r,median:m,ratio,flag:g[r.item].length>=3&&ratio>=1.5}})}
// Service-first retrieval for RAG: returns top chunks to send to the AI route.
export function retrieve(q,kb,k=3,loose=false){const qt=[...new Set(tk(q))];
 return kb.map(s=>{const keys=tk([s.title,s.title_en,s.aliases].filter(Boolean).join(' '));const body=tk([s.text,s.text_en].filter(Boolean).join(' '));
  const a=qt.filter(t=>mt(t,keys)).length,b=qt.filter(t=>mt(t,body)).length;return{s,a,sc:a*3+b}}).filter(x=>x.a>0||(loose&&x.sc>=2)).sort((x,y)=>y.sc-x.sc).slice(0,k)}
