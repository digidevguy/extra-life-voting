'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RealTimeVotes({ votes }: { votes: any }) {
	const supabase = createClientComponentClient();
	const router = useRouter();

	useEffect(() => {
		const channel = supabase
			.channel('realtime-votes')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'votes' },
				() => {
					router.refresh();
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, router]);

	return (
		<>
			{votes?.map(
				(vote: any) =>
					vote.votes.length > 0 && (
						<div
							key={vote.id}
							className='flex flex-row space-x-6 justify-between min-w-full'
						>
							<p>{vote.title}</p>
							<p>{vote.votes.length}</p>
						</div>
					)
			)}
		</>
	);
}
