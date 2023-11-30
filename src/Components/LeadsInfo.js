import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HomePageHeader from './HomePageHeader';
import { fetchLeadById, selectLeads } from './Redux/leadSlice';

const LeadsInfo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const selectedLead = useSelector(selectLeads).selectLeads;


    useEffect(() => {
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