import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { LoginFormInputs } from "@/Utils/validationSchema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types";
import { getErrorMessage } from "@/Utils/responformattor";

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

    return {
        mutate: mutation.mutate,
        isLoading: mutation.status === 'pending',
        error: mutation.error ? getErrorMessage(mutation.error) : null
    };
};
