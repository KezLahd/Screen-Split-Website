import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/KezLahd/Screen-Split/releases',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Note: For public repositories, you don't need an API token
          // For private repositories, you would need to add:
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch releases');
    }

    const releases = await response.json();
    return NextResponse.json(releases);
  } catch (error) {
    console.error('Error fetching releases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch releases' },
      { status: 500 }
    );
  }
} 