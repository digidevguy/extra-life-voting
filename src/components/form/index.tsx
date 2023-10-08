'use client';
import { useState, useEffect } from 'react';
import FormInput from './form-input';
import FormLabel from './form-label';
import { FETCH_STATUS } from '@/libs/fetchStatus';

export default function Form() {
	const [form, setForm] = useState({
		game: 0,
		gameOther: '',
		name: '',
	});
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(FETCH_STATUS.IDLE);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/form');
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const data: Game[] = await response.json();
				setGames(data);
				setStatus(FETCH_STATUS.IDLE);
			} catch (error: any) {
				setStatus(FETCH_STATUS.ERROR);
				setError(error.message);
				console.error(error);
			}
		})();
	}, []);

	const handleChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStatus(FETCH_STATUS.LOADING);

		try {
			const response = await fetch('/api/form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			} else {
				setStatus(FETCH_STATUS.IDLE);
				setForm({ game: 0, gameOther: '', name: '' });
			}
		} catch (error: any) {
			setStatus(FETCH_STATUS.ERROR);
			setError(error.message);
		}
	};

	const isLoading = status === FETCH_STATUS.LOADING;
	const isSuccess = status === FETCH_STATUS.SUCCEEDED;
	const isError = status === FETCH_STATUS.ERROR;
	const isIdle = status === FETCH_STATUS.IDLE;

	return (
		<form
			onSubmit={handleSubmit}
			className={`flex flex-col space-y-6 px-6 py-4 border border-slate-300 shadow-md rounded-md bg-slate-800 ${
				isError && 'border-red-500'
			}`}
		>
			<div className='flex flex-col space-y-4 '>
				<FormLabel htmlFor='game' label='What game would you like to play?' />
				<select
					id='game'
					name='game'
					value={form.game}
					onChange={handleChange}
					className='p-2 rounded-md'
				>
					<option value={0}>Select a game</option>
					{games &&
						games.map((game) => (
							<option key={game.id} value={game.id}>
								{game.title}
							</option>
						))}
				</select>
				<FormLabel htmlFor='gameOther' label="Add a game if it's not listed" />
				<FormInput
					id='gameOther'
					name='gameOther'
					value={form.gameOther}
					onChange={handleChange}
				/>
				<FormLabel htmlFor='name' label='What is your name?' />
				<FormInput
					id='name'
					name='name'
					value={form.name}
					onChange={handleChange}
				/>
			</div>
			<button
				type='submit'
				className='px-4 py-2 rounded-md text-white font-semibold bg-teal-300 hover:bg-teal-700 text-xl'
			>
				{isLoading ? (
					<div
						className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
						role='status'
					>
						{/* <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
									Loading...
								</span> */}
					</div>
				) : (
					'Send'
				)}
			</button>
			{isError && (
				<div className='flex flex-row text-red-500 justify-center p-2 text-md font-semibold'>
					{error}
				</div>
			)}
		</form>
	);
}
