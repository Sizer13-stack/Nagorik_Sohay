// Server-side helper. Needs ANTHROPIC_API_KEY (never exposed to the browser).
export async function claude({system,messages,max=800,tools}){
 const key=process.env.ANTHROPIC_API_KEY;if(!key)return{error:'no_key'};
 try{const body={model:process.env.ANTHROPIC_MODEL||'claude-sonnet-5-5',max_tokens:max,system,messages};if(tools)body.tools=tools;
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'},body:JSON.stringify(body)});
  if(!r.ok)return{error:'api_'+r.status};const d=await r.json();const cites=[],seen=new Set();
  const text=(d.content||[]).map(c=>{if(c.type!=='text')return'';(c.citations||[]).forEach(z=>{if(z.url&&!seen.has(z.url)){seen.add(z.url);cites.push({url:z.url,title:z.title})}});return c.text||''}).join('');
  return{text,cites}}catch{return{error:'network'}}}
export function parse(t){try{const a=t.indexOf('{'),b=t.lastIndexOf('}');return JSON.parse(t.slice(a,b+1))}catch{return null}}
const hits=new Map();// best-effort per-instance rate limit (use Upstash/Vercel KV for production)
export function limited(req){const ip=(req.headers.get('x-forwarded-for')||'x').split(',')[0];const now=Date.now();const a=(hits.get(ip)||[]).filter(x=>now-x<60000);a.push(now);hits.set(ip,a);return a.length>20}
