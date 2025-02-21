"use client";

import {EditModal} from "@/app/account/components/EditModal";
import {SortableButton} from "@/app/account/components/SortableButton";

const displayColumns = [
    {
        accessorKey: "valueName",
        headerText: "Name",
        header: ({column}) => <SortableButton column={column} buttonText="Name"/>
    },
    {
        accessorKey: "description",
        headerText: "Description",
        header: ({column}) => <SortableButton column={column} buttonText="Description"/>
    }
]

export const columns = [
    ...displayColumns,
    {
        id: "actions",
        cell: ({row}) => <EditModal title={"Value"} data={row.original} columns={displayColumns}/>
    },
]
