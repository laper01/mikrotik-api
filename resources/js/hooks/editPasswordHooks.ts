import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { changePasswordForm, LoginFormInputs } from "@/Utils/validationSchema";
import { getErrorMessage } from "@/Utils/responformattor";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface PasswordChangeResponse {
    message:string
}

interface UseChangeResult {
    mutate: UseMutationResult<PasswordChangeResponse, Error, changePasswordForm>['mutate'];
    isLoading: boolean;
    error: string | null;
    success: string| null;
  }

  export const useChangePassword = (): UseChangeResult => {
    const { user, getToken } = useAuth();
    const token = getToken();
    const [success, setSuccess] = useState<string|null>('');

    const mutation = useMutation<PasswordChangeResponse, Error, changePasswordForm>({
        mutationFn: async (data: changePasswordForm)=>{
            const response = await axios.post<PasswordChangeResponse>(
                'api/ubah-password',
                data,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        },
        onSuccess: data =>{
            console.log(data);
            setSuccess(data.message)
        },
        onError: error=>{
            console.error("Ubah error:", error);
        }
    });

    return {
        mutate: mutation.mutate,
        isLoading: mutation.status === 'pending',
        error: mutation.error ? getErrorMessage(mutation.error) : null,
        success: success
    };

  }
