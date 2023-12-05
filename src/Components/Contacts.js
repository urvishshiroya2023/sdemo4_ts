import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ContactData from "./ContactData";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import HomePageHeader from "./HomePageHeader";
import Loader from "./Loader";
import {
  deleteContact,
  fetchContactById,
  fetchContacts,
  selectContacts,
} from "./Redux/contactSlice";
import callApi from "./api";

const pageSize = 10;

const initialValues = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  notes: "",
  designation: "",
  address: "",
  title: "",
  zipcode: "",
  description: "",
  sourceId: "",
  companyName: "",
  tagId: [],
  companiesId: ""
};

const Contacts = () => {
  const { data: allContacts, loading, error } = useSelector(selectContacts);
  // console.log(error);
  const [state, setState] = useState({
    currentPage: 1,
    searchTerm: "",
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formMode, setFormMode] = useState(null);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [tagsCategories, setTagsCategories] = useState([]);


  const dispatch = useDispatch();

  const handleSearchChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      searchTerm: event.target.value.toLowerCase(),
    }));
  }, []);

  const handleCloseForm = (event) => {
    if (event.target.classList.contains("overlay")) {
      setFormMode(null);
      setShowContactForm(false);
      setFormValues(initialValues);
    }
  };
  const onClose = () => {
    setShowContactForm(false);
    setFormMode(null);
    setFormValues(initialValues);
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedContactIds.map((id) => dispatch(deleteContact(id)))
      );
      dispatch(fetchContacts());
      toast.success("Contacts deleted successfully");
      setSelectedContactIds([]); // Clear selected contacts after deletion
    } catch (error) {
      console.error("Error deleting contacts:", error);
      toast.error("Error deleting contacts");
    }
  };

  const handleContactSelect = (contactId, isSelected) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (isSelected) {
        return [...prevSelectedContactIds, contactId];
      } else {
        return prevSelectedContactIds.filter((id) => id !== contactId);
      }
    });
  };

  const handleSelectAll = (event) => {
    const allContactIds = allContacts.map((contact) => contact.id);

    if (event.target.checked) {
      setSelectedContactIds(allContactIds);
    } else {
      setSelectedContactIds([]);
    }
  };

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
        setTagsCategories(tagCategories);
        // console.log(tagCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    tagData();
  }, []);

  // console.log(tagsCategories);

  const handleEdit = useCallback(
    async (contactId) => {
      try {
        await dispatch(fetchContactById(contactId));
        setShowContactForm(true);
        setFormMode("edit");
        const b = allContacts.find((contact) => contact.id === contactId);
        console.log(b);
        setFormValues(b);
        console.log();
      } catch (error) {
        console.error("Error fetching contact details for editing:", error);
      }
    },
    [dispatch, allContacts]
  );

  const filteredContacts = useMemo(() => {
    return allContacts?.filter(
      (contact) =>
        (contact.firstName + " " + contact.lastName)
          .toLowerCase()
          .includes(state.searchTerm) ||
        contact.email.toLowerCase().includes(state.searchTerm)
    );
  }, [allContacts, state.searchTerm]);

  const totalContacts = filteredContacts?.length || 0;
  const totalPages = Math.ceil(totalContacts / pageSize);

  const calculateButtonRange = useCallback(() => {
    const maxVisibleButtons = 7;
    const leftOffset = Math.max(
      0,
      state.currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const rightOffset = Math.min(
      totalPages - maxVisibleButtons,
      leftOffset > 0 ? state.currentPage - leftOffset : 0
    );
    const startPage = 1 + leftOffset;
    const endPage = Math.min(totalPages, maxVisibleButtons + startPage);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => i + startPage
    );
  }, [state.currentPage, totalPages]);

  const buttonRange = useMemo(
    () => calculateButtonRange(),
    [calculateButtonRange]
  );

  const changePage = useCallback(
    (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setState((prevState) => ({ ...prevState, currentPage: newPage }));
      }
    },
    [totalPages]
  );

  return (
    <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
      <div>
        <HomePageHeader />
      </div>
      <div>
        <div className="flex py-5 h-full justify-center">
          <div className="container border bg-white rounded-lg p-5">
            <h1 className="font-semibold text-lg">
              Contacts ({allContacts?.length})
            </h1>
            <div className="mt-3">
              <div className="flex justify-between">
                <div className="flex items-center border border-gray-300 focus-within:border-indigo-600 focus-within:border-2 px-3 rounded-lg">
                  <div className="w-6 contents h-6">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="text-lg"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    className="ms-2 h-9 w-48 focus:outline-none"
                    type="text"
                    placeholder="Search by name or email"
                    value={state.searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="">
                  {selectedContactIds.length > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="border mr-2 bg-red-500 py-2 text-white text-sm font-semibold px-3 rounded mt-2"
                    >
                      Bulk Delete
                    </button>
                  )}
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="border py-2 text-[#6B7280] text-sm font-semibold px-3 rounded mt-2"
                  >
                    Add New
                  </button>
                </div>
              </div>
            </div>
            {loading && <Loader />}
            {error && <p>Error: {error}</p>}
            <div className="overflow-x-scroll">
              {filteredContacts && filteredContacts.length > 0 ? (
                <table className="table-auto  w-full mt-5 text-sm border-collapse">
                  <thead>
                    <tr className="text-[#6B7280] text-left uppercase border-b">
                      <th className="truncate p-3">
                        <div className="">
                          <label class="checkbox-label mb-0">
                            <input
                              className="checkbox text-indigo-600"
                              type="checkbox"
                              value=""
                              onChange={handleSelectAll}
                            />
                          </label>
                        </div>
                      </th>
                      <th className="truncate p-3">Actions</th>
                      <th className="truncate p-3">Name</th>
                      <th className="truncate p-3">Email</th>
                      <th className="truncate p-3 ">Number</th>
                      <th className="truncate p-3">Source</th>
                      <th className="truncate p-3">Designation</th>
                      <th className="truncate p-3">Group1</th>
                      <th className="truncate p-3">Haward Education</th>
                      <th className="truncate p-3">Relation</th>
                      <th className="truncate p-3">Region</th>
                      <th className="truncate p-3">Company</th>
                      <th className="truncate p-3">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {filteredContacts
                        .slice(
                          (state.currentPage - 1) * pageSize,
                          state.currentPage * pageSize
                        )
                        .map((contact) => (
                          <ContactData
                            onContactSelect={handleContactSelect}
                            handleEdit={handleEdit}
                            isSelected={selectedContactIds.includes(contact.id)}
                            setIsSelected={setIsSelected}
                            tagsCategories={tagsCategories}
                            key={contact.id}
                            contact={contact}
                          />
                        ))}
                    </>
                  </tbody>
                </table>
              ) : (
                <div>No Contacts Found</div>
              )}
            </div>
            <div className="pagination mt-5 text-[#6B7280]">
              <button
                className="mx-2"
                onClick={() => changePage(state.currentPage - 1)}
                disabled={state.currentPage === 1}
              >
                &lsaquo;
              </button>
              {buttonRange.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => changePage(pageNumber)}
                  className={`${pageNumber === state.currentPage
                    ? "active text-indigo-600 bg-indigo-50 py-1 px-3 rounded"
                    : ""
                    } mx-3`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                className="mx-2"
                onClick={() => changePage(state.currentPage + 1)}
                disabled={state.currentPage === totalPages}
              >
                &rsaquo;
              </button>
            </div>
          </div>
          {showContactForm && (
            <div
              onClick={handleCloseForm}
              className="fixed top-0 right-0 w-full  h-full bg-black bg-opacity-80 overlay"
            >
              <div className="w-1/2  fixed bg-white h-full p-5  top-0 right-0">
                <ContactForm
                  formValues={formValues}
                  formMode={formMode}
                  // tagCategories={tagCategories}
                  // setTagCategories={setTagCategories}
                  setShowContactForm={setShowContactForm}
                  onClose={onClose}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" ">
        <Footer />
      </div>
    </div>
  );
};

export default Contacts;
