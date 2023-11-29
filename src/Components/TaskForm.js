import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { fetchTasks } from "./Redux/tasksSlice";

const validationSchema = Yup.object().shape({
  // module: Yup.string().required('Module is required'),
  // type: Yup.string().required('Type is required'),
  title: Yup.string().required("Title is required"),
  dueDate: Yup.string().required("Due Date is required"),
  priority: Yup.string().required("Priority is required"),
  // descriptions: Yup.string().required('Notes are required'),
  // assignedTo: Yup.string().required('Assigned To is required'),
  // connectedLead: Yup.string().required('Connected Lead is required'),
});

const TaskForm = ({ onClose, formValues, formMode, setShowTaskForm }) => {
  const [formData, setFormData] = useState(formValues);
  const dispatch = useDispatch();
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    const day = `${date.getDate().toString().padStart(2, "0")}`;
    const hours = `${date.getHours().toString().padStart(2, "0")}`;
    const minutes = `${date.getMinutes().toString().padStart(2, "0")}`;

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

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

      if (formMode === "edit") {
        // Update existing task
        response = await axios.put(
          `https://crmapi.sarvadhi.work/api/v1/crm/tasks/${formValues.Id}`,
          values,
          { headers }
        );
      } else {
        // Add new task
        response = await axios.post(
          "https://crmapi.sarvadhi.work/api/v1/crm/tasks",
          values,
          { headers }
        );
      }

      console.log(response.data);

      const successMessage =
        formMode === "edit"
          ? "Task Edited successfully!"
          : "Task added successfully!";

      toast.success(successMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });

      navigate("/taskdetail");
      setShowTaskForm(false);
      resetForm();
      dispatch(fetchTasks())
    } catch (error) {
      console.error("Error submitting form:", error);
      // toast.error("Task operation failed", {
      //   position: toast.POSITION.TOP_CENTER,
      //   autoClose: 2000,
      // });
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-white overflow-y-auto h-[100vh]">
      <div className="container  p-4">
        <div className="font-semibold  border-b text-indigo-600">
          <div className="pb-3">
            <span className="border-b-2 pb-3  border-indigo-600">
              Tasks Details
            </span>
          </div>
        </div>

        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="grid grid-cols-1 mt-3 font-semibold text-[#6B7280] test-sm md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <div className={`form-item vertical `}>
                  <label className="form-label flex mb-2" htmlFor="module">
                    Module
                  </label>
                  <Field
                    as="select"
                    id="module"
                    name="module"
                    className={`w-full font-light text-sm border font-light text-sm rounded input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.module && errors.module
                      ? "border-red-500 border-2"
                      : ""
                      }`}
                  >
                    <option value="" label="Module" />
                    <option value="lead" label="Lead" />
                    <option value="contact" label="Contact" />
                    <option value="deal" label="Deal" />
                  </Field>
                  <ErrorMessage
                    name="module"
                    component="div"
                    className="text-red-500"
                  />
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
                    className={`border w-full font-light text-sm rounded px-2 py-1 h-11 focus:ring-indigo-600 focus:border-indigo-600 ${touched.type && errors.type
                      ? "border-red-500 border-2"
                      : ""
                      }`}
                  >
                    <option value="" label="Type" />
                    {values.module === "lead" && (
                      <>
                        <option value="followup" label="Follow Up" />
                        <option value="quotation" label="Quotation" />
                        <option value="meeting" label="Meeting" />
                        <option value="other" label="Other" />
                      </>
                    )}
                    {values.module === "contact" && (
                      <>
                        <option value="meeting" label="Meeting" />
                        <option value="other" label="Other" />
                      </>
                    )}
                    {values.module === "deal" && (
                      <>
                        <option value="feedback" label="Feedback" />
                        <option value="delivery" label="Delivery" />
                        <option
                          value="payment clearance"
                          label="Payment Clearance"
                        />
                      </>
                    )}
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500"
                  />
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
                    className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.title && errors.title
                      ? "border-red-500 border-2"
                      : ""
                      }`}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              {/* <div className="col-span-1">
                <div className={`form-item vertical `}>
                  <label className="flex form-label mb-2" htmlFor="dueDate">
                    Due Date *
                  </label>
                  <Field
                    as="input"
                    type="datetime-local"
                    id="dueDate"
                    name="dueDate"
                    className={`input border rounded w-full h-11 input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${
                      touched.dueDate && errors.dueDate
                        ? "border-red-500 border-2"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="dueDate"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div> */}

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
                    value={formattedDate(values.dueDate)} // Format the dueDate
                    onChange={(e) => setFieldValue("dueDate", e.target.value)}
                    className={`input border font-light text-sm rounded w-full h-11 input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 ${touched.dueDate && errors.dueDate
                      ? "border-red-500 border-2"
                      : ""
                      }`}
                  />
                  <ErrorMessage
                    name="dueDate"
                    component="div"
                    className="text-red-500"
                  />
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
                    className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.priority && errors.priority
                      ? "border-red-500 border-2"
                      : ""
                      }`}
                  >
                    <option value="none" label="None" />
                    <option value="high" label="High" />
                    <option value="medium" label="Medium" />
                    <option value="low" label="Low" />
                  </Field>
                  <ErrorMessage
                    name="priority"
                    component="div"
                    className="text-red-500"
                  />
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
                    className={`w-full h-11 border font-light text-sm rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.assignedTo && errors.assignedTo
                      ? "border-red-500 border-2"
                      : ""
                      }`}
                  >
                    <option value="" label="Select..." />
                    <option value="high" label="High" />
                    <option value="medium" label="Medium" />
                    <option value="low" label="Low" />
                  </Field>
                  <ErrorMessage
                    name="assignedTo"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className={`form-item vertical`}>
                  <label
                    className="form-label flex mb-2"
                    htmlFor="connectedLead"
                  >
                    Connected Lead
                  </label>
                  <Field
                    as="select"
                    id="connectedLead"
                    name="connectedLead"
                    className={`w-full h-11 border font-light text-sm rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.connectedLead && errors.connectedLead
                      ? "border-red-500 border-2"
                      : ""
                      }`}
                  >
                    <option value="" label="Select..." />
                    <option value="high" label="High" />
                    <option value="medium" label="Medium" />
                    <option value="low" label="Low" />
                  </Field>
                  <ErrorMessage
                    name="connectedLead"
                    component="div"
                    className="text-red-500"
                  />
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
                  className={`border font-light text-sm w-full h-32 rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.descriptions && errors.descriptions
                    ? "border-red-500 border-2"
                    : ""
                    }`}
                />
                <ErrorMessage
                  name="descriptions"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="col-span-1">
                <div className={`form-item vertical`}>
                  <label className="form-label flex mb-2" htmlFor="reactjsTags">
                    ReactJS Tags
                  </label>
                  <Field
                    as="select"
                    id="reactjsTags"
                    name="reactjsTags"
                    className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.reactjsTags && errors.reactjsTags
                      ? "border-red-500 border-2"
                      : ""
                      }`}
                  >
                    <option value="" label="Select reactjs tags" />
                    <option value="developing" label="Developing" />
                    <option value="tag2" label="Tag 2" />
                    {/* Add more options as needed */}
                  </Field>
                  <ErrorMessage
                    name="reactjsTags"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className={`form-item vertical`}>
                  <label className="form-label flex mb-2" htmlFor="nodejsTags">
                    NodeJS Tags
                  </label>
                  <Field
                    as="select"
                    id="nodejsTags"
                    name="nodejsTags"
                    className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.nodejsTags && errors.nodejsTags
                      ? "border-red-500 border-2"
                      : ""
                      }`}
                  >
                    <option value="" label="Select Nodejs tags" />
                    <option value="tagA" label="Tag A" />
                    <option value="tagB" label="Tag B" />
                    {/* Add more options as needed */}
                  </Field>
                  <ErrorMessage
                    name="nodejsTags"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className={`form-item vertical`}>
                  <label className="form-label flex mb-2" htmlFor="size">
                    Size
                  </label>
                  <Field
                    as="input"
                    type="number"
                    id="size"
                    name="size"
                    placeholder="Size"
                    className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.size && errors.size
                      ? "border-red-500 border-2"
                      : ""
                      }`}
                  />
                  <ErrorMessage
                    name="size"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className={`form-item vertical`}>
                  <label className="form-label flex mb-2" htmlFor="dob">
                    Date of Birth
                  </label>
                  <Field
                    as="input"
                    type="datetime-local"
                    id="dob"
                    name="dob"
                    className={`w-full font-light text-sm h-11 border rounded px-2 py-1 focus:ring-indigo-600 focus:border-indigo-600 ${touched.dob && errors.dob ? "border-red-500 border-2" : ""
                      }`}
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="col-span-2 mt-10 relative ">
                <div className="flex gap-x-4 absolute bottom-0 right-0">
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
