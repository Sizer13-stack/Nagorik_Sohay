'use client';
import Link from 'next/link';import {WARDS,CATS,STATUS,HEAT} from '../lib/data';import {useL} from '../lib/i18n';
const POS={1:[110,220],2:[220,90],3:[370,120],4:[180,250],5:[430,230],6:[300,190],7:[70,130],8:[460,110],9:[330,285]};
export function WardMap({reports,layer}){const t=useL();const open=reports.filter(r=>r.status!=='done');
return<svg viewBox="0 0 520 320" role="img" aria-label={t('ওয়ার্ডভিত্তিক রিপোর্টের মানচিত্র (নমুনা)','Ward-level report map (sample)')} style={{width:'100%',height:'100%',minHeight:260,display:'block',background:'#e3ece6'}}>
<ellipse cx="90" cy="90" rx="70" ry="34" fill="#cfe0d4"/><ellipse cx="440" cy="270" rx="55" ry="30" fill="#cfe0d4"/>
<path d="M0 60Q150 40 260 0M0 150Q200 120 520 170M240 0Q290 120 250 320M360 0Q330 160 420 320M0 250Q220 280 520 230" stroke="#fff" strokeWidth="14" fill="none" strokeLinecap="round"/>
{WARDS.map(w=>{const n=open.filter(r=>r.ward===w.id).length;const [x,y]=POS[w.id];const hv=HEAT[w.id];const c=layer==='heat'?`hsl(${Math.round(120-(hv-33)*(120/5))},65%,42%)`:n>=2?'#b84a4a':n===1?'#c8861b':'#2f7d55';
return<g key={w.id}><circle cx={x} cy={y} r={15+n*4} fill={c} stroke="#fff" strokeWidth="3"/><text x={x} y={y+5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">{layer==='heat'?hv.toFixed(1):t.n(n)}</text><text x={x} y={y+36+n*4} textAnchor="middle" fontSize="11" fill="#33503c">{w[t.lang]}</text></g>})}</svg>}
export function RecentList({reports,limit=3}){const t=useL();const L=t.lang==='bn'?0:1;const SC={received:'#5a7ea6',review:'#c8861b',progress:'#2f7d55',done:'#7a8a80'};
const rs=[...reports].sort((a,b)=>new Date(b.created)-new Date(a.created)).slice(0,limit);
return<div>{rs.map(r=><Link key={r.id} href={'/track/'+r.id} style={{display:'block',padding:'12px 0',borderBottom:'1px solid var(--line)'}}><span className="badge" style={{color:SC[r.status],fontSize:12}}>{STATUS[r.status][L]}</span><div style={{fontWeight:600,margin:'4px 0 2px'}}>{t.lang==='en'&&r.desc_en?r.desc_en:r.desc}</div><div className="mut" style={{fontSize:13}}>{WARDS.find(w=>w.id===r.ward)?.[t.lang]} · {CATS.find(c=>c.id===r.cat)?.[t.lang]} · {t.d(r.created)}</div></Link>)}</div>}
