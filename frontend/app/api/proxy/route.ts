import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
    }

    try {
        const response = await fetch(imageUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }, // Some servers block requests without a User-Agent
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status });
        }

        const imageBuffer = await response.arrayBuffer();
        return new Response(imageBuffer, {
            headers: {
                'Content-Type': response.headers.get('content-type') || 'image/jpeg',
                'Cache-Control': 'public, max-age=86400',
                'Access-Control-Allow-Origin': '*', // Allows browser access
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching image' }, { status: 500 });
    }
}
