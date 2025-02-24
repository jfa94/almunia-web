"use client";

import {EditModal} from "@/app/account/components/EditModal";
import {SortableButton} from "@/app/account/components/SortableButton";

const displayColumns = [
    {
        accessorKey: "theme",
        noEdit: true,
        headerText: "Theme",
        header: ({column}) => <SortableButton column={column} buttonText="Theme"/>
    },
    {
        accessorKey: "question",
        headerText: "Question",
        header: ({column}) => <SortableButton column={column} buttonText="Question"/>
    },
    {
        accessorKey: "last_asked",
        noEdit: true,
        headerText: "Last asked",
        header: ({column}) => <SortableButton column={column} buttonText="Last asked"/>,
        cell: ({cell}) => {
            const date = new Date(cell.getValue())
            const options = {year: 'numeric', month: 'long', day: 'numeric'}
            return <div>{date.toLocaleDateString('en-GB', options)}</div>
        }
    }
]

export const columns = [
    ...displayColumns,
    {
        id: "actions",
        cell: ({row}) => <EditModal title={"Question"} data={row.original} columns={displayColumns}/>
    },
]
