import { z } from 'zod';

export const createFormSchema = z.object({
    username: z
        .string()
        .min(2, { message: "ユーザー名は２文字以上で入力してください。" }),
    title: z
        .string()
        .min(2, { message: "タイトルは２文字以上で入力してください。" }),
    content: z
        .string()
        .min(10, { message: "本文は10文字以上で入力してください。" })
        .max(140, { message: '本文は140字以内で入力してください。' }),
});

export const searchFormSchema = z.object({
    keyword: z
        .string()
})