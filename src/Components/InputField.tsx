// InputField.tsx
import { ErrorMessage, Field } from 'formik';
import React from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder, label }) => {
  return (
    <div className="form-item vertical">
      <label className="form-label flex mb-2" htmlFor={name}>
        {label}
      </label>
      <Field
        as="input"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600`}
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

export default InputField;
