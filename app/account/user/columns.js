"use client";

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
    }
]

