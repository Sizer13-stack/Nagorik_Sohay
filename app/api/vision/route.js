import {claude,parse,limited} from '../../../lib/claude';
const SYS='You classify civic issue photos for a municipality. Choose category from: road, drain, light, waste, water, none. priority: low|medium|high (high only for visible safety hazards). Describe neutrally what is visible in one sentence. Never identify people. Set privacy_flag true if faces or vehicle number plates are clearly visible. Output JSON only: {"category":string,"priority":string,"desc_bn":string,"desc_en":string,"privacy_flag":boolean,"confidence":"high"|"medium"|"low"}';
export async function POST(req){if(limited(req))return Response.json({fallback:true},{status:429});
 const {image=''}=await req.json();const m=/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(image);if(!m)return Response.json({fallback:true});
 const r=await claude({system:SYS,max:400,messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:m[1],data:m[2]}},{type:'text',text:'Classify this photo.'}]}]});
 if(r.error)return Response.json({fallback:true,error:r.error});const j=parse(r.text);return Response.json(j||{fallback:true})}
