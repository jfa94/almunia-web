"use client";

import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';
import {useState} from "react";
import {EditModal} from "@/app/account/components/EditModal";


export default function CustomTable({title, headers, rows, rowLimit, data}) {
    const [displayRows, setDisplayRows] = useState(rowLimit ? rows.slice(0, Math.min(rows.length, rowLimit)) : rows)
    const [isLimited, setIsLimited] = useState(rowLimit && rows.length > rowLimit)
    const [displayCollapse, setDisplayCollapse] = useState(false)

    const toggleLimit = () => {
        if (isLimited) {
            setDisplayRows(rows)
            setIsLimited(false)
            setDisplayCollapse(true)
        } else if (rowLimit) {
            setDisplayRows(rows.slice(0, rowLimit))
            setIsLimited(true)
            setDisplayCollapse(false)
        }
    }

    return <>
        {title && <div className="flex flex-row justify-between pb-2">
            <div className="flex flex-row gap-2 items-center">
                <h1 className="subheading p-0">{title}</h1>
                {/*<EditModal title={title} headers={headers} rows={rows} data={data}/>*/}
            </div>
            {displayCollapse ? (
                <div className="btn btn-sm bg-slate-600 transition duration-150 ease-in data-[closed]:opacity-0"
                     onClick={toggleLimit}
                >
                    <p className="font-medium">Collapse</p>
                </div>
            ) : null}
        </div>}

        <Card className="p-0">
            <Table className={rowLimit < rows.length ? 'border-b' : ''}>
                <TableHead className="border-b">
                    <TableRow>
                        {headers.map((header) => <TableHeaderCell key={header}>{header}</TableHeaderCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayRows.map((item, index) => (
                        <TableRow key={index}>
                            {Object.keys(item).map((field) => <TableCell key={field}>{item[field]}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isLimited ? <div className="hover:cursor-pointer link-hover" onClick={toggleLimit}>
                <p className="py-2 text-sm text-center italic text-neutral-500">
                    Displaying first {rowLimit} rows. Click here to display all.
                </p>
            </div> : null}
        </Card>
    </>
}