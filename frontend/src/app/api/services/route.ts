import { NextResponse } from 'next/server';
import { createDatabase } from '@/lib/db';

export async function GET() {
    try {
        const db = await createDatabase();
        const services = await db.all('SELECT * FROM services ORDER BY created_at DESC');
        const normalized = services.map((s) => ({ ...s, features: JSON.parse(s.features) }));
        return NextResponse.json(normalized);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
