'use client';
import {createContext,useContext,useEffect,useState} from 'react';
const C=createContext({lang:'bn',setLang(){}});
export function LangProvider({children}){const [lang,setL]=useState('bn');
 useEffect(()=>{try{const s=localStorage.getItem('cs_lang');if(s)setL(s)}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=lang},[lang]);
 const setLang=l=>{setL(l);try{localStorage.setItem('cs_lang',l)}catch{}};
 return <C.Provider value={{lang,setLang}}>{children}</C.Provider>}
export function useL(){const {lang,setLang}=useContext(C);const loc=lang==='bn'?'bn-BD':'en-GB';
 const t=(b,e)=>lang==='bn'?b:e;t.lang=lang;t.setLang=setLang;t.n=x=>Number(x).toLocaleString(loc);t.d=x=>new Date(x).toLocaleDateString(loc);
 t.p=(o,k)=>lang==='en'&&o[k+'_en']?o[k+'_en']:o[k];return t}
