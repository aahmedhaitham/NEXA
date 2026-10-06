import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS"};
Deno.serve(async(req:Request)=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
 if(req.method!=="POST") return new Response("Method not allowed",{status:405,headers:cors});
 try{
  const auth=req.headers.get("Authorization");
  if(!auth) return Response.json({ok:false,error:"Authentication required"},{status:401,headers:cors});
  const url=Deno.env.get("SUPABASE_URL")!;
  const anon=Deno.env.get("SUPABASE_ANON_KEY")||Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
  const key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||Deno.env.get("SUPABASE_SECRET_KEY");
  if(!anon||!key) throw new Error("Supabase keys unavailable");
  const authClient=createClient(url,anon,{global:{headers:{Authorization:auth}}});
  const {data:{user},error:userError}=await authClient.auth.getUser();
  if(userError||!user) return Response.json({ok:false,error:"Invalid session"},{status:401,headers:cors});
  const {subscription,timezone,reminderData}=await req.json();
  if(!subscription?.endpoint) throw new Error("Missing push subscription");
  const db=createClient(url,key);
  const row={user_id:user.id,endpoint:subscription.endpoint,subscription,timezone:timezone||"UTC",reminder_data:reminderData||{},enabled:true,updated_at:new Date().toISOString()};
  const {error}=await db.from("push_subscriptions").upsert(row,{onConflict:"endpoint"});
  if(error) throw error;
  return Response.json({ok:true},{headers:cors});
 }catch(e:any){return Response.json({ok:false,error:String(e?.message||e)},{status:400,headers:cors});}
});