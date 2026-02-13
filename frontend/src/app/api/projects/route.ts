import { NextResponse } from 'next/server';
import { createDatabase } from '@/lib/db';

export async function GET() {
    try {
        const db = await createDatabase();
        const projects = await db.all('SELECT * FROM projects ORDER BY created_at DESC');
        const normalized = projects.map((p) => ({
            ...p,
            technologies: JSON.parse(p.technologies),
            images: p.images ? JSON.parse(p.images) : []
        }));
        return NextResponse.json(normalized);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
