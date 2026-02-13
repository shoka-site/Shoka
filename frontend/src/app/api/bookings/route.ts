import { NextResponse, NextRequest } from 'next/server';
import { createDatabase } from '@/lib/db';

export async function GET() {
    try {
        const db = await createDatabase();
        const bookings = await db.all('SELECT * FROM bookings ORDER BY id DESC');
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, date, time, service_type } = body;

        if (!name || !email || !date || !time || !service_type) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }

        const db = await createDatabase();
        const result = await db.run(
            `INSERT INTO bookings (name, email, date, time, service_type)
       VALUES (?, ?, ?, ?, ?)`,
            [name, email, date, time, service_type]
        );

        return NextResponse.json({ id: result.lastID, message: 'Booking created successfully.' }, { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
