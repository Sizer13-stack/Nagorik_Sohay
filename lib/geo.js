'use client';
import {useEffect,useState} from 'react';
let G=null,P=null;
export function useGeo(){const [g,setG]=useState(G);useEffect(()=>{if(G)return;(P=P||fetch('/geo.json').then(r=>r.json())).then(x=>{G=x;setG(x)}).catch(()=>{})},[]);return g}
export const nm=(a,lang)=>typeof a[1]==='number'?(lang==='bn'?a[2]:a[3]):(lang==='bn'?a[1]:a[2]);
export const E={div:'',dist:'',upz:'',uni:'',ward:''};
export function locText(l,g,lang){if(!g||!l||!l.dist)return'';const f=(a,id)=>a.find(x=>x[0]==id);const n=l.uni&&f(g.n,l.uni),u=l.upz&&f(g.u,l.upz),z=f(g.z,l.dist);
 return[n&&nm(n,lang),u&&nm(u,lang),z&&nm(z,lang)].filter(Boolean).join(', ')+(l.ward?(lang==='bn'?` · ওয়ার্ড ${l.ward}`:` · Ward ${l.ward}`):'')}
