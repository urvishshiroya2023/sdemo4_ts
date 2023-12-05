import { useField } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';

const SelectField = ({ name, options, ...rest }) => {
    const [field, meta, helpers] = useField(name);
    const [allIds, setAllIds] = useState([])

    return (
        <>
            <Select
                {...field}
                {...rest}
                options={options}
                // onChange={(selectedOptions) => helpers.setValue(selectedOptions)}
                // onChange={(selectedOptions) => {
                //     console.log('onChange event fired');
                //     const tagIds = selectedOptions.map((option) => option.value);
                //     console.log(`Tag IDs for ${name}:`, tagIds);
                //     helpers.setValue(selectedOptions);
                //     console.log(selectedOptions);


                // }}
                onBlur={() => helpers.setTouched(true)}

            />
            {meta.touched && meta.error && (
                <div className="text-red-500">{meta.error}</div>
            )}
        </>
    );
};

export default SelectField;
