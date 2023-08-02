import z from 'zod';

export const taskSchema = z.object({
    title: z.string({
        required_error: 'title is required'
    }),
    description: z.string({
        required_error: 'description is required'
    }),
    date: z.string({
        required_error: 'date is required'
    })
})