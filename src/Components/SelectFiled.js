import { useField } from 'formik';
import React from 'react';
import Select from 'react-select';

const SelectField = ({ name, options, ...rest }) => {
    const [field, meta, helpers] = useField(name);

    return (
        <>
            <Select
                {...field}
                {...rest}
                options={options}
                onChange={(selectedOptions) => helpers.setValue(selectedOptions)}
                onBlur={() => helpers.setTouched(true)}
            />
            {meta.touched && meta.error && (
                <div className="text-red-500">{meta.error}</div>
            )}
        </>
    );
};

export default SelectField;
