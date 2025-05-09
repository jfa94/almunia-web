const alertIsOriginal = () => {
    window.alert('Cannot delete the first input')
}

export function QuestionInput({id, valueId, removeInput = alertIsOriginal}) {
    return <div className="flex flex-row items-center mb-4">

        {/*<input type="text"*/}
        {/*       name={`key-${valueKey}`}*/}
        {/*       id={`key-${valueKey}`}*/}
        {/*       value={valueName}*/}
        {/*       autoComplete="off"*/}
        {/*       className="hidden"*/}
        {/*       readOnly={true}*/}
        {/*/>*/}

        <input type="text"
               id={`${valueId}_q${id}`}
               name={`${valueId}_q${id}`}
               className="custom-input h-10 mr-2 shadow-sm"
        />

        <div onClick={() => removeInput(id)}
             className="w-12 h-10 inline-flex items-center justify-center rounded-md bg-red-300/10 border-2 border-red-700/50 text-primary hover:cursor-pointer"
        >
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 className="size-5 duration-200 fill-red-700/60"
            >
                <path
                    d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z">
                </path>
            </svg>
        </div>
    </div>
}