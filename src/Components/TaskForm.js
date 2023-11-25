import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

// const initialValues = {
//     module: '',
//     type: '',
//     title: '',
//     dueDate: '',
//     priority: '',
//     assignedTo: '',
//     connectedLead: '',
//     descriptions: '',
//     reactjsTags: [],
//     nodejsTags: [],
//     size: '',
//     dob: '',
// };

const validationSchema = Yup.object().shape({
    // module: Yup.string().required('Module is required'),
    // type: Yup.string().required('Type is required'),
    title: Yup.string().required('Title is required'),
    dueDate: Yup.string().required('Due Date is required'),
    priority: Yup.string().required('Priority is required'),
    // descriptions: Yup.string().required('Notes are required'),
    // assignedTo: Yup.string().required('Assigned To is required'),
    // connectedLead: Yup.string().required('Connected Lead is required'),
});

const TaskForm = ({ onClose, formValues, formMode }) => {
    const [formData, setFormData] = useState(formValues);


    // Update internal state when formValues prop changes
    useEffect(() => {
        setFormData(formValues);
    }, [formValues]);

    const navigate = useNavigate();

    // const handleSubmit = async (values, { resetForm }) => {
    //     try {
    //         const authToken = localStorage.getItem('authToken');
    //         const headers = {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${authToken}`,
    //         };

    //         const response = await axios.post('https://crmapi.sarvadhi.work/api/v1/crm/tasks', values, { headers });

    //         console.log(response.data);

    //         toast.success('Task added successfully!', {
    //             position: toast.POSITION.TOP_RIGHT,
    //         });

    //         navigate('/taskdetail');

    //         resetForm();
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //         toast.error('Task added failed', {
    //             position: toast.POSITION.TOP_CENTER,
    //             autoClose: 2000,
    //         });
    //     }
    // };

    const handleSubmit = async (values, { resetForm }) => {

        try {
            const authToken = localStorage.getItem('authToken');
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            };

            let response;

            if (formMode === 'edit') {
                // Update existing task
                response = await axios.put(`https://crmapi.sarvadhi.work/api/v1/crm/tasks/${formValues.Id}`, values, { headers });
            } else {
                // Add new task
                response = await axios.post('https://crmapi.sarvadhi.work/api/v1/crm/tasks', values, { headers });
            }

            console.log(response.data);

            const successMessage = formMode === 'edit' ? 'Task Edited successfully!' : 'Task added successfully!';

            toast.success(successMessage, {
                position: toast.POSITION.TOP_RIGHT,
            });


            navigate('/taskdetail');

            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Task operation failed', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    return (
        <div className='bg-white h-[100vh]'>
            <div className='container p-4'>
                <div className='mb-3'>
                    <h2>Task Details</h2>
                </div>

                <Formik
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <div className={`form-item vertical `}>
                                    <label className="form-label flex mb-2" htmlFor="module">
                                        Module
                                    </label>
                                    <Field
                                        as="select"
                                        id="module"
                                        name="module"
                                        className={`w-full border rounded input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.module && errors.module ? 'border-red-500 border-2' : ''
                                            }`}
                                    >
                                        <option value="" label="Module" />
                                        <option value="lead" label="Lead" />
                                        <option value="contact" label="Contact" />
                                        <option value="deal" label="Deal" />
                                    </Field>
                                    <ErrorMessage name="module" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical `}>
                                    <label className="form-label flex mb-2" htmlFor="type">
                                        Type
                                    </label>
                                    <Field
                                        as="select"
                                        type="text"
                                        id="type"
                                        name="type"
                                        className={`border w-full rounded px-2 py-1 h-11 focus:ring-indigo-600 focus:border-indigo-600 ${touched.type && errors.type ? 'border-red-500 border-2' : ''
                                            }`}
                                    >
                                        <option value="" label="Type" />
                                        {values.module === 'lead' && (
                                            <>
                                                <option value="follow up" label="Follow Up" />
                                                <option value="quotation" label="Quotation" />
                                                <option value="meeting" label="Meeting" />
                                                <option value="other" label="Other" />
                                            </>
                                        )}
                                        {values.module === 'contact' && (
                                            <>
                                                <option value="meeting" label="Meeting" />
                                                <option value="other" label="Other" />
                                            </>
                                        )}
                                        {values.module === 'deal' && (
                                            <>
                                                <option value="feedback" label="Feedback" />
                                                <option value="delivery" label="Delivery" />
                                                <option value="payment clearance" label="Payment Clearance" />
                                            </>
                                        )}
                                    </Field>
                                    <ErrorMessage name="type" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical `}>
                                    <label className="form-label flex mb-2" htmlFor="title">
                                        Title *
                                    </label>
                                    <Field
                                        as="input"
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Title"
                                        className={`w-full h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.title && errors.title ? 'border-red-500 border-2' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical `}>
                                    <label className="flex form-label mb-2" htmlFor="dueDate">
                                        Due Date *
                                    </label>
                                    <Field
                                        as="input"
                                        type="datetime-local"
                                        id="dueDate"
                                        name="dueDate"
                                        className={`input border rounded w-full h-11 input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.dueDate && errors.dueDate ? 'border-red-500 border-2' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="dueDate" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical `}>
                                    <label className="form-label flex mb-2" htmlFor="priority">
                                        Priority *
                                    </label>
                                    <Field
                                        as="select"
                                        id="priority"
                                        name="priority"
                                        className={`w-full h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.priority && errors.priority ? 'border-red-500 border-2' : ''
                                            }`}
                                    >
                                        <option value="none" label="None" />
                                        <option value="high" label="High" />
                                        <option value="medium" label="Medium" />
                                        <option value="low" label="Low" />
                                    </Field>
                                    <ErrorMessage name="priority" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical `}>
                                    <label className="form-label flex mb-2" htmlFor="assignedTo">
                                        Assigned To
                                    </label>
                                    <Field
                                        as="select"
                                        id="assignedTo"
                                        name="assignedTo"
                                        className={`w-full h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.assignedTo && errors.assignedTo ? 'border-red-500 border-2' : ''
                                            }`}
                                    >
                                        <option value="" label="Select..." />
                                        <option value="high" label="High" />
                                        <option value="medium" label="Medium" />
                                        <option value="low" label="Low" />
                                    </Field>
                                    <ErrorMessage name="assignedTo" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label className="form-label flex mb-2" htmlFor="connectedLead">
                                        Connected Lead
                                    </label>
                                    <Field
                                        as="select"
                                        id="connectedLead"
                                        name="connectedLead"
                                        className={`w-full h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.connectedLead && errors.connectedLead ? 'border-red-500 border-2' : ''
                                            }`}
                                    >
                                        <option value="" label="Select..." />
                                        <option value="high" label="High" />
                                        <option value="medium" label="Medium" />
                                        <option value="low" label="Low" />
                                    </Field>
                                    <ErrorMessage name="connectedLead" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="form-item vertical mb-5 col-span-2">
                                <label className="form-label mb-2 flex" htmlFor="descriptions">
                                    Notes
                                </label>
                                <Field
                                    as="textarea"
                                    name="descriptions"
                                    placeholder="Notes"
                                    className={`border w-full h-32 rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.descriptions && errors.descriptions ? 'border-red-500 border-2' : ''
                                        }`}
                                />
                                <ErrorMessage name="descriptions" component="div" className="text-red-500" />
                            </div>

                            <div className='col-span-2 mt-5 relative bottom-0 right-0'>
                                <div className='flex gap-x-4 absolute bottom-0 right-0'>
                                    <div>
                                        <button
                                            className="button border  rounded h-11 px-8 py-2 "
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded h-11 px-8 py-2 "
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default TaskForm;
