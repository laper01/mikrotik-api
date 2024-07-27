// src/components/MainContent.tsx
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useAuth } from "@/context/AuthContext";
import { useChangePassword } from "@/hooks/editPasswordHooks";
import {
    changePasswordForm,
    changePasswordSchema,
} from "@/Utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const MainContent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<changePasswordForm>({
        resolver: zodResolver(changePasswordSchema),
    });

    const {
        mutate: changePassword,
        isLoading,
        error: RootError,
        success
    } = useChangePassword();

    const onSubmitForm: SubmitHandler<changePasswordForm> = (data) => {
        changePassword(data);
    };

    return (
        <div className="p-6 bg-gray-100 flex-grow">
            <h1 className="text font-bold mb-6">
                Ubah password user mahasiswa UMMAT
            </h1>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <InputLabel htmlFor="username" value="username" />
                <input
                    {...register("username")}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                />
                {errors.username && (
                    <InputError
                        message={errors.username?.message}
                        className="mt-2"
                    />
                )}
                <InputLabel htmlFor="password" value="password" />
                <input
                    {...register("password")}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                />
                {errors.password && (
                    <InputError
                        message={errors.password?.message}
                        className="mt-2"
                    />
                )}
                <InputLabel htmlFor="password" value="Konfirmasi password" />
                <input
                    {...register("confirmPassword")}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                />
                {errors.confirmPassword && (
                    <InputError
                        message={errors.confirmPassword?.message}
                        className="mt-2"
                    />
                )}
                <br/>
                <PrimaryButton disabled={isLoading} className="ms-2 mt-1">
                    Ubah
                </PrimaryButton>

            </form>
            {RootError && (
                       <InputError
                            message={RootError}
                            className="mt-2"
                        />
                    )}
            { success &&(
            <p className="text-green-500" >{success}</p>
            )
            }
        </div>
    );
};

export default MainContent;
