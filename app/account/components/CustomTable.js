import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';


export default function CustomTable({headers, rows, rowLimit}) {
    const displayRows = (rowLimit && rows.length > rowLimit) ? rows.slice(0, rowLimit) : rows

    return <Card className="p-0">
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
        {rowLimit < rows.length ? <div>
            <p className="py-2 text-sm text-center italic text-neutral-500">Displaying first {rowLimit} rows</p>
        </div> : null}
    </Card>
}