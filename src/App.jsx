const { useState } = React;

const FACTORS = [
  {id:"age",label:"Age",options:[
    {value:0,label:"Under 18 or 45–49 (0 pts)"},{value:25,label:"18–24 (25 pts)"},{value:30,label:"25–32 (30 pts)"},{value:25,label:"33–39 (25 pts)"},{value:15,label:"40–44 (15 pts)"},
  ]},
  {id:"english",label:"English Language Ability",options:[
    {value:0,label:"Competent — IELTS 6 in each (0 pts)"},{value:10,label:"Proficient — IELTS 7 in each (10 pts)"},{value:20,label:"Superior — IELTS 8 in each (20 pts)"},
  ]},
  {id:"overseasWork",label:"Overseas Skilled Work Experience",options:[
    {value:0,label:"Less than 3 years (0 pts)"},{value:5,label:"3–4 years (5 pts)"},{value:10,label:"5–7 years (10 pts)"},{value:15,label:"8–10 years (15 pts)"},
  ]},
  {id:"australianWork",label:"Australian Skilled Work Experience",options:[
    {value:0,label:"Less than 1 year (0 pts)"},{value:5,label:"1–2 years (5 pts)"},{value:10,label:"3–4 years (10 pts)"},{value:15,label:"5–7 years (15 pts)"},{value:20,label:"8–9 years (20 pts)"},{value:25,label:"10+ years (25 pts)"},
  ]},
  {id:"education",label:"Educational Qualifications",options:[
    {value:0,label:"No qualification (0 pts)"},{value:10,label:"Diploma or trade (10 pts)"},{value:15,label:"Bachelor degree (15 pts)"},{value:20,label:"Doctorate (20 pts)"},
  ]},
  {id:"australianStudy",label:"Australian Study Requirement",options:[
    {value:0,label:"Did not study in Australia (0 pts)"},{value:5,label:"1+ year study in Australia (5 pts)"},
  ]},
  {id:"specialistEdu",label:"Specialist Education Qualification",options:[
    {value:0,label:"No specialist degree (0 pts)"},{value:10,label:"Masters by research in STEM (10 pts)"},
  ]},
  {id:"partnerSkills",label:"Partner Skills",options:[
    {value:0,label:"No partner / not eligible (0 pts)"},{value:5,label:"Partner has competent English only (5 pts)"},{value:10,label:"Partner has skilled nomination (10 pts)"},
  ]},
  {id:"professionalYear",label:"Professional Year in Australia",options:[
    {value:0,label:"No professional year (0 pts)"},{value:5,label:"Completed professional year (5 pts)"},
  ]},
  {id:"communityLang",label:"Accredited Community Language",options:[
    {value:0,label:"No NAATI accreditation (0 pts)"},{value:5,label:"NAATI accredited (5 pts)"},
  ]},
  {id:"regionalStudy",label:"Study in Regional Australia",options:[
    {value:0,label:"No regional study (0 pts)"},{value:5,label:"2+ years in regional area (5 pts)"},
  ]},
  {id:"sponsorship",label:"State/Territory Sponsorship",options:[
    {value:0,label:"No sponsorship (0 pts)"},{value:5,label:"State sponsorship — subclass 190 (5 pts)"},{value:15,label:"Regional sponsorship — subclass 491 (15 pts)"},
  ]},
];

export default function AustraliaPointsTest() {
  const [values,setValues] = useState(Object.fromEntries(FACTORS.map(f=>[f.id,0])));
  const [result,setResult] = useState(null);

  const set = (id,val) => setValues(v=>({...v,[id]:parseInt(val)}));
  const total = Object.values(values).reduce((a,b)=>a+b,0);
  const calculate = () => setResult({ total, breakdown: FACTORS.map(f=>({label:f.label,points:values[f.id]})).filter(f=>f.points>0) });

  const inputStyle={width:"100%",padding:"10px 12px",border:"2px solid #bbf7d0",borderRadius:9,fontSize:14,outline:"none",background:"#fff"};
  const labelStyle={display:"block",fontSize:13,fontWeight:600,color:"#444",marginBottom:4};

  return (
    <div style={{fontFamily:"'Segoe UI',Arial,sans-serif",background:"#f0fdf4",minHeight:"100vh",padding:"20px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:48,marginBottom:8}}>🇦🇺</div>
          <h1 style={{margin:0,fontSize:32,fontWeight:800,color:"#1a1a2e"}}>Australia Points Test Calculator</h1>
          <p style={{margin:"8px 0 0",color:"#555",fontSize:16}}>Subclass 189 · 190 · 491 — skilled migration points</p>
        </div>

        <div style={{background:"#059669",color:"#fff",borderRadius:14,padding:"16px 24px",marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:13,opacity:0.8}}>Your running total</div>
            <div style={{fontSize:40,fontWeight:900}}>{total} pts</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:13,opacity:0.8}}>Minimum to apply (189/190/491)</div>
            <div style={{fontSize:28,fontWeight:700}}>65 pts</div>
            <div style={{fontSize:13,marginTop:4,background:total>=65?"rgba(255,255,255,0.2)":"rgba(255,100,100,0.3)",borderRadius:8,padding:"4px 10px"}}>
              {total>=65?`✅ ${total-65} pts above threshold`:`❌ Need ${65-total} more pts`}
            </div>
          </div>
        </div>

        <div style={{background:"#fff",borderRadius:16,padding:28,boxShadow:"0 4px 24px rgba(0,0,0,0.08)",marginBottom:24}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px,1fr))",gap:20}}>
            {FACTORS.map(factor=>(
              <div key={factor.id}>
                <label style={labelStyle}>{factor.label}</label>
                <select value={values[factor.id]} onChange={e=>set(factor.id,e.target.value)} style={inputStyle}>
                  {factor.options.map((opt,i)=><option key={i} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{width:"100%",marginTop:24,padding:"16px",background:"linear-gradient(135deg, #059669, #0d9488)",color:"#fff",border:"none",borderRadius:12,fontSize:18,fontWeight:700,cursor:"pointer"}}>Calculate My Points</button>
        </div>

        {result && <>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:16,marginBottom:24}}>
            {[
              {label:"Total Points",value:result.total,color:"#059669",bg:"#f0fdf4"},
              {label:"189 Threshold",value:"65 pts",color:result.total>=65?"#059669":"#dc2626",bg:result.total>=65?"#f0fdf4":"#fff5f5"},
              {label:"Status",value:result.total>=65?"Eligible ✅":"Not yet ❌",color:result.total>=65?"#059669":"#dc2626",bg:result.total>=65?"#f0fdf4":"#fff5f5"},
              {label:"Surplus / Deficit",value:`${result.total>=65?"+":""}${result.total-65}`,color:result.total>=65?"#059669":"#dc2626",bg:"#f8fafc"},
            ].map((item,i)=>(
              <div key={i} style={{background:item.bg,borderRadius:14,padding:18,textAlign:"center",border:`2px solid ${item.color}22`}}>
                <div style={{fontSize:20,fontWeight:800,color:item.color}}>{item.value}</div>
                <div style={{fontSize:12,color:"#555",marginTop:4,fontWeight:500}}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
            <div style={{background:"#fff",borderRadius:16,padding:24,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#1a1a2e"}}>Points Breakdown</h3>
              {result.breakdown.length===0 ? <p style={{color:"#888",fontSize:14}}>No points scored yet.</p> : result.breakdown.map((row,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #f1f3f5"}}>
                  <span style={{fontSize:14,color:"#444"}}>{row.label}</span>
                  <span style={{fontSize:14,fontWeight:700,color:"#059669"}}>+{row.points}</span>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 0",borderTop:"2px solid #e9ecef",marginTop:4}}>
                <span style={{fontSize:15,fontWeight:700}}>Total</span>
                <span style={{fontSize:15,fontWeight:800,color:"#059669"}}>{result.total} pts</span>
              </div>
            </div>
            <div style={{background:"#fff",borderRadius:16,padding:24,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#1a1a2e"}}>Visa Subclass Thresholds</h3>
              {[
                {visa:"Subclass 189",name:"Skilled Independent",pts:65,note:"No sponsorship needed"},
                {visa:"Subclass 190",name:"Skilled Nominated",pts:65,note:"+5 pts from state sponsorship"},
                {visa:"Subclass 491",name:"Skilled Work Regional",pts:65,note:"+15 pts from regional sponsorship"},
              ].map((v,i)=>(
                <div key={i} style={{padding:"12px 0",borderBottom:"1px solid #f1f3f5"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:"#333"}}>{v.visa}</div>
                      <div style={{fontSize:12,color:"#888"}}>{v.name} — {v.note}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:14,fontWeight:700,color:result.total>=v.pts?"#059669":"#dc2626"}}>{v.pts} pts min</div>
                      <div style={{fontSize:12,color:result.total>=v.pts?"#059669":"#dc2626"}}>{result.total>=v.pts?"✅ Eligible":"❌ Not yet"}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{marginTop:14,padding:12,background:"#f0fdf4",borderRadius:10,fontSize:13,color:"#166534"}}>
                💡 Meeting 65 pts lets you submit an EOI. Invitations go to highest scores first.
              </div>
            </div>
          </div>
        </>}
      </div>
    </div>
  );
}
