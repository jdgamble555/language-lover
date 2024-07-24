import { dev } from "$app/environment";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { error, type RequestHandler } from "@sveltejs/kit";

const API_URL = dev ? 'http://127.0.0.1:54321' : PUBLIC_SUPABASE_URL;


export const GET = (async ({ fetch, params }) => {

	const { image_path } = params;

	const full_path = API_URL + '/storage/v1/object/public/' + image_path;

	const response = await fetch(full_path);

	if (!response.ok) {
		error(404, 'Not Found');
	}

	const data = await response.blob();

	return new Response(data, {
		headers: {
			'content-type': 'image/png',
			'cache-control': 'public, immutable, no-transform, max-age=31536000'
		}
	});


}) satisfies RequestHandler;