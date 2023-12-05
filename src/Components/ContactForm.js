import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import {
    addNewContact,
    editContact,
    fetchContacts,
} from "./Redux/contactSlice";
import SelectField from "./SelectFiled";
import callApi from "./api";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    designation: Yup.string(),
    notes: Yup.string(),
});

const initialValues = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    notes: "",
    designation: "",
    state: "",
    address: "",
    title: "",
    zipcode: "",
    description: "",
    sourceId: "",
    companyName: "",
    tagId: []

};

const ContactForm = ({ onClose, formValues, formMode, setShowContactForm }) => {
    const [formData, setFormData] = useState(formValues);
    const [states, setStates] = useState([]);
    const [tagCategories, setTagCategories] = useState([]);
    const [customCategories, setCustomCategories] = useState([]);
    const [companyNames, setCompanyNames] = useState([]);
    const [contactSources, setContactSources] = useState([]);

    const dispatch = useDispatch();
    const statesData = useSelector((state) => state.contacts);
    // console.log(statesData);
    // const navigate = useNavigate();

    console.log(tagCategories);
    // console.log(companyNames);

    useEffect(() => {
        setFormData(formValues);
    }, [formValues]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statesData = await getStates();
                setStates(statesData);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const tagData = async () => {
            try {
                //  Get masterId from crm/module
                const moduleResponse = await callApi("GET", "crm/module", {
                    moduleName: "contacts",
                });

                const contactItem = moduleResponse?.data?.find(
                    (item) => item.moduleName === "contacts"
                );
                const contactId = contactItem ? contactItem.id : null;

                // console.log("Contact ID:", contactId);
                // console.log(moduleResponse.data);
                const tagCategoryResponse = await callApi(
                    "GET",
                    `crm/tag-category/?masterId=${contactId}`
                );
                const tagCategories = tagCategoryResponse?.data;
                setTagCategories(tagCategories);
                // console.log(tagCategories);

                const customCategories = await callApi(
                    "GET",
                    `crm/custom-fields?masterId=${contactId}`
                );
                setCustomCategories(customCategories?.data);
                // console.log(customCategories.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        tagData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const companyResponse = await callApi("GET", "crm/company");
                const contactSourceResponse = await callApi("GET", "crm/source");

                const companyNames = companyResponse?.data;
                const contactSources = contactSourceResponse?.data;

                setCompanyNames(companyNames);
                setContactSources(contactSources);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const getStates = async () => {
        try {
            const response = await callApi("GET", "crm/state");
            // console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values);
        try {
            const authToken = localStorage.getItem("authToken");
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            };

            let response;


            const updatedData = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                contactNumber: values.contactNumber,
                designation: values.designation || "",
                notes: values.notes || "",
                address: values.address || "",
                title: values.designation || "",
                zipcode: values.zipcode || "",

                companiesId: values.companiesId || "", // Assuming companiesId is part of your payload
                companyName: values.companyName || "",

                sourceId: values.sourceId || "",

            };

            console.log(formValues);
            const contactId = formValues.id;

            if (formMode === "edit") {
                const actionResult = await dispatch(
                    editContact({ contactId, updatedData })
                );
                response = actionResult?.payload;
                if (response.success) {
                    dispatch(fetchContacts());
                }
            } else {
                const actionResult = await dispatch(addNewContact(values));
                response = actionResult.payload;
                console.log(response);
            }

            const successMessage =
                formMode === "edit"
                    ? "Contact Edited successfully!"
                    : "Contact added successfully!";

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
                        <span className="border-b-2 pb-3 border-indigo-600">
                            Contact Details
                        </span>
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
                                    <label
                                        className="form-label flex mb-2"
                                        htmlFor="contactNumber"
                                    >
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

                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label className="form-label flex mb-2" htmlFor="address">
                                        Address
                                    </label>
                                    <Field
                                        as="input"
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="Address"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.address && errors.address
                                            ? "border-red-500 border-2"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="address"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label className="form-label flex mb-2" htmlFor="state">
                                        State
                                    </label>
                                    <Field
                                        as="select"
                                        type="text"
                                        id="state"
                                        name="state"
                                        placeholder="state"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
                                    >
                                        {states.map((state) => (
                                            <option
                                                className=""
                                                key={state.id}
                                                value={state.stateName}
                                            >
                                                {state.stateName}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage
                                        name="state"
                                        component=""
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label className="form-label flex mb-2" htmlFor="state">
                                        City
                                    </label>
                                    <Field
                                        as="select"
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="city"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
                                    >
                                        <option className="" value="">
                                            city
                                        </option>
                                    </Field>
                                    <ErrorMessage
                                        name="city"
                                        component=""
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label className="form-label flex mb-2" htmlFor="zipcode">
                                        Zip Code
                                    </label>
                                    <Field
                                        as="input"
                                        type="text"
                                        id="zipcode"
                                        name="zipcode"
                                        placeholder="zipcode"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.zipcode && errors.zipcode
                                            ? "border-red-500 border-2"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="zipcode"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            <h1 className="col-span-2 text-black text-xl mt-3">
                                Contact Other Details
                            </h1>

                            {/* Company Name Dropdown */}
                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label
                                        className="form-label capitalize flex mb-2"
                                        htmlFor="companyName"
                                    >
                                        Company Name
                                    </label>
                                    <Field
                                        as="select"
                                        id="companyName"
                                        name="companyName"
                                        placeholder="Company Name"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
                                    >
                                        {companyNames.map((company) => (
                                            <option key={company.id} value={company.companyName}>
                                                {company.companyName}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage
                                        name="companyName"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </div>

                            {/* Contact Source Dropdown */}
                            <div className="col-span-1">
                                <div className={`form-item vertical`}>
                                    <label
                                        className="form-label capitalize flex mb-2"
                                        htmlFor="contactSource"
                                    >
                                        Contact Source
                                    </label>
                                    <Field
                                        as="select"
                                        id="contactSource"
                                        name="contactSource"
                                        placeholder="Contact Source"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
                                    >
                                        {contactSources.map((source) => (
                                            <option key={source.id} value={source.sources}>
                                                {source.sources}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage
                                        name="contactSource"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </div>


                            {/* {tagCategories.map((tag) => (
                                <div className="col-span-1" key={tag.categoryName}>
                                    <div className={`form-item vertical`}>
                                        <label
                                            className="form-label capitalize flex mb-2"
                                            htmlFor={`${tag.categoryName}`}
                                        >
                                            {tag.categoryName}
                                        </label>
                                        <Field
                                            name={tag.categoryName}
                                            render={({ field }) => {
                                                const { value, onChange, onBlur } = field;

                                                return (
                                                    <Select
                                                        value={value}
                                                        onChange={(selectedOptions) => onChange(selectedOptions)}
                                                        onBlur={onBlur}
                                                        isMulti
                                                        options={tag.tags.map((item) => ({
                                                            value: item.tagName,
                                                            label: item.tagName,
                                                        }))}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            ))} */}

                            {tagCategories.map((tag) => (
                                <div className="col-span-1" key={tag.categoryName}>
                                    <div className={`form-item vertical`}>
                                        <label
                                            className="form-label capitalize flex mb-2"
                                            htmlFor={`${tag.categoryName}`}
                                        >
                                            {tag.categoryName}
                                        </label>
                                        <SelectField
                                            name={tag.categoryName}
                                            options={tag.tags.map((item) => ({
                                                value: item.tagName,
                                                label: item.tagName,
                                            }))}
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                            isMulti
                                        />
                                    </div>
                                </div>
                            ))}

                            <h1 className="col-span-2 text-black text-xl mt-3">
                                Additional Details
                            </h1>

                            {customCategories?.map((custom) => (
                                <div className="col-span-1">
                                    <div className={`form-item vertical`}>
                                        <label
                                            className="form-label capitalize flex mb-2"
                                            htmlFor=""
                                        >
                                            {custom.label}
                                        </label>
                                        <Field
                                            as="input"
                                            type={`${custom.inputType}`}
                                            // type="text"
                                            id=""
                                            name={`${custom.name}`}
                                            placeholder={`${custom.label}`}
                                            className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
                                        ></Field>
                                        {/* <ErrorMessage
                                                    name=""
                                                    component=""
                                                    className="text-red-500"
                                                /> */}
                                    </div>
                                </div>
                            ))}

                            <div className="col-span-2 my-10 relative">
                                <div className="flex gap-x-4 absolute bottom-0 right-0">
                                    <div>
                                        <button
                                            className="button border rounded h-11 px-8 py-2"
                                            onClick={onClose}
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
