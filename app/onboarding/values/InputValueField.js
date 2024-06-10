'use client';

const alertIsOriginal = () => {
    window.alert('Cannot delete the first input')
}

export function InputValueField({id, removeInput = alertIsOriginal}) {
    return <div className="form-field grid grid-cols-6 md:grid-cols-[1fr_1fr_1fr_1fr_50px] grid-rows-[auto_1fr] md:grid-rows-1 items-start gap-2 md:gap-4 mb-8">

        <input type="text"
               name={`value${id}Name`}
               id={`value${id}Name`}
               placeholder="New Value"
               autoComplete="off"
               className="custom-label text-xl overflow-ellipsis col-span-5 md:col-span-1"
               required
        />

        <textarea name={`value${id}Description`}
                  id={`value${id}Description`}
                  placeholder="Description"
                  autoComplete="off"
                  className="textarea textarea-lg textarea-bordered col-span-6 md:col-span-3"
                  rows="3"
                  required
        />

        <div onClick={() => removeInput(id)}
             className="w-12 h-10 col-span-1 col-start-6 md:col-start-5 row-start-1 inline-flex items-center justify-center rounded-md bg-red-300/10 border-2 border-red-700/50 text-primary hover:cursor-pointer"
        >
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 className="w-5 h-5 duration-200 fill-red-700/60"
            >
                <path
                    d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z">
                </path>
            </svg>
        </div>

    </div>
}
