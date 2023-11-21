
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name Required'),
    lastName: Yup.string().required('Last Name Required'),
    email: Yup.string().email('Invalid email format').required('Email Required'),
    gender: Yup.string().required('Gender Required'),
    phoneNumber: Yup.string().required('Phone Number Required'),
    dateOfBirth: Yup.date().required('Date of Birth Required'),
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
    dateOfBirth: '',
};

const OnBoardForm = () => {
    const onSubmit = (values, { setSubmitting }) => {
        // Your form submission logic goes here
        console.log(values);
        setSubmitting(false);
    };

    return (
        <div className=" mt-8 p-6 bg-white rounded-md ">

            <div>
                <div className="mb-8">
                    <h3 className="mb-1 text-2xl">Welcome back!</h3>
                    <p className='text-[#6B7280]'>Please enter your credentials to sign in!</p>
                </div>
            </div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <div className='flex justify-between gap-x-2'>
                                <div className="mb-4">
                                    <label htmlFor="firstName" className="block  text-[#6B7280] text-sm font-bold mb-2">
                                        First Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className={`shadow appearance-none border ${errors.firstName && touched.firstName ? 'border-red-500' : ''
                                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    />
                                    <ErrorMessage name="firstName" component="p" className="text-red-500 text-xs " />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="lastName" className="block text-[#6B7280] text-sm font-bold mb-2">
                                        Last Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className={`shadow appearance-none border ${errors.lastName && touched.lastName ? 'border-red-500' : ''
                                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    />
                                    <ErrorMessage name="lastName" component="p" className="text-red-500 text-xs " />
                                </div>
                            </div>


                            <div className="mb-4">
                                <label htmlFor="email" className="block text-[#6B7280] text-sm font-bold mb-2">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`shadow appearance-none border ${errors.email && touched.email ? 'border-red-500' : ''
                                        } rounded w-full py-2 px-3 text-[#6B7280] leading-tight focus:outline-none focus:shadow-outline`}
                                />
                                <ErrorMessage name="email" component="p" className="text-red-500 text-xs " />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="gender" className="block text-[#6B7280] text-sm font-bold mb-2">
                                    Gender
                                </label>
                                <Field
                                    as="select"
                                    id="gender"
                                    name="gender"
                                    className={`shadow appearance-none border ${errors.gender && touched.gender ? 'border-red-500' : ''
                                        } rounded w-full py-2 px-3 text-[#6B7280] leading-tight focus:outline-none focus:shadow-outline`}
                                >
                                    <option value="" label="Select Gender" />
                                    <option value="male" label="Male" />
                                    <option value="female" label="Female" />
                                    <option value="other" label="Other" />
                                </Field>
                                <ErrorMessage name="gender" component="p" className="text-red-500 text-xs " />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="block text-[#6B7280] text-sm font-bold mb-2">
                                    Phone Number
                                </label>
                                <div className="flex gap-x-2">

                                    <Field
                                        as="select"
                                        id="dialCode"
                                        name="dialCode"
                                        className="ml-2 shadow appearance-none border rounded py-2 px-3 text-[#6B7280] leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="+91" label="+91" />
                                        <option value="+1" label="+1" />
                                    </Field>
                                    <Field
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className={`flex-1 shadow appearance-none border ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : ''
                                            } rounded w-full py-2 px-3 text-[#6B7280] leading-tight focus:outline-none focus:shadow-outline`}
                                    />
                                </div>
                                <ErrorMessage name="phoneNumber" component="p" className="text-red-500 text-xs " />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="dateOfBirth" className="block text-[#6B7280] text-sm font-bold mb-2">
                                    Date of Birth
                                </label>
                                <Field
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    className={`shadow appearance-none border ${errors.dateOfBirth && touched.dateOfBirth ? 'border-red-500' : ''
                                        } rounded w-full py-2 px-3 text-[#6B7280] leading-tight focus:outline-none focus:shadow-outline`}
                                />
                                <ErrorMessage name="dateOfBirth" component="p" className="text-red-500 text-xs " />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    );
};

export default OnBoardForm;

