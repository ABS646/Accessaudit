import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
export async function POST(req: Request) {
  if (process.env.DEMO_PAYMENTS !== 'true') return NextResponse.json({error:'Demo payments are disabled.'},{status:403});
  try { const {id}=await req.json(); if(typeof id!=='string') return NextResponse.json({error:'Missing order.'},{status:400});
    const {error}=await supabaseAdmin().from('audit_orders').update({payment_status:'paid'}).eq('id',id); if(error)throw error;
    return NextResponse.json({ok:true});
  } catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Payment simulation failed.'},{status:400});}
}
