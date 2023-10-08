import Table from '@/components/table';
import Form from '../components/form';
import Image from 'next/image';
import logoImg from '../../public/extra-life-logo.png';

export default function Home() {
	return (
		<main className='flex flex-col min-h-screen items-center  space-y-4 pb-10'>
			<Image src={logoImg} alt='Extra Life Logo' />
			<p className='max-w-prose p-6 font-light text-slate-700'>
				Thank you for helping me find games to play for Extra Life! I&apos;m
				hoping to create a schedule that help encourage others to join in.
				<br />
				Please fill out the form below to help me out!
			</p>
			<div className='flex flex-col space-y-6 md:flex-row md:space-x-10 items-center'>
				<Form />
				<Table />
			</div>
		</main>
	);
}
