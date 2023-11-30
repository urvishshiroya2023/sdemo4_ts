import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { addNewLeads, editLead, fetchLeads } from './Redux/leadSlice';
import { fetchTasks } from './Redux/tasksSlice';

const validationSchema = Yup.object().shape({
    // contactName: Yup.string().required('Contact Name is required'),
    title: Yup.string().required('Title is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactNumber: Yup.string().required('Contact Number is required'),
    budget: Yup.number().required('Budget is required').positive('Budget must be positive'),
    // notes: Yup.string()
    // leadsNewCategory: Yup.string()
    // leadCate2: Yup.string()
    // leadsCategory: Yup.string()
    // bhargav: Yup.string()
    // skills: Yup.string().required('Skills is required')
});

const Leadsform = ({ onClose, formMode, setShowLeadForm, formValues }) => {

    const dispatch = useDispatch();
    const initialValues = {
        id: '',
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

    // const handleSubmit = (values, { setSubmitting, resetForm }) => {
    //     console.log('Form submitted with values:', values);
    //     setSubmitting(false);
    //     resetForm();
    //     onClose();
    // };

    // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //     try {
    //         console.log('Form values received:', values);
    //         await dispatch(addNewLeads(values));
    //         console.log('Form submitted with values:', values);
    //         setSubmitting(false);
    //         resetForm();
    //         onClose();
    //         dispatch(fetchTasks());
    //     } catch (error) {
    //         // Handle any errors that might occur during the API call.
    //         console.error('Error submitting form:', error);
    //         setSubmitting(false);
    //     }
    // };

    // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //     try {
    //         console.log('Form values received:', values);
    //         await dispatch(addNewLeads(values));
    //         dispatch(fetchTasks());
    //         console.log('Form submitted with values:', values);
    //         setSubmitting(false);
    //         resetForm();
    //         onClose();


    //         // Display success notification
    //         toast.success('New leads added successfully!', {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: 3000, // Auto-close the notification after 3000 milliseconds (3 seconds)
    //         });

    //     } catch (error) {
    //         // Handle any errors that might occur during the API call.
    //         console.error('Error submitting form:', error);

    //         // Display error notification
    //         toast.error('Error adding new leads. Please try again.', {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: 3000,
    //         });

    //         setSubmitting(false);
    //     }
    // };

    //main 
    // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //     try {
    //         // console.log('Form values received:', values);
    //         await dispatch(addNewLeads(values));
    //         // The code inside this block will only execute if dispatch(addNewLeads(values)) is successful
    //         console.log('Form submitted with values:', values);
    //         setSubmitting(false);
    //         resetForm();
    //         onClose();
    //         dispatch(fetchTasks());
    //     } catch (error) {
    //         // Handle any errors that might occur during the API call.
    //         console.error('Error submitting form:', error);

    //         // Display error notification
    //         toast.error('Error adding new leads. Please try again.', {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: 3000,
    //         });
    //     }
    // };

    //update
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            let response;
            const updatedData = {
                ...values,
                // Add other fields as needed
            };
            // console.log(formValues.id)
            // console.log(updatedData);
            const leadId = formValues.id;

            if (formMode === "edit") {
                // Dispatch the editTask action for updating an existing task
                const actionResult = await dispatch(editLead({ leadId, updatedData }));
                response = actionResult?.payload;
                // console.log(response);
                // console.log(response)
                if (response.success) {
                    dispatch(fetchTasks());
                }
            } else {
                // Dispatch the add new task action
                const actionResult = await dispatch(addNewLeads(values));
                response = actionResult.payload;
            }

            // console.log(response);

            const successMessage =
                formMode === "edit"
                    ? "lead Edited successfully!"
                    : "lead added successfully!";

            toast.success(successMessage, {
                position: toast.POSITION.TOP_RIGHT,
            });
            resetForm();
            setShowLeadForm(false);
            dispatch(fetchLeads());
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(`${error?.response?.data?.message}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
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
            <div className='mt-5'>
                {/* <Formik initialValues={formValues} onSubmit={handleSubmit} validationSchema={validationSchema}> */}
                <Formik initialValues={formMode === "edit" ? formValues : initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
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
                                    <label className="form-label mb-2">Title *</label>
                                    <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.title && errors.contactName
                                        ? "border-red-500 border-2"
                                        : ""
                                        }`} type="text" name="title" />
                                    <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="col-span-1">
                                    <label className="form-label mb-2">Email *</label>
                                    <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.email && errors.contactName
                                        ? "border-red-500 border-2"
                                        : ""
                                        }`} type="text" name="email" />
                                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label mb-2">Contact Number *</label>
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
