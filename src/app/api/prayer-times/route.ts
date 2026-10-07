import { prayerDefinitions, prayerMethods, type PrayerDay } from "@/lib/prayer-times";
const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{"Cache-Control":"no-store"}});
async function getDay(timestamp:number,latitude:number,longitude:number,method:number):Promise<PrayerDay>{
  const query=new URLSearchParams({latitude:String(latitude),longitude:String(longitude),method:String(method),school:"0",iso8601:"true"});
  const response=await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?${query}`,{signal:AbortSignal.timeout(12000)});
  if(!response.ok)throw new Error("Prayer provider unavailable");
  const result=await response.json() as {code:number;data:{timings:Record<string,string>;meta:{timezone:string}}};
  const data=result.data;
  if(result.code!==200||!data?.meta?.timezone)throw new Error("Invalid prayer response");
  new Intl.DateTimeFormat("fr-FR",{timeZone:data.meta.timezone});
  const times={} as PrayerDay["times"];
  for(const prayer of prayerDefinitions){
    const value=data.timings[prayer.key];
    if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(value??"")||!Number.isFinite(Date.parse(value)))throw new Error("Invalid prayer time");
    times[prayer.key]=value;
  }
  const sunrise=data.timings.Sunrise;
  if(!Number.isFinite(Date.parse(sunrise)))throw new Error("Invalid sunrise");
  return {times,sunrise,timezone:data.meta.timezone,date:times.Fajr.slice(0,10)};
}
export async function GET(request:Request){
  const query=new URL(request.url).searchParams;
  const latitude=Number(query.get("latitude")),longitude=Number(query.get("longitude")),method=Number(query.get("method")??3);
  if(!query.has("latitude")||!query.has("longitude")||!Number.isFinite(latitude)||!Number.isFinite(longitude)||Math.abs(latitude)>90||Math.abs(longitude)>180||!prayerMethods.some(item=>item.id===method))return json({error:"Localisation ou méthode de calcul invalide."},400);
  try{
    const timestamp=Math.floor(Date.now()/1000);
    const [yesterday,today,tomorrow]=await Promise.all([getDay(timestamp-86400,latitude,longitude,method),getDay(timestamp,latitude,longitude,method),getDay(timestamp+86400,latitude,longitude,method)]);
    return json({today,tomorrow,previousIsha:yesterday.times.Isha});
  }catch{return json({error:"Les horaires sont momentanément indisponibles. Réessayez dans un instant."},503)}
}
