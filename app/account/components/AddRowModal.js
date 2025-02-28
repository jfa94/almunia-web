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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import toast from "react-hot-toast"
import {Plus} from "lucide-react"


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

const initializer = (columns) => {
    const initialState = {}
    for (const column of columns) {
        initialState[column.accessorKey] = column.initialValue ?? ""
    }
    return initialState
}

export function AddRowModal({columns, addRow}) {
    const [formData, dispatch] = useReducer(reducer, columns, initializer)
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
            const result = await addRow(formData)
            console.log('Results:', result)
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
            <DialogTrigger className="btn btn-primary btn-sm h-full max-h-9 w-full md:max-w-28 border-0 rounded-md">
                <div className="h-9 inline-flex items-center gap-1"><Plus strokeWidth={2.5} size={16}/>Add Row</div>
            </DialogTrigger>

            <DialogContent className="bg-white focus:outline-none">
                <DialogHeader>
                    <DialogTitle>
                        Create
                    </DialogTitle>
                    <DialogDescription>
                        Make changes here and click save when you&rsquo;re done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <section className="flex flex-col gap-4">
                        {columns.map(({accessorKey, headerText, noEdit, required, possibleVals}) => {
                            return <div key={accessorKey} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={accessorKey}>
                                    {headerText}
                                </Label>
                                {possibleVals
                                    ? <Select id={accessorKey}
                                              onChange={(e) => handleChange(accessorKey, e.target.value)}
                                              disabled={noEdit ?? false}
                                              required={required ?? false}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select value"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {possibleVals.map(({id, name}) => {
                                                    return <SelectItem key={id} value={id} className="bg-white ">
                                                        {name}
                                                    </SelectItem>
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    : <Input id={accessorKey}
                                             type={accessorKey === "email" ? "email" : "text"}
                                             value={formData[accessorKey] ?? ""}
                                             onChange={(e) => handleChange(accessorKey, e.target.value)}
                                             required={required ?? false}
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
