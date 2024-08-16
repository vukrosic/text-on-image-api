import { servicesTable } from '@/lib/airtable';
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const records = await servicesTable.select().all();
        const services = records.map(record => ({
            id: record.id,
            ...record.fields
        }));
        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Error fetching services' }, { status: 500 });
    }
}

interface Service {
    fields: {
        Title: string;
        Description: string;
    };
}

export async function POST(request: Request) {
    try {
        const body: Service[] = await request.json();
        const newRecord = await servicesTable.create(body);
        return NextResponse.json(newRecord);
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({ error: 'Error creating service' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const deletedRecord = await servicesTable.destroy([body])
        return NextResponse.json(deletedRecord);
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json({ error: 'Error deleting service' }, { status: 500 });
    }
}