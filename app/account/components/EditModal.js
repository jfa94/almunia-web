"use client";

import {useReducer, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch";
import {MoreHorizontal} from "lucide-react";
import {submitDynamoDbUpdate} from "@/lib/aws";


const inputTypes = {
    email: "email",
    active: "switch"
}


const tableNames = {
    "Team Member": "company-teams",
    "Value": "company-values",
    "Question": "company-questions"
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'update': {
            return {
                ...state,
                [action.accessorKey]: action.data,
            }
        }
    }
    throw Error('Unknown action: ' + action.type);
}


export function EditModal({title, data, columns}) {
    const [formData, dispatch] = useReducer(reducer, data)
    const [open, setOpen] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (key, value) => {
        dispatch({
            type: 'update',
            accessorKey: key,
            data: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitted(true)
        try {
            const result = await submitDynamoDbUpdate(tableNames[title], formData)
            if(result['$metadata']?.httpStatusCode !== 200) {
                alert('Error updating data')
            } else {
                alert('Update successful. Please allow a few minutes for the changes to take effect.')
                setOpen(false)
            }
        } catch (error) {
            console.error('Error updating data:', error)
        }
        setTimeout(() => setSubmitted(false), 1000)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="justify-self-end flex justify-center items-center h-8 w-8 p-0 hover:bg-neutral-100 rounded">
                <MoreHorizontal className="h-4 w-4"/>
            </DialogTrigger>

            <DialogContent className="bg-white focus:outline-none">
                <DialogHeader>
                    <DialogTitle>
                        Edit {title}
                    </DialogTitle>
                    <DialogDescription>
                        Make changes here and click save when you&rsquo;re done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <section className="flex flex-col gap-4">
                        {columns.map(({headerText, accessorKey}) => {
                            return <div key={accessorKey} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={accessorKey}>
                                    {headerText}
                                </Label>
                                {inputTypes[accessorKey] === "switch"
                                    ? <Switch id={accessorKey}
                                              checked={formData[accessorKey]}
                                              onCheckedChange={(e) => handleChange(accessorKey, e)}
                                    />
                                    : <Input id={accessorKey}
                                             type={inputTypes[accessorKey] ? inputTypes[accessorKey] : "text"}
                                             value={formData[accessorKey] ?? ""}
                                             onChange={(e) => handleChange(accessorKey, e.target.value)}
                                             className="col-span-3"
                                    />
                                }
                            </div>
                        })}
                    </section>

                    <DialogFooter className="mt-4">
                        <Button type="submit"
                                disabled={submitted}
                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 min-w-20 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        >
                            {submitted
                                ? <span className="loading loading-dots loading-sm"></span>
                                : <span>Save & Close</span>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
