import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { addNewContact, editContact, fetchContacts } from "./Redux/contactSlice";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    designation: Yup.string(),
    notes: Yup.string(),
});

const ContactForm = ({ onClose, formValues, formMode, setShowContactForm }) => {
    const [formData, setFormData] = useState(formValues);
    const dispatch = useDispatch();

    console.log(formValues);

    useEffect(() => {
        setFormData(formValues);
    }, [formValues]);

    const navigate = useNavigate();

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const authToken = localStorage.getItem("authToken");
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            };

            let response;

            const updatedData = {
                ...values,
                // Add other fields as needed
            };

            console.log(formValues);
            const contactId = formValues.id;

            if (formMode === "edit") {
                // Dispatch the editContact action for updating an existing contact
                const actionResult = await dispatch(editContact({ contactId, updatedData }));
                response = actionResult?.payload;
                if (response.success) {
                    dispatch(fetchContacts());
                }
            } else {
                const actionResult = await dispatch(addNewContact(values));
                response = actionResult.payload;
            }

            const successMessage = formMode === "edit" ? "Contact Edited successfully!" : "Contact added successfully!";

            toast.success(successMessage, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setShowContactForm(false);
            resetForm();
            dispatch(fetchContacts());
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(`${error?.response?.data?.message}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="bg-white overflow-y-auto h-[100vh]">
            <div className="container p-4">
                <div className="font-semibold border-b text-indigo-600">
                    <div className="pb-3">
                        <span className="border-b-2 pb-3 border-indigo-600">Contact Details</span>
                    </div>
                </div>

                <Formik
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form className="grid grid-cols-1 mt-3 font-semibold text-[#6B7280] text-sm md:grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label className="form-label flex mb-2" htmlFor="firstName">
                                        First Name *
                                    </label>
                                    <Field
                                        as="input"
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.firstName && errors.firstName
                                            ? "border-red-500 border-2"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="firstName"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label className="form-label flex mb-2" htmlFor="lastName">
                                        Last Name *
                                    </label>
                                    <Field
                                        as="input"
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.lastName && errors.lastName
                                            ? "border-red-500 border-2"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="lastName"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label className="form-label flex mb-2" htmlFor="email">
                                        Email *
                                    </label>
                                    <Field
                                        as="input"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.email && errors.email
                                            ? "border-red-500 border-2"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label className="form-label flex mb-2" htmlFor="contactNumber">
                                        Contact Number *
                                    </label>
                                    <Field
                                        as="input"
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        placeholder="Contact Number"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.contactNumber && errors.contactNumber
                                            ? "border-red-500 border-2"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="contactNumber"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label className="form-label flex mb-2" htmlFor="designation">
                                        Designation
                                    </label>
                                    <Field
                                        as="input"
                                        type="text"
                                        id="designation"
                                        name="designation"
                                        placeholder="Designation"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.designation && errors.designation
                                            ? "border-red-500 border-2"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="designation"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-2">
                                <div className={`form-item vertical mb-5`}>
                                    <label className="form-label mb-2 flex" htmlFor="notes">
                                        Notes
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="notes"
                                        placeholder="Notes"
                                        className={`border font-light text-sm w-full h-32 rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.notes && errors.notes
                                            ? "border-red-500 border-2"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="notes"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            {/* Add more fields as needed */}

                            <div className="col-span-2 mt-10 relative">
                                <div className="flex gap-x-4 absolute bottom-0 right-0">
                                    <div>
                                        <button
                                            className="button border rounded h-11 px-8 py-2"
                                            onClick={() => { setShowContactForm(false) }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded h-11 px-8 py-2"
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

export default ContactForm;
