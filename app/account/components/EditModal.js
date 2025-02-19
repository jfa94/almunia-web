"use client";

import {Button, Dialog, DialogPanel, DialogTitle} from '@headlessui/react'
import {useState} from 'react'
import {RiPencilFill} from "@remixicon/react";
import {Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow} from "@tremor/react";

export function EditModal({title, headers, rows, data}) {
    let [isOpen, setIsOpen] = useState(false)

    const open = () => {
        console.log(data)
        setIsOpen(true)
    }

    const close = () => {
        setIsOpen(false)
    }

    return (
        <>
            <RiPencilFill onClick={open} className="hover:cursor-pointer"/>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div
                    className="bg-neutral-500 bg-opacity-50 fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="sm:w-[85%] rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium">
                            Edit {title}
                        </DialogTitle>

                        <Table>
                            <TableHead className="border-b">
                                <TableRow>
                                    {headers.map((header) => <TableHeaderCell key={header}>{header}</TableHeaderCell>)}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {rows.map((item, index) => (
                                    <TableRow key={index}>
                                        {Object.keys(item).map((field) => <TableCell key={field}>
                                            {item[field]}
                                        </TableCell>)}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="mt-4">
                            <Button
                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                onClick={close}
                            >
                                Save & Close
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
