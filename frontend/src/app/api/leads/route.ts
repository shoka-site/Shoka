import { NextResponse, NextRequest } from 'next/server';
import { createDatabase } from '@/lib/db';

export async function GET() {
    try {
        const db = await createDatabase();
        const leads = await db.all('SELECT * FROM leads ORDER BY created_at DESC');
        return NextResponse.json(leads);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, inquiry_type, selected_service, message } = body;

        if (!name || !email || !inquiry_type || !message) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }

        const db = await createDatabase();
        const result = await db.run(
            `INSERT INTO leads (name, email, phone, inquiry_type, selected_service, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [name, email, phone ?? '', inquiry_type, selected_service ?? '', message]
        );

        return NextResponse.json({ id: result.lastID, message: 'Lead submitted successfully.' }, { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
