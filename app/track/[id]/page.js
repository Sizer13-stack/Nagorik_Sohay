'use client';import {useEffect,useState} from 'react';import {useParams} from 'next/navigation';import {CATS,WARDS,STATUS,NOTE} from '../../../lib/data';import {useL} from '../../../lib/i18n';import {getReports} from '../../../lib/store';
export default function T(){const t=useL();const {id}=useParams();const [r,setR]=useState(undefined);useEffect(()=>setR(getReports().find(x=>x.id===id)||null),[id]);
if(r===undefined)return<div className="page">…</div>;
if(!r)return<div className="page"><section className="card"><h1>{t('পাওয়া যায়নি','Not found')}</h1><p>{t('আইডিটি আবার দেখুন (যেমন CS-10001)। এই সংস্করণে রিপোর্ট শুধু আপনার ব্রাউজারে থাকে।','Check the ID (e.g. CS-10001). In this version reports are stored only in your browser.')}</p></section></div>;
const L=t.lang==='bn'?0:1;
return<div className="page"><h1>{r.id}</h1><section className="card" style={{margin:'14px 0'}}><span className="badge">{STATUS[r.status][L]}</span><h2 style={{marginTop:8}}>{CATS.find(c=>c.id===r.cat)?.[t.lang]} · {WARDS.find(w=>w.id===r.ward)?.[t.lang]}</h2><p>{t.lang==='en'&&r.desc_en?r.desc_en:r.desc}</p>{r.is_mock&&<p className="mut">{t('নমুনা রিপোর্ট','Sample report')}</p>}</section>
<h2>{t('অগ্রগতি','Progress')}</h2><div className="tl">{r.events.map((e,i)=><p key={i}><b>{STATUS[e.status][L]}</b><br/><span className="mut">{t.d(e.at)} · {NOTE[e.note]?NOTE[e.note][L]:e.note}</span></p>)}</div></div>}
