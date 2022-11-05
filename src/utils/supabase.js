import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_KEY
);

// Authentication
export async function signIn() {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "discord",
		redirectTo: `${process.env.NEXT_PUBLIC_PROD_URL}/dashboard/`,
	});
}

export async function signOut() {
	const { error } = await supabase.auth.signOut();
	return;
}

// CRUD
export async function insert(collection, data) {
	const { error } = await supabase.from(collection).insert(data);
}

export async function fetchDB(collection) {
	const { data, error } = await supabase.from(collection).select();
	return data;
}

//  User Session related
async function getJWTAccessToken() {
	const { data, error } = await supabase.auth.getSession();
	return data.session.access_token;
}

export async function getUser() {
	const jwt = await getJWTAccessToken();
	const user = await supabase.auth.getUser(jwt);
	return user.data.user;
}
