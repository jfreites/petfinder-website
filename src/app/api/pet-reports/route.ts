import { NextResponse } from 'next/server'

import { pb } from '@/lib/pocketbase'

export async function GET() {
    try {
        // fetch data from pet_reports collection
        console.log(`Fetch data from PocketBase`)
        const reports = await pb.collection('pet_reports').getList(1, 6, {
            sort: '-created',
        })
        return NextResponse.json({ reports: reports, error: false })
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ reports: [], error: error })
    }
}
