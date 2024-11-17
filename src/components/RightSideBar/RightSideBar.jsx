import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from './RightSideBar.module.css';
import { fetchSummeryData } from "../../redux/summary/operations";
import { selectorIsLoading, selectorSummary, selectorSummaryError } from "../../redux/summary/selector";
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../hooks/useAuth";

const RightSideBar = () => {
    const dispatch = useDispatch();
    
    const summary = useSelector(selectorSummary);
    const isLoading = useSelector(selectorIsLoading);
    const error = useSelector(selectorSummaryError);
    const { isLoggedIn } = useAuth();
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    useEffect(() => {
        const dateString = selectedDate.toISOString().split('T')[0]; 
        dispatch(fetchSummeryData({ date: dateString }));
    }, [dispatch, selectedDate]);  

    if (isLoading) {
        return <Spinner />;
    }

  

    return (
        <>
            {
                isLoggedIn && summary.length === 0 ?
                    (<p>No diary entry found for this date.</p>)
                    :(<div className={css.rightSidebar}>
            <h2>Summary for {selectedDate.toISOString().split('T')[0]}</h2>
            <div className={css.summaryDetails}>
                <p><strong>Daily Left:</strong> {summary.daily_left} kcal</p>
                <p><strong>Daily Consumed:</strong> {summary.daily_consumed} kcal</p>
                <p><strong>Daily Rate:</strong> {summary.daily_rate} kcal</p>
                <p><strong>Percentage Consumed:</strong> {summary.percentage}%</p>
            </div>
                    </div> )
        }
        </>
    )
};

export default RightSideBar;
