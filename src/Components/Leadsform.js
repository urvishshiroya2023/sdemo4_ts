import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    contactName: Yup.string().required('Contact Name is required'),
    title: Yup.string().required('Title is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactNumber: Yup.string().required('Contact Number is required'),
    budget: Yup.number().required('Budget is required').positive('Budget must be positive'),
    notes: Yup.string(),
    leadsNewCategory: Yup.string(),
    leadCate2: Yup.string(),
    leadsCategory: Yup.string(),
    bhargav: Yup.string(),
    skills: Yup.string().required('Skills is required'),
});

const Leadsform = ({ onClose }) => {
    const initialValues = {
        contactName: '',
        title: '',
        email: '',
        contactNumber: '',
        budget: '',
        notes: '',
        leadsNewCategory: '',
        leadCate2: '',
        leadsCategory: '',
        bhargav: '',
        skills: '',
    };

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Form submitted with values:', values);
        setSubmitting(false);
    };

    return (
        <div>
            <div className="font-semibold  border-b text-indigo-600">
                <div className="pb-3">
                    <span className="border-b-2 pb-3  border-indigo-600">
                        Leads Details
                    </span>
                </div>
            </div>
            <div>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {({ isSubmitting, touched, errors }) => (
                        <Form>
                            <div className="grid bg-white grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="col-span-1">
                                    <label className="form-label mb-2">Contact Name</label>
                                    <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.contactName && errors.contactName
                                        ? "border-red-500 border-2"
                                        : ""
                                        }`} type="text" name="contactName" />
                                    <ErrorMessage name="contactName" component="div" className="text-red-600 text-sm mt-1" />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label mb-2">Title</label>
                                    <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.title && errors.contactName
                                        ? "border-red-500 border-2"
                                        : ""
                                        }`} type="text" name="title" />
                                    <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="col-span-1">
                                    <label className="form-label mb-2">Email</label>
                                    <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.email && errors.contactName
                                        ? "border-red-500 border-2"
                                        : ""
                                        }`} type="text" name="email" />
                                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label mb-2">Contact Number</label>
                                    <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.contactNumber && errors.contactName
                                        ? "border-red-500 border-2"
                                        : ""
                                        }`} type="text" name="contactNumber" />
                                    <ErrorMessage name="contactNumber" component="div" className="text-red-600 text-sm mt-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="col-span-1">
                                    <label className="form-label mb-2">Budget</label>
                                    <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.budget && errors.contactName
                                        ? "border-red-500 border-2"
                                        : ""
                                        }`} type="number" name="budget" />
                                    <ErrorMessage name="budget" component="div" className="text-red-600 text-sm mt-1" />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label mb-2">Notes</label>
                                    <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.notes && errors.contactName
                                        ? "border-red-500 border-2"
                                        : ""
                                        }`} as="textarea" name="notes" />
                                    <ErrorMessage name="notes" component="div" className="text-red-600 text-sm mt-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="col-span-1">
                                    <label className="form-label mb-2">Leads New Category</label>
                                    {/* Add the Field and ErrorMessage components for Leads New Category */}
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label mb-2">Lead Cate 2</label>
                                    {/* Add the Field and ErrorMessage components for Lead Cate 2 */}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="col-span-1">
                                    <label className="form-label mb-2">Leads Category</label>
                                    {/* Add the Field and ErrorMessage components for Leads Category */}
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label mb-2">Bhargav</label>
                                    {/* Add the Field and ErrorMessage components for Bhargav */}
                                </div>
                            </div>

                            <div className="mb-2">
                                <h5>Additional Details</h5>
                                <p></p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label className="form-label mb-2">Bhargav</label>
                                    {/* Add the Field and ErrorMessage components for Bhargav */}
                                </div>

                                <div>
                                    <label className="form-label mb-2">Skills</label>
                                    {/* Add the Field and ErrorMessage components for Skills */}
                                </div>
                            </div>

                            <div className="mb-2">
                                <h5>Additional Details</h5>
                                <p></p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label className="form-label mb-2">Bhargav</label>
                                    <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.bhargav && errors.contactName
                                        ? "border-red-500 border-2"
                                        : ""
                                        }`} type="text" name="bhargav" />
                                    <ErrorMessage name="bhargav" component="div" className="text-red-600 text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="form-label mb-2">Skills</label>
                                    <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.skills && errors.contactName
                                        ? "border-red-500 border-2"
                                        : ""
                                        }`} type="text" name="skills" />
                                    <ErrorMessage name="skills" component="div" className="text-red-600 text-sm mt-1" />
                                </div>
                            </div>

                            <div className="drawer-footer">
                                <div className="text-right w-full">
                                    <button
                                        type="button"
                                        className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 text-sm mr-2"
                                        disabled={isSubmitting}
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white radius-round h-9 px-3 py-2 text-sm"
                                        disabled={isSubmitting}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    );
};

export default Leadsform;
