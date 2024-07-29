import * as v from 'valibot';


export const photoSchema = v.object({
	photo: v.pipe(
		v.file('Please select an image file.'),
		v.mimeType(
			['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
			'Please select a JPEG, PNG, WEBP, or GIF file.'
		),
		v.maxSize(1024 * 1024 * 10, 'Please select a file smaller than 10MB.')
	)
});

export type PhotoSchema = v.InferInput<typeof photoSchema>;

export const photoOptions = {
	customSchemaConversion: {
		custom: () => ({}),
		instance: () => ({}),
		file: () => ({}),
		blob: () => ({})
	}
};

const _usernameSchema = v.nullable(v.pipe(
	v.string(),
	v.minLength(2),
	v.maxLength(14),
	v.regex(/^[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)*$/, "Username can only include alphanumeric characters or '.' in the middle.")
));

export const profileSchema = v.object({
	display_name: v.nullable(v.string()),
	username: _usernameSchema
});

export type ProfileSchema = v.InferInput<typeof profileSchema>;

export const usernameSchema = v.object({
	username: _usernameSchema
});

export type UsernameSchema = v.InferInput<typeof usernameSchema>;


export const emailSchema = v.object({
	email: v.pipe(
		v.string(),
		v.nonEmpty('Please enter your email.'),
		v.email('The email is badly formatted.'),
		v.maxLength(30, 'Your email is too long.')
	)
});

export type EmailSchema = v.InferInput<typeof emailSchema>;