import type { Database as DB } from '@/types/database.types';

declare global {
	type Game = DB['public']['Tables']['games']['Row'];
	type Vote = DB['public']['Tables']['votes']['Row'];
}
