import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { LoginFormInputs } from "@/Utils/validationSchema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types";

interface LoginResponse {
    access_token: string;
    user:User
}

interface UseLoginResult {
    mutate: UseMutationResult<LoginResponse, Error, LoginFormInputs>['mutate'];
    isLoading: boolean;
    error: string | null;
  }

export const useLogin = ():UseLoginResult => {
    const navigate = useNavigate();
    const {login} = useAuth();


    const mutation = useMutation<LoginResponse, Error, LoginFormInputs>({
        mutationFn: async (loginData: LoginFormInputs) => {
            const response = await axios.post<LoginResponse>(
                "/api/login",
                loginData,
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );
            return response.data;
        },
        onSuccess: (data) => {
            login(data.access_token, data.user)
            navigate("/dashboard");

        },
        onError: (error) => {
            console.error("Login error:", error);
        },
    });


    const getErrorMessage = (error: Error): string => {
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


    return {
        mutate: mutation.mutate,
        isLoading: mutation.status === 'pending',
        error: mutation.error ? getErrorMessage(mutation.error) : null
    };
};
