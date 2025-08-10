"use client";
import React,{useEffect,useState}from'react';
import{Globe,Pill,ChevronRight,Settings,Bookmark,PlusCircle,Activity,FlaskConical,Microscope,FileText,BadgeCheck,AlertTriangle,DollarSign,Link as LinkIcon,Stethoscope}from'lucide-react';
import{Card,CardContent,CardHeader,CardTitle}from'@/components/ui/card';
import{Button}from'@/components/ui/button';
import{Badge}from'@/components/ui/badge';
import{Sheet,SheetContent,SheetHeader,SheetTitle,SheetDescription,SheetTrigger}from'@/components/ui/sheet';
import LanguageToggle from "@/components/LanguageToggle";
import { useI18n } from "@/lib/i18n";

export default function Page(){
  const { t } = useI18n();
  const[region,setRegion]=useState('Global');
  const[saved,setSaved]=useState(new Set());
  const[watchlist,setWatchlist]=useState(['Lenvatinib','Pembrolizumab']);
  const[citationsOpen,setCitationsOpen]=useState(false);
  const[active,setActive]=useState(null);
  const[state,setState]=useState<any>({date:'',highlights:[],trials:[],research:[]});
  useEffect(()=>{fetch('/api/mock').then(r=>r.json()).then(d=>setState(d))},[]);
  const toggleSave=(id:string)=>setSaved((p:any)=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n});
  const addWatch=()=>{const t=window.prompt('Add to watchlist…');if(t&&!watchlist.includes(t))setWatchlist((w:any)=>[...w,t])};
  const openCite=(title:any,citations:any)=>{setActive({title,citations});setCitationsOpen(true)};
  return <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900'>
    <header className='sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200'>
      <div className='mx-auto max-w-7xl px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-2xl bg-slate-900 text-white grid place-items-center shadow-sm'><Stethoscope className='w-5 h-5'/></div>
          <div><h1 className='text-lg font-semibold leading-tight'>{t('appTitle')}</h1><p className='text-xs text-slate-500 -mt-0.5'>{t('tagline')}</p></div>
        </div>
        <div className='flex items-center gap-2 text-xs text-slate-500'>
          <div className='px-2 py-0.5 rounded-full bg-slate-100'>{t('environment')}: {region}</div>
          <LanguageToggle />
          <div>{t('lastRefresh')}: <span className='font-medium'>{state.date||'loading…'}</span></div>
        </div>
      </div>
    </header>

    <section className='border-b border-slate-200 bg-white/60'>
      <div className='mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center gap-2'>
        <div className='ml-auto inline-flex rounded-xl border border-slate-200 overflow-hidden'>
          <button className='px-3 py-1.5 text-sm hover:bg-slate-100' onClick={()=>setRegion('Global')}>{t('global')}</button>
          <button className='px-3 py-1.5 text-sm hover:bg-slate-100' onClick={()=>setRegion('EU')}>{t('eu')}</button>
          <button className='px-3 py-1.5 text-sm hover:bg-slate-100' onClick={()=>setRegion('US')}>{t('us')}</button>
        </div>
        <div className='inline-flex rounded-xl border border-slate-200 overflow-hidden'>
          <button className='px-3 py-1.5 text-sm hover:bg-slate-100'>{t('daily')}</button>
          <button className='px-3 py-1.5 text-sm hover:bg-slate-100'>{t('weekly')}</button>
        </div>
      </div>
    </section>

    <main className='mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-4'>
      <section className='lg:col-span-5 space-y-4'>
        <Card className='shadow-sm'>
          <CardHeader className='pb-2'><CardTitle className='text-base flex items-center gap-2'><Activity className='w-4 h-4'/>{t('highlightsTitle')}</CardTitle></CardHeader>
          <CardContent className='space-y-3'>{state.highlights.map((h:any)=>(
            <div key={h.id} className='flex items-start gap-3 p-3 rounded-xl border border-slate-200/70 hover:bg-slate-50'>
              <div className='mt-0.5 text-slate-700'><Pill className='w-5 h-5'/></div>
              <div className='flex-1'>
                <div className='flex items-center gap-2'><h3 className='font-medium leading-tight'>{h.title}</h3><Badge variant={h.impact==='High'?'default':'secondary'}>{h.impact}</Badge></div>
                <p className='text-sm text-slate-600 mt-0.5'>{h.summary||'Replace with real content'}</p>
                <div className='text-xs text-slate-500 mt-1'>{h.time||'Today'}</div>
              </div>
              <Button variant='ghost' size='icon' className='shrink-0' onClick={()=>toggleSave(String(h.id))}><Bookmark className={`w-4 h-4 ${Array.from(saved).includes(String(h.id))?'fill-slate-900':''}`}/></Button>
            </div>
          ))}</CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardHeader className='pb-2'><CardTitle className='text-base flex items-center gap-2'><FlaskConical className='w-4 h-4'/>{t('clinicalTrialsTitle')}</CardTitle></CardHeader>
          <CardContent className='space-y-3'>{state.trials.map((trow:any)=>(
            <div key={trow.id} className='flex items-start gap-3 p-3 rounded-xl border border-slate-200/70 hover:bg-slate-50'>
              <div className='mt-0.5'><FileText className='w-5 h-5'/></div>
              <div className='flex-1'>
                <div className='flex flex-wrap items-center gap-2'><h3 className='font-medium leading-tight'>{trow.title}</h3><Badge variant='secondary'>{trow.phase}</Badge><Badge>{trow.status}</Badge><span className='text-xs text-slate-500'>{trow.location}</span></div>
                <p className='text-xs text-slate-500 mt-1'>ID: {trow.id}</p>
              </div>
              <Button variant='ghost' size='icon' className='shrink-0'><ChevronRight className='w-4 h-4'/></Button>
            </div>
          ))}</CardContent>
        </Card>
      </section>

      <section className='lg:col-span-4 space-y-4'>
        <Card className='shadow-sm'>
          <CardHeader className='pb-2'><CardTitle className='text-base flex items-center gap-2'><Microscope className='w-4 h-4'/>{t('latestResearchTitle')}</CardTitle></CardHeader>
          <CardContent className='space-y-3'>{state.research.map((r:any)=>(
            <div key={r.id} className='p-3 rounded-xl border border-slate-200/70 hover:bg-slate-50'>
              <div className='flex items-start justify-between gap-3'>
                <div><h3 className='font-medium leading-tight'>{r.title}</h3><p className='text-sm text-slate-600'>{r.journal}</p><p className='text-xs text-slate-500 mt-0.5'>{r.date}</p></div>
                <div className='flex items-center gap-2'>
                  <Button size='sm' variant={Array.from(saved).includes(r.id)?'default':'outline'} className='gap-2' onClick={()=>toggleSave(r.id)}><Bookmark className='w-4 h-4'/>{t('save')}</Button>
                  <Sheet>
                    <SheetTrigger asChild><Button size='sm' className='gap-2' onClick={()=>openCite(r.title, r.citations||[])}>{t('citations')} <ChevronRight className='w-4 h-4'/></Button></SheetTrigger>
                    {citationsOpen && active?.title===r.title && (<SheetContent side='right' className='w-[420px] sm:w-[560px]'>
                      <SheetHeader><SheetTitle className='flex items-center gap-2'><BadgeCheck className='w-5 h-5'/>{active?.title}</SheetTitle><SheetDescription>Source cards go here.</SheetDescription></SheetHeader>
                      <div className='mt-4 space-y-3'>{(active?.citations||[]).map((c:any,idx:number)=>(
                        <div key={idx} className='p-3 border rounded-xl hover:bg-slate-50'><div className='flex items-center justify-between gap-2'><div className='font-medium'>{c.label}</div><a href={c.url} target='_blank' rel='noreferrer' className='text-sm underline'>{c.url}</a></div></div>
                      ))}</div>
                    </SheetContent>)}
                  </Sheet>
                </div>
              </div>
            </div>
          ))}</CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardHeader className='pb-2'><CardTitle className='text-base flex items-center gap-2'><DollarSign className='w-4 h-4'/>{t('costsInsuranceTitle')}</CardTitle></CardHeader>
          <CardContent className='space-y-3'>
            <div className='p-3 rounded-xl border border-slate-200/70'>
              <div className='flex items-center justify-between'>
                <div><h3 className='font-medium leading-tight'>Example therapy</h3><p className='text-sm text-slate-600'>€200–€600 / month (EU co-pay estimate)</p></div>
                <span className='px-2 py-0.5 text-xs rounded-full bg-slate-900 text-white'>EU</span>
              </div>
              <p className='text-xs text-slate-500 mt-1'>Replace with country-specific rules.</p>
            </div>
            <div className='p-3 rounded-xl border border-slate-200/70'>
              <div className='flex items-center justify-between'>
                <div><h3 className='font-medium leading-tight'>Example combo</h3><p className='text-sm text-slate-600'>$300–$900 / month (US co-pay estimate)</p></div>
                <span className='px-2 py-0.5 text-xs rounded-full bg-slate-900 text-white'>US</span>
              </div>
              <p className='text-xs text-slate-500 mt-1'>Replace with payer plan details.</p>
            </div>
            <Button variant='outline' className='w-full gap-2'>{t('exportCosts')} <ChevronRight className='w-4 h-4'/></Button>
          </CardContent>
        </Card>
      </section>

      <section className='lg:col-span-3 space-y-4'>
        <Card className='shadow-sm'>
          <CardHeader className='pb-2'><CardTitle className='text-base flex items-center gap-2'><Settings className='w-4 h-4'/>{t('profileTitle')}</CardTitle></CardHeader>
          <CardContent className='space-y-3 text-sm'>
            <div className='flex items-center justify-between'><span>{t('diseaseProfile')}</span><span className='px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700'>HCC</span></div>
            <div className='flex items-center justify-between'><span>{t('notifications')}</span><span className='px-2 py-0.5 text-xs rounded-full bg-slate-900 text-white'>Daily</span></div>
            <div className='flex items-center justify-between'><span>{t('languageLabel')}</span><span className='px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700'>EN/TH</span></div>
            <Button variant='outline' className='w-full gap-2 mt-2'><Settings className='w-4 h-4'/>Edit preferences</Button>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardHeader className='pb-2'><CardTitle className='text-base flex items-center gap-2'><Bookmark className='w-4 h-4'/>{t('watchlistTitle')}</CardTitle></CardHeader>
          <CardContent className='flex flex-wrap gap-2'>
            {watchlist.map((w:any)=><span key={w} className='px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700'>{w}</span>)}
            <Button size='sm' variant='ghost' className='gap-2 mt-1' onClick={addWatch}><PlusCircle className='w-4 h-4'/>Add</Button>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardHeader className='pb-2'><CardTitle className='text-base flex items-center gap-2'><AlertTriangle className='w-4 h-4'/>{t('disclaimerTitle')}</CardTitle></CardHeader>
          <CardContent className='text-sm text-slate-600 space-y-2'>
            <p>{t('disclaimer1')}</p>
            <p className='text-xs text-slate-500'>{t('disclaimer2')}</p>
          </CardContent>
        </Card>
      </section>
    </main>

    <footer className='mx-auto max-w-7xl px-4 pb-10 text-xs text-slate-500'><div className='border-t pt-4'>© 2025 MediScan.</div></footer>
  </div>;
}
