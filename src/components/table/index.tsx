import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import RealTimeVotes from './realtime-votes';

export default async function Table() {
	const supabase = createServerComponentClient({ cookies });

	const { data, error } = await supabase
		.from('games')
		.select('id, title, votes(id)')
		.order('title', { ascending: true });

	return (
		<div className='flex flex-col items-center py-6 px-6 space-y-4 border border-slate-300 rounded-md bg-slate-200 sm: min-w-full md:min-w-fit'>
			<h1 className='font-semibold text-2xl'>Current Votes</h1>
			<RealTimeVotes votes={data} />
		</div>
	);
}
