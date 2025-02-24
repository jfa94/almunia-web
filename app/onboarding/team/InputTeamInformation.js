'use client';
const alertIsOriginal = () => {
    window.alert('Cannot delete the first input')
}

export function InputTeamInformation({id, removeInput = alertIsOriginal}) {
    return (
        <div className="flex md:grid flex-col items-start md:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] grid-rows-2 md:grid-rows-1">

            <label htmlFor={`person${id}-email`} className="inline-table-label">Email</label>
            <input type="email"
                   name={`person${id}-email`}
                   id={`person${id}-email`}
                   placeholder="-"
                   autoComplete="off"
                   required
                   className={`${id !== '0' && 'md:border-t-0'} custom-table-input border-l border-l-black/20`}
            />

            <label htmlFor={`person${id}-first_name`} className="inline-table-label">First Name</label>
            <input type="text"
                   name={`person${id}-first_name`}
                   id={`person${id}-first_name`}
                   placeholder="-"
                   autoComplete="off"
                   className={`${id !== '0' && 'md:border-t-0'} custom-table-input`}
            />

            <label htmlFor={`person${id}-last_name`} className="inline-table-label">Last Name</label>
            <input type="text"
                   name={`person${id}-last_name`}
                   id={`person${id}-last_name`}
                   placeholder="-"
                   autoComplete="off"
                   className={`${id !== '0' && 'md:border-t-0'} custom-table-input`}
            />

            <label htmlFor={`person${id}-role`} className="inline-table-label">Job Title</label>
            <input type="text"
                   name={`person${id}-role`}
                   id={`person${id}-role`}
                   placeholder="-"
                   autoComplete="off"
                   className={`${id !== '0' && 'md:border-t-0'} custom-table-input`}
            />

            <label htmlFor={`person${id}-manager`} className="inline-table-label">Manager</label>
            <input type="email"
                   name={`person${id}-manager`}
                   id={`person${id}-manager`}
                   placeholder="-"
                   autoComplete="off"
                   className={`${id !== '0' && 'md:border-t-0'} custom-table-input`}
            />

            <div onClick={() => removeInput(id)}
                 className={`${id === '0' && 'rounded-tr-md !border-t-2 !border-t-red-700/50'} w-full md:w-10 h-8 md:h-full my-4 md:m-0 md:row-span-1 md:col-start-6 inline-flex items-center justify-center bg-red-300/10 border-2 border-red-700/50 md:border-t-0 rounded-md md:rounded-none text-primary hover:cursor-pointer`}>
                <p className="md:hidden text-sm font-semibold text-red-700/60 px-2">Remove</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     className="w-4 md:w-5 h-4 md:h-5 duration-200 fill-red-700/60">
                    <path
                        d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                </svg>
            </div>
        </div>
    )
}
