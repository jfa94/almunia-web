"use client";

import {EditModal} from "@/app/account/components/EditModal"
import {Button} from "@/components/ui/button"
import {ArrowUpDown} from "lucide-react"
import {SortableButton} from "@/app/account/components/SortableButton";


const displayColumns = [
    {
        accessorKey: "first_name",
        headerText: "First name",
        header: ({column}) => <SortableButton column={column} buttonText="First name"/>
    },
    {
        accessorKey: "last_name",
        headerText: "Last name",
        header: ({column}) => <SortableButton column={column} buttonText="Last name"/>
    },
    {
        accessorKey: "email",
        headerText: "Email",
        header: ({column}) => <SortableButton column={column} buttonText="Email"/>
    },
    {
        accessorKey: "role",
        headerText: "Role",
        header: ({column}) => <SortableButton column={column} buttonText="Role"/>
    },
    {
        accessorKey: "manager",
        headerText: "Manager",
        header: ({column}) => <SortableButton column={column} buttonText="Manager"/>
    },
    {
        accessorKey: "active",
        headerText: "Active",
        header: ({column}) => <SortableButton column={column} buttonText="Active"/>,
        cell: ({row}) => {
            return <div>{row.getValue("active") ? "Yes" : "No"}</div>
        }
    }
]

export const columns = [
    ...displayColumns,
    {
        id: "actions",
        cell: ({row}) => <EditModal title={"Team Member"} data={row.original} columns={displayColumns}/>
    },
]
