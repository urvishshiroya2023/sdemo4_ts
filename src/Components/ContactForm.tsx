// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import * as Yup from "yup";
// import {
//     addNewContact,
//     editContact,
//     fetchContacts,
// } from "./Redux/contactSlice";
// import SelectField from "./SelectFiled";
// import callApi from "./api";

// const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required("First Name is required"),
//     lastName: Yup.string().required("Last Name is required"),
//     email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//     contactNumber: Yup.string().required("Contact Number is required"),
//     designation: Yup.string(),
//     notes: Yup.string(),
// });

// const initialValues = {
//     id: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     contactNumber: "",
//     notes: "",
//     designation: "",
//     state: "",
//     address: "",
//     title: "",
//     zipcode: "",
//     description: "",
//     sourceId: "",
//     companyName: "",
//     companiesId: "",
//     tagId: []

// };

// const ContactForm = ({ onClose, formValues, formMode, setShowContactForm }) => {
//     const [formData, setFormData] = useState(formValues);
//     const [states, setStates] = useState([]);
//     const [tagCategories, setTagCategories] = useState([]);
//     const [customCategories, setCustomCategories] = useState([]);
//     const [companyNames, setCompanyNames] = useState([]);
//     const [contactSources, setContactSources] = useState([]);
//     const [selectedTags, setSelectedTags] = useState([]);



//     const dispatch = useDispatch();
//     const statesData = useSelector((state) => state.contacts);

//     const formikRef = useRef();

//     useEffect(() => {
//         if (formikRef.current) {
//             const setFieldValue = formikRef.current.setFieldValue;
//             setFieldValue('tagId', selectedTags);
//         }
//     }, [selectedTags]);

//     useEffect(() => {
//         if (formMode === 'edit') {
//             const existingTags = formValues.tags.map((tag) => tag.id);
//             setSelectedTags(existingTags);
//         }
//     }, [formMode, formValues]);

//     useEffect(() => {
//         setFormData(formValues);
//     }, [formValues]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const statesData = await getStates();
//                 setStates(statesData);
//             } catch (error) {
//                 console.error("Error fetching states:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const tagData = async () => {
//             try {
//                 const moduleResponse = await callApi("GET", "crm/module", {
//                     moduleName: "contacts",
//                 });

//                 const contactItem = moduleResponse?.data?.find(
//                     (item) => item.moduleName === "contacts"
//                 );
//                 const contactId = contactItem ? contactItem.id : null;
//                 const tagCategoryResponse = await callApi(
//                     "GET",
//                     `crm/tag-category/?masterId=${contactId}`
//                 );
//                 const tagCategories = tagCategoryResponse?.data;
//                 setTagCategories(tagCategories);

//                 const customCategories = await callApi(
//                     "GET",
//                     `crm/custom-fields?masterId=${contactId}`
//                 );
//                 setCustomCategories(customCategories?.data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         tagData();
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const companyResponse = await callApi("GET", "crm/company");
//                 const contactSourceResponse = await callApi("GET", "crm/source");

//                 const companyNames = companyResponse?.data;
//                 const contactSources = contactSourceResponse?.data;

//                 setCompanyNames(companyNames);
//                 setContactSources(contactSources);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     const getStates = async () => {
//         try {
//             const response = await callApi("GET", "crm/state");
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     };
//     const handleSubmit = async (values, { resetForm }) => {
//         console.log(values);
//         const tagIds = values.tagId;
//         try {
//             const authToken = localStorage.getItem("authToken");
//             const headers = {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${authToken}`,
//             };

//             let response;
//             const updatedData = {
//                 firstName: values.firstName,
//                 lastName: values.lastName,
//                 email: values.email,
//                 contactNumber: values.contactNumber,
//                 title: values.title || "",
//                 notes: values.notes || "",
//                 address: values.address || "",
//                 zipcode: values.zipcode || "",
//                 companiesId: values.companiesId || "",
//                 companyName: values.companyName || "",
//                 sourceId: values.sourceId || "",
//                 tagId: values.tagId,

//             };
//             console.log(formValues);

//             const contactId = formValues.id;

//             if (formMode === "edit") {
//                 const actionResult = await dispatch(
//                     editContact({ contactId, updatedData })
//                 );
//                 response = actionResult?.meta?.requestStatus
//                 if (response === "fulfilled") {
//                     dispatch(fetchContacts());
//                 }
//             } else {
//                 const actionResult = await dispatch(addNewContact(values));
//                 response = actionResult?.payload;
//                 console.log(response);
//             }

//             const successMessage =
//                 formMode === "edit"
//                     ? "Contact Edited successfully!"
//                     : "Contact added successfully!";

//             toast.success(successMessage, {
//                 position: toast.POSITION.TOP_RIGHT,
//             });
//             setShowContactForm(false);
//             resetForm();
//             dispatch(fetchContacts());
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             toast.error(`${error?.response?.data?.message}`, {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 2000,
//             });
//         }
//     };

//     return (
//         <div className="bg-white overflow-y-auto h-[100vh]">
//             <div className="container p-4">
//                 <div className="font-semibold border-b text-indigo-600">
//                     <div className="pb-3">
//                         <span className="border-b-2 pb-3 border-indigo-600">
//                             Contact Details
//                         </span>
//                     </div>
//                 </div>

//                 <Formik
//                     innerRef={formikRef}
//                     initialValues={formValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                 >
//                     {({ values, errors, touched, setFieldValue }) => (
//                         <Form className="grid grid-cols-1 mt-3 font-semibold text-[#6B7280] text-sm md:grid-cols-2 gap-4">
//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label className="form-label flex mb-2" htmlFor="firstName">
//                                         First Name *
//                                     </label>
//                                     <Field
//                                         as="input"
//                                         type="text"
//                                         id="firstName"
//                                         name="firstName"
//                                         placeholder="First Name"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.firstName && errors.firstName
//                                             ? "border-red-500 border-2"
//                                             : ""
//                                             }`}
//                                     />
//                                     <ErrorMessage
//                                         name="firstName"
//                                         component="div"
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label className="form-label flex mb-2" htmlFor="lastName">
//                                         Last Name *
//                                     </label>
//                                     <Field
//                                         as="input"
//                                         type="text"
//                                         id="lastName"
//                                         name="lastName"
//                                         placeholder="Last Name"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.lastName && errors.lastName
//                                             ? "border-red-500 border-2"
//                                             : ""
//                                             }`}
//                                     />
//                                     <ErrorMessage
//                                         name="lastName"
//                                         component="div"
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label className="form-label flex mb-2" htmlFor="email">
//                                         Email *
//                                     </label>
//                                     <Field
//                                         as="input"
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         placeholder="Email"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.email && errors.email
//                                             ? "border-red-500 border-2"
//                                             : ""
//                                             }`}
//                                     />
//                                     <ErrorMessage
//                                         name="email"
//                                         component="div"
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label
//                                         className="form-label flex mb-2"
//                                         htmlFor="contactNumber"
//                                     >
//                                         Contact Number *
//                                     </label>
//                                     <Field
//                                         as="input"
//                                         type="tel"
//                                         id="contactNumber"
//                                         name="contactNumber"
//                                         placeholder="Contact Number"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.contactNumber && errors.contactNumber
//                                             ? "border-red-500 border-2"
//                                             : ""
//                                             }`}
//                                     />
//                                     <ErrorMessage
//                                         name="contactNumber"
//                                         component="div"
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label className="form-label flex mb-2" htmlFor="designation">
//                                         Designation
//                                     </label>
//                                     <Field
//                                         as="input"
//                                         type="text"
//                                         id="title"
//                                         name="title"
//                                         placeholder="Designation"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.designation && errors.designation
//                                             ? "border-red-500 border-2"
//                                             : ""
//                                             }`}
//                                     />
//                                     <ErrorMessage
//                                         name="designation"
//                                         component="div"
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-span-2">
//                                 <div className={`form-item vertical mb-5`}>
//                                     <label className="form-label mb-2 flex" htmlFor="notes">
//                                         Notes
//                                     </label>
//                                     <Field
//                                         as="textarea"
//                                         name="notes"
//                                         placeholder="Notes"
//                                         className={`border font-light text-sm w-full h-32 rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.notes && errors.notes
//                                             ? "border-red-500 border-2"
//                                             : ""
//                                             }`}
//                                     />
//                                     <ErrorMessage
//                                         name="notes"
//                                         component="div"
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label className="form-label flex mb-2" htmlFor="address">
//                                         Address
//                                     </label>
//                                     <Field
//                                         as="input"
//                                         type="text"
//                                         id="address"
//                                         name="address"
//                                         placeholder="Address"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.address && errors.address
//                                             ? "border-red-500 border-2"
//                                             : ""
//                                             }`}
//                                     />
//                                     <ErrorMessage
//                                         name="address"
//                                         component="div"
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label className="form-label flex mb-2" htmlFor="state">
//                                         State
//                                     </label>
//                                     <Field
//                                         as="select"
//                                         type="text"
//                                         id="state"
//                                         name="state"
//                                         placeholder="state"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
//                                     >
//                                         {states.map((state) => (
//                                             <option
//                                                 className=""
//                                                 key={state.id}
//                                                 value={state.stateName}
//                                             >
//                                                 {state.stateName}
//                                             </option>
//                                         ))}
//                                     </Field>
//                                     <ErrorMessage
//                                         name="state"
//                                         component=""
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label className="form-label flex mb-2" htmlFor="state">
//                                         City
//                                     </label>
//                                     <Field
//                                         as="select"
//                                         type="text"
//                                         id="city"
//                                         name="city"
//                                         placeholder="city"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
//                                     >
//                                         <option className="" value="">
//                                             city
//                                         </option>
//                                     </Field>
//                                     <ErrorMessage
//                                         name="city"
//                                         component=""
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label className="form-label flex mb-2" htmlFor="zipcode">
//                                         Zip Code
//                                     </label>
//                                     <Field
//                                         as="input"
//                                         type="text"
//                                         id="zipcode"
//                                         name="zipcode"
//                                         placeholder="zipcode"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.zipcode && errors.zipcode
//                                             ? "border-red-500 border-2"
//                                             : ""
//                                             }`}
//                                     />
//                                     <ErrorMessage
//                                         name="zipcode"
//                                         component="div"
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <h1 className="col-span-2 text-black text-xl mt-3">
//                                 Contact Other Details
//                             </h1>

//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label
//                                         className="form-label capitalize flex mb-2"
//                                         htmlFor="companyName"
//                                     >
//                                         Company Name
//                                     </label>
//                                     <Field
//                                         as="select"
//                                         id="companiesId"
//                                         name="companiesId"
//                                         placeholder="Company Name"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
//                                     >
//                                         {companyNames.map((company) => (
//                                             <option key={company.id} value={company.id}>
//                                                 {company.companyName}
//                                             </option>
//                                         ))}
//                                     </Field>
//                                     <ErrorMessage
//                                         name="companyName"
//                                         component="div"
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-span-1">
//                                 <div className={`form-item vertical`}>
//                                     <label
//                                         className="form-label capitalize flex mb-2"
//                                         htmlFor="contactSource"
//                                     >
//                                         Contact Source
//                                     </label>
//                                     <Field
//                                         as="select"
//                                         id="contactSource"
//                                         name="contactSource"
//                                         placeholder="Contact Source"
//                                         className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
//                                     >
//                                         {contactSources.map((source) => (
//                                             <option key={source.id} value={source.sources}>
//                                                 {source.sources}
//                                             </option>
//                                         ))}
//                                     </Field>
//                                     <ErrorMessage
//                                         name="contactSource"
//                                         component="div"
//                                         className="text-red-500"
//                                     />
//                                 </div>
//                             </div>


//                             {tagCategories.map((tagCategory) => (
//                                 <div className="col-span-1" key={tagCategory.categoryName}>
//                                     <div className={`form-item vertical`}>
//                                         <label
//                                             className="form-label capitalize flex mb-2"
//                                             htmlFor={`${tagCategory.categoryName}`}
//                                         >
//                                             {tagCategory.categoryName}
//                                         </label>

//                                         <SelectField
//                                             name={tagCategory.categoryName}
//                                             options={tagCategory.tags.map((tag) => ({
//                                                 value: tag.id,
//                                                 label: tag.tagName,
//                                             }))}
//                                             className="react-select-container"
//                                             classNamePrefix="react-select"
//                                             isMulti
//                                             value={selectedTags
//                                                 .filter((tagId) => tagCategory.tags.some((tag) => tag.id === tagId))
//                                                 .map((tagId) => ({
//                                                     value: tagId,
//                                                     label: tagCategory.tags.find((tag) => tag.id === tagId).tagName,
//                                                 }))}
//                                             onChange={(selectedOptions, { action, removedValue }) => {
//                                                 const tagIds = selectedOptions.map((option) => option.value);

//                                                 if (action === 'remove-value' && removedValue) {
//                                                     const removedTagId = removedValue.value;
//                                                     setSelectedTags((prevSelectedTags) => (
//                                                         prevSelectedTags.filter((tagId) => tagId !== removedTagId)
//                                                     ));
//                                                 } else {
//                                                     const updatedTags = [...selectedTags, ...tagIds];
//                                                     const uniqueTags = [...new Set(updatedTags)];
//                                                     setSelectedTags(uniqueTags);
//                                                 }
//                                             }}
//                                         />
//                                     </div>
//                                 </div>
//                             ))}

//                             <h1 className="col-span-2 text-black text-xl mt-3">
//                                 Additional Details
//                             </h1>

//                             {customCategories?.map((custom) => (
//                                 <div className="col-span-1">
//                                     <div className={`form-item vertical`}>
//                                         <label
//                                             className="form-label capitalize flex mb-2"
//                                             htmlFor=""
//                                         >
//                                             {custom.label}
//                                         </label>
//                                         <Field
//                                             as="input"
//                                             type={`${custom.inputType}`}
//                                             id=""
//                                             name={`${custom.name}`}
//                                             placeholder={`${custom.label}`}
//                                             className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
//                                         ></Field>
//                                     </div>
//                                 </div>
//                             ))}

//                             <div className="col-span-2 my-10 relative">
//                                 <div className="flex gap-x-4 absolute bottom-0 right-0">
//                                     <div>
//                                         <button
//                                             className="button border rounded h-11 px-8 py-2"
//                                             onClick={onClose}
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                     <div>
//                                         <button
//                                             type="submit"
//                                             className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded h-11 px-8 py-2"
//                                         >
//                                             Save
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// };

// export default ContactForm;

import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { METHOD } from "../Constant/Methods";
import InputField from "./InputField";
import {
    AddNewContactPayload,
    addNewContact,
    editContact,
    fetchContacts,
} from "./Redux/contactSlice";
import { useAppDispatch } from "./Redux/store";
import SelectField from "./SelectFiled";
import callApi from "./api";

interface FormValues {
    tags: [];
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    notes: string;
    designation ?: string;
    state ?: string;
    address ?: string;
    title ?: string;
    zipcode ?: string;
    description ?: string;
    sourceId ?: string;
    companyName ?: string;
    companiesId ?: string;
    tagId: string[];
}

interface State {
  id: number;
  stateName: string;
}

interface Error{
    message: string;
}

interface Tag {
  id: string;
  tagName: string;
  colorName: string;
  masterId: number;
}

export interface TagCategory {
  id: string;
  categoryName: string;
  master: {
    id: number;
    moduleName: string;
  };
  tags: Tag[];
  createdData: {
    id: string;
    firstName: string;
    lastName: string;
  };
  modifiedData: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
}

export interface Tag2{
    id: string;
}

export interface CustomCategory {
    label: string;
    inputType: string;
    name: string;
}

interface CompanyName{
    id: string;
    companyName:string
}

interface ContactSources{
    id: string;
    sources:string
}

export interface Module{
    moduleName: string;
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    designation: Yup.string(),
    notes: Yup.string(),
});

const ContactForm: React.FC<{
    onClose: () => void;
    formValues: FormValues;
    formMode: string | null;
    setShowContactForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ onClose, formValues, formMode, setShowContactForm }) => {
    const [formData, setFormData] = useState < FormValues > (formValues);
    const [states, setStates] = useState < State[] > ([]);  
    const [tagCategories, setTagCategories] = useState<TagCategory[]>([]);  
    const [customCategories, setCustomCategories] = useState < CustomCategory[] > ([]);  
    const [companyNames, setCompanyNames] = useState < CompanyName[] > ([]);  
    const [contactSources, setContactSources] = useState < ContactSources[] > ([]); 
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
    const dispatch = useAppDispatch();
    // const statesData = useSelector((state: any) => state.contacts);  
    const formikRef = useRef<FormikProps<FormValues>>(null);

    useEffect(() => {
        if (formikRef.current) {
            const setFieldValue = formikRef.current.setFieldValue;
            setFieldValue('tagId', selectedTags);
        }
    }, [selectedTags]);

    useEffect(() => {
        if (formMode === 'edit') {
            const existingTags = formValues?.tags?.map((tag : Tag2) => tag?.id);
            console.log(existingTags);
            setSelectedTags(existingTags);
        }
    }, [formMode, formValues]);

    useEffect(() => {
        setFormData(formValues);
    }, [formValues]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statesData:State[] = await getStates();
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
                const moduleResponse = await callApi(METHOD.GET, "crm/module", {
                    moduleName: "contacts",
                });

                const contactItem = moduleResponse?.data?.find(
                    // (item: any) => item.moduleName === "contacts"
                    (item: Module) => item.moduleName === "contacts"
                  
                );
                const contactId = contactItem ? contactItem.id : null;
                const tagCategoryResponse = await callApi(
                    METHOD.GET,
                    `crm/tag-category/?masterId=${contactId}`
                );
                const tagCategories = tagCategoryResponse?.data;
                setTagCategories(tagCategories);
                const customCategories = await callApi(
                    METHOD.GET,
                    `crm/custom-fields?masterId=${contactId}`
                );
                setCustomCategories(customCategories?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        tagData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const companyResponse = await callApi(METHOD.GET, "crm/company");
                const contactSourceResponse = await callApi(METHOD.GET, "crm/source");
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
            const response = await callApi(METHOD.GET, "crm/state");
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (
        values: FormValues,
        { resetForm }: FormikHelpers<FormValues>
    ) => {
        console.log(values);
        const tagIds = values.tagId;
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
                title: values.title || "",
                notes: values.notes || "",
                address: values.address || "",
                zipcode: values.zipcode || "",
                companiesId: values.companiesId || "",
                companyName: values.companyName || "",
                sourceId: values.sourceId || "",
                tagId: values.tagId,
                id: values.id || "",
                designation: values.designation || "",
                description: values.description || " ",
                tags: values.tags || []
            };
            console.log(formValues);

            const contactId = formValues.id;

            if (formMode === "edit") {
                const actionResult = await dispatch(
                    editContact({ contactId, updatedData })
                );
                response = actionResult?.meta?.requestStatus;
                if (response === "fulfilled") {
                    dispatch(fetchContacts());
                }
            } else {
                    const newContactPayload: AddNewContactPayload = {
                        newContactData: values,
                };

            const actionResult = await dispatch(addNewContact(newContactPayload));
            response = actionResult?.payload;
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
        } catch (error : Error | any) {
            console.error("Error submitting form:", error);
            toast.error(`${error?.message}`, {
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
                    innerRef={formikRef}
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form className="grid grid-cols-1 mt-3 font-semibold text-[#6B7280] text-sm md:grid-cols-2 gap-4">
                            <InputField type="text" name="firstName" placeholder="First Name" label="First Name *" />
                            <InputField type="text" name="lastName" placeholder="Last Name" label="Last Name *" />
                            <InputField type="email" name="email" placeholder="Email" label="Email *" />
                            <InputField type="tel" name="contactNumber" placeholder="Contact Number" label="Contact Number *" />
                            <InputField type="text" name="designation" placeholder="Designation" label="Designation" />
                            <InputField type="textarea" name="notes" placeholder="Notes" label="Notes" />
                            <InputField type="text" name="address" placeholder="Address" label="Address" />
                            
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

                            <InputField type="text" name="zipcode" placeholder="Zip Code" label="Zip Code" />

                            <h1 className="col-span-2 text-black text-xl mt-3">
                                Contact Other Details
                            </h1>

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
                                        id="companiesId"
                                        name="companiesId"
                                        placeholder="Company Name"
                                        className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
                                    >
                                        {companyNames.map((company) => (
                                            <option key={company.id} value={company.id}>
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

                            {tagCategories.map((tagCategory) => (
                                <div className="col-span-1" key={tagCategory.categoryName}>
                                    <div className={`form-item vertical`}>
                                        <label
                                            className="form-label capitalize flex mb-2"
                                            htmlFor={`${tagCategory.categoryName}`}
                                        >
                                            {tagCategory.categoryName}
                                        </label>
                                    <SelectField
                                         name={tagCategory.categoryName}
                                         options={tagCategory.tags.map((tag) => ({
                                             value: tag.id,
                                             label: tag.tagName,
                                         }))}
                                         className="react-select-container"
                                         classNamePrefix="react-select"
                                         isMulti
                                         value={selectedTags?.filter((tagId) => tagCategory?.tags?.some((tag) => tag?.id === tagId))
                                             .map((tagId) => ({
                                                 value: tagId,
                                                 label: tagCategory.tags.find((tag) => tag?.id === tagId)?.tagName,
                                             }))}
                                        
                                         onChange={(selectedOptions: { value: string }[], { action, removedValue }: { action: string, removedValue: { value: string } }) => {
                                                  const tagIds = selectedOptions?.map((option) => option?.value);
                                             console.log(tagIds);
                                                  if (action === 'remove-value' && removedValue) {
                                                      const removedTagId = removedValue?.value;
                                                      setSelectedTags((prevSelectedTags) => (
                                                          prevSelectedTags?.filter((tagId) => tagId !== removedTagId)
                                                      ));
                                                  } else {
                                                      const selectedTagIds = selectedTags?.map(tag => tag); //Extract tag IDs
                                                       const updatedTags = [...selectedTagIds, ...tagIds];
                                                      const uniqueTags = Array.from(new Set(updatedTags.map(tagId => ( tagId ))));
                                                      console.log(uniqueTags);
                                                          setSelectedTags(uniqueTags);
                                                      }
                                              }}
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
                                            id=""
                                            name={`${custom.name}`}
                                            placeholder={`${custom.label}`}
                                            className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 `}
                                        ></Field>
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
