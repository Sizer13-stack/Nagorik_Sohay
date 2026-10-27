export const CATS=[
{id:'road',bn:'রাস্তা',en:'Roads',k:['রাস্তা','road','গর্ত','rasta','poth']},
{id:'drain',bn:'ড্রেন/জলাবদ্ধতা',en:'Drainage',k:['ড্রেন','drain','নালা','জলাবদ্ধ','jolabodho']},
{id:'light',bn:'স্ট্রিটলাইট',en:'Streetlights',k:['লাইট','light','বাতি','streetlight']},
{id:'waste',bn:'ময়লা-আবর্জনা',en:'Waste',k:['ময়লা','waste','আবর্জনা','moila','garbage']},
{id:'water',bn:'পানি সরবরাহ',en:'Water supply',k:['পানি','water','পাইপ','pani']}];
export const WARDS=[1,2,3,4,5,6,7,8,9].map(n=>({id:n,bn:'ওয়ার্ড '+'১২৩৪৫৬৭৮৯'[n-1],en:'Ward '+n}));
export const STATUS={received:['গৃহীত','Received'],review:['পর্যালোচনায়','Under review'],progress:['কাজ চলছে','In progress'],done:['সমাধান হয়েছে','Resolved']};
export const NOTE={rec:['রিপোর্ট গৃহীত হয়েছে','Report received'],upd:['কর্মকর্তা হালনাগাদ করেছেন','Updated by officer']};
const d=n=>new Date(Date.now()-n*864e5).toISOString();
export const SEED=[
['CS-10001','drain','ড্রেন বন্ধ, বৃষ্টিতে পানি জমে','Blocked drain, water collects when it rains',2,'progress','high',2],
['CS-10002','road','মূল সড়কে বড় গর্ত','Large pothole on the main road',1,'review','high',1],
['CS-10003','light','তিনটি স্ট্রিটলাইট জ্বলছে না','Three streetlights are not working',3,'received','medium',3],
['CS-10004','waste','ময়লা কয়েক দিন তোলা হয়নি','Garbage not collected for several days',2,'received','medium',1],
['CS-10005','water','পানির চাপ খুব কম','Very low water pressure',5,'done','low',6],
['CS-10006','drain','নালার ঢাকনা ভাঙা','Broken drain cover',1,'received','high',4],
['CS-10007','road','রাস্তার পাশে ভাঙা অংশ','Broken edge beside the road',4,'review','medium',2]
].map(([id,cat,desc,desc_en,ward,status,priority,a])=>({id,cat,desc,desc_en,ward,status,priority,created:d(a),is_mock:true,events:[{status:'received',at:d(a),note:'rec'}]}));
// SAMPLE ward indicators (mock) for the Smart Nation planning view
export const IND={1:{pop:42000,tr:72,cl:1.2},2:{pop:58000,tr:55,cl:2.8},3:{pop:36000,tr:80,cl:0.9},4:{pop:64000,tr:48,cl:3.4},5:{pop:30000,tr:65,cl:2.1},6:{pop:47000,tr:60,cl:1.7},7:{pop:39000,tr:58,cl:2.4},8:{pop:51000,tr:70,cl:1.5},9:{pop:33000,tr:52,cl:3.0}};
// SAMPLE: land-surface temperature (C) and pedestrian crashes per year per ward (mock)
export const HEAT={1:34.1,2:36.8,3:33.2,4:37.5,5:34.9,6:35.6,7:36.1,8:34.4,9:35.2};export const CRASH={1:4,2:9,3:2,4:12,5:5,6:7,7:6,8:3,9:8};
// SAMPLE routing: which section handles which category
export const ROUTE={road:['সড়ক ও প্রকৌশল শাখা','Roads & Engineering section'],drain:['পানি নিষ্কাশন শাখা','Drainage section'],light:['রাস্তার আলো শাখা','Street-lighting section'],waste:['পরিচ্ছন্নতা শাখা','Cleaning section'],water:['পানি সরবরাহ শাখা','Water supply section']};
