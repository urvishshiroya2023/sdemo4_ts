import axios from "axios";
import { BASE_URL } from "./Constants";

const callApi = async (method, endpoint, data = null) => {
    try {
        const authToken = localStorage.getItem("authToken");
        // const url = `${BASE_URL}${endpoint}`;

        if (!authToken) {
            throw new Error("Authentication token not found");
        }

        const config = {
            method,
            url: `${BASE_URL}${endpoint}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        if (data) {
            config.data = data;
        }

        // console.log("API Request URL:", url);

        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default callApi;
