import RadarGraph from "@/components/RadarGraph";
import {Card} from "@tremor/react";
import Link from "next/link";

function Fallback() {
    return <Card className="mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
            <h3 className="text-2xl font-bold mb-4">No Calibration Data Available</h3>
            <p className="mb-6 max-w-md">
                You haven&apos;t completed the culture calibration form yet. This assessment helps map your
                company&apos;s
                culture across several dimensions, providing valuable insights into your organization&apos;s
                preferred culture.
            </p>
            <Link href="/calibration?form=true" className="btn btn-primary">
                Complete Calibration Form
            </Link>
        </div>
    </Card>
}

export default function ProfileRadarGraph({calibrationData, employeeProfileData}) {
     return <>
         {calibrationData ? <RadarGraph inputData={[calibrationData, employeeProfileData]}/> : <Fallback/>}
     </>
}