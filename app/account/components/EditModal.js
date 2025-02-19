"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {RiPencilFill} from "@remixicon/react";
import {Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow} from "@tremor/react";
import {Button} from "@/components/ui/button";

export function EditModal({title, headers, rows, data}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <RiPencilFill className="hover:cursor-pointer"/>
            </DialogTrigger>

            <DialogContent className="relative z-10 focus:outline-none">
                <DialogHeader>
                    <DialogTitle>
                        Edit {title}
                    </DialogTitle>
                    <DialogDescription>
                        Make changes here. Click save when you&rsquo;re done.
                    </DialogDescription>
                </DialogHeader>

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

                <DialogFooter>
                    <Button type="submit"
                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    >
                        Save & Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
