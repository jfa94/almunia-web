import {Button} from "@/components/ui/button";
import {ArrowDown, ArrowUp} from "lucide-react"

export function SortableButton ({column, buttonText}) {
    let arrowIcon = <span className="w-4"></span>
    switch (column.getIsSorted()) {
        case "asc":
            arrowIcon = <ArrowUp className="w-2 h-2"/>
            break;
        case "desc":
            arrowIcon = <ArrowDown className="w-2 h-2"/>
            break;
        default:
    }

    return (
        <Button
            className="p-0 hover:bg-transparent"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {buttonText}
            {arrowIcon}
        </Button>
    )
}