import React from 'react';
import {useFormStatus} from "react-dom";

export const SubmitButton = () => {
    let status = useFormStatus()

    return (
        <button type="submit" disabled={status.pending} className="btn btn-primary min-w-36">
            {status.pending ? 'Loading...' : 'Finish'}
        </button>
    );
};