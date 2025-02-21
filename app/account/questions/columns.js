"use client";

import {EditModal} from "@/app/account/components/EditModal";
import {SortableButton} from "@/app/account/components/SortableButton";

const displayColumns = [
    {
        accessorKey: "theme",
        headerText: "Theme",
        header: ({column}) => <SortableButton column={column} buttonText="Theme"/>
    },
    {
        accessorKey: "question",
        headerText: "Question",
        header: ({column}) => <SortableButton column={column} buttonText="Question"/>
    },
    {
        accessorKey: "lastAsked",
        headerText: "Last asked",
        header: ({column}) => <SortableButton column={column} buttonText="Last asked"/>
    }
]

export const columns = [
    ...displayColumns,
    {
        id: "actions",
        cell: ({row}) => <EditModal title={"Question"} data={row.original} columns={displayColumns}/>
    },
]
