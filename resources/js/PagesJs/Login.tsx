import { useEffect, FormEventHandler, useMemo } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInputs, loginSchema } from "@/Utils/validationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "@/hooks/authHooks";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate: login, isLoading, error: loginError } = useLogin();

    const onSubmitForm: SubmitHandler<LoginFormInputs> = (data) => {
        login(data);
    };

    return (
        <GuestLayout>
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <input
                        className="mt-1 block w-full"
                        {...register("email")}
                    />

                    {errors.email && (
                        <InputError
                            message={errors.email?.message}
                            className="mt-2"
                        />
                    )}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <input
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <InputError
                            message={errors.password?.message}
                            className="mt-2"
                        />
                    )}
                </div>
                    {loginError && (
                       <InputError
                            message={loginError}
                            className="mt-2"
                        />
                    )}
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton disabled={isLoading} className="ms-4">
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
