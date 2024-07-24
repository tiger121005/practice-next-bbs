'use client'

import { Input } from '@/components/ui/input'
import BBSCardList from "./components/BBSCardList";
import { BBSData } from "./types/types";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getAllBBS, searchBBS } from './actions/getBBSAction';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { searchFormSchema } from './actions/formSchema';

export default function Home() {

  var [bbsData, setBBSAllData] = useState<BBSData[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await getAllBBS();
      setBBSAllData(data);
    }
    getData();
  }, []);

  // const bbsAllData: BBSData[] = await getBBSAllData();

  const form = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      keyword: ''
    },
  });

  async function onSearch(value: z.infer<typeof searchFormSchema>) {
    const { keyword } = value;
    bbsData = await searchBBS({ keyword });
    setBBSAllData(bbsData)
  }

  return (
    <main>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSearch)} className="space-y-3 w-1/2 px-7">
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>検索</FormLabel>
                  <FormControl>
                    <Input placeholder="検索ワード" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <BBSCardList bbsAllData={bbsData} />
      </div>
    </main>
  );
}