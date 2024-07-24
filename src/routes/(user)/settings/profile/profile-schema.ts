import * as v from 'valibot';


export const photoSchema = v.object({
	photo: v.instance(File) /*v.pipe(
		v.file('Please select an image file.'),
		v.mimeType(
			['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
			'Please select a JPEG, PNG, WEBP, or GIF file.'
		),
		v.maxSize(1024 * 1024 * 10, 'Please select a file smaller than 10MB.')
	)*/
});

export type PhotoSchema = v.InferInput<typeof photoSchema>;
