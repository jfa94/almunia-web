"use client";

import {RiInformationLine} from "@remixicon/react";

export const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "custom:company",
        header: "Company",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "email_verified",
        header: "Verified",
        cell: ({row}) => {
            return <div>{row.getValue("email_verified") ? "Yes" : "No"}</div>
        }
    },
    {
        id: "tooltip",
        cell: () => {
            const handleClick = () => {
                alert("This information cannot be edited directly. Please reach out to request changes.")
            }
            return <div className="px-2 hover:cursor-pointer justify-self-end" onClick={handleClick}>
                <RiInformationLine size={20}/>
            </div>
        }
    }
]

