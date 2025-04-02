import {Card, DeltaBar} from "@tremor/react";

const labelMapping = {
    "local-professional-identity": {left: "Local Identity", right: "Professional Identity"},
    "means-goals-oriented": {left: "Means-Oriented", right: "Goals-Oriented"},
    "open-closed-system": {left: "Open System", right: "Closed System"},
    "people-task-oriented": {left: "People-Oriented", right: "Task-Oriented"},
    "easygoing-strict-work-ethic": {left: "Easygoing Work Ethic", right: "Strict Work Ethic"},
    "internal-external-driven": {left: "Internally-Driven", right: "Externally-Driven"}
}


export default function SpectrumCard({id, value, valueBand = [1, 5], increasePositive = true}) {
    const {left, right} = labelMapping[id]
    const [min, max] = valueBand

    return <div className="space-y-3">
        <div className="font-mono text-sm text-slate-500 flex flex-row justify-between">
            <p className="text-left">{left}</p>
            <p className="text-right">{right}</p>
        </div>
        <div className="flex justify-center">
            <Card className="max-w-sm">
                <DeltaBar value={Math.round((value - min) / (max - min) * 200) - 100}
                          isIncreasePositive={increasePositive}
                />
            </Card>
        </div>
    </div>
}