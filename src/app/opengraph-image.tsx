import { ImageResponse } from "next/og";
export const alt = "MIRÂTH — Coran, Hadith et vidéos. Le savoir en partage.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:80,background:"#123c32",color:"#f8f5ee",position:"relative" }}>
    <div style={{position:"absolute",right:60,top:55,width:330,height:520,border:"1px solid #b69a63",borderRadius:"180px 180px 0 0",display:"flex",opacity:.35}} />
    <div style={{fontSize:24,letterSpacing:8,color:"#d8be86",display:"flex"}}>LE SAVOIR EN PARTAGE</div>
    <div style={{fontSize:110,letterSpacing:-5,marginTop:36,display:"flex",fontWeight:700}}>MIRÂTH</div>
    <div style={{fontSize:38,marginTop:28,display:"flex"}}>Coran · Hadith · Vidéos</div>
    <div style={{fontSize:21,marginTop:60,display:"flex",color:"#d8be86"}}>miraath.netlify.app · Accès libre</div>
  </div>,size);
}
