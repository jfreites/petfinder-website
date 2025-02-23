import { NextResponse } from 'next/server'

import { pb } from '@/lib/pocketbase'

export async function GET() {
    try {
        console.log(`Fetch data from PocketBase`)
        const posts = await pb.collection('posts').getList(1, 10, {
            sort: '-created',
        })
        return NextResponse.json({ posts: posts, error: false })
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ posts: [], error: error })
    }
}
