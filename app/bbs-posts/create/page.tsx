'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
// import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { postBBS } from '@/app/actions/postBBSAction';
import { createFormSchema } from '@/app/actions/formSchema';

// export const formSchema = z.object({
//     username: z
//         .string()
//         .min(2, { message: "ユーザー名は２文字以上で入力してください。" }),
//     title: z
//         .string()
//         .min(2, { message: "タイトルは２文字以上で入力してください。" }),
//     content: z
//         .string()
//         .min(10, { message: "本文は10文字以上で入力してください。" })
//         .max(140, { message: '本文は140字以内で入力してください。' }),
// })

const CreateBBSPage: NextPage = () => {

    // const router = useRouter();

    const form = useForm({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            username: '',
            title: '',
            content: '',
        },
    });

    async function onSubmit(value: z.infer<typeof createFormSchema>) {
        const {username, title, content} = value;
        postBBS({username, title, content});
    }

  return (
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/2 px-7">
              <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>ユーザー名</FormLabel>
                          <FormControl>
                              <Input placeholder="ユーザー名" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>タイトル</FormLabel>
                          <FormControl>
                              <Input placeholder="タイトル" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>本文</FormLabel>
                          <FormControl>
                              <Textarea placeholder='投稿内容'className='resize-none' {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <Button type="submit">Submit</Button>
          </form>
      </Form>
  )
}

export default CreateBBSPage
