import React from 'react';
import {useFormStatus} from "react-dom";

const SubmitButton = () => {
    let status = useFormStatus()

    return (
        <button type="submit" disabled={status.pending} className="btn btn-primary min-w-36">
            {status.pending ? 'Loading...' : 'Save'}
        </button>
    );
};

export default SubmitButton;