import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS"};
Deno.serve(async(req:Request)=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
 if(req.method!=="POST") return new Response("Method not allowed",{status:405,headers:cors});
 try{
  const url=Deno.env.get("SUPABASE_URL")!;
  const key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||Deno.env.get("SUPABASE_SECRET_KEY");
  if(!key) throw new Error("Supabase server key unavailable");
  const {subscription,timezone,reminderData}=await req.json();
  if(!subscription?.endpoint) throw new Error("Missing push subscription");
  const db=createClient(url,key);
  const row={endpoint:subscription.endpoint,subscription,timezone:timezone||"UTC",reminder_data:reminderData||{},enabled:true,updated_at:new Date().toISOString()};
  const {error}=await db.from("push_subscriptions").upsert(row,{onConflict:"endpoint"});
  if(error) throw error;
  return Response.json({ok:true},{headers:cors});
 }catch(e:any){return Response.json({ok:false,error:String(e?.message||e)},{status:400,headers:cors});}
});