'use client';

import {useLocalStorage} from "@/lib/utils"
import {CircleArrowDown} from "lucide-react"

export function DownloadDataButton() {
    const {getItem} = useLocalStorage()

    const handleClick = () => {
        const data = getItem('survey-response-data')

        if (data && data.length > 0) {
            // Define headers based on the first item's keys
            const headers = Object.keys(data[0]);

            // Convert data to CSV format with proper escaping
            const escapeCsvValue = (value) => {
                if (value === null || value === undefined) return '';
                const stringValue = String(value);
                // If the value contains commas, quotes, or newlines, wrap it in quotes and escape any quotes
                if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            };

            // Create CSV content with headers and properly escaped data
            const csvRows = [
                headers.map(escapeCsvValue).join(',')
            ];

            // Add data rows
            data.forEach(row => {
                const values = headers.map(header => escapeCsvValue(row[header]));
                csvRows.push(values.join(','));
            });

            const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
            const encodedUri = encodeURI(csvContent);

            // Create and trigger download
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `survey_data_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('No survey data available to download.');
        }
    }

    return <button className="btn btn-sm bg-neutral-400 text-white font-semibold" onClick={handleClick}>
        <span className="hidden sm:block">Download Data</span>
        <CircleArrowDown height={18}/>
    </button>
}