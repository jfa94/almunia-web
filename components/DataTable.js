"use client";

import {
    flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, getFilteredRowModel
} from "@tanstack/react-table"

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Input} from "@/components/ui/input";

export function DataTable({
                              title,
                              columns,
                              data,
                              pageSize = 10,
                              filterColumn,
                              NewRowModal,
                              newRowColumns,
                              newRowFunction
                          }) {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: pageSize,
            }
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting, columnFilters
        },
    })

    return (<div className="flex flex-col gap-2">
        <div className="flex sm:flex-row flex-col gap-2 md:items-center items-start justify-between w-full">
            <h2 className="text-xl p-0">{title || "Table"}</h2>
            {(filterColumn || NewRowModal) && <div className="flex flex-row gap-2 justify-end md:w-1/3 sm:w-1/2 w-full py-0">
                {filterColumn && <Input
                    placeholder={`Filter ${filterColumn}s...`}
                    value={(table.getColumn(filterColumn)?.getFilterValue()) ?? ""}
                    onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
                />}
                {NewRowModal && <NewRowModal columns={newRowColumns} addRow={newRowFunction}/>}
            </div>}
        </div>

        <div className="bg-white rounded-md border shadow-sm">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (<TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (<TableHead key={header.id}>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>)
                        })}
                    </TableRow>))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (<TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (<TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>))}
                    </TableRow>))) : (<TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>

        {data.length > pageSize && <div className="w-full flex items-center justify-end gap-2 py-0">
            <Button
                className="bg-white shadow w-full md:max-w-28"
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                className="bg-white shadow w-full md:max-w-28"
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>}
    </div>)
}
