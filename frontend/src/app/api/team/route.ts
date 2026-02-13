import { NextResponse } from 'next/server';
import { createDatabase } from '@/lib/db';

export async function GET() {
    try {
        const db = await createDatabase();
        const team = await db.all('SELECT id, name, email, phone, role FROM team_members ORDER BY id ASC');
        return NextResponse.json(team);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
