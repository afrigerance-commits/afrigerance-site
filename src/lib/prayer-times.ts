export const prayerDefinitions = [
  {key:"Fajr",name:"Sobh",arabic:"الصبح",icon:"dawn"},
  {key:"Dhuhr",name:"Dhuhr",arabic:"الظهر",icon:"sun"},
  {key:"Asr",name:"‘Asr",arabic:"العصر",icon:"afternoon"},
  {key:"Maghrib",name:"Maghrib",arabic:"المغرب",icon:"sunset"},
  {key:"Isha",name:"‘Ishâ’",arabic:"العشاء",icon:"moon"},
] as const;
export type PrayerKey = typeof prayerDefinitions[number]["key"];
export type PrayerDay = {times:Record<PrayerKey,string>;sunrise:string;timezone:string;date:string};
export type PrayerSchedule = {today:PrayerDay;tomorrow:PrayerDay;previousIsha:string};
export const prayerCities = [
  {id:"thies",name:"Thiès",latitude:14.791,longitude:-16.9256},
  {id:"dakar",name:"Dakar",latitude:14.7167,longitude:-17.4677},
  {id:"touba",name:"Touba",latitude:14.85,longitude:-15.8833},
  {id:"saint-louis",name:"Saint-Louis",latitude:16.0179,longitude:-16.4896},
  {id:"kaolack",name:"Kaolack",latitude:14.1512,longitude:-16.0726},
  {id:"ziguinchor",name:"Ziguinchor",latitude:12.5681,longitude:-16.2733},
];
export const prayerMethods = [
  {id:3,name:"Ligue islamique mondiale (18° / 17°)"},
  {id:5,name:"Autorité égyptienne (19,5° / 17,5°)"},
  {id:4,name:"Umm al-Qurâ — La Mecque"},
  {id:12,name:"UOIF — France (12° / 12°)"},
];
export function localDateKey(now:number,timezone:string){
  return new Intl.DateTimeFormat("en-CA",{timeZone:timezone,year:"numeric",month:"2-digit",day:"2-digit"}).format(now);
}
export function prayerState(schedule:PrayerSchedule,now:number){
  const all=[schedule.today,schedule.tomorrow].flatMap(day=>prayerDefinitions.map(prayer=>({...prayer,at:Date.parse(day.times[prayer.key]),date:day.date})));
  const next=all.find(prayer=>prayer.at>now);
  if(!next)return null;
  const previous=[...all].reverse().find(prayer=>prayer.at<=now);
  const start=previous?.at??Date.parse(schedule.previousIsha);
  const seconds=Math.max(0,Math.floor((next.at-now)/1000));
  return {next,seconds,progress:Math.max(0,Math.min(1,(now-start)/(next.at-start)))};
}
