import {Select, SelectItem} from "@tremor/react"

export function CustomSelect({data, state}) {
    const [value, setValue] = state

    return (
        <Select value={value} onValueChange={setValue} className="font-medium">
            {data.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                    {item.label}
                </SelectItem>
            ))}
        </Select>
    )
}