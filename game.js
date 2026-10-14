"use strict";
(()=>{
const D=window.CASE_DATA,$=id=>document.getElementById(id),KEY="confidential-files-001";
const fresh=()=>({started:false,tab:"briefing",examined:[],heard:[],links:[],outcome:null});
let s;try{s={...fresh(),...JSON.parse(localStorage.getItem(KEY)||"null")}}catch{s=fresh()}
for(const k of ["examined","heard","links"])if(!Array.isArray(s[k]))s[k]=[];
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(s))}catch{}};
const el=(tag,cls="",value)=>{const n=document.createElement(tag);n.className=cls;if(value!==undefined)n.textContent=value;return n};
const add=(p,tag,cls,value)=>{const n=el(tag,cls,value);p.append(n);return n};
const btn=(label,fn,cls="paper-btn")=>{let b=el("button",cls,label);b.type="button";b.addEventListener("click",fn);return b};
const paragraph=(p,t)=>add(p,"p","narrative",t);
const rule=p=>p.append(el("hr","paper-rule"));
const header=(p,k,title,sub)=>{add(p,"p","paper-eyebrow",k);add(p,"h2","paper-title",title);if(sub)add(p,"p","paper-intro",sub)};
let toastHandle;
const toast=t=>{const n=$("notice");n.textContent=t;n.classList.add("show");clearTimeout(toastHandle);toastHandle=setTimeout(()=>n.classList.remove("show"),2600)};
const next=(p,name,tab)=>p.append(btn(name,()=>go(tab)));
const intro=()=>{$("introScreen").hidden=!!s.started;$("gameScreen").hidden=!s.started;$("continueButton").hidden=!s.started;if(s.started)render()};
const go=t=>{s.started=true;s.tab=t;save();render();if(innerWidth<=800)$("panel").scrollIntoView({behavior:"smooth",block:"start"})};
const count=()=>{
 $("clueCounter").textContent=s.examined.length+" / 7";$("interviewCounter").textContent=s.heard.length+" / 8";$("linkCounter").textContent=s.links.length+" / 3";
 $("caseStatus").textContent=s.outcome?"CLOSED":"OPEN";
 const total=s.examined.length+s.heard.length+s.links.length,p=Math.round(total/18*100);
 $("progressText").textContent=p+"%";$("progressBar").style.width=p+"%";$("progressDetail").textContent=total+" / 18 investigation steps recorded";
 $("fieldNote").textContent=s.links.length>1?"Match the motive with the alibi.":"Every recorded detail can reveal a contradiction.";
};
function render(){
 count();document.querySelectorAll(".case-tab").forEach(b=>b.classList.toggle("selected",b.dataset.tab===s.tab));
 const p=$("panel");p.replaceChildren();
 ({briefing,suspects,evidence,interviews,board,notebook,verdict}[s.tab]||briefing)(p);
}
function briefing(p){
 header(p,"POLICE DOSSIER / PRELIMINARY REPORT","A disappearance at midnight.","One vanished heiress. Four suspects. Eleven missing minutes of security footage.");
 rule(p);
 paragraph(p,"14 October, 11:47 PM. Amelia Vale, heir to the Vale family trust, disappeared during a private gala in Johannesburg. Her phone was found beside a shattered champagne glass.");
 paragraph(p,"The security cameras stopped recording at 11:46 PM and resumed at 11:57 PM. Four people had reasons to keep Amelia quiet. One alibi will not survive scrutiny.");
 const facts=el("div","case-overview");
 [["LAST SEEN","11:47 PM · Grand ballroom"],["LOCATION","Vale Estate · Johannesburg"],["SUBJECT","Amelia Vale · Heiress"],["MISSION","Find Amelia and identify who engineered her disappearance"]].forEach(([k,v])=>{const d=el("div","overview-item");add(d,"span","",k);add(d,"strong","",v);facts.append(d)});p.append(facts);
 add(p,"div","paper-callout","INVESTIGATOR'S INSTRUCTION: Examine the evidence, interview the suspects, and establish connections before filing your accusation.");
 next(p,"OPEN SUSPECT DOSSIERS ↗","suspects");
}
function suspects(p){
 header(p,"PERSONS OF INTEREST / 04","Everyone has a secret.","Click each dossier to learn more about the suspect, their motive and their stated alibi.");
 const grid=el("div","suspect-grid");
 D.suspects.forEach(x=>{const c=el("article","dossier");add(c,"div","dossier-portrait "+x.colour,x.portrait);add(c,"small","",x.role.toUpperCase());add(c,"h3","",x.name);paragraph(c,x.note);c.append(btn("READ FULL DOSSIER ↗",()=>detail("suspect",x.id)));grid.append(c)});
 p.append(grid);next(p,"INSPECT EVIDENCE →","evidence");
}
function evidence(p){
 header(p,"EVIDENCE LOCKER / 07","Objects remember.","Select each item to examine it. The examination details will be saved in your detective notebook.");
 const grid=el("div","evidence-grid");
 D.evidence.forEach(x=>{const c=el("article","evidence-item");add(c,"div","evidence-mark",x.mark);add(c,"small","",x.kind);add(c,"h3","",x.name);paragraph(c,x.description);c.append(btn(s.examined.includes(x.id)?"✓ EXAMINED — VIEW AGAIN":"EXAMINE EVIDENCE ↗",()=>detail("evidence",x.id),s.examined.includes(x.id)?"examined":""));grid.append(c)});
 p.append(grid);next(p,"QUESTION THE SUSPECTS ↗","interviews");
}
function interviews(p){
 header(p,"RECORDED INTERVIEWS / 08","Their words. Your questions.","Select a question to reveal the recorded statement. Each answer becomes part of your investigation.");
 D.suspects.forEach(x=>{
 const section=el("section"),head=el("div","interview-person");add(head,"span","mini-portrait",x.portrait);const nm=el("div");add(nm,"strong","",x.name);add(nm,"small","",x.role);head.append(nm);section.append(head);
 D.interviews.filter(i=>i.suspect===x.id).forEach(i=>{
 const known=s.heard.includes(i.id);
 section.append(btn(i.question+(known?" ✓":" ↗"),()=>{if(!s.heard.includes(i.id)){s.heard.push(i.id);save();toast("Statement added to your notebook.")}render()},"question"));
 if(known){const a=el("div","answer");paragraph(a,"“"+i.answer+"”");add(a,"span","revealed","FIELD NOTE: "+i.revelation);section.append(a)}
 });p.append(section);
 });next(p,"GO TO THE EVIDENCE BOARD ↗","board");
}
function board(p){
 header(p,"INVESTIGATION BOARD / ANALYSIS","Connect the dots.","Choose a clue and a suspect. Confirm three meaningful links that help solve the case.");
 const w=el("div","board-pair");
 function select(title,items){const box=el("label");add(box,"span","type-caption",title);const sel=el("select");const first=el("option","","Choose one…");first.value="";sel.append(first);items.forEach(([id,name])=>{const opt=el("option","",name);opt.value=id;sel.append(opt)});box.append(sel);w.append(box);return sel}
 const clue=select("SELECT EVIDENCE",D.evidence.map(x=>[x.id,x.name])),sus=select("CONNECT TO SUSPECT",D.suspects.map(x=>[x.id,x.name]));p.append(w);
 p.append(btn("TEST CONNECTION ↗",()=>{
  if(!clue.value||!sus.value){toast("Choose one clue and one suspect.");return}
  if(!s.examined.includes(clue.value)){toast("Examine that clue in the Evidence Locker first.");return}
  const hit=D.connections.find(x=>x.clue===clue.value&&x.suspect===sus.value);
  if(!hit){toast("No convincing link. Reconsider the evidence.");return}
  if(!s.links.includes(hit.id)){s.links.push(hit.id);save();toast("Connection confirmed!") }else toast("Already linked.");render();
 }));rule(p);add(p,"p","type-caption","CONFIRMED CONNECTIONS");
 if(!s.links.length)paragraph(p,"No connections established yet.");
 D.connections.filter(c=>s.links.includes(c.id)).forEach(c=>{const box=el("div","board-item good");add(box,"strong","","✓ "+c.label);paragraph(box,c.description);p.append(box)});
 next(p,"REVIEW DETECTIVE'S NOTES ↗","notebook");
}
function notebook(p){
 header(p,"FIELD JOURNAL / DETECTIVE #0047","The detective's notes.","Your findings are recorded here automatically as you investigate.");
 add(p,"p","type-caption","EXAMINED EVIDENCE");
 if(!s.examined.length)paragraph(p,"You haven't examined any clues.");
 D.evidence.filter(x=>s.examined.includes(x.id)).forEach(x=>{const d=el("div","notebook-entry");add(d,"b","",x.name.toUpperCase());paragraph(d,x.implication);p.append(d)});
 rule(p);add(p,"p","type-caption","INTERVIEW OBSERVATIONS");
 if(!s.heard.length)paragraph(p,"No recorded interviews yet.");
 D.interviews.filter(x=>s.heard.includes(x.id)).forEach(x=>{const d=el("div","notebook-entry");add(d,"b","",D.suspects.find(v=>v.id===x.suspect).name.toUpperCase());paragraph(d,x.revelation);p.append(d)});
 rule(p);add(p,"p","type-caption","CONFIRMED LINKS");
 if(!s.links.length)paragraph(p,"No linked clues yet.");
 D.connections.filter(x=>s.links.includes(x.id)).forEach(x=>{const d=el("div","notebook-entry");add(d,"b","",x.label.toUpperCase());paragraph(d,x.description);p.append(d)});
 next(p,"FILE FINAL ACCUSATION ↗","verdict");
}
function verdict(p){
 header(p,"FINAL REPORT / INVESTIGATION DIVISION","Make your accusation.","Identify the suspect, motive, and most convincing evidence.");
 const ready=s.examined.length>=4&&s.heard.length>=2&&s.links.length>=2;
 add(p,"div","paper-callout",ready?"Your notebook has sufficient material for a supported theory.":"Tip: Examine four clues, hear two statements and confirm two connections before accusing.");
 if(s.outcome){result(p);return}
 const form=el("form","accuse-form");
 function field(title,items){const label=el("label","",title),select=el("select");select.required=true;const opt=el("option","","Choose an answer…");opt.value="";select.append(opt);items.forEach(([id,name])=>{const o=el("option","",name);o.value=id;select.append(o)});label.append(select);form.append(label);return select}
 const who=field("WHO IS RESPONSIBLE?",D.suspects.map(x=>[x.id,x.name]));
 const why=field("WHAT WAS THE MOTIVE?",[["trust","Control of the family trust"],["contract","Termination of the events contract"],["money","Concealing missing estate funds"],["friendship","A personal dispute"]]);
 const proof=field("WHAT IS YOUR STRONGEST CLUE?",D.evidence.map(x=>[x.id,x.name]));
 add(form,"p","paper-intro","Your final report closes this playthrough. You can reopen the case to try another theory.");
 const submit=el("button","paper-btn","SUBMIT FINAL REPORT ↗");submit.type="submit";form.append(submit);
 form.addEventListener("submit",e=>{e.preventDefault();if(!who.value||!why.value||!proof.value){toast("Choose a suspect, motive and clue.");return}
 const correct=who.value===D.solution.suspect&&why.value===D.solution.motive&&["badge","ledger","cctv","message"].includes(proof.value);
 s.outcome={who:who.value,correct,exemplary:correct&&ready&&D.solution.requiredConnections.every(x=>s.links.includes(x))};save();render();});
 p.append(form);
}
function result(p){
 const o=s.outcome,d=el("div","result-box"+(o.exemplary?" solved":""));
 const h=o.exemplary?"CASE SOLVED — EXEMPLARY WORK":o.correct?"CORRECT SUSPECT — INSUFFICIENT PROOF":"CASE INCONCLUSIVE";
 add(d,"h3","",h);
 paragraph(d,o.exemplary?D.ending:o.correct?"You identified the right person and motive, but your report lacks a fully supported chain of evidence. Investigators eventually locate Amelia alive in the archival storeroom. Reopen the file to build a stronger argument.":"The evidence does not support this accusation. Review the archive door log, camera blackout and altered ledger to uncover the correct explanation.");
 add(d,"p","type-caption","YOUR SUSPECT: "+(D.suspects.find(x=>x.id===o.who)?.name||"Unknown"));p.append(d);p.append(btn("↺ REOPEN CASE & TRY AGAIN",restart));
}
function detail(type,id){
 const x=type==="suspect"?D.suspects.find(x=>x.id===id):D.evidence.find(x=>x.id===id);if(!x)return;
 const p=$("dialogContent");p.replaceChildren();
 header(p,type==="suspect"?"PERSON OF INTEREST / "+x.monogram:x.kind+" / EXAMINATION RECORD",x.name,type==="suspect"?x.role:x.location);
 paragraph(p,type==="suspect"?x.note:x.description);rule(p);
 if(type==="suspect"){
  const cols=el("div","dialog-columns");[["POSSIBLE MOTIVE",x.motive],["STATED ALIBI",x.alibi],["INVESTIGATOR'S OBSERVATION",x.secret]].forEach(([k,v])=>{const d=el("div");add(d,"strong","",k);paragraph(d,v);cols.append(d)});p.append(cols);
  next(p,"GO TO INTERROGATIONS ↗","interviews");
 }else{
  add(p,"p","type-caption","FORENSIC OBSERVATION");paragraph(p,x.detail);add(p,"div","paper-callout","INVESTIGATOR'S NOTE: "+x.implication);
  if(!s.examined.includes(id)){s.examined.push(id);save();toast("Clue recorded in your notebook.");count();}
 }
 $("detailDialog").showModal();
}
function restart(){
 if(!confirm("Restart Case 001? Current clues and verdict will be erased from this browser."))return;
 s=fresh();s.started=true;save();intro();toast("Investigation restarted.");
}
$("beginButton").addEventListener("click",()=>{s.started=true;save();intro()});
$("continueButton").addEventListener("click",()=>{s.started=true;save();intro()});
document.querySelectorAll(".case-tab").forEach(b=>b.addEventListener("click",()=>go(b.dataset.tab)));
$("goAccusation").addEventListener("click",()=>go("verdict"));
$("restartButton").addEventListener("click",restart);
$("closeDialog").addEventListener("click",()=>$("detailDialog").close());
$("detailDialog").addEventListener("click",e=>{if(e.target===$("detailDialog"))e.target.close()});
let audio;const soundButton=$("soundToggle");soundButton.addEventListener("click",()=>{
 const active=soundButton.getAttribute("aria-pressed")!=="true";
 soundButton.setAttribute("aria-pressed",String(active));soundButton.textContent=active?"♫ SOUND ON":"♪ SOUND OFF";
 soundButton.setAttribute("aria-label",active?"Turn sound off":"Turn sound on");
 if(active)try{const Context=window.AudioContext||window.webkitAudioContext;if(!Context)return;audio||=new Context();const osc=audio.createOscillator(),gain=audio.createGain();osc.connect(gain);gain.connect(audio.destination);osc.frequency.value=440;gain.gain.value=.025;osc.start();osc.stop(audio.currentTime+.13)}catch{}
});
$("year").textContent=new Date().getFullYear();
intro();
})();