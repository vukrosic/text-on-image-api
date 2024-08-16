import { contactFormTable } from '@/lib/airtable';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        console.log(body);
        const newRecord = await contactFormTable.create(body);
        return NextResponse.json(newRecord);
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return NextResponse.json({ error: 'Error submitting contact form' }, { status: 500 });
    }
}