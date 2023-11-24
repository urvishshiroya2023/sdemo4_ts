import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const initialValues = {
    module: '',
    type: '',
    title: '',
    dueDate: '',
    priority: '',
    assignedTo: '',
    connectedLead: '',
    descriptions: '',
    reactjsTags: [],
    nodejsTags: [],
    size: '',
    dob: '',
};

const validationSchema = Yup.object().shape({
    module: Yup.string().required('Module is required'),
    type: Yup.string().required('Type is required'),
    title: Yup.string().required('Title is required'),
    dueDate: Yup.string().required('Due Date is required'),
    priority: Yup.string().required('Priority is required'),
    descriptions: Yup.string().required('Notes are required'),
});

const TaskForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { resetForm }) => {
        try {

            const authToken = localStorage.getItem('authToken');


            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            };

            const response = await axios.post('https://crmapi.sarvadhi.work/api/v1/crm/tasks', values, { headers });

            console.log(response.data);

            toast.success('Task added successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });

            navigate('/taskdetail');

            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Registration failed. Please check your credentials.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    return (
        <div className='flex justify-center'>
            <div className='container mt-5'>
                <div className='mb-3'>
                    <h2>Add New Task</h2>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <div className="form-item vertical">
                                <label className="form-label mb-2" htmlFor="module">Module</label>
                                <Field
                                    as="select"
                                    id="module"
                                    name="module"
                                    className=" border rounded ml-2 input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                >
                                    <option value="" label="Select Module" />
                                    <option value="lead" label="lead" />
                                    <option value="deal" label="Deal" />
                                    <option value="contact" label="contact" />
                                </Field>
                                <ErrorMessage name="module" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="form-item vertical">
                                <label className="form-label mb-2" htmlFor="type">Type</label>
                                <Field
                                    as="input"
                                    type="text"
                                    id="type"
                                    name="type"
                                    className="border ml-2 rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600"
                                />
                                <ErrorMessage name="type" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="form-item vertical">
                                <label className="form-label mb-2" htmlFor="title">Title</label>
                                <Field
                                    as="input"
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="ml-2 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="form-item vertical">
                                <label className="form-label mb-2" htmlFor="dueDate">Due Date</label>
                                <Field
                                    as="input"
                                    type="datetime-local"
                                    id="dueDate"
                                    name="dueDate"
                                    className="input border rounded ml-2 input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                />
                                <ErrorMessage name="dueDate" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="form-item vertical">
                                <label className="form-label mb-2" htmlFor="priority">Priority</label>
                                <Field
                                    as="select"
                                    id="priority"
                                    name="priority"
                                    className=" ml-2 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600"
                                >
                                    <option value="none" label="none" />
                                    <option value="high" label="high" />
                                    <option value="medium" label="medium" />
                                    <option value="low" label="low" />
                                </Field>
                                <ErrorMessage name="priority" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div className="form-item vertical col-span-2">
                            <label className="form-label mb-2" htmlFor="descriptions">Notes</label>
                            <Field
                                as="textarea"
                                name="descriptions"
                                className="border ml-2 rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600"
                            />
                            <ErrorMessage name="descriptions" component="div" className="text-red-500" />
                        </div>

                        <div className='col-span-2'>
                            <button
                                type="submit"
                                className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded h-11 px-8 py-2 "
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                </Formik>

            </div>
        </div>
    );
};

export default TaskForm;

