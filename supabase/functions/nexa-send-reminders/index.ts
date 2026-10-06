import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {createClient} from "jsr:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";
const PUBLIC="BN7vQcBHEU01MVVBFp-wrTsS3AcVdBDLYwRxT2x34JDx7E18sssb4dM1Nqd9M8RQW4SYAojthWs1pRSsl1cnxlE";
const LAT=30.0444,LNG=31.2357;
const min=(s:string)=>{const [h,m]=String(s||"00:00").split(":").map(Number);return h*60+m};
function parts(tz:string){
 const a=new Intl.DateTimeFormat("en-CA",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date());
 const g=(x:string)=>a.find(p=>p.type===x)?.value||"";
 return {date:`${g("year")}-${g("month")}-${g("day")}`,day:g("weekday").toLowerCase().slice(0,3),clock:`${g("hour")}:${g("minute")}`,y:+g("year"),mo:+g("month"),d:+g("day"),h:+g("hour"),mi:+g("minute")};
}
const deg=(x:number)=>x*Math.PI/180,rad=(x:number)=>x*180/Math.PI,clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
function prayers(p:any,tz:string){
 const localNoon=new Date(Date.UTC(p.y,p.mo-1,p.d,12,0)); const z=new Intl.DateTimeFormat("en-US",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(localNoon);
 const g=(x:string)=>+(z.find(q=>q.type===x)?.value||0); const represented=Date.UTC(g("year"),g("month")-1,g("day"),g("hour"),g("minute"));
 const off=(represented-localNoon.getTime())/3600000;
 const date=new Date(p.y,p.mo-1,p.d); const N=Math.floor((date.getTime()-new Date(p.y,0,0).getTime())/86400000),B=deg(360/365*(N-81));
 const eot=9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B),decl=deg(23.45*Math.sin(deg(360/365*(284+N)))),lat=deg(LAT),noon=12+off-LNG/15-eot/60;
 const ha=(a:number)=>rad(Math.acos(clamp((-Math.sin(deg(a))-Math.sin(lat)*Math.sin(decl))/(Math.cos(lat)*Math.cos(decl)),-1,1)))/15;
 const alt=Math.atan(1/(1+Math.tan(Math.abs(lat-decl)))),ac=(Math.sin(alt)-Math.sin(lat)*Math.sin(decl))/(Math.cos(lat)*Math.cos(decl)),asr=rad(Math.acos(clamp(ac,-1,1)))/15;
 return {fajr:noon-ha(19.5),dhuhr:noon+1/60,asr:noon+asr,maghrib:noon+ha(.833),isha:noon+ha(17.5)};
}
Deno.serve(async(req:Request)=>{
 const url=Deno.env.get("SUPABASE_URL")!,key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||Deno.env.get("SUPABASE_SECRET_KEY"),priv=Deno.env.get("VAPID_PRIVATE_KEY");
 if(!key||!priv)return Response.json({ok:false,error:"Server secrets missing"},{status:500});
 webpush.setVapidDetails(Deno.env.get("VAPID_SUBJECT")||"https://nexa-kappa-puce.vercel.app",PUBLIC,priv);
 const db=createClient(url,key),{data,error}=await db.from("push_subscriptions").select("*").eq("enabled",true);
 if(error)return Response.json({ok:false,error:error.message},{status:500});
 let force=false;try{force=(await req.json())?.force===true}catch{}
 let sent=0,failed=0,checked=0;
 for(const row of data||[]){
  checked++; const p=parts(row.timezone||"UTC"),now=min(p.clock),rd=row.reminder_data||{},ns=rd.notificationSettings||{classes:true,habits:true,prayer:true,events:true},lead=rd.notificationLead||{classes:15,habits:0,prayer:0,events:0},sentMap:any={};
  for(const [k,v] of Object.entries(row.sent_reminders||{}))if(k.startsWith(p.date+"|"))sentMap[k]=v;
  const queue:any[]=[]; const add=(key:string,title:string,body:string)=>{if(!sentMap[key])queue.push({key,title,body})};
  if(force)add(p.date+"|test","Nexa test notification","Background Web Push is working.");
  if(!force){
   if(ns.classes!==false) for(const c of rd.classes||[]){if(c.day==="daily"||c.day===p.day){const st=min(c.start),n=Number(lead.classes||0),at=st-n;if(now>=at&&now<=at+20)add(p.date+"|class|"+c.id,n?"Class in "+n+" minutes":"Class now",c.subject+(c.room?" · "+c.room:""));}}
   if(ns.events!==false) for(const e of rd.events||[]){if(!e.done&&e.date===p.date&&now>=540-Number(lead.events||0))add(p.date+"|event|"+e.id,"Today: "+e.title,e.type||"Calendar event");}
   if(ns.habits!==false){
    const logs=(rd.habitLogs||{})[p.date]||{}, habits=rd.habits||[];
    for(const h of habits){if(h.time&&!logs[h.id]){const at=min(h.time)-Number(lead.habits||0);if(now>=at&&now<=at+20)add(p.date+"|habit|"+h.id,"Habit reminder",h.name);}}
    const untimed=habits.filter((h:any)=>!h.time&&!logs[h.id]); if(untimed.length&&now>=1200)add(p.date+"|habits","Habit check-in","Complete today’s habits in Nexa.");
   }
   const pt=prayers(p,row.timezone||"UTC"); if(ns.prayer!==false) for(const [k,label] of [["fajr","Fajr"],["dhuhr","Dhuhr"],["asr","Asr"],["maghrib","Maghrib"],["isha","Isha"]] as any){const n=Number(lead.prayer||0),at=Math.round(pt[k]*60)-n;if(now>=at&&now<=at+20)add(p.date+"|prayer|"+k,label+" prayer",n?label+" is in "+n+" minutes.":"It’s time for "+label+".");}
  }
  for(const q of queue){try{const res=await webpush.sendNotification(row.subscription,JSON.stringify({title:q.title,body:q.body,tag:q.key,url:"./"}));sentMap[q.key]=true;sent++;console.log("PUSH SUCCESS",row.id,q.key,res?.statusCode)}catch(e:any){failed++;console.error("PUSH FAILED",row.id,q.key,e?.statusCode||e?.status,String(e?.message||e));if([404,410].includes(e?.statusCode||e?.status)){await db.from("push_subscriptions").delete().eq("id",row.id);break;}}}
  await db.from("push_subscriptions").update({sent_reminders:sentMap,updated_at:new Date().toISOString()}).eq("id",row.id);
 }
 return Response.json({ok:failed===0,checked,sent,failed,force});
});