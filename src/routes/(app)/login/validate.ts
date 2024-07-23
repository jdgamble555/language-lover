import * as v from 'valibot';


export const emailSchema = v.object({
	email: v.pipe(v.string(), v.email())
});

export type EmailSchema = v.InferInput<typeof emailSchema>;