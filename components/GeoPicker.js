'use client';
import {useGeo,nm} from '../lib/geo';import {useL} from '../lib/i18n';
export default function GeoPicker({v,set,ward=true}){const t=useL();const g=useGeo();if(!g)return<p className="mut">…</p>;
const S=(label,val,opts,on)=><><label>{label}</label><select value={val||''} onChange={e=>on(e.target.value)}><option value="">{t('বেছে নিন','Select')}</option>{opts.map(o=><option key={o[0]} value={o[0]}>{nm(o,t.lang)}</option>)}</select></>;
return<>{S(t('বিভাগ','Division'),v.div,g.d,x=>set({div:x,dist:'',upz:'',uni:'',ward:''}))}
{v.div&&S(t('জেলা','District'),v.dist,g.z.filter(z=>z[1]==v.div),x=>set({...v,dist:x,upz:'',uni:'',ward:''}))}
{v.dist&&S(t('উপজেলা','Upazila'),v.upz,g.u.filter(u=>u[1]==v.dist),x=>set({...v,upz:x,uni:'',ward:''}))}
{v.upz&&S(t('ইউনিয়ন','Union'),v.uni,g.n.filter(n=>n[1]==v.upz),x=>set({...v,uni:x,ward:''}))}
{v.upz&&<p className="mut" style={{fontSize:12,marginTop:-6}}>{t('শহর এলাকা ইউনিয়ন তালিকায় না থাকলে নিকটতম ইউনিয়ন বা শুধু উপজেলা বেছে নিন।','If your urban area is not in the union list, pick the nearest union or just the upazila.')}</p>}
{ward&&v.uni&&S(t('ওয়ার্ড (সাধারণত ১–৯)','Ward (usually 1–9)'),v.ward,[1,2,3,4,5,6,7,8,9].map(n=>[n,t.n(n),'Ward '+n]).map(([a,b,c])=>[a,b,c,c]),x=>set({...v,ward:x}))}</>}
