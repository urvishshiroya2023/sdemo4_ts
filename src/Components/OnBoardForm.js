import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name Required'),
    lastName: Yup.string().required('Last Name Required'),
    email: Yup.string().email('Invalid email Address').required('Email Required'),
    gender: Yup.string().required('Gender Required'),
    phoneNumber: Yup.string().required('Phone Number Required'),
    dob: Yup.date().required('Date of Birth Required'),
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
    dob: '',
};

const OnBoardForm = () => {

    // const onSubmit = (values, { setSubmitting }) => {
    //     console.log(values);
    //     setSubmitting(false);
    // };

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://192.168.2.129:9500/api/v1/master/crm/organization-admin', values);
            console.log(response.data);
            setSubmitting(false);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6 bg-white w-4/5 sm:w-[60%] ">
            <div>
                <div className="mb-8">
                    <h3 className="mb-1 text-2xl font-semibold tracking-wide">Personal Information</h3>
                    <p className='text-[#6B7280] mt-2 font-light text-sm tracking-wide'>Basic information for an account opening</p>
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
                            <div className='md:flex justify-between gap-x-2'>
                                <div className="mb-5 w-full">
                                    <label htmlFor="firstName" className="block  text-[#6B7280] text-sm font-semibold mb-2">
                                        First Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        className={`relative font-light appearance-none  border ${errors.firstName && touched.firstName ? 'border-red-500 border-2' : ''
                                            } rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-indigo-500 focus:border-2 focus:outline-none focus:shadow-outline`}
                                    />
                                    <ErrorMessage name="firstName" component="p" className="text-red-500 text-xs absolute" />
                                </div>

                                <div className="mb-5 w-full">
                                    <label htmlFor="lastName" className="block text-[#6B7280] text-sm font-semibold mb-2">
                                        Last Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className={`relative font-light  appearance-none border ${errors.lastName && touched.lastName ? 'border-red-500 border-2' : ''
                                            } rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-indigo-500 focus:border-2 focus:outline-none focus:shadow-outline`}
                                    />
                                    <ErrorMessage name="lastName" component="p" className="absolute text-red-500 text-xs " />
                                </div>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="email" className="block text-[#6B7280] text-sm font-semibold mb-2">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    className={`relative font-light  appearance-none border ${errors.email && touched.email ? 'border-red-500 border-2' : ''
                                        } rounded w-full py-3 px-3 text-[#6B7280] leading-tight focus:border-indigo-500 focus:border-2 focus:outline-none focus:shadow-outline`}
                                />
                                <ErrorMessage name="email" component="p" className="absolute text-red-500 text-xs " />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="gender" className="block text-[#6B7280] text-sm font-semibold mb-2">
                                    Gender
                                </label>
                                <Field
                                    as="select"
                                    id="gender"
                                    name="gender"
                                    className={`relative font-light  appearance-none border ${errors.gender && touched.gender ? 'border-red-500 border-2' : ''
                                        } rounded w-full py-3 px-3 text-[#6B7280] leading-tight focus:border-indigo-500 focus:border-2 focus:outline-none focus:shadow-outline`}
                                >
                                    <option value="" label="Select Gender" />
                                    <option value="male" label="Male" />
                                    <option value="female" label="Female" />
                                    <option value="other" label="Other" />
                                </Field>
                                <ErrorMessage name="gender" component="p" className="absolute text-red-500 text-xs " />
                            </div>

                            <div className='md:flex justify-between gap-x-2'>
                                <div className="mb-5 w-full">
                                    <label htmlFor="phoneNumber" className="block text-[#6B7280] text-sm font-semibold mb-2">
                                        Phone Number
                                    </label>
                                    <div className="flex ">

                                        <Field
                                            as="select"
                                            id="dialCode"
                                            name="dialCode"
                                            className={`appearance-none font-light  border ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500 border-2' : ''
                                                } rounded-l border-r-0 py-3 px-3 text-[#6B7280] focus:border-indigo-500 focus:border-2 leading-tight focus:outline-none focus:shadow-outline`}

                                        >

                                            <option value="" label="DialCode" />
                                            <option value="+91" label="+91" />
                                            <option value="+1" label="+1" />
                                        </Field>

                                        <Field
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            placeholder="Phone Number"
                                            className={`flex-1 relative font-light  appearance-none border ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500 border-2' : ''
                                                } rounded-r w-full py-3 px-3 text-[#6B7280] leading-tight focus:border-indigo-500 focus:border-2 focus:outline-none focus:shadow-outline`}
                                        />
                                    </div>
                                    <ErrorMessage name="phoneNumber" component="p" className="absolute text-red-500 text-xs " />
                                </div>

                                <div className="mb-5 w-full">
                                    <label htmlFor="dateOfBirth" className="block text-[#6B7280] text-sm font-semibold mb-2">
                                        Date of Birth
                                    </label>
                                    <Field
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        className={`relative font-light  appearance-none border ${errors.dob && touched.dob ? 'border-red-500 border-2' : ''
                                            } rounded w-full py-3 px-3 text-[#6B7280] leading-tight focus:border-indigo-500 focus:border-2 focus:outline-none focus:shadow-outline`}
                                    />
                                    <ErrorMessage name="dob" component="p" className="absolute text-red-500 text-xs " />
                                </div>
                            </div>

                            <div className='relative'>
                                <button
                                    type="submit"
                                    className="button  text-sm absolute top-0 right-0 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline"
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