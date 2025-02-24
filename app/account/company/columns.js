"use client";

import {EditModal} from "@/app/account/components/EditModal"

const displayColumns = [
    {
        accessorKey: "company_mission",
        header: "Mission"
    },
    {
        accessorKey: "company_vision",
        header: "Vision"
    }
]

export const columns = [
    ...displayColumns,
    {
        id: "actions",
        cell: ({row}) => <EditModal title={"Company Details"} data={row.original} columns={displayColumns}/>
    },
]
