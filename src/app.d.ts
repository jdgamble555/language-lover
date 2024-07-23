import type { Database } from "$lib/database.types";
import type { SupabaseClient, User } from "@supabase/supabase-js";

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			safeGetUser(): Promise<{ user: User | null }>;
		}
		interface PageData {
			user?: User | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
