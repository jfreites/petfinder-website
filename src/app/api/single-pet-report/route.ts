import { NextResponse } from 'next/server'

import { pb } from '@/lib/pocketbase'

export async function GET(recordId: any) {
    try {
        // authenticate as auth collection record
        //await pb.collection('users').authWithPassword('jonathanfreites@outlook.com', 'X@7!M!*VFW2tmRtM');
        // fetch data from pet_reports collection
        console.log(`Fetch data from PocketBase`)
        const report = await pb.collection('pet_reports').getOne(recordId)

        return NextResponse.json({ report: report, error: false })
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ report: null, error: error })
    }
}
