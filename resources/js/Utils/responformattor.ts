import axios from "axios";

export const getErrorMessage = (error: Error): string => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 401) {
                return "Invalid credentials. Please check your email and password.";
            } else {
                return `An error occurred: ${error.response.data.message || error.message}`;
            }
        } else if (error.request) {
            // The request was made but no response was received
            return "No response received from server. Please try again later.";
        } else {
            // Something happened in setting up the request that triggered an Error
            return `Error: ${error.message}`;
        }
    }
    // For non-Axios errors
    return error.message;
};

