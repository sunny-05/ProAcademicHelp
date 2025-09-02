import { NextResponse } from 'next/server';
import { ensureDirs, readJSONSafe, writeJSON, CONTACTS_JSON } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function POST(req){
  try{
    ensureDirs();
    const form = await req.formData();
    const item = {
      name: String(form.get('name')||'').trim(),
      email: String(form.get('email')||'').trim(),
      phone: String(form.get('phone')||'').trim(),
      subject: String(form.get('subject')||'').trim(),
      message: String(form.get('message')||'').trim(),
      createdAt: Date.now()
    };
    if(!item.name || !item.email || !item.message){
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const list = readJSONSafe(CONTACTS_JSON, []);
    list.push(item);
    writeJSON(CONTACTS_JSON, list);
    return NextResponse.json({ ok:true });
  }catch(err){
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
