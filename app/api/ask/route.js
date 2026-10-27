import {claude,parse,limited} from '../../../lib/claude';
const LN=l=>l==='en'?'English':'Bangla script (even if the question is in Banglish)';
const SYS=l=>`You are a public-service assistant for Bangladesh. Answer ONLY from the SOURCES given. If the sources do not directly contain the answer, say you are not sure and set needs_human true. Never invent fees, documents, timelines, offices or legal claims. If a source says verified data is not added yet, say that. Reply in ${LN(l)}, under 120 words, steps allowed. Output JSON only: {"answer":string,"source_ids":[ids you used],"confidence":"high"|"medium"|"low","needs_human":boolean}. Use "high" only if a source states the answer directly.`;
const WSYS=l=>`You help citizens of Bangladesh with government services. Use web_search; results are limited to official government websites. Answer ONLY from pages you found. Never guess fees, documents, dates or legal rules. If you cannot find a clear official answer, say you are not sure. Reply in ${LN(l)}, under 150 words, steps allowed. Mention the responsible office or website. On the last line write exactly CONF: high, CONF: medium or CONF: low (high only if an official page states it directly).`;
const WEB1=['gov.bd'];
const WEB2=['bangladesh.gov.bd','mygov.bd','nidw.gov.bd','services.nidw.gov.bd','epassport.gov.bd','dip.gov.bd','nbr.gov.bd','brta.gov.bd','bdris.gov.bd','land.gov.bd','dncc.gov.bd','dscc.gov.bd','a2i.gov.bd'];
async function web(messages,l){const mk=d=>({system:WSYS(l),messages,max:1000,tools:[{type:'web_search_20250305',name:'web_search',max_uses:3,allowed_domains:d}]});
 let r=await claude(mk(WEB1));if(r.error&&r.error!=='no_key'&&r.error!=='network')r=await claude(mk(WEB2));return r}
export async function POST(req){if(limited(req))return Response.json({fallback:true,error:'rate'},{status:429});
 const {question='',lang='bn',chunks=[],history=[],loc=''}=await req.json();const q=String(question).slice(0,500);
 let h=history.slice(-6).filter(m=>m&&m.content&&['user','assistant'].includes(m.role)).map(m=>({role:m.role,content:String(m.content).slice(0,600)}));while(h.length&&h[0].role!=='user')h.shift();
 const hist=[];h.forEach(m=>{const l=hist[hist.length-1];if(l&&l.role===m.role)l.content+='\n'+m.content;else hist.push(m)});if(hist.length&&hist[hist.length-1].role==='user')hist.pop();
 let kbj=null,ids=[];const real=chunks.filter(c=>!/এখনও যোগ হয়নি|has not been added yet/.test(String(c.text)));
 if(real.length){const src=real.slice(0,4).map(c=>`[${c.id}] ${c.title}\nOffice: ${c.office}\n${String(c.text).slice(0,3000)}`).join('\n\n');
  const r=await claude({system:SYS(lang),messages:[...hist,{role:'user',content:`SOURCES:\n${src}\n\nQUESTION: ${q}`}],max:700});
  if(r.error==='no_key'||r.error==='network')return Response.json({fallback:true});
  const j=!r.error&&parse(r.text);if(j){ids=(j.source_ids||[]).filter(id=>real.some(c=>c.id===id));kbj=j;
   if(ids.length&&j.confidence!=='low'&&!j.needs_human)return Response.json({mode:'kb',answer:String(j.answer),source_ids:ids,confidence:j.confidence,needs_human:false})}}
 const wr=await web([...hist,{role:'user',content:q+(loc?`\n(User's area: ${loc})`:'')}],lang);
 if(wr.error==='no_key'||wr.error==='network')return Response.json({fallback:true});
 if(!wr.error&&wr.text){const m=/CONF:\s*(high|medium|low)/i.exec(wr.text);const conf=m?m[1].toLowerCase():'low';const ans=wr.text.replace(/CONF:\s*(high|medium|low)/ig,'').trim();
  if(wr.cites.length&&conf!=='low'&&ans)return Response.json({mode:'web',answer:ans,cites:wr.cites.slice(0,4),confidence:conf,needs_human:false})}
 if(kbj&&kbj.answer)return Response.json({mode:'kb',answer:String(kbj.answer),source_ids:ids,confidence:'low',needs_human:true});
 return Response.json({mode:'none',answer:lang==='en'?"I'm not sure. I could not find a clear official answer. Please contact the responsible office or call the 333 helpline.":'আমি নিশ্চিত নই। স্পষ্ট সরকারি উত্তর খুঁজে পাইনি। দায়িত্বপ্রাপ্ত অফিসে যোগাযোগ করুন বা ৩৩৩ হেল্পলাইনে ফোন করুন।',source_ids:[],confidence:'low',needs_human:true})}
