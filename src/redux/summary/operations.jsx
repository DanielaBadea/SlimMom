import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message as notificationMessage } from "antd";

axios.defaults.baseURL = 'https://slim-mom-backend.vercel.app/';

export const fetchSummeryData = createAsyncThunk(
    'summery/data',
    async ({ date }, thunkAPI) => {
        try {
            const response = await axios.get(`/api/summary/${date}`);
            if (response.status === 200) {
                console.log("Summery data:", response.data);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                notificationMessage.error("No diary entry found for this date!");
            } else {
                notificationMessage.error("Error calculating summary!");
            }
            return thunkAPI.rejectWithValue(error.message || "An error occurred");
        }
    }
);