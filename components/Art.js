export default function Art(){return<svg viewBox="0 0 400 230" role="img" aria-label="Shaheed Minar and Jatiya Smriti Soudho illustration" style={{width:'100%',display:'block',margin:'8px 0'}}>
<circle cx="200" cy="112" r="74" fill="#e03a3e" opacity=".92"/>
{[0,1,2,3,4,5,6].map(i=>{const h=[100,84,66,46,66,84,100][i];const x=64+i*39;return<polygon key={i} points={`${x},196 ${x+39},196 ${x+19.5},${h}`} fill="#d7eedb" opacity=".28"/>})}
<g fill="#f4fbf5"><path d="M188 196V92Q200 66 212 92V196Z"/><path d="M156 196L168 196L186 116L176 112Z"/><path d="M244 196L232 196L214 116L224 112Z"/><path d="M132 196L143 196L160 138L151 134Z"/><path d="M268 196L257 196L240 138L249 134Z"/></g>
<rect x="110" y="196" width="180" height="8" rx="2" fill="#f4fbf5"/><rect x="90" y="204" width="220" height="8" rx="2" fill="#f4fbf5" opacity=".7"/></svg>}
