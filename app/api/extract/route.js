import {claude,parse,limited} from '../../../lib/claude';
const SYS='Extract a civic issue report from a citizen\'s spoken sentence (Bangla, English or Banglish). category: road|drain|light|waste|water|null. ward: integer 1-6 if clearly mentioned else null. description: the problem rewritten as one clear sentence in the speaker\'s language, without names or phone numbers. Output JSON only: {"category":string|null,"ward":number|null,"description":string}';
export async function POST(req){if(limited(req))return Response.json({fallback:true},{status:429});
 const {text=''}=await req.json();const r=await claude({system:SYS,max:300,messages:[{role:'user',content:String(text).slice(0,800)}]});
 if(r.error)return Response.json({fallback:true});const j=parse(r.text);return Response.json(j||{fallback:true})}
