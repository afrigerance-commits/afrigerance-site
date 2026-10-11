import { createClient } from '@supabase/supabase-js';
import { siteConfig } from '@/lib/site-config';
import { deviceType, isUuid, publicAnalyticsPath } from '@/lib/analytics/privacy';
import type { Database } from '@/lib/supabase/database.types';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  const reply=(status:number)=>new Response(null,{status,headers:{'Cache-Control':'no-store'}});
  if(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED!=='true' || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) return reply(503);
  const origin=request.headers.get('origin');
  if(!origin || origin!==new URL(siteConfig.url).origin) return reply(403);
  const ua=request.headers.get('user-agent') || '';
  if(/bot|crawler|spider|headless/i.test(ua) || request.headers.get('dnt')==='1' || request.headers.get('sec-gpc')==='1') return reply(204);
  if(Number(request.headers.get('content-length'))>1024) return reply(413);
  try {
    // Read at most 1 KiB even when a client omits Content-Length.
    const reader=request.body?.getReader();if(!reader)return reply(400);
    let text='';let size=0;const decoder=new TextDecoder();
    while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>1024){await reader.cancel();return reply(413);}text+=decoder.decode(value,{stream:true});}
    text+=decoder.decode();const data=JSON.parse(text);
    const path=publicAnalyticsPath(data.path);
    if(!path || !isUuid(data.id) || !isUuid(data.visitor) || !isUuid(data.session) || !['Interne','Moteur de recherche','Réseaux sociaux','Autre site','Direct / inconnu'].includes(data.source)) return reply(400);
    // No IP address or raw user agent is stored. Country is intentionally unavailable.
    const supabase=createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
    const {error}=await supabase.rpc('record_page_view',{p_id:data.id,p_path:path,p_visitor:data.visitor,p_session:data.session,p_device:deviceType(ua),p_source:data.source});
    return reply(error?503:204);
  } catch { return reply(400); }
}
