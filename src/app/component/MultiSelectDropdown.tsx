import React from 'react'
import Multiselect from 'multiselect-react-dropdown';

const MultiSelectDropdown = ({ lableValue, data, onChange, name, value, error }: { error?: String, value?: any, name?: string, onChange?: (e: any) => void, lableValue: string, data: { value: string; lable: string }[] }) => {
    return (
        <div>
            <div className="relative w-full min-w-[200px] ">
                <label
                    className="font-medium text-base text-[#A8C6DF] flex gap-2">
                    {lableValue} {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
                </label>
                <Multiselect
                    //customCloseIcon={<><AiOutlineCloseCircle color='black' size={20} className='pl-1 cursor-pointer' /></>}
                    displayValue="lable"
                    onKeyPressFn={onChange}
                    onRemove={onChange}
                    onSearch={onChange}
                    onSelect={onChange}
                    selectedValues={value}
                    options={data}
                    placeholder={lableValue}
                    style={{
                        chips: {
                            background: '',
                            color: 'white'
                        },
                        multiselectContainer: {
                            color: 'black'
                        },
                        searchBox: {
                            border: 'none',
                            'border-bottom': '1px solid #0003',
                            'border-radius': '0px',
                            padding: value?.length > 0 ? 0 : '4px'
                        }
                    }}
                />

            </div>
        </div>
    )
}

export default MultiSelectDropdown