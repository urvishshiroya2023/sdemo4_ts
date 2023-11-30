import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HomePageHeader from './HomePageHeader';
import { fetchLeadById, selectLeads } from './Redux/leadSlice';

const LeadsInfo = () => {
    const { id } = useParams();
    // const [leadData, setLeadData] = useState(null);
    const dispatch = useDispatch();
    // const { loading, data: leadData } = useSelector(selectLeads);
    // const { selectedLead, loading } = useSelector(selectLeads);
    const selectedLead = useSelector(selectLeads).selectLeads;
    // console.log(selectedLead);

    // useEffect(() => {
    //     const fetchLeadData = async () => {
    //         try {
    //             const data = await callApi('GET', `/crm/leads/${id}`);
    //             setLeadData(data?.data);
    //             // console.log(data);
    //         } catch (error) {
    //             console.error('Error fetching lead data:', error);
    //             // Handle error as needed
    //         }
    //     };

    //     fetchLeadData();
    // }, [id]);

    useEffect(() => {
        // Dispatch the fetchLeadById action when the component mounts
        dispatch(fetchLeadById(id));
    }, [dispatch, id]);

    return (
        <div>
            <div>
                <HomePageHeader />
            </div>
            <>
                {selectedLead ? (
                    <>
                        {/* Render lead data here */}
                        <div>
                            <h2>Lead Data</h2>
                            <p>{selectedLead.title}</p>
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </>
        </div>
    );
};

export default LeadsInfo;
