import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HomePageHeader from './HomePageHeader';
import callApi from './api'; // Assuming this is the path to your API utility module

const LeadsInfo = () => {
    const { id } = useParams();
    const [leadData, setLeadData] = useState(null);

    useEffect(() => {
        const fetchLeadData = async () => {
            try {
                const data = await callApi('GET', `/crm/leads/${id}`);
                setLeadData(data?.data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching lead data:', error);
                // Handle error as needed
            }
        };

        fetchLeadData();
    }, [id]);

    return (
        <div>
            <div>
                <HomePageHeader />
            </div>
            <>
                {leadData ? (
                    <>
                        {/* Render lead data here */}
                        <div>
                            <h2>Lead Data</h2>
                            <p>{leadData.title}</p>
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
