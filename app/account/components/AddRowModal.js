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
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import toast, {Toaster} from "react-hot-toast"
import {MoreHorizontal} from "lucide-react"
import {submitDynamoDbUpdate} from "@/lib/aws"


const inputTypes = {
    email: "email",
    active: "switch",
}


const updateMap = {
    "Company Details": {tableName: "company-information", itemKeys: ["company_id"]},
    "Team Member": {tableName: "company-teams", itemKeys: ["company_id", "user_id"]},
    "Value": {tableName: "company-values", itemKeys: ["company_id", "value_id"]},
    "Question": {tableName: "company-questions", itemKeys: ["company_id", "question_id"]}
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


export function AddRowModal({title, data, columns}) {
    const [formData, dispatch] = useReducer(reducer, data)
    const [open, setOpen] = useState(false)
    const [submitted, setSubmitted] = useState("")

    const handleChange = (key, value) => {
        dispatch({
            type: 'update',
            accessorKey: key,
            data: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitted("submit")
        try {
            const result = await submitDynamoDbUpdate(updateMap[title].tableName, formData)
            if (result['$metadata']?.httpStatusCode !== 200) {
                toast.error('Error updating data')
            } else {
                toast.success('Update successful. Please allow a few minutes for the changes to take effect.')
                setOpen(false)
            }
        } catch (error) {
            toast.error('Error updating data')
            console.error('Error updating data:', error)
        } finally {
            setSubmitted("")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Toaster/>
            <DialogTrigger
                className="justify-self-end flex justify-center items-center h-8 w-8 p-0 hover:bg-neutral-100 rounded">
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
                        {columns.map(({accessorKey, noEdit, header, headerText}) => {
                            return <div key={accessorKey} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={accessorKey}>
                                    {headerText ? headerText : header}
                                </Label>
                                {inputTypes[accessorKey] === "switch"
                                    ? <Switch id={accessorKey}
                                              checked={formData[accessorKey]}
                                              onCheckedChange={(e) => handleChange(accessorKey, e)}
                                              disabled={noEdit ?? false}
                                    />
                                    : <Input id={accessorKey}
                                             type={inputTypes[accessorKey] ? inputTypes[accessorKey] : "text"}
                                             value={formData[accessorKey] ?? ""}
                                             onChange={(e) => handleChange(accessorKey, e.target.value)}
                                             disabled={noEdit ?? false}
                                             className="col-span-3"
                                    />
                                }
                            </div>
                        })}
                    </section>

                    <DialogFooter className="mt-4">
                        <Button type="submit"
                                disabled={submitted !== ""}
                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 min-w-20 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        >
                            {submitted === "submit"
                                ? <span className="loading loading-dots loading-sm"></span>
                                : <span>Save & Close</span>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
