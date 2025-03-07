import {cn} from "@/lib/utils"
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useState} from "react";

const inputs = [
    {
        labelText: "Strongly Disagree",
        defaultValue: 1,
        style: "hover:bg-red-100 hover:text-red-900",
        checkedStyle: "bg-red-400/40 text-red-900"
    },
    {
        labelText: "Disagree",
        defaultValue: 2,
        style: "hover:bg-amber-100 hover:text-amber-950",
        checkedStyle: "bg-amber-400/40 text-amber-800"
    },
    {
        labelText: "Neutral",
        defaultValue: 3,
        style: "hover:bg-neutral-100",
        checkedStyle: "bg-neutral-200/90 text-neutral-900"
    },
    {
        labelText: "Agree",
        defaultValue: 4,
        style: "hover:bg-green-400/20 hover:text-green-900",
        checkedStyle: "bg-green-600/30 text-green-900"
    },
    {
        labelText: "Strongly Agree",
        defaultValue: 5,
        style: "hover:bg-green-700/50 hover:text-white",
        checkedStyle: "bg-green-800/80 text-white"
    }
]

export function LikertScale({id, inverse, onChange}) {
    const [selectedItem, setSelectedItem] = useState(null)

    const handleValueChange = (event) => {
        setSelectedItem(event)
        onChange(event)
    }

    return <RadioGroup
        onValueChange={handleValueChange}
        className="grid grid-cols-5 m-auto w-full border border-solid border-neutral-200 rounded-md shadow-sm"
    >
        {inputs.map(({labelText, defaultValue, style, checkedStyle}, i) => {
            const value = inverse ? 6 - defaultValue : defaultValue
            return <div key={`${id}-${i}`} className="m-[0.2rem]">
                <RadioGroupItem
                    id={`${id}-${i}`}
                    name={id}
                    value={value}
                    className="sr-only"
                />
                <Label htmlFor={`${id}-${i}`}
                       className={cn(
                           "h-full w-full py-4 rounded-md flex items-center justify-center hover:cursor-pointer " +
                           "md:text-md text-xs md:font-medium leading-none",
                           selectedItem === value ? checkedStyle : style
                       )}
                >
                    <span className="text-center">{labelText}</span>
                </Label>
            </div>
        })}
    </RadioGroup>
}