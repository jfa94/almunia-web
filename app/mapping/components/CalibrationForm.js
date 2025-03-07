"use client";

import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {LikertScale} from "@/components/LikertScale"
import {Button} from "@/components/ui/button"
import questions from "../questions.json"
import {Separator} from "@/components/ui/separator";


const formSchema = z.object(
    questions.reduce((acc, {id}) => {
        acc[id] = z.number({required_error: "Required"})
        return acc
    }, {})
)

export default function CalibrationForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: questions.reduce((acc, {id}) => {
            acc[id] = undefined;
            return acc
        }, {})
    })


    const onSubmit = (data) => {
        console.log('submitted')
        console.log(data)
    }

    return <main>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="container mx-auto flex flex-col sm:gap-4 gap-3 sm:px-0 px-2"
            >
                {questions.map(({id, calibration, inverse}, i) => {
                    return <div key={i}>
                        <Separator className="sm:mb-4 mb-3 bg-black/5"/>
                        <FormField name={id}
                                   control={form.control}
                                   render={({field}) => <FormItem>
                                       <FormControl>
                                           <div
                                               className="grid md:grid-cols-5 sm:grid-cols-6 grid-cols-1 sm:gap-4 gap-2"
                                           >
                                               <div className="my-auto sm:col-span-3">
                                                   <FormMessage className="text-red-700"/>
                                                   <p>{calibration}</p>
                                               </div>

                                               <div className="my-auto md:col-span-2 sm:col-span-3">
                                                   <LikertScale id={id}
                                                                inverse={inverse}
                                                                {...field}
                                                   />
                                               </div>
                                           </div>
                                       </FormControl>
                                   </FormItem>}
                        />
                    </div>
                })}
                <Separator className="bg-black/5"/>
                <Button className="text-white" type="submit">Submit</Button>
            </form>
        </Form>
    </main>
}