import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteContact, fetchContacts } from "./Redux/contactSlice";
import callApi from "./api";

const ContactData = ({
  contact,
  handleEdit,
  onContactSelect,
  isSelected,
  setIsSelected,
  tagsCategories,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  //   const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  // console.log(companyData)

  const handleDelete = async () => {
    try {
      await dispatch(deleteContact(contact.id));
      dispatch(fetchContacts());
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Error deleting contact");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyResponse = await callApi("GET", "crm/company");

        const companyNames = companyResponse?.data;

        setCompanyData(companyNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
    onContactSelect(contact.id, !isSelected);
  };

  // console.log(tagCategories);
  // console.log(contact);

  return (
    <tr className="text-[#6B7280] border-b">
      <td className="truncate p-3">
        <div className="">
          <label class="checkbox-label mb-0">
            <input
              className="checkbox text-indigo-600"
              type="checkbox"
              value=""
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
      </td>
      <td className={`truncate p-3`}>
        <div className="flex text-base items-center">
          <button
            onClick={() => handleEdit(contact?.id)}
            className="cursor-pointer circle items-center hover:text-indigo-500"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </button>
          <span
            className="cursor-pointer hover:text-red-500 circle mx-1 items-center"
            onClick={handleDelete}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </span>
          {/* Modal for confirmation */}
          {isModalOpen &&
          {
            /*  modal  */
          }}
          <Link
            to={`/contactdetails/${contact.id}`}
            className="text-decoration-none"
          >
            <span className="cursor-pointer hover:text-green-500 circle items-center text-lg">
              <span className="cursor-pointer  hover:text-green-500 circle items-center text-lg">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </td>
      <td className="truncate p-3">{`${contact?.firstName} ${contact?.lastName}`}</td>
      <td className="truncate p-3">{contact.email || "-"}</td>
      <td className="truncate p-3">{contact?.contactNumber ?? "-"}</td>
      <td className="truncate p-3">{contact?.source?.sources ?? "-"}</td>
      <td className="truncate p-3">{contact?.title ?? "-"}</td>
      {/* {tagsCategories.map((tags) => (
        <td className="truncate p-3">{ }</td>
      ))} */}
      {/* {tagsCategories.map((category) => (
        <td key={category.id} className="truncate p-3">
          {contact.tags
            .filter((tag) => tag.tagCategoryId === category.id)
            .map((tag) => (
              <span
                key={tag.id}
                style={{
                  backgroundColor: `${tag.colorName}1A`, // '1A' corresponds to 10% opacity
                }}
                className={` mr-2 px-2 py-1 rounded-lg`}
              >
                <span style={{ color: tag.colorName }}>{tag.tagName}</span>
              </span>
            ))}
          {contact.tags.filter((tag) => tag.tagCategoryId === category.id)
            .length === 0 && "-"}
        </td>
      ))} */}
      {tagsCategories.map((category) => {
        const categoryTags = contact.tags.filter((tag) => tag.tagCategoryId === category.id);
        const hasTags = categoryTags.length > 0;

        return (
          <td key={category.id} className="truncate p-3">
            {hasTags ? (
              categoryTags.map((tag) => (
                <span
                  key={tag.id}
                  style={{
                    backgroundColor: `${tag.colorName}1A`, // '1A' corresponds to 10% opacity
                  }}
                  className="mr-2 px-2 py-1 rounded-lg"
                >
                  <span style={{ color: tag.colorName }}>{tag.tagName}</span>
                </span>
              ))
            ) : (
              "-"
            )}
          </td>
        );
      })}

      {/* <td className="truncate p-3">Add logic for Haward Education</td> */}
      {/* <td className="truncate p-3">Add logic for Relation</td> */}
      {/* <td className="truncate p-3">Add logic for Region</td> */}
      {/* <td className="truncate p-3">{contact?.company?.companyName ?? "-"}</td> */}
      <td className="truncate p-3">
        {companyData?.map((company) => {
          // console.log(contact);
          if (company.id === contact?.companiesId) {
            // console.log(company?.id);
            // console.log(contact?.company?.companiesId);
            // console.log(company?.companyName);
            return company.companyName;
          }
          return null;
        }) ?? "-"}
      </td>
      <td className="truncate p-3">
        {(contact?.address || "-") + " " + (contact?.zipcode || "") || "-"}
      </td>
    </tr>
  );
};

export default ContactData;
