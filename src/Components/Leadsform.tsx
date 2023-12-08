// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import { useDispatch } from 'react-redux';
// import { toast } from "react-toastify";
// import * as Yup from 'yup';
// import { addNewLeads, editLead, fetchLeads } from './Redux/leadSlice';
// import { fetchTasks } from './Redux/tasksSlice';

// const validationSchema = Yup.object().shape({
//     // contactName: Yup.string().required('Contact Name is required'),
//     title: Yup.string().required('Title is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     contactNumber: Yup.string().required('Contact Number is required'),
//     budget: Yup.number().required('Budget is required').positive('Budget must be positive'),
//     // notes: Yup.string()
//     // leadsNewCategory: Yup.string()
//     // leadCate2: Yup.string()
//     // leadsCategory: Yup.string()
//     // bhargav: Yup.string()
//     // skills: Yup.string().required('Skills is required')
// });

// const Leadsform = ({ onClose, formMode, setShowLeadForm, formValues }) => {

//     const dispatch = useDispatch();
//     const initialValues = {
//         id: '',
//         contactName: '',
//         title: '',
//         email: '',
//         contactNumber: '',
//         budget: '',
//         notes: '',
//         leadsNewCategory: '',
//         leadCate2: '',
//         leadsCategory: '',
//         bhargav: '',
//         skills: '',
//     };

//     const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//         try {
//             let response;
//             const updatedData = {
//                 ...values,
//             };
//             // console.log(formValues.id)
//             // console.log(updatedData);
//             const leadId = formValues.id;

//             if (formMode === "edit") {
//                 const actionResult = await dispatch(editLead({ leadId, updatedData }));
//                 response = actionResult?.meta?.requestStatus;

//                 if (response.success === "fulfilled") {
//                     dispatch(fetchTasks());
//                 }
//             } else {
//                 const actionResult = await dispatch(addNewLeads(values));
//                 response = actionResult.payload;
//             }

//             const successMessage =
//                 formMode === "edit"
//                     ? "lead Edited successfully!"
//                     : "lead added successfully!";

//             toast.success(successMessage, {
//                 position: toast.POSITION.TOP_RIGHT,
//             });
//             resetForm();
//             setShowLeadForm(false);
//             dispatch(fetchLeads());
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             toast.error(`${error?.response?.data?.message}`, {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 2000,
//             });
//         }
//     };

//     return (
//         <div className=''>
//             <div className="font-semibold  border-b text-indigo-600">
//                 <div className="pb-3">
//                     <span className="border-b-2 pb-3  border-indigo-600">
//                         Leads Details
//                     </span>
//                 </div>
//             </div>
//             <div className='mt-5'>
//                 {/* <Formik initialValues={formValues} onSubmit={handleSubmit} validationSchema={validationSchema}> */}
//                 <Formik initialValues={formMode === "edit" ? formValues : initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
//                     {({ isSubmitting, touched, errors }) => (
//                         <Form>
//                             <div className="grid bg-white grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 <div className="col-span-1">
//                                     <label className="form-label mb-2">Contact Name</label>
//                                     <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.contactName && errors.contactName
//                                         ? "border-red-500 border-2"
//                                         : ""
//                                         }`} type="text" name="contactName" />
//                                     <ErrorMessage name="contactName" component="div" className="text-red-600 text-sm mt-1" />
//                                 </div>

//                                 <div className="col-span-1">
//                                     <label className="form-label mb-2">Title *</label>
//                                     <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.title && errors.contactName
//                                         ? "border-red-500 border-2"
//                                         : ""
//                                         }`} type="text" name="title" />
//                                     <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 <div className="col-span-1">
//                                     <label className="form-label mb-2">Email *</label>
//                                     <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.email && errors.contactName
//                                         ? "border-red-500 border-2"
//                                         : ""
//                                         }`} type="text" name="email" />
//                                     <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
//                                 </div>

//                                 <div className="col-span-1">
//                                     <label className="form-label mb-2">Contact Number *</label>
//                                     <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.contactNumber && errors.contactName
//                                         ? "border-red-500 border-2"
//                                         : ""
//                                         }`} type="text" name="contactNumber" />
//                                     <ErrorMessage name="contactNumber" component="div" className="text-red-600 text-sm mt-1" />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 <div className="col-span-1">
//                                     <label className="form-label mb-2">Budget</label>
//                                     <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.budget && errors.contactName
//                                         ? "border-red-500 border-2"
//                                         : ""
//                                         }`} type="number" name="budget" />
//                                     <ErrorMessage name="budget" component="div" className="text-red-600 text-sm mt-1" />
//                                 </div>

//                                 <div className="col-span-1">
//                                     <label className="form-label mb-2">Notes</label>
//                                     <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.notes && errors.contactName
//                                         ? "border-red-500 border-2"
//                                         : ""
//                                         }`} as="textarea" name="notes" />
//                                     <ErrorMessage name="notes" component="div" className="text-red-600 text-sm mt-1" />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 <div className="col-span-1">
//                                     <label className="form-label mb-2">Leads New Category</label>
//                                     {/* Add the Field and ErrorMessage components for Leads New Category */}
//                                 </div>

//                                 <div className="col-span-1">
//                                     <label className="form-label mb-2">Lead Cate 2</label>
//                                     {/* Add the Field and ErrorMessage components for Lead Cate 2 */}
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 <div className="col-span-1">
//                                     <label className="form-label mb-2">Leads Category</label>
//                                     {/* Add the Field and ErrorMessage components for Leads Category */}
//                                 </div>

//                                 <div className="col-span-1">
//                                     <label className="form-label mb-2">Bhargav</label>
//                                     {/* Add the Field and ErrorMessage components for Bhargav */}
//                                 </div>
//                             </div>

//                             <div className="mb-2">
//                                 <h5>Additional Details</h5>
//                                 <p></p>
//                             </div>

//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//                                 <div>
//                                     <label className="form-label mb-2">Bhargav</label>
//                                     {/* Add the Field and ErrorMessage components for Bhargav */}
//                                 </div>

//                                 <div>
//                                     <label className="form-label mb-2">Skills</label>
//                                     {/* Add the Field and ErrorMessage components for Skills */}
//                                 </div>
//                             </div>

//                             <div className="mb-2">
//                                 <h5>Additional Details</h5>
//                                 <p></p>
//                             </div>

//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//                                 <div>
//                                     <label className="form-label mb-2">Bhargav</label>
//                                     <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.bhargav && errors.contactName
//                                         ? "border-red-500 border-2"
//                                         : ""
//                                         }`} type="text" name="bhargav" />
//                                     <ErrorMessage name="bhargav" component="div" className="text-red-600 text-sm mt-1" />
//                                 </div>

//                                 <div>
//                                     <label className="form-label mb-2">Skills</label>
//                                     <Field className={`w-full font-light text-sm border font-light text-sm rounded px-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.skills && errors.contactName
//                                         ? "border-red-500 border-2"
//                                         : ""
//                                         }`} type="text" name="skills" />
//                                     <ErrorMessage name="skills" component="div" className="text-red-600 text-sm mt-1" />
//                                 </div>
//                             </div>

//                             <div className="drawer-footer mt-3">
//                                 <div className="text-right  w-full">
//                                     <button
//                                         type="button"
//                                         className="button rounded-lg  bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 text-sm mr-2"
//                                         disabled={isSubmitting}
//                                         onClick={onClose}
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="button bg-indigo-600  rounded-lg hover:bg-indigo-500 active:bg-indigo-700 text-white radius-round h-9 px-3 py-2 text-sm"
//                                         disabled={isSubmitting}
//                                     >
//                                         Save
//                                     </button>
//                                 </div>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>

//     );
// };

// export default Leadsform;


import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import InputField from "./InputField";
import { Lead, addNewLeads, editLead, fetchLeads } from './Redux/leadSlice';
import { useAppDispatch } from './Redux/store';
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

interface LeadsFormProps {
    onClose: () => void;
    formMode: 'edit' | null;
    setShowLeadForm: (show: boolean) => void;
    formValues: Lead; // Assuming you have a type for your lead data
}

const Leadsform: React.FC<LeadsFormProps> = ({ onClose, formMode, setShowLeadForm, formValues }) => {
    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();

    const initialValues: Lead = {
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
        leadsActivity: [],
        reason: "",
        tags: [],
        leadStatus: {
            statusName: "",
            colorCode: ""
        },
        contactData: {
             firstName: "",
              lastName: ""
        }
    };

    const handleSubmit = async (values: Lead, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }) => {
        try {
            let response;
            const updatedData = {
                ...values,
            };
            const leadId = formValues.id;

            if (formMode === "edit") {
                const actionResult = await dispatch(editLead({ leadId, updatedData }));
                response = actionResult?.meta?.requestStatus;

                if (response === "fulfilled") {
                    dispatch(fetchTasks());
                }
            } else {
                // const actionResult = await dispatch(addNewLeads(values));
                const actionResult = await dispatch(addNewLeads({ newLeadData: values }));
                response = actionResult.payload;
            }

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
            toast.error(`${error}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    return (
        <div className=''>
            <div className=''>
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
                        <Form className="font-semibold text-[#6B7280] text-sm">
                            <div className="grid bg-white grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <InputField type="text" name="contactName" placeholder="Contact Name" label="Contact Name" />
                                <InputField type="text" name="title" placeholder="Title" label="Title *" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">   
                                <InputField type="email" name="email" placeholder="Contact Name" label="Email *" />
                                <InputField type="contactNumber" name="contactNumber" placeholder="Contact Number" label="Contact Number *" />   
                            </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"> 
                                <InputField type="number" name="budget" placeholder="Budget" label="Budget *" />
                                <InputField type="textarea" name="notes" placeholder="Notes" label="Notes" />
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
                                <h5 className="text-black text-xl">Additional Details</h5>
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

                            <div className="drawer-footer mt-3">
                                <div className="text-right  w-full">
                                    <button
                                        type="button"
                                        className="button rounded-lg  bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 text-sm mr-2"
                                        disabled={isSubmitting}
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="button bg-indigo-600  rounded-lg hover:bg-indigo-500 active:bg-indigo-700 text-white radius-round h-9 px-3 py-2 text-sm"
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
        </div>
    );
};

export default Leadsform;
