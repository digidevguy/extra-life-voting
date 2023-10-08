import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
	const supabase = createRouteHandlerClient({ cookies });

	const { data, error } = await supabase
		.from('games')
		.select('id,title')
		.order('title', { ascending: false });
	console.log(data);

	if (error) {
		return NextResponse.json(
			{ error: 'Unable to obtain list' },
			{ status: 500 }
		);
	}

	return NextResponse.json(data, { status: 200 });
}

export async function POST(request: Request) {
	const { game, gameOther, name } = await request.json();
	const supabase = createRouteHandlerClient({ cookies });

	if (gameOther) {
		try {
			const { data: writeData, error: writeError } = await supabase
				.from('games')
				.insert([{ title: gameOther }])
				.select();

			if (writeData) {
				const { data: voteData, error: voteError } = await supabase
					.from('votes')
					.insert([
						{
							game_id: writeData[0].id,
							user_name: name,
						},
					])
					.select();

				return NextResponse.json({ message: 'success' }, { status: 200 });
			}
		} catch (error: any) {
			return NextResponse.json(
				{ message: 'Unable to create game' },
				{ status: 500 }
			);
		}
	}

	try {
		const { data: voteData, error: voteError } = await supabase
			.from('votes')
			.insert([
				{
					game_id: game,
					user_name: name,
				},
			])
			.select();

		return NextResponse.json({ message: 'success' }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ message: 'Unable to create vote' },
			{ status: 500 }
		);
	}
}
