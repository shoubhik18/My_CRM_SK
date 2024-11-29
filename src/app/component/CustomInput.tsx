import moment from 'moment';
import React from 'react'

const CustomInput = ({ lableValue, handelOnKey, disabled = false, typeValue, placeholder, onChange, name, value = '', error, accept }: { error?: string | null, value?: any, name?: String, onChange?: (e: any) => void, lableValue: String, typeValue: String, placeholder: String, disabled?: boolean, accept?: string, handelOnKey?: (e: any) => void }) => {
    const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
        // Allow only numeric digits
        if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };
    const handleTextKeyDown = (e: { key: string; preventDefault: () => void }) => {
        // Allow only numeric digits
        if (!/^[a-zA-Z\s]*$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };
    return (
        <div>
            <div className="relative h-11 w-full min-w-[200px] mb-2">
                <label
                    className="font-medium text-base  flex gap-2">
                    {lableValue} {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
                </label>
                {typeValue === "file" ?
                    <label htmlFor="file">
                        <div className='flex cursor-pointer'>
                            <span className="h-full text-lg w-full border-b border-[#0003] -mt-2.5 bg-transparent pt-4 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-neutral-400">{value ? value : placeholder ? placeholder : 'Choose File'}</span>
                        </div>
                        <input id="file" name={`${name}`} type={`${typeValue}`} className="hidden" accept={accept ? accept : "image/*"} onChange={onChange} />
                    </label>
                    : typeValue === 'date' || typeValue === 'datetime-local' ? <input placeholder={`${placeholder}`}
                        name={`${name}`}
                        value={`${value}`}
                        type={`${typeValue}`}
                        disabled={disabled}
                        min={typeValue === 'datetime-local' ? moment(new Date()).format("YYYY-MM-DDTHH:mm") : moment(new Date()).format("YYYY-MM-DD")}
                        onChange={onChange}
                        className="h-full text-lg w-full border-b border-[#0003] -mt-2 bg-transparent pt-4 pb-1.5 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 " /> :
                        <input placeholder={`${placeholder}`}
                            name={`${name}`}
                            value={`${value}`}
                            type={`${typeValue}`}
                            disabled={disabled}
                            onChange={onChange}
                            onKeyDown={name === "ask_ai" ? handelOnKey : name === "phone" || name === "mobile" || name === 'phoneNumber' || name === 'countryCode' ? handleKeyDown : name === "name" ? handleTextKeyDown : undefined}
                            className="h-full text-lg w-full border-b border-[#0003] -mt-2 bg-transparent pt-4 pb-1.5 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 " />}
            </div>
        </div>
    )
}

export default CustomInput