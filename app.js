const F=[["Empresa",3],["Diretoria",5],["Tipo de Equipamento",4],["Manutenção",6]];
const $=i=>document.getElementById(i),sel={},sels={};let mode="m";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nf=n=>n.toLocaleString("pt-BR"),pct=n=>n.toLocaleString("pt-BR",{minimumFractionDigits:1,maximumFractionDigits:1})+"%";
function build(){$("fl").innerHTML="";for(const k in sel)delete sel[k];F.forEach(([n,i])=>{const v=i==6?["Funcionando","Precisando de manutenção"]:[...new Set(D.map(r=>r[i]))].sort((a,b)=>a.localeCompare(b,"pt"));
 const d=document.createElement("div");d.className="f";d.innerHTML=`<b>${n}</b><select><option value="">Todos</option>${v.map((x,k)=>`<option value="${i==6?k:esc(x)}">${esc(x)}</option>`).join("")}</select>`;
 const s=sels[i]=d.querySelector("select");s.onchange=e=>{sel[i]=e.target.value;render()};$("fl").appendChild(d)});
 const b=document.createElement("button");b.className="clr";b.textContent="Limpar filtros";b.onclick=()=>{for(const k in sels){sels[k].value="";sel[k]=""}render()};$("fl").appendChild(b)}
const pick=(i,v)=>{sel[i]=String(sel[i])===String(v)?"":String(v);sels[i].value=sel[i];render()};
const rows=skip=>D.filter(r=>F.every(([n,i])=>i===skip||!sel[i]||String(r[i])===sel[i]));
const cnt=(R,i)=>{const c={};R.forEach(r=>{const o=c[r[i]]||(c[r[i]]=[0,0]);o[0]++;o[1]+=r[6]});return c};
const tops=(R,i,n)=>{const c=cnt(R,i);let t=Object.entries(c).sort((a,b)=>b[1][0]-a[1][0]).slice(0,n);if(sel[i]&&c[sel[i]]&&!t.some(x=>x[0]===sel[i]))t[n-1]=[sel[i],c[sel[i]]];return t};
function render(){
 const R=rows(-1),t=R.length,m=R.filter(r=>r[6]).length,pm=t?m/t*100:0,s=sel[6];
 $("kt").textContent=nf(t);$("kf").textContent=pct(t?100-pm:0);$("km").textContent=pct(pm);
 [["c0",!s],["c1",s==="0"],["c2",s==="1"]].forEach(([id,on])=>$(id).classList.toggle("on",on&&!!s||(id=="c0"&&!s&&false)));
 const S=rows(6),st=S.length,sm=S.filter(r=>r[6]).length,sf=st-sm,p1=st?sm/st*100:0,p0=100-p1;
 $("dt").textContent=nf(st);$("lf").textContent=`${nf(sf)} (${pct(st?p0:0)})`;$("lm").textContent=`${nf(sm)} (${pct(p1)})`;
 $("d0").setAttribute("stroke-dasharray",`${p0} ${p1}`);$("d1").setAttribute("stroke-dasharray",`${p1} ${p0}`);$("d1").setAttribute("stroke-dashoffset",-p0);
 [["d0","g0","0"],["d1","g1","1"]].forEach(([d,g,v])=>{const dm=s&&s!==v;$(d).style.opacity=dm?.3:1;$(g).style.opacity=dm?.4:1;$(d).onclick=$(g).onclick=()=>pick(6,v)});
 $("d0").innerHTML=`<title>Funcionando: ${nf(sf)}</title>`;$("d1").innerHTML=`<title>Precisando de manutenção: ${nf(sm)}</title>`;
 [["c0",""],["c1","0"],["c2","1"]].forEach(([id,v])=>$(id).onclick=()=>v===""?(sel[6]="",sels[6].value="",render()):pick(6,v));
 const E=tops(rows(3),3,8),mx=E.length?E[0][1][0]:1;
 $("bars").innerHTML=E.map(([n,[v,k]])=>`<div class="bc ${sel[3]&&sel[3]!==n?"dim":""}" data-k="${esc(n)}" title="${esc(n)}: ${nf(v)} veículos, ${nf(k)} precisando de manutenção"><i style="flex:${mx-v}"></i><b>${v}</b><div class="stk" style="flex:${v}"><i class="m" style="flex:${k}"></i><i class="w" style="flex:${v-k}"></i></div><em>${esc(n)}</em></div>`).join("");
 $("bars").querySelectorAll(".bc").forEach(e=>e.onclick=()=>pick(3,e.dataset.k));
 const Dr=tops(rows(5),5,6),dx=Dr.length?Dr[0][1][0]:1;
 $("dir").innerHTML=Dr.map(([n,[v,k]])=>`<div class="hr ${sel[5]&&sel[5]!==n?"dim":""}" data-k="${esc(n)}" title="${esc(n)}: ${nf(v)} veículos, ${nf(k)} precisando de manutenção"><span>${esc(n)}</span><div class="tr" style="width:${v/dx*100}%"><i class="m" style="flex:${k}"></i><i class="w" style="flex:${v-k}"></i></div><b>${v}</b></div>`).join("");
 $("dir").querySelectorAll(".hr").forEach(e=>e.onclick=()=>pick(5,e.dataset.k));
 const L=(mode=="m"?R.filter(r=>r[6]):R.slice().sort((a,b)=>b[6]-a[6]));
 $("cnt").textContent=`${nf(L.length)} veículo(s)`;$("ttl").textContent=mode=="m"?"Veículos que Precisam de Manutenção":"Todos os Veículos";
 $("bm").classList.toggle("on",mode=="m");$("ba").classList.toggle("on",mode!="m");
 $("tb").innerHTML=L.map(r=>"<tr>"+r.slice(0,6).map(x=>`<td>${esc(x)}</td>`).join("")+`<td><span class="bd ${r[6]?"m":"w"}">${r[6]?"Precisando de manutenção":"Funcionando"}</span></td></tr>`).join("");
}
$("bm").onclick=()=>{mode="m";render()};$("ba").onclick=()=>{mode="a";render()};
build();render();
const SF=[["Empresa",1],["Diretoria",2],["Modelo de Veículo",3]],ss={},sse={};
function sbuild(){const f=$("sfl");f.innerHTML="";for(const k in ss)delete ss[k];SF.forEach(([n,i])=>{const v=[...new Set(S.map(r=>r[i]))].sort((a,b)=>a.localeCompare(b,"pt"));const d=document.createElement("div");d.className="f";d.innerHTML=`<b>${n}</b><select><option value="">Todos</option>${v.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join("")}</select>`;const s=sse[i]=d.querySelector("select");s.onchange=e=>{ss[i]=e.target.value;srender()};f.appendChild(d)});const b=document.createElement("button");b.className="clr";b.textContent="Limpar filtros";b.onclick=()=>{for(const k in sse){sse[k].value="";ss[k]=""}srender()};f.appendChild(b)}
const spick=(i,v)=>{ss[i]=ss[i]===v?"":v;sse[i].value=ss[i];srender()};
const srows=k=>S.filter(r=>SF.every(([n,i])=>i===k||!ss[i]||r[i]===ss[i]));
const stop=(R,i,n)=>{const c={};R.forEach(r=>c[r[i]]=(c[r[i]]||0)+1);let t=Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,n);if(ss[i]&&c[ss[i]]&&!t.some(x=>x[0]===ss[i]))t[n-1]=[ss[i],c[ss[i]]];return t};
function shb(el,i,n){const t=stop(srows(i),i,n),mx=t.length?t[0][1]:1;$(el).innerHTML=t.map(([k,v])=>`<div class="hr ${ss[i]&&ss[i]!==k?"dim":""}" data-k="${esc(k)}" title="${esc(k)}: ${nf(v)}"><span>${esc(k)}</span><div class="tr" style="width:${v/mx*100}%"><i class="w" style="flex:1"></i></div><b>${v}</b></div>`).join("");$(el).querySelectorAll(".hr").forEach(e=>e.onclick=()=>spick(i,e.dataset.k))}
function srender(){
 const R=srows(-1);$("s0").textContent=nf(R.length);$("s1").textContent=nf(new Set(R.map(r=>r[1])).size);$("s2").textContent=nf(new Set(R.map(r=>r[2])).size);
 shb("sm",3,8);shb("sd",2,6);
 const E=stop(srows(1),1,8),mx=E.length?E[0][1]:1;
 $("se").innerHTML=E.map(([n,v])=>`<div class="bc ${ss[1]&&ss[1]!==n?"dim":""}" data-k="${esc(n)}" title="${esc(n)}: ${nf(v)}"><i style="flex:${mx-v}"></i><b>${v}</b><div class="stk" style="flex:${v}"><i class="w" style="flex:1"></i></div><em>${esc(n)}</em></div>`).join("");
 $("se").querySelectorAll(".bc").forEach(e=>e.onclick=()=>spick(1,e.dataset.k));
 $("sc").textContent=nf(R.length)+" veículo(s)";
 $("stb").innerHTML=R.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("");}
sbuild();srender();
document.querySelectorAll(".nv").forEach(b=>b.onclick=()=>{document.querySelectorAll(".nv").forEach(x=>x.classList.toggle("on",x===b));$("m1").hidden=b.dataset.v!="m1";$("m2").hidden=b.dataset.v!="m2";$("m4").hidden=b.dataset.v!="m4"});
const ERR=/^#(VALUE!|N\/A|REF!|NAME\?|DIV\/0!|NULL!|NUM!)/i;
const clean=x=>{const s=String(x??"").replace(/\s+/g," ").trim();return ERR.test(s)?"":s};
const norm=x=>String(x??"").trim().toUpperCase().replace("DIRETORIA","DIRETÓRIA");
const shn=(wb,n)=>{const k=wb.SheetNames.find(x=>x.trim().toUpperCase()==n);return k?XLSX.utils.sheet_to_json(wb.Sheets[k],{header:1,defval:"",raw:false}):null};
function tbl(rows){const h=(rows[0]||[]).map(norm),body=rows.slice(1);
 const ix=(n,last)=>{const a=[];h.forEach((x,i)=>x===n&&a.push(i));return a.length?(last?a[a.length-1]:a[0]):-1};
 return {body,g:(r,n,last)=>{const i=ix(n,last);return i<0?"":clean(r[i])}}}
const tail=x=>x.split(" - ").pop().trim();
const sl=x=>{x=String(x||"").trim().toUpperCase();return x.startsWith("VERDE")?"Verde":x.startsWith("VERMELH")?"Vermelha":"Sem Status"};
function fixAll(A,B,C){const key=x=>x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase(),sp=x=>String(x??"").replace(/\s+/g," ").trim(),bad=x=>!x||x==="0"||x.startsWith("#"),cm={};
 const rd=x=>{x=sp(x).toUpperCase();return bad(x)?"Não informada":x};
 [[A,5],[B,2]].forEach(([L,i])=>L&&L.forEach(r=>{const x=rd(r[i]);if(x==="Não informada")return;const k=key(x);if(!cm[k]||(key(x)!==x&&key(cm[k])===cm[k]))cm[k]=x}));
 [[A,5],[B,2]].forEach(([L,i])=>L&&L.forEach(r=>{const x=rd(r[i]);r[i]=x==="Não informada"?x:cm[key(x)]}));
 [[A,3],[B,1]].forEach(([L,i])=>L&&L.forEach(r=>{r[i]=sp(r[i])||"Não informada"}));return [A,B,C]}
function parseWB(wb){const t=shn(wb,"TRATADOS"),s=shn(wb,"SEM SILLION"),em={},dm={};let A=null,B=null;
 if(t){const T=tbl(t);A=T.body.filter(r=>T.g(r,"PLACA")).map(r=>{
  const e0=T.g(r,"EMPRESA"),e1=T.g(r,"EMPRESA",1),d0=T.g(r,"DIRETÓRIA"),d1=T.g(r,"DIRETÓRIA",1);
  const e=e1||e0||"Não informada",d=d1||(d0&&d0!=="0"?tail(d0):"")||"Não informada";
  if(e0&&e1&&!(e0 in em))em[e0]=e1;if(d0&&d1&&!(d0 in dm))dm[d0]=d1;
  return [T.g(r,"TAG")||"-",T.g(r,"PLACA"),T.g(r,"MODELO DE VEÍCULO")||"-",e,T.g(r,"TIPO DE EQUIPAMENTO"),d,T.g(r,"MANUTENÇÃO").toUpperCase().startsWith("MANUT")?1:0,sl(T.g(r,"SELO"))]})}
 if(s){const T=tbl(s);B=T.body.map(r=>{const p=T.g(r,"PLACAS")||T.g(r,"PLACA");if(!p)return null;
  const e=T.g(r,"EMPRESA"),d=T.g(r,"DIRETÓRIA"),m=T.g(r,"MODELO DE VEÍCULO");
  return [p,em[e]||e||"Não informada",dm[d]||(d&&d!=="0"?tail(d):"")||"Não informada",m&&m!=="0"?m:"-",sl(T.g(r,"SELO"))]}).filter(Boolean).filter((r,i,a)=>a.findIndex(z=>z[0]===r[0])===i)}
 return fixAll(A,B,null)}
const KF=[["Empresa",1],["Diretoria",2],["Modelo de Veículo",3]],ks={},kse={},KO=["Verde","Vermelha","Sem Status"],KC={"Verde":"var(--grn)","Vermelha":"var(--red)","Sem Status":"#9a9aa5"};let K=[];
function kbuild(){K=D.map(r=>[r[1],r[3],r[5],r[2],r[7]||"Sem Status"]);
 const f=$("kfl");f.innerHTML="";for(const k in ks)delete ks[k];
 KF.forEach(([n,i])=>{const v=[...new Set(K.map(r=>r[i]))].sort((a,b)=>a.localeCompare(b,"pt"));const d=document.createElement("div");d.className="f";d.innerHTML=`<b>${n}</b><select><option value="">Todos</option>${v.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join("")}</select>`;const e=kse[i]=d.querySelector("select");e.onchange=ev=>{ks[i]=ev.target.value;krender()};f.appendChild(d)});
 const b=document.createElement("button");b.className="clr";b.textContent="Limpar filtros";b.onclick=()=>{for(const k in kse)kse[k].value="";for(const k in ks)ks[k]="";$("kq").value="";krender()};f.appendChild(b)}
const kpick=(i,v)=>{ks[i]=ks[i]===v?"":v;if(kse[i])kse[i].value=ks[i];krender()};
const krows=k=>K.filter(r=>[1,2,3,4].every(i=>i===k||!ks[i]||r[i]===ks[i]));
const ktop=(R,i,n)=>{const c={};R.forEach(r=>{const o=c[r[i]]||(c[r[i]]=[0,0,0,0]);o[0]++;o[KO.indexOf(r[4])+1]++});let t=Object.entries(c).sort((a,b)=>b[1][0]-a[1][0]).slice(0,n);if(ks[i]&&c[ks[i]]&&!t.some(x=>x[0]===ks[i]))t[n-1]=[ks[i],c[ks[i]]];return t};
function krender(){const R=krows(-1),t=R.length,q=($("kq").value||"").trim().toUpperCase(),cs=KO.map(s=>R.filter(r=>r[4]===s).length);
  const T=krows(4),tt=T.length,ct=KO.map(s=>T.filter(r=>r[4]===s).length);let cum=0;$("kdt").textContent=nf(tt);$("k0").textContent=nf(ct[0]);$("k1").textContent=nf(ct[1]);$("k2").textContent=nf(ct[2]);document.querySelectorAll("#m4 .k").forEach(e=>{e.classList.toggle("on",ks[4]===e.dataset.s);e.onclick=()=>kpick(4,e.dataset.s)});
 $("kd").innerHTML=KO.map((s,j)=>{const p=tt?ct[j]/tt*100:0,o=-cum;cum+=p;return `<circle data-s="${s}" cx="21" cy="21" r="15.9" fill="none" stroke="${KC[s]}" stroke-width="7" stroke-dasharray="${p} ${100-p}" stroke-dashoffset="${o}" style="opacity:${ks[4]&&ks[4]!==s?.3:1}"><title>${s}: ${nf(ct[j])}</title></circle>`}).join("");
 $("kg").innerHTML=KO.map((s,j)=>`<div data-s="${s}" style="opacity:${ks[4]&&ks[4]!==s?.4:1}"><i style="background:${KC[s]}"></i><span>${s}<br><b>${nf(ct[j])} (${pct(tt?ct[j]/tt*100:0)})</b></span></div>`).join("");
 ["kd","kg"].forEach(id=>$(id).querySelectorAll("[data-s]").forEach(e=>e.onclick=()=>kpick(4,e.dataset.s)));
 const E=ktop(krows(1),1,8),mx=E.length?E[0][1][0]:1;
 $("kb").innerHTML=E.map(([n,c])=>`<div class="bc ${ks[1]&&ks[1]!==n?"dim":""}" data-k="${esc(n)}" title="${esc(n)}: ${nf(c[0])} (Verde ${c[1]}, Vermelha ${c[2]}, Sem Status ${c[3]})"><i style="flex:${mx-c[0]}"></i><b>${c[0]}</b><div class="stk" style="flex:${c[0]}"><i style="flex:${c[3]};background:${KC["Sem Status"]}"></i><i style="flex:${c[2]};background:var(--red)"></i><i style="flex:${c[1]};background:var(--grn)"></i></div><em>${esc(n)}</em></div>`).join("");
 $("kb").querySelectorAll(".bc").forEach(e=>e.onclick=()=>kpick(1,e.dataset.k));
 const L=q?R.filter(r=>r[0].toUpperCase().includes(q)):R;$("kc").textContent=nf(L.length)+" veículo(s)";
 $("ktb").innerHTML=L.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td><td><span class="bd" style="color:#fff;background:${KC[r[4]]}">${r[4]}</span></td></tr>`).join("")}
$("kq").oninput=krender;kbuild();krender();
const BUILD=1794912640802;
const stamp=s=>$("st").textContent=s;
stamp("Planilha atualizada em 17/11/2026");
let db=null;
(window.claude?claude.use("db"):Promise.resolve(null)).then(async d=>{db=d;if(!d)return;try{const m=await d.doc("v2/meta").get();if(!m.exists||!(m.data().ts>BUILD))return;
 const ld=async(p,n)=>{let a=[];for(let i=0;i<(n||0);i++)a=a.concat(JSON.parse((await d.doc(p+i).get()).data().rows));return a};
 const g=await ld("v2/g",m.data().ng),s=await ld("v2/s",m.data().ns);
 if(g.length){D=g;build();render()}if(s.length){S=s;sbuild();srender()}kbuild();krender();stamp("Atualizado em "+m.data().at)}catch(e){}}).catch(()=>{});
$("up").onclick=()=>$("fi").click();
$("fi").onchange=async e=>{const f=e.target.files[0];if(!f)return;
 try{const [A,B,C]=parseWB(XLSX.read(await f.arrayBuffer(),{type:"array"}));if(!A&&!B&&!C)throw 0;
  if(A){D=A;build();render()}if(B){S=B;sbuild();srender()}kbuild();krender();
  const at=new Date().toLocaleString("pt-BR");stamp("Atualizado em "+at);
  if(db){try{const sv=async(p,r)=>{const n=Math.ceil(r.length/400);for(let i=0;i<n;i++)await db.doc(p+i).set({rows:JSON.stringify(r.slice(i*400,i*400+400))});return n};
   let m={};try{const o=await db.doc("v2/meta").get();if(o.exists)m=o.data()}catch(x){}
   if(A)m.ng=await sv("v2/g",A);if(B)m.ns=await sv("v2/s",B);m.at=at;m.ts=Date.now();await db.doc("v2/meta").set(m);stamp("Atualizado e salvo em "+at)}catch(x){stamp("Atualizado (não foi possível salvar para os outros)")}}
 }catch(x){console.error(x);stamp("Não consegui ler esta planilha. Use as abas TRATADOS e SEM SILLION.")}
 e.target.value=""};


(function(){const cv=document.getElementById("cv"),lg=document.querySelector("aside .logo").src;
document.getElementById("cvlogo").src=lg;document.getElementById("cvwm").src=lg;
cv.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{document.querySelector('.nv[data-v="'+b.dataset.go+'"]').click();cv.classList.add("out")});
const nf2=n=>n.toLocaleString("pt-BR"),g=i=>document.getElementById(i);
function cvStats(){const t=D.length,m=D.filter(r=>r[6]).length,w=t-m,pw=t?w/t*100:0,pm=t?m/t*100:0;
g("cs0").textContent=nf2(t);g("cs1").textContent=pw.toLocaleString("pt-BR",{minimumFractionDigits:1,maximumFractionDigits:1})+"%";g("cs2").textContent=nf2(m);g("cs3").textContent=nf2(S.length);g("cs4").textContent=nf2(new Set(D.map(r=>r[3])).size);
g("cs1b").textContent=nf2(w);g("cs2b").textContent=nf2(m);g("cbw").style.width=pw+"%";g("cbm").style.width=pm+"%"}
cvStats();
document.getElementById("home").onclick=()=>{cvStats();cv.classList.remove("out")}})();
