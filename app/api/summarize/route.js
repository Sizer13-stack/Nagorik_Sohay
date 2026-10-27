import {claude,parse,limited} from '../../../lib/claude';
const P={
notice:'Summarise this public notice for citizens using only facts in the text. JSON only: {"bn":string(<=60 words, Bangla),"en":string(<=60 words),"key_dates":[strings],"action_required":string}',
law:'Explain this law or bylaw excerpt in plain language for ordinary citizens. Stay faithful to the text; do not add rules. JSON only: {"bn":string,"en":string,"key_points":[max 5 strings],"who_it_affects":string,"caution":"Not legal advice; verify with the official text."}',
draft:'Draft a polite reply from a municipal office to a citizen about this report. Do not promise timelines or outcomes; say an officer is reviewing it. JSON only: {"reply_bn":string,"reply_en":string,"next_steps":[3 short strings for staff]}'};
export async function POST(req){if(limited(req))return Response.json({fallback:true},{status:429});
 const {mode='notice',text=''}=await req.json();if(!P[mode])return Response.json({fallback:true});
 const r=await claude({system:P[mode]+' Personal data in the text has been removed; do not guess it.',max:900,messages:[{role:'user',content:String(text).slice(0,6000)}]});
 if(r.error)return Response.json({fallback:true});const j=parse(r.text);return Response.json(j||{fallback:true})}
