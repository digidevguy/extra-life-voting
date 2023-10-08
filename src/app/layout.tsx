import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Extra Life Voting App',
	description: 'A small form to vote for a game to play during Extra Life',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className + 'min-h-screen'}>{children}</body>
		</html>
	);
}
