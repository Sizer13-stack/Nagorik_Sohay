import {claude,parse,limited} from '../../../lib/claude';
const SYS='Extract a government service record from the page text. Use ONLY facts stated in the page; never guess fees, documents or times. Return JSON only: {"title":string(Bangla),"title_en":string,"office":string(Bangla),"office_en":string,"text":string(Bangla, 3-8 short sentences; keep all fees of one table in ONE sentence),"text_en":string(same in English),"checklist":[[bangla,english,"l"|"n"]] (documents required; "n" if only needed in some cases),"missing":[strings: things a citizen would want that the page does not state]}. If the page does not describe a service, return {"error":"not_a_service_page"}.';
export async function POST(req){if(limited(req))return Response.json({fallback:true,error:'rate'},{status:429});
 const {url=''}=await req.json();let u;try{u=new URL(url)}catch{return Response.json({error:'bad_url'})}
 const ok=h=>h==='gov.bd'||h.endsWith('.gov.bd');if(u.protocol!=='https:'||!ok(u.hostname))return Response.json({error:'only_gov_bd'});
 try{const r=await fetch(u.href,{headers:{'user-agent':'Mozilla/5.0 NagorikSohay'},signal:AbortSignal.timeout(15000)});
  if(!r.ok)return Response.json({error:'fetch_'+r.status});if(!ok(new URL(r.url).hostname))return Response.json({error:'only_gov_bd'});
  const html=await r.text();const text=html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim().slice(0,12000);
  const c=await claude({system:SYS,messages:[{role:'user',content:`PAGE URL: ${u.href}\n\nPAGE TEXT:\n${text}`}],max:1800});
  if(c.error==='no_key')return Response.json({fallback:true});if(c.error)return Response.json({error:c.error});
  const j=parse(c.text);if(!j||j.error)return Response.json({error:(j&&j.error)||'parse_failed'});
  return Response.json({draft:j,url:u.href,fetched:new Date().toISOString().slice(0,10)})}catch{return Response.json({error:'fetch_failed'})}}
